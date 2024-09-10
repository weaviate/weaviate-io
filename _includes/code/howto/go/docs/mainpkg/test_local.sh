#!/bin/sh
export WCD_DEMO_URL=localhost:8080
export WCD_DEMO_RO_KEY=aaaa
export OPENAI_APIKEY=aaaa
export WCD_DEMO_SCHEME=http
go test .
