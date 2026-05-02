import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Lazy init to bypass build-time crashes
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Stripe key missing' }, { status: 500 });
  }
  
  const stripe = new Stripe(key || 'placeholder');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY || '';
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;
  const dynamic = "force-dynamic";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = (await import('@supabase/supabase-js')).createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id || session.metadata?.userId;
      
      // Get the price ID from the line items if possible
      const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items']
      });
      const priceId = expandedSession.line_items?.data[0]?.price?.id;
      
      const tier = priceId === process.env.PRO_PRICE_ID ? 'pro' : 'basic';
      const creditAllocation = tier === 'pro' ? 999999 : 50;

      if (userId) {
        // Upsert the plan and initialize credits
        await supabase
          .from('plan_tracking')
          .upsert({ 
            user_id: userId, 
            plan_tier: tier,
            credits_total: creditAllocation,
            credits_remaining: creditAllocation,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });
          
        console.log(`[Webhook] Upgraded user ${userId} to ${tier} with ${creditAllocation} credits`);
      }
      break;
    
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      // You'd typically find the user by Stripe Customer ID here
      // This is a simplified version
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
