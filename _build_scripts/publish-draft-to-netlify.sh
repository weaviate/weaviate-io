#!/bin/bash
set -e

# For Netlify - change robot.txt to Disallow - so that crawlers will ignore it
mv build/robots.txt build/robots.txt.live
echo -e "User-agent: *
Disallow: /" >> build/robots.txt

BR_NAME=$(cat .git/HEAD | cut -c 17-)

./node_modules/.bin/netlify deploy --dir=build --alias ${BR_NAME} --site=tangerine-buttercream-20c32f > netlify.out

# sudo netlify deploy --dir=build --site=tangerine-buttercream-20c32f >> netlify.out

# Bring back the original robots.txt file
rm build/robots.txt
mv build/robots.txt.live build/robots.txt
