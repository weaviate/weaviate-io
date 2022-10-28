#!/bin/bash
set -e

# Prepare the message and send it to Slack
NETLIFY_LOC=$(grep -r 'Website Draft URL:' netlify.out)
NETLIFY_LOC_STRP=$(echo ${NETLIFY_LOC:29})
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your website is live at: 🔥 https://weaviate.io 🔥 \" }"

echo $MESSAGE > payload.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload.json https://hooks.slack.com/services/$SLACK_BOT
