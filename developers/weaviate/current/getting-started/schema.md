---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Schema
description: Getting started with the Weaviate schema
tags: ['basics']
menu-order: 4
open-graph-type: article
toc: true
---

You've made it to the schema getting started guide! The schema is the place where you will not only set data types, cross-references, and more, but you'll be tweaking index settings (ANN, reverse index,  BM25).


This will also be a guide to getting your hands dirty!


## Set up your Weaviate instance

You can set up your Weaviate instance:

0. By creating a sandbox on the [Weaviate Cloud Service](https://console.semi.technology). Or;
    0. Disable OIDC
0. By running a Weaviate locally with Docker.
    0. Download [this `docker-compose.yml` file](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&modules=standalone&runtime=docker-compose&weaviate_version=v1.14.1).
    0. Run `$ docker-compose up`
    0. Make sure that you always run `$ docker-compose down` after a shutdown(!)

Choose one of the [client libraries](../client-libraries/) you want to use.

Let's make sure that you can connect to you Weaviate instance:

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/") # <== if you use the WCS
# or
client = weaviate.Client("http://localhost:8080") # <== if you use Docker-compose

schema = client.schema.get()
print(json.dumps(schema))
```

The result should look like this:

```json
{"classes": []}
```

This means you're connected to an empty Weaviate.

If this is not the case and you see (old) classes, you can run:

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/") # <== if you use the WCS
# or
client = weaviate.Client("http://localhost:8080") # <== if you use Docker-compose

# delete all classes
client.schema.delete_all()

schema = client.schema.get()
print(json.dumps(schema))
```

## Create your first class!



## Recapitulation

...

## What would you like to learn next?

...

## Legend

...

# More Resources

{% include docs-support-links.html %}
