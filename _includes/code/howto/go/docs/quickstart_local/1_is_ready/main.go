// START InstantiationExample
package main

import (
	"context"
	"fmt"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
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

	// Check the connection
	ready, err := client.Misc().ReadyChecker().Do(context.Background())
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", ready)
}

// END InstantiationExample
