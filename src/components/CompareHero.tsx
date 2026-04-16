import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CompareHeroProps {
  competitorName: string;
  subtext: string;
}

export default function CompareHero({ competitorName, subtext }: CompareHeroProps) {
  return (
    <section style={{ padding: '8rem 2rem 4rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'inline-block', background: 'rgba(251, 176, 46, 0.1)', color: '#fbb02e', padding: '6px 16px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid rgba(251, 176, 46, 0.2)' }}>
        Compare Alternatives
      </div>
      <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
        The Best <span style={{ color: '#fbb02e' }}>{competitorName}</span> Alternative for 2024
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#888', lineHeight: '1.6', marginBottom: '2.5rem' }}>
        {subtext}
      </p>
      <Link href="/" style={{ background: '#fbb02e', color: '#000', padding: '16px 32px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s' }}>
        Try Rev.pro for Free <ArrowRight size={20} />
      </Link>
    </section>
  );
}
