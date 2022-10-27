#!/bin/bash
set -e

# A map of the github contributors that connects to @Slack handles
declare -A git_slack_map
git_slack_map=(
    ["Andrzej Liszka"]="<@U036Y4GPB6W>"
    ["Bob van Luijt"]="<@U6P955HC4>"
    ["Charlie Harr"]="<@U044XTHRVFA>"
    ["Connor Shorten"]="<@U03FRH53SUT>"
    ["Dirk Kulawiak"]="<@U03MWHK4KV3>"
    ["Erika Cardenas"]="<@U03RSSRAMLN>"
    ["Etienne Dilocker"]="<@UCZDBEZ5F>"
    ["John Trengrove"]="<@U03KPAE8Y7K>"
    ["JP Hwang"]="<@U0441J6PYGN>"
    ["Marcin Antas"]="<@U01E5BJ3UV7>"
    ["Parker Duckworth"]="<@U034QPLGSCU>"
    ["Sebastian Witalec"]="<@U03DENV56CR>"
    ["Svitlana"]="<@U03DQTXFDHS>"
)

# Get the Author name and map it to their Slack handle
github_name="$(git log -1 $TRAVIS_COMMIT --pretty="%aN")"
# if it is not a PR and we have a Slack ID
if [ "$type" != "pull_request" ] && [ ${git_slack_map[$github_name]+_} ]; then
    AUTHOR_NAME=${git_slack_map[$github_name]}
else
    AUTHOR_NAME=$github_name
fi

# Prepare the message and send it to Slack
NETLIFY_LOC=$(grep -r 'Website Draft URL:' netlify.out)
NETLIFY_LOC_STRP=$(echo ${NETLIFY_LOC:29})
MESSAGE="{ \"text\": \"Hey $AUTHOR_NAME - your website (\`$TRAVIS_BRANCH\`) is live at: $NETLIFY_LOC_STRP \" }"

echo $MESSAGE > payload.json

# Send the slack message
curl -X POST -H 'Content-type: application/json' -d @payload.json https://hooks.slack.com/services/$SLACK_BOT
