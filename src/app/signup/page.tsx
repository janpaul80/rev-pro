'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setOauthLoading(provider);
    setError(null);

    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback`;
    console.log('[Auth] Redirecting to signup callback:', redirectTo);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });

    if (error) {
      setError(error.message);
      setOauthLoading(null);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '12px',
    color: '#fff',
    outline: 'none',
    fontSize: '0.95rem',
  };

  const oauthBtnStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'rgba(255,255,255,0.03)',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: '10px',
    fontSize: '0.95rem',
    fontWeight: '600' as const,
    transition: 'all 0.2s',
  };

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, #111 0%, #000 100%)'
      }}>
        <div className="glass" style={{
          padding: '3rem',
          width: '100%',
          maxWidth: '420px',
          borderRadius: '24px',
          textAlign: 'center'
        }}>
          <img src="/assets/logo_light.png" alt="REV" style={{ width: '120px', marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Check Your Email</h1>
          <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            We sent a confirmation link to <span style={{ color: '#fbb02e', fontWeight: '600' }}>{email}</span>. Click the link to activate your account.
          </p>
          <Link href="/login" style={{ color: '#fbb02e', textDecoration: 'underline' }}>Back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #111 0%, #000 100%)'
    }}>
      <div className="glass" style={{
        padding: '3rem',
        width: '100%',
        maxWidth: '420px',
        borderRadius: '24px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <img src="/assets/logo_light.png" alt="REV" style={{ width: '120px', marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Join Rev Pro</h1>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Create an account to start transcribing</p>
        </div>

        {/* OAuth Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => handleOAuth('google')}
            disabled={oauthLoading !== null}
            style={oauthBtnStyle}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {oauthLoading === 'google' ? 'Redirecting...' : 'Continue with Google'}
          </button>

          <button
            onClick={() => handleOAuth('github')}
            disabled={oauthLoading !== null}
            style={oauthBtnStyle}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {oauthLoading === 'github' ? 'Redirecting...' : 'Continue with GitHub'}
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span style={{ color: '#444', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>or continue with email</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <form onSubmit={handleSignup} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: '600' }}>EMAIL ADDRESS</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: '600' }}>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          {process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SITE_URL && (
            <div style={{ color: '#ffcc00', fontSize: '0.75rem', marginBottom: '1rem', background: 'rgba(255,204,0,0.1)', padding: '8px', borderRadius: '4px' }}>
              ⚠️ Development fallback active. Ensure NEXT_PUBLIC_SITE_URL is set.
            </div>
          )}
          {error && <div style={{ color: '#ff4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

          <button
            type="submit"
            className="premium"
            disabled={loading}
            style={{ width: '100%', padding: '14px' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
          Already have an account? <Link href="/login" style={{ color: '#fbb02e', textDecoration: 'underline' }}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
