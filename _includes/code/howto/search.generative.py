# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import weaviate.classes as wvc
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

try:

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


finally:
    client.close()
