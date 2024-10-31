package io.weaviate.docs.quickstart_local;
import static org.assertj.core.api.Assertions.assertThat;

// START InstantiationExample
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;

public class IsReady {
  public static void main(String[] args) {
    Config config = new Config("http", "localhost:8080");

    WeaviateClient client = new WeaviateClient(config);

    // check the result
    Result<Boolean> result = client.misc().readyChecker().run();
    if (result.hasErrors()) {
      System.out.println(result.getError());
    } else {
      System.out.println(result.getResult());
    }

    // END InstantiationExample
    assertThat(result.getResult()).isTrue();
    // START InstantiationExample
  }
}
// END InstantiationExample
