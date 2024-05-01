# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# TESTS IN THIS FILE NOT CHECKED OR EXPECTED TO RUN YET

# ===== Instantiation
import weaviate
from weaviate.auth import AuthApiKey
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

# ==================
# ===== EXPORT =====
# ==================

# ExportSchema
collections = client.collections.list_all()
collections_schema = {}

# Create a dictionary of all classes
for k,v in collections.items():
    collections_schema[k] = v.to_dict()
# END ExportSchema

# Test results
assert len(collections_schema) > 0
assert len(next(iter(collections_schema.values()))) > 0
# End test

# ==================
# ===== IMPORT =====
# ==================

# ImportSchema
# Create the class in a new cluster
for k,v in collections_schema.items():
    v["class"] = v["REPLACE_WITH_COLLECTION_NAME"]  
    client.collections.create_from_dict(v)
# EndImportSchema  

# Test import
collections_updated = client.collections.list_all()
assert "REPLACE_WITH_COLLECTION_NAME" in collections_updated.values()