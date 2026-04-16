import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, Zap, LayoutGrid, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transcription & Script Rewriting for Marketing Agencies | Rev.pro',
  description: 'Scale your short-form video agency with Rev.pro. Bulk import 60 URLs, extract viral hooks, and generate scripts 10x faster for your clients.',
};

const AgenciesPage = () => {
  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '8rem 2rem 4rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: 'rgba(251, 176, 46, 0.1)', color: '#fbb02e', padding: '6px 16px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid rgba(251, 176, 46, 0.2)' }}>
          Solutions for Agencies
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Scale your Content Agency <span style={{ color: '#fbb02e' }}>10x Faster</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#888', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          Stop wasting hours writing scripts manually. Bulk reverse-engineer the top-performing TikToks and Reels in your client's niche.
        </p>
        <Link href="/pricing" style={{ background: '#fbb02e', color: '#000', padding: '16px 32px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s' }}>
          View Bulk & Pro Plans <ArrowRight size={20} />
        </Link>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <div style={{ padding: '1rem', background: '#111', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
              <LayoutGrid size={32} color="#fbb02e" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Bulk Processing</h3>
            <p style={{ color: '#888', lineHeight: '1.6' }}>
              Paste up to 60 URLs from TikTok, YouTube Shorts, or Instagram Reels at once. We'll extract, transcribe, and compile all the data into a clean CSV format for your team.
            </p>
          </div>

          <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <div style={{ padding: '1rem', background: '#111', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
              <Zap size={32} color="#fbb02e" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>AI Script Rewriting</h3>
            <p style={{ color: '#888', lineHeight: '1.6' }}>
              Let our Langdock AI agents perfectly structure the scripts. We maintain the fast pacing, update the hooks, and provide customized analysis to guarantee high retention rates.
            </p>
          </div>

          <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <div style={{ padding: '1rem', background: '#111', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
              <Briefcase size={32} color="#fbb02e" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Agency Exports</h3>
            <p style={{ color: '#888', lineHeight: '1.6' }}>
              Export to .TXT, .SRT, .VTT, or .CSV seamlessly in the browser. You can even access HD watermark-free video downloads for ultimate flexibility in Premiere and CapCut.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Checklist */}
      <section style={{ padding: '6rem 2rem' }}>
        <div className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center' }}>The Agency Advantage</h2>
          {[
            'Eliminate manual transcription data entry.',
            'Identify viral hooks instantly with our Virality Explainer.',
            'Never hit an API paywall with unlimited Pro transcriptions.',
            'Turn junior scriptwriters into master storytellers.',
            'Onboard more clients without scaling headcount.'
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: i === 4 ? 'none' : '1px solid var(--border)' }}>
              <CheckCircle2 color="#fbb02e" size={24} />
              <span style={{ fontSize: '1.1rem', color: '#ccc' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AgenciesPage;
