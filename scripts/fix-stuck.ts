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
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixStuck() {
  const { error } = await supabase
    .from('transcriptions')
    .update({ status: 'failed', transcript: 'Failed during API error. Please try again.' })
    .eq('status', 'processing');

  if (error) {
    console.error('Error fixing stuck records:', error);
  } else {
    console.log('Fixed stuck processing records!');
  }
}

fixStuck();
