package main

import (
	"context"
	"fmt"
	"os"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/filters"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

func setupClient() *weaviate.Client {
	// Best practice: store your credentials in environment variables
	wcdURL := os.Getenv("WCD_DEMO_URL")
	wcdAPIKey := os.Getenv("WCD_DEMO_RO_KEY")
	//openaiAPIKey := os.Getenv("OPENAI_APIKEY")
	wcdScheme := os.Getenv("WCD_DEMO_SCHEME")
	if wcdScheme == "" {
		wcdScheme = "https"
	}

	var cfg weaviate.Config

	if strings.Contains(wcdURL, "localhost") {
		cfg = weaviate.Config{
			Host:   wcdURL,
			Scheme: wcdScheme,

		}
	} else {

	cfg = weaviate.Config{
		Host:   wcdURL,
		Scheme: wcdScheme,
		AuthConfig: auth.ApiKey{
			Value: wcdAPIKey,
		},
		//Headers: map[string]string{
		//	"X-OpenAI-Api-Key": openaiAPIKey,
		//},
	}
}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		panic(fmt.Sprintf("Failed to create Weaviate client: %v", err))
	}

	return client
}

// ============================
// ===== Basic BM25 Query =====
// ============================

func TestBasicBM25Query(t *testing.T) {
	client := setupClient()

	// START Basic Go
	ctx := context.Background()
	className := "JeopardyQuestion"
	query := (&graphql.BM25ArgumentBuilder{}).WithQuery("food")
	limit := int(3)

	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
		).
		WithBM25(query).
		WithLimit(limit).
		Do(ctx)
	// END Basic Go

	require.NoError(t, err, "Failed to execute basic BM25 query")

	objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
	assert.Equal(t, 3, len(objects), "Expected 3 objects in the result")

	for _, obj := range objects {
		properties := obj.(map[string]interface{})
		fmt.Printf("%v\n", properties)
		assert.Contains(t, strings.ToLower(fmt.Sprintf("%v", properties)), "food", "Expected 'food' in the properties")
	}
}

// ================================================
// ===== BM25 Query with score / explainScore =====
// ================================================

func TestBM25QueryWithScore(t *testing.T) {
	client := setupClient()

	// START Score Go
	ctx := context.Background()
	className := "JeopardyQuestion"
	query := (&graphql.BM25ArgumentBuilder{}).WithQuery("food")
	limit := int(3)

	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "score"},
				},
			},
		).
		WithBM25(query).
		WithLimit(limit).
		Do(ctx)
	// END Score Go

	require.NoError(t, err, "Failed to execute BM25 query with score")

	objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
	assert.Equal(t, 3, len(objects), "Expected 3 objects in the result")

	for _, obj := range objects {
		properties := obj.(map[string]interface{})
		additional := properties["_additional"].(map[string]interface{})
		fmt.Printf("%v\n", properties)
		fmt.Printf("Score: %v\n", additional["score"])
		assert.NotNil(t, additional["score"], "Expected a non-nil score")
	}
}

// =================================
// ===== BM25 Query with limit =====
// =================================

func TestBM25QueryWithLimit(t *testing.T) {
	client := setupClient()

	// START limit Go
	ctx := context.Background()
	className := "JeopardyQuestion"
	query := (&graphql.BM25ArgumentBuilder{}).WithQuery("safety")
	limit := int(3)
	offset := int(1)

	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
		).
		WithBM25(query).
		WithLimit(limit).
		WithOffset(offset).
		Do(ctx)
	// END limit Go

	require.NoError(t, err, "Failed to execute BM25 query with limit")

	objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
	assert.Equal(t, 3, len(objects), "Expected 3 objects in the result")

	for _, obj := range objects {
		properties := obj.(map[string]interface{})
		fmt.Printf("%v\n", properties)
		assert.Contains(t, strings.ToLower(fmt.Sprintf("%v", properties)), "safety", "Expected 'safety' in the properties")
	}
}

// ===================================
// ===== BM25 Query with autocut =====
// ===================================

