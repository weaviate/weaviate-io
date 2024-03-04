import weaviate_datasets as wd
import os

# InstantiationV3API
import weaviate

client = weaviate.Client(
    url="http://localhost:8080",
)
# END InstantiationV3API


# TryFinallyExample
import weaviate

client = weaviate.connect_to_local()  # Connect with default parameters

try:
    pass  # Do something with the client

finally:
    client.close()  # Ensure the connection is closed
# END TryFinallyExample


# ClientContextManagerExample
import weaviate

with weaviate.connect_to_local() as client:
    # Do something with the client
    pass
    # The connection is closed automatically when the context manager exits
# END ClientContextManagerExample


# LocalInstantiationBasic
import weaviate

client = weaviate.connect_to_local()  # Connect with default parameters
# END LocalInstantiationBasic

try:
    assert client.is_ready()
finally:
    client.close()


# LocalInstantiationSkipChecks
import weaviate

client = weaviate.connect_to_local(
    skip_init_checks=True
)
# END LocalInstantiationSkipChecks

try:
    assert client.is_ready()
finally:
    client.close()


"""
# EmbeddedInstantiationBasic
import weaviate

client = weaviate.connect_to_embedded()  # Connect with default parameters
# END EmbeddedInstantiationBasic
"""

client = weaviate.connect_to_embedded(
    port=8085,
    grpc_port=50055,
)

try:
    assert client.is_ready()
finally:
    client.close()

# WCSInstantiation
import weaviate
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY"))  # Replace with your WCS key
)
# END WCSInstantiation

try:
    assert client.is_ready()
finally:
    client.close()

# WCSwOIDCInstantiation
import weaviate

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthClientPassword(
        username=os.getenv("WCS_USERNAME"),  # Your WCS username
        password=os.getenv("WCS_PASSWORD")   # Your WCS password
    )
)
# END WCSwOIDCInstantiation

try:
    assert client.is_ready()
finally:
    client.close()

# CustomInstantiationBasic
import weaviate

client = weaviate.connect_to_custom(
    http_host="localhost",
    http_port="8080",
    http_secure=False,
    grpc_host="localhost",
    grpc_port="50051",
    grpc_secure=False,
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")  # Or any other inference API keys
    }
)

# END CustomInstantiationBasic

try:
    assert client.is_ready()
finally:
    client.close()

# # DirectInstantiationBasic
import weaviate
from weaviate.connect import ConnectionParams

client = weaviate.WeaviateClient(
    ConnectionParams.from_url("http://localhost:8080", 50051)
)

client.connect()  # When directly instantiating, you need to connect manually
# END DirectInstantiationBasic

try:
    assert client.is_ready()
finally:
    client.close()

# LocalInstantiationWithHeaders
import weaviate
import os

client = weaviate.connect_to_local(
    headers={"X-OpenAI-Api": os.getenv("OPENAI_APIKEY")}
)
# END LocalInstantiationWithHeaders

try:
    assert client.is_ready()
finally:
    client.close()

# LocalInstantiationWithTimeout
import weaviate

client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    additional_config=weaviate.config.AdditionalConfig(timeout=(5, 15))  # Values in seconds
)
# END LocalInstantiationWithTimeout

try:
    assert client.is_ready()
finally:
    client.close()

# DirectInstantiationFull
import weaviate
from weaviate.connect import ConnectionParams
import os

client = weaviate.WeaviateClient(
    connection_params=ConnectionParams.from_params(
        http_host="localhost",
        http_port="8099",
        http_secure=False,
        grpc_host="localhost",
        grpc_port="50052",
        grpc_secure=False,
    ),
    auth_client_secret=weaviate.auth.AuthApiKey("secr3tk3y"),
    additional_headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")
    },
    additional_config=weaviate.config.AdditionalConfig(
        startup_period=10,
        timeout=(5, 15)  # Values in seconds
    ),
)

client.connect()  # When directly instantiating, you need to connect manually
# END DirectInstantiationFull

try:
    assert client.is_ready()
finally:
    client.close()


# WCSQuickStartInstantiation
import weaviate
import os

with weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY"))  # Replace with your WCS key
) as client:  # Use this context manager to ensure the connection is closed
    client.collections.list_all()
# END WCSQuickStartInstantiation


