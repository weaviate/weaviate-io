// How-to: Manage-Data -> Classes
package io.weaviate.docs;

import com.google.gson.GsonBuilder;
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.misc.model.DistanceType;
import io.weaviate.client.v1.misc.model.VectorIndexConfig;
import io.weaviate.client.v1.misc.model.MultiVectorConfig;
//import io.weaviate.client.v1.misc.model.MuveraConfig;
import io.weaviate.client.v1.misc.model.BM25Config;
import io.weaviate.client.v1.misc.model.InvertedIndexConfig;
import io.weaviate.client.v1.misc.model.ReplicationConfig;
import io.weaviate.client.v1.misc.model.MultiTenancyConfig;
import io.weaviate.client.v1.schema.model.Schema;
import io.weaviate.client.v1.schema.model.Shard;
import io.weaviate.client.v1.schema.model.ShardStatus;
import io.weaviate.client.v1.schema.model.ShardStatuses;
import io.weaviate.client.v1.schema.model.WeaviateClass;
import io.weaviate.client.v1.schema.model.Property;
import io.weaviate.client.v1.schema.model.DataType;
import io.weaviate.client.v1.misc.model.BQConfig;
import io.weaviate.client.v1.schema.model.Tokenization;
import io.weaviate.docs.helper.EnvHelper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@Tag("crud")
@Tag("classes")
class ManageDataClassesTest {

  private static WeaviateClient client;

  @BeforeAll
  public static void beforeAll() {
    String scheme = EnvHelper.scheme("http");
    String host = EnvHelper.host("localhost");
    String port = EnvHelper.port("8080");

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
    // START BasicCreateCollection // START ReadOneCollection // START UpdateCollection
    String collectionName = "Article";

    // END BasicCreateCollection // END ReadOneCollection // END UpdateCollection

    createCollection(collectionName);
    readOneCollection(collectionName);
    readAllCollections();
    updateCollection(collectionName);
    createCollectionWithProperties(collectionName);
    createCollectionWithVectorizer(collectionName);
    createCollectionWithNamedVectors(collectionName);
    createCollectionWithModuleSettings(collectionName);
    createCollectionWithVectorIndexType(collectionName);
    createCollectionWithVectorIndexParams(collectionName);
    createPropertiesWithSettings(collectionName);
    specifyDistanceMetric(collectionName);
    deleteCollection(collectionName);
    addProperty(collectionName);
    inspectShard(collectionName);
    updateShardStatus(collectionName);
    createMultiVectorCollection(collectionName);
    // createMultiVectorMuvera(collectionName);
    deleteCollection(collectionName);
    createArticleCollectionWithIndexConfig(collectionName);
    deleteCollection(collectionName);
    createArticleWithOpenAIConfig(collectionName);
    deleteCollection(collectionName);
    createArticleWithMultiTenancyConfig(collectionName);
    readAllCollections();
  }

  private void createCollection(String collectionName) {
    // START BasicCreateCollection
    WeaviateClass emptyClass = WeaviateClass.builder()
        .className(collectionName)
        .build();

    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(emptyClass)
        .run();

    // END BasicCreateCollection

    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .returns(true, Result::getResult);
  }

