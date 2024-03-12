---
title: Filters
sidebar_position: 90
image: og/docs/howto.jpg
# tags: ['how to', 'apply conditional filters']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.filters.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.filters-v3.py';
import JavaScriptCode from '!!raw-loader!/_includes/code/howto/search.filters.ts';

Filters let you include, or exclude, particular objects from your result set based on provided conditions.<br/>
For a list of filter operators, see the [API reference page](../api/graphql/filters.md#filter-structure).

## Filter with one condition

Add a `filter` to your query, to limit the result set.

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
      text={PyCodeV3}
      startMarker="# SingleFilterGraphQL"
      endMarker="# END SingleFilterGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected SingleFilter results"
  endMarker="# END Expected SingleFilter results"
  language="json"
/>

</details>

## Filter with multiple conditions

To filter with two or more conditions, use `And` or `Or` to define the relationship between the conditions.

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
      text={PyCodeV3}
      startMarker="# MultipleFiltersAndGraphQL"
      endMarker="# END MultipleFiltersAndGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected MultipleFiltersAnd results"
  endMarker="# END Expected MultipleFiltersAnd results"
  language="json"
/>

</details>

## Nest filters

You can group and nest filters.

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
      text={PyCodeV3}
      startMarker="# MultipleFiltersNestedGraphQL"
      endMarker="# END MultipleFiltersNestedGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected MultipleFiltersNested results"
  endMarker="# END Expected MultipleFiltersNested results"
  language="json"
/>

</details>

<details>
  <summary>
    Additional information
  </summary>

To create a nested filter, follow these steps.

- Set the outer `operator` equal to `And` or `Or`.
- Add `operands`.
- Within an `operand`, set `operator` equal to `And` or `Or` to nest a group.
- Add `operands` to the nested group.

</details>

## Combine filters and search operators

Filters work with search operators like `nearXXX`, `hybrid`, and `bm25`.

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
      text={PyCodeV3}
      startMarker="# SingleFilterNearTextGraphQL"
      endMarker="# END SingleFilterNearTextGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected SingleFilterNearText results"
  endMarker="# END Expected SingleFilterNearText results"
  language="json"
/>

</details>

## `ContainsAny` Filter

The `ContainsAny` operator works on text properties and take an array of values as input. It will match objects where the property **contains any (i.e. one or more)** of the values in the array.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# ContainsAnyFilter"
      endMarker="# END ContainsAnyFilter"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# ContainsAnyFilter"
      endMarker="# END ContainsAnyFilter"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// ContainsAnyFilter"
      endMarker="// END ContainsAnyFilter"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GraphQLContainsAnyFilter"
      endMarker="# END GraphQLContainsAnyFilter"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected ContainsAnyFilter results"
  endMarker="# END Expected ContainsAnyFilter results"
  language="json"
/>

</details>

## `ContainsAll` Filter

The `ContainsAll` operator works on text properties and take an array of values as input. It will match objects where the property **contains all** of the values in the array.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# ContainsAllFilter"
      endMarker="# END ContainsAllFilter"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# ContainsAllFilter"
      endMarker="# END ContainsAllFilter"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// ContainsAllFilter"
      endMarker="// END ContainsAllFilter"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GraphQLContainsAllFilter"
      endMarker="# END GraphQLContainsAllFilter"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected ContainsAllFilter results"
  endMarker="# END Expected ContainsAllFilter results"
  language="json"
/>

</details>

## `ContainsAny` and `ContainsAll` with batch delete

If you want to do a batch delete, see [Delete objects](../manage-data/delete.mdx#containsany--containsall). `ContainsAny` and `ContainsAll` have different behavior in batch deletion operations than they do in queries.

## Filter text on partial matches

If the object property is a `text`, or `text`-like data type such as object ID, use `Like` to filter on partial text matches.

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
      text={PyCodeV3}
      startMarker="# LikeFilterGraphQL"
      endMarker="# END LikeFilterGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected LikeFilter results"
  endMarker="# END Expected LikeFilter results"
  language="json"
/>

</details>

<details>
  <summary>
    Additional information
  </summary>

  The `*` wildcard operator matches zero or more characters. The `?` operator matches exactly one character.
  <br/>

  Currently, the `Like` filter is not able to match wildcard characters (`?` and `*`) as literal characters ([read more](../api/graphql/filters.md#wildcard-literal-matches-with-like)).

</details>

## Filter using cross-references

To filter on properties from a cross-referenced object, add the collection name to the filter.

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
      text={PyCodeV3}
      startMarker="# CrossReferenceGraphQL"
      endMarker="# END CrossReferenceGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected CrossReferencePython results"
  endMarker="# END Expected CrossReferencePython results"
  language="json"
/>

</details>

## By geo-coordinates

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FilterbyGeolocation"
      endMarker="# END FilterbyGeolocation"
      language="python"
    />
  </TabItem>
  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START FilterbyGeolocation"
      endMarker="# END FilterbyGeolocation"
      language="python"
    />
  </TabItem>
  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// FilterbyGeolocation"
      endMarker="// END FilterbyGeolocation"
      language="js"
    />
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START GQLFilterbyGeolocation"
      endMarker="# END GQLFilterbyGeolocation"
      language="graphql"
    />
  </TabItem>
</Tabs>

## Filter by metadata

Filters also work with metadata properties such as object id, property length, and timestamp.

For the full list, see [API references: Filters](../api/graphql/filters.md#special-cases).

### Metadata filter - by object `id`

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FilterById"
      endMarker="# END FilterById"
      language="python"
    />
  </TabItem>
  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START FilterById"
      endMarker="# END FilterById"
      language="python"
    />
  </TabItem>
  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// filterById"
      endMarker="// END filterById"
      language="js"
    />
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GQLFilterById"
      endMarker="# END GQLFilterById"
      language="graphql"
    />
  </TabItem>
</Tabs>

### Metadata filter - by object timestamp

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FilterByTimestamp"
      endMarker="# END FilterByTimestamp"
      language="python"
    />
  </TabItem>
  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START FilterByTimestamp"
      endMarker="# END FilterByTimestamp"
      language="python"
    />
  </TabItem>
  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// FilterByTimestamp"
      endMarker="// END FilterByTimestamp"
      language="js"
    />
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GQLFilterByTimestamp"
      endMarker="# END GQLFilterByTimestamp"
      language="graphql"
    />
  </TabItem>
</Tabs>

### Metadata filter - by object property length

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FilterByPropertyLength"
      endMarker="# END FilterByPropertyLength"
      language="python"
    />
  </TabItem>
  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START FilterByPropertyLength"
      endMarker="# END FilterByPropertyLength"
      language="python"
    />
  </TabItem>
  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// FilterByPropertyLength"
      endMarker="// END FilterByPropertyLength"
      language="js"
    />
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GQLFilterByPropertyLength"
      endMarker="# END GQLFilterByPropertyLength"
      language="graphql"
    />
  </TabItem>
</Tabs>

## Filter considerations

### Tokenization

import TokenizationNote from '/_includes/tokenization.mdx'

<TokenizationNote />

### Improve filter performance

If you encounter slow filter performance, consider adding a `limit` parameter or additional `where` operators to restrict the size of your data set.

## List of filter operators

For a list of filter operators, see [the reference page](../api/graphql/filters.md#filter-structure).

## Related pages

- [Connect to Weaviate](/developers/weaviate/tutorials/connect.mdx)
- [API References: Filters](../api/graphql/filters.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
