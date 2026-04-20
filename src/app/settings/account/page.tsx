'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AccountSettings() {
  const [session, setSession] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, [supabase.auth]);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem' }}>Account</h1>
      
      <div style={{ padding: '2rem', background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Personal Information</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#888' }}>
            {session?.user?.email?.charAt(0).toUpperCase() || '?'}
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{session?.user?.email}</div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Account created: {session?.user?.created_at ? new Date(session.user.created_at).toLocaleDateString() : 'Unknown'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
