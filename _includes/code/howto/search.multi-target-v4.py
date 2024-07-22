# Howto: Multiple target vectors search - Python examples

# TODO: Needs tests

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
from weaviate.auth import AuthApiKey
import os

# client = weaviate.connect_to_wcs(
#     cluster_url=os.getenv("WCD_DEMO_URL"),
#     auth_credentials=AuthApiKey(os.getenv("WCD_DEMO_RO_KEY")),
#     headers={
#         "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
#     },
# )

# client = weaviate.connect_to_local(
#     headers={
#         "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
#     }
# )

# ========================
# ===== Basic search =====
# ========================

# START MultiBasicPython
collection = client.collections.get("Jeopardy_Tiny_Dataset")
response = collection.query.near_text(
    query="a wild animal",
    limit=2,
    target_vector=["jeopardy_questions_vector", "jeopardy_answers_vector"],  # Specify the target vectors
)

for o in response.objects:
    print(o.properties)
# END MultiBasicPython


# =============================
# ===== LOAD EXAMPLE DATA =====
# =============================

# START LoadDataNamedVectors
import requests

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

# Start with a new collection
# CAUTION: The next two lines delete the collection if it exists
if client.collections.exists("Jeopardy_Tiny_Dataset"):
    client.collections.delete("Jeopardy_Tiny_Dataset")

# Define a new schema
collection = client.collections.create(
    name="Jeopardy_Tiny_Dataset",
    description="Jeopardy game show questions",
    vectorizer_config=[
        wvc.config.Configure.NamedVectors.text2vec_openai(
            name="jeopardy_questions_vector",
            source_properties=["question"],
            vectorize_collection_name=False,
        ),
        wvc.config.Configure.NamedVectors.text2vec_openai(
            name="jeopardy_answers_vector",
            source_properties=["answer"],
            vectorize_collection_name=False,
        ),
    ],
    properties=[
        wvc.config.Property(name="category", data_type=wvc.config.DataType.TEXT),
        wvc.config.Property(name="question", data_type=wvc.config.DataType.TEXT),
        wvc.config.Property(name="answer", data_type=wvc.config.DataType.TEXT),
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
nvjc_collection = client.collections.get("Jeopardy_Tiny_Dataset")
with nvjc_collection.batch.dynamic() as batch:
    for q in question_objects:
        batch.add_object(properties=q)

# END LoadDataNamedVectors
