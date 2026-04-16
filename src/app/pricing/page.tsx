'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Play, Camera, Smartphone, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const plans = [
  {
    name: 'Free',
    tagline: 'Try the basics',
    price: '0',
    duration: 'forever',
    features: [
      '3 transcriptions per day',
      '3 translations per day',
      '5 AI credits (test Rewrite, Hooks)',
      'No bulk import',
      'No HD downloads'
    ],
    cta: 'Start Free',
    popular: false,
    icons: []
  },
  {
    name: 'Basic',
    tagline: 'Creator Tools',
    price: '5',
    duration: 'per month',
    description: 'Turn any viral video into YOUR script. See exactly WHY videos blow up with our Virality Explainer.',
    features: [
      '30 transcriptions',
      '30 translations',
      '50 AI credits',
      'Bulk import up to 20 videos',
      'HD downloads',
      'Access to AI tools (Rewrite, Hooks, Summaries)'
    ],
    cta: 'Get Started',
    popular: true,
    platformIcons: true
  },
  {
    name: 'Pro',
    tagline: 'Unlimited Power',
    price: '15',
    duration: 'per month',
    subtext: '= $180/year',
    description: 'EVERYTHING IN BASIC: Unlimited resources for the power user.',
    features: [
      'Unlimited transcriptions',
      'Unlimited translations',
      'Unlimited AI credits',
      'Bulk import up to 60 videos',
      'Priority support',
      'Custom branding',
      'Premium export options'
    ],
    cta: 'Go Pro',
    popular: false,
    icons: []
  }
];

const PricingPage = () => {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (planName: string) => {
    if (planName === 'Free') {
      router.push('/dashboard');
      return;
    }

    const planId = planName === 'Basic' ? 'basic' : 'pro';
    setLoadingPlan(planName);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId })
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Checkout failed');
        setLoadingPlan(null);
      }
    } catch (err) {
      console.error(err);
      alert('Error initiating checkout');
      setLoadingPlan(null);
    }
  };

  return (
    <main style={{ background: '#000', color: '#fff' }}>
      <Navbar />
      
      <section style={{ paddingTop: '180px', paddingBottom: '100px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem' }}>
              Choose Your <span style={{ color: '#fbb02e' }}>Growth</span> Plan.
            </h1>
            <p style={{ color: '#666', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
              From solo creators to full-scale agencies. Scale your content repurposing with Rev Pro.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2.5rem',
            alignItems: 'start'
          }}>
            {plans.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ position: 'relative' }}
              >
                {p.popular && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '-15px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    background: '#fbb02e',
                    color: '#000',
                    padding: '4px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    zIndex: 20
                  }}>
                    Most Popular
                  </div>
                )}
                
                <div className="glow-card" 
                  style={{ 
                    padding: '3rem 2.5rem', 
                    border: p.popular ? '1px solid #fbb02e' : '1px solid var(--border)',
                    height: '100%'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{p.name}</div>
                <div style={{ color: '#fbb02e', fontSize: '0.9rem', fontWeight: '700', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.tagline}</div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '3.5rem', fontWeight: '800' }}>${p.price}</span>
                  <span style={{ color: '#666', marginLeft: '0.5rem' }}>/ {p.duration}</span>
                  {p.subtext && <div style={{ color: '#444', fontSize: '0.9rem', marginTop: '0.5rem' }}>{p.subtext}</div>}
                </div>

                {p.description && <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>{p.description}</p>}
                
                <ul style={{ listStyle: 'none', marginBottom: '3rem' }}>
                  {p.features.map((f, j) => (
                    <li key={j} style={{ color: '#ccc', marginBottom: '1rem', fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <Check size={18} style={{ color: '#fbb02e', marginTop: '2px', flexShrink: 0 }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {f}
                        {f === 'All Platforms' && p.platformIcons && (
                          <div style={{ display: 'flex', gap: '6px', marginLeft: '4px' }}>
                            <Play size={14} style={{ color: '#ff0000' }} />
                            <Camera size={14} style={{ color: '#E1306C' }} />
                            <Smartphone size={14} style={{ color: '#00f2ea' }} />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleCheckout(p.name)}
                  disabled={loadingPlan !== null}
                  className="premium" 
                  style={{ 
                    width: '100%', 
                    background: p.popular ? '#fbb02e' : 'transparent',
                    color: p.popular ? '#000' : '#fff',
                    border: p.popular ? 'none' : '1px solid var(--border)',
                    padding: '16px',
                    fontSize: '1rem',
                    opacity: loadingPlan ? 0.7 : 1,
                    cursor: loadingPlan ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loadingPlan === p.name ? <Loader2 size={18} className="spin" /> : null}
                  {loadingPlan === p.name ? 'Checking out...' : p.cta}
                </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <style dangerouslySetInnerHTML={{__html: `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </main>
  );
};

export default PricingPage;
