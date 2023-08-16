---
title: Generative search (Retrieval augmented generation)
sidebar_position: 30
image: og/docs/tutorials.jpg
# tags: ['getting started']
---

import Badges from '/_includes/badges.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Badges/>

## Overview

:::info Related pages
- [Which Weaviate is right for me?](./which-weaviate.md)
- [How-to: Generative search](../search/generative.md)
:::

Generative search, also called retrieval augmented generation (RAG), complements capabilities of generative models with retrieved data from a search.

This guide will cover:

- Weaviate configuration,
- Class configuration,
- Data import, and
- Queries.

## Weaviate configuration

For generative search, a `generative` module must be
1. *enabled* in your Weaviate instance, and
2. *specified* in your desired class.

We will use `generative-openai` in this guide, as well as `text2vec-openai` for convenient vectorization.

:::info Alternative module choices will be covered in an appendix.
:::

### Retrieve module list

Check right modules are enabled by viewing the `meta` information for your Weaviate instance, as shown below:

<Tabs groupId="languages">
<TabItem value="py" label="Python">

```python
client.get_meta()
```

</TabItem>
<TabItem value="ts" label="JavaScript/TypeScript">

```ts
// Coming soon
```

</TabItem>
</Tabs>

The response will include a list of modules. Ensure that your desired modules are in the list.

On Weaviate Cloud Services (WCS) instances, both `generative-openai` and `text2vec-openai` are enabled by default. But if any of the required modules are not enabled already, you will need to enable them.

#### Example response

```json
{
  "hostname": "http://[::]:8080",
  "modules": {
    ...
    // highlight-start
    "generative-openai": {
      "documentationHref": "https://platform.openai.com/docs/api-reference/completions",
      "name": "Generative Search - OpenAI"
    },
    "text2vec-openai": {
      "documentationHref": "https://platform.openai.com/docs/guides/embeddings/what-are-embeddings",
      "name": "OpenAI Module"
    }
    // highlight-end
  },
  ...
}

```

### Enable modules

For configurable deployments, you can specify enabled modules in your Weaviate configuration file. In a Docker-Compose configuration, you can do so by listing them on the `ENABLE_MODULES` environment variable, as shown below:

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-openai,generative-openai'
```

## Class configuration

Specify the vectorizer module and generative module in the class definition (along with any other parameters) as shown below:

:::warning
TODO: Add full code for adding this to the schema
:::

```yaml
{
    "class": "WineReview",
    # highlight-start
    "vectorizer": "text2vec-openai",  # Use `text2vec-openai` as the vectorizer
    # highlight-end
    # highlight-start
    "moduleConfig": {
        "generative-openai": {}  # Use `generative-openai` with default parameters
    },
    # highlight-end
}
```

## Data import

For this guide, we will import a small dataset consisting of wine reviews.

```py
import requests
url = 'https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/winemag_tiny.json'
resp = requests.get(url)
data = json.loads(resp.text)

# Configure a batch process
with client.batch(batch_size=100) as batch:
    for i, row in enumerate(data):
        batch.add_data_object(
            data_object=row,
            class_name='WineReview',
        )
```

### Confirm import

Let's confirm that the data was imported correctly.

#### Count objects

We'll start by counting the number of objects in the class.

#### Retrieve some objects

We'll retrieve some objects to confirm that the data was imported correctly.

## Generative search

### Single tasks

### Grouped tasks


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

