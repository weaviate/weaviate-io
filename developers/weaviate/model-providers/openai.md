---
title: OpenAI
sidebar_position: 50
image: og/docs/tutorials.jpg
# tags: ['getting started']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!./_includes/openai_endtoend.py';

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

## Advanced usage

### Available models (OpenAI)

The following [embedding models](https://platform.openai.com/docs/models/embeddings) are supported:
* text-embedding-3
    * Available dimensions:
        * `text-embedding-3-large`: `256`, `1024`, `3072` (default)
        * `text-embedding-3-small`: `512`, `1536` (default)
* ada
* babbage
* davinci

#### Deprecated models

[Source](https://platform.openai.com/docs/deprecations)

* Codex
* babbage-001
* davinci-001
* curie

