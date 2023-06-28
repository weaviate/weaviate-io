# Blog: Automated testing for Weaviate applications - Python code
# START
import weaviate
import os
import ijson
import csv

MAX_ROWS_TO_IMPORT = 50  # TODO set to something like 50 to limit vectorization API calls

# Instantiate the embedded Weaviate client with the user/password and OpenAI API key
client = weaviate.Client(
    embedded_options=weaviate.embedded.EmbeddedOptions(),
    additional_headers={
        'X-OpenAI-Api-Key': os.environ['OPENAI_API_KEY']  # Replace w/ your OpenAI API key
    }
)

# ============================
# ===== Define the class =====
# ============================
class_name = 'JeopardyQuestion'
class_definition = {
    'class': class_name,
    'description': 'A Jeopardy! question',
    'vectorizer': 'text2vec-openai',
}

# Clean slate for local testing (GitHub Actions VMs start fresh) because Weaviate data is persisted in embedded mode.
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)
if not client.schema.exists(class_name):
    client.schema.create_class(class_definition)


# ============================
# ===== Streaming import =====
# ============================
batch_size = 10
# Settings for displaying the import progress
counter = 0
interval = 20  # print progress every this many records; should be bigger than the batch_size


def add_object(obj) -> None:
    global counter
    properties = {
        'question': obj['Question'],
        'answer': obj['Answer'],
    }

    # Add the object to the batch
    client.batch.add_data_object(
        data_object=properties,
        class_name=class_name,
        # If you Bring Your Own Vectors, add the `vector` parameter here
        # vector=obj.vector
    )

    # Calculate and display progress
    counter += 1
    if counter % interval == 0:
        print(f'Imported {counter} articles...')


# Configure the batch import
client.batch.configure(
    batch_size=batch_size,
)

print('JSON streaming, to avoid running out of memory on large files...')
with open('jeopardy_1k.json', 'rb') as f:
    objects = ijson.items(f, 'item')
    for o in objects:
        add_object(o)
        if counter >= MAX_ROWS_TO_IMPORT:
            break

client.batch.flush()
print(f'Finished importing {counter} articles.')

# Test all objects were imported
response = client.query.aggregate(class_name).with_meta_count().do()
actual_count = response['data']['Aggregate'][class_name][0]['meta']['count']
assert actual_count == MAX_ROWS_TO_IMPORT, f'Expected {MAX_ROWS_TO_IMPORT} but got {actual_count}'

# Export all objects
class_properties = ['question', 'answer']
cursor = None
with open('objects.csv', 'a', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=class_properties + ['id', 'vector'])
    # Write the header if the file is empty
    if csvfile.tell() == 0:
        writer.writeheader()

    # Batch retrieve the records
    while True:
        query = (
            client.query.get(class_name, ' '.join(class_properties))
            # Retrieve the id (cursor) and the vector embedding by adding them to the _additional fields
            .with_additional(["id vector"])
            .with_limit(batch_size)
        )

        if cursor is not None:
            query = query.with_after(cursor)

        results = query.do()

        # If empty, we're finished
        if len(results["data"]["Get"][class_name]) == 0:
            break

        # Otherwise, add the objects to the batch to be added to the target instance
        objects_list = results["data"]["Get"][class_name]
        # TODO aggregate_count += len(objects_list)

        # Export
        for retrieved_object in objects_list:
            record = {key: retrieved_object[key] for key in class_properties}
            record['id'] = retrieved_object['_additional']['id']
            record['vector'] = retrieved_object['_additional']['vector']
            writer.writerow(record)

        # Update the cursor to the id of the last retrieved object
        cursor = results["data"]["Get"][class_name][-1]["_additional"]["id"]
# END
