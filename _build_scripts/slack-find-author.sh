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
if [ ${git_slack_map[$github_name]+_} ]; then
    export AUTHOR_NAME=${git_slack_map[$github_name]}
else
    export AUTHOR_NAME=$github_name
fi
