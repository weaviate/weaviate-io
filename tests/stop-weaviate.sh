#!/bin/bash

echo "Stop Docker compose"
nohup docker-compose -f ./tests/docker-compose.yml down
nohup docker-compose -f ./tests/docker-compose-anon.yml down
nohup docker-compose -f ./tests/docker-compose-three-nodes.yml down
