'use client';

import React, { useState } from 'react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Demonstration only: Form submission is currently disabled until domain activation.');
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <section id="contact" style={{ padding: '120px 0', background: '#000' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: '800' }}>Get in Touch.</h2>
            <p style={{ color: '#888', marginBottom: '3rem', fontSize: '1.1rem' }}>
              Have a question about Rev Pro? Our team is here to help you scale your content.
            </p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  style={{ background: '#0a0a0a', border: '1px solid var(--border)', padding: '16px', borderRadius: '12px', color: '#fff', outline: 'none' }}
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  style={{ background: '#0a0a0a', border: '1px solid var(--border)', padding: '16px', borderRadius: '12px', color: '#fff', outline: 'none' }}
                />
              </div>
              <textarea 
                placeholder="How can we help?" 
                rows={5}
                required
                style={{ background: '#0a0a0a', border: '1px solid var(--border)', padding: '16px', borderRadius: '12px', color: '#fff', outline: 'none', resize: 'none' }}
              />
              <button className="premium" style={{ alignSelf: 'flex-start', padding: '14px 40px', borderRadius: '12px' }}>
                Send Message
              </button>
              {status && <div style={{ color: '#888', fontSize: '0.9rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px' }}>{status}</div>}
            </form>
            
            <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem' }}>
              <div>
                <div style={{ color: '#fff', fontWeight: '700', marginBottom: '0.5rem' }}>Email Us</div>
                <a href="mailto:hello@rev.pro" style={{ color: '#666' }}>hello@rev.pro</a>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: '700', marginBottom: '0.5rem' }}>Call Us (Austria)</div>
                <a href="tel:+436706034585" style={{ color: '#666' }}>+43 670 6034585</a>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <img 
              src="/assets/logo_light.png" 
              alt="REV PRO" 
              style={{ width: '100%', maxWidth: '450px', filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.05))' }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
