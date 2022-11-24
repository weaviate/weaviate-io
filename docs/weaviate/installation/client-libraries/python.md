---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries
title: Python
intro: Weaviate has a native Python client to interact with Weaviate and its data. This page shows how to get started. Code examples are included in all example code blocks of the API (RESTful and GraphQL) on this website. The Python client has additional functionalities (for example schema operations), which are covered in the full client documentation on <a href="https://weaviate-python-client.readthedocs.io/#">weaviate-python-client.readthedocs.io</a>.
description: Python client library for Weaviate
tags: ['python', 'client library']
sidebar_position: 1
open-graph-type: article
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

### OIDC authentication flow
To use the client against an authenticated Weaviate using the OIDC authentication flow, pass the credentials as a parameter when you initialize the client:

```python
import weaviate

# Creating a client with a secret
secret = weaviate.AuthClientCredentials("secret")
# Alternative:
# secret = weaviate.AuthClientPassword("user", "pass")

# Initiate the client with the secret
client = weaviate.Client("https://localhost:8080", auth_client_secret=secret)
```

### Bearer Token authentication
You can also authenticate to Weaviate using a bearer token directly. You can do this by setting an additional header:
```python
import weaviate

# Initiate the client with the secret
client = weaviate.Client(
  "https://localhost:8080",
  additional_headers={"authorization": "Bearer <MY_TOKEN>"},
)
```

## Neural Search Frameworks

There is a variety of neural search frameworks that use Weaviate under the hood to store, search through, and retrieve vectors.

- deepset's [haystack](https://www.deepset.ai/weaviate-vector-search-engine-integration)
- Jina's [DocArray](https://docarray.jina.ai/advanced/document-store/weaviate/)

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

# Batching

Batching is a way of importing/creating `objects` and `references` in bulk using a single API request to the Weaviate Server. With python this can be done using 3 different methods:

1. ***Auto-batching***
2. ***Dynamic-batching***
3. ***Manual-batching***

## New: Multi-threading batch import (weaviate-client>=3.9.0)
Python client version `3.9.0` introduces Multi-threading Batch import which works with both `Auto-batching` and `Dynamic-batching`. 

To use it, set the number of workers (threads) using the `.configure(...)` (same as `.__call__(...)`) by setting the argument `num_workers` in batch configuration. See also *Batch-configuration* below.

**NOTE: *Multithreading is disabled by default (num_workers=1). Use with care to not overload your weaviate instance.***

**Example**

```python
client.batch(  # or client.batch.configure(
  batch_size=100,
  dynamic=True,
  num_workers=4,
)
```

## Auto-batching

This method allows the python-client to handle all the `object` and `reference` import/creation. This means that the user does NOT have to explicitly import/create `objects`and `reference`, all the user has to do is add everything he want to be imported/created to the `Batch`, and the `Batch` is going to take care of it. To enable auto-batching we need to configure `batch_size` to be a positive integer (by default `None`)(see `Batch-configuration` below for more information). The `Batch` is going to import/create objects then references, if number of objects + number of references == `batch_size`. See example below:


```python
import weaviate
from weaviate.util import generate_uuid5
client = weaviate.Client("http://localhost:8080")

# create schema
schema = {
  'classes': [
    {
      'class': 'Author',
      'properties': [
        {
          'name': 'name',
          'dataType': ['string']
        },
        {
          'name': 'wroteBooks',
          'dataType': ['Book']
        }
      ]
    },
    {
      'class': 'Book',
      'properties': [
        {
          'name': 'title',
          'dataType': ['text']
        },
        {
          'name': 'ofAuthor',
          'dataType': ['Author']
        }
      ]
    }
  ]
}

client.schema.create(schema)

author = {
  'name': 'Jane Doe',
}
book_1 = {
  'title': "Jane's Book 1"
}
book_2 = {
  'title': "Jane's Book 2"
}

client.batch.configure(
  batch_size=5, # int value for batch_size enables auto-batching, see Batch configuration section below
)

with client.batch as batch:
  # add author
  uuid_author = generate_uuid5(author, 'Author')
  batch.add_data_object(
    data_object=author,
    class_name='Author',
    uuid=uuid_author,
  )
  # add book_1
  uuid_book_1 = generate_uuid5(book_1, 'Book')
  batch.add_data_object(
    data_object=book_1,
    class_name='Book',
    uuid=uuid_book_1,
  )
  # add references author ---> book_1
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name='Author',
    from_property_name='wroteBooks',
    to_object_uuid=uuid_book_1,
    to_object_class_name='Book',
  )
  # add references author <--- book_1
  batch.add_reference(
    from_object_uuid=uuid_book_1,
    from_object_class_name='Book',
    from_property_name='ofAuthor',
    to_object_uuid=uuid_author,
    to_object_class_name='Author',
  )
  # add book_2
  uuid_book_2 = generate_uuid5(book_2, 'Book')
  batch.add_data_object(
    data_object=book_2,
    class_name='Book',
    uuid=uuid_book_2,
  )
  # add references author ---> book_2
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name='Author',
    from_property_name='wroteBooks',
    to_object_uuid=uuid_book_2,
    to_object_class_name='Book',
  )
  # add references author <--- book_2
  batch.add_reference(
    from_object_uuid=uuid_book_2,
    from_object_class_name='Book',
    from_property_name='ofAuthor',
    to_object_uuid=uuid_author,
    to_object_class_name='Author',
  )

# NOTE: When exiting context manager the method `batch.flush()` is called
# done, everything is imported/created
```

