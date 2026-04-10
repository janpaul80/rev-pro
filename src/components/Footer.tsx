'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <img src="/assets/logo_light.png" alt="REV" style={{ height: '60px', width: 'auto' }} />
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
              The premium way to transcribe and repurpose short-form content.
            </p>
          </div>
          
          <div>
            <div style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>Products</div>
            <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/products/tiktok" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>TikTok Transcript</a></li>
              <li><a href="/products/youtube" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>YouTube Transcript</a></li>
              <li><a href="/products/instagram" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Instagram Transcript</a></li>
              <li><a href="/products/chrome-extension" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Chrome Extension</a></li>
            </ul>
          </div>
          
          <div>
            <div style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>Company</div>
            <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/about" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>About Us</a></li>
              <li><a href="/pricing" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Pricing</a></li>
              <li><a href="/contact" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Contact</a></li>
            </ul>
          </div>
          
          <div>
            <div style={{ fontWeight: '600', marginBottom: '1.5rem' }}>Legal</div>
            <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/legal/privacy" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Privacy Policy</a></li>
              <li><a href="/legal/terms" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Terms and Conditions</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: '#444', 
          fontSize: '0.8rem',
          borderTop: '1px solid var(--border)',
          paddingTop: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>© 2026 Rev. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Twitter</span>
            <span>LinkedIn</span>
            <span>GitHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
