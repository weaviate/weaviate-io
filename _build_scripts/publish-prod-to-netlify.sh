#!/bin/bash
set -e

##
# Remove when in prod
##
# For Netlify - change robot.txt to Disallow - so that crawlers will ignore it
mv build/robots.txt build/robots.txt.live
echo -e "User-agent: *
Disallow: /" >> build/robots.txt
##
# End REMOVE block
##

# deploy
netlify deploy --prod --dir=build --site=weaviate-io

##
# Remove when in prod
##
# Bring back the original robots.txt file
rm build/robots.txt 
mv build/robots.txt.live build/robots.txt
##
# End REMOVE block
##