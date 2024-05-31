---
title: Multimodal Embeddings (custom)
sidebar_position: 35
image: og/docs/integrations/provider_integrations_transformers.jpg
# tags: ['model providers', 'huggingface', 'embeddings', 'clip']
---

# Locally Hosted CLIP Embeddings + Weaviate (Custom Image)

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.vectorizer.py';
import TSCode from '!!raw-loader!../_includes/provider.vectorizer.ts';

Weaviate's integration with the Hugging Face Transformers library allows you to access their CLIP models' capabilities directly from Weaviate.

[Configure a Weaviate vector index](#configure-the-vectorizer) to use the CLIP integration, and [configure the Weaviate instance](#weaviate-configuration) with a model image, and Weaviate will generate embeddings for various operations using the specified model in the CLIP inference container. This feature is called the *vectorizer*.

This page shows how to [build a custom CLIP model image](#build-a-custom-clip-model-image) and configure Weaviate with it, for users whose desired model is not available in [the pre-built images](./embeddings-multimodal.md#available-models).

Once a custom image is built and configured, usage patterns are identical to the pre-built images.

## Build a custom CLIP model image

You can build a custom CLIP model image to use with Weaviate. This can be a public model from the Hugging Face model hub, or a compatible private or local model.

Any **public SBERT CLIP** models from the [Hugging Face model hub](https://huggingface.co/models) can be used with Weaviate by building a custom Docker image.

The steps to build a custom image are:

- [Create a `Dockerfile` that downloads the model](#create-a-dockerfile).
- [Build and tag the Dockerfile](#build-and-tag-the-dockerfile).
- [Use the image in your Weaviate instance](#use-the-image).

#### Create a `Dockerfile`

The `Dockerfile` to create depends on whether you are using a public model from the Hugging Face model hub, or a private or local model.

<Tabs groupId="languages">
<TabItem value="public" label="Public model">

This example creates a custom image for the [`clip-ViT-B-32` model](https://huggingface.co/sentence-transformers/clip-ViT-B-32). Replace `clip-ViT-B-32` with the model name you want to use.
<br/>

To build an image with a model from the Hugging Face Hub, create a new `Dockerfile` similar to the following.
<br/>

Save the `Dockerfile` as `my-inference-image.Dockerfile`. (You can name it anything you like.)
<br/>

```yaml
FROM semitechnologies/multi2vec-clip:custom
RUN CLIP_MODEL_NAME=clip-ViT-B-32 TEXT_MODEL_NAME=clip-ViT-B-32 ./download.py
```

</TabItem>
<TabItem value="private" label="Private/local model">

You can also build a custom image with any model that is compatible with the Transformer library's `SentenceTransformers` and `ClIPModel` classes. To ensure that text embeddings will output compatible vectors to image embeddings, you must only use models that have been specifically trained for use with CLIP models. (Note that a CLIP model is in reality two models: one for text and one for images.)
<br/>

To build an image with a local, custom model, create a new `Dockerfile` similar to the following, replacing `./my-test-model` and `./my-clip-model` with the path to your model folder.
<br/>

Save the `Dockerfile` as `my-inference-image.Dockerfile`. (You can name it anything you like.)
<br/>

This will creates a custom image for a model stored in a local folder `my-model` on your machine.
<br/>

```yaml
FROM semitechnologies/multi2vec-clip:custom
COPY ./my-text-model /app/models/text
COPY ./my-clip-model /app/models/clip
```
<br/>

Do not modify `/app/models/text` or `/app/models/clip`, as these are the paths where the application expects to find the model files.

</TabItem>
</Tabs>

#### Build and tag the Dockerfile.

Tag the Dockerfile with a name, for example `my-inference-image`:

```shell
docker build -f my-inference-image.Dockerfile -t my-inference-image .
```

#### (Optional) Push the image to a registry

If you want to use the image in a different environment, you can push it to a Docker registry:

```shell
docker push my-inference-image
```

#### Use the image

[Specify the image in your Weaviate configuration](./embeddings.md#weaviate-configuration), such as in `docker-compose.yml`, using the chosen local Docker tag (e.g. `my-inference-image`), or the image from the registry.

## Configure the Weaviate instance

Once you have built and configured the custom Transformers model image, continue on to the [CLIP embeddings integrations](./embeddings-multimodal.md) guide to use the model with Weaviate.

Following the above example, set the `image` parameter in the `multi2vec-clip` service as the name of the custom image, e.g. `my-inference-image`.

## (Optional) Test the inference container

Once the inference container is configured and running, you can send queries it directly to test its functionality.

First, expose the inference container. If deployed using Docker, forward the port by adding the following to the `multi2vec-clip` service in your `docker-compose.yml`:

```yaml
version: '3.4'
services:
  weaviate:
    # Additional settings not shown
  multi2vec-clip:
    # Additional settings not shown
    ports:
      - "9090:8080"  # Add this line to expose the container
```

Once the container is running and exposed, you can send REST requests to it directly, e.g.:

```shell
curl localhost:9090/vectors -H 'Content-Type: application/json' -d '{"text": "foo bar"}'
```

If the container is running and configured correctly, you should receive a response with the vector representation of the input text.

### External resources

- Hugging Face [Model Hub](https://huggingface.co/models)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
