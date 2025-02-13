---
title: Weaviate Embeddings
sidebar_position: 0
image: og/wcs/user_guides.jpg
---

:::tip Quickstart
Follow the **[Quickstart guide](/developers/wcs/embeddings/quickstart)** to get started with Weaviate Embeddings.
:::

Weaviate Embeddings provides secure, scalable embedding generation as a fully managed service.

Weaviate Embeddings integrates with Weaviate Cloud instances to generate, store, and search embeddings without managing infrastructure.

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

    %% Weaviate Cloud container
    subgraph cloud["☁️ Weaviate Cloud"]
        %% Weaviate Embeddings section
        subgraph provider["Weaviate\nEmbeddings"]
            inference["🤖 Inference\nAPI"]
        end

        %% Weaviate section
        subgraph weaviate["Weaviate Cloud instance"]
            vectorizer["🔌 Weaviate Embeddings\nIntegration"]
            core["💾 Data &\nvector store"]
        end
    end

    %% User System
    subgraph user["🖥️ User System"]
        data["📄 Data"]
    end

    %% Connections with curved edges
    data --->|"1. Insert\nobjects"| core
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

With Weaviate Embeddings, you can generate embeddings for your data and queries directly from a Weaviate Cloud database instance.

This means you can perform semantic, vector and hybrid searches without the need to externally generate vector embeddings, or manage additional model providers.

Weaviate Embeddings is fully integrated with Weaviate Cloud, so you can manage your data and embeddings in one place.

## Key Features

Weaviate Embeddings offers a fully managed service for embedding generation that is integrated with Weaviate Cloud instances.

- **Single authentication**: Your Weaviate Cloud credentials are used for authorization and access to Weaviate Embeddings.
- **Unified billing**: Your billing and usage can be managed in one place through Weaviate Cloud.
- **Model selection**: Choose from our hand-picked selection of embedding models to generate embeddings that suit your use case.

## Availability

Weaviate Embeddings is a part of Weaviate Cloud, and available for Weaviate Cloud instances. It is currently not available for open-source Weaviate users.

## Additional resources

- [Model provider integrations: Weaviate Embeddings](/developers/weaviate/model-providers/weaviate/embeddings)
