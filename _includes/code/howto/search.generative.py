# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_DEMO_URL"]
wcd_api_key = os.environ["WCD_DEMO_RO_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,
    auth_credentials=Auth.api_key(wcd_api_key),
    headers={
        "X-OpenAI-Api-Key": openai_api_key,
    },
)

# ==============================
# ===== Dynamic RAG syntax =====
# ==============================

# START DynamicRag
from weaviate.collections.classes.generative import GenerativeConfig
from weaviate.classes.query import MetadataQuery

reviews = client.collections.get("WineReviewNV")
response = reviews.generate.near_text(
    query="a sweet German white wine",
    target_vector="title_country",  # Specify the target vector for named vector collections
    single_prompt="Translate this into German: {review_body}",
    grouped_task="Summarize these review",
    # highlight-start
    generative_provider=GenerativeConfig.openai(
        temperature=0.1,
    ),
    # highlight-end
)

print(response.generated)
for o in response.objects:
    print(o.properties)
    print(o.generated)
# END DynamicRag

# Test results
assert response.objects[0].collection == "WineReviewNV"
assert len(response.objects) == 2
assert "title" in response.objects[0].properties.keys()
assert response.objects[0].metadata.distance is not None
# End test

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
    return_metadata=MetadataQuery(distance=True),
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
    single_prompt=prompt,
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
prompt = (
    "Convert this quiz question: {question} and answer: {answer} into a trivia tweet."
)
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="World history", limit=2, single_prompt=prompt
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

# =====================================================
# ===== SINGLE GENERATIVE EXAMPLE WITH PARAMETERS =====
# =====================================================

# SingleGenerativeParametersPython
# highlight-start
from weaviate.collections.classes.generative import GenerativeParameters

prompt = GenerativeParameters.single_prompt(
    prompt="Convert this quiz question: {question} and answer: {answer} into a trivia tweet.",
    metadata=True,
    debug=True,
)
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="World history", 
    limit=2, 
    # highlight-start
    single_prompt=prompt,
    # highlight-end
)

# print source properties and generated responses
for o in response.objects:
    print(o.properties)
    print(o.generated)
# END SingleGenerativeParametersPython

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
    grouped_task=task,
    # highlight-end
)

# print the generated response
print(response.generated)
# END GroupedGenerativePython

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.generated) > 0
# End test

# =====================================================
# ===== GROUPED GENERATIVE EXAMPLE WITH PARAMETERS =====
# =====================================================

# START GroupedGenerativeParametersPython
from weaviate.collections.classes.generative import GenerativeParameters

# highlight-start
grouped_task = GenerativeParameters.grouped_task(
    prompt="What do these animals have in common, if anything?",
    metadata=True,
)
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="Cute animals",
    limit=3,
    # highlight-start
    grouped_task=grouped_task,
    # highlight-end
)

# print the generated response
print(response.generated)
# END GroupedGenerativeParametersPython

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.generated) > 0
# End test

)
from weaviate.classes.query import MetadataQuery

# highlight-start
single_prompt = GenerativeParameters.single_prompt(
    prompt="Translate this into German: {review_body}",
    metadata=True,
    debug=True,
)


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
    grouped_properties=["answer", "question"],
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

# ==========================================
# ===== GENERATIVE EXAMPLE WITH IMAGES =====
# ==========================================

# START WorkingWithImages
import base64
import requests
from weaviate.collections.classes.generative import GenerativeParameters

src_img_path = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
base64_image = base64.b64encode(requests.get(src_img_path).content).decode('utf-8')

prompt = GenerativeParameters.single_prompt(
    # highlight-start
    prompt="Does the movie have anything to do with the provided image",
    images=base64_image,         # base64 encoded strings of the image bytes
    image_properties="poster",   # Properties containing images in Weaviate
    # highlight-end
)

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="Movies about nature and space", 
    limit=5, 
    # highlight-start
    single_prompt=prompt,
    # highlight-end
)

# print source properties and generated responses
for o in response.objects:
    print(o.properties)
    print(o.generated)
# END WorkingWithImages

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.objects[0].generated) > 0
# End test

client.close()