# =====================================================================================
# Batch examples
# =====================================================================================

import weaviate
from weaviate.classes.config import Property, DataType, ReferenceProperty
from weaviate.classes.data import DataReference
from weaviate.util import generate_uuid5

client = weaviate.connect_to_local()

client.collections.delete("WikiArticle")
client.collections.create(
    name="WikiArticle",
    properties=[
        Property(name="title", data_type=DataType.TEXT)
    ],
    references=[
        ReferenceProperty(name="linkedArticle", target_collection="WikiArticle")
    ]
)
src_uuid = generate_uuid5("Multitenancy")
tgt_uuid = generate_uuid5("Database schema")

client.close()

# START BatchDynamic
import weaviate

client = weaviate.connect_to_local()

try:
    with client.batch.dynamic() as batch:  # or <collection>.batch.dynamic()
        # Batch import objects/references - e.g.:
        batch.add_object(properties={"title": "Multitenancy"}, collection="WikiArticle", uuid=src_uuid)
        batch.add_object(properties={"title": "Database schema"}, collection="WikiArticle", uuid=tgt_uuid)
        batch.add_reference(from_collection="WikiArticle", from_uuid=src_uuid, from_property="linkedArticle", to=tgt_uuid)

finally:
    client.close()
# END BatchDynamic


# START BatchFixedSize
import weaviate

client = weaviate.connect_to_local()

try:
    with client.batch.fixed_size(batch_size=100, concurrent_requests=4) as batch:  # or <collection>.batch.fixed_size()
        # Batch import objects/references - e.g.:
        batch.add_object(properties={"title": "Multitenancy"}, collection="WikiArticle", uuid=src_uuid)
        batch.add_object(properties={"title": "Database schema"}, collection="WikiArticle", uuid=tgt_uuid)
        batch.add_reference(from_collection="WikiArticle", from_uuid=src_uuid, from_property="linkedArticle", to=tgt_uuid)

finally:
    client.close()
# END BatchFixedSize


# START BatchRateLimit
import weaviate

client = weaviate.connect_to_local()

try:
    with client.batch.rate_limit(requests_per_minute=600) as batch:  # or <collection>.batch.rate_limit()
        # Batch import objects/references - e.g.:
        batch.add_object(properties={"title": "Multitenancy"}, collection="WikiArticle", uuid=src_uuid)
        batch.add_object(properties={"title": "Database schema"}, collection="WikiArticle", uuid=tgt_uuid)
        batch.add_reference(from_collection="WikiArticle", from_uuid=src_uuid, from_property="linkedArticle", to=tgt_uuid)

finally:
    client.close()
# END BatchRateLimit


import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_local()

try:
# START BatchBasic
    # Option 1: Collection-level batching
    questions = client.collections.get('JeopardyQuestion')

    with questions.batch.dynamic() as batch:
        pass  # Batch import objects/references

    # Option 2: Client-level batching
    with client.batch.dynamic() as batch:
        pass  # Batch import objects/references
# END BatchBasic
finally:
    client.close()

source_iterable = range(100)  # Dummy iterable

# START BatchErrorHandling
import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_local()

try:
    # ===== First batch import block =====
    with client.batch.rate_limit(requests_per_minute=600) as batch:  # or <collection>.batch.rate_limit()
        # Batch import objects/references
        # highlight-start
        for i in source_iterable:  # Some insertion loop
            if batch.number_errors > 10:  # Monitor errors during insertion
                # Break or raise an exception
                # highlight-end
                pass
    # highlight-start
    failed_objs_a = client.batch.failed_objects  # Get failed objects from the first batch import
    failed_refs_a = client.batch.failed_references  # Get failed references from the first batch import
    # highlight-end

    # ===== Second batch import block =====
    # This will clear the failed objects/references
    with client.batch.rate_limit(requests_per_minute=600) as batch:  # or <collection>.batch.rate_limit()
        # Batch import objects/references
        # highlight-start
        for i in source_iterable:  # Some insertion loop
            if batch.number_errors > 10:  # Monitor errors during insertion
                # Break or raise an exception
                # highlight-end
                pass
    # highlight-start
    failed_objs_b = client.batch.failed_objects  # Get failed objects from the second batch import
    failed_refs_b = client.batch.failed_references  # Get failed references from the second batch import
    # highlight-end

