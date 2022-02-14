---
layout: layout-documentation
solution: weaviate
sub-menu: RESTful API references
title: /v1/meta
intro: The RESTful meta endpoint gives information about the current Weaviate instance. It can be used to learn about your current Weaviate instance and to provide information to another Weaviate instants that wants to interact with this instance.
description: RESTful API meta reference
tags: ['RESTful API', 'references', 'meta']
menu-order: 6
open-graph-type: article
og-img: documentation.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/restful-api-references/meta.html
---

# Usage

The meta endpoint accepts a `GET` request:

```js
GET /v1/meta
```

And it returns the following fields:
- `hostname`: The location of the Weaviate instance.
- `version`: The version of Weaviate.
- `contextionaryWordCount`: The number of words and concepts in the Contextionary.
- `contextionaryVersion`: The version of the Contextionary.

# Example
The following command:

{% include code/0.23.2/meta.html %}

returns:

```json
{
  "contextionaryVersion": "en0.16.0-v0.4.14",
  "contextionaryWordCount": 818092,
  "hostname": "http://[::]:8080",
  "version": "0.22.13"
}
```

# More Resources

{% include docs-support-links.html %}