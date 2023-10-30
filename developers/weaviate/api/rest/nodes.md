---
title: REST - /v1/nodes
sidebar_position: 17
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'nodes']
---


## Usage

The nodes endpoint accepts a `GET` request:

```js
GET /v1/nodes
```

And it returns a `nodes` field containing array of nodes with the following fields:
- `name`: Name of the node.
- `status`: Status of the node (one of: HEALTHY, UNHEALTHY, UNAVAILABLE, INDEXING).
- `version`: Version of Weaviate running on the node.
- `gitHash`: Short git hash of latest commit of Weaviate running on the node.
- `stats`: Statistics of the node with the following fields:
    - `shardCount`: Total number of shards on the node.
    - `objectCount` Total number of indexed objects on the node.
- `shards`: Array of shards with the following fields:
    - `name`: Name of the shard.
    - `class`: Name of the objects' class stored on the shard.
    - `objectCount`: Number of indexed objects on the shard.
    - `vectorQueueLength`: Number of objects waiting to be indexed on the shard. (Available in Weaviate `1.22` and higher, if `ASYNC_INDEXING` is enabled.)

## Example

The following command will retrieve summary information about all nodes in the cluster:

import Nodes from '/_includes/code/nodes.mdx';

<Nodes/>

Example output (format may slightly vary depending on the client used):

```json
{
  "nodes": [
    {
      "name": "weaviate-7",
      "status": "HEALTHY",
      "version": "1.16-alpha.0",
      "gitHash": "8cd2efa",
      "stats": {
        "shardCount":2,
        "objectCount": 23328
      },
      "shards": [
        {
          "name":"azuawSAd9312F",
          "class": "Class_7",
          "objectCount": 13328,
          "vectorQueueLength": 0
        }, {
          "name":"cupazAaASdfPP",
          "class": "Foo",
          "objectCount": 10000,
          "vectorQueueLength": 0
        }
      ]
    }, {
      "name": "weaviate-6",
      "status": "HEALTHY",
      "version": "1.16-alpha.0",
      "gitHash": "8cd2efa",
      "stats": {
        "shardCount":2,
        "objectCount": 12345
      },
      "shards": [
        {
          "name":"hh8gXiaNaO2K",
          "class": "Bar",
          "objectCount": 10000,
          "vectorQueueLength": 0
        }, {
          "name":"zmb16QK4PYZ4",
          "class": "Baz",
          "objectCount": 2345,
          "vectorQueueLength": 0
        }
      ]
    }
   ]
}
```


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
