---
title: Example use cases and demos
sidebar_position: 6
image: og/docs/more-resources.jpg
# tags: ['use cases']
---
import Badges from '/_includes/badges.mdx';

<Badges/>


This page illustrates various use cases for [vector databases](https://weaviate.io/blog/what-is-a-vector-database) by way of open-source demo projects. You can fork and modify any of them.

If you would like to contribute your own project to this page, please let us know by creating an issue on [GitHub](https://github.com/weaviate/weaviate-io/issues).

:::info
During October 1-31, 2023, we are hosting a community sprint to onboard engineers and machine learning practitioners to their first open source contribution.

Demos that are marked with a pumpkin 🎃 sign are looking for contributions.
:::

## Similarity search

A vector databases enables fast, efficient similarity searches on and across any modalities, such as text or images, as well as their combinations. Vector database' similarity search capabilities can be used for other complex use cases, such as recommendation systems in classical machine learning applications.

|Title | Description | Modality | Code | Demo |
| --- | --- | --- | --- | --- |
| 🎃 Plant search | Semantic search over plants.  | Text | [Javascript](https://github.com/weaviate/weaviate-examples/tree/main/plant-information-searching-using-NodeJs) | n/a |
| 🎃 Wine search | Semantic search over wines. | Text | [Python](https://github.com/weaviate/weaviate-examples/tree/main/semanticsearch-transformers-wines) | n/a |
| Movie recommender system | Find similar movies. | Text | 🛠️ | 🛠️ |
| 🎃 Multilingual Wikipedia Search | Search through Wikipedia in multiple languages. | Text | [TypeScript](https://github.com/weaviate/weaviate-examples/tree/main/cohere-multilingual-wikipedia-search/frontend) |n/a |
| 🎃 Podcast search | Semantic search over podcast episodes. | Text | [Python](https://github.com/weaviate/weaviate-examples/tree/main/podcast-semantic) | n/a |
| 🎃 Video Caption Search| Find the timestamp of the answer to your question in a video. | Text | [Python](https://github.com/weaviate/weaviate-examples/tree/main/caption%20search) | n/a |
| 🎃 Facial Recognition | Identify people in images | Image | [Python](https://github.com/weaviate/weaviate-examples/tree/main/attendance-system-example), [Python](https://github.com/weaviate/weaviate-examples/tree/main/face-recognition-app) | n/a |
| 🎃 [Dog Search](https://weaviate.io/blog/how-to-build-an-image-search-application-with-weaviate) | Find images of similar dog breeds based on uploaded image. | Image | [Python](https://github.com/weaviate/weaviate-examples/tree/main/nearest-neighbor-dog-search) | n/a |
| 🎃 Text to image search | Find images most similar to a text query. | Multimodal | [Javascript](https://github.com/weaviate/weaviate-examples/tree/main/clip-multi-modal-text-image-search) | n/a |
| 🎃 Text to image and image to image search | Find images most similar to a text or image query. | Multimodal | [Python](https://github.com/weaviate/weaviate-examples/tree/main/exploring-multi2vec-clip-with-Python-and-flask) | n/a |

## LLMs and search

Vector databases and LLMs go together like cookies and milk!

Vector databases help to address some of large language models (LLMs) limitations, such as hallucinations, by helping to retrieve the relevant information to provide to the LLM as a part of its input.

|Title | Description | Subcategory | Code | Demo |
| --- | --- | --- | --- | --- |
| Verba, the golden RAGtriever | Chat with Weaviate documentation and blog posts. | Retrieval-Augmented Generation | [code](https://github.com/weaviate/Verba) | [Python](https://verba.weaviate.io/) |
| [HealthSearch](https://weaviate.io/blog/healthsearch-demo) | Recommendation system of health products based on symptoms. | Generative search  | [code](https://github.com/weaviate/healthsearch-demo) | [Python](https://healthsearch-frontend.onrender.com/) |
| [AirBnB Listings](https://weaviate.io/blog/generative-feedback-loops-with-llms) | Generation of customized advertisements for AirBnB listings. | Generative feedback loops | [Python](https://github.com/weaviate/Generative-Feedback-Loops/) | n/a |

Learn more in our [LLMs and Search](https://weaviate.io/blog/llms-and-search) blog post.

## Classification

Weaviate can leverage its vectorization capabilities to enable automatic, real-time classification of unseen, new concepts based on its semantic understanding.

|Title | Category | Modality | Code | Demo |
| --- | --- | --- | --- | --- |
| 🎃 Toxic Comment Classification | Clasify whether a comment is toxic or non-toxic. | Text | [code](https://github.com/weaviate/weaviate-examples/tree/main/weaviate-toxic-comment-classifier) | n/a |
| 🎃 Audio Genre Classification | Classify the music genre of an audio file. | Image | [code](https://github.com/weaviate/weaviate-examples/tree/main/audio-genre-classification) | n/a |

## Other use cases

Weaviate's [modular ecosystem](https://weaviate.io/developers/weaviate/modules) unlocks many other use cases of the Weaviate vector database, such as [Named Entity Recogniction](https://weaviate.io/developers/weaviate/modules/reader-generator-modules/ner-transformers) or [spell checking](https://weaviate.io/developers/weaviate/modules/other-modules/spellcheck).

|Title | Description | Subcategory | Code | Demo |
| --- | --- | --- | --- | --- |
| 🎃 Named Entity Recognition (NER)| tbd | NER | [code](https://github.com/weaviate/weaviate-examples/tree/main/example-with-NER-module) | n/a |

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
