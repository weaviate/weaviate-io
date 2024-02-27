# ==============================
# =====  CONNECT =====
# ==============================

# START ConnectCode
import weaviate, os, json
import weaviate.classes as wvc

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ[
            "OPENAI_API_KEY"
        ]  # Replace with your OpenAI API key
    }
)

# END ConnectCode

# ==============================
# =====  NamedVectorExample ====
# ==============================

client.collections.delete("YourCollection")

# START NamedVectorExample
import weaviate.classes as wvc

client.collections.create(
    name="YourCollection",
    vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(),
    # highlight-start
    vector_index_config=wvc.config.Configure.VectorIndex.flat(),
    # highlight-end
    properties=[
        wvc.config.Property(name="title", data_type=wvc.config.DataType.TEXT),
        wvc.config.Property(name="body", data_type=wvc.config.DataType.TEXT),
    ]
)
# END NamedVectorExample


# START-ANY

client.close()
# END-ANY