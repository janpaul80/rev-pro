'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const TranscriptionApp = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [authSession, setAuthSession] = useState<any>(null);
  const [aiTab, setAiTab] = useState<'rewrite' | 'hooks' | 'explainer'>('rewrite');
  const [aiData, setAiData] = useState<{hooks: string[] | null, explainer: string | null}>({ hooks: null, explainer: null });
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [mode, setMode] = useState<'single' | 'bulk'>('single');
  const [bulkUrls, setBulkUrls] = useState<string>('');
  const [bulkStatus, setBulkStatus] = useState<{current: number, total: number, results: any[]} | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthSession(session);
    });
  }, []);

  const handleTranscribe = async () => {
    if (!url) return;

    if (!authSession) {
      if (typeof window !== 'undefined') {
        const tries = parseInt(localStorage.getItem('rev_free_trials') || '0');
        if (tries >= 1) {
          router.push('/signup?reason=limit_reached');
          return;
        }
        localStorage.setItem('rev_free_trials', (tries + 1).toString());
      }
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setAiTab('rewrite');
    setAiData({ hooks: null, explainer: null });

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, userId: authSession?.user?.id })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Something went wrong');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkTranscribe = async () => {
    if (!authSession || !authSession.user) {
      alert('Bulk processing requires an active membership. Please check pricing.');
      router.push('/pricing');
      return;
    }
    const urls = bulkUrls.split('\n').map(u => u.trim()).filter(u => u.length > 5);
    if (urls.length === 0) return;
    if (urls.length > 60) {
      alert('Maximum 60 URLs allowed per batch.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setBulkStatus({ current: 0, total: urls.length, results: [] });

    const newResults = [];
    for (let i = 0; i < urls.length; i++) {
        try {
           const response = await fetch('/api/transcribe', {
               method: 'POST', body: JSON.stringify({ url: urls[i] })
           });
           const data = await response.json();
           if(data.result) newResults.push({ url: urls[i], data: data.result, error: null });
           else newResults.push({ url: urls[i], data: null, error: data.error });
        } catch (e: any) {
           newResults.push({ url: urls[i], data: null, error: e.message });
        }
        setBulkStatus({ current: i + 1, total: urls.length, results: [...newResults] });
    }
    setIsProcessing(false);
  };

  const handleGenerateAi = async (type: 'hooks' | 'explainer') => {
    if (!authSession || !authSession.user) {
      alert('You must be signed in to use AI tools. See pricing for details.');
      router.push('/pricing');
      return;
    }

    setIsGeneratingAi(true);
    try {
      const resp = await fetch('/api/ai-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: type,
          transcript: result.transcript,
          userId: authSession.user.id
        })
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.error || 'Failed to generate');
      }

      if (type === 'hooks') {
        const parsedHooks = data.result.split('\n').filter((h: string) => h.trim().length > 0);
        setAiData(prev => ({ ...prev, hooks: parsedHooks }));
      } else {
        setAiData(prev => ({ ...prev, explainer: data.result }));
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(result.transcript);
    alert('Copied to clipboard!');
  };

  const generateSRT = (text: string) => {
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    return lines.map((line, i) => {
      const cleanLine = line.replace(/^\[\d{2}:\d{2}\]\s*/, '');
      const startMs = i * 3000;
      const endMs = (i + 1) * 3000;
      const pad = (n: number, z: number = 2) => String(n).padStart(z, '0');
      
      const formatTime = (ms: number) => {
        const d = new Date(ms);
        return `${pad(Math.floor(ms / 3600000))}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())},${pad(d.getUTCMilliseconds(), 3)}`;
      };
      
      return `${i + 1}\n${formatTime(startMs)} --> ${formatTime(endMs)}\n${cleanLine}\n`;
    }).join('\n');
  };

  const exportTXT = () => downloadFile(result.transcript, 'transcript.txt', 'text/plain');
  const exportSRT = () => downloadFile(generateSRT(result.transcript), 'transcript.srt', 'text/plain');
  const exportCSV = () => {
    const lines = result.transcript.split('\n').filter((l: string) => l.trim().length > 0);
    const csvContent = "Line Number,Text\n" + lines.map((l: string, i: number) => {
      const cleanLine = l.replace(/^\[\d{2}:\d{2}\]\s*/, '').replace(/"/g, '""');
      return `${i + 1},"${cleanLine}"`;
    }).join('\n');
    downloadFile(csvContent, 'transcript.csv', 'text/csv');
  };

  if (result) {
    return (
      <div className="container" style={{ padding: '0' }}>
        <div className="glass" style={{ padding: '3rem', borderRadius: '24px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Transcription Ready</h2>
            <button className="premium" onClick={() => setResult(null)} style={{ background: 'transparent', color: '#fff', border: '1px solid var(--border)', borderRadius: '12px' }}>
              New Transcription
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem' }}>
            <div style={{ background: '#0a0a0a', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ color: '#666', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Transcript</div>
              <pre style={{ whiteSpace: 'pre-wrap', color: '#ccc', fontFamily: 'inherit', lineHeight: '1.8' }}>
                {result.transcript}
              </pre>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glow-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', overflowX: 'auto' }}>
                  <button onClick={() => setAiTab('rewrite')} style={{ background: 'transparent', border: 'none', color: aiTab === 'rewrite' ? '#fbb02e' : '#888', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', padding: '4px 8px' }}>Rewrite</button>
                  <button onClick={() => setAiTab('hooks')} style={{ background: 'transparent', border: 'none', color: aiTab === 'hooks' ? '#fbb02e' : '#888', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', padding: '4px 8px' }}>Hooks</button>
                  <button onClick={() => setAiTab('explainer')} style={{ background: 'transparent', border: 'none', color: aiTab === 'explainer' ? '#fbb02e' : '#888', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', padding: '4px 8px' }}>Explainer</button>
                </div>
                
                <div style={{ fontSize: '0.9rem', color: '#ccc', flex: 1, position: 'relative' }}>
                  {aiTab === 'rewrite' && (
                    <div style={{ whiteSpace: 'pre-wrap' }}>{result.refined}</div>
                  )}
                  
                  {aiTab === 'hooks' && (
                    <div>
                      {aiData.hooks ? (
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {aiData.hooks.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                      ) : (
                        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                          <p style={{ color: '#888', marginBottom: '1rem' }}>Generate 3 viral hooks tailored to this transcript.</p>
                          <button onClick={() => handleGenerateAi('hooks')} disabled={isGeneratingAi} className="premium" style={{ fontSize: '0.85rem', padding: '8px 16px', borderRadius: '8px' }}>
                            {isGeneratingAi ? 'Generating...' : 'Generate Hooks (1 Credit)'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {aiTab === 'explainer' && (
                    <div>
                      {aiData.explainer ? (
                        <p style={{ lineHeight: '1.6' }}>{aiData.explainer}</p>
                      ) : (
                        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                          <p style={{ color: '#888', marginBottom: '1rem' }}>Analyze the pacing and tone to understand why this went viral.</p>
                          <button onClick={() => handleGenerateAi('explainer')} disabled={isGeneratingAi} className="premium" style={{ fontSize: '0.85rem', padding: '8px 16px', borderRadius: '8px' }}>
                            {isGeneratingAi ? 'Analyzing...' : 'Generate Analysis (1 Credit)'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button onClick={handleCopyText} className="premium" style={{ width: '100%', borderRadius: '8px', fontSize: '0.9rem', padding: '10px' }}>Copy Text</button>
                <button onClick={exportTXT} className="premium" style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px', fontSize: '0.9rem', padding: '10px' }}>.TXT</button>
                <button onClick={exportSRT} className="premium" style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px', fontSize: '0.9rem', padding: '10px' }}>.SRT</button>
                <button onClick={exportCSV} className="premium" style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px', fontSize: '0.9rem', padding: '10px' }}>.CSV</button>
              </div>
              
              <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', color: '#444', fontSize: '0.8rem', textAlign: 'center' }}>
                {result.triesLeft} Free Tries Remaining
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button onClick={() => setMode('single')} style={{ background: 'transparent', border: 'none', color: mode === 'single' ? '#fff' : '#666', borderBottom: mode === 'single' ? '2px solid #fbb02e' : '2px solid transparent', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: '600' }}>Single Video</button>
        <button onClick={() => setMode('bulk')} style={{ background: 'transparent', border: 'none', color: mode === 'bulk' ? '#fff' : '#666', borderBottom: mode === 'bulk' ? '2px solid #fbb02e' : '2px solid transparent', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
          Bulk Import <span style={{ fontSize: '0.65rem', background: '#fbb02e', color: '#000', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Pro</span>
        </button>
      </div>

      {mode === 'single' ? (
        <div className="glass transcription-input-container" style={{
          padding: '8px',
          borderRadius: '16px',
          display: 'flex',
          gap: '8px',
          marginBottom: '1rem',
          border: '1px solid var(--border)'
        }}>
          <input 
            type="text" 
            placeholder="Paste TikTok, YouTube, or Instagram URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              padding: '12px 20px',
              fontSize: '1rem',
              outline: 'none',
              minWidth: '0'
            }}
          />
          <button 
            className="premium transcribe-btn" 
            onClick={handleTranscribe}
            disabled={isProcessing}
            style={{ minWidth: '140px', borderRadius: '12px' }}
          >
            {isProcessing ? 'Processing...' : 'Transcribe'}
          </button>
          
          <style jsx>{`
            @media (max-width: 640px) {
              .transcription-input-container {
                flex-direction: column;
                padding: 12px;
              }
              .transcribe-btn {
                width: 100%;
                min-width: unset !important;
              }
            }
          `}</style>
        </div>
      ) : (
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
          {bulkStatus ? (
            <div>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Processing Bulk Import... ({bulkStatus.current}/{bulkStatus.total})</h3>
              <div style={{ background: '#111', borderRadius: '8px', height: '8px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{ width: `${(bulkStatus.current / bulkStatus.total) * 100}%`, height: '100%', background: '#fbb02e', transition: 'width 0.3s ease' }}></div>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {bulkStatus.results.map((res, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#aaa', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }}>{res.url}</span>
                    <span style={{ color: res.error ? '#ff4444' : '#4ade80', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      {res.error ? 'Failed' : 'Success'}
                    </span>
                  </div>
                ))}
              </div>
              {bulkStatus.current === bulkStatus.total && (
                <button onClick={() => setBulkStatus(null)} className="premium" style={{ width: '100%', marginTop: '1.5rem', borderRadius: '8px', padding: '12px' }}>
                  Process New Batch
                </button>
              )}
            </div>
          ) : (
            <>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>Paste up to 60 URLs below, separated by line breaks.</p>
              <textarea 
                placeholder={`https://tiktok.com/@user/video/123456789\nhttps://youtube.com/shorts/abcdef`}
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
                style={{
                  width: '100%',
                  height: '150px',
                  background: '#0a0a0a',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '1rem',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical',
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}
              />
              <button 
                className="premium" 
                onClick={handleBulkTranscribe}
                disabled={isProcessing}
                style={{ width: '100%', borderRadius: '12px', padding: '14px' }}
              >
                {isProcessing ? 'Processing Batch...' : `Transcribe Batch (${bulkUrls.split('\n').filter(u => u.trim().length > 5).length} URLs)`}
              </button>
            </>
          )}
        </div>
      )}
      
      {error && (
        <div style={{ color: '#ff4444', marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          {error} {(error.includes('expired') || error.includes('3 free')) && <a href="#pricing" style={{ color: '#fff', textDecoration: 'underline', marginLeft: '8px' }}>View Plans</a>}
        </div>
      )}
    </div>
  );
};

export default TranscriptionApp;
