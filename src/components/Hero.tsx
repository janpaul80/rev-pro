'use client';

import React from 'react';
import TranscriptionApp from './TranscriptionApp';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section style={{ 
      paddingTop: '160px', 
      textAlign: 'center',
      background: 'radial-gradient(circle at top, rgba(251,176,46,0.03) 0%, transparent 50%)' 
    }}>
      <div className="container">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: '800' }}
        >
          <span style={{ color: '#fbb02e' }}>Transcribe</span> Any Content<br/>into Text Instantly.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ color: '#888', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}
        >
          Turn TikTok, YouTube, and Instagram videos into reusable text with 99% accuracy. Built for <span style={{ color: '#fbb02e' }}>professionals</span>.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}
        >
          <a href="/pricing" style={{ 
            padding: '14px 32px', 
            fontSize: '1rem', 
            textDecoration: 'none',
            background: '#fff',
            color: '#000',
            borderRadius: '12px',
            fontWeight: '700',
            transition: 'transform 0.2s',
            boxShadow: '0 0 20px rgba(251, 176, 46, 0.15)'
          }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            Get Premium Access
          </a>
          <a href="/signup" style={{ 
            padding: '14px 32px', 
            fontSize: '1rem', 
            textDecoration: 'none',
            background: 'transparent',
            color: '#fff',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
            Sign Up
          </a>
        </motion.div>
        
        <TranscriptionApp />
        
        <div style={{ marginTop: '1.5rem', color: '#555', fontSize: '0.9rem', fontWeight: '500' }}>
          3 FREE USES TOTAL • NO CREDIT CARD REQUIRED
        </div>
      </div>
    </section>
  );
};

export default Hero;
