---
title: Reranker
sidebar_position: 50
image: og/docs/integrations/provider_integrations_cohere.jpg
# tags: ['model providers', 'cohere', 'generative', 'rag']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!../_includes/provider.reranker.py';
import TSCode from '!!raw-loader!../_includes/provider.reranker.ts';

# Cohere reranker models with Weaviate

Weaviate's integration with Cohere's APIs allows you to access their models' capabilities directly from Weaviate.

See the [Cohere integrations page](./index.md#requirements) for a list of requirements to use Cohere with Weaviate.

## Configuration

You can configure a Weaviate collection to use a Cohere reranker model.

This integration allows Weaviate to perform an initial search, then rerank the retrieved results using the specified Cohere model.

![Reranker integration illustration](../_includes/integration_cohere_reranker.png)

### Example

To configure a collection to use Cohere generative models, set it as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START RerankerCohere"
      endMarker="# END RerankerCohere"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RerankerCohere"
      endMarker="// END RerankerCohere"
      language="ts"
    />
  </TabItem>

</Tabs>

For further details on model parameters, please consult the [Cohere API documentation](https://docs.cohere.com/reference/rerank).

### Available models

The `rerank-multilingual-v3.0` model is set as the default model. You can also specify one of the available models manually.

<details>
  <summary>Available models</summary>

- rerank-english-v3.0
- rerank-multilingual-v3.0
- rerank-english-v2.0
- rerank-multilingual-v2.0

You can also select a fine-tuned reranker model_id, such as:

- `500df123-afr3-...`

Please refer to [this blog post](/blog/fine-tuning-coheres-reranker) for more information.

</details>

## API key

For the integration to work, you must provide a valid Cohere API key so that Weaviate can work with the Cohere API. You can provide the API key to Weaviate in one of two ways:

- Set the `COHERE_API_KEY` environment variable that is available to Weaviate.
- Provide the API key at runtime.

Please see [this section for more details](./index.md#api-key).

## Reranker query example

Any search in Weaviate can be combined with a reranker to perform reranking operations.

![Reranker integration illustration](../_includes/integration_cohere_reranker.png)

The single prompt method uses the generative model to generate text for each object in the search results. In other words, for `n` search results, the generative model will generate `n` outputs.

Note that the single prompt query must indicate the object properties for Weaviate to pass on to the language model, using braces `{}`. For example, if the object's `title` property is to be passed on, the query should include `{title}`.

<Tabs groupId="languages">

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START RerankerQueryExample"
      endMarker="# END RerankerQueryExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RerankerQueryExample"
      endMarker="// END RerankerQueryExample"
      language="ts"
    />
  </TabItem>

</Tabs>

## Further resources

To learn how Cohere's embedding models integrate with Weaviate, see [this page](./embeddings.md).
To learn how Cohere's generative models integrate with Weaviate, see [this page](./generative.md).

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. Accordingly, please refer to the following examples, which are model-agnostic:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### References

- Cohere [Chat API documentation](https://docs.cohere.com/reference/chat)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
