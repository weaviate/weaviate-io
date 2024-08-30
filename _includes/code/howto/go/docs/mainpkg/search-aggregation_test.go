package main

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/filters"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)


// ===============================
// ===== meta count EXAMPLES =====
// ===============================

func TestMetaCount(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START MetaCount Go
	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{
			Name: "meta",
			// highlight-start
			Fields: []graphql.Field{
				{Name: "count"},
			},
			// highlight-end
		}).
		Do(ctx)
	// END MetaCount Go

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Aggregate")
	assert.Contains(t, response.Data["Aggregate"], "JeopardyQuestion")
	assert.Len(t, response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{}), 1)
	assert.Contains(t, response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0], "meta")
	
	meta := response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})["meta"].(map[string]interface{})
	assert.Equal(t, float64(216930), meta["count"]) //or 10,000 if you are using the smaller dataset
}

// ==================================
// ===== Text property EXAMPLES =====
// ==================================

func TestTextProp(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START TextProp Go
	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{
			Name: "answer",
			Fields: []graphql.Field{
				{Name: "count"},
				{Name: "type"},
				{Name: "topOccurrences",
					Fields: []graphql.Field{
						{Name: "occurs"},
						{Name: "value"},
					},
				},
			},
		}).
		Do(ctx)
	// END TextProp Go

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	answer := response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})["answer"].(map[string]interface{})
	assert.Equal(t, float64(216930), answer["count"]) //or 10,000 if you are using the smaller dataset
	assert.Equal(t, "text", answer["type"])
	assert.Len(t, answer["topOccurrences"].([]interface{}), 5)
}

// ====================================
// ===== int property EXAMPLES =====
// ====================================

func TestIntProp(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START IntProp Go
	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{
			Name: "points",
			// highlight-start
			Fields: []graphql.Field{
				{Name: "count"},
				{Name: "sum"},
			// highlight-end
			},
		}).
		Do(ctx)
	// END IntProp Go

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	points := response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})["points"].(map[string]interface{})
	assert.Equal(t, float64(216930), points["count"]) //or 10,000 if you are using the smaller dataset
	assert.Equal(t, float64(141871083), points["sum"]) // or 6324100 if you are using the smaller dataset
}

// ============================
// ===== groupBy EXAMPLES =====
// ============================

func TestGroupBy(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START groupBy Go

	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		// highlight-start
		WithGroupBy("round").
		WithFields(
			graphql.Field{
				Name: "groupedBy",
				Fields: []graphql.Field{
					{Name: "value"},
				},
			},
			graphql.Field{
				Name: "meta",
				Fields: []graphql.Field{
					{Name: "count"},
				},
			},
		).
		// highlight-end
		Do(ctx)
	// END groupBy Go

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	groups := response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Len(t, groups, 4) // 3 if you are using the smaller dataset
	for _, group := range groups {
		g := group.(map[string]interface{})
		assert.Contains(t, g, "groupedBy")
		assert.Contains(t, g, "meta")
	}
}

// =========================================
// ===== nearTextWithLimit EXAMPLES =====
// =========================================

func TestNearTextWithLimit(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START nearTextWithLimit Go
	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in space"})).
		// highlight-start
		WithObjectLimit(10).
		// highlight-end
		WithFields(graphql.Field{
			Name: "points",
			Fields: []graphql.Field{
				{Name: "sum"},
			},
		}).
		Do(ctx)
	// END nearTextWithLimit Go

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	points := response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})["points"].(map[string]interface{})
	assert.Greater(t, points["sum"].(float64), float64(0))
}

// ============================
// ===== nearTextWithDistance EXAMPLES =====
// ============================

func TestNearTextWithDistance(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START nearTextWithDistance Go
	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in space"}).
			// highlight-start
			WithDistance(0.19)).
			// highlight-end
		WithFields(graphql.Field{
			Name: "points",
			Fields: []graphql.Field{
				{Name: "sum"},
			},
		}).
		Do(ctx)
	// END nearTextWithDistance Go

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	points := response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})["points"].(map[string]interface{})
	assert.Greater(t, points["sum"].(float64), float64(0))
}

// =================================
// ===== where filter EXAMPLES =====
// =================================

func TestWhereFilter(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START whereFilter Go
	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		// highlight-start
		WithWhere(filters.Where().
			WithPath([]string{"round"}).
			WithOperator(filters.Equal).
			WithValueString("Final Jeopardy!")).
		// highlight-end
		WithFields(graphql.Field{
			Name: "meta",
			Fields: []graphql.Field{
				{Name: "count"},
			},
		}).
		Do(ctx)
	// END whereFilter Go

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	meta := response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})["meta"].(map[string]interface{})
	assert.Equal(t, float64(285), meta["count"])
}