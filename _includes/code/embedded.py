# Blog: 2023-06-06, embedded-local-weaviate
# START 10lines  # START TestExample
import weaviate
import json

client = weaviate.Client(
    embedded_options=weaviate.embedded.EmbeddedOptions(),
    # END 10lines  # START TestExample
    additional_headers={
        'X-OpenAI-Api-Key': 'YOUR-OPENAI-API-KEY'  # Replace w/ your OPENAI API key
    }
    # START 10lines  # START TestExample
)
# END TestExample

uuid = client.data_object.create({
    'hello': 'World!'
}, 'MyClass')

obj = client.data_object.get_by_id(uuid, class_name='MyClass')

print(json.dumps(obj, indent=2))
# END 10lines
client.schema.delete_all()
# Test
assert obj['properties']['hello'] == 'World!'

# START TestExample

client.schema.create_class({
    'class': 'Wine',
    'vectorizer': 'text2vec-openai',
})

client.data_object.create({
    'name': 'Chardonnay',
    'review': 'Goes well with fish!',
}, 'Wine')

response = (
    client.query
    .get('Wine', ['name', 'review'])
    .with_near_text({
        'concepts': ['great for seafood']
    })
    .do()
)

assert response['data']['Get']['Wine'][0]['review'] == 'Goes well with fish!'
# END TestExample
