import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompareHero from '@/components/CompareHero';
import CompareTable from '@/components/CompareTable';
import { Metadata } from 'next';
import { Zap, Play, LayoutGrid } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Opus Clip Alternative: Rev.pro AI Extractor | Rev.pro',
  description: 'Searching for an Opus Clip alternative? Rev.pro guarantees superior script replication, deeper control over Hook generation, and flat SaaS pricing.',
  openGraph: {
    type: 'website',
    url: 'https://rev.pro/compare/opus-clip',
    title: 'Opus Clip Alternative vs Rev.pro',
    description: 'Bypass Opus Clip limits with flat monthly pricing, 60-count bulk URL ingestion, and deeper focus on viral retention algorithms.',
  }
};

export default function CompareOpusPage() {
  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />

      <CompareHero 
        competitorName="Opus Clip" 
        subtext="Don't get trapped paying per processing minute for automated clips you don't control. Rev.pro provides unlimited macro script extraction so you can direct the final content perfectly."
      />

      <section style={{ padding: '0 2rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <CompareTable 
          competitorName="Opus Clip"
          features={[
            { feature: 'Core Focus', competitorValue: 'Auto Clipping', revValue: 'Script Extraction & Writing' },
            { feature: 'Billing Mechanics', competitorValue: 'Per Minute Processed', revValue: 'Flat Unlimited Tiers' },
            { feature: 'Virality Engine', competitorValue: 'Opus AI Score', revValue: 'Langdock Contextual Explainer' },
            { feature: 'Reverse Engineering', competitorValue: false, revValue: true },
            { feature: 'Bulk Download Links', competitorValue: false, revValue: true }
          ]}
        />
      </section>

      <section style={{ padding: '6rem 2rem', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem' }}>Stop Outsourcing Your Creative Vision</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr) minmax(250px, 1fr)', gap: '2rem' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left' }}>
              <LayoutGrid color="#fbb02e" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Maintain Creative Control</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>Don't let rigid AI clip selectors ruin your momentum. Extract the script via Rev.pro and build exactly the pacing you need.</p>
            </div>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left' }}>
              <Zap color="#fbb02e" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Never Pay Per Minute</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>Audio processing caps mean you spend hundreds replicating workflows. Our unlimited plans mean freedom to transcribe endless reference material.</p>
            </div>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left' }}>
              <Play color="#fbb02e" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Download Raw Video</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>Opus hides the native output. Rev.pro gives you straight watermark-free bulk downloads so you can edit in CapCut immediately.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
