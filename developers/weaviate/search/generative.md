---
title: Generative search
sidebar_position: 80
image: og/docs/howto.jpg
# tags: ['how to', 'perform a semantic search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/search.generative.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.generative.ts';

## Overview

This page shows you how to perform `generative` searches using Weaviate.

Weaviate's `generative` search works by
1. performing a search,
1. generating a LLM response from a prompt and the search results, and
1. returning the query results as well as the generated response to the user.

:::info Related pages
- [API References: GraphQL: Generative search](../api/graphql/get.md)
:::

## Requirements

### Configuration

Before you can use the generative search feature with Weaviate, you must have:
- A [generative module](../modules/reader-generator-modules/index.md) that is enabled in your Weaviate instance and configured for the relevant class, and
- Specify an inference API key if the generative module requires it.

:::tip `generative` API provider unrelated to `text2vec` API provider
The `generative` inference API is separate to any `text2vec` configuration. Accordingly, your choice of the `text2vec` module does not restrict your choice of `generative` module.
:::

### Usage

Then, to use the generative search feature, you must:
- Specify a query to retrieve one or more objects, and
- Provide a `single prompt` or a `grouped task` to the module.

## Single prompt

A `single prompt` type task works by generating a response for each object in the query results. When using generative search with single prompts, you must specify which object `properties` to use in the prompt.

In the below example, the query:
1. Retrieves two `JeopardyQuestion` objects,
1. Prepares a prompt for each object, based on its `question` property, and
1. Retrieves generated text from these prompts, which is included in the response to the user.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# SingleGenerativePython"
  endMarker="# END SingleGenerativePython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// SingleGenerative"
  endMarker="// END SingleGenerative"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# SingleGenerativeGraphQL"
  endMarker="# END SingleGenerativeGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# SingleGenerative Expected Results"
  endMarker="# END SingleGenerative Expected Results"
  language="json"
/>

</details>

### Property selection

When using generative search with single prompts, you must specify which object `properties` to use in the prompt.

The `properties` to use as a part of the prompt does *not* need to be one of the properties retrieved in the query.

In the below example, the query:
1. Retrieves two `JeopardyQuestion` objects without any properties specified,
1. Prepares a prompt for each object, based on its `question` and `answer` properties, and
1. Retrieves generated text from these prompts, which is included in the response to the user.

Note that the `question` and `answer` properties are not retrieved in the query, but are used in the prompt.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# SingleGenerativePropertiesPython"
  endMarker="# END SingleGenerativePropertiesPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// SingleGenerativeProperties"
  endMarker="// END SingleGenerativeProperties"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# SingleGenerativePropertiesGraphQL"
  endMarker="# END SingleGenerativePropertiesGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# SingleGenerativeProperties Expected Results"
  endMarker="# END SingleGenerativeProperties Expected Results"
  language="json"
/>

</details>

## Grouped task

A `grouped task` works by generating a response for the entire query results set. When using generative search with grouped task, it is optional to specify which properties to use in the task.

In the below example, the query:
1. Retrieves three `JeopardyQuestion` objects related to `cute animals`,
1. Prepares a prompt for the whole dataset, and
1. Retrieves generated text the one prompt, which is included in the response to the user.

Note that the prompt includes information about the type of the animal (from the `answer` property), even though the `answer` property is not explicitly retrieved.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GroupedGenerativePython"
  endMarker="# END GroupedGenerativePython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GroupedGenerative"
  endMarker="// END GroupedGenerative"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GroupedGenerativeGraphQL"
  endMarker="# END GroupedGenerativeGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GroupedGenerative Expected Results"
  endMarker="# END GroupedGenerative Expected Results"
  language="json"
/>

</details>

### Property selection

:::info Requires Weaviate `v1.18.3` or higher
:::

You can also specify which properties to use in the prompt when using generative search with grouped tasks. This may be useful to control the type of information provided in the prompt, and to ensure that the prompt is not too long.

In the below example, the prompt will only include the `question` and `answer` properties. Note that `answer` property is not explicitly retrieved in the query, but used in the prompt.

:::note Feature not yet supported by clients
This feature is currently not supported by the clients.
:::

<Tabs groupId="languages">
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GroupedGenerativePropertiesGraphQL"
  endMarker="# END GroupedGenerativePropertiesGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GroupedGenerativeProperties Expected Results"
  endMarker="# END GroupedGenerativeProperties Expected Results"
  language="json"
/>

</details>
