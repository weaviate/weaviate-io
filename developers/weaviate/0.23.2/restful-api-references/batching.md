---
layout: layout-documentation
solution: weaviate
sub-menu: RESTful API references
title: /v1/batching
intro: With batching you can upload a lot of data objects in bulk. This saves time compared to a lot of single request.
description: RESTful API batching reference
tags: ['RESTful API', 'references', 'batching']
menu-order: 3
open-graph-type: article
og-img: documentation.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/add-data/batching.html
    - /documentation/weaviate/current/restful-api-references/batching.html
---

# Batching Things or Actions

For batching Things or Actions in bulk.

### Method and URL

```js
POST /v1/batching/{semantic_kind}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|

The body of the data object for a new Thing or Action takes the following fields:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `semantic_kind` | list of data objects | yes | `things` or `actions` with a list of data objects, which correspond to the data [object body](./semantic-kind.html#parameters-1) |

### Example request

{% include code/0.23.2/batching.semantic-kind.html %}

### Example response

```json
[
    {
        "class": "Author",
        "creationTimeUnix": 1599815986651,
        "id": "36ddd591-2dee-4e7e-a3cc-eb86d30a4303",
        "meta": {
            "interpretation": {
                "source": [
                    {
                        "concept": "author",
                        "occurrence": 20912603,
                        "weight": 0.10000000149011612
                    },
                    {
                        "concept": "jane",
                        "occurrence": 4776095,
                        "weight": 0.2752183973789215
                    },
                    {
                        "concept": "doe",
                        "occurrence": 915642,
                        "weight": 0.47120401263237
                    }
                ]
            }
        },
        "schema": {
            "name": "Jane Doe",
            "writesFor": [
                {
                    "beacon": "weaviate://localhost/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
                }
            ]
        },
        "deprecations": null,
        "result": {}
    },
    {
        "class": "Author",
        "creationTimeUnix": 1599815986664,
        "id": "36ddd591-2dee-4e7e-a3cc-eb86d30a4304",
        "meta": {
            "interpretation": {
                "source": [
                    {
                        "concept": "author",
                        "occurrence": 20912603,
                        "weight": 0.17070640623569489
                    },
                    {
                        "concept": "john",
                        "occurrence": 38787579,
                        "weight": 0.10000000149011612
                    },
                    {
                        "concept": "doe",
                        "occurrence": 915642,
                        "weight": 0.5287871360778809
                    }
                ]
            }
        },
        "schema": {
            "name": "John Doe",
            "writesFor": [
                {
                    "beacon": "weaviate://localhost/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
                }
            ]
        },
        "deprecations": null,
        "result": {}
    }
]
```


# Batching references

For batching cross-references between data objects in bulk.

### Method and URL

```js
POST /v1/batching/references
```

### Parameters

The body of the data object for a new Thing or Action is a list of objects containing:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `from` | beacon | yes | The beacon, in the form of `weaviate://{host}/{semantic_kind}/{Classname}/{id}/{cref_property_name}` |
| `to` | beacon | yes | The beacon, in the form of `weaviate://{host}/{semantic_kind}/{id}` |

### Example request

{% include code/0.23.2/batching.references.html %}

### Example response

```json
[
    {
        "from": "weaviate://localhost/things/Author/36ddd591-2dee-4e7e-a3cc-eb86d30a4303/wroteArticles",
        "to": "weaviate://localhost/things/6bb06a43-e7f0-393e-9ecf-3c0f4e129064",
        "result": {
            "status": "SUCCESS"
        }
    },
    {
        "from": "weaviate://localhost/things/Author/36ddd591-2dee-4e7e-a3cc-eb86d30a4303/wroteArticles",
        "to": "weaviate://localhost/things/b72912b9-e5d7-304e-a654-66dc63c55b32",
        "result": {
            "status": "SUCCESS"
        }
    },
    {
        "from": "weaviate://localhost/things/Author/36ddd591-2dee-4e7e-a3cc-eb86d30a4304/wroteArticles",
        "to": "weaviate://localhost/things/b72912b9-e5d7-304e-a654-66dc63c55b32",
        "result": {
            "status": "SUCCESS"
        }
    }
]
```