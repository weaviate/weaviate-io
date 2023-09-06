package io.weaviate.docs.helper;

import io.weaviate.client.base.Result;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.fields.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import static org.assertj.core.api.Assertions.as;
import static org.assertj.core.api.Assertions.assertThat;
import io.weaviate.client.WeaviateClient;

public class AssertHelper {
  public static void deleteClass(WeaviateClient client, String className) {
    Result<Boolean> result = client.schema().classDeleter().withClassName(className).run();
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(true, Result::getResult);
  }

  public static void checkNumberOfResults(WeaviateClient client, String className, Double count) {
    Result<GraphQLResponse> result = client.graphQL()
      .aggregate()
      .withClassName(className)
      .withFields(Field.builder().name("meta { count }").build())
      .run();
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(resp -> ((Map<?, ?>) resp.getData()).get("Aggregate")).isNotNull()
      .extracting(aggregate -> ((Map<?, ?>) aggregate).get(className)).isNotNull()
      .extracting(clazz -> ((List<?>) clazz).get(0)).isNotNull()
      .extracting(meta -> ((Map<?, ?>) meta).get("meta")).isNotNull()
      .returns(count, metaCount -> ((Map<?, ?>) metaCount).get("count"));
  }

  public static boolean delProps(WeaviateClient client, String uuid, String className, String ...propNames) {
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

  public static void assertCrossRefHref(Result<List<WeaviateObject>> result, String propName, String ...href) {
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(l -> l.get(0)).isNotNull()
      .extracting(WeaviateObject::getProperties).isNotNull()
      .extracting(props -> props.get(propName)).isNotNull()
      .satisfies(p -> {
        assertThat(p)
          .isInstanceOf(List.class)
          .satisfies(prop -> {
            for (Object propVal: (List<?>) prop) {
              assertThat(propVal).isNotNull()
                .isInstanceOf(Map.class)
                .extracting(prop2 -> ((Map<?, ?>) prop2).get("href")).isNotNull()
                .satisfies(hrefValue -> {
                  assertThat(Arrays.stream(href).filter(v -> v.equals(hrefValue))).isNotNull();
                });
            }
          });
      });
  }
}
