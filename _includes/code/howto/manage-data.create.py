# How-to: Manage-data -> Create objects - Python examples
import os
from weaviate.classes.config import Property, DataType, Configure

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import weaviate.classes as wvc

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

try:
    # ============================
    # ===== Define the class =====
    # ============================

    # Clean slate
    client.collections.delete(["JeopardyQuestion", "WineReviewNV"])

    client.collections.create(
        "JeopardyQuestion",
        vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai()
    )

    client.collections.create(
        "WineReviewNV",
        properties=[
            Property(
                name="review_body", data_type=DataType.TEXT, description="Review body"
            ),
            Property(
                name="title", data_type=DataType.TEXT, description="Name of the wine"
            ),
            Property(
                name="country",
                data_type=DataType.TEXT,
                description="Originating country",
            ),
        ],
        vectorizer_config=[
            Configure.NamedVectors.text2vec_openai(name="title", source_properties=["title"]),
            Configure.NamedVectors.text2vec_openai(name="review_body", source_properties=["review_body"]),
            Configure.NamedVectors.text2vec_openai(name="title_country", source_properties=["title", "country"]),
        ]
    )

    # =========================
    # ===== Create object =====
    # =========================

    # CreateObject START
    jeopardy = client.collections.get("JeopardyQuestion")

    # highlight-start
    uuid = jeopardy.data.insert({
    # highlight-end
        "question": "This vector DB is OSS & supports automatic property type inference on import",
        # "answer": "Weaviate",  # properties can be omitted
        "newProperty": 123,  # will be automatically added as a number property
    })

    print(uuid)  # the return value is the object's UUID
    # CreateObject END

    # Test
    result = jeopardy.query.fetch_object_by_id(uuid)
    assert result.properties["newProperty"] == 123


    # =======================================
    # ===== Create object with a vector =====
    # =======================================

    # CreateObjectWithVector START
    jeopardy = client.collections.get("JeopardyQuestion")
    uuid = jeopardy.data.insert(
        properties={
            "question": "This vector DB is OSS and supports automatic property type inference on import",
            "answer": "Weaviate",
        },
        # highlight-start
        vector=[0.12345] * 1536
        # highlight-end
    )

    print(uuid)  # the return value is the object's UUID
    # CreateObjectWithVector END


    # =======================================
    # ===== Create object with named vectors =====
    # =======================================

    # CreateObjectNamedVectors START
    reviews = client.collections.get("WineReviewNV")  # This collection must have named vectors configured
    uuid = reviews.data.insert(
        properties={
            "title": "A delicious Riesling",
            "review_body": "This wine is a delicious Riesling which pairs well with seafood.",
            "country": "Germany",
        },
        # highlight-start
        # Specify the named vectors, following the collection definition
        vector={
            "title": [0.12345] * 1536,
            "review_body": [0.31313] * 1536,
            "title_country": [0.05050] * 1536,
        }
        # highlight-end
    )

    print(uuid)  # the return value is the object's UUID
    # CreateObjectNamedVectors END

    # Test
    result = reviews.query.fetch_object_by_id(uuid, include_vector=True)
    assert set(result.vector.keys()) == {'title', 'review_body', 'title_country'}


    # ===============================================
    # ===== Create object with deterministic id =====
    # ===============================================

    # CreateObjectWithDeterministicId START
    # highlight-start
    from weaviate.util import generate_uuid5  # Generate a deterministic ID
    # highlight-end

    data_object = {
        "question": "This vector DB is OSS and supports automatic property type inference on import",
        "answer": "Weaviate",
    }

    jeopardy = client.collections.get("JeopardyQuestion")
    uuid = jeopardy.data.insert(
        properties=data_object,
        # highlight-start
        uuid=generate_uuid5(data_object),
        # highlight-end
    )
    # CreateObjectWithDeterministicId END

    # Test
    assert generate_uuid5(data_object) == str(uuid)
    jeopardy.data.delete_by_id(uuid)  # Clean up


    # ============================================
    # ===== Create object with id and vector =====
    # ============================================

    # CreateObjectWithId START
    properties = {
        "question": "This vector DB is OSS and supports automatic property type inference on import",
        "answer": "Weaviate",
    }
    jeopardy = client.collections.get("JeopardyQuestion")
    uuid = jeopardy.data.insert(
        properties=properties,
        # highlight-start
        uuid="12345678-e64f-5d94-90db-c8cfa3fc1234"
        # highlight-end
    )

    print(uuid)  # the return value is the object's UUID
    # CreateObjectWithId END

    # Test
    result = jeopardy.query.fetch_object_by_id(uuid)
    assert result.properties["question"] == properties["question"]


    # ===========================
    # ===== Validate object =====
    # ===========================

    # ValidateObject START
    # Validate is currently not supported with the Weaviate Python client v4
    # ValidateObject END

    # # ValidateObject-TODO START
    # jeopardy = client.collections.get("JeopardyQuestion")
    # # highlight-start
    # #TODO: see if this is supported
    # result = jeopardy.data.validate(
    # # highlight-end
    #     properties={
    #       "question": "This vector DB is open-source and supports auto-schema",
    #       "answer": "Weaviate",
    #       "thisPropShouldNotEndUpInTheSchema": -1,
    #     },
    #     uuid="12345678-1234-1234-1234-123456789012",
    # )

    # # "invalid object: no such prop with name "thisPropShouldNotEndUpInTheSchema" found..."
    # print(json.dumps(result, indent=2))
    # # ValidateObject-TODO END

    # # TODO: update the assertion
    # assert "thisPropShouldNotEndUpInTheSchema" in result["error"][0]["message"]

finally:
    client.close()
