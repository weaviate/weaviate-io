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
    // START CreateClass  // START ReadOneClass  // START UpdateClass
    String className = "Article";

    // END CreateClass  // END ReadOneClass  // END UpdateClass

    createClass(className);
    readOneClass(className);
    readAllClasses();
    updateClass(className);
  }

  private void createClass(String className) {
    // START CreateClass
    WeaviateClass emptyClass = WeaviateClass.builder()
      .className(className)
      .build();

    // Add the class to the schema
    Result<Boolean> result = client.schema().classCreator()
      .withClass(emptyClass)
      .run();

    // END CreateClass

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(true, Result::getResult);
  }

  private void readOneClass(String className) {
    // START ReadOneClass
    Result<WeaviateClass> result = client.schema().classGetter()
      .withClassName(className)
      .run();

    // END ReadOneClass

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(WeaviateClass::getClassName).isEqualTo(className);

    print(result);
  }

  private void readAllClasses() {
    // START ReadAllClasses
    Result<Schema> result = client.schema().getter()
      .run();

    // END ReadAllClasses

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(Schema::getClasses).asList()
      .hasSize(1);

    print(result);
  }

  private void updateClass(String className) {
    Result<Boolean> delResult = client.schema().classDeleter()
      .withClassName(className)
      .run();

    assertThat(delResult).isNotNull()
      .withFailMessage(() -> delResult.getError().toString())
      .returns(false, Result::hasErrors)
      .returns(true, Result::getResult);

    // START UpdateClassTODO
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

    // END UpdateClassTODO

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(true, Result::getResult);

    // START UpdateClassTODO
    // Define updated class
    WeaviateClass updatedClass = WeaviateClass.builder()
      .className(className)
      .vectorIndexConfig(VectorIndexConfig.builder()
        .distance(DistanceType.DOT)  // Note the distance metric
        .build())
      .build();

    // Update the class definition
    // TODO Not yet available in JAVA

    // END UpdateClassTODO
  }

  private <T> void print(Result<T> result) {
    // START ReadOneClass // START ReadAllClasses
    String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
    System.out.println(json);
    // END ReadOneClass // END ReadAllClasses
  }
}
