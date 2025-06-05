// How-to: Manage-data -> Create objects
package docs

import (
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/filters"
	"weaviate.io/docs/docs/helper"
)

func Test_ManageDataDelete(t *testing.T) {
	ctx := context.Background()
	scheme := helper.EnvScheme("http")
	host := helper.EnvHost("localhost")
	port := helper.EnvPort("8080")
	openaiApiKey := helper.Env("OPENAI_APIKEY", "_dummy_")

	config := weaviate.Config{Scheme: scheme, Host: host + ":" + port, Headers: map[string]string{
		"X-Openai-Api-Key": openaiApiKey,
	}}
	client, err := weaviate.NewClient(config)
	require.NoError(t, err)

	err = client.Schema().AllDeleter().Do(ctx)
	require.NoError(t, err)

	className := "EphemeralObject"

	t.Run("Delete object", func(t *testing.T) {
		// START DeleteObject
		idToDelete := "..." // replace with the id of the object you want to delete

		// END DeleteObject
		_ = idToDelete

		result, err := client.Data().Creator().
			WithClassName(className).
			WithProperties(map[string]interface{}{
				"name": "EphemeralObjectA",
			}).
			Do(ctx)
		require.NoError(t, err)
		require.NotNil(t, result)
		idToDelete = result.Object.ID.String()

		// START DeleteObject
		client.Data().Deleter().
			WithClassName("EphemeralObject").
			WithID(idToDelete).
			Do(ctx)
		// END DeleteObject

		exists, err := client.Data().Checker().WithClassName(className).WithID(idToDelete).Do(ctx)
		require.NoError(t, err)
		assert.False(t, exists)
	})

	t.Run("Dry run", func(t *testing.T) {
		for i := 0; i < 5; i++ {
			obj, err := client.Data().Creator().
				WithClassName(className).
				WithProperties(map[string]interface{}{
					"name": fmt.Sprintf("EphemeralObject%v", i),
				}).
				Do(ctx)
			require.NoError(t, err)
			require.NotNil(t, obj)
		}

		// START DryRun
		response, err := client.Batch().ObjectsBatchDeleter().
			WithClassName("EphemeralObject").
			// Same `where` filter as in the GraphQL API
			WithWhere(filters.Where().
				WithPath([]string{"name"}).
				WithOperator(filters.Like).
				WithValueText("EphemeralObject*")).
			// highlight-start
			WithDryRun(true).
			WithOutput("verbose").
			// highlight-end
			Do(ctx)
		if err != nil {
			// handle error
			panic(err)
		}

		fmt.Printf("%+v\n", *response)
		// END DryRun
		assert.Equal(t, int64(5), response.Results.Matches)
	})

	t.Run("Batch delete", func(t *testing.T) {
		// START DeleteBatch
		response, err := client.Batch().ObjectsBatchDeleter().
			WithClassName("EphemeralObject").
			WithOutput("minimal").
			// highlight-start
			WithWhere(filters.Where().
				WithPath([]string{"name"}).
				WithOperator(filters.Like).
				WithValueText("EphemeralObject*")).
			// highlight-end
			Do(ctx)
		if err != nil {
			// handle error
			panic(err)
		}

		fmt.Printf("%+v\n", *response)
		// END DeleteBatch
		assert.Equal(t, int64(5), response.Results.Matches)
		objects, err := client.Data().ObjectsGetter().WithClassName(className).Do(ctx)
		require.NoError(t, err)
		assert.Len(t, objects, 0)
	})
}
