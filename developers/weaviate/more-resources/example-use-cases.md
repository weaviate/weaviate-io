---
title: Example use cases and demos
sidebar_position: 6
image: og/docs/more-resources.jpg
# tags: ['use cases']
---



This page illustrates various use cases for [vector databases](https://weaviate.io/blog/what-is-a-vector-database) by way of open-source demo projects. You can fork and modify any of them.

If you would like to contribute your own project to this page, please let us know by creating an issue on [GitHub](https://github.com/weaviate/weaviate-io/issues).

## Similarity search

A vector databases enables fast, efficient similarity searches on and across any modalities, such as text or images, as well as their combinations. Vector database' similarity search capabilities can be used for other complex use cases, such as recommendation systems in classical machine learning applications.

|Title | Description | Modality | Code |
| --- | --- | --- | --- |
| Plant search | Semantic search over plants.  | Text | [JavaScript](https://github.com/weaviate-tutorials/DEMO-text-search-plants) |
| Wine search | Semantic search over wines. | Text | [Python](https://github.com/weaviate-tutorials/DEMO-text-search-wines) |
| Book recommender system ([Video](https://www.youtube.com/watch?v=SF1ZlRjVsxw), [Demo](https://bookrecs.weaviate.io/)) | Find book recommendations based on search query. | Text | [TypeScript](https://github.com/weaviate/BookRecs) |
| Movie recommender system ([Blog](https://medium.com/towards-data-science/recreating-andrej-karpathys-weekend-project-a-movie-search-engine-9b270d7a92e4)) | Find similar movies. | Text | [JavaScript](https://github.com/weaviate-tutorials/awesome-moviate) |
| Multilingual Wikipedia Search | Search through Wikipedia in multiple languages. | Text | [TypeScript](https://github.com/weaviate/weaviate-examples/tree/main/cohere-multilingual-wikipedia-search/frontend) |
| Podcast search | Semantic search over podcast episodes. | Text | [Python](https://github.com/weaviate-tutorials/DEMO-semantic-search-podcast) |
| Video Caption Search| Find the timestamp of the answer to your question in a video. | Text | [Python](https://github.com/weaviate-tutorials/DEMO-text-search-video-captions) |
| Facial Recognition | Identify people in images | Image | [Python](https://github.com/weaviate-tutorials/DEMO-face-recognition) |
| Image Search over dogs ([Blog](https://weaviate.io/blog/how-to-build-an-image-search-application-with-weaviate)) | Find images of similar dog breeds based on uploaded image. | Image | [Python](https://github.com/weaviate-tutorials/DEMO-image-search-dogs) |
| Text to image search | Find images most similar to a text query. | Multimodal | [JavaScript](https://github.com/weaviate-tutorials/DEMO-multimodal-text-to-image-search) |
| Text to image and image to image search | Find images most similar to a text or image query. | Multimodal | [Python](https://github.com/weaviate-tutorials/DEMO-multimodal-search) |

## LLMs and search

Vector databases and LLMs go together like cookies and milk!

Vector databases help to address some of large language models (LLMs) limitations, such as hallucinations, by helping to retrieve the relevant information to provide to the LLM as a part of its input.

|Title | Description | Modality | Code |
| --- | --- | --- | --- |
| Verba, the golden RAGtriever ([Video](https://www.youtube.com/watch?v=OSt3sFT1i18 ), [Demo](https://verba.weaviate.io/)) | Retrieval-Augmented Generation (RAG) system to chat with Weaviate documentation and blog posts. | Text | [Python](https://github.com/weaviate/Verba) |
| HealthSearch ([Blog](https://weaviate.io/blog/healthsearch-demo), [Demo](https://healthsearch-frontend.onrender.com/)) | Recommendation system of health products based on symptoms. | Text  | [Python](https://github.com/weaviate/healthsearch-demo) |
| Magic Chat | Search through Magic The Gathering cards | Text | [Python](https://github.com/weaviate/st-weaviate-connection/tree/main) |
| AirBnB Listings ([Blog](https://weaviate.io/blog/generative-feedback-loops-with-llms)) | Generation of customized advertisements for AirBnB listings with Generative Feedback Loops | Text | [Python](https://github.com/weaviate/Generative-Feedback-Loops/) |
| Distyll | Summarize text or video content. | Text | [Python](https://github.com/databyjp/distyll) |


Learn more in our [LLMs and Search](https://weaviate.io/blog/llms-and-search) blog post.

## Classification

Weaviate can leverage its vectorization capabilities to enable automatic, real-time classification of unseen, new concepts based on its semantic understanding.

|Title | Description | Modality | Code |
| --- | --- | --- | --- |
| Toxic Comment Classification | Clasify whether a comment is toxic or non-toxic. | Text | [Python](https://github.com/weaviate-tutorials/DEMO-classification-toxic-comment) |
| Audio Genre Classification | Classify the music genre of an audio file. | Image | [Python](https://github.com/weaviate-tutorials/DEMO-classification-audio-genre/) |

## Other use cases

Weaviate's [modular ecosystem](https://weaviate.io/developers/weaviate/modules) unlocks many other use cases of the Weaviate vector database, such as [Named Entity Recognition](https://weaviate.io/developers/weaviate/modules/reader-generator-modules/ner-transformers) or [spell checking](https://weaviate.io/developers/weaviate/modules/other-modules/spellcheck).

|Title | Description | Code |
| --- | --- | --- |
| Named Entity Recognition (NER)| tbd |  [Python](https://github.com/weaviate/weaviate-examples/tree/main/example-with-NER-module) |


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
