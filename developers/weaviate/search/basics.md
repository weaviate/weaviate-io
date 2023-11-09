---
title: Search basics
sidebar_position: 10
image: og/docs/howto.jpg
# tags: ['how to', 'semantic search']
---



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.basics.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.basics-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.basics.ts';

## Overview

This page shows the core concepts on how to perform searches and retrieve objects.

:::info Related pages
- [API References: GraphQL: Get](../api/graphql/get.md)
:::

## Basic requirements

To retrieve objects from Weaviate, you must use the [`Get` function](../api/graphql/get.md) and specify at least:
- The target `class` to search, and
- One or more `properties` to retrieve.

## Simple `Get` example

<Tabs groupId="languages">
 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# BasicGetPython"
      endMarker="# END BasicGetPython"
      language="py"
    />
  </TabItem>
  
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# BasicGetPython"
  endMarker="# END BasicGetPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// BasicGetJS"
  endMarker="// END BasicGetJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# BasicGetGraphQL"
  endMarker="# END BasicGetGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// BasicGet Expected Results"
  endMarker="// END BasicGet Expected Results"
  language="json"
/>

</details>

:::tip `objects` endpoint != search
The [`objects` endpoint](../api/rest/objects.md) in Weaviate is designed for CRUD operations and is not capable of performing searches.
:::

## `limit` returned objects

Often, you will only want the top `n` results from the query. This can be achieved by setting a `limit` as shown below.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithLimitPython"
  endMarker="# END GetWithLimitPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetWithLimitJS"
  endMarker="// END GetWithLimitJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithLimitGraphQL"
  endMarker="# END GetWithLimitGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// GetWithLimit Expected Results"
  endMarker="// END GetWithLimit Expected Results"
  language="json"
/>

</details>

<!-- TODO: Add section on sorting -->
<!-- TODO: Add link to new section on sorting from GraphQL/Get#Sorting -->

## Paginate with `limit` and `offset`

If you only want the `n` results after the first `m` results from the query, you can do this with `limit` and `offset` as shown below.

Be aware that although you will only see `n` results, this could become an expensive operation as `m` grows larger, as Weaviate must fetch `n+m` results.

:::tip For exhaustive retrieval, use `after` instead.
If you want to list and retrieve all objects from a `class`, use the cursor API instead with the `after` operator. Read [this guide](../manage-data/read-all-objects.mdx) for more information on how.
:::

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithLimitOffsetPython"
  endMarker="# END GetWithLimitOffsetPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetWithLimitOffsetJS"
  endMarker="// END GetWithLimitOffsetJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithLimitOffsetGraphQL"
  endMarker="# END GetWithLimitOffsetGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// GetWithLimitOffset Expected Results"
  endMarker="// END GetWithLimitOffset Expected Results"
  language="json"
/>

</details>


## Specify the fetched properties

You must specify one or more properties to be fetched, from a union of object properties and available metadata.

### Object `properties`

You can specify object properties as below.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetPropertiesPython"
  endMarker="# END GetPropertiesPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetPropertiesJS"
  endMarker="// END GetPropertiesJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetPropertiesGraphQL"
  endMarker="# END GetPropertiesGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// GetProperties Expected Results"
  endMarker="// END GetProperties Expected Results"
  language="json"
/>

</details>

### Retrieve the object `vector`

To retrieve the object vector, request the `_additional` property and `vector` sub-property. You can do so as shown below.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetObjectVectorPython"
  endMarker="# END GetObjectVectorPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetObjectVectorJS"
  endMarker="// END GetObjectVectorJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetObjectVectorGraphQL"
  endMarker="# END GetObjectVectorGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// GetObjectVector Expected Results"
  endMarker="// END GetObjectVector Expected Results"
  language="json"
/>

</details>

### Retrieve the object `id`

To retrieve the object ID, request the `_additional` property and `id` sub-property. You can do so as shown below.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetObjectIdPython"
  endMarker="# END GetObjectIdPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetObjectIdJS"
  endMarker="// END GetObjectIdJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetObjectIdGraphQL"
  endMarker="# END GetObjectIdGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// GetObjectId Expected Results"
  endMarker="// END GetObjectId Expected Results"
  language="json"
/>

</details>


### Retrieve cross-referenced properties

You can retrieve any properties of cross-referenced objects by specifying:
- The cross-reference property,
- The target cross-referenced object class, and
- The desired properties to retrieve (of the cross-referenced objects).

The following example, retrieves for each `JeopardyQuestion` object the cross-referenced `JeopardyCategory` object, and the `JeopardyCategory` object's `title` property is returned. The property is accessed using the [inline fragment](http://spec.graphql.org/June2018/#sec-Inline-Fragments) GraphQL syntax.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithCrossRefsPython"
  endMarker="# END GetWithCrossRefsPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetWithCrossRefs"
  endMarker="// END GetWithCrossRefs"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithCrossRefsGraphQL"
  endMarker="# END GetWithCrossRefsGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithCrossRefs Expected Results"
  endMarker="# END GetWithCrossRefs Expected Results"
  language="json"
/>

</details>

### Retrieve any other metadata

You can retrieve any other available metadata by specifying the `_additional` property similarly to how `id` or `vector` can be retrieved. Please refer to [References: GraphQL: Additional properties](../api/graphql/additional-properties.md) for a comprehensive list.

## `groupBy`

To maintain granularity while viewing the broader context of the objects (e.g. documents as a whole), a `groupBy` search may be appropriate.

To use `groupBy`:
- Provide the property by which the the results will be grouped,
- The maximum number of groups, and
- The maximum number of objects per group.

<details>
  <summary><code>groupby</code> example</summary>

<p>

In this example, you have a collection of `Passage` objects with, each object belonging to a `Document`.

<br/>

You could group the results of a `Passage` search by any of its property, including the cross-reference property linking `Passage` to a parent `Document` with a search as below.

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

Here, the `groups` and `objectsPerGroup` limits are customizable.

<br/>

This example:

1. retrieves the top 100 objects
2. groups them to identify the up to 2 most relevant `Document` objects,
3. based on the up to top 2 `Passage` objects from each `Document`.

<br/>

This will result in the following response:

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

</p>

</details>

import GroupbyLimitations from '/_includes/groupby-limitations.mdx';

<GroupbyLimitations />

## Multi-tenancy

For classes where [multi-tenancy](../concepts/data.md#multi-tenancy) is enabled, you must specify the tenant parameter in each query.

This example shows how to fetch one object in the `MultiTenancyClass` class from the tenant `tenantA`:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">

  ```python
  results = (
      client.query.get("MultiTenancyClass", ["property1", "property2"])
      .with_limit(1)
      # highlight-start
      .with_tenant("tenantA")
      # highlight-end
      .do()
  )
  ```

  </TabItem>
  <TabItem value="js" label="JavaScript/TypeScript">

  ```ts
  result = await client
    .graphql
    .get()
    .withClassName('MultiTenancyClass')
    .withFields(['property1', 'property2'])
    .withTenant('TenantA')
    .do();

  console.log(JSON.stringify(result, null, 2));
  ```

  </TabItem>
</Tabs>


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
