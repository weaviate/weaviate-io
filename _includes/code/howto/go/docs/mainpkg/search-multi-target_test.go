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

// ========================
// ===== Basic search =====
// ========================

func TestMultiBasic(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START MultiBasic Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyTiny").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			}).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"a wild animal"}).
			WithTargetVectors("jeopardy_questions_vector", "jeopardy_answers_vector")).
		WithLimit(2).
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
	resp, err := client.GraphQL().Get().
		WithClassName("JeopardyTiny").
		WithFields(graphql.Field{Name:"jeopardy_questions_vector"}, graphql.Field{Name:"jeopardy_answers_vector"}).
		WithLimit(1).
		Do(ctx)

	require.NoError(t, err)
	require.Len(t, resp, 1)

	v1 := resp.Data["Get"].(map[string]interface{})["JeopardyTiny"].([]interface{})[0].(map[string]interface{})["jeopardy_questions_vector"].([]float32)
	v2 := resp.Data["Get"].(map[string]interface{})["JeopardyTiny"].([]interface{})[0].(map[string]interface{})["jeopardy_questions_vector"].([]float32)

	// START MultiTargetNearVector Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyTiny").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"},graphql.Field{
			Name: "_additional",
			Fields: []graphql.Field{
				{Name: "distance"},
			},
		}).
		WithNearVector(client.GraphQL().NearVectorArgBuilder().WithVectorPerTarget(  map[string][]float32{"jeopardy_questions_vector": v1, "jeopardy_answers_vector": v2})).
		WithLimit(2).
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
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"},
		graphql.Field{
			Name: "_additional",
			Fields: []graphql.Field{
				{Name: "distance"},
			},
		}).

		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"a wild animal"}).
			WithTargets(client.GraphQL().MultiTargetArgumentBuilder().Average("jeopardy_questions_vector", "jeopardy_answers_vector"))).
		WithLimit(2).
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
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"},
		graphql.Field{
			Name: "_additional",
			Fields: []graphql.Field{
				{Name: "distance"},
			},
		}).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"a wild animal"}).
			WithTargets(client.GraphQL().MultiTargetArgumentBuilder().ManualWeights(map[string]float32{
				"jeopardy_questions_vector": 10,
				"jeopardy_answers_vector":   50,
			}))).
		WithLimit(2).
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
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"},
		graphql.Field{
			Name: "_additional",
			Fields: []graphql.Field{
				{Name: "distance"},
			},
		}).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"a wild animal"}).
			WithTargetVectors("jeopardy_questions_vector", "jeopardy_answers_vector").
			WithTargets(client.GraphQL().MultiTargetArgumentBuilder().ManualWeights(map[string]float32{
				"jeopardy_questions_vector": 10,
				"jeopardy_answers_vector":   10,
			}))).
		WithLimit(2).
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
