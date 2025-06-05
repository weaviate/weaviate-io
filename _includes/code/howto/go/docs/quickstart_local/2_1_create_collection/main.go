// START CreateCollection
package main

import (
	"context"
	"fmt"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate/entities/models"
)

func main() {
	cfg := weaviate.Config{
		Host:   "localhost:8080",
		Scheme: "http",
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// highlight-start
	// Define the collection
	classObj := &models.Class{
		Class:      "Question",
		Vectorizer: "text2vec-ollama",
		ModuleConfig: map[string]interface{}{
			"text2vec-ollama": map[string]interface{}{ // Configure the Ollama embedding integration
				"apiEndpoint": "http://host.docker.internal:11434", // Allow Weaviate from within a Docker container to contact your Ollama instance
				"model":       "nomic-embed-text",                  // The model to use
			},
			"generative-ollama": map[string]interface{}{ // Configure the Ollama generative integration
				"apiEndpoint": "http://host.docker.internal:11434", // Allow Weaviate from within a Docker container to contact your Ollama instance
				"model":       "llama3.2",                          // The model to use
			},
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
