# THIS FILE NEEDS TESTS

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation shown on snippet
import weaviate
import json, os

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

# ==============================
# =====  CONNECT =====
# ==============================

# ConnectCode
import weaviate
from weaviate import EmbeddedOptions
import os

client = weaviate.Client(
    url = "http://localhost:8080/",  # Replace with your endpoint
    additional_headers = {
        "X-OpenAI-Api-Key": os.getenv("OPENAI_API_KEY")# Replace with your inference API key
    }
)

client.is_ready()
# END ConnectCode

