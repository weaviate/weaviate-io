# How-to: Manage-data -> Update objects - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

client = weaviate.Client(
    "http://localhost:8080",  # Replace with your Weaviate URL
    # auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # Replace w/ your Weaviate API key
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace w/ your OPENAI API key
    }
)

class_name = "EphemeralObject"


# =========================
# ===== Delete object =====
# =========================

# START DeleteObject
uuid_to_delete = "..."  # replace with the id of the object you want to delete
# END DeleteObject

uuid_to_delete = client.data_object.create({
    "name": "EphemeralObjectA",
}, "EphemeralObject")

# Test insertion
assert client.data_object.get_by_id(uuid_to_delete, class_name=class_name)  # Should not fail if object exists

# START DeleteObject

client.data_object.delete(
    uuid=uuid_to_delete,
    class_name="EphemeralObject",  # Class of the object to be deleted
)
# END DeleteObject

# Test
response = client.data_object.get_by_id(uuid_to_delete, class_name=class_name)  # Should return None
assert response == None


# # ==========================
# # ===== Error handling =====
# # ==========================

# # START DeleteError
# try:
#     client.data_object.delete(
#         uuid=uuid_to_delete,
#         class_name="EphemeralObject",
#     )
#     # Returns None on success
# except weaviate.exceptions.UnexpectedStatusCodeException as e:
#     # 404 error if the id was not found
#     print(e)
# # END DeleteError
#     # Test
#     assert e.status_code == 404


# ========================
# ===== Batch delete =====
# ========================
N = 5
for i in range(N):
    client.data_object.create({
        "name": f"EphemeralObject_{i}",
    }, "EphemeralObject")

# Test insertion
response = client.query.aggregate("EphemeralObject").with_meta_count().do()
assert response["data"]["Aggregate"]["EphemeralObject"][0]["meta"]["count"] == 5

# START DeleteBatch
client.batch.delete_objects(
    class_name="EphemeralObject",
    # highlight-start
    where={
        "path": ["name"],
        "operator": "Like",
        "valueText": "EphemeralObject*"
    },
    # highlight-end
)
# END DeleteBatch

# Test deletion
response = client.query.aggregate("EphemeralObject").with_meta_count().do()
assert response["data"]["Aggregate"]["EphemeralObject"][0]["meta"]["count"] == 0

# ============================
# ====== Delete Contains =====
# ============================

# START DeleteContains
client.batch.delete_objects(
    class_name="EphemeralObject",
    where={
        "path": ["name"],
        # highlight-start
        "operator": "ContainsAny",
        "valueTextArray": ["asia", "europe"]  # Note the array syntax
        # highlight-end
    },
)
# END DeleteContains

# ===================
# ===== Dry run =====
# ===================
N = 5
for i in range(N):
    client.data_object.create({
        "name": f"EphemeralObject_{i}",
    }, "EphemeralObject")

# START DryRun
result = (
    client.batch.delete_objects(
        class_name="EphemeralObject",
        # Same `where` filter as in the GraphQL API
        where={
            "path": ["name"],
            "operator": "Like",
            "valueText": "EphemeralObject*"
        },
        # highlight-start
        dry_run=True,
        output="verbose"
        # highlight-end
    )
)

import json
print(json.dumps(result, indent=2))
# END DryRun

expected_results = """
# START ResultsDryRun
{
  "dryRun": true,
  "match": {
    "class": "EphemeralObject",
    "where": {
      "operands": null,
      "operator": "Like",
      "path": [
        "name"
      ],
      "valueText": "EphemeralObject*"
    }
  },
  "output": "verbose",
  "results": {
    "failed": 0,
    "limit": 10000,
    "matches": 5,
    "objects": [
      {
        "id": "208cf21f-f824-40f1-95cb-f923bc840ca6",
        "status": "DRYRUN"
      },
      {
        "id": "8b2dddd4-2dc7-422c-885d-f9d5ff4e80c8",
        "status": "DRYRUN"
      },
      {
        "id": "49b3b2b4-3a77-48cd-8e39-27e83c811fcc",
        "status": "DRYRUN"
      },
      {
        "id": "847b31d0-dab4-4c1c-8cd3-af07c9d3dc2c",
        "status": "DRYRUN"
      },
      {
        "id": "147d9cea-5f9c-40c1-884a-f99bc8e9bf06",
        "status": "DRYRUN"
      }
    ],
    "successful": 0
  }
}
# END ResultsDryRun
"""

# =================================
# ===== Batch delete with IDs =====
# =================================

# START DeleteByIDBatch
client.batch.delete_objects(
    class_name="EphemeralObject",
    where={
        "path": ["id"],
        # highlight-start
        "operator": "ContainsAny",
        "valueTextArray": ["12c88739-7a4e-49fd-bf53-d6a829ba0261", "3022b8be-a6dd-4ef4-b213-821f65cee53b", "30de68c1-dd53-4bed-86ea-915f34faea63"]  # Note the array syntax
        # highlight-end
    },
)
# END DeleteByIDBatch
