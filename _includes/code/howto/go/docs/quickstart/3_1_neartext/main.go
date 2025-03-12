// NearText
// Set these environment variables
// WCD_HOSTNAME			your Weaviate instance hostname
// WCD_API_KEY  		your Weaviate instance API key

package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

func main() {
	cfg := weaviate.Config{
		Host:       os.Getenv("WCD_HOSTNAME"),
		Scheme:     "https",
		AuthConfig: auth.ApiKey{Value: os.Getenv("WCD_API_KEY")},
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// highlight-start
	ctx := context.Background()

	response, err := client.GraphQL().Get().
		WithClassName("Question").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{Name: "category"},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"biology"})).
		WithLimit(2).
		Do(ctx)
	// highlight-end

	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", response)
}

// END NearText
