// How-to: Manage-data -> (Batch) Import items

// TODO - review tests
package docs

import (
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate/entities/models"
)

func Test_ManageDataCrossRefs(t *testing.T) {
	ctx := context.Background()
	scheme := "http"
	host := "localhost:8080"

	config := weaviate.Config{Scheme: scheme, Host: host}
	client, err := weaviate.NewClient(config)
	require.NoError(t, err)

	delProps := func(uuid, className string, propNames ...string) (bool, error) {
		objs, err := client.Data().ObjectsGetter().WithID(uuid).WithClassName(className).Do(ctx)
		if err != nil {
			return false, err
		}
		if objs == nil || len(objs) == 0 {
			return false, fmt.Errorf("object with id: %v not found", uuid)
		}
		if objs[0].Properties == nil {
			return false, fmt.Errorf("object with id: %v has no properties", uuid)
		}
		properties := objs[0].Properties.(map[string]interface{})
		for _, propName := range propNames {
			delete(properties, propName)
		}
		err = client.Data().Updater().
			WithID(uuid).
			WithClassName(className).
			WithProperties(properties).
			Do(ctx)
		return err == nil, err
	}

	assertCrossRefHref := func(t *testing.T, objs []*models.Object, propName string, hrefs ...string) {
		require.Len(t, objs, 1)
		for i := range objs {
			hasCategory := objs[i].Properties.(map[string]interface{})[propName]
			require.NotNil(t, hasCategory)
			hrefValue := hasCategory.([]interface{})[0].(map[string]interface{})["href"]
			for _, href := range hrefs {
				assert.Equal(t, href, hrefValue)
			}
		}
	}

	// sfID := "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
	// usCitiesID := "20ffc68d-986b-5e71-a680-228dba18d7ef"
	// museumsID := "fec50326-dfa1-53c9-90e8-63d0240bd933"

	t.Run("Add one-way cross-ref", func(t *testing.T) {
		// START OneWay
		sfID := "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
		usCitiesID := "20ffc68d-986b-5e71-a680-228dba18d7ef"

		client.Data().ReferenceCreator().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			WithReferenceProperty("hasCategory").
			WithReference(client.Data().ReferencePayloadBuilder().
				WithClassName("JeopardyCategory").
				WithID(usCitiesID).
				Payload()).
			Do(ctx)
		// END OneWay

		objs, err := client.Data().ObjectsGetter().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			Do(ctx)
		require.NoError(t, err)
		assertCrossRefHref(t, objs, "hasCategory", fmt.Sprintf("http://localhost:8080/v1/objects/JeopardyCategory/%v", usCitiesID))
	})

	t.Run("Add bidirectional cross-ref", func(t *testing.T) {
		// TwoWay Go
		sfID := "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
		usCitiesID := "20ffc68d-986b-5e71-a680-228dba18d7ef"

		// END TwoWay Go

		isDeleted, err := delProps(sfID, "JeopardyQuestion", "hasCategory")
		require.NoError(t, err)
		require.True(t, isDeleted)
		isDeleted, err = delProps(sfID, "JeopardyCategory", "hasQuestion")
		require.NoError(t, err)
		require.True(t, isDeleted)

		// TwoWay Go
		// First, add the "hasQuestion" cross-reference property to the JeopardyCategory class
		client.Schema().PropertyCreator().
			WithClassName("JeopardyCategory").
			WithProperty(&models.Property{
				Name:     "hasQuestion",
				DataType: []string{"JeopardyQuestion"},
			}).
			Do(ctx)

		// For the "San Francisco" JeopardyQuestion object, add a cross-reference to the "U.S. CITIES" JeopardyCategory object
		client.Data().ReferenceCreator().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			WithReferenceProperty("hasCategory").
			WithReference(client.Data().ReferencePayloadBuilder().
				WithClassName("JeopardyCategory").
				WithID(usCitiesID).
				Payload()).
			Do(ctx)

		// For the "U.S. CITIES" JeopardyCategory object, add a cross-reference to "San Francisco"
		client.Data().ReferenceCreator().
			WithClassName("JeopardyCategory").
			WithID(usCitiesID).
			WithReferenceProperty("hasQuestion").
			WithReference(client.Data().ReferencePayloadBuilder().
				WithClassName("JeopardyQuestion").
				WithID(sfID).
				Payload()).
			Do(ctx)
		// END TwoWay Go

		sf, err := client.Data().ObjectsGetter().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			Do(ctx)
		require.NoError(t, err)
		assertCrossRefHref(t, sf, "hasCategory", fmt.Sprintf("http://localhost:8080/v1/objects/JeopardyCategory/%v", usCitiesID))

		usCities, err := client.Data().ObjectsGetter().
			WithClassName("JeopardyCategory").
			WithID(usCitiesID).
			Do(ctx)
		require.NoError(t, err)
		assertCrossRefHref(t, usCities, "hasQuestion", fmt.Sprintf("http://localhost:8080/v1/objects/JeopardyQuestion/%v", sfID))
	})

	t.Run("Add multiple cross-refs", func(t *testing.T) {
		// Multiple Go
		sfID := "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
		usCitiesID := "20ffc68d-986b-5e71-a680-228dba18d7ef"
		museumsID := "fec50326-dfa1-53c9-90e8-63d0240bd933"

		// Add to "San Francisco" the "U.S. CITIES" category
		client.Data().ReferenceCreator().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			WithReferenceProperty("hasCategory").
			WithReference(client.Data().ReferencePayloadBuilder().
				WithClassName("JeopardyCategory").
				WithID(usCitiesID).
				Payload()).
			Do(ctx)

		// Add the "MUSEUMS" category as well
		client.Data().ReferenceCreator().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			WithReferenceProperty("hasCategory").
			WithReference(client.Data().ReferencePayloadBuilder().
				WithClassName("JeopardyCategory").
				WithID(museumsID).
				Payload()).
			Do(ctx)
		// END Multiple Go

		sf, err := client.Data().ObjectsGetter().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			Do(ctx)
		require.NoError(t, err)
		assertCrossRefHref(t, sf, "hasCategory",
			fmt.Sprintf("http://localhost:8080/v1/objects/JeopardyCategory/%v", usCitiesID),
			fmt.Sprintf("http://localhost:8080/v1/objects/JeopardyCategory/%v", museumsID),
		)
	})

	t.Run("Delete cross-refs", func(t *testing.T) {
		// Delete Go
		sfID := "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
		museumsID := "fec50326-dfa1-53c9-90e8-63d0240bd933"

		// From the "San Francisco" JeopardyQuestion object, delete the "MUSEUMS" category cross-reference
		client.Data().ReferenceDeleter().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			WithReferenceProperty("hasCategory").
			WithReference(client.Data().ReferencePayloadBuilder().
				WithClassName("JeopardyCategory").
				WithID(museumsID).
				Payload()).
			Do(ctx)
		// END Delete Go

		usCitiesID := "20ffc68d-986b-5e71-a680-228dba18d7ef"
		sf, err := client.Data().ObjectsGetter().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			Do(ctx)
		require.NoError(t, err)
		assertCrossRefHref(t, sf, "hasCategory", fmt.Sprintf("http://localhost:8080/v1/objects/JeopardyCategory/%v", usCitiesID))
	})

	t.Run("Update cross-refs", func(t *testing.T) {
		// Update Go
		sfID := "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
		museumsID := "fec50326-dfa1-53c9-90e8-63d0240bd933"

		// In the "San Francisco" JeopardyQuestion object, set the "hasCategory" cross-reference only to "MUSEUMS"
		client.Data().ReferenceReplacer().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			WithReferenceProperty("hasCategory").
			WithReferences(&models.MultipleRef{
				client.Data().ReferencePayloadBuilder().
					WithClassName("JeopardyCategory").
					WithID(museumsID).
					Payload(),
			}).
			Do(ctx)
		// END Update Go

		sf, err := client.Data().ObjectsGetter().
			WithClassName("JeopardyQuestion").
			WithID(sfID).
			Do(ctx)
		require.NoError(t, err)
		assertCrossRefHref(t, sf, "hasCategory", fmt.Sprintf("http://localhost:8080/v1/objects/JeopardyCategory/%v", museumsID))
	})
}
