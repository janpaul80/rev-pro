'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
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
          <img src="/assets/logo_light.png" alt="REV PRO" style={{ height: '100px', width: 'auto' }} />
        </Link>
        
        <div style={{ display: 'flex', gap: '2.5rem', fontSize: '1rem', color: '#999', alignItems: 'center' }}>
          <Link href="/about" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#999'}>About</Link>
          <Link href="/pricing" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#999'}>Pricing</Link>
          <Link href="/contact" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#999'}>Contact</Link>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/login" style={{ 
            transition: 'all 0.2s', 
            padding: '10px 24px', 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>Login</Link>
          <Link href="/signup" style={{ 
            padding: '10px 28px', 
            fontSize: '0.9rem', 
            textDecoration: 'none',
            background: '#fff',
            color: '#000',
            borderRadius: '8px',
            fontWeight: '700',
            transition: 'all 0.2s'
          }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
