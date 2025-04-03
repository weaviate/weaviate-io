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
anthropic_api_key = os.environ["ANTHROPIC_APIKEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,
    auth_credentials=Auth.api_key(wcd_api_key),
    headers={
        "X-OpenAI-Api-Key": openai_api_key,
        "X-Anthropic-Api-Key": anthropic_api_key
    },
)

# ==============================
# ===== Dynamic RAG syntax =====
# ==============================

# START DynamicRag
from weaviate.classes.generate import GenerativeConfig
from weaviate.classes.query import MetadataQuery

reviews = client.collections.get("WineReviewNV")
response = reviews.generate.near_text(
    query="a sweet German white wine",
    limit=2,
    target_vector="title_country",
    single_prompt="Translate this into German: {review_body}",
    grouped_task="Summarize these review",
    # highlight-start
    generative_provider=GenerativeConfig.openai(
        temperature=0.1,
    ),
    # highlight-end
)

for o in response.objects:
    print(f"Properties: {o.properties}")
    print(f"Single prompt result: {o.generative.text}")
print(f"Grouped task result: {response.generative.text}")
# END DynamicRag

# Test results
assert response.objects[0].collection == "WineReviewNV"
assert "title" in response.objects[0].properties.keys()
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

for o in response.objects:
    print(f"Properties: {o.properties}")
    print(f"Single prompt result: {o.generative.text}")
print(f"Grouped task result: {response.generative.text}")
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
    print(f"Property 'question': {o.properties['question']}")
    # highlight-start
    print(f"Single prompt result: {o.generative.text}")
    # highlight-end
# END SingleGenerativePython

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.objects[0].generative.text) > 0
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
    print(f"Properties: {o.properties}")
    print(f"Single prompt result: {o.generative.text}")
# END SingleGenerativePropertiesPython

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.objects[0].generative.text) > 0
# End test

# =====================================================
# ===== SINGLE GENERATIVE EXAMPLE WITH PARAMETERS =====
# =====================================================

# SingleGenerativeParametersPython
# highlight-start
from weaviate.classes.generate import GenerativeConfig, GenerativeParameters

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
    generative_provider=GenerativeConfig.openai()
)

# print source properties and generated responses
for o in response.objects:
    print(f"Properties: {o.properties}")
    print(f"Single prompt result: {o.generative.text}")
    print(f"Debug: {o.generative.debug}")
    print(f"Metadata: {o.generative.metadata}")
# END SingleGenerativeParametersPython

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.objects[0].generative.text) > 0
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
print(f"Grouped task result: {response.generative.text}")
# END GroupedGenerativePython

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.generative.text) > 0
# End test

# =====================================================
# ===== GROUPED GENERATIVE EXAMPLE WITH PARAMETERS =====
# =====================================================

# START GroupedGenerativeParametersPython
from weaviate.classes.generate import GenerativeConfig, GenerativeParameters

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
    generative_provider=GenerativeConfig.openai()
)

# print the generated response
print(f"Grouped task result: {response.generative.text}")
print(f"Metadata: {o.generative.metadata}")
# END GroupedGenerativeParametersPython

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.generative.text) > 0
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
    grouped_properties=["answer", "question"],
    # highlight-end
)

# print the generated response
# highlight-start
for o in response.objects:
    print(f"Properties: {o.properties}")
print(f"Grouped task result: {response.generative.text}")
# highlight-end
# END GroupedGenerativeProperties Python

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.generative.text) > 0
# End test

# ==========================================
# ===== GENERATIVE EXAMPLE WITH IMAGES =====
# ==========================================

# START WorkingWithImages
import base64
import requests
from weaviate.classes.generate import GenerativeConfig, GenerativeParameters

src_img_path = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/500px-Koala_climbing_tree.jpg"
base64_image = base64.b64encode(requests.get(src_img_path).content).decode('utf-8')

prompt = GenerativeParameters.grouped_task(
    # highlight-start
    prompt="Formulate a Jeopardy!-style question about this image",
    images=[base64_image],      # A list of base64 encoded strings of the image bytes
    # image_properties=["img"], # Properties containing images in Weaviate
    # highlight-end
)

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="Australian animals", 
    limit=3, 
    # highlight-start
    grouped_task=prompt,
    # highlight-end
    grouped_properties=["answer", "question"],
    generative_provider=GenerativeConfig.anthropic(
        max_tokens=1000
    ),
)

# Print the source property and the generated response
for o in response.objects:
    print(f"Properties: {o.properties}")
print(f"Grouped task result: {response.generative.text}")
# END WorkingWithImages

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert len(response.generative.text) > 0
# End test

client.close()
