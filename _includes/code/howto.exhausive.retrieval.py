# CursorExample
# Retrieve data
import weaviate

client = weaviate.Client(
    url = "https://some-endpoint.weaviate.network",  # Replace with your endpoint
    auth_client_secret=weaviate.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # If auth enabled. Replace w/ your Weaviate instance API key
)

class_name = "WineReview"
class_properties = ["title"]
batch_size = 20

results = (
    client.query.get(class_name, class_properties)
    .with_additional(["id"])
    .with_limit(batch_size)
    .do()
)
objects_list = list(results["data"]["Get"][class_name])

while True:
    cursor = results["data"]["Get"][class_name][-1]["_additional"]["id"]
    results = (
        client.query.get(class_name, class_properties)
        .with_additional(["id"])
        .with_limit(batch_size)
        .with_after(cursor)
        .do()
    )

    if len(results["data"]["Get"][class_name]) == 0:
        break

    objects_list.extend(results["data"]["Get"][class_name])
# Finished retrieving data

# ===== Tests - retrieval =====
aggregate_resp = client.query.aggregate("WineReview").with_meta_count().do()
aggregate_count = aggregate_resp["data"]["Aggregate"]["WineReview"][0]["meta"]["count"]
assert len(objects_list) == aggregate_count
# ===== END Tests - retrieval =====

# Fetch the schema
class_schema = client.schema.get(class_name)
# Finished fetching the schema

# Restore to a new instance
client = weaviate.Client(
    url = "http://localhost:8080",  # Replace with your endpoint
    auth_client_secret=weaviate.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # If auth enabled. Replace w/ your Weaviate instance API key
)

client.schema.create_class(class_schema)

# Finished restoring to a new instance  # END CursorExample

# ===== Tests - pre-population =====
target_aggregate_resp = client.query.aggregate("WineReview").with_meta_count().do()
target_aggregate_count = target_aggregate_resp["data"]["Aggregate"]["WineReview"][0]["meta"]["count"]
assert target_aggregate_count == 0
# ===== END Tests - pre-population =====

# Restore to a new instance  # CursorExample
with client.batch(
    batch_size=50,
) as batch:

    # Batch import all Questions
    for i, d in enumerate(objects_list):
        properties = {property: d[property] for property in class_properties}
        client.batch.add_data_object(properties, class_name=class_name)
# Finished restoring to a new instance
# END CursorExample

# ===== Tests - pre-population =====
target_aggregate_resp = client.query.aggregate("WineReview").with_meta_count().do()
target_aggregate_count = target_aggregate_resp["data"]["Aggregate"]["WineReview"][0]["meta"]["count"]
assert target_aggregate_count == aggregate_count
# ===== END Tests - pre-population =====
