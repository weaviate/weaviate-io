package io.weaviate.docs.quickstart;
import static org.assertj.core.api.Assertions.assertThat;

// START InstantiationExample
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.base.Result;

// Set these environment variables
// WCD_HOSTNAME     Your Weaviate instance hostname
// WCD_API_KEY      Your Weaviate instance API key
// OPENAI_API_KEY   Your OpenAI API key

public class IsReady {
  public static void main(String[] args) throws Exception {
    String host = System.getenv("WCD_HOSTNAME");
    String apiKey = System.getenv("WCD_API_KEY");

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
