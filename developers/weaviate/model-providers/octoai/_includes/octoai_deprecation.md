:::warning Deprecated integrations

### OctoAI integrations are deprecated

OctoAI announced that they are winding down the commercial availability of its services by **31 October 2024**.
<br/>

Accordingly, the Weaviate OctoAI integrations are deprecated. They have been removed from the Weaviate codebase from `v1.25.22`, `v1.26.8` and `v1.27.1`.
<br/>

If you have a collection that is using an OctoAI integration, you should migrate to a new collection with [another model provider](../../index.md).
<br/>

First, select a model provider integration that you want to migrate to.
<br/>

#### Suitable model providers: Embedding models

While migrating your data, you can choose to re-use the existing embeddings or choose a new model.
<br/>

- **Re-using the existing embeddings** will save on time and inference costs.
- **Choosing a new model** will allow you to explore new models and potentially improve the performance of your application.

If you would like to re-use the existing embeddings, you must select a model provider that offers the same embedding model.
<br/>

OctoAI provided `thenlper/gte-large` as the embedding model. This model is also available through the [Hugging Face API](../../huggingface/embeddings.md), and through the [locally hosted Transformers](../../transformers/embeddings.md) integration.
<br/>

You can also select a new model with any embedding model provider. This will require you to re-generate the embeddings for your data, as the existing embeddings will not be compatible with the new model.
<br/>

#### Suitable model providers: Generative AI models

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
