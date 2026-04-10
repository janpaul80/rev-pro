'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Demonstration only: Form submission is currently disabled until domain activation.');
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <main style={{ background: '#000', color: '#fff' }}>
      <Navbar />
      
      <section style={{ paddingTop: '180px', paddingBottom: '100px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: '800' }}>
                Get in <span style={{ color: '#fbb02e' }}>Touch</span>.
              </h1>
              <p style={{ color: '#888', marginBottom: '3rem', fontSize: '1.2rem', lineHeight: '1.6' }}>
                Have a question about Rev Pro? Our team is here to help you scale your content production.
              </p>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required
                    style={{ background: '#0a0a0a', border: '1px solid var(--border)', padding: '18px', borderRadius: '12px', color: '#fff', outline: 'none' }}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    style={{ background: '#0a0a0a', border: '1px solid var(--border)', padding: '18px', borderRadius: '12px', color: '#fff', outline: 'none' }}
                  />
                </div>
                <textarea 
                  placeholder="How can we help?" 
                  rows={5}
                  required
                  style={{ background: '#0a0a0a', border: '1px solid var(--border)', padding: '18px', borderRadius: '12px', color: '#fff', outline: 'none', resize: 'none' }}
                />
                <button className="premium" style={{ alignSelf: 'flex-start', padding: '16px 48px', borderRadius: '12px', background: '#fbb02e', color: '#000', fontWeight: '800' }}>
                  Send Message
                </button>
                {status && <div style={{ color: '#888', fontSize: '0.9rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px' }}>{status}</div>}
              </form>
              
              <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: '700', marginBottom: '0.5rem' }}>Email Us</div>
                  <a href="mailto:hello@rev.pro" style={{ color: '#fbb02e', textDecoration: 'none' }}>hello@rev.pro</a>
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: '700', marginBottom: '0.5rem' }}>Call Us (Austria)</div>
                  <a href="tel:+436706034585" style={{ color: '#fbb02e', textDecoration: 'none' }}>+43 670 6034585</a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ textAlign: 'center' }}
            >
              <img 
                src="/assets/logo_light.png" 
                alt="REV PRO" 
                style={{ width: '100%', maxWidth: '500px', filter: 'drop-shadow(0 0 80px rgba(251,176,46,0.1))' }} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
