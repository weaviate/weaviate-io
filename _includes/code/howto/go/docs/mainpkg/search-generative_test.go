package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/filters"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)



// ===============================================
// ===== QUERY WITH TARGET VECTOR & nearText =====
// ===============================================

func TestNamedVectorNearText(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START NamedVectorNearText Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"}, 
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional", 
				Fields: []graphql.Field{
					{Name: "generate(singleResult: {prompt: \"Translate this into German: {review_body}\"} groupedResult: {task: \"Summarize these reviews\"}) { singleResult error }"},
				},
			},
		).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"animals in movies"})).
		WithWhere((&filters.WhereBuilder{}).
			WithPath([]string{"round"}).
			WithOperator(filters.Equal).
			WithValueText("Double Jeopardy!")).
		WithLimit(2).
		Do(ctx)
	// END NamedVectorNearText Go

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

// =====================================
// ===== SINGLE GENERATIVE EXAMPLE =====
// =====================================

func TestSingleGenerative(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START SingleGenerativeProperties Go
	generatePrompt := "Convert the following into a question for twitter. Include emojis for fun, but do not include the answer: {question}."
	
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{
				Name: "_additional", 
				Fields: []graphql.Field{
					{Name: fmt.Sprintf("generate(singleResult: {prompt: \"%s\"}) { singleResult error }", generatePrompt)},
				},
			},
		).
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
	
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{
				Name: "_additional", 
				Fields: []graphql.Field{
					{Name: fmt.Sprintf("generate(singleResult: {prompt: \"%s\"}) { singleResult error }", generatePrompt)},
				},
			},
		).
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
	
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "points"},
			graphql.Field{
				Name: "_additional", 
				Fields: []graphql.Field{
					{Name: fmt.Sprintf("generate(groupedResult: {task: \"%s\"}) { groupedResult error }", generatePrompt)},
				},
			},
		).
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
	
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "points"},
			graphql.Field{
				Name: "_additional", 
				Fields: []graphql.Field{
					{Name: fmt.Sprintf("generate(groupedResult: {task: \"%s\" properties: [\"answer\", \"question\"]}) { groupedResult error }", generatePrompt)},
				},
			},
		).
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