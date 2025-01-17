// START-ANY
// Set these environment variables
// WCD_HOSTNAME			your Weaviate instance hostname
// WCD_API_KEY  		your Weaviate instance API key

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
		Host:       os.Getenv("WCD_W_EMB_HOSTNAME"),
		Scheme:     "https",
		AuthConfig: auth.ApiKey{Value: os.Getenv("WCD_W_EMB_API_KEY")},
		Headers: map[string]string{
			"X-Weaviate-Api-Key":     os.Getenv("WCD_W_EMB_API_KEY"),
			"X-Weaviate-Cluster-Url": fmt.Sprintf("https://%s", os.Getenv("WCD_W_EMB_HOSTNAME")),
		},
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
