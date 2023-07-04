// How-to: Configure -> Backups - Java examples
// START CreateBackup
package io.weaviate;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.backup.model.Backend;
import io.weaviate.client.v1.backup.model.BackupCreateResponse;

public class App {
  public static void main(String[] args) {
    Config config = new Config("http", "localhost:8080");
    WeaviateClient client = new WeaviateClient(config);

    Result<BackupCreateResponse> result = client.backup().creator()
      .withIncludeClassNames("Article", "Publication")
      .withBackend(Backend.FILESYSTEM)
      .withBackupId("my-very-first-backup")
      .withWaitForCompletion(true)
      .run();

    // END CreateBackup

    // START StatusCreateBackup
    Result<BackupCreateStatusResponse> result = client.backup().createStatusGetter()
      .withBackend(Backend.FILESYSTEM)
      .withBackupId("my-very-first-backup")
      .run();
    // END StatusCreateBackup

    // START RestoreBackup
    Result<BackupRestoreResponse> result = client.backup().restorer()
      .withExcludeClassNames("Article")
      .withBackend(Backend.FILESYSTEM)
      .withBackupId("my-very-first-backup")
      .withWaitForCompletion(true)
      .run();
    // END RestoreBackup

    // START StatusRestoreBackup
    Result<BackupRestoreStatusResponse> result = client.backup().restoreStatusGetter()
      .withBackend(Backend.FILESYSTEM)
      .withBackupId("my-very-first-backup")
      .run();
    // END StatusRestoreBackup

    // START CreateBackup
    if (result.hasErrors()) {
      System.out.println(result.getError());
      return;
    }
    System.out.println(result.getResult());
  }
}
// END CreateBackup
