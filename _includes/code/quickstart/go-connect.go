// START InstantiationExample
package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
)

// Set these environment variables
// WEAVIATE_URL      your Weaviate instance URL, without https prefix
// WEAVIATE_API_KEY  your Weaviate instance API key
// OPENAI_API_KEY    your OpenAI API key

// Create the client
func CreateClient() {
	cfg := weaviate.Config{
		Host:       os.Getenv("WEAVIATE_URL"),
		Scheme:     "https",
		AuthConfig: auth.ApiKey{Value: os.Getenv("WEAVIATE_API_KEY")},
		Headers: map[string]string{
			"X-OpenAI-Api-Key": os.Getenv("OPENAI_API_KEY"),
		},
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

// END InstantiationExample
