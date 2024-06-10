// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END


// START APIKeyWCD
package main

import (
  "context"
  "fmt"
  "os"
  "github.com/weaviate/weaviate-go-client/v4/weaviate"
)

// Instantiate the client with the auth config
cfg := weaviate.Config{
  Host:"",  // Replace WEAVIATE_INSTANCE_URL with your instance URL
  Scheme: "http",
  AuthConfig: auth.ApiKey{Value: weaviateKey},
  Headers: nil,
}

client, err := weaviate.NewClient(cfg)
if err != nil{
  fmt.Println(err)
}
// END APIKeyWCD