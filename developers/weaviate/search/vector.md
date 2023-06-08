---
title: Vector search
sidebar_position: 25
image: og/docs/howto.jpg
# tags: ['how to', 'perform a similarity search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import JavaScriptCode from '!!raw-loader!/_includes/code/howto/search.similarity.ts';

## Overview

This page shows you how to perform a pure vector search in Weaviate.

import BasicPrereqs from '/_includes/prerequisites-quickstart.md';

<BasicPrereqs />


### Vector search

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


## Limiting, grouping, and filtering

To [limit](./similarity.md#limit-the-results), [group](./similarity.md#group-results-by-a-property), or [filter](./similarity.md#add-a-conditional-where-filter) results, see the corresponding sections from the _Similarity search_ How-to. 


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
