# THIS FILE NEEDS TESTS

# ==============================
# =====  CONNECT =====
# ==============================

# START ConnectCode
import weaviate, os, json
import weaviate.classes.config as wc

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ[
            "OPENAI_API_KEY"
        ]  # Replace with your OpenAI API key
    }
)

client.is_ready()

# END ConnectCode

# ==============================
# =====  EnableBQ =====
# ==============================

client.collections.delete("YourCollection")

# START EnableBQ
import weaviate.classes.config as wc

client.collections.create(
    name="YourCollection",
    vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(),
    # highlight-start
    vector_index_config=wc.Configure.VectorIndex.flat(
        quantizer=wc.Configure.VectorIndex.Quantizer.bq()
    ),
    # highlight-end
)
# END EnableBQ

# ==============================
# =====  EnableBQ with Options =====
# ==============================

client.collections.delete("YourCollection")

# START BQWithOptions
import weaviate.classes.config as wc

client.collections.create(
    name="YourCollection",
    vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(),
    vector_index_config=wc.Configure.VectorIndex.flat(
        distance_metric=wc.VectorDistances.COSINE,
        vector_cache_max_objects=100000,
        # highlight-start
        quantizer=wc.Configure.VectorIndex.Quantizer.bq(
            rescore_limit=200,
            cache=True
        )
        # highlight-end
    ),
)
# END BQWithOptions

# START-ANY

client.close()
# END-ANY