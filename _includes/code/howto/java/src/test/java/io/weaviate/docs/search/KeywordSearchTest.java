package io.weaviate.docs.search;

import com.google.gson.GsonBuilder;
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.filters.Operator;
import io.weaviate.client.v1.filters.WhereFilter;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.argument.Bm25Argument;
import io.weaviate.client.v1.graphql.query.argument.GroupByArgument;
import io.weaviate.client.v1.graphql.query.argument.WhereArgument;
import io.weaviate.client.v1.graphql.query.builder.GetBuilder;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.client.v1.graphql.query.fields.Fields;
import io.weaviate.client.v1.schema.model.DataType;
import io.weaviate.client.v1.schema.model.Property;
import io.weaviate.client.v1.schema.model.Tokenization;
import io.weaviate.client.v1.schema.model.WeaviateClass;
import io.weaviate.docs.helper.EnvHelper;
import java.util.Arrays;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("keyword-search")
public class KeywordSearchTest {

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
  public void shouldPerformBasicSearch() {
    String className = "JeopardyQuestion";
    searchWithBM25(className);
    searchWithBM25Score(className);
    searchWithBM25OnSelectedProperties(className);
    searchWithBM25WithWeights(className);
    setTokenization(className);
    searchWithBM25LimitOffset(className);
    searchWithBM25LimitResultGroups(className);
    searchWithBM25GroupResult(className);
    searchWithBM25Filter(className);
  }

