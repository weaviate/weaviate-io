// How-to: Manage-data -> Create objects
package docs

import (
	"context"
	"fmt"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
	"github.com/weaviate/weaviate/entities/models"
	"weaviate.io/docs/docs/helper"
)

func Test_ManageDataMultiTenancy(t *testing.T) {
	ctx := context.Background()
	scheme := helper.EnvScheme("http")
	host := helper.EnvHost("localhost")
	port := helper.EnvPort("8080")
	openaiApiKey := helper.Env("OPENAI_APIKEY", "_dummy_")

	config := weaviate.Config{Scheme: scheme, Host: host + ":" + port, Headers: map[string]string{
		"X-Openai-Api-Key": openaiApiKey,
	}}
	client, err := weaviate.NewClient(config)
	require.NoError(t, err)

	err = client.Schema().AllDeleter().Do(ctx)
	require.NoError(t, err)

	className := "MultiTenancyCollection"

	t.Run("Add tenants to class", func(t *testing.T) {
		// START AddTenantsToClass
		client.Schema().ClassCreator().
			WithClass(&models.Class{
				Class: "MultiTenancyCollection",
				MultiTenancyConfig: &models.MultiTenancyConfig{
					Enabled: true,
				},
			}).
			Do(ctx)

		client.Schema().TenantsCreator().
			WithClassName("MultiTenancyCollection").
			WithTenants(models.Tenant{Name: "tenantA"}, models.Tenant{Name: "tenantB"}).
			Do(ctx)
		// END AddTenantsToClass

		tenants, err := client.Schema().TenantsGetter().WithClassName(className).Do(ctx)
		require.NoError(t, err)
		require.Len(t, tenants, 2)

		class, err := client.Schema().ClassGetter().WithClassName(className).Do(ctx)
		require.NoError(t, err)
		require.NotNil(t, class)
		assert.True(t, class.MultiTenancyConfig.Enabled)
	})

	t.Run("List tenants of a class", func(t *testing.T) {
		// START ListTenants
		tenants, err := client.Schema().TenantsGetter().
			WithClassName("MultiTenancyCollection").
			Do(ctx)
		// END ListTenants
		require.NoError(t, err)
		require.Len(t, tenants, 2)
	})

	t.Run("Remove tenants from a class", func(t *testing.T) {
		// START RemoveTenants
		client.Schema().TenantsDeleter().
			WithClassName("MultiTenancyCollection").
			WithTenants("tenantB", "tenantX"). // tenantX will be ignored
			Do(ctx)
		// END RemoveTenants

		tenants, err := client.Schema().TenantsGetter().WithClassName(className).Do(ctx)
		require.NoError(t, err)
		require.Len(t, tenants, 1)
	})

	t.Run("Create MT object", func(t *testing.T) {
		// START CreateMtObject
		object, err := client.Data().Creator().
			WithClassName("MultiTenancyCollection"). // The class to which the object will be added
			WithProperties(map[string]interface{}{
				"question": "This vector DB is OSS & supports automatic property type inference on import",
			}).
			// highlight-start
			WithTenant("tenantA"). // The tenant to which the object will be added
			// highlight-end
			Do(ctx)
		// END CreateMtObject

		require.NoError(t, err)
		require.NotNil(t, object)
		assert.Equal(t, "tenantA", object.Object.Tenant)
	})

	t.Run("Search MT", func(t *testing.T) {
		// START Search
		result, err := client.GraphQL().Get().
			WithClassName("MultiTenancyCollection").
			WithFields(graphql.Field{Name: "question"}).
			// highlight-start
			WithTenant("tenantA").
			// highlight-end
			Do(ctx)
		// END Search

		require.NoError(t, err)
		require.NotNil(t, result)
		require.Empty(t, result.Errors)
		agg := result.Data["Get"].(map[string]interface{})
		objects := agg[className].([]interface{})
		require.Len(t, objects, 1)
		obj := objects[0]
		question := obj.(map[string]interface{})["question"]
		assert.NotNil(t, question)
	})

	t.Run("Add cross-reference", func(t *testing.T) {
		objects, err := client.Data().ObjectsGetter().WithClassName(className).WithTenant("tenantA").Do(ctx)
		require.NoError(t, err)
		require.Len(t, objects, 1)

		object := objects[0]

		categoryWrapper, err := client.Data().Creator().
			WithClassName("JeopardyCategory").
			WithProperties(map[string]interface{}{
				"category": "Software",
			}).
			Do(ctx)
		require.NoError(t, err)
		require.NotNil(t, categoryWrapper)

		category := categoryWrapper.Object

		// START AddCrossRef
		// Add the cross-reference property to the multi-tenancy class
		client.Schema().PropertyCreator().
			WithClassName("MultiTenancyCollection").
			WithProperty(&models.Property{
				Name:     "hasCategory",
				DataType: []string{"JeopardyCategory"},
			}).
			Do(ctx)

		// Create the cross-reference from MultiTenancyCollection object to the JeopardyCategory object
		client.Data().ReferenceCreator().
			WithClassName("MultiTenancyCollection").
			// highlight-start
			WithTenant("tenantA").
			// highlight-end
			WithID(object.ID.String()). // MultiTenancyCollection object id (a Jeopardy question)
			WithReferenceProperty("hasCategory").
			WithReference(client.Data().ReferencePayloadBuilder().
				WithClassName("JeopardyCategory").
				WithID(category.ID.String()).
				Payload()).
			Do(ctx)
		// END AddCrossRef

		objs, err := client.Data().ObjectsGetter().
			WithClassName(className).
			WithID(object.ID.String()).
			WithTenant("tenantA").
			Do(ctx)
		require.NoError(t, err)
		require.Len(t, objs, 1)
		hasCategory := objs[0].Properties.(map[string]interface{})["hasCategory"]
		require.NotNil(t, hasCategory)
		href := hasCategory.([]interface{})[0].(map[string]interface{})["href"]
		assert.True(t, strings.Contains(href.(string), fmt.Sprintf("/objects/JeopardyCategory/%v", category.ID)))
	})
}
