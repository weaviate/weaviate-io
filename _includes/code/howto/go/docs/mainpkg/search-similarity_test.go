package main

import (
	"context"
	"encoding/json"
	"math/rand"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/filters"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
	"strings"
	"fmt"
)

func TestNearText(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetNearText
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		// highlight-start
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"})).
		// highlight-end
		WithLimit(2).
		Do(ctx)
	// END GetNearText

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Equal(t, 2, len(jeopardyQuestions))
	for _, q := range jeopardyQuestions {
		question := q.(map[string]interface{})
		assert.Contains(t, question, "question")
		assert.Contains(t, question, "answer")
		assert.Contains(t, question, "_additional")
		additional := question["_additional"].(map[string]interface{})
		assert.Contains(t, additional, "distance")
	}
}

func TestNearObject(t *testing.T) {
	t.Skip()
	client := setupClient()
	ctx := context.Background()

	// START GetNearObject
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		// highlight-start
		WithNearObject(client.GraphQL().NearObjectArgBuilder().
			WithID("56b9449e-65db-5df4-887b-0a4773f52aa7")).
		// highlight-end
		WithLimit(2).
		Do(ctx)
	// END GetNearObject

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Equal(t, 2, len(jeopardyQuestions))
	for _, q := range jeopardyQuestions {
		question := q.(map[string]interface{})
		assert.Contains(t, question, "question")
		assert.Contains(t, question, "answer")
		assert.Contains(t, question, "_additional")
		additional := question["_additional"].(map[string]interface{})
		assert.Contains(t, additional, "distance")
	}
}

func TestNearVector(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	vector := []float32{-0.0125526935, -0.021168863, -0.01076519, -0.02589537, -0.0070362035, 0.019870078, -0.010001986, -0.019120263, 0.00090044655, -0.017393013, 0.021302758, 0.010055545, 0.02937665, -0.003816019, 0.007692291, 0.012385325, 0.032750815, 0.020847514, 0.020311933, -0.022159688, -0.0009924996, 0.009399457, 0.0022226637, -0.029510546, 0.014393755, -0.007223657, 0.018276723, -0.03639277, -0.010001986, -0.022842556, 0.010363504, -0.020927852}

	//Make a random vector of length 384, for full dataset
	 vector = make([]float32, 384)
	 for i := range vector {
	 	vector[i] = rand.Float32()
	 }


	// START GetNearVector
	//Make a random vector of length 384


	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		// highlight-start
		WithNearVector(client.GraphQL().NearVectorArgBuilder().
			WithVector(vector)).
		// highlight-end
		WithLimit(2).
		Do(ctx)
	// END GetNearVector

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Equal(t, 2, len(jeopardyQuestions))
	for _, q := range jeopardyQuestions {
		question := q.(map[string]interface{})
		assert.Contains(t, question, "question")
		assert.Contains(t, question, "answer")
		assert.Contains(t, question, "_additional")
		additional := question["_additional"].(map[string]interface{})
		assert.Contains(t, additional, "distance")
	}
}

func TestLimitOffset(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetLimitOffset
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"})).
		// highlight-start
		WithLimit(2).
		WithOffset(1).
		// highlight-end
		Do(ctx)
	// END GetLimitOffset

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Equal(t, 2, len(jeopardyQuestions))
}

func TestWithDistance(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetWithDistance
	maxDistance := float32(0.18)
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"}).
			// highlight-start
			WithDistance(maxDistance)).
			// highlight-end
		Do(ctx)
	// END GetWithDistance

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	for _, q := range jeopardyQuestions {
		question := q.(map[string]interface{})
		additional := question["_additional"].(map[string]interface{})
		distance := additional["distance"].(float64)
		assert.Less(t, distance, maxDistance)
	}
}

func TestWithAutocut(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START Autocut
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"})).
		// highlight-start
		WithAutocut(1).
		// highlight-end
		Do(ctx)
	// END Autocut

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	// Additional assertions can be added based on expected autocut behavior
}

