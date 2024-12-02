package io.weaviate.docs.model_providers;

// START-ANY

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;

import static org.assertj.core.api.Assertions.assertThat;

// START-ANY
// Set these environment variables
// WCD_HOSTNAME         Your Weaviate instance hostname
// WCD_API_KEY          Your Weaviate instance API key

public class ConnectWeaviateEmbeddings {
  public static void main(String[] args) throws Exception {

    String host = System.getenv("WCD_W_EMB_HOSTNAME");
    String apiKey = System.getenv("WCD_W_EMB_API_KEY");

    // highlight-start
    Map<String, String> headers = new HashMap<String, String>() { {
      put("X-Weaviate-Api-Key", apiKey);
      put("X-Weaviate-Cluster-Url", "https://" + System.getenv("WCD_W_EMB_HOSTNAME"));
    } };

    // highlight-start
    Config config = new Config("https", host, headers);
    // highlight-end
    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);

    // check the result
    Result<Boolean> result = client.misc().readyChecker().run();
    System.out.println(result.getResult());

    // END-ANY
    assertThat(result.getResult()).isTrue();
    // START-ANY
  }
}
// END-ANY
