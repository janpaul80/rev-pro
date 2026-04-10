import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutUs() {
  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: '160px 0 80px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '3rem', letterSpacing: '-0.05em' }}>About Us</h1>
        
        <div style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p>
            TikTok Transcribe was built with one goal in mind: to make video content easier to turn into useful, readable, and reusable text. In a world driven by short-form content, creators, marketers, researchers, and everyday users need fast access to the words inside their videos. This platform was created to make that process simple, efficient, and powerful.
          </p>
          
          <p>
            Behind TikTok Transcribe is JP Hartmann, a developer with a deep passion for building modern digital products, AI-powered tools, and ambitious software platforms that solve real problems.
          </p>

          <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem' }}>Meet JP Hartmann</h2>
          <p>
            My name is JP Hartmann — and I am a builder at heart.
          </p>
          
          <p>
            I am a developer originally from the Netherlands, and I also spend time in Ecuador, giving me an international perspective that shapes both the way I work and the products I create. I live and breathe development. For me, coding is not just work, it is part of who I am. I am the kind of developer who is constantly creating, refining, testing, and pushing ideas forward.
          </p>

          <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem' }}>What I’m Building</h2>
          <p>
            One of them is <strong>CoderXP</strong>, a platform focused on the future of AI-assisted software creation — designed to help make building applications faster, smarter, and more autonomous.
          </p>
          
          <p>
            Another is <strong>HeftCoder</strong>, a project centered around powerful development workflows, advanced coding environments, and the idea that software creation should become more fluid, intelligent, and scalable.
          </p>

          <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem' }}>My Approach</h2>
          <p>
            Every project I work on is driven by a few core principles:
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><strong>Clarity:</strong> software should feel intuitive and purposeful.</li>
            <li><strong>Speed:</strong> users should get results quickly and without friction.</li>
            <li><strong>Innovation:</strong> technology should not just follow trends, but help define what comes next.</li>
            <li><strong>Craftsmanship:</strong> the small details matter, because they shape the entire experience.</li>
          </ul>

          <p style={{ marginTop: '3rem' }}>
            TikTok Transcribe is part of that same mission: building tools that turn content into something more accessible, actionable, and valuable.
          </p>

          <div style={{ marginTop: '4rem', textAlign: 'left' }}>
            <p style={{ fontSize: '1rem', color: '#666', marginBottom: '1rem' }}>Sincerely,</p>
            <img 
              src="/assets/signature.png" 
              alt="Paul Hartmann Signature" 
              style={{ width: '450px', height: 'auto', filter: 'brightness(0) invert(1)' }} 
            />
            <p style={{ marginTop: '2rem' }}>
              <a href="https://PaulHartmann.dev" style={{ color: '#fff', textDecoration: 'underline' }}>PaulHartmann.dev</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
