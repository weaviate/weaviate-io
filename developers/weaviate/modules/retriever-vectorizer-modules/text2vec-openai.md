---
title: text2vec-openai
sidebar_position: 1
image: og/docs/modules/text2vec-openai.jpg
# tags: ['text2vec', 'text2vec-openai', 'openai']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Introduction

The `text2vec-openai` module allows you to use [OpenAI embeddings](https://platform.openai.com/docs/guides/embeddings) in Weaviate to represent data objects. You can use this with OpenAI directly, or with Azure OpenAI endpoints.

:::tip Azure OpenAI or OpenAI?
The instructions below differ slightly depending on whether you are using OpenAI directly or Azure OpenAI. Please make sure that you are following the right instructions for your service provider.
:::

This module allows you to configure Weaviate to obtain OpenAI vector embeddings.

:::note
* This module uses a third-party API and may incur costs.
* Check the vendor pricing (e.g. [OpenAI pricing page](https://openai.com/api/pricing/)) before vectorizing large amounts of data.
* Weaviate automatically parallelizes requests to the API when using the batch endpoint.
* Check out the [text2vec-openai demo](https://github.com/weaviate/DEMO-text2vec-openai).
* You will need an API key from OpenAI or Azure OpenAI to use this module.
:::

## How to configure

### Configuration file (Weaviate open source only)

:::tip Not applicable to WCS
This module is enabled by default on Weaviate Cloud Services, and this section is not applicable.
:::

You can find an example Docker Compose file below.

- This will spin up Weaviate with the OpenAI module.
- You can also optionally specify the required API key in the file.
    - If you do not, you must specify the API key at runtime.

```yaml
---
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:||site.weaviate_version||
    restart: on-failure:0
    ports:
     - "8080:8080"
    environment:
      QUERY_DEFAULTS_LIMIT: 20
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: "./data"
      DEFAULT_VECTORIZER_MODULE: text2vec-openai
      ENABLE_MODULES: text2vec-openai
      OPENAI_APIKEY: sk-foobar  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
      AZURE_APIKEY: sk-foobar  # For use with Azure OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
      CLUSTER_HOSTNAME: 'node1'
...
```

import T2VInferenceYamlNotes from './_components/text2vec.inference.yaml.notes.mdx';

<T2VInferenceYamlNotes apiname="OPENAI_APIKEY"/>

## Schema configuration

You can provide additional module configurations through the schema. You can [learn about schemas here](/developers/weaviate/tutorials/schema.md).

For example, the following schema configuration will set Weaviate to vectorize the `Document` class with `text2vec-openai` using the `ada` model.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "model": "ada",
          "modelVersion": "002",
          "type": "text"
        }
      },
      "properties": [
        {
          "dataType": ["text"],
          "description": "Content that will be vectorized",
          "moduleConfig": {
            "text2vec-openai": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "content"
        }
      ]
    }
  ]
}
```

### Additional configuration with Azure OpenAI

To use `text2vec-openai` with Azure OpenAI, you must specify the parameters `resourceName` and `deploymentId` in the `moduleConfig` section of your schema:

```json
{
  "classes": [
    {
      ...
      "moduleConfig": {
        "text2vec-openai": {
          "resourceName": "<YOUR-RESOURCE-NAME>",
          "deploymentId": "<YOUR-MODEL-NAME>",
        }
      }
    }
  ]
}
```

## How to use

If the API key is not set in the `text2vec-openai` module, you can set the API key at query time.

You can do this by adding to HTTP header:
- `X-OpenAI-Api-Key: <openai-api-key>` for OpenAI, and
- `X-Azure-Api-Key: <azure-api-key>` for Azure OpenAI, and

* Using this module will enable [GraphQL vector search operators](/developers/weaviate/api/graphql/vector-search-parameters.md#neartext).

### Example

import CodeNearText from '/_includes/code/graphql.filters.nearText.openai.mdx';

<CodeNearText />

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

## Additional information

### Available models

OpenAI has multiple models available with different trade-offs. All the models offered by OpenAI can be used within Weaviate. Note that the more dimensions a model produces, the larger your data footprint will be. To estimate the total size of your dataset use [this](/developers/weaviate/concepts/resources.md#an-example-calculation) calculation.

The default model is `text-embedding-ada-002` but you can also specify it in your schema. An example as part of a class definition:

```json
{
  "classes": [
    {
      "class": "Document",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "model": "ada",
          "modelVersion": "002",
          "type": "text"
        }
      }
    }
  ]
}
```

For document embeddings you can choose one of the following models:
* [ada](https://platform.openai.com/docs/models/ada)
* [babbage](https://platform.openai.com/docs/models/babbage)
* [curie](https://platform.openai.com/docs/models/curie)
* [davinci](https://platform.openai.com/docs/models/davinci)

For code embeddings, see the [Codex models](https://platform.openai.com/docs/models/codex).

In the `moduleConfig` inside a class, you need to set two values:

1. `model` – one of the models mentioned above, e.g. `davinci`.
2. `modelVersion` – version string, e.g. `003`.
3. `type` – `text` or `code`.

Example (as part of a class definition):

```json
{
  "classes": [
    {
      "class": "Document",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "model": "ada",
          "modelVersion": "002",
          "type": "text"
        }
      }
    }
  ]
}
```

### OpenAI rate limits

Because you will be getting embeddings based on your own API key, you will be dealing with rate limits applied to your account. If you have a low rate limit set, Weaviate will output the error message generated by the OpenAI API. You can request to increase your rate limit by emailing OpenAI at `support@openai.com` describing your use case with Weaviate.

### Throttle the import inside your application

If you run into rate limits, you can also decide to throttle the import in your application.

E.g., in Python and Java using the Weaviate client.

import CodeOpenAIExample from '/_includes/code/text2vec-openai.example.mdx';

<CodeOpenAIExample />

:::warning TODO
OpenAI's `text-embedding-ada-002` model (legacy Ada, Babbage, Curie, or Davinci models are also supported)
:::

The current rate limit will be displayed in the error message like:

```json
{
  "message": "Rate limit reached for requests. Limit: 600.000000 / min. Current: 1024.000000 / min. Contact support@openai.com if you continue to have issues."
}
```

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
