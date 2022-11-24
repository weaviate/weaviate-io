#!/bin/bash
set -e

# For Netlify - change robot.txt to Disallow - so that crawlers will ignore it
mv build/robots.txt build/robots.txt.live
echo -e "User-agent: *
Disallow: /" >> build/robots.txt


sudo netlify deploy --dir=build --site=tangerine-buttercream-20c32f >> netlify.out

# Bring back the original robots.txt file
rm build/robots.txt 
mv build/robots.txt.live build/robots.txt

# Temp share link to netlify
NETLIFY_LOC=$(grep -r 'Website Draft URL:' netlify.out)
NETLIFY_LOC_STRP=$(echo ${NETLIFY_LOC:29})

echo $NETLIFY_LOC_STRP
