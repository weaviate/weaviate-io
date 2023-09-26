# Instantiation
import weaviate
from weaviate import Config
import weaviate.classes as wvc
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
client.collection.delete(["TestArticle", "TestAuthor"])
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

client.collection.delete(["TestArticle", "TestAuthor"])

# SimpleCreation
articles = client.collection.create(
    name="TestArticle",
    properties=[
        wvc.Property(
            name="title",
            data_type=wvc.DataType.TEXT,
        ),
    ],
    vectorizer_config=wvc.ConfigFactory.Vectorizer.text2vec_openai()
)
# END SimpleCreation

client.collection.delete(["TestArticle", "TestAuthor"])

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
    vectorizer_config=wvc.ConfigFactory.Vectorizer.text2vec_openai(),
    generative_config=wvc.ConfigFactory.Generative.openai(),
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
    generative_config=wvc.ConfigFactory.Generative.openai(),
    # Add a vectorizer
)
# END PartialCreation

client.collection.delete(["TestArticle", "TestAuthor"])

# Creation
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
    vectorizer_config=wvc.ConfigFactory.Vectorizer.text2vec_openai(),
    generative_config=wvc.ConfigFactory.Generative.openai(),
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
    vectorizer_config=wvc.ConfigFactory.Vectorizer.text2vec_openai(),
    generative_config=wvc.ConfigFactory.Generative.openai(),
)
# END Creation

assert client.collection.exists("TestAuthor")
assert client.collection.exists("TestArticle")

# GetCollections
articles = client.collection.get("TestArticle")
authors = client.collection.get("TestAuthor")
# END GetCollections

# AddOneObject
my_first_obj = {
    "title": "Something something dark side",
    "body": "A long long time ago, in a galaxy far, far away...",
    "url": "http://www.starwars.com"
}

article_uuid = articles.data.insert(my_first_obj)
print(article_uuid)
# END AddOneObject

# AddAnotherObject
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

# IteratorBasic
all_objects = [article for article in articles.iterator()]
# END IteratorBasic

# IteratorTitleOnly
all_object_titles_ids = [article for article in articles.iterator(return_properties=["title"])]
# END IteratorTitleOnly

# IteratorMetadataOnly
all_object_ids = [article for article in articles.iterator(return_metadata=wvc.MetadataQuery(uuid=True))]  # Only return IDs
# END IteratorMetadataOnly

# BasicFetch
response = articles.query.fetch_objects(limit=2)
print(response)
# END BasicFetch

# FetchWithProps
response = articles.query.fetch_objects(
    limit=2,
    return_properties=["title"],
    return_metadata=wvc.MetadataQuery(uuid=True)  # MetaDataQuery object is used to specify the metadata to be returned
)

print(response)
# END FetchWithProps

# NearText
response = articles.query.near_text(
    query="The dark side",
    limit=2,
)

print(response)
# END NearText

# FetchWithFilter
response = authors.query.fetch_objects(
  filters=wvc.Filter(path=["birth_year"]).greater_or_equal(1971)    # Filter object is used to specify the filter
)

for o in response.objects:
    print(o.properties["birth_year"])
# END FetchWithFilter

# ImportData
import weaviate_datasets as wd

dataset = wd.JeopardyQuestions1k()  # <-- Comes with pre-vectorized data
dataset.upload_dataset(client, 300)
# END ImportData

# GroupedTask
questions = client.collection.get("JeopardyQuestion")

# highlight-start
response = questions.generate.near_text(
# highlight-end
    query="Moon landing",
    limit=3,
    # highlight-start
    grouped_task="Write a haiku from these facts"
    # highlight-end
)

print(response)
# END GroupedTask

# OutputGroupedTask
print(response.generated)
# END OutputGroupedTask

# SinglePrompt
response = questions.generate.near_text(
    query="European history",
    limit=2,
    single_prompt="Re-write this in Japanese: {question}"
)

print(response)
# END SinglePrompt

# OutputSinglePrompt
for o in response.objects:
    print(f"Original text: {o.properties['question']}")
    print(f"Generated text: {o.generated}")
# END OutputSinglePrompt

# GroupByExample
response = questions.query_group_by.near_text(
    query="Moon landing",
    limit=3,
    group_by_property="points",
    number_of_groups=2,
    objects_per_group=2
)
print(response.groups)  # Results, grouped by the points property
print(response.objects)  # Individual results, with an added `belongs_to_group` property
# END GroupByExample
