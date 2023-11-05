// How-to: Manage-data -> Create objects
package docs

import (
	"context"
	"encoding/json"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate/entities/models"
	"github.com/weaviate/weaviate/entities/schema"
	"weaviate.io/docs/docs/helper"
)

func Test_ManageDataCreate(t *testing.T) {
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

	t.Run("create class", func(t *testing.T) {
		jeopardyClass := &models.Class{
			Class:       className,
			Description: "A Jeopardy! question",
			Vectorizer:  "text2vec-openai",
			Properties: []*models.Property{
				{
					Name:     "question",
					DataType: schema.DataTypeText.PropString(),
				},
				{
					Name:     "answer",
					DataType: schema.DataTypeText.PropString(),
				},
			},
		}

		err := client.Schema().ClassCreator().
			WithClass(jeopardyClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create object", func(t *testing.T) {
		// CreateObject START
		w, err := client.Data().Creator().
			WithClassName("JeopardyQuestion").
			WithProperties(map[string]interface{}{
				"question": "This vector DB is OSS and supports automatic property type inference on import",
				// "answer": "Weaviate", // schema properties can be omitted
				"newProperty": 123, // will be automatically added as a number property
			}).
			Do(ctx)

		// CreateObject END

		require.NoError(t, err)

		// CreateObject START
		// the returned value is a wrapped object
		b, err := json.MarshalIndent(w.Object, "", "  ")
		// CreateObject END
		require.NoError(t, err)
		// CreateObject START
		fmt.Println(string(b))
		// CreateObject END
	})

	t.Run("create object with id and vector", func(t *testing.T) {
		// CreateObjectWithIdAndVector START
		vector := make([]float32, 1536)
		for i := 0; i < len(vector); i++ {
			vector[i] = 0.12345
		}

		w, err := client.Data().Creator().
			WithClassName("JeopardyQuestion").
			WithProperties(map[string]interface{}{
				"question": "This vector DB is OSS and supports automatic property type inference on import",
				"answer":   "Weaviate",
			}).
			// highlight-start
			WithID("12345678-e64f-5d94-90db-c8cfa3fc1234").
			WithVector(vector).
			// highlight-end
			Do(ctx)

		// CreateObjectWithIdAndVector END

		require.NoError(t, err)

		// CreateObjectWithIdAndVector START
		// the returned value is a wrapped object
		b, err := json.MarshalIndent(w.Object, "", "  ")
		// CreateObjectWithIdAndVector END
		require.NoError(t, err)
		// CreateObjectWithIdAndVector START
		fmt.Println(string(b))
		// CreateObjectWithIdAndVector END
	})

	t.Run("create object with deterministic id", func(t *testing.T) {
		// CreateObjectWithDeterministicIdTODO START
		properties := map[string]interface{}{
			"question": "This vector DB is OSS and supports automatic property type inference on import",
			"answer":   "Weaviate",
		}

		// highlight-start
		// String id = "gen_uuid5(properties)"; // TODO implement
		id := "17f91943-1a5e-46d3-9323-a1cdb735591c"
		// highlight-end

		w, err := client.Data().Creator().
			WithClassName("JeopardyQuestion").
			WithProperties(properties).
			WithID(id).
			Do(ctx)

		// CreateObjectWithDeterministicIdTODO END

		require.NoError(t, err)

		// CreateObjectWithDeterministicIdTODO START
		// the returned value is a wrapped object
		b, err := json.MarshalIndent(w.Object, "", "  ")
		// CreateObjectWithDeterministicIdTODO END
		require.NoError(t, err)
		// CreateObjectWithDeterministicIdTODO START
		fmt.Println(string(b))
		// CreateObjectWithDeterministicIdTODO END
	})

	t.Run("validate object", func(t *testing.T) {
		// ValidateObject START
		err := client.Data().Validator().
			WithClassName("JeopardyQuestion").
			WithProperties(map[string]interface{}{
				"question":                          "This vector DB is OSS and supports automatic property type inference on import",
				"answer":                            "Weaviate",
				"thisPropShouldNotEndUpInTheSchema": -1,
			}).
			WithID("12345678-1234-1234-1234-123456789012").
			Do(ctx)

		// ValidateObject END

		require.Error(t, err)

		// ValidateObject START
		assert.ErrorContains(t, err, "invalid object: no such prop with name 'thisPropShouldNotEndUpInTheSchema' found")
		// ValidateObject END
	})
}
