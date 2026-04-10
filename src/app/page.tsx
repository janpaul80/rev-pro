import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import UseCases from '../components/UseCases';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section style={{ padding: '100px 0', background: '#000' }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: '800' }}>
            Stop Wasting <span style={{ color: '#fbb02e' }}>Hours</span>.
          </h2>
          <BeforeAfterSlider />
        </div>
      </section>
      <UseCases />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
