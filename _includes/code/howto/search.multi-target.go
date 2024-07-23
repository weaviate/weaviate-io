// START MultiBasic
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
		panic(err)
	}

	className := "Jeopardy_Tiny_Dataset"

	concepts := []string{"a wild animal"}
	certainty := float32(0.7)
	nearText := client.GraphQL().NearTextArgBuilder().
		WithConcepts(concepts).
		WithCertainty(certainty).
		WithTargetVectors("jeopardy_questions_vector", "jeopardy_answers_vector")

	ctx := context.Background()

	result, err := client.GraphQL().Get().
		WithClassName(className).
		WithNearText(nearText).
		Do(ctx)

	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", result)
}

// END MultiBasic