func TestBM25QueryWithAutocut(t *testing.T) {
	client := setupClient()

	// START autocut Go
	ctx := context.Background()
	className := "JeopardyQuestion"
	query := (&graphql.BM25ArgumentBuilder{}).WithQuery("safety")
	autoLimit := int(1)

	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
		).
		WithBM25(query).
		WithAutocut(autoLimit).
		Do(ctx)
	// END autocut Go

	require.NoError(t, err, "Failed to execute BM25 query with autocut")

	objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
	assert.GreaterOrEqual(t, len(objects), 1, "Expected at least 1 object in the result")

	for _, obj := range objects {
		properties := obj.(map[string]interface{})
		fmt.Printf("%v\n", properties)
		assert.Contains(t, strings.ToLower(fmt.Sprintf("%v", properties)), "safety", "Expected 'safety' in the properties")
	}
}

// ===============================================
// ===== BM25 Query with Selected Properties =====
// ===============================================

func TestBM25QueryWithProperties(t *testing.T) {
	client := setupClient()

	// START Properties Go
	ctx := context.Background()
	className := "JeopardyQuestion"
	query := (&graphql.BM25ArgumentBuilder{}).WithQuery("safety").WithProperties("question")
	limit := int(3)

	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "score"},
				},
			},
		).
		WithBM25(query).
		WithLimit(limit).
		Do(ctx)
	// END Properties Go

	require.NoError(t, err, "Failed to execute BM25 query with properties")

	objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
	assert.Equal(t, 3, len(objects), "Expected 3 objects in the result")

	for _, obj := range objects {
		properties := obj.(map[string]interface{})
		additional := properties["_additional"].(map[string]interface{})
		fmt.Printf("%v\n", properties)
		fmt.Printf("Score: %v\n", additional["score"])
		assert.Contains(t, strings.ToLower(properties["question"].(string)), "safety", "Expected 'safety' in the question")
		assert.NotNil(t, additional["score"], "Expected a non-nil score")
	}
}

// ==============================================
// ===== BM25 Query with Boosted Properties =====
// ==============================================

func TestBM25QueryWithBoostedProperties(t *testing.T) {
	client := setupClient()

	// START BoostedProperties Go
	ctx := context.Background()
	className := "JeopardyQuestion"
	query := (&graphql.BM25ArgumentBuilder{}).WithQuery("food").WithProperties("question^2", "answer")
	limit := int(3)

	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
		).
		WithBM25(query).
		WithLimit(limit).
		Do(ctx)
	// END BoostedProperties Go

	require.NoError(t, err, "Failed to execute BM25 query with boosted properties")

	objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
	assert.Equal(t, 3, len(objects), "Expected 3 objects in the result")

	for _, obj := range objects {
		properties := obj.(map[string]interface{})
		fmt.Printf("%v\n", properties)
		assert.Contains(t, strings.ToLower(fmt.Sprintf("%v", properties)), "food", "Expected 'food' in the properties")
	}
}

// ==================================
// ===== BM25 multiple keywords =====
// ==================================

func TestBM25MultipleKeywords(t *testing.T) {
	client := setupClient()

	// START MultipleKeywords Go
	ctx := context.Background()
	className := "JeopardyQuestion"
	query := (&graphql.BM25ArgumentBuilder{}).WithQuery("food wine").WithProperties("question")// search for food or wine
	limit := int(5)

	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(
			graphql.Field{Name: "question"},
		).
		WithBM25(query).
		WithLimit(limit).
		Do(ctx)
	// END MultipleKeywords Go

	require.NoError(t, err, "Failed to execute BM25 query with multiple keywords")

	objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
	assert.Equal(t, 5, len(objects), "Expected 5 objects in the result")

	for _, obj := range objects {
		properties := obj.(map[string]interface{})
		fmt.Printf("%v\n", properties["question"])
		assert.True(t, strings.Contains(strings.ToLower(properties["question"].(string)), "food") || 
						strings.Contains(strings.ToLower(properties["question"].(string)), "wine"),
					"Expected either 'food' or 'wine' in the question")
	}
}

