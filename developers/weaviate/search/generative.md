---
title: Retrieval Augmented Generation (RAG)
sidebar_position: 70
image: og/docs/howto.jpg
# tags: ['how to', 'generative']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.generative.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.generative-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.generative.ts';
import TSCodeLegacy from '!!raw-loader!/_includes/code/howto/search.generative-v2.ts';
import GoCode from '!!raw-loader!/_includes/code/howto/go/docs/mainpkg/search-generative_test.go';

Retrieval Augmented Generation (RAG) combines information retrieval with generative AI models.

In Weaviate, a RAG query consists of two parts: *a search query*, and a *prompt for the model*. Weaviate first performs the search, then passes both the search results and your prompt to a generative AI model before returning the generated response.

## Configure a generative model provider

:::info Added in `v1.30`
:::

To use RAG, [a collection must be configured](../manage-data/collections.mdx#specify-a-generative-model-integration) to use a [generative model integration](../model-providers/index.md) or you can spcify the generative model in the search operation directly:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START DynamicRag"
      endMarker="# END DynamicRag"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>
  <TabItem value="go" label="Go">

```ts
// Go support coming soon
```

  </TabItem>
    <TabItem value="java" label="Java">

```ts
// Java support coming soon
```

  </TabItem>
</Tabs>

## Named vectors

:::info Added in `v1.24`
:::

Any vector-based search on collections with [named vectors](../config-refs/schema/multi-vector.md) configured must include a `target` vector name in the query. This allows Weaviate to find the correct vector to compare with the query vector.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="tsv2"
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

## Single prompt search

Single prompt search returns a generated response for each object in the query results.<br/>
Define object `properties` – using `{prop-name}` syntax – to interpolate retrieved content in the prompt.<br/>
The properties you use in the prompt do not have to be among the properties you retrieve in the query.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# SingleGenerativePropertiesPython"
      endMarker="# END SingleGenerativePropertiesPython"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# SingleGenerativePropertiesPython"
      endMarker="# END SingleGenerativePropertiesPython"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// SingleGenerativeProperties TS"
      endMarker="// END SingleGenerativeProperties TS"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// SingleGenerativeProperties TS"
      endMarker="// END SingleGenerativeProperties TS"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START SingleGenerativeProperties"
      endMarker="// END SingleGenerativeProperties"
      language="gonew"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# SingleGenerativePropertiesGraphQL"
      endMarker="# END SingleGenerativePropertiesGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# SingleGenerativeProperties Expected Results"
  endMarker="# END SingleGenerativeProperties Expected Results"
  language="json"
/>

</details>

### Additional parameters

:::info Added in `v1.30`
:::

You can use *generative parameters* to specify additional options when performing a single prompt search:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# SingleGenerativeParametersPython"
      endMarker="# END SingleGenerativeParametersPython"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>
  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>
    <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

<!-- TODO[g-despot]: Add response before publishing -->

## Grouped task search

Grouped task search returns one response that includes all of the query results. By default grouped task search uses all object `properties` in the prompt.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GroupedGenerativePython"
      endMarker="# END GroupedGenerativePython"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GroupedGenerativePython"
      endMarker="# END GroupedGenerativePython"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GroupedGenerative TS"
      endMarker="// END GroupedGenerative TS"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// GroupedGenerative TS"
      endMarker="// END GroupedGenerative TS"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GroupedGenerative"
      endMarker="// END GroupedGenerative"
      language="gonew"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GroupedGenerativeGraphQL"
      endMarker="# END GroupedGenerativeGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GroupedGenerative Expected Results"
  endMarker="# END GroupedGenerative Expected Results"
  language="json"
/>

</details>

### Set grouped task prompt properties

:::info Added in `v1.18.3`
:::

Define object `properties` to use in the prompt. This limits the information in the prompt and reduces prompt length.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GroupedGenerativeProperties Python"
      endMarker="# END GroupedGenerativeProperties Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GroupedGenerativeProperties Python"
      endMarker="# END GroupedGenerativeProperties Python"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GroupedGenerativeProperties"
      endMarker="// END GroupedGenerativeProperties"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// GroupedGenerativeProperties"
      endMarker="// END GroupedGenerativeProperties"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GroupedGenerativeProperties"
      endMarker="// END GroupedGenerativeProperties"
      language="gonew"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GroupedGenerativePropertiesGraphQL"
      endMarker="# END GroupedGenerativePropertiesGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GroupedGenerativeProperties Expected Results"
  endMarker="# END GroupedGenerativeProperties Expected Results"
  language="json"
/>

</details>

### Additional parameters

:::info Added in `v1.30`
:::

You can use *generative parameters* to specify additional options when performing grouped tasks:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START GroupedGenerativeParametersPython"
      endMarker="# END GroupedGenerativeParametersPython"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>
  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>
    <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

<!-- TODO[g-despot]: Add response before publishing -->

## Working with images

You can also use images when querying Weaviate and perform retrieval augmented generation in both single prompts and grouped tasks. 
The following fields are available for generative search with images:
- `images`: A base64 encoded string of the image bytes.
- `image_properties`: Names of the properties in Weaviate that store images for additional context.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START WorkingWithImages"
      endMarker="# END WorkingWithImages"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>
  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>
    <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

## Related pages

- [Connect to Weaviate](/developers/weaviate/connections/index.mdx)
- [Model provider integrations](../model-providers/index.md).
- [API References: GraphQL: Get](../api/graphql/get.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
