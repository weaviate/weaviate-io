# How-to: Manage-data -> Import objects - Python examples
import os
MAX_ROWS_TO_IMPORT = 50  # limit vectorization calls

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# START JSON streaming  # START CSV streaming
import weaviate
# END JSON streaming  # END CSV streaming
# START JSON streaming
import ijson
# END JSON streaming
# START CSV streaming
import pandas as pd
# END CSV streaming


# Instantiate the client with the user/password and OpenAI api key
client = weaviate.Client(
    'http://localhost:8080',  # Replace with your Weaviate URL
    # Replace w/ your Weaviate instance API key. Delete if authentication is disabled.
    # auth_client_secret=weaviate.AuthApiKey('YOUR-WEAVIATE-API-KEY'),
    additional_headers={
        'X-OpenAI-Api-Key': os.environ['OPENAI_API_KEY']  # Replace w/ your OPENAI API key
    }
)

# ============================
# ===== Define the class =====
# ============================

class_definition = {
    'class': 'JeopardyQuestion',
    'description': 'A Jeopardy! question',
    'vectorizer': 'text2vec-openai',
}

# Clean slate
if client.schema.exists('JeopardyQuestion'):
    client.schema.delete_class('JeopardyQuestion')
if not client.schema.exists('JeopardyQuestion'):
    client.schema.create_class(class_definition)


# ============================
# ===== Streaming import =====
# ============================

# START JSON streaming  # START CSV streaming

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
        class_name='JeopardyQuestion',
        # If you Bring Your Own Vectors, add the `vector` parameter here
        # vector=obj.vector
    )

    # Calculate and display progress
    counter += 1
    if counter % interval == 0:
        print(f'Imported {counter} articles...')


# Configure the batch import
client.batch.configure(
    batch_size=10,
)
# END JSON streaming  # END CSV streaming

# START JSON streaming
print('JSON streaming, to avoid running out of memory on large files...')
with open('jeopardy_1k.json', 'rb') as f:
    objects = ijson.items(f, 'item')
    for o in objects:
        add_object(o)
        # END JSON streaming
        if counter >= MAX_ROWS_TO_IMPORT: break
        # START JSON streaming
# END JSON streaming

# START CSV streaming
print('pandas dataframe iterator with lazy-loading, to not load all records in RAM at once...')
with pd.read_csv(
    'jeopardy_1k.csv',
    usecols=['Question', 'Answer', 'Category'],
    chunksize=100,  # number of rows per chunk
) as csv_iterator:
    # Iterate through the dataframe chunks and add each CSV record to the batch
    for chunk in csv_iterator:
        for index, row in chunk.iterrows():
            add_object(row)
            # END CSV streaming
            if counter >= MAX_ROWS_TO_IMPORT * 2: break
        if counter >= MAX_ROWS_TO_IMPORT * 2: break  # break from the outer loop as well
        # START CSV streaming
# END CSV streaming

# START JSON streaming  # START CSV streaming

# Flush any remaining objects in the batch
client.batch.flush()
print(f'Finished importing {counter} articles.')
# END JSON streaming  # END CSV streaming

# Test
response = client.query.aggregate('JeopardyQuestion').with_meta_count().do()
actual_count = response['data']['Aggregate']['JeopardyQuestion'][0]['meta']['count']
assert actual_count == MAX_ROWS_TO_IMPORT * 2, f'Expected {MAX_ROWS_TO_IMPORT * 2} but got {actual_count}'
# END test
