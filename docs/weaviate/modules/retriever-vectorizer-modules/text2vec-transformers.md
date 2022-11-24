---
layout: layout-documentation
solution: weaviate
sub-menu: Retrievers & Vectorizers
nav-parent: Modules
title: text2vec-transformers
description: Add any transformer model to Weaviate with the transformers module
tags: ['text2vec-transformers']
sidebar_position: 3
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.5.2/modules/text2vec-transformers.html
    - /developers/weaviate/v1.11.0/retriever-vectorizer-modules/text2vec-transformers.html
    - /developers/weaviate/current/modules/text2vec-transformers.html
---

# Introduction

The `text2vec-transformers` module allows you to use a pre-trained language transformer model as a Weaviate vectorization module. Transformer models differ from the Contextionary as they allow you to plug in a pretrained NLP module specific to your use case. This means models like `BERT`, `DilstBERT`, `RoBERTa`, `DilstilROBERTa`, etc. can be used out-of-the box with Weaviate.

To use transformers with Weaviate, the `text2vec-transformers` module needs to be enabled. The models are encapsulated in Docker containers. This allows for efficient scaling and resource planning. Neural-Network-based models run most efficiently on GPU-enabled serves, yet Weaviate is CPU-optimized. This separate-container microservice setup allows you to very easily host (and scale) the model independently on GPU-enabled hardware while keeping Weaviate on cheap CPU-only hardware.

To choose your specific model, you simply need to select the correct Docker container. There is a selection of pre-built Docker images available, but you can also build your own with a simple two-line Dockerfile.

# How to enable

## Weaviate Cloud Service

The `text2vec-transformers` module is not available on the WCS.

## Weaviate open source

You have three options to select your desired model:

