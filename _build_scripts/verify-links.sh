#!/bin/bash
set -e

URL_IGNORES="weaviate.io|github.com/*.,|arxiv.org/|jsonlines.org/"

linkinator $NETLIFY_URL --recurse --skip $URL_IGNORES --timeout 10000 --verbosity error
