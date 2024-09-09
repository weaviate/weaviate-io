package io.weaviate.docs.search;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.docs.helper.EnvHelper;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("search")
public class BasicSearch {

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
  public void shouldPerformBasicSearch() {
    String className = "Article";
    String tenantName = "TenantA";

    listObjects(className);
    limitReturnedObjects(className);
    paginateObjects(className);
    retrieveObjectVector(className);
    retrieveTenant(className, tenantName);
  }

  private void listObjects(String className) {
    // START BasicGet
    Result<List<WeaviateObject>> resultObj = client.data().objectsGetter()
      .withClassName(className)
      .run();
    // END BasicGet
  }

  //Metadata Returns as well
  private void limitReturnedObjects(String className) {
    // START GetWithLimit  // START GetObjectIdJS // START GetWithMetadata
    Result<List<WeaviateObject>> resultObj = client.data().objectsGetter()
      .withClassName(className)
      .withLimit(1) // Metadata and Object IDs are included by default with the Java client
      .run();
    // END GetWithLimit  // END GetObjectIdJS // END GetWithMetadata
  }

  private void paginateObjects(String className) {
    // START GetWithOffset
    Result<List<WeaviateObject>> resultObj = client.data().objectsGetter()
      .withClassName(className)
      .withLimit(1)
      .withOffset(1)
      .run();
    // END GetWithOffset
  }

  private void retrieveObjectVector(String className) {
    // START GetObjectVector
    Result<List<WeaviateObject>> resultObj = client.data().objectsGetter()
      .withClassName(className)
      .withLimit(1)
      .withVector()
      .run();
    // END GetObjectVector
  }

  private void retrieveTenant(String className, String tenantName) {
    // START MultiTenancy
    Result<List<WeaviateObject>> resultObj = client.data().objectsGetter()
      .withClassName(className)
      .withTenant(tenantName)
      .withVector()
      .run();
    // END MultiTenancy
  }
}
