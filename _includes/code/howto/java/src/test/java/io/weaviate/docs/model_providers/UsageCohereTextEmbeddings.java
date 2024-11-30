package io.weaviate.docs.model_providers;

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
// <PROVIDER>_APIKEY    Your Provider API key

public class UsageCohereTextEmbeddings {
  public static void main(String[] args) throws Exception {

    String host = System.getenv("WCD_HOSTNAME");
    String apiKey = System.getenv("WCD_API_KEY");
    String cohereKey = System.getenv("COHERE_APIKEY");

    Map<String, String> headers = new HashMap<String, String>() {
      {
        put("X-Cohere-Api-Key", cohereKey);
      }
    };

    Config config = new Config("https", host, headers);

    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);

    client.schema().classDeleter().withClassName("DemoCollection").run();

    // START BasicVectorizerCohere  // START VectorizerCohereCustomModel  // START FullVectorizerCohere
    Map<String, Object> text2vecCohere = new HashMap<>();
    Map<String, Object> text2vecCohereSettings = new HashMap<>();

    text2vecCohereSettings.put("properties", new String[]{"title"});
    // END BasicVectorizerCohere  // START VectorizerCohereCustomModel  // START FullVectorizerCohere
    text2vecCohereSettings.put("model", new String[]{"embed-multilingual-light-v3.0"});
    // END BasicVectorizerCohere  // END VectorizerCohereCustomModel  // START FullVectorizerCohere
    // text2vecCohereSettings.put("truncate", new String[]{"END"});  // "NONE", "START" or "END"
    // text2vecCohereSettings.put("base_url", new String[]{"<custom_cohere_url>"});
    // START BasicVectorizerCohere // START VectorizerCohereCustomModel  // START FullVectorizerCohere
    text2vecCohere.put("text2vec-cohere", text2vecCohereSettings);

    // Define the vector configurations
    Map<String, WeaviateClass.VectorConfig> vectorConfig = new HashMap<>();
    vectorConfig.put("title_vector", WeaviateClass.VectorConfig.builder()
      .vectorIndexType("hnsw")
      .vectorizer(text2vecCohere)
      .build());

    // Create the collection "DemoCollection"
    WeaviateClass clazz = WeaviateClass.builder()
      .className("DemoCollection")
      .vectorConfig(vectorConfig)
      .build();

    Result<Boolean> result = client.schema().classCreator().withClass(clazz).run();
    // END BasicVectorizerCohere  // END VectorizerCohereCustomModel  // END FullVectorizerCohere
  }
}
