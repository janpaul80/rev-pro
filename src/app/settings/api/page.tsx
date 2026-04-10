'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Plus, Eye, EyeOff, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function ApiSettings() {
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showKeyId, setShowKeyId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (data) {
      setKeys(data);
    }
    setLoading(false);
  };

  const createKey = async () => {
    setGenerating(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setGenerating(false);
      return;
    }

    // Generate a secure-looking token
    const randomChars = Array.from(crypto.getRandomValues(new Uint8Array(24)))
      .map(b => b.toString(16).padStart(2, '0')).join('');
    const newKeyStr = `rev_live_${randomChars}`;

    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: user.id,
        provider: 'rev',
        encrypted_key: newKeyStr // In a real app, hash this and only show once!
      })
      .select()
      .single();

    if (data) {
      setKeys([data, ...keys]);
    } else {
      console.error(error);
    }
    setGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('API Key copied to clipboard!');
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem' }}>API Keys</h1>
      
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.95rem' }}>
        Manage your API keys for programmatic access to the Rev Pro transcription endpoints.
      </p>

      <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>
            <Loader2 className="spin" size={24} style={{ display: 'inline' }} /> Loading keys...
          </div>
        ) : keys.length === 0 ? (
           <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
             No API keys generated yet. Creating one to get started.
           </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '1rem', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>NAME</th>
                <th style={{ padding: '1rem', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>KEY</th>
                <th style={{ padding: '1rem', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>CREATED</th>
                <th style={{ padding: '1rem', color: '#888', fontWeight: '500', fontSize: '0.9rem' }}>LAST USED</th>
                <th style={{ padding: '1rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id}>
                  <td style={{ padding: '1rem', color: '#fff' }}>Default Key</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace', color: '#ccc' }}>
                      {showKeyId === k.id ? k.encrypted_key : `rev_live_${'*'.repeat(24)}`}
                      <button onClick={() => setShowKeyId(showKeyId === k.id ? null : k.id)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                        {showKeyId === k.id ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#666', fontSize: '0.9rem' }}>{new Date(k.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem', color: '#666', fontSize: '0.9rem' }}>{k.last_used_at ? new Date(k.last_used_at).toLocaleDateString() : 'Never'}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => copyToClipboard(k.encrypted_key)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '6px', color: '#888', cursor: 'pointer' }}>
                      <Copy size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="premium" 
          onClick={createKey}
          disabled={generating}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '8px 16px', fontSize: '0.9rem', opacity: generating ? 0.7 : 1 }}
        >
          {generating ? <Loader2 size={16} className="spin" /> : <Plus size={16} />} 
          Create New Key
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
