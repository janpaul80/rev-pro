'use client';

import React from 'react';
import { motion } from 'framer-motion';

const UseCases = () => {
  const cases = [
    {
      title: 'UGC Marketplaces',
      image: '/assets/ugc.png',
      description: 'Provide your creator network with high-performing templates from real-time data.'
    },
    {
      title: 'Solo Creators',
      image: '/assets/solo.png',
      description: 'Instant conversion from viral trends to structured, actionable scripts.'
    },
    {
      title: 'Agencies',
      image: '/assets/agencies.png',
      description: 'Automating high-performing script templates for creator rosters.'
    }
  ];

  return (
    <section id="use-cases" style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem' }}>Built for <span style={{ color: '#fbb02e' }}>Pros</span></h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {cases.map((useCase, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ height: '240px', overflow: 'hidden' }}>
                <img 
                  src={useCase.image} 
                  alt={useCase.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#fff' }}>{useCase.title}</h3>
                <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: '1.6' }}>{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
