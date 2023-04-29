#!/bin/bash

echo "Stop Docker compose"
nohup docker-compose  -f ./tests/docker-compose.yml down
