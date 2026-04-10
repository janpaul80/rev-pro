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

async function testLangdock() {
  const LANGDOCK_API_KEY = env.LANGDOCK_API_KEY;
  const LANGDOCK_AGENT_ID = env.LANGDOCK_REV_AI_AGENT_ID;
  const LANGDOCK_ENDPOINT = env.LANGDOCK_ENDPOINT_URL;

  console.log('Key limit chars:', LANGDOCK_API_KEY?.substring(0, 5));
  console.log('Agent:', LANGDOCK_AGENT_ID);
  console.log('Endpoint:', LANGDOCK_ENDPOINT);

  try {
    const response = await fetch('https://api.langdock.com/agent/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LANGDOCK_API_KEY}`,
      },
      body: JSON.stringify({
        agentId: LANGDOCK_AGENT_ID,
        stream: false,
        messages: [
          { 
            id: 'msg-1',
            role: 'user', 
            parts: [{ type: 'text', text: 'test transcription https://www.tiktok.com/@tys.ais/video/7627011450472566046' }]
          }
        ]
      })
    });

    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Body:', text.substring(0, 500));
  } catch (err: any) {
    console.error('Fetch error:', err.message);
  }
}

testLangdock();
