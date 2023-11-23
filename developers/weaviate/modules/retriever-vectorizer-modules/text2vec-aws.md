---
title: text2vec-aws
sidebar_position: 10
image: og/docs/modules/text2vec-aws.jpg
# tags: ['text2vec', 'text2vec-aws', 'aws']
---


## Overview

The `text2vec-aws` module enables Weaviate to obtain vectors using [AWS Bedrock](https://aws.amazon.com/bedrock/).

Key notes:

- **Your AWS access key credentials must be set as environment variables**.
- **You must set an available & supported model**.
    - There is no default model set for this module.
    - You must [request access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) to the desired modules from AWS Bedrock so it becomes available in your account.
    - Then, set an available model in your class configuration.
    - Not all AWS Bedrock models are supported. See the [Supported models](#supported-models) section for more information.
- **Its usage may incur costs**.
    - Please check the AWS Bedrock [pricing page](https://aws.amazon.com/bedrock/pricing/), especially before vectorizing large amounts of data.
- This module is available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- Set the appropriate [distance metric](#distance-metric) in your class configuration, depending on the model used.

## Weaviate instance configuration

:::info Not applicable to WCS
This module is not available on Weaviate Cloud Services.
:::

### Docker Compose file

To use `text2vec-aws`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `text2vec-aws` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `text2vec-aws` to make it the default for all classes.
- `AWS_ACCESS_KEY` or `AWS_ACCESS_KEY_ID` (One required): Your AWS access key.
- `AWS_SECRET_KEY` or `AWS_SECRET_ACCESS_KEY` (One required): Your AWS secret access key.

:::info Supported authentication methods
Currently, only [access key based credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) are supported.
:::

#### Example

This configuration enables `text2vec-aws`, sets it as the default vectorizer, and sets the AWS authentication credentials.

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
      ENABLE_MODULES: text2vec-aws
      DEFAULT_VECTORIZER_MODULE: text2vec-aws
      AWS_ACCESS_KEY: sk-foobar  # MUST set this parameter or AWS_ACCESS_KEY_ID.
      AWS_SECRET_KEY: sk-foobar  # MUST set this parameter or AWS_SECRET_ACCESS_KEY.
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
...
```


## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/configuration/schema-configuration.md).

### API settings

#### Parameters

| Parameter | Required | Default | Purpose |
| :- | :- | :- | :- |
| `model` | No | NONE | The model to use. You must provide an available & supported model name. |
| `region` | Yes | NONE | AWS region name, e.g. `us-east-1`. |

#### Example

The following example configures the `Document` class by setting the vectorizer to `text2vec-aws`, distance metric to `cosine`, model to `amazon.titan-embed-text-v1` and the AWS region to `us-east-1`.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      // highlight-start
      "vectorizer": "text2vec-aws",
      "vectorIndexConfig": {
        "distance": "cosine"
      },
      "moduleConfig": {
        "text2vec-aws": {
          "model": "amazon.titan-embed-text-v1",    // REQUIRED
          "region": "us-east-1"                     // REQUIRED
        }
      },
      // highlight-end
    }
  ]
}
```

### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each class and property:

#### Class-level

- `vectorizer` - what module to use to vectorize the data.
- `vectorizeClassName` – whether to vectorize the class name. Default: `true`.

#### Property-level

- `skip` – whether to skip vectorizing the property altogether. Default: `false`
- `vectorizePropertyName` – whether to vectorize the property name. Default: `false`

#### Example

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-aws",
      "vectorIndexConfig": {
        "distance": "cosine"
      },
      "moduleConfig": {
        "text2vec-aws": {
          "model": "amazon.titan-embed-text-v1",    // REQUIRED
          "region": "us-east-1"                     // REQUIRED
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
            "text2vec-aws": {
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

There are no query-time parameters to be provided. Note that the API credentials must be set as environment variables.

## Additional information

### Supported models

You can use any of the following models with `text2vec-aws`:

- `amazon.titan-embed-text-v1`
- `cohere.embed-english-v3`
- `cohere.embed-multilingual-v3`

### Distance metric

You can change the distance metric used for vector searches. In most cases, you can start with `cosine` distances. You can see a list of supported distance metrics [here](../../config-refs/distances.md).

Consult the documentation of the model you are using to see which distance metrics are appropriate.

### API rate limits

Since this module uses your credentials, any API limits relevant to your account will also apply to the module. Weaviate will output any rate-limit related error messages generated by the API.

### Import throttling

One potential solution to rate limiting would be to throttle the import within your application. We include an example below.

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<details>
  <summary>See code example</summary>

<CodeThrottlingExample />

</details>


## Usage example

This is an example of a `nearText` query with `text2vec-aws`.

import GraphQLFiltersNearNextAWS from '/_includes/code/graphql.filters.nearText.aws.mdx';

<GraphQLFiltersNearNextAWS/>


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
