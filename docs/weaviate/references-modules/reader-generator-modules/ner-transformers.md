---
layout: layout-documentation
solution: weaviate
sub-menu: Readers & Generators
nav-parent: Modules
title: Named Entity Recognition
description: Named Entity Recognition module in Weaviate
tags: ['ner-transformers', 'transformers', 'token classification']
sidebar_position: 2
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/current/modules/ner-transformers.html
---

# In short
* The Named Entity Recognition (NER) module is a Weaviate module for token classification.
* The module depends on a NER Transformers model that should be running with Weaviate. There are pre-built models available, but you can also attach another HuggingFace Transformer or custom NER model.
* The module adds a `tokens {}` filter to the GraphQL `_additional {}` field.
* The module returns data objects as usual, with recognized tokens in the GraphQL `_additional { tokens {} }` field. 

# Introduction

Named Entity Recognition (NER) module is a Weaviate module to extract entities from your existing Weaviate (text) objects on the fly. Entity Extraction happens at query time. Note that for maximum performance, transformer-based models should run with GPUs. CPUs can be used, but the throughput will be lower.

There are currently three different NER modules available (taken from [Huggingface](https://huggingface.co/)): [`dbmdz-bert-large-cased-finetuned-conll03-english`](https://huggingface.co/dbmdz/bert-large-cased-finetuned-conll03-english), [`dslim-bert-base-NER`](https://huggingface.co/dslim/bert-base-NER), [`davlan-bert-base-multilingual-cased-ner-hrl`](https://huggingface.co/Davlan/bert-base-multilingual-cased-ner-hrl?text=%D8%A5%D8%B3%D9%85%D9%8A+%D8%B3%D8%A7%D9%85%D9%8A+%D9%88%D8%A3%D8%B3%D9%83%D9%86+%D9%81%D9%8A+%D8%A7%D9%84%D9%82%D8%AF%D8%B3+%D9%81%D9%8A+%D9%81%D9%84%D8%B3%D8%B7%D9%8A%D9%86.).

# How to enable (module configuration)

### Docker-compose

The NER module can be added as a service to the Docker-compose file. You must have a text vectorizer like `text2vec-contextionary` or `text2vec-transformers` running. An example Docker-compose file for using the `ner-transformers` module (`dbmdz-bert-large-cased-finetuned-conll03-english`) in combination with the `text2vec-contextionary`:

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
      NER_INFERENCE_API: "http://ner-transformers:8080"
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-contextionary'
      ENABLE_MODULES: 'text2vec-contextionary,ner-transformers'
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
  ner-transformers:
    image: semitechnologies/ner-transformers:dbmdz-bert-large-cased-finetuned-conll03-english
...
```

Variable explanations:
* `NER_INFERENCE_API`: where the qna module is running

# How to use (GraphQL)

To make use of the modules capabilities, simply extend your query with the following new `_additional` property:

### GraphQL Token

This module adds a search filter to the GraphQL `_additional` field in queries: `token{}`. This new filter takes the following arguments: 

| Field 	| Data Type 	| Required 	| Example value 	| Description 	|
|-	|-	|-	|-	|-	|
| `properties` 	| list of strings 	| yes 	| `["summary"]` 	| The properties of the queries Class which contains text (`text` or `string` Datatype). You must provide at least one property	|
| `certainty` 	| float 	| no 	| `0.75` | Desired minimal certainty or confidence that the recognized token must have. The higher the value, the stricter the token classification. If no certainty is set, all tokens that are found by the model will be returned. |
| `limit` 	| int 	| no 	| `1` | The maximum amount of tokens returned per data object in total. |

### Example query

{% include code/1.x/ner-transformers-module.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++limit%3A+1%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_additional%7B%0D%0A++++++++tokens%28%0D%0A++++++++++properties%3A+%5B%22title%22%5D%2C%0D%0A++++++++++limit%3A+10%2C%0D%0A++++++++++certainty%3A+0.7%0D%0A++++++++%29+%7B%0D%0A++++++++++certainty%0D%0A++++++++++endPosition%0D%0A++++++++++entity%0D%0A++++++++++property%0D%0A++++++++++startPosition%0D%0A++++++++++word%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}


### GraphQL response

The answer is contained in a new GraphQL `_additional` property called `tokens`, which returns a list of tokens. It contains the following fields:
* `entity` (`string`): The Entity group (classified token)
* `word` (`string`): The word that is recognized as entity
* `property` (`string`): The property in which the token is found
* `certainty` (`float`): 0.0-1.0 of how certain the model is that the token is correctly classified
* `startPosition` (`int`): The position of the first character of the word in the property value
* `endPosition` (`int`): The position of the last character of the word in the property value

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "tokens": [
              {
                "property": "title",
                "entity": "PER",
                "certainty": 0.9894614815711975,
                "word": "Sarah",
                "startPosition": 11,
                "endPosition": 16
              },
              {
                "property": "title",
                "entity": "LOC",
                "certainty": 0.7529033422470093,
                "word": "London",
                "startPosition": 31,
                "endPosition": 37
              }
            ]
          },
          "title": "My name is Sarah and I live in London"
        }
      ]
    }
  },
  "errors": null
}
```

# Use another NER Transformer module from HuggingFace

You can build a Docker image which supports any model from the [Huggingface model hub](https://huggingface.co/models) with a two-line Dockerfile. In the following example, we are going to build a custom image for the [`Davlan/bert-base-multilingual-cased-ner-hrl` model](https://huggingface.co/Davlan/bert-base-multilingual-cased-ner-hrl). 

#### Step 1: Create a `Dockerfile`
Create a new `Dockerfile`. We will name it `my-model.Dockerfile`. Add the following lines to it: 
```
FROM semitechnologies/ner-transformers:custom
RUN chmod +x ./download.py
RUN MODEL_NAME=Davlan/bert-base-multilingual-cased-ner-hrl ./download.py
```

#### Step 2: Build and tag your Dockerfile.
We will tag our Dockerfile as `davlan-bert-base-multilingual-cased-ner-hrl`:
```
docker build -f my-model.Dockerfile -t davlan-bert-base-multilingual-cased-ner-hrl .
```

#### Step 3: That's it!
You can now push your image to your favorite registry or reference it locally in your Weaviate `docker-compose.yaml` using the Docker tag `davlan-bert-base-multilingual-cased-ner-hrl`.


# How it works (under the hood)

The code for the application in this repo works well with models that take in a text input like `My name is Sarah and I live in London` and return information in JSON format like this:

```json
[
  {
    "entity_group": "PER",
    "score": 0.9985478520393372,
    "word": "Sarah",
    "start": 11,
    "end": 16
  },
  {
    "entity_group": "LOC",
    "score": 0.999621570110321,
    "word": "London",
    "start": 31,
    "end": 37
  }
]
```

The Weaviate NER Module then takes this output and processes this to GraphQL output.

# More resources

{% include docs-support-links.html %}
