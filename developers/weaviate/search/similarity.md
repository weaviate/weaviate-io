---
title: Similarity / Vector search
sidebar_position: 20
image: og/docs/howto.jpg
# tags: ['how to', 'similarity search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import JavaScriptCode from '!!raw-loader!/_includes/code/howto/search.similarity.ts';

## Overview

This page shows you how to perform similarity-based searches using Weaviate with the `nearXXX` parameters.

:::info Related pages
- [API References: Vector search parameters](../api/graphql/vector-search-parameters.md)
:::

import BasicPrereqs from '/_includes/prerequisites-quickstart.md';

<BasicPrereqs />

## Similarity-based parameters

These parameters are available:

* [`near<Media>`](#an-input-medium) - Finds objects closest to an input medium:
    * E.g.: Use it to find text objects most similar to `cute animals`, or images most similar to a particular image.
* [`nearObject`](#an-object) - Finds objects closest to another Weaviate object:
    * E.g.: Use it to find Weaviate objects most similar to object `56b9449e-65db-5df4-887b-0a4773f52aa7`.
* [`nearVector`](#a-vector) - Find objects closest to an input vector.
    * E.g.: Use it to find Weaviate objects most similar to vector `[-0.368, 0.1397, ... , 0.0971]`.

### An input medium

:::tip This is only available for classes with a [vectorizer](../modules/retriever-vectorizer-modules/index.md) configured.
:::

You can use these parameters to find objects most similar to a raw (un-vectorized) input, such as text or image. For text objects, you can provide an input text to [`nearText`](../api/graphql/vector-search-parameters.md#neartext), and for image objects, you can provide an input image to [`nearImage`](./image.md). (Or either if you are using [CLIP](../modules/retriever-vectorizer-modules/multi2vec-clip.md).)

The example below searches the `JeopardyQuestion` class for the top 2 objects best matching `"animals in movies"`, using `nearText`:

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetNearTextPython"
  endMarker="# END GetNearTextPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// GetNearText"
  endMarker="// END GetNearText"
  language="ts"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
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
  text={PythonCode}
  startMarker="# Expected nearText results"
  endMarker="# END Expected nearText results"
  language="json"
/>

</details>

### An object

You can use the [`nearObject` parameter](../api/graphql/vector-search-parameters.md#nearobject) to find objects most similar to an existing Weaviate object. To do so, specify the object ID (e.g. `56b9449e-65db-5df4-887b-0a4773f52aa7`) as shown below.

:::tip How to retrieve object IDs
See [this section](./basics.md#retrieve-the-object-id)
:::

The example below searches the `JeopardyQuestion` class for the top 2 objects best matching the object with ID `56b9449e-65db-5df4-887b-0a4773f52aa7`, using `nearObject`:

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetNearObjectPython"
  endMarker="# END GetNearObjectPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// GetNearObject"
  endMarker="// END GetNearObject"
  language="ts"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetNearObjectGraphQL"
  endMarker="# END GetNearObjectGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<!-- Possibly add: you can technically pass the ID of an object outside of the collection in order to find similar objects across collections. -->


### A vector

You can use the [`nearVector` parameter](../api/graphql/vector-search-parameters.md#nearvector) to find objects most similar to an input vector (e.g. `[-0.368, 0.1397, ... , 0.0971]`).

The example below searches the `JeopardyQuestion` class for the top 2 objects best matching the object with the provided vector, using `nearVector`:

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetNearVectorPython"
  endMarker="# END GetNearVectorPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// GetNearVector"
  endMarker="// END GetNearVector"
  language="ts"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetNearVectorGraphQL"
  endMarker="# END GetNearVectorGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>


## Limit the results

You can set a limit on:
- The number of results returned (with `limit`), or
- How similar the results are to the query (with `distance`).

### Number of results

You can set the maximum number of results returned with `limit` in the same way as shown in the [search basics how-to guide](./basics.md#limit-returned-objects).

Similarly, you can retrieve a maximum `n` objects after the first `m` results by using `limit` with `offset` as shown in the [search basics how-to guide](./basics.md#limit-with-offset).

To limit the number of results returned by a `near...` query, add the limit parameter. To start at a given offset, add the `offset` parameter. For example if we want to obtain the animals in movies #2 and #3 from the [`nearText` example](#an-input-medium) above, we'll need to use `offset: 1, limit: 2`:

The example below searches the `JeopardyQuestion` class for objects best matching `"animals in movies"`, skips 1 object (`offset`) and returns the next 2 objects:

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetLimitOffsetPython"
  endMarker="# END GetLimitOffsetPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// GetLimitOffset"
  endMarker="// END GetLimitOffset"
  language="ts"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetLimitOffsetGraphQL"
  endMarker="# END GetLimitOffsetGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>


### Distance threshold

You can set a threshold for similarity search by setting a maximum `distance`. The distance indicates how dissimilar two objects are.

Multiple [distance metrics](../config-refs/distances.md) are available in Weaviate. You can set it in the schema [as shown here](../config-refs/schema.md#default-distance-metric).

The example below searches the `JeopardyQuestion` class for objects best matching `"animals in movies"`, returning those with a `distance` less than `0.18`:

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetWithDistancePython"
  endMarker="# END GetWithDistancePython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// GetWithDistance"
  endMarker="// END GetWithDistance"
  language="ts"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
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


## Group results by a property or cross-reference

:::info Requires Weaviate `v1.19.0` or higher.
:::

You can group search results by any arbitrary property or cross-reference.

The example below searches the `JeopardyQuestion` class for objects best matching `"animals in movies"`, fetching the 10 closest results. Then those results are grouped by `round`, returning a maximum of two groups, each group with a maximum of two results (`hits`):

:::tip Grouping by cross-references
To group results by a cross-reference, try replacing the `path` value from `round` to `hasCategory` in the example below.
:::

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetWithGroupbyPython"
  endMarker="# END GetWithGroupbyPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// GetWithGroupBy"
  endMarker="// END GetWithGroupBy"
  language="ts"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
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
  text={PythonCode}
  startMarker="# Expected groupBy results"
  endMarker="# END Expected groupBy results"
  language="json"
/>

</details>

## Add a conditional (`where`) filter

You can add a conditional filter to your search results using the [`where` argument](../api/graphql/filters.md).

The example below searches the `JeopardyQuestion` class for the top 2 objects best matching `"animals in movies"`, as long as their `round` property is exactly `"Double Jeopardy!"`:

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetWithWherePython"
  endMarker="# END GetWithWherePython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// GetWithFilter"
  endMarker="// END GetWithFilter"
  language="ts"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
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
  text={PythonCode}
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

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
