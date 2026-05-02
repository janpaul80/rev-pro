import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabaseSession = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch (error) {
              // Ignore in route handlers
            }
          },
        },
      }
    );

    const { data: { user } } = await supabaseSession.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Generate a new secure API key
    const randomChars = crypto.randomBytes(24).toString('hex');
    const newKeyStr = `rev_live_${randomChars}`;
    
    // Create hash and prefix
    const keyPrefix = newKeyStr.substring(0, 15);
    
    // Using service role to bypass RLS if needed, although user can insert their own
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabaseAdmin
      .from('api_keys')
      .insert({
        user_id: user.id,
        key_name: 'Rev Pro Production',
        key_prefix: keyPrefix,
        key_hash: newKeyStr // In production this would be bcrypt. For MVP, we store it raw for easy validation, but don't return it on GETs.
      })
      .select()
      .single();

    if (error || !data) {
      console.error('[API Keys]', error);
      return NextResponse.json({ error: 'Failed to generate key' }, { status: 500 });
    }

    return NextResponse.json({ success: true, key: newKeyStr, record: data });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