  private void createCollectionWithProperties(String collectionName) {
    // START CreateCollectionWithProperties
    // Define collection properties
    Property titleProperty = Property.builder()
        .name("title")
        .description("Title Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    Property bodyProperty = Property.builder()
        .name("body")
        .description("Body Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();

    // Add the defined properties to the collection
    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .description("Article collection Description...")
        .properties(Arrays.asList(titleProperty, bodyProperty))
        .build();

    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END CreateCollectionWithProperties
  }

  private void createCollectionWithVectorizer(String collectionName) {
    // Define collection properties
    Property titleProperty = Property.builder()
        .name("title")
        .description("Title Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    Property bodyProperty = Property.builder()
        .name("body")
        .description("Body Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    // START CreateCollectionWithVectorizer
    // Additional configuration not shown
    // Define the vectorizer in the WeaviateClass Builder
    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .properties(Arrays.asList(titleProperty, bodyProperty))
        .vectorizer("text2vec-openai") // Vectorize of your choic e.g. text2vec-openai or text2vec-cohere
        .build();
    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END CreateCollectionWithVectorizer
  }

  private void createCollectionWithNamedVectors(String collectionName) {
    // Define collection properties
    Property titleProperty = Property.builder()
        .name("title")
        .description("Title Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    Property bodyProperty = Property.builder()
        .name("body")
        .description("Body Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    // START CreateCollectionWithNamedVectors
    // Additional configuration not shown
    // Define the vectorizers configurations
    Map<String, Object> text2vecOpenAI = new HashMap<>();
    Map<String, Object> text2vecOpenAISettings = new HashMap<>();
    text2vecOpenAISettings.put("properties", new String[] { "name" });
    text2vecOpenAI.put("text2vec-openai", text2vecOpenAISettings);

    Map<String, Object> text2vecCohere = new HashMap<>();
    Map<String, Object> text2vecCohereSettings = new HashMap<>();
    text2vecCohereSettings.put("properties", new String[] { "body" });
    text2vecCohere.put("text2vec-cohere", text2vecCohereSettings);

    // Define the vector configurations
    Map<String, WeaviateClass.VectorConfig> vectorConfig = new HashMap<>();
    vectorConfig.put("name_vector", WeaviateClass.VectorConfig.builder()
        .vectorIndexType("hnsw")
        .vectorizer(text2vecOpenAI)
        .build());
    vectorConfig.put("body_vector", WeaviateClass.VectorConfig.builder()
        .vectorIndexType("hnsw")
        .vectorizer(text2vecCohere)
        .build());

    // Define the vectorizers in the WeaviateClass Builder
    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .properties(Arrays.asList(titleProperty, bodyProperty))
        .vectorConfig(vectorConfig)
        .build();
    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END CreateCollectionWithNamedVectors
  }

  private void createCollectionWithModuleSettings(String collectionName) {
    // Define collection properties
    Property titleProperty = Property.builder()
        .name("title")
        .description("Title Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    Property bodyProperty = Property.builder()
        .name("body")
        .description("Body Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    // START ModuleSettings
    // Additional configuration not shown
    // Define the module settings
    Map<String, Object> text2vecOpenAI = new HashMap<>();
    Map<String, Object> text2vecOpenAISettings = new HashMap<>();
    text2vecOpenAISettings.put("vectorizePropertyName", false);
    text2vecOpenAISettings.put("model", "text-embedding-3-small"); // set the model of your choice e.g. //
                                                                   // text-embedding-3-small
    text2vecOpenAI.put("text2vec-openai", text2vecOpenAISettings);
    Map<Object, Object> moduleConfig = new HashMap<>();
    moduleConfig.put("text2vec-openai", text2vecOpenAI);

    // Set the module configu in the WeaviateClass Builder
    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .properties(Arrays.asList(titleProperty, bodyProperty))
        .moduleConfig(moduleConfig) // Set the module config
        .build();

    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END ModuleSettings
  }

  private void createCollectionWithVectorIndexType(String collectionName) {
    // Define collection properties
    Property titleProperty = Property.builder()
        .name("title")
        .description("Title Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    Property bodyProperty = Property.builder()
        .name("body")
        .description("Body Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    // START SetVectorIndexType
    // Additional configuration not shown
    // Define the index type in the WeaviateClass Builder
    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .properties(Arrays.asList(titleProperty, bodyProperty))
        .vectorizer("text2vec-openai")
        .vectorIndexType("hnsw") // set the vector index of your choice e.g. hnsw, flat...
        .build();
    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END SetVectorIndexType
  }

  private void createCollectionWithVectorIndexParams(String collectionName) {
    // Define collection properties
    Property titleProperty = Property.builder()
        .name("title")
        .description("Title Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    Property bodyProperty = Property.builder()
        .name("body")
        .description("Body Property Description...")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    // START SetVectorIndexParams
    // Additional configuration not shown
    // Define the VectorIndexConfig with compression
    VectorIndexConfig createBqIndexConfig = VectorIndexConfig.builder()
        .bq(BQConfig.builder()
            .enabled(true)
            .rescoreLimit(123L)
            .cache(true)
            .build())
        .vectorCacheMaxObjects(100000L)
        .build();

    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .properties(Arrays.asList(titleProperty, bodyProperty))
        .vectorIndexType("flat") // set the vector index of your choice e.g. hnsw, flat...
        .vectorIndexConfig(createBqIndexConfig)
        .vectorizer("text2vec-openai")
        .build();

    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END SetVectorIndexParams
  }

  private void createPropertiesWithSettings(String collectionName) {
    // START PropModuleSettings
    Property titleProperty = Property.builder()
        .name("title")
        .description("title of the article")
        .dataType(Arrays.asList(DataType.TEXT))
        .tokenization(Tokenization.WORD)
        .build();

    Property bodyProperty = Property.builder()
        .name("body")
        .description("body of the article")
        .dataType(Arrays.asList(DataType.TEXT))
        .tokenization(Tokenization.LOWERCASE)
        .build();

    // Add the defined properties to the collection
    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .description("Article collection Description...")
        .properties(Arrays.asList(titleProperty, bodyProperty))
        .build();

    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END PropModuleSettings
  }

  private void specifyDistanceMetric(String collectionName) {
    Property titleProperty = Property.builder()
        .name("title")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    Property bodyProperty = Property.builder()
        .name("body")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();
    // START DistanceMetric
    // Additional configuration not shown
    VectorIndexConfig vectorIndexConfig = VectorIndexConfig.builder()
        .distance(DistanceType.DOT) // Define Distance Type e.g. Dot, Cosine, hamming...
        .build();

    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .properties(Arrays.asList(titleProperty, bodyProperty))
        .vectorIndexConfig(vectorIndexConfig)
        .build();

    Result<Boolean> classResult = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END DistanceMetric
  }

  private void readOneCollection(String collectionName) {
    // START ReadOneCollection
    Result<WeaviateClass> result = client.schema().classGetter()
        .withClassName(collectionName)
        .run();

    // END ReadOneCollection

    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .extracting(Result::getResult).isNotNull()
        .extracting(WeaviateClass::getClassName).isEqualTo(collectionName);

    print(result);
  }

  private void readAllCollections() {
    // START ReadAllCollections
    Result<Schema> result = client.schema().getter()
        .run();

    // END ReadAllCollections

    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .extracting(Result::getResult).isNotNull()
        .extracting(Schema::getClasses).asList()
        .hasSize(1);

    print(result);
  }

  private void updateCollection(String collectionName) {
    Result<Boolean> delResult = client.schema().classDeleter()
        .withClassName(collectionName)
        .run();

    assertThat(delResult).isNotNull()
        .withFailMessage(() -> delResult.getError().toString())
        .returns(false, Result::hasErrors)
        .returns(true, Result::getResult);

    // START UpdateCollectionTODO
    // Define collection
    WeaviateClass originalClass = WeaviateClass.builder()
        .className(collectionName)
        .vectorIndexConfig(VectorIndexConfig.builder()
            .distance(DistanceType.COSINE) // Note the distance metric
            .build())
        .build();

    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(originalClass)
        .run();

    // END UpdateCollectionTODO

    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .returns(true, Result::getResult);

    // START UpdateCollectionTODO
    // Define updated collection
    WeaviateClass updatedClass = WeaviateClass.builder()
        .className(collectionName)
        .vectorIndexConfig(VectorIndexConfig.builder()
            .distance(DistanceType.DOT) // Note the distance metric
            .build())
        .build();

    // Update the collection definition
    // TODO Not yet available in JAVA

    // END UpdateCollectionTODO
  }

  private <T> void print(Result<T> result) {
    // START ReadOneCollection // START ReadAllCollections
    String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
    System.out.println(json);
    // END ReadOneCollection // END ReadAllCollections
  }

  private void deleteCollection(String collectionName) {
    // DeleteCollection START
    Result<Boolean> result = client.schema().classDeleter()
        .withClassName(collectionName)
        .run();
    // DeleteCollection END
    if (result.hasErrors()) {
      System.out.println(result.getError());
      return;
    }

    System.out.println(result.getResult());

  }

  private void addProperty(String collectionName) {
    String propertyName = "Ref";
    // AddProperty START
    Property property = Property.builder()
        .dataType(Arrays.asList(DataType.BOOLEAN))
        .name(propertyName)
        .build();

    Result<Boolean> result = client.schema().propertyCreator()
        .withClassName(collectionName)
        .withProperty(property)
        .run();
    // AddProperty END
    if (result.hasErrors()) {
      System.out.println(result.getError());
      return;
    }

    System.out.println(result.getResult());
  }

  private void inspectShard(String collectionName) {
    // InspectShard START
    Result<Shard[]> result = client.schema().shardsGetter()
        .withClassName(collectionName)
        .run();

    Shard[] shards = result.getResult();
    if (shards == null || shards.length == 0) {
      System.out.println("No shards found in this collection.");
      return;
    }

    // Iterate over each shard and print its status
    for (Shard shard : shards) {
      System.out.println("Shard name: " + shard.getName());
      System.out.println("Shard status: " + shard.getStatus()); // Get shard status (whether it's READY or READONLY)
    }
    // InspectShard END
  }

  private void updateShardStatus(String collectionName) {
    Result<Shard[]> result = client.schema()
        .shardsGetter()
        .withClassName(collectionName)
        .run();

    if (result.hasErrors()) {
      System.out.println("Error getting shards: " + result.getError());
      return;
    }

    Shard[] shards = result.getResult();
    if (shards == null || shards.length == 0) {
      System.out.println("No shards found in this collection. Cannot update shard status.");
      return;
    }

    String shardName = shards[0].getName();

    // UpdateShardStatus START
    Result<ShardStatus> updateToReadyStatus = client.schema().shardUpdater()
        .withClassName(collectionName)
        .withShardName(shardName)
        .withStatus(ShardStatuses.READY)
        .run();

    if (updateToReadyStatus.hasErrors()) {
      System.out.println(updateToReadyStatus.getError());
      return;
    }

    System.out.println(updateToReadyStatus.getResult());
    // UpdateShardStatus END
  }

  private void createMultiVectorCollection(String collectionName) {
    // START MultiValueVectorCollection
    // Define collection properties
    Property textProperty = Property.builder()
        .name("text")
        .description("Text content for ColBERT vectorization")
        .dataType(Arrays.asList(DataType.TEXT))
        .build();

    // Define the vectorizers configurations for named vectors
    Map<String, Object> text2colbertJinaAI = new HashMap<>();
    Map<String, Object> text2colbertSettings = new HashMap<>();
    text2colbertSettings.put("properties", new String[] { "text" });
    text2colbertJinaAI.put("text2colbert-jinaai", text2colbertSettings);

    // Configure multi-vector for custom vectors
    Map<String, Object> noneVectorizer = new HashMap<>();
    noneVectorizer.put("none", new Object());

    // Create multi-vector config for custom vectors
    VectorIndexConfig customMultiVectorConfig = VectorIndexConfig.builder()
        .multiVector(MultiVectorConfig.builder().build()) // Enable multi-vector with default settings
        .build();

    // Define the vector configurations
    Map<String, WeaviateClass.VectorConfig> vectorConfig = new HashMap<>();

    // Example 1: ColBERT vectorizer
    vectorConfig.put("jina_colbert", WeaviateClass.VectorConfig.builder()
        .vectorIndexType("hnsw")
        .vectorizer(text2colbertJinaAI)
        .build());

    // Example 2: User-provided multi-vector representations
    vectorConfig.put("custom_multi_vector", WeaviateClass.VectorConfig.builder()
        .vectorIndexType("hnsw")
        .vectorizer(noneVectorizer)
        .vectorIndexConfig(customMultiVectorConfig)
        .build());

    // Create the collection with multi-vector configuration
    WeaviateClass multiVecClass = WeaviateClass.builder()
        .className(collectionName)
        .properties(Arrays.asList(textProperty))
        .vectorConfig(vectorConfig)
        .build();

    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(multiVecClass)
        .run();
    // END MultiValueVectorCollection

    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .returns(true, Result::getResult);
  }

  /*
   * private void createMultiVectorMuvera(String collectionName) {
   * // START MultiValueVectorMuvera
   * // Define collection properties
   * Property textProperty = Property.builder()
   * .name("text")
   * .description("Text content for ColBERT vectorization with MUVERA encoding")
   * .dataType(Arrays.asList(DataType.TEXT))
   * .build();
   * 
   * // Define the vectorizers configurations for Jina AI ColBERT
   * Map<String, Object> text2colbertJinaAI = new HashMap<>();
   * Map<String, Object> text2colbertSettings = new HashMap<>();
   * text2colbertSettings.put("properties", new String[] { "text" });
   * text2colbertJinaAI.put("text2colbert-jinaai", text2colbertSettings);
   * 
   * // Configure noneVectorizer for custom vectors
   * Map<String, Object> noneVectorizer = new HashMap<>();
   * noneVectorizer.put("none", null);
   * 
   * // Create MUVERA encoding configuration for jina_colbert
   * MuveraConfig jinaMuveraConfig = MuveraConfig.builder()
   * .enabled(true)
   * .ksim(4) // Optional parameter for tuning MUVERA
   * .dprojections(16) // Optional parameter for tuning MUVERA
   * .repetitions(20) // Optional parameter for tuning MUVERA
   * .build();
   * 
   * // Create MUVERA encoding configuration for custom_multi_vector (minimal)
   * MuveraConfig customMuveraConfig = MuveraConfig.builder()
   * .enabled(true)
   * .build();
   * 
   * // Configure multi-vector with MUVERA encoding for jina_colbert
   * VectorIndexConfig jinaVectorIndexConfig = VectorIndexConfig.builder()
   * .multiVector(MultiVectorConfig.builder()
   * .muvera(jinaMuveraConfig)
   * .build())
   * .build();
   * 
   * // Configure multi-vector with MUVERA encoding for custom_multi_vector
   * (minimal)
   * VectorIndexConfig customVectorIndexConfig = VectorIndexConfig.builder()
   * .multiVector(MultiVectorConfig.builder()
   * .muvera(customMuveraConfig)
   * .build())
   * .build();
   * 
   * // Define the vector configurations
   * Map<String, WeaviateClass.VectorConfig> vectorConfig = new HashMap<>();
   * 
   * // Example 1: Jina AI ColBERT with MUVERA encoding
   * vectorConfig.put("jina_colbert", WeaviateClass.VectorConfig.builder()
   * .vectorIndexType("hnsw")
   * .vectorizer(text2colbertJinaAI)
   * .vectorIndexConfig(jinaVectorIndexConfig)
   * .build());
   * 
   * // Example 2: Custom multi-vector with MUVERA encoding (minimal config)
   * vectorConfig.put("custom_multi_vector", WeaviateClass.VectorConfig.builder()
   * .vectorIndexType("hnsw")
   * .vectorizer(noneVectorizer)
   * .vectorIndexConfig(customVectorIndexConfig)
   * .build());
   * 
   * // Create the collection with MUVERA-encoded multi-vector configuration
   * WeaviateClass multiVecMuveraClass = WeaviateClass.builder()
   * .className("DemoCollection")
   * .properties(Arrays.asList(textProperty))
   * .vectorConfig(vectorConfig)
   * .build();
   * 
   * // Add the collection to the schema
   * Result<Boolean> result = client.schema().classCreator()
   * .withClass(multiVecMuveraClass)
   * .run();
   * // END MultiValueVectorMuvera
   * }
   */

  private void createArticleCollectionWithIndexConfig(String collectionName) {
    // START SetInvertedIndexParams
    // Create properties with specific indexing configurations
    Property titleProperty = Property.builder()
        .name("title")
        .dataType(Arrays.asList(DataType.TEXT))
        .indexFilterable(true)
        .indexSearchable(true)
        .build();

    Property chunkProperty = Property.builder()
        .name("chunk")
        .dataType(Arrays.asList(DataType.INT))
        .indexRangeFilters(true)
        .build();

    // Configure BM25 settings
    BM25Config bm25Config = BM25Config.builder()
        .b(0.7f)
        .k1(1.25f)
        .build();

    // Configure inverted index with BM25 and other settings
    InvertedIndexConfig invertedIndexConfig = InvertedIndexConfig.builder()
        .bm25(bm25Config)
        .indexNullState(true)
        .indexPropertyLength(true)
        .indexTimestamps(true)
        .build();

    // Create the Article collection with properties and inverted index configuration
    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .properties(Arrays.asList(titleProperty, chunkProperty))
        .invertedIndexConfig(invertedIndexConfig)
        .build();

    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END SetInvertedIndexParams

    // Assert the result
    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .returns(true, Result::getResult);

    // Optionally verify the created collection has the correct configuration
    Result<WeaviateClass> classResult = client.schema().classGetter()
        .withClassName(collectionName)
        .run();

    assertThat(classResult).isNotNull()
        .returns(false, Result::hasErrors);

    WeaviateClass createdClass = classResult.getResult();
    assertThat(createdClass).isNotNull()
        .extracting(WeaviateClass::getProperties).asList()
        .hasSize(2);

    // Verify BM25 configuration
    assertThat(createdClass.getInvertedIndexConfig()).isNotNull()
        .extracting(InvertedIndexConfig::getBm25).isNotNull()
        .satisfies(bm25 -> {
          assertThat(bm25.getB()).isEqualTo(0.7f);
          assertThat(bm25.getK1()).isEqualTo(1.25f);
        });

    // Verify inverted index settings
    assertThat(createdClass.getInvertedIndexConfig())
        .returns(true, InvertedIndexConfig::getIndexNullState)
        .returns(true, InvertedIndexConfig::getIndexPropertyLength)
        .returns(true, InvertedIndexConfig::getIndexTimestamps);
  }

  private void createArticleWithOpenAIConfig(String collectionName) {
    // START SetGenModel
    // Configure OpenAI text2vec module settings
    Map<String, Object> text2vecOpenAI = new HashMap<>();
    Map<String, Object> text2vecOpenAISettings = new HashMap<>();
    text2vecOpenAISettings.put("model", "text-embedding-3-small"); // or your preferred embedding model
    text2vecOpenAI.put("text2vec-openai", text2vecOpenAISettings);

    // Configure OpenAI generative module settings
    Map<String, Object> generativeOpenAI = new HashMap<>();
    Map<String, Object> generativeOpenAISettings = new HashMap<>();
    generativeOpenAISettings.put("model", "gpt-4");
    generativeOpenAI.put("generative-openai", generativeOpenAISettings);

    // Combine module configurations
    Map<String, Object> moduleConfig = new HashMap<>();
    moduleConfig.put("text2vec-openai", text2vecOpenAI);
    moduleConfig.put("generative-openai", generativeOpenAI);

    // Create the Article collection with vectorizer and generative configuration
    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .vectorizer("text2vec-openai") // Set the vectorizer
        .moduleConfig(moduleConfig) // Set both vectorizer and generative configs
        .build();

    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END SetGenModel
    // Assert the result
    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .returns(true, Result::getResult);
  }

  private void createArticleWithMultiTenancyConfig(String collectionName) {
    // START MultiTenancy
    // Create multi-tenancy configuration
    MultiTenancyConfig multiTenancyConfig = MultiTenancyConfig.builder()
        .enabled(true)
        .build();

    // Create the Article collection with multi-tenancy configuration
    WeaviateClass articleCollection = WeaviateClass.builder()
        .className(collectionName)
        .description("Article collection with multi-tenancy enabled")
        .multiTenancyConfig(multiTenancyConfig)
        .build();

    // Add the collection to the schema
    Result<Boolean> result = client.schema().classCreator()
        .withClass(articleCollection)
        .run();
    // END MultiTenancy

    // Assert the result
    assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .returns(true, Result::getResult);

    // Verify the multi-tenancy configuration was set correctly
    Result<WeaviateClass> classResult = client.schema().classGetter()
        .withClassName(collectionName)
        .run();

    assertThat(classResult).isNotNull()
        .returns(false, Result::hasErrors);

    WeaviateClass createdClass = classResult.getResult();
    assertThat(createdClass).isNotNull()
        .extracting(WeaviateClass::getMultiTenancyConfig).isNotNull()
        .returns(true, MultiTenancyConfig::getEnabled);
  }
}
