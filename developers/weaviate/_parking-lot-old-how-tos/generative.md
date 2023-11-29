---
title: Generative search
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

## Overview

This page shows you how to perform `generative` searches.

A generative search uses a large language model (LLM) to generate text based on the search results and a user-provided prompt. This technique is also called *retrieval augmented generation*, or RAG.

:::info Related pages
- [API References: GraphQL: Get](../api/graphql/get.md)
- [References: Modules: generative-openai](../modules/reader-generator-modules/generative-openai.md)
- [References: Modules: generative-cohere](../modules/reader-generator-modules/generative-cohere.md)
- [References: Modules: generative-palm](../modules/reader-generator-modules/generative-palm.md)
:::

## Requirements

To use the generative search feature, you must:
1. Configure Weaviate to use a generator module ([`generative-openai`](../modules/reader-generator-modules/generative-openai.md), [`generative-cohere`](../modules/reader-generator-modules/generative-cohere.md), [`generative-palm`](../modules/reader-generator-modules/generative-palm.md)),
2. Configure the parameters for the `generative-*` module in the target class,
3. Specify a query to retrieve one or more objects, and
4. Provide a [`single prompt`](#single-prompt) or a [`grouped task`](#grouped-task) to generate text from.


<details>
  <summary>How do I <strong>configure Weaviate</strong> with a generator module?</summary>

  You must enable the desired generative search module and (optionally) specify the corresponding inference service (OpenAI, Cohere, PaLM) API key in the relevant Docker Compose file (e.g. `docker-compose.yml`), or (recommended) request that client code provide it with every request. You can generate this file using the [Weaviate configuration tool](../installation/docker-compose.md#configurator).

  Here are the relevant settings from the Docker Compose file. Ensure the corresponding environment variable is set (i.e. `$OPENAI_APIKEY`, `$COHERE_APIKEY`, or `$PALM_APIKEY`), unless you want the client to supply the API key (recommended).

  <Tabs groupId="modules">
<TabItem value="OpenAI" label="OpenAI">

```yaml
services:
  weaviate:
    environment:
      OPENAI_APIKEY: $OPENAI_APIKEY
      ENABLE_MODULES: '...,generative-openai,...'
```

</TabItem>
<TabItem value="Cohere" label="Cohere">

```yaml
services:
  weaviate:
    environment:
      COHERE_APIKEY: $COHERE_APIKEY
      ENABLE_MODULES: '...,generative-cohere,...'
```

</TabItem>
<TabItem value="PaLM" label="PaLM">

```yaml
services:
  weaviate:
    environment:
      PALM_APIKEY: $PALM_APIKEY
      ENABLE_MODULES: '...,generative-palm,...'
```

</TabItem>
</Tabs>
</details>

<details>
  <summary>How do I <strong>set the generative module</strong> in the target class?</summary>

Where multiple `generative` modules are enabled, you must specify the generative module to be used in the `moduleConfig` section of the schema. For example, this configures the `Article` class to use the `generative-openai` module:

```json
{
  "classes": [
    {
      "class": "Article",
      ...,
      "moduleConfig": {
        "generative-openai": {},  // This will configure the 'Article' class to use the 'generative-openai' module
      }
    }
  ]
}
```

You can configure additional module parameters here also. Please refer to the "Schema configuration" section in the relevant module page.

</details>


## Single prompt

A **single prompt** generative search returns a generated response for each object in the query results. For **single prompt** generative searches, you must specify which object *properties* to use in the prompt.

In this example, the query:
1. Retrieves two `JeopardyQuestion` objects related to `World history`,
1. Prepares a prompt for each object, based on the prompt `"Convert the following into a question for twitter. Include emojis for fun, but do not include the answer: {question}."`, where `{question}` is an object property, and
1. Retrieves a generated text for each object (2 total), and
1. Returns the generated text as a part of each object, along with the `question` property.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# SingleGenerativePython"
      endMarker="# END SingleGenerativePython"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# SingleGenerativePython"
      endMarker="# END SingleGenerativePython"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// SingleGenerative TS"
      endMarker="// END SingleGenerative TS"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
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
  text={PyCode}
  startMarker="# SingleGenerative Expected Results"
  endMarker="# END SingleGenerative Expected Results"
  language="json"
/>

</details>

### Single prompt property selection

When using generative search with single prompts, you must specify which object _properties_ to use in the prompt.

The properties to use as a part of the prompt do *not* need to be among the properties retrieved in the query.

In this example, the query:
1. Retrieves two `JeopardyQuestion` objects related to `World history`,
1. Prepares a prompt for each object, based on the prompt `"Convert this quiz question: {question} and answer: {answer} into a trivia tweet.` where `{question}` and `{answer}` are object properties, and
1. Retrieves a generated text for each object (2 total), and
1. Returns the generated text as a part of each object.

Note that the `question` and `answer` properties are not retrieved in the query, but are used in the prompt.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# SingleGenerativePropertiesPython"
      endMarker="# END SingleGenerativePropertiesPython"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# SingleGenerativePropertiesPython"
      endMarker="# END SingleGenerativePropertiesPython"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// SingleGenerativeProperties TS"
      endMarker="// END SingleGenerativeProperties TS"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
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
  text={PyCode}
  startMarker="# SingleGenerativeProperties Expected Results"
  endMarker="# END SingleGenerativeProperties Expected Results"
  language="json"
/>

</details>

## Grouped task

A **grouped task** works by generating a response for the entire query results set.

When using generative search with a **grouped task**, the required parameter is the user prompt. By default, the entire set of properties are included in the combined prompt unless [specified otherwise](#grouped-task-property-selection).

### Example

In this example, the query:
1. Retrieves three `JeopardyQuestion` objects related to `cute animals`,
1. Combines the user prompt with the set of retrieved objects to build the grouped task,
1. Retrieves one generated text using the grouped task, and
1. Returns the generated text as a part of the first object returned, as well as the requested `points` property.

Note that the prompt includes information about the type of the animal (from the `answer` property), even though the `answer` property is not explicitly retrieved.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GroupedGenerativePython"
      endMarker="# END GroupedGenerativePython"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GroupedGenerativePython"
      endMarker="# END GroupedGenerativePython"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GroupedGenerative TS"
      endMarker="// END GroupedGenerative TS"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
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
  text={PyCode}
  startMarker="# GroupedGenerative Expected Results"
  endMarker="# END GroupedGenerative Expected Results"
  language="json"
/>

</details>

### Grouped task property selection

:::info Available from version `v1.18.3`
:::

You can specify which properties will be included in the `grouped task` prompt. Use this to limit the information provided in the prompt, and to reduce the prompt length.

In this example, the prompt only includes the `question` and `answer` properties. Note that the `answer` property is not explicitly retrieved in the query, but it is used by the prompt.

<!-- TODO - add client code when made available -->

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GroupedGenerativeProperties Python"
      endMarker="# END GroupedGenerativeProperties Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GroupedGenerativeProperties Python"
      endMarker="# END GroupedGenerativeProperties Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GroupedGenerativeProperties"
      endMarker="// END GroupedGenerativeProperties"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
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
  text={PyCode}
  startMarker="# GroupedGenerativeProperties Expected Results"
  endMarker="# END GroupedGenerativeProperties Expected Results"
  language="json"
/>

</details>


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
