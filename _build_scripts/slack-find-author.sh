#!/bin/bash
set -e

# A map of the github contributors that connects to @Slack handles
declare -A git_slack_map
git_slack_map=(
    ["Abdel Rodríguez"]="<@U03R5ELDHHB>"
    ["Andrzej Liszka"]="<@U036Y4GPB6W>"
    ["Bob van Luijt"]="<@U6P955HC4>"
    ["Connor Shorten"]="<@U03FRH53SUT>"
    ["Daniel Madalitso Phiri"]="<@U060UJ41YBC>"
    ["Dirk Kulawiak"]="<@U03MWHK4KV3>"
    ["Duda Nogueira"]="<@U05K3K9M82F>"
    ["dyma solovei"]="<@U07NGR323JR>"
    ["Erika Cardenas"]="<@U03RSSRAMLN>"
    ["Etienne Dilocker"]="<@UCZDBEZ5F>"
    ["g-despot"]="<@U0872JK65FU>"
    ["Igor Lamas"]="<@U04MGB80F45>"
    ["John Trengrove"]="<@U03KPAE8Y7K>"
    ["JP Hwang"]="<@U0441J6PYGN>"
    ["Marcin Antas"]="<@U01E5BJ3UV7>"
    ["Mohamed Shahin"]="<@U05V4HPJ3M0>"
    ["Parker Duckworth"]="<@U034QPLGSCU>"
    ["Philip Vollet"]="<@U0573N5V97A>"
    ["Shan-Weaviate"]="<@U05DKAH2ZL1>"
    ["Spiros"]="<@U07G6HDV0HK>"
    ["Svitlana"]="<@U03DQTXFDHS>"
    ["svitlana-sm"]="<@U03DQTXFDHS>"
    ["thomashacker"]="<@U056E1ZEM3L>"
    ["Victoria Slocum"]="<@U05K0QFGRGV>"
    ["Wera"]="<@U043TKSEU5V>"
    ["Zain Hasan"]="<@U043TKSJQF9>"
    ["Mohamed Shahin"]="<@U05V4HPJ3M0>"
)

# Get the Author name and map it to their Slack handle
git_hash=$(echo "$GITHUB_SHA" | cut -c1-7)
github_name="$(git log -1 $git_hash --pretty="%aN")"
if [ ${git_slack_map[$github_name]+_} ]; then
    export AUTHOR_NAME=${git_slack_map[$github_name]}
else
    export AUTHOR_NAME=$github_name
fi
