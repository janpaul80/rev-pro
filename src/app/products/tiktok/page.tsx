'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Zap, Smartphone, Search } from 'lucide-react';
import Link from 'next/link';

const TikTokProduct = () => {
  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      
      <section style={{ paddingTop: '160px', paddingBottom: '100px' }}>
        <div className="container">
          <Link href="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: '#666', 
            textDecoration: 'none', 
            marginBottom: '2rem',
            fontSize: '0.9rem',
            transition: 'color 0.2s'
          }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '4rem', 
            alignItems: 'center' 
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ color: '#fbb02e', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.2em' }}>
                Precision Transcription
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', marginBottom: '2rem' }}>
                Turn <span style={{ color: '#fbb02e' }}>TikToks</span> into <br />Viral Scripts.
              </h1>
              <p style={{ color: '#888', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '500px' }}>
                Extract every word from short-form content with 99.9% accuracy. Repurpose trending audio into your next big piece of content instantly.
              </p>
              
              <a href="/" className="premium" style={{ 
                display: 'inline-block',
                padding: '16px 40px', 
                fontSize: '1.1rem', 
                textDecoration: 'none',
                background: '#fff',
                color: '#000',
                borderRadius: '12px',
                fontWeight: '700',
                boxShadow: '0 0 30px rgba(251, 176, 46, 0.2)'
              }}>
                Try the Tool Free
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle, rgba(251,176,46,0.1) 0%, transparent 70%)',
                zIndex: 0
              }} />
              <img 
                src="/assets/product-tiktok.png" 
                alt="TikTok Transcription Interface" 
                style={{ width: '100%', borderRadius: '24px', border: '1px solid rgba(251,176,46,0.15)', position: 'relative', zIndex: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="glass" style={{ margin: '4rem 0', padding: '100px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '4rem', fontWeight: '800' }}>Why Transcribe <span style={{ color: '#fbb02e' }}>TikToks</span>?</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2.5rem' 
          }}>
            <div className="glow-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#fbb02e', marginBottom: '1.5rem' }}><Zap size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Trend Analysis</h3>
              <p style={{ color: '#666' }}>Identify the exact keywords making videos go viral in real-time.</p>
            </div>
            <div className="glow-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#fbb02e', marginBottom: '1.5rem' }}><Smartphone size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Repurposing</h3>
              <p style={{ color: '#666' }}>Turn short-form speech into blog posts, tweets, or long-form scripts.</p>
            </div>
            <div className="glow-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#fbb02e', marginBottom: '1.5rem' }}><Search size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>SEO Boost</h3>
              <p style={{ color: '#666' }}>Maximize reach by adding accurate closed captions to every upload.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TikTokProduct;
