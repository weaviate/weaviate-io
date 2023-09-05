package io.weaviate.docs.helper;

import io.weaviate.client.base.Result;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.fields.Field;
import java.util.List;
import java.util.Map;
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
}
