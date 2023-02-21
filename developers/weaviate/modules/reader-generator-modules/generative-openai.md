---
title: Generative Search - OpenAI
sidebar_position: 2
image: og/docs/modules/generative-openai.jpg
# tags: ['generative', 'transformers', 'openai']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## In short

* The Generative OpenAI (`generative-openai`) module is a Weaviate module for generating responses based on the data stored in your Weaviate instance.
* The module can generate a response for each returned object, or a single response for a group of objects.
* The module adds a `generate {}` parameter to the GraphQL `_additional {}` property of the `Get {}` queries
* Added in Weaviate `v1.17.3`

## Introduction

`generative-openai` is a Weaviate module for generating text based on fields returned by Weaviate queries.

The module works in two steps:
1. (Weaviate) Run a search query in Weaviate to find relevant objects.
2. (OpenAI) Use OpenAI to generate a response based on the results (from the previous step) and the provided prompt or task.

:::note
You can use the Generative OpenAI module with any other modules. For example, you could use `text2vec-cohere` or `text2vec-huggingface` to vectorize and query your data, but then rely on the `generative-openai` module to generate a response.
:::

The generative module can provide results for:
* each returned object - `singleResult{ prompt }`
* the group of all results together – `groupedResult{ task }`

You need to input both a query and a prompt (for individual responses) or a task (for all responses).

## OpenAI API key

