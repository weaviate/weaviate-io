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
import SimilarityPyCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import SimilarityPyCodeV3 from '!!raw-loader!/_includes/code/howto/search.similarity-v3.py';
import SimilarityTSCode from '!!raw-loader!/_includes/code/howto/search.similarity.ts';

`Generative` search, also known as "Retrieval Augmented Generation" (RAG), is a multi-stage process.<br/>
First Weaviate performs a query, then it passes the retrieved results and a prompt to a large language model (LLM), to generate a new output.

<details>
  <summary>
    Additional information
  </summary>

### Configure generative search

1. Configure Weaviate to use a generator module. For details, see the module reference page:

   - [`generative-openai`](../modules/reader-generator-modules/generative-openai.md)
   - [`generative-cohere`](../modules/reader-generator-modules/generative-cohere.md)
   - [`generative-palm`](../modules/reader-generator-modules/generative-palm.md)

 2. Configure the target collection to use the generator module. For details, see schema configuration on the module reference page.
 3. Query your database to retrieve one or more objects.
 4. Use the query results to generate a new result.

    - [`single prompt`](#single-prompt)
    - [`grouped task`](#grouped-task)

</details>

## Named vectors

:::info Added in `v1.24`
:::

Any vector-based search on collections with [named vectors](../config-refs/schema/multi-vector.md) configured must include a `target` vector name in the query. This allows Weaviate to find the correct vector to compare with the query vector.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={SimilarityPyCode}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={SimilarityPyCodeV3}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={SimilarityTSCode}
      startMarker="// NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={SimilarityPyCodeV3}
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

## Grouped task search

Grouped task search returns one response that includes all of the query results. By default grouped task search uses all object `properties` in the prompt.

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

## Set grouped task prompt properties

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

## Related pages

- [Connect to Weaviate](/developers/weaviate/tutorials/connect.mdx)
- [References: Modules: generative-openai](../modules/reader-generator-modules/generative-openai.md)
- [References: Modules: generative-cohere](../modules/reader-generator-modules/generative-cohere.md)
- [References: Modules: generative-palm](../modules/reader-generator-modules/generative-palm.md)
- [API References: GraphQL: Get](../api/graphql/get.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
