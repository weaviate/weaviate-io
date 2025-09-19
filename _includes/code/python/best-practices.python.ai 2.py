"""
===============================================
Essential Weaviate Python Client Examples (v4.x)
===============================================

This document contains key examples for using the Weaviate Python client (v4.x).

The page also includes comments that indicate to the user where they may find more information.

If the provided examples are not sufficient as in-context example for code generation,
indicate to the user in comments where they may find more information.
"""

# ========================
# 1. CLIENT INSTANTIATION
# ========================
# For more information, see the Python Client library page: https://www.weaviate.io/developers/weaviate/client-libraries/python

"""
Connecting to Weaviate instances (local, cloud, custom)
"""

import weaviate
from weaviate.classes.init import Auth
import os

# Connect to local instance
client = weaviate.connect_to_local()

# Connect with API key authentication and headers
client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Add inference API keys as needed
    }
)

# Connect to Weaviate Cloud
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=Auth.api_key(os.environ["WEAVIATE_API_KEY"]),
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Add inference API keys as needed
    }
)

# Custom connection (more control)
client = weaviate.connect_to_custom(
    http_host="localhost",
    http_port=8080,
    http_secure=False,
    grpc_host="localhost",
    grpc_port=50051,
    grpc_secure=False,
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Add inference API keys as needed
    }
)

# Using context manager for automatic connection closing
with weaviate.connect_to_local() as client:
    # Client operations go here...
    pass  # Connection is closed automatically

# Using try/finally for connection handling
client = weaviate.connect_to_local()
try:
    # Client operations go here...
    pass
finally:
    client.close()  # Ensure connection is closed


# =========================
# 2. COLLECTION MANAGEMENT
# =========================
# For more information, see the How-to Manage Collections page: https://weaviate.io/developers/weaviate/manage-data/collections

"""
Creating, configuring, and managing collections
"""

from weaviate.classes.config import Configure, Property, DataType

# Basic collection creation
client.collections.create("Article")

# Collection with properties
client.collections.create(
    "Article",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
    ]
)

# Collection with vectorizer
client.collections.create(
    "Article",
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
        Property(name="categories", data_type=DataType.TEXT_ARRAY),
        Property(name="is_published", data_type=DataType.BOOL),
        Property(name="word_count", data_type=DataType.INT),
    ]
)

# Collection with named vectors
client.collections.create(
    "ArticleNV",
    vectorizer_config=[
        Configure.NamedVectors.text2vec_openai(
            name="title",
            source_properties=["title"]
        ),
        Configure.NamedVectors.text2vec_openai(
            name="title_body",
            source_properties=["title", "body"]
        ),
        # For user-provided vectors
        Configure.NamedVectors.none(name="custom_vector")
    ],
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
    ]
)

# Collection with generative module
client.collections.create(
    "Article",
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    generative_config=Configure.Generative.openai(
        model="gpt-4"  # Optional specific model
    ),
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
    ]
)

# Collection with references (cross-references)
client.collections.create(
    "Author",
    properties=[
        Property(name="name", data_type=DataType.TEXT),
        Property(name="birthday", data_type=DataType.DATE),
        Property(name="height_m", data_type=DataType.NUMBER),
    ],
    references=[
        weaviate.classes.config.ReferenceProperty(
            name="wroteArticle",
            target_collection="Article"
        )
    ]
)

# Get a collection
collection = client.collections.get("Article")

# Check if collection exists
exists = client.collections.exists("Article")

# List all collections
collections = client.collections.list_all()

# Update a collection
from weaviate.classes.config import Reconfigure

collection = client.collections.get("Article")
collection.config.update(
    inverted_index_config=Reconfigure.inverted_index(
        bm25_k1=1.5
    )
)

# Add a property to an existing collection
collection.config.add_property(
    Property(name="publication_date", data_type=DataType.DATE)
)

# Delete a collection
client.collections.delete("Article")


# ========================
# 3. DATA OPERATIONS
# ========================
# For more information, see the How-to Manage Data pages: https://weaviate.io/developers/weaviate/manage-data

"""
Creating, updating, and retrieving objects
"""

# Insert a single object
collection = client.collections.get("Article")
uuid = collection.data.insert({
    "title": "My first article",
    "body": "This is the body of my first article.",
})

# Insert with a specific UUID
from weaviate.util import generate_uuid5

properties = {
    "title": "My second article",
    "body": "This is the body of my second article."
}
uuid = collection.data.insert(
    properties=properties,
    uuid=generate_uuid5(properties)  # Generate a deterministic ID
)

# Insert with a custom vector
collection.data.insert(
    properties={
        "title": "Article with custom vector",
        "body": "This article has a custom vector."
    },
    vector=[0.1, 0.2, 0.3, 0.4, 0.5]  # Your vector values
)