  private void searchWithBM25(String className) {
    // START Basic
    Bm25Argument keyword = Bm25Argument.builder()
      .query("food")
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
      })
      .build();

    String query = GetBuilder.builder()
      .className("JeopardyQuestion")
      .fields(fields)
      .withBm25Filter(keyword)
      .limit(3)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END Basic

    if (result.getError() != null) {
      System.out.printf("Error inserting object: %s\n", result.getError().getMessages());
    } else {
      String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
      System.out.println("The result is: " + json);
    }
  }

  private void searchWithBM25Score(String className) {
    // START Score
    Bm25Argument keyword = Bm25Argument.builder()
      .query("food")
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
        Field.builder().name("_additional").fields(new Field[]{
          Field.builder().name("score").build()
        }).build()
      })
      .build();

    String query = GetBuilder.builder()
      .className("JeopardyQuestion")
      .fields(fields)
      .withBm25Filter(keyword)
      .limit(3)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END Score
    if (result.getError() != null) {
      System.out.printf("Error inserting object: %s\n", result.getError().getMessages());
    } else {
      String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
      System.out.println("The result is: " + json);
    }
  }

  private void searchWithBM25OnSelectedProperties(String className) {
    // START Properties
    Bm25Argument keyword = Bm25Argument.builder()
      .query("food")
      .properties(new String[]{ "question" })
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
        Field.builder().name("_additional").fields(new Field[]{
          Field.builder().name("score").build()
        }).build()
      })
      .build();

    String query = GetBuilder.builder()
      .className("JeopardyQuestion")
      .fields(fields)
      .withBm25Filter(keyword)
      .limit(3)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END Properties
    if (result.getError() != null) {
      System.out.printf("Error inserting object: %s\n", result.getError().getMessages());
    } else {
      String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
      System.out.println("The result is: " + json);
    }
  }

  private void searchWithBM25WithWeights(String className) {
    // START Boost
    Bm25Argument keyword = Bm25Argument.builder()
      .query("food")
      .properties(new String[]{ "question^2", "answer" })
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
        Field.builder().name("_additional").fields(new Field[]{
          Field.builder().name("score").build()
        }).build()
      })
      .build();

    String query = GetBuilder.builder()
      .className("JeopardyQuestion")
      .fields(fields)
      .withBm25Filter(keyword)
      .limit(3)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END Boost
    if (result.getError() != null) {
      System.out.printf("Error inserting object: %s\n", result.getError().getMessages());
    } else {
      String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
      System.out.println("The result is: " + json);
    }
  }

  private void setTokenization(String className) {
    // START PropModuleSettings
    Property titleProperty = Property.builder()
      .name("title")
      .description("title of the article")
      .dataType(Arrays.asList(DataType.TEXT))
      .tokenization(Tokenization.LOWERCASE)
      .build();

    Property bodyProperty = Property.builder()
      .name("body")
      .description("body of the article")
      .dataType(Arrays.asList(DataType.TEXT))
      .tokenization(Tokenization.WHITESPACE)
      .build();

    //Add the defined properties to the class
    WeaviateClass articleClass = WeaviateClass.builder()
      .className("Article")
      .description("Article Class Description...")
      .properties(Arrays.asList(titleProperty, bodyProperty))
      .build();

    Result<Boolean> result = client.schema().classCreator()
      .withClass(articleClass)
      .run();
    // END PropModuleSettings
  }

  private void searchWithBM25LimitOffset(String className) {
    // START limit
    Bm25Argument keyword = Bm25Argument.builder()
      .query("safety")
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
      })
      .build();

    String query = GetBuilder.builder()
      .className("JeopardyQuestion")
      .fields(fields)
      .withBm25Filter(keyword)
      .limit(3)
      .offset(1)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END limit
    if (result.getError() != null) {
      System.out.printf("Error inserting object: %s\n", result.getError().getMessages());
    } else {
      String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
      System.out.println("The result is: " + json);
    }
  }

  private void searchWithBM25LimitResultGroups(String className) {
    // START autocut
    Bm25Argument keyword = Bm25Argument.builder()
      .query("safety")
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
      })
      .build();

    String query = GetBuilder.builder()
      .className("JeopardyQuestion")
      .fields(fields)
      .withBm25Filter(keyword)
      .autocut(1)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END autocut
    if (result.getError() != null) {
      System.out.printf("Error inserting object: %s\n", result.getError().getMessages());
    } else {
      String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
      System.out.println("The result is: " + json);
    }
  }

  private void searchWithBM25GroupResult(String className) {
    // START BM25GroupBy
    Bm25Argument keyword = Bm25Argument.builder()
      .query("California")
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("round").build()
      })
      .build();

    GroupByArgument groupBy = GroupByArgument.builder()
      .path(new String[]{ "round" })
      .groups(1)
      .objectsPerGroup(3)
      .build();

    String query = GetBuilder.builder()
      .className("JeopardyQuestion")
      .fields(fields)
      .withBm25Filter(keyword)
      .withGroupByArgument(groupBy)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END BM25GroupBy
    if (result.getError() != null) {
      System.out.printf("Error inserting object: %s\n", result.getError().getMessages());
    } else {
      String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
      System.out.println("The result is: " + json);
    }
  }

  private void searchWithBM25Filter(String className) {
    // START Filter
    Bm25Argument keyword = Bm25Argument.builder()
      .query("food")
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
        Field.builder().name("round").build(),
        Field.builder().name("_additional").fields(new Field[]{
          Field.builder().name("score").build()
        }).build()
      })
      .build();

    WhereFilter whereFilter = WhereFilter.builder()
      .path(new String[]{ "round" })  // Path to filter by
      .operator(Operator.Equal)
      .valueText("Double Jeopardy!")
      .build();

    WhereArgument whereArgument = WhereArgument.builder()
      .filter(whereFilter)
      .build();

    String query = GetBuilder.builder()
      .className("JeopardyQuestion")
      .fields(fields)
      .withBm25Filter(keyword)
      .withWhereFilter(whereArgument)
      .limit(3)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END Filter
    if (result.getError() != null) {
      System.out.printf("Error inserting object: %s\n", result.getError().getMessages());
    } else {
      String json = new GsonBuilder().setPrettyPrinting().create().toJson(result.getResult());
      System.out.println("The result is: " + json);
    }

  }
}
