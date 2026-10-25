#!/usr/bin/env bash
# Invoked by deploy/webhook-server.cjs on a verified push to main.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Pulling latest main..."
git pull --ff-only origin main

echo "Installing dependencies..."
npm install

echo "Building..."
npm run build

echo "Restarting pm2 process..."
pm2 restart baltescontainer --update-env

echo "Deploy complete."
