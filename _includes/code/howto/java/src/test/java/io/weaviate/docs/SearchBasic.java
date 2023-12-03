package io.weaviate.docs;

import static org.assertj.core.api.Assertions.assertThat;

// START-ANY
import java.util.Map;
import java.util.List;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.auth.exception.AuthException;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.fields.Field;

public class SearchBasic {

    // END-ANY
    // Helper function - do not show in doc
    public static List<Map<?, ?>> parseGQLResponse(Result<GraphQLResponse> result, String className) {
        Object data = result.getResult().getData();
        Map<String, Map<String, List<Map<?, ?>>>> parsed_results = (Map<String, Map<String, List<Map<?, ?>>>>) data;

        return parsed_results.get("Get").get(className);
    }

    // START-ANY
    // Connect to Weaviate
    public static WeaviateClient connect() {
        Config config = new Config("https", "edu-demo.weaviate.network");
        try {
            WeaviateClient client = WeaviateAuthClient.apiKey(config, "learn-weaviate");
            return client;
        } catch (AuthException e) {
            throw new RuntimeException(e);
        }
    }

    // END-ANY
    // START BasicGetJava
    public static void basicGet() {

        WeaviateClient client = connect();
        Field question = Field.builder().name("question").build();

        Result<GraphQLResponse> result = client.graphQL().get()
                .withClassName("JeopardyQuestion")
                .withFields(question)
                .run();
        // END BasicGetJava

        // Very simple test - Do not show in doc
        List<Map<?, ?>> parsed_results = parseGQLResponse(result, "JeopardyQuestion");

        for (Map<?, ?> result_item : parsed_results) {
            assertThat(result_item.containsKey("question")).isTrue();
        }
        // START BasicGetJava
    }

    // END BasicGetJava
    // START BasicGetLimitJava
    public static void basicGetLimit() {

        WeaviateClient client = connect();
        Field question = Field.builder().name("question").build();

        Result<GraphQLResponse> result = client.graphQL().get()
                .withClassName("JeopardyQuestion")
                .withFields(question)
                .withLimit(1)
                .run();
        // END BasicGetLimitJava

        // Very simple test - Do not show in doc
        List<Map<?, ?>> parsed_results = parseGQLResponse(result, "JeopardyQuestion");

        for (Map<?, ?> result_item : parsed_results) {
            assertThat(result_item.containsKey("question")).isTrue();
        }
        // START BasicGetLimitJava
    }

    // END BasicGetLimitJava
    // START BasicGetLimitOffset
    public static void basicGetLimitOffset() {

        WeaviateClient client = connect();
        Field question = Field.builder().name("question").build();

        Result<GraphQLResponse> result = client.graphQL().get()
                .withClassName("JeopardyQuestion")
                .withFields(question)
                .withLimit(1)
                .withOffset(1)
                .run();
        // END BasicGetLimitOffset

        // Very simple test - Do not show in doc
        List<Map<?, ?>> parsed_results = parseGQLResponse(result, "JeopardyQuestion");

        for (Map<?, ?> result_item : parsed_results) {
            assertThat(result_item.containsKey("question")).isTrue();
        }
        // START BasicGetLimitOffset
    }

    // END BasicGetLimitOffset
    // START BasicGetMoreProperties
    public static void basicGetMoreProperties() {

        WeaviateClient client = connect();
        Field question = Field.builder().name("question").build();
        Field answer = Field.builder().name("answer").build();
        Field points = Field.builder().name("points").build();

        Result<GraphQLResponse> result = client.graphQL().get()
                .withClassName("JeopardyQuestion")
                .withFields(question, answer, points)
                .withLimit(1)
                .run();
        // END BasicGetMoreProperties

        // Very simple test - Do not show in doc
        List<Map<?, ?>> parsed_results = parseGQLResponse(result, "JeopardyQuestion");

        for (Map<?, ?> result_item : parsed_results) {
            assertThat(result_item.containsKey("question")).isTrue();
        }
        // START BasicGetMoreProperties
    }

