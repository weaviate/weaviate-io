---
title: text2vec-openai
sidebar_position: 13
image: og/docs/modules/text2vec-openai.jpg
# tags: ['text2vec', 'text2vec-openai', 'openai']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

Weaviate uses the `text2vec-openai` module to obtain vectors.
- [OpenAI](https://platform.openai.com/docs/guides/embeddings)
- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/concepts/understand-embeddings)

Key notes:

- As it uses a third-party API, you will need an API key.
- **Its usage may incur costs**.
    - Please check the vendor pricing (e.g. [OpenAI pricing page](https://openai.com/api/pricing/)), especially before vectorizing large amounts of data.
- This module is available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- The default model is `text-embedding-ada-002`.

import OpenAIOrAzureOpenAI from '/_includes/openai.or.azure.openai.mdx';

<OpenAIOrAzureOpenAI/>

## Weaviate instance configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Docker Compose file

To use `text2vec-openai`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

|Parameter|Required|Purpose|
|:-|:-|:-|
|`ENABLE_MODULES`|Required|The modules to enable. Include `text2vec-openai` to enable the module.|
|`DEFAULT_VECTORIZER_MODULE|Optional|The default vectorizer module. You can set this to `text2vec-openai` to make it the default for all classes.|
|`OPENAI_APIKEY`|Optional|Your OpenAI API key (if using OpenAI). You can also provide the key at query time.|
|`AZURE_APIKEY`|Optional|Your Azure OpenAI API key (if using Azure OpenAI). You can also provide the key at query time.|

#### Example

This configuration enables `text2vec-openai`, sets it as the default vectorizer, and sets the API keys.

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
      # highlight-start
      ENABLE_MODULES: text2vec-openai
      DEFAULT_VECTORIZER_MODULE: text2vec-openai
      OPENAI_APIKEY: sk-foobar  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at query time.
      OPENAI_ORGANIZATION: your-orgname  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
      AZURE_APIKEY: sk-foobar  # For use with Azure OpenAI. Setting this parameter is optional; you can also provide the key at query time.
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
...
```

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/configuration/schema-configuration.md).

### API settings (OpenAI)

#### Parameters

|Parameter|Required|Default|Purpose|
|:-|:-|:-|:-|
|`model`|Optional|`text-embedding-ada-002`|A model family, e.g. `davinci`.|
|`modelVersion`|Optional||Version string, e.g. `003`.|
|`type`|Optional||Model type. Can be `text` or `code`.|
|`baseURL`|Optional|`https://api.openai.com`|Sets a proxy or other URL instead of the default OpenAI URL.<BR />&nbsp;<BR /> To specify the URL, use protocol domain format: `https://your.domain.com`.|
#### Example

The following example configures the `Document` class by setting the vectorizer to `text2vec-openai`, model to `ada`, the model version to `002` and the type to `text`:

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      // highlight-start
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "model": "ada",
          "modelVersion": "002",
          "type": "text"
          "baseURL": "https://proxy.yourCompanyDomain.com"
        }
      },
      // highlight-end
    }
  ]
}
```

### API settings (Azure OpenAI)

#### Parameters

|Parameter||Purpose|
|:-|:-|
|`resourceName`|Azure resource name|
|`deploymentId`|Azure deployment ID (your model name)|

#### Example

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      // highlight-start
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "resourceName": "<YOUR-RESOURCE-NAME>",
          "deploymentId": "<YOUR-MODEL-NAME>",
        }
      }
      // highlight-end
    }
  ]
}
```

### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each class and property:

#### Class-level

|Parameter|Default|Purpose|
|:-|:-|:-|
|`vectorizer`|| Use this module to vectorize the data.|
|`vectorizeClassName`| `true`| When `true`, vectorizes the class name.

#### Property-level

|Parameter|Default|Purpose|
|:-|:-|:-|
|`skip`|`false`|When `true`, does not vectorize the property.|
|`vectorizePropertyName`|`true`|When `true`, vectorizes the property name.

#### Example

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
          "type": "text",
          // highlight-start
          "vectorizeClassName": false
          // highlight-end
        }
      },
      "properties": [
        {
          "name": "content",
          "dataType": ["text"],
          "description": "Content that will be vectorized",
          // highlight-start
          "moduleConfig": {
            "text2vec-openai": {
              "skip": false,
              "vectorizePropertyName": false
            }
          }
          // highlight-end
        }
      ]
    }
  ]
}
```

## Query-time parameters

### API key

You can supply the API key at query time by adding it to the HTTP header.

|HTTP Header|Value|Purpose|
|:-|:-|:-|
|`"X-OpenAI-Api-Key"|"YOUR-OPENAI-API-KEY"`|OpenAI key|
|`"X-Azure-Api-Key"|"YOUR-AZURE-API-KEY"`|Azure OpenAI key|

### Organization name

:::info Available from version `v1.21.1`
:::

For requests that require the OpenAI organization name, you can provide it at query time by adding it to the HTTP header:
- `"X-OpenAI-Organization": "YOUR-OPENAI-ORGANIZATION"` for OpenAI

## Additional information

### Available models (OpenAI)

You can use any OpenAI embedding model with `text2vec-openai`.

For document embeddings, choose from the following models:
* [ada](https://platform.openai.com/docs/models/ada)
* [babbage](https://platform.openai.com/docs/models/babbage)
* [curie](https://platform.openai.com/docs/models/curie)
* [davinci](https://platform.openai.com/docs/models/davinci)

For code embeddings, see the [Codex models](https://platform.openai.com/docs/models/codex).

:::note Model size vs resource requirements
The more dimensions a model produces, the larger your data footprint will be. You can estimate the total size of your dataset [here](/developers/weaviate/concepts/resources.md#an-example-calculation).
:::

### API rate limits

Since this module uses your API key, your account's corresponding rate limits will also apply to the module. Weaviate will output any rate-limit related error messages generated by the API.

You can request to increase your rate limit by emailing OpenAI at `support@openai.com` describing your use case with Weaviate.

The current rate limit will appear in the error message, as shown below:

```json
{
  "message": "Rate limit reached for requests. Limit: 600.000000 / min. Current: 1024.000000 / min. Contact support@openai.com if you continue to have issues."
}
```

### Import throttling

One potential solution to rate limiting would be to throttle the import within your application. We include an example below.

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<details>
  <summary>See code example</summary>

<CodeThrottlingExample />

</details>

## Usage example

This is an example of a `nearText` query with `text2vec-openai`.

import CodeNearText from '/_includes/code/graphql.filters.nearText.openai.mdx';

<CodeNearText />

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
