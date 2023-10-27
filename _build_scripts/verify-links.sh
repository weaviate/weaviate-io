#!/bin/bash
set -e
set -o errexit # stop script immediately on error

URL_IGNORES="jsonlines.org/|arxiv.org/|linkedin.com/in/|crunchbase.com|www.nytimes.com|www.researchgate.net|www.meetup.com|wiki.pathmind.com|twitter.com|towardsdatascience.com|medium.com|openai.com|www.hr-brew.com|www.battery.com|docs.cohere.com/|www.googletagmanager.com|12factor.net|github.com|github.com/weaviate/howto*|instagram.com|kaggle.com|merriam-webster.com|ai.meta.com|huggingface.co/docs/hub/model-cards|aclanthology.org/D19-1445|bib.dbvis.de|ingwb.com|/pricing|opensource.org/|gpt-index.readthedocs.io|open.spotify.com/"
DOCUSAURUS_IGNORES="github.com/.*github.com/|github.com/weaviate/weaviate-io|github.com/weaviate/howto-weaviate-retrieval-plugin*"
# Note #1 github.com/.*github.com/ - is to ignore meta links that include blog co-authors
# Note #2 github.com/weaviate/weaviate-io/tree/ - is for edit on github links

# Extract Netlify URL
NETLIFY_LOC=$(grep -r 'Website Draft URL:' netlify.out)
NETLIFY_URL=$(echo ${NETLIFY_LOC:19})

echo "**************************************
Starting Link Verification
PATH: ${NETLIFY_URL}
URL_IGNORES: ${URL_IGNORES}|${DOCUSAURUS_IGNORES}
**************************************"

./node_modules/.bin/linkinator ${NETLIFY_URL} \
--recurse \
--skip "${URL_IGNORES}|${DOCUSAURUS_IGNORES}" \
--timeout 5000 \
--verbosity error \
--url-rewrite-search "https://weaviate.io" \
--url-rewrite-replace "${NETLIFY_URL}" \
--retry true \
--retry-errors true \
--retry-errors-count 4 \
--retry-errors-jitter 4

# USE search/replace to test validity of links on Nelify, as they might not yet exist on weaviate.io

echo "**************************************
Link Verification Complete
**************************************"