// ==================================
// ===== Basic BM25 With Filter =====
// ==================================

func TestBM25WithFilter(t *testing.T) {
	client := setupClient()

	// START Filter Go
	ctx := context.Background()
	className := "JeopardyQuestion"

	query := (&graphql.BM25ArgumentBuilder{}).WithQuery("food")
	limit := int(3)

	filter := filters.Where().
		WithPath([]string{"round"}).
		WithOperator(filters.Equal).
		WithValueString("Double Jeopardy!")

	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(
			graphql.Field{Name: "answer"},
			graphql.Field{Name: "question"},
			graphql.Field{Name: "round"},
		).
		WithBM25(query).
		WithWhere(filter).
		WithLimit(limit).
		Do(ctx)
	// END Filter Go

	require.NoError(t, err, "Failed to execute BM25 query with filter")

	objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
	assert.LessOrEqual(t, len(objects), 3, "Expected 3 or fewer objects in the result")

	for _, obj := range objects {
		properties := obj.(map[string]interface{})
		fmt.Printf("%v\n", properties)
		assert.Contains(t, strings.ToLower(fmt.Sprintf("%v", properties)), "food", "Expected 'food' in the properties")
		assert.Equal(t, "Double Jeopardy!", properties["round"], "Expected 'Double Jeopardy!' as the round")
	}
}

// ==================================
// ===== BM25 groupBy  =====
// ==================================

func TestBM25GroupBy(t *testing.T) {
	t.Skip("Skipping test - bug in client.  Or in request.  Not sure.")
	client := setupClient()

	// START BM25GroupByGo
	ctx := context.Background()
	className := "JeopardyQuestion"
	query := (&graphql.BM25ArgumentBuilder{}).WithQuery("California")
	group := (&graphql.GroupByArgumentBuilder{}).WithPath([]string{"round"}).WithGroups(2).WithObjectsPerGroup(3)

	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{Name: "round"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{
						Name: "groupedBy",
						Fields: []graphql.Field{
							{Name: "value"},
						},
					},
					{Name: "id"},
				},
			},
			graphql.Field{
				Name: "_group",
				Fields: []graphql.Field{
					{Name: "count"},
					{
						Name: "groupedBy",
						Fields: []graphql.Field{
							{Name: "path"},
							{Name: "value"},
						},
					},
					{Name: "maxScore"},
					{Name: "minScore"},
				},
			},
		).
		WithBM25(query).
		WithGroupBy(group).
		Do(ctx)
	// END BM25GroupByGo

	require.NoError(t, err, "Failed to execute BM25 query with groupBy")

	groups := result.Data["Get"].(map[string]interface{})[className].([]interface{})
	assert.LessOrEqual(t, len(groups), 2, "Expected 2 or fewer groups")

	for _, group := range groups {
		groupData := group.(map[string]interface{})
		groupInfo := groupData["_group"].(map[string]interface{})
		groupedBy := groupInfo["groupedBy"].(map[string]interface{})
		fmt.Printf("Group: %v\n", groupedBy["value"])
		fmt.Printf("Count: %v\n", groupInfo["count"])
		fmt.Printf("Max Score: %v\n", groupInfo["maxScore"])
		fmt.Printf("Min Score: %v\n", groupInfo["minScore"])
		
		objects := groupData["_additional"].([]interface{})
		assert.LessOrEqual(t, len(objects), 3, "Expected 3 or fewer objects in each group")
		for _, obj := range objects {
			fmt.Printf("%v\n", obj)
		}
		fmt.Println()

		assert.NotNil(t, groupedBy["value"], "Expected a non-nil group value")
		assert.NotNil(t, groupInfo["count"], "Expected a non-nil count")
		assert.NotNil(t, groupInfo["maxScore"], "Expected a non-nil maxScore")
		assert.NotNil(t, groupInfo["minScore"], "Expected a non-nil minScore")
	}
}
