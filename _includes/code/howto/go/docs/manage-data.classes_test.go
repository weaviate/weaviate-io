// How-to: Manage-Data -> Classes
package docs

import (
	"context"
	"encoding/json"
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v5/weaviate"
	"github.com/weaviate/weaviate/entities/models"
	"github.com/weaviate/weaviate/entities/vectorindex/common"
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

	t.Run("update class", func(t *testing.T) {
		errDel := client.Schema().ClassDeleter().WithClassName(className).Do(ctx)
		require.NoError(t, errDel)

		// START UpdateCollectionTODO
		// Define class
		originalClass := &models.Class{
			Class: className,
			VectorIndexConfig: map[string]interface{}{
				"distance": common.DistanceCosine, // Note the distance metric
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
				"distance": common.DistanceDot, // Note the distance metric
			},
		}

		// Update the class definition
		_ = updatedClass
		// TODO Not yet available in GO

		// END UpdateCollectionTODO
	})

	t.Run("add multi-vector collection", func(t *testing.T) {
		// START MultiValueVectorCollection
		multiVecClassName := "DemoCollection"

		// Define the collection with multi-vector configurations
		class := &models.Class{
			Class: multiVecClassName,
			Properties: []*models.Property{
				{
					Name:     "text",
					DataType: []string{"text"},
				},
			},
			// Named vectors configuration
			VectorConfig: map[string]models.VectorConfig{
				// Example 1: Jina AI ColBERT integration
				"jina_colbert": {
					Vectorizer: map[string]interface{}{
						"text2colbert-jinaai": map[string]interface{}{
							"sourceProperties": []string{"text"},
						},
					},
					VectorIndexType: "hnsw",
				},
				// Example 2: Custom multi-vector configuration
				"custom_multi_vector": {
					Vectorizer: map[string]interface{}{
						"none": nil,
					},
					VectorIndexType: "hnsw",
					VectorIndexConfig: map[string]interface{}{
						"multivector": map[string]interface{}{
							"enabled": true,
						},
					},
				},
			},
		}

		// Create the collection with multi-vector support
		err := client.Schema().ClassCreator().WithClass(class).Do(ctx)
		// END MultiValueVectorCollection

		require.NoError(t, err)
	})

	t.Run("multi-vector with muvera encoding", func(t *testing.T) {
		// Clean slate - delete the collection if it exists
		_ = client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(ctx)

		// START MultiValueVectorMuvera
		// Create class with multi-vector configurations using MUVERA encoding
		class := &models.Class{
			Class: "DemoCollection",
			Properties: []*models.Property{
				{
					Name:     "text",
					DataType: []string{"text"},
				},
			},
			VectorConfig: map[string]models.VectorConfig{
				// Example 1 - Use a model integration (Jina AI ColBERT)
				"jina_colbert": {
					Vectorizer: map[string]interface{}{
						"text2colbert-jinaai": map[string]interface{}{
							"sourceProperties": []string{"text"},
						},
					},
					VectorIndexType: "hnsw",
					VectorIndexConfig: map[string]interface{}{
						// Multi-vector configuration with MUVERA encoding
						"multivector": map[string]interface{}{
							"enabled": true,
							// Configure MUVERA encoding
							"muvera": map[string]interface{}{
								"enabled":      true,
								"ksim":         4,
								"dprojections": 16,
								"repetitions":  20,
							},
						},
					},
				},
				// Example 2 - User-provided multi-vector representations
				"custom_multi_vector": {
					Vectorizer: map[string]interface{}{
						"none": nil,
					},
					VectorIndexType: "hnsw",
					VectorIndexConfig: map[string]interface{}{
						// Multi-vector configuration with MUVERA encoding (minimal config)
						"multivector": map[string]interface{}{
							"enabled": true,
							"muvera": map[string]interface{}{
								"enabled":      true,
								"ksim":         4,
								"dprojections": 16,
								"repetitions":  20,
							},
						},
					},
				},
			},
		}

		err := client.Schema().ClassCreator().WithClass(class).Do(ctx)
		// END MultiValueVectorMuvera

		require.NoError(t, err)
		fmt.Println("Created DemoCollection with MUVERA-encoded multi-vectors")
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
}
