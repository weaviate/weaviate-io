#!/bin/bash
set -e

URL_IGNORES="/console.semi.technology/,/weaviate-newsletter.semi.technology/,/demo.dataset.playground.semi.technology/,/vectors.network/,/codepen.io/,/linkedin.com/,/twitter.com/,/t.co/,/arxiv.org/,/semi-technologies\/weaviate-io\/tree/,/computerhope.com/"

# FOR LOCAL TEST
# read -ra DIFF_FILES <<< `git diff --name-only --diff-filter=AC main... | sed -e "s/ /\\\ /g"`

# GET git diff – to get a list of new files in this PR

git remote set-branches --add origin main
git fetch

read -ra DIFF_FILES <<< `git diff --name-only --diff-filter=AC $(git merge-base origin/main HEAD) developers/ | sed -e "s/ /\\\ /g"`
# read -ra DIFF_FILES <<< `git diff --name-only --diff-filter=AC $(git merge-base origin/main HEAD) | sed -e "s/ /\\\ /g"`

# read -ra DIFF_FILES <<< `git diff --name-only --diff-filter=AC $(git merge-base main HEAD) | sed -e "s/ /\\\ /g"`

# read -ra DIFF_FILES <<< `git diff --name-only --diff-filter=AC main..$TRAVIS_BRANCH | sed -e "s/ /\\\ /g"`
# read -ra DIFF_FILES <<< `git diff --name-only --diff-filter=AC main..$TRAVIS_BRANCH | sed -e "s/ /\\\ /g"`
# read -ra DIFF_FILES <<< `git diff --name-only --diff-filter=AC main...$TRAVIS_BRANCH | sed -e "s/ /\\\ /g"`

# then add them all to a string containing all the new .html files that htmlproofer should ignore
DIFF_IGNORES=""
for i in "${DIFF_FILES[@]}"; do
    echo "DIFF: $i"
    if [[ $i =~ ^developers/.* ]]
    then
        FILE_TO_IGNORE=https://weaviate.io\/${i%.md}.html
        DIFF_IGNORES="${DIFF_IGNORES},$FILE_TO_IGNORE"
    fi
done
echo ======DIFF_IGNORES======
echo $DIFF_IGNORES
echo ========================

RUN htmlproofer
bundle exec htmlproofer --ignore-status-codes '0,999,429,403,303' \
--check-external-hash=false \
--check-internal-hash=false \
--allow-missing-href=true \
--ignore-files "/developers\/weaviate\/v/," \
--ignore-urls "${URL_IGNORES}${DIFF_IGNORES}" \
--allow_hash_href \
--assume-extension \
./_site --swap-urls '^/BASEURL/:/'
