// How-to: Manage-data -> Multi-tenancy operations
package io.weaviate.docs;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.client.v1.misc.model.MultiTenancyConfig;
import io.weaviate.client.v1.schema.model.Property;
import io.weaviate.client.v1.schema.model.Tenant;
import io.weaviate.client.v1.schema.model.WeaviateClass;
import io.weaviate.docs.helper.AssertHelper;
import io.weaviate.docs.helper.EnvHelper;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("multi-tenancy")
class ManageDataMultiTenancyTest {

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

  private void checkTenants(String className) {
    Result<List<Tenant>> tenantsResult = client.schema().tenantsGetter().withClassName(className).run();
    assertThat(tenantsResult).isNotNull()
      .withFailMessage(() -> tenantsResult.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .satisfies(list -> {
        assertThat(list.size()).isEqualTo(2);
        assertThat(list.stream().filter(t -> t.getName().equals("tenantA"))).isNotNull();
        assertThat(list.stream().filter(t -> t.getName().equals("tenantB"))).isNotNull();
      });
  }

  @Test
  public void shouldManageDataUpdate() {
    String className = "MultiTenancyCollection";
    addTenantsToClass(className);
    listTenants(className);
    removeTenantsFromClass(className);
    createMTObject();
    searchMT(className);
    addCrossReference(className);
  }

  private void addTenantsToClass(String className) {
    // START AddTenantsToClass
    WeaviateClass MultiTenancyCollection = WeaviateClass.builder()
      .className("MultiTenancyCollection")
      .multiTenancyConfig(MultiTenancyConfig.builder().enabled(true).build())
      .build();

    client.schema().classCreator()
      .withClass(MultiTenancyCollection)
      .run();

    client.schema().tenantsCreator()
      .withClassName("MultiTenancyCollection")
      .withTenants(
        Tenant.builder().name("tenantA").build(),
        Tenant.builder().name("tenantB").build()
      )
      .run();
    // END AddTenantsToClass

    Result<WeaviateClass> result = client.schema().classGetter().withClassName(className).run();
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(WeaviateClass::getMultiTenancyConfig).isNotNull()
      .returns(true, MultiTenancyConfig::getEnabled);

    checkTenants(className);
  }

  private void listTenants(String className) {
    // START ListTenants
    client.schema().tenantsGetter()
      .withClassName("MultiTenancyCollection")
      .run();
    // END ListTenants
    checkTenants(className);
  }

  private void removeTenantsFromClass(String className) {
    // START RemoveTenants
    client.schema().tenantsDeleter()
      .withClassName("MultiTenancyCollection")
      .withTenants("tenantB", "tenantX") // tenantX will be ignored
      .run();
    // END RemoveTenants

    Result<List<Tenant>> tenantsResult = client.schema().tenantsGetter().withClassName(className).run();
    assertThat(tenantsResult).isNotNull()
      .withFailMessage(() -> tenantsResult.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .returns(1, List::size);
  }

  private void createMTObject() {
    // START CreateMtObject
    Result<WeaviateObject> result = client.data().creator()
      .withClassName("MultiTenancyCollection") // The class to which the object will be added
      .withProperties(new HashMap<String, Object>() {{
        put("question", "This vector DB is OSS & supports automatic property type inference on import");
      }})
      // highlight-start
      .withTenant("tenantA") // The tenant to which the object will be added
      // highlight-end
      .run();
    // END CreateMtObject

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .returns("tenantA", WeaviateObject::getTenant);
  }

  private void searchMT(String className) {
    // START Search
    Result<GraphQLResponse> result = client.graphQL().get()
      .withClassName("MultiTenancyCollection")
      .withFields(Field.builder().name("question").build())
      // highlight-start
      .withTenant("tenantA")
      // highlight-end
      .run();
    // END Search

    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(resp -> ((Map<?, ?>) resp.getData()).get("Get")).isNotNull()
      .extracting(get -> ((Map<?, ?>) get).get(className)).isNotNull()
      .extracting(clazz -> ((List<?>) clazz)).isNotNull()
      .satisfies(res -> {
        assertThat(res.get(0)).isNotNull()
          .satisfies(o -> {
            Object question = ((Map<?, ?>) o).get("question");
            assertThat(question).isNotNull();
          });
      });
  }

  private void addCrossReference(String className) {
    Result<List<WeaviateObject>> objectResult = client.data().objectsGetter().withClassName(className).withTenant("tenantA").run();
    assertThat(objectResult).isNotNull()
      .withFailMessage(() -> objectResult.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(res -> res.get(0)).isNotNull();

    WeaviateObject object = objectResult.getResult().get(0);

    Result<WeaviateObject> categoryResult = client.data().creator()
      .withClassName("JeopardyCategory").withProperties(new HashMap<String, Object>() {{
        put("category", "Software");
      }})
      .run();

    assertThat(categoryResult).isNotNull()
      .withFailMessage(() -> categoryResult.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull();

    WeaviateObject category = categoryResult.getResult();

    // START AddCrossRef
    // Add the cross-reference property to the multi-tenancy class
    client.schema().propertyCreator()
      .withClassName("MultiTenancyCollection")
      .withProperty(Property.builder()
        .name("hasCategory")
        .dataType(Collections.singletonList("JeopardyCategory")).build()
      )
      .run();

    // Create the cross-reference from MultiTenancyCollection object to the JeopardyCategory object
    client.data().referenceCreator()
      .withClassName("MultiTenancyCollection")
      // highlight-start
      .withTenant("tenantA")
      // highlight-end
      .withID(object.getId()) // MultiTenancyCollection object id (a Jeopardy question)
      .withReferenceProperty("hasCategory")
      .withReference(
        client.data()
          .referencePayloadBuilder()
          .withClassName("JeopardyCategory")
          .withID(category.getId())
          .payload()
      )
      .run();
    // END AddCrossRef

    Result<List<WeaviateObject>> result = client.data().objectsGetter().withID(object.getId()).withClassName(className).withTenant("tenantA").run();
    AssertHelper.assertCrossRefHref(result, "hasCategory", String.format("http://localhost:8080/v1/objects/JeopardyCategory/%s", category.getId()));
  }
}
