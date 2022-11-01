#!/bin/bash
set -e

# Set default ignore domains
URL_IGNORES="/console.semi.technology/,/weaviate-newsletter.semi.technology/,/demo.dataset.playground.semi.technology/,/vectors.network/,/codepen.io/,/linkedin.com/,/twitter.com/,/t.co/,/arxiv.org/,/semi-technologies\/weaviate-io\/tree/,/computerhope.com/"

# Get the main branch – this is needed as Travis does only a shallow fetch
git remote set-branches --add origin main
git fetch

# GET github diff between this branch and main
DIFF_FILES=( $(git diff --name-only --diff-filter=AC $(git merge-base origin/main HEAD) developers/ | sed 's/:.*//') )

# then add them all to a string containing all the new .html files that htmlproofer should ignore
DIFF_IGNORES=",https://weaviate.io/developers/weaviate/current/retriever-vectorizer-modules/ref2vec-centroid.html,https://weaviate.io/developers/weaviate/current/restful-api-references/nodes.html"
echo ======NEW_FILES_TO_IGNORE_BY_htmlproofer======
for i in "${DIFF_FILES[@]}"; do
    # echo "DIFF: $i"
    if [[ $i =~ ^developers/.* ]]
    then
        FILE_TO_IGNORE=https://weaviate.io\/${i%.md}.html
        DIFF_IGNORES="${DIFF_IGNORES},$FILE_TO_IGNORE"
        echo $FILE_TO_IGNORE
    fi
done
echo ==============================================

# RUN htmlproofer
bundle exec htmlproofer --ignore-status-codes '0,999,429,403,303' \
--check-external-hash=false \
--check-internal-hash=false \
--allow-missing-href=true \
--ignore-files "/developers\/weaviate\/v/," \
--ignore-urls "${URL_IGNORES}${DIFF_IGNORES}" \
--allow_hash_href \
--assume-extension \
./_site --swap-urls '^/BASEURL/:/'
