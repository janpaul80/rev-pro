import React from 'react';
import { Check, X } from 'lucide-react';

interface CompareFeature {
  feature: string;
  competitorValue: string | boolean;
  revValue: string | boolean;
}

interface CompareTableProps {
  competitorName: string;
  features: CompareFeature[];
}

export default function CompareTable({ competitorName, features }: CompareTableProps) {
  return (
    <div className="glass" style={{ padding: '3rem', borderRadius: '24px', border: '1px solid var(--border)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <div></div>
        <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '800', color: '#555' }}>{competitorName}</div>
        <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '800', color: '#fbb02e' }}>Rev.pro</div>
      </div>

      {features.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', padding: '1.5rem 0', borderBottom: i === features.length - 1 ? 'none' : '1px solid var(--border)', alignItems: 'center' }}>
          <div style={{ fontWeight: '600', color: '#ccc' }}>{row.feature}</div>
          <div style={{ textAlign: 'center', color: '#888' }}>
            {typeof row.competitorValue === 'boolean' ? (
              row.competitorValue ? <Check size={24} color="#4ade80" style={{ margin: '0 auto' }}/> : <X size={24} color="#ff4444" style={{ margin: '0 auto' }}/>
            ) : row.competitorValue}
          </div>
          <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>
            {typeof row.revValue === 'boolean' ? (
              row.revValue ? <Check size={24} color="#fbb02e" style={{ margin: '0 auto' }}/> : <X size={24} color="#555" style={{ margin: '0 auto' }}/>
            ) : row.revValue}
          </div>
        </div>
      ))}
    </div>
  );
}
