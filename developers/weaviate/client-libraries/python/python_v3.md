---
title: Python (Client v3)
sidebar_position: 15
image: og/docs/client-libraries.jpg
# tags: ['python', 'client library']
---


:::note Python client version
The current Python client version is `v||site.python_client_version||`
:::

:::info `v4` client available
This document relates to the `v3` client. We recommend you upgrade to the [`v4` client](./index.md) if possible. The `v3` client is still available for backwards compatibility, and receive with bug fixes and security updates, but it will be updated with new Weaviate features, and may be subset sometime in the second half of 2024.

We also have a [migration guide for moving from `v3` client to the `v4`](./v3_v4_migration.md).
:::

## Installation and setup

### Requirements

The `v3` client is not to be used with with the gRPC API that was introduced in Weaviate `1.22`. You can still use Weaviate `1.22` and newer with the `v3` client, however it will not take advantage of improvements made with the gRPC API. For the gRPC API, use the `v4` client.

### Installation

The `v3` Python library is available on [PyPI.org](https://pypi.org/project/weaviate-client/). The package can be installed using [pip](https://pypi.org/project/pip/). The client is developed and tested for Python 3.7 and higher.

```bash
pip install "weaviate-client==3.*"
```

### Set-up

Now you can use the client in your Python scripts as follows:

```python
import weaviate

client = weaviate.Client("https://some-endpoint.weaviate.network")  # Replace the URL with that of your Weaviate instance

assert client.is_ready()  # Will return True if the client is connected & the server is ready to accept requests
```

Or, with additional arguments such as those below:

```python
import weaviate

client = weaviate.Client(
  url="https://some-endpoint.weaviate.network",  # URL of your Weaviate instance
  auth_client_secret=auth_config,  # (Optional) If the Weaviate instance requires authentication
  timeout_config=(5, 15),  # (Optional) Set connection timeout & read timeout time in seconds
  additional_headers={  # (Optional) Any additional headers; e.g. keys for API inference services
    "X-Cohere-Api-Key": "YOUR-COHERE-API-KEY",            # Replace with your Cohere key
    "X-HuggingFace-Api-Key": "YOUR-HUGGINGFACE-API-KEY",  # Replace with your Hugging Face key
    "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",            # Replace with your OpenAI key
  }
)

assert client.is_ready()  # Will return True if the client is connected & the server is ready to accept requests
```

## Authentication

import ClientAuthIntro from '/developers/weaviate/client-libraries/_components/client.auth.introduction.mdx'

<ClientAuthIntro clientName="Python"/>

### WCS authentication

import ClientAuthWCS from '/developers/weaviate/client-libraries/_components/client.auth.wcs.mdx'

<ClientAuthWCS />

### API key authentication

:::info Added in Weaviate Python client version `3.14.0`.
:::

import ClientAuthApiKey from '/developers/weaviate/client-libraries/_components/client.auth.api.key.mdx'

<ClientAuthApiKey />

```python
import weaviate

auth_config = weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY")  # Replace w/ your Weaviate instance API key

# Instantiate the client with the auth config
client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # Replace w/ your endpoint
    auth_client_secret=auth_config
)
```

### OIDC authentication

import ClientAuthOIDCIntro from '/developers/weaviate/client-libraries/_components/client.auth.oidc.introduction.mdx'

<ClientAuthOIDCIntro />

#### <i class="fa-solid fa-key"></i> Resource Owner Password Flow

import ClientAuthFlowResourceOwnerPassword from '/developers/weaviate/client-libraries/_components/client.auth.flow.resource.owner.password.mdx'

<ClientAuthFlowResourceOwnerPassword />

```python
import weaviate

resource_owner_config = weaviate.AuthClientPassword(
  username = "user",
  password = "pass",
  scope = "offline_access" # optional, depends on the configuration of your identity provider (not required with WCS)
  )

# Initiate the client with the auth config
client = weaviate.Client("http://localhost:8080", auth_client_secret=resource_owner_config)
```

#### <i class="fa-solid fa-key"></i> Client Credentials flow

import ClientAuthFlowClientCredentials from '/developers/weaviate/client-libraries/_components/client.auth.flow.client.credentials.mdx'

<ClientAuthFlowClientCredentials />

```python
import weaviate

client_credentials_config = weaviate.AuthClientCredentials(
  client_secret = "client_secret",
  scope = "scope1 scope2" # optional, depends on the configuration of your identity provider (not required with WCS)
  )

# Initiate the client with the auth config
client = weaviate.Client("https://localhost:8080", auth_client_secret=client_credentials_config)
```

#### <i class="fa-solid fa-key"></i> Refresh Token flow

import ClientAuthBearerToken from '/developers/weaviate/client-libraries/_components/client.auth.bearer.token.mdx'

<ClientAuthBearerToken />

```python
import weaviate

bearer_config = weaviate.AuthBearerToken(
  access_token="some token"
  expires_in=300 # in seconds, by default 60s
  refresh_token="other token" # Optional
)

# Initiate the client with the auth config
client = weaviate.Client("https://localhost:8080", auth_client_secret=bearer_config)
```

## Custom headers

You can pass custom headers to the client, which are added at initialization:

```python
client = weaviate.Client(
  url="https://localhost:8080",
  additional_headers={"HeaderKey": "HeaderValue"},
)
```

## Neural Search Frameworks

There is a variety of neural search frameworks that use Weaviate under the hood to store, search through, and retrieve vectors.

- deepset's [haystack](https://www.deepset.ai/weaviate-vector-search-engine-integration)
- Jina's [DocArray](https://github.com/docarray/docarray)

# References documentation

On this Weaviate documentation website, you will find how to use the Python client for all [RESTful endpoints](../../api/rest/index.md) and [GraphQL functions](../../api/graphql/index.md). For each reference, a code block is included with an example of how to use the function with the Python (and other) clients. The Python client, however, has additional functionalities, which are covered in the full client documentation on [weaviate-python-client.readthedocs.io](https://weaviate-python-client.readthedocs.io/en/stable/). Some of these additional functions are highlighted here below.

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
          "text"
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
          "text"
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
            "text"
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

#### Example: Blog Post on How to get started with Weaviate and the Python client

A full example of how to use the Python client for Weaviate can be found in [this article on Towards Data Science](https://towardsdatascience.com/quickstart-with-weaviate-python-client-e85d14f19e4f).

## Batching

Batching is a way of importing/creating `objects` and `references` in bulk using a single API request to the Weaviate server. With Python this can be done using 3 different methods:

1. ***Auto-batching***
2. ***Dynamic-batching***
3. ***Manual-batching***

Generally, we recommend use of `client.batch` in a context manager, which will automatically flush the batch when exiting. This is the easiest way to use the batching functionality.

The following parameters have the greatest impact on the batch import speed:

| Parameter | Type | Recommended<br/>value | Purpose |
| :- | :- | :- |:- |
| `batch_size` | integer | 50 - 200 | Initial batch size
| `num_workers` | integer | 1 - 2 | Maximum number of parallel workers
| `dynamic` | boolean | True | If true, dynamically adjust the `batch_size`<br/> based on the number of items in the batch

### Multi-threading batch import

:::info Added in Weaviate Python client version `3.9.0`.
:::

Multi-threading Batch import works with both `Auto-batching` and `Dynamic-batching`.

To use it, set the number of workers (threads) using the `.configure(...)` (same as `.__call__(...)`) by setting the argument `num_workers` in the batch configuration. See also [Batch configuration](#batch-configuration) below.

:::warning
Multithreading is disabled by default (num_workers=1). Use with care to not overload your Weaviate instance.
:::

**Example**

```python
client.batch(  # or client.batch.configure(
  batch_size=100,
  dynamic=True,
  num_workers=4,
)
```

### Auto-batching

This method allows the Python client to handle all the `object` and `reference` import/creation. This means that you do NOT have to explicitly import/create objects and cross-references. All you need to do is add everything you want imported/created to the `Batch`, and the `Batch` is going to take care of creating the objects and cross-references among them. To enable auto-batching we need to configure `batch_size` to be a positive integer (by default `None`) (see [Batch configuration](#batch-configuration) below for more information). The `Batch` is going to import/create objects, then create cross-references, if the number of objects + number of references == `batch_size`. See example below:

```python
import weaviate
from weaviate.util import generate_uuid5
client = weaviate.Client("http://localhost:8080")

# create schema
schema = {
  "classes": [
    {
      "class": "Author",
      "properties": [
        {
          "name": "name",
          "dataType": ["text"]
        },
        {
          "name": "wroteBooks",
          "dataType": ["Book"]
        }
      ]
    },
    {
      "class": "Book",
      "properties": [
        {
          "name": "title",
          "dataType": ["text"]
        },
        {
          "name": "ofAuthor",
          "dataType": ["Author"]
        }
      ]
    }
  ]
}

client.schema.create(schema)

author = {
  "name": "Jane Doe",
}
book_1 = {
  "title": "Jane's Book 1"
}
book_2 = {
  "title": "Jane's Book 2"
}

client.batch.configure(
  batch_size=5, # int value for batch_size enables auto-batching, see Batch configuration section below
)

with client.batch as batch:
  # add author
  uuid_author = generate_uuid5(author, "Author")
  batch.add_data_object(
    data_object=author,
    class_name="Author",
    uuid=uuid_author,
  )
  # add book_1
  uuid_book_1 = generate_uuid5(book_1, "Book")
  batch.add_data_object(
    data_object=book_1,
    class_name="Book",
    uuid=uuid_book_1,
  )
  # add references author ---> book_1
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name="Author",
    from_property_name="wroteBooks",
    to_object_uuid=uuid_book_1,
    to_object_class_name="Book",
  )
  # add references author <--- book_1
  batch.add_reference(
    from_object_uuid=uuid_book_1,
    from_object_class_name="Book",
    from_property_name="ofAuthor",
    to_object_uuid=uuid_author,
    to_object_class_name="Author",
  )
  # add book_2
  uuid_book_2 = generate_uuid5(book_2, "Book")
  batch.add_data_object(
    data_object=book_2,
    class_name="Book",
    uuid=uuid_book_2,
  )
  # add references author ---> book_2
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name="Author",
    from_property_name="wroteBooks",
    to_object_uuid=uuid_book_2,
    to_object_class_name="Book",
  )
  # add references author <--- book_2
  batch.add_reference(
    from_object_uuid=uuid_book_2,
    from_object_class_name="Book",
    from_property_name="ofAuthor",
    to_object_uuid=uuid_author,
    to_object_class_name="Author",
  )

# NOTE: When exiting context manager the method `batch.flush()` is called
# done, everything is imported/created
```

### Dynamic-batching

This method allows the Python client to handle all object and cross-reference import/creations in a dynamic manner. This means that the user does NOT have to explicitly import/create objects and cross-reference (same as with [Auto-batching](#auto-batching). To enable dynamic-batching we need to configure `batch_size` to be a positive integer (by default `None`) AND set `dynamic` to `True` (by default `False`) (see [Batch-configuration](#batch-configuration) below for more information). For this method the `Batch` is going to compute the `recommended_num_objects` and `recommended_num_references` after the first `Batch` creation, where the `batch_size` is used for `recommended_num_objects` and `recommended_num_references` as the initial value. The `Batch` is going to import/create objects then references, if current number of objects reached `recommended_num_objects` OR current number of reference reached `recommended_num_references`. See example below:


```python
import weaviate
from weaviate.util import generate_uuid5
client = weaviate.Client("http://localhost:8080")

# create schema
schema = {
  "classes": [
    {
      "class": "Author",
      "properties": [
        {
          "name": "name",
          "dataType": ["text"]
        },
        {
          "name": "wroteBooks",
          "dataType": ["Book"]
        }
      ]
    },
    {
      "class": "Book",
      "properties": [
        {
          "name": "title",
          "dataType": ["text"]
        },
        {
          "name": "ofAuthor",
          "dataType": ["Author"]
        }
      ]
    }
  ]
}

client.schema.create(schema)

author = {
  "name": "Jane Doe",
}
book_1 = {
  "title": "Jane's Book 1"
}
book_2 = {
  "title": "Jane's Book 2"
}

client.batch.configure(
  batch_size=5, # int value for batch_size enables auto-batching, see Batch configuration section below
  dynamic=True, # makes it dynamic
)

with client.batch as batch:
  # add author
  uuid_author = generate_uuid5(author, "Author")
  batch.add_data_object(
    data_object=author,
    class_name="Author",
    uuid=uuid_author,
  )
  # add book_1
  uuid_book_1 = generate_uuid5(book_1, "Book")
  batch.add_data_object(
    data_object=book_1,
    class_name="Book",
    uuid=uuid_book_1,
  )
  # add references author ---> book_1
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name="Author",
    from_property_name="wroteBooks",
    to_object_uuid=uuid_book_1,
    to_object_class_name="Book",
  )
  # add references author <--- book_1
  batch.add_reference(
    from_object_uuid=uuid_book_1,
    from_object_class_name="Book",
    from_property_name="ofAuthor",
    to_object_uuid=uuid_author,
    to_object_class_name="Author",
  )
  # add book_2
  uuid_book_2 = generate_uuid5(book_2, "Book")
  batch.add_data_object(
    data_object=book_2,
    class_name="Book",
    uuid=uuid_book_2,
  )
  # add references author ---> book_2
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name="Author",
    from_property_name="wroteBooks",
    to_object_uuid=uuid_book_2,
    to_object_class_name="Book",
  )
  # add references author <--- book_2
  batch.add_reference(
    from_object_uuid=uuid_book_2,
    from_object_class_name="Book",
    from_property_name="ofAuthor",
    to_object_uuid=uuid_author,
    to_object_class_name="Author",
  )
# NOTE: When exiting context manager the method `batch.flush()` is called
# done, everything is imported/created
```

### Manual-batching

This method gives the user total control over the `Batch`, meaning the `Batch` is NOT going to perform any import/creation implicitly but will leave it to the user's discretion. See example below:


```python
import weaviate
from weaviate.util import generate_uuid5
client = weaviate.Client("http://localhost:8080")

# create schema
schema = {
  "classes": [
    {
      "class": "Author",
      "properties": [
        {
          "name": "name",
          "dataType": ["text"]
        },
        {
          "name": "wroteBooks",
          "dataType": ["Book"]
        }
      ]
    },
    {
      "class": "Book",
      "properties": [
        {
          "name": "title",
          "dataType": ["text"]
        },
        {
          "name": "ofAuthor",
          "dataType": ["Author"]
        }
      ]
    }
  ]
}

client.schema.create(schema)

author = {
  "name": "Jane Doe",
}
book_1 = {
  "title": "Jane's Book 1"
}
book_2 = {
  "title": "Jane's Book 2"
}

client.batch.configure(
  batch_size=None, # None disable any automatic functionality
)

with client.batch as batch:
  # add author
  uuid_author = generate_uuid5(author, "Author")
  batch.add_data_object(
    data_object=author,
    class_name="Author",
    uuid=uuid_author,
  )
  # add book_1
  uuid_book_1 = generate_uuid5(book_1, "Book")
  batch.add_data_object(
    data_object=book_1,
    class_name="Book",
    uuid=uuid_book_1,
  )
  result = batch.create_objects()  # <----- implicit object creation

  # add references author ---> book_1
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name="Author",
    from_property_name="wroteBooks",
    to_object_uuid=uuid_book_1,
    to_object_class_name="Book",
  )
  # add references author <--- book_1
  batch.add_reference(
    from_object_uuid=uuid_book_1,
    from_object_class_name="Book",
    from_property_name="ofAuthor",
    to_object_uuid=uuid_author,
    to_object_class_name="Author",
  )
  result = batch.create_references()  # <----- implicit reference creation


  # add book_2
  uuid_book_2 = generate_uuid5(book_2, "Book")
  batch.add_data_object(
    data_object=book_2,
    class_name="Book",
    uuid=uuid_book_2,
  )
  result = batch.create_objects()  # <----- implicit object creation

  # add references author ---> book_2
  batch.add_reference(
    from_object_uuid=uuid_author,
    from_object_class_name="Author",
    from_property_name="wroteBooks",
    to_object_uuid=uuid_book_2,
    to_object_class_name="Book",
  )
  # add references author <--- book_2
  batch.add_reference(
    from_object_uuid=uuid_book_2,
    from_object_class_name="Book",
    from_property_name="ofAuthor",
    to_object_uuid=uuid_author,
    to_object_class_name="Author",
  )
  result = batch.create_references()  # <----- implicit reference creation

# NOTE: When exiting context manager the method `batch.flush()` is called
# done, everything is imported/created
```

### Batch configuration
The `Batch` object can be configured using the `batch.configure()` method or the `batch()` (i.e. call batch object, `__call__`) method. They are the same function. In the examples above we saw that we can configure the `batch_size` and `dynamic` parameters. Here are more available parameters:

- `batch_size` - (`int` or `None`: default `None`): If it is `int` then auto-/dynamic-batching is enabled. For Auto-batching, if number of objects + number of references == `batch_size` then the `Batch` is going to import/create current objects then references (see [Auto-batching](#auto-batching) for more info). For Dynamic-batching it is used as the initial value for `recommended_num_objects` and `recommended_num_references` (see [Dynamic batching](#dynamic-batching) for more info). A value of `None` means it is Manual-batching—no automatic object/reference import/creation.
- `dynamic` - (`bool`, default: `False`): Enables/disables Dynamic-batching. Does not have any effect if `batch_size` is `None`.
- `creation_time` - (`int` or `float`, default: `10`): It is the interval of time in which the batch import/create should be done. It used to compute `recommended_num_objects` and `recommended_num_references`, consequently has an impact for Dynamic-batching.
- `callback` (Optional[Callable[[dict], None]], default `weaviate.util.check_batch_result`): It is a callback function on the results of the `batch.create_objects()` and `batch.create_references()`. It is used for error handling for Auto-/Dynamic-batching. Has no effect if `batch_size` is `None`.
- `timeout_retries` - (`int`, default `3`): Number of attempts to import/create a batch before resulting in `TimeoutError`.
- `connection_error_retries` - (`int`, default `3`): Number of attempts to import/create a batch before resulting in `ConnectionError`. **NOTE:** Added in `weaviate-client 3.9.0`.
- `num_workers` - (`int`, default `1`): The maximal number of concurrent threads to run batch import. Only used for non-MANUAL batching. i.e. is used only with AUTO or DYNAMIC batching. ***Use with care to not overload your Weaviate instance.*** **NOTE:** Added in `weaviate-client 3.9.0`.

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

### Tips &amp; Tricks

* There is no limit to how many objects/references one could add to a batch before committing/creating it. However a too large batch can lead to a TimeOut error, which means that Weaviate could not process and create all the objects from the batch in the specified time (the timeout configuration can be set like [this](https://weaviate-python-client.readthedocs.io/en/latest/weaviate.html#weaviate.Client) or [this](https://weaviate-python-client.readthedocs.io/en/latest/weaviate.html#weaviate.Client.timeout_config)). Note that setting a timeout configuration higher that 60s would require some changes to the docker-compose.yml/helm chart file.
* The `batch` class in the Python Client can be used in three ways:
    * Case 1: Everything should be done by the user, i.e. the user should add the objects/object-references and create them whenever the user wants. To create one of the data type use these methods of this class: `create_objects`, `create_references` and `flush`. This case has the Batch instance's batch_size set to None (see docs for the `configure` or `__call__` method). Can be used in a context manager, see below.
    * Case 2: Batch auto-creates when full. This can be achieved by setting the Batch instance's batch_size set to a positive integer (see docs for the `configure` or `__call__` method). The batch_size in this case corresponds to the sum of added objects and references. This case does not require the user to create the batch/s, but it can be done. Also to create non-full batches (last batches) that do not meet the requirement to be auto-created use the `flush` method. Can be used in a context manager, see below.
    * Case 3: Similar to Case II but uses dynamic batching, i.e. auto-creates either objects or references when one of them reached the `recommended_num_objects` or `recommended_num_references` respectively. See docs for the `configure` or `__call__` method for how to enable it.
    * **Context-manager support**: Can be use with the with statement. When it exists the context-manager it calls the flush method for you. Can be combined with `configure` or `__call__` method, in order to set it to the desired Case.

### Error Handling

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
      if "result" in result and "errors" in result["result"]:
        if "error" in result["result"]["errors"]:
          print(result["result"])
```

Now we can use this function to print the error messages at item (object/reference) level. Lets look how we can do it using Auto-/Dynamic-batching where we never implicitly call the `create` methods:

```python
client.batch(
  batch_size=100,
  dynamic=True,
  creation_time=5,
  timeout_retries=3,
  connection_error_retries=3,
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


<details>
  <summary>Example code</summary>

The following Python code can be used to handle errors on individual data objects in the batch.

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

def check_batch_result(results: dict):
  """
  Check batch results for errors.

  Parameters
  ----------
  results : dict
      The Weaviate batch creation return value, i.e. returned value of the client.batch.create_objects().
  """
  if results is not None:
    for result in results:
      if 'result' in result and 'errors' in result['result']:
        if 'error' in result['result']['errors']:
          print("We got an error!", result)

object_to_add = {
    "name": "Jane Doe",
    "writesFor": [{
        "beacon": "weaviate://localhost/f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
    }]
}

client.batch.configure(
  # `batch_size` takes an `int` value to enable auto-batching
  # (`None` is used for manual batching)
  batch_size=100,
  # dynamically update the `batch_size` based on import speed
  dynamic=False,
  # `timeout_retries` takes an `int` value to retry on time outs
  timeout_retries=3,
  # checks for batch-item creation errors
  # this is the default in weaviate-client >= 3.6.0
  callback=check_batch_result,
  consistency_level=weaviate.data.replication.ConsistencyLevel.ALL,  # default QUORUM
)

with client.batch as batch:
  batch.add_data_object(object_to_add, "Author", "36ddd591-2dee-4e7e-a3cc-eb86d30a4303", vector=[1,2])
  # lets force an error, adding a second object with unmatching vector dimensions
  batch.add_data_object(object_to_add, "Author", "cb7d0da4-ceaa-42d0-a483-282f545deed7", vector=[1,2,3])
```

This can also be applied to adding references in batch. Note that sending batches, especially references, skips some validations at the object and reference level. Adding this validation on single data objects like above makes it less likely for errors to go undiscovered.

</details>


## Design

### GraphQL query builder pattern

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

:::tip
You can use `.build()` to inspect the resulting GraphQL query
:::

```python
query_result = client.query\
    .get("Article", ["title"])\
    .with_where(where_filter)\
    .with_near_text(near_text_filter)\
    .with_limit(50)

query_result.build()

>>> '{Get{Article(where: {path: ["wordCount"] operator: GreaterThan valueInt: 1000} limit: 50 nearText: {concepts: ["fashion"] certainty: 0.7 moveTo: {force: 0.85 concepts: ["haute couture"]} moveAwayFrom: {force: 0.45 concepts: ["finance"]}} ){title}}}'

```

## Best practices and notes

### Thread-safety

While the Python client is fundamentally designed to be thread-safe, it's important to note that due to its dependency on the `requests` library, complete thread safety isn't guaranteed.

This is an area that we are looking to improve in the future.

Please be particularly aware that the batching algorithm within our client is not thread-safe. Keeping this in mind will help ensure smoother, more predictable operations when using our Python client in multi-threaded environments.

If you are performing batching in a multi-threaded scenario, ensure that only one of the threads is performing the batching workflow at any given time. No two threads can use the same `client.batch` object at one time.

## Client releases

import MatrixIntro from '/_includes/clients/matrix-intro.md';

<MatrixIntro />

## Change logs

For more detailed information on client updates, check the change logs. The logs
are hosted here:

- [GitHub](https://github.com/weaviate/weaviate-python-client/releases)
- [Read the Docs](https://weaviate-python-client.readthedocs.io/en/stable/changelog.html)


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
