# ===== Instantiate Weaviate client w/ auth config =====
import weaviate

client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # Replace w/ your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # Replace w/ your API Key for the Weaviate instance. Delete if authentication is disabled.
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",
    },
)

# An example object
data_object = {
    "title": "Apollo 8",
    "body": "Apollo 8 (December 21–27, 1968) was...",
    "url": "https://en.wikipedia.org/wiki/Apollo_8"
}
# END An example object

batch_size = 10
num_workers = 1
n_retries = 3
data_objects = [data_object]
target_class = "TestClass"

# Batch import example
# highlight-start
with client.batch(
    batch_size=batch_size,               # Specify batch size
    num_workers=num_workers,             # Parallelize the process
    dynamic=True,                        # Enable/Disable dynamic batch size change
    timeout_retries=n_retries,           # Number of retries if a timeout occurs
    connection_error_retries=n_retries,  # Number of retries if a connection error occurs
) as batch:
# highlight-end
    for data_object in data_objects:
        batch.add_data_object(
            data_object,
            class_name=target_class
        )
# END Batch import example

results = client.query.get(target_class, list(data_object.keys())).do()
assert len(results["data"]["Get"][target_class]) == 1
client.schema.delete_class(target_class)

from weaviate.util import generate_uuid5
uuid = generate_uuid5(data_object)
object_vector = [1, 2, 3]

# Example with additional properties
with client.batch(
    batch_size=batch_size,               # Specify batch size
    num_workers=num_workers,             # Parallelize the process
    dynamic=True,                        # Enable/Disable dynamic batch size change
    timeout_retries=n_retries,           # Number of retries if a timeout occurs
    connection_error_retries=n_retries,  # Number of retries if a connection error occurs
) as batch:
    for data_object in data_objects:
        batch.add_data_object(
            data_object,
            class_name=target_class,
            # highlight-start
            uuid=uuid,
            vector=object_vector,
            # highlight-end
        )
# END Example with additional properties

results = client.query.get(target_class, list(data_object.keys())).with_additional(["id", "vector"]).do()
assert len(results["data"]["Get"][target_class]) == 1
assert results["data"]["Get"][target_class][0]["_additional"]["id"] == uuid
assert results["data"]["Get"][target_class][0]["_additional"]["vector"] == object_vector
client.schema.delete_class(target_class)

# Example with callback
# highlight-start
def check_batch_result(results: dict):
  """
  Check batch results for errors.

  Parameters
  ----------
  results : dict
      The Weaviate batch creation return value.
  """

  if results is not None:
    for result in results:
      if "result" in result and "errors" in result["result"]:
        if "error" in result["result"]["errors"]:
          print(result["result"])
# highlight-end

with client.batch(
    batch_size=batch_size,               # Specify batch size
    num_workers=num_workers,             # Parallelize the process
    dynamic=True,                        # Enable/Disable dynamic batch size change
    timeout_retries=n_retries,           # Number of retries if a timeout occurs
    connection_error_retries=n_retries,  # Number of retries if a connection error occurs
    # highlight-start
    callback=check_batch_result,
    # highlight-end
) as batch:
    for data_object in data_objects:
        batch.add_data_object(
            data_object,
            class_name=target_class,
            uuid=uuid,
            vector=object_vector,
        )
# END Example with callback
