---
title: text2vec-aws
sidebar_position: 10
image: og/docs/modules/text2vec-aws.jpg
# tags: ['text2vec', 'text2vec-aws', 'aws']
---

:::info Added in `v1.22.5`
Starting in v1.22.5, [AWS Bedrock](https://aws.amazon.com/bedrock/) is supported.
:::

:::info Added in `v1.24`
Starting in v1.24.1, [AWS Sagemaker](https://aws.amazon.com/sagemaker/) is supported.
:::

The `text2vec-aws` module allows Weaviate to access [AWS Bedrock](https://aws.amazon.com/bedrock/) and [AWS Sagemaker](https://aws.amazon.com/sagemaker/) services.

If you need to run your own embedding service, use `Sagemaker`. `Bedrock` uses AWS models.

## Considerations

- This module is available on Weaviate Cloud Services (WCS).
- `Bedrock` and `Sagemaker` are third party APIs. You must provide AWS API credentials.
- `Bedrock` requires a model.
    - There is no default `Bedrock` model set for this module.
    - You must [request access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) from AWS Bedrock to make models available in your account.
    - Not all AWS Bedrock models are supported. See [Supported models](#supported-models).
    - If you set `"service": "bedrock"``, set a model as well. For example, `"model": "amazon.titan-embed-text-v1"`
    - Set a [distance metric](#distance-metric) in your class configuration that corresponds to the model you use.
- These APIs may incur costs. Before vectorizing large amounts of data, check the pricing pages.
    - [AWS Bedrock pricing](https://aws.amazon.com/bedrock/pricing/)
    - [AWS Sagemaker](https://aws.amazon.com/sagemaker/pricing/)
- Enabling this module enables the [`nearText`](/developers/weaviate/api/graphql/search-operators.md#neartext) search operator.


import ModuleParameterPrecedenceNote from '/_includes/module-parameter-precedence-note.mdx';

<ModuleParameterPrecedenceNote />

### API Authentication

You must provide [access key based AWS credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to use the API, including an AWS access key and a corresponding AWS secret access key. You can [set them as environment variables](#parameters), or [provide them at query time](#query-time-parameters).

## Weaviate instance configuration

### Docker Compose file

To use `text2vec-aws`, enable it in your Docker Compose file (`docker-compose.yml`).

#### Parameters

| Parameter | Type | Optional | Default | Description |
| :-- | :-- | :-- | :-- | :-- |
| `AWS_ACCESS_KEY` | string | yes | none | Your AWS access key. An alternative for `AWS_ACCESS_KEY_ID`. |
| `AWS_ACCESS_KEY_ID` | string | yes | none | Your AWS access key. An alternative for `AWS_ACCESS_KEY`. |
| `AWS_SECRET_KEY` | string | yes | none | Your AWS secret access key. An alternative for `AWS_SECRET_ACCESS_KEY`. |
| `AWS_SECRET_ACCESS_KEY` | string | yes | none |Your AWS secret access key. An alternative for `AWS_SECRET_KEY`. |
| `DEFAULT_VECTORIZER_MODULE` | string | yes | none | The default vectorizer module. To make `text2vec-aws` the default vectorizer, set this parameter to `text2vec-aws`.
|`ENABLE_MODULES` | string | no | none | Set `text2vec-aws` to enable the module.
|`SERVICE` | string | yes | `bedrock` | Must be `bedrock` or `sagemaker`.

#### Example

This configuration does the following:

- Enables the `text2vec-aws` vectorizer
- Sets `text2vec-aws` as the default vectorizer
- Sets AWS authentication credentials

```yaml
---
version: '3.4'
services:
  weaviate:
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    restart: on-failure:0
    ports:
     - 8080:8080
     - 50051:50051
    environment:
      QUERY_DEFAULTS_LIMIT: 20
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: "./data"
      # highlight-start
      ENABLE_MODULES: text2vec-aws
      DEFAULT_VECTORIZER_MODULE: text2vec-aws
      AWS_ACCESS_KEY: sk-foobar  # Optional. Can be set at query time.
      AWS_SECRET_KEY: sk-foobar  # Optional. Can be set at query time.
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
...
```

## Class configuration

To configure module behavior for a collection, set collection level values in the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### API settings

#### Parameters

| Parameter | Required | Default | Purpose |
| :- | :- | :- | :- |
| `model` | No | NONE | The model to use with `Bedrock`. See [supported models](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-aws.md#supported-models). |
| `region` | Yes | NONE | AWS region name. For example, `us-east-1`. |

#### Example

The following example configures the `Document` class to set the following parameters:

- vectorizer: `text2vec-aws`
- distance metric: `cosine`
- service: `"sagemaker"`
- endpoint: AWS provides this value when you configure `sagemaker`
- AWS region: `us-east-1`

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
          "model": "amazon.titan-embed-text-v1",   // REQUIRED
          "region": "us-east-1"                    // REQUIRED
        }
      },
      // highlight-end
    }
  ]
}
```

### Vectorizer settings

To configure vectorization for collections and properties, use the `moduleConfig` section in the collection definition.

| Setting | Level | Default | Description |
| :-- | :-- | :-- | :-- |
| `vectorizer` | collection | none | The module that vectorizes the data. |
| `vectorizeClassName`| collection | `true` | When `true`, vectorize the class name. |
|`skip` | property | `false` | When `true`, does not vectorize the property. |
| `vectorizePropertyName` | property | `false` | When `true`, does not vectorize the property name. |

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

To supply parameters at query time, adding them to the HTTP header.

| HTTP Header | Value | Purpose |
| :- | :- | :- |
| `"X-AWS-Access-Key"` | `"YOUR-AWS-API-ACCESS-KEY"` | Your AWS access key. |
| `"X-AWS-Secret-Key"` | `"YOUR-AWS-API-SECRET-KEY"` | Your AWS secret access key |

## Additional information

### Supported models

`text2vec-aws` supports these models:

- `amazon.titan-embed-text-v1`
- `cohere.embed-english-v3`
- `cohere.embed-multilingual-v3`

### Distance metric

You can change the distance metric used for vector searches. `cosine` distance is a good starting point. For supported distance metrics, see [Distance metrics](../../config-refs/distances.md).

Consult the documentation of the model you are using to see which distance metrics are appropriate.

### API rate limits

This module uses your AWS credentials. API limits that restrict your AWS account also apply to the module. When the API returns a rate limited error, Weaviate returns an error message.

### Import throttling

If your API access is rate limited, consider throttling imports within your application.

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
