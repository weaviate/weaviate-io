package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	//"github.com/weaviate/weaviate-go-client/v4/weaviate"
	//"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/filters"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// ==========================================
// ===== Single Filter =====
// ==========================================

func TestSingleFilter(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START SingleFilter Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}, graphql.Field{Name: "round"}).
		// highlight-start
		WithWhere(filters.Where().
			WithPath([]string{"round"}).
			WithOperator(filters.Equal).
			WithValueString("Double Jeopardy!")).
		// highlight-end
		WithLimit(3).
		Do(ctx)
	// END SingleFilter Go

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	objects := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, obj := range objects {
		question := obj.(map[string]interface{})
		assert.Equal(t, "Double Jeopardy!", question["round"])
	}
}

// ==========================================
// ===== Single Filter with nearText =====
// ==========================================
/*
func TestSingleFilterNearText(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START searchFilterNearText Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}, graphql.Field{Name: "round"}, graphql.Field{Name: "points"}).
		// highlight-start
		WithWhere(filters.Where().
			WithPath([]string{"points"}).
			WithOperator(filters.GreaterThan).
			WithValueInt(200)).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"fashion icons"})).
		// highlight-end
		WithLimit(3).
		Do(ctx)
	// END searchFilterNearText GO

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	objects := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, obj := range objects {
		question := obj.(map[string]interface{})
		assert.Greater(t, question["points"].(float64), float64(200))
	}
}
*/

// ==========================================
// ===== ContainsAny Filter =====
// ==========================================

func TestContainsAnyFilter(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START ContainsAnyFilter Go
	// highlight-start
	tokenList := []string{"australia", "india"}
	// highlight-end

	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}, graphql.Field{Name: "round"}, graphql.Field{Name: "points"}).
		// highlight-start
		WithWhere(filters.Where().
			WithPath([]string{"answer"}).
			WithOperator(filters.ContainsAny).
			WithValueText(tokenList...)).
		// highlight-end
		WithLimit(3).
		Do(ctx)
	// END ContainsAnyFilter Go

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	objects := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, obj := range objects {
		question := obj.(map[string]interface{})
		answer := strings.ToLower(question["answer"].(string))
		assert.True(t, strings.Contains(answer, "australia") || strings.Contains(answer, "india"))
	}
}

// ==========================================
// ===== ContainsAll Filter =====
// ==========================================

func TestContainsAllFilter(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START ContainsAllFilter Go
	// highlight-start
	tokenList := []string{"blue", "red"}
	// highlight-end

	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}, graphql.Field{Name: "round"}, graphql.Field{Name: "points"}).
		// highlight-start
		WithWhere(filters.Where().
			WithPath([]string{"question"}).
			WithOperator(filters.ContainsAll).
			WithValueText(tokenList...)).
		// highlight-end
		WithLimit(3).
		Do(ctx)
	// END ContainsAllFilter Go

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	objects := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, obj := range objects {
		question := obj.(map[string]interface{})
		questionText := strings.ToLower(question["question"].(string))
		assert.True(t, strings.Contains(questionText, "blue") && strings.Contains(questionText, "red"))
	}
}

// ==========================================
// ===== Partial Match Filter =====
// ==========================================

func TestLikeFilter(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START LikeFilter Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}, graphql.Field{Name: "round"}).
		// highlight-start
		WithWhere(filters.Where().
			WithPath([]string{"answer"}).
			WithOperator(filters.Like).
			WithValueText("*inter*")).
		// highlight-end
		WithLimit(3).
		Do(ctx)
	// END LikeFilter Go

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	objects := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, obj := range objects {
		question := obj.(map[string]interface{})
		assert.Contains(t, strings.ToLower(question["answer"].(string)), "inter")
	}
}

// ==========================================
// ===== Multiple Filters with And =====
// ==========================================

func TestMultipleFiltersAnd(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START MultipleFiltersAnd Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}, graphql.Field{Name: "round"}, graphql.Field{Name: "points"}).
		// highlight-start
		WithWhere(filters.Where().
			WithOperator(filters.And).
			WithOperands([]*filters.WhereBuilder{
				filters.Where().WithPath([]string{"round"}).WithOperator(filters.Equal).WithValueString("Double Jeopardy!"),
				filters.Where().WithPath([]string{"points"}).WithOperator(filters.LessThan).WithValueInt(600),
			},
			)).
		// highlight-end
		WithLimit(3).
		Do(ctx)
	// END MultipleFiltersAnd Go

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	objects := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, obj := range objects {
		question := obj.(map[string]interface{})
		assert.Equal(t, "Double Jeopardy!", question["round"])
		assert.Less(t, question["points"].(float64), float64(600))
	}
}

