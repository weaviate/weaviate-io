#!/bin/bash
set -e

# Get commit message
commit_message="$(git log -1 $TRAVIS_COMMIT --pretty="%s")"

# Replace &, <, and > – as per Slack API instructions
commit_message=${commit_message//&/&amp;}
commit_message=${commit_message//</&lt;}
commit_message=${commit_message//>/&gt;}

### TODO: When going live
# Swap the deployment message for the weaviate.io message
###
# Prepare the message and send it to Slack
# MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your *weaviate website* update is live at: 🔥 https://weaviate.io 🔥 \n> $commit_message\" }"
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your *weaviate website* is also deployed to a temp GCP bucket \n(check with Bob and Sebastian if you would like to see it) \" }"

echo $MESSAGE > payload_release.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload_release.json https://hooks.slack.com/services/$SLACK_BOT
