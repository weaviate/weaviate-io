// How-to: Manage-data -> Cross-references
package io.weaviate.docs;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.auth.exception.AuthException;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.schema.model.DataType;
import io.weaviate.client.v1.schema.model.Property;
import io.weaviate.docs.helper.AssertHelper;
import java.util.Collections;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("cross-refs")
class ManageDataCrossRefsTest {

  private static WeaviateClient client;

  @BeforeAll
  public static void beforeAll() throws AuthException {
    String scheme = "https";
    String host = "anon-endpoint.weaviate.network";

    // ===== Instantiation, not shown in snippet
    Config config = new Config(scheme, host);
    client = new WeaviateClient(config);
  }

  @Test
  public void shouldManageDataCrossRefs() {
    // START OneWay  // TwoWay Java  // Multiple Java  // Delete Java  // Update Java
    String sfId = "00ff6900-e64f-5d94-90db-c8cfa3fc851b";
    // END OneWay  // END TwoWay Java // END Multiple Java  // END Delete Java  // END Update Java
    // START OneWay  // TwoWay Java  // Multiple Java
    String usCitiesId = "20ffc68d-986b-5e71-a680-228dba18d7ef";
    // END OneWay  // END TwoWay Java // END Multiple Java  // END Delete Java
    // Multiple Java  // Delete Java  // Update Java
    String museumsId = "fec50326-dfa1-53c9-90e8-63d0240bd933";
    // END Multiple Java  // END Delete Java  // END Update Java
    oneWay(sfId, usCitiesId);
    twoWay(sfId, usCitiesId);
    multipleCrossRefs(sfId, usCitiesId, museumsId);
    deleteCrossRefs(sfId, usCitiesId, museumsId);
    updateCrossRefs(sfId, museumsId);
  }

  private void oneWay(String sfId, String usCitiesId) {
    // START OneWay

    client.data().referenceCreator()
      .withClassName("JeopardyQuestion")
      .withID(sfId)
      .withReferenceProperty("hasCategory")
        .withReference(client.data()
          .referencePayloadBuilder()
          .withClassName("JeopardyCategory")
          .withID(usCitiesId)
          .payload())
      .run();
    // END OneWay

    Result<List<WeaviateObject>> result = client.data().objectsGetter().withID(sfId).withClassName("JeopardyQuestion").run();
    AssertHelper.assertCrossRefHref(result, "hasCategory", String.format("http://localhost:8080/v1/objects/JeopardyCategory/%s", usCitiesId));
  }

  private void twoWay(String sfId, String usCitiesId) {
    // Delete any existing cross-references from the source and target objects
    boolean deleted = AssertHelper.delProps(client, "JeopardyQuestion", "hasCategory");
    assertThat(deleted).isTrue();
    deleted = AssertHelper.delProps(client, "JeopardyCategory", "hasQuestion");
    assertThat(deleted).isTrue();

    // TwoWay Java

    // First, add the "hasQuestion" cross-reference property to the JeopardyCategory class
    client.schema().propertyCreator()
      .withClassName("JeopardyCategory")
      .withProperty(Property.builder()
        .name("hasQuestion")
        .dataType(Collections.singletonList("JeopardyQuestion"))
        .build())
      .run();

    // For the "San Francisco" JeopardyQuestion object, add a cross-reference to the "U.S. CITIES" JeopardyCategory object
    client.data().referenceCreator()
      .withClassName("JeopardyQuestion")
      .withID(usCitiesId)
      .withReferenceProperty("hasCategory")
      .withReference(client.data()
        .referencePayloadBuilder()
        .withClassName("JeopardyCategory")
        .withID(sfId)
        .payload())
      .run();

    // For the "U.S. CITIES" JeopardyCategory object, add a cross-reference to "San Francisco"
    client.data().referenceCreator()
      .withClassName("JeopardyCategory")
      .withID(usCitiesId)
      .withReferenceProperty("hasQuestion")
      .withReference(client.data()
        .referencePayloadBuilder()
        .withClassName("JeopardyQuestion")
        .withID(usCitiesId)
        .payload())
      .run();
    // END TwoWay Java

    Result<List<WeaviateObject>> sf = client.data().objectsGetter().withID(sfId).withClassName("JeopardyQuestion").run();
    AssertHelper.assertCrossRefHref(sf, "hasCategory", String.format("http://localhost:8080/v1/objects/JeopardyCategory/%s", usCitiesId));

    Result<List<WeaviateObject>> usCities = client.data().objectsGetter().withID(usCitiesId).withClassName("JeopardyCategory").run();
    AssertHelper.assertCrossRefHref(usCities, "hasQuestion", String.format("http://localhost:8080/v1/objects/JeopardyQuestion/%s", sfId));
  }