finally:
    client.close()
# END BatchErrorHandling


# START BatchErrorMonitor
import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_local()

max_errors = 500

try:
    with client.batch.rate_limit(requests_per_minute=600) as batch:

        # Insert objects here

        # highlight-start
        if batch.number_errors > max_errors:  # Monitor
        # highlight-end
            pass  # Do something (e.g. break)

finally:
    client.close()
# END BatchErrorMonitor


# START BatchSimpleErrorHandling
import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_local()

try:
    with client.batch.rate_limit(requests_per_minute=600) as batch:
        pass  # Batch import objects/references

    # highlight-start
    failed_objs_a = client.batch.failed_objects  # Get failed objects from the batch import
    failed_refs_a = client.batch.failed_references  # Get failed references from the batch import
    # highlight-end

finally:
    client.close()
# END BatchSimpleErrorHandling


# =====================================================================================
# Collection instantiation
# =====================================================================================



# START CreateCollectionFromJSON
import weaviate

client = weaviate.connect_to_local()

# END CreateCollectionFromJSON

client.collections.delete("TestArticle")

# START CreateCollectionFromJSON
try:
    collection_definition = {
        "class": "TestArticle",
        "properties": [
            {
                "name": "title",
                "dataType": ["text"],
            },
            {
                "name": "body",
                "dataType": ["text"],
            },
        ],
    }

    # highlight-start
    client.collections.create_from_dict(collection_definition)
    # highlight-end

finally:
    client.close()

# END CreateCollectionFromJSON


# START CreateCollectionExample
import weaviate
import weaviate.classes.config as wvcc

client = weaviate.connect_to_local()

try:
    # END CreateCollectionExample

    # Delete any existing collections
    client.collections.delete("TestArticle")
    assert not client.collections.exists("TestArticle")

    # START CreateCollectionExample
    # Note that you can use `client.collections.create_from_dict()` to create a collection from a v3-client-style JSON object
    collection = client.collections.create(
        name="TestArticle",
        vectorizer_config=wvcc.Configure.Vectorizer.text2vec_cohere(),
        generative_config=wvcc.Configure.Generative.cohere(),
        properties=[
            wvcc.Property(
                name="title",
                data_type=wvcc.DataType.TEXT
            )
        ]
    )
    # END CreateCollectionExample

    assert client.collections.exists("TestArticle")
    testarticles = client.collections.get("TestArticle")
    articles_config = testarticles.config.get()
    assert articles_config.name == "TestArticle"
    assert len(articles_config.properties) == 1

# START CreateCollectionExample

finally:
    client.close()
# END CreateCollectionExample


client = weaviate.connect_to_local()

try:
    for cname in ["TestArticle", "TestAuthor"]:
        client.collections.delete(cname)
        assert not client.collections.exists(cname)
finally:
    client.close()

# START CreateCollectionWithRefsExample
import weaviate
import weaviate.classes.config as wvcc

client = weaviate.connect_to_local()

try:
    articles = client.collections.create(
        name="TestArticle",
        vectorizer_config=wvcc.Configure.Vectorizer.text2vec_cohere(),
        generative_config=wvcc.Configure.Generative.cohere(),
        properties=[
            wvcc.Property(
                name="title",
                data_type=wvcc.DataType.TEXT
            )
        ]
    )

    authors = client.collections.create(
        name="TestAuthor",
        vectorizer_config=wvcc.Configure.Vectorizer.text2vec_cohere(),
        generative_config=wvcc.Configure.Generative.cohere(),
        properties=[
            wvcc.Property(
                name="name",
                data_type=wvcc.DataType.TEXT
            )
        ],
        # highlight-start
        references=[
            wvcc.ReferenceProperty(
                name="wroteArticle",
                target_collection="TestArticle"
            )
        ]
        # highlight-end
    )
    # END CreateCollectionWithRefsExample


    for cname in ["TestArticle", "TestAuthor"]:
        assert client.collections.exists(cname)
        collection = client.collections.get(cname)
        collection_config = collection.config.get()
        assert collection_config.name == cname

    # START CreateCollectionWithRefsExample
finally:
    client.close()
# END CreateCollectionWithRefsExample

# START GetCollectionExample
import weaviate

client = weaviate.connect_to_local()

