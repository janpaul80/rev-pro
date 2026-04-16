import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Setup Supabase Admin
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVIC_ROLE_KEY!
  );

  // 1. Handle Checkout completion (Initial Purchase)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;
    const planTier = session.metadata?.planTier || 'basic';

    if (userId) {
      // Upgrade plan
      await supabaseAdmin
        .from('plan_tracking')
        .update({ 
          plan_tier: planTier, 
          status: 'active',
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string
        })
        .eq('user_id', userId);

      // Log Revenue (if amount is available)
      if (session.amount_total) {
        await supabaseAdmin.from('revenue_logs').insert({
          user_id: userId,
          stripe_id: session.id,
          amount_cents: session.amount_total,
          currency: session.currency || 'usd',
          plan_tier: planTier
        });
      }
    }
  }

  // 2. Handle Invoice Paid (Recurring Renewals)
  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;
    
    // Find user by stripe_customer_id
    const { data: userData } = await supabaseAdmin
      .from('plan_tracking')
      .select('user_id, plan_tier')
      .eq('stripe_customer_id', customerId)
      .single();

    if (userData) {
      await supabaseAdmin.from('revenue_logs').insert({
        user_id: userData.user_id,
        stripe_id: invoice.id,
        amount_cents: invoice.amount_paid,
        currency: invoice.currency || 'usd',
        plan_tier: userData.plan_tier
      });
    }
  }

  return NextResponse.json({ received: true });
}