## Dynamic-batching

This method allows the python-client to handle all the `object` and `reference` import/creation in a dynamic manner. This means that the user does NOT have to explicitly import/create `objects`and `reference`, all the user has to do is add everything he want to be imported/created to the `Batch`, and the `Batch` is going to take care of it (same as `Auto-batching`). To enable dynamic-batching we need to configure `batch_size` to be a positive integer (by default `None`) AND `dynamic` to be `True`(by default `False`)(see `Batch-configuration` below for more information). For this method the `Batch` is going to compute the `recommended_num_objects` and `recommended_num_references` after the first `Batch` creation, where the `batch_size` is used for `recommended_num_objects` and `recommended_num_references` as the initial value. The `Batch` is going to import/create objects then references, if current number of objects reached `recommended_num_objects` OR current number of reference reached `recommended_num_references`. See example below:


```python
import weaviate
from weaviate.util import generate_uuid5
client = weaviate.Client("http://localhost:8080")

# create schema
schema = {
  'classes': [
    {
      'class': 'Author',
      'properties': [
        {
          'name': 'name',
          'dataType': ['string']
        },
        {
          'name': 'wroteBooks',
          'dataType': ['Book']
        }
      ]
    },
    {
      'class': 'Book',
      'properties': [
        {
          'name': 'title',
          'dataType': ['text']
        },
        {
          'name': 'ofAuthor',
          'dataType': ['Author']
        }
      ]
    }
  ]
}

client.schema.create(schema)

author = {
  'name': 'Jane Doe',
}
book_1 = {
  'title': "Jane's Book 1"
}
book_2 = {
  'title': "Jane's Book 2"
}

client.batch.configure(
  batch_size=5, # int value for batch_size enables auto-batching, see Batch configuration section below
  dynamic=True, # makes it dynamic
)

with client.batch as batch:
  # add author
  uuid_author = generate_uuid5(author, 'Author')
  batch.add_data_object(
    data_object=author,
    class_name='Author',
    uuid=uuid_author,
  )
  # add book_1
  uuid_book_1 = generate_uuid5(book_1, 'Book')
  batch.add_data_object(
    data_object=book_1,
    class_name='Book',
    uuid=uuid_book_1,
  )
  # add references author ---> book_1
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name='Author',
    from_property_name='wroteBooks',
    to_object_uuid=uuid_book_1,
    to_object_class_name='Book',
  )
  # add references author <--- book_1
  batch.add_reference(
    from_object_uuid=uuid_book_1,
    from_object_class_name='Book',
    from_property_name='ofAuthor',
    to_object_uuid=uuid_author,
    to_object_class_name='Author',
  )
  # add book_2
  uuid_book_2 = generate_uuid5(book_2, 'Book')
  batch.add_data_object(
    data_object=book_2,
    class_name='Book',
    uuid=uuid_book_2,
  )
  # add references author ---> book_2
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name='Author',
    from_property_name='wroteBooks',
    to_object_uuid=uuid_book_2,
    to_object_class_name='Book',
  )
  # add references author <--- book_2
  batch.add_reference(
    from_object_uuid=uuid_book_2,
    from_object_class_name='Book',
    from_property_name='ofAuthor',
    to_object_uuid=uuid_author,
    to_object_class_name='Author',
  )
# NOTE: When exiting context manager the method `batch.flush()` is called
# done, everything is imported/created
```

