package io.weaviate.docs.quickstart;

// START NearText
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.argument.NearTextArgument;
import io.weaviate.client.v1.graphql.query.builder.GetBuilder;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.client.v1.graphql.query.fields.Fields;

import java.util.HashMap;
import java.util.Map;

// Set these environment variables
// WCD_HOSTNAME     Your Weaviate instance hostname
// WCD_API_KEY      Your Weaviate instance API key

public class NearText {
  public static void main(String[] args) throws Exception {

    String host = System.getenv("WCD_HOSTNAME");
    String apiKey = System.getenv("WCD_API_KEY");
    String OpenAIKey = System.getenv("OPENAI_API_KEY");

    Map<String, String> headers = new HashMap<String, String>() { {
      put("X-OpenAI-Api-Key", OpenAIKey);
    } };

    Config config = new Config("https", host, headers);
    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);

    NearTextArgument nearText = NearTextArgument.builder()
      .concepts(new String[]{"biology"})
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
      .limit(2)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();

    if (result.hasErrors()) {
      System.out.println(result.getError());
    } else {
      System.out.println(result.getResult());
    }
  }
}
// END NearText
