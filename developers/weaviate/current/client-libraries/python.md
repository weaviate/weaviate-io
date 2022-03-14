---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries & CLI
title: Python
intro: Weaviate has a native Python client to interact with Weaviate and its data. This page shows how to get started. Code examples are included in all example code blocks of the API (RESTful and GraphQL) on this website. The Python client has additional functionalities (for example schema operations), which are covered in the full client documentation on <a href="https://weaviate-python-client.readthedocs.io/#">weaviate-python-client.readthedocs.io</a>.
description: Python client library for Weaviate
tags: ['python', 'client library']
menu-order: 1
open-graph-type: article
og: /img/og/og-documentation/client-libraries-python.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/client-libs/python.html
    - /documentation/weaviate/current/client-libraries/python.html
    - /documentation/weaviate/current/client-libraries/javascript.html
---

# Installation and setup

The Python library is available on [Pypi.org](https://pypi.org/project/weaviate-client/). The package can be easily installed using [pip](https://pypi.org/project/pip/). The client is developed and tested for Python 3.7 and higher. The current Python client version is {{ site.python_client_version }}.

```bash
$ pip install weaviate-client
```

Now you can use the client in your Python scripts as follows:

```python
import weaviate

client = weaviate.Client("http://localhost:8080") # or another location where your Weaviate instance is running

client.schema.get() # get the full schema as example
```

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

# References documentation

On this Weaviate documentation website, you will find how to use the Python client for all [RESTful endpoints](../restful-api-references/index.html) and [GraphQL functions](../graphql-references/index.html). For each reference, a code block is included with an example of how to use the function with the Python (and other) clients. The Python client, however, has additional functionalities, which are covered in the full client documentation on [weaviate-python-client.readthedocs.io](https://weaviate-python-client.readthedocs.io/en/stable/). Some of these additional functions are highlighted here below.

### Example: client.schema.create(schema)
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

### Example: Blog Post on How to get started with Weaviate and the Python client

A full example of how to use the Python client for Weaviate can be found in [this article on Towards Data Science](https://towardsdatascience.com/getting-started-with-weaviate-python-client-e85d14f19e4f). 

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

# Change logs

### 3.2.0
Fixes/updates in `weaviate.wcs.WCS` class:

- Fixed progress bar for `weaviate.wcs.WCS.create`, it is being updated in Notebooks too, instead of printing each iteration on new line.
- Method `weaviate.wcs.WCS.create` now prints the creation status above the bar.

Updates in `weaviate.gql` sub-package:

- New key-value ``autocorrect: <bool>`` introduced for the `weaviate.gql.filter.NearText` and `weaviate.gql.filter.Ask` filters.
    The ``autocorrect`` is enabled only if Weaviate server has the ``text-spellcheck`` module enabled. If ``autocorrect`` is ``True``, the query is corrected before the query is made. Usage example:

```python
# with 'nearText' filter
client.query\
    .get('Article', ['title', 'author'])\
    .near_text(
        {
            'concepts': ['Ecconomy'],
            'autocorrect': True
        }
    )
    # the concept should be corrected to 'Economy'
# with 'ask' filter
client.query\
    .get('Article', ['title', 'author'])\
    .with_ask(
        {
            'question': 'When was the last financial crysis?',
            'autocorrect': True
        }
    )
    # the question should be corrected to 'When was the last financial crisis?'
```
- New method `weaviate.gql.get.GetBuilder.with_additional` is added to GET the `_additional` properties. Usage example:

```python
# single additional property
client.query\
    .get('Article', ['title', 'author'])\
    .with_additional('id']) # argument as `str`
# multiple additional property
client.query\
    .get('Article', ['title', 'author'])\
    .with_additional(['id', 'certainty']) # argument as `List[str]`
# additional properties as clause
client.query\
    .get('Article', ['title', 'author'])\
    .with_additional(
        {
            'classification' : [
                'basedOn',
                'classifiedFields',
                'completed',
                'id',
                'scope'
            ]
        }
    ) # argument as `Dict[str, List[str]]`
# or
client.query\
    .get('Article', ['title', 'author'])\
    .with_additional(
        {
            'classification' : 'completed'
        }
    ) # argument as `dict[str, str]`
# additional properties as clause and clause settings
clause = {
    'token': [
        'certainty',
        'endPosition',
        'entity',
        'property',
        'startPosition',
        'word',
    ]
}
settings = {
    'properties': ["content"], # is required
    'limit': 10, # optional, int
    'certainty': 0.8 # optional, float
}
client.query\
    .get('Article', ['title', 'author'])\
    .with_additional(
        (clause, settings)
    ) # argument as `Tuple[Dict[str, List[str]], Dict[str, Any]]`
```

### 3.1.1
Fixes in `WCS` class: Make `WCS`’s methods’ argument `cluster_name` case insensitive (lowercased inside the method) to match Weaviate Cloud Service’ naming convention, this fixes the error when Weaviate Cloud Service lowercases the `cluster_name` but the users are not aware of this and get the exception *KeyError*.

### 3.1.0

- New `weaviate.batch.Batch` methods:
    - `weaviate.batch.Batch.pop_object` / `weaviate.batch.Batch.pop_reference` to remove and return an added object/reference from the`weaviate.batch.Batch` at position ``index`` (by default ``-1``).
    - `weaviate.batch.Batch.empty_objects` / `weaviate.batch.Batch.empty_references` to remove all the existing objects/references from the `weaviate.batch.Batch` instance.
    - `weaviate.batch.Batch.is_empty_objects` /`weaviate.batch.Batch.is_empty_references` to check there are any objects/reference in the `weaviate.batch.Batch` instance.
- Fixes in `weaviate.wcs.WCS` class:
    - Authentication only with `weaviate.auth.AuthClientPassword`.
    - The `weaviate.wcs.WCS.create` argument `module` is renamed to `modules` and can also be a list of modules to enable for the WCS cluster. The argument can be used on the [PROD](https://console.semi.technology/) WCS too.
    - The `weaviate.wcs.WCS.get_cluster_config` does not raise an exception if the cluster does not exist but returns a empty configuration.
    - The `weaviate.wcs.WCS.delete_cluster` does not raise an exception if the cluster does not exist.

- Add `phoneNumber` to the Weaviate's primitive types. Thanks to GitHub user [@cdpierse](https://github.com/cdpierse).
- Bug fix in `weaviate.connect.Connection`.
- Fix `ConnectionError` handling.
- Optimization in `weaviate.batch.requests` and `weaviate.connect.connection`.

### 3.0.0

NOTE: This version update contains breaking changes.

- `weaviate.tools` module is REMOVED.
    - `Batcher` class is REMOVED.
    - `WCS` class is moved from the `weaviate.tools` to the new module `weaviate.wcs`
    - `weaviate.tools.generate_uuid` is REMOVED.
- `weaviate.util.generate_uuid5` is ADDED.
- New `weaviate.batch.Batch` class implementation to replace the old one. This implementation uses the `BatchRequest`
    objects under the hood, which means that there is no need to create `BatchRequest`'s anymore. This new class implementation
    allows 3 different batch creations methods: _manual_, _auto-create_ and _auto-create_ with dynamic batching.
    See the `weaviate.batch.Batch` documentation for more information.
- `BatchRequest` classes (`ObjectsBatchRequest` and `ReferenceBatchRequest`) are hidden from the user and should not be
    used anymore. This is due to the new `weaviate.batch.Batch` class implementation.
- New `weaviate.schema.Schema` field is ADDED, `"shardingConfig"`. It can bu used with Weaviate version >= 1.6.0.
- New method `weaviate.schema.Schema.update_config` used to update mutable schema configuration (like `efConstruction`, ...).

Migration guide from `v2.5.x` to `v.3.0.0`:
1. Update `weaviate.tools.generate_uuid` to `weaviate.util.generate_uuid5`
2. Update the creation of objects/references in batches, see below and [here](../restful-api-references/batch.html) what is the correct way.

##### Before: Version v2.*.*

```python
>>> objects_batch = weaviate.ObjectsBatchRequest()
>>> references_batch = weaviate.ReferenceBatchRequest()
>>> BATCH_SIZE = 128
>>> for i in range(len((objects)): # for some objects to be created
...     objects_batch.add(
...         class_name=objects[i]['class_name'],
...         data_object=objects[i]['data_object'],
...         uuid=objects[i]['uuid'],
...     )
...     references_batch.add(
...         from_object_class_name=objects[i]['class_name'],
...         from_object_uuid=objects[i]['uuid'],
...         from_property_name=objects[i]['nextObject'],
...         to_object_uuid=objects[(i + 1) % len(objects)]['uuid']
...     )
...     if i % BATCH_SIZE == 0:
...         client.batch.create_objects(objects_batch)
...         objects_batch = weaviate.ObjectsBatchRequest()
...         client.batch.create_objects(references_batch)
...         references_batch = weaviate.ReferenceBatchRequest()
...
>>> client.batch.create_objects(objects_batch)
```

##### Version v3.*.* Method I: Manual creation


```python
>>> BATCH_SIZE = 128
>>> for i in range(len((objects)): # for some objects to be created
...     client.batch.add_data_object(
...         class_name=objects[i]['class_name'],
...         data_object=objects[i]['data_object'],
...         uuid=objects[i]['uuid'],
...     )
...     client.batch.add_reference(
...         from_object_class_name=objects[i]['class_name'],
...         from_object_uuid=objects[i]['uuid'],
...         from_property_name=objects[i]['nextObject'],
...         to_object_uuid=objects[(i + 1) % len(objects)]['uuid']
...     )
...     if i % BATCH_SIZE == 0:
...         client.batch.create_objects(objects_batch)
...         client.batch.create_objects(references_batch)
...
>>> client.batch.create_objects(objects_batch)
```

Or in a context manager:

```python
>>> BATCH_SIZE = 128
>>> with client.batch as batch:
...     for i in range(len((objects)): # for some objects to be created
...         batch.add_data_object(
...             class_name=objects[i]['class_name'],
...             data_object=objects[i]['data_object'],
...             uuid=objects[i]['uuid'],
...         )
...         batch.add_reference(
...             from_object_class_name=objects[i]['class_name'],
...             from_object_uuid=objects[i]['uuid'],
...             from_property_name=objects[i]['nextObject'],
...             to_object_uuid=objects[(i + 1) % len(objects)]['uuid']
...         )
...         if i % BATCH_SIZE == 0:
...             batch.create_objects(objects_batch)
...             batch.create_objects(references_batch)
```

##### Version v3.*.* Method II: Auto-create when the the sum of data objects and references is BATCH_SIZE:
```python
>>> BATCH_SIZE = 128
>>> client.batch.configure(batch_size=BATCH_SIZE)
>>> # client.batch.configure(batch_size=BATCH_SIZE) is the same as client.batch(batch_size=BATCH_SIZE)
>>> for i in range(len((objects)): # for some objects to be created
...     client.batch.add_data_object(
...         class_name=objects[i]['class_name'],
...         data_object=objects[i]['data_object'],
...         uuid=objects[i]['uuid'],
...     )
...     client.batch.add_reference(
...         from_object_class_name=objects[i]['class_name'],
...         from_object_uuid=objects[i]['uuid'],
...         from_property_name=objects[i]['nextObject'],
...         to_object_uuid=objects[(i + 1) % len(objects)]['uuid']
...     )
>>> client.batch.flush()
```

Or in a context manager:
```python
>>> BATCH_SIZE = 128
>>> with client.batch(batch_size=BATCH_SIZE) as batch:
...     # client.batch.configure(batch_size=BATCH_SIZE) is the same as client.batch(batch_size=BATCH_SIZE)
...     for i in range(len((objects)): # for some objects to be created
...         batch.add_data_object(
...             class_name=objects[i]['class_name'],
...             data_object=objects[i]['data_object'],
...             uuid=objects[i]['uuid'],
...         )
...         batch.add_reference(
...             from_object_class_name=objects[i]['class_name'],
...             from_object_uuid=objects[i]['uuid'],
...             from_property_name=objects[i]['nextObject'],
...             to_object_uuid=objects[(i + 1) % len(objects)]['uuid']
...         )
```

##### Version v3.*.* Method III: Auto-create when data objects or references reach the recommended size:
```python
>>> BATCH_SIZE = 128
>>> client.batch.configure(batch_size=BATCH_SIZE, dynamic=True) # Here the BATCH_SIZE serves as an initial value for recommended batch size
>>> # client.batch.configure(batch_size=BATCH_SIZE) is the same as client.batch(batch_size=BATCH_SIZE)
>>> for i in range(len((objects)): # for some objects to be created
...     client.batch.add_data_object(
...         class_name=objects[i]['class_name'],
...         data_object=objects[i]['data_object'],
...         uuid=objects[i]['uuid'],
...     )
...     client.batch.add_reference(
...         from_object_class_name=objects[i]['class_name'],
...         from_object_uuid=objects[i]['uuid'],
...         from_property_name=objects[i]['nextObject'],
...         to_object_uuid=objects[(i + 1) % len(objects)]['uuid']
...     )
>>> client.batch.flush()
```

Or in a context manager:
```python
>>> BATCH_SIZE = 128
>>> with client.batch(batch_size=BATCH_SIZE) as batch: # Here the BATCH_SIZE serves as an initial value for recommended batch size
...     # client.batch.configure(batch_size=BATCH_SIZE) is the same as client.batch(batch_size=BATCH_SIZE)
...     for i in range(len((objects)): # for some objects to be created
...         batch.add_data_object(
...             class_name=objects[i]['class_name'],
...             data_object=objects[i]['data_object'],
...             uuid=objects[i]['uuid'],
...         )
...         batch.add_reference(
...             from_object_class_name=objects[i]['class_name'],
...             from_object_uuid=objects[i]['uuid'],
...             from_property_name=objects[i]['nextObject'],
...             to_object_uuid=objects[(i + 1) % len(objects)]['uuid']
...         )
```

### 2.5.x
The new version is compatible with Weaviate `v1.4.0`.

#### weaviate.gql.get.GetBuilder

- New method `with_near_image(content: dict, encode: bool = True)` is added for the GET query. E.g.:<br>
   ```python
   content = {
     "image": "IMAGE_PATH/image.png",
     "certainty": 0.7,
   }
   client.query.get("Article", "coverImage").with_near_image(content=content, encode=True).do()
   ```

#### weaviate.util

- New function `image_encoder_b64` to encode a image to base64, the argument is the image path OR the file object in `"br"` mode.<br>
```python
weaviate.util.image_encoder_b64(
    image_or_image_path: Union[str, BufferedReader]
) -> str
```
- New function `image_decoder_b64` to decode a image from base64 to bytes stream, the argument is the base64 encoded image string.<br>
```python
weaviate.util.image_decoder_b64(
    encoded_image: str
) -> bytes
```

### 2.4.x

The new version is compatible with Weaviate `v1.3.0`.

- New method `with_ask` is added for the GET query. E.g.:<br>
   ```python
   ask = {
     "question": "Who is the king of the Netherlands?",
     "certainty": 0.7,
     "properties": ["summary"]
   }
   client.query.get("Article", ["title", "_additional {hasAnswer certainty property result startPosition endPosition}"]).with_ask(ask).do()
   ```
- New `with_auth` argument for `WCS.create` that enables/disables the authentication of the to be created Weaviate instance.<br>
    ```python
    WCS.create(self,
                cluster_name: str=None,
                cluster_type: str='sandbox',
                with_auth: bool=False, # <- NEW
                module: Optional[Union[str, dict]]=None,
                config: dict=None,
                wait_for_completion: bool=True
            ) -> str
    ```

### 2.3.x

#### weaviate.tools
- ADDED `Batcher.add`  method to add either Data Objects or References, based on the `kwargs` values.
- `WCS.create` has a new argument `module` used to specify the module the weaviate should use. It is supported only for the DEV environment at the moment.
- `WCS.create` shows a progress bar if `wait_for_completion` is set to `True`.

#### weaviate.rdf
- `weaviate.rdf` was removed.

#### General 
- General bug fixes
- Fixes for some functions/methods docstrings.
- Updated dependences to newer versions.

### 2.2.x

#### weaviate.gql
- ADDED `NearObject` filter.
- ADDED *GetBuilder*.`with_near_object(content: dict)` method.

#### weaviate.tools
- ADDED new Object `WCS` to create/delete WCS clusters from python.
  - `WCS(auth_client_secret: AuthCredentials, dev: bool=False)`
      `dev` is for development URL.
  - `WCS.create(cluster_name: str=None, cluster_type: str='sandbox', config: dict=None, wait_for_completion: bool=True) -> str:`
      Create a cluster. Returns the cluster URL.
  - `WCS.is_ready(self, cluster_name: str) -> bool:`
      Check if cluster is created and ready to use.
  - `WCS.get_clusters(self, email: str) -> Optional[List[str]]:`
      Lists all weaviate clusters registered with the `email`.
  - `WCS.get_cluster_config(self, cluster_name: str) -> dict:`
      Get details of a cluster.
  - `WCS.delete(self, cluster_name: str) -> None:`
        Delete the WCS instance.

### 2.1.x

- `__version__` global variable is introduced.

#### weaviate.util

- **get_valid_uuid(...)** *raises* `ValueError` instead of returning `None`.
- **get_vector(vector: Sequence) -> list;**  is ADDED.<br>
Get weaviate compatible format of the embedding vector.
- **get_uuid_from_weaviate_url** is REMOVED because **get_valid_uuid** implements it.
- **_get_valid_timeout_config(timeout_config: Union[Tuple[int, int], List[int]])** is ADDED.<br>
Validate and return TimeOut configuration.

#### weaviate.client_config

- **ClientConfig** class is REMOVED.

#### weaviate.client
- Client.\__init\__(..., **client_config: ClientConfig**=None) -> Client.\__init\__(..., **timeout_config: Optional[Tuple[int, int]]**=None)<br>
Due to removal of **ClientConfig**.
- ADDED setter/getter for Client.**timeout_config**.

#### weaviate.data.references

- **_validate_and_get_uuid()** is REMOVED.

#### weaviate.data

- DataObject.create(..., **vector_weights: dict[str]**=None) -> DataObject.create(..., **vector: Sequence**=None).
- DataObject.**merge**(...) -> DataObject.**update**(..., **vector: Sequence**=None).<br>
- DataObject.**update**(...) -> DataObject.**replace**(..., **vector: Sequence**=None).<br>
- DataObject.validate(...) -> DataObject.validate(..., **vector: Sequence**=None).<br>
- DataObject.get(...) -> DataObject.get(..., **uuid: str=None**).<br>
Now `get` can act as *DataObject.get_by_id(...)* too.
- DataObject.**_get_object_response()** is REMOVED.

#### weaviate.connect

- ADDED setter/getter for Connection.**timeout_config**.

#### weaviate.batch
- Batch.**add_references()** is REMOVED.
- BatchRequest.**\__len\__()** is ADDED.
- BatchRequest.**add()** is ADDED.
- ReferenceBatchRequest.**add_reference()** is REMOVED.
- ObjectsBatchRequest.add(...) -> ObjectsBatchRequest.add(..., **vector: Sequence=None**)
- ObjectsBatchRequest.**add_object()** is REMOVED.

### 2.0.x
The Weaviate Python client was updated from version 1.0.0 to 2.0.x on January 12th, 2021. This major change to the client reflects the changes made from Weaviate 0.23.x to 1.0.x. 

#### weaviate.batch <br/>
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

#### weaviate.classification

- Classification.schedule.**with_settings**() **ADDED**<br/>
*Set additional settings for your classification.*

- **SOURCE_WHERE_FILTER, TRAINING_SET_WHERE_FILTER, TARGET_WHERE_FILTER** global variables were **REMOVED**.<br/>
*These global variables were not used anywhere.*

#### weaviate.data.references
- Reference.delete(..., **from_semantic_type, to_semantic_type**) arguments were **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- Reference.update(..., **from_semantic_type, to_semantic_type**) arguments were **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- Reference.add(..., **from_semantic_type, to_semantic_type**) arguments were **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

#### weaviate.data

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

#### weaviate.gql

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

#### weaviate.schema

- Schema.create_class(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- Schema.delete_class(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

#### weaviate.tools

- Batcher.add_data_object(..., **semantic_type**) argument was **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- Batcher.add_reference(..., **from_semantic_type, to_semantic_type**) arguments were **REMOVED**.<br/>
*Due to removal of semantic kind (“things/actions”).*

- Batcher.add_reference(**from_thing_class_name, from_thing_uuid, to_thing_uuid**, ...) -> Batcher.add_reference(**from_object_class_name, from_object_uuid, to_object_uuid**, ...).<br/>
*Due to removal of semantic kind (“things/actions”).*

#### weaviate.exceptions

- **ThingAlreadyExistsException** -> **ObjectAlreadyExistsException**.<br/>
*Due to removal of semantic kind (“things/actions”).*

#### weaviate.util

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



### 1.1.0
The Weaviate Python client was updated from version 1.0.0 to 1.1.0 on September 16th, 2020. This involved the following changes:
- `cardinality` was deprecated from the schema properties (see https://github.com/semi-technologies/weaviate/releases/tag/0.22.17). This field is not required, and ignored, for reference properties in the schema definition anymore. This change is non breaking as the field is not removed, but only ignored.
- `keywords` was deprecated from the schema properties. This field is not required, and ignored, for reference properties in the schema definition anymore. This change is non breaking as the field is not removed, but only ignored.

### 1.0.0
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

## Video: How to use the Python client
*Note: this video was recorded with deprecated Weaviate version 0.22.x and deprecated Python client version 1.2.0, while this page describes Weaviate version {{ site.weaviate_version }}, with a newer Python client {{ site.python_client_version}}. There are significant changes in the API.*

Watch this detailed video to learn how the Python client can be used with a simple dataset. It shows how to connect to Weaviate, create a schema, upload and query data. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/oN2WKHLYKCc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
{% include docs-support-links.html %}
