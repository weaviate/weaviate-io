package io.weaviate.docs.model_providers;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.batch.api.ObjectsBatcher;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.schema.model.WeaviateClass;
import io.weaviate.client.v1.graphql.query.argument.NearTextArgument;
import io.weaviate.client.v1.graphql.query.argument.HybridArgument;
import io.weaviate.client.v1.graphql.query.builder.GetBuilder;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.client.v1.graphql.query.fields.Fields;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

// Set these environment variables
// WCD_HOSTNAME     Your Weaviate instance hostname
// WCD_API_KEY      Your Weaviate instance API key
// <PROVIDER>_APIKEY    Your Provider API key

public class UsageText {
  public static void main(String[] args) throws Exception {

    String host = System.getenv("WCD_HOSTNAME");
    String apiKey = System.getenv("WCD_API_KEY");
    String cohereKey = System.getenv("COHERE_APIKEY");

    Map<String, String> headers = new HashMap<String, String>() {
      {
        put("X-Cohere-Api-Key", cohereKey);
      }
    };

    Config config = new Config("https", host, headers);

    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);

    client.schema().classDeleter().withClassName("DemoCollection").run();

    // START BasicVectorizerCohere  // START VectorizerCohereCustomModel  // START FullVectorizerCohere
    Map<String, Object> text2vecCohere = new HashMap<>();
    Map<String, Object> text2vecCohereSettings = new HashMap<>();

    text2vecCohereSettings.put("properties", new String[]{"title"});
    // END BasicVectorizerCohere  // START VectorizerCohereCustomModel  // START FullVectorizerCohere
    text2vecCohereSettings.put("model", new String[]{"embed-multilingual-light-v3.0"});
    // END BasicVectorizerCohere  // END VectorizerCohereCustomModel  // START FullVectorizerCohere
    // text2vecCohereSettings.put("truncate", new String[]{"END"});  // "NONE", "START" or "END"
    // text2vecCohereSettings.put("base_url", new String[]{"<custom_cohere_url>"});
    // START BasicVectorizerCohere // START VectorizerCohereCustomModel  // START FullVectorizerCohere
    text2vecCohere.put("text2vec-cohere", text2vecCohereSettings);

    // Define the vector configurations
    Map<String, WeaviateClass.VectorConfig> vectorConfig = new HashMap<>();
    vectorConfig.put("title_vector", WeaviateClass.VectorConfig.builder()
      .vectorIndexType("hnsw")
      .vectorizer(text2vecCohere)
      .build());

    // Create the collection "DemoCollection"
    WeaviateClass clazz = WeaviateClass.builder()
      .className("DemoCollection")
      .vectorConfig(vectorConfig)
      .build();
    // END BasicVectorizerCohere  // END VectorizerCohereCustomModel  // END FullVectorizerCohere

    Result<Boolean> result = client.schema().classCreator().withClass(clazz).run();

    // Define source objects
    List<Map<String, String>> sourceObjects = Arrays.asList(
      new HashMap<String, String>() {{
        put("title", "The Shawshank Redemption");
        put("description", "");
      }},
      new HashMap<String, String>() {{
        put("title", "The Godfather");
        put("description", "");
      }},
      new HashMap<String, String>() {{
        put("title", "The Dark Knight");
        put("description", "");
      }},
      new HashMap<String, String>() {{
        put("title", "Jingle All the Way");
        put("description", "");
      }},
      new HashMap<String, String>() {{
        put("title", "A Christmas Carol");
        put("description", "");
      }}
    );

    // START BatchImportExample
    // Convert items into a list of PropertySchema
    List<HashMap<String, Object>> objects = new ArrayList<>();
    for (Map<String, String> sourceObject : sourceObjects) {
      HashMap<String, Object> schema = new HashMap<>();
      schema.put("title", sourceObject.get("title"));
      schema.put("description", sourceObject.get("description"));
      objects.add(schema);
    }

    // Batch write items
    ObjectsBatcher batcher = client.batch().objectsBatcher();
    for (Map<String, Object> properties : objects) {
      batcher.withObject(WeaviateObject.builder()
        .className("DemoCollection")
        .properties(properties)
        // .tenant("tenantA")  // If multi-tenancy is enabled, specify the tenant to which the object will be added.
        .build()
      );
    }

    // Flush
    batcher.run();
    // END BatchImportExample

    // START NearTextExample
    // highlight-start
    Fields returnFields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("title").build(),
      })
      .build();

    NearTextArgument nearText = NearTextArgument.builder()
      .concepts(new String[]{"A holiday film"})
      .build();

    String nearTextQuery = GetBuilder.builder()
      .className("DemoCollection")
      .fields(returnFields)
      .withNearTextFilter(nearText)
      .limit(2)
      .build()
      .buildQuery();
    // highlight-end

    Result<GraphQLResponse> nearTextResult = client.graphQL().raw().withQuery(nearTextQuery).run();

    if (nearTextResult.hasErrors()) {
      System.err.println(nearTextResult.getError());
    } else {
      System.out.println("Near Text Results: " + nearTextResult.getResult().getData());
    }
    // END NearTextExample

    // START HybridExample
    // highlight-start
    HybridArgument hybrid = HybridArgument.builder()
      .query("A holiday film")
      .build();

    String hybridQuery = GetBuilder.builder()
      .className("DemoCollection")
      .fields(returnFields)
      .withHybridFilter(hybrid)
      .limit(2)
      .build()
      .buildQuery();
    // highlight-end

    Result<GraphQLResponse> hybridResult = client.graphQL().raw().withQuery(hybridQuery).run();

    if (hybridResult.hasErrors()) {
      System.err.println(hybridResult.getError());
    } else {
      System.out.println("Hybrid Results: " + hybridResult.getResult().getData());
    }
    // END HybridExample
  }
}
