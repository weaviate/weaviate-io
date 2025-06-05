// How-to: Manage-Data -> Classes
package io.weaviate.docs;

import com.google.gson.GsonBuilder;
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.misc.model.ReplicationConfig;
import io.weaviate.client.v1.misc.model.ShardingConfig;
import io.weaviate.client.v1.schema.model.Schema;
import io.weaviate.client.v1.schema.model.WeaviateClass;
import io.weaviate.client.v1.misc.model.BM25Config;
import io.weaviate.client.v1.misc.model.InvertedIndexConfig;
import io.weaviate.client.v1.misc.model.VectorIndexConfig;
import io.weaviate.docs.helper.EnvHelper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@Tag("crud")
@Tag("classes")
class ManageDataReplicationTest {

  private static WeaviateClient client;

  @BeforeAll
  public static void beforeAll() {
    String scheme = EnvHelper.scheme("http");
    String host = EnvHelper.host("localhost");
    String port = EnvHelper.port("8181");

    Config config = new Config(scheme, host + ":" + port);
    client = new WeaviateClient(config);

    Result<Boolean> result = client.schema().allDeleter().run();
    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .returns(true, Result::getResult);
  }

  @Test
  public void shouldManageDataClasses() {

    String collectionName = "Article";

    createArticleWithReplicationConfig(collectionName);
    deleteCollections(collectionName);
    createArticleWithShardingConfig(collectionName);
    updateArticleConfiguration(collectionName);
    readAllCollections();
  }

  private void deleteCollections(String className) {
    client.schema().classDeleter()
        .withClassName(className)
        .run();
  }

  private <T> void print(Result<T> result) {
    String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
    System.out.println(json);
  }

  private void readAllCollections() {
    Result<Schema> result = client.schema().getter()
        .run();

    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .extracting(Result::getResult).isNotNull()
        .extracting(Schema::getClasses).asList()
        .hasSize(1);

    print(result);
  }

  private void createArticleWithReplicationConfig(String collectionName) {
    // START AllReplicationSettings
    // Configure replication settings
    Integer replicationFactor = 3;
    Boolean asyncEnabled = true;

    // Create replication configuration
    ReplicationConfig replicationConfig = ReplicationConfig.builder()
        .factor(replicationFactor) // factor=3
        .asyncEnabled(asyncEnabled) // async_enabled=True
        .deletionStrategy(ReplicationConfig.DeletionStrategy.DELETE_ON_CONFLICT)
        .build();

    // Create the Article collection with replication configuration
    WeaviateClass articleClass = WeaviateClass.builder()
        .className(collectionName)
        .description("Article collection with replication configuration")
        .replicationConfig(replicationConfig) // Set the replication config
        .build();

    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleClass)
        .run();
    // END AllReplicationSettings

    // Assert the result
    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .returns(true, Result::getResult);

    // Verify the replication configuration was set correctly
    Result<WeaviateClass> classResult = client.schema().classGetter()
        .withClassName(collectionName)
        .run();

    assertThat(classResult).isNotNull()
        .returns(false, Result::hasErrors);

