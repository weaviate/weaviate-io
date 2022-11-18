---
layout: layout-documentation
solution: weaviate
sub-menu: Other Modules
nav-parent: Modules
title: spellcheck
description: Weaviate spellcheck module
tags: ['spellcheck']
sidebar_position: 1
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.11.0/other-modules/spellcheck.html
    - /developers/weaviate/current/modules/spellcheck.html
---

# In short
* The SpellCheck module is a Weaviate module for spell checking of raw text in GraphQL queries.
* The module depends on a Python spellchecking service.
* The module adds an `spellCheck {}` filter to the GraphQL `nearText {}` search arguments.
* The module returns the spelling check result in the GraphQL `_additional { spellCheck {} }` field. 

# Introduction

The SpellCheck module is a Weaviate module for checking spelling in raw texts in GraphQL query inputs. Using [the Python spellchecker](https://pypi.org/project/pyspellchecker/) as service, the module analyzes text, gives a suggestion and can force an auto-correction. 

# How to enable (module configuration)

### Docker-compose

The Q&A module can be added as a service to the Docker-compose file. You must have a text vectorizer like `text2vec-contextionary` or `text2vec-transformers` running. An example Docker-compose file for using the `spellcheck` module with the `text2vec-contextionary` is here:

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
    image: semitechnologies/weaviate:{{ site.weaviate_version | remove_first: "v" }}
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      SPELLCHECK_INFERENCE_API: "http://text-spellcheck:8080"
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-contextionary'
      ENABLE_MODULES: 'text2vec-contextionary,text-spellcheck'
      CLUSTER_HOSTNAME: 'node1'
  contextionary:
    environment:
      OCCURRENCE_WEIGHT_LINEAR_FACTOR: 0.75
      EXTENSIONS_STORAGE_MODE: weaviate
      EXTENSIONS_STORAGE_ORIGIN: http://weaviate:8080
      NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE: 5
      ENABLE_COMPOUND_SPLITTING: 'false'
    image: semitechnologies/contextionary:en0.16.0-v1.0.2
    ports:
    - 9999:9999
  text-spellcheck:
    image: semitechnologies/text-spellcheck-model:pyspellchecker-d933122
...
```

Variable explanations:
* `SPELLCHECK_INFERENCE_API`: where the spellcheck module is running

# How to use (GraphQL)

Use the new spellchecker module to verify user-provided search queries (in existing `nearText` (given that a `text2vec` module is used) or `ask` (if the `qna-transformers` module is enabled) functions) are spelled correctly and even suggest alternative, correct spellings. Spell-checking happens at query time.

There are two ways to use this module:

1. It provides a new GraphQL `_additional` property which can be used to check (but not alter) the provided queries, see query below.

### Example query

{% include code/1.x/spellcheck-module.html %}

### GraphQL response

The result is contained in a new GraphQL `_additional` property called `spellCheck`. It contains the following fields:
* `changes`: a list with the following fields:
    * `corrected` (`string`): the corrected spelling if a correction is found
    * `original` (`string`): the original spelled word in the query
* `didYouMean`: the corrected full text in the query
* `originalText`: the original full text in the query
* `location`: the location of the misspelled string in the query

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "spellCheck": [
              {
                "changes": [
                  {
                    "corrected": "housing",
                    "original": "houssing"
                  }
                ],
                "didYouMean": "housing prices",
                "location": "nearText.concepts[0]",
                "originalText": "houssing prices"
              }
            ]
          },
          "title": "..."
        }
      ]
    }
  },
  "errors": null
}
```

2. It extends existing `text2vec-modules` with a `autoCorrect` flag, which can be used to correct the query if incorrect in the background:

### Example query

```graphql
{
  Get {
    Article(nearText:{
      concepts: ["houssing prices"],
      autocorrect: true
    }) {
      title
      _additional{
        spellCheck{
          changes{
            corrected
            original
          }
          didYouMean
          location
          originalText
        }
      }
    }
  }
}
```

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28nearText%3A%7B%0D%0A++++++concepts%3A+%5B%22houssing+prices%22%5D%2C%0D%0A++++++autocorrect%3A+true%0D%0A++++%7D%29+%7B%0D%0A++++++title%0D%0A++++++_additional%7B%0D%0A++++++++spellCheck%7B%0D%0A++++++++++changes%7B%0D%0A++++++++++++corrected%0D%0A++++++++++++original%0D%0A++++++++++%7D%0D%0A++++++++++didYouMean%0D%0A++++++++++location%0D%0A++++++++++originalText%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

# More resources

{% include docs-support-links.html %}
