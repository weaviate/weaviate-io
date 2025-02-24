---
title: Weaviate Embeddings
sidebar_position: 0
image: og/wcs/user_guides.jpg
---

Weaviate Embeddings provides secure, scalable embedding generation as a fully managed service. It integrates with Weaviate Cloud instances to generate, store, and search embeddings without managing infrastructure.

![Weaviate Embeddings flowchart](../img/weaviate-embeddings-flowchart.png "Weaviate Embeddings flowchart")

With Weaviate Embeddings, you can generate embeddings for your data and queries directly from a Weaviate Cloud database instance.

This means you can perform [keyword](/developers/weaviate/search/bm25), [vector](/developers/weaviate/search/similarity) and [hybrid searches](/developers/weaviate/search/hybrid) without the need to externally generate vector embeddings, or manage additional model providers.

Weaviate Embeddings is fully integrated with Weaviate Cloud, so you can manage your data and embeddings in one place. Weaviate Embeddings is available for Weaviate Cloud instances and is currently not available when running a local instance.

:::tip Quickstart
Follow the **[quickstart guide](/developers/wcs/embeddings/quickstart)** to get started with Weaviate Embeddings.
:::

## Key Features

Weaviate Embeddings offers a fully managed service for embedding generation that is integrated with Weaviate Cloud instances.

- **[Model selection](/developers/wcs/embeddings/models)**: Choose from our hand-picked selection of embedding models to generate embeddings that suit your use case.
- **[Single authentication](/developers/wcs/manage-clusters/connect)**: Your Weaviate Cloud credentials are used for authorization and access to Weaviate Embeddings.
- **[Unified billing](/developers/wcs/embeddings/administration#billing)**: Your billing and usage can be managed in one place through Weaviate Cloud.

## Available models

The following models are available for use with Weaviate Embeddings:

- **[`Snowflake/snowflake-arctic-embed-m-v1.5`](/developers/wcs/embeddings/models#snowflake-arctic-embed-m-v1.5)**
- **[`Snowflake/snowflake-arctic-embed-l-v2.0`](/developers/wcs/embeddings/models#snowflake-arctic-embed-l-v2.0)**

## Requirements

import Requirements from '/_includes/weaviate-embeddings-requirements.mdx';

<Requirements />

## Additional resources

- [Weaviate Embeddings: Quickstart](/developers/wcs/embeddings/quickstart)
- [Weaviate Embeddings: Choose a model](/developers/wcs/embeddings/models)
- [Weaviate Embeddings: Administration](/developers/wcs/embeddings/administration)
- [Model provider integrations: Weaviate Embeddings](/developers/weaviate/model-providers/weaviate/embeddings)

## Support

import SupportAndTrouble from '/_includes/wcs/support-and-troubleshoot.mdx';

<SupportAndTrouble />
