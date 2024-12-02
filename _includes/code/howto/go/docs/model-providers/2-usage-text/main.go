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

	// START BasicVectorizerAWSBedrock
	// highlight-start
	// Define the collection
	basicAWSBedrockVectorizerDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-aws": map[string]interface{}{
						"sourceProperties": []string{"title"},
						"region":           "us-east-1",
						"service":          "bedrock",
						"model":            "cohere.embed-multilingual-v3",
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(basicAWSBedrockVectorizerDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END BasicVectorizerAWSBedrock

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START BasicVectorizerAWSSagemaker
	// highlight-start
	// Define the collection
	basicAWSSagemakerVectorizerDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-aws": map[string]interface{}{
						"sourceProperties": []string{"title"},
						"region":           "us-east-1",
						"service":          "sagemaker",
						"endpoint":         "<custom_sagemaker_url>",
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(basicAWSSagemakerVectorizerDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END BasicVectorizerAWSSagemaker

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START FullVectorizerAWS
	// highlight-start
	// Define the collection
	awsVectorizerFullDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-aws": map[string]interface{}{
						"sourceProperties": []string{"title"},
						"region":           "us-east-1",
						"service":          "bedrock",                      // "bedrock" or "sagemaker"
						"model":            "cohere.embed-multilingual-v3", // If using `bedrock`, this is required
						// "endpoint":         "<custom_sagemaker_url>",       // If using `sagemaker`, this is required
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(awsVectorizerFullDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END FullVectorizerAWS

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

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START BasicVectorizerDatabricks
	// highlight-start
	// Define the collection
	basicDatabricksVectorizerDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-databricks": map[string]interface{}{
						"sourceProperties": []string{"title"},
						"endpoint":         "<databricks_vectorizer_endpoint>", // Required for Databricks
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(basicDatabricksVectorizerDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END BasicVectorizerDatabricks

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START BasicVectorizerGoogleVertex
	// highlight-start
	// Define the collection
	basicGoogleVertexVectorizerDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-google": map[string]interface{}{
						"project_id": "<google-cloud-project-id>",
						"model_id":   "textembedding-gecko@latest", // (Optional) To manually set the model ID
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(basicGoogleVertexVectorizerDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END BasicVectorizerGoogleVertex

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START BasicVectorizerGoogleStudio
	// highlight-start
	// Define the collection
	basicGoogleStudioVectorizerDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-google": map[string]interface{}{
						"sourceProperties": []string{"title"},
						"model_id":         "text-embedding-004", // (Optional) To manually set the model ID
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(basicGoogleStudioVectorizerDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END BasicVectorizerGoogleStudio

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START FullVectorizerGoogle
	// highlight-start
	// Define the collection
	googleVectorizerFullDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-aws": map[string]interface{}{
						"sourceProperties": []string{"title"},
						"project_id":       "<google-cloud-project-id>",  // Required for Vertex AU
						"model_id":         "textembedding-gecko@latest", // (Optional) To manually set the model ID
						"api_endpoint":     "<google-api-endpoint>",      // (Optional) To manually set the API endpoint
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(googleVectorizerFullDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END FullVectorizerGoogle

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START BasicVectorizerHuggingFace
	// highlight-start
	// Define the collection
	basicHuggingfaceVectorizerDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-huggingface": map[string]interface{}{
						"sourceProperties": []string{"title"},
						"model":            "sentence-transformers/all-MiniLM-L6-v2",
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(basicHuggingfaceVectorizerDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END BasicVectorizerHuggingFace

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START FullVectorizerHuggingFace
	// highlight-start
	// Define the collection
	fullHuggingfaceVectorizerDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-huggingface": map[string]interface{}{
						"sourceProperties": []string{"title"},
						//  Note: Use only one of (`model`), (`passage_model` and `query_model`), or (`endpoint_url`)
						"model": "sentence-transformers/all-MiniLM-L6-v2",
						// "passage_model":  "sentence-transformers/facebook-dpr-ctx_encoder-single-nq-base",      // Required if using `query_model`
						// "query_model":    "sentence-transformers/facebook-dpr-question_encoder-single-nq-base", // Required if using `passage_model`
						// "endpoint_url":   "<custom_huggingface_url>",
						// // Optional parameters
						// "wait_for_model": true,
						// "use_cache":      true,
						// "use_gpu":        true,
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(fullHuggingfaceVectorizerDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END FullVectorizerHuggingFace

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START BasicVectorizerJinaAI
	// highlight-start
	// Define the collection
	basicJinaVectorizerDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-jinaai": map[string]interface{}{
						"sourceProperties": []string{"title"},
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(basicJinaVectorizerDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END BasicVectorizerJinaAI

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START VectorizerJinaCustomModel
	// highlight-start
	// Define the collection
	jinaVectorizerWithModelDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-jinaai": map[string]interface{}{
						"sourceProperties": []string{"title"},
						"model":            "jina-embeddings-v3",
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(jinaVectorizerWithModelDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END VectorizerJinaCustomModel

	// Clean slate: Delete the collection
	if err := client.Schema().ClassDeleter().WithClassName("DemoCollection").Do(context.Background()); err != nil {
		// Weaviate will return a 400 if the class does not exist, so this is allowed, only return an error if it's not a 400
		if status, ok := err.(*fault.WeaviateClientError); ok && status.StatusCode != http.StatusBadRequest {
			panic(err)
		}
	}

	// START FullVectorizerJinaAI
	// highlight-start
	// Define the collection
	jinaVectorizerFullDef := &models.Class{
		Class: "DemoCollection",
		VectorConfig: map[string]models.VectorConfig{
			"title_vector": {
				Vectorizer: map[string]interface{}{
					"text2vec-jinaai": map[string]interface{}{
						"sourceProperties": []string{"title"},
						"model":            "jina-embeddings-v3",
						"dimensions":       512, // e.g. 1024, 512, 256 (only applicable for some models)
					},
				},
			},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(jinaVectorizerFullDef).Do(ctx)
	if err != nil {
		panic(err)
	}
	// highlight-end
	// END FullVectorizerJinaAI

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
