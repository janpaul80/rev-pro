'use client';

import React from 'react';

const Toggle = ({ label, description, defaultChecked = false }: any) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
    <div>
      <div style={{ color: '#fff', fontSize: '1rem', fontWeight: '500', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ color: '#666', fontSize: '0.9rem' }}>{description}</div>
    </div>
    <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
      <input type="checkbox" defaultChecked={defaultChecked} style={{ opacity: 0, width: 0, height: 0 }} />
      <span style={{ 
        position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: defaultChecked ? '#0070f3' : '#333', 
        borderRadius: '24px', transition: '.4s' 
      }}>
        <span style={{
          position: 'absolute', content: '""', height: '18px', width: '18px', 
          left: defaultChecked ? '18px' : '3px', bottom: '3px', 
          backgroundColor: 'white', borderRadius: '50%', transition: '.4s'
        }} />
      </span>
    </label>
  </div>
);

export default function PreferencesSettings() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem' }}>Preferences</h1>
      
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.95rem' }}>
        To manage account settings like your email, visit your <a href="/settings/account" style={{ textDecoration: 'underline', color: '#fff' }}>account settings</a>.
      </p>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: '#888', marginBottom: '1rem' }}>General</h2>
        
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', padding: '0 2rem' }}>
          <Toggle 
            label="Suggestions" 
            description="Get relevant in-chat suggestions to refine your project."
            defaultChecked={true}
          />
          <Toggle 
            label="Sound Notifications" 
            description="A new sound will play when transcription is finished and the window is not focused."
            defaultChecked={true}
          />
        </div>
      </div>
    </div>
  );
}
