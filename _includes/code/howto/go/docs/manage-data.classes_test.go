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

	// START CreateClass  // START ReadOneClass  // START UpdateClass
	className := "Article"

	// END CreateClass  // END ReadOneClass  // END UpdateClass

	t.Run("create class", func(t *testing.T) {
		// START CreateClass
		emptyClass := &models.Class{
			Class: className,
		}

		// Add the class to the schema
		err := client.Schema().ClassCreator().
			WithClass(emptyClass).
			Do(ctx)

		// END CreateClass

		require.NoError(t, err)
	})

	t.Run("read one class", func(t *testing.T) {
		// START ReadOneClass
		class, err := client.Schema().ClassGetter().
			WithClassName(className).
			Do(ctx)

		// END ReadOneClass

		require.NoError(t, err)

		// START ReadOneClass
		b, err := json.MarshalIndent(class, "", "  ")
		// END ReadOneClass
		require.NoError(t, err)
		// START ReadOneClass
		fmt.Println(string(b))
		// END ReadOneClass
	})

	t.Run("read all classes", func(t *testing.T) {
		// START ReadAllClasses
		schema, err := client.Schema().Getter().
			Do(ctx)

			// END ReadAllClasses

		require.NoError(t, err)

		// START ReadAllClasses
		b, err := json.MarshalIndent(schema, "", "  ")
		// END ReadAllClasses
		require.NoError(t, err)
		// START ReadAllClasses
		fmt.Println(string(b))
		// END ReadAllClasses
	})

	t.Run("update class", func(t *testing.T) {
		errDel := client.Schema().ClassDeleter().WithClassName(className).Do(ctx)
		require.NoError(t, errDel)

		// START UpdateClassTODO
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

		// END UpdateClassTODO

		require.NoError(t, err)

		// START UpdateClassTODO
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

		// END UpdateClassTODO
	})
}
