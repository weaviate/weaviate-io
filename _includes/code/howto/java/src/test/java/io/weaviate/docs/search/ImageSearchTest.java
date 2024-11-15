package io.weaviate.docs.search;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.argument.NearImageArgument;
import io.weaviate.client.v1.graphql.query.builder.GetBuilder;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.client.v1.graphql.query.fields.Fields;
import io.weaviate.docs.helper.EnvHelper;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Base64;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("image-search")
public class ImageSearchTest {

  private static WeaviateClient client;

  @BeforeAll
  public static void beforeAll() {
    String scheme = EnvHelper.scheme("http");
    String host = EnvHelper.host("localhost");
    String port = EnvHelper.port("8080");

    Config config = new Config(scheme, host + ":" + port);
    client = new WeaviateClient(config);

    Result<Boolean> result = client.schema().allDeleter().run();
    assertThat(result).isNotNull()
      .withFailMessage(() -> result.getError().toString())
      .returns(false, Result::hasErrors)
      .withFailMessage(null)
      .returns(true, Result::getResult);
  }

  @Test
  public void shouldPerformImageSearch() {
    String className = "Dog";
    searchWithNearLocalImage(className);
    searchWithNearBase64Image(className);
    urlToBase64();
  }

  private void searchWithNearLocalImage(String className) {
    // START ImageFileSearch
    NearImageArgument nearImage = NearImageArgument.builder()
      .imageFile(new File("./images/search-image.jpg"))
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("Breed").build()
      })
      .build();

    String query = GetBuilder.builder()
      .className(className)
      .fields(fields)
      .withNearImageFilter(nearImage)
      .limit(1)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END ImageFileSearch
  }

  private void searchWithNearBase64Image(String className) {
    // START search with base64
    String base64_string = "SOME_BASE_64_REPRESENTATION";

    NearImageArgument nearImage = NearImageArgument.builder()
      .image(base64_string)
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("Breed").build()
      })
      .build();

    String query = GetBuilder.builder()
      .className(className)
      .fields(fields)
      .withNearImageFilter(nearImage)
      .limit(1)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END search with base64
  }

  private void urlToBase64() {
    // START helper base64 functions
    try {
      // Open the input stream for the image URL
      URL url = new URL("https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Deutsches_Museum_Portrait_4.jpg/500px-Deutsches_Museum_Portrait_4.jpg");
      InputStream inputStream = url.openStream();
      // Read the image bytes into a ByteArrayOutputStream
      ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
      byte[] buffer = new byte[8192];
      int bytesRead;
      while ((bytesRead = inputStream.read(buffer)) != -1) {
        outputStream.write(buffer, 0, bytesRead);
      }
      // Convert the bytes to a base64 encoded string
      byte[] imageBytes = outputStream.toByteArray();
      String base64String = Base64.getEncoder().encodeToString(imageBytes);
      System.out.println(base64String);

      inputStream.close();
      outputStream.close();
    } catch (IOException e) {
      System.err.println("Error occurred while converting image to base64: " + e.getMessage());
      e.printStackTrace();
    }
    // END helper base64 functions
  }

}
