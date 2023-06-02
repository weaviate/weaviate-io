# Blog: 2023-06-06, embedded-local-weaviate
# START example
import json
import weaviate

client = weaviate.Client(
    embedded_options=weaviate.embedded.EmbeddedOptions()
)

uuid = client.data_object.create({
    'hello': 'World!'
}, 'MyClass')

obj = client.data_object.get_by_id(uuid, class_name='MyClass')

print(json.dumps(obj, indent=4))
# END example

# Test
assert obj['properties']['hello'] == 'World!'
