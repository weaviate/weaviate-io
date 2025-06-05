package main

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

// ==============================
// ===== BASIC GET EXAMPLES =====
// ==============================

func TestBasicGet(t *testing.T) {
	client := setupClient()

	t.Run("Basic Get", func(t *testing.T) {
		ctx := context.Background()

		// START BasicGet
		response, err := client.GraphQL().Get().
			WithClassName("JeopardyQuestion").
			WithFields(graphql.Field{Name: "question"}).
			Do(ctx)
		// END BasicGet

		require.NoError(t, err)
		t.Logf("%+v", response)

		assert.Contains(t, response.Data, "Get")
		assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
		assert.Len(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{}), 1)
		assert.Contains(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{}), "question")
	})
}

// ====================================
// ===== BASIC GET LIMIT EXAMPLES =====
// ====================================

func TestGetWithLimit(t *testing.T) {
	client := setupClient()

	t.Run("Get With Limit", func(t *testing.T) {
		ctx := context.Background()

		// START GetWithLimit
		response, err := client.GraphQL().Get().
			WithClassName("JeopardyQuestion").
			WithFields(graphql.Field{Name: "question"}).
			// highlight-start
			WithLimit(1).
			// highlight-end
			Do(ctx)
		// END GetWithLimit

		require.NoError(t, err)
		t.Logf("%+v", response)

		assert.Contains(t, response.Data, "Get")
		assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
		assert.Len(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{}), 1)
		assert.Len(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{}), 1)
		assert.Contains(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{}), "question")
	})
}

// ==========================================
// ===== GET LIMIT WITH OFFSET EXAMPLES =====
// ==========================================

func TestGetWithLimitOffset(t *testing.T) {
	client := setupClient()

	t.Run("Get With Limit Offset", func(t *testing.T) {
		ctx := context.Background()

		// START GetWithOffset
		response, err := client.GraphQL().Get().
			WithClassName("JeopardyQuestion").
			WithFields(graphql.Field{Name: "question"}).
			// highlight-start
			WithLimit(1).
			WithOffset(1).
			// highlight-end
			Do(ctx)
		// END GetWithOffset

		require.NoError(t, err)
		t.Logf("%+v", response)

		assert.Contains(t, response.Data, "Get")
		assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
		assert.Len(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{}), 1)
		assert.Len(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{}), 1)
		assert.Contains(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{}), "question")
	})
}

// ==========================================
// ===== GET OBJECT PROPERTIES EXAMPLES =====
// ==========================================

func TestGetProperties(t *testing.T) {
	client := setupClient()

	t.Run("Get Properties", func(t *testing.T) {
		ctx := context.Background()

		// START GetProperties
		response, err := client.GraphQL().Get().
			WithClassName("JeopardyQuestion").
			// highlight-start
			WithFields(
				graphql.Field{Name: "question"},
				graphql.Field{Name: "answer"},
				graphql.Field{Name: "points"},
			).
			// highlight-end
			WithLimit(1).
			Do(ctx)
		// END GetProperties

		require.NoError(t, err)
		t.Logf("%+v", response)

		assert.Contains(t, response.Data, "Get")
		assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
		assert.Len(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{}), 1)
		object := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})
		assert.Len(t, object, 3)
		assert.Contains(t, object, "question")
		assert.Contains(t, object, "answer")
		assert.Contains(t, object, "points")
	})
}

// ======================================
// ===== GET OBJECT VECTOR EXAMPLES =====
// ======================================

func TestGetObjectVector(t *testing.T) {
	client := setupClient()

	t.Run("Get Object Vector", func(t *testing.T) {
		ctx := context.Background()

		// START GetObjectVector
		response, err := client.GraphQL().Get().
			WithClassName("JeopardyQuestion").
			// highlight-start
			WithFields(
				graphql.Field{
					Name: "_additional",
					Fields: []graphql.Field{
						{Name: "vector"},
					},
				},
			).
			// highlight-end
			WithLimit(1).
			Do(ctx)
		// END GetObjectVector

		require.NoError(t, err)
		t.Logf("%+v", response)

		assert.Contains(t, response.Data, "Get")
		assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
		assert.Len(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{}), 1)
		object := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})
		assert.Contains(t, object, "_additional")
		additional := object["_additional"].(map[string]interface{})
		assert.Contains(t, additional, "vector")
	})
}

