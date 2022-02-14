---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries & CLI
title: Python
intro: A Python client library for Weaviate.
description: Python client library for Weaviate
tags: ['python', 'client library']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/client-libs/python.html
    - /documentation/weaviate/current/client-libraries/python.html
    - /documentation/weaviate/current/client-libraries/javascript.html
---

# Installation and setup

The Python library is available on [Pypi.org](https://pypi.org/project/weaviate-client/). The package can be easily installed using [pip](https://pypi.org/project/pip/). The client is developed and tested for python 3.7 and higher.

```bash
$ pip install weaviate-client
```

Now you can use the client in your Python scripts as follows:

```python
import weaviate

client = weaviate.Client("http://localhost:8080") # or another location where your Weaviate instance is running

client.schema.get() # get the full schema as example
```

## Video: How to use the Python client
*Note: this video was recorded with Weaviate version 0.22.x and Python client version 1.2.0, while this page describes Weaviate version 1.1.x, with Python client version 2.1.x. There are significant changes in the API.*

Watch this detailed video to learn how the Python client can be used with a simple dataset. It shows how to connect to Weaviate, create a schema, upload and query data. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/oN2WKHLYKCc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 

## Authentication

If you want to use the client against an authenticated Weaviate, you'll need to pass the credentials when you initialize the client:

```python
import weaviate

# Creating a client with a secret
secret = weaviate.AuthClientCredentials("secret")
# Alternative:
# secret = weaviate.AuthClientPassword("user", "pass")

# Initiate the client with the secret
client = weaviate.Client("https://localhost:8080", secret)
```

# Design

## GraphQL query builder pattern

For complex GraphQL queries (e.g. with filters), the client uses a builder pattern to form the queries. An example is the following query with multiple filters:

```python
import weaviate
client = weaviate.Client("http://localhost:8080")

where_filter = {
  "path": ["wordCount"],
  "operator": "GreaterThan",
  "valueInt": 1000
}

near_text_filter = {
  "concepts": ["fashion"],
  "certainty": 0.7,
  "moveAwayFrom": {
    "concepts": ["finance"],
    "force": 0.45
  },
  "moveTo": {
    "concepts": ["haute couture"],
    "force": 0.85
  }
}

query_result = client.query\
    .get("Article", ["title"])\
    .with_where(where_filter)\
    .with_near_text(near_text_filter)\
    .with_limit(50)\
    .do()

print(query_result)
```

Note that you need to use the `do()` function to execute the query. 

# References

All [RESTful endpoints](../restful-api-references/index.html) and [GraphQL functions](../graphql-references/index.html) references covered by the Python client, and explained on those reference pages in the code blocks.

On this page you will find additional functions.

## client.schema.create(schema)
Instead of adding classes one by one using the RESTful `v1/schema` endpoint, you can upload a full schema in JSON format at once using the Python client. Use the function `client.schema.create(schema)` as follows:

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

schema = {
  "classes": [{
    "class": "Publication",
    "description": "A publication with an online source",
    "properties": [
      {
        "dataType": [
          "string"
        ],
        "description": "Name of the publication",
        "name": "name"
      },
      {
        "dataType": [
          "Article"
        ],
        "description": "The articles this publication has",
        "name": "hasArticles"
      },
      {
        "dataType": [
            "geoCoordinates"
        ],
        "description": "Geo location of the HQ",
        "name": "headquartersGeoLocation"
      }
    ]
  }, {
    "class": "Article",
    "description": "A written text, for example a news article or blog post",
    "properties": [
      {
        "dataType": [
          "string"
        ],
        "description": "Title of the article",
        "name": "title"
      },
      {
        "dataType": [
          "text"
        ],
        "description": "The content of the article",
        "name": "content"
      }
    ]
  }, {
    "class": "Author",
    "description": "The writer of an article",
    "properties": [
      {
        "dataType": [
            "string"
        ],
        "description": "Name of the author",
        "name": "name"
      },
      {
        "dataType": [
            "Article"
        ],
        "description": "Articles this author wrote",
        "name": "wroteArticles"
      },
      {
        "dataType": [
            "Publication"
        ],
        "description": "The publication this author writes for",
        "name": "writesFor"
      }
    ]
  }]
}

client.schema.create(schema)
```

## client.schema.delete_all()
You can remove the full schema with `client.schema.delete_all()`:

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

client.schema.delete_all()
```

## client.schema.contains() 
You can check if the Weaviate instance contains any schema with:

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

contains_schema = client.schema.contains()
print(contains_schema)
```

This will return `True` if the instance contains any schema.

In addition, you can check if the instance contains a specific schema. It will return `True` if an exact match between the provided and existing schema is found.

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

schema = {
  "classes": [{
    "class": "Publication",
    "description": "A publication with an online source",
    "properties": [
      {
        "dataType": [
          "string"
        ],
        "description": "Name of the publication",
        "name": "name"
      },
      {
        "dataType": [
          "Article"
        ],
        "description": "The articles this publication has",
        "name": "hasArticles"
      },
      {
        "dataType": [
            "geoCoordinates"
        ],
        "description": "Geo location of the HQ",
        "name": "headquartersGeoLocation"
      }
    ]
  }, {
    "class": "Article",
    "description": "A written text, for example a news article or blog post",
    "properties": [
      {
        "dataType": [
          "string"
        ],
        "description": "Title of the article",
        "name": "title"
      },
      {
        "dataType": [
          "text"
        ],
        "description": "The content of the article",
        "name": "content"
      }
    ]
  }, {
    "class": "Author",
    "description": "The writer of an article",
    "properties": [
      {
        "dataType": [
            "string"
        ],
        "description": "Name of the author",
        "name": "name"
      },
      {
        "dataType": [
            "Article"
        ],
        "description": "Articles this author wrote",
        "name": "wroteArticles"
      },
      {
        "dataType": [
            "Publication"
        ],
        "description": "The publication this author writes for",
        "name": "writesFor"
      }
    ]
  }]
}

contains_schema = client.schema.contains(schema)
print(contains_schema)
```

# Change logs

## 2.1.x

- `__version__` global variable is introduced.

### weaviate.util

- **get_valid_uuid(...)** *raises* `ValueError` instead of returning `None`.
- **get_vector(vector: Sequence) -> list;**  is ADDED.<br>
Get weaviate compatible format of the embedding vector.
- **get_uuid_from_weaviate_url** is REMOVED because **get_valid_uuid** implements it.
- **_get_valid_timeout_config(timeout_config: Union[Tuple[int, int], List[int]])** is ADDED.<br>
Validate and return TimeOut configuration.

### weaviate.client_config

- **ClientConfig** class is REMOVED.

### weaviate.client
- Client.\__init\__(..., **client_config: ClientConfig**=None) -> Client.\__init\__(..., **timeout_config: Optional[Tuple[int, int]]**=None)<br>
Due to removal of **ClientConfig**.
- ADDED setter/getter for Client.**timeout_config**.

### weaviate.data.references

- **_validate_and_get_uuid()** is REMOVED.

### weaviate.data

- DataObject.create(..., **vector_weights: dict[str]**=None) -> DataObject.create(..., **vector: Sequence**=None).
- DataObject.**merge**(...) -> DataObject.**update**(..., **vector: Sequence**=None).<br>
- DataObject.**update**(...) -> DataObject.**replace**(..., **vector: Sequence**=None).<br>
- DataObject.validate(...) -> DataObject.validate(..., **vector: Sequence**=None).<br>
- DataObject.get(...) -> DataObject.get(..., **uuid: str=None**).<br>
Now `get` can act as *DataObject.get_by_id(...)* too.
- DataObject.**_get_object_response()** is REMOVED.

### weaviate.connect

- ADDED setter/getter for Connection.**timeout_config**.

### weaviate.batch
- Batch.**add_references()** is REMOVED.
- BatchRequest.**\__len\__()** is ADDED.
- BatchRequest.**add()** is ADDED.
- ReferenceBatchRequest.**add_reference()** is REMOVED.
- ObjectsBatchRequest.add(...) -> ObjectsBatchRequest.add(..., **vector: Sequence=None**)
- ObjectsBatchRequest.**add_object()** is REMOVED.

## 2.0.x
The Weaviate Python client was updated from version 1.0.0 to 2.0.x on January 12th, 2021. This major change to the client reflects the changes made from Weaviate 0.23.x to 1.0.x. 

### weaviate.batch <br/>
- Batch.**create_things**() -> Batch.**create_objects**() (or Batch.**create**() )<br/>
*Due to removal of semantic kind (“things/actions”).*

 - Batch.**create_actions**() -> Batch.**create_objects**() (or Batch.**create**() )<br/>
*Due to removal of semantic kind (“things/actions”).*

- Batch.**add_reference**() is **DEPRECATED** -> Batch.**create_references**() (or Batch.**create**())<br/>
*Deprecated to make the name consistent with object creation method.*

- Batch.**create**() ADDED<br/>
*This method creates either `objects` or `references`.*

- ReferenceBatchRequest.**get_batch_size**() **REMOVED**<br/>
*Use `len(<ReferenceBatchRequest>)`.*

- ReferenceBatchRequest.**get_reference**() **DEPRECATED** -> ReferenceBatchRequest.**add**()<br/>
*Due to redundancy on name level.*

- **ActionsBatchReference** -> **ObjectsBatchRequest** <br/>
*Due to removal of semantic kind (“things/actions”).*

- **ThingsBatchReference** -> **ObjectsBatchRequest** <br/> 
*Due to removal of semantic kind (“things/actions”).*

- ObjectsBatchRequest.**get_objects**() **DEPRECATED** -> ObjectsBatchRequest.**add**()<br/>
*Due to redundancy on name level.*

### weaviate.classification

- Classification.schedule.**with_settings**() **ADDED**<br/>
*Set additional settings for your classification.*

- **SOURCE_WHERE_FILTER, TRAINING_SET_WHERE_FILTER, TARGET_WHERE_FILTER** global variables were **REMOVED**.<br/>
*These global variables were not used anywhere.*

### weaviate.data.references
- Reference.delete(..., **from_semantic_type, to_semantic_type**) arguments were **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- Reference.update(..., **from_semantic_type, to_semantic_type**) arguments were **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- Reference.add(..., **from_semantic_type, to_semantic_type**) arguments were **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

### weaviate.data

- DataObject.create(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- DataObject.merge(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- DataObject.update(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- DataObject.get_by_id(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- DataObject.get_by_id(..., **underscore_properties**) ->  DataObject.get_by_id(..., **additional_properties**).<br/>
*All underscore properties are now clustered into a single field `additional`.*

- DataObject.get(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- DataObject.get(..., **underscore_properties**) ->  DataObject.get(..., **additional_properties**).<br/>
*All underscore properties are now clustered into a single field `additional`.*

- DataObject.delete(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- DataObject.exists(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- DataObject.validate(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

### weaviate.gql

- Query.METHOD **.thing**(...).with_XXX() -> Query.METHOD(...).with_XXX()<br/>
*Due to removal of semantic kind (“things/actions”).*

- Query.METHOD **.action**(...).with_XXX() -> Query.METHOD(...).with_XXX()<br/>
*Due to removal of semantic kind (“things/actions”).*

- **build.Builder** -> **get.GetBuilder**<br/>
*The module and the class was renamed to reflect the GraphQL functionality.*

- get.GetBuilder.**with_explore**() -> get.GetBuilder.**with_near_text**() [this means that it can be accessed as **Query.get(...).with_near_text()**]<br/>
*Due to the renaming of explore to nearText.*

- get.GetBuilder.**with_near_vector**() is **ADDED** [this means that it can be accessed as **Query.get(...).with_near_vector()**]<br/>
*Due to the addition of a new method nearVector.*

- filter.**Explore** -> filter.**NearText** <br/>
*Due to the renaming of explore to nearText.*

- filter.**NearVector** is **ADDED** <br/>
*Due to the addition of a new method nearVector.*

### weaviate.schema.properties

- Property.create(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

### weaviate.schema

- Schema.create_class(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- Schema.delete_class(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

### weaviate.tools

- Batcher.add_data_object(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- Batcher.add_reference(..., **from_semantic_type, to_semantic_type**) arguments were **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- Batcher.add_reference(**from_thing_class_name, from_thing_uuid, to_thing_uuid**, ...) -> Batcher.add_reference(**from_object_class_name, from_object_uuid, to_object_uuid**, ...).<br/>
*Due to removal of semantic kind (“things/actions”).*

### weaviate.exceptions

- **ThingAlreadyExistsException** -> **ObjectAlreadyExistsException**.<br/>
*Due to removal of semantic kind (“things/actions”).*

### weaviate.util

- generate_local_beacon(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- **is_weaviate_entity_url** -> **is_weaviate_object_url**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- **ParsedUUID** was **REMOVED**.<br/>
Was used only to check if UUID is valid and return it, now the get_valid_uuid can be used instead.

- **is_semantic_type** was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- **is_valid_uuid** was **ADDED**.<br/>
*Replacement for the ParsedUUID class.*



## 1.1.0
The Weaviate Python client was updated from version 1.0.0 to 1.1.0 on September 16th, 2020. This involved the following changes:
- `cardinality` was deprecated from the schema properties (see https://github.com/semi-technologies/weaviate/releases/tag/0.22.17). This field is not required, and ignored, for reference properties in the schema definition anymore. This change is non breaking as the field is not removed, but only ignored.
- `keywords` was deprecated from the schema properties. This field is not required, and ignored, for reference properties in the schema definition anymore. This change is non breaking as the field is not removed, but only ignored.

## 1.0.0
The Weaviate Python client was updated from version 0.4.1 (beta version of the client) to 1.0.0 on September 15th, 2020. The changes are done to have the functions more in line with the RESTful API endpoints and other clients available. The following (breaking) changes are involved in this major update:
  
- The general usage is now `Client.API group.<function>`.

| v0.4.1 function name | v1.0.0 function name | Description |
| --------- | -------- | -------- |
| `client.is_reachable()`   | `client.is_ready()` | Determines whether the application is ready to receive traffic |
| n/a | `client.is_live()` | Determines whether the application is alive |

- All schema operations are now available under `client.schema`, see also the [documentation](../restful-api-references/schema.html).

| v0.4.1 function name | v1.0.0 function name | Description |
| --------- | -------- | -------- |
| `client.contains_schema()`   | `client.schema.contains()` | Check if a schema or specific schema exists |
| `client.create_schema()`   | `client.schema.create(schema)` | Create a new schema |
| `client.get_schema()`   | `client.schema.get()` | Dump the current the database schema |

- All object operations are now available under `client.data_object`.

| v0.4.1 function name | v1.0.0 function name | Description |
| --------- | -------- | -------- |
| `client.create(data :dict, class_name :str, ...)`   | `client.data_object.create(data :dict, class_name :str, ...)` | Create a new data object based on a Thing template |
| `client.patch(data :dict, class_name :str, uuid, ...)`   | `client.data_object.merge(data :dict, class_name :str, uuid, ...)` | Update a data object based on its UUID (using patch semantics) |
| `client.put(...)`   | `client.data_object.update(...)` | Update a data object based on its UUID |
| `client.exists(...)`   | `client.data_object.exists(uuid, ...)` | Checks if an object exists based on it UUID |
| `client.get(...)`   | `client.data_object.get_by_id(uuid, ...)` | Get a data object based on its UUID. Caution there is also a new function `client.data_object.get()` which is equivalent to the get endpoint of the REST API, returning a set of objects without specification of an UUID  |
| `client.delete(...)`   | `client.data_object.delete(uuid, ...)` | Deletes a data object based on its UUID |

- References are grouped under data objects `client.data_object.reference` now.

| v0.4.1 function name | v1.0.0 function name | Description |
| --------- | -------- | -------- |
| `client.add_reference(from_uuid, from_property_name, to_uuid, ...)`   | `client.data_object.reference.add(from_uuid, from_property_name, to_uuid, ...)` | Adds a single reference to a data object |
| `client.delete_reference(from_uuid, from_property_name, to_uuid, ...)`   | `client.data_object.reference.delete(from_uuid, from_property_name, to_uuid, ...)` | Deletes a single reference to a data object |

- All batch operations are now available under `client.batch`. See also [here](https://www.semi.technology/documentation/weaviate/current/restful-api-references/batch.html).

| v0.4.1 function name | v1.0.0 function name | Description |
| --------- | -------- | -------- |
| `client.create_things_in_batch(things_batch_request)`   | `client.batch.create_things(things_batch_request)` | Send batch request to create things |
| `client.create_actions_in_batch(actions_batch_request)`   | `client.batch.create_actions(actions_batch_request)` | Send batch request to create actions |
| `client.add_references_in_batch(reference_batch_request)`   | `client.batch.add_references(reference_batch_request)` | Send batch request to add references |

- To prepare a batch request the three objects still exist:
  ```python
  weaviate.ThingsBatchRequest()
  weaviate.ActionsBatchRequest()
  weaviate.ReferenceBatchRequest()
  ```
  While there has not been a change from `0.4.1` to `1.0.0` there where some changes in the argument positions of the reference batch before. 
  Be aware of that when you update from an older version. This was done to have a more coherent feeling between function calls.

- All Contextionary specific endpoints are now available under `client.contextionary`. See also [here](../modules/text2vec-contextionary.html).
  
| v0.4.1 function name | v1.0.0 function name | Description |
| --------- | -------- | -------- |
| `client.extend_c11y(concept, definition, ...)`   | `client.contextionary.extend(concept, definition)` | Extend the Contextionary with a concept, or replace an existing concept with a new definition |
| `client.get_c11y_vector(word)`   | `client.contextionary.get_concept_vector(concept)` | Get the vector of a concept |

- Classification has been changed significantly and is now following a builder pattern. Please check the [documentation](../restful-api-references/classification.html) on how to use it.

- GraphQL querying got moved to `client.query`. See also [here](../graphql-references/get.html).

| v0.4.1 function name | v1.0.0 function name | Description |
| --------- | -------- | -------- |
| `client.query(gql_query :str)`   | `client.query.raw(gql_query :str` | Send a raw GraphQL query |

# More Resources

{% include docs-support-links.html %}