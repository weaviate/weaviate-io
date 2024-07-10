#!/bin/bash

echo "Stop Docker compose"
docker-compose -f ./tests/docker-compose.yml down  --timeout 30
docker-compose -f ./tests/docker-compose-anon.yml down  --timeout 30
docker-compose -f ./tests/docker-compose-anon-2.yml down  --timeout 30
docker-compose -f ./tests/docker-compose-anon-clip.yml down  --timeout 30
docker-compose -f ./tests/docker-compose-three-nodes.yml down  --timeout 30
