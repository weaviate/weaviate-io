package io.weaviate.docs.model_providers;

// START-ANY
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;

// END-ANY
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

// START-ANY
public class ConnectWeaviateEmbeddingsTest {
  // END-ANY
  @Test
  // START-ANY
  public void shouldConnectToWeaviate() throws Exception {

    // Best practice: store your credentials in environment variables
    String weaviateHost = System.getenv("WEAVIATE_HOSTNAME"); // Weaviate hostname: "REST Endpoint" in Weaviate Cloud console
    String weaviateKey = System.getenv("WEAVIATE_API_KEY");   // Weaviate API key: "ADMIN" API key in Weaviate Cloud console

    // highlight-start
    Config config = new Config("https", weaviateHost);
    // highlight-end
    WeaviateClient client = WeaviateAuthClient.apiKey(config, weaviateKey);

    // check the result
    Result<Boolean> result = client.misc().readyChecker().run();
    System.out.println(result.getResult());

    // END-ANY
    assertThat(result.getResult()).isTrue();
    // START-ANY
  }
}
// END-ANY
