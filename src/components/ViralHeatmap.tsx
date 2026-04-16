'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid
} from 'recharts';
import { motion } from 'framer-motion';
import { Flame, Info } from 'lucide-react';

interface HeatmapData {
  second: number;
  score: number;
  label: string;
}

interface ViralHeatmapProps {
  data: HeatmapData[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const mins = Math.floor(item.second / 60);
    const secs = (item.second % 60).toString().padStart(2, '0');
    return (
      <div className="glass" style={{ padding: '10px 15px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
        <p style={{ margin: 0, color: '#888', marginBottom: '4px' }}>⏱ Time: {mins}:{secs}</p>
        <p style={{ margin: 0, fontWeight: '700', color: '#fbb02e' }}>🔥 Engagement: {item.score}%</p>
        <p style={{ margin: 0, marginTop: '4px', fontSize: '0.75rem', color: '#fff' }}>Insight: {item.label}</p>
      </div>
    );
  }
  return null;
};

export default function ViralHeatmap({ data }: ViralHeatmapProps) {
  if (!data || data.length === 0) return null;

  const avgScore = Math.round(data.reduce((acc, curr) => acc + curr.score, 0) / data.length);
  const maxScore = Math.max(...data.map(d => d.score));
  const peakSegment = data.find(d => d.score === maxScore);
  const peakMins = Math.floor((peakSegment?.second ?? 0) / 60);
  const peakSecs = ((peakSegment?.second ?? 0) % 60).toString().padStart(2, '0');
  const highEngagementCount = data.filter(d => d.score > 85).length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ 
        background: 'rgba(255, 255, 255, 0.02)', 
        borderRadius: '20px', 
        border: '1px solid var(--border)',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Flame size={20} color="#fbb02e" /> Viral Retention Heatmap
          </h3>
          <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '6px', marginBottom: 0 }}>AI-powered predictive engagement analysis across 10-second segments.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fbb02e' }}>{avgScore}%</div>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#444', letterSpacing: '0.05em' }}>Avg Viral Potential</div>
        </div>
      </div>

      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorViral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbb02e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fbb02e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="second" hide={true} />
            <YAxis hide={true} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#fbb02e" 
              fillOpacity={1} 
              fill="url(#colorViral)" 
              strokeWidth={3}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>⚡ Peak Hook</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{peakMins}:{peakSecs}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>🔥 Hot Segments</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{highEngagementCount} of {data.length}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>📊 Peak Score</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{maxScore}%</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>🎯 Viral Rating</div>
          <div style={{ 
            fontSize: '0.9rem', 
            fontWeight: '700', 
            color: avgScore >= 80 ? '#4ade80' : avgScore >= 60 ? '#fbb02e' : '#f87171' 
          }}>
            {avgScore >= 80 ? 'Excellent' : avgScore >= 60 ? 'Good' : 'Needs Work'}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#444', fontSize: '0.75rem' }}>
        <Info size={14} /> Scores are calculated based on hook intensity, value density, and narrative emotional spikes — not raw platform retention data.
      </div>
    </motion.div>
  );
}
