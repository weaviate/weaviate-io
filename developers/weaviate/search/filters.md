---
title: Filters
sidebar_position: 80
image: og/docs/howto.jpg
# tags: ['how to', 'apply conditional filters']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/search.filters.py';
import JavaScriptCode from '!!raw-loader!/_includes/code/howto/search.filters.js';

## Overview

This page shows you how to add conditional filters to your search queries with the `where` operator.

:::info Related pages
- [API References: Filters](../api/graphql/filters.md)
:::

import BasicPrereqs from '/_includes/prerequisites-quickstart.md';

<BasicPrereqs />

## A single-condition filter

To add a filter, you must provide at least one `where` condition to your query.

The following example specifies that the `round` property must equal `"Double Jeopardy!"`. Note that the `valueText` parameter is used since the property datatype is `text`.

:::tip Filter arguments list
See [this page](../api/graphql/filters.md#filter-structure) for the list of available filter arguments.
:::

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# SingleFilterPython"
  endMarker="# END SingleFilterPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchSingleFilter"
  endMarker="// END searchSingleFilter"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# SingleFilterGraphQL"
  endMarker="# END SingleFilterGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected SingleFilter results"
  endMarker="# END Expected SingleFilter results"
  language="json"
/>

</details>

### With a search parameter

Conditional filters can be combined with a search parameter such as `nearXXX`, `hybrid` or `bm25`.

The following example adds a `points` filter to a `nearText` query, where the `points` property must be greater than 200. Note that the `valueInt` is used as the property datatype is `int`.

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# SingleFilterNearTextPython"
  endMarker="# END SingleFilterNearTextPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchFilterNearText"
  endMarker="// END searchFilterNearText"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# SingleFilterNearTextGraphQL"
  endMarker="# END SingleFilterNearTextGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected SingleFilterNearText results"
  endMarker="# END Expected SingleFilterNearText results"
  language="json"
/>

</details>

### By partial matches (text)

With `text` data type properties, you can use the `Like` operator to filter by partial matches.

The following example filters for objects including the text `"inter"` in any part of a token in the `answer` property.

:::tip `*` vs `?`
`*` matches zero or more characters, whereas `?` matches exactly one unknown character.
:::

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# LikeFilterPython"
  endMarker="# END LikeFilterPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchLikeFilter"
  endMarker="// END searchLikeFilter"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# LikeFilterGraphQL"
  endMarker="# END LikeFilterGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected LikeFilter results"
  endMarker="# END Expected LikeFilter results"
  language="json"
/>

</details>

## Multiple-condition filters

To add a multiple-condition filter, you must set the operator to `And` or `Or`, and set two or more conditions under the corresponding `operands` parameter.

The following example specifies and `And` condition, so that both:
- the `round` property must equal `"Double Jeopardy!"`, and
- the `points` property must be less than 600.

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# MultipleFiltersAndPython"
  endMarker="# END MultipleFiltersAndPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchMultipleFiltersAnd"
  endMarker="// END searchMultipleFiltersAnd"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# MultipleFiltersAndGraphQL"
  endMarker="# END MultipleFiltersAndGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected MultipleFiltersAnd results"
  endMarker="# END Expected MultipleFiltersAnd results"
  language="json"
/>

</details>

### Nested multiple conditions

Conditional filters can be nested in Weaviate. To do so, set the `operator` of an outer `operands` value to `And` or `Or`. Then, you can provide two or more conditions to the inner `operands`.

The following example specifies that:
- the `answer` property must contain a substring `"nest"`, `And`
- the `points` property must be greater than 700, `Or`, the `points` property must be less than 300.

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# MultipleFiltersNestedPython"
  endMarker="# END MultipleFiltersNestedPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchMultipleFiltersNested"
  endMarker="// END searchMultipleFiltersNested"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# MultipleFiltersNestedGraphQL"
  endMarker="# END MultipleFiltersNestedGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected MultipleFiltersNested results"
  endMarker="# END Expected MultipleFiltersNested results"
  language="json"
/>

</details>



## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />