#!/bin/bash
set -e

# Note, |github.com/.*github.com/| is to ignore meta links that include blog co-authors
URL_IGNORES="jsonlines.org/|arxiv.org/|github.com/.*github.com/|huggingface.co/"

echo "**************************************
Starting Link Verification
PATH ${NETLIFY_URL}
URL_IGNORES ${URL_IGNORES}
**************************************"

linkinator $NETLIFY_URL \
--recurse \
--skip "${URL_IGNORES}" \
--timeout 10000 \
--verbosity error \
--url-rewrite-search "https://weaviate.io" \
--url-rewrite-replace "${NETLIFY_URL}"
