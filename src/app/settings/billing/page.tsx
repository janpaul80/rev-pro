'use client';

import React from 'react';
import Link from 'next/link';

export default function BillingSettings() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem' }}>Billing & Usage</h1>
      
      <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }}>
           <span style={{ background: 'rgba(251, 176, 46, 0.1)', color: '#fbb02e', padding: '4px 12px', borderRadius: '24px', fontSize: '0.8rem', fontWeight: '600', border: '1px solid rgba(251, 176, 46, 0.3)' }}>
             Free Plan
           </span>
        </div>
        
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Current Plan</h2>
        <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '500px' }}>
          You are currently on the Free plan. You have 3 transcripts remaining today. Upgrade to unlock bulk processing and unlimited access.
        </p>
        
        <Link href="/pricing" style={{ display: 'inline-block', padding: '10px 20px', background: '#fbb02e', color: '#000', borderRadius: '8px', fontWeight: '600', textDecoration: 'none' }}>
          View Upgrade Options
        </Link>
      </div>

      <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Invoices</h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>No billing history available on the Free plan.</p>
      </div>
    </div>
  );
}
