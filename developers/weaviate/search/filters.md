---
title: Guide to hybrid search
sidebar_position: 95
image: og/docs/howto.jpg
# tags: ['how to', 'apply conditional filters']
---



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.filters.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.filters-v3.py';
import JavaScriptCode from '!!raw-loader!/_includes/code/howto/search.filters.ts';

## IGNORE PAGE CONTENTS

This page shows you how to add conditional filters to your searches with the `where` operator.

A filter is a set of Boolean (i.e. `True` or `False`) conditions. Accordingly, a filter will only include or exclude objects and will not affect their rankings.

:::info Related pages
- [API References: Filters](../api/graphql/filters.md)
:::

## List of filter operators

For a list of filter operators, see the [API references: Filters](../api/graphql/filters.md#filter-structure) page.

### `ContainsAny` and `ContainsAll`

The `ContainsAny` and `ContainsAll` operators filter objects using values of an array as criteria.

To use either of these operators, provide the filter criterion array as `valueText`. Note that the usage of `ContainsAny` and `ContainsAll` is different for batch deletion operations ([read more](../manage-data/delete.mdx#containsany--containsall)).

## A single-condition filter

To add a filter, you must provide at least one `where` condition to your query.

The following example specifies that the `round` property must equal `"Double Jeopardy!"`. Note that the `valueText` parameter is used since the property datatype is `text`.

:::tip Filter arguments list
See [this page](../api/graphql/filters.md#filter-structure) for the list of available filter arguments.
:::

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# SingleFilterPython"
      endMarker="# END SingleFilterPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
      text={PyCode}
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
  text={PyCode}
  startMarker="# Expected SingleFilter results"
  endMarker="# END Expected SingleFilter results"
  language="json"
/>

</details>

### With a search operator

Conditional filters can be combined with a search operator such as `nearXXX`, `hybrid` or `bm25`.

The following example adds a `points` filter to a `nearText` query, where the `points` property must be greater than 200. Note that the `valueInt` is used as the property datatype is `int`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# SingleFilterNearTextPython"
      endMarker="# END SingleFilterNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
      text={PyCode}
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
  text={PyCode}
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
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# LikeFilterPython"
      endMarker="# END LikeFilterPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
      text={PyCode}
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
  text={PyCode}
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
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# MultipleFiltersAndPython"
      endMarker="# END MultipleFiltersAndPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
      text={PyCode}
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
  text={PyCode}
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
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# MultipleFiltersNestedPython"
      endMarker="# END MultipleFiltersNestedPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
      text={PyCode}
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
  text={PyCode}
  startMarker="# Expected MultipleFiltersNested results"
  endMarker="# END Expected MultipleFiltersNested results"
  language="json"
/>

</details>


## Filter using cross-references

You can filter objects using properties from a cross-referenced object.

The following example filters `JeopardyQuestion` objects using properties of `JeopardyCategory` that they are cross-referencing.

More specifically, the example filters for the `title` property of `JeopardyCategory` objects that are cross-referenced from the `JeopardyQuestion` object. The `title` property must include the substring `Sport`.

:::note Case-sensitivity
The results are case-insensitive here, as the `title` property is defined with [`word` tokenization](../config-refs/schema.md#property-tokenization).
:::

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# CrossReferencePython"
      endMarker="# END CrossReferencePython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# CrossReferencePython"
      endMarker="# END CrossReferencePython"
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
      text={PyCode}
      startMarker="# CrossReferenceGraphQL"
      endMarker="# END CrossReferenceGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCode}
  startMarker="# Expected CrossReferencePython results"
  endMarker="# END Expected CrossReferencePython results"
  language="json"
/>

</details>

## Filter by metadata

You can filter by any number of metadata properties, such as object id, property length, timestamp, null state and more.

See the [API references: Filters](../api/graphql/filters.md#special-cases) page for the full list of available metadata filters and any special usage patterns.

## Improving filter performance

import RangeFilterPerformanceNote from '/_includes/range-filter-performance-note.mdx';

<RangeFilterPerformanceNote />

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
