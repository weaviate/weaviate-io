// How-to: Manage-data -> Retrieve objects
package io.weaviate.docs;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.auth.exception.AuthException;
import io.weaviate.client.v1.data.model.WeaviateObject;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("read")
class ManageDataReadTest {

  private static WeaviateClient client;

  @BeforeAll
  public static void beforeAll() throws AuthException {
    String scheme = "https";
    String host = "edu-demo.weaviate.network";
    String apiKey = "learn-weaviate";

    // ===== Instantiation, not shown in snippet
    client = WeaviateAuthClient.apiKey(new Config(scheme, host), apiKey);
  }

  @Test
  public void shouldManageDataRead() {
    readObject();
    readObjectWithVector();
  }

  private void readObject() {
    // ReadObject START
    Result<List<WeaviateObject>> result = client.data().objectsGetter()
      .withClassName("JeopardyQuestion")
      .withID("00ff6900-e64f-5d94-90db-c8cfa3fc851b")
      .run();
    // ReadObject END

    assertThat(result).isNotNull()
      .extracting(Result::getResult).isNotNull()
      .extracting(res -> res.get(0)).isNotNull();

    // ReadObject START

    System.out.println(result.getResult());
    // ReadObject END

    assertThat(result.getResult().get(0)).isNotNull()
      .extracting(WeaviateObject::getProperties)
      .extracting(props -> props.get("answer")).isNotNull()
      .isEqualTo("San Francisco");
  }

  private void readObjectWithVector() {
    // ReadObjectWithVector START
    Result<List<WeaviateObject>> result = client.data().objectsGetter()
      .withClassName("JeopardyQuestion")
      .withID("00ff6900-e64f-5d94-90db-c8cfa3fc851b")
      // highlight-start
      .withVector()
      // handle error
      .run();
    // ReadObjectWithVector END

    assertThat(result).isNotNull()
      .extracting(Result::getResult).isNotNull()
      .extracting(res -> res.get(0)).isNotNull();

    // ReadObjectWithVector START

    System.out.println(result.getResult());
    // ReadObjectWithVector END

    assertThat(result.getResult().get(0)).isNotNull()
      .extracting(WeaviateObject::getVector).isNotNull()
      .extracting(vector -> vector.length)
      .isEqualTo(1536);
  }
}
