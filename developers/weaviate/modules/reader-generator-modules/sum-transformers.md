---
title: Summarization
sidebar_position: 80
image: og/docs/modules/sum-transformers.jpg
# tags: ['transformers']
---


## In short

* The Summarization (`sum-transformers`) module is a Weaviate module that summarizes whole paragraphs into a short text.
* The module containerizes a summarization-focussed transformers model for Weaviate to connect to. We make pre-built models available here, but you can also attach another transformer model from Hugging Face or even a custom model.
* The module adds a `summary {}` filter to the GraphQL `_additional {}` field.
* The module returns the results in the GraphQL `_additional { summary {} }` field.

## Introduction

As the name indicates, the summarization module can produce a summary of Weaviate text objects at query time.

**For example**, it allows us to run a query on our data in Weaviate, which can take a text like this:

> <em>"The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct."</em>

and transform it to a short sentence like this:

> <em>"The Eiffel Tower is a landmark in Paris, France."</em>

:::note GPUs preferred
For maximum performance of your queries, transformer-based models should run with GPUs.
CPUs can be used, however, this will significantly slow down your queries.
:::

### Available modules

Here is the current list of available `SUM` modules - sourced from [Hugging Face Model Hub](https://huggingface.co/models):
* [`bart-large-cnn`](https://huggingface.co/facebook/bart-large-cnn)
* [`pegasus-xsum`](https://huggingface.co/google/pegasus-xsum)

## How to enable (module configuration)

### Docker Compose

The `sum-transformers` module can be added as a service to the Docker Compose file. You must have a text vectorizer like `text2vec-contextionary` or `text2vec-transformers` running.

An example Docker Compose file for using the `sum-transformers` module (with the `facebook-bart-large-cnn` model) in combination with the `text2vec-contextionary` vectorizer module is below:

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
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 50051:50051
    restart: on-failure:0
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      SUM_INFERENCE_API: "http://sum-transformers:8080"
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-contextionary'
      ENABLE_MODULES: 'text2vec-contextionary,sum-transformers'
      CLUSTER_HOSTNAME: 'node1'
  contextionary:
    environment:
      OCCURRENCE_WEIGHT_LINEAR_FACTOR: 0.75
      EXTENSIONS_STORAGE_MODE: weaviate
      EXTENSIONS_STORAGE_ORIGIN: http://weaviate:8080
      NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE: 5
      ENABLE_COMPOUND_SPLITTING: 'false'
    image: cr.weaviate.io/semitechnologies/contextionary:en0.16.0-v1.0.2
    ports:
    - 9999:9999
  sum-transformers:
    image: cr.weaviate.io/semitechnologies/sum-transformers:facebook-bart-large-cnn-1.2.0
    # image: cr.weaviate.io/semitechnologies/sum-transformers:google-pegasus-xsum-1.2.0  # Could be used instead
...
```

Variable explanations:
* `SUM_INFERENCE_API`: where the summarization module is running

## How to use (GraphQL)

To make use of the modules capabilities, extend your query with the following new `_additional` property:

### GraphQL Token

This module adds a search filter to the GraphQL `_additional` field in queries: `summary{}`. This new filter takes the following arguments:

| Field 	| Data Type 	| Required 	| Example value 	| Description 	|
|-	|-	|-	|-	|-	|
| `properties` 	| list of strings 	| yes 	| `["description"]` 	| The properties of the queries Class which contains text (`text` or `string` Datatype). You must provide at least one property	|

### Example query

import CodeSumTransformer from '/_includes/code/sum-transformers-module.mdx';

<CodeSumTransformer />

### GraphQL response

The answer is contained in a new GraphQL `_additional` property called `summary`, which returns a list of tokens. It contains the following fields:
* `property` (`string`): The property that was summarized – this is useful when you summarize more than one property
* `result` (`string`): The output summary

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "summary": [
              {
                "property": "summary",
                "result": "Finding the perfect pair of jeans can be a challenge."
              }
            ]
          },
          "title": "The Most Comfortable Gap Jeans to Shop Now"
        }
      ]
    }
  },
  "errors": null
}
```

## Use another Summarization module from Hugging Face

You can build a Docker image which supports any summarization model from the [Hugging Face Model Hub](https://huggingface.co/models?pipeline_tag=summarization) with a two-line Dockerfile. In the following example, we are going to build a custom image for the [`google/pegasus-pubmed` model](https://huggingface.co/google/pegasus-pubmed).

#### Step 1: Create a `Dockerfile`

Create a new `Dockerfile`. We will name it `my-model.Dockerfile`. Add the following lines to it:
```
FROM semitechnologies/sum-transformers:custom
RUN chmod +x ./download.py
RUN MODEL_NAME=google/pegasus-pubmed ./download.py
```

#### Step 2: Build and tag your Dockerfile.

We will tag our Dockerfile as `google-pegasus-pubmed`:
```
docker build -f my-model.Dockerfile -t google-pegasus-pubmed .
```

#### Step 3: Use the image with Weaviate

You can now push your image to your favorite registry or reference it locally in your Weaviate `docker-compose.yml` using the Docker tag `google-pegasus-pubmed`.


## How it works (under the hood)

The `sum-transformers` module uses transformer-based summarizer models. They are abstractive, in that they generate new text from the input text, rather than to extract particular sentences. For example, a model may take text like this:

<details>
  <summary>See original text</summary>

> *The Loch Ness Monster (Scottish Gaelic: Uilebheist Loch Nis), affectionately known as Nessie, is a creature in Scottish folklore that is said to inhabit Loch Ness in the Scottish Highlands. It is often described as large, long-necked, and with one or more humps protruding from the water. Popular interest and belief in the creature has varied since it was brought to worldwide attention in 1933. Evidence of its existence is anecdotal, with a number of disputed photographs and sonar readings.*
> *The scientific community explains alleged sightings of the Loch Ness Monster as hoaxes, wishful thinking, and the misidentification of mundane objects. The pseudoscience and subculture of cryptozoology has placed particular emphasis on the creature.*

</details>

And summarize it to produce a text like:

> *The Loch Ness Monster is said to be a large, long-necked creature. Popular belief in the creature has varied since it was brought to worldwide attention in 1933. Evidence of its existence is disputed, with a number of disputed photographs and sonar readings. The pseudoscience and subculture of cryptozoology has placed particular emphasis on the creature.*

Note that much of output does not copy the input verbatim, but is *based on* it. The `sum-transformers` module then delivers this output in the response.

:::note Input length
Note that like many other language models, summarizer models can only process a limited amount of text. The `sum-transformers` module will be limited to the maximum length of the model it is using. For example, the `facebook/bart-large-cnn` model can only process 1024 tokens.

On the other hand, be aware that providing an input of insufficient length and detail may cause the transformer model to [hallucinate](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)).
:::

## Model license(s)

The `sum-transformers` module is compatible with various models, each with their own license. For detailed information, please review the license of the model you are using in the [Hugging Face Model Hub](https://huggingface.co/models).

It is your responsibility to evaluate whether the terms of its license(s), if any, are appropriate for your intended use.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
