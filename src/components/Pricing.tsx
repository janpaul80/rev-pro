import React from 'react';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for exploring.',
    features: ['3 total transcriptions', '99% accuracy', 'TikTok, YT, IG support'],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Basic',
    price: '5',
    description: 'For casual content creators.',
    features: ['Unlimited transcriptions', 'Priority queue', 'Email support', 'Ad-free experience'],
    cta: 'Choose Basic',
    popular: true
  },
  {
    name: 'Pro',
    price: '15',
    description: 'For professional marketers.',
    features: ['Everything in Basic', 'AI content repurposing', 'Bulk processing', 'Export as SRT/VTT', '24/7 Priority support'],
    cta: 'Choose Pro',
    popular: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" style={{ background: '#050505' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Simple Pricing.</h2>
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
              zIndex: p.popular ? 10 : 1
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#666', marginBottom: '1rem' }}>{p.name}</div>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: '700' }}>${p.price}</span>
                <span style={{ color: '#666' }}>/mo</span>
              </div>
              <p style={{ color: '#888', marginBottom: '2rem', height: '3rem' }}>{p.description}</p>
              
              <ul style={{ listStyle: 'none', marginBottom: '3rem' }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ color: '#ccc', marginBottom: '0.75rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#fff' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              
              <button 
                className="premium" 
                style={{ 
                  width: '100%', 
                  background: p.popular ? '#fff' : 'transparent',
                  color: p.popular ? '#000' : '#fff',
                  border: p.popular ? 'none' : '1px solid var(--border)'
                }}
              >
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
