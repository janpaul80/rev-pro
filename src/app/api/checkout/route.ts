import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any, // Using stable typing
});

export async function POST(request: Request) {
  try {
    const { planId } = await request.json();
    
    // Validate user session
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in first.' }, { status: 401 });
    }

    // Map plan to price ID
    let priceId = '';
    if (planId === 'basic') {
       priceId = process.env.BASIC_PRICE_ID!;
    } else if (planId === 'pro') {
       priceId = process.env.PRO_PRICE_ID!;
    } else {
       return NextResponse.json({ error: 'Invalid plan ID' }, { status: 400 });
    }

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID not configured in environment' }, { status: 500 });
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      client_reference_id: user.id, // Links Stripe session back to our exact Supabase User User ID
      metadata: {
        userId: user.id, // Good backup context 
        planTier: planId
      }
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
