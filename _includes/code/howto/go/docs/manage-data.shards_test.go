// How-to: Manage-data -> (Batch) Import items
package docs

import (
	"context"
	"fmt"
	"github.com/weaviate/weaviate/entities/models"
	"testing"
	"weaviate.io/docs/docs/helper"

	"github.com/stretchr/testify/require"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
)

func Test_ManageDataUpdateShard(t *testing.T) {
	ctx := context.Background()
	scheme := helper.EnvScheme("http")
	host := helper.EnvHost("localhost")
	port := helper.EnvPort("8080")

	config := weaviate.Config{Scheme: scheme, Host: host + ":" + port}
	client, err := weaviate.NewClient(config)
	require.NoError(t, err)

	t.Run("Update shard status", func(t *testing.T) {
		tempCollectionName := "TestCollection"

		class := &models.Class{Class: tempCollectionName}

		_ = client.Schema().ClassDeleter().
			WithClassName(tempCollectionName).Do(context.Background())

		_ = client.Schema().ClassCreator().
			WithClass(class).Do(context.Background())

		shard, err := client.Schema().ShardsGetter().WithClassName(tempCollectionName).Do(ctx)
		if err != nil {
			panic(err)
		}
		shardName := shard[0].Name
		OldShardStatus, err := client.Schema().ShardUpdater().WithClassName(tempCollectionName).
			WithShardName(shardName).WithStatus("READONLY").Do(ctx)
		if err != nil {
			// handle error
			panic(err)
		}
		require.Equal(t, OldShardStatus.Status, "READONLY")

		// UpdateShardStatus START
		shardStatus, err := client.Schema().ShardUpdater().
			WithClassName(tempCollectionName).
			WithShardName(shardName).
			WithStatus("READY").
			Do(ctx)
		if err != nil {
			// handle error
			panic(err)
		}
		fmt.Printf("%v", shardStatus)
		// UpdateShardStatus END

		require.Equal(t, shardStatus.Status, "READY")

		_ = client.Schema().ClassDeleter().
			WithClassName(tempCollectionName).Do(context.Background())
	})
}