#!/usr/bin/env bash
# Standard landing redeploy — local layer, gated restart, cache flush.
set -e
cd /home/fendox/maxco/maxco-landing
git pull --rebase
( cd /home/fendox/maxco/layout && git pull )
rm -rf node_modules/.c12 .output .nuxt
env LOCAL_LAYER=true NODE_OPTIONS="--max-old-space-size=4096" bun run build
[ -f .output/nitro.json ] || { echo "BUILD FAILED — not restarting"; exit 1; }
pm2 restart TV-WEBSITE-2 --update-env
redis-cli --scan --pattern "website:nitro:*" | xargs -r redis-cli del
sleep 5
for u in "/" "/blog" "/apps" "/apps/mag-box/mag-portal" "/v57/legal/terms-service"; do
  curl -sL -o /dev/null -w "%{http_code}  $u\n" "https://maxcotv.com$u"
done
