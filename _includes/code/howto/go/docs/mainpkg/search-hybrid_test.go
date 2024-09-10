package main

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/filters"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
	"sort"
)

func TestHybrid(t *testing.T) {
	t.Run("TestBasicHybridQuery", func(t *testing.T) {
		client := setupClient()

		// START Basic Go
		ctx := context.Background()
		className := "JeopardyQuestion"
		query := "food"
		limit := 3

		q := client.GraphQL().Get().
			WithClassName(className).
			WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
			WithHybrid(client.GraphQL().HybridArgumentBuilder().WithQuery(query)).
			WithLimit(limit)

		result, err := q.Do(ctx)
		// END Basic Go

		if err != nil {
			t.Fatalf("Failed to execute query: %v", err)
		}

		if result.Errors != nil || len(result.Errors) > 0 {
			t.Fatalf("Query returned errors: %v", result.Errors[0])
		}

		require.NoError(t, err)
		objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
		assert.Equal(t, 3, len(objects))
		assert.Equal(t, []string{"answer", "question"}, getKeys(objects[0]))
	})

	t.Run("TestHybridQueryWithScore", func(t *testing.T) {
		client := setupClient()

		// START WithScore Go
		ctx := context.Background()
		className := "JeopardyQuestion"
		query := "food"
		limit := 3

		result, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(
				graphql.Field{Name: "question"},
				graphql.Field{Name: "answer"},
				graphql.Field{Name: "_additional", Fields: []graphql.Field{{Name: "score"}, {Name: "explainScore"}}},
			).
			WithHybrid(client.GraphQL().HybridArgumentBuilder().WithQuery(query)).
			WithLimit(limit).
			Do(ctx)
		// END WithScore Go

		require.NoError(t, err)
		objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
		assert.Equal(t, 3, len(objects))
		assert.Equal(t, []string{"_additional", "answer", "question"}, getKeys(objects[0]))
		assert.Equal(t, []string{"explainScore", "score"}, getKeys(objects[0].(map[string]interface{})["_additional"]))
	})

	t.Run("TestHybridQueryWithAlpha", func(t *testing.T) {
		client := setupClient()

		// START WithAlpha Go
		ctx := context.Background()
		className := "JeopardyQuestion"
		query := "food"
		limit := 3
		alpha := float32(0.25)

		result, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
			WithHybrid(client.GraphQL().HybridArgumentBuilder().
				WithQuery(query).
				WithAlpha(alpha),
			).
			WithLimit(limit).
			Do(ctx)
		// END WithAlpha Go

		require.NoError(t, err)
		objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
		assert.Equal(t, 3, len(objects))
		assert.Equal(t, []string{"answer", "question"}, getKeys(objects[0]))
	})

	t.Run("TestHybridQueryWithFusionType", func(t *testing.T) {
		client := setupClient()

		// START WithFusionType Go
		ctx := context.Background()
		className := "JeopardyQuestion"
		query := "food"
		limit := 3
		fusionType := "relativeScoreFusion"

		result, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
			WithHybrid(client.GraphQL().HybridArgumentBuilder().
				WithQuery(query).
				WithFusionType(graphql.FusionType(fusionType)),
			).
			WithLimit(limit).
			Do(ctx)
		// END WithFusionType Go

		require.NoError(t, err)
		objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
		assert.Equal(t, 3, len(objects))
		assert.Equal(t, []string{"answer", "question"}, getKeys(objects[0]))
	})

	t.Run("TestHybridQueryWithProperties", func(t *testing.T) {
		client := setupClient()

		// START WithProperties Go
		ctx := context.Background()
		className := "JeopardyQuestion"
		query := "food"
		limit := 3
		alpha := float32(0.25)
		properties := []string{"question"}

		result, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
			WithHybrid(client.GraphQL().HybridArgumentBuilder().
				WithQuery(query).
				WithAlpha(alpha).
				WithProperties(properties),
			).
			WithLimit(limit).
			Do(ctx)
		// END WithProperties Go

		require.NoError(t, err)
		objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
		assert.Equal(t, 3, len(objects))
		assert.Equal(t, []string{"answer", "question"}, getKeys(objects[0]))
	})

	t.Run("TestHybridQueryWithPropertyWeighting", func(t *testing.T) {
		client := setupClient()

		// START WithPropertyWeighting Go
		ctx := context.Background()
		className := "JeopardyQuestion"
		query := "food"
		limit := 3
		alpha := float32(0.25)
		properties := []string{"question^2", "answer"}

		result, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
			WithHybrid(client.GraphQL().HybridArgumentBuilder().
				WithQuery(query).
				WithAlpha(alpha).
				WithProperties(properties),
			).
			WithLimit(limit).
			Do(ctx)
		// END WithPropertyWeighting Go

		require.NoError(t, err)
		objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
		assert.Equal(t, 3, len(objects))
		assert.Equal(t, []string{"answer", "question"}, getKeys(objects[0]))
	})

	t.Run("TestHybridQueryWithVector", func(t *testing.T) {
		client := setupClient()

		// START WithVector Go
		ctx := context.Background()
		className := "JeopardyQuestion"
		query := "food"
		limit := 3
		//Create a vector 384 dimensions long

		// Define the length of the slice
		length := 384

		// Initialize the slice with the specified length
		values := make([]float32, length)

		// Fill the slice with values
		for i := 0; i < length; i++ {
			values[i] = 0.1 * float32(i+1)
		}

		vector := values

		result, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}).
			WithHybrid(client.GraphQL().HybridArgumentBuilder().
				WithQuery(query).
				WithVector(vector),
			).
			WithLimit(limit).
			Do(ctx)
		// END WithVector Go

		require.NoError(t, err)
		objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
		assert.Equal(t, 3, len(objects))
		assert.Equal(t, []string{"answer", "question"}, getKeys(objects[0]))
	})

	t.Run("TestHybridQueryWithFilter", func(t *testing.T) {
		client := setupClient()

		// START WithFilter Go
		ctx := context.Background()
		className := "JeopardyQuestion"
		query := "food"
		limit := 3

		filter := filters.Where().
			WithPath([]string{"round"}).
			WithOperator(filters.Equal).
			WithValueString("Double Jeopardy!")

		result, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(graphql.Field{Name: "question"}, graphql.Field{Name: "answer"}, graphql.Field{Name: "round"}).
			WithHybrid(client.GraphQL().HybridArgumentBuilder().WithQuery(query)).
			WithWhere(filter).
			WithLimit(limit).
			Do(ctx)
		// END WithFilter Go

		require.NoError(t, err)
		objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
		assert.LessOrEqual(t, len(objects), 3)
		assert.Equal(t, []string{"answer", "question", "round"}, getKeys(objects[0]))

		for _, obj := range objects {
			properties := obj.(map[string]interface{})
			assert.Equal(t, "Double Jeopardy!", properties["round"])
		}
	})

	t.Run("TestHybridQueryWithLimit", func(t *testing.T) {
		client := setupClient()

		// START limit Go
		ctx := context.Background()
		className := "JeopardyQuestion"
		query := "safety"
		limit := 3

		result, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(
				graphql.Field{Name: "question"},
				graphql.Field{Name: "answer"},
				graphql.Field{Name: "_additional", Fields: []graphql.Field{{Name: "score"}}},
			).
			WithHybrid(client.GraphQL().HybridArgumentBuilder().WithQuery(query)).
			WithLimit(limit).
			Do(ctx)
		// END limit Go

		require.NoError(t, err)
		objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
		assert.Equal(t, 3, len(objects))
		assert.Equal(t, []string{"_additional", "answer", "question"}, getKeys(objects[0]))
		assert.Equal(t, []string{"score"}, getKeys(objects[0].(map[string]interface{})["_additional"]))
	})

	t.Run("TestHybridQueryWithAutocut", func(t *testing.T) {
		client := setupClient()

		// START autocut Go
		ctx := context.Background()
		className := "JeopardyQuestion"
		query := "safety"
		autocut := 1

		result, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(
				graphql.Field{Name: "question"},
				graphql.Field{Name: "answer"},
				graphql.Field{Name: "_additional", Fields: []graphql.Field{{Name: "score"}}},
			).
			WithHybrid(client.GraphQL().HybridArgumentBuilder().WithQuery(query)).
			WithAutocut(autocut).
			Do(ctx)
		// END autocut Go

		require.NoError(t, err)
		objects := result.Data["Get"].(map[string]interface{})[className].([]interface{})
		assert.GreaterOrEqual(t, len(objects), 1)
		assert.Equal(t, []string{"_additional", "answer", "question"}, getKeys(objects[0]))
		assert.Equal(t, []string{"score"}, getKeys(objects[0].(map[string]interface{})["_additional"]))
	})
}

func getKeys(obj interface{}) []string {
	m := obj.(map[string]interface{})
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	//Sort the keys to make the test deterministic
	sort.Strings(keys)
	return keys
}
