#!/bin/bash
set -e

# Get commit message
commit_message="$(git log -1 $TRAVIS_COMMIT --pretty="%s")"

# Replace &, <, and > – as per Slack API instructions
commit_message=${commit_message//&/&amp;}
commit_message=${commit_message//</&lt;}
commit_message=${commit_message//>/&gt;}

# Prepare the message and send it to Slack
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your :docusaurus: *weaviate website* update is live at: 🔥 https://weaviate.io 🔥 \n> $commit_message\" }"

echo $MESSAGE > payload_release.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload_release.json https://hooks.slack.com/services/$SLACK_BOT
