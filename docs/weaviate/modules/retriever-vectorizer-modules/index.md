---
title: Retrievers & Vectorizers
sidebar_position: 0
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

This section includes reference guides for retriever & vectorizer modules. As their names suggest, `XXX2vec` modules are configured to produce a vector for each object.

- `text2vec` converts text data
- `img2vec` converts image data
- `multi2vec` converts image or text data (into the same embedding space)
- `ref2vec` converts reference data to a vector

### Vectorization with `text2vec-*` modules

You can use `text2vec` modules with Weaviate to generate vector data each object. To produce the string to be vectorized, Weaviate follows schema configuration for the relevant class. 

Unless specified otherwise, the default behavior is to:

- Only vectorize properties that use `string` or `text` data types 
- Sort properties in alphabetical (a-z) order before concatenating values
- Prepend the class name to the value, and
- Convert the string to lowercase
