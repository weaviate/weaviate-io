---
title: Generative
sidebar_position: 50
image: og/docs/tutorials.jpg
# tags: ['getting started']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!../_includes/openai_endtoend.py';

# AWS Generative AI models

:::info Azure OpenAI
If you use OpenAI from with an Azure environment, please [see this page](./azure-openai.md) instead.
:::

Weaviate provides convenient integrations with many of OpenAI's models.

## Model integrations

### Vectorization / Embeddings

The Weaviate OpenAI vectorizer ([`text2vec-openai`](../modules/retriever-vectorizer-modules/text2vec-openai.md)) automates data vectorization using OpenAI's embedding models.

The vectorizer [supports multiple models](../modules/retriever-vectorizer-modules/text2vec-openai.md#available-models-openai) such as `ada-002` (default), `text-embedding-3-small` and `text-embedding-3-large`.

### Generative AI models

Weaviate also integrates with OpenAI's generative models to [perform retrieval augmented generation (RAG)](../modules/reader-generator-modules/generative-openai.md).

<!-- , or to [perform question answering](../modules/reader-generator-modules/qna-openai.md) -->

The OpenAI generative model integration [supports many models](../modules/reader-generator-modules/generative-openai.md#supported-models-openai) such as `gpt-3.5-turbo` (default), `gpt-4` and `gpt-4-1106-preview`.

## Integration availability

| | OpenAI<br/>Vectorizer | OpenAI<br/>Generative |
| ----- | ----- | ----- |
| Weaviate Cloud Services | ✅ | ✅ |
| Docker | ✅ | ✅ |
| Kubernetes | ✅ | ✅ |
| Embedded | ✅ | ✅ |

<details>
  <summary>How to enable - Weaviate open source</summary>

</details>

## End-to-end example

The following code example demonstrates the use of OpenAI models in Weaviate.

It creates a collection and:
- Sets an OpenAI vectorizer (`ada-002`) model as the vectorizer for the collection
- Sets an OpenAI generative model (`gpt-3.5-turbo`) as the RAG integration for the collection

Thus, the collection can import data, perform searches, and perform retrieval augmented generation using OpenAI models.

<Tabs groupId="languages">

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ModelProviderEndToEnd"
      endMarker="# END ModelProviderEndToEnd"
      language="py"
    />
  </TabItem>
</Tabs>

Note that the example passes on an OpenAI API key to the Weaviate client. You must replace this with your own OpenAI API key.

## Custom configurations

Many OpenAI models have additional parameters that can be set. Accordingly, the Weaviate integrations provide additional configuration options to set these parameters.

<Tabs groupId="languages">

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ModelProviderCustomConfig"
      endMarker="# END ModelProviderCustomConfig"
      language="py"
    />
  </TabItem>
</Tabs>

## Further resources

### References

The integrations are carried out by the following Weaviate modules. You can refer to their documentation for more details:

- [`text2vec-openai` module](../modules/retriever-vectorizer-modules/text2vec-openai.md)
- [`generative-openai` module](../modules/reader-generator-modules/generative-openai.md)

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. Accordingly, please refer to the following examples, which are model-agnostic:

For data operations (create, update, delete), refer to the [how-to: manage data](../manage-data/index.md) guides.
For search operations, refer to the [how-to: search](../search/index.md) guides.

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
