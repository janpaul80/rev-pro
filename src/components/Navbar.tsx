'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact Sales', href: '/contact-sales', highlight: true },
  ];

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100,
      padding: '0.75rem 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo_revpro.png" alt="REV PRO" style={{ height: '60px', width: 'auto' }} />
        </Link>
        
        {/* Desktop Links */}
        <div className="nav-links-desktop" style={{ display: 'flex', gap: '2.5rem', fontSize: '0.95rem', color: '#999', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              style={{ 
                transition: 'color 0.2s',
                color: link.highlight ? '#fbb02e' : undefined,
                fontWeight: link.highlight ? '600' : '400'
              }} 
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'} 
              onMouseOut={(e) => e.currentTarget.style.color = link.highlight ? '#fbb02e' : '#999'}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-auth-desktop" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/login" style={{ 
            transition: 'all 0.2s', 
            padding: '10px 24px', 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>Login</Link>
          <Link href="/signup" style={{ 
            padding: '10px 28px', 
            fontSize: '0.85rem', 
            textDecoration: 'none',
            background: '#fff',
            color: '#000',
            borderRadius: '8px',
            fontWeight: '700',
            transition: 'all 0.2s'
          }}>
            Sign Up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden',
              background: '#000',
              borderTop: '1px solid var(--border)',
              marginTop: '0.75rem'
            }}
          >
            <div className="container" style={{ padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    fontSize: '1.1rem',
                    color: link.highlight ? '#fbb02e' : '#fff',
                    fontWeight: link.highlight ? '600' : '500'
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }} />
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.1rem', color: '#fff' }}>Login</Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} style={{ 
                padding: '14px', 
                textAlign: 'center',
                background: '#fff',
                color: '#000',
                borderRadius: '8px',
                fontWeight: '700'
              }}>
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 991px) {
          .nav-links-desktop, .nav-auth-desktop {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
