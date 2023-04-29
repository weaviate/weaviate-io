#!/bin/bash

echo "Run Docker compose"
nohup docker-compose -f ./tests/docker-compose.yml up -d