// ==================================
// ===== GET OBJECT ID EXAMPLES =====
// ==================================

func TestGetObjectId(t *testing.T) {
	client := setupClient()

	t.Run("Get Object Id", func(t *testing.T) {
		ctx := context.Background()

		// START GetObjectId
		response, err := client.GraphQL().Get().
			WithClassName("JeopardyQuestion").
			// highlight-start
			WithFields(
				graphql.Field{
					Name: "_additional",
					Fields: []graphql.Field{
						{Name: "id"},
					},
				},
			).
			// highlight-end
			WithLimit(1).
			Do(ctx)
		// END GetObjectId

		require.NoError(t, err)
		t.Logf("%+v", response)

		assert.Contains(t, response.Data, "Get")
		assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
		assert.Len(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{}), 1)
		object := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})
		assert.Contains(t, object, "_additional")
		additional := object["_additional"].(map[string]interface{})
		assert.Contains(t, additional, "id")
	})
}

// ==============================
// ===== GET WITH CROSS-REF EXAMPLES =====
// ==============================

func TestGetWithCrossRefs(t *testing.T) {
	t.Skip("Skipping test, FIXME")
	client := setupClient()

	t.Run("Get With Cross Refs", func(t *testing.T) {
		ctx := context.Background()

		// START GetWithCrossRefs
		response, err := client.GraphQL().Get().
			WithClassName("JeopardyQuestion").
			// highlight-start
			WithFields(
				graphql.Field{Name: "question"},
				graphql.Field{
					Name: "hasCategory",
					Fields: []graphql.Field{
						{Name: "... on JeopardyCategory", Fields: []graphql.Field{{Name: "title"}}},
					},
				},
			).
			// highlight-end
			WithLimit(2).
			Do(ctx)
		// END GetWithCrossRefs

		require.NoError(t, err)
		jsonResponse, _ := json.MarshalIndent(response, "", "  ")
		t.Logf("%s", jsonResponse)

		assert.Contains(t, response.Data, "Get")
		assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
		assert.Len(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{}), 2)
		object := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})
		assert.Contains(t, object, "question")
		assert.Contains(t, object, "hasCategory")
	})
}

// ====================================
// ===== GET WITH METADATA EXAMPLE =====
// ====================================

func TestGetWithMetadata(t *testing.T) {
	client := setupClient()

	t.Run("Get With Metadata", func(t *testing.T) {
		ctx := context.Background()

		// START GetWithMetadata
		response, err := client.GraphQL().Get().
			WithClassName("JeopardyQuestion").
			WithLimit(1).
			// highlight-start
			WithFields(
				graphql.Field{Name: "question"},
				graphql.Field{
					Name: "_additional",
					Fields: []graphql.Field{
						{Name: "creationTimeUnix"},
					},
				},
			).
			// highlight-end
			Do(ctx)
		// END GetWithMetadata

		require.NoError(t, err)
		jsonResponse, _ := json.MarshalIndent(response, "", "  ")
		t.Logf("%s", jsonResponse)

		assert.Contains(t, response.Data, "Get")
		assert.Contains(t, response.Data["Get"], "JeopardyQuestion")
		assert.Len(t, response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{}), 1)
		object := response.Data["Get"].(map[string]interface{})["JeopardyQuestion"].([]interface{})[0].(map[string]interface{})
		assert.Contains(t, object, "question")
		assert.Contains(t, object, "_additional")
		additional := object["_additional"].(map[string]interface{})
		assert.Contains(t, additional, "creationTimeUnix")
	})
}

// =========================
// ===== MULTI-TENANCY =====
// =========================

func TestMultiTenancy(t *testing.T) {
	client := setupClient()

	t.Run("Multi-Tenancy", func(t *testing.T) {
		ctx := context.Background()

		// START MultiTenancy
		response, err := client.GraphQL().Get().
			WithClassName("MultiTenancyClass").
			WithFields(graphql.Field{Name: "property1"}, graphql.Field{Name: "property2"}).
			WithLimit(1).
			// highlight-start
			WithTenant("tenantA").
			// highlight-end
			Do(ctx)
		// END MultiTenancy

		require.NoError(t, err)
		t.Logf("%+v", response)

		// Add assertions here if needed
	})
}
