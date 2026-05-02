# Rev-Pro TODO

## ✅ Completed
- [x] Fixed 502 Bad Gateway on OAuth login callback (X-Forwarded-Host handling)
- [x] Nginx proxy buffer fix (256k buffers) for large OAuth headers
- [x] Suspense wrapper for useSearchParams on dashboard
- [x] Diagnosed transcription failure: Langdock AI agent cannot fetch TikTok/YouTube URLs
- [x] Added yt-dlp + ffmpeg to Docker image for URL → .mp4 extraction
- [x] Rewrote `/api/transcribe` to: (1) extract direct .mp4 via yt-dlp, (2) send that URL to Langdock
- [x] Polished subscription badge with per-tier colors (Free=gray, Basic=blue, Pro=gold)

## 🔄 Deploy Steps (run on VPS)
```bash
cd /opt/rev-pro
git pull   # or rsync fresh code
docker compose down
docker compose build --no-cache rev-pro   # picks up yt-dlp
docker compose up -d
docker compose logs -f rev-pro
```

## 🧪 Testing after deploy
1. Visit https://rev-pro.dev/dashboard
2. Paste any TikTok URL (e.g. `https://vm.tiktok.com/ZGdHN46Wv/`)
3. Click Transcribe
4. Watch logs: `docker compose logs -f rev-pro | grep -E "yt-dlp|Langdock|Transcribe"`
5. Confirm actual transcript text returned (not "I can't fetch URLs")

## ⏳ Remaining
- [ ] Competitive audit vs tokscript.com → build feature gap list
- [ ] Stripe subscription tiers: Basic & Pro pricing pages + checkout
- [ ] Badge everywhere user appears (settings, history, profile)
- [ ] Batch transcription UI
- [ ] Export options: SRT / VTT / JSON (already partial CSV)
- [ ] History search + filters
- [ ] Fallback: if Langdock fails → use OpenAI Whisper API directly on downloaded audio
