// START Sorting
package io.weaviate;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.argument.SortArgument;
import io.weaviate.client.v1.graphql.query.argument.SortOrder;
import io.weaviate.client.v1.graphql.query.fields.Field;

public class App {
  public static void main(String[] args) {
    Config config = new Config("http", "localhost:8080");
    WeaviateClient client = new WeaviateClient(config);

    Field title = Field.builder().name("title").build();
    Field url = Field.builder().name("url").build();
    Field wordCount = Field.builder().name("wordCount").build();

    SortArgument byTitleAsc = client.graphQL().arguments().sortArgBuilder()
      .path(new String[]{ "title" })
      .order(SortOrder.asc)
      .build();

    Result<GraphQLResponse> result = client.graphQL().get()
      .withClassName("Article")
      .withSort(byTitleAsc)
      .withFields(title, url, wordCount)
      .run();
    if (result.hasErrors()) {
      System.out.println(result.getError());
      return;
    }
    System.out.println(result.getResult());
  }
}
// END Sorting

// START MultiplePropSorting
Coming soon
// END MultiplePropSorting

// START AdditionalPropSorting
Coming soon
// END AdditionalPropSorting