1. **Use [any of our pre-built transformers model containers](#pre-built-images).** The models selected in [this list](#pre-built-images) have proven to work well with semantic search in the past. These model containers are pre-built by us, and packed in a container. (If you think we should support another model out-of-the-box [please open an issue or pull request here](https://github.com/semi-technologies/weaviate/issues)).
2. **Use any model from Hugging Face Model Hub.** [Click here to learn how](#option-2-use-any-publically-available-huggingface-model). The `text2vec-transformers` module supports any PyTorch or Tensorflow transformer model. 
3. **Use any private or local PyTorch or Tensorflow transformer model.** [Click here to learn how](#option-3-custom-build-with-a-private-or-local-model). If you have your own transformer model in a registry or on a local disk, you can use this with Weaviate.

### Option 1: Use a pre-built transformer model container

#### Example Docker-compose file
Note: you can also use the [Weaviate configuration tool](../installation/docker-compose.html#configurator).

You can find an example Docker-compose file below, which will spin up Weaviate with the transformers module. In this example, we have selected the `sentence-transformers/msmarco-distilroberta-base-v2` which works great for [asymmetric semantic search](https://sbert.net/examples/applications/semantic-search/README.html#symmetric-vs-asymmetric-semantic-search). See below for how to select an alternative model.

```yaml
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:{{ site.weaviate_version | remove_first: "v" }}
    restart: on-failure:0
    ports:
     - "8080:8080"
    environment:
      QUERY_DEFAULTS_LIMIT: 20
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: "./data"
      DEFAULT_VECTORIZER_MODULE: text2vec-transformers
      ENABLE_MODULES: text2vec-transformers
      TRANSFORMERS_INFERENCE_API: http://t2v-transformers:8080
      CLUSTER_HOSTNAME: 'node1'
  t2v-transformers:
    image: semitechnologies/transformers-inference:sentence-transformers-msmarco-distilroberta-base-v2
    environment:
      ENABLE_CUDA: 0 # set to 1 to enable
```

Note that running Weaviate with a text2vec-transformer module but without GPU will be slow. Enable CUDA if you have a GPU available (`ENABLE_CUDA=1`).

#### Alternative: configure your custom setup

##### Step 1: Enable the `text2vec-transformers` module
Make sure you set the `ENABLE_MODULES=text2vec-transformers` environment variable. Additionally make this module the default vectorizer, so you don't have to specify it on each schema class: `DEFAULT_VECTORIZER_MODULE=text2vec-transformers`

**Important:** This setting is now a requirement, if you plan on using any module. So, when using the `text2vec-contextionary` module, you need to have `ENABLE_MODULES=text2vec-contextionary` set. All our configuration-generators / Helm charts will be updated as part of the Weaviate `v1.2.0` support.

##### Step 2: Run your favorite model

Choose [any of our pre-built transformers models](#pre-built-images) (for building your own model container, see below) and spin it up (for example using `docker run -itp "8000:8080" semitechnologies/transformers-inference:sentence-transformers-msmarco-distilroberta-base-v2`) . Use a CUDA-enabled machine for optimal performance. Alternatively, include this container in the same `docker-compose.yml` as Weaviate.

##### Step 3: Tell Weaviate where to find the inference 

Set the Weaviate environment variable `TRANSFORMERS_INFERENCE_API` to identify where your inference container is running, for example if Weaviate is running outside of Docker use `TRANSFORMERS_INFERENCE_API="http://localhost:8000"`. Alternatively if Weaviate is part of the same Docker network, e.g. because they are part of the same `docker-compose.yml` file, you can use Docker networking/DNS, such as `TRANSFORMERS_INFERENCE_API=http://t2v-transformers:8080`.

You can now use Weaviate normally and all vectorization during import and search time will be done with the selected transformers model.

#### Pre-built images

You can download a selection of pre-built images directly from Dockerhub. We
have chosen publically available models that in our opinion are well suited for
semantic search. 

The pre-built models include:

|Model Name|Description|Image Name|
|---|---|---|
|sentence-transformers/paraphrase-MiniLM-L6-v2 (English, 384d)|New! Sentence-Transformer recommendation for best accuracy/speed trade-off. The lower dimensionality also reduces memory requirements of larger datasets in Weaviate.|semitechnologies/transformers-inference:sentence-transformers-paraphrase-MiniLM-L6-v2|
|sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2 (Multilingual, 384d)|New! Sentence-Transformer recommendation for best accuracy/speed trade-off for a multi-lingual model. The lower dimensionality also reduces memory requirements of larger datasets in Weaviate.|semitechnologies/transformers-inference:sentence-transformers-paraphrase-multilingual-MiniLM-L12-v2|
|sentence-transformers/paraphrase-mpnet-base-v2 (English, 768d)|New! Currently the highest overall score (across all benchmarks) on sentence-transformers benchmarks.|semitechnologies/transformers-inference:sentence-transformers-paraphrase-mpnet-base-v2|
|sentence-transformers/paraphrase-multilingual-mpnet-base-v2 (Multilingual, 768d)|New! Currently the highest overall score for a multi-lingual model (across all benchmarks) on sentence-transformers benchmarks.|semitechnologies/transformers-inference:sentence-transformers-paraphrase-multilingual-mpnet-base-v2|
|sentence-transformers/sentence-transformers/msmarco-distilbert-base-v3 (English, 768d)|New! Successor to the widely popular msmarco v2 models. For Question-Answer style queries (given a search query, find the right passages). Our recommendation to be used in combination with the qna-transformers (Answer extraction) module.|semitechnologies/transformers-inference:sentence-transformers-msmarco-distilbert-base-v3|
|sentence-transformers/stsb-mpnet-base-v2 (English, 768d)|New! Highest STSb score on sentence-transformers benchmarks.|semitechnologies/transformers-inference:sentence-transformers-stsb-mpnet-base-v2|
|sentence-transformers/nli-mpnet-base-v2 (English, 768d)|New! Highest Twitter Paraphrases score on sentence-transformers benchmarks.|semitechnologies/transformers-inference:sentence-transformers-nli-mpnet-base-v2|
|sentence-transformers/stsb-distilbert-base (English)|Deprecated. Only use for compatibility, prefer newer model if possible.|semitechnologies/transformers-inference:sentence-transformers-stsb-distilbert-base|
|sentence-transformers/quora-distilbert-base (English)||semitechnologies/transformers-inference:sentence-transformers-quora-distilbert-base|
|sentence-transformers/paraphrase-distilroberta-base-v1 (English)|Deprecated. Only use for compatibility, prefer newer model if possible.|semitechnologies/transformers-inference:sentence-transformers-paraphrase-distilroberta-base-v1|
|kiri-ai/distiluse-base-multilingual-cased-et (Multilingual)||semitechnologies/transformers-inference:kiri-ai-distiluse-base-multilingual-cased-et|
|sentence-transformers/msmarco-distilroberta-base-v2 (English)|Deprecated. Only use for compatibility, prefer newer model if possible.|semitechnologies/transformers-inference:sentence-transformers-msmarco-distilroberta-base-v2|
|sentence-transformers/msmarco-distilbert-base-v2 (English)||semitechnologies/transformers-inference:sentence-transformers-msmarco-distilbert-base-v2|
|sentence-transformers/stsb-xlm-r-multilingual (Multilingual)|Deprecated. Only use for compatibility, prefer newer model if possible.|semitechnologies/transformers-inference:sentence-transformers-stsb-xlm-r-multilingual|
|sentence-transformers/paraphrase-xlm-r-multilingual-v1 (Multilingual)|Deprecated. Only use for compatibility, prefer newer model if possible.|semitechnologies/transformers-inference:sentence-transformers-paraphrase-xlm-r-multilingual-v1|

The above image names always point to the latest version of the inference
container including the model. You can also make that explicit by appending
`-latest` to the image name. Additionally, you can pin the version to one of
the existing git tags of this repository. E.g. to pin `distilbert-base-uncased`
to version `1.0.0`, you can use
`semitechnologies/transformers-inference:distilbert-base-uncased-1.0.0`.

Your favorite model is not included? [Open an issue](https://github.com/semi-technologies/weaviate/issues) to include it or build
a custom image as outlined below.

### Option 2: Use any publically available Huggingface Model

You can build a Docker image which supports any model from the [Huggingface model hub](https://huggingface.co/models) with a two-line Dockerfile. In the following example, we are going to build a custom image for the [`distilroberta-base` model](https://huggingface.co/distilroberta-base). 

##### Step 1: Create a `Dockerfile`
Create a new `Dockerfile`. We will name it `distilroberta.Dockerfile`. Add the following lines to it: 
```
FROM semitechnologies/transformers-inference:custom
RUN MODEL_NAME=distilroberta-base ./download.py
```

##### Step 2: Build and tag your Dockerfile.
We will tag our Dockerfile as `distilroberta-inference`:
```
docker build -f distilroberta.Dockerfile -t distilroberta-inference .
```

##### Step 3: That's it!
You can now push your image to your favorite registry or reference it locally in your Weaviate `docker-compose.yaml` using the Docker tag `distilroberta-inference`.


### Option 3: Custom build with a private or local model

You can build a Docker image which supports any model which is compatible with
Huggingface's `AutoModel` and `AutoTokenzier`.

In the following example, we are going to build a custom image for a non-public
model which we have locally stored at `./my-model`.

Create a new `Dockerfile` (you do not need to clone this repository, any folder
on your machine is fine), we will name it `my-model.Dockerfile`. Add the
following lines to it:

```
FROM semitechnologies/transformers-inference:custom
COPY ./my-model /app/models/model
```

The above will make sure that your model end ups in the image at
`/app/models/model`. This path is important, so that the application can find the
model.

Now you just need to build and tag your Dockerfile, we will tag it as
`my-model-inference`:

```
$ docker build -f my-model.Dockerfile -t my-model-inference .
```

That's it! You can now push your image to your favorite registry or reference
it locally in your Weaviate `docker-compose.yaml` using the Docker tag
`my-model-inference`.

To debug and test if your inference container is working correctly, you can send queries to the vectorizer module’s inference container directly, so you can see exactly what vectors it would produce for which input. To do so, you need to expose the inference container in your docker-compose by adding:
```yaml
ports:
  - "9090:8080"
```
to your `text2vec-transformers`. 

Then you can send REST requests to it directly, e.g. `curl localhost:9090/vectors -d '{"text": "foo bar"}'` and it will print the created vector directly. 

# How to configure

​In your Weaviate schema, you must define how you want this module to vectorize your data. If you are new to Weaviate schemas, you might want to check out the [getting started guide on the Weaviate schema](../getting-started/schema.html) first.

For example:

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "moduleConfig": {
        "text2vec-transformers": {
          "poolingStrategy": "masked_mean",
          "vectorizeClassName": false
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "Content that will be vectorized",
          "moduleConfig": {
            "text2vec-transformers": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "content"
        }
      ],
      "vectorizer": "text2vec-transformers"
    }
  ]
}
```

# How to use

* New GraphQL vector search parameters made available by this module can be found [here](../graphql-references/vector-search-parameters.html#neartext).

## Example

{% include code/1.x/graphql.filters.nearText.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

# Additional information

## Transformers-specific module configuration (on classes and properties)

You can use the same module-configuration on your classes and properties which you already know from the `text2vec-contextionary` module. This includes `vectorizeClassName`, `vectorizePropertyName` and `skip`.

In addition you can use a class-level module config to select the pooling strategy with `poolingStrategy`. Allowed values are `masked_mean` or `cls`. They refer to different techniques to obtain a sentence-vector from individual word vectors as outlined in the [Sentence-BERT paper](https://arxiv.org/abs/1908.10084).

# More resources

{% include docs-support-links.html %}
