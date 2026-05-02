'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    tier: 'free',
    price: '0',
    description: 'Perfect for exploring.',
    features: [
      '3 transcriptions per day',
      '3 translations per day',
      '5 AI credits (test Rewrite, Hooks, etc.)',
      'No bulk import',
      'No HD downloads'
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Basic',
    tier: 'basic',
    price: '5',
    description: 'For casual content creators.',
    features: [
      '30 transcriptions',
      '30 translations',
      '50 AI credits',
      'Bulk import up to 20 videos',
      'HD downloads',
      'Access to AI tools (Rewrite, Hooks, etc.)'
    ],
    cta: 'Choose Basic',
    popular: true,
    priceId: 'price_1TKY6HPW61ouIFFsy8tN0Wgj'
  },
  {
    name: 'Pro',
    tier: 'pro',
    price: '15',
    description: 'For professional marketers.',
    features: [
      'Unlimited transcriptions',
      'Unlimited translations',
      'Unlimited AI credits',
      'Bulk import up to 60 videos',
      'Priority support',
      'Custom branding',
      'Premium export options'
    ],
    cta: 'Choose Pro',
    popular: false,
    priceId: 'price_1TKY6IPW61ouIFFs5pyjBmxU'
  }
];

const Pricing = () => {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handlePurchase = async (priceId: string | undefined) => {
    if (!priceId) return; // Free plan or missing ID
    
    setLoadingPriceId(priceId);
    try {
      const supabase = (await import('@/utils/supabase/client')).createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId,
          userId: session?.user?.id 
        })
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (err: any) {
      alert(`Checkout failed: ${err.message}`);
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <section id="pricing" style={{ background: '#050505', padding: '100px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>Simple Pricing.</h2>
          <p style={{ color: '#666' }}>No hidden fees. Cancel anytime.</p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {plans.map((p, i) => (
            <div key={i} className="glow-card" style={{ 
              padding: '3rem 2rem', 
              border: p.popular ? '1px solid #fff' : '1px solid var(--border)',
              transform: p.popular ? 'scale(1.05)' : 'none',
              zIndex: p.popular ? 10 : 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#666', marginBottom: '1rem' }}>{p.name}</div>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: '700' }}>${p.price}</span>
                <span style={{ color: '#666' }}>/mo</span>
              </div>
              <p style={{ color: '#888', marginBottom: '2rem', height: '3rem' }}>{p.description}</p>
              
              <ul style={{ listStyle: 'none', marginBottom: '3rem', flex: 1 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ color: '#ccc', marginBottom: '0.75rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#fff' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              
              <button 
                className="premium" 
                onClick={() => p.tier !== 'free' ? handlePurchase(p.priceId) : (window.location.href = '/signup')}
                disabled={!!loadingPriceId}
                style={{ 
                  width: '100%', 
                  background: p.popular ? '#fff' : 'transparent',
                  color: p.popular ? '#000' : '#fff',
                  border: p.popular ? 'none' : '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {loadingPriceId === p.priceId && <Loader2 size={18} className="animate-spin" />}
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
