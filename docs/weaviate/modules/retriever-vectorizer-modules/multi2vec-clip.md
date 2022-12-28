---
title: multi2vec-clip
sidebar_position: 6

# layout: layout-documentation
# solution: weaviate
# sub-menu: Retrievers & Vectorizers
# nav-parent: Modules
# description: Use OpenAI's CLIP model within Weaviate
# tags: ['multi2vec-clip']
# open-graph-type: article
# toc: true
# redirect_from:
#     - /docs/weaviate/v1.11.0/retriever-vectorizer-modules/multi2vec-clip.html
#     - /docs/weaviate/modules/multi2vec-clip.html
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Introduction

The `multi2vec-clip` module allows you to use a pre-trained Sentence-BERT CLIP model as a Weaviate vectorization module. To use CLIP with Weaviate, the `multi2vec-clip` module needs to be enabled. The models typically bring separate inference containers. This allows for efficient scaling and resource planning. Neural-Network-based models run most efficiently on GPU-enabled serves, yet Weaviate is CPU-optimized. This separate-container microservice setup allows you to very easily host (and scale) the model independently on GPU-enabled hardware while keeping Weaviate on cheap CPU-only hardware.

To choose your specific model, you simply need to select the correct Docker container. There is a selection of pre-built Docker images available, but you can also build your own with a simple two-line Dockerfile.

## How to use

You have three options to select your desired model:

