---
title: Question Answering - OpenAI
sidebar_position: 21
image: og/docs/modules/qna-openai.jpg
# tags: ['qna', 'qna-openai', 'transformers', 'openai']
---


## In short

* The OpenAI Question and Answer (Q&A) module is a Weaviate module for answer extraction from data through the OpenAI [completions endpoint](https://platform.openai.com/docs/api-reference/completions) or the Azure OpenAI equivalent.
* The module depends on a text vectorization module that should be running with Weaviate.
* The module adds an `ask {}` operator to the GraphQL `Get {}` queries
* The module returns a max. of 1 answer in the GraphQL `_additional {}` field.
* The answer with the highest `certainty` (confidence level) will be returned.
* Added in Weaviate `v1.16.6`

import OpenAIOrAzureOpenAI from '/_includes/openai.or.azure.openai.mdx';

<OpenAIOrAzureOpenAI/>

## Introduction

The Question and Answer (Q&A) OpenAI module is a Weaviate module for answer extraction from data. It uses an OpenAI completions endpoint to try and extract an answer from the most relevant docs.

This module can be used in GraphQL `Get{...}` queries, as a search operator. The `qna-openai` module tries to find an answer in the data objects of the specified class. If an answer is found within the given `certainty` range, it will be returned in the GraphQL `_additional { answer { ... } }` field. There will be a maximum of 1 answer returned, if this is above the optionally set `certainty`. The answer with the highest `certainty` (confidence level) will be returned.

## Inference API key

`qna-openai` requires an API key from OpenAI or Azure OpenAI.

:::tip
You only need to provide one of the two keys, depending on which service (OpenAI or Azure OpenAI) you are using.
:::

## Organization name

:::info Added in `v1.21.1`
:::

For requests that require the OpenAI organization name, you can provide it at query time by adding it to the HTTP header:
- `"X-OpenAI-Organization": "YOUR-OPENAI-ORGANIZATION"` for OpenAI

### Providing the key to Weaviate

You can provide your API key in two ways:

1. During the **configuration** of your Docker instance, by adding `OPENAI_APIKEY` or `AZURE_APIKEY` as appropriate under `environment` to your `Docker Compose` file, like this:

  ```yaml
  environment:
    OPENAI_APIKEY: 'your-key-goes-here'  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
    AZURE_APIKEY: 'your-key-goes-here'  # For use with Azure OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
    ...
  ```

2. At **run-time** (recommended), by providing `"X-OpenAI-Api-Key"` or `"X-Azure-Api-Key"` through the request header. You can provide it using the Weaviate client, like this:

import ClientKey from '/_includes/code/core.client.openai.apikey.mdx';

<ClientKey />

## Module configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Docker Compose file (Weaviate open source only)

You can enable the OpenAI Q&A module in your Docker Compose file (e.g. `docker-compose.yml`). Add the `qna-openai` module (alongside any other module you may need) to the `ENABLE_MODULES` property, like this:

```
ENABLE_MODULES: 'text2vec-openai,qna-openai'
```

Here is a full example of a Docker configuration, which uses the `qna-openai` module in combination with `text2vec-openai`:

```yaml
---
version: '3.4'
services:
  weaviate:
    command:
      - --host
      - 0.0.0.0
      - --port
      - '8080'
      - --scheme
      - http
    image:
      cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
      - 8080:8080
      - 50051:50051
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-openai'
      ENABLE_MODULES: 'text2vec-openai,qna-openai'
      OPENAI_APIKEY: sk-foobar  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
      OPENAI_ORGANIZATION: your-orgname  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
      AZURE_APIKEY: sk-foobar  # For use with Azure OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
      CLUSTER_HOSTNAME: 'node1'
```

## Schema configuration

You can define settings for this module in the schema.

### OpenAI vs Azure OpenAI

- **OpenAI** users can optionally set the `model` parameter.
- **Azure OpenAI** users must set the parameters `resourceName` and `deploymentId`.

### Model parameters

You can also configure additional parameters for the model through the parameters shown below.

### Example schema

For example, the following schema configuration will set Weaviate to use the `qna-openai` model with the `Document` class.

The following schema configuration uses the `text-davinci-002` model.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "qna-openai": {
          "model": "text-davinci-002", // For OpenAI
          "resourceName": "<YOUR-RESOURCE-NAME>",  // For Azure OpenAI
          "deploymentId": "<YOUR-MODEL-NAME>",  // For Azure OpenAI
          "maxTokens": 16, // Applicable to both OpenAI and Azure OpenAI
          "temperature": 0.0,  // Applicable to both OpenAI and Azure OpenAI
          "topP": 1,  // Applicable to both OpenAI and Azure OpenAI
          "frequencyPenalty": 0.0,  // Applicable to both OpenAI and Azure OpenAI
          "presencePenalty": 0.0  // Applicable to both OpenAI and Azure OpenAI
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "Content that will be vectorized",
          "name": "content"
        }
      ]
    }
  ]
}
```

For information on how to use the individual parameters you [can check here](https://platform.openai.com/docs/api-reference/completions)

## How to use

This module adds a search operator to GraphQL `Get{...}` queries: `ask{}`. This operator takes the following arguments:

| Field | Data Type | Required | Example value | Description |
|- |- |- |- |- |
| `question`  | string | yes | `"What is the name of the Dutch king?"` | The question to be answered. |
| `properties`  | list of strings | no | `["summary"]` | The properties of the queries Class which contains text. If no properties are set, all are considered. |

Notes:

* The GraphQL `Explore { }` function does support the `ask` searcher, but the result is only a beacon to the object containing the answer. It is thus not any different from performing a nearText semantic search with the question. No extraction is happening.
* You cannot use the `'ask'` operator along with a `'neaXXX'` operator!

### Example query

import CodeQNAOpenAIAsk from '/_includes/code/qna-openai.ask.mdx';

<CodeQNAOpenAIAsk/>

### GraphQL response

The answer is contained in a new GraphQL `_additional` property called `answer`. It contains the following fields:

* `hasAnswer` (`boolean`): could an answer be found?
* `result` (nullable `string`): An answer if one could be found. `null` if `hasAnswer==false`
* `property` (nullable `string`): The property which contains the answer. `null` if `hasAnswer==false`
* `startPosition` (`int`): The character offset where the answer starts. `0` if `hasAnswer==false`
* `endPosition` (`int`): The character offset where the answer ends `0` if `hasAnswer==false`

Note: `startPosition`, `endPosition` and `property` in the response are not guaranteed to be present. They are calculated by a case-insensitive string matching function against the input text. If the transformer model formats the output differently (e.g. by introducing spaces between tokens which were not present in the original input), the calculation of the position and determining the property fails.

### Example response

```json
{
  "data": {
    "Get": {
      "Document": [
        {
          "_additional": {
            "answer": {
              "hasAnswer": true,
              "result": " Stanley Kubrick is an American filmmaker who is best known for his films, including \"A Clockwork Orange,\" \"Eyes Wide Shut,\" and \"The Shining.\""
            }
          }
        }
      ]
    }
  }
}
```

### Token limits

If the number of input tokens exceed the limit of the model, the module will return the OpenAI API's error.

## How it works (under the hood)

Under the hood, the model uses a two-step approach. First it performs a semantic search to find the documents (e.g. a Sentence, Paragraph, Article, etc.) most likely to contain the answer. In a second step, Weaviate creates the required prompt as an input to an external call made to the OpenAI Completions endpoint. Weaviate uses the most relevant documents to establish a prompt for which OpenAI extracts the answer. There are three possible outcomes:

1. No answer was found because the question can not be answered,
2. An answer was found, but did not meet the user-specified minimum certainty, so it was discarded (typically the case when the document is on topic, but does not contain an actual answer to the question), and
3. An answer was found that matches the desired certainty. It is returned to the user.

The module performs a semantic search under the hood, so a `text2vec-...` module is required. It does not need to be of the same type as the `qna-...` module. For example, you can use a `text2vec-contextionary` module to perform the semantic search, and a `qna-openai` module to extract the answer.

## Additional information

### Available models

OpenAI has multiple models available for the extraction of answers from a given context.

* For document embeddings you can choose one of the following models:
  * [ada](https://platform.openai.com/docs/models/ada)
  * [babbage](https://platform.openai.com/docs/models/babbage)
  * [curie](https://platform.openai.com/docs/models/curie)
  * [davinci](https://platform.openai.com/docs/models/davinci)

These models can be configured


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

