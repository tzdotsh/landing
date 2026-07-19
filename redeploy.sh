#!/usr/bin/env bash
set -e
cd /home/fendox/maxco/maxco-landing
git pull
LOCAL_LAYER=false bun install
bun run build
cd .output/server && bun install && cd ../..
pm2 restart TV-WEBSITE-2
sleep 3
echo -n "Homepage: "; curl -s http://127.0.0.1:2027/ -o /dev/null -w "%{http_code}\n"
echo -n "/v57/:    "; curl -s http://127.0.0.1:2027/v57/ -o /dev/null -w "%{http_code}\n"
