#!/bin/bash
set -e

URL_IGNORES="jsonlines.org/|arxiv.org/|linkedin.com/in/|crunchbase.com|www.nytimes.com|www.researchgate.net|www.meetup.com|wiki.pathmind.com|twitter.com|towardsdatascience.com|medium.com|openai.com|www.hr-brew.com|www.battery.com|docs.cohere.com/|www.googletagmanager.com|12factor.net|github.com|github.com/weaviate/howto*|instagram.com|kaggle.com|merriam-webster.com|ai.meta.com|huggingface.co/docs/hub/model-cards|aclanthology.org/D19-1445|bib.dbvis.de|ingwb.com|opensource.org/|gpt-index.readthedocs.io|open.spotify.com/|/undefined|https://youtu.be"
GITHUB_IGNORES="github.com|github.com/weaviate/howto*"
DEV_BUILD_LINKS_TO_IGNORE="assets/files|downloads/docker-templates|https://weaviate.io"

echo "**************************************
Starting Link Verification
PATH: ./build
URL_IGNORES: ${URL_IGNORES}|${GITHUB_IGNORES}|${ASSET_FILES}
**************************************"

./node_modules/.bin/linkinator ./build.dev \
--recurse \
--skip "${URL_IGNORES}|${GITHUB_IGNORES}|${DEV_BUILD_LINKS_TO_IGNORE}" \
--timeout 5000 \
--verbosity error \
--retry true \
--retry-errors true \
--retry-errors-count 5 \
--retry-errors-jitter 5 \
--directory-listing true

echo "**************************************
Link Verification Complete
**************************************"