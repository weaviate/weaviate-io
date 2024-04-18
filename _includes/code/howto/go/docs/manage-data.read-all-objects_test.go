// How-to: Manage data -> Read all objects
// TODO: write tests, this is only an implementation, needs tests
package docs

import (
	"context"
	"fmt"
	"strings"
	"testing"

	"github.com/stretchr/testify/require"
	// CursorExample  // Retrieve data
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
	"github.com/weaviate/weaviate/entities/models"
	// END CursorExample // Use this function to retrieve data
)

func Test_ManageDataReadAllObjects(t *testing.T) {
	ctx := context.Background()
	t.Run("Read all objects", func(t *testing.T) {
		// CursorExample  // Retrieve data

		sourceClient, err := weaviate.NewClient(weaviate.Config{
			Scheme: "https",
			Host:   "te URL
			AuthConfig: auth.ApiKey{
				Value: "YOUR-WEAVIATE-API-KEY", // If auth enabled. Replace with your Weaviate instance API key.
			},
		})
		if err != nil {
			// handle error
			panic(err)
		}

		batchSize := 20
		className := "WineReview"
		classProperties := []string{"title"}

		getBatchWithCursor := func(client weaviate.Client,
			className string, classProperties []string, batchSize int, cursor string) (*models.GraphQLResponse, error) {
			fields := []graphql.Field{}
			for _, prop := range classProperties {
				fields = append(fields, graphql.Field{Name: prop})
			}
			fields = append(fields, graphql.Field{Name: "_additional { id vector }"})

			get := client.GraphQL().Get().
				WithClassName(className).
				// highlight-start
				// Optionally retrieve the vector embedding by adding `vector` to the _additional fields
				WithFields(fields...).
				// highlight-end
				WithLimit(batchSize)

			if cursor != "" {
				return get.WithAfter(cursor).Do(context.Background())
			}
			return get.Do(context.Background())
		}
		// Use this function to retrieve data

		// START FetchClassDefinition
		classDef, err := sourceClient.Schema().ClassGetter().WithClassName(className).Do(ctx)
		// END FetchClassDefinition
		require.NoError(t, err)

		// Restore to a new (target) instance

		targetClient, err := weaviate.NewClient(weaviate.Config{
			Scheme: "https",
			Host:   "WEAVIATE_INSTANCE_URL", // Replace with your Weaviate URL
		})
		if err != nil {
			// handle error
			panic(err)
		}

		targetClient.Schema().ClassCreator().WithClass(classDef).Do(ctx)
		// Finished restoring to the target instance  // END CursorExample

		// TODO: tests

		// Restore to a new (target) instance  // CursorExample
		targetBatcher := targetClient.Batch().ObjectsBatcher()
		cursor := ""

		getObjectProperties := func(results *models.GraphQLResponse,
			className string) ([]map[string]interface{}, error) {
			if len(results.Errors) > 0 {
				// handle errors
				errorMessages := make([]string, len(results.Errors))
				for i, gqlErr := range results.Errors {
					errorMessages[i] = fmt.Sprintf("path: %v message: %v", gqlErr.Path, gqlErr.Message)
				}
				return nil, fmt.Errorf("error: %v", strings.Join(errorMessages, ", "))
			}
			get := results.Data["Get"].(map[string]interface{})
			objects := get[className].([]interface{})
			res := make([]map[string]interface{}, len(objects))
			for i, obj := range objects {
				res[i] = obj.(map[string]interface{})
			}
			return res, nil
		}

		mustGetVector := func(v interface{}) models.C11yVector {
			vec, ok := v.([]interface{})
			if ok {
				vector := make(models.C11yVector, len(vec))
				for i := range vec {
					vector[i] = vec[i].(float32)
				}
				return vector
			}
			panic("argument is not an array")
		}

		// Batch import all objects to the target instance
		for {
			// From the SOURCE instance, get the next group of objects
			results, err := getBatchWithCursor(*sourceClient, className, classProperties, batchSize, cursor)
			if err != nil {
				// handle errors
				panic(err)
			}
			objectProperties, err := getObjectProperties(results, className)
			if err != nil {
				// handle errors
				panic(err)
			}
			// If empty, we're finished
			if len(objectProperties) == 0 {
				break
			}
			// Otherwise, add the objects to the batch to be added to the target instance
			for _, objProp := range objectProperties {
				_additional := objProp["_additional"]
				properties := map[string]interface{}{}
				for name, value := range objProp {
					if name != "_additional" {
						properties[name] = value
					}
				}

				targetBatcher.WithObjects(&models.Object{
					Class:      className,
					Properties: properties,
					// highlight-start
					// Can update the vector if it was included in _additional above
					Vector: mustGetVector(_additional.(map[string]interface{})["vector"]),
					// highlight-end
				})
			}
			resp, err := targetBatcher.Do(ctx)
			if err != nil {
				// handle errors
				panic(err)
			}
			fmt.Printf("Imported %v objects...", len(resp))
		}
		// Finished restoring to the target instance  // END CursorExample
	})
}
