#!/bin/bash
set -e

linkinator $NETLIFY_URL \
--recurse \
--skip 'weaviate.io|github.com/*.,|arxiv.org/|jsonlines.org/' \
--timeout 10000 \
--verbosity error
