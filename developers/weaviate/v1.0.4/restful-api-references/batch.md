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