// ==========================================
// ===== Multiple Filters with Nesting =====
// ==========================================

func TestMultipleFiltersNested(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START MultipleFiltersNested Go
	operands := []*filters.WhereBuilder{
		filters.Where().WithPath([]string{"points"}).WithOperator(filters.GreaterThan).WithValueInt(300),
		filters.Where().WithPath([]string{"points"}).WithOperator(filters.LessThan).WithValueInt(700),
	}

	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}, graphql.Field{Name: "round"}, graphql.Field{Name: "points"}).
		// highlight-start
		WithWhere(filters.Where().
			WithOperator(filters.And).
			WithOperands(operands)).
		// highlight-end
		WithLimit(3).
		Do(ctx)
	// END MultipleFiltersNested Go

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	objects := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, obj := range objects {
		question := obj.(map[string]interface{})
		assert.Contains(t, strings.ToLower(question["answer"].(string)), "bird")
		points := question["points"].(float64)
		assert.True(t, points < 300 || points > 700)
	}
}

// ===================================================
// ===== Filters using Cross-referenced property =====
// ===================================================

func TestCrossReference(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START CrossReference Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{Name: "round"},
			graphql.Field{
				Name: "hasCategory",
				Fields: []graphql.Field{
					{Name: "... on JeopardyCategory", Fields: []graphql.Field{{Name: "title"}}},
				},
			},
		).
		// highlight-start
		WithWhere(filters.Where().
			WithPath([]string{"hasCategory", "JeopardyCategory", "title"}).
			WithOperator(filters.Like).
			WithValueText("*Sport*")).
		// highlight-end
		WithLimit(3).
		Do(ctx)
	// END CrossReference Go

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	objects := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, obj := range objects {
		question := obj.(map[string]interface{})
		categories := question["hasCategory"].([]interface{})
		for _, category := range categories {
			title := category.(map[string]interface{})["title"].(string)
			assert.Contains(t, strings.ToLower(title), "sport")
		}
	}
}

func TestFilterByDate(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START FilterByDateDatatype Go
	// Note: In Go, months are 1-indexed
	filterTime := time.Date(2020, 6, 10, 0, 0, 0, 0, time.UTC)
	// Alternatively, you can use an RFC 3339 timestamp:
	// filterTime, _ := time.Parse(time.RFC3339, "2022-06-10T00:00:00Z")

	response, err := client.GraphQL().Get().
		WithClassName("Article").
		WithLimit(3).
		WithFields(graphql.Field{Name: "publicationDate"}).
		WithWhere(filters.Where().
			WithPath([]string{"publicationDate"}).
			WithOperator(filters.GreaterThan).
			WithValueDate(filterTime)).
		Do(ctx)
	// END FilterByDateDatatype Go

	// Check for errors
	require.NoError(t, err, "Error executing query")

	// Assert that we got results
	objects, ok := result.Data["Get"].(map[string]interface{})["CollectionWithDate"].([]interface{})
	require.True(t, ok, "Failed to get objects from result")
	require.NotEmpty(t, objects, "No objects returned from query")

	// Check each object
	for _, obj := range objects {
		properties, ok := obj.(map[string]interface{})
		require.True(t, ok, "Object is not a map")

		// Print the properties for debugging
		jsonProperties, err := json.MarshalIndent(properties, "", "  ")
		require.NoError(t, err, "Error marshaling properties to JSON")
		t.Logf("Object properties: %s", jsonProperties)

		// Assert that 'some_date' exists and is after filterTime
		someDate, ok := properties["some_date"].(string)
		require.True(t, ok, "'some_date' is not a string")

		objectTime, err := time.Parse(time.RFC3339, someDate)
		require.NoError(t, err, "Error parsing 'some_date'")

		assert.True(t, objectTime.After(filterTime), "Object date is not after filter date")
	}

	// Assert that we got no more than 3 results
	assert.LessOrEqual(t, len(objects), 3, "Got more than 3 results")
}

// ========================================
// FilterByID
// ========================================

