'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, User, Sliders, LayoutDashboard, CreditCard, Key } from 'lucide-react';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Account', href: '/settings/account', icon: <User size={16} /> },
    { label: 'Preferences', href: '/settings/preferences', icon: <Sliders size={16} /> },
    { label: 'Workspace', isHeader: true },
    { label: 'Dashboard', href: '/settings/dashboard', icon: <LayoutDashboard size={16} /> },
    { label: 'Billing', href: '/settings/billing', icon: <CreditCard size={16} /> },
    { label: 'API Keys', href: '/settings/api', icon: <Key size={16} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', borderRight: '1px solid var(--border)', padding: '2rem 1rem' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', marginBottom: '2rem', padding: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#888'}>
          <ArrowLeft size={16} /> Back to app
        </Link>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item, idx) => {
            if (item.isHeader) {
              return (
                <div key={idx} style={{ color: '#666', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', padding: '1.5rem 0.75rem 0.5rem', letterSpacing: '0.05em' }}>
                  {item.label}
                </div>
              );
            }
            
            const isActive = pathname === item.href;
            return (
              <Link key={idx} href={item.href!} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem',
                borderRadius: '8px', color: isActive ? '#fff' : '#888',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                textDecoration: 'none', transition: 'all 0.2s',
                fontSize: '0.9rem'
              }} onMouseOver={(e) => { if (!isActive) e.currentTarget.style.color = '#fff' }} onMouseOut={(e) => { if (!isActive) e.currentTarget.style.color = '#888' }}>
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 4rem', maxWidth: '900px' }}>
        {children}
      </main>
    </div>
  );
}
