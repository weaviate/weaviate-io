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
public class BasicSearchTest {

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
    String propertyName = "body";

    listObjects(className);
    limitReturnedObjects(className);
    paginateObjects(className);
    specifyObjectProperties(className, propertyName);
    retrieveObjectVector(className);
    retrieveMetadata(className);
    retrieveTenant(className, tenantName);
  }

  private void listObjects(String className) {
    // START BasicGet
    Result<List<WeaviateObject>> resultObj = client.data().objectsGetter()
      .withClassName(className)
      .run();
    // END BasicGet
  }

  private void limitReturnedObjects(String className) {
    // START GetWithLimit
    Result<List<WeaviateObject>> resultObj = client.data().objectsGetter()
      .withClassName(className)
      .withLimit(1) // Object IDs are included by default with the Java client
      .run();
    // END GetWithLimit
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

  private void specifyObjectProperties(String className, String propertyName) {
    // START GetProperties
    Result<List<WeaviateObject>> resultObj = client.data().objectsGetter()
      .withClassName(className)
      .withLimit(1)
      .run();
    resultObj.getResult().get(0).getProperties().get(propertyName);
    // END GetProperties
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

  private void retrieveObjectId(String className) {
    // START GetObjectId
    Result<List<WeaviateObject>> resultObj = client.data().objectsGetter()
      .withClassName(className)
      .withLimit(1)
      .run();
    resultObj.getResult().get(0).getId();
    // END GetObjectId
  }

  private void retrieveMetadata(String className) {
    // START GetWithMetadata
    Result<List<WeaviateObject>> resultObj = client.data().objectsGetter()
      .withClassName(className)
      .run();
    resultObj.getResult().get(0).getLastUpdateTimeUnix();
    resultObj.getResult().get(0).getCreationTimeUnix();
    // END GetWithMetadata
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
