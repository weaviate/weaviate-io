---
title: Vector Search
sidebar_position: 20
image: og/docs/concepts.jpg
# tags: ['concepts', 'search', 'vector search', 'vector']
---

## Overview

Vector search is a similarity-based search using [vector embeddings](#vector-embeddings). This method compares vector representations of the query against those of the stored objects to find the closest matches, based on a predefined [distance metric](../../config-refs/distances.md).

In Weaviate, you can perform vector searches in multiple ways. You can search for similar objects based on [a text input](../../search/similarity.md#search-with-text), [a vector input](../../search/similarity.md#search-with-a-vector), or [an exist object](../../search/similarity.md#search-with-an-existing-object). You can even search for similar objects with other modalities such as [with images](../../search/image.md).

A vector search will retrieve the most similar objects to the query, as determined by:

- The [distance metric](#distance-metrics) used to calculate the similarity between vectors.
- Any applicable [limit or threshold](#limiting-vector-search-results).
- Any [filtering](../filtering.md) specified.

## Vector embeddings and Weaviate

The model used to generate vectors is called a vectorizer model, or an embedding model.

### Bring your own vector

Weaviate can be used with embeddings from any vectorizer model, by directly uploading the vectors to Weaviate. We refer to this as a "bring your own vector" workflow.

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#4a5568',
    'primaryTextColor': '#2d3748',
    'primaryBorderColor': '#718096',
    'lineColor': '#718096',
    'secondaryColor': '#f7fafc',
    'tertiaryColor': '#edf2f7',
    'fontFamily': 'Inter, system-ui, sans-serif',
    'fontSize': '14px',
    'lineHeight': '1.4',
    'nodeBorder': '1px',
    'mainBkg': '#ffffff',
    'clusterBkg': '#f8fafc'
  }
}}%%

flowchart LR
    %% Style definitions
    classDef systemBox fill:#f8fafc,stroke:#3182ce,stroke-width:1.5px,color:#2d3748,font-weight:bold
    classDef weaviateBox fill:#f8fafc,stroke:gray,stroke-width:0.5px,color:#2d3748,font-weight:bold
    classDef component fill:white,stroke:#a0aec0,stroke-width:1px,color:#2d3748
    classDef edgeLabel fill:white,stroke:#e2e8f0,stroke-width:1px,color:#4a5568

    %% Weaviate section
    subgraph weaviate["Weaviate"]
        core["💾 Data &\nvector store"]
    end

    %% User System
    subgraph user["🖥️ User System"]
        data["📄 Data"]
    end

    %% Connections with curved edges
    data --->|"1. Insert objects\n(with vectors)"| core

    %% Apply styles
    class user systemBox
    class weaviate weaviateBox
    class cloud cloudBox
    class provider providerBox
    class data,core,vectorizer,inference component

    %% Linkstyle for curved edges
    linkStyle default stroke:#718096,stroke-width:3px,fill:none,background-color:white
```

### Model provider integration

Weaviate also supports [integration with popular vectorizer model providers](../../model-providers/index.md) such as [Cohere](../../model-providers/cohere/index.md), [Ollama](../../model-providers/ollama/index.md), [OpenAI](../../model-providers/openai/index.md), and more.

In this workflow, the user can [configure a vectorizer for a collection](../../manage-data/collections.mdx#specify-a-vectorizer), and Weaviate will automatically generate vectors for new objects added to the collection.

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#4a5568',
    'primaryTextColor': '#2d3748',
    'primaryBorderColor': '#718096',
    'lineColor': '#718096',
    'secondaryColor': '#f7fafc',
    'tertiaryColor': '#edf2f7',
    'fontFamily': 'Inter, system-ui, sans-serif',
    'fontSize': '14px',
    'lineHeight': '1.4',
    'nodeBorder': '1px',
    'mainBkg': '#ffffff',
    'clusterBkg': '#f8fafc'
  }
}}%%

flowchart LR
    %% Style definitions
    classDef systemBox fill:#f8fafc,stroke:#3182ce,stroke-width:1.5px,color:#2d3748,font-weight:bold
    classDef weaviateBox fill:#f8fafc,stroke:gray,stroke-width:0.5px,color:#2d3748,font-weight:bold
    classDef cloudBox fill:white,stroke:#48bb78,stroke-width:2px,color:#553c9a,font-weight:bold
    classDef providerBox fill:#f8fafc,stroke:gray,stroke-width:0.5px,color:#2d3748,font-weight:bold
    classDef component fill:white,stroke:#a0aec0,stroke-width:1px,color:#2d3748
    classDef edgeLabel fill:white,stroke:#e2e8f0,stroke-width:1px,color:#4a5568

    %% Provider section
    subgraph provider["Vectorizer model provider"]
        inference["🤖 Inference API /\nLocal model"]
    end

    %% Weaviate section
    subgraph weaviate["Weaviate"]
        vectorizer["🔌 Model provider\nintegration"]
        core["💾 Data &\nvector store"]
    end

    %% User System
    subgraph user["🖥️ User System"]
        data["📄 Data"]
    end

    %% Connections with curved edges
    data --->|"1. Insert objects\n(no vector)"| core
    core --->|"2. Request\nvector"| vectorizer
    vectorizer --->|"3. Request\nvector"| inference
    inference --->|"4. Vector"| vectorizer
    vectorizer --->|"5. Vector"| core

    %% Apply styles
    class user systemBox
    class weaviate weaviateBox
    class cloud cloudBox
    class provider providerBox
    class data,core,vectorizer,inference component

    %% Linkstyle for curved edges
    linkStyle default stroke:#718096,stroke-width:3px,fill:none,background-color:white
```

:::info What happens if I provide a vector for an object in a collection with a vectorizer model?
If a vector is provided for an object, Weaviate will insert the object with the provided vector, regardless of whether a vectorizer model is configured for the collection. This allows you to import objects, for example, without having to re-generate the vectors.
:::

## Vector distance

Vector distance indicates how close, or far apart, two vectors are in high-dimensional space. This is a measure of the object's "semantic" similarity to the query, based on their vector embeddings.

In a simple example, consider colors "SkyBlue", "LightSteelBlue", and "DarkOrange". These colors can be represented as vectors in a 3D space, with the RGB values as the vector components.

| Color          | Vector (R,G,B)  |
|----------------|-----------------|
| SkyBlue        | (135, 206, 235) |
| LightSteelBlue | (176, 196, 222) |
| DarkOrange     | (255, 140, 0)   |

The vectors for "SkyBlue" and "LightSteelBlue" are much closer to each other than either is to "DarkOrange", reflecting their similarity as light blue colors versus an orange color.

If you search a vector database containing vectors for "SkyBlue" and "DarkOrange" with a query vector for "LightSteelBlue", the search would return "SkyBlue" as the closest match.

Vector search for far more complex objects, such as text, images, or audio, is based on the same principle. The vectors are generated by a model trained to represent the objects in a high-dimensional space, where the distance between vectors reflects the similarity between the objects.

### Distance metrics

There are many ways to measure vector distances, such as cosine distance, dot product, and Euclidean distance. Weaviate supports a variety of these distance metrics, as listed on the [distance metrics](../../config-refs/distances.md) page. Each vectorizer model is trained with a specific distance metric, so it is important to use the same distance metric for search as was used for training the model.

#### Distance vs Similarity

In a "distance", the lower the value, the closer the vectors are to each other. In a "similarity", or "certainty" score, the higher the value, the closer the vectors are to each other.

Weaviate uses cosine distance as the default distance metric for vector searches, as this is the typical distance metric for vectorizer models.

### Limiting vector search results

As vector search is based on the idea of similarity.


### Limitations of vector search

Vector search is based on the idea of similarity. As such, a vector search will have some some "top" search results, even if the query is not similar to any objects in the dataset.

If you search a vector database containing vectors for colors "Red", "Crimson" and "LightCoral" with a query vector for "SkyBlue", the search will still return a result (e.g. "Red"), even if it is not semantically similar to the query. The search is simply returning the closest match, even if it is not a good match in the absolute sense.



