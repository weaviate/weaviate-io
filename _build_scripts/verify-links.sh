#!/bin/bash
set -e

echo "BEFORE"

URL_IGNORES="weaviate.io|arxiv.org/|jsonlines.org/|github.com/*.,"

linkinator $NETLIFY_URL --recurse --skip "${URL_IGNORES}" --timeout 10000 --verbosity error

echo "AFTER"
