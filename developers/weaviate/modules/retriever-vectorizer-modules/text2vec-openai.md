---
title: text2vec-openai
sidebar_position: 12
image: og/docs/modules/text2vec-openai.jpg
# tags: ['text2vec', 'text2vec-openai', 'openai']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

The `text2vec-openai` enables Weaviate to obtain vectors using
- [OpenAI](https://platform.openai.com/docs/guides/embeddings) or
- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/concepts/understand-embeddings)

As it uses a third-party API, you will need an API key.

**Its usage may incur costs**. Please check the vendor pricing (e.g. [OpenAI pricing page](https://openai.com/api/pricing/)), especially before vectorizing large amounts of data.

This module is available on Weaviate Cloud Services (WCS).

Enabling this module will enable the [`NearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).

import OpenAIOrAzureOpenAI from '/_includes/openai.or.azure.openai.mdx';

<OpenAIOrAzureOpenAI/>

## Module configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Configuration file

To use `text2vec-openai`, you must enable it in your configuration file (e.g. `docker-compose.yaml`).

You can do so manually, or by using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

<details>
  <summary>
    Example configuration
  </summary>

- This configuration will start Weaviate with the OpenAI module enabled, and set as the default vectorizer module.
- Optionally, you can specify the required API key in the file.
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


</details>


## Schema configuration

You can provide additional configurations through the [Weaviate schema](/developers/weaviate/configuration/schema-configuration.md), such as:

- the vectorizer model (set at the class level), and
- vectorizer behavior (set at the property level)

### Class-level settings (OpenAI)

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

### Class-level settings (Azure OpenAI)

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

### Property-level settings

You can set property-level vectorizer behavior using the `moduleConfig` section under each property:

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

### Provide the API key

You can supply the API key at query time by adding it to the HTTP header:
- `"X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"` for OpenAI, and
- `"X-Azure-Api-Key": "YOUR-AZURE-API-KEY"` for Azure OpenAI, and

### Example

import CodeNearText from '/_includes/code/graphql.filters.nearText.openai.mdx';

<CodeNearText />

## Additional information

### Available models (OpenAI)

All OpenAI models can be used with Weaviate. The default model is `text-embedding-ada-002` but you can also specify it in your schema by:

Setting the following values in the `moduleConfig` at the class level:

1. `model` – one of the models mentioned above, e.g. `davinci`.
2. `modelVersion` – version string, e.g. `003`.
3. `type` – `text` or `code`.

#### Example

The following sets the `Document` class to use the `ada` model, version `002`, for text embeddings:

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

:::note Model size vs resource requirements
The more dimensions a model produces, the larger your data footprint will be. You can estimate the total size of your dataset [here](/developers/weaviate/concepts/resources.md#an-example-calculation).
:::

### OpenAI rate limits

Since `text2vec-openai` use your API key, your account's corresponding rate limits will also apply to the module. Weaviate will output any rate-limit related error messages generated by the OpenAI API.

You can request to increase your rate limit by emailing OpenAI at `support@openai.com` describing your use case with Weaviate.

The current rate limit will appear in the error message, as shown below:

```json
{
  "message": "Rate limit reached for requests. Limit: 600.000000 / min. Current: 1024.000000 / min. Contact support@openai.com if you continue to have issues."
}
```

### Import throttling

As one solution, you could throttle the import within your application.

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<details>
  <summary>See code example</summary>

<CodeThrottlingExample />

</details>



## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
