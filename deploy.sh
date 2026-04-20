#!/bin/bash
# Deploy rev-pro to VPS
# Run on VPS as root

set -e

echo "=== Rev-Pro Deploy ==="

# Clone
cd /opt
rm -rf rev-pro
git clone https://github.com/janpaul80/rev-pro.git
cd rev-pro

# Use .env.production from /opt
cp /opt/.env.production .env.production

# Build
docker compose down || true
docker compose pull
docker compose build

echo "=== Checking SSL Certificates ==="
# Check if certificates exist in the named volume
if ! docker run --rm -v certbot-etc:/etc/letsencrypt alpine sh -c 'ls -d /etc/letsencrypt/live/rev-pro.dev > /dev/null 2>&1'; then
    echo "No valid SSL certificates found. Starting bootstrap process..."
    
    # Disable the main config so Nginx doesn't crash from missing certs
    mv nginx/conf.d/rev-pro.conf nginx/conf.d/rev-pro.conf.disabled
    
    # Start nginx on port 80 (using bootstrap.conf)
    docker compose up -d nginx
    
    # Request certificate via webroot
    docker compose run --rm certbot
    
    # Restore the main config
    mv nginx/conf.d/rev-pro.conf.disabled nginx/conf.d/rev-pro.conf
else
    echo "SSL Certificates exist. Bootstrapping not required."
fi

# Start all services
docker compose up -d

# Restart Nginx to pick up any new certificate/config
docker compose restart nginx

echo "=== Deploy Complete! ==="
echo "Check: docker compose ps"
echo "Logs: docker compose logs -f"
echo "Site: https://rev-pro.dev"
