'use client';

import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Activity, Users, DollarSign } from 'lucide-react';

// --- Types ---
interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  description: string;
}

// --- Components ---

export const KPICard = ({ title, value, trend, icon, description }: StatCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass"
    style={{ 
      padding: '1.5rem', 
      borderRadius: '16px', 
      border: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div style={{ color: '#888', fontSize: '0.875rem', fontWeight: '500' }}>{title}</div>
      <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>{icon}</div>
    </div>
    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
      {value}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
      {trend !== undefined && (
        <span style={{ color: trend >= 0 ? '#4ade80' : '#f87171', display: 'flex', alignItems: 'center', fontWeight: '600' }}>
          {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(trend)}%
        </span>
      )}
      <span style={{ color: '#666' }}>{description}</span>
    </div>
  </motion.div>
);

export const RevenueAreaChart = ({ data }: { data: any[] }) => (
  <div className="glass" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', height: '400px' }}>
    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Revenue Growth</h3>
      <div style={{ fontSize: '0.85rem', color: '#888' }}>Last 30 Days</div>
    </div>
    <ResponsiveContainer width="100%" height="85%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fbb02e" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#fbb02e" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
        <XAxis 
          dataKey="date" 
          stroke="#444" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          dy={10}
        />
        <YAxis 
          stroke="#444" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
          itemStyle={{ color: '#fbb02e' }}
        />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke="#fbb02e" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorRev)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const PlatformChart = ({ data }: { data: any[] }) => (
  <div className="glass" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', height: '400px' }}>
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Platform Distribution</h3>
    </div>
    <ResponsiveContainer width="100%" height="85%">
      <BarChart data={data} layout="vertical">
        <XAxis type="number" hide />
        <YAxis 
          type="category" 
          dataKey="name" 
          stroke="#fff" 
          fontSize={12} 
          axisLine={false} 
          tickLine={false}
          width={80}
        />
        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === 0 ? '#fbb02e' : index === 1 ? '#ff4444' : '#00f2ea'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const RedFlagTable = ({ issues }: { issues: any[] }) => (
  <div className="glass" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
    <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <AlertTriangle color="#ff4444" size={24} />
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>System Red Flags</h3>
    </div>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #222' }}>
            <th style={{ padding: '1rem', color: '#666', fontSize: '0.85rem' }}>TYPE</th>
            <th style={{ padding: '1rem', color: '#666', fontSize: '0.85rem' }}>METRIC</th>
            <th style={{ padding: '1rem', color: '#666', fontSize: '0.85rem' }}>USER/EVENT</th>
            <th style={{ padding: '1rem', color: '#666', fontSize: '0.85rem' }}>TIME</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #111' }}>
              <td style={{ padding: '1rem' }}>
                <span style={{ 
                  color: issue.severity === 'high' ? '#ff4444' : '#fbb02e',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  background: issue.severity === 'high' ? 'rgba(255, 68, 68, 0.1)' : 'rgba(251, 176, 46, 0.1)',
                  borderRadius: '4px'
                }}>
                  {issue.type}
                </span>
              </td>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>{issue.metric}</td>
              <td style={{ padding: '1rem', color: '#aaa', fontSize: '0.9rem' }}>{issue.target}</td>
              <td style={{ padding: '1rem', color: '#555', fontSize: '0.85rem' }}>{issue.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
