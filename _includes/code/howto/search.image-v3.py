# How-to: Search -> Image search - Python examples

# This test requires the Dogs image collection to have been imported. Check out the https://github.com/weaviate/weaviate-examples repo
# and follow the steps at https://github.com/weaviate/weaviate-examples/tree/main/nearest-neighbor-dog-searchpython create-schema.py.
# For multi2vec-clip, change in `create-schema.py` the vectorizer and its moduleConfig from `img2vec-neural` to those that will suit `multi2vec-clip`.

# ===========================================
# ===== Search by base64 representation =====
# ===========================================

# START base64
import weaviate
import requests
import base64
import json

client = weaviate.Client(
    'http://localhost:8080',  # Replace with your Weaviate URL
    # Uncomment if authentication is on and replace w/ your Weaviate instance API key.
    # auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),
)

# Fetch URL into `content` variable
image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/640px-Welchcorgipembroke.JPG'
image_response = requests.get(image_url)
content = image_response.content

# END base64

# START base64
# Encode content into base64 string
base64_string = base64.b64encode(content).decode('utf-8')

# Perform query
response = (
    client.query
    .get('Dog', 'breed')
    # highlight-start
    .with_near_image(
        {'image': base64_string},
        encode=False  # False because the image is already base64-encoded
    )
    # highlight-end
    .with_limit(1)
    .do()
)

print(json.dumps(response, indent=2))
# END base64

expected_results = """
# START Expected base64 results
{
  "data": {
    "Get": {
      "Dog": [
        {
          "breed": "Corgi"
        }
      ]
    }
  }
}
# END Expected base64 results
"""

# Tests
assert response['data']['Get']['Dog'] == [{'breed': 'Corgi'}]


# ====================================
# ===== Search by image filename =====
# ====================================

# Save content to file
with open('image.jpg', 'wb') as file:
    file.write(content)

# Perform query
# START ImageFileSearch
response = (
    client.query
    .get('Dog', 'breed')
    # highlight-start
    .with_near_image({'image': 'image.jpg'})  # default `encode=True` reads & encodes the file
    # highlight-end
    .with_limit(1)
    .do()
)
# END ImageFileSearch

# Tests
assert response['data']['Get']['Dog'] == [{'breed': 'Corgi'}]


# ============================
# ===== Maximum distance =====
# ============================

# START Distance
response = (
    client.query
    .get('Dog', 'breed')
    .with_near_image(
        {
            'image': base64_string,
            # highlight-start
            'distance': 0.2
            # highlight-end
        },
        encode=False  # False because the image is already base64-encoded
    )
    # highlight-start
    .with_additional('distance')
    # highlight-end
    .do()
)

print(json.dumps(response, indent=2))
# END Distance

expected_results = """
# START Expected Distance results
{
  "data": {
    "Get": {
      "Dog": [
        {
          "_additional": {
            "distance": 0.1056757
          },
          "breed": "Corgi"
        }
      ]
    }
  }
}
# END Expected Distance results
"""

# Tests
assert response['data']['Get']['Dog'][0]['breed'] == 'Corgi'


# START HelperFunction
# weaviate.util.image_encoder_b64 has questionable utility, since .with_near_image has `encode=True` by default
# encoded_image = weaviate.util.image_encoder_b64(filename)
# response = (
#     client.query
#     .get('Dog', 'breed')
#     .with_near_image({'image': encoded_image}, encode=False)
#     .with_limit(1)
#     .do()
# )
# END HelperFunction
