// START-ANY
// Set these environment variables
// WCD_HOSTNAME			your Weaviate instance hostname, excluding the scheme (https://)
// WCD_API_KEY  		your Weaviate instance API key
// <PROVIDER>_APIKEY   	your model provider API key

package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
)

func main() {
	cfg := weaviate.Config{
		Host:       os.Getenv("WCD_HOSTNAME"),
		Scheme:     "https",
		AuthConfig: auth.ApiKey{Value: os.Getenv("WCD_API_KEY")},
		// highlight-start
		Headers: map[string]string{
			// END-ANY
			// START CohereInstantiation
			"X-Cohere-Api-Key": os.Getenv("COHERE_APIKEY"),
			// END CohereInstantiation
			// START AWSInstantiation
			"X-AWS-Access-Key": os.Getenv("AWS_ACCESS_KEY"),
			"X-AWS-Secret-Key": os.Getenv("AWS_SECRET_KEY"),
			// END AWSInstantiation
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
