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

Generative search, also know as "retrieval augmented generation" (RAG), is a multi-stage process. Weaviate passes search results and a prompt to a large language model (LLM). The LLM generates a new output based on that input.

## Generative search steps

1. Configure Weaviate to use a generator module. For details, see the module reference page:

   - [`generative-openai`](../modules/reader-generator-modules/generative-openai.md)
   - [`generative-cohere`](../modules/reader-generator-modules/generative-cohere.md)
   - [`generative-palm`](../modules/reader-generator-modules/generative-palm.md)
   
 2. Configure the target collection to use the generator module. For details, see schema configuration on the module reference page. 
 3. Query your database to retrieve one or more objects.
 4. Use the query results to generate a new result.
 
    - [`single prompt`](#single-prompt)
    - [`grouped task`](#grouped-task)


## Run a single prompt search

Single prompt search returns a generated response for each object in the query results. Specify the object `properties` to use in the prompt.

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

The output is like this:

<FilteredTextBlock
  text={PyCode}
  startMarker="# SingleGenerative Expected Results"
  endMarker="# END SingleGenerative Expected Results"
  language="json"
/>

</details>

## Set single prompt search properties

Define object `properties` to use in the prompt. The properties you use in the prompt do not have to be among the properties you retrieve in the query.

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

The output is like this:

<FilteredTextBlock
  text={PyCode}
  startMarker="# SingleGenerativeProperties Expected Results"
  endMarker="# END SingleGenerativeProperties Expected Results"
  language="json"
/>

</details>

## Run a grouped task search

Grouped task search returns a single response that includes all of the query results. By default grouped task search uses all object `properties` in the prompt.

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

The output is like this:

<FilteredTextBlock
  text={PyCode}
  startMarker="# GroupedGenerative Expected Results"
  endMarker="# END GroupedGenerative Expected Results"
  language="json"
/>

</details>

## Set grouped task search properties

:::info Added in `v1.18.3`
:::

Define object `properties` to use in the prompt. This limits the information in the prompt and reduces prompt length.

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

The output is like this:

<FilteredTextBlock
  text={PyCode}
  startMarker="# GroupedGenerativeProperties Expected Results"
  endMarker="# END GroupedGenerativeProperties Expected Results"
  language="json"
/>

</details>

## Related pages

- [References: Modules: generative-openai](../modules/reader-generator-modules/generative-openai.md)
- [References: Modules: generative-cohere](../modules/reader-generator-modules/generative-cohere.md)
- [References: Modules: generative-palm](../modules/reader-generator-modules/generative-palm.md)
- [API References: GraphQL: Get](../api/graphql/get.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
