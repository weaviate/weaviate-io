// How-to: Manage-data -> (Batch) Import items
package io.weaviate.docs;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.batch.api.ObjectsBatcher;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.docs.helper.AssertHelper;
import io.weaviate.docs.helper.EnvHelper;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("import")
class ManageDataImportTest {

  private static WeaviateClient client;

  @BeforeAll
  public static void beforeAll() {
    String scheme = EnvHelper.scheme("http");
    String host = EnvHelper.host("localhost");
    String port = EnvHelper.port("8080");
    String openaiApiKey = EnvHelper.env("OPENAI_APIKEY", "_dummy_");

    // ===== Instantiation, not shown in snippet
    Config config = new Config(scheme, host + ":" + port, new HashMap<String, String>() {{
      put("X-Openai-Api-Key", openaiApiKey);
    }});
    client = new WeaviateClient(config);

    // Clean slate
    Result<Boolean> result = client.schema().allDeleter().run();
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(true, Result::getResult);
  }

  @Test
  public void shouldManageDataImport() {
    basicBatchImport();
    basicBatchImportWithCustomId();
    basicBatchImportWithCustomVector();
    streamingImport();
  }

  private void basicBatchImport() {
    // BasicBatchImportExample
    String className = "YourClassName";  // Replace with your class name
    List<Map<String, Object>> dataObjs = new ArrayList<>();
    for (int i = 0; i < 5; i++) {
      Map<String, Object> properties = new HashMap<>();
      properties.put("title", String.format("Object %s", i));  // Replace with your actual objects
      dataObjs.add(properties);
    }

    // highlight-start
    ObjectsBatcher batcher = client.batch().objectsBatcher();
    for (Map<String, Object> properties : dataObjs) {
      batcher.withObject(WeaviateObject.builder()
        .className(className)
        .properties(properties)
        // .tenant("tenantA")  // If multi-tenancy is enabled, specify the tenant to which the object will be added.
        .build()
      );
    }

    // Flush
    batcher.run();
    // highlight-end
    // END BasicBatchImportExample

    AssertHelper.checkNumberOfResults(client, className, 5.0);
    AssertHelper.deleteClass(client, className);
  }

  private void basicBatchImportWithCustomId() {
    // BatchImportWithIDExample
    String className = "YourClassName";  // Replace with your class name
    List<Map<String, Object>> dataObjs = new ArrayList<>();
    for (int i = 0; i < 5; i++) {
      Map<String, Object> properties = new HashMap<>();
      properties.put("title", String.format("Object %s", i));  // Replace with your actual objects
      dataObjs.add(properties);
    }

    // highlight-start
    ObjectsBatcher batcher = client.batch().objectsBatcher();
    for (Map<String, Object> properties : dataObjs) {
      batcher.withObject(WeaviateObject.builder()
        .className(className)
        .properties(properties)
        // highlight-start
        .id(UUID.nameUUIDFromBytes(((String) properties.get("title")).getBytes()).toString())
        // highlight-end
        .build()
      );
    }

    // Flush
    batcher.run();
    // END BatchImportWithIDExample

    AssertHelper.checkNumberOfResults(client, className, 5.0);

    Result<GraphQLResponse> result = client.graphQL().get()
      .withClassName(className)
      .withFields(Field.builder().name("title _additional { id }").build())
      .run();
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(resp -> ((Map<?, ?>) resp.getData()).get("Get")).isNotNull()
      .extracting(get -> ((Map<?, ?>) get).get(className)).isNotNull()
      .extracting(clazz -> ((List<?>) clazz)).isNotNull()
      .satisfies(res -> {
        for (Object obj : res) {
          assertThat(obj).isNotNull()
            .satisfies(o -> {
              Object title = ((Map<?, ?>) o).get("title");
              Object additional = ((Map<?, ?>) o).get("_additional");
              Object id = ((Map<?, ?>) additional).get("id");
              String generatedId = UUID.nameUUIDFromBytes(title.toString().getBytes()).toString();
              assertThat(id).isNotNull()
                .extracting(Object::toString).isNotNull()
                .isEqualTo(generatedId);
            });
        }
      });

    AssertHelper.deleteClass(client, className);
  }

  private void basicBatchImportWithCustomVector() {
    // BatchImportWithVectorExample
    String className = "YourClassName";  // Replace with your class name
    List<Map<String, Object>> dataObjs = new ArrayList<>();
    for (int i = 0; i < 5; i++) {
      Map<String, Object> properties = new HashMap<>();
      properties.put("title", String.format("Object %s", i));  // Replace with your actual objects
      dataObjs.add(properties);
    }
    List<Float[]> vectors = new ArrayList<>();
    for (int i = 0; i < 5; i++) {
      Float[] vector = new Float[10];
      Arrays.fill(vector, 0.25f + i / 100f);
      vectors.add(vector);  // Replace with your actual vectors
    }

    // highlight-start
    ObjectsBatcher batcher = client.batch().objectsBatcher();
    for (int i = 0; i < 5; i++) {
      batcher.withObject(WeaviateObject.builder()
        .className(className)
        .properties(dataObjs.get(i))
        // highlight-start
        .vector(vectors.get(i))
        // highlight-end
        .build()
      );
    }

    // Flush
    batcher.run();
    // END BatchImportWithVectorExample

    AssertHelper.checkNumberOfResults(client, className, 5.0);

    Result<GraphQLResponse> result = client.graphQL().get()
      .withClassName(className)
      .withFields(Field.builder().name("_additional { vector }").build())
      .run();
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(resp -> ((Map<?, ?>) resp.getData()).get("Get")).isNotNull()
      .extracting(get -> ((Map<?, ?>) get).get(className)).isNotNull()
      .extracting(clazz -> ((List<?>) clazz)).isNotNull()
      .satisfies(res -> {
        for (Object obj : res) {
          assertThat(obj).isNotNull()
            .satisfies(o -> {
              Object additional = ((Map<?, ?>) obj).get("_additional");
              ArrayList<Double> vector = (ArrayList<Double>) ((Map<?, ?>) additional).get("vector");
              assertThat(vector).isNotNull()
                .satisfies(vec -> {
                  assertThat(vec.get(0)).isGreaterThanOrEqualTo(0.25f);
                  assertThat(vec.get(9)).isLessThanOrEqualTo(0.3f);
                });
            });
        }
      });

    AssertHelper.deleteClass(client, className);
  }

  private void streamingImport() {

  }
}
