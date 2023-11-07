// How-to: Manage-data -> (Batch) Import items
package docs

import (
	"context"
	"crypto/md5"
	"fmt"
	"strings"
	"testing"

	"github.com/go-openapi/strfmt"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
	"github.com/weaviate/weaviate/entities/models"
	"weaviate.io/docs/docs/helper"
)

func Test_ManageDataImport(t *testing.T) {
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

	checkNumberOfResults := func(t *testing.T, className string) {
		resp, err := client.GraphQL().Aggregate().WithClassName(className).WithFields(graphql.Field{Name: "meta{count}"}).Do(ctx)
		require.NoError(t, err)
		require.Empty(t, resp.Errors)
		agg := resp.Data["Aggregate"].(map[string]interface{})
		objects := agg[className].([]interface{})
		require.Len(t, objects, 1)
		meta := objects[0].(map[string]interface{})["meta"].(map[string]interface{})
		assert.Equal(t, float64(5), meta["count"])
	}

	deleteClass := func(t *testing.T, className string) {
		err = client.Schema().ClassDeleter().WithClassName(className).Do(ctx)
		require.NoError(t, err)
	}

	t.Run("Basic Batch Import", func(t *testing.T) {
		ctx := context.Background()
		// BasicBatchImportExample
		className := "YourName" // Replace with your class name
		dataObjs := []models.PropertySchema{}
		for i := 0; i < 5; i++ {
			dataObjs = append(dataObjs, map[string]interface{}{
				"title": fmt.Sprintf("Object %v", i), // Replace with your actual objects
			})
		}

		// highlight-start
		batcher := client.Batch().ObjectsBatcher()
		for _, dataObj := range dataObjs {
			batcher.WithObjects(&models.Object{
				Class:      className,
				Properties: dataObj,
				// Tenant: "tenantA", // If multi-tenancy is enabled, specify the tenant to which the object will be added.
			})
		}

		// Flush
		batcher.Do(ctx)
		// highlight-end
		// END BasicBatchImportExample

		checkNumberOfResults(t, className)
		deleteClass(t, className)
	})

	t.Run("Batch import with custom ID", func(t *testing.T) {
		ctx := context.Background()
		// BatchImportWithIDExample
		// highlight-start
		generateUUID := func(input string) strfmt.UUID {
			input = strings.ToLower(input)
			hash := md5.Sum([]byte(input))
			uuid := fmt.Sprintf("%x-%x-%x-%x-%x", hash[0:4], hash[4:6], hash[6:8], hash[8:10], hash[10:])
			return strfmt.UUID(uuid)
		}
		// highlight-end

		className := "YourName" // Replace with your class name
		dataObjs := []models.PropertySchema{}
		for i := 0; i < 5; i++ {
			dataObjs = append(dataObjs, map[string]interface{}{
				"title": fmt.Sprintf("Object %v", i), // Replace with your actual objects
			})
		}

		// highlight-start
		batcher := client.Batch().ObjectsBatcher()
		for _, dataObj := range dataObjs {
			batcher.WithObjects(&models.Object{
				Class:      className,
				Properties: dataObj,
				// highlight-start
				ID: generateUUID((dataObj.(map[string]interface{}))["title"].(string)),
				// highlight-end
			})
		}

		// Flush
		batcher.Do(ctx)
		// END BatchImportWithIDExample

		checkNumberOfResults(t, className)

		resp, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(graphql.Field{Name: "title"}, graphql.Field{Name: "_additional{id vector}"}).
			Do(ctx)
		require.NoError(t, err)
		require.Empty(t, resp.Errors)
		get := resp.Data["Get"].(map[string]interface{})
		objects := get[className].([]interface{})
		require.Len(t, objects, 5)
		for _, obj := range objects {
			id := obj.(map[string]interface{})["_additional"].(map[string]interface{})["id"].(string)
			v, ok := obj.(map[string]interface{})["_additional"].(map[string]interface{})["vector"].([]interface{})
			fmt.Printf("vector: %T ok: %v\n", v[0], ok)
			title := obj.(map[string]interface{})["title"].(string)
			assert.Equal(t, id, generateUUID(title).String())
		}

		deleteClass(t, className)
	})

	t.Run("Batch import with custom vector", func(t *testing.T) {
		// BatchImportWithVectorExample
		className := "YourName" // Replace with your class name
		dataObjs := []models.PropertySchema{}
		for i := 0; i < 5; i++ {
			dataObjs = append(dataObjs, map[string]interface{}{
				"title": fmt.Sprintf("Object %v", i), // Replace with your actual objects
			})
		}
		vectors := [][]float32{}
		for i := 0; i < 5; i++ {
			vector := make([]float32, 10)
			for j := range vector {
				vector[j] = 0.25 + float32(j/100) // Replace with your actual vectors
			}
			vectors = append(vectors, vector)
		}

		// highlight-start
		batcher := client.Batch().ObjectsBatcher()
		for i, dataObj := range dataObjs {
			batcher.WithObjects(&models.Object{
				Class:      className,
				Properties: dataObj,
				// highlight-start
				Vector: vectors[i],
				// highlight-end
			})
		}

		// Flush
		batcher.Do(ctx)
		// END BatchImportWithVectorExample

		checkNumberOfResults(t, className)
		resp, err := client.GraphQL().Get().
			WithClassName(className).
			WithFields(graphql.Field{Name: "_additional{vector}"}).
			Do(ctx)
		require.NoError(t, err)
		require.Empty(t, resp.Errors)
		agg := resp.Data["Get"].(map[string]interface{})
		objects := agg[className].([]interface{})
		require.Len(t, objects, 5)
		for _, obj := range objects {
			vector := obj.(map[string]interface{})["_additional"].(map[string]interface{})["vector"].([]interface{})
			assert.GreaterOrEqual(t, vector[0], 0.25)
			assert.LessOrEqual(t, vector[9], 0.3)
		}
		deleteClass(t, className)
	})
}
