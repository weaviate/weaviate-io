---
title: text2vec-transformers
sidebar_position: 21
image: og/docs/modules/text2vec-transformers.jpg
# tags: ['text2vec', 'text2vec-transformers']
---


## Overview

The `text2vec-transformers` module enables Weaviate to obtain vectors locally from text using a transformers-based model.

`text2vec-transformers` encapsulates models in Docker containers, which allows independent scaling on GPU-enabled hardware while keeping Weaviate on CPU-only hardware, as Weaviate is CPU-optimized.

Key notes:

- This module is not available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- This module is only compatible with models encapsulated in a Docker container.
- [Pre-built images](#option-1-pre-built-images) are available with popular models.
- You can also use other models, such as:
    - By [building an image](#option-2-a-hugging-face-model) for any publicly available model from the [Hugging Face model hub](https://huggingface.co/models).
    - By [building an image](#option-3-a-private-or-local-model) for any model compatible with Hugging Face's `AutoModel` and `AutoTokenizer`.

:::tip Do you have GPU acceleration?

Transformer model inference speeds are usually about ten times faster with GPUs. If you have a GPU, use one of the GPU enabled models.<br/><br/>

If you use `text2vec-transformers` without GPU acceleration, imports or `nearText` queries may become bottlenecks. The ONNX-enabled images can use [ONNX Runtime](https://onnxruntime.ai/) for faster inference processing on CPUs. Look for the `-onnx` suffix in the image name.<br/><br/>

Alternatively, consider one of the following options:

- an API-based module such as [`text2vec-cohere`](./text2vec-cohere.md) or [`text2vec-openai`](./text2vec-openai.md)
- a local inference container such as [`text2vec-contextionary`](./text2vec-contextionary.md) or [`text2vec-gpt4all`](./text2vec-gpt4all.md)

:::

## Weaviate instance configuration

:::info Not applicable to WCS
This module is not available on Weaviate Cloud Services.
:::

### Docker Compose file

To use `text2vec-transformers`, you must enable it in your Docker Compose file (e.g. `docker-compose.yml`).

:::tip Use the configuration tool
While you can do so manually, we recommend using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator) to generate the `Docker Compose` file.
:::

#### Parameters

Weaviate:

- `ENABLE_MODULES` (Required): The modules to enable. Include `text2vec-transformers` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `text2vec-transformers` to make it the default for all classes.
- `TRANSFORMERS_INFERENCE_API` (Required): The URL of the inference container.
- `USE_SENTENCE_TRANSFORMERS_VECTORIZER` (Optional): (EXPERIMENTAL) Use the `sentence-transformer` vectorizer instead of the default vectorizer (from the `transformers` library). Applies to custom images only.

Inference container:

- `image` (Required): The image name of the inference container.
- `ENABLE_CUDA` (Optional): Set to `1` to enable GPU usage. Default is `0` (CPU only).

#### Example

This configuration enables `text2vec-transformers`, sets it as the default vectorizer, and sets the parameters for the Transformers Docker container, including setting it to use `sentence-transformers-multi-qa-MiniLM-L6-cos-v1` image and to disable CUDA acceleration.

```yaml
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
      ENABLE_MODULES: text2vec-transformers
      DEFAULT_VECTORIZER_MODULE: text2vec-transformers
      TRANSFORMERS_INFERENCE_API: http://t2v-transformers:8080
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
# highlight-start
  t2v-transformers:
    image: cr.weaviate.io/semitechnologies/transformers-inference:sentence-transformers-multi-qa-MiniLM-L6-cos-v1
    environment:
      ENABLE_CUDA: 0 # set to 1 to enable
# highlight-end
...
```

:::note Have you enabled CUDA?
Make sure to enable CUDA if you have a compatible GPU available (`ENABLE_CUDA=1`) to take advantage of GPU acceleration.
:::


### Alternative: Run a separate container

As an alternative, you can run the inference container independently from Weaviate. To do so, you can:

- Enable `text2vec-transformers` in your Docker Compose file,
- Omit `t2v-transformers` parameters,
- Run the inference container separately, e.g. using Docker, and
- Set `TRANSFORMERS_INFERENCE_API` to the URL of the inference container.

For example, choose [any of our pre-built transformers models](#option-1-pre-built-images) and spin it up - for example using:

```shell
docker run -itp "8000:8080" semitechnologies/transformers-inference:sentence-transformers-multi-qa-MiniLM-L6-cos-v1
```

Then, for example if Weaviate is running outside of Docker, set `TRANSFORMERS_INFERENCE_API="http://localhost:8000"`. Alternatively if Weaviate is part of the same Docker network, e.g. because they are part of the same `docker-compose.yml` file, you can use Docker networking/DNS, such as `TRANSFORMERS_INFERENCE_API=http://t2v-transformers:8080`.

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each class and property:

#### Class-level

- `vectorizer` - what module to use to vectorize the data.
- `vectorizeClassName` – whether to vectorize the class name. Default: `true`.
- `poolingStrategy` – the pooling strategy to use. Default: `masked_mean`. Allowed values: `masked_mean` or `cls`. ([Read more on this topic.](https://arxiv.org/abs/1908.10084))

#### Property-level

- `skip` – whether to skip vectorizing the property altogether. Default: `false`
- `vectorizePropertyName` – whether to vectorize the property name. Default: `false`

#### Example

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      // highlight-start
      "vectorizer": "text2vec-transformers",
      "moduleConfig": {
        "text2vec-transformers": {
          "vectorizeClassName": false
        }
      },
      // highlight-end
      "properties": [
        {
          "name": "content",
          "dataType": [
            "text"
          ],
          "description": "Content that will be vectorized",
          // highlight-start
          "moduleConfig": {
            "text2vec-transformers": {
              "skip": false,
              "vectorizePropertyName": false
            }
          }
          // highlight-end
        }
      ],
    }
  ]
}
```

## Select a model

To select a model, please point `text2vec-transformers` to the appropriate Docker container.

You can use one of our pre-built Docker images, or build your own (with just a few lines of code).

This allows you to use any suitable model from the [Hugging Face model hub](https://huggingface.co/models) or your own custom model.

### Use a pre-built image

We have built images from publicly available models that in our opinion are well suited for semantic search. You can use any of the following:

|Model Name|Image Name|
|---|---|
|`distilbert-base-uncased` ([Info](https://huggingface.co/distilbert-base-uncased))|`semitechnologies/transformers-inference:distilbert-base-uncased`|
|`sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2` ([Info](https://huggingface.co/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2))|`semitechnologies/transformers-inference:sentence-transformers-paraphrase-multilingual-MiniLM-L12-v2`|
|`sentence-transformers/multi-qa-MiniLM-L6-cos-v1` ([Info](https://huggingface.co/sentence-transformers/multi-qa-MiniLM-L6-cos-v1))|`semitechnologies/transformers-inference:sentence-transformers-multi-qa-MiniLM-L6-cos-v1`|
|`sentence-transformers/multi-qa-mpnet-base-cos-v1` ([Info](https://huggingface.co/sentence-transformers/multi-qa-mpnet-base-cos-v1))|`semitechnologies/transformers-inference:sentence-transformers-multi-qa-mpnet-base-cos-v1`|
|`sentence-transformers/all-mpnet-base-v2` ([Info](https://huggingface.co/sentence-transformers/all-mpnet-base-v2))|`semitechnologies/transformers-inference:sentence-transformers-all-mpnet-base-v2`|
|`sentence-transformers/all-MiniLM-L12-v2` ([Info](https://huggingface.co/sentence-transformers/all-MiniLM-L12-v2))|`semitechnologies/transformers-inference:sentence-transformers-all-MiniLM-L12-v2`|
|`sentence-transformers/paraphrase-multilingual-mpnet-base-v2` ([Info](https://huggingface.co/sentence-transformers/paraphrase-multilingual-mpnet-base-v2))|`semitechnologies/transformers-inference:sentence-transformers-paraphrase-multilingual-mpnet-base-v2`|
|`sentence-transformers/all-MiniLM-L6-v2` ([Info](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2))|`semitechnologies/transformers-inference:sentence-transformers-all-MiniLM-L6-v2`|
|`sentence-transformers/all-MiniLM-L6-v2` ([Info](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2))|`semitechnologies/transformers-inference:sentence-transformers-all-MiniLM-L6-v2-onnx`|
|`sentence-transformers/multi-qa-distilbert-cos-v1` ([Info](https://huggingface.co/sentence-transformers/multi-qa-distilbert-cos-v1))|`semitechnologies/transformers-inference:sentence-transformers-multi-qa-distilbert-cos-v1`|
|`sentence-transformers/gtr-t5-base` ([Info](https://huggingface.co/sentence-transformers/gtr-t5-base))|`semitechnologies/transformers-inference:sentence-transformers-gtr-t5-base`|
|`sentence-transformers/gtr-t5-large` ([Info](https://huggingface.co/sentence-transformers/gtr-t5-large))|`semitechnologies/transformers-inference:sentence-transformers-gtr-t5-large`|
|`google/flan-t5-base` ([Info](https://huggingface.co/google/flan-t5-base))|`semitechnologies/transformers-inference:google-flan-t5-base`|
|`google/flan-t5-large` ([Info](https://huggingface.co/google/flan-t5-large))|`semitechnologies/transformers-inference:google-flan-t5-large`|
|`BAAI/bge-small-en-v1.5` ([Info](https://huggingface.co/BAAI/bge-small-en-v1.5))|`semitechnologies/transformers-inference:baai-bge-small-en-v1.5`|
|`BAAI/bge-base-en-v1.5` ([Info](https://huggingface.co/BAAI/bge-base-en-v1.5))|`semitechnologies/transformers-inference:baai-bge-base-en-v1.5`|
|DPR Models|
|`facebook/dpr-ctx_encoder-single-nq-base` ([Info](https://huggingface.co/facebook/dpr-ctx_encoder-single-nq-base))|`semitechnologies/transformers-inference:facebook-dpr-ctx_encoder-single-nq-base`|
|`facebook/dpr-question_encoder-single-nq-base` ([Info](https://huggingface.co/facebook/dpr-question_encoder-single-nq-base))|`semitechnologies/transformers-inference:facebook-dpr-question_encoder-single-nq-base`|
|`vblagoje/dpr-ctx_encoder-single-lfqa-wiki` ([Info](https://huggingface.co/vblagoje/dpr-ctx_encoder-single-lfqa-wiki))|`semitechnologies/transformers-inference:vblagoje-dpr-ctx_encoder-single-lfqa-wiki`|
|`vblagoje/dpr-question_encoder-single-lfqa-wiki` ([Info](https://huggingface.co/vblagoje/dpr-question_encoder-single-lfqa-wiki))|`semitechnologies/transformers-inference:vblagoje-dpr-question_encoder-single-lfqa-wiki`|
|Bar-Ilan University NLP Lab Models|
|`biu-nlp/abstract-sim-sentence` ([Info](https://huggingface.co/biu-nlp/abstract-sim-sentence))|`semitechnologies/transformers-inference:biu-nlp-abstract-sim-sentence`|
|`biu-nlp/abstract-sim-query` ([Info](https://huggingface.co/biu-nlp/abstract-sim-query))|`semitechnologies/transformers-inference:biu-nlp-abstract-sim-query`|

#### ONNX-enabled images (CPU only)

We also provide ONNX-enabled images for some models. These images use ONNX Runtime for faster inference on CPUs. They are quantized for ARM64 and AMD64 (AVX2) hardware.

Look for the `-onnx` suffix in the image name.

|Model Name|Image Name|
|---|---|
|`sentence-transformers/all-MiniLM-L6-v2` ([Info](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2))|`semitechnologies/transformers-inference:sentence-transformers-all-MiniLM-L6-v2-onnx`|
|`BAAI/bge-small-en-v1.5` ([Info](https://huggingface.co/BAAI/bge-small-en-v1.5))|`semitechnologies/transformers-inference:baai-bge-small-en-v1.5-onnx`|
|`BAAI/bge-base-en-v1.5` ([Info](https://huggingface.co/BAAI/bge-base-en-v1.5))|`semitechnologies/transformers-inference:baai-bge-base-en-v1.5-onnx`|
|`BAAI/bge-m3` ([Info](https://huggingface.co/BAAI/bge-m3))|`semitechnologies/transformers-inference:baai-bge-m3-onnx`|

#### Is your preferred model missing?

If your preferred model is missing, please [open an issue](https://github.com/weaviate/weaviate/issues) to ask us to include it. Alternatively, follow the [steps below to build](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-transformers#build-a-model) a custom image.

#### How to set the version

You can explicitly set the version through a suffix.
- Use `-1.0.0` to pin to a specific version. E.g. `semitechnologies/transformers-inference:distilbert-base-uncased-1.0.0` will always use the version with git tag `1.0.0` of the `distilbert-base-uncased` repository.
- You can explicitly set `-latest` to always use the latest version, however this is the default behavior.

### Build a model

To use a **public** model from the [Hugging Face model hub](https://huggingface.co/models), create a short, two-line Dockerfile to build the image. This example creates a custom image for the [`distilroberta-base` model](https://huggingface.co/distilroberta-base).

#### Step 1: Create a `Dockerfile`

Create a new `Dockerfile` called `distilroberta.Dockerfile`. Add the following lines to `distilroberta.Dockerfile`:

```
FROM semitechnologies/transformers-inference:custom
RUN MODEL_NAME=distilroberta-base ./download.py
```

#### Step 2: Build and tag your Dockerfile.

Tag the Dockerfile as `distilroberta-inference`:

```shell
docker build -f distilroberta.Dockerfile -t distilroberta-inference .
```

#### Step 3: Use the image

Push the image to a Docker registry or reference it locally in your Weaviate `docker-compose.yml` using the Docker tag `distilroberta-inference`.

Note: When using a custom image, you have the option of using the `USE_SENTENCE_TRANSFORMERS_VECTORIZER` environment variable to use the `sentence-transformer` vectorizer instead of the default vectorizer (from the `transformers` library).


### Use a private or local model

You can build a Docker image which supports any model which is compatible with Hugging Face's `AutoModel` and `AutoTokenizer`.

In the following example, we are going to build a custom image for a non-public model which we have locally stored at `./my-model`.

Create a new `Dockerfile` (you do not need to clone this repository, any folder on your machine is fine), we will name it `my-model.Dockerfile`. Add the following lines to it:

```
FROM semitechnologies/transformers-inference:custom
COPY ./my-model /app/models/model
```

The above will make sure that your model end ups in the image at `/app/models/model`. This path is important, so that the application can find the model.

Now you just need to build and tag your Dockerfile, we will tag it as `my-model-inference`:

```shell
docker build -f my-model.Dockerfile -t my-model-inference .
```

That's it! You can now push your image to your favorite registry or reference it locally in your Weaviate `docker-compose.yml` using the Docker tag `my-model-inference`.

To debug and test if your inference container is working correctly, you can send queries to the vectorizer module's inference container directly, so you can see exactly what vectors it would produce for which input.

To do so – you need to expose the inference container in your Docker Compose file – add something like this:

```yaml
ports:
  - "9090:8080"
```

to your `text2vec-transformers`.

Then you can send REST requests to it directly, e.g.:

```shell
curl localhost:9090/vectors -H 'Content-Type: application/json' -d '{"text": "foo bar"}'
```
and it will print the created vector directly.

## Usage

### Example

import CodeNearText from '/_includes/code/graphql.filters.nearText.mdx';

<CodeNearText />

### Chunking

The `text2vec-transformers` module can automatically chunk text based on the model's maximum token length before it is passed to the model. It will then return the pooled vectors.

See [HuggingFaceVectorizer.vectorizer()](https://github.com/weaviate/t2v-transformers-models/blob/main/vectorizer.py) for the exact implementation.


## Model licenses

The `text2vec-transformers` module is compatible with various models. Each of the models has its own license. For detailed information, please review the license for the model you are using in the [Hugging Face Model Hub](https://huggingface.co/models).

It is your responsibility to evaluate whether the terms of its license(s), if any, are appropriate for your intended use.

## Release notes

For details see, [t2v-transformers-model release notes](https://github.com/weaviate/t2v-transformers-models/releases/).

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
