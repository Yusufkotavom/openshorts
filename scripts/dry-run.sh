#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[dry-run] Python syntax check (compileall)"
rm -rf __pycache__ || true
python3 -m compileall -q .

echo "[dry-run] Basic file checks"
test -f docker-compose.yml
test -f Dockerfile
test -f dashboard/package.json
test -f app.py
test -f main.py

echo "[dry-run] OK"

