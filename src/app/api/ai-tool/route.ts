import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const USE_MOCK = process.env.USE_MOCK_TRANSCRIPTION === 'true';

const LANGDOCK_API_KEY = process.env.LANGDOCK_API_KEY!;
const LANGDOCK_AGENT_ID = process.env.LANGDOCK_REV_AI_AGENT_ID!;

export const dynamic = 'force-dynamic';

const creditLimits: Record<string, number> = {
  free: 5,
  basic: 50,
  pro: Number.MAX_SAFE_INTEGER
};

export async function POST(req: Request) {
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { action, transcript, userId } = await req.json();
    const startTime = Date.now();

    if (!action || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Fetch user's current balance and tier
    const { data: planData } = await supabaseAdmin
      .from('plan_tracking')
      .select('plan_tier, credits_remaining')
      .eq('user_id', userId)
      .single();

    const planTier = (planData?.plan_tier || 'free').toLowerCase();
    const isPro = planTier === 'pro';
    const creditsRemaining = planData?.credits_remaining ?? 0;

    console.log(`[AI-Tool] Action: ${action}, Tier: ${planTier}, Remaining: ${creditsRemaining}`);

    // check if user has credits
    if (!isPro && creditsRemaining <= 0) {
      return NextResponse.json({ 
        error: `You have reached your AI Credit limit. Please upgrade your plan to continue generating AI insights.` 
      }, { status: 403 });
    }

    let aiResultText = '';
    // ... (Langdock logic remains the same)
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 1500));
      aiResultText = "Mock data active. Disable USE_MOCK in .env.local to see real AI results.";
    } else {
      let systemInstruction = '';
      if (action === 'hooks') {
        systemInstruction = "Analyze this transcript and write exactly 3 high-converting viral hooks optimized for short-form video (TikTok/Reels). Output them as a concise numbered list. Do NOT chat, just output the hooks.";
      } else if (action === 'explainer') {
        systemInstruction = "Read this transcript text and provide a single concise 2-paragraph analysis explaining WHY this script is optimized for algorithmic engagement, focusing on pacing and tone. Do not write anything else.";
      } else {
        systemInstruction = "Summarize the following transcript.";
      }

      const response = await fetch('https://api.langdock.com/agent/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LANGDOCK_API_KEY}`,
        },
        body: JSON.stringify({
          agentId: LANGDOCK_AGENT_ID,
          stream: false,
          messages: [{ id: 'msg-' + Date.now(), role: 'user', parts: [{ type: 'text', text: `${systemInstruction}\n\nTRANSCRIPT:\n${transcript}` }] }]
        }),
      });

      if (!response.ok) throw new Error(`Langdock error: ${response.status}`);
      const rawData = await response.json();
      const assistantMessage = rawData.messages?.find((m: any) => m.role === 'assistant');
      aiResultText = assistantMessage?.content || assistantMessage?.parts?.[0]?.text || '';
    }

    // 3. Consume the credit atomically
    if (!isPro) {
      const { error: decrError } = await supabaseAdmin.rpc('decrement_credits', { user_id_arg: userId });
      if (decrError) {
        console.warn('[AI-Tool] RPC failed, falling back to manual update:', decrError.message);
        await supabaseAdmin
          .from('plan_tracking')
          .update({ credits_remaining: Math.max(0, creditsRemaining - 1) })
          .eq('user_id', userId);
      }
    }

    // 4. Log to time-series usage_logs
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

    return NextResponse.json({ success: true, result: aiResultText });

  } catch (error: any) {
    console.error('[AI-Tool] Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