`generative-openai` requires an [OpenAI API key](https://openai.com/api/) to perform the generation task.

### Providing the key to Weaviate

You can provide your OpenAI API key in two ways:

1. During the **configuration** of your Docker instance, by adding `OPENAI_APIKEY` under `environment` to your `docker-compose` file, like this:

  ```
  environment:
    OPENAI_APIKEY: 'your-key-goes-here'
    ...
  ```

2. At **run-time** (recommended), by providing `"X-OpenAI-Api-Key"` to the Weaviate client, like this:

import ClientKey from '/_includes/code/core.client.openai.apikey.mdx';

<ClientKey />

## Enabling the module

:::caution
Your Weaviate instance must be on `1.17.3` or newer.

If your instance is older than `1.17.3` then you need to migrate or upgrade it to a newer version.
:::

### WCS

The `Generative OpenAI` module is enabled by default in the Weaviate Cloud Services (WCS). If your instance version is on `1.17.3` or newer, then the module is ready to go.

### Local deployment with Docker

To enable the Generative OpenAI module with your local deployment of Weaviate, you need to configure your `docker-compose` file. Add the `generative-openai` module (alongside any other module you may need) to the `ENABLE_MODULES` property, like this:

```
ENABLE_MODULES: 'text2vec-openai,generative-openai'
```

Here is a full example of a Docker configuration, which uses the `generative-openai` module in combination with `text2vec-openai`:

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
      // highlight-next-line
      ENABLE_MODULES: 'text2vec-openai,generative-openai'
      OPENAI_APIKEY: sk-foobar # this parameter is optional, as you can also provide it through the client
      CLUSTER_HOSTNAME: 'node1'
```

## Schema configuration

The Generative module doesn't require a specific schema configuration.

:::note
You need a schema to run queries on your data, so that the module can use the results to generate a response.
:::

<details>
  <summary>New to Weaviate Schemas?</summary>

If you are new to Weaviate, check out the [Weaviate schema tutorial](/developers/weaviate/tutorials/schema.md).

</details>

## How to use

This module extends the  `_additional {...}` property with a `generate` operator.

`generate` takes the following arguments:

| Field | Data Type | Required | Example | Description |
|- |- |- |- |- |
| `singleResult {prompt}`  | string | no | `Summarize the following in a tweet: {summary}`  | Generates a response for each individual search result. You need to include at least one result field in the prompt, between braces. |
| `groupedResult {task}`  | string | no | `Explain why these results are similar to each other`  | Generates a single response for all search results |

:::note
Currently, you can't provide your OpenAI key in the Weaviate console. That means you can't use the `GraphQL` examples with your WCS instances, but if you provide your API key in the Docker configuration, then this should work.
:::

### Example of properties in the prompt 

​When piping the results to the prompt, at least one field returned by the query must be added to the prompt. If you don't add any fields, Weaviate will throw an error.

​For example, assume your schema looks like this:

```graphql
{
  Article {
    title
    summary
  }
}
```

You can add both `title` and `summary` to the prompt by enclosing them in curly brackets:

```graphql
{
  Get {
    Article {
      title
      summary
      _additional {
        generate(
          singleResult: {
            prompt: """
            Summarize the following in a tweet:
            
            {title} - {summary}
            """
          }
        ) {
          singleResult
          error
        }
      }
    }
  }
}
```

### Example - single result

Here is an example of a query where:
* we run a vector search (with `nearText`) to find articles about "Italian food"
* then we ask the generator module to describe each result as a Facebook ad.
  * the query asks for the `summary` field, which it then includes in the `prompt` argument of the `generate` operator.

import OpenAISingleResult from '/_includes/code/generative.openai.singleresult.mdx';

<OpenAISingleResult/>

### Example response - single result

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "singleResult": "This Facebook Ad will explore the fascinating history of Italian food and how it has evolved over time. Learn from Dr Eva Del Soldato and Diego Zancani, two experts in Italian food history, about how even the emoji for pasta isn't just pasta -- it's a steaming plate of spaghetti heaped with tomato sauce on top. Discover how Italy's complex history has shaped the Italian food we know and love today."
            }
          },
          "summary": "Even the emoji for pasta isn't just pasta -- it's a steaming plate of spaghetti heaped with tomato sauce on top. But while today we think of tomatoes as inextricably linked to Italian food, that hasn't always been the case. \"People tend to think Italian food was always as it is now -- that Dante was eating pizza,\" says Dr Eva Del Soldato , associate professor of romance languages at the University of Pennsylvania, who leads courses on Italian food history. In fact, she says, Italy's complex history -- it wasn't unified until 1861 -- means that what we think of Italian food is, for the most part, a relatively modern concept. Diego Zancani, emeritus professor of medieval and modern languages at Oxford University and author of \"How We Fell in Love with Italian Food,\" agrees.",
          "title": "How this fruit became the star of Italian cooking"
        }
      ]
    }
  }
}
```

### Example - grouped result

Here is an example of a query where:
* we run a vector search (with `nearText`) to find publications about finance,
* then we ask the generator module to explain why these articles are about finance.

import OpenAIGroupedResult from '/_includes/code/generative.openai.groupedresult.mdx';

<OpenAIGroupedResult />

<!-- import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++ask%3A+%7B%0D%0A++++++++question%3A+%22Who+is+the+king+of+the+Netherlands%3F%22%2C%0D%0A++++++++properties%3A+%5B%22summary%22%5D%0D%0A++++++%7D%2C+%0D%0A++++++limit%3A1%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_
additional+%7B%0D%0A++++++++answer+%7B%0D%0A++++++++++hasAnswer%0D%0A++++++++++certainty%0D%0A++++++++++property%0D%0A++++++++++result%0D%0A++++++++++startPosition%0D%0A++++++++++endPosition%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/> -->

### Example response - grouped result

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "groupedResult": "The Financial Times, Wall Street Journal, and The New York Times Company are all about finance because they provide news and analysis on the latest financial markets, economic trends, and business developments. They also provide advice and commentary on personal finance, investments, and other financial topics."
            }
          },
          "name": "Financial Times"
        },
        {
          "_additional": {
            "generate": null
          },
          "name": "Wall Street Journal"
        },
        {
          "_additional": {
            "generate": null
          },
          "name": "The New York Times Company"
        }
      ]
    }
  }
}
```

## Additional information

### Available models

OpenAI has one model available to generate answers based on the prompt.

* [davinci 003](https://platform.openai.com/docs/models/davinci)

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
