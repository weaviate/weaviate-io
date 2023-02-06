---
title: Generative - OpenAI
sidebar_position: 2
image: og/docs/modules.jpg
# tags: ['generative', 'transformers', 'openai']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## In short

* The Generative OpenAI module is a Weaviate module for generating responses based on the data stored in your Weaviate instance.
* The module adds an `generate {}` parameter to the GraphQL `_additional {}` property of the `Get {}` queries
* Added in Weaviate `v1.18.0`

# Introduction

​The Generative OpenAI module is a Weaviate module for generating data based on responses stored in Weaviate. You can create responses based on single results, or group all results together.

You need to input both a query and a prompt (for individual responses) or a task (for all responses).

​The module extents the  `_additional {...}`  property in the​ `Get {...}` query with a `generate {...}` function.

# How to enable

Request an OpenAI API-key via [their website](https://openai.com/api/).

# How to enable (module configuration)

### Docker-compose

* The Generative module can be added as a service to the Docker-compose file.
* An example Docker-compose file for using the `generative-openai` module in combination with the `text2vec-openai` is as follows:

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
      ENABLE_MODULES: 'text2vec-openai,generative-openai'
      OPENAI_APIKEY: sk-foobar # this parameter is optional, as you can also provide it at insert/query time
      CLUSTER_HOSTNAME: 'node1'
```

Variable explanations:

* Note: Starting with `v1.11.0` the `OPENAI_APIKEY` variable is now optional and you can instead provide the key at insert/query time as an HTTP header.

# How to configure

​In your Weaviate schema, you must define how you want this module to interact with the OpenAI endpoint. If you are new to Weaviate schemas, you might want to check out the [tutorial on the Weaviate schema](../../tutorials/schema.md) first.

The following schema configuration uses the `ada` model.

```json
# TBD
```

# How to use (GraphQL)

### GraphQL Ask search

This module extents the  `_additional {...}`  property in the​ `Get {...}` query.

This new parameter takes the following arguments:

| Field | Data Type | Required | Example value | Description |
|- |- |- |- |- |
| `singleResult{ prompt }`  | string | no | `"..."`  | ... |
| `groupedResult{ task }`  | string | no | `"..."`  | ... |

### Example query

import CodeQNAOpenAIAsk from '/_includes/code/generative-openai.ask.mdx';

<CodeQNAOpenAIAsk/>

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++ask%3A+%7B%0D%0A++++++++question%3A+%22Who+is+the+king+of+the+Netherlands%3F%22%2C%0D%0A++++++++properties%3A+%5B%22summary%22%5D%0D%0A++++++%7D%2C+%0D%0A++++++limit%3A1%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_
additional+%7B%0D%0A++++++++answer+%7B%0D%0A++++++++++hasAnswer%0D%0A++++++++++certainty%0D%0A++++++++++property%0D%0A++++++++++result%0D%0A++++++++++startPosition%0D%0A++++++++++endPosition%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

### GraphQL response

...

### Example response

...

# How it works (under the hood)

...

# Additional information

## Available models

OpenAI has one model available to generate answers based on the prompt.

* [davinci 002](https://beta.openai.com/docs/engines/davinci)

# More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

