package io.weaviate.docs.quickstart;

// START RAG

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.argument.NearTextArgument;
import io.weaviate.client.v1.graphql.query.builder.GetBuilder;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.client.v1.graphql.query.fields.Fields;
import io.weaviate.client.v1.graphql.query.fields.GenerativeSearchBuilder;

import java.util.HashMap;
import java.util.Map;

// Set these environment variables
// WEAVIATE_HOSTNAME     Your Weaviate instance hostname
// WEAVIATE_API_KEY      Your Weaviate instance API key
// COHERE_APIKEY    Your Cohere API key

public class RAG {
  public static void main(String[] args) throws Exception {

    String host = System.getenv("WEAVIATE_HOSTNAME");
    String apiKey = System.getenv("WEAVIATE_API_KEY");
    String cohereKey = System.getenv("COHERE_APIKEY");

    // highlight-start
    Map<String, String> headers = new HashMap<String, String>() { {
      put("X-Cohere-Api-Key", cohereKey);
    } };

    Config config = new Config("https", host, headers);
    // highlight-end
    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);

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
