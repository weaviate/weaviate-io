package io.weaviate.docs.search;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.filters.Operator;
import io.weaviate.client.v1.filters.WhereFilter;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.argument.WhereArgument;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.docs.helper.EnvHelper;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("search")
@Tag("filters")
public class FiltersSearchTest {
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
  public void shouldPerformVectorSearch() {
    filterWithOneCondition();
  }

  private void filterWithOneCondition() {
    // START SingleFilter
    Result<GraphQLResponse> result = client.graphQL().get()
      .withClassName("JeopardyQuestion")
      .withFields(
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
        Field.builder().name("round").build()
      )
      // highlight-start
      .withWhere(WhereArgument.builder()
        .filter(WhereFilter.builder()
          .path("round")
          .operator(Operator.Equal)
          .valueString("Double Jeopardy!")
          .build()
        ).build())
      // highlight-end
      .withLimit(3)
      .run();
    // END SingleFilter
    assertThat(result).isNotNull()
      .extracting(Result::getResult).isNotNull();
  }
}
