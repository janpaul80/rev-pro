# Rev Pro

Rev Pro is a transcription and content research tool for short form video. It is meant for creators, marketers, and small teams who want to turn TikTok, Instagram, YouTube, and podcast clips into text, hooks, notes, and useful exports.

This repo has the app, landing pages, dashboard pieces, Supabase setup, Stripe routes, transcription endpoints, and comparison pages.

## What it does

- Transcribes short form video content
- Shows creator research and content analysis ideas
- Includes hook and caption related flows
- Supports dashboard, admin, pricing, docs, and contact pages
- Includes Stripe checkout and webhook routes
- Uses Supabase for auth and data helpers

## Tech stack

- Next.js, React, TypeScript
- Supabase for auth and data
- Stripe for billing
- Framer Motion and Lucide React
- Recharts for charts
- Python helper script for transcription experiments
- Docker and Nginx files for deployment work

## Run it locally

```bash
git clone https://github.com/janpaul80/rev-pro.git
cd rev-pro
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create a local environment file before testing login, billing, or transcription:

```bash
cp .env.example .env.local
```

You will need Supabase, Stripe, and whichever transcription or AI provider you want to test. Do not commit real keys.

## Useful scripts

```bash
npm run dev      # Start the app
npm run build    # Build the app
npm run start    # Run the production build
```

## Notes

- `src/app/` has pages, API routes, dashboard, products, comparisons, and legal pages.
- `src/components/` has the landing, pricing, dashboard, feature, and transcription UI.
- `supabase/migrations/` has the database tables.
- `nginx/` and `Dockerfile` are deployment files.
- `transcribe.py` is a small transcription helper.

## Status

Prototype. It is a good snapshot of the product idea and app structure. Before production, it needs provider setup, privacy review, billing tests, and stronger transcript storage rules.
