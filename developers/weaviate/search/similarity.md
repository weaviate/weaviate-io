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

Vector search is a similarity based search based on vector representations. Objects in the database have vector representations called "vector embeddings". Vector search returns the objects with embeddings that are the most similar to the embedded version of the search query.  

## Search with text

 To find objects with the nearest vector to an input, use [`nearText`](../api/graphql/search-operators.md#neartext).

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
      text={PyCode}
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
  text={PyCode}
  startMarker="# START Expected nearText results"
  endMarker="# END Expected nearText results"
  language="json"
/>

</details>

## Search with image

import ImgSrchPyCode from '!!raw-loader!/_includes/code/howto/search.image.py';
import ImgSrchPyCodeV3 from '!!raw-loader!/_includes/code/howto/search.image-v3.py';
import ImgSrchTSCode from '!!raw-loader!/_includes/code/howto/search.image.ts';

To find objects with the nearest vector to an input image, use [`nearImage`](../api/graphql/search-operators.md#nearimage). This example uses a base64 representation of an image.

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

If you have an object ID, use the [`nearObject` operator](../api/graphql/search-operators.md#nearobject) to find objects similar to that object.

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
      text={PyCode}
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

If you have an input vector, use the [`nearVector`](../api/graphql/search-operators.md#nearvector) operator to find objects with similar vectors

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
      text={PyCode}
      startMarker="# GetNearVectorGraphQL"
      endMarker="# END GetNearVectorGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

## Set a similarity threshold

To set a similarity threshold between the search and target vectors, define a maximum `distance`.

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
      text={PyCode}
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

## Limit the size of the result set

To limit the size of the result set and return results in groups, use `limit` and `offset` to paginate the results.

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
      text={PyCode}
      startMarker="# GetLimitOffsetGraphQL"
      endMarker="# END GetLimitOffsetGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

## Limit result groups

To limit results to similar groups of objects, use the [`autocut`](../api/graphql/additional-operators.md#autocut) filter to set the number of groups to return.

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
      text={PyCode}
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
  text={PyCode}
  startMarker="# START Expected nearText results"
  endMarker="# END Expected nearText results"
  language="json"
/>

</details>

## Group results

Use properties or cross-references to group results. To group returned objects, the query must include a `near...` search operator such as `nearText` or `nearVector`.

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
      text={PyCode}
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
  text={PyCode}
  startMarker="# Expected groupBy results"
  endMarker="# END Expected groupBy results"
  language="json"
/>

</details>

## Use a `where` filter

For more specific results, use [`where`](../api/graphql/filters.md) to narrow your search.

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
      text={PyCode}
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
  text={PyCode}
  startMarker="# Expected where results"
  endMarker="# END Expected where results"
  language="json"
/>

</details>

## Related pages

- For image search, see [Image search](/developers/weaviate/search/image).
- For tutorials, see [Queries](/developers/academy/zero_to_mvp/queries_1).
- For search using the GraphQL API, see [GraphQL API](/developers/weaviate/api/graphql).

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
