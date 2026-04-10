import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Content Creator",
    text: "Review has completely changed how I repurpose my TikToks for my blog. The 99% accuracy is no joke—I barely have to edit anything!",
    avatar: "/avatars/avatar1.png"
  },
  {
    name: "Marcus Thorne",
    role: "Marketing Specialist",
    text: "The speed is incredible. I can transcribe a dozen viral hooks in minutes and start analyzing trends immediately. Best tool in my stack.",
    avatar: "/avatars/avatar2.png"
  },
  {
    name: "Elena Rodriguez",
    role: "Social Media Manager",
    text: "I love the 'Pro' rewrite feature. It takes a raw transcript and turns it into a perfect LinkedIn post in seconds. Highly recommended!",
    avatar: "/avatars/avatar3.png"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Loved by Creators.</h2>
          <p style={{ color: '#666' }}>Join thousands of users who are growing their platforms with Rev.</p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {testimonials.map((t, i) => (
            <div key={i} className="glass" style={{ padding: '2.5rem', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <img 
                  src={t.avatar} 
                  alt={t.name}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)' }}
                />
                <div>
                  <div style={{ fontWeight: '600' }}>{t.name}</div>
                  <div style={{ color: '#666', fontSize: '0.85rem' }}>{t.role}</div>
                </div>
              </div>
              <p style={{ color: '#aaa', fontStyle: 'italic', lineHeight: '1.6' }}>"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
