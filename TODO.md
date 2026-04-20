# Rev-Pro VPS Deploy TODO

## Current Status
- [x] GitHub repo synced
- [x] Docker installed VPS
- [x] Repo cloned /opt/rev-pro
- [ ] Fix Docker build errors
- [ ] Deploy live

## Step 1: Code Fixes (Local)
- [x] Dockerfile: Load .env.production for build
- [x] src/app/dashboard/page.tsx: Add Suspense for useSearchParams
- [x] next.config.ts: remove deprecated eslint build option

## Step 2: Deploy to VPS
- [ ] Copy .env.production to /opt/rev-pro/.env.production
- [ ] Rebuild containers on VPS with docker compose up -d --build
- [ ] Verify with docker compose ps and https://rev-pro.dev

## Step 3: Validation
- [ ] Check homepage loads (no ERR_CONNECTION_CLOSED)
- [ ] Check dashboard route loads without prerender crash
- [ ] Check settings/account route loads with Supabase env available
