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

    String className = "Article";

    createArticleWithReplicationConfig(className);
    deleteCollections(className);
    createArticleWithShardingConfig(className);
    updateArticleConfiguration(className);
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

  private void createArticleWithReplicationConfig(String className) {
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
        .className(className)
        .description("Article class with replication configuration")
        .replicationConfig(replicationConfig) // Set the replication config
        .build();

    // Add the class to the schema
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
        .withClassName(className)
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

  private void createArticleWithShardingConfig(String className) {
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

    // Create the Article class with sharding configuration
    WeaviateClass articleClass = WeaviateClass.builder()
        .className(className)
        .description("Article class with sharding configuration")
        .shardingConfig(shardingConfig) // Set the sharding config
        .build();

    // Add the class to the schema
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
        .withClassName(className)
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

  private void updateArticleConfiguration(String className) {
    // START UpdateCollection
    // First get the existing class to preserve properties and other settings
    Result<WeaviateClass> existingClassResult = client.schema().classGetter()
        .withClassName(className)
        .run();

    assertThat(existingClassResult).isNotNull()
        .returns(false, Result::hasErrors);

    WeaviateClass existingClass = existingClassResult.getResult();

    // Configure updated BM25 settings for inverted index
    BM25Config updatedBM25Config = BM25Config.builder()
        .k1(1.5f)
        .build();

    InvertedIndexConfig updatedInvertedIndexConfig = InvertedIndexConfig.builder()
        .bm25(updatedBM25Config)
        .build();

    // Configure updated vector index with ACORN filter strategy
    VectorIndexConfig updatedVectorIndexConfig = VectorIndexConfig.builder()
        .filterStrategy(VectorIndexConfig.FilterStrategy.ACORN)
        .build();

    // Configure updated replication with time-based deletion strategy
    // IMPORTANT: Preserve the existing replication factor to avoid shard count
    // changes
    ReplicationConfig existingReplicationConfig = existingClass.getReplicationConfig();
    ReplicationConfig updatedReplicationConfig = ReplicationConfig.builder()
        .factor(existingReplicationConfig != null ? existingReplicationConfig.getFactor() : 1)
        .asyncEnabled(existingReplicationConfig != null ? existingReplicationConfig.getAsyncEnabled() : false)
        .deletionStrategy(ReplicationConfig.DeletionStrategy.NO_AUTOMATED_RESOLUTION)
        .build();

    // Create the updated class configuration
    WeaviateClass updatedClass = WeaviateClass.builder()
        .className(className)
        .description(existingClass.getDescription())
        .properties(existingClass.getProperties())
        .vectorizer(existingClass.getVectorizer())
        .moduleConfig(existingClass.getModuleConfig())
        .shardingConfig(existingClass.getShardingConfig())
        .invertedIndexConfig(updatedInvertedIndexConfig)
        .vectorIndexConfig(updatedVectorIndexConfig)
        .replicationConfig(updatedReplicationConfig)
        .build();

    // Update the class
    Result<Boolean> updateResult = client.schema().classUpdater()
        .withClass(updatedClass)
        .run();
    // END UpdateCollection

    assertThat(updateResult).isNotNull()
        .withFailMessage(() -> updateResult.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .returns(true, Result::getResult);

    // Verify the updates were applied
    Result<WeaviateClass> updatedClassResult = client.schema().classGetter()
        .withClassName(className)
        .run();

    assertThat(updatedClassResult).isNotNull()
        .returns(false, Result::hasErrors);

    WeaviateClass verifyClass = updatedClassResult.getResult();

    // Verify inverted index config update
    assertThat(verifyClass.getInvertedIndexConfig()).isNotNull()
        .extracting(InvertedIndexConfig::getBm25).isNotNull()
        .returns(1.5f, BM25Config::getK1);

    // Verify vector index config update
    assertThat(verifyClass.getVectorIndexConfig()).isNotNull()
        .returns(VectorIndexConfig.FilterStrategy.ACORN, VectorIndexConfig::getFilterStrategy);

    // Verify replication config update (only deletion strategy should change)
    assertThat(verifyClass.getReplicationConfig()).isNotNull()
        .returns(ReplicationConfig.DeletionStrategy.NO_AUTOMATED_RESOLUTION,
            ReplicationConfig::getDeletionStrategy);
  }
}
