'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SolutionHero from '@/components/SolutionHero';
import Features from '@/components/Features';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Zap, Target } from 'lucide-react';

export default function ViralHookGeneratorPage() {
  return (
    <main>
      <Navbar />
      <SolutionHero 
        category="AI POWER TOOL"
        title="AI-Powered"
        highlight="Viral Hook Generator"
        subtitle="Stop guessing. Our AI analyzes your transcript and extracts the high-retention hooks that drive algorithmic discovery on TikTok and Reels."
        benefits={[
          "Proven Viral Frameworks",
          "Audience Retention Focus",
          "Multiple Hook Variations",
          "Instant Generation"
        ]}
      />

      <section style={{ padding: '80px 0', background: '#050505' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Master the <span style={{ color: '#fbb02e' }}>First 3 Seconds</span></h2>
            <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto' }}>If you don't hook them, they scroll. We ensure you never miss an opportunity to go viral.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { 
                icon: <Sparkles size={24} />, 
                title: "Pattern Interruption", 
                desc: "Get hooks designed to stop the scroll and force the viewer to pay attention immediately." 
              },
              { 
                icon: <TrendingUp size={24} />, 
                title: "Algorithm Ready", 
                desc: "Hooks optimized for the TikTok and Reels recommendation engines based on trending structures." 
              },
              { 
                icon: <Zap size={24} />, 
                title: "3x More Hooks", 
                desc: "Our AI generates at least three different hook angles for every video so you can A/B test." 
              },
              { 
                icon: <Target size={24} />, 
                title: "Retention Logic", 
                desc: "Every hook is tied to the actual content of your transcript, ensuring the video delivers on its promise." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  padding: '2rem', 
                  borderRadius: '20px', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  textAlign: 'left'
                }}
              >
                <div style={{ color: '#fbb02e', marginBottom: '1.5rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: '#888', lineHeight: '1.6', fontSize: '0.95rem' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
        <Features />
      </div>
      <Footer />
    </main>
  );
}
