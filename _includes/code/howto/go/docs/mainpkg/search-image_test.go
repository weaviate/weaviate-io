package main

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)



// Helper functions to convert to base64
func urlToBase64(url string) (string, error) {

	// START helper base64 functions
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	content, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	base64string := base64.StdEncoding.EncodeToString(content)
	// END helper base64 functions
	return base64string, nil

}

func fileToBase64(path string) (string, error) {
	content, err := ioutil.ReadFile(path)
	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(content), nil
}

func TestSearchByBase64(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// Fetch URL into base64 string
	imageURL := "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/640px-Welchcorgipembroke.JPG"
	base64String, err := urlToBase64(imageURL)
	require.NoError(t, err)

	// START search with base64 Go
	response, err := client.GraphQL().Get().
		WithClassName("Dog").
		WithFields(graphql.Field{Name: "breed"}).
		WithNearImage((&graphql.NearImageArgumentBuilder{}).WithImage(base64String)).
		WithLimit(1).
		Do(ctx)
	// END search with base64 Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	dogs := response.Data["Get"].(map[string]interface{})["Dog"].([]interface{})
	assert.Len(t, dogs, 1)
	assert.Equal(t, "Corgi", dogs[0].(map[string]interface{})["breed"])
}

func TestSearchByImageFilename(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// Save image to file
	imageURL := "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/640px-Welchcorgipembroke.JPG"
	resp, err := http.Get(imageURL)
	require.NoError(t, err)
	defer resp.Body.Close()

	content, err := ioutil.ReadAll(resp.Body)
	require.NoError(t, err)

	err = ioutil.WriteFile("image.jpg", content, 0644)
	require.NoError(t, err)
	defer os.Remove("image.jpg")

	// START ImageFileSearch Go
	response, err := client.GraphQL().Get().
		WithClassName("Dog").
		WithFields(graphql.Field{Name: "breed"}).
		WithNearImage((&graphql.NearImageArgumentBuilder{}).WithImage("image.jpg")).
		WithLimit(1).
		Do(ctx)
	// END ImageFileSearch Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	dogs := response.Data["Get"].(map[string]interface{})["Dog"].([]interface{})
	assert.Len(t, dogs, 1)
	assert.Equal(t, "Corgi", dogs[0].(map[string]interface{})["breed"])
}

func TestMaximumDistance(t *testing.T) {
	client := setupClient()
	ctx := context.Background()

	// Fetch URL into base64 string
	imageURL := "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/640px-Welchcorgipembroke.JPG"
	base64String, err := urlToBase64(imageURL)
	require.NoError(t, err)

	// START Distance Go
	response, err := client.GraphQL().Get().
		WithClassName("Dog").
		WithFields(
			graphql.Field{Name: "breed"},
			graphql.Field{Name: "_additional", Fields: []graphql.Field{{Name: "distance"}}},
		).
		WithNearImage((&graphql.NearImageArgumentBuilder{}).WithImage(base64String).WithDistance(0.2)).
		Do(ctx)
	// END Distance Go

	require.NoError(t, err)
	
	jsonResponse, _ := json.MarshalIndent(response, "", "  ")
	fmt.Printf("%s\n", jsonResponse)

	dogs := response.Data["Get"].(map[string]interface{})["Dog"].([]interface{})
	assert.Len(t, dogs, 1)
	dog := dogs[0].(map[string]interface{})
	assert.Equal(t, "Corgi", dog["breed"])
	assert.Contains(t, dog["_additional"].(map[string]interface{}), "distance")
}