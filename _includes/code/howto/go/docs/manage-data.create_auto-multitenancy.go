package main

import (
	"context"
	"log"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate/entities/models"
)

func main() {
	client, err := weaviate.NewClient(weaviate.Config{
		Host:   "localhost:8080",
		Scheme: "http",
	})
	if err != nil {
		log.Fatalf("create client: %v", err)
	}

	ctx := context.Background()

	createClassWithAutoTenantEnabled(ctx, client)
	createClassWithoutAutoTenantAndToggleOn(ctx, client)
}

// START enable autoMT
func createClassWithAutoTenantEnabled(ctx context.Context, client *weaviate.Client) {
	class := &models.Class{
		Class: "AutoTenantEnabledOnCreate",
		Properties: []*models.Property{
			{Name: "textProp", DataType: []string{"text"}},
		},
		MultiTenancyConfig: &models.MultiTenancyConfig{
			Enabled:            true,
			AutoTenantCreation: true,
		},
	}
	err := client.Schema().ClassCreator().WithClass(class).Do(ctx)
	if err != nil {
		log.Fatalf("create class: %v", err)
	}
}

// END enable autoMT

func createClassWithoutAutoTenantAndToggleOn(ctx context.Context, client *weaviate.Client) {
	class := &models.Class{
		Class: "AutoTenantEnabledOnUpdate",
		Properties: []*models.Property{
			{Name: "textProp", DataType: []string{"text"}},
		},
		MultiTenancyConfig: &models.MultiTenancyConfig{
			Enabled: true,
		},
	}
	err := client.Schema().ClassCreator().WithClass(class).Do(ctx)
	if err != nil {
		log.Fatalf("create class: %v", err)
	}

	// Start update autoMT
	existing, err := client.Schema().ClassGetter().
		WithClassName(class.Class).Do(ctx)
	if err != nil {
		log.Fatalf("get existing class %q: %v", class.Class, err)
	}

	existing.MultiTenancyConfig.AutoTenantCreation = true

	err = client.Schema().ClassUpdater().WithClass(existing).Do(ctx)
	if err != nil {
		log.Fatalf("enable autotenant: %v", err)
	}
	// END update autoMT
}
