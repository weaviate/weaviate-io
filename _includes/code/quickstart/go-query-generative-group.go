// START GenerativeSearchGroupedTaskExample
// Set these environment variables
// WEAVIATE_URL      your Weaviate instance URL, without https prefix
// WEAVIATE_API_KEY  your Weaviate instance API key
// OPENAI_API_KEY    your OpenAI API key

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

func main() {
	// Create the client
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

	fields := []graphql.Field{
		{Name: "question"},
		{Name: "answer"},
		{Name: "category"},
	}

	nearText := client.GraphQL().
		NearTextArgBuilder().
		WithConcepts([]string{"biology"})

	generativeSearch := graphql.NewGenerativeSearch().GroupedResult("Write a tweet with emojis about these facts.")

	result, err := client.GraphQL().Get().
		WithClassName("Question").
		WithFields(fields...).
		WithNearText(nearText).
		WithLimit(2).
		WithGenerativeSearch(generativeSearch).
		Do(context.Background())
	if err != nil {
		panic(err)
	}

	jsonOutput, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(jsonOutput))
}

// END GenerativeSearchGroupedTaskExample
