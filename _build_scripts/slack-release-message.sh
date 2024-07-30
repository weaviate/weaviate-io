#!/bin/bash
set -e

# Get commit message
git_hash=$(echo "$GITHUB_SHA" | cut -c1-7)
commit_message="$(git log -1 $git_hash --pretty="%s")"

# Replace &, <, and > – as per Slack API instructions
commit_message=${commit_message//&/&amp;}
commit_message=${commit_message//</&lt;}
commit_message=${commit_message//>/&gt;}

# Prepare the message and send it to Slack
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your :docusaurus: :weaviate-logo: *website update* is live at: 🔥 https://weaviate.io 🔥 \n> $commit_message\" }"

echo $MESSAGE > payload_release.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload_release.json https://hooks.slack.com/services/$SLACK_BOT
