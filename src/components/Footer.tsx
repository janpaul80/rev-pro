'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(300px, 2fr) repeat(4, 1fr)',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <img src="/assets/logo_light.png" alt="REV" style={{ height: '100px', width: 'auto' }} />
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '260px' }}>
              The premium way to transcribe and repurpose short-form content.
            </p>
          </div>
          
          <div>
            <div style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>Products</div>
            <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/products/tiktok" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>TikTok Transcript</a></li>
              <li><a href="/products/youtube" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>YouTube Transcript</a></li>
              <li><a href="/products/instagram" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Instagram Transcript</a></li>
              <li><a href="/products/podcasters" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Podcasters <span style={{fontSize:'0.65rem', background: 'rgba(251,176,46,0.1)', color: '#fbb02e', padding: '2px 6px', borderRadius: '4px', verticalAlign: 'middle', marginLeft: '4px'}}>NEW</span></a></li>
              <li><a href="/products/educators" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Educators</a></li>
              <li><a href="/products/agencies" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>For Agencies</a></li>
            </ul>
          </div>
          
          <div>
            <div style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>Features</div>
            <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/features/tiktok-to-text" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>TikTok to Text</a></li>
              <li><a href="/features/viral-hook-generator" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Viral Hook Generator</a></li>
              <li><a href="/dashboard" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Agency Folders</a></li>
              <li><a href="/products/chrome-extension" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Chrome Extension</a></li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>Compare</div>
            <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/compare/tokcaption" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>vs TokCaption</a></li>
              <li><a href="/compare/descript" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>vs Descript</a></li>
              <li><a href="/compare/opus-clip" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>vs Opus Clip</a></li>
            </ul>
          </div>
          
          <div>
            <div style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>Legal</div>
            <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/legal/privacy" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Privacy</a></li>
              <li><a href="/legal/terms" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Terms</a></li>
              <li><a href="/contact" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fbb02e'} onMouseOut={(e) => e.currentTarget.style.color = '#666'}>Contact</a></li>
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
