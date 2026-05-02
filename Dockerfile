FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache python3 py3-pip ffmpeg bash
COPY --from=builder /app .
RUN python3 -m pip install --no-cache-dir --break-system-packages yt-dlp

EXPOSE 3000
CMD ["npm", "start"]
