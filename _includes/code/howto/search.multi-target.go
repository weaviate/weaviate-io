// START BasicFull
package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

func main() {
	cfg := weaviate.Config{
		Host:   "localhost:8080",
		Scheme: "http",
		Headers: map[string]string{
			"X-Openai-Api-Key": os.Getenv("OPENAI_API_KEY"),
		},
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		panic(err)
	}

	className := "JeopardyTiny"
	// END BasicFull

	// START MultiBasic // START BasicFull
	concepts := []string{"a wild animal"}
	nearText := client.GraphQL().NearTextArgBuilder().
		WithConcepts(concepts).
		WithTargetVectors("jeopardy_questions_vector", "jeopardy_answers_vector")

	ctx := context.Background()

	result, err := client.GraphQL().Get().
	WithClassName(className).
	WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
	WithNearText(nearText).
	Do(ctx)
	// END MultiBasic // START BasicFull

	if err != nil {
		panic(err)
	}

	fmt.Printf("%+v", result)
}

// END BasicFull

// START WeightFull
package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

func main() {
	cfg := weaviate.Config{
		Host:   "localhost:8080",
		Scheme: "http",
		Headers: map[string]string{
			"X-Openai-Api-Key": os.Getenv("OPENAI_API_KEY"),
		},
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		panic(err)
	}

	className := "Jeopardy_Tiny_Dataset"
	// END WeightFull

	// START WeightBasic // START WeightFull
	concepts := []string{"a wild animal"}
	nearText := client.GraphQL().NearTextArgBuilder().
		WithConcepts(concepts).
		WithTargetVectors("jeopardy_questions_vector", "jeopardy_answers_vector")

	ctx := context.Background()
	// END WeightBasic // END WeightFull

	// START WeightFull
	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
		WithNearText(nearText).
		Do(ctx)

        {name: "Manual weights", mta: client.GraphQL().MultiTargetArgumentBuilder().ManualWeights(map[string]float32{"first": 1, "second": 1})},

	if err != nil {
		panic(err)
	}

	fmt.Printf("%+v", result)
}

// END WeightFull
