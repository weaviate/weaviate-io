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
	"github.com/weaviate/weaviate/entities/schema"
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

		// Create the collection (also called class)
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
				"distance": common.DistanceCosine, // Note the distance metric
			},
		}

		// Create the collection (also called class)
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

	t.Run("create class with properties", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		// START CreateCollectionWithProperties
		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			Properties: []*models.Property{
				{
					Name:     "title",
					DataType: schema.DataTypeText.PropString(),
				},
				{
					Name:     "body",
					DataType: schema.DataTypeText.PropString(),
				},
			},
		}
		// END CreateCollectionWithProperties

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create class with vectorizer", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		// START CreateCollectionWithVectorizer
		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			Vectorizer:  "text2vec-openai",
			Properties: []*models.Property{
				{
					Name:     "title",
					DataType: schema.DataTypeText.PropString(),
				},
				{
					Name:     "body",
					DataType: schema.DataTypeText.PropString(),
				},
			},
		}
		// END CreateCollectionWithVectorizer

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create class with named vectors", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("ArticleNV").Do(ctx)
		require.NoError(t, err)

		// START CreateCollectionWithNamedVectors
		articleClass := &models.Class{
			Class:       "ArticleNV",
			Description: "Collection of articles with named vectors",
			Properties: []*models.Property{
				{
					Name:     "title",
					DataType: schema.DataTypeText.PropString(),
				},
				{
					Name:     "country",
					DataType: schema.DataTypeText.PropString(),
				},
			},
			VectorConfig: map[string]models.VectorConfig{
				"title": {
					Vectorizer: map[string]interface{}{
						"text2vec-openai": map[string]interface{}{
							"sourceProperties": []string{"title"},
						},
					},
					VectorIndexType: "hnsw",
				},
				"title_country": {
					Vectorizer: map[string]interface{}{
						"text2vec-openai": map[string]interface{}{
							"sourceProperties": []string{"title", "country"},
						},
					},
					VectorIndexType: "hnsw",
				},
				"custom_vector": {
					Vectorizer: map[string]interface{}{
						"none": map[string]interface{}{},
					},
					VectorIndexType: "hnsw",
				},
			},
		}
		// END CreateCollectionWithNamedVectors

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create class with vectorizer settings", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		// START ModuleSettings
		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			Vectorizer:  "text2vec-cohere",
			ModuleConfig: map[string]interface{}{
				"text2vec-cohere": map[string]interface{}{
					"model":              "embed-multilingual-v2.0",
					"vectorizeClassName": true,
				},
			},
		}
		// END ModuleSettings

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create class with vector index type", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		// START SetVectorIndexType
		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			Properties: []*models.Property{
				{
					Name:     "title",
					DataType: schema.DataTypeText.PropString(),
				},
				{
					Name:     "country",
					DataType: schema.DataTypeText.PropString(),
				},
			},
			Vectorizer:      "text2vec-openai",
			VectorIndexType: "hnsw", // Or "flat", "dynamic"
		}
		// END SetVectorIndexType

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create class with vector index parameters", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		// START SetVectorIndexParams
		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			Properties: []*models.Property{
				{
					Name:     "title",
					DataType: schema.DataTypeText.PropString(),
				},
				{
					Name:     "country",
					DataType: schema.DataTypeText.PropString(),
				},
			},
			Vectorizer:      "text2vec-openai",
			VectorIndexType: "hnsw",
			VectorIndexConfig: map[string]interface{}{
				"bq": map[string]interface{}{
					"enabled": true,
				},
				"efConstruction": 300,
				"distance":       "cosine",
				"filterStrategy": "acorn",
			},
		}
		// END SetVectorIndexParams

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create class with property settings like tokenization", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		// START PropModuleSettings
		vTrue := true
		vFalse := false

		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			Properties: []*models.Property{
				{
					Name:            "title",
					DataType:        schema.DataTypeText.PropString(),
					Tokenization:    "lowercase",
					IndexFilterable: &vTrue,
					IndexSearchable: &vFalse,
					ModuleConfig: map[string]interface{}{
						"text2vec-cohere": map[string]interface{}{
							"vectorizePropertyName": true,
						},
					},
				},
				{
					Name:            "body",
					DataType:        schema.DataTypeText.PropString(),
					Tokenization:    "whitespace",
					IndexFilterable: &vTrue,
					IndexSearchable: &vTrue,
					ModuleConfig: map[string]interface{}{
						"text2vec-cohere": map[string]interface{}{
							"vectorizePropertyName": false,
						},
					},
				},
			},
			Vectorizer: "text2vec-cohere",
		}
		// END PropModuleSettings

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create class with distance metric", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		// START DistanceMetric
		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			VectorIndexConfig: map[string]interface{}{
				"distance": "cosine",
			},
		}
		// END DistanceMetric

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create class with inverted index parameters", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		// START SetInvertedIndexParams
		vTrue := true
		vFalse := false

		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			Properties: []*models.Property{
				{
					Name:            "title",
					DataType:        schema.DataTypeText.PropString(),
					Tokenization:    "lowercase",
					IndexFilterable: &vTrue,
					IndexSearchable: &vFalse,
				},
				{
					Name:            "chunk",
					DataType:        schema.DataTypeText.PropString(),
					Tokenization:    "word",
					IndexFilterable: &vTrue,
					IndexSearchable: &vTrue,
				},
				{
					Name:              "chunk_no",
					DataType:          schema.DataTypeInt.PropString(),
					IndexRangeFilters: &vTrue,
				},
			},
			InvertedIndexConfig: &models.InvertedIndexConfig{
				Bm25: &models.BM25Config{
					B:  0.7,
					K1: 1.25,
				},
				IndexNullState:      true,
				IndexPropertyLength: true,
				IndexTimestamps:     true,
			},
		}
		// END SetInvertedIndexParams

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create class with reranker model integration", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		// START SetReranker
		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			Vectorizer:  "text2vec-openai",
			ModuleConfig: map[string]interface{}{
				"reranker-cohere": map[string]interface{}{
					"model": "rerank-v3.5",
				},
			},
		}
		// END SetReranker

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("update class with reranker model integration", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			Vectorizer:  "text2vec-openai",
		}

		creation_err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, creation_err)

		// START UpdateReranker
		updatedArticleClassConfig := &models.Class{
			Class: "Article",
			ModuleConfig: map[string]interface{}{
				"reranker-cohere": map[string]interface{}{
					"model": "rerank-v3.5",
				},
			},
		}
		// END UpdateReranker

		err := client.Schema().ClassUpdater().
			WithClass(updatedArticleClassConfig).
			Do(ctx)

		require.NoError(t, err)
	})

	t.Run("create class with generative model integration", func(t *testing.T) {
		err = client.Schema().ClassDeleter().WithClassName("Article").Do(ctx)
		require.NoError(t, err)

		// START SetGenerative
		articleClass := &models.Class{
			Class:       "Article",
			Description: "Collection of articles",
			Vectorizer:  "text2vec-openai",
			ModuleConfig: map[string]interface{}{
				"generative-openai": map[string]interface{}{
					"model": "gpt-4o",
				},
			},
		}
		// END SetGenerative

		err := client.Schema().ClassCreator().
			WithClass(articleClass).
			Do(ctx)

		require.NoError(t, err)
	})
}
