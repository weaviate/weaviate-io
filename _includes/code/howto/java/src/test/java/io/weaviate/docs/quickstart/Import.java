package io.weaviate.docs.quickstart;

// START Import

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.v1.batch.api.ObjectsBatcher;
import io.weaviate.client.v1.data.model.WeaviateObject;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

// Set these environment variables
// WCD_HOSTNAME     Your Weaviate instance hostname
// WCD_API_KEY      Your Weaviate instance API key
// COHERE_APIKEY    Your Cohere API key

public class Import {
  public static void main(String[] args) throws Exception {

    String host = System.getenv("WCD_HOSTNAME");
    String apiKey = System.getenv("WCD_API_KEY");
    String cohereKey = System.getenv("COHERE_APIKEY");

    // highlight-start
    Map<String, String> headers = new HashMap<String, String>() { {
      put("X-Cohere-Api-Key", cohereKey);
    } };

    Config config = new Config("https", host, headers);
    // highlight-end
    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);

    // Get JSON data
    URL url = new URL("https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json");
    String jsonData = new BufferedReader(new InputStreamReader(((HttpURLConnection) url.openConnection()).getInputStream()))
      .lines().reduce("", String::concat);

    // highlight-start
    // Create and execute batch
    ObjectsBatcher batcher = client.batch().objectsBatcher();

    new JSONArray(jsonData).forEach(item -> {
      JSONObject json = (JSONObject) item;
      HashMap<String, Object> properties = new HashMap<>();
      properties.put("category", json.getString("Category"));
      properties.put("question", json.getString("Question"));
      properties.put("answer", json.getString("Answer"));

      batcher.withObject(WeaviateObject.builder()
        .className("Question")
        .properties(properties)
        .build());
    });

    // Flush
    batcher.run();
    // highlight-end
  }
}
// END Import

