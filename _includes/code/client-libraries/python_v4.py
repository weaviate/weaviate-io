# LocalInstantiationBasic
import weaviate

client = weaviate.connect_to_local()  # Connect with default parameters
# END LocalInstantiationBasic

assert client.is_ready()

"""
# EmbeddedInstantiationBasic
import weaviate

client = weaviate.connect_to_embedded()  # Connect with default parameters
# END EmbeddedInstantiationBasic
"""

client = weaviate.connect_to_embedded(
    port=8085,
    grpc_port=50055
)  # Connect with default parameters
assert client.is_ready()

# WCSInstantiation
import weaviate
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY"))  # Replace with your WCS key
)
# END WCSInstantiation

assert client.is_ready()

# WCSwOIDCInstantiation
import weaviate

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.AuthClientPassword(
        username=os.getenv("WCS_USERNAME"),  # Your WCS username
        password=os.getenv("WCS_PASSWORD")   # Your WCS password
    )
)
# END WCSwOIDCInstantiation

assert client.is_ready()

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

assert client.is_ready()

# DirectInstantiationBasic
import weaviate

client = weaviate.WeaviateClient(
    weaviate.ConnectionParams.from_url("http://localhost:8080", 50051)
)
# END DirectInstantiationBasic

assert client.is_ready()

# LocalInstantiationWithHeaders
import weaviate
import os

client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    headers={"X-OpenAI-Api": os.getenv("OPENAI_APIKEY")}
)
# END LocalInstantiationWithHeaders

assert client.is_ready()

# LocalInstantiationWithTimeout
import weaviate

client = weaviate.connect_to_local(port=8080, grpc_port=50051, timeout=(5, 15))
# END LocalInstantiationWithTimeout

assert client.is_ready()

# DirectInstantiationFull
import weaviate
import os

client = weaviate.WeaviateClient(
    connection_params=weaviate.ConnectionParams.from_params(
        http_host="localhost",
        http_port="8099",
        http_secure=False,
        grpc_host="localhost",
        grpc_port="50052",
        grpc_secure=False,
    ),
    auth_client_secret=weaviate.AuthApiKey("secr3tk3y"),
    additional_headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")
    },
    additional_config=weaviate.AdditionalConfig(
        startup_period=10,
        timeout=(5, 15)
    ),
)
# END DirectInstantiationFull

assert client.is_ready()

# =====================================================================================
# Collection instantiation
# =====================================================================================

client = weaviate.connect_to_local()
client.collections.delete("TestArticle")
assert not client.collections.exists("TestArticle")

# START CreateCollectionExample
import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_local()

collection = client.collections.create(
    name="TestArticle",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_cohere(),
    generative_config=wvc.Configure.Generative.cohere(),
    properties=[
        wvc.Property(
            name="title",
            data_type=wvc.DataType.TEXT
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

client.close()
# END CreateCollectionExample

client = weaviate.connect_to_local()
for cname in ["TestArticle", "TestAuthor"]:
    client.collections.delete(cname)
    assert not client.collections.exists(cname)


# START CreateCollectionWithRefsExample
import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_local()

articles = client.collections.create(
    name="TestArticle",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_cohere(),
    generative_config=wvc.Configure.Generative.cohere(),
    properties=[
        wvc.Property(
            name="title",
            data_type=wvc.DataType.TEXT
        )
    ]
)

authors = client.collections.create(
    name="TestAuthor",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_cohere(),
    generative_config=wvc.Configure.Generative.cohere(),
    properties=[
        wvc.Property(
            name="name",
            data_type=wvc.DataType.TEXT
        )
    ],
    # highlight-start
    references=[
        wvc.ReferenceProperty(
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

client.close()
# END CreateCollectionWithRefsExample
 
# START GetCollectionExample
import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_local()

collection = client.collections.get("TestArticle")

client.close()
# END GetCollectionExample

# =====================================================================================
# Data examples
# =====================================================================================

client = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")},
)

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
        "hasCategory": wvc.Reference.to(uuids=[target_uuid])
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
    data_object = wvc.DataObject(
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
    data_object = wvc.DataObject(
        properties=properties,
        # highlight-start
        references={
            "hasCategory": wvc.Reference.to(uuids=target_uuid)
        },
        # highlight-end
        uuid=generate_uuid5(properties)
    )
    data_objects.append(data_object)

response = questions.data.insert_many(data_objects)
# END InsertManyDataObjectReferenceExample

# START DeleteObjectExample
questions = client.collections.get("JeopardyQuestion")

deleted = questions.data.delete_by_id(uuid=new_uuid)
# END DeleteObjectExample

assert deleted == True

# START DeleteManyExample
from weaviate.classes import Filter

questions = client.collections.get("JeopardyQuestion")

response = questions.data.delete_many(
    where=Filter(path="question").equal("Test Question")
)
# END DeleteManyExample

# =====================================================================================
# Query examples
# =====================================================================================

client = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")},
)

# START BM25QueryExample
questions = client.collections.get("JeopardyQuestion")
response = questions.query.bm25(
    query="animal",
    limit=2
)

for o in response.objects:
    print(o.properties)  # Object properties
# END BM25QueryExample

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
    print(o.vector)  # No vector
    print(o.metadata)  # No metadata
# END BM25QueryDefaultReturnsExample

# START BM25QueryCustomReturnsExample
questions = client.collections.get("JeopardyQuestion")
response = questions.query.bm25(
    query="animal",
    include_vector=True,
    return_properties=["question"],
    return_metadata=wvc.MetadataQuery(distance=True),
    return_references=wvc.QueryReference(link_on="hasCategory"),
    limit=2
)

for o in response.objects:
    print(o.properties)  # Selected properties only
    print(o.references)  # Selected references
    print(o.uuid)  # UUID included by default
    print(o.vector)  # With vector
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
# END NearTextGenerateExample

# =====================================================================================
# Aggregate examples
# =====================================================================================

# START AggregateCountExample
questions = client.collections.get("JeopardyQuestion")
response = questions.aggregate.over_all(
    filters=wvc.Filter(path="question").like("*animal*"),
    total_count=True
)

print(response.total_count)
# END AggregateCountExample

# START AggregateMetricExample
questions = client.collections.get("JeopardyQuestion")
response = questions.aggregate.near_text(
    query="animal",
    object_limit=5,
    return_metrics=wvc.Metrics("points").integer(mean=True)
)

print(response.properties)
# END AggregateMetricExample

# =====================================================================================
# Query Groupby examples
# =====================================================================================

# START QueryGroupbyExample
questions = client.collections.get("JeopardyQuestion")
response = questions.query_group_by.near_text(
    query="animal",
    distance=0.2,
    group_by_property="points",
    number_of_groups=3,
    objects_per_group=5
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
questions = client.collections.get("JeopardyQuestion")
response = questions.aggregate_group_by.near_text(
    query="animal",
    distance=0.2,
    group_by="points",
    return_metrics=wvc.Metrics("points").integer(mean=True)
)

for o in response:
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
    return_metadata=wvc.MetadataQuery(
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

# IteratorMetadataOnly
all_object_ids = [question for question in questions.iterator(return_metadata=wvc.MetadataQuery(creation_time=True))]  # Only return IDs
# END IteratorMetadataOnly


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
    return_metadata=wvc.MetadataQuery(creation_time=True)  # MetaDataQuery object is used to specify the metadata to be returned in the response
)
# END GenericsExample

client.close()
