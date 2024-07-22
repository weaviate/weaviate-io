# Howto: Multiple target vectors search - Python examples

# TODO: Needs tests

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
from weaviate.auth import AuthApiKey
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=AuthApiKey(os.getenv("WCD_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    },
)

# client = weaviate.connect_to_local(
#     headers={
#         "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
#     }
# )

# ========================
# ===== Basic search =====
# ========================

# START MultiBasicPython
reviews = client.collections.get("WineReviewNV")
# highlight-start
response = reviews.query.hybrid(
    query="A French Riesling",
    target_vector="title_country",
    limit=3
)
# highlight-end

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
if client.collections.exists("Named_Vector_Jeopardy_Collection"):
    client.collections.delete("Named_Vector_Jeopardy_Collection")

# Define a new schema
collection = client.collections.create(
    name="Named_Vector_Jeopardy_Collection",
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
nvjc_collection = client.collections.get("Named_Vector_Jeopardy_Collection")
with nvjc_collection.batch.dynamic() as batch:
    for q in question_objects:
        batch.add_object(properties=q)

# END LoadDataNamedVectors
