#!/bin/bash
set -e

# Prepare the message and send it to Slack
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your website is live at: 🔥 https://weaviate.io 🔥 \" }"

echo $MESSAGE > payload.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload.json https://hooks.slack.com/services/$SLACK_BOT
