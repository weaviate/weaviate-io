#!/bin/bash

# set directories
CURRENT_DIR=$(pwd)
GEM_PATH=$CURRENT_DIR/.bundle
BUNDLER_PATH=$GEM_PATH/bin

# initialize rbenv
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

# set the ruby version locally to 2.7.5
rbenv local 2.7.5

# check if _data/roadmap.yml exists, if not print a warning an exit
if [ ! -f ./_data/roadmap.yml ]
then
    echo -e "💡\033[1;31m _data/roadmap.yml is missing. Run:"
    echo -e " \033[0;34m python tools/create-roadmap.py"
    echo -e " \033[1;37m or"
    echo -e " \033[0;34m python3 tools/create-roadmap.py"

    exit
fi

echo -e "\n💡 \033[1;31mplease access via localhost and not 127.0.0.1! \033[0m"

echo -e "\n💡 \033[1;31mDocumentation outside the current folders will not be rendered (but it will in prod) \033[0m"

echo -e "\n🎉 \033[1;34mstarting jekyll \033[0m\n"

$BUNDLER_PATH/bundle exec jekyll s --watch --livereload --incremental --host=localhost --baseurl="" --config "_config.yml,_config_dev.yml" --open-url http://localhost:4000/
