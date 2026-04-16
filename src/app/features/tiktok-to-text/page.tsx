'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SolutionHero from '@/components/SolutionHero';
import Features from '@/components/Features';
import { motion } from 'framer-motion';
import { FileText, Copy, Download, Search } from 'lucide-react';

export default function TikTokToTextPage() {
  return (
    <main>
      <Navbar />
      <SolutionHero 
        category="PREMIUM FEATURE"
        title="Best-in-Class"
        highlight="TikTok to Text"
        subtitle="Convert any TikTok video into a high-accuracy transcript in seconds. Export as TXT, SRT, or PDF for repurposing and accessibility."
        benefits={[
          "Instant Processing",
          "Handles Multi-Speaker",
          "Automatic Punctuation",
          "Free Plan Available"
        ]}
      />

      <section style={{ padding: '80px 0', background: '#050505' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Extract Text <span style={{ color: '#fbb02e' }}>Instantly</span></h2>
            <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto' }}>The fastest way to get searchable text from your favorite short-form videos.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { 
                icon: <FileText size={24} />, 
                title: "Transcript Export", 
                desc: "Get a clean text file of your TikTok audio. Perfect for blog posts, newsletters, and scripts." 
              },
              { 
                icon: <Copy size={24} />, 
                title: "One-Click Copy", 
                desc: "Quickly copy interesting quotes or the entire transcript to your clipboard." 
              },
              { 
                icon: <Download size={24} />, 
                title: "Subtitles (SRT/VTT)", 
                desc: "Need captions for your own edit? Export time-stamped files compatible with Premiere and CapCut." 
              },
              { 
                icon: <Search size={24} />, 
                title: "Searchable Content", 
                desc: "Archive your video ideas and search through them with text instead of re-watching hours of footage." 
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