func TestFilterById(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START FilterById Go
	targetID := "00037775-1432-35e5-bc59-443baaef7d80"
	response, err := client.GraphQL().Get().
		WithClassName("Article").
		WithFields(graphql.Field{Name: "title"}).
		WithWhere(filters.Where().
			WithPath([]string{"id"}).
			WithOperator(filters.Equal).
			WithValueString(targetID)).
		WithFields(
			graphql.Field{Name: "title"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "id"},
				},
			},
		).
		Do(ctx)
	// END FilterById Go

	require.NoError(t, err)

	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	object := response.Data["Get"].(map[string]interface{})["Article"].([]interface{})[0].(map[string]interface{})
	assert.Equal(t, targetID, object["_additional"].(map[string]interface{})["id"])
}

// ========================================
// FilterByTimestamp
// ========================================

func TestFilterByTimestamp(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START FilterByTimestamp Go
	timestampStr := "2020-01-01T00:00:00+00:00"
	layout := "2006-01-02T15:04:05Z07:00"

	timestamp, err := time.Parse(layout, timestampStr)
	if err != nil {
		fmt.Println("Error parsing time:", err)
		return
	}

	response, err := client.GraphQL().Get().
		WithClassName("Article").
		WithFields(graphql.Field{Name: "title"}).
		WithWhere(filters.Where().
			WithPath([]string{"_creationTimeUnix"}).
			WithOperator(filters.GreaterThan).
			WithValueDate(timestamp)).
		WithFields(
			graphql.Field{Name: "title"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "creationTimeUnix"},
				},
			},
		).
		WithLimit(3).
		Do(ctx)
	// END FilterByTimestamp Go

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	queryTime, err := time.Parse(time.RFC3339, timestampStr)
	require.NoError(t, err)

	object := response.Data["Get"].(map[string]interface{})["Article"].([]interface{})[0].(map[string]interface{})
	respEpoch := int64(object["_additional"].(map[string]interface{})["creationTimeUnix"].(float64))
	assert.Greater(t, respEpoch, queryTime.Unix())
}

// ========================================
// FilterByPropertyLength
// ========================================

func TestFilterByPropertyLength(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START FilterByPropertyLength Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{Name: "answer"}).
		WithWhere(filters.Where().
			WithPath([]string{"len(answer)"}).
			WithOperator(filters.GreaterThan).
			WithValueInt(20)).
		WithLimit(3).
		Do(ctx)
	// END FilterByPropertyLength Go

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	objects := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, obj := range objects {
		question := obj.(map[string]interface{})
		assert.Greater(t, len(question["answer"].(string)), 20)
	}
}

// ========================================
// FilterByPropertyNullState
// ========================================

func TestFilterByPropertyNullState(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START FilterByPropertyNullState Go
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{Name: "points"}).
		WithWhere(filters.Where().
			WithPath([]string{"points"}).
			WithOperator(filters.IsNull).
			WithValueBoolean(true)).
		WithLimit(3).
		Do(ctx)
	// END FilterByPropertyNullState Go

	require.NoError(t, err)
	outBytes, err := json.Marshal(response)
	require.NoError(t, err)
	fmt.Printf("%s\n", string(outBytes))

	objects := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, obj := range objects {
		question := obj.(map[string]interface{})
		assert.Nil(t, question["points"])
	}
}

// ========================================
// FilterByGeolocation
// ========================================

// TODO - Add geolocation data to the test data set & uncomment this section

func TestFilterByGeolocation(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START FilterbyGeolocation Go
	geoFilter := filters.Where().
		WithPath([]string{"headquartersGeoLocation"}).
		WithOperator(filters.WithinGeoRange).
		WithValueGeoRange(&filters.GeoCoordinatesParameter{
			Latitude:    52.39,
			Longitude:   4.84,
			MaxDistance: 1000,
		})

	response, err := client.GraphQL().Get().
		WithClassName("Publication").
		WithWhere(geoFilter).
		WithFields(graphql.Field{Name: "name"}).
		WithFields(graphql.Field{
			Name: "headquartersGeoLocation",
			Fields: []graphql.Field{
				{Name: "latitude"},
				{Name: "longitude"},
			},
		}).
		Do(ctx)
	// END FilterbyGeolocation Go

	if err != nil {
		log.Fatalf("Error executing query: %v", err)
	}

	// Pretty print the result
	resultJSON, err := json.MarshalIndent(geoResult.Data, "", "  ")
	if err != nil {
		log.Fatalf("Error marshaling result to JSON: %v", err)
	}
	fmt.Printf("%s\n", resultJSON)

}
