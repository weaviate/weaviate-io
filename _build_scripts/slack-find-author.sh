#!/bin/bash
set -e

# A map of the github contributors that connects to @Slack handles
declare -A git_slack_map
git_slack_map=(
    ["Andrzej Liszka"]="<@U036Y4GPB6W>"
    ["Bob van Luijt"]="<@U6P955HC4>"
    ["Charlie Harr"]="<@U044XTHRVFA>"
    ["Connor Shorten"]="<@U03FRH53SUT>"
    ["Daniel Madalitso Phiri"]="<@U060UJ41YBC>"
    ["daveatweaviate"]="<@U05RK4X5AJU>"
    ["Dirk Kulawiak"]="<@U03MWHK4KV3>"
    ["Duda Nogueira"]="<@U05K3K9M82F>"
    ["Erika Cardenas"]="<@U03RSSRAMLN>"
    ["Etienne Dilocker"]="<@UCZDBEZ5F>"
    ["hsm207"]="<@U04C2EATF6K>" #Shukri
    ["Igor Lamas"]="<@U04MGB80F45>"
    ["John Trengrove"]="<@U03KPAE8Y7K>"
    ["JP Hwang"]="<@U0441J6PYGN>"
    ["Ken MacInnis"]="<@U048YRPG5J7>"
    ["Leonie"]="<@U05EG4DEJMC>"
    ["iamleonie"]="<@U05EG4DEJMC>"
    ["Marcin Antas"]="<@U01E5BJ3UV7>"
    ["Parker Duckworth"]="<@U034QPLGSCU>"
    ["Peter Schramm"]="<@U03MWHJQ7PX>"
    ["Philip Vollet"]="<@U0573N5V97A>"
    ["Sebastian Witalec"]="<@U03DENV56CR>"
    ["Shan-Weaviate"]="<@U05DKAH2ZL1>"
    ["Stefan Bogdan"]="<@U01DPKTVA93>"
    ["Svitlana"]="<@U03DQTXFDHS>"
    ["svitlana-sm"]="<@U03DQTXFDHS>"
    ["thomashacker"]="<@U056E1ZEM3L>"
    ["Wera"]="<@U043TKSEU5V>"
    ["Zain Hasan"]="<@U043TKSJQF9>"
)

# Get the Author name and map it to their Slack handle
git_hash=$(echo "$GITHUB_SHA" | cut -c1-7)
github_name="$(git log -1 $git_hash --pretty="%aN")"
if [ ${git_slack_map[$github_name]+_} ]; then
    export AUTHOR_NAME=${git_slack_map[$github_name]}
else
    export AUTHOR_NAME=$github_name
fi
