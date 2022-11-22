#!/bin/bash
set -e

# Get commit message
commit_message="$(git log -1 $TRAVIS_COMMIT --pretty="%s%b")"

# Replace &, <, and > – as per Slack API instructions
commit_message=${commit_message//&/&amp;}
commit_message=${commit_message//</&lt;}
commit_message=${commit_message//>/&gt;}

# Prepare the message and send it to Slack
NETLIFY_LOC=$(grep -r 'Website Draft URL:' netlify.out)
NETLIFY_LOC_STRP=$(echo ${NETLIFY_LOC:29})
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your *weaviate website* build (\`$TRAVIS_BRANCH\`) is live at: $NETLIFY_LOC_STRP\n> $commit_message \" }"

echo $MESSAGE > payload_netlify.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload_netlify.json https://hooks.slack.com/services/$SLACK_BOT