# Insert with named vectors
collection = client.collections.get("ArticleNV")
collection.data.insert(
    properties={
        "title": "Named vector article",
        "body": "This article uses named vectors."
    },
    vector={
        "title": [0.1, 0.2, 0.3, 0.4, 0.5],  # Vector for title
        "title_body": [0.5, 0.4, 0.3, 0.2, 0.1]  # Vector for title_body
    }
)

# Fetch an object by ID
obj = collection.query.fetch_object_by_id(uuid)
print(obj.properties)

# Fetch objects with vectors
obj = collection.query.fetch_object_by_id(uuid, include_vector=True)
print(obj.vector)  # Access the vector

# Update an object
collection.data.update(
    uuid=uuid,
    properties={
        "title": "Updated title"
    }
)

# Replace an object (replaces all properties)
collection.data.replace(
    uuid=uuid,
    properties={
        "title": "Completely new title",
        "body": "Completely new body"
    }
)

# Delete an object
collection.data.delete_by_id(uuid)

# Working with references
article_uuid = collection.data.insert({"title": "Referenced Article"})
author_collection = client.collections.get("Author")
author_uuid = author_collection.data.insert({"name": "John Doe"})

# Add a reference
author_collection.data.reference_add(
    from_uuid=author_uuid,
    from_property="wroteArticle",
    to=article_uuid
)


# ========================
# 4. BATCH OPERATIONS
# ========================
# For more information, see the How-to batch import data page: https://weaviate.io/developers/weaviate/manage-data/import
# And the Python Client library page: https://weaviate.io/developers/weaviate/client-libraries/python#batch-imports

"""
Batch import for better performance
"""

# Fixed size batch (Recommended option)
collection = client.collections.get("Article")
with collection.batch.fixed_size(batch_size=50) as batch:
    for i in range(100):
        batch.add_object(
            properties={
                "title": f"Article {i}",
                "body": f"This is article {i}"
            }
        )

# Dynamic batch (adapts to Weaviate load)
with collection.batch.dynamic() as batch:
    for i in range(100):
        batch.add_object(
            properties={
                "title": f"Article {i}",
                "body": f"This is article {i}"
            }
        )

# Rate limited batch
with collection.batch.rate_limit(requests_per_minute=600) as batch:
    for i in range(100):
        batch.add_object(
            properties={
                "title": f"Article {i}",
                "body": f"This is article {i}"
            }
        )

# Batch with error handling
with collection.batch.fixed_size(batch_size=50) as batch:
    for i in range(100):
        batch.add_object(
            properties={
                "title": f"Article {i}",
                "body": f"This is article {i}"
            }
        )
        if batch.number_errors > 10:
            print("Too many errors, stopping batch")
            break

# Get failed objects after batch completes
failed_objects = collection.batch.failed_objects
if failed_objects:
    print(f"Number of failed objects: {len(failed_objects)}")

# Insert many items at once
from weaviate.classes.data import DataObject

data_objects = [
    DataObject(
        properties={"title": f"Article {i}", "body": f"Body {i}"},
        vector=[0.1] * 5  # Optional vector
    )
    for i in range(10)
]

collection.data.insert_many(data_objects)


# ========================
# 5. SEARCH OPERATIONS
# ========================
# For more information, see the How-to search pages: https://weaviate.io/developers/weaviate/search

"""
Various search methods (semantic, keyword, hybrid)
"""

# Basic search (fetch objects)
collection = client.collections.get("Article")
response = collection.query.fetch_objects(
    limit=10,
    return_properties=["title", "body"]
)

for obj in response.objects:
    print(obj.properties)

# Semantic search with near_text
response = collection.query.near_text(
    query="artificial intelligence applications",
    limit=5
)

# Search based on vector
vector = [0.1, 0.2, 0.3, 0.4, 0.5]  # Your vector here
response = collection.query.near_vector(
    near_vector=vector,
    limit=5
)

# Search based on existing object
response = collection.query.near_object(
    near_object="36ddd591-2dee-4e7e-a3cc-eb86d30a4303",  # UUID of reference object
    limit=5
)

# BM25 keyword search
response = collection.query.bm25(
    query="artificial intelligence",
    query_properties=["title", "body"],
    limit=5
)

# Hybrid search (combines semantic and keyword)
from weaviate.classes.query import HybridFusion

response = collection.query.hybrid(
    query="artificial intelligence",
    alpha=0.5,  # Balance between keyword and vector search
    fusion_type=HybridFusion.RELATIVE_SCORE,
    limit=5
)

# Search with filters
from weaviate.classes.query import Filter

response = collection.query.near_text(
    query="artificial intelligence",
    filters=Filter.by_property("title").like("*AI*"),
    limit=5
)

# Complex filtering
response = collection.query.near_text(
    query="artificial intelligence",
    filters=(
        Filter.by_property("title").like("*AI*") &
        (Filter.by_property("body").like("*research*") |
         Filter.by_property("body").like("*innovation*"))
    ),
    limit=5
)

