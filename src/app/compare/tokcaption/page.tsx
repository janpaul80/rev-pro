import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompareHero from '@/components/CompareHero';
import CompareTable from '@/components/CompareTable';
import { Metadata } from 'next';
import { Zap, Target, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TokCaption Alternative: Rev.pro vs TokCaption | Rev.pro',
  description: 'Looking for a TokCaption alternative? Discover why top creators and agencies choose Rev.pro for faster transcriptions, bulk imports, and built-in AI script rewriting.',
};

const CompareTokCaptionPage = () => {
  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />

      <CompareHero 
        competitorName="TokCaption"
        subtext="Stop paying per word. Rev.pro gives you unlimited transcripts, superior AI tools, and bulk processing in one seamless dashboard. See how we stack up."
      />

      <section style={{ padding: '0 2rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <CompareTable 
          competitorName="TokCaption"
          features={[
            { feature: 'Supported Platforms', competitorValue: 'TikTok & IG', revValue: 'TikTok, IG, YouTube' },
            { feature: 'Pricing Model', competitorValue: 'Credit Based (Expensive)', revValue: 'Flat Monthly Tiers' },
            { feature: 'Bulk Import', competitorValue: 'Limited', revValue: 'Up to 60 URLs/batch' },
            { feature: 'Export Formats', competitorValue: 'TXT, SRT', revValue: 'TXT, SRT, VTT, CSV' },
            { feature: 'AI Script Rewriter', competitorValue: 'Basic', revValue: 'Advanced (Langdock)' },
            { feature: 'Viral Hook Generator', competitorValue: false, revValue: true },
            { feature: 'Virality Explainer', competitorValue: false, revValue: true }
          ]}
        />
      </section>

      <section style={{ padding: '6rem 2rem', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem' }}>Why Creators Switch</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr) minmax(250px, 1fr)', gap: '2rem' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left' }}>
              <DollarSign color="#fbb02e" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Predictable Pricing</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>Don't get punished for success. Our flat monthly tiers mean you can parse as many videos as you need.</p>
            </div>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left' }}>
              <Zap color="#fbb02e" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Smarter AI Agents</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>Our integrated Langdock agents don't just transcribe—they reverse-engineer virality and rewrite hooks.</p>
            </div>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left' }}>
              <Target color="#fbb02e" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Universal Parsing</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>TokCaption is limited. Rev.pro handles TikTok, Instagram Reels, and YouTube Shorts natively.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CompareTokCaptionPage;
