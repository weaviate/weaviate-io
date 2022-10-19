#!/bin/bash
URL_IGNORES="/console.semi.technology/,/weaviate-newsletter.semi.technology/,/demo.dataset.playground.semi.technology/,/vectors.network/,/codepen.io/,/linkedin.com/,/twitter.com/,/t.co/,/arxiv.org/,/semi-technologies\/weaviate-io\/tree/,/computerhope.com/"


# FOR LOCAL TEST
# read -ra DIFF_FILES <<< `git diff --name-only --diff-filter=AC main... | sed -e "s/ /\\\ /g"`

# GET git diff – to get a list of new files in this PR
read -ra DIFF_FILES <<< `git diff --name-only --diff-filter=AC HEAD...$TRAVIS_BRANCH | sed -e "s/ /\\\ /g"`

# then add them all to a string containing all the new .html files that htmlproofer should ignore
DIFF_IGNORES=""
for i in "${DIFF_FILES[@]}"; do
    if [[ $i =~ ^developers/.* ]]
    then
        FILE_TO_IGNORE=https://weaviate.io\/${i%.md}.html
        DIFF_IGNORES="${DIFF_IGNORES},$FILE_TO_IGNORE"
    fi
done
# echo $DIFF_IGNORES

# RUN htmlproofer
bundle exec htmlproofer --ignore-status-codes '0,999,429,403,303' \
--check-external-hash=false \
--check-internal-hash=false \
--allow-missing-href=true \
--allow_hash_href \
--assume-extension \
--enforce_https=false \
./_site \
--ignore-urls "${URL_IGNORES}${DIFF_IGNORES}" \
--swap-urls '^/BASEURL/:/' || travis_terminate 1
