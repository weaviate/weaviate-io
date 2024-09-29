package io.weaviate.docs.search;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.filters.Operator;
import io.weaviate.client.v1.filters.WhereFilter;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.argument.GroupByArgument;
import io.weaviate.client.v1.graphql.query.argument.NearImageArgument;
import io.weaviate.client.v1.graphql.query.argument.NearObjectArgument;
import io.weaviate.client.v1.graphql.query.argument.NearTextArgument;
import io.weaviate.client.v1.graphql.query.argument.NearVectorArgument;
import io.weaviate.client.v1.graphql.query.argument.WhereArgument;
import io.weaviate.client.v1.graphql.query.builder.GetBuilder;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.client.v1.graphql.query.fields.Fields;
import io.weaviate.docs.helper.EnvHelper;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("crud")
@Tag("vector-search")
public class VectorSearchTest {

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
  public void shouldPerformVectorSearch() {
    String className = "JeopardyQuestion";

    searchWithNearText(className);
    searchWithNearImage(className);
    searchWithNearObject(className);
    searchWithNearVector(className);
    searchWithNamedVector(className);
    searchWithSimilarityThreshold(className);
    searchWithLimitOffset(className);
    searchWithAutoCut(className);
    searchWithGroupBy(className);
    searchWithFilter(className);
  }

