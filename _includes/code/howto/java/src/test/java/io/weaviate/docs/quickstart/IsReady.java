package io.weaviate.docs.quickstart;

// START InstantiationExample
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.base.Result;

// END InstantiationExample
import static org.assertj.core.api.Assertions.assertThat;

// START InstantiationExample
// Set these environment variables
// WEAVIATE_HOSTNAME     Your Weaviate instance hostname
// WEAVIATE_API_KEY      Your Weaviate instance API key

public class IsReady {
  public static void main(String[] args) throws Exception {
    String host = System.getenv("WEAVIATE_HOSTNAME");
    String apiKey = System.getenv("WEAVIATE_API_KEY");

    // highlight-start
    Config config = new Config("https", host);
    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);
    // highlight-end

    // check the result
    Result<Boolean> result = client.misc().readyChecker().run();
    System.out.println(result.getResult());

    // END InstantiationExample
    assertThat(result.getResult()).isTrue();
    // START InstantiationExample
  }
}
// END InstantiationExample
