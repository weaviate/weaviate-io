// Set these environment variables
// WCD_HOSTNAME			your Weaviate instance hostname
// WCD_API_KEY  		your Weaviate instance API key

package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/fault"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
	"github.com/weaviate/weaviate/entities/models"
)

// START-ANY
// package, imports not shown

func main() {
	// Instantiation not shown

	ctx := context.Background()

	// END-ANY
	cfg := weaviate.Config{
		Host:       os.Getenv("WCD_HOSTNAME"),
		Scheme:     "https",
		AuthConfig: auth.ApiKey{Value: os.Getenv("WCD_API_KEY")},
		Headers: map[string]string{
			"X-Cohere-Api-Key": os.Getenv("COHERE_APIKEY"),
		},
		// highlight-end
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START BasicVectorizerCohere
	// highlight-start
	// Define the collection
	basicCohereVectorizerDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				VectorIndexType: "hnsw",
				Vectorizer: map[string]interface{}{
					"text2vec-cohere": map[string]interface{}{
						"sourceProperties": []string{"title"},
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(basicCohereVectorizerDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END BasicVectorizerCohere

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START VectorizerCohereCustomModel
	// highlight-start
	// Define the collection
	cohereVectorizerWithModelDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				VectorIndexType: "hnsw",
				Vectorizer: map[string]interface{}{
					"text2vec-cohere": map[string]interface{}{
						"sourceProperties": []string{"title"},
						"model":            "embed-multilingual-v3.0",
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(cohereVectorizerWithModelDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END VectorizerCohereCustomModel

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START FullVectorizerCohere
	// highlight-start
	// Define the collection
	cohereVectorizerFullDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				VectorIndexType: "hnsw",
				Vectorizer: map[string]interface{}{
					"text2vec-cohere": map[string]interface{}{
						"sourceProperties": []string{"title"},
						// "model":            "embed-multilingual-v3.0",
						// "truncate":         "END", // "NONE", "START" or "END"
						// "base_url":         "<custom_cohere_url>",
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(cohereVectorizerFullDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END FullVectorizerCohere

	// START BatchImportExample
	var sourceObjects = []map[string]string{
		// Objects not shown
		// END BatchImportExample
		{"title": "The Shawshank Redemption", "description": ""},
		{"title": "The Godfather", "description": ""},
		{"title": "The Dark Knight", "description": ""},
		{"title": "Jingle All the Way", "description": ""},
		{"title": "A Christmas Carol", "description": ""},
		// START BatchImportExample
	}

	// highlight-start
	// Convert items into a slice of models.Object
	objects := []models.PropertySchema{}
	for i := range sourceObjects {
		objects = append(objects, map[string]interface{}{
			// Populate the object with the data
			// END BatchImportExample
			"title":       sourceObjects[i]["title"],
			"description": sourceObjects[i]["description"],
			// START BatchImportExample
		})
	}

	// Batch write items
	batcher := client.Batch().ObjectsBatcher()
	for _, dataObj := range objects {
		batcher.WithObjects(&models.Object{
			Class:      "DemoCollection",
			Properties: dataObj,
		})
	}

	// Flush
	batchRes, err := batcher.Do(ctx)

	// Error handling
	if err != nil {
		panic(err)
	}
	for _, res := range batchRes {
		if res.Result.Errors != nil {
			for _, err := range res.Result.Errors.Error {
				if err != nil {
					fmt.Printf("Error details: %v\n", *err)
					panic(err.Message)
				}
			}
		}
	}
	// highlight-end
	// END BatchImportExample

	// START NearTextExample
	nearTextResponse, err := client.GraphQL().Get().
		WithClassName("DemoCollection").
		WithFields(
			graphql.Field{Name: "title"},
		).
		WithNearText(client.GraphQL().NearTextArgBuilder().
			WithConcepts([]string{"A holiday film"})).
		WithLimit(2).
		Do(ctx)
	// highlight-end

	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", nearTextResponse)
	// END NearTextExample

	// START HybridExample
	hybridResponse, err := client.GraphQL().Get().
		WithClassName("DemoCollection").
		WithFields(
			graphql.Field{Name: "title"},
		).
		WithHybrid(client.GraphQL().HybridArgumentBuilder().
			WithQuery("A holiday film")).
		WithLimit(2).
		Do(ctx)
	// highlight-end

	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", hybridResponse)
	// END HybridExample

	// START-ANY
}

// END-ANY
