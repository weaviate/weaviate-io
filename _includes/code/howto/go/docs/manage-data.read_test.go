// How-to: Manage-data -> (Batch) Import items
package docs

import (
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
)

func Test_ManageDataRead(t *testing.T) {
	ctx := context.Background()
	scheme := "https"
	host := "edu-demo.weaviate.network"
	apiKey := "learn-weaviate"

	config := weaviate.Config{Scheme: scheme, Host: host, AuthConfig: auth.ApiKey{Value: apiKey}}
	client, err := weaviate.NewClient(config)
	require.NoError(t, err)

	t.Run("Read object", func(t *testing.T) {
		// ReadObject START
		objects, err := client.Data().ObjectsGetter().
			WithClassName("JeopardyQuestion").
			WithID("00ff6900-e64f-5d94-90db-c8cfa3fc851b").
			Do(ctx)
		if err != nil {
			// handle error
			panic(err)
		}

		for i, obj := range objects {
			fmt.Printf("object[%v]: %+v\n", i, *obj)
		}
		// ReadObject END
		require.Len(t, objects, 1)
		assert.Equal(t, "San Francisco", objects[0].Properties.(map[string]interface{})["answer"])
	})

	t.Run("Read object with vector", func(t *testing.T) {
		// ReadObjectWithVector START
		objects, err := client.Data().ObjectsGetter().
			WithClassName("JeopardyQuestion").
			WithID("00ff6900-e64f-5d94-90db-c8cfa3fc851b").
			// highlight-start
			WithVector().
			// highlight-end
			Do(ctx)
		if err != nil {
			// handle error
			panic(err)
		}

		for i, obj := range objects {
			fmt.Printf("object[%v]: %+v\n", i, *obj)
		}
		// ReadObjectWithVector END
		require.Len(t, objects, 1)
		assert.Equal(t, 1536, len(objects[0].Vector))
	})
}
