#!/bin/bash
set -e

# Set default ignore domains
URL_IGNORES="/console.semi.technology/,/weaviate-newsletter.semi.technology/,/demo.dataset.playground.semi.technology/,/vectors.network/,/codepen.io/,/linkedin.com/,/twitter.com/,/t.co/,/arxiv.org/,/semi-technologies\/weaviate-io\/tree/,/computerhope.com/"

# Get the main branch – this is needed as Travis does only a shallow fetch
git remote set-branches --add origin main
git remote set-branches --add origin $TRAVIS_BRANCH
git remote set-branches --add origin v1.16_ref2fec-centroid
git fetch

echo "BRANCH: $TRAVIS_BRANCH"
echo "BRANCH LAST COMMIT: $(git log -1 --format=%H)"
echo "HEAD: $(git merge-base origin/main HEAD)"

# GET github diff between this branch and main
echo `git diff --name-only --diff-filter=AC $(git merge-base origin/main HEAD)...$TRAVIS_BRANCH developers/`
read -ra DIFF_FILES <<< `git diff --name-only --diff-filter=AC $(git merge-base origin/main HEAD)...$TRAVIS_BRANCH developers/ | sed -e "s/ /\\\ /g"`

# then add them all to a string containing all the new .html files that htmlproofer should ignore
DIFF_IGNORES=""
echo ======NEW_FILES_TO_IGNORE_BY_htmlproofer======
for i in "${DIFF_FILES[@]}"; do
    echo "DIFF FILE: $i"
    if [[ $i =~ ^developers/.* ]]
    then
        FILE_TO_IGNORE=https://weaviate.io\/${i%.md}.html
        DIFF_IGNORES="${DIFF_IGNORES},$FILE_TO_IGNORE"
        echo $FILE_TO_IGNORE
    fi
done
echo ==============================================

STOP HERE
