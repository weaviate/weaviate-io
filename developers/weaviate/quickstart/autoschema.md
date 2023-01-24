---
title: Auto-schema & query
sidebar_position: 2
image: og/docs/quickstart-tutorial.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Prerequisites 

- Check that their Weaviate instance is up & accessible (e.g. OIDC not enabled)
- Check that they have / can load the dataset
    - https://raw.githubusercontent.com/weaviate/weaviate-examples/main/jeopardy_small_dataset/jeopardy_tiny.json

## Import data 

- Load data & import into Weaviate 
    - Set inference API (OpenAI / Cohere etc) as vectorizer
    - Use auto-schema as much as possible
- Confirm that import worked
- Highlight schema having been added

## Query data

- Show vector search examples
    - nearText
    - nearVector
- Show basic filtering

## Next

- [Manually specify a schema](./schema.md).

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
