#!/bin/bash
set -e

URL_IGNORES="jsonlines.org/|arxiv.org/|huggingface.co/"
DOCUSAURUS_IGNORES="github.com/.*github.com/|github.com/semi-technologies/weaviate-io/tree/"
# Note #1 github.com/.*github.com/ - is to ignore meta links that include blog co-authors
# Note #2 github.com/semi-technologies/weaviate-io/tree/ - is for edit on github links

echo "**************************************
Starting Link Verification
PATH: ${NETLIFY_URL}
URL_IGNORES: ${URL_IGNORES}|${DOCUSAURUS_IGNORES}
**************************************"

linkinator $NETLIFY_URL \
--recurse \
--skip "${URL_IGNORES}|${DOCUSAURUS_IGNORES}" \
--timeout 10000 \
--verbosity error \
--url-rewrite-search "https://weaviate.io" \
--url-rewrite-replace "${NETLIFY_URL}" \
--format JSON

# USE search/replace to test validity of links on Nelify, as they might not yet exist on weaviate.io

echo "**************************************
Link Verification Complete
**************************************"