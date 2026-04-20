'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Loader2 } from 'lucide-react';

export default function BillingSettings() {
  const [planTier, setPlanTier] = useState<string>('Free');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPlan() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data, error } = await supabase
        .from('plan_tracking')
        .select('plan_tier')
        .eq('user_id', user.id)
        .single();
        
      if (data && data.plan_tier) {
        setPlanTier(data.plan_tier.charAt(0).toUpperCase() + data.plan_tier.slice(1));
      }
      setLoading(false);
    }
    
    fetchPlan();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem' }}>Billing & Usage</h1>
      
      {loading ? (
        <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
          <Loader2 size={24} className="spin" style={{ color: '#888' }} />
        </div>
      ) : (
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }}>
             <span style={{ 
               background: planTier === 'Pro' ? '#fbb02e' : 'rgba(251, 176, 46, 0.1)', 
               color: planTier === 'Pro' ? '#000' : '#fbb02e', 
               padding: '4px 12px', 
               borderRadius: '24px', 
               fontSize: '0.8rem', 
               fontWeight: '800', 
               border: planTier === 'Pro' ? 'none' : '1px solid rgba(251, 176, 46, 0.3)' 
             }}>
               {planTier} Plan
             </span>
          </div>
          
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Current Plan</h2>
          <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '600px', lineHeight: '1.6' }}>
            You are currently on the <strong>{planTier}</strong> plan.
            <br />
            {planTier === 'Free' && 'You have 3 transcripts and 5 AI Credits remaining. Upgrade to unlock more features!'}
            {planTier === 'Basic' && 'Enjoy 30 transcripts and 50 AI Credits this month. Upgrade to Pro for unlimited AI generation.'}
            {planTier === 'Pro' && 'You have unlimited access to all transcriptions and unlimited AI Credits. Thank you for your support!'}
          </p>
          
          {planTier !== 'Pro' && (
            <Link href="/pricing" style={{ display: 'inline-block', padding: '10px 20px', background: '#fbb02e', color: '#000', borderRadius: '8px', fontWeight: '600', textDecoration: 'none' }}>
              View Upgrade Options
            </Link>
          )}
        </div>
      )}

      <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Invoices</h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          {planTier === 'Free' ? 'No billing history available on the Free plan.' : 'Your next invoice will be generated automatically by Stripe.'}
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
