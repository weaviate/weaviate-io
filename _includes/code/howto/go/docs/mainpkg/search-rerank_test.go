package main

import (
	"context"
	"encoding/json"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

// ==================================
// ===== nearText before rerank =====
// ==================================

func TestNearTextBeforeRerank(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START NamedVectorNearText Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{Name: "_additional", Fields: []graphql.Field{{Name: "distance"}}},
		).
		WithNearText((&graphql.NearTextArgumentBuilder{}).WithConcepts([]string{"flying"})).
		WithLimit(10).
		Do(ctx)
	// END NamedVectorNearText Go

	require.NoError(t, err)

	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	questions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Len(t, questions, 10)

	for _, question := range questions {
		q := question.(map[string]interface{})
		assert.Contains(t, q["_additional"].(map[string]interface{}), "distance")
	}
}

// =================================
// ===== nearText after rerank =====
// =================================

func TestNearTextAfterRerank(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START RerankNearText Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "rerank(property: \"answer\" query: \"floating\") { score }"},
						{Name: "score"},
					},
				},
		).
		WithNearText((&graphql.NearTextArgumentBuilder{}).WithConcepts([]string{"flying"})).
		WithLimit(10).
		Do(ctx)
	// END RerankNearText Go

	require.NoError(t, err)

	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	questions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Len(t, questions, 10)

	for _, question := range questions {
		q := question.(map[string]interface{})
		additional := q["_additional"].(map[string]interface{})
		rerank := additional["rerank"].([]interface{})
		assert.Len(t, rerank, 1)
		assert.Contains(t, rerank[0].(map[string]interface{}), "score")
	}
}

// ============================
// ===== bm25 with rerank =====
// ============================

func TestBM25WithRerank(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START bm25Rerank Go
	bm25args := (&graphql.BM25ArgumentBuilder{}).WithQuery("paper")
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{

					{Name: "rerank(property: \"question\" query: \"publication\") { score }"},

					{Name: "score"},
				},
			},
		).
		WithBM25(bm25args).
		WithLimit(10).
		Do(ctx)
	// END bm25Rerank Go

	require.NoError(t, err)

	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	questions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Len(t, questions, 10)

	for _, question := range questions {
		q := question.(map[string]interface{})
		additional := q["_additional"].(map[string]interface{})
		rerank := additional["rerank"].([]interface{})
		assert.Len(t, rerank, 1)
		assert.Contains(t, rerank[0].(map[string]interface{}), "score")
	}
}
