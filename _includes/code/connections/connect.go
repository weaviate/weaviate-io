// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

// START APIKeyWCD
// Set these environment variables
// WEAVIATE_URL      your WCD instance URL
// WEAVIATE_API_KEY  your WCD instance API key

package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
)

// Create the client
func CreateClient() {
	cfg := weaviate.Config{
		Host:       os.Getenv("WEAVIATE_URL"),
		Scheme:     "https",
		AuthConfig: auth.ApiKey{Value: os.Getenv("WEAVIATE_API_KEY")},
		Headers:    nil,
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// Check the connection
	live, err := client.Misc().LiveChecker().Do(context.Background())
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", live)

}

func main() {
	CreateClient()
}
// END APIKeyWCD

// START LocalNoAuth
package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
)

// Create the client
func CreateClient() {
	cfg := weaviate.Config{
		Host:       "localhost:8080",
		Scheme:     "http",
        Headers:    nil,
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// Check the connection
	live, err := client.Misc().LiveChecker().Do(context.Background())
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", live)

}

func main() {
	CreateClient()
}
// END LocalNoAuth


// START ThirdPartyAPIKeys
// Set these environment variables
// WEAVIATE_URL      your WCD instance URL
// WEAVIATE_API_KEY  your WCD instance API key
// COHERE_API_KEY    your Cohere API key

package main

import (
  "context"
  "fmt"
  "os"
  "github.com/weaviate/weaviate-go-client/v4/weaviate"
  "github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
)

// Create the client
func CreateClient() {
cfg := weaviate.Config{
    Host: os.Getenv("WEAVIATE_URL"),   // URL only, no scheme prefix
    Scheme: "https",
    AuthConfig: auth.ApiKey{Value: os.Getenv("WEAVIATE_API_KEY")},
    Headers: map[string]string{
        "X-Cohere-Api-Key": os.Getenv("WEAVIATE_COHERE_KEY"),
    },
}

client, err := weaviate.NewClient(cfg)
if err != nil{
    fmt.Println(err)
}

// Check the connection
live, err := client.Misc().LiveChecker().Do(context.Background())
if err != nil {
	panic(err)
}
fmt.Printf("%v", live)
}

func main() {
	CreateClient()
}

// END ThirdPartyAPIKeys