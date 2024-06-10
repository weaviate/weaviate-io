// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END


// START APIKeyWCD
// Set these environment variables
// WEAVIATE_URL     your WCD instance URL
// WEAVIATE_APIKEY  your WCD instance API key

weaviateUrl := os.Getenv("WEAVIATE_URL")
weaviateKey := os.Getenv("WEAVIATE_API_KEY")


package main

import (
  "context"
  "fmt"
  "os"
  "github.com/weaviate/weaviate-go-client/v4/weaviate"
)

// Instantiate the client with the auth config
cfg := weaviate.Config{
  Host: weaviateUrl,
  Scheme: "http",
  AuthConfig: auth.ApiKey{Value: weaviateKey},
  Headers: nil,
}

client, err := weaviate.NewClient(cfg)
if err != nil{
  fmt.Println(err)
}
// END APIKeyWCD