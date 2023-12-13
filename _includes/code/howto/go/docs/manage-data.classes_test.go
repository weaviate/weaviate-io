// How-to: Manage-Data -> Classes
package docs

import (
	"context"
	"encoding/json"
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate/entities/models"
	"github.com/weaviate/weaviate/entities/vectorindex/hnsw"
	"weaviate.io/docs/docs/helper"
)

func Test_ManageDataClasses(t *testing.T) {
	ctx := context.Background()
	scheme := helper.EnvScheme("http")
	host := helper.EnvHost("localhost")
	port := helper.EnvPort("8080")

	config := weaviate.Config{Scheme: scheme, Host: host + ":" + port}
	client, err := weaviate.NewClient(config)
	require.NoError(t, err)

	err = client.Schema().AllDeleter().Do(ctx)
	require.NoError(t, err)

	// START BasicCreateCollection  // START ReadOneCollection  // START UpdateCollection
	className := "Article"

	// END BasicCreateCollection  // END ReadOneCollection  // END UpdateCollection

	t.Run("create class", func(t *testing.T) {
		// START BasicCreateCollection
		emptyClass := &models.Class{
			Class: className,
		}

		// Add the class to the schema
		err := client.Schema().ClassCreator().
			WithClass(emptyClass).
			Do(ctx)

		// END BasicCreateCollection

		require.NoError(t, err)
	})

	t.Run("read one class", func(t *testing.T) {
		// START ReadOneCollection
		class, err := client.Schema().ClassGetter().
			WithClassName(className).
			Do(ctx)

		// END ReadOneCollection

		require.NoError(t, err)

		// START ReadOneCollection
		b, err := json.MarshalIndent(class, "", "  ")
		// END ReadOneCollection
		require.NoError(t, err)
		// START ReadOneCollection
		fmt.Println(string(b))
		// END ReadOneCollection
	})

	t.Run("read all classes", func(t *testing.T) {
		// START ReadAllCollections
		schema, err := client.Schema().Getter().
			Do(ctx)

			// END ReadAllCollections

		require.NoError(t, err)

		// START ReadAllCollections
		b, err := json.MarshalIndent(schema, "", "  ")
		// END ReadAllCollections
		require.NoError(t, err)
		// START ReadAllCollections
		fmt.Println(string(b))
		// END ReadAllCollections
	})

	t.Run("update class", func(t *testing.T) {
		errDel := client.Schema().ClassDeleter().WithClassName(className).Do(ctx)
		require.NoError(t, errDel)

		// START UpdateCollectionTODO
		// Define class
		originalClass := &models.Class{
			Class: className,
			VectorIndexConfig: map[string]interface{}{
				"distance": hnsw.DistanceCosine, // Note the distance metric
			},
		}

		// Add the class to the schema
		err := client.Schema().ClassCreator().
			WithClass(originalClass).
			Do(ctx)

		// END UpdateCollectionTODO

		require.NoError(t, err)

		// START UpdateCollectionTODO
		// Define updated class
		updatedClass := &models.Class{
			Class: className,
			VectorIndexConfig: map[string]interface{}{
				"distance": hnsw.DistanceDot, // Note the distance metric
			},
		}

		// Update the class definition
		_ = updatedClass
		// TODO Not yet available in GO

		// END UpdateCollectionTODO
	})
}
