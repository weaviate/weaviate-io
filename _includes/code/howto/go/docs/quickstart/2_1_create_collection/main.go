// START CreateCollection
// Set these environment variables
// WEAVIATE_HOSTNAME			your Weaviate instance hostname
// WEAVIATE_API_KEY  		your Weaviate instance API key
// COHERE_APIKEY   		your Cohere API key

package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v5/weaviate"
	"github.com/weaviate/weaviate-go-client/v5/weaviate/auth"
	"github.com/weaviate/weaviate/entities/models"
)

func main() {
	cfg := weaviate.Config{
		Host:       os.Getenv("WEAVIATE_HOSTNAME"),
		Scheme:     "https",
		AuthConfig: auth.ApiKey{Value: os.Getenv("WEAVIATE_API_KEY")},
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// highlight-start
	// Define the collection
	classObj := &models.Class{
		Class:      "Question",
		Vectorizer: "text2vec-weaviate",
		ModuleConfig: map[string]interface{}{
			"text2vec-weaviate": map[string]interface{}{},
			"generative-cohere": map[string]interface{}{},
		},
	}

	// add the collection
	err = client.Schema().ClassCreator().WithClass(classObj).Do(context.Background())
	if err != nil {
		panic(err)
	}
	// highlight-end
}

// END CreateCollection