func TestWithGroupBy(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetWithGroupBy
	maxGroups := 2
	maxObjectsPerGroup := 2
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"})).
		WithLimit(10).
		WithGroupBy(client.GraphQL().GroupByArgBuilder().
			WithPath([]string{"round"}).
			WithGroups(maxGroups).
			WithObjectsPerGroup(maxObjectsPerGroup)).
		WithFields(graphql.Field{
			Name: "_additional",
			Fields: []graphql.Field{
				{Name: "group",
					Fields: []graphql.Field{
						{Name: "id"},
						{Name: "groupedBy",
							Fields: []graphql.Field{
								{Name: "path"},
								{Name: "value"},
							},
						},
						{Name: "count"},
						{Name: "minDistance"},
						{Name: "maxDistance"},
						{Name: "hits",
							Fields: []graphql.Field{
								{Name: "question"},
								{Name: "answer"},
							},
						},
					},
				},
			},
		}).
		Do(ctx)
	// END GetWithGroupBy

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.LessOrEqual(t, len(jeopardyQuestions), maxGroups)

	for _, group := range jeopardyQuestions {
		groupData := group.(map[string]interface{})
		additional := groupData["_additional"].(map[string]interface{})
		groupInfo := additional["group"].(map[string]interface{})
		assert.Contains(t, groupInfo, "id")
		assert.Contains(t, groupInfo, "groupedBy")
		assert.Contains(t, groupInfo, "count")
		assert.Contains(t, groupInfo, "minDistance")
		assert.Contains(t, groupInfo, "maxDistance")
		assert.Contains(t, groupInfo, "hits")

		hits := groupInfo["hits"].([]interface{})
		assert.LessOrEqual(t, len(hits), maxObjectsPerGroup)
	}
}

func TestWithWhere(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START GetWithFilter
	response, err := client.GraphQL().Get().
		WithClassName("JeopardyQuestion").
		WithFields(
			graphql.Field{Name: "question"},
			graphql.Field{Name: "answer"},
			graphql.Field{Name: "round"},
			graphql.Field{
				Name: "_additional",
				Fields: []graphql.Field{
					{Name: "distance"},
				},
			},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"animals in movies"})).
		WithLimit(2).
		// highlight-start
		WithWhere(filters.Where().
			WithPath([]string{"round"}).
			WithOperator(filters.Equal).
			WithValueString("Double Jeopardy!")).
		// highlight-end
		Do(ctx)
	// END GetWithFilter

	require.NoError(t, err)
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	t.Logf("%s", jsonResponse)

	assert.Contains(t, response.Data, "Get")
	assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
	jeopardyQuestions := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})
	assert.Equal(t, 2, len(jeopardyQuestions))

	for _, q := range jeopardyQuestions {
		question := q.(map[string]interface{})
		assert.Equal(t, "Double Jeopardy!", question["round"])
	}
}

func TestNearTextSearchWithNamedVector(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// START NamedVectorNearText Go

	className := "WineReviewNV"
	targetVector := "title_country"
	limit := 2

	response, err := client.GraphQL().Get().
		WithClassName(className).
		WithFields(
			graphql.Field{Name: "_additional",
				Fields: []graphql.Field{{Name: "distance"}}},
		).
		WithNearText((&graphql.NearTextArgumentBuilder{}).
			WithConcepts([]string{"a sweet German white wine"}).
			WithTargetVectors(targetVector),
		).
		WithLimit(limit).
		Do(ctx)

	// END NamedVectorNearText Go

	require.Nil(t, err)
	if response.Errors != nil {
		errors := make([]string, len(response.Errors))
		for i, e := range response.Errors {
			errors[i] = e.Message
		}
		t.Fatalf("errors: %v", strings.Join(errors, ", "))
	}

	require.NotNil(t, response.Data)

	// Print the response
	jsonResponse, err := json.MarshalIndent(response, "", "  ")
	require.Nil(t, err)
	fmt.Printf("%s\n", jsonResponse)

	// Additional assertions to check the response content
	reviews := response.Data["Get"].(map[string]interface{})[className].([]interface{})
	require.NotEmpty(t, reviews, "No reviews returned")
	require.Len(t, reviews, limit, "Unexpected number of reviews returned")

	for _, review := range reviews {
		r := review.(map[string]interface{})
		
		// Print properties
		properties := r["properties"].(map[string]interface{})
		fmt.Printf("Properties: %+v\n", properties)

		// Print distance
		distance := r["_additional"].(map[string]interface{})["distance"].(float64)
		fmt.Printf("Distance: %f\n", distance)

		// Additional assertions
		require.NotNil(t, properties, "Properties should not be nil")
		require.NotNil(t, distance, "Distance should not be nil")
	}
}