## Manual-batching

This method gives the user total control over the `Batch`, meaning the `Batch` is NOT going to perform any import/creation implicitly but will leave it to the user's discretion. See example below:


```python
import weaviate
from weaviate.util import generate_uuid5
client = weaviate.Client("http://localhost:8080")

# create schema
schema = {
  'classes': [
    {
      'class': 'Author',
      'properties': [
        {
          'name': 'name',
          'dataType': ['string']
        },
        {
          'name': 'wroteBooks',
          'dataType': ['Book']
        }
      ]
    },
    {
      'class': 'Book',
      'properties': [
        {
          'name': 'title',
          'dataType': ['text']
        },
        {
          'name': 'ofAuthor',
          'dataType': ['Author']
        }
      ]
    }
  ]
}

client.schema.create(schema)

author = {
  'name': 'Jane Doe',
}
book_1 = {
  'title': "Jane's Book 1"
}
book_2 = {
  'title': "Jane's Book 2"
}

client.batch.configure(
  batch_size=None, # None disable any automatic functionality
)

with client.batch as batch:
  # add author
  uuid_author = generate_uuid5(author, 'Author')
  batch.add_data_object(
    data_object=author,
    class_name='Author',
    uuid=uuid_author,
  )
  # add book_1
  uuid_book_1 = generate_uuid5(book_1, 'Book')
  batch.add_data_object(
    data_object=book_1,
    class_name='Book',
    uuid=uuid_book_1,
  )
  result = batch.create_objects()  # <----- implicit object creation

  # add references author ---> book_1
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name='Author',
    from_property_name='wroteBooks',
    to_object_uuid=uuid_book_1,
    to_object_class_name='Book',
  )
  # add references author <--- book_1
  batch.add_reference(
    from_object_uuid=uuid_book_1,
    from_object_class_name='Book',
    from_property_name='ofAuthor',
    to_object_uuid=uuid_author,
    to_object_class_name='Author',
  )
  result = batch.create_references()  # <----- implicit reference creation


  # add book_2
  uuid_book_2 = generate_uuid5(book_2, 'Book')
  batch.add_data_object(
    data_object=book_2,
    class_name='Book',
    uuid=uuid_book_2,
  )
  result = batch.create_objects()  # <----- implicit object creation

  # add references author ---> book_2
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name='Author',
    from_property_name='wroteBooks',
    to_object_uuid=uuid_book_2,
    to_object_class_name='Book',
  )
  # add references author <--- book_2
  batch.add_reference(
    from_object_uuid=uuid_book_2,
    from_object_class_name='Book',
    from_property_name='ofAuthor',
    to_object_uuid=uuid_author,
    to_object_class_name='Author',
  )
  result = batch.create_references()  # <----- implicit reference creation

# NOTE: When exiting context manager the method `batch.flush()` is called
# done, everything is imported/created
```

## Batch-configuration
The `Batch` object can be configured using the `batch.configure()` method or the `batch()` (i.e. call batch object, `__call__` method), they are the same function. In the examples above we saw that we can configure the `batch_size` and `dynamic`, but it allows to set more configurations:

- `batch_size` - (`int` or `None`: default `None`): If it is `int` then auto-/dynamic-batching is enabled. For Auto-batching, if number of objects + number of references == `batch_size` then the `Batch` is going to import/create current objects then references (see Auto-batching for more info). For Dynamic-batching it is used as the initial value for `recommended_num_objects` and `recommended_num_references` (see Dynamic-batching for more info). `None` value means it is Manual-batching, no automatic object/reference import/creation.
- `dynamic` - (`bool`: default: `False`): Enables/disables Dynamic-batching. Does not have any effect if `batch_size` is `None`.
- `creation_time` - (`int` or `float`; default: `10`): It is the interval of time in which the batch import/create should be done. It used to compute `recommended_num_objects` and `recommended_num_references`, consequently has an impact for Dynamic-batching.
- `callback` (Optional[Callable[[dict], None]]: default `weaviate.util.check_batch_result`): It is a callback function on the results of the `batch.create_objects()` and `batch.create_references()`. It is used for Error Handling for Auto-/Dynamic-batching. Has no effect if `batch_size` is `None`.
- `timeout_retries` - (`int`: default `3`): Number of attempts to import/create a batch before resulting in `TimeoutError`.
- `connection_error_retries` - (`int`: default `3`): Number of attempts to import/create a batch before resulting in `ConnectionError`. **NOTE:** Available in `weaviate-client>=3.9.0`.
- `num_workers` - (`int`: default `1`): The maximal number of concurrent threads to run batch import. Only used for non-MANUAL batching. i.e. is used only with AUTO or DYNAMIC batching. ***Use with care to not overload your weaviate instance.*** **NOTE:** Available in `weaviate-client>=3.9.0`.