try:
    collection = client.collections.get("TestArticle")
finally:
    client.close()
# END GetCollectionExample

# =====================================================================================
# Data examples
# =====================================================================================

client = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")},
)

try:
    d = wd.JeopardyQuestions10k()
    d.upload_dataset(client, overwrite=True)

    categories = client.collections.get("JeopardyCategory")
    response = categories.query.fetch_objects(limit=1)
    target_uuid = response.objects[0].uuid

    print(response)

    # START CreateObjectExample
    questions = client.collections.get("JeopardyQuestion")

    new_uuid = questions.data.insert(
        properties={
            "question": "This is the capital of Australia."
        },
        references={  # For adding cross-references
            "hasCategory": target_uuid
        }
    )
    # END CreateObjectExample

    from uuid import UUID

    assert type(new_uuid) == UUID

    # START InsertManyExample
    questions = client.collections.get("JeopardyQuestion")

    properties = [{"question": f"Test Question {i+1}"} for i in range(5)]
    response = questions.data.insert_many(properties)
    # END InsertManyExample

    # START InsertManyDataObjectExample
    from weaviate.util import generate_uuid5

    questions = client.collections.get("JeopardyQuestion")

    data_objects = list()
    for i in range(5):
        properties = {"question": f"Test Question {i+1}"}
        data_object = wvc.data.DataObject(
            properties=properties,
            uuid=generate_uuid5(properties)
        )
        data_objects.append(data_object)

    response = questions.data.insert_many(data_objects)
    # END InsertManyDataObjectExample

    # START InsertManyDataObjectReferenceExample
    from weaviate.util import generate_uuid5

    questions = client.collections.get("JeopardyQuestion")

    data_objects = list()
    for i in range(5):
        properties = {"question": f"Test Question {i+1}"}
        data_object = wvc.data.DataObject(
            properties=properties,
            # highlight-start
            references={
                "hasCategory": target_uuid
            },
            # highlight-end
            uuid=generate_uuid5(properties)
        )
        data_objects.append(data_object)

    response = questions.data.insert_many(data_objects)
    # END InsertManyDataObjectReferenceExample

    # START InsertManyBasic
    questions = client.collections.get("JeopardyQuestion")

    # Build data objects - e.g. with properties, references, and UUIDs
    data_objects = list()
    for i in range(5):
        properties = {"question": f"Test Question {i+1}"}
        data_object = wvc.data.DataObject(
            properties=properties,
            # Add `references`, `vector` or `uuid` as needed
        )
        data_objects.append(data_object)

    # highlight-start
    # Actually insert the data objects
    response = questions.data.insert_many(data_objects)
    # highlight-end
    # END InsertManyBasic

    # START DeleteObjectExample
    questions = client.collections.get("JeopardyQuestion")

    deleted = questions.data.delete_by_id(uuid=new_uuid)
    # END DeleteObjectExample

    assert deleted == True


    # START DeleteManyExample
    from weaviate.classes.query import Filter

    questions = client.collections.get("JeopardyQuestion")

    response = questions.data.delete_many(
        where=Filter.by_property(name="question").equal("Test Question")
    )
    # END DeleteManyExample

finally:
    client.close()

# =====================================================================================
# Query examples
# =====================================================================================

# Connect to WCS instance for query examples
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

