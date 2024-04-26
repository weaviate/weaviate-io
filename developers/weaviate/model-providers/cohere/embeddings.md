---
title: Embeddings
sidebar_position: 50
image: og/docs/tutorials.jpg
# tags: ['getting started']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!../_includes/collection_config_vectorizer.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/manage-data.collections-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/manage-data.collections.ts';
import TSCodeLegacy from '!!raw-loader!/_includes/code/howto/manage-data.collections-v2.ts';

# Cohere Embeddings with Weaviate

Weaviate integrates with Cohere's embeddings API to provide convenient access to their models for Weaviate users.

See the [Cohere integrations page](./index.md#requirements) for a list of requirements to use Cohere with Weaviate.

## Configuration

You can configure Weaviate to use Cohere embeddings for each index in a collection.

This will configure Weaviate to generate embeddings for text objects at import time, and convert text queries into embeddings for search operations, with the specified Cohere model.

![Embedding integration illustration](../_includes/integration_cohere_embedding.png)

### Example

:::warning TODO
Fix TS code examples
:::

To configure a collection to use Cohere embeddings, set it as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START VectorizerCohere"
      endMarker="# END VectorizerCohere"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START Vectorizer"
      endMarker="// END Vectorizer"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// START Vectorizer"
      endMarker="// END Vectorizer"
      language="ts"
    />
  </TabItem>

</Tabs>

### Available models

The following Cohere models are available for use with Weaviate:

- `embed-multilingual-v3.0` (Default)
- `embed-multilingual-light-v3.0`
- `embed-multilingual-v2.0` (previously `embed-multilingual-22-12`)
- `embed-english-v3.0`
- `embed-english-light-v3.0`
- `embed-english-v2.0`
- `embed-english-light-v2.0`

<details>
  <summary>
    Deprecated models
  </summary>

The following models are available, but deprecated:
- `multilingual-22-12`
- `large`
- `medium`
- `small`

</details>

## API key

As with any external API, you will need to provide your Cohere API key to Weaviate to use the Cohere embeddings. You can provide the API key to Weaviate in one of two ways:

- Set the `COHERE_API_KEY` environment variable that is available to Weaviate.
- Provide the API key at runtime, as shown in the examples below.

:::warning
Show the same example on the parent page
:::

:::warning TODO
Fix code examples
:::

## Data import

Where the index is configured with Cohere embeddings, Weaviate will generate embeddings for text objects with the Cohere API. Note: if a vector is manually provided, it will be used instead.

:::warning TODO
Fix code examples
:::

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

## Searches

On these indexes, any text queries will be converted into embeddings using the configured Cohere model. This applies to `near text` searches, as well as hybrid searches.

:::warning TODO
Fix code examples
:::

## Further resources

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. Accordingly, please refer to the following examples, which are model-agnostic:

For data operations (create, update, delete), refer to the [how-to: manage data](../manage-data/index.md) guides.
For search operations, refer to the [how-to: search](../search/index.md) guides.

### References

- Cohere [Embed API documentation](https://docs.cohere.com/reference/embed)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
