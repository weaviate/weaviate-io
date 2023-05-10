---
title: text2vec-palm
sidebar_position: 1
image: og/docs/modules/text2vec-palm.jpg
# tags: ['text2vec', 'text2vec-palm', 'palm', 'gcp']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## In short

* This module uses a third-party API and may incur costs.
* Check the vendor pricing (e.g. check Google Vertex AI pricing) before vectorizing large amounts of data.
* Weaviate automatically parallelizes requests to the API when using the batch endpoint.
* Added in Weaviate `v1.19.1`.
* You need an API key for a PaLM API to use this module.
* The default model is `textembedding-gecko-001`.

## Overview

The `text2vec-palm` module enables you to use PaLM embeddings in Weaviate to represent data objects and run semantic (`nearText`) queries.

## Inference API key

:::caution Important: Provide PaLM API key to Weaviate
As the `text2vec-palm` uses a PaLM API endpoint, you must provide a valid PaLM API key to weaviate.
:::

### For Google Cloud users

This is called an `access token` in Google Cloud.

If you have the [Google Cloud CLI tool](https://cloud.google.com/cli) installed and set up, you can view your token by running the following command:

```shell
gcloud auth print-access-token
```

### Providing the key to Weaviate

You can provide your PaLM API key by providing `"X-Palm-Api-Key"` through the request header. If you use the Weaviate client, you can do so like this:

import ClientKey from '/_includes/code/core.client.palm.apikey.mdx';

<ClientKey />

Optionally (not recommended), you can provide the PaLM API key as an environment variable.

<details>
  <summary>How to provide the PaLM API key as an environment variable</summary>

During the **configuration** of your Docker instance, by adding `PALM_APIKEY` under `environment` to your `docker-compose` file, like this:

  ```yaml
  environment:
    PALM_APIKEY: 'your-key-goes-here'  # Setting this parameter is optional; you can also provide the key at runtime.
    ...
  ```

</details>

### Token expiry for Google Cloud users

import GCPTokenExpiryNotes from '/_includes/gcp.token.expiry.notes.mdx';

<GCPTokenExpiryNotes/>

## Module configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Configuration file (Weaviate open source only)

Through the configuration file (e.g. `docker-compose.yaml`), you can:
- enable the `text2vec-palm` module,
- set it as the default vectorizer, and
- provide the API key for it.

Using the following variables:

```
ENABLE_MODULES: 'text2vec-palm,generative-palm'
DEFAULT_VECTORIZER_MODULE: text2vec-palm
PALM_APIKEY: sk-foobar
```

<details>
  <summary>See a full example of a Docker configuration with <code>text2vec-palm</code></summary>

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
      DEFAULT_VECTORIZER_MODULE: text2vec-palm
      ENABLE_MODULES: text2vec-palm
      PALM_APIKEY: sk-foobar  # For use with PaLM. Setting this parameter is optional; you can also provide the key at runtime.
      CLUSTER_HOSTNAME: 'node1'
...
```

</details>

import T2VInferenceYamlNotes from './_components/text2vec.inference.yaml.notes.mdx';

<T2VInferenceYamlNotes apiname="PALM_APIKEY"/>

## Schema configuration

You can provide additional module configurations through the schema. You can [learn about schemas here](/developers/weaviate/tutorials/schema.md).

For `text2vec-palm`, you can set the vectorizer model and vectorizer behavior.

Set the vectorizer model using parameters in the `moduleConfig` section of your schema:

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-palm",
      "moduleConfig": {
        // highlight-start
        "text2vec-palm": {
          "apiEndpoint": "YOUR-API-ENDPOINT",             // Required. Replace with your value.
          "projectID": "YOUR-GOOGLE-CLOUD-PROJECT-ID",    // Required. Replace with your value.
          "modelId": "YOUR-GOOGLE-CLOUD-MODEL-ID",        // Optional. Defaults to `textembedding-gecko-001`.
        },
        // highlight-end
      },
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
      "vectorizer": "text2vec-palm",
      "moduleConfig": {
        "text2vec-palm": {
          "apiEndpoint": "YOUR-API-ENDPOINT",           // Required. Replace with your value.
          "projectID": "YOUR-GOOGLE-CLOUD-PROJECT-ID",  // Required. Replace with your value.
          "modelId": "YOUR-GOOGLE-CLOUD-MODEL-ID",      // Optional. Defaults to `textembedding-gecko-001`.
        },
      },
      "properties": [
        {
          "dataType": ["text"],
          "description": "Content that will be vectorized",
          "moduleConfig": {
            // highlight-start
            "text2vec-palm": {
              "skip": false,
              "vectorizePropertyName": false
            },
            // highlight-end
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

### Example

import CodeNearText from '/_includes/code/graphql.filters.nearText.palm.mdx';

<CodeNearText />

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

## Additional information

### Available model

You can specify the model as a part of the schema as shown below.

```json
{
  "classes": [
    {
      "class": "Document",
      "vectorizer": "text2vec-palm",
      "moduleConfig": {
        "text2vec-palm": {
          "apiEndpoint": "YOUR-API-ENDPOINT",           // Required. Replace with your value.
          "projectID": "YOUR-GOOGLE-CLOUD-PROJECT-ID",  // Required. Replace with your value.
          "modelId": "textembedding-gecko-001",         // Optional. Defaults to `textembedding-gecko-001`.
        },
      }
    }
  ]
}
```

Currently, the only available model is `textembedding-gecko-001`.

The `textembedding-gecko-001` accepts a maximum of 3,072 input tokens, and outputs 768-dimensional vector embeddings.

### Rate limits

Since you will obtain embeddings using your own API key, any corresponding rate limits related to your account will apply to your use with Weaviate also.

If you exceed your rate limit, Weaviate will output the error message generated by the PaLM API. If this persists, we suggest requesting to increase your rate limit by contacting [Vertex AI support](https://cloud.google.com/vertex-ai/docs/support/getting-support) describing your use case with Weaviate.

### Throttle the import inside your application

One way of dealing with rate limits is to throttle the import within your application. For example, when using the Weaviate client:

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<CodeThrottlingExample />

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
