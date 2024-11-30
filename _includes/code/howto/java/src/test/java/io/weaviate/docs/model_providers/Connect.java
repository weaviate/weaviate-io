package io.weaviate.docs.model_providers;

// START-ANY
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;

// END-ANY

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

// START-ANY
// Set these environment variables
// WCD_HOSTNAME         Your Weaviate instance hostname
// WCD_API_KEY          Your Weaviate instance API key
// <PROVIDER>_APIKEY    Your model provider API key

public class Connect {
  public static void main(String[] args) throws Exception {

    String host = System.getenv("WCD_HOSTNAME");
    String apiKey = System.getenv("WCD_API_KEY");
    String cohereKey = System.getenv("COHERE_APIKEY");

    // highlight-start
    Map<String, String> headers = new HashMap<String, String>() { {
      // END-ANY
      // START CohereInstantiation
      put("X-Cohere-Api-Key", cohereKey);
      // END CohereInstantiation
      // START-ANY
    } };

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
