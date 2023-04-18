---
title: REST - /v1/nodes
sidebar_position: 17
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'nodes']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Usage

The nodes endpoint accepts a `GET` request:

```js
GET /v1/nodes
```

And it returns a `nodes` field containing array of nodes with following fields:
- `name`: Name of the node.
- `status`: Status of the node (one of: HEALTHY, UNHEALTHY, UNAVAILABLE).
- `version`: Version of Weaviate running on the node.
- `gitHash`: Short git hash of latest commit of Weaviate running on the node.
- `stats`: Statistics of the node with following fields:
    - `shardCount`: Total number of shards on the node.
    - `objectCount` Total number of objects on the node.
- `shards`: Array of shards with following fields:
    - `name`: Name of the shard.
    - `class`: Name of the objects' class stored on the shard.
    - `objectCount`: Number of objects on the shard.

## Example
The following command:

import Nodes from '/_includes/code/nodes.mdx';

<Nodes/>

returns:

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
          "objectCount": 13328
        }, {
          "name":"cupazAaASdfPP",
          "class": "Foo",
          "objectCount": 10000
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
          "objectCount": 10000
        }, {
          "name":"zmb16QK4PYZ4",
          "class": "Baz",
          "objectCount": 2345
        }
      ]
    }
   ]
}
```

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
