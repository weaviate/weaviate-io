#!/bin/bash
set -e

# Prepare the message and send it to Slack
# NETLIFY_LOC=$(grep -r 'Website Draft URL:' netlify.out)
# NETLIFY_LOC_STRP=$(echo ${NETLIFY_LOC:29})
# MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your :docusaurus: *weaviate website* build (\`$TRAVIS_BRANCH\`) is ready on Netlify: $NETLIFY_LOC_STRP \" }"
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your :docusaurus: *weaviate website* build (\`$TRAVIS_BRANCH\`) is ready on Netlify: $NETLIFY_URL \" }"

echo $MESSAGE > payload_netlify.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload_netlify.json https://hooks.slack.com/services/$SLACK_BOT
