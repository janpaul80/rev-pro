'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div className="footer-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(300px, 2fr) repeat(4, 1fr)',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <style jsx>{`
            @media (max-width: 991px) {
              .footer-grid {
                grid-template-columns: 1fr 1fr !important;
                gap: 3rem 2rem !important;
              }
            }
            @media (max-width: 640px) {
              .footer-grid {
                grid-template-columns: 1fr !important;
                gap: 2.5rem !important;
              }
            }
          `}</style>
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <img src="/logo_revpro.png" alt="REV" style={{ height: '80px', width: 'auto' }} />
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
            <a
              href="https://github.com/janpaul80"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                color: '#666',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#fbb02e')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#666')}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.96.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hartmanndev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                color: '#666',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#fbb02e')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#666')}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.67v2.2h.05c.51-.96 1.76-1.97 3.63-1.97 3.88 0 4.6 2.56 4.6 5.89V24h-4V14.2c0-2.35-.04-5.38-3.28-5.38-3.28 0-3.78 2.56-3.78 5.21V24h-4V8z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://x.com/revprodev?s=21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              style={{
                color: '#666',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#fbb02e')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#666')}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.5 4.5L13.5 11.5l6 7c.4.4.4 1.1 0 1.5-.4.4-1.1.4-1.5 0l-6-7-6 7c-.4.4-1.1.4-1.5 0-.4-.4-.4-1.1 0-1.5l6-7-6-7c-.4-.4-.4-1.1 0-1.5.4-.4 1.1-.4 1.5 0l6 7 6-7c.4-.4 1.1-.4 1.5 0 .4.4.4 1.1 0 1.5z" />
              </svg>
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
