# ==============================
# =====  CONNECT =====
# ==============================

# START-ANY ConnectCode
import weaviate
import weaviate.classes as wvc
import os, json, requests

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"],
        "X-Cohere-Api-Key": os.environ["COHERE_API_KEY"],
    }
)

# END-ANY ConnectCode


# =====================
# ===== LOAD DATA =====
# =====================

# Start with a new collection
# CAUTION: The next two lines delete a collection if it exists
if client.collections.exists("Named_Vector_Jeopardy_Collection"):
    client.collections.delete("Named_Vector_Jeopardy_Collection")


# START LoadDataNamedVectors
import requests

# END LoadDataNamedVectors

# START SetSourceSchemaExample  # START LoadDataNamedVectors
# Define a new schema
collection = client.collections.create(
    name="Named_Vector_Jeopardy_Collection",
    description="Jeopardy game show questions",
    vectorizer_config=[
        wvc.config.Configure.NamedVectors.text2vec_cohere(
            name="jeopardy_questions_vector",
            # highlight-start
            source_properties=["question"],
            # highlight-end
            vectorize_collection_name=False,
        ),
        wvc.config.Configure.NamedVectors.text2vec_openai(
            name="jeopardy_answers_vector",
            # highlight-start
            source_properties=["answer"],
            # highlight-end
            vectorize_collection_name=False,
        ),
    ],
    properties=[
        wvc.config.Property(name="category", data_type=wvc.config.DataType.TEXT),
        wvc.config.Property(name="question", data_type=wvc.config.DataType.TEXT),
        wvc.config.Property(name="answer", data_type=wvc.config.DataType.TEXT),
    ],
)

## CHECK VALUES - uncomment the next line to see the collection definition
# print(collection)

# END SetSourceSchemaExample  # START LoadDataNamedVectors

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


# =======================
# ====  Query example ===
# =======================

# START NamedVectorQueryExample
nvjc_collection = client.collections.get("Named_Vector_Jeopardy_Collection")

response = nvjc_collection.query.near_text(
    query="what's a crocodile",
    include_vector="True",
    target_vector="jeopardy_questions_vector",
    limit=1,
)

for r in response.objects:
    print(r.properties)

# START NamedVectorQueryExample


client.close()
