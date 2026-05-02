import Navbar from '../components/Navbar';
export const dynamic = 'force-dynamic';
import Hero from '../components/Hero';
import Features from '../components/Features';
import UseCases from '../components/UseCases';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { BarChart3, Binary, BrainCircuit, Rocket, Shield, Users } from 'lucide-react';

export default function Home() {
  return (
    <main style={{ background: '#000', color: '#fff' }}>
      <Navbar />
      <Hero />
      
      {/* Before/After Section */}
      <section style={{ padding: '100px 0', background: '#000' }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: '800' }}>
            Stop Wasting <span style={{ color: '#fbb02e' }}>Hours</span>.
          </h2>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* NEW: Creator Intelligence Suite (Mock Showcase) */}
      <section style={{ padding: '120px 0', background: 'radial-gradient(circle at center, rgba(251,176,46,0.02) 0%, transparent 70%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Creator <span style={{ color: '#fbb02e' }}>Intelligence</span> Dashboard</h2>
            <p style={{ color: '#666', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
              We don't just transcribe. We analyze. Our algorithms predict performance velocity and engineer viral hooks before you even hit export.
            </p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Feature Callouts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ padding: '12px', background: 'rgba(251, 176, 46, 0.1)', borderRadius: '12px', height: 'fit-content' }}>
                  <BrainCircuit color="#fbb02e" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Platform Benchmarking</h4>
                  <p style={{ color: '#666' }}>Instantly see how your video scores against TikTok and Instagram top trending formats.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ padding: '12px', background: 'rgba(251, 176, 46, 0.1)', borderRadius: '12px', height: 'fit-content' }}>
                  <Binary color="#fbb02e" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Hook Lab Engineering</h4>
                  <p style={{ color: '#666' }}>AI identifies the exact moment of peak retention and generates 5 alternative high-hook headlines.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ padding: '12px', background: 'rgba(251, 176, 46, 0.1)', borderRadius: '12px', height: 'fit-content' }}>
                  <Users color="#fbb02e" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Agency Scale Bulk-Add</h4>
                  <p style={{ color: '#666' }}>Parallel-process an entire content schedule in seconds. Export to CSV for team-wide scheduling.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UseCases />
      <Features />
      
      {/* Social Proof / Security */}
      <section style={{ padding: '100px 0', borderTop: '1px solid #111' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '4rem' }}>Why Industry <span style={{ color: '#fbb02e' }}>Leaders</span> Trust Us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Shield size={40} color="#fbb02e" style={{ margin: '0 auto 1.5rem' }} />
              <h5 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>SOC-2 Proof Security</h5>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>Enterprise-level data encryption for your pre-release content.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Rocket size={40} color="#fbb02e" style={{ margin: '0 auto 1.5rem' }} />
              <h5 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>Custom Model Access</h5>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>Exclusive access to our refined creator-tuned Llama 3 models.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Users size={40} color="#fbb02e" style={{ margin: '0 auto 1.5rem' }} />
              <h5 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>Managed Onboarding</h5>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>Premium set-up for agencies via our Dedicated Success team.</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </main>
  );
}
