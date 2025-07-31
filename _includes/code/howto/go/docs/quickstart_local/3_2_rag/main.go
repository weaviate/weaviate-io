// RAG
package main

import (
	"context"
	"fmt"

	"github.com/weaviate/weaviate-go-client/v5/weaviate"
	"github.com/weaviate/weaviate-go-client/v5/weaviate/graphql"
)

func main() {
	cfg := weaviate.Config{
		Host:   "localhost:8080",
		Scheme: "http",
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// highlight-start
	ctx := context.Background()

	generatePrompt := "Write a tweet with emojis about these facts."

	gs := graphql.NewGenerativeSearch().GroupedResult(generatePrompt)

	response, err := client.GraphQL().Get().
		WithClassName("Question").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{Name: "category"},
		).
		WithGenerativeSearch(gs).
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

// END RAG
