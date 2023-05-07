---
title: text2vec-palm
sidebar_position: 1
image: og/docs/modules/text2vec-palm.jpg
# tags: ['text2vec', 'text2vec-palm', 'palm', 'gcp']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

The `text2vec-palm` module enables you to use PaLM embeddings in Weaviate to represent data objects.

:::note
* This module uses a third-party API and may incur costs.
* Check the vendor pricing (e.g. [GCP pricing page](TODO-INSERT LINK)) before vectorizing large amounts of data.
* Weaviate automatically parallelizes requests to the API when using the batch endpoint.
* You will need an API key (also called `authentication token` by GCP) from GCP to use this module.
* The default PaLM model is `textembedding-gecko-001`.
* This can be used with either publicly available API endpoints or custom GCP endpoints.
:::

## Module configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Configuration file (Weaviate open source only)

You can enable the `text2vec-palm` module in your configuration file (e.g. `docker-compose.yaml`).

- This configuration will start Weaviate with the PaLM module enabled, and set as the default vectorizer module.
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
      DEFAULT_VECTORIZER_MODULE: text2vec-palm
      ENABLE_MODULES: text2vec-palm
      PALM_APIKEY: sk-foobar  # For use with PaLM. Setting this parameter is optional; you can also provide the key at runtime.
      CLUSTER_HOSTNAME: 'node1'
...
```

import T2VInferenceYamlNotes from './_components/text2vec.inference.yaml.notes.mdx';

<T2VInferenceYamlNotes apiname="PALM_APIKEY"/>

## Schema configuration

You can provide additional module configurations through the schema. You can [learn about schemas here](/developers/weaviate/tutorials/schema.md).

For `text2vec-palm`, you can set the vectorizer model and vectorizer behavior.

Set the vectorizer model using parameters (TODO-confirm parameter names) in the `moduleConfig` section of your schema:

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-palm",
      "moduleConfig": {
        "text2vec-palm": {
          "???": "???"
        }
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
          "???": "???"  // TODO-copy from above once confirmed
        }
      },
      "properties": [
        {
          "dataType": ["text"],
          "description": "Content that will be vectorized",
          "moduleConfig": {
            "text2vec-palm": {
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

If the PaLM API key is not set in the `text2vec-palm` configuration, you can supply it when making a query.

You can achieve this by adding the key to the HTTP header as `X-Palm-Api-Key: <palm-api-key>`.

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
          "???": "???"  // TODO-copy from above once confirmed
        }
      }
    }
  ]
}
```

Currently, the only available model is `textembedding-gecko-001`.

The `textembedding-gecko-001` accepts a maximum of 3,072 input tokens, and and outputs 768-dimensional vector embeddings.

### Rate limits

Since you will obtain embeddings using your own API key, corresponding rate limits related to your account will apply. If you exceed your rate limit, Weaviate will output the error message generated by the PaLM API. If this persists, we suggest requesting to increase your rate limit by contacting [Vertex AI support](https://cloud.google.com/vertex-ai/docs/support/getting-support) describing your use case with Weaviate.

### Throttle the import inside your application

One way of dealing with rate limits is to throttle the import within your application. For example, when using the Weaviate client:

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<CodeThrottlingExample />

The current rate limit will appear in the error message, as shown below:

```json
{
  "message": "Rate limit reached for requests. Limit: 600.000000 / min. Current: 1024.000000 / min. Contact support if you continue to have issues."
}
```

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
