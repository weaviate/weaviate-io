# CursorExample
# Retrieve data
import weaviate

source_client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # Replace with your endpoint
    auth_client_secret=weaviate.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # If auth enabled. Replace w/ your Weaviate instance API key
)

batch_size = 20
class_name = "WineReview"
class_properties = ["title"]
cursor = None


def get_batch_with_cursor(client, class_name, class_properties, batch_size, cursor=None):

    query = (
        client.query.get(class_name, class_properties)
        # highlight-start
        # Optionally retrieve the vector embedding by adding `vector` to the _additional fields
        .with_additional(["id vector"])
        # highlight-end
        .with_limit(batch_size)
    )

    if cursor is not None:
        return query.with_after(cursor).do()
    else:
        return query.do()
# Use this function to retrieve data


# START FetchClassDefinition
class_schema = source_client.schema.get(class_name)
# END FetchClassDefinition

# Restore to a new (target) instance
target_client = weaviate.Client(
    url="https://anon-endpoint.weaviate.network",  # Replace with your endpoint
)

target_client.schema.create_class(class_schema)

# Finished restoring to the target instance  # END CursorExample

# ===== Tests - pre-population =====
target_aggregate_resp = target_client.query.aggregate("WineReview").with_meta_count().do()
target_aggregate_count = target_aggregate_resp["data"]["Aggregate"]["WineReview"][0]["meta"]["count"]
assert target_aggregate_count == 0
# ===== END Tests - pre-population =====

aggregate_count = 0

# Restore to a new (target) instance  # CursorExample
with target_client.batch(
    batch_size=50,
) as batch:

    # Batch import all objects to the target instance
    while True:
        # From the SOURCE instance, get the next group of objects
        results = get_batch_with_cursor(source_client, class_name, class_properties, batch_size, cursor)

        # If empty, we're finished
        if len(results["data"]["Get"][class_name]) == 0:
            break

        # Otherwise, add the objects to the batch to be added to the target instance
        objects_list = results["data"]["Get"][class_name]
        aggregate_count += len(objects_list)

        for retrieved_object in objects_list:
            new_object = dict()
            for prop in class_properties:
                new_object[prop] = retrieved_object[prop]
            batch.add_data_object(
                new_object,
                class_name=class_name,
                # highlight-start
                # Can update the vector if it was included in _additional above
                vector=retrieved_object['_additional']['vector']
                # highlight-end
            )

        # Update the cursor to the id of the last retrieved object
        cursor = results["data"]["Get"][class_name][-1]["_additional"]["id"]
# Finished restoring to the target instance  # END CursorExample

# ===== Tests - post-population =====
target_aggregate_resp = target_client.query.aggregate("WineReview").with_meta_count().do()
target_aggregate_count = target_aggregate_resp["data"]["Aggregate"]["WineReview"][0]["meta"]["count"]
assert target_aggregate_count == aggregate_count
# ===== END Tests - post-population =====
