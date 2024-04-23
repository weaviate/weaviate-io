---
title: Cluster node data
sidebar_position: 93
image: og/docs/configuration.jpg
# tags: ['nodes', 'reference', 'configuration']
---

You can retrieve information about individual nodes in a Weaviate cluster. The query can be for the entire cluster, or for a particular collection.

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
