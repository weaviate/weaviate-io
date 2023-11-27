package io.weaviate.docs;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.SerializedName;
import com.google.gson.reflect.TypeToken;
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.batch.api.ObjectsBatcher;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.misc.model.PQConfig;
import io.weaviate.client.v1.misc.model.VectorIndexConfig;
import io.weaviate.client.v1.schema.model.DataType;
import io.weaviate.client.v1.schema.model.Property;
import io.weaviate.client.v1.schema.model.WeaviateClass;
import io.weaviate.docs.helper.EnvHelper;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.URL;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Tag("pq")
class PqCompressionTest {

  private static WeaviateClient client;

  @BeforeAll
  public static void beforeAll() {
    String scheme = EnvHelper.scheme("http");
    String host = EnvHelper.host("localhost");
    String port = EnvHelper.port("8080");
    String openaiApiKey = EnvHelper.env("OPENAI_APIKEY", "_dummy_");

    Config config = new Config(scheme, host + ":" + port, new HashMap<String, String>() {{
      put("X-Openai-Api-Key", openaiApiKey);
    }});
    client = new WeaviateClient(config);

/*
    // START ConnectCode
    Config config = new Config("http", "localhost:8080", new HashMap<String, String>() {{
      put("X-Openai-Api-Key", "OPENAI_API_KEY"); // Replace with your OpenAI API key
    }});

    WeaviateClient client = new WeaviateClient(config);
    // END ConnectCode
*/

    Result<Boolean> result = client.schema().allDeleter().run();
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(true, Result::getResult);
  }

    // START DownloadData
    public static class Jeopardy {
      @SerializedName("Air Date")
      public Date airDate;
      @SerializedName("Round")
      public String round;
      @SerializedName("Value")
      public Integer value;
      @SerializedName("Category")
      public String category;
      @SerializedName("Question")
      public String question;
      @SerializedName("Answer")
      public String answer;
    }

    // END DownloadData

  private List<Jeopardy> downloadFile() throws IOException {
    // START DownloadData
    URL url = new URL("https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/jeopardy_1k.json");
    InputStreamReader reader = new InputStreamReader(url.openStream());

    Type listType = new TypeToken<List<Jeopardy>>(){}.getType();
    List<Jeopardy> jeopardyList = new Gson().fromJson(reader, listType);
    // END DownloadData
    return jeopardyList;
  }

  private List<Property> properties() {
    // START InitialSchema
    List<Property> properties = Arrays.asList(
      Property.builder()
        .name("airDate")
        .dataType(Arrays.asList(DataType.DATE))
        .build(),
      Property.builder()
        .name("round")
        .dataType(Arrays.asList(DataType.TEXT))
        .build(),
      Property.builder()
        .name("value")
        .dataType(Arrays.asList(DataType.INT))
        .build(),
      Property.builder()
        .name("category")
        .dataType(Arrays.asList(DataType.TEXT))
        .build(),
      Property.builder()
        .name("question")
        .dataType(Arrays.asList(DataType.TEXT))
        .build(),
      Property.builder()
        .name("answer")
        .dataType(Arrays.asList(DataType.TEXT))
        .build()
    );

    // END InitialSchema

    return properties;
  }

  private void createClass() {
    List<Property> properties = properties();

    // START InitialSchema
    WeaviateClass jeopardyClass = WeaviateClass.builder()
      .className("Question")
      .description("A Jeopardy! question")
      .properties(properties)
      .vectorizer("text2vec-openai")
      .build();

    Result<Boolean> createResult = client.schema().classCreator()
      .withClass(jeopardyClass)
      .run();
    // END InitialSchema

    assertThat(createResult).isNotNull()
      .withFailMessage(() -> createResult.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(true, Result::getResult);
  }

  private void populate(List<Jeopardy> jeopardyList) {
    // START LoadData
    ObjectsBatcher batcher = client.batch().objectsAutoBatcher();

    jeopardyList.forEach(jeopardy -> {
      WeaviateObject object = WeaviateObject.builder()
        .className("Question")
        .properties(new HashMap<String, Object>() {{
          put("airDate", DateFormatUtils.format(jeopardy.airDate, "yyyy-MM-dd'T'HH:mm:ssZZZZZ"));
          put("round", jeopardy.round);
          put("value", jeopardy.value);
          put("category", jeopardy.category);
          put("question", jeopardy.question);
          put("answer", jeopardy.answer);
        }})
        .build();

      batcher.withObject(object);
    });

    batcher.flush();
    batcher.close();
    // END LoadData
  }

  private void updateClass() {
    List<Property> properties = properties();

    // START UpdateSchema
    WeaviateClass updatedJeopardyClass = WeaviateClass.builder()
      .className("Question")
      .description("A Jeopardy! question")
      .properties(properties)
      .vectorizer("text2vec-openai")
      .vectorIndexConfig(VectorIndexConfig.builder()
        .pq(PQConfig.builder()
          .enabled(true)
          .trainingLimit(100_000)
          .segments(96)
          .build())
        .build())
      .build();

    Result<Boolean> updateResult = client.schema().classUpdater()
      .withClass(updatedJeopardyClass)
      .run();
    // END UpdateSchema

    assertThat(updateResult).isNotNull()
      .withFailMessage(() -> updateResult.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(true, Result::getResult);
  }

  private void verifyClassUpdated() {
    // START GetSchema
    Result<WeaviateClass> getResult = client.schema().classGetter()
      .withClassName("Question")
      .run();

    // END GetSchema

    assertThat(getResult).isNotNull()
      .withFailMessage(() -> getResult.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .extracting(Result::getResult).isNotNull()
      .extracting(WeaviateClass::getVectorIndexConfig).isNotNull()
      .extracting(VectorIndexConfig::getPq).isNotNull()
      .returns(true, PQConfig::getEnabled)
      .returns(96, PQConfig::getSegments)
      .returns(100_000, PQConfig::getTrainingLimit);

    // START GetSchema
    PQConfig pqConfig = getResult.getResult().getVectorIndexConfig().getPq();
    String json = new GsonBuilder().setPrettyPrinting().create().toJson(pqConfig);
    System.out.println(json);
    // END GetSchema
  }

  @Test
  public void shouldCompressPQ() throws IOException {
    List<Jeopardy> jeopardyList = downloadFile();
    createClass();
    populate(jeopardyList);
    updateClass();
    verifyClassUpdated();
  }
}
