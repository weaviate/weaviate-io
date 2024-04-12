---
title: Cluster metadata
sidebar_position: 90
image: og/docs/configuration.jpg
# tags: ['metadata', 'reference', 'configuration']
---

You can retrieve metadata about the Weaviate instance, such as:

- `hostname`: The location of the Weaviate instance.
- `version`: The version of Weaviate.
- `modules`: Module specific info.

## Example

import Meta from '/_includes/code/meta.mdx';

<Meta/>

returns:

```json
{
  "hostname": "http://[::]:8080",
  "modules": {
    "text2vec-contextionary": {
      "version": "en0.16.0-v0.4.21",
      "wordCount": 818072
    }
  },
  "version": "1.0.0"
}
```


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
