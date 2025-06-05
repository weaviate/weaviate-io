// START-ANY
// Set these environment variables
// WEAVIATE_HOSTNAME			your Weaviate instance hostname, excluding the scheme (https://)
// WEAVIATE_API_KEY  		your Weaviate instance API key
// <PROVIDER>_APIKEY   	your model provider API key (or token)

package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v5/weaviate"
	"github.com/weaviate/weaviate-go-client/v5/weaviate/auth"
)

func main() {
	cfg := weaviate.Config{
		Host:       os.Getenv("WEAVIATE_HOSTNAME"),
		Scheme:     "https",
		AuthConfig: auth.ApiKey{Value: os.Getenv("WEAVIATE_API_KEY")},
		// highlight-start
		Headers: map[string]string{
			// END-ANY
			// START AWSInstantiation
			"X-AWS-Access-Key": os.Getenv("AWS_ACCESS_KEY"),
			"X-AWS-Secret-Key": os.Getenv("AWS_SECRET_KEY"),
			// END AWSInstantiation
			// START CohereInstantiation
			"X-Cohere-Api-Key": os.Getenv("COHERE_APIKEY"),
			// END CohereInstantiation
			// START DatabricksInstantiation
			"X-Databricks-Token": os.Getenv("DATABRICKS_TOKEN"),
			// END DatabricksInstantiation
			// START GoogleInstantiation
			"X-Goog-Vertex-Key": os.Getenv("VERTEX_APIKEY"),
			"X-Goog-Studio-Key": os.Getenv("STUDIO_APIKEY"),
			// END GoogleInstantiation
			// START HuggingFaceInstantiation
			"X-HuggingFace-Api-Key": os.Getenv("HUGGINGFACE_APIKEY"),
			// END HuggingFaceInstantiation
			// START JinaAIInstantiation
			"X-JinaAI-Api-Key": os.Getenv("JINAAI_APIKEY"),
			// END JinaAIInstantiation
			// START MistralInstantiation
			"X-Mistral-Api-Key": os.Getenv("MISTRAL_APIKEY"),
			// END MistralInstantiation
			// START NVIDIAInstantiation
			"X-NVIDIA-Api-Key": os.Getenv("NVIDIA_APIKEY"),
			// END NVIDIAInstantiation
			// START OpenAIInstantiation
			"X-OpenAI-Api-Key": os.Getenv("OPENAI_APIKEY"),
			// END OpenAIInstantiation
			// START AzureOpenAIInstantiation
			"X-Azure-Api-Key": os.Getenv("AZURE_APIKEY"),
			// END AzureOpenAIInstantiation
			// START VoyageAIInstantiation
			"X-VoyageAI-Api-Key": os.Getenv("VOYAGEAI_APIKEY"),
			// END VoyageAIInstantiation
			// START-ANY
		},
		// highlight-end
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// Work with Weaviate
	// END-ANY
	isReady, err := client.Misc().ReadyChecker().Do(context.Background())
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", isReady)
	// START-ANY
}

// END-ANY
