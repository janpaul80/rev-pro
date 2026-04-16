import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { KPICard, RevenueAreaChart, PlatformChart, RedFlagTable } from '@/components/AdminDashboard';
import { Users, DollarSign, Activity, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // 1. Double-check Auth & Admin Status
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const isAdmin = session.user.user_metadata?.is_admin === true;
  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>403</h1>
          <p style={{ color: '#888' }}>You do not have administrative privileges to view this area.</p>
        </div>
      </div>
    );
  }

  // 2. Fetch Real Data for Metrics
  const { data: revenueData } = await supabase.from('revenue_logs').select('*');
  const { data: userData } = await supabase.from('plan_tracking').select('*');
  const { data: usageData } = await supabase.from('usage_logs').select('*').order('created_at', { ascending: false });

  // 3. Simple Calculations (MVP)
  const totalRevenue = (revenueData?.reduce((acc, curr) => acc + curr.amount_cents, 0) || 0) / 100;
  const totalUsers = userData?.length || 0;
  const totalAIUsed = usageData?.length || 0;
  
  // Aggregating Chart Data (Revenue over time - group by date)
  const revenueByDay = (revenueData || []).reduce((acc: any, curr: any) => {
    const date = new Date(curr.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + (curr.amount_cents / 100);
    return acc;
  }, {});

  const chartData = Object.entries(revenueByDay).map(([date, revenue]) => ({ date, revenue }));

  // Aggregating Platform Data
  const platforms = (usageData?.filter(u => u.action_type === 'transcription') || []).reduce((acc: any, curr: any) => {
    acc[curr.platform || 'unknown'] = (acc[curr.platform || 'unknown'] || 0) + 1;
    return acc;
  }, {});

  const platformData = Object.entries(platforms).map(([name, count]) => ({ name, count }));

  // Mock Red Flags (In a real app, these would be calculated based on thresholds)
  const redFlags = [
    { type: 'latency', metric: '42.5s', target: 'api/transcribe', severity: 'high', time: '12m ago' },
    { type: 'abuse', metric: '45 credits', target: 'user_9921', severity: 'high', time: '1h ago' },
    { type: 'error', metric: '15% rate', target: 'Langdock Agent', severity: 'med', time: '3h ago' },
  ];

  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '6rem 2rem' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
            <p style={{ color: '#666' }}>Internal platform overview and anomaly detection.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', padding: '6px 12px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            <span style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', display: 'inline-block' }}></span> Live System Status
          </div>
        </header>

        {/* Level 1: KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <KPICard 
            title="Total Revenue" 
            value={`$${totalRevenue.toFixed(2)}`} 
            trend={12} 
            icon={<DollarSign size={20} color="#fbb02e" />} 
            description="vs last month"
          />
          <KPICard 
            title="Active Users" 
            value={totalUsers} 
            trend={5} 
            icon={<Users size={20} color="#fbb02e" />} 
            description="verified creators"
          />
          <KPICard 
            title="AI Requests" 
            value={totalAIUsed} 
            trend={28} 
            icon={<Zap size={20} color="#fbb02e" />} 
            description="total tool usages"
          />
          <KPICard 
            title="Avg Success Rate" 
            value="98.2%" 
            icon={<Activity size={20} color="#fbb02e" />} 
            description="global performance"
          />
        </div>

        {/* Level 2: Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
          <RevenueAreaChart data={chartData} />
          <PlatformChart data={platformData} />
        </div>

        {/* Level 3: Red Flags */}
        <RedFlagTable issues={redFlags} />
      </div>

      <Footer />
    </main>
  );
}
