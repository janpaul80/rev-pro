'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SolutionHero from '@/components/SolutionHero';
import Features from '@/components/Features';
import { motion } from 'framer-motion';
import { Mic, Zap, Share2, FileAudio } from 'lucide-react';

export default function PodcastersPage() {
  return (
    <main>
      <Navbar />
      <SolutionHero 
        category="FOR PODCASTERS"
        title="Repurpose Your Podcast into"
        highlight="Viral Clips"
        subtitle="Turn long-form podcast audio and video into high-performing social media content. Extract transcripts, summaries, and viral hooks in seconds."
        benefits={[
          "99% Transcription Accuracy",
          "Automated Viral Hooks",
          "Multi-Platform Support",
          "One-Click Repurposing"
        ]}
      />

      <section style={{ padding: '80px 0', background: '#050505' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>The Podcasters <span style={{ color: '#fbb02e' }}>Workflow</span></h2>
            <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto' }}>Scale your distribution without increasing your editing hours.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { 
                icon: <FileAudio size={24} />, 
                title: "Import Anything", 
                desc: "Paste your YouTube podcast link or upload audio. Our parser handles the rest instantly." 
              },
              { 
                icon: <Zap size={24} />, 
                title: "AI Analysis", 
                desc: "Our AI identifies the 'Gold' in your episode—the most interesting quotes and segments." 
              },
              { 
                icon: <Mic size={24} />, 
                title: "Refined Voice", 
                desc: "Get a clean transcript that removes filler words and keeps your unique tone intact." 
              },
              { 
                icon: <Share2 size={24} />, 
                title: "Viral Export", 
                desc: "Generate viral hooks for TikTok, Reels, and Shorts based on your podcast's best moments." 
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
