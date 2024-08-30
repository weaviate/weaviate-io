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
			Fields: []graphql.Field{
				{Name: "count"},
			},
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
	assert.Equal(t, float64(10000), meta["count"])
}

// ==================================
// ===== Text property EXAMPLES =====
// ==================================

func TestTextProp(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// TextProp Go
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
	assert.Equal(t, float64(10000), answer["count"])
	assert.Equal(t, "text", answer["type"])
	assert.Len(t, answer["topOccurrences"].([]interface{}), 5)
}

// ====================================
// ===== int property EXAMPLES =====
// ====================================

func TestIntProp(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// IntProp Go
	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		WithFields(graphql.Field{
			Name: "points",
			Fields: []graphql.Field{
				{Name: "count"},
				{Name: "sum"},
			},
		}).
		Do(ctx)
	// END IntProp Go

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	points := response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})["points"].(map[string]interface{})
	assert.Equal(t, float64(10000), points["count"])
	assert.Equal(t, float64(6324100), points["sum"])
}

// ============================
// ===== groupBy EXAMPLES =====
// ============================

func TestGroupBy(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START groupBy Go
	groupby := client.GraphQL().GroupByArgBuilder().

	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		WithGroupBy(client.GraphQL().AggregateGroupByBuilder().WithPath([]string{"round"})).
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
		Do(ctx)
	// END groupBy Go

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	groups := response.Data["Aggregate"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Len(t, groups, 3)
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

	// nearTextWithLimit Go
	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in space"})).
		WithObjectLimit(10).
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

	// nearTextWithDistance Go
	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in space"}).
			WithDistance(0.19)).
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

	// whereFilter Go
	response, err := client.GraphQL().Aggregate().
		WithClassName("JeopardyQuestion").
		WithWhere(filters.Where().
			WithPath([]string{"round"}).
			WithOperator(filters.Equal).
			WithValueString("Final Jeopardy!")).
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