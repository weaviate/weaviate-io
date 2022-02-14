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
og-img: documentation.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/add-data/batching.html
    - /documentation/weaviate/current/restful-api-references/batch.html
    - /developers/weaviate/current/restful-api-references/batch.html
---

# Batch data objects

For sending data objects to Weaviate in bulk.

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


# Error handling

When sending a batch request to your Weaviate instance, it could be the case that an error occurs. This can be caused by several reasons, for example that the connection to Weaviate is lost or that there is a mistake in a single data object that you are trying to add.

Only errors that are caused by sending the whole batch are shown when sending a batch. Errors on individual batch items **will not** be shown on creating and sending a batch request. Thus, sending a batch and getting no errors does not guarantee that each batch item is added/created. Sending a batch can lead to a successful batch creation but unsuccessful per batch item creation. An example of an error on an individual data object that might be unnoticed by sending a batch request without checking the individual results is: Adding an object to the batch that is in conflict with the schema (for example a non existing class name).

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

batch = weaviate.ObjectsBatchRequest()
batch.add(object_to_add, "Author", "36ddd591-2dee-4e7e-a3cc-eb86d30a4303")
results = client.batch.create(batch)

if results is not None:
    for result in results:
        if 'result' in result and 'errors' in result['result'] and  'error' in result['result']['errors']:
            for message in result['result']['errors']['error']:
                print(message['message'])
```

This can also be applied to adding references in batch. Note that sending batches, especially references, skips some validation on object and reference level. Adding this validation on single data objects like above makes it less likely for errors to pass without discovering. 


# More Resources

{% include docs-support-links.html %}