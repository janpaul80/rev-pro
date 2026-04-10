import React from 'react';
import { Zap, Globe, Repeat, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Speed and Accuracy',
    description: 'AI tools provide near-instant transcripts with high accuracy, even in noisy environments.'
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Many tools handle multiple languages and slang, making them suitable for global content.'
  },
  {
    icon: Repeat,
    title: 'Content Repurposing',
    description: 'Transcripts can be used to create blogs, captions, or marketing materials, saving time.'
  },
  {
    icon: Shield,
    title: 'Free and Accessible',
    description: 'Most tools are completely free, require no login, and work on any device and platform.'
  }
];

const Features = () => {
  return (
    <section id="features" style={{ background: '#050505' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Powerful <span style={{ color: '#fbb02e' }}>Features</span>.</h2>
          <p style={{ color: '#666' }}>Everything you need to analyze and repurpose viral content.</p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="glow-card" style={{ padding: '2.5rem' }}>
                <div style={{ color: '#fbb02e', marginBottom: '1.5rem' }}><Icon size={28} /></div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{f.title}</h3>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
