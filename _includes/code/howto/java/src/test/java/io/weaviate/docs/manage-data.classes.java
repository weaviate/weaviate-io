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
import io.weaviate.docs.helper.EnvHelper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

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
    // START BasicCreateCollection  // START ReadOneCollection  // START UpdateCollection
    String className = "Article";

    // END BasicCreateCollection  // END ReadOneCollection  // END UpdateCollection

    createCollection(className);
    readOneCollection(className);
    readAllCollections();
    updateCollection(className);
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
        .distance(DistanceType.COSINE)  // Note the distance metric
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
        .distance(DistanceType.DOT)  // Note the distance metric
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
