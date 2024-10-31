package io.weaviate.docs.quickstart_local;

// START RAG
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.argument.NearTextArgument;;
import io.weaviate.client.v1.graphql.query.builder.GetBuilder;
import io.weaviate.client.v1.graphql.query.fields.GenerativeSearchBuilder;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.client.v1.graphql.query.fields.Fields;

public class RAG {
  public static void main(String[] args) {
    Config config = new Config("http", "localhost:8080");  // Replace with your Weaviate endpoint

    WeaviateClient client = new WeaviateClient(config);

    // highlight-start
    NearTextArgument nearText = NearTextArgument.builder()
      .concepts(new String[]{"biology"})
      .build();

    GenerativeSearchBuilder ragQuery = GenerativeSearchBuilder.builder()
      .groupedResultTask("Write a tweet with emojis about these facts.")
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
      })
      .build();

    String query = GetBuilder.builder()
      .className("Question")
      .fields(fields)
      .withNearTextFilter(nearText)
      .withGenerativeSearch(ragQuery)
      .limit(2)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // highlight-end
    System.out.println(result.getResult());
  }
}
// END RAG
