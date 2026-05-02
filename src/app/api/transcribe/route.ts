import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  return NextResponse.json(
    { error: 'Transcription service currently unavailable' },
    { status: 503 }
  );
}