try:
    # START BM25QueryExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.query.bm25(
        query="animal",
        limit=2
    )

    for o in response.objects:
        print(o.properties)  # Object properties
    # END BM25QueryExample

    # START HybridQueryExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.query.hybrid(
        query="animal",
        limit=2
    )

    for o in response.objects:
        print(o.properties)  # Object properties
    # END HybridQueryExample

    # START NearTextQueryExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.query.near_text(
        query="animal",
        limit=2
    )

    for o in response.objects:
        print(o.properties)  # Object properties
    # END NearTextQueryExample

    # START BM25QueryDefaultReturnsExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.query.bm25(
        query="animal",
        limit=2
    )

    for o in response.objects:
        print(o.properties)  # All properties by default
        print(o.references)  # References not returned by default
        print(o.uuid)  # UUID included by default
        # END BM25QueryDefaultReturnsExample
        """
        # Don't actually show vector when script runs
        # START BM25QueryDefaultReturnsExample
        print(o.vector)  # No vector
        # END BM25QueryDefaultReturnsExample
        """
        # START BM25QueryDefaultReturnsExample
        print(o.metadata)  # No metadata
    # END BM25QueryDefaultReturnsExample

    # START BM25QueryCustomReturnsExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.query.bm25(
        query="animal",
        include_vector=True,
        return_properties=["question"],
        return_metadata=wvc.query.MetadataQuery(distance=True),
        return_references=wvc.query.QueryReference(
            link_on="hasCategory",
            return_properties=["title"],
            return_metadata=wvc.query.MetadataQuery(creation_time=True)
        ),
        limit=2
    )

    for o in response.objects:
        print(o.properties)  # Selected properties only
        print(o.references)  # Selected references
        print(o.uuid)  # UUID included by default
        # END BM25QueryCustomReturnsExample
        """
        # Don't actually show vector when script runs
        # START BM25QueryCustomReturnsExample
        print(o.vector)  # With vector
        # END BM25QueryCustomReturnsExample
        """
        # START BM25QueryCustomReturnsExample
        print(o.metadata)  # With selected metadata
    # END BM25QueryCustomReturnsExample

    # =====================================================================================
    # Generate examples
    # =====================================================================================

    # START BM25GenerateExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.generate.bm25(
        query="animal",
        limit=2,
        grouped_task="What do these animals have in common?",
        single_prompt="Translate the following into French: {answer}"
    )

    print(response.generated)  # Generated text from grouped task
    for o in response.objects:
        print(o.generated)  # Generated text from single prompt
        print(o.properties)  # Object properties
    # END BM25GenerateExample

    # START NearTextGenerateExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.generate.near_text(
        query="animal",
        limit=2,
        grouped_task="What do these animals have in common?",
        single_prompt="Translate the following into French: {answer}"
    )

    print(response.generated)  # Generated text from grouped task
    for o in response.objects:
        print(o.generated)  # Generated text from single prompt
        print(o.properties)  # Object properties
    # END NearTextGenerateExample

    # =====================================================================================
    # Aggregate examples
    # =====================================================================================

    # START AggregateCountExample
    from weaviate.classes.query import Filter

    questions = client.collections.get("JeopardyQuestion")
    response = questions.aggregate.over_all(
        filters=Filter.by_property(name="question").like("*animal*"),
        total_count=True
    )

    print(response.total_count)
    # END AggregateCountExample

    # START AggregateMetricExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.aggregate.near_text(
        query="animal",
        object_limit=5,
        return_metrics=wvc.query.Metrics("points").integer(mean=True)
    )

    print(response.properties)
    # END AggregateMetricExample

    # =====================================================================================
    # Query Groupby examples
    # =====================================================================================

    # START QueryGroupbyExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.query.near_text(
        query="animal",
        distance=0.2,
        group_by=wvc.query.GroupBy(
            prop="points",
            number_of_groups=3,
            objects_per_group=5
        )
    )

    for k, v in response.groups.items():  # View by group
        print(k, v)

    for o in response.objects:  # View by object
        print(o)
    # END QueryGroupbyExample

    # =====================================================================================
    # Aggregate Groupby examples
    # =====================================================================================

    # START AggregateGroupbyExample
    from weaviate.classes.aggregate import GroupByAggregate

    questions = client.collections.get("JeopardyQuestion")
    response = questions.aggregate.near_text(
        query="animal",
        distance=0.2,
        group_by=GroupByAggregate(prop="points"),
        return_metrics=wvc.query.Metrics("points").integer(mean=True)
    )

    for o in response.groups:
        print(o)
    # END AggregateGroupbyExample

    # =====================================================================================
    # Display Results examples
    # =====================================================================================

    # START ResultDisplayExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.generate.near_text(
        query="history",
        limit=2,
        single_prompt="Translate this into French {question}",
        grouped_task="Summarize this into a sentence",
        return_metadata=wvc.query.MetadataQuery(
            distance=True,
            creation_time=True
        )
    )

    print("Grouped Task generated outputs:")
    print(response.generated)
    for o in response.objects:
        print(f"Outputs for object {o.uuid}")
        print(f"Generated text:")
        print(o.generated)
        print(f"Properties:")
        print(o.properties)
        print(f"Metadata")
        print(o.metadata)
    # END ResultDisplayExample


    """
    # START ResultDisplayOutput
    _GenerativeReturn(objects=[_GenerativeObject(uuid=UUID('61e29275-8f53-5e28-a355-347d45a847b3'), metadata=_MetadataReturn(creation_time=datetime.datetime(2024, 1, 2, 18, 3, 7, 475000, tzinfo=datetime.timezone.utc), last_update_time=None, distance=0.19253945350646973, certainty=None, score=None, explain_score=None, is_consistent=None, rerank_score=None), properties={'points': 1000.0, 'answer': 'Daniel Boorstein', 'air_date': datetime.datetime(1990, 3, 26, 0, 0, tzinfo=datetime.timezone.utc), 'round': 'Double Jeopardy!', 'question': 'This historian & former Librarian of Congress was teaching history at Harvard while studying law at Yale'}, references=None, vector=None, generated="Cet historien et ancien bibliothécaire du Congrès enseignait l'histoire à Harvard tout en étudiant le droit à Yale."), _GenerativeObject(uuid=UUID('e987d1a1-2599-5dd8-bd22-4f3b0338539a'), metadata=_MetadataReturn(creation_time=datetime.datetime(2024, 1, 2, 18, 3, 8, 185000, tzinfo=datetime.timezone.utc), last_update_time=None, distance=0.193121075630188, certainty=None, score=None, explain_score=None, is_consistent=None, rerank_score=None), properties={'points': 400.0, 'air_date': datetime.datetime(2007, 5, 11, 0, 0, tzinfo=datetime.timezone.utc), 'answer': 'an opinion', 'round': 'Jeopardy!', 'question': 'This, a personal view or belief, comes from the Old French for "to think"'}, references=None, vector=None, generated='Ceci, une opinion personnelle ou une croyance, provient du vieux français signifiant "penser".')], generated='Daniel Boorstein, a historian and former Librarian of Congress, taught history at Harvard while studying law at Yale, and an opinion is a personal view or belief derived from the Old French word for "to think".')
    # END ResultDisplayOutput
    """

    # THIS DOES NOT RELIABLY WORK AS THE PROPS CAN CONTAIN DATETIME
    # # START ResultJSONDisplayExample
    # import json

    # questions = client.collections.get("JeopardyQuestion")
    # response = questions.query.fetch_objects(limit=1)

    # # Print result object properties
    # for o in response.objects:
    #     print(o.properties)
    # # END ResultJSONDisplayExample

    # """
    # # START ResultJSONDisplayResults
    # {
    #   "points": 100.0,
    #   "answer": "Jonah",
    #   "air_date": "2001-01-10T00:00:00Z",
    #   "round": "Jeopardy!",
    #   "question": "This prophet passed the time he spent inside a fish offering up prayers"
    # }
    # # END ResultJSONDisplayResults
    # """

    # IteratorBasic
    all_objects = [question for question in questions.iterator()]
    # END IteratorBasic

    # IteratorAnswerOnly
    all_object_answers = [question for question in questions.iterator(return_properties=["answer"])]
    # END IteratorAnswerOnly

    # IteratorWithMetadata
    all_object_ids = [question for question in questions.iterator(return_metadata=wvc.query.MetadataQuery(creation_time=True))]  # Get selected metadata
    # END IteratorWithMetadata


    # START LenCollectionExample
    articles = client.collections.get("Article")
    print(len(articles))
    # END LenCollectionExample


    # START BrokenQueryExample
    try:
        collection = client.collections.get("NonExistentCollection")
        collection.query.fetch_objects(limit=2)
    except weaviate.exceptions.WeaviateBaseError as e:
        print(f"Caught a Weaviate error: {e.message}")
    # END BrokenQueryExample


    # GenericsExample
    from typing import TypedDict

    questions = client.collections.get("JeopardyQuestion")

    class Question(TypedDict):
        question: str
        answer: str
        points: int

    response = questions.query.fetch_objects(
        limit=2,
        return_properties=Question,  # Your generic class is used to extract the return properties and statically type the response
        return_metadata=wvc.query.MetadataQuery(creation_time=True)  # MetaDataQuery object is used to specify the metadata to be returned in the response
    )
    # END GenericsExample

finally:
    client.close()
