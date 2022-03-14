---
layout: layout-documentation
solution: weaviate
sub-menu: RESTful API references
title: /v1/batch
intro: With batch you can upload a lot of data objects in bulk. This saves time compared to a lot of single request.
description: RESTful API batch reference
tags: ['RESTful API', 'references', 'batching']
menu-order: 3
open-graph-type: article
og: /img/og/og-documentation/restful-api-references-batch.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/add-data/batching.html
    - /documentation/weaviate/current/restful-api-references/batch.html
    - /developers/weaviate/current/restful-api-references/batch.html
---

# Batch data objects

For sending data objects to Weaviate in bulk.

### Performance

💡 Import speeds, especially for large datasets, will drastically improve when using the batching endpoint. 

A few points to bear in mind:

0. If you use a vectorizer that improves with GPU support, make sure to enable it if possible, it will drastically improve import.
0. Avoid duplicate vectors for multiple data objects.
0. Handle your errors, if you ignore them, it might lead to significant delays on import.
0. If import slows down after 2M objects, consider setting the [`vectorCacheMaxObjects`](/developers/weaviate/current/vector-index-plugins/hnsw.html#:~:text=For%20optimal%20search,be%20used%20sparingly.) in your schema. Also, see [this example](https://github.com/semi-technologies/semantic-search-through-wikipedia-with-weaviate/blob/d4711f2bdc75afd503ff70092c3c5303f9dd1b3b/step-2/import.py#L58-L59).
0. There are ways to improve your setup when using vectorizers. Like in the Wikipedia demo dataset. We will keep publishing about this, sign up for our [Slack channel]({{ site.slack_signup_url }}) to keep up to date.

### Method and URL

```js
POST /v1/batch/objects
```

### Parameters

The body requires the following field:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `objects` | list of data objects | yes | a list of data objects, which correspond to the data [object body](./objects.html#parameters-1) |

### Example request

{% include code/1.x/batch.objects.html %}

For detailed information and instructions of batching in Python, click [here](https://weaviate-python-client.readthedocs.io/en/v3.0.0/weaviate.batch.html#weaviate.batch.Batch).

## Tips for batching objects with the Python Client

* There is no limit to how many objects/references one could add to a batch before committing/creating it. However a too large batch can lead to a TimeOut error, which means that Weaviate could not process and create all the objects from the batch in the specified time (the timeout configuration can be set like [this](https://weaviate-python-client.readthedocs.io/en/latest/weaviate.html#weaviate.Client) or [this](https://weaviate-python-client.readthedocs.io/en/latest/weaviate.html#weaviate.Client.timeout_config)). Note that setting a timeout configuration higher that 60s would require some changes to the docker-compose.yml/helm chart file.
* The `batch` class in the Python Client can be used in three ways:
    * Case 1: Everything should be done by the user, i.e. the user should add the objects/object-references and create them whenever the user wants. To create one of the data type use these methods of this class: `create_objects`, `create_references` and `flush`. This case has the Batch instance’s batch_size set to None (see docs for the `configure` or `__call__` method). Can be used in a context manager, see below.
    * Case 2: Batch auto-creates when full. This can be achieved by setting the Batch instance’s batch_size set to a positive integer (see docs for the `configure` or `__call__` method). The batch_size in this case corresponds to the sum of added objects and references. This case does not require the user to create the batch/s, but it can be done. Also to create non-full batches (last batches) that do not meet the requirement to be auto-created use the `flush` method. Can be used in a context manager, see below.
    * Case 3: Similar to Case II but uses dynamic batching, i.e. auto-creates either objects or references when one of them reached the `recommended_num_objects` or `recommended_num_references` respectively. See docs for the `configure` or `__call__` method for how to enable it.
    * **Context-manager support**: Can be use with the with statement. When it exists the context-manager it calls the flush method for you. Can be combined with `configure` or `__call__` method, in order to set it to the desired Case.


# Batch references

For batching cross-references between data objects in bulk.

### Method and URL

```js
POST /v1/batch/references
```

### Parameters

The body of the data object for a new object is a list of objects containing:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `from` | beacon | yes | The beacon, in the form of `weaviate://{host}/{Classname}/{id}/{cref_property_name}` |
| `to` | beacon | yes | The beacon, in the form of `weaviate://{host}/{id}` |

### Example request

{% include code/1.x/batch.references.html %}

For detailed information and instructions of batching in Python, click [here](https://weaviate-python-client.readthedocs.io/en/v3.0.0/weaviate.batch.html#weaviate.batch.Batch).

# Error handling

When sending a batch request to your Weaviate instance, it could be the case that an error occurs. This can be caused by several reasons, for example that the connection to Weaviate is lost or that there is a mistake in a single data object that you are trying to add.

You can check if an error and what kind has occurred. 

A batch request will always return a HTTP `200` status code when a the batch request was successful. That means that the batch was successfully sent to Weaviate, and there were no issues with the connection or processing of the batch and no malformed request (`4xx` status code). However, with a `200` status code, there might still be individual failures of the data objects which are not contained in the response. Thus, a `200` status code does not guarantee that each batch item is added/created. An example of an error on an individual data object that might be unnoticed by sending a batch request without checking the individual results is: Adding an object to the batch that is in conflict with the schema (for example a non existing class name).

The following Python code can be used to handle errors on individual data objects in the batch. 

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

object_to_add = {
    "name": "Jane Doe",
    "writesFor": [{
        "beacon": "weaviate://localhost/f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
    }]
}

client.batch.add_data_object(object_to_add, "Author", "36ddd591-2dee-4e7e-a3cc-eb86d30a4303")
results = client.batch.create_objects() # client.batch.flush() does not return something, but client.batch.create_objects() and client.batch.create_references() does

if results is not None:
    for result in results:
        if 'result' in result and 'errors' in result['result'] and  'error' in result['result']['errors']:
            for message in result['result']['errors']['error']:
                print(message['message'])
```

This can also be applied to adding references in batch. Note that sending batches, especially references, skips some validation on object and reference level. Adding this validation on single data objects like above makes it less likely for errors to pass without discovering. 


# More Resources

{% include docs-support-links.html %}