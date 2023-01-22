#!/bin/bash
set -e

# deploy
netlify deploy --prod --dir=build --site=weaviate-io
