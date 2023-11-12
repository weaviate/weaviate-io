# How-to: Configure -> Schema - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

# Instantiate the client with the OpenAI API key
client = weaviate.Client(
    'http://localhost:8080',
    additional_headers={
        'X-OpenAI-Api-Key': os.environ['OPENAI_API_KEY']
    }
)

class_name = 'Article'

# Clean slate
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)


# START CreateCollection
class_obj = {'class': 'Article'}

client.schema.create_class(class_obj)  # returns null on success
# END CreateCollection

# Test
result = client.schema.get(class_name)
assert 'invertedIndexConfig' in result

# Delete the class to recreate it
client.schema.delete_class(class_name)


# START PropertyDefinition
class_obj = {
    'class': 'Article',
    # highlight-start
    'properties': [
        {
            'name': 'title',
            'dataType': ['text'],
        },
        {
            'name': 'body',
            'dataType': ['text'],
        },
    ],
    # highlight-end
}

client.schema.create_class(class_obj)  # returns null on success
# END PropertyDefinition

# Test
result = client.schema.get(class_name)
assert 'invertedIndexConfig' in result

# Delete the class to recreate it
client.schema.delete_class(class_name)


# START Vectorizer
class_obj = {
    'class': 'Article',
    'properties': [
        {
            'name': 'title',
            'dataType': ['text'],
        },
    ],
    # highlight-start
    'vectorizer': 'text2vec-openai'  # this could be any vectorizer
    # highlight-end
}

client.schema.create_class(class_obj)
# END Vectorizer

# Test
result = client.schema.get(class_name)
assert result['vectorizer'] == 'text2vec-openai'
assert len(result['properties']) == 1  # no 'body' from the previous example

# Delete the class to recreate it
client.schema.delete_class(class_name)


# START ModuleSettings
class_obj = {
    'class': 'Article',
    'properties': [
        {
            'name': 'title',
            'dataType': ['text'],
        },
    ],
    'vectorizer': 'text2vec-cohere',  # this could be any vectorizer
    # highlight-start
    'moduleConfig': {
        'text2vec-cohere': {  # this must match the vectorizer used
            'vectorizeClassName': True,
            'model': 'embed-multilingual-v2.0',
        }
    }
    # highlight-end
}

client.schema.create_class(class_obj)
# END ModuleSettings

# Test
result = client.schema.get(class_name)
assert result['vectorizer'] == 'text2vec-cohere'
assert result['moduleConfig']['text2vec-cohere']['model'] == 'embed-multilingual-v2.0'

# Delete the class to recreate it
client.schema.delete_class(class_name)


# START PropModuleSettings
class_obj = {
    'class': 'Article',
    'vectorizer': 'text2vec-huggingface',  # this could be any vectorizer
    'properties': [
        {
            'name': 'title',
            'dataType': ['text'],
            # highlight-start
            'moduleConfig': {
                'text2vec-huggingface': {  # this must match the vectorizer used
                    'skip': False,
                    'vectorizePropertyName': False
                }
            }
            # highlight-end
        },
    ],
}

client.schema.create_class(class_obj)
# END PropModuleSettings

# Test
result = client.schema.get(class_name)
assert result['vectorizer'] == 'text2vec-huggingface'
assert result['properties'][0]['moduleConfig']['text2vec-huggingface']['vectorizePropertyName'] is False

# Delete the class to recreate it
client.schema.delete_class(class_name)


# START IndexReplicationSettings
class_obj = {
    'class': 'Article',
    # highlight-start
    'vectorIndexConfig': {
        'distance': 'cosine',
    },
    'replicationConfig': {
        'factor': 3,
    },
    # highlight-end
}

client.schema.create_class(class_obj)
# END IndexReplicationSettings

# Test
result = client.schema.get(class_name)
assert result['replicationConfig']['factor'] == 3

# START Multi-tenancy
class_obj = {
    'class': 'Article',
    'multiTenancyConfig': {'enabled': True}
}

client.schema.create_class(class_obj)  # returns null on success
# END Multi-tenancy


# START AddProp
add_prop = {
    'name': 'body',
    'dataType': ['text'],
}

client.schema.property.create('Article', add_prop)
# END AddProp

# Test
result = client.schema.get(class_name)
assert result['properties'][-1]['name'] == 'body'


# START ModifyParam
class_obj = {
    'invertedIndexConfig': {
      'stopwords': {
        'preset': 'en',
        'removals': ['a', 'the']
      },
    },
}

client.schema.update_config('Article', class_obj)
# END ModifyParam

# Test
result = client.schema.get(class_name)
assert result['invertedIndexConfig']['stopwords']['removals'] == ['a', 'the']

# Delete the class to recreate it
client.schema.delete_class(class_name)


# START SchemaGet
client.schema.get()
# END SchemaGet
