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

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Retrieve the user ID we passed into the checkout session
    const userId = session.client_reference_id;
    const planTier = session.metadata?.planTier || 'basic'; // The plan they just bought

    if (userId) {
      // Connect to supabase with SERVICE ROLE to bypass RLS
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVIC_ROLE_KEY!
      );

      // Upgrade plan to the new tier
      const { error } = await supabaseAdmin
        .from('plan_tracking')
        .update({ 
          plan_tier: planTier, 
          status: 'active',
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string
        })
        .eq('user_id', userId);

      if (error) {
        console.error(`Supabase sync failed: ${error.message}`);
        // Consider alerting ops, but return 200 to Stripe so it doesn't retry infinitely
      } else {
        console.log(`Successfully upgraded user ${userId} to ${planTier} plan.`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
