package io.weaviate.docs.quickstart_local;

// START CreateCollection
import java.util.HashMap;
import java.util.Map;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.schema.model.WeaviateClass;

public class CreateCollection {
  public static void main(String[] args) {
    Config config = new Config("http", "localhost:8080");  // Replace with your Weaviate endpoint

    WeaviateClient client = new WeaviateClient(config);

    // END CreateCollection
    client.schema().classDeleter().withClassName("Question").run();

    // START CreateCollection
    // highlight-start
    Map<String, Object> text2vecOllamaSettings = new HashMap<>();
    text2vecOllamaSettings.put("apiEndpoint", "http://host.docker.internal:11434"); // Allow Weaviate from within a Docker container to contact your Ollama instance
    text2vecOllamaSettings.put("model", "nomic-embed-text"); // The model to use

    Map<String, Object> generativeOllamaSettings = new HashMap<>();
    generativeOllamaSettings.put("apiEndpoint", "http://host.docker.internal:11434"); // Allow Weaviate from within a Docker container to contact your Ollama instance
    generativeOllamaSettings.put("model", "llama3.2"); // The model to use

    Map<String, Map<String, Object>> moduleConfig = new HashMap<>();
    moduleConfig.put("text2vec-ollama", text2vecOllamaSettings);
    moduleConfig.put("generative-ollama", generativeOllamaSettings);

    // Create the collection "Question"
    WeaviateClass clazz = WeaviateClass.builder()
      .className("Question")
      .vectorizer("text2vec-ollama")
      .moduleConfig(moduleConfig)
      .build();
    // highlight-end

    // Review the response
    Result<Boolean> result = client.schema().classCreator().withClass(clazz).run();
    System.out.println(result);
    Result<WeaviateClass> collectionDefinition = client.schema().classGetter().withClassName("Question").run();
    System.out.println(collectionDefinition.getResult());
  }
}
// END CreateCollection
