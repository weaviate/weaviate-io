#!/bin/bash
set -e

echo "BEFORE"

URL_IGNORES="weaviate.io|github.com/*.,|arxiv.org/|jsonlines.org/"

linkinator $NETLIFY_URL --recurse --skip "${URL_IGNORES}" --timeout 10000 --verbosity error

echo "AFTER"
