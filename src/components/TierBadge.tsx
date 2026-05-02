'use client';

import React from 'react';

interface TierStyle {
  bg: string;
  border: string;
  color: string;
  icon: string;
}

const TIER_STYLES: Record<string, TierStyle> = {
  Free: { bg: 'rgba(150,150,150,0.1)', border: 'rgba(150,150,150,0.3)', color: '#aaa', icon: '○' },
  Basic: { bg: 'rgba(56,139,253,0.12)', border: 'rgba(56,139,253,0.4)', color: '#58a6ff', icon: '◆' },
  Pro: { bg: 'rgba(251,176,46,0.15)', border: 'rgba(251,176,46,0.5)', color: '#fbb02e', icon: '★' },
};

interface Props {
  planTier: string;
  creditsRemaining?: number | null;
  compact?: boolean;
}

export default function TierBadge({ planTier, creditsRemaining, compact }: Props) {
  const style = TIER_STYLES[planTier] || TIER_STYLES.Free;
  const showCredits = planTier !== 'Pro' && creditsRemaining != null && !compact;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: style.bg,
        padding: compact ? '2px 8px' : '4px 12px',
        borderRadius: '20px',
        border: `1px solid ${style.border}`,
        gap: '6px',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: compact ? '0.75rem' : '0.85rem', color: style.color, lineHeight: 1 }}>
        {style.icon}
      </span>
      <span
        style={{
          fontSize: compact ? '0.7rem' : '0.8rem',
          fontWeight: 700,
          color: style.color,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {planTier}
        {showCredits && ` · ${creditsRemaining} Credits`}
      </span>
    </div>
  );
}
