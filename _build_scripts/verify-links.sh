#!/bin/bash
set -e

URL_IGNORES="jsonlines.org/|arxiv.org/|huggingface.co/"
URL_IGNORES_DOCUSAURUS="github.com/.*github.com/|github.com/semi-technologies/weaviate-io/tree/"
# Note #1 github.com/.*github.com/ - is to ignore meta links that include blog co-authors
# Note #2 github.com/semi-technologies/weaviate-io/tree/ - is for edit on github links

echo "**************************************
Starting Link Verification
PATH ${NETLIFY_URL}
URL_IGNORES ${URL_IGNORES}|${URL_IGNORES_DOCUSAURUS}
**************************************"

linkinator $NETLIFY_URL \
--recurse \
--skip "${URL_IGNORES}|${URL_IGNORES_DOCUSAURUS}" \
--timeout 10000 \
--verbosity error \
--url-rewrite-search "https://weaviate.io" \
--url-rewrite-replace "${NETLIFY_URL}"
