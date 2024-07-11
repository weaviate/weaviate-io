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
import JavaScriptCodeLegacy from '!!raw-loader!/_includes/code/howto/search.filters-v2.ts';


Filters let you include, or exclude, particular objects from your result set based on provided conditions.<br/>
For a list of filter operators, see the [API reference page](../api/graphql/filters.md#filter-structure).

## Filter with one condition

Add a `filter` to your query, to limit the result set.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# SingleFilterPython"
      endMarker="# END SingleFilterPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# SingleFilterPython"
      endMarker="# END SingleFilterPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// searchSingleFilter"
      endMarker="// END searchSingleFilter"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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
  <TabItem value="py" label="Python Client v4">

  The `v4` Python client API provides  filtering by `any_of`, or `all_of`, as well as using `&` or `|` operators.
  <br/>

  <ul>
    <li>Use <code>any_of</code> or <code>all_of</code> for filtering by any, or all of a list of provided filters.</li>
    <li>Use <code>&</code> or <code>|</code> for filtering by pairs of provided filters.</li>
  </ul>

  <br/>

  #### Filter with `&` or `|`

  <FilteredTextBlock
    text={PyCode}
    startMarker="# MultipleFiltersAndPython"
    endMarker="# END MultipleFiltersAndPython"
    language="python"
  />

  #### Filter with `any of`

  <FilteredTextBlock
    text={PyCode}
    startMarker="# MultipleFiltersAllOfPython"
    endMarker="# END MultipleFiltersAllOfPython"
    language="python"
  />

  #### Filter with `all of`

  <FilteredTextBlock
    text={PyCode}
    startMarker="# MultipleFiltersAllOfPython"
    endMarker="# END MultipleFiltersAllOfPython"
    language="python"
  />

  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# MultipleFiltersAndPython"
      endMarker="# END MultipleFiltersAndPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

  Use `Filters.and` and `Filters.or` methods to combine filters in the JS/TS `v3` API.
  <br/>

  These methods take variadic arguments (e.g. `Filters.and(f1, f2, f3, ...)`). To pass an array (e.g. `fs`) as an argument, provide it like so: `Filters.and(...fs)` which will spread the array into its elements.
  <br/>

  <FilteredTextBlock
    text={JavaScriptCode}
    startMarker="// searchMultipleFiltersAnd"
    endMarker="// END searchMultipleFiltersAnd"
    language="js"
  />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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

## Nested filters

You can group and nest filters.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# MultipleFiltersNestedPython"
      endMarker="# END MultipleFiltersNestedPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# MultipleFiltersNestedPython"
      endMarker="# END MultipleFiltersNestedPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// searchMultipleFiltersNested"
      endMarker="// END searchMultipleFiltersNested"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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
- Inside an `operand` expression, set `operator` equal to `And` or `Or` to add the nested group.
- Add `operands` to the nested group as needed.

</details>

## Combine filters and search operators

Filters work with search operators like `nearXXX`, `hybrid`, and `bm25`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# SingleFilterNearTextPython"
      endMarker="# END SingleFilterNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# SingleFilterNearTextPython"
      endMarker="# END SingleFilterNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// searchFilterNearText"
      endMarker="// END searchFilterNearText"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# ContainsAnyFilter"
      endMarker="# END ContainsAnyFilter"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# ContainsAnyFilter"
      endMarker="# END ContainsAnyFilter"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// ContainsAnyFilter"
      endMarker="// END ContainsAnyFilter"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# ContainsAllFilter"
      endMarker="# END ContainsAllFilter"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# ContainsAllFilter"
      endMarker="# END ContainsAllFilter"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// ContainsAllFilter"
      endMarker="// END ContainsAllFilter"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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

If you want to do a batch delete, see [Delete objects](../manage-data/delete.mdx#use-containsany--containsall).

## Filter text on partial matches

If the object property is a `text`, or `text`-like data type such as object ID, use `Like` to filter on partial text matches.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# LikeFilterPython"
      endMarker="# END LikeFilterPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# LikeFilterPython"
      endMarker="# END LikeFilterPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// searchLikeFilter"
      endMarker="// END searchLikeFilter"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# CrossReferencePython"
      endMarker="# END CrossReferencePython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# CrossReferencePython"
      endMarker="# END CrossReferencePython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// searchCrossReference"
      endMarker="// END searchCrossReference"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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

import GeoLimitations from '/_includes/geo-limitations.mdx';

<GeoLimitations/>

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FilterbyGeolocation"
      endMarker="# END FilterbyGeolocation"
      language="python"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START FilterbyGeolocation"
      endMarker="# END FilterbyGeolocation"
      language="python"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// FilterbyGeolocation"
      endMarker="// END FilterbyGeolocation"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
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

## By `DATE` datatype

To filter by a `DATE` datatype property, specify the date/time as an [RFC 3339](https://datatracker.ietf.org/doc/rfc3339/) timestamp, or a client library-compatible type such as a Python `datetime` object.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FilterByDateDatatype"
      endMarker="# END FilterByDateDatatype"
      language="python"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// FilterByDateDatatype"
      endMarker="// END FilterByDateDatatype"
      language="js"
    />
  </TabItem>
</Tabs>

## Filter by metadata

Filters also work with metadata properties such as object id, property length, and timestamp.

For the full list, see [API references: Filters](../api/graphql/filters.md#special-cases).

### Metadata filter - by object `id`

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FilterById"
      endMarker="# END FilterById"
      language="python"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START FilterById"
      endMarker="# END FilterById"
      language="python"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// filterById"
      endMarker="// END filterById"
      language="js"
    />
  </TabItem>

 <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FilterByTimestamp"
      endMarker="# END FilterByTimestamp"
      language="python"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START FilterByTimestamp"
      endMarker="# END FilterByTimestamp"
      language="python"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// FilterByTimestamp"
      endMarker="// END FilterByTimestamp"
      language="js"
    />
  </TabItem>

   <TabItem value="js2" label="JS/TS Client ">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FilterByPropertyLength"
      endMarker="# END FilterByPropertyLength"
      language="python"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START FilterByPropertyLength"
      endMarker="# END FilterByPropertyLength"
      language="python"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={JavaScriptCode}
      startMarker="// FilterByPropertyLength"
      endMarker="// END FilterByPropertyLength"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={JavaScriptCodeLegacy}
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

- [Connect to Weaviate](/developers/weaviate/connections/index.mdx)
- [API References: Filters](../api/graphql/filters.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
