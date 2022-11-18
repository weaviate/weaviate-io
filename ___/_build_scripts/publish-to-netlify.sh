#!/bin/bash
set -e

mv _site/robots.txt _site/robots.txt.live

echo -e "User-agent: *
Disallow: /" >> _site/robots.txt

sudo netlify deploy --dir=_site --site=tangerine-buttercream-20c32f >> netlify.out
rm _site/robots.txt 
mv _site/robots.txt.live _site/robots.txt
