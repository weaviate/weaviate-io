---
title: text2vec-openai
sidebar_position: 1
image: og/docs/modules/text2vec-openai.jpg
# tags: ['text2vec', 'text2vec-openai', 'openai']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## In short

* This module uses a third-party API and may incur costs.
* Check the vendor pricing (e.g. [OpenAI pricing page](https://openai.com/api/pricing/)) before vectorizing large amounts of data.
* Weaviate automatically parallelizes requests to the API when using the batch endpoint.
* Check out the [text2vec-openai demo](https://github.com/weaviate/DEMO-text2vec-openai).
* You will need an API key from OpenAI or Azure OpenAI to use this module.
* The default OpenAI model is `text-embedding-ada-002`.

## Overview

The `text2vec-openai` module enables you to use [OpenAI](https://platform.openai.com/docs/guides/embeddings) in Weaviate or [Azure](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/concepts/understand-embeddings) embeddings to represent data objects.

import OpenAIOrAzureOpenAI from '/_includes/openai.or.azure.openai.mdx';

<OpenAIOrAzureOpenAI/>

## Module configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Configuration file (Weaviate open source only)

You can enable the `text2vec-openai` module in your configuration file (e.g. `docker-compose.yaml`).

- This configuration will start Weaviate with the OpenAI module enabled, and set as the default vectorizer module.
- Optionally, you can specify the required API key in the file..
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

For `text2vec-openai`, you can set the vectorizer model and vectorizer behavior.

### OpenAI settings

Set the vectorizer model using parameters `model`, `modelVersion` and `type` in the `moduleConfig` section of your schema:

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
    }
  ]
}
```

### Azure OpenAI settings

Set the parameters `resourceName` and `deploymentId` in the `moduleConfig` section of your schema:

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-openai",
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

### Vectorizer behavior

Set property-level vectorizer behavior using the `moduleConfig` section under each property:

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

## Usage

Enabling this module will make [GraphQL vector search operators](/developers/weaviate/api/graphql/vector-search-parameters.md#neartext) available.

### Provide the API key

If the API key is not set in the `text2vec-openai` configuration, you can supply it when making a query.

You can achieve this by adding the appropriate key to the HTTP header:
- `X-OpenAI-Api-Key: YOUR-OPENAI-API-KEY` for OpenAI, and
- `X-Azure-Api-Key: YOUR-AZURE-API-KEY` for Azure OpenAI, and

### Example

import CodeNearText from '/_includes/code/graphql.filters.nearText.openai.mdx';

<CodeNearText />

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

## Additional information

### Available models (OpenAI)

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

For document embeddings, choose from the following models:
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

Since you will obtain embeddings using your own API key, any corresponding rate limits related to your account will apply to your use with Weaviate also.

If you exceed your rate limit, Weaviate will output the error message generated by the OpenAI API. You can request to increase your rate limit by emailing OpenAI at `support@openai.com` describing your use case with Weaviate.

### Throttle the import inside your application

One way of dealing with rate limits is to throttle the import within your application. For example, when using the Weaviate client in Python or Java:

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<CodeThrottlingExample />

The current rate limit will appear in the error message, as shown below:

```json
{
  "message": "Rate limit reached for requests. Limit: 600.000000 / min. Current: 1024.000000 / min. Contact support@openai.com if you continue to have issues."
}
```

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
