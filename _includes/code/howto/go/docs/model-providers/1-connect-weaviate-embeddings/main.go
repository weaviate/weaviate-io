// START-ANY
// Best practice: store your credentials in environment variables
// WEAVIATE_HOSTNAME	Weaviate hostname: "REST Endpoint" in Weaviate Cloud console
// WEAVIATE_API_KEY		Weaviate API key: "ADMIN" API key in Weaviate Cloud console

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
