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
branch_name=${GITHUB_REF##*/}
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your :docusaurus: *weaviate website* build (\`$branch_name\`) is ready on Netlify: $NETLIFY_URL \n> $commit_message\" }"

echo $MESSAGE > payload_netlify.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload_netlify.json https://hooks.slack.com/services/$SLACK_BOT
