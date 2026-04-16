import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DocumentationPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ padding: '160px 20px 80px', maxWidth: '800px', margin: '0 auto', flexGrow: 1, width: '100%' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>API Documentation</h1>
        <p style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Welcome to the Rev Pro API documentation. Below you will find all the endpoints and information necessary to integrate our transcription engine programmatically into your own workflows.
        </p>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fbb02e', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
            Authentication
          </h2>
          <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '1rem' }}>
            To use the API, you need to first generate an API Key from your <a href="/settings/api" style={{ color: '#fbb02e', textDecoration: 'underline' }}>Settings Dashboard</a>.
          </p>
          <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '1rem' }}>
            All requests to the API must include this key in the <code>Authorization</code> header using the Bearer scheme.
          </p>
          <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222', fontFamily: 'monospace', color: '#0f0' }}>
            Authorization: Bearer rev_live_your_api_key_here
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fbb02e', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
            Endpoints
          </h2>
          
          <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: '#111' }}>
              <span style={{ padding: '16px 24px', background: '#fbb02e', color: '#000', fontWeight: 'bold' }}>POST</span>
              <span style={{ padding: '16px 24px', color: '#fff', fontFamily: 'monospace' }}>/api/v1/transcribe</span>
            </div>
            
            <div style={{ padding: '24px' }}>
              <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
                Initiates a new transcription job for a given social media or video URL.
              </p>
              
              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Request Body (JSON)</h4>
              <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222', fontFamily: 'monospace', color: '#ccc', marginBottom: '1.5rem' }}>
<pre style={{ margin: 0 }}>
{`{
  "url": "https://www.tiktok.com/@creator/video/1234567",
  "webhook_url": "https://your-domain.com/webhook" // Optional
}`}
</pre>
              </div>

              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Success Response</h4>
              <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222', fontFamily: 'monospace', color: '#ccc' }}>
<pre style={{ margin: 0 }}>
{`{
  "success": true,
  "job_id": "tr_8f92a1...",
  "status": "processing"
}`}
</pre>
              </div>
            </div>
          </div>
          
          <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: '#111' }}>
              <span style={{ padding: '16px 24px', background: '#4ade80', color: '#000', fontWeight: 'bold' }}>GET</span>
              <span style={{ padding: '16px 24px', color: '#fff', fontFamily: 'monospace' }}>/api/v1/jobs/:job_id</span>
            </div>
            
            <div style={{ padding: '24px' }}>
              <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
                Retrieves the status and result of a transcription job.
              </p>

              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Success Response (Completed)</h4>
              <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222', fontFamily: 'monospace', color: '#ccc' }}>
<pre style={{ margin: 0 }}>
{`{
  "id": "tr_8f92a1...",
  "status": "completed",
  "transcript": "[00:00] Hi everyone...",
  "refined": "Headline: Master Your Content...",
  "platform": "tiktok"
}`}
</pre>
              </div>
            </div>
          </div>
        </section>
        
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fbb02e', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
            Rate Limits
          </h2>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>
            API usage is bound by your current subscription tier. Pro Tier accounts have access to higher rate limits (100 concurrent requests). Basic Tier is capped at 10 concurrent requests. Excessive polling will result in a <code>429 Too Many Requests</code> response. Consider using the <code>webhook_url</code> parameter to receive payload deliveries asynchronously instead.
          </p>
        </section>

      </div>
      
      <Footer />
    </main>
  );
}