NOTE: You have to specify all the configurations that you want at each call of this method, otherwise some setting are going to be replaced by default values.
```python
client.batch(
  batch_size=100,
  dynamic=False,
  creation_time=5,
  timeout_retries=3,
  connection_error_retries=5,
  callback=None,
  num_workers=1,
)
```

## Tips &amp; Tricks

* There is no limit to how many objects/references one could add to a batch before committing/creating it. However a too large batch can lead to a TimeOut error, which means that Weaviate could not process and create all the objects from the batch in the specified time (the timeout configuration can be set like [this](https://weaviate-python-client.readthedocs.io/en/latest/weaviate.html#weaviate.Client) or [this](https://weaviate-python-client.readthedocs.io/en/latest/weaviate.html#weaviate.Client.timeout_config)). Note that setting a timeout configuration higher that 60s would require some changes to the docker-compose.yml/helm chart file.
* The `batch` class in the Python Client can be used in three ways:
    * Case 1: Everything should be done by the user, i.e. the user should add the objects/object-references and create them whenever the user wants. To create one of the data type use these methods of this class: `create_objects`, `create_references` and `flush`. This case has the Batch instance’s batch_size set to None (see docs for the `configure` or `__call__` method). Can be used in a context manager, see below.
    * Case 2: Batch auto-creates when full. This can be achieved by setting the Batch instance’s batch_size set to a positive integer (see docs for the `configure` or `__call__` method). The batch_size in this case corresponds to the sum of added objects and references. This case does not require the user to create the batch/s, but it can be done. Also to create non-full batches (last batches) that do not meet the requirement to be auto-created use the `flush` method. Can be used in a context manager, see below.
    * Case 3: Similar to Case II but uses dynamic batching, i.e. auto-creates either objects or references when one of them reached the `recommended_num_objects` or `recommended_num_references` respectively. See docs for the `configure` or `__call__` method for how to enable it.
    * **Context-manager support**: Can be use with the with statement. When it exists the context-manager it calls the flush method for you. Can be combined with `configure` or `__call__` method, in order to set it to the desired Case.

## Error Handling

Creating objects in `Batch` is faster then creating each object/reference individually but it comes at the cost of skipping some validation steps. Skipping some validation steps at object/reference level can result in some objects that failed to create or some references that could not be added. In this case the `Batch` does not fail but individual objects/references might and we can make sure that everything was imported/created without errors by checking the returned value of the `batch.create_objects()` and `batch.create_references()`. Here are examples how to catch and handle errors on individual `Batch` objects/references.

Lets define a function that checks for such errors and prints them:
```python
def check_batch_result(results: dict):
  """
  Check batch results for errors.

  Parameters
  ----------
  results : dict
      The Weaviate batch creation return value.
  """

  if results is not None:
    for result in results:
      if 'result' in result and 'errors' in result['result']:
        if 'error' in result['result']['errors']:
          print(result['result']['errors']['error'])
```

Now we can use this function to print the error messages at item (object/reference) level. Lets look how we can do it using Auto-/Dynamic-batching where we never implicitly call the `create` methods:

```python
client.batch(
  batch_size=100,
  dynamic=False,
  creation_time=5,
  timeout_retries=3,
  callback=check_batch_result,
)

# done, easy as that
```

For Manual-batching we can call the function on the returned value:
```python
# on objects
result = client.batch.create_object()
check_batch_result(result)

# on references
result = client.batch.create_references()
check_batch_result(result)
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

Note that you need to use the `.do()` method to execute the query. 

# Change logs

Check the [change logs on GitHub](https://github.com/semi-technologies/weaviate-python-client/releases) for updates on the latest `Python client` changes.

# More Resources

{% include docs-support-links.html %}
