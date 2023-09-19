# Instantiation
# user_test.py
import weaviate
from weaviate import Config
import weaviate.weaviate_classes as wvc
import os

client = weaviate.Client(
    "http://localhost:8080",
    additional_config=Config(grpc_port_experimental=50051),
    # ⬇️ Optional, if you want to try it with an inference API / generative serach:
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"],  # Replace with your key
    },
)

print(client.is_ready())
# END Instantiation

# Deletion
# user_test.py
for collection_name in ["TestArticle", "TestAuthor"]:
    client.collection.delete(collection_name)
# END Deletion

# OldSchemaDef
# Old API example
collection_definition = {
    "class": "TestArticle",
    "vectorizer": "text2vec-openai",
    "properties": [
        {
            "name": "title",
            "dataType": ["text"]
        },
    ]
}

client.schema.create_class(collection_definition)
# END OldSchemaDef

for collection_name in ["TestArticle", "TestAuthor"]:
    client.collection.delete(collection_name)

# SimpleCreation
articles = client.collection.create(
    name="TestArticle",
    properties=[
        wvc.Property(
            name="title",
            data_type=wvc.DataType.TEXT,
        ),
    ],
    vectorizer_config=wvc.VectorizerFactory.text2vec_openai(),
)
# END SimpleCreation

for collection_name in ["TestArticle", "TestAuthor"]:
    client.collection.delete(collection_name)

# PartialCreation
# Edit the following to create collection definitions
articles = client.collection.create(
    name="TestArticle",
    properties=[
        wvc.Property(
            name="title",
            data_type=wvc.DataType.TEXT,
        ),
        # Try creating a new property 'body', with the text datatype
        # Try creating a new property 'url', with the text datatype and field tokenization
    ],
    vectorizer_config=wvc.VectorizerFactory.text2vec_openai(),
    generative_config=wvc.GenerativeFactory.openai(),
    replication_config=wvc.ConfigFactory.replication(factor=1),
    # Try adding an inverted index config with property length
)

authors = client.collection.create(
    name="TestAuthor",
    properties=[
        wvc.Property(
            name="name",
            data_type=wvc.DataType.TEXT,
        ),
        # Try creating a new property 'birth_year', with the int datatype
        # Try creating a new cross-reference 'wroteArticle', linking to `TestArticle` collection
    ],
    # Add a Contextionary vectorizer
)
# END PartialCreation

for collection_name in ["TestArticle", "TestAuthor"]:
    client.collection.delete(collection_name)

# Creation
# user_test.py
articles = client.collection.create(
    name="TestArticle",
    properties=[
        wvc.Property(
            name="title",
            data_type=wvc.DataType.TEXT,
        ),
        wvc.Property(
            name="body",
            data_type=wvc.DataType.TEXT,
        ),
        wvc.Property(
            name="url",
            data_type=wvc.DataType.TEXT,
            tokenization=wvc.Tokenization.FIELD,
        ),
    ],
    vectorizer_config=wvc.VectorizerFactory.text2vec_openai(),
    replication_config=wvc.ConfigFactory.replication(factor=1),
    inverted_index_config=wvc.ConfigFactory.inverted_index(
        index_property_length=True
    )
)

authors = client.collection.create(
    name="TestAuthor",
    properties=[
        wvc.Property(
            name="name",
            data_type=wvc.DataType.TEXT,
        ),
        wvc.Property(
            name="birth_year",
            data_type=wvc.DataType.INT,
        ),
        wvc.ReferenceProperty(name="wroteArticle", target_collection="TestArticle")
    ],
    vectorizer_config=wvc.VectorizerFactory.text2vec_openai(),
)
# END Creation

assert client.collection.exists("TestAuthor")
assert client.collection.exists("TestArticle")

# GetCollections
# user_test.py
articles = client.collection.get("TestArticle")
authors = client.collection.get("TestAuthor")
# END GetCollections

# AddOneObject
# user_test.py
my_first_obj = {
    "title": "Something something dark side",
    "body": "A long long time ago, in a galaxy far, far away...",
    "url": "http://www.starwars.com"
}

article_uuid = articles.data.insert(my_first_obj)
print(article_uuid)
# END AddOneObject

# AddAnotherObject
# user_test.py
author_uuid = authors.data.insert(
    {
        "name": "G Lucas",
        "birth_year": 1944,
        "wroteArticle": wvc.ReferenceFactory.to(uuids=[article_uuid])
    }
)

print(author_uuid)
# END AddAnotherObject

# AddArticles
# user_test.py
articles_to_add = [
    wvc.DataObject(
        properties={
            "title": f"The best restaurants of {1980+i}:",
            "body": "1. McDonald's, 2. ...",
            "url": "ss"
        },
    )
    for i in range(5)
]

response = articles.data.insert_many(articles_to_add)
print(response)
# END AddArticles

# AddAuthors
# user_test.py
authors_to_add = [
    wvc.DataObject(
        properties={
            "name": f"Jim {i+1}",
            "birth_year": 1970 + i,
            "wroteArticle": wvc.ReferenceFactory.to(uuids=[article_uuid])
        },
        # vector=CUSTOM_VECTOR_HERE,  # To add custom vectors
        # uuid=CUSTOM_UUID_HERE  # To specify custom UUIDs
    )
    for i in range(5)
]

response = authors.data.insert_many(authors_to_add)
print(response)
# END AddAuthors

# InsertsWithErrors
# user_test.py
articles_to_add = [
    wvc.DataObject(
        properties={
            "title": f"The best restaurants of {1980+i}:",
            "body": "1. McDonald's, 2. ...",
            "url": str(i) if i != 2 else i
        },
    )
    for i in range(5)
]

response = articles.data.insert_many(articles_to_add)
print(response)
# END InsertsWithErrors

# PrintErrors
print(response.errors)
# END PrintErrors

# BasicFetch
# user_test.py
response = articles.query.fetch_objects(limit=2)
print(response)
# END BasicFetch

# FetchWithProps
# user_test.py
response = articles.query.fetch_objects(
    limit=2,
    return_properties=["title"],
    return_metadata=wvc.MetadataQuery(uuid=True)  # MetaDataQuery object is used to specify the metadata to be returned
)

print(response)
# END FetchWithProps

# NearText
# user_test.py
response = articles.query.near_text(
    query="The dark side",
    limit=2,
)

print(response)
# END NearText

# FetchWithFilter
# user_test.py
response = authors.query.fetch_objects(
  filters=wvc.Filter(path=["birth_year"]).greater_or_equal(1971)    # Filter object is used to specify the filter
)

for o in response.objects:
    print(o.properties["birth_year"])
# END FetchWithFilter

# ImportData
# user_test.py
import weaviate_datasets as wd

dataset = wd.JeopardyQuestions1k()  # <-- Comes with pre-vectorized data
dataset.upload_dataset(client, 300)
# END ImportData

# GroupedTask
# user_test.py
from weaviate.collection.classes.grpc import Generate  # <-- This class will be available from `wvc` shortly

questions = client.collection.get("JeopardyQuestion")

response = questions.query.near_text(
    query="Moon landing",
    limit=3,
    generate=Generate(grouped_task="Write a haiku from these facts")
)

print(response)
# END GroupedTask

# OutputGroupedTask
print(response.generated)
# END OutputGroupedTask

# SinglePrompt
response = questions.query.near_text(
    query="European history",
    limit=2,
    generate=Generate(single_prompt="Re-write this in Japanese: {question}")
)

print(response)
# END SinglePrompt

# OutputSinglePrompt
print(response.objects[0].metadata.generative)
print(response.objects[0].metadata.generative)
# END OutputSinglePrompt
