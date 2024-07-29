# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
from weaviate.auth import AuthApiKey
import os

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=AuthApiKey(os.getenv("WCD_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

# ===============================================
# ===== QUERY WITH TARGET VECTOR & nearText =====
# ===============================================

# NamedVectorNearTextPython
from weaviate.classes.query import MetadataQuery

reviews = client.collections.get("WineReviewNV")
response = reviews.generate.near_text(
    query="a sweet German white wine",
    limit=2,
    # highlight-start
    target_vector="title_country",  # Specify the target vector for named vector collections
    single_prompt="Translate this into German: {review_body}",
    grouped_task="Summarize these review",
    # highlight-end
    return_metadata=MetadataQuery(distance=True)
)

print(response.generated)
for o in response.objects:
    print(o.properties)
    print(o.generated)
# END NamedVectorNearTextPython

# Test results
assert response.objects[0].collection == "WineReviewNV"
assert len(response.objects) == 2
assert "title" in response.objects[0].properties.keys()
assert response.objects[0].metadata.distance is not None
# End test

# =====================================
# ===== SINGLE GENERATIVE EXAMPLE =====
# =====================================

# SingleGenerativePython
# highlight-start
prompt = "Convert the following into a question for twitter. Include emojis for fun, but do not include the answer: {question}."
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
# highlight-start
response = jeopardy.generate.near_text(
# highlight-end
    query="World history",
    limit=2,
    # highlight-start
    single_prompt=prompt
    # highlight-end
)

for o in response.objects:
    print(o.properties["question"])
    # highlight-start
    print(o.generated)
    # highlight-end
# END SingleGenerativePython

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.objects[0].generated) > 0
# End test


# =====================================================
# ===== SINGLE GENERATIVE EXAMPLE WITH PROPERTIES =====
# =====================================================

# SingleGenerativePropertiesPython
# highlight-start
prompt = "Convert this quiz question: {question} and answer: {answer} into a trivia tweet."
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="World history",
    limit=2,
    single_prompt=prompt
)

# print source properties and generated responses
for o in response.objects:
    print(o.properties)
    print(o.generated)
# END SingleGenerativePropertiesPython

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.objects[0].generated) > 0
# End test


# ======================================
# ===== GROUPED GENERATIVE EXAMPLE =====
# ======================================

# GroupedGenerativePython
# highlight-start
task = "What do these animals have in common, if anything?"
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="Cute animals",
    limit=3,
    # highlight-start
    grouped_task=task
    # highlight-end
)

# print the generated response
print(response.generated)
# END GroupedGenerativePython

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.generated) > 0
# End test


# ======================================================
# ===== GROUPED GENERATIVE EXAMPLE WITH PROPERTIES =====
# ======================================================

# GroupedGenerativeProperties Python
task = "What do these animals have in common, if anything?"

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="Australian animals",
    limit=3,
    grouped_task=task,
    # highlight-start
    grouped_properties=["answer", "question"]
    # highlight-end
)

# print the generated response
# highlight-start
print(response.generated)
# highlight-end
# END GroupedGenerativeProperties Python

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.generated) > 0
# End test


client.close()
