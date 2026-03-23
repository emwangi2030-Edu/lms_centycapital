#!/usr/bin/env bash
set -euo pipefail

# Deploy static LMS console files to production web root.
# Default target uses the SSH host alias already configured in this environment.

TARGET_HOST="${TARGET_HOST:-linode-2}"
TARGET_PATH="${TARGET_PATH:-/home/lms.centycapital.com/public_html}"

echo "[1/3] Validating local files..."
test -f index.html
test -f app.js
test -f centycred.html

echo "[2/3] Ensuring remote path exists..."
ssh "${TARGET_HOST}" "mkdir -p '${TARGET_PATH}'"

echo "[3/3] Syncing files..."
rsync -avz \
  --exclude ".git/" \
  --exclude "*.log" \
  --exclude ".well-known/" \
  ./ "${TARGET_HOST}:${TARGET_PATH}/"

echo "Deploy complete -> ${TARGET_HOST}:${TARGET_PATH}"
