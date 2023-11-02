# Blog: Automated testing for Weaviate applications - Python code
#SATRT Connect  # START ConnectAndCleanup
import weaviate
import os

# Instantiate the embedded Weaviate client and pass the OpenAI API key
client = weaviate.Client(
    embedded_options=weaviate.embedded.EmbeddedOptions(),
    additional_headers={
        'X-OpenAI-Api-Key': os.environ['OPENAI_API_KEY']  # Replace with your OpenAI API key
    }
)
# Client is now ready to accept requests

# Clean slate for local testing (GitHub Actions VMs start fresh) because Weaviate data is persisted in embedded mode.
client.schema.delete_all()
# Client connected and schema cleared


# Create the class
class_name = 'JeopardyQuestion'
class_definition = {
    'class': class_name,
    'vectorizer': 'text2vec-openai',
}

client.schema.create_class(class_definition)

# Test
retrieved_definition = client.schema.get(class_name)
assert retrieved_definition['moduleConfig']['text2vec-openai']['model'] == 'ada'
# Class created successfully


# Import objects from the JSON file
import json

with open('jeopardy_100.json') as f:
    data = json.load(f)

# Context manager for batch import
with client.batch as batch:
    # Build data objects & add to batch
    for i, obj in enumerate(data):
        batch.add_data_object(
            data_object={
                'question': obj['Question'],
                'answer': obj['Answer'],
            },
            class_name=class_name,
        )
    if i % 20 == 0:
        print(f'Imported {i} objects...')

# Test all objects were imported
response = client.query.aggregate(class_name).with_meta_count().do()
actual_count = response['data']['Aggregate'][class_name][0]['meta']['count']
assert actual_count == 100, f'Expected 100 imported objects but got {actual_count}'
# Import completed successfully


# Run a test query
result = (
    client.query
    .get('JeopardyQuestion', ['question', 'answer'])
    .with_near_text({'concepts': 'chemistry'})
    .with_limit(1)
    .do()
)

# Test
assert 'sodium' in result['data']['Get'][class_name][0]['answer']
# Query test completed
