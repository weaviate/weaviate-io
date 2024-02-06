// How-to: Configure -> Backups - Go examples
// START CreateBackup
package main

import (
	"context"
	"fmt"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/backup"
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

	result, err := client.Backup().Creator().
		WithIncludeClassNames("Article", "Publication").
		WithBackend(backup.BACKEND_FILESYSTEM).
		WithBackupID("my-very-first-backup").
		WithWaitForCompletion(true).
		WithCompressionConfig(backup.Compression{
			Level:         backup.BackupConfigCompressionLevelBestSpeed,
			ChunkSize:     512,
			CPUPercentage: 80,
		}).
		Do(context.Background())

	// END CreateBackup

	// START StatusCreateBackup
	result, err := client.Backup().CreateStatusGetter().
		WithBackend(backup.BACKEND_FILESYSTEM).
		WithBackupID("my-very-first-backup").
		Do(context.Background())
	// END StatusCreateBackup

	// START RestoreBackup
	result, err := client.Backup().Restorer().
		WithExcludeClassNames("Article").
		WithBackend(backup.BACKEND_FILESYSTEM).
		WithBackupID("my-very-first-backup").
		WithWaitForCompletion(true).
		WithCPUPercentage(80).
		Do(context.Background())
	// END RestoreBackup

	// START StatusRestoreBackup
	result, err := client.Backup().RestoreStatusGetter().
		WithBackend(backup.BACKEND_FILESYSTEM).
		WithBackupID("my-very-first-backup").
		Do(context.Background())
	// END StatusRestoreBackup

	// START CreateBackup
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", result)
}
// END CreateBackup
