package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate/entities/models"
)

const url = "https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/jeopardy_1k.json"

func main() {
	// START DownloadData
	resp, err := http.Get(url)
	if err != nil {
		 log.Fatalf("get dataset: %v", err)
	}

	var data []struct {
			Question string `json:"Question"`
			Answer   string `json:"Answer"`
	}

	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		 log.Fatalf("read dataset: %v", err)
	}

	log.Printf("data: %+v", data)
	// END DownloadData

	// START ConnectCode
	client, err := weaviate.NewClient(weaviate.Config{
			Scheme: "http",
			Host:   "localhost:8080",
			Headers: map[string]string{
			 	"X-OpenAI-Api-Key": os.Getenv("OPENAI_APIKEY"),
			},
	})

	if err != nil {
	 	log.Fatalf("init client: %v", err)
	}
	// END ConnectCode

	// START EnableBQ
	// highlight-start
	simple_bq := map[string]interface{}{
			"enabled":	true,
	}
	// highlight-end
	class := &models.Class{
			Class:      "YourCollection",
			Vectorizer: "text2vec-openai",
			// highlight-start
			VectorIndexConfig: map[string]interface{}{
				"bq": simple_bq,
			},
			// highlight-end
			// Remainder not shown
	}

	err = client.Schema().ClassCreator().
			WithClass(class).Do(context.Background())

	if err != nil {
			log.Fatalf("create class: %v", err)
	}
	// END EnableBQ

	// START BQWithOptions
	// highlight-start
	custom_bq := map[string]interface{}{
			"enabled":      true,
			"rescoreLimit": 200,
			"cache":        true,
	}
	// highlight-end
	class := &models.Class{
			Class:      "YourCollection",
			Vectorizer: "text2vec-openai",
			VectorIndexConfig: map[string]interface{}{
				// highlight-start
				"bq": custom_bq,
				// highlight-end
				"vectorCacheMaxObjects": 100_000,
			},
			// Remainder not shown
	}

	err = client.Schema().ClassCreator().
			WithClass(class).Do(context.Background())

	if err != nil {
			log.Fatalf("create class: %v", err)
	}
	// END BQWithOptions
}
