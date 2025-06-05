// How-to: Manage-data -> Create objects
package docs

import (
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate/entities/models"
	"weaviate.io/docs/docs/helper"
)

func Test_ManageDataUpdate(t *testing.T) {
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

	className := "JeopardyQuestion"

	t.Run("define the class", func(t *testing.T) {
		jeopardyClass := &models.Class{
			Class:       className,
			Description: "A Jeopardy! question",
			Vectorizer:  "text2vec-openai",
		}

		err := client.Schema().ClassCreator().
			WithClass(jeopardyClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("update properties", func(t *testing.T) {
		// DelProps START
		delProps := func(uuid, className string, propNames ...string) (bool, error) {
			objs, err := client.Data().ObjectsGetter().WithID(uuid).WithClassName(className).Do(ctx)
			if err != nil {
				return false, err
			}
			if objs == nil || len(objs) == 0 {
				return false, fmt.Errorf("object with id: %v not found", uuid)
			}
			if objs[0].Properties == nil {
				return false, fmt.Errorf("object with id: %v has no properties", uuid)
			}
			properties := objs[0].Properties.(map[string]interface{})
			for _, propName := range propNames {
				delete(properties, propName)
			}
			err = client.Data().Updater().
				WithID(uuid).
				WithClassName(className).
				WithProperties(properties).
				Do(ctx)
			return err == nil, err
		}

		// DelProps END

		objWrapper, err := client.Data().Creator().
			WithClassName(className).
			WithProperties(map[string]interface{}{
				"question": "Test question",
				"answer":   "Test answer",
				"points":   -1,
			}).
			Do(ctx)
		require.NoError(t, err)
		require.NotNil(t, objWrapper)

		// UpdateProps START // Replace START // DelProps START
		id := "..." // replace with the id of the object you want to update
		// UpdateProps END // Replace END // DelProps END
		_ = id
		id = objWrapper.Object.ID.String()

		// UpdateProps START
		client.Data().Updater().
			// highlight-start
			WithMerge(). // merges properties into the object
			// highlight-end
			WithID(id).
			WithClassName("JeopardyQuestion").
			WithProperties(map[string]interface{}{
				"points": 100,
			}).
			Do(ctx)
		// UpdateProps END

		objs, err := client.Data().ObjectsGetter().WithID(id).WithClassName(className).Do(ctx)
		require.NoError(t, err)
		require.NotNil(t, objs)
		require.Len(t, objs, 1)
		assert.Equal(t, float64(100), objs[0].Properties.(map[string]interface{})["points"])
		assert.Equal(t, "Test question", objs[0].Properties.(map[string]interface{})["question"])
		assert.Equal(t, "Test answer", objs[0].Properties.(map[string]interface{})["answer"])

		// Replace START
		// highlight-start
		client.Data().Updater(). // replaces the entire object
			// highlight-end
			WithID(id).
			WithClassName("JeopardyQuestion").
			WithProperties(map[string]interface{}{
				"answer": "Replaced",
				// The other properties will be deleted
			}).
			Do(ctx)
		// Replace END

		objs, err = client.Data().ObjectsGetter().WithID(id).WithClassName(className).Do(ctx)
		require.NoError(t, err)
		require.NotNil(t, objs)
		require.Len(t, objs, 1)
		assert.Nil(t, objs[0].Properties.(map[string]interface{})["points"])
		assert.Nil(t, objs[0].Properties.(map[string]interface{})["question"])
		assert.Equal(t, "Replaced", objs[0].Properties.(map[string]interface{})["answer"])

		// DelProps START
		isUpdated, err := delProps(id, "JeopardyQuestion", "answer")
		// DelProps END
		require.NoError(t, err)
		require.True(t, isUpdated)

		objs, err = client.Data().ObjectsGetter().WithID(id).WithClassName(className).Do(ctx)
		require.NoError(t, err)
		require.NotNil(t, objs)
		require.Len(t, objs, 1)
		assert.Nil(t, objs[0].Properties.(map[string]interface{})["points"])
		assert.Nil(t, objs[0].Properties.(map[string]interface{})["question"])
		assert.Nil(t, objs[0].Properties.(map[string]interface{})["answer"])
	})
}
