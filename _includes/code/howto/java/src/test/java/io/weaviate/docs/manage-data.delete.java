// How-to: Manage-data -> Delete objects
package io.weaviate.docs;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.batch.model.BatchDeleteOutput;
import io.weaviate.client.v1.batch.model.BatchDeleteResponse;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.filters.Operator;
import io.weaviate.client.v1.filters.WhereFilter;
import io.weaviate.docs.helper.AssertHelper;
import io.weaviate.docs.helper.EnvHelper;
import java.util.HashMap;
import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("delete")
class ManageDataDeleteTest {

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
  public void shouldManageDataRead() {
    deleteObject();
    dryRunAndBatchDelete();
  }

  private void deleteObject() {
    // START DeleteObject
    String idToDelete = "..."; // replace with the id of the object you want to delete
    // END DeleteObject

    Result<WeaviateObject> result = client.data().creator()
      .withClassName("EphemeralObject")
      .withProperties(new HashMap<String, Object>() {{
        put("name", "EphemeralObjectA");
      }})
      .run();

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(WeaviateObject::getId).isNotNull();

    idToDelete = result.getResult().getId();

    // START DeleteObject

    client.data().deleter()
      .withClassName("EphemeralObject") // Class of the object to be deleted
      .withID(idToDelete)
      .run();
    // END DeleteObject

    Result<Boolean> exist = client.data().checker().withClassName("EphemeralObject").withID(idToDelete).run();
    assertThat(exist).isNotNull()
      .withFailMessage(() -> exist.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(false, Result::getResult);

    AssertHelper.deleteClass(client, "EphemeralObject");
  }

  private void dryRunAndBatchDelete() {
    final int N = 5;
    for (int i = 0; i < N; i++) {
      Map<String, Object> properties = new HashMap<>();
      properties.put("name", String.format("EphemeralObject_%s", i));
      Result<WeaviateObject> result = client.data().creator()
        .withClassName("EphemeralObject")
        .withProperties(properties)
        .run();

      assertThat(result).isNotNull()
        .withFailMessage(() -> result.getError().toString())
        .returns(false, Result::hasErrors)
        .withFailMessage(null)
        .extracting(Result::getResult).isNotNull()
        .extracting(WeaviateObject::getId).isNotNull();
    }

    AssertHelper.checkNumberOfResults(client, "EphemeralObject", 5.0);

    Result<BatchDeleteResponse> dryRun =
    // START DryRun
    client.batch().objectsBatchDeleter()
      .withClassName("EphemeralObject")
      // Same `where` filter as in the GraphQL API
      .withWhere(WhereFilter.builder()
        .path("name")
        .operator(Operator.Like)
        .valueText("EphemeralObject*")
        .build())
      // highlight-start
      .withDryRun(true)
      .withOutput(BatchDeleteOutput.VERBOSE)
      // highlight-end
      .run();
    // END DryRun

    assertThat(dryRun).isNotNull()
      .withFailMessage(() -> dryRun.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(BatchDeleteResponse::getResults).isNotNull()
      .returns(5L, BatchDeleteResponse.Results::getMatches);
    AssertHelper.checkNumberOfResults(client, "EphemeralObject", 5.0);

    Result<BatchDeleteResponse> batchDelete =
    // START DeleteBatch
    client.batch().objectsBatchDeleter()
      .withClassName("EphemeralObject")
      // highlight-start
      .withWhere(WhereFilter.builder()
        .path("name")
        .operator(Operator.Like)
        .valueText("EphemeralObject*")
        .build())
      // highlight-end
      .run();
    // END DeleteBatch

    assertThat(batchDelete).isNotNull()
      .withFailMessage(() -> batchDelete.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(BatchDeleteResponse::getResults).isNotNull()
      .returns(5L, BatchDeleteResponse.Results::getMatches);
    AssertHelper.checkNumberOfResults(client, "EphemeralObject", 0.0);
  }
}
