'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface SolutionHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
  benefits: string[];
  ctaText?: string;
  ctaHref?: string;
  category?: string;
}

export default function SolutionHero({ 
  title, 
  highlight, 
  subtitle, 
  benefits, 
  ctaText = "Start Transcribing for Free", 
  ctaHref = "/",
  category = "PRO SOLUTION" 
}: SolutionHeroProps) {
  return (
    <section style={{ 
      paddingTop: '160px', 
      paddingBottom: '100px',
      textAlign: 'center',
      background: 'radial-gradient(circle at top, rgba(251,176,46,0.05) 0%, transparent 50%)' 
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            display: 'inline-block', 
            background: 'rgba(251,176,46,0.1)', 
            color: '#fbb02e', 
            padding: '6px 16px', 
            borderRadius: '24px', 
            fontSize: '0.75rem', 
            fontWeight: '800', 
            letterSpacing: '0.05em',
            marginBottom: '2rem',
            border: '1px solid rgba(251,176,46,0.2)'
          }}
        >
          {category}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.02em' }}
        >
          {title} <span style={{ color: '#fbb02e' }}>{highlight}</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ color: '#888', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.6' }}
        >
          {subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap' }}
        >
          {benefits.map((benefit, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ccc', fontSize: '0.95rem' }}>
              <CheckCircle size={18} style={{ color: '#fbb02e' }} />
              {benefit}
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link 
            href={ctaHref} 
            className="premium" 
            style={{ 
              padding: '18px 40px', 
              fontSize: '1.1rem', 
              borderRadius: '16px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px',
              textDecoration: 'none'
            }}
          >
            {ctaText} <ArrowRight size={22} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
