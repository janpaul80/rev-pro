'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div 
      ref={containerRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      className="glass"
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        overflow: 'hidden',
        borderRadius: '24px',
        cursor: 'col-resize',
        touchAction: 'none'
      }}
    >
      {/* "After" Image (The new way) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem', fontWeight: '700', letterSpacing: '0.1em' }}>AFTER REV</div>
          <div style={{ 
            background: 'rgba(255,255,255,0.02)', 
            padding: '2.5rem 1.5rem', 
            borderRadius: '20px', 
            border: '1px solid var(--border)',
            boxShadow: '0 0 50px rgba(255,255,255,0.05)',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff', fontWeight: '800' }}>15 Min</h3>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>Total Research Time</p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ background: '#222', padding: '6px 12px', borderRadius: '6px', fontSize: '0.7rem', color: '#fff' }}>AI Hook Gen</div>
              <div style={{ background: '#222', padding: '6px 12px', borderRadius: '6px', fontSize: '0.7rem', color: '#fff' }}>Bulk Export</div>
            </div>
          </div>
          <p style={{ marginTop: '1.5rem', color: '#ccc', maxWidth: '280px', fontSize: '0.9rem', margin: '1.5rem auto 0' }}>
            Pull your top 5 scripts, generate 20 hooks, and have a full script written in once.
          </p>
        </div>
      </div>

      {/* "Before" Image (The old way) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${sliderPos}%`,
        height: '100%',
        background: '#000',
        overflow: 'hidden',
        zIndex: 2,
        borderRight: '2px solid #fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}>
        <div style={{ textAlign: 'center', width: '100%', minWidth: '320px' }}>
          <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem', fontWeight: '700', letterSpacing: '0.1em' }}>BEFORE REV</div>
          <div style={{ 
            opacity: 0.5,
            padding: '2.5rem 1.5rem', 
            borderRadius: '20px', 
            border: '1px solid rgba(255,255,255,0.1)',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>12+ Hrs</h3>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>Manual Research Time</p>
          </div>
          <p style={{ marginTop: '1.5rem', color: '#666', maxWidth: '280px', fontSize: '0.9rem', margin: '1.5rem auto 0' }}>
            Try to remember what made your last video work, guess at a hook, write something, delete it, start over.
          </p>
        </div>
      </div>

      {/* Slider Handle */}
      <div style={{
        position: 'absolute',
        left: `${sliderPos}%`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        width: '40px',
        height: '40px',
        background: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '2px', height: '12px', background: '#000' }}></div>
          <div style={{ width: '2px', height: '12px', background: '#000' }}></div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
