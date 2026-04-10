'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  FileText, CheckCircle, Clock, AlertCircle, 
  Search, FolderPlus, Download, User, LogOut,
  Bookmark, ChevronDown, Settings, CreditCard,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [session, setSession] = useState<any>(null);
  const [transcriptions, setTranscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [urlInput, setUrlInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [planTier, setPlanTier] = useState<string>('Free');

  const router = useRouter();
  const searchParams = useSearchParams();
  const [showUpgradeToast, setShowUpgradeToast] = useState(false);

  useEffect(() => {
    if (searchParams?.get('success') === 'true') {
      setShowUpgradeToast(true);
      setTimeout(() => setShowUpgradeToast(false), 5000);
    }
  }, [searchParams]);

  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setSession(session);
        fetchData();
      }
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [router, supabase.auth]);

  const fetchData = async () => {
    setLoading(true);
    // Fetch user transcriptions from db
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data, error } = await supabase
        .from('transcriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
        
      if (data) {
        setTranscriptions(data);
      }

      // Fetch the plan
      const { data: planData } = await supabase
        .from('plan_tracking')
        .select('plan_tier')
        .eq('user_id', session.user.id)
        .single();
        
      if (planData && planData.plan_tier) {
         setPlanTier(planData.plan_tier.charAt(0).toUpperCase() + planData.plan_tier.slice(1));
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleTranscribe = async () => {
    if (!urlInput) return;
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput, userId: session?.user?.id })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Something went wrong');
      }

      setResult(data);
      // Refresh the history after successful transcription
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (transcript: string, platform: string, id: string) => {
    if (!transcript) {
      alert("No transcript available to download.");
      return;
    }
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RevPro_Transcript_${platform}_${id.substring(0, 8)}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getUserInitial = () => {
    if (session?.user?.email) {
      return session.user.email.charAt(0).toUpperCase();
    }
    return '?';
  };

  const stats = [
    { label: 'Total Transcripts', value: transcriptions.length, icon: <FileText size={20} color="#fbb02e" /> },
    { label: 'Successfully Processed', value: transcriptions.filter(t => t.status === 'completed').length, icon: <CheckCircle size={20} color="#fbb02e" /> },
    { label: 'Currently Processing', value: transcriptions.filter(t => t.status === 'processing').length, icon: <Clock size={20} color="#fbb02e" /> },
    { label: 'Failed/Errors', value: transcriptions.filter(t => t.status === 'failed').length, icon: <AlertCircle size={20} color="#fbb02e" /> },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {showUpgradeToast && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          background: '#4ade80', color: '#000', padding: '12px 24px', borderRadius: '30px',
          fontWeight: 'bold', zIndex: 9999, boxShadow: '0 4px 20px rgba(74, 222, 128, 0.4)',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <CheckCircle size={20} /> Successfully Upgraded! Welcome to the Pro Tier.
        </div>
      )}

      {/* Header / Nav */}
      <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="/assets/logo_light.png" alt="REV" style={{ height: '70px' }} />
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#888'}>Documentation</button>
          
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '50%', 
                background: '#fbb02e', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                border: '2px solid transparent',
                transition: 'border 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.border = '2px solid rgba(255,255,255,0.5)'}
              onMouseOut={(e) => e.currentTarget.style.border = '2px solid transparent'}
            >
              {getUserInitial()}
            </button>

            {isMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                width: '220px',
                background: '#111',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '0.5rem',
                zIndex: 50,
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                <div style={{ padding: '0.5rem 0.5rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                  <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session?.user?.email}</div>
                  <div style={{ 
                    color: planTier === 'Pro' ? '#000' : '#888', 
                    fontSize: '0.8rem',
                    background: planTier === 'Pro' ? '#fbb02e' : 'transparent',
                    display: 'inline-block',
                    padding: planTier === 'Pro' ? '2px 8px' : '0',
                    borderRadius: '10px',
                    marginTop: '4px',
                    fontWeight: planTier === 'Pro' ? 'bold' : 'normal'
                  }}>
                    {planTier} Plan
                  </div>
                </div>
                
                <Link href="/settings/account" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', color: '#ccc', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ccc'; }}>
                  <User size={16} /> Profile
                </Link>
                <Link href="/settings/billing" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', color: '#ccc', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ccc'; }}>
                  <CreditCard size={16} /> Credits
                </Link>
                <Link href="/settings" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', color: '#ccc', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ccc'; }}>
                  <Settings size={16} /> Settings
                </Link>
                
                <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }} />
                
                <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', color: '#ff4444', borderRadius: '8px', cursor: 'pointer', border: 'none', background: 'transparent', textAlign: 'left', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,68,68,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '40px 20px' }}>
        {/* Paste Link Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Paste your video link here</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Paste your TikTok, YouTube Shorts, or Instagram Reels link to get started.</p>
          
          <div className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
            <textarea 
              placeholder="Paste up to 50 video links here (or tiktok collection)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={isProcessing}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1rem',
                minHeight: '100px',
                padding: '1rem',
                outline: 'none',
                resize: 'none'
              }}
            />
            
            {error && (
              <div style={{ color: '#ff4444', padding: '0 1rem 1rem', textAlign: 'left', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderTop: '1px solid var(--border)' }}>
              <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ opacity: 0.6 }}>A</span> Translate <ChevronDown size={14} />
              </button>
              <button 
                className="premium" 
                onClick={handleTranscribe}
                disabled={isProcessing || !urlInput}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  borderRadius: '12px', 
                  padding: '10px 24px',
                  background: isProcessing ? '#ccc' : '#fbb02e',
                  color: '#000'
                }}>
                {isProcessing ? (
                  <>Processing <Loader2 size={18} className="spin" /></>
                ) : (
                  <>Transcribe <Download size={18} /></>
                )}
              </button>
            </div>
          </div>
          
          {/* Internal CSS for spin animation */}
          <style dangerouslySetInnerHTML={{__html: `
            .spin { animation: spin 1s linear infinite; }
            @keyframes spin { 100% { transform: rotate(360deg); } }
          `}} />
        </div>

        {/* Result Area (appended if successful transcription just completed) */}
        {result && (
          <div className="glass" style={{ marginBottom: '60px', padding: '2rem', borderRadius: '24px', textAlign: 'left', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Transcription Result</h2>
              <button onClick={() => setResult(null)} style={{ background: 'transparent', color: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
                Clear Result
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ background: '#0a0a0a', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ color: '#fbb02e', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Transcript</div>
                <pre style={{ whiteSpace: 'pre-wrap', color: '#ccc', fontFamily: 'inherit', lineHeight: '1.8', fontSize: '0.9rem' }}>
                  {result.transcript}
                </pre>
              </div>
              
              <div style={{ background: 'rgba(251, 176, 46, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(251, 176, 46, 0.2)' }}>
                <div style={{ color: '#fbb02e', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>AI Refined Summary</div>
                <div style={{ color: '#eee', whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.9rem' }}>
                  {result.refined}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Transcript <span style={{ color: '#fbb02e' }}>History</span></h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Global archive of all processed videos and collections</p>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', cursor: 'pointer' }}>
            <Download size={16} /> Export All
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '10px', background: 'rgba(251, 176, 46, 0.1)', borderRadius: '10px' }}>
                  {stat.icon}
                </div>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{stat.value}</div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="glass" style={{ padding: '1rem', borderRadius: '16px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', flex: '1 1 200px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            <input 
              type="text" 
              placeholder="Search transcripts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px 10px 10px 40px',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--border)', 
              padding: '10px 16px', 
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="All">Status: All</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>

          <select 
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--border)', 
              padding: '10px 16px', 
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="All">Platform: All</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
          </select>

          {[
            { icon: <FolderPlus size={16} />, label: 'All Folders' },
            { icon: <Bookmark size={16} />, label: 'Bookmarked Only' }
          ].map((filter, i) => (
            <button key={i} onClick={() => alert('Folder and Bookmark filters coming soon!')} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--border)', 
              padding: '10px 16px', 
              borderRadius: '8px', 
              whiteSpace: 'nowrap',
              color: '#fff',
              cursor: 'pointer'
            }}>
              {filter.icon} {filter.label}
            </button>
          ))}
        </div>

        {/* Empty State / Table */}
        {(() => {
          const filteredTranscriptions = transcriptions.filter(t => {
            const matchSearch = !searchQuery || t.url?.includes(searchQuery) || t.platform?.includes(searchQuery);
            const matchStatus = statusFilter === 'All' || t.status === statusFilter;
            const matchPlatform = platformFilter === 'All' || t.platform === platformFilter;
            return matchSearch && matchStatus && matchPlatform;
          });

          return loading ? (
            <div className="glass" style={{ minHeight: '300px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
              <Loader2 size={24} className="spin" style={{ marginRight: '10px' }} /> Loading...
            </div>
          ) : filteredTranscriptions.length === 0 ? (
            <div className="glass" style={{ minHeight: '300px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
              No transcripts match your filters.
            </div>
          ) : (
            <div className="glass" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '1rem 1.5rem', color: '#888', fontWeight: '500' }}>Platform</th>
                    <th style={{ padding: '1rem 1.5rem', color: '#888', fontWeight: '500' }}>URL</th>
                    <th style={{ padding: '1rem 1.5rem', color: '#888', fontWeight: '500' }}>Status</th>
                    <th style={{ padding: '1rem 1.5rem', color: '#888', fontWeight: '500' }}>Date</th>
                    <th style={{ padding: '1rem 1.5rem', color: '#888', fontWeight: '500', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTranscriptions.map((t, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem 1.5rem', textTransform: 'capitalize' }}>{t.platform || 'Unknown'}</td>
                      <td style={{ padding: '1rem 1.5rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <a href={t.url} target="_blank" rel="noreferrer" style={{ color: '#fbb02e' }}>{t.url}</a>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '12px', 
                          fontSize: '0.8rem',
                          background: t.status === 'completed' ? 'rgba(0, 255, 0, 0.1)' : t.status === 'failed' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                          color: t.status === 'completed' ? '#4ade80' : t.status === 'failed' ? '#f87171' : '#fff'
                        }}>
                          {t.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: '#888' }}>
                         {new Date(t.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => {
                            if (t.status === 'completed') {
                              setResult({ transcript: t.transcript, refined: t.refined });
                            } else {
                              alert(t.status === 'processing' ? 'Transcription is still processing' : 'Transcription failed');
                            }
                          }}
                          style={{ color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                          <FileText size={18} />
                        </button>
                        <button 
                          onClick={() => handleDownload(t.transcript, t.platform, t.id)}
                          style={{ color: '#fbb02e', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                          <Download size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
