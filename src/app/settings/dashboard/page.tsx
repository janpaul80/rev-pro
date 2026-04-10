'use client';

import React from 'react';

export default function DashboardSettings() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem' }}>Dashboard Settings</h1>
      
      <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Default View Mode</h2>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Choose how your transcripts are displayed by default.</p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ padding: '0.75rem 1.5rem', background: '#222', border: '1px solid #fbb02e', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>
            List View
          </button>
          <button style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', color: '#888', cursor: 'pointer' }}>
            Grid View
          </button>
        </div>
      </div>
    </div>
  );
}
