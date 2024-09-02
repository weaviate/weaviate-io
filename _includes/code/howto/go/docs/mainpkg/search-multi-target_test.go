package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

func setupClient() *weaviate.Client {
	cfg := weaviate.Config{
		Host:   "http://localhost:8080",
		Scheme: "http",
		Headers: map[string]string{
			"X-OpenAI-Api-Key": os.Getenv("OPENAI_API_KEY"),
		},
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		panic(fmt.Sprintf("Failed to create Weaviate client: %v", err))
	}

	return client
}

// ========================
// ===== Basic search =====
// ========================

func TestMultiBasic(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START MultiBasic Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyTiny").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"a wild animal"})).
		WithLimit(2).
		WithTargetVectors([]string{"jeopardy_questions_vector", "jeopardy_answers_vector"}).
		WithAdditional("distance").
		Do(ctx)
	// END MultiBasic Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	objects := response.Data["Get"].(map[string]interface{})["JeopardyTiny"].([]interface{})
	assert.Len(t, objects, 2)

	for _, obj := range objects {
		item := obj.(map[string]interface{})
		assert.Contains(t, item, "question")
		assert.Contains(t, item, "answer")
		assert.Contains(t, item["_additional"].(map[string]interface{}), "distance")
	}
}

// ========================
// ===== Specify query vectors =====
// ========================

func TestMultiTargetNearVector(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// First, fetch some vectors
	resp, err := client.Data().Creator().
		WithClassName("JeopardyTiny").
		WithFields("jeopardy_questions_vector", "jeopardy_answers_vector").
		WithLimit(1).
		Do(ctx)

	require.NoError(t, err)
	require.Len(t, resp, 1)

	v1 := resp[0].Properties.(map[string]interface{})["jeopardy_questions_vector"].([]float32)
	v2 := resp[0].Properties.(map[string]interface{})["jeopardy_answers_vector"].([]float32)

	// START MultiTargetNearVector Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyTiny").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
		WithNearVector((&graphql.NearVectorArgumentBuilder{}).
			WithVectorJeopardyQuestionsVector(v1).
			WithVectorJeopardyAnswersVector(v2)).
		WithLimit(2).
		WithTargetVectors([]string{"jeopardy_questions_vector", "jeopardy_answers_vector"}).
		WithAdditional("distance").
		Do(ctx)
	// END MultiTargetNearVector Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	objects := response.Data["Get"].(map[string]interface{})["JeopardyTiny"].([]interface{})
	assert.Len(t, objects, 2)

	for _, obj := range objects {
		item := obj.(map[string]interface{})
		assert.Contains(t, item, "question")
		assert.Contains(t, item, "answer")
		assert.Contains(t, item["_additional"].(map[string]interface{}), "distance")
	}
}

// ========================
// ===== Simple join strategy =====
// ========================

func TestMultiTargetWithSimpleJoin(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START MultiTargetWithSimpleJoin Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyTiny").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"a wild animal"})).
		WithLimit(2).
		WithTargetVectors([]string{"jeopardy_questions_vector", "jeopardy_answers_vector"}).
		WithVectorJoinOperation(graphql.Average).
		WithAdditional("distance").
		Do(ctx)
	// END MultiTargetWithSimpleJoin Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	objects := response.Data["Get"].(map[string]interface{})["JeopardyTiny"].([]interface{})
	assert.Len(t, objects, 2)

	for _, obj := range objects {
		item := obj.(map[string]interface{})
		assert.Contains(t, item, "question")
		assert.Contains(t, item, "answer")
		assert.Contains(t, item["_additional"].(map[string]interface{}), "distance")
	}
}

// ========================
// ===== Set Manual Weights =====
// ========================

func TestMultiTargetManualWeights(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START MultiTargetManualWeights Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyTiny").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"a wild animal"})).
		WithLimit(2).
		WithTargetVectors([]string{"jeopardy_questions_vector", "jeopardy_answers_vector"}).
		WithVectorWeights(map[string]float32{
			"jeopardy_questions_vector": 10,
			"jeopardy_answers_vector":   50,
		}).
		WithAdditional("distance").
		Do(ctx)
	// END MultiTargetManualWeights Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	objects := response.Data["Get"].(map[string]interface{})["JeopardyTiny"].([]interface{})
	assert.Len(t, objects, 2)

	for _, obj := range objects {
		item := obj.(map[string]interface{})
		assert.Contains(t, item, "question")
		assert.Contains(t, item, "answer")
		assert.Contains(t, item["_additional"].(map[string]interface{}), "distance")
	}
}

// ========================
// ===== Relative Score =====
// ========================

func TestMultiTargetRelativeScore(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START MultiTargetRelativeScore Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyTiny").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"a wild animal"})).
		WithLimit(2).
		WithTargetVectors([]string{"jeopardy_questions_vector", "jeopardy_answers_vector"}).
		WithVectorWeights(map[string]float32{
			"jeopardy_questions_vector": 10,
			"jeopardy_answers_vector":   10,
		}).
		WithAdditional("distance").
		Do(ctx)
	// END MultiTargetRelativeScore Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	objects := response.Data["Get"].(map[string]interface{})["JeopardyTiny"].([]interface{})
	assert.Len(t, objects, 2)

	for _, obj := range objects {
		item := obj.(map[string]interface{})
		assert.Contains(t, item, "question")
		assert.Contains(t, item, "answer")
		assert.Contains(t, item["_additional"].(map[string]interface{}), "distance")
	}
}