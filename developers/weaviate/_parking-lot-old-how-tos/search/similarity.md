---
title: Similarity / Vector search
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

## Overview

Vector search is a similarity based search based on vector representations. Objects in the database have vector representations called "vector embeddings".

This page shows you how to perform similarity-based searches with the `nearXXX` operators.

These operators work by searching for objects with the most similar vector representation to the query. Note that due to differences in configuration and data, we have a [separate page for image searches](./image.md).

:::info Related pages
- [API References: Search operators](../api/graphql/search-operators.md)
- [How-to: Image search](./image.md)
:::

## Similarity-based operators

These operators are available:

* [`near<Media>`](#an-input-medium) - Finds objects closest to an input medium:
    * E.g.: Use it to find text objects most similar to `cute animals`, or images most similar to a particular image.
* [`nearObject`](#an-object) - Finds objects closest to another Weaviate object:
    * E.g.: Use it to find Weaviate objects most similar to object `56b9449e-65db-5df4-887b-0a4773f52aa7`.
* [`nearVector`](#a-vector) - Find objects closest to an input vector.
    * E.g.: Use it to find Weaviate objects most similar to vector `[-0.368, 0.1397, ... , 0.0971]`.

### An input medium

:::tip This is only available for classes with a [vectorizer](../modules/retriever-vectorizer-modules/index.md) configured.
:::

You can use these operators to find objects most similar to a raw (un-vectorized) input, such as text or image. For text objects, you can provide an input text to [`nearText`](../api/graphql/search-operators.md#neartext), and for image objects, you can provide an input image to [`nearImage`](./image.md). (Or either if you are using [CLIP](../modules/retriever-vectorizer-modules/multi2vec-clip.md).)

The example below searches the `JeopardyQuestion` class for the top 2 objects best matching `"animals in movies"`, using `nearText`:

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

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCode}
  startMarker="# START Expected nearText results"
  endMarker="# END Expected nearText results"
  language="json"
/>

</details>

### An object

You can use the [`nearObject` operator](../api/graphql/search-operators.md#nearobject) to find objects most similar to an existing Weaviate object. To do so, specify the object ID (e.g. `56b9449e-65db-5df4-887b-0a4773f52aa7`) as shown below.

:::tip How to retrieve object IDs
See [this section](./basics.md#retrieve-the-object-id)
:::

The example below searches the `JeopardyQuestion` class for the top 2 objects best matching the object with ID `56b9449e-65db-5df4-887b-0a4773f52aa7`, using `nearObject`:

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

<!-- Possibly add: you can technically pass the ID of an object outside of the collection in order to find similar objects across collections. -->


### A vector

You can use the [`nearVector` operator](../api/graphql/search-operators.md#nearvector) to find objects most similar to an input vector (e.g. `[-0.368, 0.1397, ... , 0.0971]`).

The example below searches the `JeopardyQuestion` class for the top 2 objects best matching the object with the provided vector, using `nearVector`:

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


## Limit the results

You can set a limit on:
- the number of results returned (with `limit`), or
- how similar the results are to the query (with [`distance`](#distance-threshold)), or
- the number of "jumps" in `distance` from the query (with the [`autocut` filter](#autocut)).

`autocut` can be combined with `limit`, to set the maximum number of results returned by `autocut`.

### Number of results

You can set the maximum number of results returned with `limit` in the same way as shown in the [search basics how-to guide](./basics.md#limit-returned-objects).

Similarly, you can retrieve a maximum `n` objects after the first `m` results by using `limit` with `offset` as shown in the [search basics how-to guide](./basics.md#paginate-with-limit-and-offset).

To limit the number of results returned by a `near...` query, add the `limit` operator. To start at a given offset, add the `offset` operator. For example if we want to obtain the animals in movies #2 and #3 from the [`nearText` example](#an-input-medium) above, we'll need to use `offset: 1, limit: 2`. The example below searches the `JeopardyQuestion` class for objects best matching `"animals in movies"`, skips 1 object (`offset`) and returns the next 2 objects:

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


### Distance threshold

You can set a threshold for similarity search by setting a maximum `distance`. The distance indicates how dissimilar two objects are.

Multiple [distance metrics](../config-refs/distances.md) are available in Weaviate. You can set it in the schema [as shown here](../config-refs/schema/index.md#default-distance-metric).

The example below searches the `JeopardyQuestion` class for objects best matching `"animals in movies"`, returning those with a `distance` less than `0.18`:

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

:::info Why `0.18`?
The numerical value for `distance` will depend on many factors, including the vectorization model and the distance metric used. As such, there are no hard and fast rules. In this case, we selected this value as our trial and error evaluation of this dataset indicated this value to produce relatively intuitive outputs.
:::

:::tip Using `certainty` possible for `cosine` distance metric only
If the distance metric is set as `cosine` the [`certainty`](../config-refs/distances.md#distance-vs-certainty) variable can be used, which normalizes the complement of distance to a value between 0 and 1.
:::


### Autocut

Another way to limit the results returned by a similarity search is to use the [`autocut` filter](../api/graphql/additional-operators.md#autocut). Autocut takes a positive integer parameter `N`, looks at the [distance](#distance-threshold) between each result and the query, and stops returning results after the `N`th "jump" in distance. For example, if the distances for six objects returned by `nearText` were `[0.1899, 0.1901, 0.191, 0.21, 0.215, 0.23]` then `autocut: 1` would return the first three objects, `autocut: 2` would return all but the last object, and `autocut: 3` would return all objects.

Autocut can be used as follows:

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

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCode}
  startMarker="# START Expected nearText results"
  endMarker="# END Expected nearText results"
  language="json"
/>

</details>


## Group results by a property or cross-reference

:::info Added in `v1.19`
:::

You can group search results by any arbitrary property or cross-reference.

The example below searches the `JeopardyQuestion` class for objects best matching `"animals in movies"`, fetching the 10 closest results. Then those results are grouped by `round`, returning a maximum of two groups, each group with a maximum of two results (`hits`):

:::tip Grouping by cross-references
To group results by a cross-reference, try replacing the `path` value from `round` to `hasCategory` in the example below.
:::

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

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCode}
  startMarker="# Expected groupBy results"
  endMarker="# END Expected groupBy results"
  language="json"
/>

</details>

## Add a conditional (`where`) filter

You can add a conditional filter to your search results using the [`where` argument](../api/graphql/filters.md).

The example below searches the `JeopardyQuestion` class for the top 2 objects best matching `"animals in movies"`, as long as their `round` property is exactly `"Double Jeopardy!"`:

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

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCode}
  startMarker="# Expected where results"
  endMarker="# END Expected where results"
  language="json"
/>

</details>

## Find least similar results

Sometimes you may want to find objects that are the least similar to a given input. This might be possible for some distance metrics:

- For cosine distances, perform a similarity search for a negative of a vector to find least.
- For Euclidean or dot distances, the definition of "least similar" vector is not as clear-cut.

Accordingly, we generally recommend using cosine distance for this use case, and searching for a *negative* of your input vector with `nearVector`.

<details>
  <summary>Further discussions</summary>

Here, the concept of `least similar` relates to finding vectors that are opposite to each other in the embedding space.

This may not necessarily mean that these `least similar` results have the opposite meaning in a semantic sense, such as antonyms in words.

Take the words rain and drought for example. While these are opposite concepts, both of them are unrelated to astrophysics. As such, in many models the distance between embeddings for 'rain' and 'astrophysics' will be likely greater than the distance between embeddings for 'rain' and 'drought'. Accordingly, you should consider the context of your use case when interpreting the results.

</details>


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
