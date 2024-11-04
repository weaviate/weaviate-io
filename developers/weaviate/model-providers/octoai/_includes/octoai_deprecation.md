:::warning Deprecated integrations

### OctoAI integrations are deprecated

<!-- They have been removed from the Weaviate codebase from `v1.25.22`, `v1.26.8` and `v1.27.1`. -->

OctoAI announced that they are winding down the commercial availability of its services by **31 October 2024**. Accordingly, the Weaviate OctoAI integrations are deprecated. Do not use these integrations for new projects.
<br/>

If you have a collection that is using an OctoAI integration, consider your options depending on whether you are using OctoAI's embedding models ([your options](#for-collections-with-octoai-embedding-integrations)) or generative models ([your options](#for-collections-with-octoai-generative-ai-integrations)).

#### For collections with OctoAI embedding integrations

OctoAI provided `thenlper/gte-large` as the embedding model. This model is also available through the [Hugging Face API](../../huggingface/embeddings.md).
<!-- , and through the [locally hosted Transformers](../../transformers/embeddings.md) integration. -->
<br/>

After the shutdown date, this model will no longer be available through OctoAI. If you are using this integration, you have the following options:
<br/>

**Option 1: Use the existing collection, and provide your own vectors**
<br/>

You can continue to use the existing collection, provided that you rely on some other method to generate the required embeddings yourself for any new data, and for queries. If you are unfamiliar with the "bring your own vectors" approach, [refer to this starter guide](../../../starter-guides/custom-vectors.mdx).
<br/>

**Option 2: Migrate to a new collection with another model provider**

Alternatively, you can migrate your data to a new collection ([read how](#how-to-migrate)). At this point, you can re-use the existing embeddings or choose a new model.
<br/>

- **Re-using the existing embeddings** will save on time and inference costs.
- **Choosing a new model** will allow you to explore new models and potentially improve the performance of your application.

If you would like to re-use the existing embeddings, you must select a model provider (e.g. [Hugging Face API](../../huggingface/embeddings.md)) that offers the same embedding model.
<br/>

You can also select a new model with any embedding model provider. This will require you to re-generate the embeddings for your data, as the existing embeddings will not be compatible with the new model.
<br/>

#### For collections with OctoAI generative AI integrations

If you are only using the generative AI integration, you do not need to migrate your data to a new collection.
<br/>

Follow [this how-to](/developers/weaviate/manage-data/collections#update-the-generative-model-integration) to re-configure your collection with a new generative AI model provider. Note this requires Weaviate `v1.25.23`, `v1.26.8`, `v1.27.1`, or later.
<br/>

You can select any model provider that offers generative AI models.
<br/>

If you would like to continue to use the same model that you used with OctoAI, providers such as [Anyscale](../../anyscale/generative.md), [FriendliAI](../../friendliai/generative.md), [Mistral](../../mistral/generative.md) or local models with [Ollama](../../ollama/generative.md) each offer some of the suite of models that OctoAI provided.
<br/>

#### How to migrate

An outline of the migration process is as follows:
<br/>

- Create a new collection with the desired model provider integration(s).
- Export the data from the existing collection.
    - (Optional) To re-use the existing embeddings, export the data with the existing embeddings.
- Import the data into the new collection.
    - (Optional) To re-use the existing embeddings, import the data with the existing embeddings.
- Update your application to use the new collection.
<br/>

See [How-to manage data: migrate data](../../../manage-data/migrate.mdx) for examples on migrating data objects between collections.

:::
