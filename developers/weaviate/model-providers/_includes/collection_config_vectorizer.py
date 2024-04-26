import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"],
        "X-Cohere-Api-Key": os.environ["COHERE_API_KEY"],
    }
)

# START VectorizerCohere
from weaviate.classes.config import Configure

client.collections.create(
    "CohereCollection",
    # highlight-start
    vectorizer_config=Configure.Vectorizer.text2vec_cohere(
        # These parameters are optional
        # model="embed-multilingual-v3.0",
        # truncate="END",  # "NONE", "START" or "END"
        # vectorize_collection_name=False,
        # base_url="<custom_cohere_url>"
    ),
    # highlight-end
    # Additional parameters not shown
)
# END VectorizerCohere
