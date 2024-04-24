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

	// START InitialSchema
	class := &models.Class{
			Class:      "Question",
			Vectorizer: "text2vec-openai",
			Properties: []*models.Property{
					{Name: "Question", DataType: []string{"text"}},
					{Name: "Answer", DataType: []string{"text"}},
			},
	}
	
	err = client.Schema().ClassCreator().
		 WithClass(class).Do(context.Background())
	
	if err != nil {
	 	log.Fatalf("create class: %v", err)
	}
	// END InitialSchema

	// START LoadData
	batcher := client.Batch().ObjectsBatcher()
	for _, d := range data {
			batcher.WithObjects(&models.Object{
					Class: "Question",
					Properties: map[string]interface{}{
							"question": d.Question,
							"answer":   d.Answer,
					},
			})
	}
	
	batch, err := batcher.Do(context.Background())
	if err != nil {
	 	log.Fatalf("batcher: %v", err)
	}
	
	for i, b := range batch {
			if b.Result.Errors != nil {
					for _, err := range b.Result.Errors.Error {
						 log.Print(err.Message)
				 	}
					log.Fatalf("object@idx %d had batch errors above", i)
			}
	}
	// END LoadData

	// START UpdateSchema
	class, err = client.Schema().ClassGetter().
	 	WithClassName("Question").Do(context.Background())
	
	if err != nil {
	 	log.Fatalf("get class for vec idx cfg update: %v", err)
	}

	cfg := class.VectorIndexConfig.(map[string]interface{})
	cfg["pq"] = map[string]interface{}{
			"enabled":       true,
			"trainingLimit": 100_000,
			"segments":      96,
	}
	class.VectorIndexConfig = cfg
	
	err = client.Schema().ClassUpdater().
		 WithClass(class).Do(context.Background())
	
	if err != nil {
	 	log.Fatalf("update class to use pq: %v", err)
	}
	// END UpdateSchema

	// START GetSchema
	class, err = client.Schema().ClassGetter().
	 	WithClassName("Question").Do(context.Background())
	if err != nil {
	 	log.Fatalf("get class to verify vec idx cfg changes: %v", err)
	}
	
	cfg = class.VectorIndexConfig.(map[string]interface{})
	log.Printf("pq config: %v", cfg["pq"])
	// END GetSchema
}
