// How-to: Manage-Data -> Classes
package io.weaviate.docs;

import com.google.gson.GsonBuilder;
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.misc.model.DistanceType;
import io.weaviate.client.v1.misc.model.VectorIndexConfig;
import io.weaviate.client.v1.schema.model.Schema;
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
    String className = "Article";

    // END BasicCreateCollection // END ReadOneCollection // END UpdateCollection

    createCollection(className);
    readOneCollection(className);
    readAllCollections();
    updateCollection(className);
    createCollectionWithProperties(className);
    createCollectionWithVectorizer(className);
    createCollectionWithNamedVectors(className);
    createCollectionWithModuleSettings(className);
    createCollectionWithVectorIndexType(className);
    createCollectionWithVectorIndexParams(className);
    createPropertieswithSettings(className);
    specifyDistanceMetric(className);
  }

  private void createCollection(String className) {
    // START BasicCreateCollection
    WeaviateClass emptyClass = WeaviateClass.builder()
      .className(className)
      .build();

    // Add the class to the schema
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

  private void createCollectionWithProperties(String className) {
    // START CreateCollectionWithProperties
    // Define class properties
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

    //Add the defined properties to the class
    WeaviateClass articleClass = WeaviateClass.builder()
      .className(className)
      .description("Article Class Description...")
      .properties(Arrays.asList(titleProperty, bodyProperty))
      .build();

    Result<Boolean> result = client.schema().classCreator()
      .withClass(articleClass)
      .run();
    // END CreateCollectionWithProperties
  }

  private void createCollectionWithVectorizer(String className) {
    // Define class properties
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
    WeaviateClass articleClass = WeaviateClass.builder()
      .className(className)
      .properties(Arrays.asList(titleProperty, bodyProperty))
      .vectorizer("text2vec-openai") // Vectorize of your choic e.g. text2vec-openai or text2vec-cohere
      .build();
    // Add the class to the schema
    Result<Boolean> result = client.schema().classCreator()
      .withClass(articleClass)
      .run();
    // END CreateCollectionWithVectorizer
  }

  private void createCollectionWithNamedVectors(String className) {
    // Define class properties
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
    //Define the vectorizers configurations
    Map<String, Object> text2vecOpenAI = new HashMap<>();
    Map<String, Object> text2vecOpenAISettings = new HashMap<>();
    text2vecOpenAISettings.put("properties", new String[]{ "name" });
    text2vecOpenAI.put("text2vec-openai", text2vecOpenAISettings);

    Map<String, Object> text2vecCohere = new HashMap<>();
    Map<String, Object> text2vecCohereSettings = new HashMap<>();
    text2vecCohereSettings.put("properties", new String[]{ "body" });
    text2vecCohere.put("text2vec_cohere", text2vecCohereSettings);

    //Define the vector configurations
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
    WeaviateClass articleClass = WeaviateClass.builder()
      .className(className)
      .properties(Arrays.asList(titleProperty, bodyProperty))
      .vectorConfig(vectorConfig)
      .build();
    // Add the class to the schema
    Result<Boolean> result = client.schema().classCreator()
      .withClass(articleClass)
      .run();
    // END CreateCollectionWithNamedVectors
  }

  private void createCollectionWithModuleSettings(String className) {
    // Define class properties
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
    //Define the module settings
    Map<String, Object> text2vecOpenAI = new HashMap<>();
    Map<String, Object> text2vecOpenAISettings = new HashMap<>();
    text2vecOpenAISettings.put("vectorizePropertyName", false);
    text2vecOpenAISettings.put("model", "text-embedding-3-small"); //set the model of your choice e.g. text-embedding-3-small
    text2vecOpenAI.put("text2vec-openai", text2vecOpenAISettings);
    Map<Object, Object> moduleConfig = new HashMap<>();
    moduleConfig.put("text2vec-openai", text2vecOpenAI);

    // Set the module configu in the WeaviateClass Builder
    WeaviateClass articleClass = WeaviateClass.builder()
      .className(className)
      .properties(Arrays.asList(titleProperty, bodyProperty))
      .moduleConfig(moduleConfig) // Set the module config
      .build();

    // Add the class to the schema
    Result<Boolean> result = client.schema().classCreator()
      .withClass(articleClass)
      .run();
    // END ModuleSettings
  }

  private void createCollectionWithVectorIndexType(String className) {
    // Define class properties
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
    WeaviateClass articleClass = WeaviateClass.builder()
      .className(className)
      .properties(Arrays.asList(titleProperty, bodyProperty))
      .vectorizer("text2vec-openai")
      .vectorIndexType("hnsw") //set the vector index of your choice e.g. hnsw, flat...
      .build();
    // Add the class to the schema
    Result<Boolean> result = client.schema().classCreator()
      .withClass(articleClass)
      .run();
    // END SetVectorIndexType
  }

  private void createCollectionWithVectorIndexParams(String className) {
    // Define class properties
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

    WeaviateClass articleClass = WeaviateClass.builder()
      .className(className)
      .properties(Arrays.asList(titleProperty, bodyProperty))
      .vectorIndexType("flat") //set the vector index of your choice e.g. hnsw, flat...
      .vectorIndexConfig(createBqIndexConfig)
      .vectorizer("text2vec-openai")
      .build();

    // Add the class to the schema
    Result<Boolean> result = client.schema().classCreator()
      .withClass(articleClass)
      .run();
    // END SetVectorIndexParams
  }

  private void createPropertieswithSettings(String className) {
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

    //Add the defined properties to the class
    WeaviateClass articleClass = WeaviateClass.builder()
      .className(className)
      .description("Article Class Description...")
      .properties(Arrays.asList(titleProperty, bodyProperty))
      .build();

    Result<Boolean> result = client.schema().classCreator()
      .withClass(articleClass)
      .run();
    // END PropModuleSettings
  }

  private void specifyDistanceMetric(String className) {
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

    WeaviateClass articleClass = WeaviateClass.builder()
      .className(className)
      .properties(Arrays.asList(titleProperty, bodyProperty))
      .vectorIndexConfig(vectorIndexConfig)
      .build();

    Result<Boolean> classResult = client.schema().classCreator()
      .withClass(articleClass)
      .run();
    // END DistanceMetric
  }

  private void readOneCollection(String className) {
    // START ReadOneCollection
    Result<WeaviateClass> result = client.schema().classGetter()
      .withClassName(className)
      .run();

    // END ReadOneCollection

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(WeaviateClass::getClassName).isEqualTo(className);

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

  private void updateCollection(String className) {
    Result<Boolean> delResult = client.schema().classDeleter()
      .withClassName(className)
      .run();

    assertThat(delResult).isNotNull()
      .withFailMessage(() -> delResult.getError().toString())
      .returns(false, Result::hasErrors)
      .returns(true, Result::getResult);

    // START UpdateCollectionTODO
    // Define class
    WeaviateClass originalClass = WeaviateClass.builder()
      .className(className)
      .vectorIndexConfig(VectorIndexConfig.builder()
        .distance(DistanceType.COSINE) // Note the distance metric
        .build())
      .build();

    // Add the class to the schema
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
    // Define updated class
    WeaviateClass updatedClass = WeaviateClass.builder()
      .className(className)
      .vectorIndexConfig(VectorIndexConfig.builder()
        .distance(DistanceType.DOT) // Note the distance metric
        .build())
      .build();

    // Update the class definition
    // TODO Not yet available in JAVA

    // END UpdateCollectionTODO
  }

  private <T> void print(Result<T> result) {
    // START ReadOneCollection // START ReadAllCollections
    String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
    System.out.println(json);
    // END ReadOneCollection // END ReadAllCollections
  }
}
