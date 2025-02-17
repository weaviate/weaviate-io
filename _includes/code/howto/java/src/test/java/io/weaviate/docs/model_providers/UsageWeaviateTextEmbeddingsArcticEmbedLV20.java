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

public class UsageWeaviateTextEmbeddings {
  public static void main(String[] args) throws Exception {

    String host = System.getenv("WCD_HOSTNAME");
    String apiKey = System.getenv("WCD_API_KEY");

    Config config = new Config("https", host);

    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);

    client.schema().classDeleter().withClassName("DemoCollection").run();

    // START BasicVectorizerWeaviate  // START VectorizerWeaviateCustomModel  // START SnowflakeArcticEmbedLV20
    Map<String, Object> text2vecWeaviate = new HashMap<>();
    Map<String, Object> text2vecWeaviateSettings = new HashMap<>();

    text2vecWeaviateSettings.put("properties", new String[]{"title"});
    // END BasicVectorizerWeaviate  // START VectorizerWeaviateCustomModel  // START SnowflakeArcticEmbedLV20
    text2vecWeaviateSettings.put("model", new String[]{"Snowflake/snowflake-arctic-embed-l-v2.0"});
    // END BasicVectorizerWeaviate  // END VectorizerWeaviateCustomModel  // START SnowflakeArcticEmbedLV20
    text2vecWeaviateSettings.put("dimensions", new Integer[]{768});  // 768, 256
    text2vecWeaviateSettings.put("base_url", new String[]{"<custom_weaviate_url>"});
    // START BasicVectorizerWeaviate // START VectorizerWeaviateCustomModel  // START SnowflakeArcticEmbedLV20
    text2vecWeaviate.put("text2vec-weaviate", text2vecWeaviateSettings);

    // Define the vector configurations
    Map<String, WeaviateClass.VectorConfig> vectorConfig = new HashMap<>();
    vectorConfig.put("title_vector", WeaviateClass.VectorConfig.builder()
      .vectorIndexType("hnsw")
      .vectorizer(text2vecWeaviate)
      .build());

    // Create the collection "DemoCollection"
    WeaviateClass clazz = WeaviateClass.builder()
      .className("DemoCollection")
      .vectorConfig(vectorConfig)
      .build();

    Result<Boolean> result = client.schema().classCreator().withClass(clazz).run();
    // END BasicVectorizerWeaviate  // END VectorizerWeaviateCustomModel  // END SnowflakeArcticEmbedLV20
  }
}
