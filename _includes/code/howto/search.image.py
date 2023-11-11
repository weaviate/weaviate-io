# How-to: Search -> Image search - Python examples

# This test requires the Dogs image collection to have been imported. Check out the https://github.com/weaviate/weaviate-examples repo
# and follow the steps at https://github.com/weaviate/weaviate-examples/tree/main/nearest-neighbor-dog-searchpython create-schema.py.
# For multi2vec-clip, change in `create-schema.py` the vectorizer and its moduleConfig from `img2vec-neural` to those that will suit `multi2vec-clip`.

# =================================================
# ===== Helper functions to convert to base64 =====
# =================================================

# START helper base64 functions
import base64, requests

# Helper function – get base64 representation from an online image
def url_to_base64(url):
    image_response = requests.get(url)
    content = image_response.content
    return base64.b64encode(content).decode('utf-8')

# Helper function - get base64 representation from a local file
def file_to_base64(path):
    with open(path, 'rb') as file:
        return base64.b64encode(file.read()).decode('utf-8')

# Update the url and path to test
test_image_base64 = url_to_base64("https://path-to-some-online-image.jpg")
test_file_base64 = file_to_base64("./your-image-here.jpg")
# END helper base64 functions

import weaviate
import requests
import base64
import json

client = weaviate.connect_to_local()
# ===========================================
# ===== Search by base64 representation =====
# ===========================================

# START search with base64
# Encode content into base64 string
# highlight-start
base64_string=url_to_base64("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/640px-Welchcorgipembroke.JPG") 
# highlight-end

# Get the collection containing images
dogs = client.collections.get("Dog")

# Perform query
# highlight-start
response = dogs.query.near_image(
    near_image=base64_string,
# highlight-end
    return_properties=["breed"],
    limit=1
)

print(response.objects[0])
# END search with base64

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
# TODOv4 update tests
# assert response['data']['Get']['Dog'] == [{'breed': 'Corgi'}]


# ====================================
# ===== Search by image filename =====
# ====================================

# Save content to file
# with open('image.jpg', 'wb') as file:
#     file.write(content)

# Perform query
# START ImageFileSearch
# highlight-start
from pathlib import Path
# highlight-end

dogs = client.collections.get("Dog")
response = dogs.query.near_image(
    # highlight-start
    near_image=Path("./images/search-image.jpg"),
    # highlight-end
    return_properties=["breed"],
    limit=1
)

print(response.objects[0])
# END ImageFileSearch

# Tests
# assert response['data']['Get']['Dog'] == [{'breed': 'Corgi'}]


# ============================
# ===== Maximum distance =====
# ============================

# START Distance
from pathlib import Path
import weaviate.classes as wvc

dogs = client.collections.get("Dog")
response = dogs.query.near_image(
    near_image=Path("./images/search-image.jpg"),
    # highlight-start
    distance=0.8, # Maximum accepted distance
    return_metadata=wvc.MetadataQuery(distance=True), # return distance from the source image
    # highlight-end

    return_properties=["breed"],
    limit=5
)

for item in response.objects:
    print(item)
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
# assert response['data']['Get']['Dog'][0]['breed'] == 'Corgi'


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
