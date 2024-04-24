---
title: REST - /v1/meta
sidebar_position: 16
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'meta']
---

import DocDeprecationNote from './_deprecated.mdx';

<DocDeprecationNote
  tagname="tag/meta"
  client_examples="/developers/weaviate/config-refs/meta"
/>

## Usage

The meta endpoint accepts a `GET` request:

```js
GET /v1/meta
```

And it returns the following fields:
- `hostname`: The location of the Weaviate instance.
- `version`: The version of Weaviate.
- `modules`: Module specific info.

## Example
The following command:

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
