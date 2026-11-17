#!/bin/sh
set -eu

base=${PAGES_BASE_PATH:-}
base=${base%/}

ASTRO_TELEMETRY_DISABLED=1 PAGES_BASE_PATH="$base" npm run build
NEXT_TELEMETRY_DISABLED=1 PAGES_BASE_PATH="$base/demos/nextjs" npm run build -w demos/nextjs
npm run build -w demos/vite -- --base "$base/demos/vite/"

mkdir -p dist/demos/nextjs dist/demos/vite
cp -R demos/nextjs/out/. dist/demos/nextjs/
cp -R demos/vite/dist/. dist/demos/vite/
