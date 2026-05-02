'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('revpro-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (type: 'allow' | 'deny') => {
    localStorage.setItem('revpro-cookie-consent', type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            right: '24px',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div className="glass" style={{
            padding: '1.5rem',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ 
                background: 'rgba(251,176,46,0.1)', 
                padding: '10px', 
                borderRadius: '10px',
                color: '#fbb02e'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" /><path d="M12 12v.01" /><path d="M11 17v.01" /><path d="M7 14v.01" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>Cookie Settings</h4>
                <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  We use cookies to enhance your experience and analyze our traffic. Please choose your preference to continue.
                </p>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'flex-end',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => handleAction('deny')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ccc',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                Deny
              </button>
              <button 
                onClick={() => handleAction('allow')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  background: '#fbb02e',
                  border: 'none',
                  color: '#000',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Allow Cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
