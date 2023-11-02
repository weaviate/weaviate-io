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
      "batchStats": {
        "ratePerSecond": 0
      },
      "gitHash": "e6b37ce",
      "name": "weaviate-0",
      "shards": [
        {
          "class": "TestArticle",
          "name": "nq1Bg9Q5lxxP",
          "objectCount": 0,
          "vectorIndexingStatus": "READY",
          "vectorQueueLength": 0
        },
        {
          "class": "TestAuthor",
          "name": "MINLtCghkdG8",
          "objectCount": 0,
          "vectorIndexingStatus": "READY",
          "vectorQueueLength": 0
        }
      ],
      "stats": {
        "objectCount": 0,
        "shardCount": 2
      },
      "status": "HEALTHY",
      "version": "1.22.1"
    },
    {
      "batchStats": {
        "ratePerSecond": 0
      },
      "gitHash": "e6b37ce",
      "name": "weaviate-1",
      "shards": [
        {
          "class": "TestArticle",
          "name": "HuPocHE5w2LP",
          "objectCount": 1,
          "vectorIndexingStatus": "READY",
          "vectorQueueLength": 0
        },
        {
          "class": "TestAuthor",
          "name": "PeQjZRmK0xNB",
          "objectCount": 0,
          "vectorIndexingStatus": "READY",
          "vectorQueueLength": 0
        }
      ],
      "stats": {
        "objectCount": 1,
        "shardCount": 2
      },
      "status": "HEALTHY",
      "version": "1.22.1"
    },
    {
      "batchStats": {
        "ratePerSecond": 0
      },
      "gitHash": "e6b37ce",
      "name": "weaviate-2",
      "shards": [
        {
          "class": "TestArticle",
          "name": "JTg39c7ZlFUX",
          "objectCount": 0,
          "vectorIndexingStatus": "READY",
          "vectorQueueLength": 0
        },
        {
          "class": "TestAuthor",
          "name": "W5ulmuJGDTxj",
          "objectCount": 1,
          "vectorIndexingStatus": "READY",
          "vectorQueueLength": 0
        }
      ],
      "stats": {
        "objectCount": 1,
        "shardCount": 2
      },
      "status": "HEALTHY",
      "version": "1.22.1"
    }
  ]
}
```

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
