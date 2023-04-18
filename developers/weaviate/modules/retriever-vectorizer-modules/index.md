---
title: Retrievers & Vectorizers
sidebar_position: 0
image: og/docs/modules/vectorizers-overview.jpg
# tags: ['modules']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

This section includes reference guides for retriever & vectorizer modules. As their names suggest, `XXX2vec` modules are configured to produce a vector for each object.

- `text2vec` converts text data
- `img2vec` converts image data
- `multi2vec` converts image or text data (into the same embedding space)
- `ref2vec` converts cross-reference data (from within Weaviate)

### Vectorization with `text2vec-*` modules

You can use `text2vec` modules with Weaviate to generate vector data each object. To produce the string to be vectorized, Weaviate follows schema configuration for the relevant class.

Unless specified otherwise, the default behavior is to:

- Only vectorize properties that use `string` or `text` data types
- Sort properties in alphabetical (a-z) order before concatenating values
- Prepend the class name to the value
- Join properties with spaces, and
- Convert the produced string to lowercase

:::info Vector inference at object update
Where Weaviate is configured with a vectorizer, it will only obtain a new vector if an object update changes the underlying text to be vectorized.
:::
