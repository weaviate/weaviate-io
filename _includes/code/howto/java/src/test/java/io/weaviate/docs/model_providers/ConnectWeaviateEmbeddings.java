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

    String host = System.getenv("WCD_HOSTNAME");
    String apiKey = System.getenv("WCD_API_KEY");

    // highlight-start
    Config config = new Config("https", host);
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
