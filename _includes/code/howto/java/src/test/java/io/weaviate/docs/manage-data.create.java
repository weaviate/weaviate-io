// How-to: Manage-data -> Create objects
package io.weaviate.docs;

import com.google.gson.GsonBuilder;
import io.weaviate.client.Config;
// START JSON streaming  // START CSV streaming
import io.weaviate.client.WeaviateClient;
// END JSON streaming  // END CSV streaming
import io.weaviate.client.base.Result;
import io.weaviate.client.base.WeaviateError;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.schema.model.DataType;
import io.weaviate.client.v1.schema.model.Property;
import io.weaviate.client.v1.schema.model.WeaviateClass;
import io.weaviate.docs.helper.EnvHelper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@Tag("crud")
@Tag("create")
class ManageDataCreateTest {

  private static final int MAX_ROWS_TO_IMPORT = 50;  // limit vectorization calls
  private static WeaviateClient client;

  @BeforeAll
  public static void beforeAll() {
    String scheme = EnvHelper.scheme("http");
    String host = EnvHelper.host("localhost");
    String port = EnvHelper.port("8080");
    String openaiApiKey = EnvHelper.env("OPENAI_APIKEY", "_dummy_");

    Config config = new Config(scheme, host + ":" + port, new HashMap<String, String>() {{
      put("X-Openai-Api-Key", openaiApiKey);
    }});
    client = new WeaviateClient(config);

    Result<Boolean> result = client.schema().allDeleter().run();
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(true, Result::getResult);
  }

  @Test
  public void shouldManageDataCreate() {
    String className = "JeopardyQuestion";

    createClass(className);
    createObject(className);
    createObjectWithVector(className);
    createObjectWithId(className);
    createObjectWithDeterministicId(className);
    validateObject(className);
  }

  private void createClass(String className) {
    WeaviateClass jeopardyClass = WeaviateClass.builder()
      .className(className)
      .description("A Jeopardy! question")
      .vectorizer("text2vec-openai")
      .properties(Arrays.asList(
        Property.builder()
          .name("question")
          .dataType(Arrays.asList(DataType.TEXT))
          .build(),
        Property.builder()
          .name("answer")
          .dataType(Arrays.asList(DataType.TEXT))
          .build()
      ))
      .build();

    Result<Boolean> result = client.schema().classCreator()
      .withClass(jeopardyClass)
      .run();

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(true, Result::getResult);
  }

  private void createObject(String className) {
    // CreateObject START
    Result<WeaviateObject> result = client.data().creator()
      .withClassName(className)
      .withProperties(new HashMap<String, Object>() {{
        put("question", "This vector DB is OSS and supports automatic property type inference on import");
        // put("answer", "Weaviate");  // schema properties can be omitted
        put("newProperty", 123); // will be automatically added as a number property
      }})
      .run();

    // the returned value is the object
    // CreateObject END

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .returns(className, WeaviateObject::getClassName)
      .extracting(WeaviateObject::getProperties)
      .extracting(props -> props.get("newProperty"))
      .isEqualTo(123.);

    print(result);
  }


  private void createObjectWithVector(String className) {
    // CreateObjectWithVector START
    Result<WeaviateObject> result = client.data().creator()
      .withClassName(className)
      .withProperties(new HashMap<String, Object>() {{
        put("question", "This vector DB is OSS and supports automatic property type inference on import");
        put("answer", "Weaviate");
      }})
      // highlight-start
      .withVector(Collections.nCopies(1536, 0.12345f).toArray(new Float[0]))
      // highlight-end
      .run();

    // the returned value is the object
    // CreateObjectWithVector END

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .returns(className, WeaviateObject::getClassName);

    print(result);
  }

  private void createObjectWithId(String className) {
    // CreateObjectWithId START
    Result<WeaviateObject> result = client.data().creator()
      .withClassName(className)
      .withProperties(new HashMap<String, Object>() {{
        put("question", "This vector DB is OSS and supports automatic property type inference on import");
        put("answer", "Weaviate");
      }})
      // highlight-start
      .withID("12345678-e64f-5d94-90db-c8cfa3fc1234")
      // highlight-end
      .run();

    // the returned value is the object
    // CreateObjectWithId END

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .returns(className, WeaviateObject::getClassName)
      .returns("12345678-e64f-5d94-90db-c8cfa3fc1234", WeaviateObject::getId);

    print(result);
  }

  private void createObjectWithDeterministicId(String className) {
    // CreateObjectWithDeterministicIdTODO START
    Map<String, Object> properties = new HashMap<String, Object>() {{
      put("question", "This vector DB is OSS and supports automatic property type inference on import");
      put("answer", "Weaviate");
    }};

    // highlight-start
    // String id = "gen_uuid5(properties)"; // TODO implement
    String id = UUID.randomUUID().toString();
    // highlight-end

    Result<WeaviateObject> result = client.data().creator()
      .withClassName(className)
      .withProperties(properties)
      .withID(id)
      .run();

    // the returned value is the object
    // CreateObjectWithDeterministicIdTODO END

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .returns(className, WeaviateObject::getClassName)
      .returns(id, WeaviateObject::getId);

    print(result);
  }

  private void validateObject(String className) {
    // ValidateObject START
    Result<Boolean> result = client.data()
      // highlight-start
      .validator()
      // highlight-end
      .withClassName(className)
      .withProperties(new HashMap<String, Object>() {{
        put("question", "This vector DB is OSS and supports automatic property type inference on import");
        put("answer", "Weaviate");
        put("thisPropShouldNotEndUpInTheSchema", -1);
      }})
      .withID("12345678-1234-1234-1234-123456789012")
      .run();

    // ValidateObject END

    assertThat(result).isNotNull()
      .returns(true, Result::hasErrors)
      .extracting(Result::getError).isNotNull()
      .extracting(WeaviateError::getMessages).isNotNull().asList()
      .hasSizeGreaterThan(0);

    // ValidateObject START
    assertThat(result.getResult()).isFalse();
    assertThat(result.hasErrors()).isTrue();
    assertThat(result.getError().getMessages().get(0).getMessage())
      .contains("invalid object: no such prop with name 'thisPropShouldNotEndUpInTheSchema' found");
    // ValidateObject END
  }

  private <T> void print(Result<T> result) {
    // CreateObject START // CreateObjectWithVector START // CreateObjectWithId START // CreateObjectWithDeterministicIdTODO START
    String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
    System.out.println(json);
    // CreateObject END // CreateObjectWithVector END // CreateObjectWithId END // CreateObjectWithDeterministicIdTODO END
  }
}
