---
layout: layout-documentation
bodyclass: ["page--guides", " "]
solution: weaviate
sub-menu: Getting started
title: Quick start
intro: This quick start guide will give you a 10-minute tour of Weaviate. You will set up your Weaviate with Docker, add an example dataset with news articles, make your first queries to browse through your data, and let Weaviate perform automatic classification. This guide uses the "text2vec-tranformers" module. You can find a quick start with the text2vec-contextionary module <a href="../tutorials/quick-start-with-the-text2vec-contextionary-module.html">here</a>.
description: Get started with Weaviate
tags: ['quick start']
menu-order: 1
open-graph-type: article
og: /img/og/og-documentation/getting-started-quick-start.jpg
toc: true
redirect_from:
  - /documentation/weaviate/current/get-started/quick_start.html
  - /documentation/weaviate/current/getting-started/quick-start.html
---

# **Run Weaviate with a demo dataset**

There are many different ways to run Weaviate, from local development setups to large-scale Kubernetes environments or hosted and managed Weaviate clusters. For this quick start guide, we will be using the [Docker Compose](https://docs.docker.com/compose/) setup where you can run Weaviate on your local machine to which we will add the demo dataset with news publications.

The Docker Compose files below contain both Weaviate and the dataset.

Download the Docker Compose file (note, the Dockerfile has GPUs (i.e., CUDA) disabled, this impacts import and query time significantly).

```bash
$ curl -o docker-compose.yml https://raw.githubusercontent.com/semi-technologies/weaviate-examples/main/weaviate-transformers-newspublications/docker-compose.yaml
```

If you have a GPU available ([that is reachable with Docker](https://docs.docker.com/compose/gpu-support/)), simply set `ENABLE_CUDA` to `1` in the [Dockerfile](https://github.com/semi-technologies/weaviate-examples/blob/main/weaviate-transformers-newspublications/docker-compose-withgpu.yaml#L27))

```bash
$ curl -o docker-compose.yml https://raw.githubusercontent.com/semi-technologies/weaviate-examples/main/weaviate-transformers-newspublications/docker-compose-gpu.yaml
```

Run Docker (optional: run with `-d` to run Docker in the background)

```bash
$ docker-compose up
```

Weaviate will be available and preloaded with the news article demo dataset on:

- `http://localhost:8080/v1`
- [Via the Console](https://console.semi.technology/).

# **Query via the Weaviate console**

You can query your local machine via the [Weaviate console](http://console.semi.technology/). In the "Self-hosted Weaviate" input box, fill in `http://localhost:8080/` ( you will be redirected to the "http" version of the client ).

# **Validate via the RESTful API**

You will always use Weaviate via its HTTP API interface. The interface consists of two different access types:

- The RESTful API, which is mostly used to add and manipulate data
- The GraphQL API (which also runs over HTTP) to query data

We will first check if Weaviate is running correctly, if the schema is added successfully, and if the data is available. In the example below, we perform this from the command line.

First, we want to check if Weaviate is running correctly by inspecting the `/v1/meta` endpoint.

_Note: make sure to replace `localhost:8080` with the location of your Weaviate if you have your Weaviate running on a different endpoint or location._

```bash
$ curl -s http://localhost:8080/v1/meta
```

The output will look like this:

```json
{
    "hostname": "http://[::]:8080",
    "modules": {
        "text2vec-transformers": {}
    },
    "version": "{{ site.weaviate_version}}"
}
```

This validates that your Weaviate instance is running correctly.

Next, we check if the news publication schema was added correctly. You can do this by inspecting the `/v1/schema` endpoint.

```bash
$ curl -s http://localhost:8080/v1/schema
```

The output will looks like this:

```json
{
    "classes": [
        {
            "class": "Publication",
            "description": "A publication with an online source",
            "invertedIndexConfig": {
                "cleanupIntervalSeconds": 60
            },
            "moduleConfig": {
                "text2vec-transformers": {
                    "poolingStrategy": "masked_mean",
                    "vectorizeClassName": false
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "Name of the publication",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "name"
                },
                {
                    "dataType": [
                        "geoCoordinates"
                    ],
                    "description": "Geo location of the HQ",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "headquartersGeoLocation"
                },
                {
                    "dataType": [
                        "Article"
                    ],
                    "description": "The articles this publication has",
                    "name": "hasArticles"
                }
            ],
            "vectorIndexConfig": {
                "cleanupIntervalSeconds": 300,
                "maxConnections": 64,
                "efConstruction": 128,
                "vectorCacheMaxObjects": 500000
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "text2vec-transformers"
        },
        {
            "class": "Author",
            "description": "Normalised types",
            "invertedIndexConfig": {
                "cleanupIntervalSeconds": 60
            },
            "moduleConfig": {
                "text2vec-transformers": {
                    "poolingStrategy": "masked_mean",
                    "vectorizeClassName": true
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "Name of the author",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "name"
                },
                {
                    "dataType": [
                        "Article"
                    ],
                    "description": "Articles this author wrote",
                    "name": "wroteArticles"
                },
                {
                    "dataType": [
                        "Publication"
                    ],
                    "description": "The publication this author writes for",
                    "name": "writesFor"
                }
            ],
            "vectorIndexConfig": {
                "cleanupIntervalSeconds": 300,
                "maxConnections": 64,
                "efConstruction": 128,
                "vectorCacheMaxObjects": 500000
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "text2vec-transformers"
        },
        {
            "class": "Article",
            "description": "Normalised types",
            "invertedIndexConfig": {
                "cleanupIntervalSeconds": 60
            },
            "moduleConfig": {
                "text2vec-transformers": {
                    "poolingStrategy": "masked_mean",
                    "vectorizeClassName": false
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "title of the article",
                    "indexInverted": true,
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "title"
                },
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "url of the article",
                    "indexInverted": false,
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "url"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "summary of the article",
                    "indexInverted": true,
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "summary"
                },
                {
                    "dataType": [
                        "date"
                    ],
                    "description": "date of publication of the article",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "publicationDate"
                },
                {
                    "dataType": [
                        "int"
                    ],
                    "description": "Words in this article",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "wordCount"
                },
                {
                    "dataType": [
                        "boolean"
                    ],
                    "description": "whether the article is currently accessible through the url",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "isAccessible"
                },
                {
                    "dataType": [
                        "Author",
                        "Publication"
                    ],
                    "description": "authors this article has",
                    "name": "hasAuthors"
                },
                {
                    "dataType": [
                        "Publication"
                    ],
                    "description": "publication this article is in",
                    "name": "inPublication"
                },
                {
                    "dataType": [
                        "Category"
                    ],
                    "description": "category this article is of",
                    "name": "ofCategory"
                }
            ],
            "vectorIndexConfig": {
                "cleanupIntervalSeconds": 300,
                "maxConnections": 64,
                "efConstruction": 128,
                "vectorCacheMaxObjects": 500000
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "text2vec-transformers"
        },
        {
            "class": "Category",
            "description": "Category an article is a type off",
            "invertedIndexConfig": {
                "cleanupIntervalSeconds": 60
            },
            "moduleConfig": {
                "text2vec-transformers": {
                    "poolingStrategy": "masked_mean",
                    "vectorizeClassName": false
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "category name",
                    "indexInverted": true,
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "name"
                }
            ],
            "vectorIndexConfig": {
                "cleanupIntervalSeconds": 300,
                "maxConnections": 64,
                "efConstruction": 128,
                "vectorCacheMaxObjects": 500000
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "text2vec-transformers"
        }
    ]
}
```

You should be able to identify four classes: `Publication`, `Author`, `Article` and `Category`.

Lastly, we will validate if all the data was added correctly, by using the `/v1/objects` endpoint.

```bash
$ curl -s http://localhost:8080/v1/objects
```

The output will look like this:

```json
{
  "deprecations": null,
  "objects": [
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501894,
      "id": "16476dca-59ce-395e-b896-050080120cd4",
      "properties": {
        "hasArticles": [
          {
            "beacon": "weaviate://localhost/c707d9bc-840f-3997-a09a-da6dba7d0e87",
            "href": "/v1/objects/c707d9bc-840f-3997-a09a-da6dba7d0e87"
          },
          {
            "beacon": "weaviate://localhost/da4b49da-05cb-3a99-a370-98cdf25a1a2d",
            "href": "/v1/objects/da4b49da-05cb-3a99-a370-98cdf25a1a2d"
          },
          {
            "beacon": "weaviate://localhost/bce1371c-a0be-39b2-93cd-306742d62450",
            "href": "/v1/objects/bce1371c-a0be-39b2-93cd-306742d62450"
          },
          {
            "beacon": "weaviate://localhost/e66c8c18-b0bc-354b-844c-9480de44642d",
            "href": "/v1/objects/e66c8c18-b0bc-354b-844c-9480de44642d"
          },
          {
            "beacon": "weaviate://localhost/269422b4-18c7-386f-994a-fd34e3527008",
            "href": "/v1/objects/269422b4-18c7-386f-994a-fd34e3527008"
          },
          {
            "beacon": "weaviate://localhost/5f5f65cd-ff45-3a22-afee-f2a9c85f693c",
            "href": "/v1/objects/5f5f65cd-ff45-3a22-afee-f2a9c85f693c"
          },
          {
            "beacon": "weaviate://localhost/c242e792-e2f6-3caf-93b8-88700255b407",
            "href": "/v1/objects/c242e792-e2f6-3caf-93b8-88700255b407"
          },
          {
            "beacon": "weaviate://localhost/c81362b9-9421-3c0b-a821-4b09e12fae52",
            "href": "/v1/objects/c81362b9-9421-3c0b-a821-4b09e12fae52"
          },
          {
            "beacon": "weaviate://localhost/b7cecadf-ad1c-3932-9722-a5b4cb07ca78",
            "href": "/v1/objects/b7cecadf-ad1c-3932-9722-a5b4cb07ca78"
          },
          {
            "beacon": "weaviate://localhost/74ab3233-b50a-3a48-b360-14d1107210c7",
            "href": "/v1/objects/74ab3233-b50a-3a48-b360-14d1107210c7"
          },
          {
            "beacon": "weaviate://localhost/02ced833-f537-394d-99b4-c0c031396c43",
            "href": "/v1/objects/02ced833-f537-394d-99b4-c0c031396c43"
          },
          {
            "beacon": "weaviate://localhost/68ca2619-d19a-3a16-9c62-6315e102f606",
            "href": "/v1/objects/68ca2619-d19a-3a16-9c62-6315e102f606"
          },
          {
            "beacon": "weaviate://localhost/6cb8c00d-b1fe-3fb9-aa56-9ea36f213e33",
            "href": "/v1/objects/6cb8c00d-b1fe-3fb9-aa56-9ea36f213e33"
          },
          {
            "beacon": "weaviate://localhost/b8f401b5-02e8-3e58-ab81-7b9cf846a518",
            "href": "/v1/objects/b8f401b5-02e8-3e58-ab81-7b9cf846a518"
          },
          {
            "beacon": "weaviate://localhost/e7c1e1b3-152e-357b-bfb2-b6ceba2ef3de",
            "href": "/v1/objects/e7c1e1b3-152e-357b-bfb2-b6ceba2ef3de"
          },
          {
            "beacon": "weaviate://localhost/822f7cc7-5979-3d3c-b32a-b3d04ed11fcc",
            "href": "/v1/objects/822f7cc7-5979-3d3c-b32a-b3d04ed11fcc"
          },
          {
            "beacon": "weaviate://localhost/fe286d01-5af5-32ab-89a9-580622a61029",
            "href": "/v1/objects/fe286d01-5af5-32ab-89a9-580622a61029"
          },
          {
            "beacon": "weaviate://localhost/41bedf4e-aeaf-3d62-8220-996999808ad8",
            "href": "/v1/objects/41bedf4e-aeaf-3d62-8220-996999808ad8"
          },
          {
            "beacon": "weaviate://localhost/a729fa6a-775f-3c7f-8478-6a87a533cd82",
            "href": "/v1/objects/a729fa6a-775f-3c7f-8478-6a87a533cd82"
          },
          {
            "beacon": "weaviate://localhost/625fa5d1-0e4f-36ff-ab9b-24a56e7db82d",
            "href": "/v1/objects/625fa5d1-0e4f-36ff-ab9b-24a56e7db82d"
          },
          {
            "beacon": "weaviate://localhost/2659959e-ec1d-3717-a00b-847871cfadef",
            "href": "/v1/objects/2659959e-ec1d-3717-a00b-847871cfadef"
          },
          {
            "beacon": "weaviate://localhost/7f8fc75d-5b38-3b0c-859b-36a261db230a",
            "href": "/v1/objects/7f8fc75d-5b38-3b0c-859b-36a261db230a"
          },
          {
            "beacon": "weaviate://localhost/53f59ccd-826b-38f1-81ef-a10c0baa2ea0",
            "href": "/v1/objects/53f59ccd-826b-38f1-81ef-a10c0baa2ea0"
          },
          {
            "beacon": "weaviate://localhost/aa6a0af6-255f-3903-a12b-64f5ee767041",
            "href": "/v1/objects/aa6a0af6-255f-3903-a12b-64f5ee767041"
          },
          {
            "beacon": "weaviate://localhost/10978dfd-5aaf-344e-a97c-ca55e759034c",
            "href": "/v1/objects/10978dfd-5aaf-344e-a97c-ca55e759034c"
          },
          {
            "beacon": "weaviate://localhost/bedea682-29c9-30bc-bf73-2839c7f20384",
            "href": "/v1/objects/bedea682-29c9-30bc-bf73-2839c7f20384"
          },
          {
            "beacon": "weaviate://localhost/63d29ea4-e336-3a42-a140-e35aaf0e3a99",
            "href": "/v1/objects/63d29ea4-e336-3a42-a140-e35aaf0e3a99"
          },
          {
            "beacon": "weaviate://localhost/a96c5d3b-9e07-33dd-baff-31c3bc342781",
            "href": "/v1/objects/a96c5d3b-9e07-33dd-baff-31c3bc342781"
          },
          {
            "beacon": "weaviate://localhost/e69b3e26-0cf5-3a74-ad72-8852140228fc",
            "href": "/v1/objects/e69b3e26-0cf5-3a74-ad72-8852140228fc"
          },
          {
            "beacon": "weaviate://localhost/8d2aafc7-b1e5-3bcd-8d63-af0ca718f451",
            "href": "/v1/objects/8d2aafc7-b1e5-3bcd-8d63-af0ca718f451"
          },
          {
            "beacon": "weaviate://localhost/5f1b3a94-6d57-335a-8060-c20e36051cc2",
            "href": "/v1/objects/5f1b3a94-6d57-335a-8060-c20e36051cc2"
          },
          {
            "beacon": "weaviate://localhost/68dc349e-c128-32e9-88da-d2e8a6c3b36b",
            "href": "/v1/objects/68dc349e-c128-32e9-88da-d2e8a6c3b36b"
          },
          {
            "beacon": "weaviate://localhost/3d812eb2-7c41-3a21-b5b7-113505f84a41",
            "href": "/v1/objects/3d812eb2-7c41-3a21-b5b7-113505f84a41"
          },
          {
            "beacon": "weaviate://localhost/7a5b81be-3d55-35fb-94fc-54a56423fad7",
            "href": "/v1/objects/7a5b81be-3d55-35fb-94fc-54a56423fad7"
          },
          {
            "beacon": "weaviate://localhost/62501479-ecc1-3e61-8f30-3c49614f89c4",
            "href": "/v1/objects/62501479-ecc1-3e61-8f30-3c49614f89c4"
          },
          {
            "beacon": "weaviate://localhost/b11e2300-c15d-3142-b8a7-700c7972043d",
            "href": "/v1/objects/b11e2300-c15d-3142-b8a7-700c7972043d"
          },
          {
            "beacon": "weaviate://localhost/6873abe6-b32e-3564-a556-5ee6d9a2410a",
            "href": "/v1/objects/6873abe6-b32e-3564-a556-5ee6d9a2410a"
          },
          {
            "beacon": "weaviate://localhost/5d469971-84ca-3656-ab4c-65050a577b10",
            "href": "/v1/objects/5d469971-84ca-3656-ab4c-65050a577b10"
          },
          {
            "beacon": "weaviate://localhost/b89a597b-7a79-3e56-9d26-87b864f0e248",
            "href": "/v1/objects/b89a597b-7a79-3e56-9d26-87b864f0e248"
          },
          {
            "beacon": "weaviate://localhost/c9f222c2-0f26-3d08-87ea-2f237afff2f1",
            "href": "/v1/objects/c9f222c2-0f26-3d08-87ea-2f237afff2f1"
          },
          {
            "beacon": "weaviate://localhost/552e257f-b8a5-381e-a80d-74f727d4be1c",
            "href": "/v1/objects/552e257f-b8a5-381e-a80d-74f727d4be1c"
          },
          {
            "beacon": "weaviate://localhost/6f527c20-4e5c-33e0-8ecc-d68e155b5a61",
            "href": "/v1/objects/6f527c20-4e5c-33e0-8ecc-d68e155b5a61"
          },
          {
            "beacon": "weaviate://localhost/5d7d17c6-cb30-3e08-a8f3-1aaf32163c85",
            "href": "/v1/objects/5d7d17c6-cb30-3e08-a8f3-1aaf32163c85"
          },
          {
            "beacon": "weaviate://localhost/4055ff6c-9365-3184-aaed-a8478d5b6b13",
            "href": "/v1/objects/4055ff6c-9365-3184-aaed-a8478d5b6b13"
          },
          {
            "beacon": "weaviate://localhost/77e0fa01-06e0-370f-a8c4-313918c398e6",
            "href": "/v1/objects/77e0fa01-06e0-370f-a8c4-313918c398e6"
          },
          {
            "beacon": "weaviate://localhost/9b8d2590-378f-3fa6-8202-a69b0f5bdebf",
            "href": "/v1/objects/9b8d2590-378f-3fa6-8202-a69b0f5bdebf"
          },
          {
            "beacon": "weaviate://localhost/6e4bf7d0-58c1-3384-9725-9ca94fe0bcc2",
            "href": "/v1/objects/6e4bf7d0-58c1-3384-9725-9ca94fe0bcc2"
          },
          {
            "beacon": "weaviate://localhost/c886fa88-b195-350c-b3e5-0eba4cfd29c0",
            "href": "/v1/objects/c886fa88-b195-350c-b3e5-0eba4cfd29c0"
          },
          {
            "beacon": "weaviate://localhost/92302a19-e47a-3c00-881f-81e8da96da4c",
            "href": "/v1/objects/92302a19-e47a-3c00-881f-81e8da96da4c"
          },
          {
            "beacon": "weaviate://localhost/fb9e7530-ca15-3c87-bb79-b943d1b27290",
            "href": "/v1/objects/fb9e7530-ca15-3c87-bb79-b943d1b27290"
          },
          {
            "beacon": "weaviate://localhost/d50203ff-5db0-30bb-a2ea-3f143a3cdc74",
            "href": "/v1/objects/d50203ff-5db0-30bb-a2ea-3f143a3cdc74"
          },
          {
            "beacon": "weaviate://localhost/eeb4b495-1310-3ab0-93dc-4dbe6c8a846c",
            "href": "/v1/objects/eeb4b495-1310-3ab0-93dc-4dbe6c8a846c"
          },
          {
            "beacon": "weaviate://localhost/e36f56e0-6928-34ab-9130-2d6be35edceb",
            "href": "/v1/objects/e36f56e0-6928-34ab-9130-2d6be35edceb"
          },
          {
            "beacon": "weaviate://localhost/4bd5c314-7e44-39f1-a246-913254c211a6",
            "href": "/v1/objects/4bd5c314-7e44-39f1-a246-913254c211a6"
          },
          {
            "beacon": "weaviate://localhost/812d72d6-5101-3a30-93e5-a73ae060aa96",
            "href": "/v1/objects/812d72d6-5101-3a30-93e5-a73ae060aa96"
          },
          {
            "beacon": "weaviate://localhost/a098f5bc-af2f-352a-904d-a78c5bf1248e",
            "href": "/v1/objects/a098f5bc-af2f-352a-904d-a78c5bf1248e"
          },
          {
            "beacon": "weaviate://localhost/c8d8816f-4c8b-38b8-8212-661dfef0c19f",
            "href": "/v1/objects/c8d8816f-4c8b-38b8-8212-661dfef0c19f"
          },
          {
            "beacon": "weaviate://localhost/f3b87688-a2ad-3686-89e2-62295c1cb006",
            "href": "/v1/objects/f3b87688-a2ad-3686-89e2-62295c1cb006"
          },
          {
            "beacon": "weaviate://localhost/f55134d3-181b-3d7a-a0fd-a4be8e213fb5",
            "href": "/v1/objects/f55134d3-181b-3d7a-a0fd-a4be8e213fb5"
          },
          {
            "beacon": "weaviate://localhost/d41148b0-7e6a-3bbd-a2f1-236cee604625",
            "href": "/v1/objects/d41148b0-7e6a-3bbd-a2f1-236cee604625"
          },
          {
            "beacon": "weaviate://localhost/1e917e4d-6f4f-3a76-88b0-7b17265e646c",
            "href": "/v1/objects/1e917e4d-6f4f-3a76-88b0-7b17265e646c"
          },
          {
            "beacon": "weaviate://localhost/0decb8eb-a824-3743-8546-76f34baa14b6",
            "href": "/v1/objects/0decb8eb-a824-3743-8546-76f34baa14b6"
          },
          {
            "beacon": "weaviate://localhost/346fd9b9-9588-308b-97db-78395e975b77",
            "href": "/v1/objects/346fd9b9-9588-308b-97db-78395e975b77"
          },
          {
            "beacon": "weaviate://localhost/9a4f00ba-8bc4-3511-ae69-485e877a1437",
            "href": "/v1/objects/9a4f00ba-8bc4-3511-ae69-485e877a1437"
          },
          {
            "beacon": "weaviate://localhost/6b59f2ab-3a22-323c-8a84-1dc171f855c2",
            "href": "/v1/objects/6b59f2ab-3a22-323c-8a84-1dc171f855c2"
          },
          {
            "beacon": "weaviate://localhost/bdd8b1af-6271-3c6c-8827-c474a128206f",
            "href": "/v1/objects/bdd8b1af-6271-3c6c-8827-c474a128206f"
          },
          {
            "beacon": "weaviate://localhost/0ccc4c18-6dbf-3608-b09f-8472a86d6eb6",
            "href": "/v1/objects/0ccc4c18-6dbf-3608-b09f-8472a86d6eb6"
          },
          {
            "beacon": "weaviate://localhost/a61f0ade-2c36-3f3c-96ba-51fdffcd654a",
            "href": "/v1/objects/a61f0ade-2c36-3f3c-96ba-51fdffcd654a"
          },
          {
            "beacon": "weaviate://localhost/8264e635-564e-33f9-8944-11b6a70d06fc",
            "href": "/v1/objects/8264e635-564e-33f9-8944-11b6a70d06fc"
          },
          {
            "beacon": "weaviate://localhost/74ccddf2-5cef-38bd-99e3-f110f8df4d11",
            "href": "/v1/objects/74ccddf2-5cef-38bd-99e3-f110f8df4d11"
          },
          {
            "beacon": "weaviate://localhost/a9417417-09db-36eb-9353-00bb8adc8ff9",
            "href": "/v1/objects/a9417417-09db-36eb-9353-00bb8adc8ff9"
          },
          {
            "beacon": "weaviate://localhost/c9aa509d-8e33-38ca-8894-ad97634df346",
            "href": "/v1/objects/c9aa509d-8e33-38ca-8894-ad97634df346"
          },
          {
            "beacon": "weaviate://localhost/af61e654-d7da-30c7-a99e-66e9ec03b4e6",
            "href": "/v1/objects/af61e654-d7da-30c7-a99e-66e9ec03b4e6"
          },
          {
            "beacon": "weaviate://localhost/265d8181-e242-3e1e-b9a6-f70b822e008e",
            "href": "/v1/objects/265d8181-e242-3e1e-b9a6-f70b822e008e"
          },
          {
            "beacon": "weaviate://localhost/2420859d-38a8-38ad-b735-022de3eb35e8",
            "href": "/v1/objects/2420859d-38a8-38ad-b735-022de3eb35e8"
          },
          {
            "beacon": "weaviate://localhost/900e9658-cb61-3f40-96c6-b6153fdae6e5",
            "href": "/v1/objects/900e9658-cb61-3f40-96c6-b6153fdae6e5"
          },
          {
            "beacon": "weaviate://localhost/52d8059e-7e15-3c73-9d24-134006627d09",
            "href": "/v1/objects/52d8059e-7e15-3c73-9d24-134006627d09"
          },
          {
            "beacon": "weaviate://localhost/e8e16083-092a-3d02-b054-e7dc13f81505",
            "href": "/v1/objects/e8e16083-092a-3d02-b054-e7dc13f81505"
          },
          {
            "beacon": "weaviate://localhost/89eb2c1a-01df-316c-a601-91e05d26dbea",
            "href": "/v1/objects/89eb2c1a-01df-316c-a601-91e05d26dbea"
          },
          {
            "beacon": "weaviate://localhost/175ece0c-f934-3a44-93cc-304d55f79748",
            "href": "/v1/objects/175ece0c-f934-3a44-93cc-304d55f79748"
          },
          {
            "beacon": "weaviate://localhost/511d0fef-a738-3b4d-a47a-7058339a8dc6",
            "href": "/v1/objects/511d0fef-a738-3b4d-a47a-7058339a8dc6"
          },
          {
            "beacon": "weaviate://localhost/5083637a-5a94-3e34-9ef7-77c54a8ed7e0",
            "href": "/v1/objects/5083637a-5a94-3e34-9ef7-77c54a8ed7e0"
          },
          {
            "beacon": "weaviate://localhost/05145393-6833-3666-b767-b02e96a9fe6a",
            "href": "/v1/objects/05145393-6833-3666-b767-b02e96a9fe6a"
          },
          {
            "beacon": "weaviate://localhost/1d400437-5ba9-3a85-8967-c734ee17f12e",
            "href": "/v1/objects/1d400437-5ba9-3a85-8967-c734ee17f12e"
          },
          {
            "beacon": "weaviate://localhost/c657c792-aedd-3a6a-bd09-c71c070a8349",
            "href": "/v1/objects/c657c792-aedd-3a6a-bd09-c71c070a8349"
          },
          {
            "beacon": "weaviate://localhost/c62a25cf-19f4-32c3-9fc6-8a742e62a708",
            "href": "/v1/objects/c62a25cf-19f4-32c3-9fc6-8a742e62a708"
          },
          {
            "beacon": "weaviate://localhost/0ffd6654-918d-33dc-9aa7-7d1c3d00b0bc",
            "href": "/v1/objects/0ffd6654-918d-33dc-9aa7-7d1c3d00b0bc"
          },
          {
            "beacon": "weaviate://localhost/fae661fe-c114-30f0-becf-3a99929903cc",
            "href": "/v1/objects/fae661fe-c114-30f0-becf-3a99929903cc"
          },
          {
            "beacon": "weaviate://localhost/48b0d651-57e0-3a35-90cf-0a295d2a9cb4",
            "href": "/v1/objects/48b0d651-57e0-3a35-90cf-0a295d2a9cb4"
          },
          {
            "beacon": "weaviate://localhost/4fd7c299-01fc-3e52-8457-8729ad67c9b6",
            "href": "/v1/objects/4fd7c299-01fc-3e52-8457-8729ad67c9b6"
          },
          {
            "beacon": "weaviate://localhost/3462c1bb-6f8e-3630-bf25-c1d12179296e",
            "href": "/v1/objects/3462c1bb-6f8e-3630-bf25-c1d12179296e"
          },
          {
            "beacon": "weaviate://localhost/d0944144-1433-3fac-ae85-d3fe185e2b9e",
            "href": "/v1/objects/d0944144-1433-3fac-ae85-d3fe185e2b9e"
          },
          {
            "beacon": "weaviate://localhost/02c9c6f0-afbb-3ad1-b467-0af9201e5913",
            "href": "/v1/objects/02c9c6f0-afbb-3ad1-b467-0af9201e5913"
          },
          {
            "beacon": "weaviate://localhost/39ec1cf5-b627-364a-bf82-4059ea71faf2",
            "href": "/v1/objects/39ec1cf5-b627-364a-bf82-4059ea71faf2"
          },
          {
            "beacon": "weaviate://localhost/d955d7a4-2f02-38dc-ac8a-fd746d153073",
            "href": "/v1/objects/d955d7a4-2f02-38dc-ac8a-fd746d153073"
          },
          {
            "beacon": "weaviate://localhost/4e63d850-e93f-3faa-ba2e-5402d92ec732",
            "href": "/v1/objects/4e63d850-e93f-3faa-ba2e-5402d92ec732"
          },
          {
            "beacon": "weaviate://localhost/13998784-9c5c-3786-a84d-50defd1438d3",
            "href": "/v1/objects/13998784-9c5c-3786-a84d-50defd1438d3"
          },
          {
            "beacon": "weaviate://localhost/c73bdd9a-72c4-386e-8fe4-137092330819",
            "href": "/v1/objects/c73bdd9a-72c4-386e-8fe4-137092330819"
          },
          {
            "beacon": "weaviate://localhost/465b3a48-4e2d-34ec-94c0-083cf13b423c",
            "href": "/v1/objects/465b3a48-4e2d-34ec-94c0-083cf13b423c"
          },
          {
            "beacon": "weaviate://localhost/eb72b7d3-45e9-3538-bab8-c738a3e27f86",
            "href": "/v1/objects/eb72b7d3-45e9-3538-bab8-c738a3e27f86"
          },
          {
            "beacon": "weaviate://localhost/ae6899e7-0c2f-3f78-921c-aa50d57fc7ad",
            "href": "/v1/objects/ae6899e7-0c2f-3f78-921c-aa50d57fc7ad"
          },
          {
            "beacon": "weaviate://localhost/649f85d5-ea52-3ccb-9396-02eecdd2a158",
            "href": "/v1/objects/649f85d5-ea52-3ccb-9396-02eecdd2a158"
          },
          {
            "beacon": "weaviate://localhost/40edac67-23f7-31b8-a682-d15db244dbf1",
            "href": "/v1/objects/40edac67-23f7-31b8-a682-d15db244dbf1"
          },
          {
            "beacon": "weaviate://localhost/7056ba95-141f-3193-b18b-da336fe08698",
            "href": "/v1/objects/7056ba95-141f-3193-b18b-da336fe08698"
          },
          {
            "beacon": "weaviate://localhost/cd370086-33b2-3d5c-93bf-ccf563c1ee03",
            "href": "/v1/objects/cd370086-33b2-3d5c-93bf-ccf563c1ee03"
          },
          {
            "beacon": "weaviate://localhost/027059a6-cff5-349c-a55e-51f22231aec3",
            "href": "/v1/objects/027059a6-cff5-349c-a55e-51f22231aec3"
          },
          {
            "beacon": "weaviate://localhost/fff41f95-1bfb-3019-9574-448cf0624f45",
            "href": "/v1/objects/fff41f95-1bfb-3019-9574-448cf0624f45"
          },
          {
            "beacon": "weaviate://localhost/cf9c7bb5-4938-3fa3-a5d3-a4782309c598",
            "href": "/v1/objects/cf9c7bb5-4938-3fa3-a5d3-a4782309c598"
          },
          {
            "beacon": "weaviate://localhost/01b8e011-9900-3afd-9850-c60539adaa3f",
            "href": "/v1/objects/01b8e011-9900-3afd-9850-c60539adaa3f"
          },
          {
            "beacon": "weaviate://localhost/bf1888aa-90ba-3353-befa-007a87db761d",
            "href": "/v1/objects/bf1888aa-90ba-3353-befa-007a87db761d"
          },
          {
            "beacon": "weaviate://localhost/74c6dba2-4744-30b0-80b2-67d92052cbee",
            "href": "/v1/objects/74c6dba2-4744-30b0-80b2-67d92052cbee"
          },
          {
            "beacon": "weaviate://localhost/507c53b9-456d-3e9f-8091-248aee53b36d",
            "href": "/v1/objects/507c53b9-456d-3e9f-8091-248aee53b36d"
          },
          {
            "beacon": "weaviate://localhost/4785a0ac-3482-3801-ae52-6d92d58fbc85",
            "href": "/v1/objects/4785a0ac-3482-3801-ae52-6d92d58fbc85"
          },
          {
            "beacon": "weaviate://localhost/b43c7dc7-0bc9-3e10-bfc3-6f129c699eb1",
            "href": "/v1/objects/b43c7dc7-0bc9-3e10-bfc3-6f129c699eb1"
          },
          {
            "beacon": "weaviate://localhost/8e796d6a-07ee-35a8-8598-1c0cab8ba284",
            "href": "/v1/objects/8e796d6a-07ee-35a8-8598-1c0cab8ba284"
          },
          {
            "beacon": "weaviate://localhost/7a5108d0-11ec-3f02-acdd-3a0d282d3adc",
            "href": "/v1/objects/7a5108d0-11ec-3f02-acdd-3a0d282d3adc"
          },
          {
            "beacon": "weaviate://localhost/81bcb1cd-8615-38a3-ad9f-b38e0b449246",
            "href": "/v1/objects/81bcb1cd-8615-38a3-ad9f-b38e0b449246"
          },
          {
            "beacon": "weaviate://localhost/fd102cce-c48d-3c65-89d5-cee7136ae7cd",
            "href": "/v1/objects/fd102cce-c48d-3c65-89d5-cee7136ae7cd"
          },
          {
            "beacon": "weaviate://localhost/74381530-f3db-31b8-a5a5-84e9b092fab4",
            "href": "/v1/objects/74381530-f3db-31b8-a5a5-84e9b092fab4"
          },
          {
            "beacon": "weaviate://localhost/38642733-4493-3996-b7dd-0c3cf1a2cbca",
            "href": "/v1/objects/38642733-4493-3996-b7dd-0c3cf1a2cbca"
          },
          {
            "beacon": "weaviate://localhost/f9ec5e96-57db-3c38-bb58-e89868047911",
            "href": "/v1/objects/f9ec5e96-57db-3c38-bb58-e89868047911"
          },
          {
            "beacon": "weaviate://localhost/79202f89-3f67-3ae4-9b9f-0a4e635a4db7",
            "href": "/v1/objects/79202f89-3f67-3ae4-9b9f-0a4e635a4db7"
          },
          {
            "beacon": "weaviate://localhost/ae8a9ebb-9826-3991-b5b9-9077f70c6c46",
            "href": "/v1/objects/ae8a9ebb-9826-3991-b5b9-9077f70c6c46"
          },
          {
            "beacon": "weaviate://localhost/ec4d955b-3c93-33eb-8da1-b3bf9da4d48d",
            "href": "/v1/objects/ec4d955b-3c93-33eb-8da1-b3bf9da4d48d"
          },
          {
            "beacon": "weaviate://localhost/43ec7a28-0a9b-3b7e-9930-999589e73e39",
            "href": "/v1/objects/43ec7a28-0a9b-3b7e-9930-999589e73e39"
          },
          {
            "beacon": "weaviate://localhost/e8c5b2b3-50ff-316d-8694-048e772aeb72",
            "href": "/v1/objects/e8c5b2b3-50ff-316d-8694-048e772aeb72"
          },
          {
            "beacon": "weaviate://localhost/4c77ec9c-7e9e-3a84-aa94-a07243e8b62a",
            "href": "/v1/objects/4c77ec9c-7e9e-3a84-aa94-a07243e8b62a"
          },
          {
            "beacon": "weaviate://localhost/917435dc-443b-342b-b80b-8a31c436f8f7",
            "href": "/v1/objects/917435dc-443b-342b-b80b-8a31c436f8f7"
          },
          {
            "beacon": "weaviate://localhost/b9fae69e-0a5f-38e5-b0d4-7f3609dbd2c1",
            "href": "/v1/objects/b9fae69e-0a5f-38e5-b0d4-7f3609dbd2c1"
          },
          {
            "beacon": "weaviate://localhost/890e43d1-7542-3875-b685-1aa81322606d",
            "href": "/v1/objects/890e43d1-7542-3875-b685-1aa81322606d"
          },
          {
            "beacon": "weaviate://localhost/31f10b8e-16c9-338b-83e3-1a31c69f2bc0",
            "href": "/v1/objects/31f10b8e-16c9-338b-83e3-1a31c69f2bc0"
          },
          {
            "beacon": "weaviate://localhost/de9ba9ac-57d4-371a-b038-d6ad7f29b6fd",
            "href": "/v1/objects/de9ba9ac-57d4-371a-b038-d6ad7f29b6fd"
          },
          {
            "beacon": "weaviate://localhost/2ac2bf03-c605-3e0e-9005-f48de1fcb7f6",
            "href": "/v1/objects/2ac2bf03-c605-3e0e-9005-f48de1fcb7f6"
          },
          {
            "beacon": "weaviate://localhost/59c33df9-0e3a-3b88-b104-685d3b522318",
            "href": "/v1/objects/59c33df9-0e3a-3b88-b104-685d3b522318"
          },
          {
            "beacon": "weaviate://localhost/5f433a66-3ca5-3e32-bb08-06b0705f5dad",
            "href": "/v1/objects/5f433a66-3ca5-3e32-bb08-06b0705f5dad"
          },
          {
            "beacon": "weaviate://localhost/89fcef16-f1b8-31ab-8f82-60130efb9c5d",
            "href": "/v1/objects/89fcef16-f1b8-31ab-8f82-60130efb9c5d"
          },
          {
            "beacon": "weaviate://localhost/e06e1970-33af-3ff5-a855-7630195cb787",
            "href": "/v1/objects/e06e1970-33af-3ff5-a855-7630195cb787"
          },
          {
            "beacon": "weaviate://localhost/35e6cd3e-0c65-310f-b1fa-b73982adf63c",
            "href": "/v1/objects/35e6cd3e-0c65-310f-b1fa-b73982adf63c"
          },
          {
            "beacon": "weaviate://localhost/7791d16c-6336-3d6d-bf02-3e8ad5c45d7b",
            "href": "/v1/objects/7791d16c-6336-3d6d-bf02-3e8ad5c45d7b"
          },
          {
            "beacon": "weaviate://localhost/d0d49910-e78c-333e-a23d-ad6000f0d4dd",
            "href": "/v1/objects/d0d49910-e78c-333e-a23d-ad6000f0d4dd"
          },
          {
            "beacon": "weaviate://localhost/e2bb27ef-927e-30df-b197-3fbf8d45e92b",
            "href": "/v1/objects/e2bb27ef-927e-30df-b197-3fbf8d45e92b"
          },
          {
            "beacon": "weaviate://localhost/36bfe42f-2323-32ad-8dd1-bc6f5299a33a",
            "href": "/v1/objects/36bfe42f-2323-32ad-8dd1-bc6f5299a33a"
          },
          {
            "beacon": "weaviate://localhost/8bce2b8a-130b-323b-bbed-7f93a3484597",
            "href": "/v1/objects/8bce2b8a-130b-323b-bbed-7f93a3484597"
          },
          {
            "beacon": "weaviate://localhost/65444ea9-9a69-3b42-bac4-f475ef7746da",
            "href": "/v1/objects/65444ea9-9a69-3b42-bac4-f475ef7746da"
          },
          {
            "beacon": "weaviate://localhost/aa5002b9-4977-3128-be3f-b4c2d3a36ed5",
            "href": "/v1/objects/aa5002b9-4977-3128-be3f-b4c2d3a36ed5"
          },
          {
            "beacon": "weaviate://localhost/03928b0e-3791-3e96-8127-45be517daf18",
            "href": "/v1/objects/03928b0e-3791-3e96-8127-45be517daf18"
          },
          {
            "beacon": "weaviate://localhost/b5e9e050-5ab6-33ac-87d4-570b2a1f18ed",
            "href": "/v1/objects/b5e9e050-5ab6-33ac-87d4-570b2a1f18ed"
          }
        ],
        "headquartersGeoLocation": {
          "latitude": 40.75868,
          "longitude": -73.98241
        },
        "name": "Fox News"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501887,
      "id": "212e56a6-e535-3569-ad1b-2215526c1d9d",
      "properties": {
        "hasArticles": [
          {
            "beacon": "weaviate://localhost/5087f0f9-89b7-3eef-a4b1-780dcece62de",
            "href": "/v1/objects/5087f0f9-89b7-3eef-a4b1-780dcece62de"
          },
          {
            "beacon": "weaviate://localhost/d3242f60-d33c-38e5-9275-de89290e989e",
            "href": "/v1/objects/d3242f60-d33c-38e5-9275-de89290e989e"
          },
          {
            "beacon": "weaviate://localhost/8fad2d0a-84a3-3032-9458-e3676570175e",
            "href": "/v1/objects/8fad2d0a-84a3-3032-9458-e3676570175e"
          },
          {
            "beacon": "weaviate://localhost/68db4a30-b0a1-31f8-b524-9278e16b063e",
            "href": "/v1/objects/68db4a30-b0a1-31f8-b524-9278e16b063e"
          },
          {
            "beacon": "weaviate://localhost/cbcc235b-ff99-3ac8-80e5-ff26764daef4",
            "href": "/v1/objects/cbcc235b-ff99-3ac8-80e5-ff26764daef4"
          },
          {
            "beacon": "weaviate://localhost/0821cb39-3c65-3014-8b93-03b502e6c427",
            "href": "/v1/objects/0821cb39-3c65-3014-8b93-03b502e6c427"
          },
          {
            "beacon": "weaviate://localhost/1c725941-4de3-3dee-8e36-a2cea711771a",
            "href": "/v1/objects/1c725941-4de3-3dee-8e36-a2cea711771a"
          },
          {
            "beacon": "weaviate://localhost/ef7661d5-62f1-31a5-837a-66924f2868f0",
            "href": "/v1/objects/ef7661d5-62f1-31a5-837a-66924f2868f0"
          },
          {
            "beacon": "weaviate://localhost/45f12067-f7a4-3414-b32f-6587b2e452b6",
            "href": "/v1/objects/45f12067-f7a4-3414-b32f-6587b2e452b6"
          },
          {
            "beacon": "weaviate://localhost/9e7c5440-7b36-3379-8fe8-04757e5514f3",
            "href": "/v1/objects/9e7c5440-7b36-3379-8fe8-04757e5514f3"
          },
          {
            "beacon": "weaviate://localhost/f8a7f927-bfa5-3e76-84a1-e8092623e305",
            "href": "/v1/objects/f8a7f927-bfa5-3e76-84a1-e8092623e305"
          },
          {
            "beacon": "weaviate://localhost/e6b5aa43-83b3-3ed8-8750-74834a40880f",
            "href": "/v1/objects/e6b5aa43-83b3-3ed8-8750-74834a40880f"
          },
          {
            "beacon": "weaviate://localhost/d23c9271-4362-3c75-a85e-f0203b3dfcab",
            "href": "/v1/objects/d23c9271-4362-3c75-a85e-f0203b3dfcab"
          },
          {
            "beacon": "weaviate://localhost/c29bdad3-5f4c-3bff-98cb-6eceb90062f1",
            "href": "/v1/objects/c29bdad3-5f4c-3bff-98cb-6eceb90062f1"
          },
          {
            "beacon": "weaviate://localhost/eb9f9e8b-28ab-3801-bbab-27d09f7593ff",
            "href": "/v1/objects/eb9f9e8b-28ab-3801-bbab-27d09f7593ff"
          },
          {
            "beacon": "weaviate://localhost/b0a04c20-ded9-3e3e-831a-2931ce3ded66",
            "href": "/v1/objects/b0a04c20-ded9-3e3e-831a-2931ce3ded66"
          },
          {
            "beacon": "weaviate://localhost/7faffba8-2793-393d-84eb-7397c35b2b07",
            "href": "/v1/objects/7faffba8-2793-393d-84eb-7397c35b2b07"
          },
          {
            "beacon": "weaviate://localhost/6edacd0b-2147-3383-97af-b0386af463d5",
            "href": "/v1/objects/6edacd0b-2147-3383-97af-b0386af463d5"
          },
          {
            "beacon": "weaviate://localhost/f15bcdb0-8ff3-312c-9e66-0b046de913c0",
            "href": "/v1/objects/f15bcdb0-8ff3-312c-9e66-0b046de913c0"
          },
          {
            "beacon": "weaviate://localhost/72040181-eb23-3d29-9d75-6a8b09450784",
            "href": "/v1/objects/72040181-eb23-3d29-9d75-6a8b09450784"
          },
          {
            "beacon": "weaviate://localhost/255ce6d8-baa8-33ba-9c70-08dffc00169b",
            "href": "/v1/objects/255ce6d8-baa8-33ba-9c70-08dffc00169b"
          },
          {
            "beacon": "weaviate://localhost/2b256827-20b5-3fa4-b2c7-12327865e3c5",
            "href": "/v1/objects/2b256827-20b5-3fa4-b2c7-12327865e3c5"
          },
          {
            "beacon": "weaviate://localhost/d6c9ed4c-0b77-3451-8f77-8a70a05f59cf",
            "href": "/v1/objects/d6c9ed4c-0b77-3451-8f77-8a70a05f59cf"
          },
          {
            "beacon": "weaviate://localhost/a726e810-1878-37fb-beff-f05965503739",
            "href": "/v1/objects/a726e810-1878-37fb-beff-f05965503739"
          },
          {
            "beacon": "weaviate://localhost/e8b507b5-c484-3961-91de-45a58e4e03eb",
            "href": "/v1/objects/e8b507b5-c484-3961-91de-45a58e4e03eb"
          },
          {
            "beacon": "weaviate://localhost/0089fcf3-057b-38b2-8279-ae5d9093841c",
            "href": "/v1/objects/0089fcf3-057b-38b2-8279-ae5d9093841c"
          },
          {
            "beacon": "weaviate://localhost/7fce09f4-6493-3ca5-a150-bb305dca39fa",
            "href": "/v1/objects/7fce09f4-6493-3ca5-a150-bb305dca39fa"
          },
          {
            "beacon": "weaviate://localhost/3459956a-beb7-3394-8998-2ca04fecc92a",
            "href": "/v1/objects/3459956a-beb7-3394-8998-2ca04fecc92a"
          },
          {
            "beacon": "weaviate://localhost/9195b763-418e-3be2-8575-41bded12bf8c",
            "href": "/v1/objects/9195b763-418e-3be2-8575-41bded12bf8c"
          },
          {
            "beacon": "weaviate://localhost/97b56f0b-b927-3480-a35b-d03038db686f",
            "href": "/v1/objects/97b56f0b-b927-3480-a35b-d03038db686f"
          },
          {
            "beacon": "weaviate://localhost/70246b7d-ba2c-37e7-bb88-c7b29b3e568f",
            "href": "/v1/objects/70246b7d-ba2c-37e7-bb88-c7b29b3e568f"
          },
          {
            "beacon": "weaviate://localhost/b8a25f91-9883-3606-b3ad-3f77629a89c5",
            "href": "/v1/objects/b8a25f91-9883-3606-b3ad-3f77629a89c5"
          },
          {
            "beacon": "weaviate://localhost/9bbb9c35-98b5-309d-8b0f-ca22a2f8c3b9",
            "href": "/v1/objects/9bbb9c35-98b5-309d-8b0f-ca22a2f8c3b9"
          },
          {
            "beacon": "weaviate://localhost/374787eb-d5fb-3626-a267-7594cce0e25a",
            "href": "/v1/objects/374787eb-d5fb-3626-a267-7594cce0e25a"
          },
          {
            "beacon": "weaviate://localhost/4d35db46-8c48-3d09-bd68-22ea98320f20",
            "href": "/v1/objects/4d35db46-8c48-3d09-bd68-22ea98320f20"
          },
          {
            "beacon": "weaviate://localhost/c491eee3-0a50-3141-83f4-355a19cd457c",
            "href": "/v1/objects/c491eee3-0a50-3141-83f4-355a19cd457c"
          },
          {
            "beacon": "weaviate://localhost/e1bdf6aa-8716-380a-9a27-d7807392e9d5",
            "href": "/v1/objects/e1bdf6aa-8716-380a-9a27-d7807392e9d5"
          },
          {
            "beacon": "weaviate://localhost/2dca01ea-a15c-397d-9c95-707492d156c2",
            "href": "/v1/objects/2dca01ea-a15c-397d-9c95-707492d156c2"
          },
          {
            "beacon": "weaviate://localhost/7bb98f24-45fb-33aa-81e9-8ead583ae7e2",
            "href": "/v1/objects/7bb98f24-45fb-33aa-81e9-8ead583ae7e2"
          },
          {
            "beacon": "weaviate://localhost/939651c5-fd7b-3643-b5d4-572cbf478725",
            "href": "/v1/objects/939651c5-fd7b-3643-b5d4-572cbf478725"
          },
          {
            "beacon": "weaviate://localhost/385bafd2-043c-35c2-8cc9-f44c358608e1",
            "href": "/v1/objects/385bafd2-043c-35c2-8cc9-f44c358608e1"
          },
          {
            "beacon": "weaviate://localhost/3822cdce-ec3c-3a45-913c-e8b054dee552",
            "href": "/v1/objects/3822cdce-ec3c-3a45-913c-e8b054dee552"
          },
          {
            "beacon": "weaviate://localhost/49c5ceb6-42e3-3781-a77d-faa3f6bb1b7c",
            "href": "/v1/objects/49c5ceb6-42e3-3781-a77d-faa3f6bb1b7c"
          },
          {
            "beacon": "weaviate://localhost/6eaf0b3c-3997-326b-b2c7-bb63372786b6",
            "href": "/v1/objects/6eaf0b3c-3997-326b-b2c7-bb63372786b6"
          },
          {
            "beacon": "weaviate://localhost/2e2537b8-6af7-3852-845c-bb867685e489",
            "href": "/v1/objects/2e2537b8-6af7-3852-845c-bb867685e489"
          },
          {
            "beacon": "weaviate://localhost/5315af6b-9218-3b83-bf9d-7cd8d8a72060",
            "href": "/v1/objects/5315af6b-9218-3b83-bf9d-7cd8d8a72060"
          },
          {
            "beacon": "weaviate://localhost/0c863331-e701-3e3b-b581-6359e5d5ff66",
            "href": "/v1/objects/0c863331-e701-3e3b-b581-6359e5d5ff66"
          },
          {
            "beacon": "weaviate://localhost/5596237e-4dec-3ab2-816c-f254fdbf292e",
            "href": "/v1/objects/5596237e-4dec-3ab2-816c-f254fdbf292e"
          },
          {
            "beacon": "weaviate://localhost/19684a3f-1e09-3378-83b0-1adbb89cfcc0",
            "href": "/v1/objects/19684a3f-1e09-3378-83b0-1adbb89cfcc0"
          },
          {
            "beacon": "weaviate://localhost/4550fad3-87f6-3a42-a150-9d89164e2da4",
            "href": "/v1/objects/4550fad3-87f6-3a42-a150-9d89164e2da4"
          },
          {
            "beacon": "weaviate://localhost/d372d75b-bd6a-346f-a5ff-d284ea438390",
            "href": "/v1/objects/d372d75b-bd6a-346f-a5ff-d284ea438390"
          },
          {
            "beacon": "weaviate://localhost/e474a778-d53b-3d18-bf25-02d889f48606",
            "href": "/v1/objects/e474a778-d53b-3d18-bf25-02d889f48606"
          },
          {
            "beacon": "weaviate://localhost/69f52386-1b0b-364b-ad62-c2a14f5e88a9",
            "href": "/v1/objects/69f52386-1b0b-364b-ad62-c2a14f5e88a9"
          },
          {
            "beacon": "weaviate://localhost/dca13d0c-02df-3464-9d5c-d5c4e078d9ef",
            "href": "/v1/objects/dca13d0c-02df-3464-9d5c-d5c4e078d9ef"
          },
          {
            "beacon": "weaviate://localhost/ef364cbb-4324-3351-bb04-d3ff2810d6b6",
            "href": "/v1/objects/ef364cbb-4324-3351-bb04-d3ff2810d6b6"
          },
          {
            "beacon": "weaviate://localhost/9b701b49-2ae2-3789-8bd6-e5163abade28",
            "href": "/v1/objects/9b701b49-2ae2-3789-8bd6-e5163abade28"
          },
          {
            "beacon": "weaviate://localhost/aa776992-f6ae-3f02-a601-edcbbfc4aaad",
            "href": "/v1/objects/aa776992-f6ae-3f02-a601-edcbbfc4aaad"
          },
          {
            "beacon": "weaviate://localhost/ac88d0bc-fb9a-3ff7-9d64-c54b3dc82d8b",
            "href": "/v1/objects/ac88d0bc-fb9a-3ff7-9d64-c54b3dc82d8b"
          },
          {
            "beacon": "weaviate://localhost/86371a3c-1316-326c-9fd1-28fd4a621e31",
            "href": "/v1/objects/86371a3c-1316-326c-9fd1-28fd4a621e31"
          },
          {
            "beacon": "weaviate://localhost/69a538b9-4fe8-350f-9f75-7b2c8a6e994a",
            "href": "/v1/objects/69a538b9-4fe8-350f-9f75-7b2c8a6e994a"
          },
          {
            "beacon": "weaviate://localhost/69722de5-68aa-31d4-abb5-1ff7c6577aed",
            "href": "/v1/objects/69722de5-68aa-31d4-abb5-1ff7c6577aed"
          },
          {
            "beacon": "weaviate://localhost/f1d16b10-5e67-3dcd-bb29-9bd0b2fddf01",
            "href": "/v1/objects/f1d16b10-5e67-3dcd-bb29-9bd0b2fddf01"
          },
          {
            "beacon": "weaviate://localhost/d6d747ee-6ed4-3edd-be96-d53c2ae54d9f",
            "href": "/v1/objects/d6d747ee-6ed4-3edd-be96-d53c2ae54d9f"
          },
          {
            "beacon": "weaviate://localhost/4c50b839-829e-3f4d-a8a2-dee4f83d29d0",
            "href": "/v1/objects/4c50b839-829e-3f4d-a8a2-dee4f83d29d0"
          }
        ],
        "headquartersGeoLocation": {
          "latitude": 37.78083,
          "longitude": -122.39582
        },
        "name": "Wired"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501889,
      "id": "32d5a368-ace8-3bb7-ade7-9f7ff03eddb6",
      "properties": {
        "headquartersGeoLocation": {
          "latitude": 48.892902,
          "longitude": 2.248013
        },
        "name": "The New York Times Company"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501886,
      "id": "7abf5426-5048-31ce-9c0a-822c58b19b47",
      "properties": {
        "hasArticles": [
          {
            "beacon": "weaviate://localhost/56562b3f-ad48-3fc8-8554-e4fa5fcdacb3",
            "href": "/v1/objects/56562b3f-ad48-3fc8-8554-e4fa5fcdacb3"
          },
          {
            "beacon": "weaviate://localhost/cae6c853-4832-3f1a-9005-f762ee4c1a8d",
            "href": "/v1/objects/cae6c853-4832-3f1a-9005-f762ee4c1a8d"
          },
          {
            "beacon": "weaviate://localhost/d1a3cec1-e10a-3584-88ee-aef940382d1e",
            "href": "/v1/objects/d1a3cec1-e10a-3584-88ee-aef940382d1e"
          },
          {
            "beacon": "weaviate://localhost/2fcb33c0-2d8b-3dbc-98c4-6e34fe0e1c0d",
            "href": "/v1/objects/2fcb33c0-2d8b-3dbc-98c4-6e34fe0e1c0d"
          },
          {
            "beacon": "weaviate://localhost/89dda364-8c12-3e5d-b5f5-2ea64b823fe9",
            "href": "/v1/objects/89dda364-8c12-3e5d-b5f5-2ea64b823fe9"
          },
          {
            "beacon": "weaviate://localhost/b1fe0f22-5b6f-3bd1-a0de-2270272a4114",
            "href": "/v1/objects/b1fe0f22-5b6f-3bd1-a0de-2270272a4114"
          },
          {
            "beacon": "weaviate://localhost/5c0b6b39-1c3c-3453-a18b-214ae92e3b37",
            "href": "/v1/objects/5c0b6b39-1c3c-3453-a18b-214ae92e3b37"
          },
          {
            "beacon": "weaviate://localhost/b0007ebd-ea86-3fa4-8fc6-33a93066ac4c",
            "href": "/v1/objects/b0007ebd-ea86-3fa4-8fc6-33a93066ac4c"
          },
          {
            "beacon": "weaviate://localhost/bc53821d-fcee-3c1a-b239-bee0f792c4f6",
            "href": "/v1/objects/bc53821d-fcee-3c1a-b239-bee0f792c4f6"
          },
          {
            "beacon": "weaviate://localhost/620d1838-2ba4-3670-89d1-c801bbe553c2",
            "href": "/v1/objects/620d1838-2ba4-3670-89d1-c801bbe553c2"
          },
          {
            "beacon": "weaviate://localhost/1d4f545d-fff1-3646-98f7-209351358dcf",
            "href": "/v1/objects/1d4f545d-fff1-3646-98f7-209351358dcf"
          },
          {
            "beacon": "weaviate://localhost/81685c32-3b56-36cb-91a6-341c53da75bb",
            "href": "/v1/objects/81685c32-3b56-36cb-91a6-341c53da75bb"
          },
          {
            "beacon": "weaviate://localhost/b39fdddd-3484-33e4-8e3a-d102e823391d",
            "href": "/v1/objects/b39fdddd-3484-33e4-8e3a-d102e823391d"
          },
          {
            "beacon": "weaviate://localhost/11b288af-ce43-3cb9-9f25-f1670525435b",
            "href": "/v1/objects/11b288af-ce43-3cb9-9f25-f1670525435b"
          },
          {
            "beacon": "weaviate://localhost/9c2a40e0-cfb2-3f19-a38a-3a08a02b557d",
            "href": "/v1/objects/9c2a40e0-cfb2-3f19-a38a-3a08a02b557d"
          },
          {
            "beacon": "weaviate://localhost/6314a1f9-a6dd-391f-8ea9-36aa3f901058",
            "href": "/v1/objects/6314a1f9-a6dd-391f-8ea9-36aa3f901058"
          },
          {
            "beacon": "weaviate://localhost/4ee4d9fa-3d30-3505-94f5-608ea2079d21",
            "href": "/v1/objects/4ee4d9fa-3d30-3505-94f5-608ea2079d21"
          },
          {
            "beacon": "weaviate://localhost/f8146023-30d1-341e-be36-4e2397c187cf",
            "href": "/v1/objects/f8146023-30d1-341e-be36-4e2397c187cf"
          },
          {
            "beacon": "weaviate://localhost/c7f0f9ee-caa6-38e3-9834-0cd134bcb8ee",
            "href": "/v1/objects/c7f0f9ee-caa6-38e3-9834-0cd134bcb8ee"
          },
          {
            "beacon": "weaviate://localhost/a506a8bc-4bf1-3d20-8149-2e02f2d1d9b1",
            "href": "/v1/objects/a506a8bc-4bf1-3d20-8149-2e02f2d1d9b1"
          },
          {
            "beacon": "weaviate://localhost/a3ecd09a-fec9-3cbf-8230-1e9e2128a6ce",
            "href": "/v1/objects/a3ecd09a-fec9-3cbf-8230-1e9e2128a6ce"
          },
          {
            "beacon": "weaviate://localhost/afd61736-02a7-35fe-82eb-3e8e875355da",
            "href": "/v1/objects/afd61736-02a7-35fe-82eb-3e8e875355da"
          },
          {
            "beacon": "weaviate://localhost/c254260d-eff7-3414-9c7c-51e3bc728510",
            "href": "/v1/objects/c254260d-eff7-3414-9c7c-51e3bc728510"
          },
          {
            "beacon": "weaviate://localhost/501dd8df-0b8e-3b9b-b485-bd6549f87937",
            "href": "/v1/objects/501dd8df-0b8e-3b9b-b485-bd6549f87937"
          },
          {
            "beacon": "weaviate://localhost/1a4cb1c5-bbb5-3649-8ffa-b0c6a039de34",
            "href": "/v1/objects/1a4cb1c5-bbb5-3649-8ffa-b0c6a039de34"
          },
          {
            "beacon": "weaviate://localhost/9c694fe1-9e25-31fc-b5cb-d3bbd7cbccd0",
            "href": "/v1/objects/9c694fe1-9e25-31fc-b5cb-d3bbd7cbccd0"
          },
          {
            "beacon": "weaviate://localhost/a8d33273-755b-3a23-bf4f-b3b7d3d0f9d6",
            "href": "/v1/objects/a8d33273-755b-3a23-bf4f-b3b7d3d0f9d6"
          },
          {
            "beacon": "weaviate://localhost/0e4a09df-d770-3c1c-af66-dbe1c0205ac4",
            "href": "/v1/objects/0e4a09df-d770-3c1c-af66-dbe1c0205ac4"
          },
          {
            "beacon": "weaviate://localhost/81a4c980-da8b-3124-a835-7c8b4d76fdfb",
            "href": "/v1/objects/81a4c980-da8b-3124-a835-7c8b4d76fdfb"
          },
          {
            "beacon": "weaviate://localhost/0ac549bf-3436-39e5-9ddb-5b13acb7948a",
            "href": "/v1/objects/0ac549bf-3436-39e5-9ddb-5b13acb7948a"
          },
          {
            "beacon": "weaviate://localhost/190c276e-5286-304f-a1fa-d413eca91e9a",
            "href": "/v1/objects/190c276e-5286-304f-a1fa-d413eca91e9a"
          },
          {
            "beacon": "weaviate://localhost/c1123df6-f7f2-3e5d-8908-ebad87a9a8c8",
            "href": "/v1/objects/c1123df6-f7f2-3e5d-8908-ebad87a9a8c8"
          },
          {
            "beacon": "weaviate://localhost/5c9609b1-08f8-37db-a3ab-cce881a744ce",
            "href": "/v1/objects/5c9609b1-08f8-37db-a3ab-cce881a744ce"
          },
          {
            "beacon": "weaviate://localhost/71553cc9-d8c4-3900-b2b8-27fa5891c18b",
            "href": "/v1/objects/71553cc9-d8c4-3900-b2b8-27fa5891c18b"
          },
          {
            "beacon": "weaviate://localhost/d4ee8d0c-7a4f-39a4-8881-699c6539653a",
            "href": "/v1/objects/d4ee8d0c-7a4f-39a4-8881-699c6539653a"
          },
          {
            "beacon": "weaviate://localhost/a730c61f-6cc4-3df9-9e89-1a485b949282",
            "href": "/v1/objects/a730c61f-6cc4-3df9-9e89-1a485b949282"
          },
          {
            "beacon": "weaviate://localhost/bc8a3a4c-2c2a-35d5-98ee-2c1a73ed1b66",
            "href": "/v1/objects/bc8a3a4c-2c2a-35d5-98ee-2c1a73ed1b66"
          },
          {
            "beacon": "weaviate://localhost/dee86272-2e5a-316f-963f-f01f0d766c87",
            "href": "/v1/objects/dee86272-2e5a-316f-963f-f01f0d766c87"
          },
          {
            "beacon": "weaviate://localhost/c4e45189-c1d5-367e-92e7-63e8482cc463",
            "href": "/v1/objects/c4e45189-c1d5-367e-92e7-63e8482cc463"
          },
          {
            "beacon": "weaviate://localhost/213f04f4-d76d-391b-84cc-f358576d8b83",
            "href": "/v1/objects/213f04f4-d76d-391b-84cc-f358576d8b83"
          },
          {
            "beacon": "weaviate://localhost/761cc2cb-f835-3d79-97f5-97dfa31178cc",
            "href": "/v1/objects/761cc2cb-f835-3d79-97f5-97dfa31178cc"
          },
          {
            "beacon": "weaviate://localhost/96f93d5f-aa37-38d7-ae08-e17e005fbf30",
            "href": "/v1/objects/96f93d5f-aa37-38d7-ae08-e17e005fbf30"
          },
          {
            "beacon": "weaviate://localhost/d8891195-8852-30e9-a219-8b487162f462",
            "href": "/v1/objects/d8891195-8852-30e9-a219-8b487162f462"
          },
          {
            "beacon": "weaviate://localhost/6efd31c7-c197-33a6-8deb-b76b38e915fc",
            "href": "/v1/objects/6efd31c7-c197-33a6-8deb-b76b38e915fc"
          },
          {
            "beacon": "weaviate://localhost/fbfc4621-5d59-383d-835e-108e09a2d475",
            "href": "/v1/objects/fbfc4621-5d59-383d-835e-108e09a2d475"
          },
          {
            "beacon": "weaviate://localhost/13c96b7f-5c9a-3023-b485-3eb7037d8471",
            "href": "/v1/objects/13c96b7f-5c9a-3023-b485-3eb7037d8471"
          },
          {
            "beacon": "weaviate://localhost/c7e29900-f802-323e-9266-ca525e99aef3",
            "href": "/v1/objects/c7e29900-f802-323e-9266-ca525e99aef3"
          },
          {
            "beacon": "weaviate://localhost/44885269-6cd7-383d-a7a2-9f9f3cc29eb3",
            "href": "/v1/objects/44885269-6cd7-383d-a7a2-9f9f3cc29eb3"
          },
          {
            "beacon": "weaviate://localhost/807cdbf2-b183-325a-8d7f-8f710fd94812",
            "href": "/v1/objects/807cdbf2-b183-325a-8d7f-8f710fd94812"
          },
          {
            "beacon": "weaviate://localhost/d2b79210-da8d-3d02-bfaf-a57a7ad1781c",
            "href": "/v1/objects/d2b79210-da8d-3d02-bfaf-a57a7ad1781c"
          },
          {
            "beacon": "weaviate://localhost/2e196983-1dd2-3a0e-9314-44ad40ca2bbf",
            "href": "/v1/objects/2e196983-1dd2-3a0e-9314-44ad40ca2bbf"
          },
          {
            "beacon": "weaviate://localhost/3ea843e6-c1e0-3399-a07c-555065bce6f6",
            "href": "/v1/objects/3ea843e6-c1e0-3399-a07c-555065bce6f6"
          },
          {
            "beacon": "weaviate://localhost/979f50d6-eb58-31d6-9301-d59302a6c0ba",
            "href": "/v1/objects/979f50d6-eb58-31d6-9301-d59302a6c0ba"
          },
          {
            "beacon": "weaviate://localhost/bbd97135-32a6-346b-8e8f-d75ec3a01666",
            "href": "/v1/objects/bbd97135-32a6-346b-8e8f-d75ec3a01666"
          },
          {
            "beacon": "weaviate://localhost/0df0b7f0-4eda-3e5a-b166-cfb6894aa447",
            "href": "/v1/objects/0df0b7f0-4eda-3e5a-b166-cfb6894aa447"
          },
          {
            "beacon": "weaviate://localhost/8fbfc263-b30e-3757-8f67-4ab29a455db6",
            "href": "/v1/objects/8fbfc263-b30e-3757-8f67-4ab29a455db6"
          },
          {
            "beacon": "weaviate://localhost/b845ab7f-d2f3-3fe0-ac0c-89122c1833b1",
            "href": "/v1/objects/b845ab7f-d2f3-3fe0-ac0c-89122c1833b1"
          },
          {
            "beacon": "weaviate://localhost/27ad9073-bd97-332a-83f1-7bd327308750",
            "href": "/v1/objects/27ad9073-bd97-332a-83f1-7bd327308750"
          },
          {
            "beacon": "weaviate://localhost/5f1ea9f2-c630-3348-bdce-d9dc9ed85ab4",
            "href": "/v1/objects/5f1ea9f2-c630-3348-bdce-d9dc9ed85ab4"
          },
          {
            "beacon": "weaviate://localhost/1b973c42-a7bc-3b8f-85b6-60320c9ead88",
            "href": "/v1/objects/1b973c42-a7bc-3b8f-85b6-60320c9ead88"
          },
          {
            "beacon": "weaviate://localhost/0433ec96-f015-3167-a43b-d4a8b1190ba0",
            "href": "/v1/objects/0433ec96-f015-3167-a43b-d4a8b1190ba0"
          },
          {
            "beacon": "weaviate://localhost/b48beb19-fdc6-3153-8b25-fe39dc6d7e57",
            "href": "/v1/objects/b48beb19-fdc6-3153-8b25-fe39dc6d7e57"
          },
          {
            "beacon": "weaviate://localhost/1e657fac-07ab-3899-9144-a40b700b88d7",
            "href": "/v1/objects/1e657fac-07ab-3899-9144-a40b700b88d7"
          },
          {
            "beacon": "weaviate://localhost/b217ef2a-381b-3226-95b6-7bf41158b8e0",
            "href": "/v1/objects/b217ef2a-381b-3226-95b6-7bf41158b8e0"
          },
          {
            "beacon": "weaviate://localhost/f32599d7-7aba-31b3-a266-862bc7b00262",
            "href": "/v1/objects/f32599d7-7aba-31b3-a266-862bc7b00262"
          },
          {
            "beacon": "weaviate://localhost/c437755f-0208-3091-be33-5bdc16a53337",
            "href": "/v1/objects/c437755f-0208-3091-be33-5bdc16a53337"
          },
          {
            "beacon": "weaviate://localhost/74377f5e-fab8-32da-b775-69f253610e72",
            "href": "/v1/objects/74377f5e-fab8-32da-b775-69f253610e72"
          },
          {
            "beacon": "weaviate://localhost/e0d211c3-2506-3262-ab62-9d92f6272f37",
            "href": "/v1/objects/e0d211c3-2506-3262-ab62-9d92f6272f37"
          },
          {
            "beacon": "weaviate://localhost/4a92c944-612b-32b8-8a45-4636615dde66",
            "href": "/v1/objects/4a92c944-612b-32b8-8a45-4636615dde66"
          },
          {
            "beacon": "weaviate://localhost/39cc3d60-f607-3044-bb44-1a94c60b444b",
            "href": "/v1/objects/39cc3d60-f607-3044-bb44-1a94c60b444b"
          },
          {
            "beacon": "weaviate://localhost/e7d067cf-6d70-36fe-b408-c8679698d3c6",
            "href": "/v1/objects/e7d067cf-6d70-36fe-b408-c8679698d3c6"
          },
          {
            "beacon": "weaviate://localhost/5f3af694-b04f-3b0c-adfe-638f9f1c2b5f",
            "href": "/v1/objects/5f3af694-b04f-3b0c-adfe-638f9f1c2b5f"
          },
          {
            "beacon": "weaviate://localhost/925094f7-dd4b-3d96-9083-d87442a3cc20",
            "href": "/v1/objects/925094f7-dd4b-3d96-9083-d87442a3cc20"
          },
          {
            "beacon": "weaviate://localhost/b5c82092-999f-3e50-9142-28ba2a1972e6",
            "href": "/v1/objects/b5c82092-999f-3e50-9142-28ba2a1972e6"
          },
          {
            "beacon": "weaviate://localhost/46095fac-0fd1-3128-b333-ede305174189",
            "href": "/v1/objects/46095fac-0fd1-3128-b333-ede305174189"
          },
          {
            "beacon": "weaviate://localhost/10ffc4bf-e45c-3ee9-b896-12974f2794c8",
            "href": "/v1/objects/10ffc4bf-e45c-3ee9-b896-12974f2794c8"
          },
          {
            "beacon": "weaviate://localhost/447b4d1a-f8d9-389d-be2a-67215feb3445",
            "href": "/v1/objects/447b4d1a-f8d9-389d-be2a-67215feb3445"
          },
          {
            "beacon": "weaviate://localhost/1557f6a9-e967-334e-aa21-df1abfc8594b",
            "href": "/v1/objects/1557f6a9-e967-334e-aa21-df1abfc8594b"
          },
          {
            "beacon": "weaviate://localhost/9a4fc12a-d878-3e7a-94df-6d2870bbed3f",
            "href": "/v1/objects/9a4fc12a-d878-3e7a-94df-6d2870bbed3f"
          },
          {
            "beacon": "weaviate://localhost/57c506e3-97ba-3f2f-8d40-a660a6b50a2d",
            "href": "/v1/objects/57c506e3-97ba-3f2f-8d40-a660a6b50a2d"
          },
          {
            "beacon": "weaviate://localhost/e54fc583-b864-32c8-aa60-aa1914812f66",
            "href": "/v1/objects/e54fc583-b864-32c8-aa60-aa1914812f66"
          },
          {
            "beacon": "weaviate://localhost/26dd0be9-2ff6-38b5-a9e4-4e684ddaba0e",
            "href": "/v1/objects/26dd0be9-2ff6-38b5-a9e4-4e684ddaba0e"
          },
          {
            "beacon": "weaviate://localhost/71844443-d6f7-3a50-9252-ae6abb97b639",
            "href": "/v1/objects/71844443-d6f7-3a50-9252-ae6abb97b639"
          },
          {
            "beacon": "weaviate://localhost/30cafb82-c1a4-35cd-b43a-1dff8843806b",
            "href": "/v1/objects/30cafb82-c1a4-35cd-b43a-1dff8843806b"
          },
          {
            "beacon": "weaviate://localhost/76fccff9-d1dd-3fd7-a46a-457efe8aecda",
            "href": "/v1/objects/76fccff9-d1dd-3fd7-a46a-457efe8aecda"
          },
          {
            "beacon": "weaviate://localhost/d2ddf620-23c5-3ed1-827d-437f8b6a6a79",
            "href": "/v1/objects/d2ddf620-23c5-3ed1-827d-437f8b6a6a79"
          },
          {
            "beacon": "weaviate://localhost/c083b8d0-9eec-303b-921b-60b675c92ce4",
            "href": "/v1/objects/c083b8d0-9eec-303b-921b-60b675c92ce4"
          },
          {
            "beacon": "weaviate://localhost/9a87bbc2-e790-3a1d-bd63-3d0674cc8835",
            "href": "/v1/objects/9a87bbc2-e790-3a1d-bd63-3d0674cc8835"
          },
          {
            "beacon": "weaviate://localhost/ab04b8c7-5d9b-3934-bb17-35e27f913e75",
            "href": "/v1/objects/ab04b8c7-5d9b-3934-bb17-35e27f913e75"
          },
          {
            "beacon": "weaviate://localhost/d53accef-273d-3f98-b57b-13bdac3d9f55",
            "href": "/v1/objects/d53accef-273d-3f98-b57b-13bdac3d9f55"
          },
          {
            "beacon": "weaviate://localhost/7d8723c2-9bbb-3747-9024-fb51ea0d2b40",
            "href": "/v1/objects/7d8723c2-9bbb-3747-9024-fb51ea0d2b40"
          },
          {
            "beacon": "weaviate://localhost/af4ca739-f68a-3379-9fa3-7cb88b76f562",
            "href": "/v1/objects/af4ca739-f68a-3379-9fa3-7cb88b76f562"
          },
          {
            "beacon": "weaviate://localhost/783ef89b-255b-3ad1-bae0-756e23520354",
            "href": "/v1/objects/783ef89b-255b-3ad1-bae0-756e23520354"
          },
          {
            "beacon": "weaviate://localhost/ea3c4eef-8396-3cf6-a39e-35ecb2507501",
            "href": "/v1/objects/ea3c4eef-8396-3cf6-a39e-35ecb2507501"
          },
          {
            "beacon": "weaviate://localhost/d5540919-0360-35d4-998f-ead3bd249374",
            "href": "/v1/objects/d5540919-0360-35d4-998f-ead3bd249374"
          },
          {
            "beacon": "weaviate://localhost/cc38b495-8a1e-3139-afa5-646259c20457",
            "href": "/v1/objects/cc38b495-8a1e-3139-afa5-646259c20457"
          },
          {
            "beacon": "weaviate://localhost/89f592c8-acae-3ca3-8a4e-c15b9a526316",
            "href": "/v1/objects/89f592c8-acae-3ca3-8a4e-c15b9a526316"
          },
          {
            "beacon": "weaviate://localhost/bd810a6a-587e-3273-84ed-ef86380e486a",
            "href": "/v1/objects/bd810a6a-587e-3273-84ed-ef86380e486a"
          },
          {
            "beacon": "weaviate://localhost/88ae8767-75a0-399a-8cf2-3089c715a2d2",
            "href": "/v1/objects/88ae8767-75a0-399a-8cf2-3089c715a2d2"
          },
          {
            "beacon": "weaviate://localhost/2284dc91-05b4-3fbd-9f0d-845edcd147d1",
            "href": "/v1/objects/2284dc91-05b4-3fbd-9f0d-845edcd147d1"
          },
          {
            "beacon": "weaviate://localhost/307caac6-02f6-3783-9a62-537b6224cc7e",
            "href": "/v1/objects/307caac6-02f6-3783-9a62-537b6224cc7e"
          },
          {
            "beacon": "weaviate://localhost/e6913d37-0317-351e-b677-90854e968737",
            "href": "/v1/objects/e6913d37-0317-351e-b677-90854e968737"
          },
          {
            "beacon": "weaviate://localhost/2dc05058-a88d-3a91-b7f8-39bac4a11219",
            "href": "/v1/objects/2dc05058-a88d-3a91-b7f8-39bac4a11219"
          },
          {
            "beacon": "weaviate://localhost/86c45cf9-4fbb-3d3d-a0fe-db79fa411248",
            "href": "/v1/objects/86c45cf9-4fbb-3d3d-a0fe-db79fa411248"
          },
          {
            "beacon": "weaviate://localhost/0145a782-6741-3c25-baea-f0df9d9864a0",
            "href": "/v1/objects/0145a782-6741-3c25-baea-f0df9d9864a0"
          },
          {
            "beacon": "weaviate://localhost/3d994a44-cd34-34ab-bece-146e4025dfca",
            "href": "/v1/objects/3d994a44-cd34-34ab-bece-146e4025dfca"
          },
          {
            "beacon": "weaviate://localhost/12ad3fce-8beb-3596-983c-3ef14dbe5ab4",
            "href": "/v1/objects/12ad3fce-8beb-3596-983c-3ef14dbe5ab4"
          },
          {
            "beacon": "weaviate://localhost/cc0c620e-568c-3409-8939-c77b1c6fdfa6",
            "href": "/v1/objects/cc0c620e-568c-3409-8939-c77b1c6fdfa6"
          },
          {
            "beacon": "weaviate://localhost/34de4fda-853c-329a-95a1-172e095c9718",
            "href": "/v1/objects/34de4fda-853c-329a-95a1-172e095c9718"
          },
          {
            "beacon": "weaviate://localhost/885935c9-f831-37a1-8ebc-647b7979a594",
            "href": "/v1/objects/885935c9-f831-37a1-8ebc-647b7979a594"
          },
          {
            "beacon": "weaviate://localhost/c8c171c5-0d9f-31d1-8194-b988f20d9707",
            "href": "/v1/objects/c8c171c5-0d9f-31d1-8194-b988f20d9707"
          },
          {
            "beacon": "weaviate://localhost/45a46c2e-9ab1-3032-9cc4-054f6a20851d",
            "href": "/v1/objects/45a46c2e-9ab1-3032-9cc4-054f6a20851d"
          },
          {
            "beacon": "weaviate://localhost/40e8a4e2-603d-381a-93c9-6f45de6dce7f",
            "href": "/v1/objects/40e8a4e2-603d-381a-93c9-6f45de6dce7f"
          },
          {
            "beacon": "weaviate://localhost/67a9ce78-5062-3684-8518-3c19933777e0",
            "href": "/v1/objects/67a9ce78-5062-3684-8518-3c19933777e0"
          },
          {
            "beacon": "weaviate://localhost/2c672a78-effa-347f-9412-124912a44e24",
            "href": "/v1/objects/2c672a78-effa-347f-9412-124912a44e24"
          },
          {
            "beacon": "weaviate://localhost/73b24cd3-dc6a-38f2-8c0a-70e5232b9aa6",
            "href": "/v1/objects/73b24cd3-dc6a-38f2-8c0a-70e5232b9aa6"
          },
          {
            "beacon": "weaviate://localhost/bd9003cc-d839-3094-99ae-b174a2ec3141",
            "href": "/v1/objects/bd9003cc-d839-3094-99ae-b174a2ec3141"
          },
          {
            "beacon": "weaviate://localhost/42b105ad-23d5-3e6a-b525-6aebead096c0",
            "href": "/v1/objects/42b105ad-23d5-3e6a-b525-6aebead096c0"
          },
          {
            "beacon": "weaviate://localhost/b424d434-be1b-33d6-ba4d-ccea9edf224e",
            "href": "/v1/objects/b424d434-be1b-33d6-ba4d-ccea9edf224e"
          },
          {
            "beacon": "weaviate://localhost/7c078977-dd38-307b-a5be-0bd6027d974e",
            "href": "/v1/objects/7c078977-dd38-307b-a5be-0bd6027d974e"
          },
          {
            "beacon": "weaviate://localhost/4cbc65cb-825f-38dd-8b17-b32dcb223ced",
            "href": "/v1/objects/4cbc65cb-825f-38dd-8b17-b32dcb223ced"
          },
          {
            "beacon": "weaviate://localhost/0bb8e809-3b0d-3e3c-b1a9-a7641b0c80fe",
            "href": "/v1/objects/0bb8e809-3b0d-3e3c-b1a9-a7641b0c80fe"
          },
          {
            "beacon": "weaviate://localhost/68d1a9e8-5069-3692-a52f-a1ac9ad6b942",
            "href": "/v1/objects/68d1a9e8-5069-3692-a52f-a1ac9ad6b942"
          },
          {
            "beacon": "weaviate://localhost/feefd187-16e0-3635-b01e-1a65f495c762",
            "href": "/v1/objects/feefd187-16e0-3635-b01e-1a65f495c762"
          },
          {
            "beacon": "weaviate://localhost/caf62dde-1984-3988-9747-e3f6115d09b1",
            "href": "/v1/objects/caf62dde-1984-3988-9747-e3f6115d09b1"
          },
          {
            "beacon": "weaviate://localhost/4a3e9149-4bbe-348a-a34b-be1a720f0a57",
            "href": "/v1/objects/4a3e9149-4bbe-348a-a34b-be1a720f0a57"
          },
          {
            "beacon": "weaviate://localhost/f0e91f18-b7aa-3446-805e-642e644659ef",
            "href": "/v1/objects/f0e91f18-b7aa-3446-805e-642e644659ef"
          },
          {
            "beacon": "weaviate://localhost/ac08a81e-7271-3dca-a127-807ec0986317",
            "href": "/v1/objects/ac08a81e-7271-3dca-a127-807ec0986317"
          },
          {
            "beacon": "weaviate://localhost/ed08a8ed-e542-33f3-9968-497fdab84400",
            "href": "/v1/objects/ed08a8ed-e542-33f3-9968-497fdab84400"
          },
          {
            "beacon": "weaviate://localhost/2b2769c7-a296-32bd-bc80-8b5d9b935409",
            "href": "/v1/objects/2b2769c7-a296-32bd-bc80-8b5d9b935409"
          },
          {
            "beacon": "weaviate://localhost/d05a79cd-b1eb-3f81-a21d-7639ca04b72a",
            "href": "/v1/objects/d05a79cd-b1eb-3f81-a21d-7639ca04b72a"
          },
          {
            "beacon": "weaviate://localhost/95abaf41-49e0-3260-bad4-6287a58e6b77",
            "href": "/v1/objects/95abaf41-49e0-3260-bad4-6287a58e6b77"
          },
          {
            "beacon": "weaviate://localhost/3621c9ac-b15a-3a04-8fdb-0ac55afb82aa",
            "href": "/v1/objects/3621c9ac-b15a-3a04-8fdb-0ac55afb82aa"
          },
          {
            "beacon": "weaviate://localhost/aa124c26-d428-39c4-8575-e5652352b1f4",
            "href": "/v1/objects/aa124c26-d428-39c4-8575-e5652352b1f4"
          },
          {
            "beacon": "weaviate://localhost/4b8e8b47-8b19-330d-a1c1-97c5aa55fa6b",
            "href": "/v1/objects/4b8e8b47-8b19-330d-a1c1-97c5aa55fa6b"
          },
          {
            "beacon": "weaviate://localhost/9a9238fb-9c66-3afa-8fca-f434332d5a93",
            "href": "/v1/objects/9a9238fb-9c66-3afa-8fca-f434332d5a93"
          },
          {
            "beacon": "weaviate://localhost/30a3344a-4f6e-33b8-b285-620ba5e577bb",
            "href": "/v1/objects/30a3344a-4f6e-33b8-b285-620ba5e577bb"
          },
          {
            "beacon": "weaviate://localhost/9a77394b-6e1f-3a11-827f-b7f33c7ee7cc",
            "href": "/v1/objects/9a77394b-6e1f-3a11-827f-b7f33c7ee7cc"
          },
          {
            "beacon": "weaviate://localhost/0cfbefb9-4d88-3aa9-ad8d-9562155ea3b2",
            "href": "/v1/objects/0cfbefb9-4d88-3aa9-ad8d-9562155ea3b2"
          },
          {
            "beacon": "weaviate://localhost/88386489-fa45-3ec9-8c4c-1a48d0aef706",
            "href": "/v1/objects/88386489-fa45-3ec9-8c4c-1a48d0aef706"
          },
          {
            "beacon": "weaviate://localhost/903e9a3b-da1f-3658-8b9d-2faefd4c6bbf",
            "href": "/v1/objects/903e9a3b-da1f-3658-8b9d-2faefd4c6bbf"
          },
          {
            "beacon": "weaviate://localhost/85e3fa53-179d-3a5f-a2f5-de79a6a5e4d7",
            "href": "/v1/objects/85e3fa53-179d-3a5f-a2f5-de79a6a5e4d7"
          },
          {
            "beacon": "weaviate://localhost/213f59fe-65ea-34a0-ae69-bf4ae1eeb2eb",
            "href": "/v1/objects/213f59fe-65ea-34a0-ae69-bf4ae1eeb2eb"
          },
          {
            "beacon": "weaviate://localhost/c67fb41d-888b-3003-a321-2ecc645b6ca4",
            "href": "/v1/objects/c67fb41d-888b-3003-a321-2ecc645b6ca4"
          },
          {
            "beacon": "weaviate://localhost/3e425e6e-7cc3-36b7-8825-4d748ef5ef7f",
            "href": "/v1/objects/3e425e6e-7cc3-36b7-8825-4d748ef5ef7f"
          },
          {
            "beacon": "weaviate://localhost/8b5392f0-63ce-36c0-b4e8-c2ea3868dd1d",
            "href": "/v1/objects/8b5392f0-63ce-36c0-b4e8-c2ea3868dd1d"
          },
          {
            "beacon": "weaviate://localhost/a7540b21-4986-342d-b9bf-4296e951916d",
            "href": "/v1/objects/a7540b21-4986-342d-b9bf-4296e951916d"
          },
          {
            "beacon": "weaviate://localhost/98e9c120-bd64-34e0-9d5e-4f220ecc0fa4",
            "href": "/v1/objects/98e9c120-bd64-34e0-9d5e-4f220ecc0fa4"
          },
          {
            "beacon": "weaviate://localhost/2e4035ad-3146-33b0-9a79-9730c1a80f15",
            "href": "/v1/objects/2e4035ad-3146-33b0-9a79-9730c1a80f15"
          },
          {
            "beacon": "weaviate://localhost/6feb6ef2-306a-3eb8-b09c-3fb62f001bb2",
            "href": "/v1/objects/6feb6ef2-306a-3eb8-b09c-3fb62f001bb2"
          },
          {
            "beacon": "weaviate://localhost/2135e4ec-0eac-34ae-90a6-f19924e530fa",
            "href": "/v1/objects/2135e4ec-0eac-34ae-90a6-f19924e530fa"
          },
          {
            "beacon": "weaviate://localhost/ac9e5631-8c81-3b4e-a1c6-491713b45b69",
            "href": "/v1/objects/ac9e5631-8c81-3b4e-a1c6-491713b45b69"
          },
          {
            "beacon": "weaviate://localhost/2408e890-791a-3857-ba64-7f58b19d9396",
            "href": "/v1/objects/2408e890-791a-3857-ba64-7f58b19d9396"
          },
          {
            "beacon": "weaviate://localhost/472479c2-1941-31eb-a25d-630b42be00e2",
            "href": "/v1/objects/472479c2-1941-31eb-a25d-630b42be00e2"
          },
          {
            "beacon": "weaviate://localhost/e955f7b9-0211-358d-95ab-91759fa09c9a",
            "href": "/v1/objects/e955f7b9-0211-358d-95ab-91759fa09c9a"
          },
          {
            "beacon": "weaviate://localhost/c4e1dc16-bff3-33ac-93fc-06a2e6b11fae",
            "href": "/v1/objects/c4e1dc16-bff3-33ac-93fc-06a2e6b11fae"
          },
          {
            "beacon": "weaviate://localhost/bc226160-9d56-3578-93be-0680912419f4",
            "href": "/v1/objects/bc226160-9d56-3578-93be-0680912419f4"
          },
          {
            "beacon": "weaviate://localhost/3ed68ccc-3797-3c43-80dc-71a7238328ea",
            "href": "/v1/objects/3ed68ccc-3797-3c43-80dc-71a7238328ea"
          },
          {
            "beacon": "weaviate://localhost/9d48e70a-f9aa-392b-93ae-d7f84946a9f2",
            "href": "/v1/objects/9d48e70a-f9aa-392b-93ae-d7f84946a9f2"
          },
          {
            "beacon": "weaviate://localhost/64a784ab-027c-3e6c-814f-7892d0d15f86",
            "href": "/v1/objects/64a784ab-027c-3e6c-814f-7892d0d15f86"
          },
          {
            "beacon": "weaviate://localhost/105a5ca4-d1e1-3bd6-87fb-e24ede99c68f",
            "href": "/v1/objects/105a5ca4-d1e1-3bd6-87fb-e24ede99c68f"
          },
          {
            "beacon": "weaviate://localhost/30c21b28-8ab1-301c-b9b5-df55bc422424",
            "href": "/v1/objects/30c21b28-8ab1-301c-b9b5-df55bc422424"
          },
          {
            "beacon": "weaviate://localhost/323085d8-f59e-3644-ab0c-ebeaf99c35e3",
            "href": "/v1/objects/323085d8-f59e-3644-ab0c-ebeaf99c35e3"
          },
          {
            "beacon": "weaviate://localhost/1c89e696-af62-3824-a16b-ae72a26e2d46",
            "href": "/v1/objects/1c89e696-af62-3824-a16b-ae72a26e2d46"
          }
        ],
        "headquartersGeoLocation": {
          "latitude": 44.990192,
          "longitude": -93.27538
        },
        "name": "Game Informer"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501888,
      "id": "7e9b9ffe-e645-302d-9d94-517670623b35",
      "properties": {
        "hasArticles": [
          {
            "beacon": "weaviate://localhost/9fe81111-6798-3717-88bf-ad01f4aa87c0",
            "href": "/v1/objects/9fe81111-6798-3717-88bf-ad01f4aa87c0"
          },
          {
            "beacon": "weaviate://localhost/783fd90c-7c88-3a41-8e3b-02a1fda13514",
            "href": "/v1/objects/783fd90c-7c88-3a41-8e3b-02a1fda13514"
          },
          {
            "beacon": "weaviate://localhost/cd11d7ea-2bfa-34f1-a911-d61132669cea",
            "href": "/v1/objects/cd11d7ea-2bfa-34f1-a911-d61132669cea"
          },
          {
            "beacon": "weaviate://localhost/109a66d7-f290-3edb-8755-d0ed8b8c30ed",
            "href": "/v1/objects/109a66d7-f290-3edb-8755-d0ed8b8c30ed"
          },
          {
            "beacon": "weaviate://localhost/0d315866-3de7-363c-ae80-828b59d4e476",
            "href": "/v1/objects/0d315866-3de7-363c-ae80-828b59d4e476"
          },
          {
            "beacon": "weaviate://localhost/a3f13fb0-6756-30d7-b57b-95abc4c3365b",
            "href": "/v1/objects/a3f13fb0-6756-30d7-b57b-95abc4c3365b"
          },
          {
            "beacon": "weaviate://localhost/057b8fb9-98ff-3f1d-b20d-e3a947c4804a",
            "href": "/v1/objects/057b8fb9-98ff-3f1d-b20d-e3a947c4804a"
          },
          {
            "beacon": "weaviate://localhost/e68065f9-ab55-3075-af2d-a8e80e060605",
            "href": "/v1/objects/e68065f9-ab55-3075-af2d-a8e80e060605"
          },
          {
            "beacon": "weaviate://localhost/735142ec-977d-3606-85de-a1af61833afe",
            "href": "/v1/objects/735142ec-977d-3606-85de-a1af61833afe"
          },
          {
            "beacon": "weaviate://localhost/2ce38cd9-8eb4-3623-9412-96e672285029",
            "href": "/v1/objects/2ce38cd9-8eb4-3623-9412-96e672285029"
          },
          {
            "beacon": "weaviate://localhost/695b3dc2-0f9d-364f-9176-778c79865f07",
            "href": "/v1/objects/695b3dc2-0f9d-364f-9176-778c79865f07"
          },
          {
            "beacon": "weaviate://localhost/f728561f-19ae-3351-9df9-bd44280660ee",
            "href": "/v1/objects/f728561f-19ae-3351-9df9-bd44280660ee"
          },
          {
            "beacon": "weaviate://localhost/ff814297-ce3b-3de8-9d1c-9b491002eac6",
            "href": "/v1/objects/ff814297-ce3b-3de8-9d1c-9b491002eac6"
          },
          {
            "beacon": "weaviate://localhost/90f9a0c4-10a6-3de5-a617-b8cee33c4f15",
            "href": "/v1/objects/90f9a0c4-10a6-3de5-a617-b8cee33c4f15"
          },
          {
            "beacon": "weaviate://localhost/ac7e3e31-1de4-3025-b17d-5daaa977e6a0",
            "href": "/v1/objects/ac7e3e31-1de4-3025-b17d-5daaa977e6a0"
          },
          {
            "beacon": "weaviate://localhost/a25fedcd-5ea2-3ae1-8830-5ed5224857f7",
            "href": "/v1/objects/a25fedcd-5ea2-3ae1-8830-5ed5224857f7"
          },
          {
            "beacon": "weaviate://localhost/f97b0c95-3c5c-3b7b-b0be-6533ea980bc7",
            "href": "/v1/objects/f97b0c95-3c5c-3b7b-b0be-6533ea980bc7"
          },
          {
            "beacon": "weaviate://localhost/029b3734-5063-3ea6-b3d6-cc110e415c64",
            "href": "/v1/objects/029b3734-5063-3ea6-b3d6-cc110e415c64"
          },
          {
            "beacon": "weaviate://localhost/1ae7cfca-cad7-3031-98e7-370b3fe21bb9",
            "href": "/v1/objects/1ae7cfca-cad7-3031-98e7-370b3fe21bb9"
          },
          {
            "beacon": "weaviate://localhost/c90bd76b-cffb-30b7-be20-d389b9cdbc99",
            "href": "/v1/objects/c90bd76b-cffb-30b7-be20-d389b9cdbc99"
          },
          {
            "beacon": "weaviate://localhost/65a8639c-70db-3177-93e7-6d6485642cd1",
            "href": "/v1/objects/65a8639c-70db-3177-93e7-6d6485642cd1"
          },
          {
            "beacon": "weaviate://localhost/9ac10933-1fe6-3ca9-95b6-6bbf67955602",
            "href": "/v1/objects/9ac10933-1fe6-3ca9-95b6-6bbf67955602"
          },
          {
            "beacon": "weaviate://localhost/c3e25b53-5fac-3d66-a391-875f8f6eb9cf",
            "href": "/v1/objects/c3e25b53-5fac-3d66-a391-875f8f6eb9cf"
          },
          {
            "beacon": "weaviate://localhost/5c648be7-de75-30ea-a666-82c640d5a9ee",
            "href": "/v1/objects/5c648be7-de75-30ea-a666-82c640d5a9ee"
          },
          {
            "beacon": "weaviate://localhost/25052cf9-693b-390d-ba18-32580f347514",
            "href": "/v1/objects/25052cf9-693b-390d-ba18-32580f347514"
          },
          {
            "beacon": "weaviate://localhost/615e6ea7-4aad-3197-bbd8-355325665e74",
            "href": "/v1/objects/615e6ea7-4aad-3197-bbd8-355325665e74"
          },
          {
            "beacon": "weaviate://localhost/874e409b-91bb-3a21-a5aa-a9585d1f4fbf",
            "href": "/v1/objects/874e409b-91bb-3a21-a5aa-a9585d1f4fbf"
          },
          {
            "beacon": "weaviate://localhost/86079ea0-577a-3001-9a58-8086c724d04b",
            "href": "/v1/objects/86079ea0-577a-3001-9a58-8086c724d04b"
          },
          {
            "beacon": "weaviate://localhost/f960af54-9dea-39ea-a51b-c5163c0b236d",
            "href": "/v1/objects/f960af54-9dea-39ea-a51b-c5163c0b236d"
          },
          {
            "beacon": "weaviate://localhost/b4708c23-5cc8-3bd6-b2c0-fb4bfd73cdbc",
            "href": "/v1/objects/b4708c23-5cc8-3bd6-b2c0-fb4bfd73cdbc"
          },
          {
            "beacon": "weaviate://localhost/5947b3b4-2c77-3527-8427-29d287a9931f",
            "href": "/v1/objects/5947b3b4-2c77-3527-8427-29d287a9931f"
          },
          {
            "beacon": "weaviate://localhost/1074828b-eafb-3976-98e1-a4b1df0c1ce4",
            "href": "/v1/objects/1074828b-eafb-3976-98e1-a4b1df0c1ce4"
          },
          {
            "beacon": "weaviate://localhost/1835e60d-4be4-3aec-be31-1abbd21164f3",
            "href": "/v1/objects/1835e60d-4be4-3aec-be31-1abbd21164f3"
          },
          {
            "beacon": "weaviate://localhost/701493a1-7118-3745-be5b-dc840392fd0c",
            "href": "/v1/objects/701493a1-7118-3745-be5b-dc840392fd0c"
          },
          {
            "beacon": "weaviate://localhost/e488ad02-4094-3e95-abe4-b83b761de3f2",
            "href": "/v1/objects/e488ad02-4094-3e95-abe4-b83b761de3f2"
          },
          {
            "beacon": "weaviate://localhost/b92a923f-9598-3f12-92b6-ad2ad2ad8273",
            "href": "/v1/objects/b92a923f-9598-3f12-92b6-ad2ad2ad8273"
          },
          {
            "beacon": "weaviate://localhost/d48dc1b5-1d86-3b8e-8571-b51e72bf1431",
            "href": "/v1/objects/d48dc1b5-1d86-3b8e-8571-b51e72bf1431"
          },
          {
            "beacon": "weaviate://localhost/c795c23e-0e38-3ebc-90fe-9c95984dd932",
            "href": "/v1/objects/c795c23e-0e38-3ebc-90fe-9c95984dd932"
          },
          {
            "beacon": "weaviate://localhost/b4e9a711-8884-3f23-b4ae-492be8c8e3fb",
            "href": "/v1/objects/b4e9a711-8884-3f23-b4ae-492be8c8e3fb"
          },
          {
            "beacon": "weaviate://localhost/ccc2f864-b031-39e5-a184-dfb12a8c2443",
            "href": "/v1/objects/ccc2f864-b031-39e5-a184-dfb12a8c2443"
          },
          {
            "beacon": "weaviate://localhost/8a69275d-55ce-39d9-a2c6-8f46de6b4030",
            "href": "/v1/objects/8a69275d-55ce-39d9-a2c6-8f46de6b4030"
          },
          {
            "beacon": "weaviate://localhost/b41ee668-def1-3b59-933a-76a443c23853",
            "href": "/v1/objects/b41ee668-def1-3b59-933a-76a443c23853"
          },
          {
            "beacon": "weaviate://localhost/262eb772-6a1b-3e43-b9e5-f6b94aa3cf0e",
            "href": "/v1/objects/262eb772-6a1b-3e43-b9e5-f6b94aa3cf0e"
          },
          {
            "beacon": "weaviate://localhost/03ad13fb-f751-39e1-b780-757d83cb68fd",
            "href": "/v1/objects/03ad13fb-f751-39e1-b780-757d83cb68fd"
          },
          {
            "beacon": "weaviate://localhost/0ceda6dc-8cef-3f3a-b991-d808718b8fb5",
            "href": "/v1/objects/0ceda6dc-8cef-3f3a-b991-d808718b8fb5"
          },
          {
            "beacon": "weaviate://localhost/5d11a90b-b8df-3a96-8195-8d15808de992",
            "href": "/v1/objects/5d11a90b-b8df-3a96-8195-8d15808de992"
          },
          {
            "beacon": "weaviate://localhost/c5c91945-adf1-3758-8209-9e11507ed1ae",
            "href": "/v1/objects/c5c91945-adf1-3758-8209-9e11507ed1ae"
          },
          {
            "beacon": "weaviate://localhost/770c0b2d-3d5f-3134-b795-2a9d383fc4b2",
            "href": "/v1/objects/770c0b2d-3d5f-3134-b795-2a9d383fc4b2"
          },
          {
            "beacon": "weaviate://localhost/915400bb-5ebc-312d-aecf-b80f63618ce1",
            "href": "/v1/objects/915400bb-5ebc-312d-aecf-b80f63618ce1"
          },
          {
            "beacon": "weaviate://localhost/2764e689-9beb-3dcd-9e11-f4beee429732",
            "href": "/v1/objects/2764e689-9beb-3dcd-9e11-f4beee429732"
          },
          {
            "beacon": "weaviate://localhost/ab3f562e-9cc3-3561-b4bd-8374ebde5822",
            "href": "/v1/objects/ab3f562e-9cc3-3561-b4bd-8374ebde5822"
          },
          {
            "beacon": "weaviate://localhost/746a8ee8-56e2-3011-b76c-5ab1e8a51d86",
            "href": "/v1/objects/746a8ee8-56e2-3011-b76c-5ab1e8a51d86"
          },
          {
            "beacon": "weaviate://localhost/76d81f38-a853-399c-8c5d-4afb8aac2d3c",
            "href": "/v1/objects/76d81f38-a853-399c-8c5d-4afb8aac2d3c"
          },
          {
            "beacon": "weaviate://localhost/d12703f9-1697-3109-b29c-a2398a5242b4",
            "href": "/v1/objects/d12703f9-1697-3109-b29c-a2398a5242b4"
          },
          {
            "beacon": "weaviate://localhost/f8af96cb-b92d-3953-90b7-9b2de6d1ada7",
            "href": "/v1/objects/f8af96cb-b92d-3953-90b7-9b2de6d1ada7"
          },
          {
            "beacon": "weaviate://localhost/ad3da564-093b-3c70-b8fe-237118e17d3d",
            "href": "/v1/objects/ad3da564-093b-3c70-b8fe-237118e17d3d"
          },
          {
            "beacon": "weaviate://localhost/f0ad9b01-f168-3891-a363-54fd846e8d92",
            "href": "/v1/objects/f0ad9b01-f168-3891-a363-54fd846e8d92"
          },
          {
            "beacon": "weaviate://localhost/ab03ba56-052d-31dc-85e3-8c376d568325",
            "href": "/v1/objects/ab03ba56-052d-31dc-85e3-8c376d568325"
          },
          {
            "beacon": "weaviate://localhost/352700b2-85a8-3173-80cf-92add1a8c867",
            "href": "/v1/objects/352700b2-85a8-3173-80cf-92add1a8c867"
          },
          {
            "beacon": "weaviate://localhost/6cf40bab-c004-3ff2-9050-38c7703bd81c",
            "href": "/v1/objects/6cf40bab-c004-3ff2-9050-38c7703bd81c"
          },
          {
            "beacon": "weaviate://localhost/9e37713f-3798-3f3c-a8cf-9f6f5eea2674",
            "href": "/v1/objects/9e37713f-3798-3f3c-a8cf-9f6f5eea2674"
          },
          {
            "beacon": "weaviate://localhost/ac333645-db81-3576-ba45-18e859ce702e",
            "href": "/v1/objects/ac333645-db81-3576-ba45-18e859ce702e"
          },
          {
            "beacon": "weaviate://localhost/f04021f4-f430-3d9d-8a7e-a455c2f66954",
            "href": "/v1/objects/f04021f4-f430-3d9d-8a7e-a455c2f66954"
          },
          {
            "beacon": "weaviate://localhost/95027f58-7bbc-3dd8-8d15-44e8f0f4e766",
            "href": "/v1/objects/95027f58-7bbc-3dd8-8d15-44e8f0f4e766"
          },
          {
            "beacon": "weaviate://localhost/d89bbc32-5b0f-3721-911d-95dae3a37ee4",
            "href": "/v1/objects/d89bbc32-5b0f-3721-911d-95dae3a37ee4"
          },
          {
            "beacon": "weaviate://localhost/acf77710-94fa-36a5-9f41-3e2edbeb58f4",
            "href": "/v1/objects/acf77710-94fa-36a5-9f41-3e2edbeb58f4"
          },
          {
            "beacon": "weaviate://localhost/69fcd056-2040-3d47-baa3-8518157c5e4a",
            "href": "/v1/objects/69fcd056-2040-3d47-baa3-8518157c5e4a"
          },
          {
            "beacon": "weaviate://localhost/a178f908-dac8-3727-a8cc-209d23237fde",
            "href": "/v1/objects/a178f908-dac8-3727-a8cc-209d23237fde"
          },
          {
            "beacon": "weaviate://localhost/1b22bfbf-8a5a-3d2a-b020-e32eb7696220",
            "href": "/v1/objects/1b22bfbf-8a5a-3d2a-b020-e32eb7696220"
          },
          {
            "beacon": "weaviate://localhost/7f60a3c6-6a73-3feb-95b3-eee986f99f9e",
            "href": "/v1/objects/7f60a3c6-6a73-3feb-95b3-eee986f99f9e"
          },
          {
            "beacon": "weaviate://localhost/8bb9eb99-e1c5-3c9e-9b55-ef4f2cb5a070",
            "href": "/v1/objects/8bb9eb99-e1c5-3c9e-9b55-ef4f2cb5a070"
          },
          {
            "beacon": "weaviate://localhost/5477fd33-7b89-35e1-b996-3b9887effc32",
            "href": "/v1/objects/5477fd33-7b89-35e1-b996-3b9887effc32"
          },
          {
            "beacon": "weaviate://localhost/2d3b5629-04a5-3a59-8bf9-46094e1af56e",
            "href": "/v1/objects/2d3b5629-04a5-3a59-8bf9-46094e1af56e"
          },
          {
            "beacon": "weaviate://localhost/667a7778-7e35-3b88-b4ac-59b7a5c36dfc",
            "href": "/v1/objects/667a7778-7e35-3b88-b4ac-59b7a5c36dfc"
          },
          {
            "beacon": "weaviate://localhost/2edaf1e3-c1cd-308a-9f7b-8e24d1b48bd4",
            "href": "/v1/objects/2edaf1e3-c1cd-308a-9f7b-8e24d1b48bd4"
          },
          {
            "beacon": "weaviate://localhost/0d3561ac-d6ca-3b40-8171-0006a38b343a",
            "href": "/v1/objects/0d3561ac-d6ca-3b40-8171-0006a38b343a"
          }
        ],
        "headquartersGeoLocation": {
          "latitude": 40.71274,
          "longitude": -74.01338
        },
        "name": "New Yorker"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501891,
      "id": "8e14bddf-cd2e-3f5b-8fd5-6e34ee13999e",
      "properties": {
        "headquartersGeoLocation": {
          "latitude": 40.75743,
          "longitude": -73.982704
        },
        "name": "Wall Street Journal"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501890,
      "id": "9f0c7463-8633-30ff-99e9-fd84349018f5",
      "properties": {
        "headquartersGeoLocation": {
          "latitude": 48.892902,
          "longitude": 2.248013
        },
        "name": "New York Times"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501893,
      "id": "ac884d35-ccb4-3937-81f8-8474a4d7a549",
      "properties": {
        "hasArticles": [
          {
            "beacon": "weaviate://localhost/743565ac-0480-3e68-8950-9a7240fa2f2a",
            "href": "/v1/objects/743565ac-0480-3e68-8950-9a7240fa2f2a"
          },
          {
            "beacon": "weaviate://localhost/2a3622c9-f23f-352c-9be5-a0bf1ffd3733",
            "href": "/v1/objects/2a3622c9-f23f-352c-9be5-a0bf1ffd3733"
          },
          {
            "beacon": "weaviate://localhost/43d7d71a-19c3-358c-8524-7e6a4de97f86",
            "href": "/v1/objects/43d7d71a-19c3-358c-8524-7e6a4de97f86"
          },
          {
            "beacon": "weaviate://localhost/c054d486-0f7c-31f4-b3da-a409b798bfbb",
            "href": "/v1/objects/c054d486-0f7c-31f4-b3da-a409b798bfbb"
          },
          {
            "beacon": "weaviate://localhost/7a6c1fb4-8258-3ec9-836c-7a16bf7f7a7d",
            "href": "/v1/objects/7a6c1fb4-8258-3ec9-836c-7a16bf7f7a7d"
          },
          {
            "beacon": "weaviate://localhost/be372c9f-da67-31bc-9ac6-0738162042a3",
            "href": "/v1/objects/be372c9f-da67-31bc-9ac6-0738162042a3"
          },
          {
            "beacon": "weaviate://localhost/2ee66700-84c7-3aa2-802e-5c88cebf69b9",
            "href": "/v1/objects/2ee66700-84c7-3aa2-802e-5c88cebf69b9"
          },
          {
            "beacon": "weaviate://localhost/06c1cf52-3463-3457-8d6f-977e0e5b6903",
            "href": "/v1/objects/06c1cf52-3463-3457-8d6f-977e0e5b6903"
          },
          {
            "beacon": "weaviate://localhost/efde823a-f4c6-3af7-9e32-1f1003207a67",
            "href": "/v1/objects/efde823a-f4c6-3af7-9e32-1f1003207a67"
          },
          {
            "beacon": "weaviate://localhost/d0b39bd4-74ed-3841-9459-85b26fbc00ae",
            "href": "/v1/objects/d0b39bd4-74ed-3841-9459-85b26fbc00ae"
          },
          {
            "beacon": "weaviate://localhost/c63b1a9c-1270-3530-a84a-af7391c50698",
            "href": "/v1/objects/c63b1a9c-1270-3530-a84a-af7391c50698"
          },
          {
            "beacon": "weaviate://localhost/22eae5b6-538f-3644-b7d4-7021bc66b571",
            "href": "/v1/objects/22eae5b6-538f-3644-b7d4-7021bc66b571"
          },
          {
            "beacon": "weaviate://localhost/6b97a22c-cb86-311e-8f5e-31fa0028b38a",
            "href": "/v1/objects/6b97a22c-cb86-311e-8f5e-31fa0028b38a"
          },
          {
            "beacon": "weaviate://localhost/38f06d9c-4ba8-3c1e-b369-312a2959174f",
            "href": "/v1/objects/38f06d9c-4ba8-3c1e-b369-312a2959174f"
          },
          {
            "beacon": "weaviate://localhost/f4946724-42d4-3e6b-a52e-96a1f13e5209",
            "href": "/v1/objects/f4946724-42d4-3e6b-a52e-96a1f13e5209"
          },
          {
            "beacon": "weaviate://localhost/f6754dce-8371-30f4-978e-aa19eb190a74",
            "href": "/v1/objects/f6754dce-8371-30f4-978e-aa19eb190a74"
          },
          {
            "beacon": "weaviate://localhost/c7de74d2-75ef-3b1b-830d-07c8c89e5fcb",
            "href": "/v1/objects/c7de74d2-75ef-3b1b-830d-07c8c89e5fcb"
          },
          {
            "beacon": "weaviate://localhost/ccda1bbf-434d-3bd2-af7b-fc684fd47ed1",
            "href": "/v1/objects/ccda1bbf-434d-3bd2-af7b-fc684fd47ed1"
          },
          {
            "beacon": "weaviate://localhost/7ab39c27-ec4b-3e48-960b-34803c4ff8c2",
            "href": "/v1/objects/7ab39c27-ec4b-3e48-960b-34803c4ff8c2"
          },
          {
            "beacon": "weaviate://localhost/9a7c3f5e-1f1b-3857-afc6-1ec73accc9e7",
            "href": "/v1/objects/9a7c3f5e-1f1b-3857-afc6-1ec73accc9e7"
          },
          {
            "beacon": "weaviate://localhost/4acaddee-ed96-368d-85fa-eebd9c7827e0",
            "href": "/v1/objects/4acaddee-ed96-368d-85fa-eebd9c7827e0"
          },
          {
            "beacon": "weaviate://localhost/27ef5f9a-627b-39a1-8c0a-4c1f45bcba63",
            "href": "/v1/objects/27ef5f9a-627b-39a1-8c0a-4c1f45bcba63"
          },
          {
            "beacon": "weaviate://localhost/f5c1f90e-4dbe-30fd-9468-a06479366929",
            "href": "/v1/objects/f5c1f90e-4dbe-30fd-9468-a06479366929"
          },
          {
            "beacon": "weaviate://localhost/8818813a-187d-35f2-9692-a600c5e454b0",
            "href": "/v1/objects/8818813a-187d-35f2-9692-a600c5e454b0"
          },
          {
            "beacon": "weaviate://localhost/d97c1a45-2d6f-3e23-bb5a-e2a37b52237a",
            "href": "/v1/objects/d97c1a45-2d6f-3e23-bb5a-e2a37b52237a"
          },
          {
            "beacon": "weaviate://localhost/00ac6d86-84d1-36b7-b5d4-eee241d35aba",
            "href": "/v1/objects/00ac6d86-84d1-36b7-b5d4-eee241d35aba"
          },
          {
            "beacon": "weaviate://localhost/a3474a0c-9e9d-3939-ac9d-382639e99341",
            "href": "/v1/objects/a3474a0c-9e9d-3939-ac9d-382639e99341"
          },
          {
            "beacon": "weaviate://localhost/2b3a67b8-1f23-3be9-96c3-c26f44b939b4",
            "href": "/v1/objects/2b3a67b8-1f23-3be9-96c3-c26f44b939b4"
          },
          {
            "beacon": "weaviate://localhost/8c702800-2959-377e-a965-6ee9f0bc77e3",
            "href": "/v1/objects/8c702800-2959-377e-a965-6ee9f0bc77e3"
          },
          {
            "beacon": "weaviate://localhost/6103d566-6f27-39e7-9d71-bf02e7140157",
            "href": "/v1/objects/6103d566-6f27-39e7-9d71-bf02e7140157"
          },
          {
            "beacon": "weaviate://localhost/86ef407c-1b8b-3910-8a08-aea23cd75b20",
            "href": "/v1/objects/86ef407c-1b8b-3910-8a08-aea23cd75b20"
          },
          {
            "beacon": "weaviate://localhost/76d06cfe-9e29-3e73-bedf-8aeecbdd1079",
            "href": "/v1/objects/76d06cfe-9e29-3e73-bedf-8aeecbdd1079"
          },
          {
            "beacon": "weaviate://localhost/6c811e8c-e00b-3bf7-95e0-fa4dc20f1c8e",
            "href": "/v1/objects/6c811e8c-e00b-3bf7-95e0-fa4dc20f1c8e"
          },
          {
            "beacon": "weaviate://localhost/4c7176b9-7349-3a19-9a6c-ca7f08161727",
            "href": "/v1/objects/4c7176b9-7349-3a19-9a6c-ca7f08161727"
          },
          {
            "beacon": "weaviate://localhost/a681bbca-dd1c-3cc6-ab71-05e12b3be16e",
            "href": "/v1/objects/a681bbca-dd1c-3cc6-ab71-05e12b3be16e"
          },
          {
            "beacon": "weaviate://localhost/a265dd13-f886-3205-b314-f6361e60f860",
            "href": "/v1/objects/a265dd13-f886-3205-b314-f6361e60f860"
          },
          {
            "beacon": "weaviate://localhost/bf006793-7e89-3e90-aa0b-1d657c7c461a",
            "href": "/v1/objects/bf006793-7e89-3e90-aa0b-1d657c7c461a"
          },
          {
            "beacon": "weaviate://localhost/92266825-9574-3ca0-840c-8d4a9dc65bd2",
            "href": "/v1/objects/92266825-9574-3ca0-840c-8d4a9dc65bd2"
          },
          {
            "beacon": "weaviate://localhost/703eb366-8994-3a1a-9a02-267f7f284b21",
            "href": "/v1/objects/703eb366-8994-3a1a-9a02-267f7f284b21"
          },
          {
            "beacon": "weaviate://localhost/72b0d1ab-8ef8-30b7-b746-277923bcb3f5",
            "href": "/v1/objects/72b0d1ab-8ef8-30b7-b746-277923bcb3f5"
          },
          {
            "beacon": "weaviate://localhost/416c43c4-2a4f-3933-9042-5f9c1c7933f9",
            "href": "/v1/objects/416c43c4-2a4f-3933-9042-5f9c1c7933f9"
          },
          {
            "beacon": "weaviate://localhost/64c3530c-8016-3acd-bcd8-af6a8c3132bb",
            "href": "/v1/objects/64c3530c-8016-3acd-bcd8-af6a8c3132bb"
          },
          {
            "beacon": "weaviate://localhost/89ba7627-6d79-32dd-a3ba-1ffc169062e7",
            "href": "/v1/objects/89ba7627-6d79-32dd-a3ba-1ffc169062e7"
          },
          {
            "beacon": "weaviate://localhost/2b729856-1872-37f5-895b-9e30266d8ff1",
            "href": "/v1/objects/2b729856-1872-37f5-895b-9e30266d8ff1"
          },
          {
            "beacon": "weaviate://localhost/02a291a5-d2ce-3a35-911e-e7acdb17589f",
            "href": "/v1/objects/02a291a5-d2ce-3a35-911e-e7acdb17589f"
          },
          {
            "beacon": "weaviate://localhost/04ea51a1-4597-3e90-94a8-f942217594d7",
            "href": "/v1/objects/04ea51a1-4597-3e90-94a8-f942217594d7"
          },
          {
            "beacon": "weaviate://localhost/52b100fd-6241-3835-90c0-4397b6c54711",
            "href": "/v1/objects/52b100fd-6241-3835-90c0-4397b6c54711"
          },
          {
            "beacon": "weaviate://localhost/eb96034d-a9f0-365c-bd4a-2a4d978ab09d",
            "href": "/v1/objects/eb96034d-a9f0-365c-bd4a-2a4d978ab09d"
          },
          {
            "beacon": "weaviate://localhost/bfc6b33c-954a-3ae7-993d-64bb865ba72e",
            "href": "/v1/objects/bfc6b33c-954a-3ae7-993d-64bb865ba72e"
          },
          {
            "beacon": "weaviate://localhost/a430dcbf-0aad-372d-ab26-601a78a00cdb",
            "href": "/v1/objects/a430dcbf-0aad-372d-ab26-601a78a00cdb"
          },
          {
            "beacon": "weaviate://localhost/5c1bacf5-7be1-38e2-8616-e17d49e85210",
            "href": "/v1/objects/5c1bacf5-7be1-38e2-8616-e17d49e85210"
          },
          {
            "beacon": "weaviate://localhost/cc60a2fc-71c5-36d5-96c3-7e47062618c6",
            "href": "/v1/objects/cc60a2fc-71c5-36d5-96c3-7e47062618c6"
          },
          {
            "beacon": "weaviate://localhost/81cbf621-52af-3409-b4b0-0ec44a06a7c5",
            "href": "/v1/objects/81cbf621-52af-3409-b4b0-0ec44a06a7c5"
          },
          {
            "beacon": "weaviate://localhost/6b67af24-fc42-3cf7-a9d4-b781a8b6be25",
            "href": "/v1/objects/6b67af24-fc42-3cf7-a9d4-b781a8b6be25"
          },
          {
            "beacon": "weaviate://localhost/1cc4ddc6-1ccc-3721-b2a0-2ffb6911eccd",
            "href": "/v1/objects/1cc4ddc6-1ccc-3721-b2a0-2ffb6911eccd"
          },
          {
            "beacon": "weaviate://localhost/f4e37557-cc4e-323b-8d26-a7ea65c2f914",
            "href": "/v1/objects/f4e37557-cc4e-323b-8d26-a7ea65c2f914"
          },
          {
            "beacon": "weaviate://localhost/6eb3cf27-9f1d-3f2e-b66c-4cd359c41716",
            "href": "/v1/objects/6eb3cf27-9f1d-3f2e-b66c-4cd359c41716"
          },
          {
            "beacon": "weaviate://localhost/7d6ed4df-fc59-39bb-8900-4bad5c966e41",
            "href": "/v1/objects/7d6ed4df-fc59-39bb-8900-4bad5c966e41"
          },
          {
            "beacon": "weaviate://localhost/a9e5b8df-50aa-31d2-a242-0bccda8f2fd8",
            "href": "/v1/objects/a9e5b8df-50aa-31d2-a242-0bccda8f2fd8"
          },
          {
            "beacon": "weaviate://localhost/08418f57-78b4-3749-a0c4-0a1d160e4ec3",
            "href": "/v1/objects/08418f57-78b4-3749-a0c4-0a1d160e4ec3"
          },
          {
            "beacon": "weaviate://localhost/7d920a08-7192-316f-aedc-a5fcd8e49ba8",
            "href": "/v1/objects/7d920a08-7192-316f-aedc-a5fcd8e49ba8"
          },
          {
            "beacon": "weaviate://localhost/6988d1da-6fee-3d2a-838e-58dc90ccd66e",
            "href": "/v1/objects/6988d1da-6fee-3d2a-838e-58dc90ccd66e"
          },
          {
            "beacon": "weaviate://localhost/7de85a18-ed6b-3aab-b22e-d0cae166bd3d",
            "href": "/v1/objects/7de85a18-ed6b-3aab-b22e-d0cae166bd3d"
          },
          {
            "beacon": "weaviate://localhost/88272540-90b4-365f-bb9b-7c52ca65934c",
            "href": "/v1/objects/88272540-90b4-365f-bb9b-7c52ca65934c"
          },
          {
            "beacon": "weaviate://localhost/ca6153a8-c7db-3f29-8623-7a99d21300a1",
            "href": "/v1/objects/ca6153a8-c7db-3f29-8623-7a99d21300a1"
          },
          {
            "beacon": "weaviate://localhost/2125d52a-6052-31d8-bb74-2c527f5e3a77",
            "href": "/v1/objects/2125d52a-6052-31d8-bb74-2c527f5e3a77"
          },
          {
            "beacon": "weaviate://localhost/94826b0c-124a-39ea-a63b-55756b3c3aa8",
            "href": "/v1/objects/94826b0c-124a-39ea-a63b-55756b3c3aa8"
          },
          {
            "beacon": "weaviate://localhost/a79362f1-fa63-3b2a-8f6c-75bf29edb04f",
            "href": "/v1/objects/a79362f1-fa63-3b2a-8f6c-75bf29edb04f"
          },
          {
            "beacon": "weaviate://localhost/06c609f3-b362-3f05-b1bf-eae86f3942b2",
            "href": "/v1/objects/06c609f3-b362-3f05-b1bf-eae86f3942b2"
          },
          {
            "beacon": "weaviate://localhost/fed44d12-5306-3fa5-917f-c4dee2d9f054",
            "href": "/v1/objects/fed44d12-5306-3fa5-917f-c4dee2d9f054"
          },
          {
            "beacon": "weaviate://localhost/00d7b615-b8f4-32de-b47d-1148e896f9c3",
            "href": "/v1/objects/00d7b615-b8f4-32de-b47d-1148e896f9c3"
          },
          {
            "beacon": "weaviate://localhost/83a87895-8329-3b71-a5c1-7e4277e86997",
            "href": "/v1/objects/83a87895-8329-3b71-a5c1-7e4277e86997"
          },
          {
            "beacon": "weaviate://localhost/4f64824a-953d-3171-ac9c-c5cc7fb4e380",
            "href": "/v1/objects/4f64824a-953d-3171-ac9c-c5cc7fb4e380"
          },
          {
            "beacon": "weaviate://localhost/7bb7ae61-8972-3302-bdab-baf0b6038744",
            "href": "/v1/objects/7bb7ae61-8972-3302-bdab-baf0b6038744"
          },
          {
            "beacon": "weaviate://localhost/1765a020-4745-3bf0-9389-e90d0ba2cd9a",
            "href": "/v1/objects/1765a020-4745-3bf0-9389-e90d0ba2cd9a"
          },
          {
            "beacon": "weaviate://localhost/430cba4f-792b-3a3f-a22f-c24e10ef6994",
            "href": "/v1/objects/430cba4f-792b-3a3f-a22f-c24e10ef6994"
          },
          {
            "beacon": "weaviate://localhost/890ecdc1-8547-381a-bf6a-c672501b404c",
            "href": "/v1/objects/890ecdc1-8547-381a-bf6a-c672501b404c"
          },
          {
            "beacon": "weaviate://localhost/f81dbc89-a0c4-3cc0-9fc1-9551b125abb1",
            "href": "/v1/objects/f81dbc89-a0c4-3cc0-9fc1-9551b125abb1"
          },
          {
            "beacon": "weaviate://localhost/532464d8-7850-3357-8028-3de852732937",
            "href": "/v1/objects/532464d8-7850-3357-8028-3de852732937"
          },
          {
            "beacon": "weaviate://localhost/0b61bb3e-54a9-3cab-853e-e7cec327513a",
            "href": "/v1/objects/0b61bb3e-54a9-3cab-853e-e7cec327513a"
          },
          {
            "beacon": "weaviate://localhost/112e665d-9711-37c1-a37c-ce82cec3d923",
            "href": "/v1/objects/112e665d-9711-37c1-a37c-ce82cec3d923"
          },
          {
            "beacon": "weaviate://localhost/b2752651-892d-3892-9476-cfd8c2ecf155",
            "href": "/v1/objects/b2752651-892d-3892-9476-cfd8c2ecf155"
          },
          {
            "beacon": "weaviate://localhost/358b4c5e-6c6f-3bd8-9763-955529ac212d",
            "href": "/v1/objects/358b4c5e-6c6f-3bd8-9763-955529ac212d"
          },
          {
            "beacon": "weaviate://localhost/0fa9cd58-c771-3ba1-9b36-cb882c45dff6",
            "href": "/v1/objects/0fa9cd58-c771-3ba1-9b36-cb882c45dff6"
          },
          {
            "beacon": "weaviate://localhost/6477099b-710c-3de4-97fd-751dd719223a",
            "href": "/v1/objects/6477099b-710c-3de4-97fd-751dd719223a"
          },
          {
            "beacon": "weaviate://localhost/6395348f-55a3-3988-b232-48a70d40395d",
            "href": "/v1/objects/6395348f-55a3-3988-b232-48a70d40395d"
          },
          {
            "beacon": "weaviate://localhost/45850b6a-81be-35c5-a5eb-4676cdec4ab9",
            "href": "/v1/objects/45850b6a-81be-35c5-a5eb-4676cdec4ab9"
          },
          {
            "beacon": "weaviate://localhost/4cc9eada-0cec-3fec-8334-90552ee79369",
            "href": "/v1/objects/4cc9eada-0cec-3fec-8334-90552ee79369"
          },
          {
            "beacon": "weaviate://localhost/121b291f-d0b5-3577-b7f4-a76a1ae1de72",
            "href": "/v1/objects/121b291f-d0b5-3577-b7f4-a76a1ae1de72"
          },
          {
            "beacon": "weaviate://localhost/c7602e2b-b4f0-3062-9bd1-4410aef2d8fa",
            "href": "/v1/objects/c7602e2b-b4f0-3062-9bd1-4410aef2d8fa"
          },
          {
            "beacon": "weaviate://localhost/c52eb29a-0509-33b3-b9e1-fe78210e70ac",
            "href": "/v1/objects/c52eb29a-0509-33b3-b9e1-fe78210e70ac"
          },
          {
            "beacon": "weaviate://localhost/d3160927-c088-3c1b-a3d5-87ca42edbdf5",
            "href": "/v1/objects/d3160927-c088-3c1b-a3d5-87ca42edbdf5"
          },
          {
            "beacon": "weaviate://localhost/cb55b083-b1ce-331d-a0f7-d01f5bda4f48",
            "href": "/v1/objects/cb55b083-b1ce-331d-a0f7-d01f5bda4f48"
          },
          {
            "beacon": "weaviate://localhost/70d450b1-e156-3a41-845e-3b2e143512ef",
            "href": "/v1/objects/70d450b1-e156-3a41-845e-3b2e143512ef"
          },
          {
            "beacon": "weaviate://localhost/aed21cea-499a-35a4-9e18-be5188167d1d",
            "href": "/v1/objects/aed21cea-499a-35a4-9e18-be5188167d1d"
          },
          {
            "beacon": "weaviate://localhost/60458caf-1706-35a1-a430-faad8fced7c8",
            "href": "/v1/objects/60458caf-1706-35a1-a430-faad8fced7c8"
          },
          {
            "beacon": "weaviate://localhost/2fde81b0-7577-31ec-8300-aa1a26695d3b",
            "href": "/v1/objects/2fde81b0-7577-31ec-8300-aa1a26695d3b"
          },
          {
            "beacon": "weaviate://localhost/b0cc5ce1-36e9-316e-b95e-2a883010f30e",
            "href": "/v1/objects/b0cc5ce1-36e9-316e-b95e-2a883010f30e"
          },
          {
            "beacon": "weaviate://localhost/873453f6-d3de-36e5-bdc4-fa5d8f7b02e8",
            "href": "/v1/objects/873453f6-d3de-36e5-bdc4-fa5d8f7b02e8"
          },
          {
            "beacon": "weaviate://localhost/75096ab1-2111-34f2-b80d-42f62c2ce60e",
            "href": "/v1/objects/75096ab1-2111-34f2-b80d-42f62c2ce60e"
          },
          {
            "beacon": "weaviate://localhost/4617c1c8-1c1e-3108-a298-32be2dcee3f5",
            "href": "/v1/objects/4617c1c8-1c1e-3108-a298-32be2dcee3f5"
          },
          {
            "beacon": "weaviate://localhost/43ab0bfa-3268-329f-aee5-f26e5aee6a42",
            "href": "/v1/objects/43ab0bfa-3268-329f-aee5-f26e5aee6a42"
          },
          {
            "beacon": "weaviate://localhost/0600dc9a-7f23-3784-8c70-d945ed7e9a99",
            "href": "/v1/objects/0600dc9a-7f23-3784-8c70-d945ed7e9a99"
          },
          {
            "beacon": "weaviate://localhost/248a0f7d-2dd3-3983-b9e3-c846aa6fb4ca",
            "href": "/v1/objects/248a0f7d-2dd3-3983-b9e3-c846aa6fb4ca"
          },
          {
            "beacon": "weaviate://localhost/33dcfe5a-22ce-3624-a759-132f49b80345",
            "href": "/v1/objects/33dcfe5a-22ce-3624-a759-132f49b80345"
          },
          {
            "beacon": "weaviate://localhost/e5318d20-3c24-313f-ace9-e097c3a30840",
            "href": "/v1/objects/e5318d20-3c24-313f-ace9-e097c3a30840"
          },
          {
            "beacon": "weaviate://localhost/4105ec38-7b63-338d-b001-f1cea9e9f1b9",
            "href": "/v1/objects/4105ec38-7b63-338d-b001-f1cea9e9f1b9"
          },
          {
            "beacon": "weaviate://localhost/1885327f-35d6-32c9-a201-29600abb7b43",
            "href": "/v1/objects/1885327f-35d6-32c9-a201-29600abb7b43"
          },
          {
            "beacon": "weaviate://localhost/78bc3583-5df0-31a0-b9d7-40d73677d963",
            "href": "/v1/objects/78bc3583-5df0-31a0-b9d7-40d73677d963"
          },
          {
            "beacon": "weaviate://localhost/d567c549-4e51-3609-b550-b2b9fbb5ca51",
            "href": "/v1/objects/d567c549-4e51-3609-b550-b2b9fbb5ca51"
          },
          {
            "beacon": "weaviate://localhost/decc8fb8-d37c-39ac-a3c9-accb5c974fcd",
            "href": "/v1/objects/decc8fb8-d37c-39ac-a3c9-accb5c974fcd"
          },
          {
            "beacon": "weaviate://localhost/87bd0e60-7e91-3842-82f8-97aa7bbee787",
            "href": "/v1/objects/87bd0e60-7e91-3842-82f8-97aa7bbee787"
          },
          {
            "beacon": "weaviate://localhost/30609ed4-a6ed-35cb-9932-69b1581492be",
            "href": "/v1/objects/30609ed4-a6ed-35cb-9932-69b1581492be"
          },
          {
            "beacon": "weaviate://localhost/fba51a8a-9133-3c22-831c-3ac0c984b989",
            "href": "/v1/objects/fba51a8a-9133-3c22-831c-3ac0c984b989"
          },
          {
            "beacon": "weaviate://localhost/35160d39-ecbc-3d5d-ba1b-593dd3041c22",
            "href": "/v1/objects/35160d39-ecbc-3d5d-ba1b-593dd3041c22"
          },
          {
            "beacon": "weaviate://localhost/078f6691-4547-30a1-b88a-f4ce907c29f7",
            "href": "/v1/objects/078f6691-4547-30a1-b88a-f4ce907c29f7"
          },
          {
            "beacon": "weaviate://localhost/01e24f97-a23e-38f7-9272-fbcf3b495f3e",
            "href": "/v1/objects/01e24f97-a23e-38f7-9272-fbcf3b495f3e"
          },
          {
            "beacon": "weaviate://localhost/1fa7f744-cc89-3a10-ba4a-e228d42591d7",
            "href": "/v1/objects/1fa7f744-cc89-3a10-ba4a-e228d42591d7"
          },
          {
            "beacon": "weaviate://localhost/783a95f3-d622-3d80-ad8f-62ca821548f5",
            "href": "/v1/objects/783a95f3-d622-3d80-ad8f-62ca821548f5"
          },
          {
            "beacon": "weaviate://localhost/c30e678b-f6b0-3eed-814b-5ce5d850fcbe",
            "href": "/v1/objects/c30e678b-f6b0-3eed-814b-5ce5d850fcbe"
          },
          {
            "beacon": "weaviate://localhost/0b070623-ed22-318a-8eb2-3cc2e43eae8a",
            "href": "/v1/objects/0b070623-ed22-318a-8eb2-3cc2e43eae8a"
          },
          {
            "beacon": "weaviate://localhost/a0a603b9-38b7-36a0-8ac9-18d8ee671d59",
            "href": "/v1/objects/a0a603b9-38b7-36a0-8ac9-18d8ee671d59"
          },
          {
            "beacon": "weaviate://localhost/28351587-e560-30e2-a6f9-ca85aa86c70e",
            "href": "/v1/objects/28351587-e560-30e2-a6f9-ca85aa86c70e"
          },
          {
            "beacon": "weaviate://localhost/cd798fb9-50f6-3baa-8321-0eec06ed6919",
            "href": "/v1/objects/cd798fb9-50f6-3baa-8321-0eec06ed6919"
          },
          {
            "beacon": "weaviate://localhost/99300ffe-a926-3bf6-b8f7-57024f8cf44a",
            "href": "/v1/objects/99300ffe-a926-3bf6-b8f7-57024f8cf44a"
          }
        ],
        "headquartersGeoLocation": {
          "latitude": 40.751537,
          "longitude": -73.98626
        },
        "name": "Vogue"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501892,
      "id": "b7285ce8-a172-3053-b74d-7200a96bce26",
      "properties": {
        "hasArticles": [
          {
            "beacon": "weaviate://localhost/8e05246d-6869-368c-94e3-5da7ccefa939",
            "href": "/v1/objects/8e05246d-6869-368c-94e3-5da7ccefa939"
          },
          {
            "beacon": "weaviate://localhost/15e65e78-8209-3c09-9f0b-bd60349f57a1",
            "href": "/v1/objects/15e65e78-8209-3c09-9f0b-bd60349f57a1"
          },
          {
            "beacon": "weaviate://localhost/2d85606a-2063-348c-a1de-cbb62e6f8ea8",
            "href": "/v1/objects/2d85606a-2063-348c-a1de-cbb62e6f8ea8"
          },
          {
            "beacon": "weaviate://localhost/0533b2be-b25d-3f37-87db-33ee84e9c2a8",
            "href": "/v1/objects/0533b2be-b25d-3f37-87db-33ee84e9c2a8"
          },
          {
            "beacon": "weaviate://localhost/ce3406df-cd6c-36ed-acdd-ded7821a9961",
            "href": "/v1/objects/ce3406df-cd6c-36ed-acdd-ded7821a9961"
          },
          {
            "beacon": "weaviate://localhost/c42a4369-b95e-3c24-aef7-02c7053c671e",
            "href": "/v1/objects/c42a4369-b95e-3c24-aef7-02c7053c671e"
          },
          {
            "beacon": "weaviate://localhost/17ce111b-e66f-3bfa-a37d-8063c5de2e7f",
            "href": "/v1/objects/17ce111b-e66f-3bfa-a37d-8063c5de2e7f"
          },
          {
            "beacon": "weaviate://localhost/22ff230f-ab1e-30dc-a70b-61f6d5501b8c",
            "href": "/v1/objects/22ff230f-ab1e-30dc-a70b-61f6d5501b8c"
          },
          {
            "beacon": "weaviate://localhost/632cbab2-28b4-3ce0-98b7-5e42fb441d39",
            "href": "/v1/objects/632cbab2-28b4-3ce0-98b7-5e42fb441d39"
          },
          {
            "beacon": "weaviate://localhost/7391ce51-27aa-3c25-ab8e-65e6aee8445b",
            "href": "/v1/objects/7391ce51-27aa-3c25-ab8e-65e6aee8445b"
          },
          {
            "beacon": "weaviate://localhost/6890af73-6719-3ea6-ade5-4f3cbfcca167",
            "href": "/v1/objects/6890af73-6719-3ea6-ade5-4f3cbfcca167"
          },
          {
            "beacon": "weaviate://localhost/c1235ece-ca33-3484-bac8-34c881ad85fe",
            "href": "/v1/objects/c1235ece-ca33-3484-bac8-34c881ad85fe"
          },
          {
            "beacon": "weaviate://localhost/f2c6cf9b-1a0c-303d-9fe6-b6552cccfa84",
            "href": "/v1/objects/f2c6cf9b-1a0c-303d-9fe6-b6552cccfa84"
          },
          {
            "beacon": "weaviate://localhost/2308f82b-a70a-37cb-b32f-ff2bff1172ae",
            "href": "/v1/objects/2308f82b-a70a-37cb-b32f-ff2bff1172ae"
          },
          {
            "beacon": "weaviate://localhost/940c8855-7246-3303-855e-a5eb8e4d9948",
            "href": "/v1/objects/940c8855-7246-3303-855e-a5eb8e4d9948"
          },
          {
            "beacon": "weaviate://localhost/388e34d6-2364-304e-9dfe-b8d96ec935a1",
            "href": "/v1/objects/388e34d6-2364-304e-9dfe-b8d96ec935a1"
          },
          {
            "beacon": "weaviate://localhost/b9511d3f-ddd3-34a6-aa2e-8afcddc5eecc",
            "href": "/v1/objects/b9511d3f-ddd3-34a6-aa2e-8afcddc5eecc"
          },
          {
            "beacon": "weaviate://localhost/fb52fee6-5799-3b49-8b3c-a3256d8cfb5f",
            "href": "/v1/objects/fb52fee6-5799-3b49-8b3c-a3256d8cfb5f"
          },
          {
            "beacon": "weaviate://localhost/9e55e6f0-bd03-318d-b742-a5d4db0fdf0f",
            "href": "/v1/objects/9e55e6f0-bd03-318d-b742-a5d4db0fdf0f"
          },
          {
            "beacon": "weaviate://localhost/fc1fe3f1-08ec-312a-b054-d646b45114de",
            "href": "/v1/objects/fc1fe3f1-08ec-312a-b054-d646b45114de"
          },
          {
            "beacon": "weaviate://localhost/c242ce27-7a7b-37fd-8838-8170a84d3512",
            "href": "/v1/objects/c242ce27-7a7b-37fd-8838-8170a84d3512"
          },
          {
            "beacon": "weaviate://localhost/f4acb917-a521-3df4-bcbd-2296cfb01ba3",
            "href": "/v1/objects/f4acb917-a521-3df4-bcbd-2296cfb01ba3"
          },
          {
            "beacon": "weaviate://localhost/31b016b6-6b0e-30b4-9c41-1a08aa9b5a2b",
            "href": "/v1/objects/31b016b6-6b0e-30b4-9c41-1a08aa9b5a2b"
          },
          {
            "beacon": "weaviate://localhost/81f341d1-cfed-37b9-8a69-caac797e92cd",
            "href": "/v1/objects/81f341d1-cfed-37b9-8a69-caac797e92cd"
          },
          {
            "beacon": "weaviate://localhost/23d50536-357d-3f4c-947c-96762c441584",
            "href": "/v1/objects/23d50536-357d-3f4c-947c-96762c441584"
          },
          {
            "beacon": "weaviate://localhost/5c69d22c-f1c3-327b-80b7-b80f5b6a1c71",
            "href": "/v1/objects/5c69d22c-f1c3-327b-80b7-b80f5b6a1c71"
          },
          {
            "beacon": "weaviate://localhost/07cebdf2-04b3-3c4a-96a8-ecb8e3c30709",
            "href": "/v1/objects/07cebdf2-04b3-3c4a-96a8-ecb8e3c30709"
          },
          {
            "beacon": "weaviate://localhost/696f0caa-3b50-3dca-bc12-9b73585a76d0",
            "href": "/v1/objects/696f0caa-3b50-3dca-bc12-9b73585a76d0"
          },
          {
            "beacon": "weaviate://localhost/70cfd5d6-4ec2-3ede-942f-47597305f162",
            "href": "/v1/objects/70cfd5d6-4ec2-3ede-942f-47597305f162"
          },
          {
            "beacon": "weaviate://localhost/25bf63d9-34ba-372f-a891-12a54a385faa",
            "href": "/v1/objects/25bf63d9-34ba-372f-a891-12a54a385faa"
          },
          {
            "beacon": "weaviate://localhost/43124a9e-3e30-3139-b96d-2bd11ed0c3cb",
            "href": "/v1/objects/43124a9e-3e30-3139-b96d-2bd11ed0c3cb"
          },
          {
            "beacon": "weaviate://localhost/36696292-c903-376f-950d-ffa5353eccb6",
            "href": "/v1/objects/36696292-c903-376f-950d-ffa5353eccb6"
          },
          {
            "beacon": "weaviate://localhost/23e4f04f-56b8-3d87-b316-8dea724343dd",
            "href": "/v1/objects/23e4f04f-56b8-3d87-b316-8dea724343dd"
          },
          {
            "beacon": "weaviate://localhost/6736210a-e880-34a3-b3fc-7e7b20166588",
            "href": "/v1/objects/6736210a-e880-34a3-b3fc-7e7b20166588"
          },
          {
            "beacon": "weaviate://localhost/f65d8a9e-0e42-399a-aff1-1fbe62480f5f",
            "href": "/v1/objects/f65d8a9e-0e42-399a-aff1-1fbe62480f5f"
          },
          {
            "beacon": "weaviate://localhost/d84fd3fa-a73e-37ef-a400-87e48f6e4b73",
            "href": "/v1/objects/d84fd3fa-a73e-37ef-a400-87e48f6e4b73"
          },
          {
            "beacon": "weaviate://localhost/43e6ae63-9c66-34b7-9133-ea9bbe7b4561",
            "href": "/v1/objects/43e6ae63-9c66-34b7-9133-ea9bbe7b4561"
          },
          {
            "beacon": "weaviate://localhost/1294d91d-795a-3b67-8709-6ed6a7d9d6e5",
            "href": "/v1/objects/1294d91d-795a-3b67-8709-6ed6a7d9d6e5"
          },
          {
            "beacon": "weaviate://localhost/72d43be7-68a3-3b5a-9d33-2e4d1cbab2bb",
            "href": "/v1/objects/72d43be7-68a3-3b5a-9d33-2e4d1cbab2bb"
          },
          {
            "beacon": "weaviate://localhost/f1d803e3-9891-3b95-966f-f69a5229dc6c",
            "href": "/v1/objects/f1d803e3-9891-3b95-966f-f69a5229dc6c"
          },
          {
            "beacon": "weaviate://localhost/a5d0a9c4-8bf2-33de-a6fc-7653d49fc8fd",
            "href": "/v1/objects/a5d0a9c4-8bf2-33de-a6fc-7653d49fc8fd"
          },
          {
            "beacon": "weaviate://localhost/228b2542-8ba1-325d-a8b3-3b326caafd1f",
            "href": "/v1/objects/228b2542-8ba1-325d-a8b3-3b326caafd1f"
          },
          {
            "beacon": "weaviate://localhost/f1954811-f0c7-3a7a-8c86-bba686a7fce4",
            "href": "/v1/objects/f1954811-f0c7-3a7a-8c86-bba686a7fce4"
          },
          {
            "beacon": "weaviate://localhost/4d119744-7cff-3b48-8bee-ef40daf76cbc",
            "href": "/v1/objects/4d119744-7cff-3b48-8bee-ef40daf76cbc"
          },
          {
            "beacon": "weaviate://localhost/e83c92c5-de82-3de6-afc6-8a73d3429711",
            "href": "/v1/objects/e83c92c5-de82-3de6-afc6-8a73d3429711"
          },
          {
            "beacon": "weaviate://localhost/106bd975-29b7-3ae9-bf9d-4613a7462777",
            "href": "/v1/objects/106bd975-29b7-3ae9-bf9d-4613a7462777"
          },
          {
            "beacon": "weaviate://localhost/e90af93d-649e-3e20-9e83-c99b2d410581",
            "href": "/v1/objects/e90af93d-649e-3e20-9e83-c99b2d410581"
          },
          {
            "beacon": "weaviate://localhost/c44ef77a-0a9b-3c7f-ba52-8912259c1b62",
            "href": "/v1/objects/c44ef77a-0a9b-3c7f-ba52-8912259c1b62"
          },
          {
            "beacon": "weaviate://localhost/d30ba670-894a-3b35-b31f-5cb56f983533",
            "href": "/v1/objects/d30ba670-894a-3b35-b31f-5cb56f983533"
          },
          {
            "beacon": "weaviate://localhost/f3db887d-1110-34b5-b637-cbdfb85df0d7",
            "href": "/v1/objects/f3db887d-1110-34b5-b637-cbdfb85df0d7"
          },
          {
            "beacon": "weaviate://localhost/7da23371-bdf3-3d83-9fd3-5bec31709008",
            "href": "/v1/objects/7da23371-bdf3-3d83-9fd3-5bec31709008"
          },
          {
            "beacon": "weaviate://localhost/49ecd75a-819c-3a0e-bfa3-c54cdd9ee12a",
            "href": "/v1/objects/49ecd75a-819c-3a0e-bfa3-c54cdd9ee12a"
          },
          {
            "beacon": "weaviate://localhost/d587a175-0131-3d5e-aa74-b91a9ed4d35e",
            "href": "/v1/objects/d587a175-0131-3d5e-aa74-b91a9ed4d35e"
          },
          {
            "beacon": "weaviate://localhost/ef0bd79f-7b91-335b-af3f-9e0df1457371",
            "href": "/v1/objects/ef0bd79f-7b91-335b-af3f-9e0df1457371"
          },
          {
            "beacon": "weaviate://localhost/eeb73bdd-6e34-30ff-82b8-03b4e650dc64",
            "href": "/v1/objects/eeb73bdd-6e34-30ff-82b8-03b4e650dc64"
          },
          {
            "beacon": "weaviate://localhost/e9acddb7-7471-37ca-a8ec-e6ccfd20f36f",
            "href": "/v1/objects/e9acddb7-7471-37ca-a8ec-e6ccfd20f36f"
          },
          {
            "beacon": "weaviate://localhost/15e4485a-2ae3-365b-adaa-05c12a2fc0c4",
            "href": "/v1/objects/15e4485a-2ae3-365b-adaa-05c12a2fc0c4"
          },
          {
            "beacon": "weaviate://localhost/748ed993-a8c9-3e65-a3c3-6421d02f234d",
            "href": "/v1/objects/748ed993-a8c9-3e65-a3c3-6421d02f234d"
          },
          {
            "beacon": "weaviate://localhost/0f1e68af-3418-39d1-8cb1-eecccf3cf889",
            "href": "/v1/objects/0f1e68af-3418-39d1-8cb1-eecccf3cf889"
          },
          {
            "beacon": "weaviate://localhost/b64be19d-122a-32df-96be-3d4316984325",
            "href": "/v1/objects/b64be19d-122a-32df-96be-3d4316984325"
          },
          {
            "beacon": "weaviate://localhost/b524c610-7362-3bee-8226-db824be8186b",
            "href": "/v1/objects/b524c610-7362-3bee-8226-db824be8186b"
          },
          {
            "beacon": "weaviate://localhost/67844c6e-aa15-381f-85e6-3937a0b62f72",
            "href": "/v1/objects/67844c6e-aa15-381f-85e6-3937a0b62f72"
          },
          {
            "beacon": "weaviate://localhost/42b37322-81ef-3ea5-b8ee-8e5c3c458e88",
            "href": "/v1/objects/42b37322-81ef-3ea5-b8ee-8e5c3c458e88"
          },
          {
            "beacon": "weaviate://localhost/75f4935b-f5b1-3629-8012-e27c380163a9",
            "href": "/v1/objects/75f4935b-f5b1-3629-8012-e27c380163a9"
          },
          {
            "beacon": "weaviate://localhost/6e371374-120a-34b6-8858-46b98335bd51",
            "href": "/v1/objects/6e371374-120a-34b6-8858-46b98335bd51"
          },
          {
            "beacon": "weaviate://localhost/8d6d39b3-ffa6-3a12-8696-915726875545",
            "href": "/v1/objects/8d6d39b3-ffa6-3a12-8696-915726875545"
          },
          {
            "beacon": "weaviate://localhost/feca97e7-fa63-33a9-b251-8c02131fad7e",
            "href": "/v1/objects/feca97e7-fa63-33a9-b251-8c02131fad7e"
          },
          {
            "beacon": "weaviate://localhost/0c8dc79d-3f8a-3fa6-97f0-c84d56ccaae9",
            "href": "/v1/objects/0c8dc79d-3f8a-3fa6-97f0-c84d56ccaae9"
          },
          {
            "beacon": "weaviate://localhost/f38da2f3-03ed-3ced-bb48-5a3d2a3febc0",
            "href": "/v1/objects/f38da2f3-03ed-3ced-bb48-5a3d2a3febc0"
          },
          {
            "beacon": "weaviate://localhost/53457a18-1504-3e7b-87b9-d144b0bbc175",
            "href": "/v1/objects/53457a18-1504-3e7b-87b9-d144b0bbc175"
          },
          {
            "beacon": "weaviate://localhost/ed87c181-9537-3570-8234-1ebe0a112f0a",
            "href": "/v1/objects/ed87c181-9537-3570-8234-1ebe0a112f0a"
          },
          {
            "beacon": "weaviate://localhost/6984c885-a922-395b-83ab-aa9a7835e816",
            "href": "/v1/objects/6984c885-a922-395b-83ab-aa9a7835e816"
          },
          {
            "beacon": "weaviate://localhost/9b1c7eec-6487-3a1f-88dc-8617cf3075b1",
            "href": "/v1/objects/9b1c7eec-6487-3a1f-88dc-8617cf3075b1"
          },
          {
            "beacon": "weaviate://localhost/a7d17d88-ff03-3c4f-927a-de67e78b523a",
            "href": "/v1/objects/a7d17d88-ff03-3c4f-927a-de67e78b523a"
          },
          {
            "beacon": "weaviate://localhost/af848ce0-aa88-37b9-a865-1184951173bd",
            "href": "/v1/objects/af848ce0-aa88-37b9-a865-1184951173bd"
          },
          {
            "beacon": "weaviate://localhost/a4ee1f5f-e563-301f-8c7d-9ab6ede66494",
            "href": "/v1/objects/a4ee1f5f-e563-301f-8c7d-9ab6ede66494"
          },
          {
            "beacon": "weaviate://localhost/fec1f3ee-c89d-347f-bcc8-ed5f45f9f260",
            "href": "/v1/objects/fec1f3ee-c89d-347f-bcc8-ed5f45f9f260"
          },
          {
            "beacon": "weaviate://localhost/32754ef8-687a-3fca-be27-3ac9b0ebd84a",
            "href": "/v1/objects/32754ef8-687a-3fca-be27-3ac9b0ebd84a"
          },
          {
            "beacon": "weaviate://localhost/f1bf0394-01e6-3b49-afe0-0ff1eeca285c",
            "href": "/v1/objects/f1bf0394-01e6-3b49-afe0-0ff1eeca285c"
          },
          {
            "beacon": "weaviate://localhost/1fd16c73-1a0d-3321-a77c-0b93ff2f34f1",
            "href": "/v1/objects/1fd16c73-1a0d-3321-a77c-0b93ff2f34f1"
          },
          {
            "beacon": "weaviate://localhost/690a130f-4afb-3ae9-b7de-aac3ce53d17a",
            "href": "/v1/objects/690a130f-4afb-3ae9-b7de-aac3ce53d17a"
          },
          {
            "beacon": "weaviate://localhost/49f51c39-1cd0-36cd-9f08-436dd48e8e7d",
            "href": "/v1/objects/49f51c39-1cd0-36cd-9f08-436dd48e8e7d"
          },
          {
            "beacon": "weaviate://localhost/8b5df0ff-a1b6-3202-a71c-23108e4ee03c",
            "href": "/v1/objects/8b5df0ff-a1b6-3202-a71c-23108e4ee03c"
          },
          {
            "beacon": "weaviate://localhost/788e5d7e-4b51-373f-b699-6dcf8477a31f",
            "href": "/v1/objects/788e5d7e-4b51-373f-b699-6dcf8477a31f"
          },
          {
            "beacon": "weaviate://localhost/b982d66b-dd15-3d5a-932b-e88ef46f2dbe",
            "href": "/v1/objects/b982d66b-dd15-3d5a-932b-e88ef46f2dbe"
          },
          {
            "beacon": "weaviate://localhost/b903602d-564a-3aa7-b528-f347e15bf941",
            "href": "/v1/objects/b903602d-564a-3aa7-b528-f347e15bf941"
          },
          {
            "beacon": "weaviate://localhost/bc87796f-9b86-34b3-adc4-5b6dbac70e0e",
            "href": "/v1/objects/bc87796f-9b86-34b3-adc4-5b6dbac70e0e"
          },
          {
            "beacon": "weaviate://localhost/828831b0-8f44-3ab7-aaeb-c3e2d29c2fd5",
            "href": "/v1/objects/828831b0-8f44-3ab7-aaeb-c3e2d29c2fd5"
          },
          {
            "beacon": "weaviate://localhost/04df0358-b654-31f1-8836-35a0b06791ca",
            "href": "/v1/objects/04df0358-b654-31f1-8836-35a0b06791ca"
          },
          {
            "beacon": "weaviate://localhost/5c93b8b2-9044-3028-8909-c2ebc64ef731",
            "href": "/v1/objects/5c93b8b2-9044-3028-8909-c2ebc64ef731"
          },
          {
            "beacon": "weaviate://localhost/1e442da4-b963-3fe6-82bc-7261a15cc543",
            "href": "/v1/objects/1e442da4-b963-3fe6-82bc-7261a15cc543"
          },
          {
            "beacon": "weaviate://localhost/55b07920-af31-371d-9b48-2d7370630e19",
            "href": "/v1/objects/55b07920-af31-371d-9b48-2d7370630e19"
          },
          {
            "beacon": "weaviate://localhost/11102b17-cc3d-3698-9a9b-c02da261fd67",
            "href": "/v1/objects/11102b17-cc3d-3698-9a9b-c02da261fd67"
          },
          {
            "beacon": "weaviate://localhost/840af50d-f31a-316d-b5b5-36dac67fa170",
            "href": "/v1/objects/840af50d-f31a-316d-b5b5-36dac67fa170"
          },
          {
            "beacon": "weaviate://localhost/818ff6ed-7384-33ae-b6cc-b125fc1346b2",
            "href": "/v1/objects/818ff6ed-7384-33ae-b6cc-b125fc1346b2"
          },
          {
            "beacon": "weaviate://localhost/277238a5-2138-3183-a6ac-ebe3bbc08392",
            "href": "/v1/objects/277238a5-2138-3183-a6ac-ebe3bbc08392"
          },
          {
            "beacon": "weaviate://localhost/2358027c-aa3d-3a2d-a34e-393d0cb2de13",
            "href": "/v1/objects/2358027c-aa3d-3a2d-a34e-393d0cb2de13"
          },
          {
            "beacon": "weaviate://localhost/78e661be-2b6b-3113-a33f-bfe82e99b8fe",
            "href": "/v1/objects/78e661be-2b6b-3113-a33f-bfe82e99b8fe"
          },
          {
            "beacon": "weaviate://localhost/386d810d-babd-35de-be32-7d35e055f259",
            "href": "/v1/objects/386d810d-babd-35de-be32-7d35e055f259"
          },
          {
            "beacon": "weaviate://localhost/c96c2a5b-83d8-3abc-bfcf-04a9facf8be9",
            "href": "/v1/objects/c96c2a5b-83d8-3abc-bfcf-04a9facf8be9"
          },
          {
            "beacon": "weaviate://localhost/94ecc99d-660d-3303-b2ea-473d4e7d677b",
            "href": "/v1/objects/94ecc99d-660d-3303-b2ea-473d4e7d677b"
          },
          {
            "beacon": "weaviate://localhost/d9949b28-0ac6-330b-afff-29b7bc6ae515",
            "href": "/v1/objects/d9949b28-0ac6-330b-afff-29b7bc6ae515"
          },
          {
            "beacon": "weaviate://localhost/5b121036-5940-3ab5-a1d6-78333d4b4823",
            "href": "/v1/objects/5b121036-5940-3ab5-a1d6-78333d4b4823"
          },
          {
            "beacon": "weaviate://localhost/d009f830-7404-3145-a975-775dcd9eab3a",
            "href": "/v1/objects/d009f830-7404-3145-a975-775dcd9eab3a"
          },
          {
            "beacon": "weaviate://localhost/0f5007c4-f7e4-3cac-8f29-268371f3b7cf",
            "href": "/v1/objects/0f5007c4-f7e4-3cac-8f29-268371f3b7cf"
          },
          {
            "beacon": "weaviate://localhost/cfd8208a-00bc-3358-9268-5166deedad60",
            "href": "/v1/objects/cfd8208a-00bc-3358-9268-5166deedad60"
          },
          {
            "beacon": "weaviate://localhost/c2daf00b-eaa9-38c9-baa1-7b657c365d36",
            "href": "/v1/objects/c2daf00b-eaa9-38c9-baa1-7b657c365d36"
          },
          {
            "beacon": "weaviate://localhost/a391a911-64dd-397b-bb2d-c6e7be030ff8",
            "href": "/v1/objects/a391a911-64dd-397b-bb2d-c6e7be030ff8"
          },
          {
            "beacon": "weaviate://localhost/45e2d8c2-6952-37bd-9494-02406dd4e06c",
            "href": "/v1/objects/45e2d8c2-6952-37bd-9494-02406dd4e06c"
          },
          {
            "beacon": "weaviate://localhost/581d2d11-3474-3057-89e1-5ef3f9bf4646",
            "href": "/v1/objects/581d2d11-3474-3057-89e1-5ef3f9bf4646"
          },
          {
            "beacon": "weaviate://localhost/df392ddb-be2f-3dcc-9843-588e5fe39cde",
            "href": "/v1/objects/df392ddb-be2f-3dcc-9843-588e5fe39cde"
          },
          {
            "beacon": "weaviate://localhost/f9576bef-01dc-3164-bff2-e27b90a65d12",
            "href": "/v1/objects/f9576bef-01dc-3164-bff2-e27b90a65d12"
          },
          {
            "beacon": "weaviate://localhost/09f2d327-c70f-3a37-9228-c9f3bf24a316",
            "href": "/v1/objects/09f2d327-c70f-3a37-9228-c9f3bf24a316"
          },
          {
            "beacon": "weaviate://localhost/6eed7356-30b9-314c-bd50-b796b83f1b3d",
            "href": "/v1/objects/6eed7356-30b9-314c-bd50-b796b83f1b3d"
          },
          {
            "beacon": "weaviate://localhost/cabe5d49-0b2f-3bf2-9286-297bb095011b",
            "href": "/v1/objects/cabe5d49-0b2f-3bf2-9286-297bb095011b"
          },
          {
            "beacon": "weaviate://localhost/a0835f26-942a-39c2-b90e-55192639346d",
            "href": "/v1/objects/a0835f26-942a-39c2-b90e-55192639346d"
          },
          {
            "beacon": "weaviate://localhost/11a83ffb-3f84-30dd-bbf5-aa25545bbf97",
            "href": "/v1/objects/11a83ffb-3f84-30dd-bbf5-aa25545bbf97"
          },
          {
            "beacon": "weaviate://localhost/ec49b57c-0ff2-3777-ab9a-26e439c6eab9",
            "href": "/v1/objects/ec49b57c-0ff2-3777-ab9a-26e439c6eab9"
          },
          {
            "beacon": "weaviate://localhost/e30e1765-0b17-3bd1-abe6-8fe40f77c39f",
            "href": "/v1/objects/e30e1765-0b17-3bd1-abe6-8fe40f77c39f"
          },
          {
            "beacon": "weaviate://localhost/5e338b9a-287d-3642-b4d8-19a48fce6ef3",
            "href": "/v1/objects/5e338b9a-287d-3642-b4d8-19a48fce6ef3"
          },
          {
            "beacon": "weaviate://localhost/16dd074a-5800-3c51-8876-9f5e76c1ace7",
            "href": "/v1/objects/16dd074a-5800-3c51-8876-9f5e76c1ace7"
          },
          {
            "beacon": "weaviate://localhost/c569b762-6eb8-3288-ac0b-37cbcaea5342",
            "href": "/v1/objects/c569b762-6eb8-3288-ac0b-37cbcaea5342"
          },
          {
            "beacon": "weaviate://localhost/1f732a03-f972-3245-97f4-6cccc972764c",
            "href": "/v1/objects/1f732a03-f972-3245-97f4-6cccc972764c"
          },
          {
            "beacon": "weaviate://localhost/d73d102c-e510-3094-9604-a52b86dc7f72",
            "href": "/v1/objects/d73d102c-e510-3094-9604-a52b86dc7f72"
          },
          {
            "beacon": "weaviate://localhost/bf99553f-2ca9-3dc6-8774-69fe748baf0f",
            "href": "/v1/objects/bf99553f-2ca9-3dc6-8774-69fe748baf0f"
          },
          {
            "beacon": "weaviate://localhost/f81a5227-036a-3e18-9270-58e3d2541370",
            "href": "/v1/objects/f81a5227-036a-3e18-9270-58e3d2541370"
          },
          {
            "beacon": "weaviate://localhost/28ba781f-8d5f-3664-b771-a3d7ce7d7450",
            "href": "/v1/objects/28ba781f-8d5f-3664-b771-a3d7ce7d7450"
          },
          {
            "beacon": "weaviate://localhost/26572580-fc4d-3fd9-a49b-5c0c15866d44",
            "href": "/v1/objects/26572580-fc4d-3fd9-a49b-5c0c15866d44"
          },
          {
            "beacon": "weaviate://localhost/a49eccf6-667b-3b6a-b960-673b893df16b",
            "href": "/v1/objects/a49eccf6-667b-3b6a-b960-673b893df16b"
          },
          {
            "beacon": "weaviate://localhost/0c453c3d-2911-3190-852f-2b90bca090b2",
            "href": "/v1/objects/0c453c3d-2911-3190-852f-2b90bca090b2"
          },
          {
            "beacon": "weaviate://localhost/cf6a4ff5-caf3-3175-97b7-2a749b71a9b0",
            "href": "/v1/objects/cf6a4ff5-caf3-3175-97b7-2a749b71a9b0"
          },
          {
            "beacon": "weaviate://localhost/1047e8ef-1e7f-3879-9ca2-8296ee2535be",
            "href": "/v1/objects/1047e8ef-1e7f-3879-9ca2-8296ee2535be"
          },
          {
            "beacon": "weaviate://localhost/f916af41-3c0c-3a5f-892c-38264b7229b8",
            "href": "/v1/objects/f916af41-3c0c-3a5f-892c-38264b7229b8"
          },
          {
            "beacon": "weaviate://localhost/ce4471c5-7f7c-38d7-a0cb-77874195fe76",
            "href": "/v1/objects/ce4471c5-7f7c-38d7-a0cb-77874195fe76"
          },
          {
            "beacon": "weaviate://localhost/e1517bf7-b16d-3b9a-895a-1bdb49896d95",
            "href": "/v1/objects/e1517bf7-b16d-3b9a-895a-1bdb49896d95"
          },
          {
            "beacon": "weaviate://localhost/ae4a2314-b6dd-3295-88df-106b20d8fd74",
            "href": "/v1/objects/ae4a2314-b6dd-3295-88df-106b20d8fd74"
          },
          {
            "beacon": "weaviate://localhost/486703c7-6ae3-326f-9909-398e6f612fe6",
            "href": "/v1/objects/486703c7-6ae3-326f-9909-398e6f612fe6"
          },
          {
            "beacon": "weaviate://localhost/3f93428d-dbd0-3fc9-b45f-deb5863719ea",
            "href": "/v1/objects/3f93428d-dbd0-3fc9-b45f-deb5863719ea"
          },
          {
            "beacon": "weaviate://localhost/96667caa-eb62-3753-88f4-734585a02242",
            "href": "/v1/objects/96667caa-eb62-3753-88f4-734585a02242"
          },
          {
            "beacon": "weaviate://localhost/805f3fab-98fb-3820-873e-498d35ed9fc9",
            "href": "/v1/objects/805f3fab-98fb-3820-873e-498d35ed9fc9"
          },
          {
            "beacon": "weaviate://localhost/12d52482-2b83-3155-a4f8-e1b848297d73",
            "href": "/v1/objects/12d52482-2b83-3155-a4f8-e1b848297d73"
          },
          {
            "beacon": "weaviate://localhost/3197420b-d018-3938-a37f-9bb92b1fa07a",
            "href": "/v1/objects/3197420b-d018-3938-a37f-9bb92b1fa07a"
          },
          {
            "beacon": "weaviate://localhost/6f63bd0f-710b-3d40-b8a1-a7a081a25601",
            "href": "/v1/objects/6f63bd0f-710b-3d40-b8a1-a7a081a25601"
          },
          {
            "beacon": "weaviate://localhost/d378391b-42af-39e1-ab84-9f7c21ad2009",
            "href": "/v1/objects/d378391b-42af-39e1-ab84-9f7c21ad2009"
          },
          {
            "beacon": "weaviate://localhost/eb346d02-e6e6-3702-8344-6fd33ca10e39",
            "href": "/v1/objects/eb346d02-e6e6-3702-8344-6fd33ca10e39"
          },
          {
            "beacon": "weaviate://localhost/9a54992f-b8a3-31f5-b582-3a0371b619c3",
            "href": "/v1/objects/9a54992f-b8a3-31f5-b582-3a0371b619c3"
          },
          {
            "beacon": "weaviate://localhost/aa557848-2308-382f-ac22-ddf427b26631",
            "href": "/v1/objects/aa557848-2308-382f-ac22-ddf427b26631"
          },
          {
            "beacon": "weaviate://localhost/21f853a1-187b-3ea9-a5da-fa887c007af2",
            "href": "/v1/objects/21f853a1-187b-3ea9-a5da-fa887c007af2"
          },
          {
            "beacon": "weaviate://localhost/3d29d312-f8dc-35e0-9c33-ca819b3cc8f9",
            "href": "/v1/objects/3d29d312-f8dc-35e0-9c33-ca819b3cc8f9"
          },
          {
            "beacon": "weaviate://localhost/0cea38a5-0d86-339d-8a7b-256ddd183d5c",
            "href": "/v1/objects/0cea38a5-0d86-339d-8a7b-256ddd183d5c"
          }
        ],
        "headquartersGeoLocation": {
          "latitude": 51.504612,
          "longitude": -0.0236484
        },
        "name": "The Economist"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501893,
      "id": "c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
      "properties": {
        "hasArticles": [
          {
            "beacon": "weaviate://localhost/a2b28dbc-42b9-3705-bf46-5ebba5b2058e",
            "href": "/v1/objects/a2b28dbc-42b9-3705-bf46-5ebba5b2058e"
          },
          {
            "beacon": "weaviate://localhost/76c8c418-60ab-322f-b3d2-174680025dc2",
            "href": "/v1/objects/76c8c418-60ab-322f-b3d2-174680025dc2"
          },
          {
            "beacon": "weaviate://localhost/6981f0a0-0762-3e4f-9f35-0e805f298cdc",
            "href": "/v1/objects/6981f0a0-0762-3e4f-9f35-0e805f298cdc"
          },
          {
            "beacon": "weaviate://localhost/dd28162c-1b66-3d1c-a0bd-ed814a9beaac",
            "href": "/v1/objects/dd28162c-1b66-3d1c-a0bd-ed814a9beaac"
          },
          {
            "beacon": "weaviate://localhost/985fabfb-80dc-33ad-ad11-4de43fe01098",
            "href": "/v1/objects/985fabfb-80dc-33ad-ad11-4de43fe01098"
          },
          {
            "beacon": "weaviate://localhost/01a8a6bd-6216-33d4-9b81-224eef940e0d",
            "href": "/v1/objects/01a8a6bd-6216-33d4-9b81-224eef940e0d"
          },
          {
            "beacon": "weaviate://localhost/aa2ecbba-8847-3ab2-8b0e-e8e87733829d",
            "href": "/v1/objects/aa2ecbba-8847-3ab2-8b0e-e8e87733829d"
          },
          {
            "beacon": "weaviate://localhost/7c091cfb-8a7b-3643-9ce9-4694f5b3be3d",
            "href": "/v1/objects/7c091cfb-8a7b-3643-9ce9-4694f5b3be3d"
          },
          {
            "beacon": "weaviate://localhost/d7fdbff4-c4c7-3d2f-bcf0-91c386a2243a",
            "href": "/v1/objects/d7fdbff4-c4c7-3d2f-bcf0-91c386a2243a"
          },
          {
            "beacon": "weaviate://localhost/27e44634-43cb-305b-a20b-92a17f63ba80",
            "href": "/v1/objects/27e44634-43cb-305b-a20b-92a17f63ba80"
          },
          {
            "beacon": "weaviate://localhost/2f5bfbac-21ca-386a-bdf2-8fd0648ff558",
            "href": "/v1/objects/2f5bfbac-21ca-386a-bdf2-8fd0648ff558"
          },
          {
            "beacon": "weaviate://localhost/7d70b9fb-1729-3dd7-b4fb-5b974be1bbcf",
            "href": "/v1/objects/7d70b9fb-1729-3dd7-b4fb-5b974be1bbcf"
          },
          {
            "beacon": "weaviate://localhost/c792e830-cf24-30b5-904b-20a9bee43fbd",
            "href": "/v1/objects/c792e830-cf24-30b5-904b-20a9bee43fbd"
          },
          {
            "beacon": "weaviate://localhost/3b3fc4dc-f59e-3ab3-8f90-cea932844d7e",
            "href": "/v1/objects/3b3fc4dc-f59e-3ab3-8f90-cea932844d7e"
          },
          {
            "beacon": "weaviate://localhost/b89630e9-c51c-37d7-a62d-4960f8fa5487",
            "href": "/v1/objects/b89630e9-c51c-37d7-a62d-4960f8fa5487"
          },
          {
            "beacon": "weaviate://localhost/fd46f5d3-91df-323d-a435-5363e9e010ee",
            "href": "/v1/objects/fd46f5d3-91df-323d-a435-5363e9e010ee"
          },
          {
            "beacon": "weaviate://localhost/0c759544-e26e-3c11-840a-d1d853e32fe7",
            "href": "/v1/objects/0c759544-e26e-3c11-840a-d1d853e32fe7"
          },
          {
            "beacon": "weaviate://localhost/8b0adafc-b3c3-3631-962e-70685d6483b7",
            "href": "/v1/objects/8b0adafc-b3c3-3631-962e-70685d6483b7"
          },
          {
            "beacon": "weaviate://localhost/fa5b7c6a-21c4-3eb2-8f21-36cc80f6942b",
            "href": "/v1/objects/fa5b7c6a-21c4-3eb2-8f21-36cc80f6942b"
          },
          {
            "beacon": "weaviate://localhost/4d328b28-1e10-35bb-b8e7-07ee26a3d7e5",
            "href": "/v1/objects/4d328b28-1e10-35bb-b8e7-07ee26a3d7e5"
          },
          {
            "beacon": "weaviate://localhost/36d18634-5f7f-36a6-87a0-b6a51f7a855b",
            "href": "/v1/objects/36d18634-5f7f-36a6-87a0-b6a51f7a855b"
          },
          {
            "beacon": "weaviate://localhost/b8173fc0-2ecb-3e4a-a6cf-064b7eb3ba48",
            "href": "/v1/objects/b8173fc0-2ecb-3e4a-a6cf-064b7eb3ba48"
          },
          {
            "beacon": "weaviate://localhost/fd81f75b-a8ba-3101-8d7a-f49af96ddcaf",
            "href": "/v1/objects/fd81f75b-a8ba-3101-8d7a-f49af96ddcaf"
          },
          {
            "beacon": "weaviate://localhost/16a2afdd-9fde-36cc-9181-75d00850f7c5",
            "href": "/v1/objects/16a2afdd-9fde-36cc-9181-75d00850f7c5"
          },
          {
            "beacon": "weaviate://localhost/a2595edb-7205-3de5-9f89-25bb67a9feb8",
            "href": "/v1/objects/a2595edb-7205-3de5-9f89-25bb67a9feb8"
          },
          {
            "beacon": "weaviate://localhost/5350c500-4ed9-3495-8eac-b2792c3bf1f1",
            "href": "/v1/objects/5350c500-4ed9-3495-8eac-b2792c3bf1f1"
          },
          {
            "beacon": "weaviate://localhost/3c08f470-e2f1-3168-a576-3f57eb2daad8",
            "href": "/v1/objects/3c08f470-e2f1-3168-a576-3f57eb2daad8"
          },
          {
            "beacon": "weaviate://localhost/3d01d047-9fff-3d68-954a-8994e4e50a6b",
            "href": "/v1/objects/3d01d047-9fff-3d68-954a-8994e4e50a6b"
          },
          {
            "beacon": "weaviate://localhost/3d819a34-a78c-30ac-9797-75bb64e3a98c",
            "href": "/v1/objects/3d819a34-a78c-30ac-9797-75bb64e3a98c"
          },
          {
            "beacon": "weaviate://localhost/f1823477-999c-3de0-9d19-236fe28de809",
            "href": "/v1/objects/f1823477-999c-3de0-9d19-236fe28de809"
          },
          {
            "beacon": "weaviate://localhost/5fd99de0-7fc3-3b2d-be91-d11534f74d05",
            "href": "/v1/objects/5fd99de0-7fc3-3b2d-be91-d11534f74d05"
          },
          {
            "beacon": "weaviate://localhost/b6c2a974-89ab-300a-8e8f-050de7c676b8",
            "href": "/v1/objects/b6c2a974-89ab-300a-8e8f-050de7c676b8"
          },
          {
            "beacon": "weaviate://localhost/62a77581-6227-36fa-a577-abc98c00db3c",
            "href": "/v1/objects/62a77581-6227-36fa-a577-abc98c00db3c"
          },
          {
            "beacon": "weaviate://localhost/1aa98d2f-c0c1-3d94-86c6-ba50415a73a5",
            "href": "/v1/objects/1aa98d2f-c0c1-3d94-86c6-ba50415a73a5"
          },
          {
            "beacon": "weaviate://localhost/27e33aac-966b-3951-a72d-a3927b7624ca",
            "href": "/v1/objects/27e33aac-966b-3951-a72d-a3927b7624ca"
          },
          {
            "beacon": "weaviate://localhost/3ec97caa-48f7-3946-95b0-c39658f0788d",
            "href": "/v1/objects/3ec97caa-48f7-3946-95b0-c39658f0788d"
          },
          {
            "beacon": "weaviate://localhost/80462471-a289-305c-b7f4-f992740ed5ef",
            "href": "/v1/objects/80462471-a289-305c-b7f4-f992740ed5ef"
          },
          {
            "beacon": "weaviate://localhost/edf1e00c-3c45-3fda-a659-cc0823532746",
            "href": "/v1/objects/edf1e00c-3c45-3fda-a659-cc0823532746"
          },
          {
            "beacon": "weaviate://localhost/d283871d-3c52-3dd9-83f4-715d3b1f6767",
            "href": "/v1/objects/d283871d-3c52-3dd9-83f4-715d3b1f6767"
          },
          {
            "beacon": "weaviate://localhost/3fff6c17-f2cc-31c2-baa3-1ee75d31115a",
            "href": "/v1/objects/3fff6c17-f2cc-31c2-baa3-1ee75d31115a"
          },
          {
            "beacon": "weaviate://localhost/58b1909f-a6c1-3980-8985-c293cd66b2f6",
            "href": "/v1/objects/58b1909f-a6c1-3980-8985-c293cd66b2f6"
          },
          {
            "beacon": "weaviate://localhost/6da38bdb-c3f8-3a6e-968d-258a1651094f",
            "href": "/v1/objects/6da38bdb-c3f8-3a6e-968d-258a1651094f"
          },
          {
            "beacon": "weaviate://localhost/0b77fa52-44b2-3dbc-bdee-a3a09f150498",
            "href": "/v1/objects/0b77fa52-44b2-3dbc-bdee-a3a09f150498"
          },
          {
            "beacon": "weaviate://localhost/23a18906-8c54-360e-af7a-fd54fe102e06",
            "href": "/v1/objects/23a18906-8c54-360e-af7a-fd54fe102e06"
          },
          {
            "beacon": "weaviate://localhost/e09b93b6-4e84-345d-928a-6d81e0598978",
            "href": "/v1/objects/e09b93b6-4e84-345d-928a-6d81e0598978"
          },
          {
            "beacon": "weaviate://localhost/1ccf38a3-cbb9-3144-9dd6-f5d676a561a8",
            "href": "/v1/objects/1ccf38a3-cbb9-3144-9dd6-f5d676a561a8"
          },
          {
            "beacon": "weaviate://localhost/5be7a4c7-8cc8-3b4a-b86d-afc29bb2eb57",
            "href": "/v1/objects/5be7a4c7-8cc8-3b4a-b86d-afc29bb2eb57"
          },
          {
            "beacon": "weaviate://localhost/e45dd187-395e-3ace-aafa-39959d6f0f43",
            "href": "/v1/objects/e45dd187-395e-3ace-aafa-39959d6f0f43"
          },
          {
            "beacon": "weaviate://localhost/bfde80d6-db2a-3059-a478-ccd51f60b92b",
            "href": "/v1/objects/bfde80d6-db2a-3059-a478-ccd51f60b92b"
          },
          {
            "beacon": "weaviate://localhost/d940bf7c-bdb2-300f-a362-021af533d49b",
            "href": "/v1/objects/d940bf7c-bdb2-300f-a362-021af533d49b"
          },
          {
            "beacon": "weaviate://localhost/59b20c33-4d2d-3eb7-8f83-8ed397e21310",
            "href": "/v1/objects/59b20c33-4d2d-3eb7-8f83-8ed397e21310"
          },
          {
            "beacon": "weaviate://localhost/e4d83908-5ff8-31ab-9f91-9d9ca6363f76",
            "href": "/v1/objects/e4d83908-5ff8-31ab-9f91-9d9ca6363f76"
          },
          {
            "beacon": "weaviate://localhost/c715f638-1153-372e-957b-802dc21aedf9",
            "href": "/v1/objects/c715f638-1153-372e-957b-802dc21aedf9"
          },
          {
            "beacon": "weaviate://localhost/5683f409-3bbf-3c41-9e62-df1c0dc9ea4c",
            "href": "/v1/objects/5683f409-3bbf-3c41-9e62-df1c0dc9ea4c"
          },
          {
            "beacon": "weaviate://localhost/acdd3e97-da51-359d-9895-ca379af0720f",
            "href": "/v1/objects/acdd3e97-da51-359d-9895-ca379af0720f"
          },
          {
            "beacon": "weaviate://localhost/476ce857-d787-3bf8-a9f6-92539a446273",
            "href": "/v1/objects/476ce857-d787-3bf8-a9f6-92539a446273"
          },
          {
            "beacon": "weaviate://localhost/d073078f-2026-386e-8831-ee0b53e7e9c9",
            "href": "/v1/objects/d073078f-2026-386e-8831-ee0b53e7e9c9"
          },
          {
            "beacon": "weaviate://localhost/58362054-0b30-3c36-a651-ffc39c759f5e",
            "href": "/v1/objects/58362054-0b30-3c36-a651-ffc39c759f5e"
          },
          {
            "beacon": "weaviate://localhost/0c846853-a662-3a06-82f8-c850637984e1",
            "href": "/v1/objects/0c846853-a662-3a06-82f8-c850637984e1"
          },
          {
            "beacon": "weaviate://localhost/e327cdce-52b0-3985-86ea-5c7058d1d8a3",
            "href": "/v1/objects/e327cdce-52b0-3985-86ea-5c7058d1d8a3"
          },
          {
            "beacon": "weaviate://localhost/56ef66ad-0cde-372f-87dc-9ce30c52c349",
            "href": "/v1/objects/56ef66ad-0cde-372f-87dc-9ce30c52c349"
          },
          {
            "beacon": "weaviate://localhost/eb37201e-a4bf-32f3-813d-381585deaefa",
            "href": "/v1/objects/eb37201e-a4bf-32f3-813d-381585deaefa"
          },
          {
            "beacon": "weaviate://localhost/03a0c0c0-dcb9-3e38-a3a1-b3cad91c5efd",
            "href": "/v1/objects/03a0c0c0-dcb9-3e38-a3a1-b3cad91c5efd"
          },
          {
            "beacon": "weaviate://localhost/7b88e2d2-2ed4-36cf-8800-f388fa3ea76b",
            "href": "/v1/objects/7b88e2d2-2ed4-36cf-8800-f388fa3ea76b"
          },
          {
            "beacon": "weaviate://localhost/5510a99c-1bae-3ce2-b2dc-707bb93aa700",
            "href": "/v1/objects/5510a99c-1bae-3ce2-b2dc-707bb93aa700"
          },
          {
            "beacon": "weaviate://localhost/5075c225-209e-3ec7-8f17-4514b79b6b13",
            "href": "/v1/objects/5075c225-209e-3ec7-8f17-4514b79b6b13"
          },
          {
            "beacon": "weaviate://localhost/278979ea-dd9c-3762-b961-801606698c47",
            "href": "/v1/objects/278979ea-dd9c-3762-b961-801606698c47"
          },
          {
            "beacon": "weaviate://localhost/866445dd-b0b0-3a61-aef3-167578b43268",
            "href": "/v1/objects/866445dd-b0b0-3a61-aef3-167578b43268"
          },
          {
            "beacon": "weaviate://localhost/a4cd5e77-3510-32be-bc79-a48e63485e55",
            "href": "/v1/objects/a4cd5e77-3510-32be-bc79-a48e63485e55"
          },
          {
            "beacon": "weaviate://localhost/e89421e0-0a83-35f1-859b-32df7f3852a6",
            "href": "/v1/objects/e89421e0-0a83-35f1-859b-32df7f3852a6"
          },
          {
            "beacon": "weaviate://localhost/192fc735-adf0-3697-8763-a6068f3f44bd",
            "href": "/v1/objects/192fc735-adf0-3697-8763-a6068f3f44bd"
          },
          {
            "beacon": "weaviate://localhost/e0d88c2a-8a24-3a2c-97ef-f381615e5c4c",
            "href": "/v1/objects/e0d88c2a-8a24-3a2c-97ef-f381615e5c4c"
          },
          {
            "beacon": "weaviate://localhost/6f390fd2-ddcc-35ff-bc0c-1fbf554905f8",
            "href": "/v1/objects/6f390fd2-ddcc-35ff-bc0c-1fbf554905f8"
          },
          {
            "beacon": "weaviate://localhost/d2b8f627-8847-3f63-91e9-b47b3a0a5541",
            "href": "/v1/objects/d2b8f627-8847-3f63-91e9-b47b3a0a5541"
          },
          {
            "beacon": "weaviate://localhost/066f9943-3fed-321c-9473-c3d23081cb83",
            "href": "/v1/objects/066f9943-3fed-321c-9473-c3d23081cb83"
          },
          {
            "beacon": "weaviate://localhost/a68b98e1-60a3-3902-bffd-835be3bcc9f1",
            "href": "/v1/objects/a68b98e1-60a3-3902-bffd-835be3bcc9f1"
          },
          {
            "beacon": "weaviate://localhost/4bc2551d-0236-36b9-94c6-d8c4284002e8",
            "href": "/v1/objects/4bc2551d-0236-36b9-94c6-d8c4284002e8"
          },
          {
            "beacon": "weaviate://localhost/edacfe1a-6fc2-3da7-8ade-4dc448600e14",
            "href": "/v1/objects/edacfe1a-6fc2-3da7-8ade-4dc448600e14"
          },
          {
            "beacon": "weaviate://localhost/bed21f4f-0ccc-34d0-a1ee-a9ebbe00ec2e",
            "href": "/v1/objects/bed21f4f-0ccc-34d0-a1ee-a9ebbe00ec2e"
          },
          {
            "beacon": "weaviate://localhost/3a5386bf-1337-3c6b-b990-9083510cf2c3",
            "href": "/v1/objects/3a5386bf-1337-3c6b-b990-9083510cf2c3"
          },
          {
            "beacon": "weaviate://localhost/1451408e-d704-3efc-a459-aff2a1d26544",
            "href": "/v1/objects/1451408e-d704-3efc-a459-aff2a1d26544"
          },
          {
            "beacon": "weaviate://localhost/58bf545f-2320-3a0c-9a4f-7b54183b991c",
            "href": "/v1/objects/58bf545f-2320-3a0c-9a4f-7b54183b991c"
          },
          {
            "beacon": "weaviate://localhost/a9ec9c58-a975-38b7-850a-1aa28d1c3e46",
            "href": "/v1/objects/a9ec9c58-a975-38b7-850a-1aa28d1c3e46"
          },
          {
            "beacon": "weaviate://localhost/f6024c73-5552-338e-8ab2-b674a8e6241d",
            "href": "/v1/objects/f6024c73-5552-338e-8ab2-b674a8e6241d"
          },
          {
            "beacon": "weaviate://localhost/47e0b0bb-8efa-3fc0-8e35-ad31e3292f6d",
            "href": "/v1/objects/47e0b0bb-8efa-3fc0-8e35-ad31e3292f6d"
          },
          {
            "beacon": "weaviate://localhost/b25f8c70-99eb-3bd7-a829-c817d64439b6",
            "href": "/v1/objects/b25f8c70-99eb-3bd7-a829-c817d64439b6"
          },
          {
            "beacon": "weaviate://localhost/0cdf7143-c43b-336f-8b8c-110f67e7c715",
            "href": "/v1/objects/0cdf7143-c43b-336f-8b8c-110f67e7c715"
          },
          {
            "beacon": "weaviate://localhost/199c9be3-08b3-3854-84f1-404695e2e640",
            "href": "/v1/objects/199c9be3-08b3-3854-84f1-404695e2e640"
          },
          {
            "beacon": "weaviate://localhost/37d1337a-99ca-3692-8699-c5e4e616a52d",
            "href": "/v1/objects/37d1337a-99ca-3692-8699-c5e4e616a52d"
          },
          {
            "beacon": "weaviate://localhost/d9856df3-eda6-3f87-9ad4-7b88977e242e",
            "href": "/v1/objects/d9856df3-eda6-3f87-9ad4-7b88977e242e"
          },
          {
            "beacon": "weaviate://localhost/dfdeb1e2-925c-3ac7-bc19-4fe49eae03ae",
            "href": "/v1/objects/dfdeb1e2-925c-3ac7-bc19-4fe49eae03ae"
          },
          {
            "beacon": "weaviate://localhost/8e9693fe-ca78-3d1b-a5d0-8a120f662afa",
            "href": "/v1/objects/8e9693fe-ca78-3d1b-a5d0-8a120f662afa"
          },
          {
            "beacon": "weaviate://localhost/e13c0662-9001-358e-9cbb-11fba2192cba",
            "href": "/v1/objects/e13c0662-9001-358e-9cbb-11fba2192cba"
          },
          {
            "beacon": "weaviate://localhost/97a43717-d067-382a-a7a8-e7e3c3070775",
            "href": "/v1/objects/97a43717-d067-382a-a7a8-e7e3c3070775"
          },
          {
            "beacon": "weaviate://localhost/7593593b-74c6-3d41-8269-0c0451a894e9",
            "href": "/v1/objects/7593593b-74c6-3d41-8269-0c0451a894e9"
          },
          {
            "beacon": "weaviate://localhost/0d46871e-129b-3bd4-81e8-a886102f2ad4",
            "href": "/v1/objects/0d46871e-129b-3bd4-81e8-a886102f2ad4"
          },
          {
            "beacon": "weaviate://localhost/a2352435-f2b6-391e-b403-470818c067f7",
            "href": "/v1/objects/a2352435-f2b6-391e-b403-470818c067f7"
          },
          {
            "beacon": "weaviate://localhost/09bf093f-6eb2-3d11-b02a-46ccf3c2e44c",
            "href": "/v1/objects/09bf093f-6eb2-3d11-b02a-46ccf3c2e44c"
          },
          {
            "beacon": "weaviate://localhost/b5b6d42a-4a14-3122-ac8f-7cf067f02c5f",
            "href": "/v1/objects/b5b6d42a-4a14-3122-ac8f-7cf067f02c5f"
          },
          {
            "beacon": "weaviate://localhost/3bcc8e4c-e2e6-30a8-a492-b879affe484a",
            "href": "/v1/objects/3bcc8e4c-e2e6-30a8-a492-b879affe484a"
          },
          {
            "beacon": "weaviate://localhost/5d58f3ef-61cb-3cf4-9d8f-e520821391b0",
            "href": "/v1/objects/5d58f3ef-61cb-3cf4-9d8f-e520821391b0"
          },
          {
            "beacon": "weaviate://localhost/36142f31-1abe-3736-9447-b8f15291578d",
            "href": "/v1/objects/36142f31-1abe-3736-9447-b8f15291578d"
          },
          {
            "beacon": "weaviate://localhost/c956d9bf-b224-37ef-970f-a7f137687595",
            "href": "/v1/objects/c956d9bf-b224-37ef-970f-a7f137687595"
          },
          {
            "beacon": "weaviate://localhost/f5235ed9-0242-3252-8ae5-34ac8469b4a8",
            "href": "/v1/objects/f5235ed9-0242-3252-8ae5-34ac8469b4a8"
          },
          {
            "beacon": "weaviate://localhost/cc63e9be-ecee-3cc5-b6f4-393545dd105d",
            "href": "/v1/objects/cc63e9be-ecee-3cc5-b6f4-393545dd105d"
          },
          {
            "beacon": "weaviate://localhost/a2465f44-8840-3e87-99c7-3733036f346c",
            "href": "/v1/objects/a2465f44-8840-3e87-99c7-3733036f346c"
          },
          {
            "beacon": "weaviate://localhost/4d5431b9-2a17-363e-b442-b4a624796382",
            "href": "/v1/objects/4d5431b9-2a17-363e-b442-b4a624796382"
          },
          {
            "beacon": "weaviate://localhost/b2394519-e9e7-30c4-81a8-9085f1ed51d3",
            "href": "/v1/objects/b2394519-e9e7-30c4-81a8-9085f1ed51d3"
          },
          {
            "beacon": "weaviate://localhost/3654c240-299b-328c-becb-ed45db6a4cf6",
            "href": "/v1/objects/3654c240-299b-328c-becb-ed45db6a4cf6"
          },
          {
            "beacon": "weaviate://localhost/53f1e9e5-8f39-3741-b590-954282d9a421",
            "href": "/v1/objects/53f1e9e5-8f39-3741-b590-954282d9a421"
          },
          {
            "beacon": "weaviate://localhost/177e3f32-97b9-3651-a935-522a84a82c0b",
            "href": "/v1/objects/177e3f32-97b9-3651-a935-522a84a82c0b"
          },
          {
            "beacon": "weaviate://localhost/ab45f3d4-f73f-358b-bc98-73afd284c139",
            "href": "/v1/objects/ab45f3d4-f73f-358b-bc98-73afd284c139"
          },
          {
            "beacon": "weaviate://localhost/114f98dc-cb2f-35a7-844f-42d087b7544e",
            "href": "/v1/objects/114f98dc-cb2f-35a7-844f-42d087b7544e"
          },
          {
            "beacon": "weaviate://localhost/3974f797-ffc8-3655-9e13-12a2b89a5f4a",
            "href": "/v1/objects/3974f797-ffc8-3655-9e13-12a2b89a5f4a"
          },
          {
            "beacon": "weaviate://localhost/e00f5e43-2c39-3671-8e81-6a7df851c37a",
            "href": "/v1/objects/e00f5e43-2c39-3671-8e81-6a7df851c37a"
          },
          {
            "beacon": "weaviate://localhost/ac56021b-cf5d-387f-b38f-acefeaf1f87f",
            "href": "/v1/objects/ac56021b-cf5d-387f-b38f-acefeaf1f87f"
          },
          {
            "beacon": "weaviate://localhost/592b6e92-85ff-3923-921c-677a8e4f3ef8",
            "href": "/v1/objects/592b6e92-85ff-3923-921c-677a8e4f3ef8"
          },
          {
            "beacon": "weaviate://localhost/ba371366-41ee-3894-93f2-2d1348f5a8ad",
            "href": "/v1/objects/ba371366-41ee-3894-93f2-2d1348f5a8ad"
          },
          {
            "beacon": "weaviate://localhost/25234454-6324-3d98-88f9-8f0530ac0068",
            "href": "/v1/objects/25234454-6324-3d98-88f9-8f0530ac0068"
          },
          {
            "beacon": "weaviate://localhost/bbbaeb20-33bc-3d17-8413-53da0ae55d4e",
            "href": "/v1/objects/bbbaeb20-33bc-3d17-8413-53da0ae55d4e"
          },
          {
            "beacon": "weaviate://localhost/a9684eb9-11b7-3db9-94c9-3a3943c78658",
            "href": "/v1/objects/a9684eb9-11b7-3db9-94c9-3a3943c78658"
          },
          {
            "beacon": "weaviate://localhost/9fea0e10-eeab-3674-bb68-1934b3551a09",
            "href": "/v1/objects/9fea0e10-eeab-3674-bb68-1934b3551a09"
          },
          {
            "beacon": "weaviate://localhost/e3ef3097-1ef1-32b6-baaa-b64cbda6f696",
            "href": "/v1/objects/e3ef3097-1ef1-32b6-baaa-b64cbda6f696"
          },
          {
            "beacon": "weaviate://localhost/d95d339e-4e74-361e-8078-ccfbd4c94b64",
            "href": "/v1/objects/d95d339e-4e74-361e-8078-ccfbd4c94b64"
          },
          {
            "beacon": "weaviate://localhost/c8317013-236a-36b5-abda-288e5fb0cc49",
            "href": "/v1/objects/c8317013-236a-36b5-abda-288e5fb0cc49"
          },
          {
            "beacon": "weaviate://localhost/51b1730d-c11e-3af4-a238-97ec86659203",
            "href": "/v1/objects/51b1730d-c11e-3af4-a238-97ec86659203"
          },
          {
            "beacon": "weaviate://localhost/fe7d9478-6c7a-325a-bfca-7fd432e9226f",
            "href": "/v1/objects/fe7d9478-6c7a-325a-bfca-7fd432e9226f"
          },
          {
            "beacon": "weaviate://localhost/5cb35546-fac6-37e2-bb1c-b17b627726d9",
            "href": "/v1/objects/5cb35546-fac6-37e2-bb1c-b17b627726d9"
          },
          {
            "beacon": "weaviate://localhost/79be0edf-d48d-30ef-83ea-1e7cd1a9d858",
            "href": "/v1/objects/79be0edf-d48d-30ef-83ea-1e7cd1a9d858"
          },
          {
            "beacon": "weaviate://localhost/82915581-7253-39ee-b7ea-882212c70e46",
            "href": "/v1/objects/82915581-7253-39ee-b7ea-882212c70e46"
          },
          {
            "beacon": "weaviate://localhost/54eccf53-581e-3d03-867d-be290625309e",
            "href": "/v1/objects/54eccf53-581e-3d03-867d-be290625309e"
          },
          {
            "beacon": "weaviate://localhost/845758c8-744a-3db6-b8ff-47a577bc683f",
            "href": "/v1/objects/845758c8-744a-3db6-b8ff-47a577bc683f"
          },
          {
            "beacon": "weaviate://localhost/c724ded0-d3ad-3435-9afc-76ada3fe5bb1",
            "href": "/v1/objects/c724ded0-d3ad-3435-9afc-76ada3fe5bb1"
          },
          {
            "beacon": "weaviate://localhost/5510072f-5ba1-3667-b02f-ad20b3254296",
            "href": "/v1/objects/5510072f-5ba1-3667-b02f-ad20b3254296"
          },
          {
            "beacon": "weaviate://localhost/cf75c860-93b8-30fd-842d-679aebab1e34",
            "href": "/v1/objects/cf75c860-93b8-30fd-842d-679aebab1e34"
          },
          {
            "beacon": "weaviate://localhost/6a0684e9-e62a-32ed-b6f1-c38ecf2d38d0",
            "href": "/v1/objects/6a0684e9-e62a-32ed-b6f1-c38ecf2d38d0"
          },
          {
            "beacon": "weaviate://localhost/5c1d0c1f-63e4-355c-910a-8fa2b330411f",
            "href": "/v1/objects/5c1d0c1f-63e4-355c-910a-8fa2b330411f"
          },
          {
            "beacon": "weaviate://localhost/a69182f9-5d5d-34fc-8a3c-08d397af43c2",
            "href": "/v1/objects/a69182f9-5d5d-34fc-8a3c-08d397af43c2"
          }
        ],
        "headquartersGeoLocation": {
          "latitude": 51.512737,
          "longitude": -0.0962234
        },
        "name": "International New York Times"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501894,
      "id": "eaa33b83-3927-3aaf-af4b-4990c79485da",
      "properties": {
        "hasArticles": [
          {
            "beacon": "weaviate://localhost/8b222729-66e0-387b-a53e-331b6d917950",
            "href": "/v1/objects/8b222729-66e0-387b-a53e-331b6d917950"
          },
          {
            "beacon": "weaviate://localhost/f60e8906-9585-3a7f-af63-0ac7ba98b54e",
            "href": "/v1/objects/f60e8906-9585-3a7f-af63-0ac7ba98b54e"
          },
          {
            "beacon": "weaviate://localhost/98e96262-1550-36b9-a54d-43f1131e1119",
            "href": "/v1/objects/98e96262-1550-36b9-a54d-43f1131e1119"
          },
          {
            "beacon": "weaviate://localhost/1112acbe-fbef-354f-960b-28760e383884",
            "href": "/v1/objects/1112acbe-fbef-354f-960b-28760e383884"
          },
          {
            "beacon": "weaviate://localhost/172fe8e0-bd81-326c-ad68-728226a3ce09",
            "href": "/v1/objects/172fe8e0-bd81-326c-ad68-728226a3ce09"
          },
          {
            "beacon": "weaviate://localhost/9227afd1-93fc-3e6b-aeb5-8bc85cef3186",
            "href": "/v1/objects/9227afd1-93fc-3e6b-aeb5-8bc85cef3186"
          },
          {
            "beacon": "weaviate://localhost/e2f58cef-2515-365d-9306-8de57a8f571c",
            "href": "/v1/objects/e2f58cef-2515-365d-9306-8de57a8f571c"
          },
          {
            "beacon": "weaviate://localhost/c743fae0-460d-3afa-89ee-1c12082c07cd",
            "href": "/v1/objects/c743fae0-460d-3afa-89ee-1c12082c07cd"
          },
          {
            "beacon": "weaviate://localhost/8bd89939-6a17-3585-a029-9fc6189965bf",
            "href": "/v1/objects/8bd89939-6a17-3585-a029-9fc6189965bf"
          },
          {
            "beacon": "weaviate://localhost/01a0cd0f-82d4-3678-8e98-bfab4f528233",
            "href": "/v1/objects/01a0cd0f-82d4-3678-8e98-bfab4f528233"
          },
          {
            "beacon": "weaviate://localhost/3a4675c1-fa69-3284-a0d5-5656d3b6c35e",
            "href": "/v1/objects/3a4675c1-fa69-3284-a0d5-5656d3b6c35e"
          },
          {
            "beacon": "weaviate://localhost/81d43811-6ba5-3683-b31b-43f247669350",
            "href": "/v1/objects/81d43811-6ba5-3683-b31b-43f247669350"
          },
          {
            "beacon": "weaviate://localhost/968bfe8d-c7b1-3707-a89a-fff404209e26",
            "href": "/v1/objects/968bfe8d-c7b1-3707-a89a-fff404209e26"
          },
          {
            "beacon": "weaviate://localhost/74cc3c80-6e28-3986-8cc1-a0846f5bcfce",
            "href": "/v1/objects/74cc3c80-6e28-3986-8cc1-a0846f5bcfce"
          },
          {
            "beacon": "weaviate://localhost/2c90bc45-94a7-3a59-91be-5d504cb90ea9",
            "href": "/v1/objects/2c90bc45-94a7-3a59-91be-5d504cb90ea9"
          },
          {
            "beacon": "weaviate://localhost/141f274e-d329-324e-a981-8ce48c761374",
            "href": "/v1/objects/141f274e-d329-324e-a981-8ce48c761374"
          },
          {
            "beacon": "weaviate://localhost/a879ee10-7bc2-3732-a1cb-556d5ebb6cab",
            "href": "/v1/objects/a879ee10-7bc2-3732-a1cb-556d5ebb6cab"
          },
          {
            "beacon": "weaviate://localhost/7b113d51-3ac1-3b6c-a25e-074c19e55979",
            "href": "/v1/objects/7b113d51-3ac1-3b6c-a25e-074c19e55979"
          },
          {
            "beacon": "weaviate://localhost/f85fd6bc-82ce-3cd3-b1ce-77173227d592",
            "href": "/v1/objects/f85fd6bc-82ce-3cd3-b1ce-77173227d592"
          },
          {
            "beacon": "weaviate://localhost/ed6ba936-3a88-3d90-a9d6-21c522dfefba",
            "href": "/v1/objects/ed6ba936-3a88-3d90-a9d6-21c522dfefba"
          },
          {
            "beacon": "weaviate://localhost/b31d9af6-58a6-3003-8f03-1a085ed0d4bf",
            "href": "/v1/objects/b31d9af6-58a6-3003-8f03-1a085ed0d4bf"
          },
          {
            "beacon": "weaviate://localhost/2f4e68d1-92a2-39a6-ac41-3e49f3dc0b4b",
            "href": "/v1/objects/2f4e68d1-92a2-39a6-ac41-3e49f3dc0b4b"
          },
          {
            "beacon": "weaviate://localhost/060581a1-7f7b-3d8c-b94e-84c5306f66f1",
            "href": "/v1/objects/060581a1-7f7b-3d8c-b94e-84c5306f66f1"
          },
          {
            "beacon": "weaviate://localhost/7419e88e-ce32-3340-95cc-645029f8dba8",
            "href": "/v1/objects/7419e88e-ce32-3340-95cc-645029f8dba8"
          },
          {
            "beacon": "weaviate://localhost/1fbf486e-b2f7-38d3-9146-19c4ec758b91",
            "href": "/v1/objects/1fbf486e-b2f7-38d3-9146-19c4ec758b91"
          },
          {
            "beacon": "weaviate://localhost/ea2026b4-388e-3ae2-8749-df61eca5c8cb",
            "href": "/v1/objects/ea2026b4-388e-3ae2-8749-df61eca5c8cb"
          },
          {
            "beacon": "weaviate://localhost/15010464-36af-3c38-a08e-cab3c572b888",
            "href": "/v1/objects/15010464-36af-3c38-a08e-cab3c572b888"
          },
          {
            "beacon": "weaviate://localhost/11bb7d57-a7b0-3acb-a768-115e439962a1",
            "href": "/v1/objects/11bb7d57-a7b0-3acb-a768-115e439962a1"
          },
          {
            "beacon": "weaviate://localhost/90e050ec-9124-325c-902c-b5e0100c9f31",
            "href": "/v1/objects/90e050ec-9124-325c-902c-b5e0100c9f31"
          },
          {
            "beacon": "weaviate://localhost/01f14743-a098-3933-bdd3-11e0a4bbda01",
            "href": "/v1/objects/01f14743-a098-3933-bdd3-11e0a4bbda01"
          },
          {
            "beacon": "weaviate://localhost/99b9719f-df86-3d3b-9144-7d4be4b5cd94",
            "href": "/v1/objects/99b9719f-df86-3d3b-9144-7d4be4b5cd94"
          },
          {
            "beacon": "weaviate://localhost/3fe4628a-6c2e-3ad2-82c5-03329d8fd1c1",
            "href": "/v1/objects/3fe4628a-6c2e-3ad2-82c5-03329d8fd1c1"
          },
          {
            "beacon": "weaviate://localhost/b463ccc0-1854-3b89-8cd0-3163791d8e27",
            "href": "/v1/objects/b463ccc0-1854-3b89-8cd0-3163791d8e27"
          },
          {
            "beacon": "weaviate://localhost/93b27d58-bd34-3ed5-ac46-e4a9c60fc384",
            "href": "/v1/objects/93b27d58-bd34-3ed5-ac46-e4a9c60fc384"
          },
          {
            "beacon": "weaviate://localhost/119b15fa-d109-3dae-b147-ef94c900c474",
            "href": "/v1/objects/119b15fa-d109-3dae-b147-ef94c900c474"
          },
          {
            "beacon": "weaviate://localhost/e5a245c3-e6ea-378f-97a3-935f265ce239",
            "href": "/v1/objects/e5a245c3-e6ea-378f-97a3-935f265ce239"
          },
          {
            "beacon": "weaviate://localhost/53d8c78b-8940-3bb7-a497-d2cb9a92022e",
            "href": "/v1/objects/53d8c78b-8940-3bb7-a497-d2cb9a92022e"
          },
          {
            "beacon": "weaviate://localhost/f5f1a046-acef-3516-937f-af112e5ff68c",
            "href": "/v1/objects/f5f1a046-acef-3516-937f-af112e5ff68c"
          },
          {
            "beacon": "weaviate://localhost/e9b27bdd-ce07-36c5-bc16-feecab7bf266",
            "href": "/v1/objects/e9b27bdd-ce07-36c5-bc16-feecab7bf266"
          },
          {
            "beacon": "weaviate://localhost/43e99ad2-0903-381c-93f5-95647e9ac0ea",
            "href": "/v1/objects/43e99ad2-0903-381c-93f5-95647e9ac0ea"
          },
          {
            "beacon": "weaviate://localhost/9ecea41a-cca6-3fd7-b5a1-4784730b055d",
            "href": "/v1/objects/9ecea41a-cca6-3fd7-b5a1-4784730b055d"
          },
          {
            "beacon": "weaviate://localhost/cc719221-8c25-3303-814f-54d93ce4537b",
            "href": "/v1/objects/cc719221-8c25-3303-814f-54d93ce4537b"
          },
          {
            "beacon": "weaviate://localhost/411da057-8be6-3fa0-9dd5-f363d8e23bf4",
            "href": "/v1/objects/411da057-8be6-3fa0-9dd5-f363d8e23bf4"
          },
          {
            "beacon": "weaviate://localhost/9a10c494-96a9-3739-a1fb-366c4bb339dd",
            "href": "/v1/objects/9a10c494-96a9-3739-a1fb-366c4bb339dd"
          },
          {
            "beacon": "weaviate://localhost/1252c6d9-2c25-3566-b1d6-b9949bcc17c0",
            "href": "/v1/objects/1252c6d9-2c25-3566-b1d6-b9949bcc17c0"
          },
          {
            "beacon": "weaviate://localhost/af50c11f-c374-3a3b-a999-5159aa87f706",
            "href": "/v1/objects/af50c11f-c374-3a3b-a999-5159aa87f706"
          },
          {
            "beacon": "weaviate://localhost/765deea9-5cdc-34f8-b9d7-3aaf4fd0c10e",
            "href": "/v1/objects/765deea9-5cdc-34f8-b9d7-3aaf4fd0c10e"
          },
          {
            "beacon": "weaviate://localhost/f5a18ffa-7eb0-34be-9fa6-d812ae0ba49f",
            "href": "/v1/objects/f5a18ffa-7eb0-34be-9fa6-d812ae0ba49f"
          },
          {
            "beacon": "weaviate://localhost/17074f78-4a8e-3eed-aaf1-6b6c64d61519",
            "href": "/v1/objects/17074f78-4a8e-3eed-aaf1-6b6c64d61519"
          },
          {
            "beacon": "weaviate://localhost/d1f014fa-647c-3768-ad03-c27a18df9fb1",
            "href": "/v1/objects/d1f014fa-647c-3768-ad03-c27a18df9fb1"
          },
          {
            "beacon": "weaviate://localhost/2f4ec77d-b7b1-3348-b5b5-e95419672c08",
            "href": "/v1/objects/2f4ec77d-b7b1-3348-b5b5-e95419672c08"
          },
          {
            "beacon": "weaviate://localhost/4024364b-3ee8-377f-9eeb-eed08dd9ef27",
            "href": "/v1/objects/4024364b-3ee8-377f-9eeb-eed08dd9ef27"
          },
          {
            "beacon": "weaviate://localhost/e00d9b5c-91da-3348-bc34-62f1c6725bd3",
            "href": "/v1/objects/e00d9b5c-91da-3348-bc34-62f1c6725bd3"
          },
          {
            "beacon": "weaviate://localhost/23be67b8-5943-3fff-a66d-c33e16f7bddf",
            "href": "/v1/objects/23be67b8-5943-3fff-a66d-c33e16f7bddf"
          },
          {
            "beacon": "weaviate://localhost/a42414a0-ad40-379c-835d-b0ff6103355e",
            "href": "/v1/objects/a42414a0-ad40-379c-835d-b0ff6103355e"
          },
          {
            "beacon": "weaviate://localhost/1c4dfae0-1caf-3553-8943-ec4f1aefe8ec",
            "href": "/v1/objects/1c4dfae0-1caf-3553-8943-ec4f1aefe8ec"
          },
          {
            "beacon": "weaviate://localhost/96ba740d-bd4c-3e43-b9a1-0cdb085c7bff",
            "href": "/v1/objects/96ba740d-bd4c-3e43-b9a1-0cdb085c7bff"
          },
          {
            "beacon": "weaviate://localhost/f8bac937-23fb-36f8-94fc-5ba4d51c3e7e",
            "href": "/v1/objects/f8bac937-23fb-36f8-94fc-5ba4d51c3e7e"
          },
          {
            "beacon": "weaviate://localhost/07e07a0f-76c1-3131-b5a0-3152aaeb33cc",
            "href": "/v1/objects/07e07a0f-76c1-3131-b5a0-3152aaeb33cc"
          },
          {
            "beacon": "weaviate://localhost/adf9e6ae-4ea2-3a9f-8091-76efa29cc4dd",
            "href": "/v1/objects/adf9e6ae-4ea2-3a9f-8091-76efa29cc4dd"
          },
          {
            "beacon": "weaviate://localhost/53223674-d1b5-3517-a4d3-543b27c1ece5",
            "href": "/v1/objects/53223674-d1b5-3517-a4d3-543b27c1ece5"
          },
          {
            "beacon": "weaviate://localhost/f7e48c89-029a-31e0-8513-6e10b95ad8db",
            "href": "/v1/objects/f7e48c89-029a-31e0-8513-6e10b95ad8db"
          },
          {
            "beacon": "weaviate://localhost/7c55c3e1-2563-33ed-9971-6dc565c11e5e",
            "href": "/v1/objects/7c55c3e1-2563-33ed-9971-6dc565c11e5e"
          },
          {
            "beacon": "weaviate://localhost/f1c6bca9-35dd-3b14-a358-704cef9eafbd",
            "href": "/v1/objects/f1c6bca9-35dd-3b14-a358-704cef9eafbd"
          },
          {
            "beacon": "weaviate://localhost/7d984f73-3091-3cf6-9363-a47e66329b84",
            "href": "/v1/objects/7d984f73-3091-3cf6-9363-a47e66329b84"
          },
          {
            "beacon": "weaviate://localhost/58f86c88-30f9-3c34-a0e5-6c9667d8086f",
            "href": "/v1/objects/58f86c88-30f9-3c34-a0e5-6c9667d8086f"
          },
          {
            "beacon": "weaviate://localhost/d345e330-da23-3409-88a0-33098fa8891a",
            "href": "/v1/objects/d345e330-da23-3409-88a0-33098fa8891a"
          },
          {
            "beacon": "weaviate://localhost/19ea87b3-737d-30a0-a731-732d77629518",
            "href": "/v1/objects/19ea87b3-737d-30a0-a731-732d77629518"
          },
          {
            "beacon": "weaviate://localhost/3f8e0156-1d04-3e4d-b5a9-04a7c4b8928a",
            "href": "/v1/objects/3f8e0156-1d04-3e4d-b5a9-04a7c4b8928a"
          },
          {
            "beacon": "weaviate://localhost/13be87ec-22f3-3ee5-a0d1-00fb72b0c259",
            "href": "/v1/objects/13be87ec-22f3-3ee5-a0d1-00fb72b0c259"
          },
          {
            "beacon": "weaviate://localhost/407f1fe6-c8a6-3446-b518-36438820e595",
            "href": "/v1/objects/407f1fe6-c8a6-3446-b518-36438820e595"
          },
          {
            "beacon": "weaviate://localhost/8fc23ebf-c645-3cc3-bd0c-891d04b601b0",
            "href": "/v1/objects/8fc23ebf-c645-3cc3-bd0c-891d04b601b0"
          }
        ],
        "headquartersGeoLocation": {
          "latitude": 51.512737,
          "longitude": -0.0962234
        },
        "name": "Financial Times"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501891,
      "id": "f2968730-9ce5-3e6f-8e64-b6b9f68984b0",
      "properties": {
        "hasArticles": [
          {
            "beacon": "weaviate://localhost/afc67a97-4809-3ef7-b688-f2fa504bbcc5",
            "href": "/v1/objects/afc67a97-4809-3ef7-b688-f2fa504bbcc5"
          },
          {
            "beacon": "weaviate://localhost/f5451ed8-5a39-3cdd-b1ca-65d192b3ebb4",
            "href": "/v1/objects/f5451ed8-5a39-3cdd-b1ca-65d192b3ebb4"
          },
          {
            "beacon": "weaviate://localhost/ffe1fdb1-99df-3768-bebb-60879aa518ae",
            "href": "/v1/objects/ffe1fdb1-99df-3768-bebb-60879aa518ae"
          },
          {
            "beacon": "weaviate://localhost/32db770b-c465-3770-9cb6-bfc6ea1a0473",
            "href": "/v1/objects/32db770b-c465-3770-9cb6-bfc6ea1a0473"
          },
          {
            "beacon": "weaviate://localhost/22fb0cac-18e1-3110-8e96-3cfea8d0b34b",
            "href": "/v1/objects/22fb0cac-18e1-3110-8e96-3cfea8d0b34b"
          },
          {
            "beacon": "weaviate://localhost/773ddd3f-7a7e-39d2-a3f5-61226669d746",
            "href": "/v1/objects/773ddd3f-7a7e-39d2-a3f5-61226669d746"
          },
          {
            "beacon": "weaviate://localhost/660bb058-4861-3edd-b60d-d7202ae05ba4",
            "href": "/v1/objects/660bb058-4861-3edd-b60d-d7202ae05ba4"
          },
          {
            "beacon": "weaviate://localhost/832bc230-e2c9-3ebd-886e-0f7b6db6fb41",
            "href": "/v1/objects/832bc230-e2c9-3ebd-886e-0f7b6db6fb41"
          },
          {
            "beacon": "weaviate://localhost/0d33b770-caba-3da2-8223-980b45dd9183",
            "href": "/v1/objects/0d33b770-caba-3da2-8223-980b45dd9183"
          },
          {
            "beacon": "weaviate://localhost/e93c63fc-1667-359f-93f6-b7cfbf0d3dd7",
            "href": "/v1/objects/e93c63fc-1667-359f-93f6-b7cfbf0d3dd7"
          },
          {
            "beacon": "weaviate://localhost/84d13b82-2c04-369d-8795-43b50de840bc",
            "href": "/v1/objects/84d13b82-2c04-369d-8795-43b50de840bc"
          },
          {
            "beacon": "weaviate://localhost/6bd48e5b-a9a1-3bfc-a556-6cd492613bfa",
            "href": "/v1/objects/6bd48e5b-a9a1-3bfc-a556-6cd492613bfa"
          },
          {
            "beacon": "weaviate://localhost/84b5021c-77d7-31e1-8698-3cd921aac119",
            "href": "/v1/objects/84b5021c-77d7-31e1-8698-3cd921aac119"
          },
          {
            "beacon": "weaviate://localhost/a2d566eb-2d47-3369-9ba4-cc1653e7952d",
            "href": "/v1/objects/a2d566eb-2d47-3369-9ba4-cc1653e7952d"
          },
          {
            "beacon": "weaviate://localhost/941f2cbd-9ad9-3f1a-9e9e-01712f11a89c",
            "href": "/v1/objects/941f2cbd-9ad9-3f1a-9e9e-01712f11a89c"
          },
          {
            "beacon": "weaviate://localhost/d0127231-1280-357c-a101-47672ad6777a",
            "href": "/v1/objects/d0127231-1280-357c-a101-47672ad6777a"
          },
          {
            "beacon": "weaviate://localhost/d50f2862-cf08-390d-b0d7-c23e7e76ed22",
            "href": "/v1/objects/d50f2862-cf08-390d-b0d7-c23e7e76ed22"
          },
          {
            "beacon": "weaviate://localhost/53b2b990-17e2-3e62-8d22-0a2a2647f46e",
            "href": "/v1/objects/53b2b990-17e2-3e62-8d22-0a2a2647f46e"
          },
          {
            "beacon": "weaviate://localhost/560fb26b-665b-3b0c-b940-07ef6d2fbf18",
            "href": "/v1/objects/560fb26b-665b-3b0c-b940-07ef6d2fbf18"
          },
          {
            "beacon": "weaviate://localhost/36eea9fc-c3ad-34a8-a4f3-13f268fabce7",
            "href": "/v1/objects/36eea9fc-c3ad-34a8-a4f3-13f268fabce7"
          },
          {
            "beacon": "weaviate://localhost/eea7b835-0b07-330c-9e53-a9129011ab86",
            "href": "/v1/objects/eea7b835-0b07-330c-9e53-a9129011ab86"
          },
          {
            "beacon": "weaviate://localhost/95f97596-5e7d-385e-8599-daeb08214292",
            "href": "/v1/objects/95f97596-5e7d-385e-8599-daeb08214292"
          },
          {
            "beacon": "weaviate://localhost/62f84b9c-006b-3643-ad2f-6cefce1953fa",
            "href": "/v1/objects/62f84b9c-006b-3643-ad2f-6cefce1953fa"
          },
          {
            "beacon": "weaviate://localhost/ec6cdcc9-857c-396d-ac00-bc112221e5aa",
            "href": "/v1/objects/ec6cdcc9-857c-396d-ac00-bc112221e5aa"
          },
          {
            "beacon": "weaviate://localhost/1171d836-461b-3624-8471-fd52846d314b",
            "href": "/v1/objects/1171d836-461b-3624-8471-fd52846d314b"
          },
          {
            "beacon": "weaviate://localhost/a4867079-f9fb-3356-9970-3601fba16ab0",
            "href": "/v1/objects/a4867079-f9fb-3356-9970-3601fba16ab0"
          },
          {
            "beacon": "weaviate://localhost/32efeffa-70b8-3c9b-a749-411f427c4a82",
            "href": "/v1/objects/32efeffa-70b8-3c9b-a749-411f427c4a82"
          },
          {
            "beacon": "weaviate://localhost/8e2e74cf-2cee-35c8-8a59-396192c9cd2b",
            "href": "/v1/objects/8e2e74cf-2cee-35c8-8a59-396192c9cd2b"
          },
          {
            "beacon": "weaviate://localhost/8e7fd6ba-0d23-3249-9a12-46637b4a882d",
            "href": "/v1/objects/8e7fd6ba-0d23-3249-9a12-46637b4a882d"
          },
          {
            "beacon": "weaviate://localhost/42387614-44bb-3b27-b799-6a298db58d41",
            "href": "/v1/objects/42387614-44bb-3b27-b799-6a298db58d41"
          },
          {
            "beacon": "weaviate://localhost/274b8fe9-f7eb-39df-9618-7852d470118c",
            "href": "/v1/objects/274b8fe9-f7eb-39df-9618-7852d470118c"
          },
          {
            "beacon": "weaviate://localhost/0833dc7d-4518-3e1e-b746-429357b3ab55",
            "href": "/v1/objects/0833dc7d-4518-3e1e-b746-429357b3ab55"
          },
          {
            "beacon": "weaviate://localhost/d65e1bb3-6db4-3fff-83f3-2993822c0971",
            "href": "/v1/objects/d65e1bb3-6db4-3fff-83f3-2993822c0971"
          }
        ],
        "headquartersGeoLocation": {
          "latitude": 51.534954,
          "longitude": -0.1216748
        },
        "name": "The Guardian"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Publication",
      "creationTimeUnix": 1610447501888,
      "id": "fa207f19-e080-3902-982c-393d321776be",
      "properties": {
        "hasArticles": [
          {
            "beacon": "weaviate://localhost/e62daee4-cb5d-30d2-a09b-8afa0e87b14e",
            "href": "/v1/objects/e62daee4-cb5d-30d2-a09b-8afa0e87b14e"
          },
          {
            "beacon": "weaviate://localhost/e5d846b6-6587-3490-8d55-eac8ea8f03c9",
            "href": "/v1/objects/e5d846b6-6587-3490-8d55-eac8ea8f03c9"
          },
          {
            "beacon": "weaviate://localhost/ac62d968-b53b-39af-8189-a526c5ef6608",
            "href": "/v1/objects/ac62d968-b53b-39af-8189-a526c5ef6608"
          },
          {
            "beacon": "weaviate://localhost/e67fb96f-d23f-37c6-bd75-2880dc158619",
            "href": "/v1/objects/e67fb96f-d23f-37c6-bd75-2880dc158619"
          },
          {
            "beacon": "weaviate://localhost/3a5ea31a-a1f6-38d1-89c8-17ae7b4132ea",
            "href": "/v1/objects/3a5ea31a-a1f6-38d1-89c8-17ae7b4132ea"
          },
          {
            "beacon": "weaviate://localhost/b6ca17ac-878e-3107-91d6-ba1833b1f808",
            "href": "/v1/objects/b6ca17ac-878e-3107-91d6-ba1833b1f808"
          },
          {
            "beacon": "weaviate://localhost/71051d5e-51d3-3f2d-bbc2-e9c6db6f9afc",
            "href": "/v1/objects/71051d5e-51d3-3f2d-bbc2-e9c6db6f9afc"
          },
          {
            "beacon": "weaviate://localhost/bf2867df-de7f-3a5a-8c4e-0ffa72e0479e",
            "href": "/v1/objects/bf2867df-de7f-3a5a-8c4e-0ffa72e0479e"
          },
          {
            "beacon": "weaviate://localhost/5a2c35a9-eb91-3937-a26c-f7d37e6a6575",
            "href": "/v1/objects/5a2c35a9-eb91-3937-a26c-f7d37e6a6575"
          },
          {
            "beacon": "weaviate://localhost/4b4c915e-853d-3cfb-9840-05d6ebc9bb9b",
            "href": "/v1/objects/4b4c915e-853d-3cfb-9840-05d6ebc9bb9b"
          },
          {
            "beacon": "weaviate://localhost/b2775803-4d1a-3d36-b718-393acdabb73e",
            "href": "/v1/objects/b2775803-4d1a-3d36-b718-393acdabb73e"
          },
          {
            "beacon": "weaviate://localhost/b5efd39d-1ae9-3d19-984d-183f1fd0548a",
            "href": "/v1/objects/b5efd39d-1ae9-3d19-984d-183f1fd0548a"
          },
          {
            "beacon": "weaviate://localhost/062db6ad-6d38-3aee-b681-6aaf957f486f",
            "href": "/v1/objects/062db6ad-6d38-3aee-b681-6aaf957f486f"
          },
          {
            "beacon": "weaviate://localhost/55bc79d5-0f66-30af-a5dd-49a8c6a6a89e",
            "href": "/v1/objects/55bc79d5-0f66-30af-a5dd-49a8c6a6a89e"
          },
          {
            "beacon": "weaviate://localhost/d1069963-fa5c-300b-b831-63c7a1a56967",
            "href": "/v1/objects/d1069963-fa5c-300b-b831-63c7a1a56967"
          },
          {
            "beacon": "weaviate://localhost/22592e7b-a281-3283-8349-48943c93f882",
            "href": "/v1/objects/22592e7b-a281-3283-8349-48943c93f882"
          },
          {
            "beacon": "weaviate://localhost/fb23beba-5387-3847-bc6a-7d541ba72941",
            "href": "/v1/objects/fb23beba-5387-3847-bc6a-7d541ba72941"
          },
          {
            "beacon": "weaviate://localhost/5f255990-baf7-3a11-97f5-1b3e7f66bc9d",
            "href": "/v1/objects/5f255990-baf7-3a11-97f5-1b3e7f66bc9d"
          },
          {
            "beacon": "weaviate://localhost/fb419c1c-9e9f-3d04-8011-3a6b88bdc6a3",
            "href": "/v1/objects/fb419c1c-9e9f-3d04-8011-3a6b88bdc6a3"
          },
          {
            "beacon": "weaviate://localhost/5f03c2b9-2a72-3868-8a8b-51cda8fbd1d4",
            "href": "/v1/objects/5f03c2b9-2a72-3868-8a8b-51cda8fbd1d4"
          },
          {
            "beacon": "weaviate://localhost/911396ff-cc3e-3c0a-a10b-1f5e2107cd05",
            "href": "/v1/objects/911396ff-cc3e-3c0a-a10b-1f5e2107cd05"
          },
          {
            "beacon": "weaviate://localhost/3a4383fb-f4b4-3cf8-87a8-84346c54587b",
            "href": "/v1/objects/3a4383fb-f4b4-3cf8-87a8-84346c54587b"
          },
          {
            "beacon": "weaviate://localhost/10b1c526-41a5-3641-b1a7-3376ab55813b",
            "href": "/v1/objects/10b1c526-41a5-3641-b1a7-3376ab55813b"
          },
          {
            "beacon": "weaviate://localhost/dcda8836-efe4-3aaf-9c04-b2518d104d12",
            "href": "/v1/objects/dcda8836-efe4-3aaf-9c04-b2518d104d12"
          },
          {
            "beacon": "weaviate://localhost/18a97c30-46f0-3e75-8362-c8dbba37c0b8",
            "href": "/v1/objects/18a97c30-46f0-3e75-8362-c8dbba37c0b8"
          },
          {
            "beacon": "weaviate://localhost/07471957-c56c-3444-a656-5775e85fb360",
            "href": "/v1/objects/07471957-c56c-3444-a656-5775e85fb360"
          },
          {
            "beacon": "weaviate://localhost/3dc4df18-af34-3b5b-94a9-3d62849dcaa7",
            "href": "/v1/objects/3dc4df18-af34-3b5b-94a9-3d62849dcaa7"
          },
          {
            "beacon": "weaviate://localhost/4b951439-2233-38ae-9c46-dc9cb74517a7",
            "href": "/v1/objects/4b951439-2233-38ae-9c46-dc9cb74517a7"
          },
          {
            "beacon": "weaviate://localhost/6da3c70d-1c36-3712-85c0-c33d7a17e1fd",
            "href": "/v1/objects/6da3c70d-1c36-3712-85c0-c33d7a17e1fd"
          },
          {
            "beacon": "weaviate://localhost/e05cb6e6-5820-351e-b2d1-5b59969e7a7b",
            "href": "/v1/objects/e05cb6e6-5820-351e-b2d1-5b59969e7a7b"
          },
          {
            "beacon": "weaviate://localhost/93122ab1-e14c-3004-b40f-66fc25a60720",
            "href": "/v1/objects/93122ab1-e14c-3004-b40f-66fc25a60720"
          },
          {
            "beacon": "weaviate://localhost/8c0516a6-9811-37e7-843c-c4ee2a2c307d",
            "href": "/v1/objects/8c0516a6-9811-37e7-843c-c4ee2a2c307d"
          },
          {
            "beacon": "weaviate://localhost/c20aae05-4497-38d3-8ac2-3bd3ae8b96a8",
            "href": "/v1/objects/c20aae05-4497-38d3-8ac2-3bd3ae8b96a8"
          },
          {
            "beacon": "weaviate://localhost/ee2889d5-8395-3caf-afd0-ce01701676a7",
            "href": "/v1/objects/ee2889d5-8395-3caf-afd0-ce01701676a7"
          },
          {
            "beacon": "weaviate://localhost/ed73ef8f-1b16-3d51-8274-67ea95269f5c",
            "href": "/v1/objects/ed73ef8f-1b16-3d51-8274-67ea95269f5c"
          },
          {
            "beacon": "weaviate://localhost/3260991f-1e2b-30f4-a40e-f8424f7d9b91",
            "href": "/v1/objects/3260991f-1e2b-30f4-a40e-f8424f7d9b91"
          },
          {
            "beacon": "weaviate://localhost/74f3db11-2a62-3ab0-a8ae-2b4a1e22a460",
            "href": "/v1/objects/74f3db11-2a62-3ab0-a8ae-2b4a1e22a460"
          },
          {
            "beacon": "weaviate://localhost/14f405f0-d19c-3dd0-b2aa-48d0c74fece0",
            "href": "/v1/objects/14f405f0-d19c-3dd0-b2aa-48d0c74fece0"
          },
          {
            "beacon": "weaviate://localhost/26fed5d7-3bdb-354e-9de8-b7c98851012e",
            "href": "/v1/objects/26fed5d7-3bdb-354e-9de8-b7c98851012e"
          },
          {
            "beacon": "weaviate://localhost/6364f737-1dfc-37d9-bd15-deebaad18292",
            "href": "/v1/objects/6364f737-1dfc-37d9-bd15-deebaad18292"
          },
          {
            "beacon": "weaviate://localhost/72eae75f-daef-3958-8902-88f494cadb2e",
            "href": "/v1/objects/72eae75f-daef-3958-8902-88f494cadb2e"
          },
          {
            "beacon": "weaviate://localhost/c4d26fe4-d3b3-3e71-8bf3-35329320d50a",
            "href": "/v1/objects/c4d26fe4-d3b3-3e71-8bf3-35329320d50a"
          },
          {
            "beacon": "weaviate://localhost/3e1343e9-8b1c-3278-b772-bf5655a0610b",
            "href": "/v1/objects/3e1343e9-8b1c-3278-b772-bf5655a0610b"
          },
          {
            "beacon": "weaviate://localhost/36f1ec7d-0fda-37c2-bd4f-31edd1ead3a5",
            "href": "/v1/objects/36f1ec7d-0fda-37c2-bd4f-31edd1ead3a5"
          },
          {
            "beacon": "weaviate://localhost/7bd86375-63cb-301e-9494-1aa3d066ef33",
            "href": "/v1/objects/7bd86375-63cb-301e-9494-1aa3d066ef33"
          },
          {
            "beacon": "weaviate://localhost/3623e121-9dc8-39f5-8d98-678654158536",
            "href": "/v1/objects/3623e121-9dc8-39f5-8d98-678654158536"
          },
          {
            "beacon": "weaviate://localhost/02a6ffa1-e4b9-330f-b93c-5f20c9d12655",
            "href": "/v1/objects/02a6ffa1-e4b9-330f-b93c-5f20c9d12655"
          },
          {
            "beacon": "weaviate://localhost/99f5aee2-0e0c-37df-b3fb-b705a4f07a27",
            "href": "/v1/objects/99f5aee2-0e0c-37df-b3fb-b705a4f07a27"
          },
          {
            "beacon": "weaviate://localhost/2112186a-9b12-3661-9f9d-c3b7a1e414ea",
            "href": "/v1/objects/2112186a-9b12-3661-9f9d-c3b7a1e414ea"
          },
          {
            "beacon": "weaviate://localhost/b6c69bba-3d9a-3f31-864e-a15fb6a624eb",
            "href": "/v1/objects/b6c69bba-3d9a-3f31-864e-a15fb6a624eb"
          },
          {
            "beacon": "weaviate://localhost/d159936b-177f-3896-a3bc-21538119aec9",
            "href": "/v1/objects/d159936b-177f-3896-a3bc-21538119aec9"
          },
          {
            "beacon": "weaviate://localhost/d12784dd-0b6d-35db-9ad5-35e7f6bba031",
            "href": "/v1/objects/d12784dd-0b6d-35db-9ad5-35e7f6bba031"
          },
          {
            "beacon": "weaviate://localhost/d9e2b7ee-c733-3012-bfe0-4c5480193c7a",
            "href": "/v1/objects/d9e2b7ee-c733-3012-bfe0-4c5480193c7a"
          },
          {
            "beacon": "weaviate://localhost/de708179-a1c2-3010-95cf-ba010d3e3f46",
            "href": "/v1/objects/de708179-a1c2-3010-95cf-ba010d3e3f46"
          },
          {
            "beacon": "weaviate://localhost/50b81bec-dfd9-3214-ab88-0c87cd763b90",
            "href": "/v1/objects/50b81bec-dfd9-3214-ab88-0c87cd763b90"
          },
          {
            "beacon": "weaviate://localhost/10d47347-eb90-3bbc-88fb-7daa1b7d497c",
            "href": "/v1/objects/10d47347-eb90-3bbc-88fb-7daa1b7d497c"
          },
          {
            "beacon": "weaviate://localhost/0c7b2353-57e2-3eda-a7ee-eb317f0da9fd",
            "href": "/v1/objects/0c7b2353-57e2-3eda-a7ee-eb317f0da9fd"
          },
          {
            "beacon": "weaviate://localhost/157f59da-fa8a-38f5-b57c-2d3ad7a9420c",
            "href": "/v1/objects/157f59da-fa8a-38f5-b57c-2d3ad7a9420c"
          },
          {
            "beacon": "weaviate://localhost/a0b36925-1750-3ea2-a3de-2eca0b39665e",
            "href": "/v1/objects/a0b36925-1750-3ea2-a3de-2eca0b39665e"
          },
          {
            "beacon": "weaviate://localhost/e8e0b22e-9f37-30db-9523-e22c66b8760f",
            "href": "/v1/objects/e8e0b22e-9f37-30db-9523-e22c66b8760f"
          },
          {
            "beacon": "weaviate://localhost/4b68cd60-6bc0-3666-aa55-8436110f12b4",
            "href": "/v1/objects/4b68cd60-6bc0-3666-aa55-8436110f12b4"
          },
          {
            "beacon": "weaviate://localhost/e91536b5-6158-3d53-a03e-5ecae16ef034",
            "href": "/v1/objects/e91536b5-6158-3d53-a03e-5ecae16ef034"
          },
          {
            "beacon": "weaviate://localhost/8ed4602e-9d6e-3aa2-8cf4-c74a95bc21cb",
            "href": "/v1/objects/8ed4602e-9d6e-3aa2-8cf4-c74a95bc21cb"
          },
          {
            "beacon": "weaviate://localhost/1ff2ff90-6740-3c25-9366-ffd916daf7bf",
            "href": "/v1/objects/1ff2ff90-6740-3c25-9366-ffd916daf7bf"
          },
          {
            "beacon": "weaviate://localhost/366367cd-f24a-391c-9664-bc1e4b911fd0",
            "href": "/v1/objects/366367cd-f24a-391c-9664-bc1e4b911fd0"
          },
          {
            "beacon": "weaviate://localhost/0f3fd7c8-4536-3931-817d-8984f6e83877",
            "href": "/v1/objects/0f3fd7c8-4536-3931-817d-8984f6e83877"
          },
          {
            "beacon": "weaviate://localhost/8507a114-de51-333f-a622-2cffc2f816d4",
            "href": "/v1/objects/8507a114-de51-333f-a622-2cffc2f816d4"
          },
          {
            "beacon": "weaviate://localhost/81631b2b-8332-37b6-8a22-bf32a2f434c9",
            "href": "/v1/objects/81631b2b-8332-37b6-8a22-bf32a2f434c9"
          },
          {
            "beacon": "weaviate://localhost/f58c472a-8128-3cd9-b6e8-56e1777ce3a0",
            "href": "/v1/objects/f58c472a-8128-3cd9-b6e8-56e1777ce3a0"
          },
          {
            "beacon": "weaviate://localhost/12adbda4-7ac0-3c90-8a36-8614cda08e74",
            "href": "/v1/objects/12adbda4-7ac0-3c90-8a36-8614cda08e74"
          },
          {
            "beacon": "weaviate://localhost/a0471e5d-0111-37a3-a4e9-40e5129498b6",
            "href": "/v1/objects/a0471e5d-0111-37a3-a4e9-40e5129498b6"
          },
          {
            "beacon": "weaviate://localhost/9363cac1-f46f-3cde-94c7-dfa248c9c112",
            "href": "/v1/objects/9363cac1-f46f-3cde-94c7-dfa248c9c112"
          },
          {
            "beacon": "weaviate://localhost/303b49a6-b19f-3121-9b43-71f9ea4d1244",
            "href": "/v1/objects/303b49a6-b19f-3121-9b43-71f9ea4d1244"
          },
          {
            "beacon": "weaviate://localhost/796c5971-bf3f-3774-81a6-8c354acf855e",
            "href": "/v1/objects/796c5971-bf3f-3774-81a6-8c354acf855e"
          },
          {
            "beacon": "weaviate://localhost/1b9095ee-d58c-3864-aaf3-d6eda38ef9d0",
            "href": "/v1/objects/1b9095ee-d58c-3864-aaf3-d6eda38ef9d0"
          },
          {
            "beacon": "weaviate://localhost/b270db4e-91ac-3a1b-b712-30851895ad19",
            "href": "/v1/objects/b270db4e-91ac-3a1b-b712-30851895ad19"
          },
          {
            "beacon": "weaviate://localhost/faa0ac7b-5214-303f-892c-6217027f161b",
            "href": "/v1/objects/faa0ac7b-5214-303f-892c-6217027f161b"
          },
          {
            "beacon": "weaviate://localhost/7776cc68-0ea0-380e-841b-84402f297a46",
            "href": "/v1/objects/7776cc68-0ea0-380e-841b-84402f297a46"
          },
          {
            "beacon": "weaviate://localhost/169a8026-acd2-37dc-bd62-6d2b8ac52bd2",
            "href": "/v1/objects/169a8026-acd2-37dc-bd62-6d2b8ac52bd2"
          },
          {
            "beacon": "weaviate://localhost/ad1847a4-927a-3064-b2e5-6844537ff004",
            "href": "/v1/objects/ad1847a4-927a-3064-b2e5-6844537ff004"
          },
          {
            "beacon": "weaviate://localhost/de0a738c-e03e-3e60-af97-3570d8599679",
            "href": "/v1/objects/de0a738c-e03e-3e60-af97-3570d8599679"
          },
          {
            "beacon": "weaviate://localhost/e51167c8-f80a-3b37-a65e-77c2da5273a7",
            "href": "/v1/objects/e51167c8-f80a-3b37-a65e-77c2da5273a7"
          },
          {
            "beacon": "weaviate://localhost/be066cc2-150e-3c20-b6bb-672eb0951dfc",
            "href": "/v1/objects/be066cc2-150e-3c20-b6bb-672eb0951dfc"
          },
          {
            "beacon": "weaviate://localhost/970a622c-2d82-3656-9866-74ac716f9779",
            "href": "/v1/objects/970a622c-2d82-3656-9866-74ac716f9779"
          },
          {
            "beacon": "weaviate://localhost/d784378c-9a61-32c6-a7b2-a31853d71f77",
            "href": "/v1/objects/d784378c-9a61-32c6-a7b2-a31853d71f77"
          },
          {
            "beacon": "weaviate://localhost/c47fd518-8c07-3055-becb-47881b4757c3",
            "href": "/v1/objects/c47fd518-8c07-3055-becb-47881b4757c3"
          },
          {
            "beacon": "weaviate://localhost/4b364442-abc6-3b37-9402-e6614507c02f",
            "href": "/v1/objects/4b364442-abc6-3b37-9402-e6614507c02f"
          },
          {
            "beacon": "weaviate://localhost/8e76726e-8a48-3ee3-94d8-07bfd52c4b41",
            "href": "/v1/objects/8e76726e-8a48-3ee3-94d8-07bfd52c4b41"
          },
          {
            "beacon": "weaviate://localhost/42d46a2d-e21a-33e1-bc83-f8406e8982f0",
            "href": "/v1/objects/42d46a2d-e21a-33e1-bc83-f8406e8982f0"
          },
          {
            "beacon": "weaviate://localhost/3277edce-9e2b-32ad-9eaa-10c78f98d12b",
            "href": "/v1/objects/3277edce-9e2b-32ad-9eaa-10c78f98d12b"
          },
          {
            "beacon": "weaviate://localhost/074a8e1e-2bbe-3fb8-81dc-dd953d33435f",
            "href": "/v1/objects/074a8e1e-2bbe-3fb8-81dc-dd953d33435f"
          },
          {
            "beacon": "weaviate://localhost/88cd8594-0ec3-3a58-9bdc-c36fdba0744e",
            "href": "/v1/objects/88cd8594-0ec3-3a58-9bdc-c36fdba0744e"
          },
          {
            "beacon": "weaviate://localhost/2faf2b7d-f185-30c0-8c80-a01b7cfeefb4",
            "href": "/v1/objects/2faf2b7d-f185-30c0-8c80-a01b7cfeefb4"
          },
          {
            "beacon": "weaviate://localhost/7d7848f4-4237-3c81-bcf3-34b2cf938096",
            "href": "/v1/objects/7d7848f4-4237-3c81-bcf3-34b2cf938096"
          },
          {
            "beacon": "weaviate://localhost/2c774381-fe95-316f-9d66-73957fc5842d",
            "href": "/v1/objects/2c774381-fe95-316f-9d66-73957fc5842d"
          },
          {
            "beacon": "weaviate://localhost/a93d287d-6620-368f-b8a4-1a2d8076de10",
            "href": "/v1/objects/a93d287d-6620-368f-b8a4-1a2d8076de10"
          },
          {
            "beacon": "weaviate://localhost/7a178cc3-f915-3282-9c09-00350c4e8b46",
            "href": "/v1/objects/7a178cc3-f915-3282-9c09-00350c4e8b46"
          },
          {
            "beacon": "weaviate://localhost/43bf7aac-61e9-3b73-b6c7-fe5bef7811bc",
            "href": "/v1/objects/43bf7aac-61e9-3b73-b6c7-fe5bef7811bc"
          },
          {
            "beacon": "weaviate://localhost/c06159b6-1b2f-32f7-8560-d40c6376c415",
            "href": "/v1/objects/c06159b6-1b2f-32f7-8560-d40c6376c415"
          },
          {
            "beacon": "weaviate://localhost/9449ec50-150c-3f56-a09e-01637f92e301",
            "href": "/v1/objects/9449ec50-150c-3f56-a09e-01637f92e301"
          },
          {
            "beacon": "weaviate://localhost/0433ff81-021c-3c99-a322-0840ac13fdcc",
            "href": "/v1/objects/0433ff81-021c-3c99-a322-0840ac13fdcc"
          },
          {
            "beacon": "weaviate://localhost/044feef5-b87a-337a-b48c-c77d87ad0ada",
            "href": "/v1/objects/044feef5-b87a-337a-b48c-c77d87ad0ada"
          },
          {
            "beacon": "weaviate://localhost/6607efb1-bcfb-3c67-b174-1708a2c980eb",
            "href": "/v1/objects/6607efb1-bcfb-3c67-b174-1708a2c980eb"
          },
          {
            "beacon": "weaviate://localhost/d00909d6-96a4-37d8-bd8f-7b692b77412c",
            "href": "/v1/objects/d00909d6-96a4-37d8-bd8f-7b692b77412c"
          },
          {
            "beacon": "weaviate://localhost/311e0892-dcae-37ee-8649-500cea710f36",
            "href": "/v1/objects/311e0892-dcae-37ee-8649-500cea710f36"
          },
          {
            "beacon": "weaviate://localhost/154679b1-2c0e-313f-b834-577301f3de44",
            "href": "/v1/objects/154679b1-2c0e-313f-b834-577301f3de44"
          },
          {
            "beacon": "weaviate://localhost/aa697971-dafb-37e7-971b-444dee42afc0",
            "href": "/v1/objects/aa697971-dafb-37e7-971b-444dee42afc0"
          },
          {
            "beacon": "weaviate://localhost/50aaf2ac-8b53-366c-a484-57f5a07862c6",
            "href": "/v1/objects/50aaf2ac-8b53-366c-a484-57f5a07862c6"
          },
          {
            "beacon": "weaviate://localhost/95983d3a-fe09-313c-9f92-dccde13a5a20",
            "href": "/v1/objects/95983d3a-fe09-313c-9f92-dccde13a5a20"
          },
          {
            "beacon": "weaviate://localhost/192eda4d-3418-3434-9aab-8ac3004ee943",
            "href": "/v1/objects/192eda4d-3418-3434-9aab-8ac3004ee943"
          },
          {
            "beacon": "weaviate://localhost/ef73e311-aea0-32b4-9c46-c7f407ca3a7a",
            "href": "/v1/objects/ef73e311-aea0-32b4-9c46-c7f407ca3a7a"
          },
          {
            "beacon": "weaviate://localhost/8f231e61-b803-326c-91c7-60c6b8b7e939",
            "href": "/v1/objects/8f231e61-b803-326c-91c7-60c6b8b7e939"
          },
          {
            "beacon": "weaviate://localhost/19bb23c4-e217-394b-958b-411d4960deb0",
            "href": "/v1/objects/19bb23c4-e217-394b-958b-411d4960deb0"
          },
          {
            "beacon": "weaviate://localhost/6e83a4cd-6fb6-38e5-9195-c89358543e83",
            "href": "/v1/objects/6e83a4cd-6fb6-38e5-9195-c89358543e83"
          },
          {
            "beacon": "weaviate://localhost/0e5b117b-ca93-3400-9a69-efdc9febc992",
            "href": "/v1/objects/0e5b117b-ca93-3400-9a69-efdc9febc992"
          },
          {
            "beacon": "weaviate://localhost/dd1a0495-5899-3c60-8489-fe08c6d25ce0",
            "href": "/v1/objects/dd1a0495-5899-3c60-8489-fe08c6d25ce0"
          },
          {
            "beacon": "weaviate://localhost/b7c71baa-2dce-3b63-b7bb-adaa2b66f13e",
            "href": "/v1/objects/b7c71baa-2dce-3b63-b7bb-adaa2b66f13e"
          },
          {
            "beacon": "weaviate://localhost/0f9a62de-bb73-3962-a60e-9b59408f3a1d",
            "href": "/v1/objects/0f9a62de-bb73-3962-a60e-9b59408f3a1d"
          },
          {
            "beacon": "weaviate://localhost/58b4650c-082a-3187-a46b-26f4929c2eb9",
            "href": "/v1/objects/58b4650c-082a-3187-a46b-26f4929c2eb9"
          },
          {
            "beacon": "weaviate://localhost/fe63f064-6dd2-33ee-afe4-abe368797776",
            "href": "/v1/objects/fe63f064-6dd2-33ee-afe4-abe368797776"
          },
          {
            "beacon": "weaviate://localhost/af1817f8-ba1e-33d5-a7e1-bfcabe7f998d",
            "href": "/v1/objects/af1817f8-ba1e-33d5-a7e1-bfcabe7f998d"
          },
          {
            "beacon": "weaviate://localhost/a4a7ee82-6df5-39c9-ab33-f2715b09cda1",
            "href": "/v1/objects/a4a7ee82-6df5-39c9-ab33-f2715b09cda1"
          },
          {
            "beacon": "weaviate://localhost/270533a2-ccbb-3327-a22e-c7bc12b4d559",
            "href": "/v1/objects/270533a2-ccbb-3327-a22e-c7bc12b4d559"
          },
          {
            "beacon": "weaviate://localhost/60710b6f-88db-3496-8f1a-3dc4bd784c3b",
            "href": "/v1/objects/60710b6f-88db-3496-8f1a-3dc4bd784c3b"
          }
        ],
        "headquartersGeoLocation": {
          "latitude": 33.757935,
          "longitude": 84.39481
        },
        "name": "CNN"
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447517288,
      "id": "0014e96d-5977-3ad5-969a-19242175dd1b",
      "properties": {
        "name": "Charles Duhig",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/7e9b9ffe-e645-302d-9d94-517670623b35",
            "href": "/v1/objects/7e9b9ffe-e645-302d-9d94-517670623b35"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/5c648be7-de75-30ea-a666-82c640d5a9ee",
            "href": "/v1/objects/5c648be7-de75-30ea-a666-82c640d5a9ee"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447522212,
      "id": "001b209b-8087-3485-ad71-e2b2c70a9120",
      "properties": {
        "name": "Ed Aarons",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/objects/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/e0d88c2a-8a24-3a2c-97ef-f381615e5c4c",
            "href": "/v1/objects/e0d88c2a-8a24-3a2c-97ef-f381615e5c4c"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447528307,
      "id": "0061a5f8-92fc-3394-88ab-97164a051112",
      "properties": {
        "name": "Jasmine Wright",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/fa207f19-e080-3902-982c-393d321776be",
            "href": "/v1/objects/fa207f19-e080-3902-982c-393d321776be"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/be066cc2-150e-3c20-b6bb-672eb0951dfc",
            "href": "/v1/objects/be066cc2-150e-3c20-b6bb-672eb0951dfc"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447529203,
      "id": "00813165-c100-3f83-95a9-e4f5c2dd120b",
      "properties": {
        "name": "Sean Ingle",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/objects/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/7593593b-74c6-3d41-8269-0c0451a894e9",
            "href": "/v1/objects/7593593b-74c6-3d41-8269-0c0451a894e9"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447505943,
      "id": "0128a12c-6aba-33c5-a532-2d6e4cf74462",
      "properties": {
        "name": "Sarah Spelling",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/ac884d35-ccb4-3937-81f8-8474a4d7a549",
            "href": "/v1/objects/ac884d35-ccb4-3937-81f8-8474a4d7a549"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/d97c1a45-2d6f-3e23-bb5a-e2a37b52237a",
            "href": "/v1/objects/d97c1a45-2d6f-3e23-bb5a-e2a37b52237a"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447521298,
      "id": "01df457f-b938-307d-8f87-3a7047c63b56",
      "properties": {
        "name": "Sue Halpern",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/7e9b9ffe-e645-302d-9d94-517670623b35",
            "href": "/v1/objects/7e9b9ffe-e645-302d-9d94-517670623b35"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/e488ad02-4094-3e95-abe4-b83b761de3f2",
            "href": "/v1/objects/e488ad02-4094-3e95-abe4-b83b761de3f2"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447544433,
      "id": "02650661-1e4c-365d-8072-6f77bf278df7",
      "properties": {
        "name": "Amanda Holpuch",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/objects/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/a69182f9-5d5d-34fc-8a3c-08d397af43c2",
            "href": "/v1/objects/a69182f9-5d5d-34fc-8a3c-08d397af43c2"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447543507,
      "id": "02adb2f9-f38b-3788-88a1-480770330208",
      "properties": {
        "name": "Alexis Bennet",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/ac884d35-ccb4-3937-81f8-8474a4d7a549",
            "href": "/v1/objects/ac884d35-ccb4-3937-81f8-8474a4d7a549"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/28351587-e560-30e2-a6f9-ca85aa86c70e",
            "href": "/v1/objects/28351587-e560-30e2-a6f9-ca85aa86c70e"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447523084,
      "id": "0381d5d2-b024-317f-a5f1-26c0e8381a55",
      "properties": {
        "name": "Igor Bobic",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/objects/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/4bc2551d-0236-36b9-94c6-d8c4284002e8",
            "href": "/v1/objects/4bc2551d-0236-36b9-94c6-d8c4284002e8"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447531363,
      "id": "038f8269-b6b5-35fc-84ef-b432b09f0dbf",
      "properties": {
        "name": "Harriet Sherwood",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/objects/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/36142f31-1abe-3736-9447-b8f15291578d",
            "href": "/v1/objects/36142f31-1abe-3736-9447-b8f15291578d"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447529230,
      "id": "03bbb646-823b-3348-a2ec-0d63cbae7b5e",
      "properties": {
        "name": "Alexandra Maco",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/ac884d35-ccb4-3937-81f8-8474a4d7a549",
            "href": "/v1/objects/ac884d35-ccb4-3937-81f8-8474a4d7a549"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/121b291f-d0b5-3577-b7f4-a76a1ae1de72",
            "href": "/v1/objects/121b291f-d0b5-3577-b7f4-a76a1ae1de72"
          }
        ]
      },
      "vectorWeights": null
    },
    {
      "additional": {},
      "class": "Author",
      "creationTimeUnix": 1610447516557,
      "id": "04178ed5-e4e4-366f-bb6b-1dffa76f8a7e",
      "properties": {
        "name": "Christian Allaire",
        "writesFor": [
          {
            "beacon": "weaviate://localhost/ac884d35-ccb4-3937-81f8-8474a4d7a549",
            "href": "/v1/objects/ac884d35-ccb4-3937-81f8-8474a4d7a549"
          }
        ],
        "wroteArticles": [
          {
            "beacon": "weaviate://localhost/6eb3cf27-9f1d-3f2e-b66c-4cd359c41716",
            "href": "/v1/objects/6eb3cf27-9f1d-3f2e-b66c-4cd359c41716"
          }
        ]
      },
      "vectorWeights": null
    }
  ],
  "totalResults": 25
}
```

# Query the dataset with GraphQL

When querying Weaviate, you will always use the GraphQL API. Weaviate has a publicly available graphical user interface (GUI) called the [Console](https://console.semi.technology/).

### Accessing the Console

Go to [console.semi.technology](https://console.semi.technology). Log in and connect to your Weaviate instance, and then go to 'Query' in the left menu.

### Your First Query

Let's first access all news publications.

```graphql
# GraphQL
{
  Get {
    Publication {
      name
    }
  }
}
```

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Publication+%7B%0D%0A++++++name%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

You can also examine which articles are related to these publications.

```graphql
# GraphQL
{
  Get {
    Publication {
      name
      hasArticles{
        ... on Article{
          title
        }
      }
    }
  }
}
```

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Publication+%7B%0D%0A++++++name%0D%0A++++++hasArticles%7B%0D%0A++++++++...+on+Article%7B%0D%0A++++++++++title%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A' %}

And you can even go deeper, to find which authors are related to these publications.

```graphql
# GraphQL
{
  Get {
    Publication(limit: 3) {
      name
      hasArticles{
        ... on Article{
          title
          hasAuthors {
            ... on Author{
              name
            }
          }
        }
      }
    }
  }
}
```

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Publication%28limit%3A+3%29+%7B%0D%0A++++++name%0D%0A++++++hasArticles%7B%0D%0A++++++++...+on+Article%7B%0D%0A++++++++++title%0D%0A++++++++++hasAuthors+%7B%0D%0A++++++++++++...+on+Author%7B%0D%0A++++++++++++++name%0D%0A++++++++++++%7D%0D%0A++++++++++%7D%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}


When querying for articles, you can add classic filters to narrow down your search.

```graphql
# GraphQL
{
  Get {
    Article(
      where:{
        operator: GreaterThanEqual
        path: ["wordCount"]
        valueInt: 1000
      }
      limit: 10
    ) {
      title
      summary
      wordCount
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++where%3A%7B%0D%0A++++++++operator%3A+GreaterThanEqual%0D%0A++++++++path%3A+%5B%22wordCount%22%5D%0D%0A++++++++valueInt%3A+1000%0D%0A++++++%7D%0D%0A++++++limit%3A+10%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++summary%0D%0A++++++wordCount%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}


Do you want to know how many articles, authors and publications there are? This is something you can find using the Aggregate{} function.

```graphql
# GraphQL
{
  Aggregate{
    Publication{
      meta{
        count
      }
    }
    Author{
      meta{
        count
      }
    }
    Article{
      meta{
        count
      }
      wordCount {
        count
        maximum
        mean
        median
        minimum
        mode
        sum
        type
      }
    }
  }
}
```

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Aggregate%7B%0D%0A++++Publication%7B%0D%0A++++++meta%7B%0D%0A++++++++count%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++++Author%7B%0D%0A++++++meta%7B%0D%0A++++++++count%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++++Article%7B%0D%0A++++++meta%7B%0D%0A++++++++count%0D%0A++++++%7D%0D%0A++++++wordCount+%7B%0D%0A++++++++count%0D%0A++++++++maximum%0D%0A++++++++mean%0D%0A++++++++median%0D%0A++++++++minimum%0D%0A++++++++mode%0D%0A++++++++sum%0D%0A++++++++type%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

# Explore with semantic search

In Weaviate, you can also semantically explore your datasets. Let's search for articles related to money.

```graphql
# GraphQL
{
  Get {
    Article(
      nearText: {
        concepts: ["money"]
      }
      limit: 10
    ) {
      title
      summary
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22money%22%5D%0D%0A++++++%7D%0D%0A++++++limit%3A+10%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++summary%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}


You can also combine filters!

```graphql
# GraphQL
{
  Get {
    Article(
      nearText: {
        concepts: ["rideSharing"]
      }
      where:{ 
        operator:And
        operands: [{
          operator: GreaterThan
          path: ["wordCount"]
          valueInt: 200
        }, {
          operator:Like
          path:["title"]
          valueString:"*tax*"
        }]
      }
      limit: 10
    ) {
      title
      summary
      wordCount
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22rideSharing%22%5D%0D%0A++++++%7D%0D%0A++++++where%3A%7B+%0D%0A++++++++operator%3AAnd%0D%0A++++++++operands%3A+%5B%7B%0D%0A++++++++++operator%3A+GreaterThan%0D%0A++++++++++path%3A+%5B%22wordCount%22%5D%0D%0A++++++++++valueInt%3A+200%0D%0A++++++++%7D%2C+%7B%0D%0A++++++++++operator%3ALike%0D%0A++++++++++path%3A%5B%22title%22%5D%0D%0A++++++++++valueString%3A%22%2Atax%2A%22%0D%0A++++++++%7D%5D%0D%0A++++++%7D%0D%0A++++++limit%3A+10%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++summary%0D%0A++++++wordCount%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}


Or group similar topics semantically together. Look how the Publications `International New York Times`, `The New York Times Company` and `New York Times` are merged.

_Tip: play around with the force variable._

```graphql
# GraphQL
{
  Get {
    Publication(
      group: {
        type: merge
        force: 0.1
      }
    ) {
      name
    }
  }
}
```
{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Publication%28%0D%0A++++++group%3A+%7B%0D%0A++++++++type%3A+merge%0D%0A++++++++force%3A+0.1%0D%0A++++++%7D%0D%0A++++%29+%7B%0D%0A++++++name%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A' %}


# What's next...
In this tutorial you learned how to quickly set up a Weaviate with a demo dataset, and use semantic search and classification. Next, check out the following:
- [Spin up a Weaviate instance](./installation.html) with your own [schema](../tutorials/how-to-create-a-schema.html) and [data](../tutorials/how-to-import-data.html).
- Learn more about [authentication](../configuration/authentication.html) and [authorization](../configuration/authorization.html).
- Install one of the [client libraries](../client-libraries/index.html) for smooth interaction with the Weaviate APIs.
- Consult the [RESTful API references](../restful-api-references/index.html) and the [GraphQL references](../graphql-references/index.html) to learn about all the possible interactions with Weaviate. 

# More resources

{% include docs-support-links.html %}
