# Howto: Multiple target vectors search - Python examples

# TODO: Needs tests

# =============================
# ===== LOAD EXAMPLE DATA =====
# =============================

# START LoadDataNamedVectors
import requests
import json
import os
import weaviate
from weaviate.classes.config import Configure, Property, DataType

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

# Start with a new collection
# CAUTION: The next two lines delete the collection if it exists
if client.collections.exists("JeopardyTiny"):
    client.collections.delete("JeopardyTiny")

# Define a new schema
collection = client.collections.create(
    name="JeopardyTiny",
    description="Jeopardy game show questions",
    vectorizer_config=[
        Configure.NamedVectors.text2vec_openai(
            name="jeopardy_questions_vector",
            source_properties=["question"],
            vectorize_collection_name=False,
        ),
        Configure.NamedVectors.text2vec_openai(
            name="jeopardy_answers_vector",
            source_properties=["answer"],
            vectorize_collection_name=False,
        ),
    ],
    properties=[
        Property(name="category", data_type=DataType.TEXT),
        Property(name="question", data_type=DataType.TEXT),
        Property(name="answer", data_type=DataType.TEXT),
    ],
)

# Get the sample data set
resp = requests.get(
    "https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json"
)
data = json.loads(resp.text)

# Prepare the sample data for upload
question_objects = list()
for row in data:
    question_objects.append(
        {
            "question": row["Question"],
            "answer": row["Answer"],
            "category": row["Category"],
        }
    )

# Upload the sample data
nvjc_collection = client.collections.get("JeopardyTiny")
with nvjc_collection.batch.dynamic() as batch:
    for q in question_objects:
        batch.add_object(properties=q)

# END LoadDataNamedVectors

# ========================
# ===== Basic search =====
# ========================

# START MultiBasic
from weaviate.classes.query import MetadataQuery

collection = client.collections.get("JeopardyTiny")

response = collection.query.near_text(
    query="a wild animal",
    limit=2,
    # highlight-start
    target_vector=["jeopardy_questions_vector", "jeopardy_answers_vector"],  # Specify the target vectors
    # highlight-end
    return_metadata=MetadataQuery(distance=True)
)

for o in response.objects:
    print(o.properties)
    return_metadata=MetadataQuery(distance=True)
# END MultiBasic


# ========================
# ===== NearVectorWithMultiVector =====
# ========================

some_result = collection.query.fetch_objects(limit=2, include_vector=True)

v1 = some_result.objects[0].vector["jeopardy_questions_vector"]
v2 = some_result.objects[1].vector["jeopardy_answers_vector"]

# START MultiTargetNearVector
from weaviate.classes.query import MetadataQuery

collection = client.collections.get("JeopardyTiny")

response = collection.query.near_vector(
    # highlight-start
    # Specify the query vectors for each target vector
    near_vector={
        "jeopardy_questions_vector": v1,
        "jeopardy_answers_vector": v2,
    },
    # highlight-end
    limit=2,
    target_vector=["jeopardy_questions_vector", "jeopardy_answers_vector"],  # Specify the target vectors
    return_metadata=MetadataQuery(distance=True)
)

for o in response.objects:
    print(o.properties)
    return_metadata=MetadataQuery(distance=True)
# END MultiTargetNearVector


# ========================
# ===== Simple join strategy =====
# ========================

# START MultiTargetWithSimpleJoin
from weaviate.classes.query import TargetVectors, MetadataQuery

collection = client.collections.get("JeopardyTiny")

response = collection.query.near_text(
    query="a wild animal",
    limit=2,
    # highlight-start
    target_vector=TargetVectors.average(["jeopardy_questions_vector", "jeopardy_answers_vector"]),  # Specify the target vectors and the join strategy
    # .sum(), .minimum(), .manual_weights(), .relative_score() also available
    # highlight-end
    return_metadata=MetadataQuery(distance=True)
)

for o in response.objects:
    print(o.properties)
    print(o.metadata.distance)
# END MultiTargetWithSimpleJoin


# ========================
# ===== Set Manual Weights =====
# ========================

# START MultiTargetManualWeights
from weaviate.classes.query import TargetVectors, MetadataQuery

collection = client.collections.get("JeopardyTiny")

response = collection.query.near_text(
    query="a wild animal",
    limit=2,
    # highlight-start
    target_vector=TargetVectors.manual_weights({
        "jeopardy_questions_vector": 10,
        "jeopardy_answers_vector": 50
    }),
    # highlight-end
    return_metadata=MetadataQuery(distance=True)
)

for o in response.objects:
    print(o.properties)
    print(o.metadata.distance)
# END MultiTargetManualWeights


# ========================
# ===== Relative Score =====
# ========================

# START MultiTargetRelativeScore
from weaviate.classes.query import TargetVectors, MetadataQuery

collection = client.collections.get("JeopardyTiny")

response = collection.query.near_text(
    query="a wild animal",
    limit=2,
    # highlight-start
    target_vector=TargetVectors.relative_score({
        "jeopardy_questions_vector": 10,
        "jeopardy_answers_vector": 10
    }),
    # highlight-end
    return_metadata=MetadataQuery(distance=True)
)

for o in response.objects:
    print(o.properties)
    print(o.metadata.distance)
# END MultiTargetRelativeScore


client.close()
