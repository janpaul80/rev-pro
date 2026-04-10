'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const TranscriptionApp = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const handleTranscribe = async () => {
    if (!url) return;

    if (!session) {
      // Redirect to login if user is not authenticated
      router.push('/login');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
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
              <div className="glow-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <div style={{ color: '#fff', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: '700' }}>✨ AI Refined Version</div>
                <div style={{ fontSize: '0.9rem', color: '#888', whiteSpace: 'pre-wrap' }}>
                  {result.refined}
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="premium" style={{ width: '100%', borderRadius: '12px' }}>Copy Text</button>
                <button className="premium" style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', color: '#fff', borderRadius: '12px' }}>Download .SRT</button>
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
    <div className="container">
      <div className="glass" style={{
        maxWidth: '700px',
        margin: '0 auto',
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
            outline: 'none'
          }}
        />
        <button 
          className="premium" 
          onClick={handleTranscribe}
          disabled={isProcessing}
          style={{ minWidth: '140px', borderRadius: '12px' }}
        >
          {isProcessing ? 'Processing...' : 'Transcribe'}
        </button>
      </div>
      
      {error && (
        <div style={{ color: '#ff4444', marginTop: '1rem', fontSize: '0.9rem' }}>
          {error} {(error.includes('expired') || error.includes('3 free')) && <a href="#pricing" style={{ color: '#fff', textDecoration: 'underline', marginLeft: '8px' }}>View Plans</a>}
        </div>
      )}
    </div>
  );
};

export default TranscriptionApp;