  private void multipleCrossRefs(String sfId, String usCitiesId, String museumsId) {
    // Delete any existing cross-references from the source and target objects
    boolean deleted = AssertHelper.delProps(client, "JeopardyQuestion", "hasCategory");
    assertThat(deleted).isTrue();

    // Multiple Java

    // Add to "San Francisco" the "U.S. CITIES" category
    client.data().referenceCreator()
      .withClassName("JeopardyQuestion")
      .withID(sfId)
      .withReferenceProperty("hasCategory")
      .withReference(client.data()
        .referencePayloadBuilder()
        .withClassName("JeopardyCategory")
        .withID(usCitiesId)
        .payload())
      .run();

    // Add the "MUSEUMS" category as well
    client.data().referenceCreator()
      .withClassName("JeopardyQuestion")
      .withID(sfId)
      .withReferenceProperty("hasCategory")
      .withReference(client.data()
        .referencePayloadBuilder()
        .withClassName("JeopardyCategory")
        .withID(museumsId)
        .payload())
      .run();
    // END Multiple Java

    Result<List<WeaviateObject>> sf = client.data().objectsGetter().withID(sfId).withClassName("JeopardyQuestion").run();
    AssertHelper.assertCrossRefHref(sf, "hasCategory",
      String.format("http://localhost:8080/v1/objects/JeopardyCategory/%s", usCitiesId),
      String.format("http://localhost:8080/v1/objects/JeopardyCategory/%s", museumsId)
    );
  }

  private void deleteCrossRefs(String sfId, String usCitiesId, String museumsId) {
    // Delete Java

    // From the "San Francisco" JeopardyQuestion object, delete the "MUSEUMS" category cross-reference
    client.data().referenceDeleter()
      .withClassName("JeopardyQuestion")
      .withID(sfId)
      .withReferenceProperty("hasCategory")
      .withReference(client.data()
        .referencePayloadBuilder()
        .withClassName("JeopardyCategory")
        .withID(museumsId)
        .payload())
      .run();
    // END Delete Java

    Result<List<WeaviateObject>> sf = client.data().objectsGetter().withID(sfId).withClassName("JeopardyQuestion").run();
    AssertHelper.assertCrossRefHref(sf, "hasCategory", String.format("http://localhost:8080/v1/objects/JeopardyCategory/%s", usCitiesId));
  }

  private void updateCrossRefs(String sfId, String museumsId) {
    // Update Java

    // In the "San Francisco" JeopardyQuestion object, set the "hasCategory" cross-reference only to "MUSEUMS"
    client.data().referenceReplacer()
      .withClassName("JeopardyQuestion")
      .withID(sfId)
      .withReferenceProperty("hasCategory")
      .withReferences(client.data()
        .referencePayloadBuilder()
        .withClassName("JeopardyCategory")
        .withID(museumsId)
        .payload())
      .run();
    // END Update Java

    Result<List<WeaviateObject>> sf = client.data().objectsGetter().withID(sfId).withClassName("JeopardyQuestion").run();
    AssertHelper.assertCrossRefHref(sf, "hasCategory", String.format("http://localhost:8080/v1/objects/JeopardyCategory/%s", museumsId));
  }
}