    // END BasicGetMoreProperties
    // START BasicGetWithVector
    public static void basicGetWithVector() {

        WeaviateClient client = connect();
        Field _additional = Field.builder()
                .name("_additional")
                .fields(new Field[] {
                        Field.builder().name("vector").build()
                }).build();

        Result<GraphQLResponse> result = client.graphQL().get()
                .withClassName("JeopardyQuestion")
                .withFields(_additional)
                .withLimit(1)
                .run();
        // END BasicGetWithVector

        // Very simple test - Do not show in doc
        List<Map<?, ?>> parsed_results = parseGQLResponse(result, "JeopardyQuestion");

        for (Map<?, ?> result_item : parsed_results) {
            assertThat(result_item.containsKey("_additional")).isTrue();
            if (result_item.get("_additional") instanceof Map<?, ?>) {
                Map<?, ?> additionalProps = (Map<?, ?>) result_item.get("_additional");
                assertThat(additionalProps.containsKey("vector")).isTrue();
            }
        }
        // END BasicGetWithVector
    }

    // END BasicGetWithVector
    // START BasicGetWithId
    public static void basicGetWithId() {

        WeaviateClient client = connect();
        Field _additional = Field.builder()
                .name("_additional")
                .fields(new Field[] {
                        Field.builder().name("id").build()
                }).build();

        Result<GraphQLResponse> result = client.graphQL().get()
                .withClassName("JeopardyQuestion")
                .withFields(_additional)
                .withLimit(1)
                .run();
        // END BasicGetWithId

        // Very simple test - Do not show in doc
        List<Map<?, ?>> parsed_results = parseGQLResponse(result, "JeopardyQuestion");

        for (Map<?, ?> result_item : parsed_results) {
            assertThat(result_item.containsKey("_additional")).isTrue();
            if (result_item.get("_additional") instanceof Map<?, ?>) {
                Map<?, ?> additionalProps = (Map<?, ?>) result_item.get("_additional");
                assertThat(additionalProps.containsKey("id")).isTrue();
            }
        }
        // START BasicGetWithId
    }

    // END BasicGetWithId
    // START BasicGetWithCrossRef
    public static void basicGetWithCrossRef() {

        WeaviateClient client = connect();
        Field hasCategory = Field.builder()
                .name("hasCategory")
                .fields(new Field[] {
                        Field.builder()
                                .name("... on JeopardyCategory")
                                .fields(new Field[] {
                                        Field.builder().name("title").build()
                                })
                                .build()
                })
                .build();

        Result<GraphQLResponse> result = client.graphQL().get()
                .withClassName("JeopardyQuestion")
                .withFields(hasCategory)
                .withLimit(1)
                .run();
        // END BasicGetWithCrossRef

        // Very simple test - Do not show in doc
        List<Map<?, ?>> parsed_results = parseGQLResponse(result, "JeopardyQuestion");

        for (Map<?, ?> result_item : parsed_results) {
            assertThat(result_item.containsKey("hasCategory")).isTrue();
            if (result_item.get("hasCategory") instanceof Map<?, ?>) {
                List<Map<?, ?>> crossRefProps = (List<Map<?, ?>>) result_item.get("hasCategory");
                assertThat(crossRefProps.get(0).containsKey("title")).isTrue();
            }
        }
        // START BasicGetWithCrossRef
    }

    // END BasicGetWithCrossRef
    // START BasicGetWithMultiTenancy
    public static void basicGetWithMultiTenancy() {

        WeaviateClient client = connect();
        Field question = Field.builder().name("question").build();

        Result<GraphQLResponse> result = client.graphQL().get()
                .withClassName("JeopardyQuestionMT")
                .withFields(question)
                .withTenant("tenantA")
                .withLimit(1)
                .run();
        // END BasicGetWithMultiTenancy

        // Very simple test - Do not show in doc
        List<Map<?, ?>> parsed_results = parseGQLResponse(result, "JeopardyQuestionMT");

        for (Map<?, ?> result_item : parsed_results) {
            assertThat(result_item.containsKey("question")).isTrue();
        }
        // START BasicGetWithMultiTenancy
    }
    // END BasicGetWithMultiTenancy

    public static void main(String[] args) {
        basicGet();
        basicGetLimit();
        basicGetLimitOffset();
        basicGetMoreProperties();
        basicGetWithVector();
        basicGetWithId();
        basicGetWithCrossRef();
        basicGetWithMultiTenancy();
    }
}
