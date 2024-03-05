---
title: Vector similarity search
sidebar_position: 20
image: og/docs/howto.jpg
# tags: ['how to', 'similarity search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.similarity-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.similarity.ts';

Vector search returns the objects with most similar vectors to that of the query.

## Named vectors

:::info Added in `v1.24`
:::

Any vector-based search on collections with [named vectors](../config-refs/schema/multi-vector.md) configured must include a `target` vector name in the query. This allows Weaviate to find the correct vector to compare with the query vector.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# NamedVectorNearTextGraphql"
      endMarker="# END NamedVectorNearTextGraphql"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# START Expected NamedVectorNearText results"
  endMarker="# END Expected NamedVectorNearText results"
  language="json"
/>

</details>

## Search with text

Use the [`Near Text`](../api/graphql/search-operators.md#neartext) operator to find objects with the nearest vector to an input text.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetNearTextPython"
      endMarker="# END GetNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearTextPython"
      endMarker="# END GetNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetNearText"
      endMarker="// END GetNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearTextGraphql"
      endMarker="# END GetNearTextGraphql"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# START Expected nearText results"
  endMarker="# END Expected nearText results"
  language="json"
/>

</details>

## Search with image

import ImgSrchPyCode from '!!raw-loader!/_includes/code/howto/search.image.py';
import ImgSrchPyCodeV3 from '!!raw-loader!/_includes/code/howto/search.image-v3.py';
import ImgSrchTSCode from '!!raw-loader!/_includes/code/howto/search.image.ts';

Use the [`Near Image`](../api/graphql/search-operators.md#nearimage) operator to find objects with the nearest vector to an image.<br/>
This example uses a base64 representation of an image.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={ImgSrchPyCode}
      startMarker="# START search with base64"
      endMarker="# END search with base64"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={ImgSrchPyCodeV3}
      startMarker="# START search with base64"
      endMarker="# END search with base64"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={ImgSrchTSCode}
      startMarker="// START search with base64"
      endMarker="// END search with base64"
      language="ts"
    />
  </TabItem>
</Tabs>

See [Image search](./image.md) for more information.


## Search with an existing object

If you have an object ID, use the [`Near Object`](../api/graphql/search-operators.md#nearobject) operator to find similar objects to that object.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetNearObjectPython"
      endMarker="# END GetNearObjectPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearObjectPython"
      endMarker="# END GetNearObjectPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetNearObject"
      endMarker="// END GetNearObject"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearObjectGraphQL"
      endMarker="# END GetNearObjectGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>
    Additional information
  </summary>
  <div>
    To get the object ID, see [Retrieve the object ID](./basics.md#retrieve-the-object-id).
  </div>
</details>


## Search with a vector

If you have an input vector, use the [`Near Vector`](../api/graphql/search-operators.md#nearvector) operator to find objects with similar vectors

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetNearVectorPython"
      endMarker="# END GetNearVectorPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearVectorPython"
      endMarker="# END GetNearVectorPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetNearVector"
      endMarker="// END GetNearVector"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearVectorGraphQL"
      endMarker="# END GetNearVectorGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

## Set a similarity threshold

To set a similarity threshold between the search and target vectors, define a maximum `distance` (or `certainty`).

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetWithDistancePython"
      endMarker="# END GetWithDistancePython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithDistancePython"
      endMarker="# END GetWithDistancePython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetWithDistance"
      endMarker="// END GetWithDistance"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithDistanceGraphQL"
      endMarker="# END GetWithDistanceGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Additional information</summary>

- The distance value depends on many factors, including the vectorization model you use. Experiment with your data to find a value that works for you.
- [`certainty`](../config-refs/distances.md#distance-vs-certainty) is only available with `cosine` distance.
- To find the least similar objects, use the negative cosine distance with `nearVector` search.

</details>

## `limit` & `offset`

Use `limit` to set a fixed maximum number of objects to return.

Optionally, use `offset` to paginate the results.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetLimitOffsetPython"
      endMarker="# END GetLimitOffsetPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetLimitOffsetPython"
      endMarker="# END GetLimitOffsetPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetLimitOffset"
      endMarker="// END GetLimitOffset"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetLimitOffsetGraphQL"
      endMarker="# END GetLimitOffsetGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

## Limit result groups

To limit results to groups of similar distances to the query, use the [`autocut`](../api/graphql/additional-operators.md#autocut) filter to set the number of groups to return.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START Autocut Python"
      endMarker="# END Autocut Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START Autocut Python"
      endMarker="# END Autocut Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START Autocut"
      endMarker="// END Autocut"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START Autocut GraphQL"
      endMarker="# END Autocut GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# START Expected nearText results"
  endMarker="# END Expected nearText results"
  language="json"
/>

</details>

## Group results

Use a property or a cross-reference to group results. To group returned objects, the query must include a `Near` search operator, such as `Near Text` or `Near Object`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetWithGroupbyPython"
      endMarker="# END GetWithGroupbyPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithGroupbyPython"
      endMarker="# END GetWithGroupbyPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetWithGroupBy"
      endMarker="// END GetWithGroupBy"
      language="ts"
    />
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithGroupbyGraphQL"
      endMarker="# END GetWithGroupbyGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected groupBy results"
  endMarker="# END Expected groupBy results"
  language="json"
/>

</details>

## Filter results

For more specific results, use a [`filter`](../api/graphql/filters.md) to narrow your search.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetWithWherePython"
      endMarker="# END GetWithWherePython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithWherePython"
      endMarker="# END GetWithWherePython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetWithFilter"
      endMarker="// END GetWithFilter"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithWhereGraphQL"
      endMarker="# END GetWithWhereGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected where results"
  endMarker="# END Expected where results"
  language="json"
/>

</details>

## Related pages

- [Connect to Weaviate](/developers/weaviate/tutorials/connect.mdx)
- For image search, see [Image search](/developers/weaviate/search/image).
- For tutorials, see [Queries](/developers/weaviate/tutorials/query.md).
- For search using the GraphQL API, see [GraphQL API](/developers/weaviate/api/graphql).

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
