---
title: GraphQL - Get{}
sidebar_position: 1
image: og/docs/api.jpg
# tags: ['graphql', 'get{}']
---
import Badges from '/_includes/badges.mdx';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

<Badges/>

import TryEduDemo from '/_includes/try-on-edu-demo.mdx';

<TryEduDemo />

## Get{} syntax and query structure

The `Get{}` function fetches fields described in the schema. For example, if you've created a schema with a class `JeopardyQuestion` which has the properties `question`, `answer` and `points`, you can query it as follows:

import GraphQLGetSimple from '/_includes/code/graphql.get.simple.mdx';

<GraphQLGetSimple/>

The above query will result in something like the following:

import GraphQLGetSimpleUnfiltered from '!!raw-loader!/_includes/code/graphql.get.simple.py';

<FilteredTextBlock
  text={GraphQLGetSimpleUnfiltered}
  startMarker="// ===== EXPECTED RESULT ====="
  endMarker="// ===== END EXPECTED RESULT ====="
  language="json"
/>

:::info Get query without arguments
The order of object retrieval is not guaranteed in a `Get` query without any search parameters or filters. Accordingly, such a `Get` query is not suitable for any substantive object retrieval strategy. Consider the [Cursor API](./additional-operators.md#cursor-with-after) for that purpose.
:::

### groupBy argument

You can use a groupBy argument to retrieve groups of objects from Weaviate. This functionality offers the advantage of maintaining granular search results by searching through detailed or segmented objects (e.g. chunks of documents), while also enabling you to step back and view the broader context of the objects (e.g. documents as a whole).

The `groupBy{}` argument is structured as follows for the `Get{}` function:

:::info Single-level grouping only
As of `1.19`, the `groupBy` `path` is limited to one property or cross-reference. Nested paths are current not supported.
:::

```graphql
{
  Get{
    <Class>(
      <vectorSearchParameter>  # e.g. nearVector, nearObject, nearText
      groupBy:{
        path: [<propertyName>]  # Property to group by (only one property or cross-reference)
        groups: <number>  # Max. number of groups
        objectsPerGroup: <number>  # Max. number of objects per group
      }
    ) {
      _additional {
        group {
          id  # An identifier for the group in this search
          groupedBy{ value path }  # Value and path of the property grouped by
          count  # Count of objects in this group
          maxDistance  # Maximum distance from the group to the query vector
          minDistance  # Minimum distance from the group to the query vector
          hits {  # Where the actual properties for each grouped objects will be
            <properties>  # Properties of the individual object
            _additional {
              id  # UUID of the individual object
              vector  # The vector of the individual object
              distance  # The distance from the individual object to the query vector
            }
          }
        }
      }
    }
  }
}
```

Take a collection of `Passage` objects for example, each object belonging to a `Document`. If searching through `Passage` objects, you can group the results according to any property of the `Passage`, including the cross-reference property that represents the `Document` each `Passage` is associated with.

The `groups` and `objectsPerGroup` limits are customizable. So in this example, you could retrieve the top 1000 objects and group them to identify the 3 most relevant `Document` objects, based on the top 3 `Passage` objects from each `Document`.

More concretely, a query such as below:

<details>
  <summary>Example Get query with groupBy</summary>

```graphql
{
  Get{
    Passage(
      limit: 100
      nearObject: {
        id: "00000000-0000-0000-0000-000000000001"
      }
      groupBy: {
        path: ["content"]
        groups: 2
        objectsPerGroup: 2
      }
    ){
      _additional {
        id
        group {
          id
          count
          groupedBy { value path }
          maxDistance
          minDistance
          hits{
            content
            ofDocument {
              ... on Document {
                _additional {
                  id
                }
              }
            }
            _additional {
              id
              distance
            }
          }
        }
      }
    }
  }
}
```

</details>

Will result in the following response:

<details>
  <summary>Corresponding response</summary>

```json
{
  "data": {
    "Get": {
      "Passage": [
        {
          "_additional": {
            "group": {
              "count": 1,
              "groupedBy": {
                "path": [
                  "content"
                ],
                "value": "Content of passage 1"
              },
              "hits": [
                {
                  "_additional": {
                    "distance": 0,
                    "id": "00000000-0000-0000-0000-000000000001"
                  },
                  "content": "Content of passage 1",
                  "ofDocument": [
                    {
                      "_additional": {
                        "id": "00000000-0000-0000-0000-000000000011"
                      }
                    }
                  ]
                }
              ],
              "id": 0,
              "maxDistance": 0,
              "minDistance": 0
            },
            "id": "00000000-0000-0000-0000-000000000001"
          }
        },
        {
          "_additional": {
            "group": {
              "count": 1,
              "groupedBy": {
                "path": [
                  "content"
                ],
                "value": "Content of passage 2"
              },
              "hits": [
                {
                  "_additional": {
                    "distance": 0.00078231096,
                    "id": "00000000-0000-0000-0000-000000000002"
                  },
                  "content": "Content of passage 2",
                  "ofDocument": [
                    {
                      "_additional": {
                        "id": "00000000-0000-0000-0000-000000000011"
                      }
                    }
                  ]
                }
              ],
              "id": 1,
              "maxDistance": 0.00078231096,
              "minDistance": 0.00078231096
            },
            "id": "00000000-0000-0000-0000-000000000002"
          }
        }
      ]
    }
  }
}
```

</details>

### Consistency levels

:::info Available from `v1.19` onwards
:::

Where replication is configured, the `Get{}` function can be configured to return results with different levels of consistency. This is useful when you want to retrieve the most up-to-date data, or when you want to retrieve data as fast as possible.

Read more about consistency levels [here](../../concepts/replication-architecture/consistency.md).

import GraphQLGetConsistency from '/_includes/code/graphql.get.consistency.mdx';

<GraphQLGetConsistency/>

## Query beacon references

If you've set a beacon reference (cross-reference) in the schema, you can query it as follows:

import GraphQLGetBeacon from '/_includes/code/graphql.get.beacon.mdx';

<GraphQLGetBeacon/>

import GraphQLGetBeaconUnfiltered from '!!raw-loader!/_includes/code/graphql.get.beacon.py';

<details>
  <summary>Expected response</summary>

<FilteredTextBlock
  text={GraphQLGetBeaconUnfiltered}
  startMarker="// ===== EXPECTED RESULT ====="
  endMarker="// ===== END EXPECTED RESULT ====="
  language="json"
/>

</details>

## Additional properties

For every Get{} request you can get additional information about the returned data object(s) by using additional properties. You can recognize these properties because they are in the object `_additional{}`. Additional properties can help you interpret query results and can for example be used for projection and visualization of the retrieved data. An overview of all additional properties and how to use them is documented [here](./additional-properties.md).

## Vector Search Operators

To combine `Get { }` with a vector search argument, here is an overview of the supported arguments and links to their detailed documentation:

| Argument | Description | Required modules (at least one of) | Learn more |
| --- | --- | --- | --- |
| `nearObject` | Find the nearest neighbors of an object referenced by its id | *none - works out of the box* | [Learn more](./vector-search-parameters.md#nearobject) |
| `nearVector` | Find the nearest neighbors to any vector | *none - works out of the box* | [Learn more](./vector-search-parameters.md#nearvector) |
| `nearText` | Vectorize a text query and perform a vector search based on it | `text2vec-transformers`, `text2vec-contextionary`, `text2vec-openai`, `multi2vec-clip`, `text2vec-huggingface`, `text2vec-cohere` | [Transformers](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-transformers.md#how-to-use), [Contextionary](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-contextionary.md#how-to-use), [OpenAI](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-openai.md#how-to-use), [CLIP](/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-clip.md#how-to-use), [Hugging Face](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-huggingface.md#how-to-use), [Cohere](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-cohere.md#how-to-use) |
| `nearImage` | Vectorize an image and perform a vector search based on it | `multi2vec-clip`, `img2vec-neural` | [CLIP](/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-clip.md#neartext), [Img2Vec](/developers/weaviate/modules/retriever-vectorizer-modules/img2vec-neural.md#nearimage-search) |
| `hybrid` | Combine dense and sparse vectors to deliver best of both search methods |   *none - works out of the box* | [Learn more](../graphql/vector-search-parameters.md#hybrid) |
| `bm25`   | Keyword search with BM25F ranking  | *none - works out of the box* | [Learn more](../graphql/vector-search-parameters.md#bm25) |

## Filters

`Get{}` functions can be extended with search filters (both semantic filters and traditional filters). Because the filters work on multiple core functions (like `Aggregate{}`) there is a [specific documentation page dedicated to filters](filters.md).

### Sorting

*Note: Support for sorting was added in `v1.13.0`.*

You can sort results by any primitive property, typically a `text`, `string`,
`number`, or `int` property. When a query has a natural order (e.g. because of a
`near<Media>` vector search), adding a sort operator will override the order.

See [filters – sorting](./filters.md#sorting) for more information.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
