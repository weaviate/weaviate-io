---
title: Question Answering - OpenAI
sidebar_position: 2
image: og/docs/modules.jpg
# tags: ['qna', 'qna-openai', 'transformers', 'openai']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## In short

* The OpenAI Question and Answer (Q&A) module is a Weaviate module for answer extraction from data through the OpenAI [completions endpoint](https://beta.openai.com/docs/api-reference/completions).
* The module depends on a text vectorization module that should be running with Weaviate.
* The module adds an `ask {}` parameter to the GraphQL `Get {}` queries
* The module returns a max. of 1 answer in the GraphQL `_additional {}` field.
* The answer with the highest `certainty` (confidence level) will be returned.
* Added in Weaviate `v1.16.6`

## Introduction

The Question and Answer (Q&A) OpenAI module is a Weaviate module for answer extraction from data. It uses the [completions endpoint](https://beta.openai.com/docs/api-reference/completions), created by OpenAI, to try and extract an answer from the most relevant docs. This module can be used in GraphQL `Get{...}` queries, as a search operator. The `qna-openai` module tries to find an answer in the data objects of the specified class. If an answer is found within the given `certainty` range, it will be returned in the GraphQL `_additional { answer { ... } }` field. There will be a maximum of 1 answer returned, if this is above the optionally set `certainty`. The answer with the highest `certainty` (confidence level) will be returned.

## How to enable

Request an OpenAI API-key via [their website](https://openai.com/api/).

## How to enable (module configuration)

### Docker-compose

* The Q&A module can be added as a service to the Docker-compose file.
* You must have a text vectorizer running.
* An example Docker-compose file for using the `qna-openai` module in combination with the `text2vec-openai` is as follows:

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
      semitechnologies/weaviate:||site.weaviate_version||
    ports:
      - 8080:8080
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-openai'
      ENABLE_MODULES: 'text2vec-openai,qna-openai'
      OPENAI_APIKEY: sk-foobar # this parameter is optional, as you can also provide it at insert/query time
      CLUSTER_HOSTNAME: 'node1'
```

Variable explanations:

* Note: Starting with `v1.11.0` the `OPENAI_APIKEY` variable is now optional and you can instead provide the key at insert/query time as an HTTP header.

## How to configure

​In your Weaviate schema, you must define how you want this module to interact with the OpenAI endpoint. If you are new to Weaviate schemas, you might want to check out the [tutorial on the Weaviate schema](/developers/weaviate/tutorials/schema.md) first.

The following schema configuration uses the `ada` model.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "qna-openai": {
          "model": "text-davinci-002",
          "maxTokens": 16,
          "temperature": 0.0,
          "topP": 1,
          "frequencyPenalty": 0.0,
          "presencePenalty": 0.0
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

For information on how to use the individual parameters you [can check here](https://beta.openai.com/docs/api-reference/completions)

## How to use (GraphQL)

### GraphQL Ask search

This module adds a search parameter to GraphQL `Get{...}` queries: `ask{}`. This new search parameter takes the following arguments:

| Field | Data Type | Required | Example value | Description |
|- |- |- |- |- |
| `question`  | string | yes | `"What is the name of the Dutch king?"`  | The question to be answered. |
| `properties`  | list of strings | no | `["summary"]`  | The properties of the queries Class which contains text. If no properties are set, all are considered. |

Notes:

* The GraphQL `Explore { }` function does support the `ask` searcher, but the result is only a beacon to the object containing the answer. It is thus not any different from performing a nearText semantic search with the question. No extraction is happening.
* You cannot use the `'ask'` parameter along with a `'near'` parameter!

### Example query

import CodeQNAOpenAIAsk from '/_includes/code/qna-openai.ask.mdx';

<CodeQNAOpenAIAsk/>

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++ask%3A+%7B%0D%0A++++++++question%3A+%22Who+is+the+king+of+the+Netherlands%3F%22%2C%0D%0A++++++++properties%3A+%5B%22summary%22%5D%0D%0A++++++%7D%2C+%0D%0A++++++limit%3A1%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_
additional+%7B%0D%0A++++++++answer+%7B%0D%0A++++++++++hasAnswer%0D%0A++++++++++certainty%0D%0A++++++++++property%0D%0A++++++++++result%0D%0A++++++++++startPosition%0D%0A++++++++++endPosition%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

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

## How it works (under the hood)

Under the hood, the model uses a two-step approach. First it performs a semantic search with `k=1` to find the document (e.g. a Sentence, Paragraph, Article, etc.) which is most likely to contain the answer. This step has no certainty threshold and as long as at least one document is present, it will be fetched and selected as the one most likely containing the answer. In a second step, Weaviate creates the required prompt as an input to an external call made to the OpenAI Completions endpoint. Weaviate uses the most relevant documents to establish a prompt for which OpenAI extracts the answer. There are three possible outcomes:

1. No answer was found because the question can not be answered,
2. An answer was found, but did not meet the user-specified minimum certainty, so it was discarded (typically the case when the document is on topic, but does not contain an actual answer to the question), and
3. An answer was found that matches the desired certainty. It is returned to the user.

The module performs a semantic search under the hood, so a `text2vec-...` module is required. It does not need to be transformers-based and you can also combine it with `text2vec-contextionary`. However, we expect that you will receive the best results by combining it with a well-fitting transformers model by using the appropriate configured `text2vec-transformers` module.

## Additional information

### Available models

OpenAI has multiple models available for the extraction of answers from a given context.

* For document embeddings you can choose one of the following models:
  * [ada](https://beta.openai.com/docs/engines/ada)
  * [babbage](https://beta.openai.com/docs/engines/babbage)
  * [curie](https://beta.openai.com/docs/engines/curie)
  * [davinci](https://beta.openai.com/docs/engines/davinci)

These models can be configured

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