# Search with groupBy
from weaviate.classes.query import GroupBy

response = collection.query.near_text(
    query="artificial intelligence",
    group_by=GroupBy(
        prop="category",
        objects_per_group=2,
        number_of_groups=3
    ),
    limit=10
)

# For grouped results
for group_name, group_data in response.groups.items():
    print(f"Group: {group_name}, Objects: {group_data.number_of_objects}")
    for obj in group_data.objects:
        print(obj.properties)

# Getting metadata with search
from weaviate.classes.query import MetadataQuery

response = collection.query.near_text(
    query="artificial intelligence",
    return_metadata=MetadataQuery(
        distance=True,  # Vector distance
        score=True,     # Relevance score
        creation_time=True  # When the object was created
    ),
    limit=5
)

for obj in response.objects:
    print(obj.properties)
    print(f"Distance: {obj.metadata.distance}")
    print(f"Score: {obj.metadata.score}")
    print(f"Created: {obj.metadata.creation_time}")


# ===============================
# 6. GENERATIVE CAPABILITIES
# ===============================
# For more information, see the How-to generative search page: https://weaviate.io/developers/weaviate/search/generative

"""
Using generative models with Weaviate
"""

# Basic generation
collection = client.collections.get("Article")
response = collection.generate.near_text(
    query="artificial intelligence",
    single_prompt="Summarize this article in one sentence: {title} - {body}",
    limit=3
)

for obj in response.objects:
    print(obj.properties)
    print(f"Generated: {obj.generative.text}")

# Grouped generation
response = collection.generate.near_text(
    query="artificial intelligence",
    grouped_task="Compare and contrast these AI articles",
    limit=3
)

print(f"Grouped response: {response.generative.text}")

# Generation with custom provider
from weaviate.classes.generate import GenerativeConfig

response = collection.generate.near_text(
    query="artificial intelligence",
    single_prompt="Summarize this article: {title}",
    generative_provider=GenerativeConfig.openai(
        model="gpt-4",
        temperature=0.7
    ),
    limit=3
)

# Generation with parameters
from weaviate.classes.generate import GenerativeParameters

prompt = GenerativeParameters.single_prompt(
    prompt="Summarize this article: {title}",
    metadata=True,  # Include metadata in response
    debug=True      # Include debug info
)

response = collection.generate.near_text(
    query="artificial intelligence",
    single_prompt=prompt,
    limit=3
)

for obj in response.objects:
    print(f"Generated: {obj.generative.text}")
    print(f"Metadata: {obj.generative.metadata}")
    print(f"Debug: {obj.generative.debug}")


# =================================
# 7. MULTI-TENANCY OPERATIONS
# =================================
# For more information, see the How-to multi-tenancy page: https://weaviate.io/developers/weaviate/manage-data/multi-tenancy
# And the manage tenant data and temperatures page: https://weaviate.io/developers/weaviate/manage-data/tenant-states

"""
Working with multi-tenant collections
"""

# Create a multi-tenant collection
client.collections.create(
    "MultiTenantArticle",
    multi_tenancy_config=Configure.multi_tenancy(enabled=True),
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
    ],
    vectorizer_config=Configure.Vectorizer.text2vec_openai()
)

mt_collection = client.collections.get("MultiTenantArticle")

# Add tenants
from weaviate.classes.tenants import Tenant

mt_collection.tenants.create(
    tenants=[
        Tenant(name="tenant1"),
        Tenant(name="tenant2")
    ]
)

# Get all tenants
tenants = mt_collection.tenants.get()

# Get specific tenant
tenant = mt_collection.tenants.get_by_name("tenant1")

# Use a specific tenant
tenant1_collection = mt_collection.with_tenant("tenant1")

# Add data to a specific tenant
tenant1_collection.data.insert({
    "title": "Tenant 1 Article",
    "body": "This belongs to tenant 1"
})

# Search within a specific tenant
response = tenant1_collection.query.near_text(
    query="article",
    limit=5
)


# ========================
# 8. ITERATING OVER DATA
# ========================
# For more information, see the iterator section of the Python Client library page: https://weaviate.io/developers/weaviate/client-libraries/python#collection-iterator-cursor-api

"""
Iterating over large datasets
"""

# Basic iteration
collection = client.collections.get("Article")
for article in collection.iterator():
    print(article.properties)

# Iteration with specific properties
for article in collection.iterator(return_properties=["title"]):
    print(article.properties["title"])

# Iteration with metadata
from weaviate.classes.query import MetadataQuery

for article in collection.iterator(
    return_metadata=MetadataQuery(creation_time=True)
):
    print(article.properties)
    print(article.metadata.creation_time)


# ========================
# 9. CLEANUP
# ========================

# Don't forget to close the client when done
client.close()
