package io.weaviate.docs.quickstart;

// START CreateCollection

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.schema.model.WeaviateClass;

import java.util.HashMap;
import java.util.Map;

// Set these environment variables
// WCD_HOSTNAME     Your Weaviate instance hostname
// WCD_API_KEY      Your Weaviate instance API key

public class CreateCollection {
  public static void main(String[] args) throws Exception {

    String host = System.getenv("WCD_HOSTNAME");
    String apiKey = System.getenv("WCD_API_KEY");

    Config config = new Config("https", host);
    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);

    // END CreateCollection
    client.schema().classDeleter().withClassName("Question").run();

    // START CreateCollection
    // highlight-start
    Map<String, Object> text2vecCohereSettings = new HashMap<>();
    Map<String, Object> generativeCohereSettings = new HashMap<>();

    Map<String, Object> moduleConfig = new HashMap<>();
    moduleConfig.put("text2vec-cohere", CohereSettings);
    moduleConfig.put("generative-cohere", generativeCohereSettings);

    // Create the collection "Question"
    WeaviateClass clazz = WeaviateClass.builder()
      .className("Question")
      .vectorizer("text2vec-cohere")
      .moduleConfig(moduleConfig)
      .build();
    // highlight-end

    // Review the response
    Result<Boolean> result = client.schema().classCreator().withClass(clazz).run();
    System.out.println(result);
    Result<WeaviateClass> collectionDefinition = client.schema().classGetter().withClassName("Question").run();
    System.out.println(collectionDefinition.getResult());
  }
}
// END CreateCollection
