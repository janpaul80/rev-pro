'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  CircleDashed, 
  AlertCircle, 
  Loader2, 
  FileSpreadsheet, 
  Trash2,
  Play
} from 'lucide-react';

export interface BatchItem {
  id: string;
  url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  transcript?: string;
  refined?: string;
}

interface BatchMonitorProps {
  items: BatchItem[];
  onExport: () => void;
  onClear: () => void;
  onRetry: (id: string) => void;
}

export default function BatchMonitor({ items, onExport, onClear, onRetry }: BatchMonitorProps) {
  if (items.length === 0) return null;

  const completedCount = items.filter(i => i.status === 'completed').length;
  const progress = (completedCount / items.length) * 100;
  const isProcessing = items.some(i => i.status === 'processing');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass"
      style={{ 
        marginTop: '2rem', 
        padding: '2rem', 
        borderRadius: '24px', 
        border: '1px solid var(--border)',
        textAlign: 'left'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Batch Queue</h2>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            {completedCount} of {items.length} items processed
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={onExport}
            disabled={completedCount === 0}
            className="premium"
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '10px 20px', borderRadius: '12px',
              opacity: completedCount === 0 ? 0.5 : 1
            }}
          >
            <FileSpreadsheet size={18} /> Export Combined CSV
          </button>
          <button 
            onClick={onClear}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '10px 20px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: '#fff'
            }}
          >
            <Trash2 size={18} /> Clear Queue
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          style={{ height: '100%', background: '#fbb02e', boxShadow: '0 0 10px rgba(251, 176, 46, 0.5)' }}
        />
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: idx * 0.05 }}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '1.5rem', 
                padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: item.status === 'processing' ? 'rgba(251, 176, 46, 0.03)' : 'transparent'
              }}
            >
              <div style={{ flexShrink: 0 }}>
                {item.status === 'pending' && <CircleDashed size={20} color="#444" />}
                {item.status === 'processing' && <Loader2 size={20} color="#fbb02e" className="spin" />}
                {item.status === 'completed' && <CheckCircle2 size={20} color="#4ade80" />}
                {item.status === 'failed' && <AlertCircle size={20} color="#f87171" />}
              </div>
              
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.9rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.url}
                </div>
                {item.error && <div style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '4px' }}>{item.error}</div>}
              </div>

              <div style={{ flexShrink: 0 }}>
                {item.status === 'failed' && (
                  <button 
                    onClick={() => onRetry(item.id)}
                    style={{ background: 'transparent', border: '1px solid #f87171', color: '#f87171', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', cursor: 'pointer' }}
                  >
                    Retry
                  </button>
                )}
                {item.status === 'completed' && (
                  <div style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 'bold' }}>Ready</div>
                )}
                {item.status === 'processing' && (
                  <div style={{ fontSize: '0.75rem', color: '#fbb02e' }}>Working...</div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </motion.div>
  );
}
