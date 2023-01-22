#!/bin/bash
set -e

# deploy
netlify deploy --prod --dir=build --site=weaviate-io

# Share sitemap to G
curl https://www.google.com/ping?sitemap=https://weaviate.io/sitemap.xml