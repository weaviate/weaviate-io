---
title: Embeddings (custom image)
sidebar_position: 25
image: og/docs/integrations/provider_integrations_transformers.jpg
# tags: ['model providers', 'huggingface', 'embeddings', 'transformers']
---

# Locally Hosted Transformers Embeddings + Weaviate (Custom Image)

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.vectorizer.py';
import TSCode from '!!raw-loader!../_includes/provider.vectorizer.ts';

Weaviate's integration with the Hugging Face Transformers library allows you to access their models' capabilities directly from Weaviate.

[Configure a Weaviate vector index](#configure-the-vectorizer) to use the Transformers integration, and [configure the Weaviate instance](#weaviate-configuration) with a model image, and Weaviate will generate embeddings for various operations using the specified model in the Transformers inference container. This feature is called the *vectorizer*.

This page shows how to [build a custom Transformers model image](#build-a-custom-transformers-model-image) and configure Weaviate with it, for users whose desired model is not available in [the pre-built images](./embeddings.md#available-models).

Once a custom image is built and configured, usage patterns are identical to the pre-built images.

## Build a custom Transformers model image

You can build a custom Transformers model image to use with Weaviate. This can be a public model from the Hugging Face model hub, or a compatible private or local model.

Embedding (also called 'feature extraction') models from the [Hugging Face model hub](https://huggingface.co/models) can be used with Weaviate by building a custom Docker image.

The steps to build a custom image are:

- [Create a `Dockerfile` that downloads the model](#create-a-dockerfile).
- [Build and tag the Dockerfile](#build-and-tag-the-dockerfile).
- [Use the image in your Weaviate instance](#use-the-image).

#### Create a `Dockerfile`

The `Dockerfile` to create depends on whether you are using a public model from the Hugging Face model hub, or a private or local model.

<Tabs groupId="languages">
<TabItem value="public" label="Public model">

This example creates a custom image for the [`distilroberta-base` model](https://huggingface.co/distilbert/distilroberta-base). Replace `distilroberta-base` with the model name you want to use.
<br/>

To build an image with a model from the Hugging Face Hub, create a new `Dockerfile` similar to the following.
<br/>

Save the `Dockerfile` as `my-inference-image.Dockerfile`. (You can name it anything you like.)
<br/>

```yaml
FROM semitechnologies/transformers-inference:custom
RUN MODEL_NAME=distilroberta-base ./download.py
```

</TabItem>
<TabItem value="private" label="Private/local model">

You can also build a custom image with any model that is compatible with the Transformer library's `AutoModel` and `AutoTokenizer` classes.
<br/>

To build an image with a local, custom model, create a new `Dockerfile` similar to the following, replacing `./my-model` with the path to your model folder.
<br/>

Save the `Dockerfile` as `my-inference-image.Dockerfile`. (You can name it anything you like.)
<br/>

This will creates a custom image for a model stored in a local folder `my-model` on your machine.
<br/>

```yaml
FROM semitechnologies/transformers-inference:custom
COPY ./my-model /app/models/model
```
<br/>

Do not modify `/app/models/model`, as this is the path where the application expects to find the model.

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

#### (Optional) Use the `sentence-transformers` vectorizer

:::caution Experimental feature
This is an experimental feature. Use with caution.
:::

When using a custom image, you may set the `USE_SENTENCE_TRANSFORMERS_VECTORIZER` environment variable to use the [`sentence-transformers` vectorizer](https://sbert.net/) instead of the default vectorizer from the `transformers` library.

## Configure the Weaviate instance

Once you have built and configured the custom Transformers model image, continue on to the [Transformers embeddings integrations](./embeddings.md) guide to use the model with Weaviate.

Following the above example, set the `image` parameter in the `t2v-transformers` service as the name of the custom image, e.g. `my-inference-image`.

## (Optional) Test the inference container

Once the inference container is configured and running, you can send queries it directly to test its functionality.

First, expose the inference container. If deployed using Docker, forward the port by adding the following to the `t2v-transformers` service in your `docker-compose.yml`:

```yaml
version: '3.4'
services:
  weaviate:
    # Additional settings not shown
  t2v-transformers:
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
