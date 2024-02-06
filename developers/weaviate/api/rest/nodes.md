---
title: REST - /v1/nodes
sidebar_position: 17
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'nodes']
---


## Usage

The nodes endpoint accepts a `GET` request and returns information about relevant nodes in the cluster. The query can be for the entire cluster, or for a particular collection.

```js
GET /v1/nodes
```

Or

```js
GET /v1/nodes/{CollectionName}
```

### Parameters

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `output` | body | string | How much information to include in the output. Options:  `minimal` (default) and `verbose` (includes shard information). |

### Returned data:

import APIOutputs from '/_includes/rest/node-endpoint-info.mdx';

<APIOutputs />

## Example

The following command will retrieve summary information about all nodes in the cluster:

import Nodes from '/_includes/code/nodes.mdx';

<Nodes/>

Example output:

```json
{
  "nodes": [
    {
      "batchStats": {
        "ratePerSecond": 0
      },
      "gitHash": "e6b37ce",
      "name": "weaviate-0",
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
