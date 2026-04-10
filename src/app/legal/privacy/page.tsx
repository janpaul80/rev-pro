import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container" style={{ padding: '120px 0', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Last updated: April 9, 2026</p>
      
      <section style={{ padding: '0', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
        <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
          We collect information you provide directly to us when you use Rev, including your email address (if you subscribe) and the URLs of TikTok videos you submit for transcription.
        </p>
      </section>

      <section style={{ padding: '0', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. How We Use Information</h2>
        <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
          We use the information we collect to provide, maintain, and improve our transcription services, and to process your subscription payments via Stripe.
        </p>
      </section>

      <section style={{ padding: '0', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. Data Security</h2>
        <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
          We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.
        </p>
      </section>
      
      <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>← Back to Home</a>
    </div>
  );
}
