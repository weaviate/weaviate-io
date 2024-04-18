// How-to: Manage data -> Read all objects
// TODO: write tests, this is only an implementation, needs tests
package io.weaviate.docs;

// CursorExample  // Retrieve data
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
// END CursorExample // Use this function to retrieve data
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.auth.exception.AuthException;
import io.weaviate.client.v1.batch.api.ObjectsBatcher;
import io.weaviate.client.v1.batch.model.ObjectGetResponse;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.Get;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.client.v1.schema.model.WeaviateClass;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("read-all-objects")
class ManageDataReadAllObjectsTest {

  private static WeaviateClient sourceClient;

  @BeforeAll
  public static void beforeAll() throws AuthException {
    // This part with comments is only for doc purposes
    // CursorExample  // Retrieve data

    String scheme = "https";
    String host = ""; // Replace with your Weaviate URL
    String apiKey = "YOUR-WEAVIATE-API-KEY"; // If auth enabled. Replace with your Weaviate instance API key.

    try {
      WeaviateClient sourceClient = WeaviateAuthClient.apiKey(new Config(scheme, host), apiKey);
    } catch (AuthException e) {
      // handle error in case of authorization problems
      throw new RuntimeException(e);
    }

    // END CursorExample // Use this function to retrieve data

    // Here is a real client initialization
    sourceClient = new WeaviateClient(new Config("http", "localhost:8080"));
  }

  // This method needs to more indented bc of the way how we format the code snippets on our site
  // CursorExample  // Retrieve data
    int batchSize = 20;
    String className = "WineReview";
    String[] classProperties = new String[]{"title"};

    private Result<GraphQLResponse> getBatchWithCursor(WeaviateClient client,
      String className, String[] properties, int batchSize, String cursor) {
      Get query = client.graphQL().get()
        .withClassName(className)
        // highlight-start
        // Optionally retrieve the vector embedding by adding `vector` to the _additional fields
        .withFields(Stream.concat(Arrays.stream(properties), Stream.of("_additional { id vector }"))
          .map(prop -> Field.builder().name(prop).build())
          .toArray(Field[]::new)
        )
        .withLimit(batchSize);
        // highlight-end

      if (cursor != null) {
        return query.withAfter(cursor).run();
      }
      return query.run();
    }
  // END CursorExample // Use this function to retrieve data

  @Test
  public void shouldManageDataReadAllObjects() {
    // readAllObjects();
  }

  // This method needs to more indented bc of the way how we format the code snippets on our site
  // CursorExample  // Retrieve data

    private List<Map<String, Object>> getProperties(GraphQLResponse result, String className, String[] classProperties) {
      Object get = ((Map<?, ?>) result.getData()).get("Get");
      Object clazz = ((Map<?, ?>) get).get(className);
      List<?> objects = (List<?>) clazz;
      List<Map<String, Object>> res = new ArrayList<>();
      for (Object obj : objects) {
        Map<String, Object> objProps = new HashMap<>();
        for (String prop: classProperties) {
          Object propValue = ((Map<?, ?>) obj).get(prop);
          objProps.put(prop, propValue);
        }
        Object additional = ((Map<?, ?>) obj).get("_additional");
        Object id = ((Map<?, ?>) additional).get("id");
        objProps.put("id", id);
        Object vector = ((Map<?, ?>) additional).get("vector");
        objProps.put("vector", vector);
        res.add(objProps);
      }
      return res;
    }

    private int getObjectsCount(GraphQLResponse result, String className) {
      Object get = ((Map<?, ?>) result.getData()).get("Get");
      Object clazz = ((Map<?, ?>) get).get(className);
      List<?> objects = (List<?>) clazz;
      return objects.size();
    }

  // END CursorExample // Use this function to retrieve data

  private void readAllObjects() {
    // START FetchClassDefinition
    Result<WeaviateClass> classDef = sourceClient.schema().classGetter()
      .withClassName(className)
      .run();
    // END FetchClassDefinition
    assertThat(classDef).isNotNull()
      .withFailMessage(() -> classDef.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull();

    // Restore to a new (target) instance
    WeaviateClient targetClient = new WeaviateClient(
      new Config("https", "") // Replace with your Weaviate URL
    );

    // Finished restoring to the target instance  // END CursorExample

    // Restore to a new (target) instance  // CursorExample
    ObjectsBatcher targetBatcher = targetClient.batch().objectsBatcher();

    Result<GraphQLResponse> results = null;
    String cursor = null;

    // Batch import all objects to the target instance
    while (true) {
      // From the SOURCE instance, get the next group of objects
      results = getBatchWithCursor(sourceClient, className, classProperties, batchSize, cursor);

      GraphQLResponse result = results.getResult();
      if (!results.hasErrors() && result != null) {
        // If empty, we're finished
        if (getObjectsCount(result, className) == 0) {
          break;
        }
        // Otherwise, add the objects to the batch to be added to the target instance
        List<Map<String, Object>> objectProperties = getProperties(result, className, classProperties);
        for (Map<String, Object> objProp : objectProperties) {
          WeaviateObject.WeaviateObjectBuilder objBuilder = WeaviateObject.builder();
          String id = (String) objProp.get("id");
          objBuilder.id(id);
          // highlight-start
          // Can update the vector if it was included in _additional above
          objBuilder.vector((Float[]) objProp.get("vector"));
          // highlight-end
          Map<String, Object> properties = objProp.entrySet().stream()
            .filter(p -> !(p.getKey().equals("id") || p.getKey().equals("vector")))
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
          objBuilder.properties(properties);
          targetBatcher.withObject(objBuilder.build());
          cursor = id;
        }
        Result<ObjectGetResponse[]> runBatchInsert = targetBatcher.run();
        if (runBatchInsert.hasErrors()) {
          // Handle errors
          throw new RuntimeException(runBatchInsert.getError().toString());
        }
        System.out.printf("Imported %s objects...%n", runBatchInsert.getResult().length);
        targetBatcher = targetClient.batch().objectsBatcher();
      }
    }
    // Finished restoring to the target instance  // END CursorExample
  }
}
