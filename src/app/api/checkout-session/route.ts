import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Lazy init to bypass build-time crashes
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Stripe key missing' }, { status: 500 });
  }

  const stripe = new Stripe(key || 'placeholder', {
    apiVersion: '2025-01-27.acacia' as any,
  });

  try {
    const { priceId, userId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // Determine origin robustly (works behind nginx/proxy)
    const forwardedProto = req.headers.get('x-forwarded-proto');
    const forwardedHost = req.headers.get('x-forwarded-host') || req.headers.get('host');
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      req.headers.get('origin') ||
      (forwardedHost ? `${forwardedProto || 'https'}://${forwardedHost}` : 'https://rev-pro.dev');

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      client_reference_id: userId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/pricing`,
      metadata: { userId }
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
