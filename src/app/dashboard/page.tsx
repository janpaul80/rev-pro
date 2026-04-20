'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  FileText, CheckCircle, Clock, AlertCircle, 
  Settings, ChevronDown, Zap, Activity, Folder, Plus, Download,
  CreditCard, Loader2, ShieldCheck, MoreVertical, Trash2,
  Search, User, LogOut, Bookmark
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ViralHeatmap from '@/components/ViralHeatmap';
import BatchMonitor, { BatchItem } from '@/components/BatchMonitor';
import { exportToCSV } from '@/utils/csvExport';

function DashboardContent() {
  const [session, setSession] = useState<any>(null);
  const [transcriptions, setTranscriptions] = useState<any[]>([]);
  const [usageLogs, setUsageLogs] = useState<any[]>([]);
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
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'intelligence' | 'history'>('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

      // Fetch usage logs for charting
      const { data: logs } = await supabase
        .from('usage_logs')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: true });
      
      if (logs) {
        setUsageLogs(logs);
      }

      // Fetch Folders
      const { data: folderData } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('name', { ascending: true });
        
      if (folderData) {
        setFolders(folderData);
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

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    setIsCreatingFolder(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const { data, error } = await supabase
        .from('folders')
        .insert([{ name: newFolderName, user_id: session.user.id }])
        .select();
        
      if (!error && data) {
        setFolders([...folders, data[0]]);
        setNewFolderName('');
        setIsFolderModalOpen(false);
      }
    }
    setIsCreatingFolder(false);
  };

  const handleAssignToFolder = async (transcriptionId: string, folderId: string | null) => {
    const { error } = await supabase
      .from('transcriptions')
      .update({ folder_id: folderId })
      .eq('id', transcriptionId);
      
    if (!error) {
      setTranscriptions(transcriptions.map(t => 
        t.id === transcriptionId ? { ...t, folder_id: folderId } : t
      ));
    }
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

    const urls = urlInput.split('\n').map(u => u.trim()).filter(u => u.length > 0);
    
    // If more than 1 URL, switch to bulk mode automatically or handle as batch
    if (urls.length > 1) {
      handleBulkSubmit(urls);
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urls[0], userId: session?.user?.id })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Something went wrong');
      }

      setResult(data);
      fetchData();
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes('Limit reached')) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkSubmit = (urls: string[]) => {
    // Plan Gating logic
    const limit = planTier === 'Pro' ? 50 : planTier === 'Basic' ? 10 : 0;
    
    if (limit === 0) {
      setError("Batch processing is only available for Pro & Basic plans.");
      return;
    }
    
    if (urls.length > limit) {
      setError(`Your plan allows max ${limit} URLs per batch. Please upgrade to Pro for more.`);
      return;
    }

    const items: BatchItem[] = urls.map((url, i) => ({
      id: `batch-${Date.now()}-${i}`,
      url,
      status: 'pending'
    }));

    setBatchItems(items);
    setIsBulkMode(true);
    processQueue(items);
  };

  const processQueue = async (initialItems: BatchItem[]) => {
    const concurrency = 3;
    let currentIdx = 0;
    const items = [...initialItems];

    const worker = async () => {
      while (currentIdx < items.length) {
        const i = currentIdx++;
        const item = items[i];
        
        // Update to processing
        setBatchItems(prev => prev.map(pi => pi.id === item.id ? { ...pi, status: 'processing' } : pi));

        try {
          const res = await fetch('/api/transcribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: item.url, userId: session?.user?.id })
          });
          
          const data = await res.json();
          
          if (!res.ok) throw new Error(data.error || 'Failed');

          setBatchItems(prev => prev.map(pi => pi.id === item.id ? { 
            ...pi, 
            status: 'completed', 
            transcript: data.transcript, 
            refined: data.refined 
          } : pi));
        } catch (err: any) {
          setBatchItems(prev => prev.map(pi => pi.id === item.id ? { 
            ...pi, 
            status: 'failed', 
            error: err.message 
          } : pi));
        }
      }
    };

    // Fire off parallel workers
    const workers = Array(Math.min(concurrency, items.length)).fill(null).map(() => worker());
    await Promise.all(workers);
    fetchData(); // Final refresh
  };

  const handleTabChange = (tab: 'overview' | 'intelligence' | 'history') => {
    if (tab === 'intelligence') {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setActiveTab(tab);
      }, 1500);
    } else {
      setActiveTab(tab);
    }
  };

  // Memoized calculations for Intelligence Tab
  const intelligenceData = React.useMemo(() => {
    if (transcriptions.length === 0) return null;

    const completed = transcriptions.filter(t => t.status === 'completed');
    
    // 1. Platform Benchmarking (Radar Chart)
    const platforms = ['TikTok', 'YouTube', 'Instagram'];
    const radarData = platforms.map(p => {
      const platformItems = completed.filter(item => item.platform?.toLowerCase() === p.toLowerCase());
      const avgScore = platformItems.length > 0 
        ? platformItems.reduce((acc, curr) => acc + (curr.retention_data?.viral_score || 0), 0) / platformItems.length
        : 0;
      return { subject: p, A: Math.round(avgScore), fullMark: 100 };
    });

    // 2. Viral Trendline (Last 20)
    const trendData = [...completed].reverse().slice(-10).map((t, i) => ({
      index: i + 1,
      score: t.retention_data?.viral_score || 0,
      title: t.url?.substring(0, 20) || `Video ${i+1}`
    }));

    // 3. The Hook Lab (Top 5 hooks by score)
    const topHooks = completed
      .sort((a, b) => (b.retention_data?.viral_score || 0) - (a.retention_data?.viral_score || 0))
      .slice(0, 5)
      .map(t => ({
        score: t.retention_data?.viral_score || 0,
        text: t.refined?.split('.')[0] + '...', // First sentence as the hook
        platform: t.platform
      }));

    return { radarData, trendData, topHooks };
  }, [transcriptions]);

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

  const handleClearBatch = () => {
    setBatchItems([]);
    setIsBulkMode(false);
  };

  const handleBatchRetry = (id: string) => {
    const item = batchItems.find(i => i.id === id);
    if (item) {
      processQueue([item]);
    }
  };

  const handleBulkExport = () => {
    exportToCSV(batchItems.filter(i => i.status === 'completed'));
  };

  const getUserInitial = () => {
    if (session?.user?.email) {
      return session.user.email.charAt(0).toUpperCase();
    }
    return '?';
  };

  const stats = [
    { label: 'Total Transcripts', value: transcriptions.length, icon: <FileText size={20} color="#fbb02e" /> },
    { label: 'AI Tool Usage', value: usageLogs.filter(l => l.action_type !== 'transcription').length, icon: <Zap size={20} color="#fbb02e" /> },
    { label: 'Credits Consumed', value: usageLogs.reduce((acc, curr) => acc + curr.credits_used, 0), icon: <Activity size={20} color="#fbb02e" /> },
    { label: 'Success Rate', value: `${transcriptions.length > 0 ? ((transcriptions.filter(t => t.status === 'completed').length / transcriptions.length) * 100).toFixed(1) : 100}%`, icon: <CheckCircle size={20} color="#fbb02e" /> },
  ];

  // Aggregating Chart Data for User
  const dailyUsage = usageLogs.reduce((acc: any, curr: any) => {
    const date = new Date(curr.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + curr.credits_used;
    return acc;
  }, {});

  const chartData = Object.entries(dailyUsage).map(([date, credits]) => ({ date, credits }));

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/">
            <img src="/assets/logo_light.png" alt="REV" style={{ height: '70px', cursor: 'pointer' }} />
          </Link>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#888'}>
            <span style={{ fontSize: '1.2rem' }}>←</span> Back to app
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/docs" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#888'}>
            Documentation
          </Link>
          
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
                
                {session?.user?.user_metadata?.is_admin && (
                  <>
                    <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', color: '#fbb02e', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(251, 176, 46, 0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                      <ShieldCheck size={16} /> Admin Portal
                    </Link>
                    <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }} />
                  </>
                )}
                
                <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', color: '#ff4444', borderRadius: '8px', cursor: 'pointer', border: 'none', background: 'transparent', textAlign: 'left', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,68,68,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '40px 20px', position: 'relative' }}>
        {/* Intelligence Analysis Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', inset: 0, zIndex: 10000, 
                background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem'
              }}
            >
              <Loader2 size={60} className="spin" color="#fbb02e" />
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Analyzing Intelligence...</h2>
                <p style={{ color: '#666' }}>Recalculating virality benchmarks across your niche.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div className="glass" style={{ padding: '6px', borderRadius: '16px', display: 'inline-flex', gap: '4px', border: '1px solid var(--border)' }}>
            {[
              { id: 'overview', label: 'Overview', icon: <Zap size={16} /> },
              { id: 'intelligence', label: 'Intelligence', icon: <Activity size={16} /> },
              { id: 'history', label: 'History', icon: <Clock size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '12px',
                  background: activeTab === tab.id ? '#fbb02e' : 'transparent',
                  color: activeTab === tab.id ? '#000' : '#888',
                  border: 'none', cursor: 'pointer', fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
              <select 
                value={selectedFolder || ''}
                onChange={(e) => setSelectedFolder(e.target.value || null)}
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '8px', 
                  padding: '8px 12px', 
                  color: '#888',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="">No Folder (Global)</option>
                {folders.map(f => (
                  <option key={f.id} value={f.id}>Folder: {f.name}</option>
                ))}
              </select>
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

        {/* Batch Processing Monitor */}
        {isBulkMode && (
          <BatchMonitor 
            items={batchItems} 
            onExport={handleBulkExport}
            onClear={handleClearBatch}
            onRetry={handleBatchRetry}
          />
        )}

        {/* Result Area (appended if successful transcription just completed) */}
        {!isBulkMode && result && (
          <div className="glass" style={{ marginBottom: '60px', padding: '2rem', borderRadius: '24px', textAlign: 'left', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Transcription Result</h2>
              <button 
                onClick={() => setResult(null)} 
                style={{ background: 'transparent', color: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}
              >
                Clear Result
              </button>
            </div>

            {/* Viral Heatmap Integration */}
            {result.heatmap && result.heatmap.length > 0 && (
              <ViralHeatmap data={result.heatmap} />
            )}
            
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
      </motion.div>
    )}

    {/* Intelligence Tab Content */}
    {activeTab === 'intelligence' && intelligenceData && (
      <motion.div key="intelligence" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Radar Chart: Platform Strength */}
          <div className="glass" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', minHeight: '400px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '2rem' }}>Platform Benchmarking</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={intelligenceData.radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" stroke="#888" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#444" axisLine={false} tick={false} />
                <Radar
                  name="Viral Potential"
                  dataKey="A"
                  stroke="#fbb02e"
                  fill="#fbb02e"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'center' }}>
              Relative score intensity based on historical AI content audits.
            </p>
          </div>

          {/* Trendline: Retention Scores */}
          <div className="glass" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '2rem' }}>Performance Velocity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={intelligenceData.trendData}>
                <defs>
                  <linearGradient id="colorViral" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbb02e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fbb02e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="index" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fbb02e' }}
                />
                <Area type="monotone" dataKey="score" stroke="#fbb02e" strokeWidth={3} fillOpacity={1} fill="url(#colorViral)" />
              </AreaChart>
            </ResponsiveContainer>
            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'center' }}>
              Trend Analysis: Last 10 videos (Viral Potential Scores).
            </p>
          </div>
        </div>

        {/* The Hook Lab */}
        <div className="glass" style={{ padding: '3rem', borderRadius: '24px', border: '1px solid var(--border)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ padding: '12px', background: 'rgba(251, 176, 46, 0.1)', borderRadius: '12px' }}>
              <Bookmark color="#fbb02e" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>The Hook Lab</h3>
              <p style={{ color: '#666' }}>Engineered patterns from your highest-performing videos</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {intelligenceData.topHooks.map((hook, i) => (
              <div key={i} style={{ background: '#0a0a0a', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#fbb02e', fontWeight: '800', fontSize: '0.8rem' }}>SCORE: {hook.score}</span>
                  <span style={{ color: '#444', fontSize: '0.7rem' }}>{hook.platform}</span>
                </div>
                <p style={{ color: '#ccc', fontStyle: 'italic', lineHeight: '1.6' }}>"{hook.text}"</p>
              </div>
            ))}
            {intelligenceData.topHooks.length === 0 && (
              <p style={{ color: '#444' }}>Process more videos to unlock automated hook intelligence metrics.</p>
            )}
          </div>
        </div>
      </motion.div>
    )}

    {/* History Tab Content */}
    {activeTab === 'history' && (
      <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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

        {/* NEW: Credit Usage Chart */}
        <div style={{ marginBottom: '40px' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', height: '350px' }}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Credit Consumption</h3>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Last activity pulses</div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbb02e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#fbb02e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#111" vertical={false} />
                <XAxis dataKey="date" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#fbb02e' }}
                  labelStyle={{ color: '#666' }}
                />
                <Area type="monotone" dataKey="credits" stroke="#fbb02e" strokeWidth={2} fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
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

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setIsFolderModalOpen(true)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(251, 176, 46, 0.1)', 
                border: '1px solid rgba(251, 176, 46, 0.3)', 
                padding: '10px 16px', 
                borderRadius: '8px', 
                color: '#fbb02e',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
              <Plus size={16} /> New Folder
            </button>

            <select 
              value={selectedFolder || 'All'}
              onChange={(e) => setSelectedFolder(e.target.value === 'All' ? null : e.target.value)}
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
              <option value="All">All Items</option>
              {folders.map(f => (
                <option key={f.id} value={f.id}>📁 {f.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty State / Table */}
        {(() => {
          const filteredTranscriptions = transcriptions.filter(t => {
            const matchSearch = !searchQuery || t.url?.includes(searchQuery) || t.platform?.includes(searchQuery);
            const matchStatus = statusFilter === 'All' || t.status === statusFilter;
            const matchPlatform = platformFilter === 'All' || t.platform === platformFilter;
            const matchFolder = !selectedFolder || t.folder_id === selectedFolder;
            return matchSearch && matchStatus && matchPlatform && matchFolder;
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
                    <th style={{ padding: '1rem 1.5rem', color: '#888', fontWeight: '500' }}>Folder</th>
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
                         <select 
                           value={t.folder_id || ''}
                           onChange={(e) => handleAssignToFolder(t.id, e.target.value || null)}
                           style={{ background: 'transparent', border: 'none', color: '#444', fontSize: '0.85rem', cursor: 'pointer', outline: 'none' }}
                         >
                           <option value="">None</option>
                           {folders.map(f => (
                             <option key={f.id} value={f.id}>{f.name}</option>
                           ))}
                         </select>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => {
                            if (t.status === 'completed') {
                              setResult({ 
                                transcript: t.transcript, 
                                refined: t.refined,
                                heatmap: t.retention_data // Map DB column to component prop
                              });
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
      </motion.div>
    )}

        {/* Folder Creator Modal */}
        {isFolderModalOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass" 
              style={{ width: '100%', maxWidth: '400px', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)' }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Create New Folder</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Organize your transcription projects (e.g., "Client A", "Podcast Series").</p>
              
              <input 
                type="text" 
                placeholder="Folder Name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
                style={{ 
                  width: '100%', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '12px', 
                  padding: '12px 16px', 
                  color: '#fff', 
                  marginBottom: '1.5rem',
                  outline: 'none'
                }}
              />
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setIsFolderModalOpen(false)}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', color: '#fff' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateFolder}
                  disabled={isCreatingFolder || !newFolderName}
                  className="premium"
                  style={{ flex: 1, background: '#fbb02e', color: '#000', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}
                >
                  {isCreatingFolder ? 'Creating...' : 'Create Folder'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
