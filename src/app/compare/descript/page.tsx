import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompareHero from '@/components/CompareHero';
import CompareTable from '@/components/CompareTable';
import { Metadata } from 'next';
import { Zap, Target, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Descript Alternative for Creators | Rev.pro',
  description: 'Looking for a faster, web-based Descript alternative? Rev.pro focuses perfectly on viral video transcription, AI script regeneration, and effortless bulk downloads.',
  // SEO optimization
  openGraph: {
    type: 'website',
    url: 'https://rev.pro/compare/descript',
    title: 'Descript Alternative for Creators | Rev.pro',
    description: 'Switch from Descript to Rev.pro for native web-based parsing, instant JSON/SRT generation, and high-volume limits.',
  }
};

export default function CompareDescriptPage() {
  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />

      <CompareHero 
        competitorName="Descript" 
        subtext="Don't get bogged down by heavy desktop applications. Rev.pro is a blazing-fast, web-only transcription engine specifically engineered for modern short-form platforms."
      />

      <section style={{ padding: '0 2rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <CompareTable 
          competitorName="Descript"
          features={[
            { feature: 'Core Focus', competitorValue: 'Video Editing', revValue: 'AI Script Extraction' },
            { feature: 'Architecture', competitorValue: 'Desktop Client', revValue: '100% Web Native' },
            { feature: 'Social Bulk Import', competitorValue: 'Hard', revValue: 'Up to 60 URLs/batch' },
            { feature: 'Viral AI Agents', competitorValue: false, revValue: true },
            { feature: 'Platform Formats', competitorValue: 'TXT, SRT, VTT', revValue: 'TXT, SRT, VTT, CSV' }
          ]}
        />
      </section>

      <section style={{ padding: '6rem 2rem', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem' }}>Why Pick Rev.pro Over Descript?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr) minmax(250px, 1fr)', gap: '2rem' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left' }}>
              <Zap color="#fbb02e" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Instant Web Access</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>No huge downloads spanning gigabytes. Drop your TikTok URL anywhere, anytime, completely in your browser.</p>
            </div>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left' }}>
              <Target color="#fbb02e" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Smarter Script Focus</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>Descript wants you to edit audio. We want you to analyze pacing and export the precise hooks that make videos jump algorithms.</p>
            </div>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left' }}>
              <Globe color="#fbb02e" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Deep Social Integrations</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>Natively integrated endpoints specific to TikTok, YouTube, and Instagram formatting constraints.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
