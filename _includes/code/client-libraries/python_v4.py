# LocalInstantiationBasic
import weaviate

client = weaviate.connect_to_local()  # Connect with default parameters
# END LocalInstantiationBasic

assert client.is_ready()

# EmbeddedInstantiationBasic
import weaviate

client = weaviate.connect_to_embedded()  # Connect with default parameters
# END EmbeddedInstantiationBasic

assert client.is_ready()

# WCSInstantiation
import weaviate

client = weaviate.connect_to_wcs(
    cluster_url="YOUR_WCS_URL",
    auth_credentials=weaviate.AuthApiKey("YOUR_API_KEY")
)
# END WCSInstantiation

assert client.is_ready()

# WCSwOIDCInstantiation
import weaviate

client = weaviate.connect_to_wcs(
    cluster_url="YOUR_WCS_URL",
    auth_credentials=weaviate.AuthClientPassword(
        username=os.environ["MY_USERNAME"],
        password=os.environ["MY_PASSWORD"]
    )
)
# END WCSwOIDCInstantiation

assert client.is_ready()

# CustomInstantiationBasic
import weaviate

client = weaviate.connect_to_custom(
    http_host="YOUR_HTTP_HOST",
    http_port="YOUR_HTTP_PORT",
    http_secure=True,
    grpc_host="YOUR_gRPC_HOST",
    grpc_port="YOUR_gRPC_PORT",
    grpc_secure=True,
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]  # Or any other inference API keys
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
    headers={"X-OpenAI-Api": os.environ["OPENAI_APIKEY"]}
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

client = weaviate.WeaviateClient(
    connection_params=weaviate.ConnectionParams.from_params(
        http_host="YOUR_HTTP_HOST",
        http_port="YOUR_HTTP_PORT",
        http_secure=True,
        grpc_host="YOUR_gRPC_HOST",
        grpc_port="YOUR_gRPC_PORT",
        grpc_secure=True,
    ),
    auth_client_secret=weaviate.AuthApiKey("YOUR_APIKEY"),
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]
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

# START CreateCollectionExample
import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_local()

collection = client.collections.create(
    name="TestArticle",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_openai(),
    properties=[
        wvc.Property(
            name="title",
            data_type=wvc.DataType.TEXT
        )
    ]
)
# END CreateCollectionExample

# START GetCollectionExample
import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_local()

collection = client.collections.get("TestArticle")
# END GetCollectionExample

# =====================================================================================
# Data examples
# =====================================================================================

client = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]},
)

# START CreateObjectExample
questions = client.collections.get("JeopardyQuestion")

tmp_uuid = questions.data.insert(
    properties={
        "question": "This is the capital of Australia."
    }
)
# END CreateObjectExample

from uuid import UUID

assert type(tmp_uuid) == UUID

# START DeleteObjectExample
questions = client.collections.get("JeopardyQuestion")

deleted = questions.data.delete_by_id(uuid=tmp_uuid)
# END DeleteObjectExample

assert deleted == True

# START InsertManyExample
questions = client.collections.get("JeopardyQuestion")

properties = [{"question": f"Test Question"} for i in range(5)]
response = questions.data.insert_many(properties)
# END InsertManyExample

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
    headers={"X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]},
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
    limit=2
)

for o in response.objects:
    print(o.properties)  # Selected properties only
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
        creation_time_unix=True
    )
)

print(response)
# END ResultDisplayExample


"""
# START ResultDisplayOutput
_GenerativeReturn(objects=[_GenerativeObject(uuid=UUID('f448a778-78bb-5565-9b3b-fd4aed03dad0'), metadata=_MetadataReturn(creation_time_unix=1701373868665, last_update_time_unix=None, distance=0.19842731952667236, certainty=None, score=None, explain_score=None, is_consistent=None), properties={'points': 100.0, 'answer': 'Greyhound', 'air_date': '1996-11-15T00:00:00Z', 'round': 'Jeopardy!', 'question': 'A Hibbing, Minn. museum traces the history of this bus company founded there in 1914 using Hupmobiles'}, vector=None, generated="Un musée à Hibbing, dans le Minnesota, retrace l'histoire de cette compagnie de bus fondée en 1914 en utilisant des Hupmobiles."), _GenerativeObject(uuid=UUID('28ec4a1a-c68e-5cff-b392-f74bf26aef62'), metadata=_MetadataReturn(creation_time_unix=1701373868664, last_update_time_unix=None, distance=0.2006242275238037, certainty=None, score=None, explain_score=None, is_consistent=None), properties={'points': 200.0, 'air_date': '1996-03-26T00:00:00Z', 'answer': 'Harvard', 'round': 'Double Jeopardy!', 'question': "1995 marked the 200th anniversary of this university's Hasty Pudding Club"}, vector=None, generated='1995 a marqué le 200e anniversaire du Hasty Pudding Club de cette université.')], generated="The Greyhound bus company, founded in Hibbing, Minn. in 1914, is traced in a museum using Hupmobiles, while Harvard University's Hasty Pudding Club celebrated its 200th anniversary in 1995.")
# END ResultDisplayOutput
"""

# START ResultJSONDisplayExample
import json

questions = client.collections.get("JeopardyQuestion")
response = questions.query.fetch_objects(limit=1)

# Print result object properties
for o in response.objects:
    print(json.dumps(o.properties, indent=2))
# END ResultJSONDisplayExample

"""
# START ResultJSONDisplayResults
{
  "points": 100.0,
  "answer": "Jonah",
  "air_date": "2001-01-10T00:00:00Z",
  "round": "Jeopardy!",
  "question": "This prophet passed the time he spent inside a fish offering up prayers"
}
# END ResultJSONDisplayResults
"""

# IteratorBasic
all_objects = [question for question in questions.iterator()]
# END IteratorBasic

# IteratorAnswerOnly
all_object_answer_ids = [question for question in questions.iterator(return_properties=["answer"])]
# END IteratorAnswerOnly

# IteratorMetadataOnly
all_object_ids = [question for question in questions.iterator(return_metadata=wvc.MetadataQuery(creation_time_unix=True))]  # Only return IDs
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
    return_metadata=wvc.MetadataQuery(creation_time_unix=True)  # MetaDataQuery object is used to specify the metadata to be returned in the response
)
# END GenericsExample
