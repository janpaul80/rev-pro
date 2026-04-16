import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const USE_MOCK = process.env.USE_MOCK_TRANSCRIPTION === 'true';

const LANGDOCK_API_KEY = process.env.LANGDOCK_API_KEY!;
const LANGDOCK_AGENT_ID = process.env.LANGDOCK_REV_AI_AGENT_ID!;

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { action, transcript, userId } = await req.json();
    const startTime = Date.now();

    if (!transcript || !action || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Fetch user's current plan and metadata
    const { data: planData } = await supabaseAdmin
      .from('plan_tracking')
      .select('plan_tier')
      .eq('user_id', userId)
      .single();

    const planTier = (planData?.plan_tier || 'free').toLowerCase();
    
    // Grab metadata via auth admin
    const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (authErr || !authData.user) {
      return NextResponse.json({ error: 'Invalid user or unauthorized.' }, { status: 401 });
    }

    const currentUsed = authData.user.user_metadata?.ai_credits_used || 0;
    const maxAllowed = creditLimits[planTier] || 5;

    console.log(`[AI-Tool] Action: ${action}, Tier: ${planTier}, Credits: ${currentUsed}/${maxAllowed}`);

    if (currentUsed >= maxAllowed) {
      return NextResponse.json({ error: `You have reached your AI Credit limit (${maxAllowed}). Please upgrade your plan to continue generating AI insights.` }, { status: 403 });
    }

    let aiResultText = '';

    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 1500));
      if (action === 'hooks') {
        aiResultText = "1. Stop skipping, this changes everything.\n2. The 3-second psychological trick nobody tells you.\n3. If you want results, do THIS exact thing.";
      } else if (action === 'explainer') {
        aiResultText = "The rapid visual transitions in the first 5 seconds immediately capture attention. The speaker uses high-contrast emotional statements to create a curiosity gap, heavily driving up average view duration.";
      } else {
        aiResultText = "Data generated.";
      }
    } else {
      // Prompt construction depending on action
      let systemInstruction = '';
      if (action === 'hooks') {
        systemInstruction = "Analyze this transcript and write exactly 3 high-converting viral hooks optimized for short-form video (TikTok/Reels). Output them as a concise numbered list. Do NOT chat, just output the hooks.";
      } else if (action === 'explainer') {
        systemInstruction = "Read this transcript text and provide a single concise 2-paragraph analysis explaining WHY this script is optimized for algorithmic engagement, focusing on pacing and tone. Do not write anything else.";
      } else {
        systemInstruction = "Summarize the following transcript.";
      }

      // Hit Langdock
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
              id: 'msg-' + Date.now(),
              role: 'user',
              parts: [{
                type: 'text',
                text: `${systemInstruction}\n\nTRANSCRIPT:\n${transcript}`
              }]
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`Langdock error: ${response.status}`);
      }

      const rawData = await response.json();
      const assistantMessage = rawData.messages?.find((m: any) => m.role === 'assistant');
      aiResultText = assistantMessage?.content || assistantMessage?.parts?.[0]?.text || '';
    }

    // 3. Consume the credit by incrementing metadata
    await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: { ai_credits_used: currentUsed + 1 }
    });

    // 4. Log to time-series usage_logs for deep analytics
    const processingTime = Date.now() - startTime;
    await supabaseAdmin
      .from('usage_logs')
      .insert({
        user_id: userId,
        action_type: action,
        credits_used: 1,
        processing_time_ms: processingTime,
        status: 'success'
      });

    console.log(`[AI-Tool] Consumed 1 credit. New total: ${currentUsed + 1}`);

    return NextResponse.json({ success: true, result: aiResultText });

  } catch (error: any) {
    console.error('[AI-Tool] Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