    WeaviateClass createdClass = classResult.getResult();
    assertThat(createdClass).isNotNull()
        .extracting(WeaviateClass::getReplicationConfig).isNotNull()
        .returns(replicationFactor, ReplicationConfig::getFactor)
        .returns(asyncEnabled, ReplicationConfig::getAsyncEnabled)
        .returns(ReplicationConfig.DeletionStrategy.DELETE_ON_CONFLICT,
            ReplicationConfig::getDeletionStrategy);
  }

  private void createArticleWithShardingConfig(String collectionName) {
    // START ShardingSettings
    // Configure sharding settings
    Integer virtualPerPhysical = 128;
    Integer desiredCount = 1;
    Integer desiredVirtualCount = 128;

    // Create sharding configuration
    ShardingConfig shardingConfig = ShardingConfig.builder()
        .virtualPerPhysical(virtualPerPhysical) // virtual_per_physical=128
        .desiredCount(desiredCount) // desired_count=1
        .desiredVirtualCount(desiredVirtualCount) // desired_virtual_count=128
        .build();

    // Create the Article collection with sharding configuration
    WeaviateClass articleClass = WeaviateClass.builder()
        .className(collectionName)
        .description("Article collection with sharding configuration")
        .shardingConfig(shardingConfig) // Set the sharding config
        .build();

    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleClass)
        .run();
    // END ShardingSettings

    // Assert the result
    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .returns(true, Result::getResult);

    // Verify the sharding configuration was set correctly
    Result<WeaviateClass> classResult = client.schema().classGetter()
        .withClassName(collectionName)
        .run();

    assertThat(classResult).isNotNull()
        .returns(false, Result::hasErrors);

    WeaviateClass createdClass = classResult.getResult();
    assertThat(createdClass).isNotNull()
        .extracting(WeaviateClass::getShardingConfig).isNotNull()
        .returns(virtualPerPhysical, ShardingConfig::getVirtualPerPhysical)
        .returns(desiredCount, ShardingConfig::getDesiredCount)
        .returns(desiredVirtualCount, ShardingConfig::getDesiredVirtualCount);
  }

  private void updateArticleConfiguration(String collectionName) {
    // START UpdateCollection
    // Get existing collection
    Result<WeaviateClass> existingResult = client.schema().classGetter()
        .withClassName(collectionName)
        .run();
    
    assertThat(existingResult).isNotNull()
        .returns(false, Result::hasErrors);
    
    WeaviateClass existingClass = existingResult.getResult();

    // Create updated configurations
    InvertedIndexConfig invertedConfig = InvertedIndexConfig.builder()
        .bm25(BM25Config.builder().k1(1.5f).build())
        .build();

    VectorIndexConfig vectorConfig = VectorIndexConfig.builder()
        .filterStrategy(VectorIndexConfig.FilterStrategy.ACORN)
        .build();

    ReplicationConfig replicationConfig = ReplicationConfig.builder()
        .deletionStrategy(ReplicationConfig.DeletionStrategy.NO_AUTOMATED_RESOLUTION)
        .build();

    // Update collection with new configurations - preserve critical existing configs
    WeaviateClass updatedClass = WeaviateClass.builder()
        .className(collectionName)
        .shardingConfig(existingClass.getShardingConfig())     // Preserve sharding (immutable)
        .invertedIndexConfig(invertedConfig)                   // Update
        .vectorIndexConfig(vectorConfig)                       // Update
        .replicationConfig(replicationConfig)                  // Update
        .build();

    Result<Boolean> updateResult = client.schema().classUpdater()
        .withClass(updatedClass)
        .run();
    // END UpdateCollection

    // Debug: Print error if update fails
    if (updateResult.hasErrors()) {
        System.out.println("Update failed with error: " + updateResult.getError());
    }

    assertThat(updateResult).isNotNull()
        .withFailMessage(() -> "Update failed: " + updateResult.getError())
        .returns(false, Result::hasErrors)
        .returns(true, Result::getResult);

    // Verify updates
    Result<WeaviateClass> verifyResult = client.schema().classGetter()
        .withClassName(collectionName)
        .run();
    
    assertThat(verifyResult).isNotNull()
        .returns(false, Result::hasErrors);
    
    WeaviateClass verifyClass = verifyResult.getResult();

    assertThat(verifyClass.getInvertedIndexConfig().getBm25().getK1()).isEqualTo(1.5f);
    assertThat(verifyClass.getVectorIndexConfig().getFilterStrategy()).isEqualTo(VectorIndexConfig.FilterStrategy.ACORN);
    assertThat(verifyClass.getReplicationConfig().getDeletionStrategy()).isEqualTo(ReplicationConfig.DeletionStrategy.NO_AUTOMATED_RESOLUTION);
  }
}
 