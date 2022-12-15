#!/bin/bash
set -e

# Prepare the message and send it to Slack
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your :docusaurus: *weaviate website* build (\`$TRAVIS_BRANCH\`) is ready on Netlify: $NETLIFY_URL \" }"

echo $MESSAGE > payload_netlify.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload_netlify.json https://hooks.slack.com/services/$SLACK_BOT
