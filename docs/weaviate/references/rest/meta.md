---
title: REST - /v1/meta
sidebar_position: 16
# layout: layout-documentation
# solution: weaviate
# sub-menu: RESTful API references
# title: /v1/meta
# intro: The RESTful meta endpoint gives information about the current Weaviate instance. It can be used to learn about your current Weaviate instance and to provide information to another Weaviate instances that wants to interact with the current instance.
# description: RESTful API meta reference
# tags: ['RESTful API', 'references', 'meta']
# sidebar_position: 6
# open-graph-type: article
# toc: true
# redirect_from:
#     - /documentation/weaviate/current/restful-api-references/meta.html
---

# Usage

The meta endpoint accepts a `GET` request:

```js
GET /v1/meta
```

And it returns the following fields:
- `hostname`: The location of the Weaviate instance.
- `version`: The version of Weaviate.
- `modules`: Module specific info.
  
# Example
The following command:

{% include code/1.x/meta.html %}

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

# More Resources

{% include docs-support-links.html %}
