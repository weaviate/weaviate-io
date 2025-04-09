package io.weaviate.docs.model_providers;

// START-ANY
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;

// END-ANY
import static org.assertj.core.api.Assertions.assertThat;

// START-ANY
public class ConnectWeaviateEmbeddings {
  public static void main(String[] args) throws Exception {

    // Best practice: store your credentials in environment variables
    String weaviateUrl = System.getenv("WEAVIATE_URL");      // Weaviate URL: "REST Endpoint" in Weaviate Cloud console
    String weaviateKey = System.getenv("WEAVIATE_API_KEY");  // Weaviate API key: "ADMIN" API key in Weaviate Cloud console

    // highlight-start
    Map<String, String> headers = new HashMap<String, String>() { {
      put("X-Weaviate-Api-Key", weaviateKey);
      put("X-Weaviate-Cluster-Url", "https://" + weaviateUrl);
    } };

    // highlight-start
    Config config = new Config("https", weaviateUrl, headers);
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
