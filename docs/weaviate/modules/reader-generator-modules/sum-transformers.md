---
layout: layout-documentation
solution: weaviate
sub-menu: Readers & Generators
nav-parent: Modules
title: Summarization
description: Summarization module in Weaviate
tags: ['transformers', 'text summary']
sidebar_position: 3
open-graph-type: article
toc: true
---

# In short
* The Summarization (SUM) module is a Weaviate module that summarizes whole paragraps into a short text.
* The module depends on a SUM Transformers model that should be running with Weaviate. There are pre-built models available, but you can also attach another HuggingFace Transformer or custom SUM model.
* The module adds a `summary {}` filter to the GraphQL `_additional {}` field.
* The module returns the results in the GraphQL `_additional { summary {} }` field. 

# Introduction

The Summarization module is a Weaviate module that is used to summarize Weaviate text objects at query time.

**For example**, it allows us to run a query on our data in Weaviate, which can take a text like this:

<p style="padding: 0 20"><em>"The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct."</em></p>

and transform it to a short sentence like this:

<p style="padding: 0 20"><em>"The Eiffel Tower is a landmark in Paris, France."</em></p>

> Note, for maximum performance of your queries, transformer-based models should run with GPUs.
> 
> CPUs can be used, however, this will significantly slow down your queries. 

## Available modules

Here is the current list of available SUM modules - sourced from [Huggingface](https://huggingface.co/):
* [`bart-large-cnn`](https://huggingface.co/facebook/bart-large-cnn)
<!-- TODO: include when/if the build completes -->
<!-- * [`pegasus-xsum`](https://huggingface.co/google/pegasus-xsum) -->

# How to enable (module configuration)

### Docker-compose

The SUM module can be added as a service to the Docker-compose file. You must have a text vectorizer like `text2vec-contextionary` or `text2vec-transformers` running. An example Docker-compose file for using the `sum-transformers` module (`facebook-bart-large-cnn`) in combination with the `text2vec-contextionary`:

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
    image: semitechnologies/contextionary:en0.16.0-v1.0.2
    ports:
    - 9999:9999
  sum-transformers:
    image: semitechnologies/sum-transformers:facebook-bart-large-cnn-1.0.0
...
```

Variable explanations:
* `SUM_INFERENCE_API`: where the summarization module is running

# How to use (GraphQL)

To make use of the modules capabilities, simply extend your query with the following new `_additional` property:

### GraphQL Token

This module adds a search filter to the GraphQL `_additional` field in queries: `summary{}`. This new filter takes the following arguments: 

| Field 	| Data Type 	| Required 	| Example value 	| Description 	|
|-	|-	|-	|-	|-	|
| `properties` 	| list of strings 	| yes 	| `["description"]` 	| The properties of the queries Class which contains text (`text` or `string` Datatype). You must provide at least one property	|

### Example query
<!-- TODO: (Marcin) review the below code -->
{% include code/1.x/sum-transformers-module.html %}

<!-- TODO: Update the live working example 
  We need to add the Summarizer to the cloud instance

{% raw %}
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++limit%3A+1%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_additional%7B%0D%0A++++++++tokens%28%0D%0A++++++++++properties%3A+%5B%22title%22%5D%2C%0D%0A++++++++++limit%3A+10%2C%0D%0A++++++++++certainty%3A+0.7%0D%0A++++++++%29+%7B%0D%0A++++++++++certainty%0D%0A++++++++++endPosition%0D%0A++++++++++entity%0D%0A++++++++++property%0D%0A++++++++++startPosition%0D%0A++++++++++word%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %} 
{% endraw %} -->

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

# Use another Summarization module from HuggingFace

You can build a Docker image which supports any summarization model from the [Huggingface model hub](https://huggingface.co/models?pipeline_tag=summarization) with a two-line Dockerfile. In the following example, we are going to build a custom image for the [`google/pegasus-pubmed` model](https://huggingface.co/google/pegasus-pubmed). 

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

#### Step 3: That's it!
You can now push your image to your favorite registry or reference it locally in your Weaviate `docker-compose.yaml` using the Docker tag `google-pegasus-pubmed`.


# How it works (under the hood)

The code for the application in this repo works well with models that take in a text input like:

<p style="padding 20 0"><em>But, similar to finding a bathing suit that fits in all the right places, discovering a new pair of perfectly cut and comfortable jeans can be thrilling. The Gap jeans are as classic as they come and they give me that figure-hugging fit without cutting off my circulation. At the moment, there are TikTok videos circulating about these jeans, making me one member of an ever-growing fan club. While good jeans are priceless, these bonafide confidence boosters are also now on sale for $63. Trust me, there’s no time like the present to break up with those all day, every day sweatpants and slip on some hero denim.</em></p>

then summarize it and return information in JSON format like this:

```json
[
  {
    "result": "Finding the perfect pair of jeans can be a challenge."
  }
]
```

The Weaviate SUM Module then takes this output and processes this to GraphQL output.

# More resources

{% include docs-support-links.html %}