  private void searchWithNearText(String className) {
    // START GetNearText
    NearTextArgument nearText = NearTextArgument.builder()
      .concepts(new String[]{ "animals in movies" })
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
        Field.builder().name("_additional").fields(new Field[]{
          Field.builder().name("distance").build()
        }).build()
      })
      .build();

    String query = GetBuilder.builder()
      .className(className)
      .fields(fields)
      .withNearTextFilter(nearText)
      .limit(2)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END GetNearText
  }

  private void searchWithNearImage(String className) {
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

  private void searchWithNearObject(String className) {
    // START GetNearObject
    String id = "0b7235c5-86f1-48a9-baab-3b9571dca854";

    NearObjectArgument nearObject = NearObjectArgument.builder()
      .id(id)
      .build();

    String query = GetBuilder.builder()
      .className(className)
      .withNearObjectFilter(nearObject)
      .limit(2)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END GetNearObject
  }

  private void searchWithNearVector(String className) {
    // START GetNearVector
    Float[] vector = { -0.0125526935f, -0.021168863f, -0.01076519f, -0.02589537f, -0.0070362035f,
      0.019870078f, -0.010001986f, -0.019120263f, 0.00090044655f, -0.017393013f };

    NearVectorArgument nearVector = NearVectorArgument.builder()
      .vector(vector)
      .build();

    String query = GetBuilder.builder()
      .className(className)
      .withNearVectorFilter(nearVector)
      .limit(2)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END GetNearVector
    if (result.getError() != null) {
      System.out.println("Error performing vector search: " + result.getError().getMessages());
    } else {
      System.out.println("Vector search result: " + result.getResult().getData());
    }
  }

  private void searchWithNamedVector(String className) {
    // START NamedVectorNearText
    String[] target_vector = { "title_country" };

    NearTextArgument nearText = NearTextArgument.builder()
      .concepts(new String[]{ "a sweet German white wine" })
      .targetVectors(target_vector)
      .build();

    String query = GetBuilder.builder()
      .className(className)
      .withNearTextFilter(nearText)
      .limit(1)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END NamedVectorNearText

    if (result.getError() != null) {
      System.out.println("Error performing vector search: " + result.getError().getMessages());
    } else {
      System.out.println("Vector search result: " + result.getResult().getData());
    }

  }

  private void searchWithSimilarityThreshold(String className) {
    // START GetWithDistance
    NearTextArgument nearText = NearTextArgument.builder()
      .concepts(new String[]{ "animals in movies" })
      .distance(0.25f)
      .build();

    String query = GetBuilder.builder()
      .className(className)
      .withNearTextFilter(nearText)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END GetWithDistance

    if (result.getError() != null) {
      System.out.println("Error performing vector search: " + result.getError().getMessages());
    } else {
      System.out.println("Vector search result: " + result.getResult().getData());
    }

  }

  private void searchWithLimitOffset(String className) {
    // START GetLimitOffset
    NearTextArgument nearText = NearTextArgument.builder()
      .concepts(new String[]{ "animals in movies" })
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
        Field.builder().name("_additional").fields(new Field[]{
          Field.builder().name("distance").build()
        }).build()
      })
      .build();

    String query = GetBuilder.builder()
      .className(className)
      .withNearTextFilter(nearText)
      .fields(fields)
      .limit(3)
      .offset(1)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END GetLimitOffset
    if (result.getError() != null) {
      System.out.println("Error performing vector search: " + result.getError().getMessages());
    } else {
      System.out.println("Vector search result: " + result.getResult().getData());
    }
  }

  private void searchWithAutoCut(String className) {
    // START Autocut
    NearTextArgument nearText = NearTextArgument.builder()
      .concepts(new String[]{ "animals in movies" })
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
        Field.builder().name("_additional").fields(new Field[]{
          Field.builder().name("distance").build()
        }).build()
      })
      .build();

    String query = GetBuilder.builder()
      .className(className)
      .fields(fields)
      .withNearTextFilter(nearText)
      .autocut(1)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END Autocut
    if (result.getError() != null) {
      System.out.println("Error performing vector search: " + result.getError().getMessages());
    } else {
      System.out.println("Vector search result: " + result.getResult().getData());
    }
  }

  private void searchWithGroupBy(String className) {
    // START GetWithGroupBy
    NearTextArgument nearText = NearTextArgument.builder()
      .concepts(new String[]{ "animals in movies" })
      .build();

    // Define the group hits fields
    Field[] hits = new Field[]{
      Field.builder().name("answer").build(),
      Field.builder().name("question").build(),
    };

    // Define the group field
    Field group = Field.builder()
      .name("group")
      .fields(new Field[]{
        Field.builder().name("id").build(),
        Field.builder().name("groupedBy")
          .fields(new Field[]{
            Field.builder().name("path").build(),
            Field.builder().name("value").build(),
          }).build(),
        Field.builder().name("count").build(),
        Field.builder().name("minDistance").build(),
        Field.builder().name("maxDistance").build(),
        Field.builder().name("hits").fields(hits).build(),
      }).build();

    Field _additional = Field.builder().name("_additional").fields(new Field[]{ group }).build();

    Fields fields = Fields.builder()
      .fields(new Field[]{ _additional })
      .build();

    // Define the GroupBy argument
    GroupByArgument groupBy = client.graphQL().arguments().groupByArgBuilder()
      .path(new String[]{ "round" })  // Path to group by
      .groups(2)  // Number of groups
      .objectsPerGroup(2)  // Number of objects per group
      .build();

    String query = GetBuilder.builder()
      .className(className)
      .fields(fields)
      .withNearTextFilter(nearText)
      .withGroupByArgument(groupBy)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END GetWithGroupBy
    if (result.hasErrors()) {
      System.out.println("Error performing vector search: " + result.getError().getMessages());
    } else {
      System.out.println("Vector search result: " + result.getResult().getData());
    }
  }

  private void searchWithFilter(String className) {
    // START GetWithFilter
    NearTextArgument nearText = NearTextArgument.builder()
      .concepts(new String[]{ "animals in movies" })  // Search concept
      .build();

    Fields fields = Fields.builder()
      .fields(new Field[]{
        Field.builder().name("question").build(),
        Field.builder().name("answer").build(),
        Field.builder().name("round").build(),
        Field.builder().name("_additional").fields(new Field[]{
          Field.builder().name("distance").build()
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
      .className(className)
      .fields(fields)
      .withNearTextFilter(nearText)
      .withWhereFilter(whereArgument)
      .limit(2)
      .build()
      .buildQuery();

    Result<GraphQLResponse> result = client.graphQL().raw().withQuery(query).run();
    // END GetWithFilter
    if (result.getError() != null) {
      System.out.println("Error performing vector search: " + result.getError().getMessages());
    } else {
      System.out.println("Vector search result: " + result.getResult().getData());
    }
  }
}