1. **Use [any of our pre-built clip model containers](#pre-built-images).** These model containers are pre-built by us, and packed in a container. (If you think we should support another model out-of-the-box [please open an issue or pull request here](https://github.com/semi-technologies/weaviate/issues)).
2. **Use any SBERT Clip model from HuggingFace Model Hub.** [Click here to learn how](#option-2-use-any-publically-available-huggingface-model). The `multi2vec-clip` module supports any CLIP-based transformer model compatible with `SentenceTransformers`. 
3. **Use any private or SBERT Clip model.** [Click here to learn how](#option-3-custom-build-with-a-private-or-local-model). If you have your own CLIB-based `SentenceTransformers` model in a registry or on a local disk, you can use this with Weaviate.

## Option 1: Use a pre-built transformer model container

### Example docker-compose file
Note: you can also use the [Weaviate configuration tool](/docs/weaviate/installation/docker-compose.md#configurator).

You can find an example Docker-compose file below, which will spin up Weaviate with the multi2vec-clip module. In this example we have selected the `sentence-transformers/clip-ViT-B-32-multilingual` which works great for vectorizing images and text in the same vector space. It even supports multiple languages. See below for how to select an alternative model.

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
    image: semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      CLIP_INFERENCE_API: 'http://multi2vec-clip:8080'
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'multi2vec-clip'
      ENABLE_MODULES: 'multi2vec-clip'
      CLUSTER_HOSTNAME: 'node1'
  multi2vec-clip:
    image: semitechnologies/multi2vec-clip:sentence-transformers-clip-ViT-B-32-multilingual-v1
    environment:
      ENABLE_CUDA: '0'
...
```

Note that running Weaviate with the multi2vec-clip module but without a GPU will be
slower than on CPUs. Enable CUDA if you have a GPU available (`ENABLE_CUDA=1`).

### Alternative: configure your custom setup

*Note: The following steps are only required if you want to manually add the module to an existing setup. If you are starting from scratch, a much more convenient option is to use our [configuration and customization tool](/docs/weaviate/installation/docker-compose.md#configurator).*

#### Step 1: Enable the `multi2vec-clip` module
Make sure you set the `ENABLE_MODULES=multi2vec-clip` environment variable. Additionally, make this module the default vectorizer, so you don't have to specify it on each schema class: `DEFAULT_VECTORIZER_MODULE=multi2vec-clip`

#### Step 2: Run your favorite model

Choose [any of our pre-built CLIP models](/docs/weaviate/installation/docker-compose.md#configurator) (for building your own model container, see below) and spin it up with your setup. Use a CUDA-enabled machine for optimal performance.

#### Step 3: Tell Weaviate where to find the inference 

Set the Weaviate environment variable `CLIP_INFERENCE_API` to where your inference container is running, for example `TRANSFORMERS_INFERENCE_API="http://multi2vec-clip:8000"` (Adjust hostname and port accordingly)

You can now use Weaviate normally and all vectorization during import and search time will be done with the selected CLIP transformers model.

## Option 2: Use any publically available SBERT Clip Model from the Huggingface Model Hub

You can build a docker image which supports any model from the [Huggingface model hub](https://huggingface.co/models) with a two-line Dockerfile. In the following example, we are going to build a custom image for the [`clip-ViT-B-32` model](https://huggingface.co/sentence-transformers/clip-ViT-B-32). *Note: This model exists as a pre-built container, you don't have to build it yourself. This is just to outline the process.*

#### Step 1: Create a `Dockerfile`
Create a new `Dockerfile`. We will name it `clip.Dockerfile`. Add the following lines to it: 
```
FROM semitechnologies/transformers-inference:custom
RUN CLIP_MODEL_NAME=clip-ViT-B-32 TEXT_MODEL_NAME=clip-ViT-B-32 ./download.py
```

#### Step 2: Build and tag your Dockerfile.
We will tag our Dockerfile as `clip-inference`:
```
docker build -f clip.Dockerfile -t clip-inference .
```

#### Step 3: That's it!
You can now push your image to your favorite registry or reference it locally in your Weaviate `docker-compose.yaml` using the docker tag `clip-inference`.


## Option 3: Custom build with a private or local model

You can build a docker image which supports any model which is compatible with
`SentenceTransformers` `ClIPModel`. Additionally, the text model can be a
regular sentence-transformers model, but it must produce compatible vector
representations. So, only use models that have been specifically trained for
use with CLIP models.

In the following example, we are going to build a custom image for a non-public
model which we have locally stored at `./my-clip-model` and `./my-text-model`.
Both models were trained to produce embeddings which are compatible with one
another.

Create a new `Dockerfile` (you do not need to clone this repository, any folder
on your machine is fine), we will name it `my-models.Dockerfile`. Add the
following lines to it:

```
FROM semitechnologies/transformers-inference:custom
COPY ./my-text-model /app/models/text
COPY ./my-clip-model /app/models/clip
```

The above will make sure that your model ends up in the image at
`/app/models/clip` and `/app/models/text` respectively.. This path is
important, so that the application can find the
model.

Now you just need to build and tag your Dockerfile, we will tag it as
`my-models-inference`:

```
$ docker build -f my-models.Dockerfile -t my-models-inference .
```

That's it! You can now push your image to your favorite registry or reference
it locally in your Weaviate `docker-compose.yaml` using the Docker tag
`my-models-inference`.

To debug if your inference container is working correctly, you can send queries
to the vectorizer module's inference container directly, so you can see exactly
what vectors it would produce for which input. To do so, you need to expose the
inference container. in your Docker-compose add something like
```yaml
ports:
  - "9090:8080"
```
to your `t2v-transformers`. 

Then you can send REST requests to it directly, e.g. `curl
localhost:9090/vectorize -d '{"texts": ["foo bar"], "images":[]}'` and it will
print the created vector(s) directly. 

## Schema Configuration for CLIP-vectorized Classes

The following is a valid payload for a class that vectorizes both images and
text fields using the `multi2vec-clip` module as a `vectorizer`:

```json
{
  "classes": [
    {
      "class": "ClipExample",
      "moduleConfig": {
        "multi2vec-clip": {
          "imageFields": [
            "image"
          ],
          "textFields": [
            "name"
          ],
          "weights": {
            "textFields": [0.7],
            "imageFields": [0.3]
          }
        }
      },
      "properties": [
        {
          "dataType": [
            "string"
          ],
          "name": "name"
        },
        {
          "dataType": [
            "blob"
          ],
          "name": "image"
        }
      ],
      "vectorIndexType": "hnsw",
      "vectorizer": "multi2vec-clip"
    }
  ]
}
```

Note that:
 - `imageFields` and `textFields` in `moduleConfig.multi2vec-clip` do not both
   need to be set. However, at least one of both must be set.
 - `weights` in `moduleConfig.multi2vec-clip` is optional. If only a single
   property, the property takes all the weight. If multiple properties exist and
   no weights are specified, the properties are equal-weighted.

You can then import data objects for the class as usual. Fill the `text` or
`string` fields with text and/or fill the `blob` fields with a base64-encoded
image.

### Limitations
  -  As of `v1.9.0`, the module requires explicit creation of a class. If you
     rely on auto-schema to create the class for you, it will be missing the
     required configuration about which fields should be vectorized. This will
     be addressed in a future release. You can always manually update a class
     schema config that was incorrectly created by Auto-schema and fix it
     yourself.

## Additional GraphQL API parameters

### nearText

The `multi2vec-clip` vectorizer module adds two search operators for `Get {}`
and `Explore {}` GraphQL functions: `nearText: {}` and `nearImage: {}`. These
operators can be used for semantically searching both text and images in your
dataset. 

Note: In the same query, you cannot use multiple `'near'` filters, or a `'near'`
filter along with an [`'ask'`](../reader-generator-modules/qna-transformers)
filter!

#### Example GraphQL Get(`nearText{}`) operator

import CodeNearText from '/_includes/code/graphql.filters.nearText.mdx';

<CodeNearText />

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

<!-- {% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %} -->


#### Example GraphQL Get(`nearImage{}`) operator

import CodeNearImage from '/_includes/code/img2vec-neural.nearimage.mdx';

<CodeNearImage />

Alternatively, you can use a helper function in the Python, Java or Go client (not with the JavaScript client). With an encoder function, you can input your image as `png` file, and the helper function encodes this to a `base64` encoded value.

import CodeNearImageEncode from '/_includes/code/img2vec-neural.nearimage.encode.mdx';

<CodeNearImageEncode />

### Distance

You can set a maximum allowed `distance`, which will be used to determine which
data results to return. The interpretation of the value of the distance field
depends on the [distance metric used](/docs/weaviate/configuration/distances.md).

If the distance metric is `cosine` you can also use `certainty` instead of
`distance`. Certainty normalizes the distance in a range of 0..1, where 0
represents a perfect opposite (cosine distance of 2) and 1 represents vectors
with an identical angle (cosine distance of 0). Certainty is not available on
non-cosine distance metrics.

### Moving

Because pagination is not possible in multidimensional storage, you can improve your results with additional explore functions which can move away from semantic concepts or towards semantic concepts. E.g., if you look for the concept 'New York Times' but don't want to find the city New York, you can use the `moveAwayFrom{}` function by using the words 'New York'. This is also a way to exclude concepts and to deal with negations (`not` operators in similar query languages). Concepts in the `moveAwayFrom{}` filter are not per definition excluded from the result, but the resulting concepts are further away from the concepts in this filter.

Moving can be done based on `concepts` and/or `objects`. 
* `concepts` requires a list of one or more words
* `objects` requires a list of one or more objects, given by their `id` or `beacon`. For example:

```graphql
{
  Get{
    Publication(
      nearText: {
        concepts: ["fashion"],
        distance: 0.6,
        moveTo: {
            objects: [{
                beacon: "weaviate://localhost/Article/e5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf"
            }, {
                id: "9f0c7463-8633-30ff-99e9-fd84349018f5" 
            }],
            concepts: ["summer"],
            force: 0.9
        }
      }
    ){
      name
      _additional {
        distance
        id
      }
    }
  }
}
```

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
