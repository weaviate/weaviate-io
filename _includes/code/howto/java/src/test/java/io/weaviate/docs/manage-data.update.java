// How-to: Manage data -> Update objects
package io.weaviate.docs;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.schema.model.WeaviateClass;
import io.weaviate.docs.helper.EnvHelper;
import java.util.HashMap;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("update")
class ManageDataUpdateTest {

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
  public void shouldManageDataUpdate() {
    String className = "JeopardyQuestion";
    defineClass(className);
    updateProperties(className);
  }

  private void defineClass(String className) {
    WeaviateClass jeopardyClass = WeaviateClass.builder()
      .className(className)
      .description("A Jeopardy! question")
      .vectorizer("text2vec-openai")
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

  // This method needs to more indented bc of the way how we format the code snippets on our site
  // DelProps START
    private boolean delProps(String uuid, String className, String ...propNames) {
      Result<List<WeaviateObject>> result = client.data().objectsGetter().withID(uuid).withClassName(className).run();
      if (!result.hasErrors() && result.getResult() != null) {
        WeaviateObject objectData = result.getResult().get(0);
        for (String propName: propNames) {
          objectData.getProperties().remove(propName);
        }
        // Replace the object
        Result<Boolean> update = client.data().updater()
          .withID(uuid)
          .withClassName(className)
          .withProperties(objectData.getProperties())
          .run();
        return update.getResult() != null && update.getResult().equals(true);
      }
      return false;
    }

  // DelProps END
  private void updateProperties(String className) {
    Result<WeaviateObject> result = client.data().creator()
      .withClassName(className)
      .withProperties(new HashMap<String, Object>() {{
        put("question", "Test question");
        put("answer", "Test answer");
        put("points", -1);
      }})
      .run();
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(WeaviateObject::getId).isNotNull();

    // UpdateProps START // Replace START // DelProps START
    String id = "..."; // replace with the id of the object you want to update
    // UpdateProps END // Replace END // DelProps END
    id = result.getResult().getId();
    Float[] vector = result.getResult().getVector();
    assertThat(vector).isNotEmpty();

    // UpdateProps START
    client.data().updater()
      // highlight-start
      .withMerge() // merges properties into the object
      // highlight-end
      .withID(id)
      .withClassName("JeopardyQuestion")
      .withProperties(new HashMap<String, Object>() {{
        put("points", 100);
      }})
      .run();
    // UpdateProps END

    Result<List<WeaviateObject>> updated = client.data().objectsGetter().withID(id).withClassName(className).run();
    assertThat(updated).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .satisfies(res -> {
        assertThat(res.size()).isEqualTo(1);
        WeaviateObject obj = res.get(0);
        assertThat(obj.getProperties().get("points")).isNotNull().isEqualTo(100.0);
        assertThat(obj.getProperties().get("question")).isNotNull().isEqualTo("Test question");
      });

    // Replace START
    // highlight-start
    client.data().updater() // replaces the entire object
      // highlight-end
      .withID(id)
      .withClassName("JeopardyQuestion")
      .withProperties(new HashMap<String, Object>() {{
        put("answer", "Replaced");
        // The other properties will be deleted
      }})
      .run();
    // Replace END

    updated = client.data().objectsGetter().withID(id).withClassName(className).run();
    assertThat(updated).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .satisfies(res -> {
        assertThat(res.size()).isEqualTo(1);
        WeaviateObject obj = res.get(0);
        assertThat(obj.getProperties().get("points")).isNull();
        assertThat(obj.getProperties().get("question")).isNull();
        assertThat(obj.getProperties().get("answer")).isNotNull().isEqualTo("Replaced");
      });

    // DelProps START
    boolean isUpdated = delProps(id, "JeopardyQuestion", "answer");
    // DelProps END
    assertThat(isUpdated).isTrue();

    updated = client.data().objectsGetter().withID(id).withClassName(className).run();
    assertThat(updated).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .satisfies(res -> {
        assertThat(res.size()).isEqualTo(1);
        WeaviateObject obj = res.get(0);
        assertThat(obj.getProperties().get("points")).isNull();
        assertThat(obj.getProperties().get("question")).isNull();
        assertThat(obj.getProperties().get("answer")).isNull();
      });
  }
}
