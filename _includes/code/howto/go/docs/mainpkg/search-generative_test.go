package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

// =====================================
// ===== SINGLE GENERATIVE EXAMPLE =====
// =====================================

func TestSingleGenerative(t *testing.T) {

	client := setupClient()
	ctx := context.Background()

	// START SingleGenerativeProperties Go
	generatePrompt := "Convert the following into a question for twitter. Include emojis for fun, but do not include the answer: {question}."

	gs := graphql.NewGenerativeSearch().SingleResult(generatePrompt)
	
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
		).
		WithGenerativeSearch(gs).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"World history"})).
		WithLimit(2).
		Do(ctx)
	// END SingleGenerativeProperties Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	questions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Len(t, questions, 2)

	for _, question := range questions {
		q := question.(map[string]interface{})
		assert.Contains(t, q, "question")
		assert.Contains(t, q, "_additional")
		additional := q["_additional"].(map[string]interface{})
		generate := additional["generate"].(map[string]interface{})
		assert.Contains(t, generate, "singleResult")
		assert.NotNil(t, generate["singleResult"])
	}
}

// =====================================================
// ===== SINGLE GENERATIVE EXAMPLE WITH PROPERTIES =====
// =====================================================

func TestSingleGenerativeProperties(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START SingleGenerativeProperties Go
	generatePrompt := "Convert this quiz question: {question} and answer: {answer} into a trivia tweet."

	gs := graphql.NewGenerativeSearch().SingleResult(generatePrompt)
	
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
		).
		WithGenerativeSearch(gs).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"World history"})).
		WithLimit(2).
		Do(ctx)
	// END SingleGenerativeProperties Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	questions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Len(t, questions, 2)

	for _, question := range questions {
		q := question.(map[string]interface{})
		assert.Contains(t, q, "_additional")
		additional := q["_additional"].(map[string]interface{})
		generate := additional["generate"].(map[string]interface{})
		assert.Contains(t, generate, "singleResult")
		assert.NotNil(t, generate["singleResult"])
	}
}

// ======================================
// ===== GROUPED GENERATIVE EXAMPLE =====
// ======================================

func TestGroupedGenerative(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GroupedGenerative Go
	generatePrompt := "What do these animals have in common, if anything?"

	gs := graphql.NewGenerativeSearch().GroupedResult(generatePrompt)
	
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "points"},
		).
		WithGenerativeSearch(gs).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"Cute animals"})).
		WithLimit(3).
		Do(ctx)
	// END GroupedGenerative Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	questions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Len(t, questions, 3)

	for _, question := range questions {
		q := question.(map[string]interface{})
		assert.Contains(t, q, "points")
		assert.Contains(t, q, "_additional")
		additional := q["_additional"].(map[string]interface{})
		if generate, ok := additional["generate"].(map[string]interface{}); ok {
			assert.Contains(t, generate, "groupedResult")
		}
	}
}

// ======================================================
// ===== GROUPED GENERATIVE EXAMPLE WITH PROPERTIES =====
// ======================================================

func TestGroupedGenerativeProperties(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GroupedGenerativeProperties Go
	generatePrompt := "What do these animals have in common, if anything?"

	gs := graphql.NewGenerativeSearch().GroupedResult(generatePrompt, "answer", "question")

	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "points"},

		).
		WithGenerativeSearch(gs).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"Australian animals"})).
		WithLimit(3).
		Do(ctx)
	// END GroupedGenerativeProperties Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	questions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Len(t, questions, 3)

	for i, question := range questions {
		q := question.(map[string]interface{})
		assert.Contains(t, q, "question")
		assert.Contains(t, q, "points")
		assert.Contains(t, q, "_additional")
		additional := q["_additional"].(map[string]interface{})
		if i == 0 {
			generate := additional["generate"].(map[string]interface{})
			assert.Contains(t, generate, "groupedResult")
			assert.True(t, strings.Contains(generate["groupedResult"].(string), "Australia"))
		}
	}
}