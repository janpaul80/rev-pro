'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Building2, Globe, ShieldCheck, Zap, ArrowRight, MessageSquare } from 'lucide-react';

const ContactSales = () => {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '100px', textAlign: 'center', background: 'radial-gradient(circle at top, rgba(251,176,46,0.05) 0%, transparent 60%)' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '2rem' }}
          >
            <span style={{ 
              background: 'rgba(251, 176, 46, 0.1)', 
              color: '#fbb02e', 
              padding: '8px 20px', 
              borderRadius: '20px', 
              fontSize: '0.85rem', 
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Enterprise & Agencies
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem' }}
          >
            Scale Your Revenue with <br/>
            <span style={{ color: '#fbb02e' }}>Creator Intelligence.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ color: '#888', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}
          >
            Built for agencies managing 50+ channels. Unlock custom batch limits, 
            white-label reporting, and priority AI model access.
          </motion.p>
        </div>
      </section>

      {/* Feature Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border)' }}>
              <div style={{ padding: '12px', background: 'rgba(251, 176, 46, 0.1)', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
                <Zap color="#fbb02e" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Industrial Batch Engine</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Parallel process up to 500 URLs simultaneously. Zero latency, 100% uptime guaranteed by our dedicated enterprise cluster.</p>
            </div>

            <div className="glass" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border)' }}>
              <div style={{ padding: '12px', background: 'rgba(251, 176, 46, 0.1)', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
                <ShieldCheck color="#fbb02e" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Custom AI Workflows</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Train models on your brand's specific tone of voice. Generate perfectly formatted shownotes, tweets, and scripts automatically.</p>
            </div>

            <div className="glass" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border)' }}>
              <div style={{ padding: '12px', background: 'rgba(251, 176, 46, 0.1)', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
                <Building2 color="#fbb02e" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Dedicated Account Strategist</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Every agency plan includes a dedicated technical architect to help integrate Rev.pro into your existing internal content stack.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem' }}>Let's Build <br/>for Scale.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <MessageSquare size={20} color="#fbb02e" />
                  <span style={{ color: '#888' }}>24-hour response time</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Globe size={20} color="#fbb02e" />
                  <span style={{ color: '#888' }}>Global Agency Support</span>
                </div>
              </div>
            </div>

            <div className="glass" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--border)' }}>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>Name</label>
                    <input type="text" placeholder="John Doe" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>Work Email</label>
                    <input type="email" placeholder="john@agency.com" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', color: '#fff', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>Company / Agency Name</label>
                  <input type="text" placeholder="Elite Content Media" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', color: '#fff', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>Monthly Video Volume</label>
                  <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', color: '#fff', outline: 'none' }}>
                    <option>50 - 200 videos / mo</option>
                    <option>200 - 1000 videos / mo</option>
                    <option>1000+ videos / mo</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>How can we help?</label>
                  <textarea rows={4} placeholder="Tell us about your scale challenges..." style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', color: '#fff', outline: 'none', resize: 'none' }} />
                </div>

                <button className="premium" style={{ 
                  background: '#fbb02e', 
                  color: '#000', 
                  border: 'none', 
                  borderRadius: '12px', 
                  padding: '16px', 
                  fontWeight: '800', 
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '1rem'
                }}>
                  Submit Inquiry <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactSales;
