import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="container" style={{ padding: '120px 0', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Terms and Conditions</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Last updated: April 9, 2026</p>
      
      <section style={{ padding: '0', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Use of Service</h2>
        <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
          By using Rev, you agree to these terms. You are allowed 3 free transcriptions total. After that, a subscription is required.
        </p>
      </section>

      <section style={{ padding: '0', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. Subscriptions</h2>
        <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
          Basic Plan is $5/month. Pro Plan is $15/month. Payments are processed via Stripe and are non-refundable after use.
        </p>
      </section>

      <section style={{ padding: '0', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. Limitation of Liability</h2>
        <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
          We provide transcription services "as is" and do not guarantee 100% accuracy, though we strive for 99% in clear audio environments.
        </p>
      </section>
      
      <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>← Back to Home</a>
    </div>
  );
}
