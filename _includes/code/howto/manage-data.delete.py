# How-to: Manage-data -> Update objects - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

client = weaviate.Client(
    'http://localhost:8080',  # Replace with your Weaviate URL
    # auth_client_secret=weaviate.AuthApiKey('YOUR-WEAVIATE-API-KEY'),  # Replace w/ your Weaviate API key
    additional_headers={
        'X-OpenAI-Api-Key': os.environ['OPENAI_API_KEY']  # Replace w/ your OPENAI API key
    }
)

class_name = 'EphemeralObject'


# =========================
# ===== Delete object =====
# =========================

# START DeleteObject
uuid_to_delete = '...'  # replace with the id of the object you want to delete
# END DeleteObject

uuid_to_delete = client.data_object.create({
    'name': 'Goodbye Cruel World',
}, 'EphemeralObject')

# START DeleteObject

client.data_object.delete(
    uuid=uuid_to_delete,
    class_name='EphemeralObject',
)
# END DeleteObject

# Test
result = client.data_object.get_by_id(uuid_to_delete, class_name=class_name)
assert result is None  # TODO: this is inconsistent with the TypeScript client, which throws a 404


# ==========================
# ===== Error handling =====
# ==========================

# START DeleteError
try:
    client.data_object.delete(
        uuid=uuid_to_delete,
        class_name='EphemeralObject',
    )
    # Returns None on success
except weaviate.exceptions.UnexpectedStatusCodeException as e:
    # 404 error if the id was not found
    print(e)
# END DeleteError
    # Test
    assert e.status_code == 404


# ========================
# ===== Batch delete =====
# ========================
N = 5
for _ in range(N):
    client.data_object.create({
        'name': 'Goodbye Cruel World',
    }, 'EphemeralObject')

result = (
# START DeleteBatch
client.batch.delete_objects(
    class_name='EphemeralObject',
    # highlight-start
    # Same `where` filter as in the GraphQL API
    where={
        'path': ['name'],
        'operator': 'Equal',
        'valueText': 'Goodbye Cruel World'
    },
    # highlight-end
)
# END DeleteBatch
)

# Test
assert result['results']['matches'] == N
result = client.query.get('EphemeralObject', 'name').with_where({
    'path': ['name'],
    'operator': 'Equal',
    'valueText': 'Goodbye Cruel World'
}).do()
assert result['data']['Get']['EphemeralObject'] == []


# ===================
# ===== Dry run =====
# ===================
# START DryRun
for _ in range(N):
    client.data_object.create({
        'name': 'Goodbye Cruel World',
    }, 'EphemeralObject')

result = (
    client.batch.delete_objects(
        class_name='EphemeralObject',
        # Same `where` filter as in the GraphQL API
        where={
            'path': ['name'],
            'operator': 'Equal',
            'valueText': 'Goodbye Cruel World'
        },
        # highlight-start
        dry_run=True,
        output='verbose'
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
      "operator": "Equal",
      "path": [
        "name"
      ],
      "valueText": "Goodbye Cruel World"
    }
  },
  "output": "verbose",
  "results": {
    "failed": 0,
    "limit": 10000,
    "matches": 5,
    "objects": [
      {
        "id": "59f97550-53ee-4e72-b420-deb2038681a2",
        "status": "DRYRUN"
      },
      {
        "id": "7cc00d49-7432-4109-8455-329be8a122e4",
        "status": "DRYRUN"
      },
      {
        "id": "de484913-aca3-4902-9a9f-fdb079f8033f",
        "status": "DRYRUN"
      },
      {
        "id": "3dfc82de-87c6-4239-9d74-e03bd360d4cb",
        "status": "DRYRUN"
      },
      {
        "id": "9cadf849-d2dc-4ece-a015-933a6ae25d41",
        "status": "DRYRUN"
      }
    ],
    "successful": 0
  }
}
# END ResultsDryRun
"""
