'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SolutionHero from '@/components/SolutionHero';
import Features from '@/components/Features';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Clock, Layout } from 'lucide-react';

export default function EducatorsPage() {
  return (
    <main>
      <Navbar />
      <SolutionHero 
        category="FOR EDUCATORS"
        title="Transform Your Lectures into"
        highlight="Study Guides"
        subtitle="Automate your course preparation. Convert video lectures and workshops into structured summaries, outlines, and searchable transcripts."
        benefits={[
          "Auto-Formatted Outlines",
          "Searchable Course Material",
          "Time-Stamped Transcripts",
          "Multilingual Support"
        ]}
      />

      <section style={{ padding: '80px 0', background: '#050505' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>The Educator's <span style={{ color: '#fbb02e' }}>Toolkit</span></h2>
            <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto' }}>Reduce the administrative overhead of content creation and student support.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { 
                icon: <GraduationCap size={24} />, 
                title: "Lecture-to-Text", 
                desc: "Get word-for-word accuracy of your classes, webinars, and tutorials. Perfect for accessibility." 
              },
              { 
                icon: <BookOpen size={24} />, 
                title: "Smart Summaries", 
                desc: "Don't just transcribe—summarize. Get the core concepts and key terms extracted automatically." 
              },
              { 
                icon: <Layout size={24} />, 
                title: "Structured Outlines", 
                desc: "Our AI breaks down long videos into logical chapters and bulleted notes for your students." 
              },
              { 
                icon: <Clock size={24} />, 
                title: "Saves Hours Weekly", 
                desc: "Convert your existing content library into a knowledge base without manual typing." 
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
