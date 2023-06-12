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
        'X-OpenAI-Api-Key': os.environ['OPENAI_APIKEY']  # Replace w/ your OPENAI API key
    }
)

class_name = 'EphemeralObject'


# =========================
# ===== Delete object =====
# =========================

# START DeleteObject
uuid = '...'  # replace with the id of the object you want to delete
# END DeleteObject

uuid = client.data_object.create({
    'name': 'Goodbye Cruel World',
}, 'EphemeralObject')

# START DeleteObject

try:
    status = client.data_object.delete(
        uuid=uuid,
        class_name='EphemeralObject',
    )
    # Returns None on success
    # END DeleteObject
    assert status is None
# START DeleteObject
except weaviate.exceptions.UnexpectedStatusCodeException as e:
    # 404 error if the id was not found
    print(e)
    # END DeleteObject
    assert e is None  # execution should not reach this point

# Test
result = client.data_object.get_by_id(uuid, class_name=class_name)
assert result is None  # TODO: this is inconsistent with the TypeScript client, which throws a 404
