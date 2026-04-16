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

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Update user subscription status in DB
      console.log(`Payment successful for session ${session.id}`);
      break;
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      // Update subscription status in DB
      console.log(`Subscription updated: ${subscription.id}`);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
