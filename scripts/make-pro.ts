import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

function parseEnv(path: string) {
  const content = fs.readFileSync(path, 'utf-8');
  const env: Record<string, string> = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      env[match[1]] = match[2].trim();
    }
  });
  return env;
}

const env = parseEnv('.env.local');

const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVIC_ROLE_KEY
);

async function makePro() {
  const email = 'klaushart49@gmail.com';
  
  // 1. Get user id
  const { data: users, error: authErr } = await supabase.auth.admin.listUsers();
  if (authErr) {
    console.error('Error fetching users:', authErr);
    return;
  }
  
  const user = users.users.find(u => u.email === email);
  if (!user) {
    console.log('User not found:', email);
    return;
  }

  console.log('User found:', user.id);

  // 2. Update plan_tracking
  const { error: planErr } = await supabase
    .from('plan_tracking')
    .update({ plan_tier: 'pro', status: 'active' })
    .eq('user_id', user.id);

  if (planErr) {
    console.error('Error updating plan:', planErr);
  } else {
    console.log('Plan updated to PRO successfully!');
  }
}

makePro();
