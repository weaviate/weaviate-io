#!/bin/bash
set -e

# Prepare the message and send it to Slack
NETLIFY_LOC=$(grep -r 'Website Draft URL:' netlify.out)
NETLIFY_LOC_STRP=$(echo ${NETLIFY_LOC:29})
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your 🦖 *weaviate website* build (\`$TRAVIS_BRANCH\`) is live at: $NETLIFY_LOC_STRP \" }"

echo $MESSAGE > payload_netlify.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload_netlify.json https://hooks.slack.com/services/$SLACK_BOT
