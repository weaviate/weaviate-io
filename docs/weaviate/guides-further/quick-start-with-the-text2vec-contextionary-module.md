---
title: Text2Vec-Contextionary Quickstart
sidebar_position: 7
# layout: layout-documentation
# solution: weaviate
# sub-menu: Tutorials
# title: Quick start with the text2vec-contextionary module.
# intro: Quick start tutorial of Weaviate running with the text2vec-contextionary module with a demo dataset. This page also shows how contextual classification can be done. The Contextionary is a Weighted Mean of Word Embeddings (WMOWE) vectorizer module which works with popular models such as fastText and GloVe.
# description: Quick start with the text2vec-contextionary module.
# tags: ['how to', 'create a schema']
# sidebar_position: 1
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.9.0/tutorials/quick-start-with-the-text2vec-contextionary-module.html
---

# **Run Weaviate with a demo dataset**

There are many different ways how you can run Weaviate, from local development setups up to large scale Kubernetes environments or hosted and managed Weaviate clusters. For this quick start guide we will be using the [Docker Compose](https://docs.docker.com/compose/) setup where you can run Weaviate on your local machine to which we will add the demo dataset with news publications.

The Docker Compose files below contain both Weaviate and the dataset.

Download the Docker Compose file (note, the Dockerfile has GPUs (i.e., CUDA) disabled, this impacts import and query time significantly. If you have a GPU available ([that is reachable with Docker](https://docs.docker.com/compose/gpu-support/)) simply set `ENABLE_CUDA` to `1` in the [dockerfile](https://github.com/semi-technologies/weaviate-examples/blob/main/weaviate-transformers-newspublications/docker-compose-withgpu.yaml#L27))

```bash
$ curl -o docker-compose.yml https://raw.githubusercontent.com/semi-technologies/weaviate-examples/main/weaviate-transformers-newspublications/docker-compose-simple.yml
```

Run Docker (optional: run with `-d` to run Docker in the background)

```bash
$ docker-compose up
```

Weaviate will be available and preloaded with the news article demo dataset on:

- `http://localhost:8080/v1`
- [Via the Console](https://console.semi.technology/).

# **Query via the Weaviate console**

You can query your local machine via the [Weaviate console](https://console.semi.technology/). In the "Self-hosted Weaviate" input box, fill in `http://localhost:8080/` (you will get redirected to the "http" version of the client).

# **Validate via the RESTful API**

You will always use Weaviate via its HTTP API interface. The interface consists of two different interfaces:

- The RESTful API, which is mostly used to add and manipulate data.
- The GraphQL API (which also runs over HTTP) to query data.

We will first check if Weaviate runs correctly, if the schema is added successfully, and if the data is available. In the example below, we will show you how to do it from the command line.

First, we want to check if Weaviate is running correctly by inspecting the `/v1/meta` endpoint.

_Note: make sure to replace `localhost:8080` with the location of your Weaviate if you have your Weaviate running on a different endpoint or location._

```bash
$ curl -s http://localhost:8080/v1/meta
```

The output will look something like this:

```json
{
    "hostname": "http://[::]:8080",
    "modules": {
        "text2vec-contextionary": {
            "version": "en0.16.0-v1.0.2",
            "wordCount": 818072
        }
    },
    "version": "{{ site.weaviate_version }}"
}
```

This validates that your Weaviate is running correctly.

Next, we want to check if the news publication schema was added correctly, you can do this by inspecting the `/v1/schema` endpoint.

```bash
$ curl -s http://localhost:8080/v1/schema
```

The output will look something like this:

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
                "text2vec-contextionary": {
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
                        "text2vec-contextionary": {
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
                        "text2vec-contextionary": {
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
            "vectorizer": "text2vec-contextionary"
        },
        {
            "class": "Author",
            "description": "Normalised types",
            "invertedIndexConfig": {
                "cleanupIntervalSeconds": 60
            },
            "moduleConfig": {
                "text2vec-contextionary": {
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
                        "text2vec-contextionary": {
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
            "vectorizer": "text2vec-contextionary"
        },
        {
            "class": "Article",
            "description": "Normalised types",
            "invertedIndexConfig": {
                "cleanupIntervalSeconds": 60
            },
            "moduleConfig": {
                "text2vec-contextionary": {
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
                        "text2vec-contextionary": {
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
                        "text2vec-contextionary": {
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
                        "text2vec-contextionary": {
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
                        "text2vec-contextionary": {
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
                        "text2vec-contextionary": {
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
                        "text2vec-contextionary": {
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
            "vectorizer": "text2vec-contextionary"
        },
        {
            "class": "Category",
            "description": "Category an article is a type off",
            "invertedIndexConfig": {
                "cleanupIntervalSeconds": 60
            },
            "moduleConfig": {
                "text2vec-contextionary": {
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
                        "text2vec-contextionary": {
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
            "vectorizer": "text2vec-contextionary"
        }
    ]
}
```

You should be able to identify four classes: `Publication`, `Author`, `Article` and `Category`.

Lastly, we will validate if all data was added correctly, we will do this via the `/v1/objects` endpoint.

```bash
$ curl -s http://localhost:8080/v1/objects
```

The output will look something like this:

```json
{
    "deprecations": null,
    "objects": [
        {
            "class": "Publication",
            "creationTimeUnix": 1618580853819,
            "id": "16476dca-59ce-395e-b896-050080120cd4",
            "properties": {
                "hasArticles": [
                    {
                        "beacon": "weaviate://localhost/8ab6ddcc-2569-362f-bf4c-13dfb568bc36",
                        "href": "/v1/objects/8ab6ddcc-2569-362f-bf4c-13dfb568bc36"
                    },
                    {
                        "beacon": "weaviate://localhost/c707d9bc-840f-3997-a09a-da6dba7d0e87",
                        "href": "/v1/objects/c707d9bc-840f-3997-a09a-da6dba7d0e87"
                    },
                    {
                        "beacon": "weaviate://localhost/8b7711f7-fa7b-3035-85c3-9080077b74ec",
                        "href": "/v1/objects/8b7711f7-fa7b-3035-85c3-9080077b74ec"
                    },
                    {
                        "beacon": "weaviate://localhost/da4b49da-05cb-3a99-a370-98cdf25a1a2d",
                        "href": "/v1/objects/da4b49da-05cb-3a99-a370-98cdf25a1a2d"
                    },
                    {
                        "beacon": "weaviate://localhost/fe00c26f-c849-3f8d-b4da-1886d6abb042",
                        "href": "/v1/objects/fe00c26f-c849-3f8d-b4da-1886d6abb042"
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
                        "beacon": "weaviate://localhost/ed4455c9-4eb7-3f56-9387-a59f20a2230d",
                        "href": "/v1/objects/ed4455c9-4eb7-3f56-9387-a59f20a2230d"
                    },
                    {
                        "beacon": "weaviate://localhost/8aeff886-8457-326d-ae91-80ac8dadd3c9",
                        "href": "/v1/objects/8aeff886-8457-326d-ae91-80ac8dadd3c9"
                    },
                    {
                        "beacon": "weaviate://localhost/269422b4-18c7-386f-994a-fd34e3527008",
                        "href": "/v1/objects/269422b4-18c7-386f-994a-fd34e3527008"
                    },
                    {
                        "beacon": "weaviate://localhost/5f60efd4-4e39-3e3c-b94f-f34103cdb0e4",
                        "href": "/v1/objects/5f60efd4-4e39-3e3c-b94f-f34103cdb0e4"
                    },
                    {
                        "beacon": "weaviate://localhost/3831e2f2-f7b0-36fc-add1-c91e37c9add3",
                        "href": "/v1/objects/3831e2f2-f7b0-36fc-add1-c91e37c9add3"
                    },
                    {
                        "beacon": "weaviate://localhost/3add487a-cde8-39cd-920a-5c24fb993bc7",
                        "href": "/v1/objects/3add487a-cde8-39cd-920a-5c24fb993bc7"
                    },
                    {
                        "beacon": "weaviate://localhost/42a92a04-37fd-3652-b4ef-280988ab6ae9",
                        "href": "/v1/objects/42a92a04-37fd-3652-b4ef-280988ab6ae9"
                    },
                    {
                        "beacon": "weaviate://localhost/3b557cb3-6bbb-3f79-9cb3-83c8e9892d90",
                        "href": "/v1/objects/3b557cb3-6bbb-3f79-9cb3-83c8e9892d90"
                    },
                    {
                        "beacon": "weaviate://localhost/a663a8bc-1288-30f1-945f-17ed02eff32d",
                        "href": "/v1/objects/a663a8bc-1288-30f1-945f-17ed02eff32d"
                    },
                    {
                        "beacon": "weaviate://localhost/d795a5fe-3b67-3028-a260-a719762bca18",
                        "href": "/v1/objects/d795a5fe-3b67-3028-a260-a719762bca18"
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
                        "beacon": "weaviate://localhost/1f959237-1574-3578-88b1-f10bf8da8363",
                        "href": "/v1/objects/1f959237-1574-3578-88b1-f10bf8da8363"
                    },
                    {
                        "beacon": "weaviate://localhost/56912f13-b948-3aab-8b77-0bb358ed5559",
                        "href": "/v1/objects/56912f13-b948-3aab-8b77-0bb358ed5559"
                    },
                    {
                        "beacon": "weaviate://localhost/ff0da1d2-2f17-3792-8df9-290fa8da79d7",
                        "href": "/v1/objects/ff0da1d2-2f17-3792-8df9-290fa8da79d7"
                    },
                    {
                        "beacon": "weaviate://localhost/d87aa97b-b46f-3129-97ca-6dba128e3755",
                        "href": "/v1/objects/d87aa97b-b46f-3129-97ca-6dba128e3755"
                    },
                    {
                        "beacon": "weaviate://localhost/de27b3da-12f4-3c80-9799-2b8866f1889a",
                        "href": "/v1/objects/de27b3da-12f4-3c80-9799-2b8866f1889a"
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
                        "beacon": "weaviate://localhost/937db474-7711-305b-9320-67d19d1b1677",
                        "href": "/v1/objects/937db474-7711-305b-9320-67d19d1b1677"
                    },
                    {
                        "beacon": "weaviate://localhost/955be901-e745-3719-a0ba-476ebd6b598b",
                        "href": "/v1/objects/955be901-e745-3719-a0ba-476ebd6b598b"
                    },
                    {
                        "beacon": "weaviate://localhost/a0e04ed0-fc41-3ba8-9aa9-cd185c1da16c",
                        "href": "/v1/objects/a0e04ed0-fc41-3ba8-9aa9-cd185c1da16c"
                    },
                    {
                        "beacon": "weaviate://localhost/e3b8b33a-8a76-32e5-8623-45ec946b23b3",
                        "href": "/v1/objects/e3b8b33a-8a76-32e5-8623-45ec946b23b3"
                    },
                    {
                        "beacon": "weaviate://localhost/74ab3233-b50a-3a48-b360-14d1107210c7",
                        "href": "/v1/objects/74ab3233-b50a-3a48-b360-14d1107210c7"
                    },
                    {
                        "beacon": "weaviate://localhost/e9fa2a52-5a78-3dfd-89b2-155a268ab4ab",
                        "href": "/v1/objects/e9fa2a52-5a78-3dfd-89b2-155a268ab4ab"
                    },
                    {
                        "beacon": "weaviate://localhost/44c250c7-a19e-36e8-a1c4-ab6ecb835fe9",
                        "href": "/v1/objects/44c250c7-a19e-36e8-a1c4-ab6ecb835fe9"
                    },
                    {
                        "beacon": "weaviate://localhost/e3733d0c-a445-3639-b893-587488589be3",
                        "href": "/v1/objects/e3733d0c-a445-3639-b893-587488589be3"
                    },
                    {
                        "beacon": "weaviate://localhost/d8012307-22cb-3be8-a75a-933ff8765921",
                        "href": "/v1/objects/d8012307-22cb-3be8-a75a-933ff8765921"
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
                        "beacon": "weaviate://localhost/87771fc3-d958-3ae1-8f13-fae595c7b5d7",
                        "href": "/v1/objects/87771fc3-d958-3ae1-8f13-fae595c7b5d7"
                    },
                    {
                        "beacon": "weaviate://localhost/e7c1e1b3-152e-357b-bfb2-b6ceba2ef3de",
                        "href": "/v1/objects/e7c1e1b3-152e-357b-bfb2-b6ceba2ef3de"
                    },
                    {
                        "beacon": "weaviate://localhost/e5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf",
                        "href": "/v1/objects/e5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf"
                    },
                    {
                        "beacon": "weaviate://localhost/f8a2c8b1-27f0-3c11-bda5-da5a979de473",
                        "href": "/v1/objects/f8a2c8b1-27f0-3c11-bda5-da5a979de473"
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
                        "beacon": "weaviate://localhost/7658acc7-4b7b-3b00-90cf-d7ebeeb68e9a",
                        "href": "/v1/objects/7658acc7-4b7b-3b00-90cf-d7ebeeb68e9a"
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
                        "beacon": "weaviate://localhost/36e3d01b-1b32-3cfb-9023-6bc0461c477d",
                        "href": "/v1/objects/36e3d01b-1b32-3cfb-9023-6bc0461c477d"
                    },
                    {
                        "beacon": "weaviate://localhost/9f79e5d1-ec50-3e53-87f4-39149b8c8d94",
                        "href": "/v1/objects/9f79e5d1-ec50-3e53-87f4-39149b8c8d94"
                    },
                    {
                        "beacon": "weaviate://localhost/2659959e-ec1d-3717-a00b-847871cfadef",
                        "href": "/v1/objects/2659959e-ec1d-3717-a00b-847871cfadef"
                    },
                    {
                        "beacon": "weaviate://localhost/0428b75a-1134-3fa6-af0f-73477323d44c",
                        "href": "/v1/objects/0428b75a-1134-3fa6-af0f-73477323d44c"
                    },
                    {
                        "beacon": "weaviate://localhost/b44b1c43-2d1d-3405-82d4-39d62a270006",
                        "href": "/v1/objects/b44b1c43-2d1d-3405-82d4-39d62a270006"
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
                        "beacon": "weaviate://localhost/174ae35f-1cb8-3791-9ae8-04964d45e37e",
                        "href": "/v1/objects/174ae35f-1cb8-3791-9ae8-04964d45e37e"
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
                        "beacon": "weaviate://localhost/260c415d-10c0-334f-9e1d-0c83b2e94146",
                        "href": "/v1/objects/260c415d-10c0-334f-9e1d-0c83b2e94146"
                    },
                    {
                        "beacon": "weaviate://localhost/22b52caa-177e-3b17-9cc8-3591de339c67",
                        "href": "/v1/objects/22b52caa-177e-3b17-9cc8-3591de339c67"
                    },
                    {
                        "beacon": "weaviate://localhost/924f9644-9ac6-314b-89e0-abd66322a824",
                        "href": "/v1/objects/924f9644-9ac6-314b-89e0-abd66322a824"
                    },
                    {
                        "beacon": "weaviate://localhost/90226623-61f0-3239-8965-fb2e386d5fee",
                        "href": "/v1/objects/90226623-61f0-3239-8965-fb2e386d5fee"
                    },
                    {
                        "beacon": "weaviate://localhost/a96c5d3b-9e07-33dd-baff-31c3bc342781",
                        "href": "/v1/objects/a96c5d3b-9e07-33dd-baff-31c3bc342781"
                    },
                    {
                        "beacon": "weaviate://localhost/da1f3794-88cb-3bba-93e5-ef0fdbafcedb",
                        "href": "/v1/objects/da1f3794-88cb-3bba-93e5-ef0fdbafcedb"
                    },
                    {
                        "beacon": "weaviate://localhost/e69b3e26-0cf5-3a74-ad72-8852140228fc",
                        "href": "/v1/objects/e69b3e26-0cf5-3a74-ad72-8852140228fc"
                    },
                    {
                        "beacon": "weaviate://localhost/b7fa4de0-595c-3a54-a70a-e108ba5ae1ce",
                        "href": "/v1/objects/b7fa4de0-595c-3a54-a70a-e108ba5ae1ce"
                    },
                    {
                        "beacon": "weaviate://localhost/8d2aafc7-b1e5-3bcd-8d63-af0ca718f451",
                        "href": "/v1/objects/8d2aafc7-b1e5-3bcd-8d63-af0ca718f451"
                    },
                    {
                        "beacon": "weaviate://localhost/3934093b-2782-3a1d-b7c4-30e0837117c0",
                        "href": "/v1/objects/3934093b-2782-3a1d-b7c4-30e0837117c0"
                    },
                    {
                        "beacon": "weaviate://localhost/5f1b3a94-6d57-335a-8060-c20e36051cc2",
                        "href": "/v1/objects/5f1b3a94-6d57-335a-8060-c20e36051cc2"
                    },
                    {
                        "beacon": "weaviate://localhost/99ba2444-a074-391e-a7fb-30674004be53",
                        "href": "/v1/objects/99ba2444-a074-391e-a7fb-30674004be53"
                    },
                    {
                        "beacon": "weaviate://localhost/97bdfaf8-957a-34cd-ab9f-840512077b7a",
                        "href": "/v1/objects/97bdfaf8-957a-34cd-ab9f-840512077b7a"
                    },
                    {
                        "beacon": "weaviate://localhost/e6909af2-795a-36e9-a8f3-0d44f171db37",
                        "href": "/v1/objects/e6909af2-795a-36e9-a8f3-0d44f171db37"
                    },
                    {
                        "beacon": "weaviate://localhost/68dc349e-c128-32e9-88da-d2e8a6c3b36b",
                        "href": "/v1/objects/68dc349e-c128-32e9-88da-d2e8a6c3b36b"
                    },
                    {
                        "beacon": "weaviate://localhost/2764efd8-31ff-3d3a-bef6-95abd448e54d",
                        "href": "/v1/objects/2764efd8-31ff-3d3a-bef6-95abd448e54d"
                    },
                    {
                        "beacon": "weaviate://localhost/0d1240d9-214e-32e4-95ce-c8131db0ddbc",
                        "href": "/v1/objects/0d1240d9-214e-32e4-95ce-c8131db0ddbc"
                    },
                    {
                        "beacon": "weaviate://localhost/84662e57-f7a5-344e-a807-3f3e9af21404",
                        "href": "/v1/objects/84662e57-f7a5-344e-a807-3f3e9af21404"
                    },
                    {
                        "beacon": "weaviate://localhost/3d812eb2-7c41-3a21-b5b7-113505f84a41",
                        "href": "/v1/objects/3d812eb2-7c41-3a21-b5b7-113505f84a41"
                    },
                    {
                        "beacon": "weaviate://localhost/3c04d26a-09a5-3199-86ee-2a136c1b9b13",
                        "href": "/v1/objects/3c04d26a-09a5-3199-86ee-2a136c1b9b13"
                    },
                    {
                        "beacon": "weaviate://localhost/7a5b81be-3d55-35fb-94fc-54a56423fad7",
                        "href": "/v1/objects/7a5b81be-3d55-35fb-94fc-54a56423fad7"
                    },
                    {
                        "beacon": "weaviate://localhost/3e2de48c-d1ca-3dcf-8ed4-245587ab69ec",
                        "href": "/v1/objects/3e2de48c-d1ca-3dcf-8ed4-245587ab69ec"
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
                        "beacon": "weaviate://localhost/601cf76e-27d4-309e-8abe-3b2c78eec41c",
                        "href": "/v1/objects/601cf76e-27d4-309e-8abe-3b2c78eec41c"
                    },
                    {
                        "beacon": "weaviate://localhost/70899541-0783-3463-98fa-457605db9f4c",
                        "href": "/v1/objects/70899541-0783-3463-98fa-457605db9f4c"
                    },
                    {
                        "beacon": "weaviate://localhost/b89a597b-7a79-3e56-9d26-87b864f0e248",
                        "href": "/v1/objects/b89a597b-7a79-3e56-9d26-87b864f0e248"
                    },
                    {
                        "beacon": "weaviate://localhost/3c04c1cd-86ca-3ac1-9fe8-5228b755bb48",
                        "href": "/v1/objects/3c04c1cd-86ca-3ac1-9fe8-5228b755bb48"
                    },
                    {
                        "beacon": "weaviate://localhost/54f19fdc-caa2-3643-9efc-1075d69ddc55",
                        "href": "/v1/objects/54f19fdc-caa2-3643-9efc-1075d69ddc55"
                    },
                    {
                        "beacon": "weaviate://localhost/fe06d32d-9736-37f9-8ef1-9b1344d2766a",
                        "href": "/v1/objects/fe06d32d-9736-37f9-8ef1-9b1344d2766a"
                    },
                    {
                        "beacon": "weaviate://localhost/ee6493a7-397c-3071-9def-987c7d638181",
                        "href": "/v1/objects/ee6493a7-397c-3071-9def-987c7d638181"
                    },
                    {
                        "beacon": "weaviate://localhost/48b64a35-d715-30b8-b436-8bdb54300ab1",
                        "href": "/v1/objects/48b64a35-d715-30b8-b436-8bdb54300ab1"
                    },
                    {
                        "beacon": "weaviate://localhost/992ad0b6-cca8-38c4-84d9-dfde3a0e3a11",
                        "href": "/v1/objects/992ad0b6-cca8-38c4-84d9-dfde3a0e3a11"
                    },
                    {
                        "beacon": "weaviate://localhost/c9f222c2-0f26-3d08-87ea-2f237afff2f1",
                        "href": "/v1/objects/c9f222c2-0f26-3d08-87ea-2f237afff2f1"
                    },
                    {
                        "beacon": "weaviate://localhost/79077d58-d02c-3408-affe-eb0691331eec",
                        "href": "/v1/objects/79077d58-d02c-3408-affe-eb0691331eec"
                    },
                    {
                        "beacon": "weaviate://localhost/a8c0706c-2119-3ccc-86fd-6f9b18b7d469",
                        "href": "/v1/objects/a8c0706c-2119-3ccc-86fd-6f9b18b7d469"
                    },
                    {
                        "beacon": "weaviate://localhost/0c4a9229-da70-3271-b281-43b1a0feb510",
                        "href": "/v1/objects/0c4a9229-da70-3271-b281-43b1a0feb510"
                    },
                    {
                        "beacon": "weaviate://localhost/b0469c28-00f1-36af-b44f-ed75676c1861",
                        "href": "/v1/objects/b0469c28-00f1-36af-b44f-ed75676c1861"
                    },
                    {
                        "beacon": "weaviate://localhost/ab3dce0e-e22a-364f-bec9-79b972f957aa",
                        "href": "/v1/objects/ab3dce0e-e22a-364f-bec9-79b972f957aa"
                    },
                    {
                        "beacon": "weaviate://localhost/ec2f23f0-cb6c-3d14-af41-71f8001893cd",
                        "href": "/v1/objects/ec2f23f0-cb6c-3d14-af41-71f8001893cd"
                    },
                    {
                        "beacon": "weaviate://localhost/b9c95560-c7e6-3ab7-a0cd-2a200ec6cc0c",
                        "href": "/v1/objects/b9c95560-c7e6-3ab7-a0cd-2a200ec6cc0c"
                    },
                    {
                        "beacon": "weaviate://localhost/552e257f-b8a5-381e-a80d-74f727d4be1c",
                        "href": "/v1/objects/552e257f-b8a5-381e-a80d-74f727d4be1c"
                    },
                    {
                        "beacon": "weaviate://localhost/75cb3d2d-5296-33e4-9805-022296581bea",
                        "href": "/v1/objects/75cb3d2d-5296-33e4-9805-022296581bea"
                    },
                    {
                        "beacon": "weaviate://localhost/c9094d69-d45b-3508-85e5-23445cfb5f9f",
                        "href": "/v1/objects/c9094d69-d45b-3508-85e5-23445cfb5f9f"
                    },
                    {
                        "beacon": "weaviate://localhost/16ac7208-f250-3326-bfcc-be6370eb138e",
                        "href": "/v1/objects/16ac7208-f250-3326-bfcc-be6370eb138e"
                    },
                    {
                        "beacon": "weaviate://localhost/7b1ecab5-117e-3d2e-a16d-08be249d63d4",
                        "href": "/v1/objects/7b1ecab5-117e-3d2e-a16d-08be249d63d4"
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
                        "beacon": "weaviate://localhost/a459f714-d731-377d-a09f-51e4185750a2",
                        "href": "/v1/objects/a459f714-d731-377d-a09f-51e4185750a2"
                    },
                    {
                        "beacon": "weaviate://localhost/96a7e540-0244-3ac8-b3ab-70cb5b26a089",
                        "href": "/v1/objects/96a7e540-0244-3ac8-b3ab-70cb5b26a089"
                    },
                    {
                        "beacon": "weaviate://localhost/25236298-9e1a-35a5-b187-87f8bf6e2085",
                        "href": "/v1/objects/25236298-9e1a-35a5-b187-87f8bf6e2085"
                    },
                    {
                        "beacon": "weaviate://localhost/75419b27-8928-32cb-8ee9-bf2801665611",
                        "href": "/v1/objects/75419b27-8928-32cb-8ee9-bf2801665611"
                    },
                    {
                        "beacon": "weaviate://localhost/4a101b89-a1ba-37d4-a2ba-696a1bcfe4c3",
                        "href": "/v1/objects/4a101b89-a1ba-37d4-a2ba-696a1bcfe4c3"
                    },
                    {
                        "beacon": "weaviate://localhost/ffa2efe8-917b-3b24-b7df-684169c66d84",
                        "href": "/v1/objects/ffa2efe8-917b-3b24-b7df-684169c66d84"
                    },
                    {
                        "beacon": "weaviate://localhost/ef0bea7b-f700-3438-b5e0-8beb24c2a36d",
                        "href": "/v1/objects/ef0bea7b-f700-3438-b5e0-8beb24c2a36d"
                    },
                    {
                        "beacon": "weaviate://localhost/4055ff6c-9365-3184-aaed-a8478d5b6b13",
                        "href": "/v1/objects/4055ff6c-9365-3184-aaed-a8478d5b6b13"
                    },
                    {
                        "beacon": "weaviate://localhost/78dacea2-0f58-3354-ba24-695faf94a953",
                        "href": "/v1/objects/78dacea2-0f58-3354-ba24-695faf94a953"
                    },
                    {
                        "beacon": "weaviate://localhost/2a64dbbd-9113-31de-bb4e-6e22c03de0d2",
                        "href": "/v1/objects/2a64dbbd-9113-31de-bb4e-6e22c03de0d2"
                    },
                    {
                        "beacon": "weaviate://localhost/77e0fa01-06e0-370f-a8c4-313918c398e6",
                        "href": "/v1/objects/77e0fa01-06e0-370f-a8c4-313918c398e6"
                    },
                    {
                        "beacon": "weaviate://localhost/86b505fe-3823-3f1f-be65-91a951f285aa",
                        "href": "/v1/objects/86b505fe-3823-3f1f-be65-91a951f285aa"
                    },
                    {
                        "beacon": "weaviate://localhost/9b8d2590-378f-3fa6-8202-a69b0f5bdebf",
                        "href": "/v1/objects/9b8d2590-378f-3fa6-8202-a69b0f5bdebf"
                    },
                    {
                        "beacon": "weaviate://localhost/77df1b31-8b91-3f33-8422-1033c9f4839b",
                        "href": "/v1/objects/77df1b31-8b91-3f33-8422-1033c9f4839b"
                    },
                    {
                        "beacon": "weaviate://localhost/52b35798-678c-3ef3-b7f5-56e98923c5d4",
                        "href": "/v1/objects/52b35798-678c-3ef3-b7f5-56e98923c5d4"
                    },
                    {
                        "beacon": "weaviate://localhost/d98f6693-79be-35b3-8167-5cd30cf0b720",
                        "href": "/v1/objects/d98f6693-79be-35b3-8167-5cd30cf0b720"
                    },
                    {
                        "beacon": "weaviate://localhost/2de370b7-919a-3ac5-95cb-0a366adb380b",
                        "href": "/v1/objects/2de370b7-919a-3ac5-95cb-0a366adb380b"
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
                        "beacon": "weaviate://localhost/6ea7f83f-afa0-3e56-9bbe-1c60fb56ebd4",
                        "href": "/v1/objects/6ea7f83f-afa0-3e56-9bbe-1c60fb56ebd4"
                    },
                    {
                        "beacon": "weaviate://localhost/dc11bd8f-985d-3be0-81ea-7d4e4aa9be34",
                        "href": "/v1/objects/dc11bd8f-985d-3be0-81ea-7d4e4aa9be34"
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
                        "beacon": "weaviate://localhost/2aeba77c-43eb-331e-b683-e0fb5ea3f386",
                        "href": "/v1/objects/2aeba77c-43eb-331e-b683-e0fb5ea3f386"
                    },
                    {
                        "beacon": "weaviate://localhost/eeb4b495-1310-3ab0-93dc-4dbe6c8a846c",
                        "href": "/v1/objects/eeb4b495-1310-3ab0-93dc-4dbe6c8a846c"
                    },
                    {
                        "beacon": "weaviate://localhost/9b16bf73-c4ab-301e-aae2-c98a038e3aec",
                        "href": "/v1/objects/9b16bf73-c4ab-301e-aae2-c98a038e3aec"
                    },
                    {
                        "beacon": "weaviate://localhost/ba096ee7-36a1-36a1-b3d9-ff6b0d06370f",
                        "href": "/v1/objects/ba096ee7-36a1-36a1-b3d9-ff6b0d06370f"
                    },
                    {
                        "beacon": "weaviate://localhost/d1395589-6a6f-3897-a777-6b6c14baa0e7",
                        "href": "/v1/objects/d1395589-6a6f-3897-a777-6b6c14baa0e7"
                    },
                    {
                        "beacon": "weaviate://localhost/11a79f5c-8731-3ce7-9daf-014d3569eccb",
                        "href": "/v1/objects/11a79f5c-8731-3ce7-9daf-014d3569eccb"
                    },
                    {
                        "beacon": "weaviate://localhost/16d4c54e-448f-3d9e-98b3-31201e24a394",
                        "href": "/v1/objects/16d4c54e-448f-3d9e-98b3-31201e24a394"
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
                        "beacon": "weaviate://localhost/4f09b043-f321-3ab5-a4bb-2eb65b7dd565",
                        "href": "/v1/objects/4f09b043-f321-3ab5-a4bb-2eb65b7dd565"
                    },
                    {
                        "beacon": "weaviate://localhost/6faed518-24fe-3c40-b610-fda996158d08",
                        "href": "/v1/objects/6faed518-24fe-3c40-b610-fda996158d08"
                    },
                    {
                        "beacon": "weaviate://localhost/812d72d6-5101-3a30-93e5-a73ae060aa96",
                        "href": "/v1/objects/812d72d6-5101-3a30-93e5-a73ae060aa96"
                    },
                    {
                        "beacon": "weaviate://localhost/a95e60bd-8e9e-32cf-9bae-dfae026107b8",
                        "href": "/v1/objects/a95e60bd-8e9e-32cf-9bae-dfae026107b8"
                    },
                    {
                        "beacon": "weaviate://localhost/749a3ecd-5ce6-3959-a270-111b24b0d022",
                        "href": "/v1/objects/749a3ecd-5ce6-3959-a270-111b24b0d022"
                    },
                    {
                        "beacon": "weaviate://localhost/a098f5bc-af2f-352a-904d-a78c5bf1248e",
                        "href": "/v1/objects/a098f5bc-af2f-352a-904d-a78c5bf1248e"
                    },
                    {
                        "beacon": "weaviate://localhost/eea3a28c-b573-34d6-a8e2-9841e6323cc3",
                        "href": "/v1/objects/eea3a28c-b573-34d6-a8e2-9841e6323cc3"
                    },
                    {
                        "beacon": "weaviate://localhost/9ecc2a38-a5a8-3845-ae64-fd3ba324bdad",
                        "href": "/v1/objects/9ecc2a38-a5a8-3845-ae64-fd3ba324bdad"
                    },
                    {
                        "beacon": "weaviate://localhost/932989af-fb7b-3904-bff9-8d3a48e42713",
                        "href": "/v1/objects/932989af-fb7b-3904-bff9-8d3a48e42713"
                    },
                    {
                        "beacon": "weaviate://localhost/c8d8816f-4c8b-38b8-8212-661dfef0c19f",
                        "href": "/v1/objects/c8d8816f-4c8b-38b8-8212-661dfef0c19f"
                    },
                    {
                        "beacon": "weaviate://localhost/2892b09b-9753-37b1-9a54-22c2cf41d702",
                        "href": "/v1/objects/2892b09b-9753-37b1-9a54-22c2cf41d702"
                    },
                    {
                        "beacon": "weaviate://localhost/f3b87688-a2ad-3686-89e2-62295c1cb006",
                        "href": "/v1/objects/f3b87688-a2ad-3686-89e2-62295c1cb006"
                    },
                    {
                        "beacon": "weaviate://localhost/8604f5f1-e423-3441-a21a-faed0963d46b",
                        "href": "/v1/objects/8604f5f1-e423-3441-a21a-faed0963d46b"
                    },
                    {
                        "beacon": "weaviate://localhost/31771e83-4bd5-3b4b-94df-5b0261a0c63e",
                        "href": "/v1/objects/31771e83-4bd5-3b4b-94df-5b0261a0c63e"
                    },
                    {
                        "beacon": "weaviate://localhost/2053ad9b-3fde-3412-945f-419adc01fceb",
                        "href": "/v1/objects/2053ad9b-3fde-3412-945f-419adc01fceb"
                    },
                    {
                        "beacon": "weaviate://localhost/f55134d3-181b-3d7a-a0fd-a4be8e213fb5",
                        "href": "/v1/objects/f55134d3-181b-3d7a-a0fd-a4be8e213fb5"
                    },
                    {
                        "beacon": "weaviate://localhost/d0aa26c0-cbc8-3320-bdda-fe0f450c58a3",
                        "href": "/v1/objects/d0aa26c0-cbc8-3320-bdda-fe0f450c58a3"
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
                        "beacon": "weaviate://localhost/12fdb150-1252-3d2c-b44f-fdfa49d21fb6",
                        "href": "/v1/objects/12fdb150-1252-3d2c-b44f-fdfa49d21fb6"
                    },
                    {
                        "beacon": "weaviate://localhost/423b3bdd-cef1-3138-ae27-c28c1fe97d40",
                        "href": "/v1/objects/423b3bdd-cef1-3138-ae27-c28c1fe97d40"
                    },
                    {
                        "beacon": "weaviate://localhost/630e92b8-384a-32f4-8732-cac2b2a5a521",
                        "href": "/v1/objects/630e92b8-384a-32f4-8732-cac2b2a5a521"
                    },
                    {
                        "beacon": "weaviate://localhost/9e8fbf3e-cc08-3bfa-9d4f-77e80e791644",
                        "href": "/v1/objects/9e8fbf3e-cc08-3bfa-9d4f-77e80e791644"
                    },
                    {
                        "beacon": "weaviate://localhost/dbdbc68d-09d9-3bfb-af47-1887038682ba",
                        "href": "/v1/objects/dbdbc68d-09d9-3bfb-af47-1887038682ba"
                    },
                    {
                        "beacon": "weaviate://localhost/9a4f00ba-8bc4-3511-ae69-485e877a1437",
                        "href": "/v1/objects/9a4f00ba-8bc4-3511-ae69-485e877a1437"
                    },
                    {
                        "beacon": "weaviate://localhost/bef27f2c-2e53-33ea-9ca9-3362b75cb275",
                        "href": "/v1/objects/bef27f2c-2e53-33ea-9ca9-3362b75cb275"
                    },
                    {
                        "beacon": "weaviate://localhost/801b5606-97fb-3a87-8e21-630070537413",
                        "href": "/v1/objects/801b5606-97fb-3a87-8e21-630070537413"
                    },
                    {
                        "beacon": "weaviate://localhost/50f224f6-ba34-316b-8608-9191849ae4d6",
                        "href": "/v1/objects/50f224f6-ba34-316b-8608-9191849ae4d6"
                    },
                    {
                        "beacon": "weaviate://localhost/3f15a4e6-df0a-388b-8103-e7223427df5e",
                        "href": "/v1/objects/3f15a4e6-df0a-388b-8103-e7223427df5e"
                    },
                    {
                        "beacon": "weaviate://localhost/0b4402de-0817-3b4e-a70a-f0bf6f82cf0b",
                        "href": "/v1/objects/0b4402de-0817-3b4e-a70a-f0bf6f82cf0b"
                    },
                    {
                        "beacon": "weaviate://localhost/fbe6995e-3299-3eac-aaca-45b8b57f288d",
                        "href": "/v1/objects/fbe6995e-3299-3eac-aaca-45b8b57f288d"
                    },
                    {
                        "beacon": "weaviate://localhost/a2ae645f-36f9-3f8e-b716-458acc8703e7",
                        "href": "/v1/objects/a2ae645f-36f9-3f8e-b716-458acc8703e7"
                    },
                    {
                        "beacon": "weaviate://localhost/6b59f2ab-3a22-323c-8a84-1dc171f855c2",
                        "href": "/v1/objects/6b59f2ab-3a22-323c-8a84-1dc171f855c2"
                    },
                    {
                        "beacon": "weaviate://localhost/000e4e5f-40a8-3981-ba08-2407c92efa6c",
                        "href": "/v1/objects/000e4e5f-40a8-3981-ba08-2407c92efa6c"
                    },
                    {
                        "beacon": "weaviate://localhost/d7fd2f21-4be9-3b86-b581-50c11f60433f",
                        "href": "/v1/objects/d7fd2f21-4be9-3b86-b581-50c11f60433f"
                    },
                    {
                        "beacon": "weaviate://localhost/f605dd68-74eb-3ad2-988e-8cc9889919e3",
                        "href": "/v1/objects/f605dd68-74eb-3ad2-988e-8cc9889919e3"
                    },
                    {
                        "beacon": "weaviate://localhost/c5847814-261b-3390-9d1f-9aa01da54466",
                        "href": "/v1/objects/c5847814-261b-3390-9d1f-9aa01da54466"
                    },
                    {
                        "beacon": "weaviate://localhost/bdd8b1af-6271-3c6c-8827-c474a128206f",
                        "href": "/v1/objects/bdd8b1af-6271-3c6c-8827-c474a128206f"
                    },
                    {
                        "beacon": "weaviate://localhost/a05c2325-b7a5-3b08-8294-7f71354046c5",
                        "href": "/v1/objects/a05c2325-b7a5-3b08-8294-7f71354046c5"
                    },
                    {
                        "beacon": "weaviate://localhost/942847ff-3ccc-3ee5-905c-6475bdde905f",
                        "href": "/v1/objects/942847ff-3ccc-3ee5-905c-6475bdde905f"
                    },
                    {
                        "beacon": "weaviate://localhost/0ccc4c18-6dbf-3608-b09f-8472a86d6eb6",
                        "href": "/v1/objects/0ccc4c18-6dbf-3608-b09f-8472a86d6eb6"
                    },
                    {
                        "beacon": "weaviate://localhost/8764cd2b-206a-3012-9395-05cd4c761d3e",
                        "href": "/v1/objects/8764cd2b-206a-3012-9395-05cd4c761d3e"
                    },
                    {
                        "beacon": "weaviate://localhost/a61f0ade-2c36-3f3c-96ba-51fdffcd654a",
                        "href": "/v1/objects/a61f0ade-2c36-3f3c-96ba-51fdffcd654a"
                    },
                    {
                        "beacon": "weaviate://localhost/12f2cf62-825d-3e5d-8953-337cdaca6eeb",
                        "href": "/v1/objects/12f2cf62-825d-3e5d-8953-337cdaca6eeb"
                    },
                    {
                        "beacon": "weaviate://localhost/05393551-53bb-390d-aad3-a5dbd6e6c34d",
                        "href": "/v1/objects/05393551-53bb-390d-aad3-a5dbd6e6c34d"
                    },
                    {
                        "beacon": "weaviate://localhost/8264e635-564e-33f9-8944-11b6a70d06fc",
                        "href": "/v1/objects/8264e635-564e-33f9-8944-11b6a70d06fc"
                    },
                    {
                        "beacon": "weaviate://localhost/3436a8ab-598c-3c6a-8898-ea1798285385",
                        "href": "/v1/objects/3436a8ab-598c-3c6a-8898-ea1798285385"
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
                        "beacon": "weaviate://localhost/574a0f11-aeba-3f17-b5ab-54a386829e22",
                        "href": "/v1/objects/574a0f11-aeba-3f17-b5ab-54a386829e22"
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
                        "beacon": "weaviate://localhost/e8340b45-7f88-3e4b-8fff-effb8e6ede86",
                        "href": "/v1/objects/e8340b45-7f88-3e4b-8fff-effb8e6ede86"
                    },
                    {
                        "beacon": "weaviate://localhost/265d8181-e242-3e1e-b9a6-f70b822e008e",
                        "href": "/v1/objects/265d8181-e242-3e1e-b9a6-f70b822e008e"
                    },
                    {
                        "beacon": "weaviate://localhost/fccc49e5-ff6b-3658-aeba-ba62e8950bbf",
                        "href": "/v1/objects/fccc49e5-ff6b-3658-aeba-ba62e8950bbf"
                    },
                    {
                        "beacon": "weaviate://localhost/52964abe-1258-329a-9345-8547e2c39ba9",
                        "href": "/v1/objects/52964abe-1258-329a-9345-8547e2c39ba9"
                    },
                    {
                        "beacon": "weaviate://localhost/7d618c25-9059-3d09-aac1-80442a50fac0",
                        "href": "/v1/objects/7d618c25-9059-3d09-aac1-80442a50fac0"
                    },
                    {
                        "beacon": "weaviate://localhost/7a510fb8-c0f6-3757-bf52-0bb0aa087ade",
                        "href": "/v1/objects/7a510fb8-c0f6-3757-bf52-0bb0aa087ade"
                    },
                    {
                        "beacon": "weaviate://localhost/2420859d-38a8-38ad-b735-022de3eb35e8",
                        "href": "/v1/objects/2420859d-38a8-38ad-b735-022de3eb35e8"
                    },
                    {
                        "beacon": "weaviate://localhost/800b5c4f-68ef-3f4e-914a-5baf00bd1b54",
                        "href": "/v1/objects/800b5c4f-68ef-3f4e-914a-5baf00bd1b54"
                    },
                    {
                        "beacon": "weaviate://localhost/daf7976b-c587-3de2-893f-c3fcfd5bc84f",
                        "href": "/v1/objects/daf7976b-c587-3de2-893f-c3fcfd5bc84f"
                    },
                    {
                        "beacon": "weaviate://localhost/999d84e4-b93b-3790-b775-85764563dffa",
                        "href": "/v1/objects/999d84e4-b93b-3790-b775-85764563dffa"
                    },
                    {
                        "beacon": "weaviate://localhost/478ab000-46fe-35f1-b436-3673016f72fa",
                        "href": "/v1/objects/478ab000-46fe-35f1-b436-3673016f72fa"
                    },
                    {
                        "beacon": "weaviate://localhost/56e73e1a-0ac2-32bc-98a4-b5b62aa76ff5",
                        "href": "/v1/objects/56e73e1a-0ac2-32bc-98a4-b5b62aa76ff5"
                    },
                    {
                        "beacon": "weaviate://localhost/545402ca-5def-38a2-aac5-ea9b88af6d3a",
                        "href": "/v1/objects/545402ca-5def-38a2-aac5-ea9b88af6d3a"
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
                        "beacon": "weaviate://localhost/a1602336-4dba-3d96-bd09-e5d04cabd54c",
                        "href": "/v1/objects/a1602336-4dba-3d96-bd09-e5d04cabd54c"
                    },
                    {
                        "beacon": "weaviate://localhost/7d95bfd6-9391-3d75-a399-9c9e4555483d",
                        "href": "/v1/objects/7d95bfd6-9391-3d75-a399-9c9e4555483d"
                    },
                    {
                        "beacon": "weaviate://localhost/e502568e-bec5-303c-832b-1c7838c63673",
                        "href": "/v1/objects/e502568e-bec5-303c-832b-1c7838c63673"
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
                        "beacon": "weaviate://localhost/26124c1f-8100-3f57-999a-9d3af37f524a",
                        "href": "/v1/objects/26124c1f-8100-3f57-999a-9d3af37f524a"
                    },
                    {
                        "beacon": "weaviate://localhost/16916eff-b8ea-3919-a925-3fb93c0ff1d6",
                        "href": "/v1/objects/16916eff-b8ea-3919-a925-3fb93c0ff1d6"
                    },
                    {
                        "beacon": "weaviate://localhost/174aaa71-63a4-3c1c-9219-5ae012427bc6",
                        "href": "/v1/objects/174aaa71-63a4-3c1c-9219-5ae012427bc6"
                    },
                    {
                        "beacon": "weaviate://localhost/1ee5784c-0c51-38f2-96d2-afce06a19d30",
                        "href": "/v1/objects/1ee5784c-0c51-38f2-96d2-afce06a19d30"
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
                        "beacon": "weaviate://localhost/5a5a2799-4d04-3b5b-b343-d2b044df3aa7",
                        "href": "/v1/objects/5a5a2799-4d04-3b5b-b343-d2b044df3aa7"
                    },
                    {
                        "beacon": "weaviate://localhost/5083637a-5a94-3e34-9ef7-77c54a8ed7e0",
                        "href": "/v1/objects/5083637a-5a94-3e34-9ef7-77c54a8ed7e0"
                    },
                    {
                        "beacon": "weaviate://localhost/2b09bbc2-ae35-3a12-92ba-c9eddf2b457a",
                        "href": "/v1/objects/2b09bbc2-ae35-3a12-92ba-c9eddf2b457a"
                    },
                    {
                        "beacon": "weaviate://localhost/05145393-6833-3666-b767-b02e96a9fe6a",
                        "href": "/v1/objects/05145393-6833-3666-b767-b02e96a9fe6a"
                    },
                    {
                        "beacon": "weaviate://localhost/666a620c-fd51-3d9e-b721-17b759e6d779",
                        "href": "/v1/objects/666a620c-fd51-3d9e-b721-17b759e6d779"
                    },
                    {
                        "beacon": "weaviate://localhost/1d400437-5ba9-3a85-8967-c734ee17f12e",
                        "href": "/v1/objects/1d400437-5ba9-3a85-8967-c734ee17f12e"
                    },
                    {
                        "beacon": "weaviate://localhost/30eec93d-64c5-3599-bc11-582e5322be77",
                        "href": "/v1/objects/30eec93d-64c5-3599-bc11-582e5322be77"
                    },
                    {
                        "beacon": "weaviate://localhost/c657c792-aedd-3a6a-bd09-c71c070a8349",
                        "href": "/v1/objects/c657c792-aedd-3a6a-bd09-c71c070a8349"
                    },
                    {
                        "beacon": "weaviate://localhost/097ef0cf-4f74-3844-9738-1c102325e3b0",
                        "href": "/v1/objects/097ef0cf-4f74-3844-9738-1c102325e3b0"
                    },
                    {
                        "beacon": "weaviate://localhost/54830092-2b50-3bfb-875e-87a2b2ac9ddc",
                        "href": "/v1/objects/54830092-2b50-3bfb-875e-87a2b2ac9ddc"
                    },
                    {
                        "beacon": "weaviate://localhost/c62a25cf-19f4-32c3-9fc6-8a742e62a708",
                        "href": "/v1/objects/c62a25cf-19f4-32c3-9fc6-8a742e62a708"
                    },
                    {
                        "beacon": "weaviate://localhost/2e47d75c-9acf-378d-b3e8-cba2711d7173",
                        "href": "/v1/objects/2e47d75c-9acf-378d-b3e8-cba2711d7173"
                    },
                    {
                        "beacon": "weaviate://localhost/17851d7d-7260-375e-93fd-8189558181e9",
                        "href": "/v1/objects/17851d7d-7260-375e-93fd-8189558181e9"
                    },
                    {
                        "beacon": "weaviate://localhost/2cb0d74c-3d4b-3cca-8bd2-be46c9bdf630",
                        "href": "/v1/objects/2cb0d74c-3d4b-3cca-8bd2-be46c9bdf630"
                    },
                    {
                        "beacon": "weaviate://localhost/48158ec9-5f19-3db8-9992-4ee6ee59b7a4",
                        "href": "/v1/objects/48158ec9-5f19-3db8-9992-4ee6ee59b7a4"
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
                        "beacon": "weaviate://localhost/ff3dc6e0-4279-373e-8847-be34160037f8",
                        "href": "/v1/objects/ff3dc6e0-4279-373e-8847-be34160037f8"
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
                        "beacon": "weaviate://localhost/50218f18-2ff5-3fe1-90f2-a3e94f88b169",
                        "href": "/v1/objects/50218f18-2ff5-3fe1-90f2-a3e94f88b169"
                    },
                    {
                        "beacon": "weaviate://localhost/d0944144-1433-3fac-ae85-d3fe185e2b9e",
                        "href": "/v1/objects/d0944144-1433-3fac-ae85-d3fe185e2b9e"
                    },
                    {
                        "beacon": "weaviate://localhost/8e7350df-869c-3fc5-9bda-c2cbf7bb6c5e",
                        "href": "/v1/objects/8e7350df-869c-3fc5-9bda-c2cbf7bb6c5e"
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
                        "beacon": "weaviate://localhost/fbf93483-14c1-3b3e-87de-ea21c61a998b",
                        "href": "/v1/objects/fbf93483-14c1-3b3e-87de-ea21c61a998b"
                    },
                    {
                        "beacon": "weaviate://localhost/c68161e6-cf1c-3ccc-8ff3-35ed41423c6d",
                        "href": "/v1/objects/c68161e6-cf1c-3ccc-8ff3-35ed41423c6d"
                    },
                    {
                        "beacon": "weaviate://localhost/d955d7a4-2f02-38dc-ac8a-fd746d153073",
                        "href": "/v1/objects/d955d7a4-2f02-38dc-ac8a-fd746d153073"
                    },
                    {
                        "beacon": "weaviate://localhost/47767d4a-7c30-3136-96b1-ffe38017858f",
                        "href": "/v1/objects/47767d4a-7c30-3136-96b1-ffe38017858f"
                    },
                    {
                        "beacon": "weaviate://localhost/b70f47e4-5e5e-3045-ae99-c63541f7c067",
                        "href": "/v1/objects/b70f47e4-5e5e-3045-ae99-c63541f7c067"
                    },
                    {
                        "beacon": "weaviate://localhost/4e63d850-e93f-3faa-ba2e-5402d92ec732",
                        "href": "/v1/objects/4e63d850-e93f-3faa-ba2e-5402d92ec732"
                    },
                    {
                        "beacon": "weaviate://localhost/e145eaf9-9c77-3b0f-8550-91df9c22e053",
                        "href": "/v1/objects/e145eaf9-9c77-3b0f-8550-91df9c22e053"
                    },
                    {
                        "beacon": "weaviate://localhost/3525c7eb-a64a-36a0-9096-6253a9e7c91e",
                        "href": "/v1/objects/3525c7eb-a64a-36a0-9096-6253a9e7c91e"
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
                        "beacon": "weaviate://localhost/59caad32-c141-3c05-910f-78e7852bbe7a",
                        "href": "/v1/objects/59caad32-c141-3c05-910f-78e7852bbe7a"
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
                        "beacon": "weaviate://localhost/ad913add-39d2-3e16-b720-6881544423f4",
                        "href": "/v1/objects/ad913add-39d2-3e16-b720-6881544423f4"
                    },
                    {
                        "beacon": "weaviate://localhost/17ba492f-aba0-39a9-a669-086588e4a11d",
                        "href": "/v1/objects/17ba492f-aba0-39a9-a669-086588e4a11d"
                    },
                    {
                        "beacon": "weaviate://localhost/649f85d5-ea52-3ccb-9396-02eecdd2a158",
                        "href": "/v1/objects/649f85d5-ea52-3ccb-9396-02eecdd2a158"
                    },
                    {
                        "beacon": "weaviate://localhost/5269d04e-a07a-3591-aeaa-e68282bcf17b",
                        "href": "/v1/objects/5269d04e-a07a-3591-aeaa-e68282bcf17b"
                    },
                    {
                        "beacon": "weaviate://localhost/812edca9-b16f-355a-b9c1-e0d228949508",
                        "href": "/v1/objects/812edca9-b16f-355a-b9c1-e0d228949508"
                    },
                    {
                        "beacon": "weaviate://localhost/40edac67-23f7-31b8-a682-d15db244dbf1",
                        "href": "/v1/objects/40edac67-23f7-31b8-a682-d15db244dbf1"
                    },
                    {
                        "beacon": "weaviate://localhost/db8255f7-6579-32c1-9414-1b39f1276348",
                        "href": "/v1/objects/db8255f7-6579-32c1-9414-1b39f1276348"
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
                        "beacon": "weaviate://localhost/52895ed4-c407-38d0-99ce-b571f1ae11ba",
                        "href": "/v1/objects/52895ed4-c407-38d0-99ce-b571f1ae11ba"
                    },
                    {
                        "beacon": "weaviate://localhost/01b8e011-9900-3afd-9850-c60539adaa3f",
                        "href": "/v1/objects/01b8e011-9900-3afd-9850-c60539adaa3f"
                    },
                    {
                        "beacon": "weaviate://localhost/5ca63a77-ca03-3ab3-a8c1-1167e0747927",
                        "href": "/v1/objects/5ca63a77-ca03-3ab3-a8c1-1167e0747927"
                    },
                    {
                        "beacon": "weaviate://localhost/bf1888aa-90ba-3353-befa-007a87db761d",
                        "href": "/v1/objects/bf1888aa-90ba-3353-befa-007a87db761d"
                    },
                    {
                        "beacon": "weaviate://localhost/57309cdc-8d83-3ee4-b8b3-b8b7585688fa",
                        "href": "/v1/objects/57309cdc-8d83-3ee4-b8b3-b8b7585688fa"
                    },
                    {
                        "beacon": "weaviate://localhost/a382c821-1a01-3c81-9018-e6a6e8fc9b72",
                        "href": "/v1/objects/a382c821-1a01-3c81-9018-e6a6e8fc9b72"
                    },
                    {
                        "beacon": "weaviate://localhost/400fd171-3246-3d6e-8dbf-05b153344cac",
                        "href": "/v1/objects/400fd171-3246-3d6e-8dbf-05b153344cac"
                    },
                    {
                        "beacon": "weaviate://localhost/74c6dba2-4744-30b0-80b2-67d92052cbee",
                        "href": "/v1/objects/74c6dba2-4744-30b0-80b2-67d92052cbee"
                    },
                    {
                        "beacon": "weaviate://localhost/c622d42e-d69b-3ebc-bab1-0e2ab71e97b2",
                        "href": "/v1/objects/c622d42e-d69b-3ebc-bab1-0e2ab71e97b2"
                    },
                    {
                        "beacon": "weaviate://localhost/2568d8a8-f60f-34aa-8f96-b0f458536546",
                        "href": "/v1/objects/2568d8a8-f60f-34aa-8f96-b0f458536546"
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
                        "beacon": "weaviate://localhost/3abd4f3f-97df-357a-8374-060dccdf6498",
                        "href": "/v1/objects/3abd4f3f-97df-357a-8374-060dccdf6498"
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
                        "beacon": "weaviate://localhost/54662e15-2752-3776-ac7b-0c1adc549be7",
                        "href": "/v1/objects/54662e15-2752-3776-ac7b-0c1adc549be7"
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
                        "beacon": "weaviate://localhost/3c7e0fca-aa0a-3874-8b20-54bd265db968",
                        "href": "/v1/objects/3c7e0fca-aa0a-3874-8b20-54bd265db968"
                    },
                    {
                        "beacon": "weaviate://localhost/29009888-2fcb-3c5d-abfa-06fca721b172",
                        "href": "/v1/objects/29009888-2fcb-3c5d-abfa-06fca721b172"
                    },
                    {
                        "beacon": "weaviate://localhost/74381530-f3db-31b8-a5a5-84e9b092fab4",
                        "href": "/v1/objects/74381530-f3db-31b8-a5a5-84e9b092fab4"
                    },
                    {
                        "beacon": "weaviate://localhost/4cf59b88-f183-3556-9ca5-2cd0a4e33dd9",
                        "href": "/v1/objects/4cf59b88-f183-3556-9ca5-2cd0a4e33dd9"
                    },
                    {
                        "beacon": "weaviate://localhost/956c00ff-29c2-30f1-b521-c72ea407dfe1",
                        "href": "/v1/objects/956c00ff-29c2-30f1-b521-c72ea407dfe1"
                    },
                    {
                        "beacon": "weaviate://localhost/38642733-4493-3996-b7dd-0c3cf1a2cbca",
                        "href": "/v1/objects/38642733-4493-3996-b7dd-0c3cf1a2cbca"
                    },
                    {
                        "beacon": "weaviate://localhost/4078f643-7f21-33b8-a9ec-2c24c77e42c1",
                        "href": "/v1/objects/4078f643-7f21-33b8-a9ec-2c24c77e42c1"
                    },
                    {
                        "beacon": "weaviate://localhost/fb5012d9-20ad-338e-9d51-a1c662775db6",
                        "href": "/v1/objects/fb5012d9-20ad-338e-9d51-a1c662775db6"
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
                        "beacon": "weaviate://localhost/47c2fa57-c02e-3002-814e-8f6b63ffc86c",
                        "href": "/v1/objects/47c2fa57-c02e-3002-814e-8f6b63ffc86c"
                    },
                    {
                        "beacon": "weaviate://localhost/ae8a9ebb-9826-3991-b5b9-9077f70c6c46",
                        "href": "/v1/objects/ae8a9ebb-9826-3991-b5b9-9077f70c6c46"
                    },
                    {
                        "beacon": "weaviate://localhost/b79032e9-3a85-38c9-aacb-48ad21bcfa97",
                        "href": "/v1/objects/b79032e9-3a85-38c9-aacb-48ad21bcfa97"
                    },
                    {
                        "beacon": "weaviate://localhost/6ba0dff2-e3a1-394e-aaf7-f57a07d76c98",
                        "href": "/v1/objects/6ba0dff2-e3a1-394e-aaf7-f57a07d76c98"
                    },
                    {
                        "beacon": "weaviate://localhost/e16f205e-ae79-3abd-a79b-efa45ec5820e",
                        "href": "/v1/objects/e16f205e-ae79-3abd-a79b-efa45ec5820e"
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
                        "beacon": "weaviate://localhost/14f9f52c-054d-356c-8880-dcde926c452a",
                        "href": "/v1/objects/14f9f52c-054d-356c-8880-dcde926c452a"
                    },
                    {
                        "beacon": "weaviate://localhost/30089044-fe09-37b6-b802-db577cf19f99",
                        "href": "/v1/objects/30089044-fe09-37b6-b802-db577cf19f99"
                    },
                    {
                        "beacon": "weaviate://localhost/e115faa5-e8b7-36b6-b668-5841d16119f0",
                        "href": "/v1/objects/e115faa5-e8b7-36b6-b668-5841d16119f0"
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
                        "beacon": "weaviate://localhost/a0cc312d-f0c4-3a4c-9e43-4cbea51d6328",
                        "href": "/v1/objects/a0cc312d-f0c4-3a4c-9e43-4cbea51d6328"
                    },
                    {
                        "beacon": "weaviate://localhost/73c2778b-33da-3c08-8d86-1b9ebf42bae7",
                        "href": "/v1/objects/73c2778b-33da-3c08-8d86-1b9ebf42bae7"
                    },
                    {
                        "beacon": "weaviate://localhost/74d0f282-529d-35bc-a763-bde9d912d3fe",
                        "href": "/v1/objects/74d0f282-529d-35bc-a763-bde9d912d3fe"
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
                        "beacon": "weaviate://localhost/2b43c18d-d258-3b68-8cc9-5555d5bdfbcb",
                        "href": "/v1/objects/2b43c18d-d258-3b68-8cc9-5555d5bdfbcb"
                    },
                    {
                        "beacon": "weaviate://localhost/1a94a357-0f6c-3e46-8b4d-f6321636ad81",
                        "href": "/v1/objects/1a94a357-0f6c-3e46-8b4d-f6321636ad81"
                    },
                    {
                        "beacon": "weaviate://localhost/251647f1-791d-3fa2-805d-cb4e1beb3cc9",
                        "href": "/v1/objects/251647f1-791d-3fa2-805d-cb4e1beb3cc9"
                    },
                    {
                        "beacon": "weaviate://localhost/6459b36f-c9a0-30d6-b609-c1e3b6355b12",
                        "href": "/v1/objects/6459b36f-c9a0-30d6-b609-c1e3b6355b12"
                    },
                    {
                        "beacon": "weaviate://localhost/de07fa60-3753-33fc-af59-2deba9a6d5e2",
                        "href": "/v1/objects/de07fa60-3753-33fc-af59-2deba9a6d5e2"
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
                        "beacon": "weaviate://localhost/4baadf8e-ffaa-3552-9a64-6fd533ced740",
                        "href": "/v1/objects/4baadf8e-ffaa-3552-9a64-6fd533ced740"
                    },
                    {
                        "beacon": "weaviate://localhost/3900ec2a-2edf-3256-96c0-237c9a909220",
                        "href": "/v1/objects/3900ec2a-2edf-3256-96c0-237c9a909220"
                    },
                    {
                        "beacon": "weaviate://localhost/a73698a2-9567-3f36-8046-ced5addf539f",
                        "href": "/v1/objects/a73698a2-9567-3f36-8046-ced5addf539f"
                    },
                    {
                        "beacon": "weaviate://localhost/5f433a66-3ca5-3e32-bb08-06b0705f5dad",
                        "href": "/v1/objects/5f433a66-3ca5-3e32-bb08-06b0705f5dad"
                    },
                    {
                        "beacon": "weaviate://localhost/84da2791-d10e-3413-9a46-f36ede02d73f",
                        "href": "/v1/objects/84da2791-d10e-3413-9a46-f36ede02d73f"
                    },
                    {
                        "beacon": "weaviate://localhost/056359a8-1f1f-344c-a973-219a9065c912",
                        "href": "/v1/objects/056359a8-1f1f-344c-a973-219a9065c912"
                    },
                    {
                        "beacon": "weaviate://localhost/82148f90-a21f-3e3d-9445-2abe8adf25a3",
                        "href": "/v1/objects/82148f90-a21f-3e3d-9445-2abe8adf25a3"
                    },
                    {
                        "beacon": "weaviate://localhost/7ae83c8a-a9f7-3975-b972-5b0ef7e68c3e",
                        "href": "/v1/objects/7ae83c8a-a9f7-3975-b972-5b0ef7e68c3e"
                    },
                    {
                        "beacon": "weaviate://localhost/2aa89396-6e55-3003-9c61-2dad1c22a820",
                        "href": "/v1/objects/2aa89396-6e55-3003-9c61-2dad1c22a820"
                    },
                    {
                        "beacon": "weaviate://localhost/291d0279-b397-3ae4-853e-6b9d4ad5963d",
                        "href": "/v1/objects/291d0279-b397-3ae4-853e-6b9d4ad5963d"
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
                        "beacon": "weaviate://localhost/de3864e5-2514-3a5a-adf1-da43cd9e4dee",
                        "href": "/v1/objects/de3864e5-2514-3a5a-adf1-da43cd9e4dee"
                    },
                    {
                        "beacon": "weaviate://localhost/7791d16c-6336-3d6d-bf02-3e8ad5c45d7b",
                        "href": "/v1/objects/7791d16c-6336-3d6d-bf02-3e8ad5c45d7b"
                    },
                    {
                        "beacon": "weaviate://localhost/b1869f01-e271-3aa4-a9cd-8fe241e6cd57",
                        "href": "/v1/objects/b1869f01-e271-3aa4-a9cd-8fe241e6cd57"
                    },
                    {
                        "beacon": "weaviate://localhost/d0d49910-e78c-333e-a23d-ad6000f0d4dd",
                        "href": "/v1/objects/d0d49910-e78c-333e-a23d-ad6000f0d4dd"
                    },
                    {
                        "beacon": "weaviate://localhost/643b28fc-84f5-33e1-a30b-f7e519ff57fb",
                        "href": "/v1/objects/643b28fc-84f5-33e1-a30b-f7e519ff57fb"
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
                        "beacon": "weaviate://localhost/d3e23f4d-2f51-3cfd-a6bf-ec738229a977",
                        "href": "/v1/objects/d3e23f4d-2f51-3cfd-a6bf-ec738229a977"
                    },
                    {
                        "beacon": "weaviate://localhost/e09fb19e-08d1-3b3c-a13a-2351d610336a",
                        "href": "/v1/objects/e09fb19e-08d1-3b3c-a13a-2351d610336a"
                    },
                    {
                        "beacon": "weaviate://localhost/aa5002b9-4977-3128-be3f-b4c2d3a36ed5",
                        "href": "/v1/objects/aa5002b9-4977-3128-be3f-b4c2d3a36ed5"
                    },
                    {
                        "beacon": "weaviate://localhost/d9eddcae-13ad-30c6-b54d-4c1617272847",
                        "href": "/v1/objects/d9eddcae-13ad-30c6-b54d-4c1617272847"
                    },
                    {
                        "beacon": "weaviate://localhost/03928b0e-3791-3e96-8127-45be517daf18",
                        "href": "/v1/objects/03928b0e-3791-3e96-8127-45be517daf18"
                    },
                    {
                        "beacon": "weaviate://localhost/c19c6980-4107-368b-a1bd-506530ecba1d",
                        "href": "/v1/objects/c19c6980-4107-368b-a1bd-506530ecba1d"
                    },
                    {
                        "beacon": "weaviate://localhost/a1f03cd6-d4a2-3492-8b44-406532394852",
                        "href": "/v1/objects/a1f03cd6-d4a2-3492-8b44-406532394852"
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
            "class": "Publication",
            "creationTimeUnix": 1618580853819,
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
                        "beacon": "weaviate://localhost/faa08320-7efb-30d1-830f-a466355517f8",
                        "href": "/v1/objects/faa08320-7efb-30d1-830f-a466355517f8"
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
                        "beacon": "weaviate://localhost/dc71468c-3b80-3d6d-9962-008f242d3370",
                        "href": "/v1/objects/dc71468c-3b80-3d6d-9962-008f242d3370"
                    },
                    {
                        "beacon": "weaviate://localhost/5132fff9-4223-3a9e-b0a1-76acd33978b2",
                        "href": "/v1/objects/5132fff9-4223-3a9e-b0a1-76acd33978b2"
                    },
                    {
                        "beacon": "weaviate://localhost/afee005c-a472-35b7-a1d5-4736cfb3ca2f",
                        "href": "/v1/objects/afee005c-a472-35b7-a1d5-4736cfb3ca2f"
                    },
                    {
                        "beacon": "weaviate://localhost/2c32f9ff-300b-3852-9f35-edb7fde899e6",
                        "href": "/v1/objects/2c32f9ff-300b-3852-9f35-edb7fde899e6"
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
                        "beacon": "weaviate://localhost/ad7c2344-279d-3af6-ae76-664f1af17fbc",
                        "href": "/v1/objects/ad7c2344-279d-3af6-ae76-664f1af17fbc"
                    },
                    {
                        "beacon": "weaviate://localhost/1c725941-4de3-3dee-8e36-a2cea711771a",
                        "href": "/v1/objects/1c725941-4de3-3dee-8e36-a2cea711771a"
                    },
                    {
                        "beacon": "weaviate://localhost/dba7256d-7c3c-3c18-9dd6-6ad96cf9ffca",
                        "href": "/v1/objects/dba7256d-7c3c-3c18-9dd6-6ad96cf9ffca"
                    },
                    {
                        "beacon": "weaviate://localhost/734c1471-d0f2-3bbc-84b1-618b56b02aea",
                        "href": "/v1/objects/734c1471-d0f2-3bbc-84b1-618b56b02aea"
                    },
                    {
                        "beacon": "weaviate://localhost/046edbf3-235e-323e-886c-a37b7c1607ec",
                        "href": "/v1/objects/046edbf3-235e-323e-886c-a37b7c1607ec"
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
                        "beacon": "weaviate://localhost/498d1fc3-c424-340b-87dc-dd668bff6f66",
                        "href": "/v1/objects/498d1fc3-c424-340b-87dc-dd668bff6f66"
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
                        "beacon": "weaviate://localhost/b0736a48-3f3c-3871-bd55-c6520d3375d7",
                        "href": "/v1/objects/b0736a48-3f3c-3871-bd55-c6520d3375d7"
                    },
                    {
                        "beacon": "weaviate://localhost/73ad2757-36f4-30e9-9c80-6302d18a99e5",
                        "href": "/v1/objects/73ad2757-36f4-30e9-9c80-6302d18a99e5"
                    },
                    {
                        "beacon": "weaviate://localhost/d23c9271-4362-3c75-a85e-f0203b3dfcab",
                        "href": "/v1/objects/d23c9271-4362-3c75-a85e-f0203b3dfcab"
                    },
                    {
                        "beacon": "weaviate://localhost/165a3051-628b-3d69-8ffe-e1634c4f20cf",
                        "href": "/v1/objects/165a3051-628b-3d69-8ffe-e1634c4f20cf"
                    },
                    {
                        "beacon": "weaviate://localhost/3a884132-6d16-3a54-9765-d7e12c6ebf3f",
                        "href": "/v1/objects/3a884132-6d16-3a54-9765-d7e12c6ebf3f"
                    },
                    {
                        "beacon": "weaviate://localhost/c29bdad3-5f4c-3bff-98cb-6eceb90062f1",
                        "href": "/v1/objects/c29bdad3-5f4c-3bff-98cb-6eceb90062f1"
                    },
                    {
                        "beacon": "weaviate://localhost/6344f2b7-10d1-3f11-adf5-a7e5e121710e",
                        "href": "/v1/objects/6344f2b7-10d1-3f11-adf5-a7e5e121710e"
                    },
                    {
                        "beacon": "weaviate://localhost/eb9f9e8b-28ab-3801-bbab-27d09f7593ff",
                        "href": "/v1/objects/eb9f9e8b-28ab-3801-bbab-27d09f7593ff"
                    },
                    {
                        "beacon": "weaviate://localhost/2792ac59-abe1-3396-bbb9-c0375221624e",
                        "href": "/v1/objects/2792ac59-abe1-3396-bbb9-c0375221624e"
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
                        "beacon": "weaviate://localhost/958c5715-22e5-3803-be42-c99d0a0a7754",
                        "href": "/v1/objects/958c5715-22e5-3803-be42-c99d0a0a7754"
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
                        "beacon": "weaviate://localhost/5b1165b8-7eee-3f32-aa54-19b8cbdcd377",
                        "href": "/v1/objects/5b1165b8-7eee-3f32-aa54-19b8cbdcd377"
                    },
                    {
                        "beacon": "weaviate://localhost/1e4808bb-b16b-34d9-80c0-b3a02d6afd4c",
                        "href": "/v1/objects/1e4808bb-b16b-34d9-80c0-b3a02d6afd4c"
                    },
                    {
                        "beacon": "weaviate://localhost/f5322645-a9cd-3551-88a0-3e0795cc9eba",
                        "href": "/v1/objects/f5322645-a9cd-3551-88a0-3e0795cc9eba"
                    },
                    {
                        "beacon": "weaviate://localhost/16edaeef-dd14-37a4-a7d5-feaa8af33324",
                        "href": "/v1/objects/16edaeef-dd14-37a4-a7d5-feaa8af33324"
                    },
                    {
                        "beacon": "weaviate://localhost/8eaecf08-dbda-3c02-beff-c9aee6e99229",
                        "href": "/v1/objects/8eaecf08-dbda-3c02-beff-c9aee6e99229"
                    },
                    {
                        "beacon": "weaviate://localhost/c5f1aa70-ffa5-35b5-8c26-0d83c8a97e80",
                        "href": "/v1/objects/c5f1aa70-ffa5-35b5-8c26-0d83c8a97e80"
                    },
                    {
                        "beacon": "weaviate://localhost/db0206a4-a7bd-3b12-92f1-bbbe9845d423",
                        "href": "/v1/objects/db0206a4-a7bd-3b12-92f1-bbbe9845d423"
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
                        "beacon": "weaviate://localhost/f5627c88-95a4-3b30-85e5-2e6ff1ea1497",
                        "href": "/v1/objects/f5627c88-95a4-3b30-85e5-2e6ff1ea1497"
                    },
                    {
                        "beacon": "weaviate://localhost/6b9b0291-fa2d-38df-a872-5a3a3d98bd6d",
                        "href": "/v1/objects/6b9b0291-fa2d-38df-a872-5a3a3d98bd6d"
                    },
                    {
                        "beacon": "weaviate://localhost/d9a1ec34-c7f9-3986-a233-c2a6e257cfc9",
                        "href": "/v1/objects/d9a1ec34-c7f9-3986-a233-c2a6e257cfc9"
                    },
                    {
                        "beacon": "weaviate://localhost/7fce09f4-6493-3ca5-a150-bb305dca39fa",
                        "href": "/v1/objects/7fce09f4-6493-3ca5-a150-bb305dca39fa"
                    },
                    {
                        "beacon": "weaviate://localhost/682acac4-ee5f-3049-a52b-e2d24c58a1d6",
                        "href": "/v1/objects/682acac4-ee5f-3049-a52b-e2d24c58a1d6"
                    },
                    {
                        "beacon": "weaviate://localhost/c89c14f4-ed73-33f4-bdd7-e817e67195d3",
                        "href": "/v1/objects/c89c14f4-ed73-33f4-bdd7-e817e67195d3"
                    },
                    {
                        "beacon": "weaviate://localhost/51138e49-9077-3d9a-9470-f3905deafef2",
                        "href": "/v1/objects/51138e49-9077-3d9a-9470-f3905deafef2"
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
                        "beacon": "weaviate://localhost/5975b3fe-6d89-3dbf-889b-e523a54708ef",
                        "href": "/v1/objects/5975b3fe-6d89-3dbf-889b-e523a54708ef"
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
                        "beacon": "weaviate://localhost/cf2eb080-2d95-38b3-b74c-a534ad2ea15f",
                        "href": "/v1/objects/cf2eb080-2d95-38b3-b74c-a534ad2ea15f"
                    },
                    {
                        "beacon": "weaviate://localhost/454fc80c-fdc7-3d01-acdc-d797dfab0ad6",
                        "href": "/v1/objects/454fc80c-fdc7-3d01-acdc-d797dfab0ad6"
                    },
                    {
                        "beacon": "weaviate://localhost/93e0ac4f-3367-3956-99fd-acb53c5e28b2",
                        "href": "/v1/objects/93e0ac4f-3367-3956-99fd-acb53c5e28b2"
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
                        "beacon": "weaviate://localhost/eb34002e-7e20-3424-b7ce-35867b9915b4",
                        "href": "/v1/objects/eb34002e-7e20-3424-b7ce-35867b9915b4"
                    },
                    {
                        "beacon": "weaviate://localhost/4d35db46-8c48-3d09-bd68-22ea98320f20",
                        "href": "/v1/objects/4d35db46-8c48-3d09-bd68-22ea98320f20"
                    },
                    {
                        "beacon": "weaviate://localhost/15350c5d-4560-37a2-ba3a-667b189dbe9b",
                        "href": "/v1/objects/15350c5d-4560-37a2-ba3a-667b189dbe9b"
                    },
                    {
                        "beacon": "weaviate://localhost/c491eee3-0a50-3141-83f4-355a19cd457c",
                        "href": "/v1/objects/c491eee3-0a50-3141-83f4-355a19cd457c"
                    },
                    {
                        "beacon": "weaviate://localhost/c6791b0d-3aa6-356c-80aa-b698a386d4d5",
                        "href": "/v1/objects/c6791b0d-3aa6-356c-80aa-b698a386d4d5"
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
                        "beacon": "weaviate://localhost/f0e2178b-65ee-3c41-982c-095576855398",
                        "href": "/v1/objects/f0e2178b-65ee-3c41-982c-095576855398"
                    },
                    {
                        "beacon": "weaviate://localhost/7cfa15d1-49d7-3834-9a8a-40840066fdf4",
                        "href": "/v1/objects/7cfa15d1-49d7-3834-9a8a-40840066fdf4"
                    },
                    {
                        "beacon": "weaviate://localhost/657e0dee-4a8d-3b3a-bb19-80fb91524e38",
                        "href": "/v1/objects/657e0dee-4a8d-3b3a-bb19-80fb91524e38"
                    },
                    {
                        "beacon": "weaviate://localhost/afbd5b1b-5da5-39e6-a890-29fe3c1d14b4",
                        "href": "/v1/objects/afbd5b1b-5da5-39e6-a890-29fe3c1d14b4"
                    },
                    {
                        "beacon": "weaviate://localhost/7bb98f24-45fb-33aa-81e9-8ead583ae7e2",
                        "href": "/v1/objects/7bb98f24-45fb-33aa-81e9-8ead583ae7e2"
                    },
                    {
                        "beacon": "weaviate://localhost/1aea7755-427b-3ad4-af0f-5b3ed20f470b",
                        "href": "/v1/objects/1aea7755-427b-3ad4-af0f-5b3ed20f470b"
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
                        "beacon": "weaviate://localhost/e4249f65-03e8-3530-a1bd-2d35f80820de",
                        "href": "/v1/objects/e4249f65-03e8-3530-a1bd-2d35f80820de"
                    },
                    {
                        "beacon": "weaviate://localhost/8ca039b5-807b-3799-9fd4-a6249ff22c43",
                        "href": "/v1/objects/8ca039b5-807b-3799-9fd4-a6249ff22c43"
                    },
                    {
                        "beacon": "weaviate://localhost/3822cdce-ec3c-3a45-913c-e8b054dee552",
                        "href": "/v1/objects/3822cdce-ec3c-3a45-913c-e8b054dee552"
                    },
                    {
                        "beacon": "weaviate://localhost/bcf002ed-ae5d-36b3-a80c-c50e8c1c93ae",
                        "href": "/v1/objects/bcf002ed-ae5d-36b3-a80c-c50e8c1c93ae"
                    },
                    {
                        "beacon": "weaviate://localhost/49c5ceb6-42e3-3781-a77d-faa3f6bb1b7c",
                        "href": "/v1/objects/49c5ceb6-42e3-3781-a77d-faa3f6bb1b7c"
                    },
                    {
                        "beacon": "weaviate://localhost/25219d53-29c7-3709-b1fc-88658f3e3b46",
                        "href": "/v1/objects/25219d53-29c7-3709-b1fc-88658f3e3b46"
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
                        "beacon": "weaviate://localhost/b71750d9-408a-3d43-a7ac-ecef2a8873b4",
                        "href": "/v1/objects/b71750d9-408a-3d43-a7ac-ecef2a8873b4"
                    },
                    {
                        "beacon": "weaviate://localhost/3e7fd216-2f06-39dc-ac12-e61f0011b5e3",
                        "href": "/v1/objects/3e7fd216-2f06-39dc-ac12-e61f0011b5e3"
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
                        "beacon": "weaviate://localhost/aae5dbe4-84a3-3de6-9675-c0e21001aa47",
                        "href": "/v1/objects/aae5dbe4-84a3-3de6-9675-c0e21001aa47"
                    },
                    {
                        "beacon": "weaviate://localhost/dca13d0c-02df-3464-9d5c-d5c4e078d9ef",
                        "href": "/v1/objects/dca13d0c-02df-3464-9d5c-d5c4e078d9ef"
                    },
                    {
                        "beacon": "weaviate://localhost/69320503-afdb-31ff-b0ce-77f3e90b08b5",
                        "href": "/v1/objects/69320503-afdb-31ff-b0ce-77f3e90b08b5"
                    },
                    {
                        "beacon": "weaviate://localhost/9f800c95-03de-337d-bfcb-595437423561",
                        "href": "/v1/objects/9f800c95-03de-337d-bfcb-595437423561"
                    },
                    {
                        "beacon": "weaviate://localhost/4f26cf37-65d4-3571-b65b-504c62d591af",
                        "href": "/v1/objects/4f26cf37-65d4-3571-b65b-504c62d591af"
                    },
                    {
                        "beacon": "weaviate://localhost/ef364cbb-4324-3351-bb04-d3ff2810d6b6",
                        "href": "/v1/objects/ef364cbb-4324-3351-bb04-d3ff2810d6b6"
                    },
                    {
                        "beacon": "weaviate://localhost/02ecbff2-fc92-36b0-b0d2-57c3481480b8",
                        "href": "/v1/objects/02ecbff2-fc92-36b0-b0d2-57c3481480b8"
                    },
                    {
                        "beacon": "weaviate://localhost/4bc7cb2f-c71c-3e3a-aa49-2253189ece46",
                        "href": "/v1/objects/4bc7cb2f-c71c-3e3a-aa49-2253189ece46"
                    },
                    {
                        "beacon": "weaviate://localhost/5386717b-6d4c-3bda-ac5f-c6c61ff7d371",
                        "href": "/v1/objects/5386717b-6d4c-3bda-ac5f-c6c61ff7d371"
                    },
                    {
                        "beacon": "weaviate://localhost/0988bcff-aab7-3bca-b668-9dca6f36b498",
                        "href": "/v1/objects/0988bcff-aab7-3bca-b668-9dca6f36b498"
                    },
                    {
                        "beacon": "weaviate://localhost/9b701b49-2ae2-3789-8bd6-e5163abade28",
                        "href": "/v1/objects/9b701b49-2ae2-3789-8bd6-e5163abade28"
                    },
                    {
                        "beacon": "weaviate://localhost/ddcc25b8-762c-3458-9415-f9b456971717",
                        "href": "/v1/objects/ddcc25b8-762c-3458-9415-f9b456971717"
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
                        "beacon": "weaviate://localhost/fc8c91ce-a372-3d2d-9364-7d77ecb0a3c0",
                        "href": "/v1/objects/fc8c91ce-a372-3d2d-9364-7d77ecb0a3c0"
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
            "class": "Publication",
            "creationTimeUnix": 1618580853818,
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
            "class": "Publication",
            "creationTimeUnix": 1618580853819,
            "id": "7abf5426-5048-31ce-9c0a-822c58b19b47",
            "properties": {
                "hasArticles": [
                    {
                        "beacon": "weaviate://localhost/56562b3f-ad48-3fc8-8554-e4fa5fcdacb3",
                        "href": "/v1/objects/56562b3f-ad48-3fc8-8554-e4fa5fcdacb3"
                    },
                    {
                        "beacon": "weaviate://localhost/373d28fb-1898-313a-893b-5bc77ba061f6",
                        "href": "/v1/objects/373d28fb-1898-313a-893b-5bc77ba061f6"
                    },
                    {
                        "beacon": "weaviate://localhost/cae6c853-4832-3f1a-9005-f762ee4c1a8d",
                        "href": "/v1/objects/cae6c853-4832-3f1a-9005-f762ee4c1a8d"
                    },
                    {
                        "beacon": "weaviate://localhost/5edbbe6d-e90d-3c50-a4d2-c2e279ef8777",
                        "href": "/v1/objects/5edbbe6d-e90d-3c50-a4d2-c2e279ef8777"
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
                        "beacon": "weaviate://localhost/f547ace1-9b5d-3ca5-a86a-e61e9f21d9aa",
                        "href": "/v1/objects/f547ace1-9b5d-3ca5-a86a-e61e9f21d9aa"
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
                        "beacon": "weaviate://localhost/dde3ef54-966a-3ada-98c9-861cff30ab8f",
                        "href": "/v1/objects/dde3ef54-966a-3ada-98c9-861cff30ab8f"
                    },
                    {
                        "beacon": "weaviate://localhost/d7d5cd23-7a3d-331a-b92b-cdcb08b19be9",
                        "href": "/v1/objects/d7d5cd23-7a3d-331a-b92b-cdcb08b19be9"
                    },
                    {
                        "beacon": "weaviate://localhost/bc53821d-fcee-3c1a-b239-bee0f792c4f6",
                        "href": "/v1/objects/bc53821d-fcee-3c1a-b239-bee0f792c4f6"
                    },
                    {
                        "beacon": "weaviate://localhost/eda72dcb-4da2-33cf-a7bd-70eeb42c2393",
                        "href": "/v1/objects/eda72dcb-4da2-33cf-a7bd-70eeb42c2393"
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
                        "beacon": "weaviate://localhost/81db1807-985b-3452-b99d-855cd31b3e7c",
                        "href": "/v1/objects/81db1807-985b-3452-b99d-855cd31b3e7c"
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
                        "beacon": "weaviate://localhost/4a4a9699-3898-368a-81c8-813fe1613b1a",
                        "href": "/v1/objects/4a4a9699-3898-368a-81c8-813fe1613b1a"
                    },
                    {
                        "beacon": "weaviate://localhost/d207f0b5-9479-3b48-855a-e4f7e35952cd",
                        "href": "/v1/objects/d207f0b5-9479-3b48-855a-e4f7e35952cd"
                    },
                    {
                        "beacon": "weaviate://localhost/d846d057-50df-33de-8610-da17a81de33a",
                        "href": "/v1/objects/d846d057-50df-33de-8610-da17a81de33a"
                    },
                    {
                        "beacon": "weaviate://localhost/243982f8-6f5a-3d7a-9a0c-44a0f2303c68",
                        "href": "/v1/objects/243982f8-6f5a-3d7a-9a0c-44a0f2303c68"
                    },
                    {
                        "beacon": "weaviate://localhost/046c2f8b-b37e-3082-b0b3-a9f5e2926533",
                        "href": "/v1/objects/046c2f8b-b37e-3082-b0b3-a9f5e2926533"
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
                        "beacon": "weaviate://localhost/bbe3ca2d-292a-3774-bb91-86348ea077c4",
                        "href": "/v1/objects/bbe3ca2d-292a-3774-bb91-86348ea077c4"
                    },
                    {
                        "beacon": "weaviate://localhost/8a2190f1-2a9d-3cf1-a475-dfd649301c8b",
                        "href": "/v1/objects/8a2190f1-2a9d-3cf1-a475-dfd649301c8b"
                    },
                    {
                        "beacon": "weaviate://localhost/3db252a9-11d6-325f-959d-0fda249fddf2",
                        "href": "/v1/objects/3db252a9-11d6-325f-959d-0fda249fddf2"
                    },
                    {
                        "beacon": "weaviate://localhost/c7f0f9ee-caa6-38e3-9834-0cd134bcb8ee",
                        "href": "/v1/objects/c7f0f9ee-caa6-38e3-9834-0cd134bcb8ee"
                    },
                    {
                        "beacon": "weaviate://localhost/b99f04dd-b8d6-398f-b408-9ad7531f7c09",
                        "href": "/v1/objects/b99f04dd-b8d6-398f-b408-9ad7531f7c09"
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
                        "beacon": "weaviate://localhost/fd3d7707-1a3a-3d98-9cdb-ca1f69ce2fd6",
                        "href": "/v1/objects/fd3d7707-1a3a-3d98-9cdb-ca1f69ce2fd6"
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
                        "beacon": "weaviate://localhost/7587340d-f288-3179-99e9-ee51ff7aadb9",
                        "href": "/v1/objects/7587340d-f288-3179-99e9-ee51ff7aadb9"
                    },
                    {
                        "beacon": "weaviate://localhost/e387769c-ed42-36e4-b4d6-cca7f75e3f7a",
                        "href": "/v1/objects/e387769c-ed42-36e4-b4d6-cca7f75e3f7a"
                    },
                    {
                        "beacon": "weaviate://localhost/79812aa5-1556-34c4-8667-c1148ae474fd",
                        "href": "/v1/objects/79812aa5-1556-34c4-8667-c1148ae474fd"
                    },
                    {
                        "beacon": "weaviate://localhost/6ba5bdfb-a107-33e8-9e30-a449750bd6de",
                        "href": "/v1/objects/6ba5bdfb-a107-33e8-9e30-a449750bd6de"
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
                        "beacon": "weaviate://localhost/83b4924a-28ff-30ac-86b7-2b45a65d6a16",
                        "href": "/v1/objects/83b4924a-28ff-30ac-86b7-2b45a65d6a16"
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
                        "beacon": "weaviate://localhost/01346543-5cf6-35a6-939a-424e7a0b758a",
                        "href": "/v1/objects/01346543-5cf6-35a6-939a-424e7a0b758a"
                    },
                    {
                        "beacon": "weaviate://localhost/aa239de0-f408-31c5-8a5e-c74f68178614",
                        "href": "/v1/objects/aa239de0-f408-31c5-8a5e-c74f68178614"
                    },
                    {
                        "beacon": "weaviate://localhost/190c276e-5286-304f-a1fa-d413eca91e9a",
                        "href": "/v1/objects/190c276e-5286-304f-a1fa-d413eca91e9a"
                    },
                    {
                        "beacon": "weaviate://localhost/e9bed738-8c2a-3127-8ac2-9a277e47a5b8",
                        "href": "/v1/objects/e9bed738-8c2a-3127-8ac2-9a277e47a5b8"
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
                        "beacon": "weaviate://localhost/d7504928-86a1-362c-93db-e519cf82baf4",
                        "href": "/v1/objects/d7504928-86a1-362c-93db-e519cf82baf4"
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
                        "beacon": "weaviate://localhost/311d541f-a121-32b7-9d10-b6565c382f0e",
                        "href": "/v1/objects/311d541f-a121-32b7-9d10-b6565c382f0e"
                    },
                    {
                        "beacon": "weaviate://localhost/92649ff0-bed8-3a66-868e-f4023fbbf36d",
                        "href": "/v1/objects/92649ff0-bed8-3a66-868e-f4023fbbf36d"
                    },
                    {
                        "beacon": "weaviate://localhost/bc8a3a4c-2c2a-35d5-98ee-2c1a73ed1b66",
                        "href": "/v1/objects/bc8a3a4c-2c2a-35d5-98ee-2c1a73ed1b66"
                    },
                    {
                        "beacon": "weaviate://localhost/d55806ab-0333-3868-ab21-83758c17f2e6",
                        "href": "/v1/objects/d55806ab-0333-3868-ab21-83758c17f2e6"
                    },
                    {
                        "beacon": "weaviate://localhost/dee86272-2e5a-316f-963f-f01f0d766c87",
                        "href": "/v1/objects/dee86272-2e5a-316f-963f-f01f0d766c87"
                    },
                    {
                        "beacon": "weaviate://localhost/a046c5f2-c165-3c80-a656-fe36540bc842",
                        "href": "/v1/objects/a046c5f2-c165-3c80-a656-fe36540bc842"
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
                        "beacon": "weaviate://localhost/97a469f2-9619-3dff-bf21-72c6fecff654",
                        "href": "/v1/objects/97a469f2-9619-3dff-bf21-72c6fecff654"
                    },
                    {
                        "beacon": "weaviate://localhost/65bcacda-a8b8-3e36-b29a-383033b02164",
                        "href": "/v1/objects/65bcacda-a8b8-3e36-b29a-383033b02164"
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
                        "beacon": "weaviate://localhost/d9d93b84-2e74-3dc9-8df1-4140e7345acd",
                        "href": "/v1/objects/d9d93b84-2e74-3dc9-8df1-4140e7345acd"
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
                        "beacon": "weaviate://localhost/55ce6002-a7e0-33d6-93c6-da1e7c9ccac1",
                        "href": "/v1/objects/55ce6002-a7e0-33d6-93c6-da1e7c9ccac1"
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
                        "beacon": "weaviate://localhost/5cb135e4-d445-36f5-9bd9-dd0d2d9be54a",
                        "href": "/v1/objects/5cb135e4-d445-36f5-9bd9-dd0d2d9be54a"
                    },
                    {
                        "beacon": "weaviate://localhost/874e8767-115c-3318-b9d3-33743f6929da",
                        "href": "/v1/objects/874e8767-115c-3318-b9d3-33743f6929da"
                    },
                    {
                        "beacon": "weaviate://localhost/45a46c2e-9ab1-3032-9cc4-054f6a20851d",
                        "href": "/v1/objects/45a46c2e-9ab1-3032-9cc4-054f6a20851d"
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
                        "beacon": "weaviate://localhost/e541a68d-aa2f-3826-9a34-724247ad1667",
                        "href": "/v1/objects/e541a68d-aa2f-3826-9a34-724247ad1667"
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
                        "beacon": "weaviate://localhost/a62335da-3e3e-3d46-8624-e1faa2772e9c",
                        "href": "/v1/objects/a62335da-3e3e-3d46-8624-e1faa2772e9c"
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
                        "beacon": "weaviate://localhost/d0cf7359-6db5-3c0a-a3f8-ee8342f0d919",
                        "href": "/v1/objects/d0cf7359-6db5-3c0a-a3f8-ee8342f0d919"
                    },
                    {
                        "beacon": "weaviate://localhost/c0c99982-a0b0-3f19-bb85-bf51b84b9ba4",
                        "href": "/v1/objects/c0c99982-a0b0-3f19-bb85-bf51b84b9ba4"
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
                        "beacon": "weaviate://localhost/2fd61b03-c450-3b84-82a6-0c0cdb285ebf",
                        "href": "/v1/objects/2fd61b03-c450-3b84-82a6-0c0cdb285ebf"
                    },
                    {
                        "beacon": "weaviate://localhost/83f5131d-7669-31b8-8c6a-00d62cc944c4",
                        "href": "/v1/objects/83f5131d-7669-31b8-8c6a-00d62cc944c4"
                    },
                    {
                        "beacon": "weaviate://localhost/a10e041e-8870-3003-a841-a255a9c96144",
                        "href": "/v1/objects/a10e041e-8870-3003-a841-a255a9c96144"
                    },
                    {
                        "beacon": "weaviate://localhost/586096cc-ccef-3979-b755-3b968be85abe",
                        "href": "/v1/objects/586096cc-ccef-3979-b755-3b968be85abe"
                    },
                    {
                        "beacon": "weaviate://localhost/1b973c42-a7bc-3b8f-85b6-60320c9ead88",
                        "href": "/v1/objects/1b973c42-a7bc-3b8f-85b6-60320c9ead88"
                    },
                    {
                        "beacon": "weaviate://localhost/e4928fba-3c7d-3ec0-b5fd-c88e84b45b75",
                        "href": "/v1/objects/e4928fba-3c7d-3ec0-b5fd-c88e84b45b75"
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
                        "beacon": "weaviate://localhost/15533f73-9bc9-3bfe-aae1-0e53a0d08942",
                        "href": "/v1/objects/15533f73-9bc9-3bfe-aae1-0e53a0d08942"
                    },
                    {
                        "beacon": "weaviate://localhost/b217ef2a-381b-3226-95b6-7bf41158b8e0",
                        "href": "/v1/objects/b217ef2a-381b-3226-95b6-7bf41158b8e0"
                    },
                    {
                        "beacon": "weaviate://localhost/4e44e2ab-8f66-3975-9339-59417da65c67",
                        "href": "/v1/objects/4e44e2ab-8f66-3975-9339-59417da65c67"
                    },
                    {
                        "beacon": "weaviate://localhost/51a1b8b4-b618-305f-b321-bff08fb33369",
                        "href": "/v1/objects/51a1b8b4-b618-305f-b321-bff08fb33369"
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
                        "beacon": "weaviate://localhost/9768c0d7-9c64-3e1c-8668-d8b212665f4d",
                        "href": "/v1/objects/9768c0d7-9c64-3e1c-8668-d8b212665f4d"
                    },
                    {
                        "beacon": "weaviate://localhost/19f00e5b-6daf-3aed-a495-b16c53ecc0ce",
                        "href": "/v1/objects/19f00e5b-6daf-3aed-a495-b16c53ecc0ce"
                    },
                    {
                        "beacon": "weaviate://localhost/1568bc50-2b4b-30c7-91d3-5c99b4bd4ba0",
                        "href": "/v1/objects/1568bc50-2b4b-30c7-91d3-5c99b4bd4ba0"
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
                        "beacon": "weaviate://localhost/bde072c5-b87b-3e8c-94fb-2bbe76229810",
                        "href": "/v1/objects/bde072c5-b87b-3e8c-94fb-2bbe76229810"
                    },
                    {
                        "beacon": "weaviate://localhost/8f9f1a95-155c-393c-b1d5-4d7f541177d2",
                        "href": "/v1/objects/8f9f1a95-155c-393c-b1d5-4d7f541177d2"
                    },
                    {
                        "beacon": "weaviate://localhost/09fc80b4-7830-3da5-b693-5125c6ea111f",
                        "href": "/v1/objects/09fc80b4-7830-3da5-b693-5125c6ea111f"
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
                        "beacon": "weaviate://localhost/ec4330a8-2ca3-34fd-ad6e-3b134012f3a1",
                        "href": "/v1/objects/ec4330a8-2ca3-34fd-ad6e-3b134012f3a1"
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
                        "beacon": "weaviate://localhost/3bb3f0aa-97a8-3195-8586-60806636cc86",
                        "href": "/v1/objects/3bb3f0aa-97a8-3195-8586-60806636cc86"
                    },
                    {
                        "beacon": "weaviate://localhost/3d0f172d-9762-3903-b523-46a1d5fbdfec",
                        "href": "/v1/objects/3d0f172d-9762-3903-b523-46a1d5fbdfec"
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
                        "beacon": "weaviate://localhost/6805eb64-8a99-30f0-957f-1d8f9587d185",
                        "href": "/v1/objects/6805eb64-8a99-30f0-957f-1d8f9587d185"
                    },
                    {
                        "beacon": "weaviate://localhost/29b1397c-b467-3241-8dcb-c53ea73a5136",
                        "href": "/v1/objects/29b1397c-b467-3241-8dcb-c53ea73a5136"
                    },
                    {
                        "beacon": "weaviate://localhost/b1c6c0f0-3b1a-3c9e-af55-dfb95ff97787",
                        "href": "/v1/objects/b1c6c0f0-3b1a-3c9e-af55-dfb95ff97787"
                    },
                    {
                        "beacon": "weaviate://localhost/430d5d20-276e-3b6a-9adc-3a04c37b6e8d",
                        "href": "/v1/objects/430d5d20-276e-3b6a-9adc-3a04c37b6e8d"
                    },
                    {
                        "beacon": "weaviate://localhost/dff1e7e4-83ce-32de-83a9-f5a152745cfb",
                        "href": "/v1/objects/dff1e7e4-83ce-32de-83a9-f5a152745cfb"
                    },
                    {
                        "beacon": "weaviate://localhost/90bdc766-71c2-31da-bcc6-f265c3448f56",
                        "href": "/v1/objects/90bdc766-71c2-31da-bcc6-f265c3448f56"
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
                        "beacon": "weaviate://localhost/94900dde-9bb7-33b5-a9d8-af5c7c149b85",
                        "href": "/v1/objects/94900dde-9bb7-33b5-a9d8-af5c7c149b85"
                    },
                    {
                        "beacon": "weaviate://localhost/0b965fc0-e922-3eba-b55c-91edbdc67c84",
                        "href": "/v1/objects/0b965fc0-e922-3eba-b55c-91edbdc67c84"
                    },
                    {
                        "beacon": "weaviate://localhost/71844443-d6f7-3a50-9252-ae6abb97b639",
                        "href": "/v1/objects/71844443-d6f7-3a50-9252-ae6abb97b639"
                    },
                    {
                        "beacon": "weaviate://localhost/d9d34c2c-6841-37ae-821e-21e4c7332f45",
                        "href": "/v1/objects/d9d34c2c-6841-37ae-821e-21e4c7332f45"
                    },
                    {
                        "beacon": "weaviate://localhost/30cafb82-c1a4-35cd-b43a-1dff8843806b",
                        "href": "/v1/objects/30cafb82-c1a4-35cd-b43a-1dff8843806b"
                    },
                    {
                        "beacon": "weaviate://localhost/ce0f43d7-21d5-3dbe-91e9-49e9721fc76e",
                        "href": "/v1/objects/ce0f43d7-21d5-3dbe-91e9-49e9721fc76e"
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
                        "beacon": "weaviate://localhost/e5c9652d-611f-35a8-9127-3071f6bcbd07",
                        "href": "/v1/objects/e5c9652d-611f-35a8-9127-3071f6bcbd07"
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
                        "beacon": "weaviate://localhost/9a990506-ccb5-33ac-85f2-0c4747b7ded0",
                        "href": "/v1/objects/9a990506-ccb5-33ac-85f2-0c4747b7ded0"
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
                        "beacon": "weaviate://localhost/438a21cc-d69f-3c35-b989-ff74099fdcd7",
                        "href": "/v1/objects/438a21cc-d69f-3c35-b989-ff74099fdcd7"
                    },
                    {
                        "beacon": "weaviate://localhost/feefd187-16e0-3635-b01e-1a65f495c762",
                        "href": "/v1/objects/feefd187-16e0-3635-b01e-1a65f495c762"
                    },
                    {
                        "beacon": "weaviate://localhost/4ecade45-b714-36a2-95ff-1143f7f0bad6",
                        "href": "/v1/objects/4ecade45-b714-36a2-95ff-1143f7f0bad6"
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
                        "beacon": "weaviate://localhost/03a8152d-3278-392a-9bae-1cf49aad9ae1",
                        "href": "/v1/objects/03a8152d-3278-392a-9bae-1cf49aad9ae1"
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
                        "beacon": "weaviate://localhost/bb7fc2bc-bd94-3c18-856a-50e06c860bba",
                        "href": "/v1/objects/bb7fc2bc-bd94-3c18-856a-50e06c860bba"
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
                        "beacon": "weaviate://localhost/fb8f4dd0-f5b9-3072-86ca-0be7f4144ee1",
                        "href": "/v1/objects/fb8f4dd0-f5b9-3072-86ca-0be7f4144ee1"
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
                        "beacon": "weaviate://localhost/97f4c711-9dfa-3647-8dff-e551aa31ea41",
                        "href": "/v1/objects/97f4c711-9dfa-3647-8dff-e551aa31ea41"
                    },
                    {
                        "beacon": "weaviate://localhost/38ae4482-d83e-3c83-8a31-1c37b1acff6a",
                        "href": "/v1/objects/38ae4482-d83e-3c83-8a31-1c37b1acff6a"
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
                        "beacon": "weaviate://localhost/e0acb5ad-accd-3024-85bd-e9ea42b303c3",
                        "href": "/v1/objects/e0acb5ad-accd-3024-85bd-e9ea42b303c3"
                    },
                    {
                        "beacon": "weaviate://localhost/6e064a51-3ce9-3781-8b50-3290b42e02d9",
                        "href": "/v1/objects/6e064a51-3ce9-3781-8b50-3290b42e02d9"
                    },
                    {
                        "beacon": "weaviate://localhost/89752b83-2ba7-36e7-ade1-ab4560d5bd90",
                        "href": "/v1/objects/89752b83-2ba7-36e7-ade1-ab4560d5bd90"
                    },
                    {
                        "beacon": "weaviate://localhost/0cfbefb9-4d88-3aa9-ad8d-9562155ea3b2",
                        "href": "/v1/objects/0cfbefb9-4d88-3aa9-ad8d-9562155ea3b2"
                    },
                    {
                        "beacon": "weaviate://localhost/94007572-43f1-396f-850e-dc14f3b1f4aa",
                        "href": "/v1/objects/94007572-43f1-396f-850e-dc14f3b1f4aa"
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
                        "beacon": "weaviate://localhost/9d3cbe5d-2396-371b-8d48-bea71039ab3e",
                        "href": "/v1/objects/9d3cbe5d-2396-371b-8d48-bea71039ab3e"
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
                        "beacon": "weaviate://localhost/d8604f53-65e7-3049-87c2-4f04b58881b2",
                        "href": "/v1/objects/d8604f53-65e7-3049-87c2-4f04b58881b2"
                    },
                    {
                        "beacon": "weaviate://localhost/8f98225c-70eb-315a-a5d7-c93829a72f62",
                        "href": "/v1/objects/8f98225c-70eb-315a-a5d7-c93829a72f62"
                    },
                    {
                        "beacon": "weaviate://localhost/59cba0a5-26f4-36fd-ad99-d844e60abc68",
                        "href": "/v1/objects/59cba0a5-26f4-36fd-ad99-d844e60abc68"
                    },
                    {
                        "beacon": "weaviate://localhost/aadcb3aa-5ec4-3214-8c76-ba3d4029fe28",
                        "href": "/v1/objects/aadcb3aa-5ec4-3214-8c76-ba3d4029fe28"
                    },
                    {
                        "beacon": "weaviate://localhost/a7540b21-4986-342d-b9bf-4296e951916d",
                        "href": "/v1/objects/a7540b21-4986-342d-b9bf-4296e951916d"
                    },
                    {
                        "beacon": "weaviate://localhost/c5d222bf-3726-30ed-87a5-e8026431a67c",
                        "href": "/v1/objects/c5d222bf-3726-30ed-87a5-e8026431a67c"
                    },
                    {
                        "beacon": "weaviate://localhost/98e9c120-bd64-34e0-9d5e-4f220ecc0fa4",
                        "href": "/v1/objects/98e9c120-bd64-34e0-9d5e-4f220ecc0fa4"
                    },
                    {
                        "beacon": "weaviate://localhost/0f4958c5-7e6b-3b2e-81f1-2ab3db066ce2",
                        "href": "/v1/objects/0f4958c5-7e6b-3b2e-81f1-2ab3db066ce2"
                    },
                    {
                        "beacon": "weaviate://localhost/2e4035ad-3146-33b0-9a79-9730c1a80f15",
                        "href": "/v1/objects/2e4035ad-3146-33b0-9a79-9730c1a80f15"
                    },
                    {
                        "beacon": "weaviate://localhost/28ade3c1-e64a-3ad8-bbf8-d5f3395057bf",
                        "href": "/v1/objects/28ade3c1-e64a-3ad8-bbf8-d5f3395057bf"
                    },
                    {
                        "beacon": "weaviate://localhost/51d52570-c752-3818-a4df-61e61d9e570d",
                        "href": "/v1/objects/51d52570-c752-3818-a4df-61e61d9e570d"
                    },
                    {
                        "beacon": "weaviate://localhost/6feb6ef2-306a-3eb8-b09c-3fb62f001bb2",
                        "href": "/v1/objects/6feb6ef2-306a-3eb8-b09c-3fb62f001bb2"
                    },
                    {
                        "beacon": "weaviate://localhost/8375a40e-e44b-32fa-aa88-52a6dee945ea",
                        "href": "/v1/objects/8375a40e-e44b-32fa-aa88-52a6dee945ea"
                    },
                    {
                        "beacon": "weaviate://localhost/61c4e2ba-3cb5-3d9d-9cf2-ad3cdb17aeed",
                        "href": "/v1/objects/61c4e2ba-3cb5-3d9d-9cf2-ad3cdb17aeed"
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
                        "beacon": "weaviate://localhost/d7c719c8-7947-387f-ad56-3ac0ecde9ab7",
                        "href": "/v1/objects/d7c719c8-7947-387f-ad56-3ac0ecde9ab7"
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
                        "beacon": "weaviate://localhost/bc194e07-7ccf-3b05-bd46-c6a6abebb3b5",
                        "href": "/v1/objects/bc194e07-7ccf-3b05-bd46-c6a6abebb3b5"
                    },
                    {
                        "beacon": "weaviate://localhost/d26dd1c5-4568-35f7-9f40-1b786dfe3882",
                        "href": "/v1/objects/d26dd1c5-4568-35f7-9f40-1b786dfe3882"
                    },
                    {
                        "beacon": "weaviate://localhost/9d48e70a-f9aa-392b-93ae-d7f84946a9f2",
                        "href": "/v1/objects/9d48e70a-f9aa-392b-93ae-d7f84946a9f2"
                    },
                    {
                        "beacon": "weaviate://localhost/a6fcc427-7a54-3e98-a4f2-bf3e113e17a0",
                        "href": "/v1/objects/a6fcc427-7a54-3e98-a4f2-bf3e113e17a0"
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
                        "beacon": "weaviate://localhost/db5c928f-c105-31cf-a7ef-45e5e4c5ff3d",
                        "href": "/v1/objects/db5c928f-c105-31cf-a7ef-45e5e4c5ff3d"
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
            "class": "Publication",
            "creationTimeUnix": 1618580853820,
            "id": "7e9b9ffe-e645-302d-9d94-517670623b35",
            "properties": {
                "hasArticles": [
                    {
                        "beacon": "weaviate://localhost/2e219343-51ea-322d-a742-d2526c72ff21",
                        "href": "/v1/objects/2e219343-51ea-322d-a742-d2526c72ff21"
                    },
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
                        "beacon": "weaviate://localhost/8bb3168b-fcd0-3b0e-a9dc-6e2337203bd0",
                        "href": "/v1/objects/8bb3168b-fcd0-3b0e-a9dc-6e2337203bd0"
                    },
                    {
                        "beacon": "weaviate://localhost/02c4dc2b-6941-3a77-a54d-5f51a1926d22",
                        "href": "/v1/objects/02c4dc2b-6941-3a77-a54d-5f51a1926d22"
                    },
                    {
                        "beacon": "weaviate://localhost/3247065a-322a-30cc-b6a4-eecd8a2f3af4",
                        "href": "/v1/objects/3247065a-322a-30cc-b6a4-eecd8a2f3af4"
                    },
                    {
                        "beacon": "weaviate://localhost/98536935-5feb-3c8e-80f6-66a05f43e47b",
                        "href": "/v1/objects/98536935-5feb-3c8e-80f6-66a05f43e47b"
                    },
                    {
                        "beacon": "weaviate://localhost/4d00f4f7-47ad-32df-936c-29e145414759",
                        "href": "/v1/objects/4d00f4f7-47ad-32df-936c-29e145414759"
                    },
                    {
                        "beacon": "weaviate://localhost/5ef16a76-9677-30e5-bccd-6df83c662571",
                        "href": "/v1/objects/5ef16a76-9677-30e5-bccd-6df83c662571"
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
                        "beacon": "weaviate://localhost/6c3f866a-6a27-323a-9cbf-acdde55ab90d",
                        "href": "/v1/objects/6c3f866a-6a27-323a-9cbf-acdde55ab90d"
                    },
                    {
                        "beacon": "weaviate://localhost/6e336803-56da-36f4-962a-9fb349df0080",
                        "href": "/v1/objects/6e336803-56da-36f4-962a-9fb349df0080"
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
                        "beacon": "weaviate://localhost/19ef96ab-d183-3d25-93ee-021fc9811cb1",
                        "href": "/v1/objects/19ef96ab-d183-3d25-93ee-021fc9811cb1"
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
                        "beacon": "weaviate://localhost/7027ae74-468e-3d28-ba64-88e836060f9f",
                        "href": "/v1/objects/7027ae74-468e-3d28-ba64-88e836060f9f"
                    },
                    {
                        "beacon": "weaviate://localhost/93e30fee-d310-34ef-b141-6092f4f29636",
                        "href": "/v1/objects/93e30fee-d310-34ef-b141-6092f4f29636"
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
                        "beacon": "weaviate://localhost/7e4e3a5d-cc7a-3aa1-96a2-a21b7a437b30",
                        "href": "/v1/objects/7e4e3a5d-cc7a-3aa1-96a2-a21b7a437b30"
                    },
                    {
                        "beacon": "weaviate://localhost/5d6b7744-788b-34ef-b42f-026c470a0137",
                        "href": "/v1/objects/5d6b7744-788b-34ef-b42f-026c470a0137"
                    },
                    {
                        "beacon": "weaviate://localhost/dd590fb1-3e42-3b89-a183-6cf51a6cca0d",
                        "href": "/v1/objects/dd590fb1-3e42-3b89-a183-6cf51a6cca0d"
                    },
                    {
                        "beacon": "weaviate://localhost/e2221f93-fad7-31c9-a17c-98e114dff007",
                        "href": "/v1/objects/e2221f93-fad7-31c9-a17c-98e114dff007"
                    },
                    {
                        "beacon": "weaviate://localhost/66404973-0292-309a-9925-52c35d822066",
                        "href": "/v1/objects/66404973-0292-309a-9925-52c35d822066"
                    },
                    {
                        "beacon": "weaviate://localhost/99fc27af-d583-3f5d-97f3-dcc8bc7590af",
                        "href": "/v1/objects/99fc27af-d583-3f5d-97f3-dcc8bc7590af"
                    },
                    {
                        "beacon": "weaviate://localhost/b3e15524-55d8-39df-a585-c90756c943df",
                        "href": "/v1/objects/b3e15524-55d8-39df-a585-c90756c943df"
                    },
                    {
                        "beacon": "weaviate://localhost/3df62805-5e97-3599-a5c7-8029ead5c3e2",
                        "href": "/v1/objects/3df62805-5e97-3599-a5c7-8029ead5c3e2"
                    },
                    {
                        "beacon": "weaviate://localhost/af290f7c-b6cd-3fb4-82d7-f54cc1bc3b70",
                        "href": "/v1/objects/af290f7c-b6cd-3fb4-82d7-f54cc1bc3b70"
                    },
                    {
                        "beacon": "weaviate://localhost/ff814297-ce3b-3de8-9d1c-9b491002eac6",
                        "href": "/v1/objects/ff814297-ce3b-3de8-9d1c-9b491002eac6"
                    },
                    {
                        "beacon": "weaviate://localhost/306501c1-02cc-31f9-9035-d74647fecb56",
                        "href": "/v1/objects/306501c1-02cc-31f9-9035-d74647fecb56"
                    },
                    {
                        "beacon": "weaviate://localhost/8ddd9aaa-58d9-3658-9a8c-13555348f917",
                        "href": "/v1/objects/8ddd9aaa-58d9-3658-9a8c-13555348f917"
                    },
                    {
                        "beacon": "weaviate://localhost/970d1763-ab12-3d40-8fcd-d3a550ddbf99",
                        "href": "/v1/objects/970d1763-ab12-3d40-8fcd-d3a550ddbf99"
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
                        "beacon": "weaviate://localhost/ab8949be-3887-35e7-9403-c579f0578df7",
                        "href": "/v1/objects/ab8949be-3887-35e7-9403-c579f0578df7"
                    },
                    {
                        "beacon": "weaviate://localhost/3491a121-d5f2-3c80-9192-5691cb740eae",
                        "href": "/v1/objects/3491a121-d5f2-3c80-9192-5691cb740eae"
                    },
                    {
                        "beacon": "weaviate://localhost/76b53e47-73cf-3280-a195-245b46875b8b",
                        "href": "/v1/objects/76b53e47-73cf-3280-a195-245b46875b8b"
                    },
                    {
                        "beacon": "weaviate://localhost/1e23b29d-b2f6-3f3b-a8df-07c891bdbe40",
                        "href": "/v1/objects/1e23b29d-b2f6-3f3b-a8df-07c891bdbe40"
                    },
                    {
                        "beacon": "weaviate://localhost/87770e0b-3498-3294-b450-edb66d3fa97c",
                        "href": "/v1/objects/87770e0b-3498-3294-b450-edb66d3fa97c"
                    },
                    {
                        "beacon": "weaviate://localhost/029b3734-5063-3ea6-b3d6-cc110e415c64",
                        "href": "/v1/objects/029b3734-5063-3ea6-b3d6-cc110e415c64"
                    },
                    {
                        "beacon": "weaviate://localhost/60d74611-310e-3c7a-b87f-ce1f4ea0aeca",
                        "href": "/v1/objects/60d74611-310e-3c7a-b87f-ce1f4ea0aeca"
                    },
                    {
                        "beacon": "weaviate://localhost/1ae7cfca-cad7-3031-98e7-370b3fe21bb9",
                        "href": "/v1/objects/1ae7cfca-cad7-3031-98e7-370b3fe21bb9"
                    },
                    {
                        "beacon": "weaviate://localhost/004aa9ac-800a-3699-b153-d6ac569468e7",
                        "href": "/v1/objects/004aa9ac-800a-3699-b153-d6ac569468e7"
                    },
                    {
                        "beacon": "weaviate://localhost/3efdf657-c32a-350f-bac5-a4038855d288",
                        "href": "/v1/objects/3efdf657-c32a-350f-bac5-a4038855d288"
                    },
                    {
                        "beacon": "weaviate://localhost/c90bd76b-cffb-30b7-be20-d389b9cdbc99",
                        "href": "/v1/objects/c90bd76b-cffb-30b7-be20-d389b9cdbc99"
                    },
                    {
                        "beacon": "weaviate://localhost/2059d1be-66b8-34d7-a94c-b77bd0d3070c",
                        "href": "/v1/objects/2059d1be-66b8-34d7-a94c-b77bd0d3070c"
                    },
                    {
                        "beacon": "weaviate://localhost/f116da21-81a9-39a1-97aa-955c216d8b9f",
                        "href": "/v1/objects/f116da21-81a9-39a1-97aa-955c216d8b9f"
                    },
                    {
                        "beacon": "weaviate://localhost/acb7cbe0-aa66-301d-9d98-a6c9eb130aa1",
                        "href": "/v1/objects/acb7cbe0-aa66-301d-9d98-a6c9eb130aa1"
                    },
                    {
                        "beacon": "weaviate://localhost/45321666-cfda-3558-bd85-d72bfff3c0a1",
                        "href": "/v1/objects/45321666-cfda-3558-bd85-d72bfff3c0a1"
                    },
                    {
                        "beacon": "weaviate://localhost/9ed35e39-e75c-350f-967e-19c8df38d2cb",
                        "href": "/v1/objects/9ed35e39-e75c-350f-967e-19c8df38d2cb"
                    },
                    {
                        "beacon": "weaviate://localhost/96660fe3-5833-332a-afbd-4041c5278140",
                        "href": "/v1/objects/96660fe3-5833-332a-afbd-4041c5278140"
                    },
                    {
                        "beacon": "weaviate://localhost/419513be-df92-30d9-a8e6-307b60099269",
                        "href": "/v1/objects/419513be-df92-30d9-a8e6-307b60099269"
                    },
                    {
                        "beacon": "weaviate://localhost/2da5bbc2-8893-3007-b82a-e08eb2fa34a9",
                        "href": "/v1/objects/2da5bbc2-8893-3007-b82a-e08eb2fa34a9"
                    },
                    {
                        "beacon": "weaviate://localhost/65a8639c-70db-3177-93e7-6d6485642cd1",
                        "href": "/v1/objects/65a8639c-70db-3177-93e7-6d6485642cd1"
                    },
                    {
                        "beacon": "weaviate://localhost/0ed4a3d6-2c74-301b-a2f7-332b9519c44a",
                        "href": "/v1/objects/0ed4a3d6-2c74-301b-a2f7-332b9519c44a"
                    },
                    {
                        "beacon": "weaviate://localhost/a2ab3c12-10c4-31e5-b2b3-1b5c930475cc",
                        "href": "/v1/objects/a2ab3c12-10c4-31e5-b2b3-1b5c930475cc"
                    },
                    {
                        "beacon": "weaviate://localhost/59a9dc09-762b-3f5c-83ac-21be8d1cec1e",
                        "href": "/v1/objects/59a9dc09-762b-3f5c-83ac-21be8d1cec1e"
                    },
                    {
                        "beacon": "weaviate://localhost/a96f231d-86ff-3ea3-ad26-b835db116bd8",
                        "href": "/v1/objects/a96f231d-86ff-3ea3-ad26-b835db116bd8"
                    },
                    {
                        "beacon": "weaviate://localhost/065f9486-fd15-3df5-9283-10a685d8a91e",
                        "href": "/v1/objects/065f9486-fd15-3df5-9283-10a685d8a91e"
                    },
                    {
                        "beacon": "weaviate://localhost/168e9420-4aa9-3d83-aa13-c487b3c42c1a",
                        "href": "/v1/objects/168e9420-4aa9-3d83-aa13-c487b3c42c1a"
                    },
                    {
                        "beacon": "weaviate://localhost/e65e0c52-eda7-3ef5-8f0d-5d2814a80d6f",
                        "href": "/v1/objects/e65e0c52-eda7-3ef5-8f0d-5d2814a80d6f"
                    },
                    {
                        "beacon": "weaviate://localhost/b0d333d2-6cd4-359b-b278-71c52cfe9f22",
                        "href": "/v1/objects/b0d333d2-6cd4-359b-b278-71c52cfe9f22"
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
                        "beacon": "weaviate://localhost/9f113457-df36-31b0-9ab3-2deabce62315",
                        "href": "/v1/objects/9f113457-df36-31b0-9ab3-2deabce62315"
                    },
                    {
                        "beacon": "weaviate://localhost/90ac4785-74f5-3a38-a08f-0b28207d1da9",
                        "href": "/v1/objects/90ac4785-74f5-3a38-a08f-0b28207d1da9"
                    },
                    {
                        "beacon": "weaviate://localhost/f8f61368-da5d-37c9-9390-2734ad8c61be",
                        "href": "/v1/objects/f8f61368-da5d-37c9-9390-2734ad8c61be"
                    },
                    {
                        "beacon": "weaviate://localhost/5c648be7-de75-30ea-a666-82c640d5a9ee",
                        "href": "/v1/objects/5c648be7-de75-30ea-a666-82c640d5a9ee"
                    },
                    {
                        "beacon": "weaviate://localhost/68d8f3e3-3cf7-33c6-98a9-924bf6638336",
                        "href": "/v1/objects/68d8f3e3-3cf7-33c6-98a9-924bf6638336"
                    },
                    {
                        "beacon": "weaviate://localhost/11d79ce2-1d2e-3bb6-b88a-023ea84716bb",
                        "href": "/v1/objects/11d79ce2-1d2e-3bb6-b88a-023ea84716bb"
                    },
                    {
                        "beacon": "weaviate://localhost/915a9308-75dc-32d7-a132-320a332ff92f",
                        "href": "/v1/objects/915a9308-75dc-32d7-a132-320a332ff92f"
                    },
                    {
                        "beacon": "weaviate://localhost/d852c949-0602-3064-9d9b-00ca77dcabcd",
                        "href": "/v1/objects/d852c949-0602-3064-9d9b-00ca77dcabcd"
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
                        "beacon": "weaviate://localhost/7bb46554-c881-37c0-9470-c7d155230252",
                        "href": "/v1/objects/7bb46554-c881-37c0-9470-c7d155230252"
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
                        "beacon": "weaviate://localhost/064d3b5b-3ae8-3f2b-b1cb-651c707959de",
                        "href": "/v1/objects/064d3b5b-3ae8-3f2b-b1cb-651c707959de"
                    },
                    {
                        "beacon": "weaviate://localhost/3fbbcfe4-ffae-30ab-b8c8-ed2efa5bdb12",
                        "href": "/v1/objects/3fbbcfe4-ffae-30ab-b8c8-ed2efa5bdb12"
                    },
                    {
                        "beacon": "weaviate://localhost/5947b3b4-2c77-3527-8427-29d287a9931f",
                        "href": "/v1/objects/5947b3b4-2c77-3527-8427-29d287a9931f"
                    },
                    {
                        "beacon": "weaviate://localhost/39a64930-4483-352c-a711-5f645ce269a2",
                        "href": "/v1/objects/39a64930-4483-352c-a711-5f645ce269a2"
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
                        "beacon": "weaviate://localhost/67045296-5ed4-3747-9a6d-0f28f6dad436",
                        "href": "/v1/objects/67045296-5ed4-3747-9a6d-0f28f6dad436"
                    },
                    {
                        "beacon": "weaviate://localhost/e39e74c9-27e7-3988-b8f9-716a9529cf8f",
                        "href": "/v1/objects/e39e74c9-27e7-3988-b8f9-716a9529cf8f"
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
                        "beacon": "weaviate://localhost/97d3d57d-bc2f-3aff-94b1-c67f6e6dea83",
                        "href": "/v1/objects/97d3d57d-bc2f-3aff-94b1-c67f6e6dea83"
                    },
                    {
                        "beacon": "weaviate://localhost/b395e213-51c0-30bf-9d40-9f8deae260d9",
                        "href": "/v1/objects/b395e213-51c0-30bf-9d40-9f8deae260d9"
                    },
                    {
                        "beacon": "weaviate://localhost/92736957-3046-3de0-9825-736f2328bb43",
                        "href": "/v1/objects/92736957-3046-3de0-9825-736f2328bb43"
                    },
                    {
                        "beacon": "weaviate://localhost/b41ee668-def1-3b59-933a-76a443c23853",
                        "href": "/v1/objects/b41ee668-def1-3b59-933a-76a443c23853"
                    },
                    {
                        "beacon": "weaviate://localhost/20997d7b-adc2-3a8f-ab38-b46f0a67ae15",
                        "href": "/v1/objects/20997d7b-adc2-3a8f-ab38-b46f0a67ae15"
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
                        "beacon": "weaviate://localhost/dd0c4a91-13c0-3ea4-b019-978714a6c63b",
                        "href": "/v1/objects/dd0c4a91-13c0-3ea4-b019-978714a6c63b"
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
                        "beacon": "weaviate://localhost/030bc542-1a45-301b-88c3-942e19ba3104",
                        "href": "/v1/objects/030bc542-1a45-301b-88c3-942e19ba3104"
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
                        "beacon": "weaviate://localhost/b52b2a73-cc31-3968-9239-e23808da4ada",
                        "href": "/v1/objects/b52b2a73-cc31-3968-9239-e23808da4ada"
                    },
                    {
                        "beacon": "weaviate://localhost/ab3f562e-9cc3-3561-b4bd-8374ebde5822",
                        "href": "/v1/objects/ab3f562e-9cc3-3561-b4bd-8374ebde5822"
                    },
                    {
                        "beacon": "weaviate://localhost/e56a55bc-4244-3cc6-89ab-480fc1282cac",
                        "href": "/v1/objects/e56a55bc-4244-3cc6-89ab-480fc1282cac"
                    },
                    {
                        "beacon": "weaviate://localhost/fdbb2ca1-8d00-32c5-805e-69d29fedb4f7",
                        "href": "/v1/objects/fdbb2ca1-8d00-32c5-805e-69d29fedb4f7"
                    },
                    {
                        "beacon": "weaviate://localhost/98ae4af2-f15f-3ef9-8b3e-b547d17bf371",
                        "href": "/v1/objects/98ae4af2-f15f-3ef9-8b3e-b547d17bf371"
                    },
                    {
                        "beacon": "weaviate://localhost/3d63dfc5-3bba-37dd-a0db-2ce9349bad8a",
                        "href": "/v1/objects/3d63dfc5-3bba-37dd-a0db-2ce9349bad8a"
                    },
                    {
                        "beacon": "weaviate://localhost/363086a6-70f9-3939-b4f5-7bfdd3bbe82d",
                        "href": "/v1/objects/363086a6-70f9-3939-b4f5-7bfdd3bbe82d"
                    },
                    {
                        "beacon": "weaviate://localhost/2118e9a9-2464-30f0-926f-24724777041b",
                        "href": "/v1/objects/2118e9a9-2464-30f0-926f-24724777041b"
                    },
                    {
                        "beacon": "weaviate://localhost/ea8a2f99-0773-3400-a06e-c4535ad7e327",
                        "href": "/v1/objects/ea8a2f99-0773-3400-a06e-c4535ad7e327"
                    },
                    {
                        "beacon": "weaviate://localhost/746a8ee8-56e2-3011-b76c-5ab1e8a51d86",
                        "href": "/v1/objects/746a8ee8-56e2-3011-b76c-5ab1e8a51d86"
                    },
                    {
                        "beacon": "weaviate://localhost/bbaa11c7-083d-3324-b056-1fc5fe8bbc43",
                        "href": "/v1/objects/bbaa11c7-083d-3324-b056-1fc5fe8bbc43"
                    },
                    {
                        "beacon": "weaviate://localhost/2a097307-fb3f-3416-a919-7f8cd8dbbc01",
                        "href": "/v1/objects/2a097307-fb3f-3416-a919-7f8cd8dbbc01"
                    },
                    {
                        "beacon": "weaviate://localhost/e5b06ed4-9d4d-3b1b-bf62-094bf166a450",
                        "href": "/v1/objects/e5b06ed4-9d4d-3b1b-bf62-094bf166a450"
                    },
                    {
                        "beacon": "weaviate://localhost/bb84aca1-c83c-3f37-9763-ef1d29513445",
                        "href": "/v1/objects/bb84aca1-c83c-3f37-9763-ef1d29513445"
                    },
                    {
                        "beacon": "weaviate://localhost/b883b920-e3f8-3ec0-b0e3-972de43b78ee",
                        "href": "/v1/objects/b883b920-e3f8-3ec0-b0e3-972de43b78ee"
                    },
                    {
                        "beacon": "weaviate://localhost/c8228640-bb95-3d78-a6ae-ad45279b10d2",
                        "href": "/v1/objects/c8228640-bb95-3d78-a6ae-ad45279b10d2"
                    },
                    {
                        "beacon": "weaviate://localhost/76d81f38-a853-399c-8c5d-4afb8aac2d3c",
                        "href": "/v1/objects/76d81f38-a853-399c-8c5d-4afb8aac2d3c"
                    },
                    {
                        "beacon": "weaviate://localhost/a2edd696-1080-3ca6-9ab7-9bd35f0177b4",
                        "href": "/v1/objects/a2edd696-1080-3ca6-9ab7-9bd35f0177b4"
                    },
                    {
                        "beacon": "weaviate://localhost/d12703f9-1697-3109-b29c-a2398a5242b4",
                        "href": "/v1/objects/d12703f9-1697-3109-b29c-a2398a5242b4"
                    },
                    {
                        "beacon": "weaviate://localhost/d060f3ea-221c-3737-9691-337ada88cd46",
                        "href": "/v1/objects/d060f3ea-221c-3737-9691-337ada88cd46"
                    },
                    {
                        "beacon": "weaviate://localhost/86a6ea12-afcc-3aab-bccc-3a5208ba466a",
                        "href": "/v1/objects/86a6ea12-afcc-3aab-bccc-3a5208ba466a"
                    },
                    {
                        "beacon": "weaviate://localhost/ba14047b-f160-324c-adff-5a64d39cdc97",
                        "href": "/v1/objects/ba14047b-f160-324c-adff-5a64d39cdc97"
                    },
                    {
                        "beacon": "weaviate://localhost/572b53b9-d36a-3f96-9022-981f14e3b49e",
                        "href": "/v1/objects/572b53b9-d36a-3f96-9022-981f14e3b49e"
                    },
                    {
                        "beacon": "weaviate://localhost/f9d5ba07-5c0b-3bd9-b1d7-3e57ac51b8e4",
                        "href": "/v1/objects/f9d5ba07-5c0b-3bd9-b1d7-3e57ac51b8e4"
                    },
                    {
                        "beacon": "weaviate://localhost/13554a96-60de-3a05-9067-73b87aaac5e9",
                        "href": "/v1/objects/13554a96-60de-3a05-9067-73b87aaac5e9"
                    },
                    {
                        "beacon": "weaviate://localhost/f64884ca-9526-3ad1-b346-317565e76ac3",
                        "href": "/v1/objects/f64884ca-9526-3ad1-b346-317565e76ac3"
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
                        "beacon": "weaviate://localhost/4e63524f-0005-3a55-9cc4-14d1dc8979be",
                        "href": "/v1/objects/4e63524f-0005-3a55-9cc4-14d1dc8979be"
                    },
                    {
                        "beacon": "weaviate://localhost/228dd3c0-4b87-3bc2-89ec-56b072299825",
                        "href": "/v1/objects/228dd3c0-4b87-3bc2-89ec-56b072299825"
                    },
                    {
                        "beacon": "weaviate://localhost/f0ad9b01-f168-3891-a363-54fd846e8d92",
                        "href": "/v1/objects/f0ad9b01-f168-3891-a363-54fd846e8d92"
                    },
                    {
                        "beacon": "weaviate://localhost/e801e9da-29bd-3bf0-9bf4-15c47d21e78e",
                        "href": "/v1/objects/e801e9da-29bd-3bf0-9bf4-15c47d21e78e"
                    },
                    {
                        "beacon": "weaviate://localhost/e6e98376-cd7a-3df5-aa4e-81ecd208efdc",
                        "href": "/v1/objects/e6e98376-cd7a-3df5-aa4e-81ecd208efdc"
                    },
                    {
                        "beacon": "weaviate://localhost/71d65805-baa3-3257-b27b-74f928dd34f0",
                        "href": "/v1/objects/71d65805-baa3-3257-b27b-74f928dd34f0"
                    },
                    {
                        "beacon": "weaviate://localhost/c9e09ba1-5eac-3880-8926-e3de98642af9",
                        "href": "/v1/objects/c9e09ba1-5eac-3880-8926-e3de98642af9"
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
                        "beacon": "weaviate://localhost/baf88074-c6b8-35f1-a2fd-22d3b2135202",
                        "href": "/v1/objects/baf88074-c6b8-35f1-a2fd-22d3b2135202"
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
                        "beacon": "weaviate://localhost/e9dab5b0-635c-38f2-afbe-b1f27773a91b",
                        "href": "/v1/objects/e9dab5b0-635c-38f2-afbe-b1f27773a91b"
                    },
                    {
                        "beacon": "weaviate://localhost/565cfa11-770d-35c2-a2dc-442e91f53e3e",
                        "href": "/v1/objects/565cfa11-770d-35c2-a2dc-442e91f53e3e"
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
                        "beacon": "weaviate://localhost/741be056-2959-3090-bf9d-7a799bd36025",
                        "href": "/v1/objects/741be056-2959-3090-bf9d-7a799bd36025"
                    },
                    {
                        "beacon": "weaviate://localhost/8c5f17f1-6645-3348-abbb-74fa7d298379",
                        "href": "/v1/objects/8c5f17f1-6645-3348-abbb-74fa7d298379"
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
                        "beacon": "weaviate://localhost/615e3554-fbef-3bf9-9c36-6374ca35e425",
                        "href": "/v1/objects/615e3554-fbef-3bf9-9c36-6374ca35e425"
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
                        "beacon": "weaviate://localhost/9385beaf-3bdc-311c-b8d2-a951bd24dee9",
                        "href": "/v1/objects/9385beaf-3bdc-311c-b8d2-a951bd24dee9"
                    },
                    {
                        "beacon": "weaviate://localhost/200be6df-7c34-345b-af3d-ca5082ab1287",
                        "href": "/v1/objects/200be6df-7c34-345b-af3d-ca5082ab1287"
                    },
                    {
                        "beacon": "weaviate://localhost/1b22bfbf-8a5a-3d2a-b020-e32eb7696220",
                        "href": "/v1/objects/1b22bfbf-8a5a-3d2a-b020-e32eb7696220"
                    },
                    {
                        "beacon": "weaviate://localhost/2d13e9dd-e153-379d-9074-68bf4da9aa2f",
                        "href": "/v1/objects/2d13e9dd-e153-379d-9074-68bf4da9aa2f"
                    },
                    {
                        "beacon": "weaviate://localhost/7f60a3c6-6a73-3feb-95b3-eee986f99f9e",
                        "href": "/v1/objects/7f60a3c6-6a73-3feb-95b3-eee986f99f9e"
                    },
                    {
                        "beacon": "weaviate://localhost/15828e0c-79be-3ddc-8ecc-ddbcd17bbd9c",
                        "href": "/v1/objects/15828e0c-79be-3ddc-8ecc-ddbcd17bbd9c"
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
                        "beacon": "weaviate://localhost/204d31cc-4185-33db-9cb7-932f4aa99658",
                        "href": "/v1/objects/204d31cc-4185-33db-9cb7-932f4aa99658"
                    },
                    {
                        "beacon": "weaviate://localhost/bc25a784-19ce-3022-bb06-3f9d09342ee9",
                        "href": "/v1/objects/bc25a784-19ce-3022-bb06-3f9d09342ee9"
                    },
                    {
                        "beacon": "weaviate://localhost/ce25ef0c-3721-393c-9968-e01620e5c4a3",
                        "href": "/v1/objects/ce25ef0c-3721-393c-9968-e01620e5c4a3"
                    },
                    {
                        "beacon": "weaviate://localhost/667a7778-7e35-3b88-b4ac-59b7a5c36dfc",
                        "href": "/v1/objects/667a7778-7e35-3b88-b4ac-59b7a5c36dfc"
                    },
                    {
                        "beacon": "weaviate://localhost/926e0ca2-6487-3d35-ab0e-71ecf59b5eb9",
                        "href": "/v1/objects/926e0ca2-6487-3d35-ab0e-71ecf59b5eb9"
                    },
                    {
                        "beacon": "weaviate://localhost/e0fb1fda-0195-3cce-907f-02194e6a360e",
                        "href": "/v1/objects/e0fb1fda-0195-3cce-907f-02194e6a360e"
                    },
                    {
                        "beacon": "weaviate://localhost/2edaf1e3-c1cd-308a-9f7b-8e24d1b48bd4",
                        "href": "/v1/objects/2edaf1e3-c1cd-308a-9f7b-8e24d1b48bd4"
                    },
                    {
                        "beacon": "weaviate://localhost/5caf4627-c1f0-36fd-95c0-3ef1017aad96",
                        "href": "/v1/objects/5caf4627-c1f0-36fd-95c0-3ef1017aad96"
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
            "class": "Publication",
            "creationTimeUnix": 1618580853819,
            "id": "8e14bddf-cd2e-3f5b-8fd5-6e34ee13999e",
            "properties": {
                "hasArticles": [
                    {
                        "beacon": "weaviate://localhost/d9576914-dbdf-3b3a-8b39-622fc50c814c",
                        "href": "/v1/objects/d9576914-dbdf-3b3a-8b39-622fc50c814c"
                    },
                    {
                        "beacon": "weaviate://localhost/34d0c506-4d5e-319e-987c-d922d8c38ccf",
                        "href": "/v1/objects/34d0c506-4d5e-319e-987c-d922d8c38ccf"
                    },
                    {
                        "beacon": "weaviate://localhost/2b9224cf-1385-3e30-9b3f-d714e16b4342",
                        "href": "/v1/objects/2b9224cf-1385-3e30-9b3f-d714e16b4342"
                    },
                    {
                        "beacon": "weaviate://localhost/3feb6775-6f1f-352f-bfd8-f30727ed114c",
                        "href": "/v1/objects/3feb6775-6f1f-352f-bfd8-f30727ed114c"
                    },
                    {
                        "beacon": "weaviate://localhost/3de643c4-2de1-3afa-97a7-e936d2a3222f",
                        "href": "/v1/objects/3de643c4-2de1-3afa-97a7-e936d2a3222f"
                    },
                    {
                        "beacon": "weaviate://localhost/647bbf93-24c6-35f8-b3b0-75cdeaa7c454",
                        "href": "/v1/objects/647bbf93-24c6-35f8-b3b0-75cdeaa7c454"
                    },
                    {
                        "beacon": "weaviate://localhost/d334b72c-1e1d-3abf-8ad1-57f64ceb10d5",
                        "href": "/v1/objects/d334b72c-1e1d-3abf-8ad1-57f64ceb10d5"
                    },
                    {
                        "beacon": "weaviate://localhost/6336457b-867c-38fe-bd9e-04cc4a801e08",
                        "href": "/v1/objects/6336457b-867c-38fe-bd9e-04cc4a801e08"
                    },
                    {
                        "beacon": "weaviate://localhost/22e8db4d-a856-3c71-bd18-423905afd4b8",
                        "href": "/v1/objects/22e8db4d-a856-3c71-bd18-423905afd4b8"
                    },
                    {
                        "beacon": "weaviate://localhost/761c3376-52d5-3c97-84e9-9852f62aa3bf",
                        "href": "/v1/objects/761c3376-52d5-3c97-84e9-9852f62aa3bf"
                    },
                    {
                        "beacon": "weaviate://localhost/0b21a541-51f3-3977-85d7-b1ddb31ab437",
                        "href": "/v1/objects/0b21a541-51f3-3977-85d7-b1ddb31ab437"
                    },
                    {
                        "beacon": "weaviate://localhost/7bde161d-e673-3878-baed-6484e54b9e93",
                        "href": "/v1/objects/7bde161d-e673-3878-baed-6484e54b9e93"
                    },
                    {
                        "beacon": "weaviate://localhost/8ca0d184-80e5-36f6-a09a-457e7e331f28",
                        "href": "/v1/objects/8ca0d184-80e5-36f6-a09a-457e7e331f28"
                    },
                    {
                        "beacon": "weaviate://localhost/b6fc2466-acf2-344e-8e56-34243be8b2d0",
                        "href": "/v1/objects/b6fc2466-acf2-344e-8e56-34243be8b2d0"
                    },
                    {
                        "beacon": "weaviate://localhost/9bc8087a-e29b-3eed-9a97-f955671e2f82",
                        "href": "/v1/objects/9bc8087a-e29b-3eed-9a97-f955671e2f82"
                    },
                    {
                        "beacon": "weaviate://localhost/38e441cb-b0d2-351f-a875-390da49fa373",
                        "href": "/v1/objects/38e441cb-b0d2-351f-a875-390da49fa373"
                    },
                    {
                        "beacon": "weaviate://localhost/d09caf96-7c1f-3558-8ccd-c4cabca6188f",
                        "href": "/v1/objects/d09caf96-7c1f-3558-8ccd-c4cabca6188f"
                    },
                    {
                        "beacon": "weaviate://localhost/ce9bb647-30e4-3ac5-8683-465e822e98e6",
                        "href": "/v1/objects/ce9bb647-30e4-3ac5-8683-465e822e98e6"
                    },
                    {
                        "beacon": "weaviate://localhost/5b82e024-e090-3d17-a1c9-5ff43c653415",
                        "href": "/v1/objects/5b82e024-e090-3d17-a1c9-5ff43c653415"
                    },
                    {
                        "beacon": "weaviate://localhost/16ae791e-514b-32d8-bb35-6e812a0d1ce2",
                        "href": "/v1/objects/16ae791e-514b-32d8-bb35-6e812a0d1ce2"
                    },
                    {
                        "beacon": "weaviate://localhost/ddc8aff1-391f-3249-8849-06e2f4fd60b7",
                        "href": "/v1/objects/ddc8aff1-391f-3249-8849-06e2f4fd60b7"
                    },
                    {
                        "beacon": "weaviate://localhost/846601e7-b640-30cf-a5b6-98b2b279a0a9",
                        "href": "/v1/objects/846601e7-b640-30cf-a5b6-98b2b279a0a9"
                    },
                    {
                        "beacon": "weaviate://localhost/3437c550-203b-33ff-ac55-6f37c15bea08",
                        "href": "/v1/objects/3437c550-203b-33ff-ac55-6f37c15bea08"
                    },
                    {
                        "beacon": "weaviate://localhost/d40ea26d-797c-38df-be70-cc1f49fc197f",
                        "href": "/v1/objects/d40ea26d-797c-38df-be70-cc1f49fc197f"
                    },
                    {
                        "beacon": "weaviate://localhost/8ea21948-2ba0-3df9-ae3b-ccbc67efbc52",
                        "href": "/v1/objects/8ea21948-2ba0-3df9-ae3b-ccbc67efbc52"
                    },
                    {
                        "beacon": "weaviate://localhost/3ea1462b-d3e9-3ccd-8297-b10fbf8a0438",
                        "href": "/v1/objects/3ea1462b-d3e9-3ccd-8297-b10fbf8a0438"
                    },
                    {
                        "beacon": "weaviate://localhost/c8ae1f73-0c8c-30d8-ad41-386614b81df3",
                        "href": "/v1/objects/c8ae1f73-0c8c-30d8-ad41-386614b81df3"
                    },
                    {
                        "beacon": "weaviate://localhost/d0d9432e-b679-3043-a97b-339c7f763756",
                        "href": "/v1/objects/d0d9432e-b679-3043-a97b-339c7f763756"
                    },
                    {
                        "beacon": "weaviate://localhost/410413e8-cc1c-3880-a0cb-ff53d7e8e250",
                        "href": "/v1/objects/410413e8-cc1c-3880-a0cb-ff53d7e8e250"
                    },
                    {
                        "beacon": "weaviate://localhost/16acb25f-c1c7-3a17-9d2c-790e94b466df",
                        "href": "/v1/objects/16acb25f-c1c7-3a17-9d2c-790e94b466df"
                    },
                    {
                        "beacon": "weaviate://localhost/8f8198dd-9535-360b-b661-db6e47fe34e3",
                        "href": "/v1/objects/8f8198dd-9535-360b-b661-db6e47fe34e3"
                    },
                    {
                        "beacon": "weaviate://localhost/a466bff5-cf08-338e-bde4-ff82fd54dc3a",
                        "href": "/v1/objects/a466bff5-cf08-338e-bde4-ff82fd54dc3a"
                    },
                    {
                        "beacon": "weaviate://localhost/3f7dcde4-a1d1-3d73-af0d-842393a11141",
                        "href": "/v1/objects/3f7dcde4-a1d1-3d73-af0d-842393a11141"
                    },
                    {
                        "beacon": "weaviate://localhost/f2a4d20f-067c-3605-9238-5eaeb9ab7440",
                        "href": "/v1/objects/f2a4d20f-067c-3605-9238-5eaeb9ab7440"
                    },
                    {
                        "beacon": "weaviate://localhost/25f2fd03-7f1f-327f-894e-57f0cc85e32b",
                        "href": "/v1/objects/25f2fd03-7f1f-327f-894e-57f0cc85e32b"
                    },
                    {
                        "beacon": "weaviate://localhost/00314096-d170-3038-8413-560add0fda2b",
                        "href": "/v1/objects/00314096-d170-3038-8413-560add0fda2b"
                    },
                    {
                        "beacon": "weaviate://localhost/defc8b16-668e-3493-8369-b355481da1c0",
                        "href": "/v1/objects/defc8b16-668e-3493-8369-b355481da1c0"
                    },
                    {
                        "beacon": "weaviate://localhost/d4e1a379-f240-36aa-b7ea-ea4422d49bd7",
                        "href": "/v1/objects/d4e1a379-f240-36aa-b7ea-ea4422d49bd7"
                    },
                    {
                        "beacon": "weaviate://localhost/1f10d342-b2cf-364b-b2b5-6130d1f3f0e5",
                        "href": "/v1/objects/1f10d342-b2cf-364b-b2b5-6130d1f3f0e5"
                    },
                    {
                        "beacon": "weaviate://localhost/06a978de-ecee-30ed-9285-59efd8a6950d",
                        "href": "/v1/objects/06a978de-ecee-30ed-9285-59efd8a6950d"
                    },
                    {
                        "beacon": "weaviate://localhost/3603d6e4-0f53-3fce-9725-a292f686d88e",
                        "href": "/v1/objects/3603d6e4-0f53-3fce-9725-a292f686d88e"
                    },
                    {
                        "beacon": "weaviate://localhost/6884fa8e-715c-3d89-82c0-8b81b1a8c3f3",
                        "href": "/v1/objects/6884fa8e-715c-3d89-82c0-8b81b1a8c3f3"
                    },
                    {
                        "beacon": "weaviate://localhost/83a9220f-f9da-3617-8e7d-4dc88cc60499",
                        "href": "/v1/objects/83a9220f-f9da-3617-8e7d-4dc88cc60499"
                    },
                    {
                        "beacon": "weaviate://localhost/2a4d9535-bb3a-3c95-aac6-6471efb92bed",
                        "href": "/v1/objects/2a4d9535-bb3a-3c95-aac6-6471efb92bed"
                    },
                    {
                        "beacon": "weaviate://localhost/8b5d9122-205c-3bdf-9be8-bb8f16ce3a2e",
                        "href": "/v1/objects/8b5d9122-205c-3bdf-9be8-bb8f16ce3a2e"
                    },
                    {
                        "beacon": "weaviate://localhost/0cecc37c-48ec-3df4-ba5d-f0a68a88566c",
                        "href": "/v1/objects/0cecc37c-48ec-3df4-ba5d-f0a68a88566c"
                    }
                ],
                "headquartersGeoLocation": {
                    "latitude": 40.75743,
                    "longitude": -73.982704
                },
                "name": "Wall Street Journal"
            },
            "vectorWeights": null
        },
        {
            "class": "Publication",
            "creationTimeUnix": 1618580853819,
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
            "class": "Publication",
            "creationTimeUnix": 1618580853819,
            "id": "ac884d35-ccb4-3937-81f8-8474a4d7a549",
            "properties": {
                "hasArticles": [
                    {
                        "beacon": "weaviate://localhost/743565ac-0480-3e68-8950-9a7240fa2f2a",
                        "href": "/v1/objects/743565ac-0480-3e68-8950-9a7240fa2f2a"
                    },
                    {
                        "beacon": "weaviate://localhost/ee8c40ed-9dc1-3a0f-af15-ff9b951086bf",
                        "href": "/v1/objects/ee8c40ed-9dc1-3a0f-af15-ff9b951086bf"
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
                        "beacon": "weaviate://localhost/629e9080-5df8-3578-b2bd-72f95b58fa6e",
                        "href": "/v1/objects/629e9080-5df8-3578-b2bd-72f95b58fa6e"
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
                        "beacon": "weaviate://localhost/789b1fe0-0e5d-397d-bdc6-a80ecfa3da8d",
                        "href": "/v1/objects/789b1fe0-0e5d-397d-bdc6-a80ecfa3da8d"
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
                        "beacon": "weaviate://localhost/f9aa1b87-22c5-3025-90ec-153961f5afc9",
                        "href": "/v1/objects/f9aa1b87-22c5-3025-90ec-153961f5afc9"
                    },
                    {
                        "beacon": "weaviate://localhost/38f06d9c-4ba8-3c1e-b369-312a2959174f",
                        "href": "/v1/objects/38f06d9c-4ba8-3c1e-b369-312a2959174f"
                    },
                    {
                        "beacon": "weaviate://localhost/74c9854a-8232-3a8c-8639-b3f396db600b",
                        "href": "/v1/objects/74c9854a-8232-3a8c-8639-b3f396db600b"
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
                        "beacon": "weaviate://localhost/bb8d2b7c-0d12-34be-9a54-107738a3aef7",
                        "href": "/v1/objects/bb8d2b7c-0d12-34be-9a54-107738a3aef7"
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
                        "beacon": "weaviate://localhost/61342ff5-4840-3917-9a41-b000cc3e0807",
                        "href": "/v1/objects/61342ff5-4840-3917-9a41-b000cc3e0807"
                    },
                    {
                        "beacon": "weaviate://localhost/71320d1c-1e00-3816-b349-50823fe061c3",
                        "href": "/v1/objects/71320d1c-1e00-3816-b349-50823fe061c3"
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
                        "beacon": "weaviate://localhost/fb3fecce-1f63-3900-a700-98db315fea14",
                        "href": "/v1/objects/fb3fecce-1f63-3900-a700-98db315fea14"
                    },
                    {
                        "beacon": "weaviate://localhost/b355cd1a-fec9-3626-a9db-5e5b0073da62",
                        "href": "/v1/objects/b355cd1a-fec9-3626-a9db-5e5b0073da62"
                    },
                    {
                        "beacon": "weaviate://localhost/a29b6482-27ab-3558-9952-dade01133811",
                        "href": "/v1/objects/a29b6482-27ab-3558-9952-dade01133811"
                    },
                    {
                        "beacon": "weaviate://localhost/8c702800-2959-377e-a965-6ee9f0bc77e3",
                        "href": "/v1/objects/8c702800-2959-377e-a965-6ee9f0bc77e3"
                    },
                    {
                        "beacon": "weaviate://localhost/c086cbd5-0281-3e73-882a-471c8daac001",
                        "href": "/v1/objects/c086cbd5-0281-3e73-882a-471c8daac001"
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
                        "beacon": "weaviate://localhost/2198f5cf-e61b-38c5-a980-2a06f7f06a27",
                        "href": "/v1/objects/2198f5cf-e61b-38c5-a980-2a06f7f06a27"
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
                        "beacon": "weaviate://localhost/13bbd5d9-e395-3595-92ac-b9bdf2cac5f8",
                        "href": "/v1/objects/13bbd5d9-e395-3595-92ac-b9bdf2cac5f8"
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
                        "beacon": "weaviate://localhost/7f3d970b-4e56-3f75-9182-200c1f0eea8c",
                        "href": "/v1/objects/7f3d970b-4e56-3f75-9182-200c1f0eea8c"
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
                        "beacon": "weaviate://localhost/28f4aaa5-1c28-32ac-baae-afdfcc7c47b8",
                        "href": "/v1/objects/28f4aaa5-1c28-32ac-baae-afdfcc7c47b8"
                    },
                    {
                        "beacon": "weaviate://localhost/bfc6b33c-954a-3ae7-993d-64bb865ba72e",
                        "href": "/v1/objects/bfc6b33c-954a-3ae7-993d-64bb865ba72e"
                    },
                    {
                        "beacon": "weaviate://localhost/33753763-8d3b-3f8f-b22f-adebb3063fe5",
                        "href": "/v1/objects/33753763-8d3b-3f8f-b22f-adebb3063fe5"
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
                        "beacon": "weaviate://localhost/baa37dc6-2e36-3d40-88a5-24162041262f",
                        "href": "/v1/objects/baa37dc6-2e36-3d40-88a5-24162041262f"
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
                        "beacon": "weaviate://localhost/811fdfe9-15db-38c1-ace5-a7fe82cd3977",
                        "href": "/v1/objects/811fdfe9-15db-38c1-ace5-a7fe82cd3977"
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
                        "beacon": "weaviate://localhost/1431e4db-79b1-3147-933b-ddbd36777906",
                        "href": "/v1/objects/1431e4db-79b1-3147-933b-ddbd36777906"
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
                        "beacon": "weaviate://localhost/1e1a261c-2fab-3584-84c2-e7d83c3df376",
                        "href": "/v1/objects/1e1a261c-2fab-3584-84c2-e7d83c3df376"
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
                        "beacon": "weaviate://localhost/7a53faee-cab8-342d-823e-6111bfb501b7",
                        "href": "/v1/objects/7a53faee-cab8-342d-823e-6111bfb501b7"
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
                        "beacon": "weaviate://localhost/51bd6b74-e104-3bfa-9124-32325f109f63",
                        "href": "/v1/objects/51bd6b74-e104-3bfa-9124-32325f109f63"
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
                        "beacon": "weaviate://localhost/cb98b587-4dc9-3831-9394-996490560bab",
                        "href": "/v1/objects/cb98b587-4dc9-3831-9394-996490560bab"
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
                        "beacon": "weaviate://localhost/06e6483b-0353-3ed6-90b1-f1d10407f5e8",
                        "href": "/v1/objects/06e6483b-0353-3ed6-90b1-f1d10407f5e8"
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
            "class": "Publication",
            "creationTimeUnix": 1618580853819,
            "id": "b7285ce8-a172-3053-b74d-7200a96bce26",
            "properties": {
                "hasArticles": [
                    {
                        "beacon": "weaviate://localhost/75b8956c-ad32-39ab-b4d3-2d8242181d46",
                        "href": "/v1/objects/75b8956c-ad32-39ab-b4d3-2d8242181d46"
                    },
                    {
                        "beacon": "weaviate://localhost/2d993e82-ca6f-3b67-b17a-4e467265cca6",
                        "href": "/v1/objects/2d993e82-ca6f-3b67-b17a-4e467265cca6"
                    },
                    {
                        "beacon": "weaviate://localhost/8e05246d-6869-368c-94e3-5da7ccefa939",
                        "href": "/v1/objects/8e05246d-6869-368c-94e3-5da7ccefa939"
                    },
                    {
                        "beacon": "weaviate://localhost/30d7e8d8-4ac3-3be5-944b-781d27ee03c6",
                        "href": "/v1/objects/30d7e8d8-4ac3-3be5-944b-781d27ee03c6"
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
                        "beacon": "weaviate://localhost/a602be70-7262-3e70-999f-e339108043ba",
                        "href": "/v1/objects/a602be70-7262-3e70-999f-e339108043ba"
                    },
                    {
                        "beacon": "weaviate://localhost/0533b2be-b25d-3f37-87db-33ee84e9c2a8",
                        "href": "/v1/objects/0533b2be-b25d-3f37-87db-33ee84e9c2a8"
                    },
                    {
                        "beacon": "weaviate://localhost/2f53e30b-c254-365a-a819-d977cd00bf3f",
                        "href": "/v1/objects/2f53e30b-c254-365a-a819-d977cd00bf3f"
                    },
                    {
                        "beacon": "weaviate://localhost/4d493480-9340-3171-84c1-4d8b8edd387c",
                        "href": "/v1/objects/4d493480-9340-3171-84c1-4d8b8edd387c"
                    },
                    {
                        "beacon": "weaviate://localhost/b697e3db-9fb8-30fa-ab06-ac83e25a1a92",
                        "href": "/v1/objects/b697e3db-9fb8-30fa-ab06-ac83e25a1a92"
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
                        "beacon": "weaviate://localhost/1a045d58-e8a1-3a3f-8f52-67654688861f",
                        "href": "/v1/objects/1a045d58-e8a1-3a3f-8f52-67654688861f"
                    },
                    {
                        "beacon": "weaviate://localhost/2696d575-d61a-3ead-8f61-413a8a3b24c0",
                        "href": "/v1/objects/2696d575-d61a-3ead-8f61-413a8a3b24c0"
                    },
                    {
                        "beacon": "weaviate://localhost/ae6ca795-f175-37bf-b958-494e7adcce7b",
                        "href": "/v1/objects/ae6ca795-f175-37bf-b958-494e7adcce7b"
                    },
                    {
                        "beacon": "weaviate://localhost/d7fa4008-fd2b-3f14-ab35-6e6218509169",
                        "href": "/v1/objects/d7fa4008-fd2b-3f14-ab35-6e6218509169"
                    },
                    {
                        "beacon": "weaviate://localhost/48772c0b-e1d7-3e6f-b53b-844c578391c5",
                        "href": "/v1/objects/48772c0b-e1d7-3e6f-b53b-844c578391c5"
                    },
                    {
                        "beacon": "weaviate://localhost/2152475a-b1de-38a6-bd3c-d5e987b50701",
                        "href": "/v1/objects/2152475a-b1de-38a6-bd3c-d5e987b50701"
                    },
                    {
                        "beacon": "weaviate://localhost/19abeaa1-2c10-3894-a6c0-034eb7448444",
                        "href": "/v1/objects/19abeaa1-2c10-3894-a6c0-034eb7448444"
                    },
                    {
                        "beacon": "weaviate://localhost/b80ff202-dd79-3ce8-94c5-d412422ec89f",
                        "href": "/v1/objects/b80ff202-dd79-3ce8-94c5-d412422ec89f"
                    },
                    {
                        "beacon": "weaviate://localhost/632cbab2-28b4-3ce0-98b7-5e42fb441d39",
                        "href": "/v1/objects/632cbab2-28b4-3ce0-98b7-5e42fb441d39"
                    },
                    {
                        "beacon": "weaviate://localhost/2e63212f-c6db-34b9-b3cf-0ccbb79e94a6",
                        "href": "/v1/objects/2e63212f-c6db-34b9-b3cf-0ccbb79e94a6"
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
                        "beacon": "weaviate://localhost/eaa85e30-2c10-3a72-addc-868e3c2acf55",
                        "href": "/v1/objects/eaa85e30-2c10-3a72-addc-868e3c2acf55"
                    },
                    {
                        "beacon": "weaviate://localhost/c1235ece-ca33-3484-bac8-34c881ad85fe",
                        "href": "/v1/objects/c1235ece-ca33-3484-bac8-34c881ad85fe"
                    },
                    {
                        "beacon": "weaviate://localhost/bcd592cd-98e1-303c-b0e6-db0bae623385",
                        "href": "/v1/objects/bcd592cd-98e1-303c-b0e6-db0bae623385"
                    },
                    {
                        "beacon": "weaviate://localhost/f2c6cf9b-1a0c-303d-9fe6-b6552cccfa84",
                        "href": "/v1/objects/f2c6cf9b-1a0c-303d-9fe6-b6552cccfa84"
                    },
                    {
                        "beacon": "weaviate://localhost/1d10f7f2-8801-3b23-b95b-ba58a27ea913",
                        "href": "/v1/objects/1d10f7f2-8801-3b23-b95b-ba58a27ea913"
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
                        "beacon": "weaviate://localhost/d45d0667-6f76-305b-b3ee-c687078f60e9",
                        "href": "/v1/objects/d45d0667-6f76-305b-b3ee-c687078f60e9"
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
                        "beacon": "weaviate://localhost/69cdc540-06b4-32b5-b730-9754b04bf92e",
                        "href": "/v1/objects/69cdc540-06b4-32b5-b730-9754b04bf92e"
                    },
                    {
                        "beacon": "weaviate://localhost/bd80805a-441f-338c-a6cb-72e9ed6d18a0",
                        "href": "/v1/objects/bd80805a-441f-338c-a6cb-72e9ed6d18a0"
                    },
                    {
                        "beacon": "weaviate://localhost/21d90550-f19f-3d66-870a-a72813692157",
                        "href": "/v1/objects/21d90550-f19f-3d66-870a-a72813692157"
                    },
                    {
                        "beacon": "weaviate://localhost/72f3c331-3eb3-3b4a-9c3a-5e8cb3e54b12",
                        "href": "/v1/objects/72f3c331-3eb3-3b4a-9c3a-5e8cb3e54b12"
                    },
                    {
                        "beacon": "weaviate://localhost/9ccab1a0-c1b1-3f58-b185-fc24fe116883",
                        "href": "/v1/objects/9ccab1a0-c1b1-3f58-b185-fc24fe116883"
                    },
                    {
                        "beacon": "weaviate://localhost/9937ee27-e77c-3390-aa23-f2a1ad153a9e",
                        "href": "/v1/objects/9937ee27-e77c-3390-aa23-f2a1ad153a9e"
                    },
                    {
                        "beacon": "weaviate://localhost/adcc0a00-1f1d-3e85-8a81-a8b16ce94e97",
                        "href": "/v1/objects/adcc0a00-1f1d-3e85-8a81-a8b16ce94e97"
                    },
                    {
                        "beacon": "weaviate://localhost/fce700a9-844f-352e-aa6a-af6ed80ce289",
                        "href": "/v1/objects/fce700a9-844f-352e-aa6a-af6ed80ce289"
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
                        "beacon": "weaviate://localhost/e23052e9-53e7-3dcb-a35e-16edfade0e5c",
                        "href": "/v1/objects/e23052e9-53e7-3dcb-a35e-16edfade0e5c"
                    },
                    {
                        "beacon": "weaviate://localhost/c60ba7d4-4746-321a-8f9d-57a977458805",
                        "href": "/v1/objects/c60ba7d4-4746-321a-8f9d-57a977458805"
                    },
                    {
                        "beacon": "weaviate://localhost/c242ce27-7a7b-37fd-8838-8170a84d3512",
                        "href": "/v1/objects/c242ce27-7a7b-37fd-8838-8170a84d3512"
                    },
                    {
                        "beacon": "weaviate://localhost/3848a8c0-ca61-3bcd-bd8d-c51aad756adb",
                        "href": "/v1/objects/3848a8c0-ca61-3bcd-bd8d-c51aad756adb"
                    },
                    {
                        "beacon": "weaviate://localhost/f4acb917-a521-3df4-bcbd-2296cfb01ba3",
                        "href": "/v1/objects/f4acb917-a521-3df4-bcbd-2296cfb01ba3"
                    },
                    {
                        "beacon": "weaviate://localhost/d5580164-3b13-3f7b-a352-49074cd3c447",
                        "href": "/v1/objects/d5580164-3b13-3f7b-a352-49074cd3c447"
                    },
                    {
                        "beacon": "weaviate://localhost/31b016b6-6b0e-30b4-9c41-1a08aa9b5a2b",
                        "href": "/v1/objects/31b016b6-6b0e-30b4-9c41-1a08aa9b5a2b"
                    },
                    {
                        "beacon": "weaviate://localhost/a09d8b6f-7214-33b9-9a0b-cc77a11d160e",
                        "href": "/v1/objects/a09d8b6f-7214-33b9-9a0b-cc77a11d160e"
                    },
                    {
                        "beacon": "weaviate://localhost/10696ddd-a715-30ea-a2b4-2871e832763e",
                        "href": "/v1/objects/10696ddd-a715-30ea-a2b4-2871e832763e"
                    },
                    {
                        "beacon": "weaviate://localhost/81f341d1-cfed-37b9-8a69-caac797e92cd",
                        "href": "/v1/objects/81f341d1-cfed-37b9-8a69-caac797e92cd"
                    },
                    {
                        "beacon": "weaviate://localhost/e1b81ab8-faa6-3019-8a30-a51b189f119e",
                        "href": "/v1/objects/e1b81ab8-faa6-3019-8a30-a51b189f119e"
                    },
                    {
                        "beacon": "weaviate://localhost/a7fe2cde-bc71-3076-b0c0-73c44e026a04",
                        "href": "/v1/objects/a7fe2cde-bc71-3076-b0c0-73c44e026a04"
                    },
                    {
                        "beacon": "weaviate://localhost/aa9f8da6-9a8f-35f3-8264-1587dd869fc1",
                        "href": "/v1/objects/aa9f8da6-9a8f-35f3-8264-1587dd869fc1"
                    },
                    {
                        "beacon": "weaviate://localhost/b933273d-35c8-3bae-9be5-e8106fd19543",
                        "href": "/v1/objects/b933273d-35c8-3bae-9be5-e8106fd19543"
                    },
                    {
                        "beacon": "weaviate://localhost/3fa6a72a-6c07-3ed2-8331-a5e6673fe2b6",
                        "href": "/v1/objects/3fa6a72a-6c07-3ed2-8331-a5e6673fe2b6"
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
                        "beacon": "weaviate://localhost/50281939-5219-371c-bb3d-9c1c83cf9ea6",
                        "href": "/v1/objects/50281939-5219-371c-bb3d-9c1c83cf9ea6"
                    },
                    {
                        "beacon": "weaviate://localhost/3f7a84ab-fe00-3c55-a0ee-fcebd05492fc",
                        "href": "/v1/objects/3f7a84ab-fe00-3c55-a0ee-fcebd05492fc"
                    },
                    {
                        "beacon": "weaviate://localhost/26609704-0b56-3c97-b3f2-2d237b1df17e",
                        "href": "/v1/objects/26609704-0b56-3c97-b3f2-2d237b1df17e"
                    },
                    {
                        "beacon": "weaviate://localhost/87a52604-ed1a-33ec-adc0-6c1b0cf22757",
                        "href": "/v1/objects/87a52604-ed1a-33ec-adc0-6c1b0cf22757"
                    },
                    {
                        "beacon": "weaviate://localhost/178fbb62-2970-39bd-af52-1277d7e0ba65",
                        "href": "/v1/objects/178fbb62-2970-39bd-af52-1277d7e0ba65"
                    },
                    {
                        "beacon": "weaviate://localhost/07cebdf2-04b3-3c4a-96a8-ecb8e3c30709",
                        "href": "/v1/objects/07cebdf2-04b3-3c4a-96a8-ecb8e3c30709"
                    },
                    {
                        "beacon": "weaviate://localhost/e5b160cd-9a3a-37cd-aec9-ac72a63cd3d4",
                        "href": "/v1/objects/e5b160cd-9a3a-37cd-aec9-ac72a63cd3d4"
                    },
                    {
                        "beacon": "weaviate://localhost/07d58926-b78c-351d-8dd2-3ca1e2690cd6",
                        "href": "/v1/objects/07d58926-b78c-351d-8dd2-3ca1e2690cd6"
                    },
                    {
                        "beacon": "weaviate://localhost/fc7bbeb4-a3bf-3ebd-a34f-adba05e5663f",
                        "href": "/v1/objects/fc7bbeb4-a3bf-3ebd-a34f-adba05e5663f"
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
                        "beacon": "weaviate://localhost/3a3ad430-255e-3c98-9e70-c24ba3ea9dba",
                        "href": "/v1/objects/3a3ad430-255e-3c98-9e70-c24ba3ea9dba"
                    },
                    {
                        "beacon": "weaviate://localhost/25bf63d9-34ba-372f-a891-12a54a385faa",
                        "href": "/v1/objects/25bf63d9-34ba-372f-a891-12a54a385faa"
                    },
                    {
                        "beacon": "weaviate://localhost/b0d847d2-66dc-3154-80a1-f9cead68c7d5",
                        "href": "/v1/objects/b0d847d2-66dc-3154-80a1-f9cead68c7d5"
                    },
                    {
                        "beacon": "weaviate://localhost/43124a9e-3e30-3139-b96d-2bd11ed0c3cb",
                        "href": "/v1/objects/43124a9e-3e30-3139-b96d-2bd11ed0c3cb"
                    },
                    {
                        "beacon": "weaviate://localhost/ae9cd029-905b-351f-a342-4bd7292a91d3",
                        "href": "/v1/objects/ae9cd029-905b-351f-a342-4bd7292a91d3"
                    },
                    {
                        "beacon": "weaviate://localhost/aa4372c4-378c-33cd-9ddf-5bf37f695e7d",
                        "href": "/v1/objects/aa4372c4-378c-33cd-9ddf-5bf37f695e7d"
                    },
                    {
                        "beacon": "weaviate://localhost/36696292-c903-376f-950d-ffa5353eccb6",
                        "href": "/v1/objects/36696292-c903-376f-950d-ffa5353eccb6"
                    },
                    {
                        "beacon": "weaviate://localhost/a0d5c1a3-84bc-3f7c-ace4-bb56edfb3b0a",
                        "href": "/v1/objects/a0d5c1a3-84bc-3f7c-ace4-bb56edfb3b0a"
                    },
                    {
                        "beacon": "weaviate://localhost/23e4f04f-56b8-3d87-b316-8dea724343dd",
                        "href": "/v1/objects/23e4f04f-56b8-3d87-b316-8dea724343dd"
                    },
                    {
                        "beacon": "weaviate://localhost/95f579be-e936-335f-adee-7415877737f7",
                        "href": "/v1/objects/95f579be-e936-335f-adee-7415877737f7"
                    },
                    {
                        "beacon": "weaviate://localhost/5435ffad-a9b1-3f67-aae8-1aacb2333c6a",
                        "href": "/v1/objects/5435ffad-a9b1-3f67-aae8-1aacb2333c6a"
                    },
                    {
                        "beacon": "weaviate://localhost/2db42145-c218-39ba-b113-1249d4a72b8a",
                        "href": "/v1/objects/2db42145-c218-39ba-b113-1249d4a72b8a"
                    },
                    {
                        "beacon": "weaviate://localhost/6736210a-e880-34a3-b3fc-7e7b20166588",
                        "href": "/v1/objects/6736210a-e880-34a3-b3fc-7e7b20166588"
                    },
                    {
                        "beacon": "weaviate://localhost/d804838a-f2d6-3417-8e4e-936e8484082b",
                        "href": "/v1/objects/d804838a-f2d6-3417-8e4e-936e8484082b"
                    },
                    {
                        "beacon": "weaviate://localhost/e2913f92-1238-3e33-a988-fe5a9b5abcce",
                        "href": "/v1/objects/e2913f92-1238-3e33-a988-fe5a9b5abcce"
                    },
                    {
                        "beacon": "weaviate://localhost/022f944a-70dc-3424-bb37-c549a0315a6c",
                        "href": "/v1/objects/022f944a-70dc-3424-bb37-c549a0315a6c"
                    },
                    {
                        "beacon": "weaviate://localhost/4d67e310-464b-3188-81ec-bdb19db99d92",
                        "href": "/v1/objects/4d67e310-464b-3188-81ec-bdb19db99d92"
                    },
                    {
                        "beacon": "weaviate://localhost/55e28ec1-0482-314a-b0f4-b2223629e073",
                        "href": "/v1/objects/55e28ec1-0482-314a-b0f4-b2223629e073"
                    },
                    {
                        "beacon": "weaviate://localhost/f65d8a9e-0e42-399a-aff1-1fbe62480f5f",
                        "href": "/v1/objects/f65d8a9e-0e42-399a-aff1-1fbe62480f5f"
                    },
                    {
                        "beacon": "weaviate://localhost/42e4cf82-ca62-3464-b3e3-8ca0766e0f2a",
                        "href": "/v1/objects/42e4cf82-ca62-3464-b3e3-8ca0766e0f2a"
                    },
                    {
                        "beacon": "weaviate://localhost/29a7e9ea-05ef-38b1-95c6-d222976b6c1b",
                        "href": "/v1/objects/29a7e9ea-05ef-38b1-95c6-d222976b6c1b"
                    },
                    {
                        "beacon": "weaviate://localhost/d84fd3fa-a73e-37ef-a400-87e48f6e4b73",
                        "href": "/v1/objects/d84fd3fa-a73e-37ef-a400-87e48f6e4b73"
                    },
                    {
                        "beacon": "weaviate://localhost/e228d872-9b4e-3e3c-888b-900fccdae035",
                        "href": "/v1/objects/e228d872-9b4e-3e3c-888b-900fccdae035"
                    },
                    {
                        "beacon": "weaviate://localhost/e13461af-239c-3e11-9800-867d6e968a81",
                        "href": "/v1/objects/e13461af-239c-3e11-9800-867d6e968a81"
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
                        "beacon": "weaviate://localhost/125f797a-0b28-3638-be80-e277ac2da6bb",
                        "href": "/v1/objects/125f797a-0b28-3638-be80-e277ac2da6bb"
                    },
                    {
                        "beacon": "weaviate://localhost/2a2abc5b-6b31-392a-a20a-e5f8fe0bbbcf",
                        "href": "/v1/objects/2a2abc5b-6b31-392a-a20a-e5f8fe0bbbcf"
                    },
                    {
                        "beacon": "weaviate://localhost/12248852-be8c-3500-be69-e0108a5f76ea",
                        "href": "/v1/objects/12248852-be8c-3500-be69-e0108a5f76ea"
                    },
                    {
                        "beacon": "weaviate://localhost/188a42b5-7bb9-32e4-a9ab-4919b04371ad",
                        "href": "/v1/objects/188a42b5-7bb9-32e4-a9ab-4919b04371ad"
                    },
                    {
                        "beacon": "weaviate://localhost/1f715897-cdc0-347d-9de5-548135ce2378",
                        "href": "/v1/objects/1f715897-cdc0-347d-9de5-548135ce2378"
                    },
                    {
                        "beacon": "weaviate://localhost/f1d803e3-9891-3b95-966f-f69a5229dc6c",
                        "href": "/v1/objects/f1d803e3-9891-3b95-966f-f69a5229dc6c"
                    },
                    {
                        "beacon": "weaviate://localhost/f5555573-2fa6-3b2a-8ec5-ede432020649",
                        "href": "/v1/objects/f5555573-2fa6-3b2a-8ec5-ede432020649"
                    },
                    {
                        "beacon": "weaviate://localhost/b8e653cf-b0f8-37ea-9a16-967ce1c6e6e3",
                        "href": "/v1/objects/b8e653cf-b0f8-37ea-9a16-967ce1c6e6e3"
                    },
                    {
                        "beacon": "weaviate://localhost/f21f6b48-f0ab-39b9-810c-104c3eb8f19a",
                        "href": "/v1/objects/f21f6b48-f0ab-39b9-810c-104c3eb8f19a"
                    },
                    {
                        "beacon": "weaviate://localhost/faaf48c4-b4b4-3a93-baf5-f206e07d5474",
                        "href": "/v1/objects/faaf48c4-b4b4-3a93-baf5-f206e07d5474"
                    },
                    {
                        "beacon": "weaviate://localhost/4b68d322-1dc5-3f96-be64-901b2ebbf7b7",
                        "href": "/v1/objects/4b68d322-1dc5-3f96-be64-901b2ebbf7b7"
                    },
                    {
                        "beacon": "weaviate://localhost/1e8ba934-ccd0-3d91-b82c-2f9182879d7d",
                        "href": "/v1/objects/1e8ba934-ccd0-3d91-b82c-2f9182879d7d"
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
                        "beacon": "weaviate://localhost/c2a891b6-f8a5-3910-a448-8e4b5148a04a",
                        "href": "/v1/objects/c2a891b6-f8a5-3910-a448-8e4b5148a04a"
                    },
                    {
                        "beacon": "weaviate://localhost/a3cb3155-1aaf-376a-9872-b19ba46bfe53",
                        "href": "/v1/objects/a3cb3155-1aaf-376a-9872-b19ba46bfe53"
                    },
                    {
                        "beacon": "weaviate://localhost/5814879b-390c-39ec-abf2-ce35782becbc",
                        "href": "/v1/objects/5814879b-390c-39ec-abf2-ce35782becbc"
                    },
                    {
                        "beacon": "weaviate://localhost/acd1897d-eec5-377f-9e40-1d2101c49b2a",
                        "href": "/v1/objects/acd1897d-eec5-377f-9e40-1d2101c49b2a"
                    },
                    {
                        "beacon": "weaviate://localhost/e83c92c5-de82-3de6-afc6-8a73d3429711",
                        "href": "/v1/objects/e83c92c5-de82-3de6-afc6-8a73d3429711"
                    },
                    {
                        "beacon": "weaviate://localhost/b4ae4a20-1872-3a5f-997e-9af34aafa3db",
                        "href": "/v1/objects/b4ae4a20-1872-3a5f-997e-9af34aafa3db"
                    },
                    {
                        "beacon": "weaviate://localhost/39f7cede-d762-3125-902c-34a4fef59589",
                        "href": "/v1/objects/39f7cede-d762-3125-902c-34a4fef59589"
                    },
                    {
                        "beacon": "weaviate://localhost/106bd975-29b7-3ae9-bf9d-4613a7462777",
                        "href": "/v1/objects/106bd975-29b7-3ae9-bf9d-4613a7462777"
                    },
                    {
                        "beacon": "weaviate://localhost/ed7801fe-2887-3df4-afe9-65eb1ebebe57",
                        "href": "/v1/objects/ed7801fe-2887-3df4-afe9-65eb1ebebe57"
                    },
                    {
                        "beacon": "weaviate://localhost/8266212f-c7d1-3837-88a5-25995b31b546",
                        "href": "/v1/objects/8266212f-c7d1-3837-88a5-25995b31b546"
                    },
                    {
                        "beacon": "weaviate://localhost/292652ca-ba9d-38ca-87c1-7b6636b2ca3c",
                        "href": "/v1/objects/292652ca-ba9d-38ca-87c1-7b6636b2ca3c"
                    },
                    {
                        "beacon": "weaviate://localhost/b8977d2e-a026-36dc-bc34-f21a35188010",
                        "href": "/v1/objects/b8977d2e-a026-36dc-bc34-f21a35188010"
                    },
                    {
                        "beacon": "weaviate://localhost/310a62d2-5560-3876-9d8c-97cebe97d5f9",
                        "href": "/v1/objects/310a62d2-5560-3876-9d8c-97cebe97d5f9"
                    },
                    {
                        "beacon": "weaviate://localhost/845a5039-6ad9-3e5d-8db3-713b53bd589f",
                        "href": "/v1/objects/845a5039-6ad9-3e5d-8db3-713b53bd589f"
                    },
                    {
                        "beacon": "weaviate://localhost/c7d0b211-ed52-3523-a432-c4e9e361d4fb",
                        "href": "/v1/objects/c7d0b211-ed52-3523-a432-c4e9e361d4fb"
                    },
                    {
                        "beacon": "weaviate://localhost/aa8fbf68-764e-3397-892d-83e479ebe93d",
                        "href": "/v1/objects/aa8fbf68-764e-3397-892d-83e479ebe93d"
                    },
                    {
                        "beacon": "weaviate://localhost/e90af93d-649e-3e20-9e83-c99b2d410581",
                        "href": "/v1/objects/e90af93d-649e-3e20-9e83-c99b2d410581"
                    },
                    {
                        "beacon": "weaviate://localhost/474665af-17a2-3587-a49e-8992f1d70d3f",
                        "href": "/v1/objects/474665af-17a2-3587-a49e-8992f1d70d3f"
                    },
                    {
                        "beacon": "weaviate://localhost/c9f33f41-ec84-30a9-b6a7-ac4d8435df2c",
                        "href": "/v1/objects/c9f33f41-ec84-30a9-b6a7-ac4d8435df2c"
                    },
                    {
                        "beacon": "weaviate://localhost/c44ef77a-0a9b-3c7f-ba52-8912259c1b62",
                        "href": "/v1/objects/c44ef77a-0a9b-3c7f-ba52-8912259c1b62"
                    },
                    {
                        "beacon": "weaviate://localhost/2147ac54-a5f1-3316-a874-54c8b9cd1d22",
                        "href": "/v1/objects/2147ac54-a5f1-3316-a874-54c8b9cd1d22"
                    },
                    {
                        "beacon": "weaviate://localhost/ccb9cb10-b5ce-33e5-acf6-8cb35b510792",
                        "href": "/v1/objects/ccb9cb10-b5ce-33e5-acf6-8cb35b510792"
                    },
                    {
                        "beacon": "weaviate://localhost/d30ba670-894a-3b35-b31f-5cb56f983533",
                        "href": "/v1/objects/d30ba670-894a-3b35-b31f-5cb56f983533"
                    },
                    {
                        "beacon": "weaviate://localhost/c78e1c46-7d15-31f2-ba9d-d26b26415467",
                        "href": "/v1/objects/c78e1c46-7d15-31f2-ba9d-d26b26415467"
                    },
                    {
                        "beacon": "weaviate://localhost/67e1e9e3-d175-340c-9035-3bbbc5359ad0",
                        "href": "/v1/objects/67e1e9e3-d175-340c-9035-3bbbc5359ad0"
                    },
                    {
                        "beacon": "weaviate://localhost/3bb04dd3-92c8-391e-acd6-5ed14c7ada68",
                        "href": "/v1/objects/3bb04dd3-92c8-391e-acd6-5ed14c7ada68"
                    },
                    {
                        "beacon": "weaviate://localhost/f3db887d-1110-34b5-b637-cbdfb85df0d7",
                        "href": "/v1/objects/f3db887d-1110-34b5-b637-cbdfb85df0d7"
                    },
                    {
                        "beacon": "weaviate://localhost/cf6dbf41-c1e3-3f51-af57-90fc3839a5aa",
                        "href": "/v1/objects/cf6dbf41-c1e3-3f51-af57-90fc3839a5aa"
                    },
                    {
                        "beacon": "weaviate://localhost/360e3865-7f79-3774-9380-1e89b7152852",
                        "href": "/v1/objects/360e3865-7f79-3774-9380-1e89b7152852"
                    },
                    {
                        "beacon": "weaviate://localhost/79dcd661-6015-3295-a17e-aa0f7e2ead69",
                        "href": "/v1/objects/79dcd661-6015-3295-a17e-aa0f7e2ead69"
                    },
                    {
                        "beacon": "weaviate://localhost/b0416095-cddf-3899-b6f3-ff805c8ab666",
                        "href": "/v1/objects/b0416095-cddf-3899-b6f3-ff805c8ab666"
                    },
                    {
                        "beacon": "weaviate://localhost/ccc9cdd2-26d4-3d22-9fc3-d8aed164d27f",
                        "href": "/v1/objects/ccc9cdd2-26d4-3d22-9fc3-d8aed164d27f"
                    },
                    {
                        "beacon": "weaviate://localhost/9763f221-3983-3300-91ea-05995d282d65",
                        "href": "/v1/objects/9763f221-3983-3300-91ea-05995d282d65"
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
                        "beacon": "weaviate://localhost/4055e7a2-3e32-37b3-b45f-0668c33a81c1",
                        "href": "/v1/objects/4055e7a2-3e32-37b3-b45f-0668c33a81c1"
                    },
                    {
                        "beacon": "weaviate://localhost/d587a175-0131-3d5e-aa74-b91a9ed4d35e",
                        "href": "/v1/objects/d587a175-0131-3d5e-aa74-b91a9ed4d35e"
                    },
                    {
                        "beacon": "weaviate://localhost/075de5af-43c2-33fa-85ce-c009ceedcdf7",
                        "href": "/v1/objects/075de5af-43c2-33fa-85ce-c009ceedcdf7"
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
                        "beacon": "weaviate://localhost/049aaadc-474f-3361-98d5-584da655e9b5",
                        "href": "/v1/objects/049aaadc-474f-3361-98d5-584da655e9b5"
                    },
                    {
                        "beacon": "weaviate://localhost/e9acddb7-7471-37ca-a8ec-e6ccfd20f36f",
                        "href": "/v1/objects/e9acddb7-7471-37ca-a8ec-e6ccfd20f36f"
                    },
                    {
                        "beacon": "weaviate://localhost/6ea55ae1-d0b2-38f2-a8a0-21c42ce23e13",
                        "href": "/v1/objects/6ea55ae1-d0b2-38f2-a8a0-21c42ce23e13"
                    },
                    {
                        "beacon": "weaviate://localhost/f9f7f3b9-bf5b-3f42-a357-ce9a1d4d2568",
                        "href": "/v1/objects/f9f7f3b9-bf5b-3f42-a357-ce9a1d4d2568"
                    },
                    {
                        "beacon": "weaviate://localhost/dd45b2d7-e8e1-3892-860e-1b04c0e7e76e",
                        "href": "/v1/objects/dd45b2d7-e8e1-3892-860e-1b04c0e7e76e"
                    },
                    {
                        "beacon": "weaviate://localhost/10644f3c-6fbc-343c-852d-9878772d3013",
                        "href": "/v1/objects/10644f3c-6fbc-343c-852d-9878772d3013"
                    },
                    {
                        "beacon": "weaviate://localhost/e8f57971-bdf8-32a0-b2e1-d419d2d53034",
                        "href": "/v1/objects/e8f57971-bdf8-32a0-b2e1-d419d2d53034"
                    },
                    {
                        "beacon": "weaviate://localhost/e49a478f-9654-3600-af96-b573e60a0f33",
                        "href": "/v1/objects/e49a478f-9654-3600-af96-b573e60a0f33"
                    },
                    {
                        "beacon": "weaviate://localhost/2f51fc8c-dd02-30ac-bb12-1dedce9be03e",
                        "href": "/v1/objects/2f51fc8c-dd02-30ac-bb12-1dedce9be03e"
                    },
                    {
                        "beacon": "weaviate://localhost/c64e841e-e930-33db-ba49-e5ee01191077",
                        "href": "/v1/objects/c64e841e-e930-33db-ba49-e5ee01191077"
                    },
                    {
                        "beacon": "weaviate://localhost/15e4485a-2ae3-365b-adaa-05c12a2fc0c4",
                        "href": "/v1/objects/15e4485a-2ae3-365b-adaa-05c12a2fc0c4"
                    },
                    {
                        "beacon": "weaviate://localhost/737ac30e-5ea0-34ae-9d78-781ccb401ff2",
                        "href": "/v1/objects/737ac30e-5ea0-34ae-9d78-781ccb401ff2"
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
                        "beacon": "weaviate://localhost/977ce992-70fc-3472-a07d-04491e5eeedd",
                        "href": "/v1/objects/977ce992-70fc-3472-a07d-04491e5eeedd"
                    },
                    {
                        "beacon": "weaviate://localhost/889d9ad4-ae5f-35a7-a011-d40f4c73ee83",
                        "href": "/v1/objects/889d9ad4-ae5f-35a7-a011-d40f4c73ee83"
                    },
                    {
                        "beacon": "weaviate://localhost/42b37322-81ef-3ea5-b8ee-8e5c3c458e88",
                        "href": "/v1/objects/42b37322-81ef-3ea5-b8ee-8e5c3c458e88"
                    },
                    {
                        "beacon": "weaviate://localhost/3da74f13-7953-3009-840e-d49f2fd76953",
                        "href": "/v1/objects/3da74f13-7953-3009-840e-d49f2fd76953"
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
                        "beacon": "weaviate://localhost/9ef27901-cc70-3617-9ccf-9911e0befaf6",
                        "href": "/v1/objects/9ef27901-cc70-3617-9ccf-9911e0befaf6"
                    },
                    {
                        "beacon": "weaviate://localhost/8d6d39b3-ffa6-3a12-8696-915726875545",
                        "href": "/v1/objects/8d6d39b3-ffa6-3a12-8696-915726875545"
                    },
                    {
                        "beacon": "weaviate://localhost/074e919e-3a1d-3e24-904f-3205358faa8a",
                        "href": "/v1/objects/074e919e-3a1d-3e24-904f-3205358faa8a"
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
                        "beacon": "weaviate://localhost/b87ced29-5a78-33fd-9260-a748b5e55797",
                        "href": "/v1/objects/b87ced29-5a78-33fd-9260-a748b5e55797"
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
                        "beacon": "weaviate://localhost/0bdcee1b-dae2-3108-ab15-c284e203f93b",
                        "href": "/v1/objects/0bdcee1b-dae2-3108-ab15-c284e203f93b"
                    },
                    {
                        "beacon": "weaviate://localhost/d03ac51e-5805-35d8-b674-96eaa9d7acde",
                        "href": "/v1/objects/d03ac51e-5805-35d8-b674-96eaa9d7acde"
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
                        "beacon": "weaviate://localhost/6cd0f7e7-4cce-3653-9478-c96bd232f2e6",
                        "href": "/v1/objects/6cd0f7e7-4cce-3653-9478-c96bd232f2e6"
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
                        "beacon": "weaviate://localhost/c270e593-79de-39ad-801a-53923899ddea",
                        "href": "/v1/objects/c270e593-79de-39ad-801a-53923899ddea"
                    },
                    {
                        "beacon": "weaviate://localhost/38bcf183-a99c-30fa-9c12-1312d4db9e87",
                        "href": "/v1/objects/38bcf183-a99c-30fa-9c12-1312d4db9e87"
                    },
                    {
                        "beacon": "weaviate://localhost/017d7368-101b-3191-9f68-fa09055648c3",
                        "href": "/v1/objects/017d7368-101b-3191-9f68-fa09055648c3"
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
                        "beacon": "weaviate://localhost/62324563-92ba-3b98-bca6-a3554e7f4b76",
                        "href": "/v1/objects/62324563-92ba-3b98-bca6-a3554e7f4b76"
                    },
                    {
                        "beacon": "weaviate://localhost/21941bb3-0611-31d4-bfaa-9b8d771aa9ea",
                        "href": "/v1/objects/21941bb3-0611-31d4-bfaa-9b8d771aa9ea"
                    },
                    {
                        "beacon": "weaviate://localhost/690a130f-4afb-3ae9-b7de-aac3ce53d17a",
                        "href": "/v1/objects/690a130f-4afb-3ae9-b7de-aac3ce53d17a"
                    },
                    {
                        "beacon": "weaviate://localhost/6b06b160-f40a-3857-b0d8-5fa41c0fa197",
                        "href": "/v1/objects/6b06b160-f40a-3857-b0d8-5fa41c0fa197"
                    },
                    {
                        "beacon": "weaviate://localhost/49f51c39-1cd0-36cd-9f08-436dd48e8e7d",
                        "href": "/v1/objects/49f51c39-1cd0-36cd-9f08-436dd48e8e7d"
                    },
                    {
                        "beacon": "weaviate://localhost/7025d3d3-562e-3b0e-8cdd-a505eb741d5d",
                        "href": "/v1/objects/7025d3d3-562e-3b0e-8cdd-a505eb741d5d"
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
                        "beacon": "weaviate://localhost/157185b0-448e-35d9-abf7-596b8a3c86f4",
                        "href": "/v1/objects/157185b0-448e-35d9-abf7-596b8a3c86f4"
                    },
                    {
                        "beacon": "weaviate://localhost/b982d66b-dd15-3d5a-932b-e88ef46f2dbe",
                        "href": "/v1/objects/b982d66b-dd15-3d5a-932b-e88ef46f2dbe"
                    },
                    {
                        "beacon": "weaviate://localhost/fb05621f-023d-39e5-b8c2-0c7a6faed486",
                        "href": "/v1/objects/fb05621f-023d-39e5-b8c2-0c7a6faed486"
                    },
                    {
                        "beacon": "weaviate://localhost/b903602d-564a-3aa7-b528-f347e15bf941",
                        "href": "/v1/objects/b903602d-564a-3aa7-b528-f347e15bf941"
                    },
                    {
                        "beacon": "weaviate://localhost/d5bd7a49-c7e5-3a0c-b87e-0c0f5237425f",
                        "href": "/v1/objects/d5bd7a49-c7e5-3a0c-b87e-0c0f5237425f"
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
                        "beacon": "weaviate://localhost/41a65af5-47e4-36d1-81d1-240525341441",
                        "href": "/v1/objects/41a65af5-47e4-36d1-81d1-240525341441"
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
                        "beacon": "weaviate://localhost/57d32b6f-a48d-34ef-8f08-11931e3114ee",
                        "href": "/v1/objects/57d32b6f-a48d-34ef-8f08-11931e3114ee"
                    },
                    {
                        "beacon": "weaviate://localhost/55a77575-9af4-35f0-9403-e90ba4ab6090",
                        "href": "/v1/objects/55a77575-9af4-35f0-9403-e90ba4ab6090"
                    },
                    {
                        "beacon": "weaviate://localhost/a3eb3c31-997f-36f9-b98d-11a653ce3fdc",
                        "href": "/v1/objects/a3eb3c31-997f-36f9-b98d-11a653ce3fdc"
                    },
                    {
                        "beacon": "weaviate://localhost/39de95a1-e77c-319d-a545-c9478472e411",
                        "href": "/v1/objects/39de95a1-e77c-319d-a545-c9478472e411"
                    },
                    {
                        "beacon": "weaviate://localhost/1e442da4-b963-3fe6-82bc-7261a15cc543",
                        "href": "/v1/objects/1e442da4-b963-3fe6-82bc-7261a15cc543"
                    },
                    {
                        "beacon": "weaviate://localhost/250f0888-60a9-3713-a79d-5e472e44f4b6",
                        "href": "/v1/objects/250f0888-60a9-3713-a79d-5e472e44f4b6"
                    },
                    {
                        "beacon": "weaviate://localhost/55b07920-af31-371d-9b48-2d7370630e19",
                        "href": "/v1/objects/55b07920-af31-371d-9b48-2d7370630e19"
                    },
                    {
                        "beacon": "weaviate://localhost/5d6586f2-9799-333a-9a43-8f2696505abb",
                        "href": "/v1/objects/5d6586f2-9799-333a-9a43-8f2696505abb"
                    },
                    {
                        "beacon": "weaviate://localhost/28a4f63d-1883-3b37-a814-ffb9849fb2b5",
                        "href": "/v1/objects/28a4f63d-1883-3b37-a814-ffb9849fb2b5"
                    },
                    {
                        "beacon": "weaviate://localhost/4be5ec67-d124-3418-ac2b-60e0fbb6dfba",
                        "href": "/v1/objects/4be5ec67-d124-3418-ac2b-60e0fbb6dfba"
                    },
                    {
                        "beacon": "weaviate://localhost/11102b17-cc3d-3698-9a9b-c02da261fd67",
                        "href": "/v1/objects/11102b17-cc3d-3698-9a9b-c02da261fd67"
                    },
                    {
                        "beacon": "weaviate://localhost/d6b4f735-86c8-34e1-880d-f456d1c0dcea",
                        "href": "/v1/objects/d6b4f735-86c8-34e1-880d-f456d1c0dcea"
                    },
                    {
                        "beacon": "weaviate://localhost/17c5b01b-a139-3266-8c67-c194125730a4",
                        "href": "/v1/objects/17c5b01b-a139-3266-8c67-c194125730a4"
                    },
                    {
                        "beacon": "weaviate://localhost/d88d6064-d875-3c8d-b03d-b89ebccaa524",
                        "href": "/v1/objects/d88d6064-d875-3c8d-b03d-b89ebccaa524"
                    },
                    {
                        "beacon": "weaviate://localhost/3afc9b6b-94e5-3a3d-81f2-977734d9d5a6",
                        "href": "/v1/objects/3afc9b6b-94e5-3a3d-81f2-977734d9d5a6"
                    },
                    {
                        "beacon": "weaviate://localhost/840af50d-f31a-316d-b5b5-36dac67fa170",
                        "href": "/v1/objects/840af50d-f31a-316d-b5b5-36dac67fa170"
                    },
                    {
                        "beacon": "weaviate://localhost/004ca1fa-6bad-3c2b-8f0c-c9ac1abf008e",
                        "href": "/v1/objects/004ca1fa-6bad-3c2b-8f0c-c9ac1abf008e"
                    },
                    {
                        "beacon": "weaviate://localhost/818ff6ed-7384-33ae-b6cc-b125fc1346b2",
                        "href": "/v1/objects/818ff6ed-7384-33ae-b6cc-b125fc1346b2"
                    },
                    {
                        "beacon": "weaviate://localhost/35eb1f55-3c3a-3d09-b750-e45bc98aaa93",
                        "href": "/v1/objects/35eb1f55-3c3a-3d09-b750-e45bc98aaa93"
                    },
                    {
                        "beacon": "weaviate://localhost/81051df4-87d1-37fc-946f-d6a1fa9a8b94",
                        "href": "/v1/objects/81051df4-87d1-37fc-946f-d6a1fa9a8b94"
                    },
                    {
                        "beacon": "weaviate://localhost/b08c2b20-3613-3f8a-ae6d-349ff45961ad",
                        "href": "/v1/objects/b08c2b20-3613-3f8a-ae6d-349ff45961ad"
                    },
                    {
                        "beacon": "weaviate://localhost/f25bc593-237c-32c9-9e56-560cc6ef74bf",
                        "href": "/v1/objects/f25bc593-237c-32c9-9e56-560cc6ef74bf"
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
                        "beacon": "weaviate://localhost/0baaf342-afc4-369f-9735-d6c2450e10a8",
                        "href": "/v1/objects/0baaf342-afc4-369f-9735-d6c2450e10a8"
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
                        "beacon": "weaviate://localhost/34e63e61-990b-32dd-81b4-7518bdc1ef53",
                        "href": "/v1/objects/34e63e61-990b-32dd-81b4-7518bdc1ef53"
                    },
                    {
                        "beacon": "weaviate://localhost/db8e8847-7cd9-37fb-8990-ae601386a7fa",
                        "href": "/v1/objects/db8e8847-7cd9-37fb-8990-ae601386a7fa"
                    },
                    {
                        "beacon": "weaviate://localhost/96a35c1b-c6b8-3d0f-9f7f-96321754689d",
                        "href": "/v1/objects/96a35c1b-c6b8-3d0f-9f7f-96321754689d"
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
                        "beacon": "weaviate://localhost/d3169dd5-4d6d-3819-9799-e88bbd03eef5",
                        "href": "/v1/objects/d3169dd5-4d6d-3819-9799-e88bbd03eef5"
                    },
                    {
                        "beacon": "weaviate://localhost/25751582-9e05-37f4-9147-dd2a69c23649",
                        "href": "/v1/objects/25751582-9e05-37f4-9147-dd2a69c23649"
                    },
                    {
                        "beacon": "weaviate://localhost/5b121036-5940-3ab5-a1d6-78333d4b4823",
                        "href": "/v1/objects/5b121036-5940-3ab5-a1d6-78333d4b4823"
                    },
                    {
                        "beacon": "weaviate://localhost/df3da504-4dcc-3350-9430-e9d6ce10b320",
                        "href": "/v1/objects/df3da504-4dcc-3350-9430-e9d6ce10b320"
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
                        "beacon": "weaviate://localhost/f33b39a7-6d3f-3f4b-a7c7-b2824502489c",
                        "href": "/v1/objects/f33b39a7-6d3f-3f4b-a7c7-b2824502489c"
                    },
                    {
                        "beacon": "weaviate://localhost/5533609c-959e-38b0-9488-83ba7d5fe440",
                        "href": "/v1/objects/5533609c-959e-38b0-9488-83ba7d5fe440"
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
                        "beacon": "weaviate://localhost/dd847b10-cae3-30c6-aaef-d1b99ccd03f3",
                        "href": "/v1/objects/dd847b10-cae3-30c6-aaef-d1b99ccd03f3"
                    },
                    {
                        "beacon": "weaviate://localhost/6ac3fcd4-535e-37ee-8470-8e16e94935d9",
                        "href": "/v1/objects/6ac3fcd4-535e-37ee-8470-8e16e94935d9"
                    },
                    {
                        "beacon": "weaviate://localhost/3fcc3861-351f-3e9c-8e9e-9d9ed76f4bc8",
                        "href": "/v1/objects/3fcc3861-351f-3e9c-8e9e-9d9ed76f4bc8"
                    },
                    {
                        "beacon": "weaviate://localhost/27ce2fa1-7d97-320b-b899-2115268f7e27",
                        "href": "/v1/objects/27ce2fa1-7d97-320b-b899-2115268f7e27"
                    },
                    {
                        "beacon": "weaviate://localhost/da8ff6ed-d5a9-3624-a279-e149e21b8c03",
                        "href": "/v1/objects/da8ff6ed-d5a9-3624-a279-e149e21b8c03"
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
                        "beacon": "weaviate://localhost/15bb912f-6bc5-3e1a-b8b6-3d77c6855395",
                        "href": "/v1/objects/15bb912f-6bc5-3e1a-b8b6-3d77c6855395"
                    },
                    {
                        "beacon": "weaviate://localhost/581d2d11-3474-3057-89e1-5ef3f9bf4646",
                        "href": "/v1/objects/581d2d11-3474-3057-89e1-5ef3f9bf4646"
                    },
                    {
                        "beacon": "weaviate://localhost/c07dacff-f9c2-34fc-a33b-4fa5ae73fc17",
                        "href": "/v1/objects/c07dacff-f9c2-34fc-a33b-4fa5ae73fc17"
                    },
                    {
                        "beacon": "weaviate://localhost/c9eddd49-93b4-3cb6-8091-bea448ce2297",
                        "href": "/v1/objects/c9eddd49-93b4-3cb6-8091-bea448ce2297"
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
                        "beacon": "weaviate://localhost/43d21a47-9835-3217-9ccb-b324579050d6",
                        "href": "/v1/objects/43d21a47-9835-3217-9ccb-b324579050d6"
                    },
                    {
                        "beacon": "weaviate://localhost/6d3c3140-cae8-3103-9596-a273c08cdf8a",
                        "href": "/v1/objects/6d3c3140-cae8-3103-9596-a273c08cdf8a"
                    },
                    {
                        "beacon": "weaviate://localhost/096efb41-62ff-30d6-beb1-c4a097f632e1",
                        "href": "/v1/objects/096efb41-62ff-30d6-beb1-c4a097f632e1"
                    },
                    {
                        "beacon": "weaviate://localhost/07ae6d42-4bd1-3fbd-ae14-86b498e65573",
                        "href": "/v1/objects/07ae6d42-4bd1-3fbd-ae14-86b498e65573"
                    },
                    {
                        "beacon": "weaviate://localhost/d032f745-143c-3da9-9294-bffe2098a239",
                        "href": "/v1/objects/d032f745-143c-3da9-9294-bffe2098a239"
                    },
                    {
                        "beacon": "weaviate://localhost/b3aa5532-8584-3f4a-8a45-ec0752face4c",
                        "href": "/v1/objects/b3aa5532-8584-3f4a-8a45-ec0752face4c"
                    },
                    {
                        "beacon": "weaviate://localhost/db204a79-c629-322a-a895-0acae3b5def6",
                        "href": "/v1/objects/db204a79-c629-322a-a895-0acae3b5def6"
                    },
                    {
                        "beacon": "weaviate://localhost/1b034be2-ea1f-3ff7-b2a5-2dcf70387062",
                        "href": "/v1/objects/1b034be2-ea1f-3ff7-b2a5-2dcf70387062"
                    },
                    {
                        "beacon": "weaviate://localhost/c1797f0e-d430-3360-b77a-b81f5c05d399",
                        "href": "/v1/objects/c1797f0e-d430-3360-b77a-b81f5c05d399"
                    },
                    {
                        "beacon": "weaviate://localhost/09f2d327-c70f-3a37-9228-c9f3bf24a316",
                        "href": "/v1/objects/09f2d327-c70f-3a37-9228-c9f3bf24a316"
                    },
                    {
                        "beacon": "weaviate://localhost/bce890a7-4cca-3311-9555-c10c82ed4ddc",
                        "href": "/v1/objects/bce890a7-4cca-3311-9555-c10c82ed4ddc"
                    },
                    {
                        "beacon": "weaviate://localhost/e508ce86-05a6-3134-a65f-27e916fc8cc7",
                        "href": "/v1/objects/e508ce86-05a6-3134-a65f-27e916fc8cc7"
                    },
                    {
                        "beacon": "weaviate://localhost/ed0cd21d-7b6e-3f8a-85d3-caefda235c81",
                        "href": "/v1/objects/ed0cd21d-7b6e-3f8a-85d3-caefda235c81"
                    },
                    {
                        "beacon": "weaviate://localhost/787c1de1-a84b-3099-8154-a9231b50683a",
                        "href": "/v1/objects/787c1de1-a84b-3099-8154-a9231b50683a"
                    },
                    {
                        "beacon": "weaviate://localhost/6eed7356-30b9-314c-bd50-b796b83f1b3d",
                        "href": "/v1/objects/6eed7356-30b9-314c-bd50-b796b83f1b3d"
                    },
                    {
                        "beacon": "weaviate://localhost/743c83a2-25bb-31aa-961e-7e8a0f471dec",
                        "href": "/v1/objects/743c83a2-25bb-31aa-961e-7e8a0f471dec"
                    },
                    {
                        "beacon": "weaviate://localhost/8649fd70-1a5d-304e-babe-7c5d59662ce3",
                        "href": "/v1/objects/8649fd70-1a5d-304e-babe-7c5d59662ce3"
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
                        "beacon": "weaviate://localhost/50be8440-4512-3417-b0b9-8a79d1916d72",
                        "href": "/v1/objects/50be8440-4512-3417-b0b9-8a79d1916d72"
                    },
                    {
                        "beacon": "weaviate://localhost/7a595c71-7d4d-3f72-8d4f-25050aec9623",
                        "href": "/v1/objects/7a595c71-7d4d-3f72-8d4f-25050aec9623"
                    },
                    {
                        "beacon": "weaviate://localhost/0b60a2b6-c5f0-37fa-88be-54f8c4bbf6c2",
                        "href": "/v1/objects/0b60a2b6-c5f0-37fa-88be-54f8c4bbf6c2"
                    },
                    {
                        "beacon": "weaviate://localhost/ca0f7b26-3f45-31cd-95b9-7c2d23023106",
                        "href": "/v1/objects/ca0f7b26-3f45-31cd-95b9-7c2d23023106"
                    },
                    {
                        "beacon": "weaviate://localhost/5e338b9a-287d-3642-b4d8-19a48fce6ef3",
                        "href": "/v1/objects/5e338b9a-287d-3642-b4d8-19a48fce6ef3"
                    },
                    {
                        "beacon": "weaviate://localhost/dc3a3d76-753f-3bcb-98f2-674a79ef3d29",
                        "href": "/v1/objects/dc3a3d76-753f-3bcb-98f2-674a79ef3d29"
                    },
                    {
                        "beacon": "weaviate://localhost/01db6f4c-8949-3e81-b16d-451f51d1215d",
                        "href": "/v1/objects/01db6f4c-8949-3e81-b16d-451f51d1215d"
                    },
                    {
                        "beacon": "weaviate://localhost/b1a267c9-e66b-3caf-b362-bceb9413e8a7",
                        "href": "/v1/objects/b1a267c9-e66b-3caf-b362-bceb9413e8a7"
                    },
                    {
                        "beacon": "weaviate://localhost/732ec479-6234-36e8-ab28-7763b90a7860",
                        "href": "/v1/objects/732ec479-6234-36e8-ab28-7763b90a7860"
                    },
                    {
                        "beacon": "weaviate://localhost/73a8c2a1-8eb1-3db3-8bd6-9d7f83e78c45",
                        "href": "/v1/objects/73a8c2a1-8eb1-3db3-8bd6-9d7f83e78c45"
                    },
                    {
                        "beacon": "weaviate://localhost/cd892eaa-35c2-307d-a899-15c980b9f74b",
                        "href": "/v1/objects/cd892eaa-35c2-307d-a899-15c980b9f74b"
                    },
                    {
                        "beacon": "weaviate://localhost/db85605f-f24c-3317-9c67-107e59d69c90",
                        "href": "/v1/objects/db85605f-f24c-3317-9c67-107e59d69c90"
                    },
                    {
                        "beacon": "weaviate://localhost/a4e9e687-2519-3822-a68e-7cc803316e13",
                        "href": "/v1/objects/a4e9e687-2519-3822-a68e-7cc803316e13"
                    },
                    {
                        "beacon": "weaviate://localhost/16dd074a-5800-3c51-8876-9f5e76c1ace7",
                        "href": "/v1/objects/16dd074a-5800-3c51-8876-9f5e76c1ace7"
                    },
                    {
                        "beacon": "weaviate://localhost/4835a279-93d1-3678-ac75-a177ea70f5a8",
                        "href": "/v1/objects/4835a279-93d1-3678-ac75-a177ea70f5a8"
                    },
                    {
                        "beacon": "weaviate://localhost/c569b762-6eb8-3288-ac0b-37cbcaea5342",
                        "href": "/v1/objects/c569b762-6eb8-3288-ac0b-37cbcaea5342"
                    },
                    {
                        "beacon": "weaviate://localhost/e623c099-e0f6-3fd2-9a84-fd272b1c3cba",
                        "href": "/v1/objects/e623c099-e0f6-3fd2-9a84-fd272b1c3cba"
                    },
                    {
                        "beacon": "weaviate://localhost/6d8e5e7c-b725-3c4d-ab42-ec9b680b5f05",
                        "href": "/v1/objects/6d8e5e7c-b725-3c4d-ab42-ec9b680b5f05"
                    },
                    {
                        "beacon": "weaviate://localhost/fe81e874-d83f-3813-84af-a4a3d9b8c90f",
                        "href": "/v1/objects/fe81e874-d83f-3813-84af-a4a3d9b8c90f"
                    },
                    {
                        "beacon": "weaviate://localhost/545a304c-4b53-326d-875e-afb324fad73a",
                        "href": "/v1/objects/545a304c-4b53-326d-875e-afb324fad73a"
                    },
                    {
                        "beacon": "weaviate://localhost/ea7f07c3-f38e-3747-a0c4-3ad0727b663e",
                        "href": "/v1/objects/ea7f07c3-f38e-3747-a0c4-3ad0727b663e"
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
                        "beacon": "weaviate://localhost/677b38ae-0682-34d3-9bf2-7f4975bb2592",
                        "href": "/v1/objects/677b38ae-0682-34d3-9bf2-7f4975bb2592"
                    },
                    {
                        "beacon": "weaviate://localhost/d7165bee-50e3-3b83-a67d-1e43d35ea0dd",
                        "href": "/v1/objects/d7165bee-50e3-3b83-a67d-1e43d35ea0dd"
                    },
                    {
                        "beacon": "weaviate://localhost/2e693c8f-998c-3cfa-a697-bcb2a1032358",
                        "href": "/v1/objects/2e693c8f-998c-3cfa-a697-bcb2a1032358"
                    },
                    {
                        "beacon": "weaviate://localhost/e898d8bd-c5d4-3108-ad1e-8e874e14f096",
                        "href": "/v1/objects/e898d8bd-c5d4-3108-ad1e-8e874e14f096"
                    },
                    {
                        "beacon": "weaviate://localhost/d10b6660-464e-31de-b971-feec8111ff08",
                        "href": "/v1/objects/d10b6660-464e-31de-b971-feec8111ff08"
                    },
                    {
                        "beacon": "weaviate://localhost/e9d4356a-f2ba-301e-8a57-7b70d6a15544",
                        "href": "/v1/objects/e9d4356a-f2ba-301e-8a57-7b70d6a15544"
                    },
                    {
                        "beacon": "weaviate://localhost/179ffcc3-d05f-30ed-ad7b-15129a285a34",
                        "href": "/v1/objects/179ffcc3-d05f-30ed-ad7b-15129a285a34"
                    },
                    {
                        "beacon": "weaviate://localhost/bf99553f-2ca9-3dc6-8774-69fe748baf0f",
                        "href": "/v1/objects/bf99553f-2ca9-3dc6-8774-69fe748baf0f"
                    },
                    {
                        "beacon": "weaviate://localhost/171c6d66-77da-34b6-a940-33c5ad45de7f",
                        "href": "/v1/objects/171c6d66-77da-34b6-a940-33c5ad45de7f"
                    },
                    {
                        "beacon": "weaviate://localhost/f81a5227-036a-3e18-9270-58e3d2541370",
                        "href": "/v1/objects/f81a5227-036a-3e18-9270-58e3d2541370"
                    },
                    {
                        "beacon": "weaviate://localhost/09feebaf-bbbb-34d7-abed-019bfe623990",
                        "href": "/v1/objects/09feebaf-bbbb-34d7-abed-019bfe623990"
                    },
                    {
                        "beacon": "weaviate://localhost/28ba781f-8d5f-3664-b771-a3d7ce7d7450",
                        "href": "/v1/objects/28ba781f-8d5f-3664-b771-a3d7ce7d7450"
                    },
                    {
                        "beacon": "weaviate://localhost/f0974c94-d6c0-3567-ae19-d77d19e9d2f5",
                        "href": "/v1/objects/f0974c94-d6c0-3567-ae19-d77d19e9d2f5"
                    },
                    {
                        "beacon": "weaviate://localhost/26572580-fc4d-3fd9-a49b-5c0c15866d44",
                        "href": "/v1/objects/26572580-fc4d-3fd9-a49b-5c0c15866d44"
                    },
                    {
                        "beacon": "weaviate://localhost/6e9aca6b-e69a-3f8e-8216-8d1aef12594b",
                        "href": "/v1/objects/6e9aca6b-e69a-3f8e-8216-8d1aef12594b"
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
                        "beacon": "weaviate://localhost/d3e56751-dabe-3344-be76-b7685221b85a",
                        "href": "/v1/objects/d3e56751-dabe-3344-be76-b7685221b85a"
                    },
                    {
                        "beacon": "weaviate://localhost/3d3f660a-6df5-343e-b446-699dc5d3f184",
                        "href": "/v1/objects/3d3f660a-6df5-343e-b446-699dc5d3f184"
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
                        "beacon": "weaviate://localhost/4f4a3caf-bcb5-3a10-8d7d-b3d35e8fec41",
                        "href": "/v1/objects/4f4a3caf-bcb5-3a10-8d7d-b3d35e8fec41"
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
                        "beacon": "weaviate://localhost/07071f96-2fdc-3fef-b490-9c435068d82e",
                        "href": "/v1/objects/07071f96-2fdc-3fef-b490-9c435068d82e"
                    },
                    {
                        "beacon": "weaviate://localhost/32a4818a-dd4a-35fe-be9c-ca499ea23e6e",
                        "href": "/v1/objects/32a4818a-dd4a-35fe-be9c-ca499ea23e6e"
                    },
                    {
                        "beacon": "weaviate://localhost/e48040ac-590b-3241-91ef-598585a0cb25",
                        "href": "/v1/objects/e48040ac-590b-3241-91ef-598585a0cb25"
                    },
                    {
                        "beacon": "weaviate://localhost/33310309-9b14-36db-a488-e1628f34fb43",
                        "href": "/v1/objects/33310309-9b14-36db-a488-e1628f34fb43"
                    },
                    {
                        "beacon": "weaviate://localhost/5fb7fb57-6e98-3a10-8e92-d482a1155481",
                        "href": "/v1/objects/5fb7fb57-6e98-3a10-8e92-d482a1155481"
                    },
                    {
                        "beacon": "weaviate://localhost/cec9a8d9-67a7-3796-9509-a23840a511f9",
                        "href": "/v1/objects/cec9a8d9-67a7-3796-9509-a23840a511f9"
                    },
                    {
                        "beacon": "weaviate://localhost/4ba2af0a-2e6e-36e8-af41-d121854c74fe",
                        "href": "/v1/objects/4ba2af0a-2e6e-36e8-af41-d121854c74fe"
                    },
                    {
                        "beacon": "weaviate://localhost/cce6b0ca-748c-319a-a32a-fa24490a325e",
                        "href": "/v1/objects/cce6b0ca-748c-319a-a32a-fa24490a325e"
                    },
                    {
                        "beacon": "weaviate://localhost/4775157e-2831-30d0-bc26-3d71b743fd56",
                        "href": "/v1/objects/4775157e-2831-30d0-bc26-3d71b743fd56"
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
                        "beacon": "weaviate://localhost/13a94180-2f01-38b7-a821-3d99d1b477a5",
                        "href": "/v1/objects/13a94180-2f01-38b7-a821-3d99d1b477a5"
                    },
                    {
                        "beacon": "weaviate://localhost/041a7db8-2dc0-3ace-8111-f860e2718c1f",
                        "href": "/v1/objects/041a7db8-2dc0-3ace-8111-f860e2718c1f"
                    },
                    {
                        "beacon": "weaviate://localhost/744e3d5c-4f1f-37ce-b5b1-602a1ba09d04",
                        "href": "/v1/objects/744e3d5c-4f1f-37ce-b5b1-602a1ba09d04"
                    },
                    {
                        "beacon": "weaviate://localhost/a6d5b4fc-9a34-3101-a861-3f1b6901e349",
                        "href": "/v1/objects/a6d5b4fc-9a34-3101-a861-3f1b6901e349"
                    },
                    {
                        "beacon": "weaviate://localhost/a6538667-84df-3259-a6f0-e69b2043bb59",
                        "href": "/v1/objects/a6538667-84df-3259-a6f0-e69b2043bb59"
                    },
                    {
                        "beacon": "weaviate://localhost/96667caa-eb62-3753-88f4-734585a02242",
                        "href": "/v1/objects/96667caa-eb62-3753-88f4-734585a02242"
                    },
                    {
                        "beacon": "weaviate://localhost/0d5f763c-0917-32ab-b90a-8cf12265971a",
                        "href": "/v1/objects/0d5f763c-0917-32ab-b90a-8cf12265971a"
                    },
                    {
                        "beacon": "weaviate://localhost/805f3fab-98fb-3820-873e-498d35ed9fc9",
                        "href": "/v1/objects/805f3fab-98fb-3820-873e-498d35ed9fc9"
                    },
                    {
                        "beacon": "weaviate://localhost/26e2bc0f-f697-3b4e-8fd1-20ba4713736a",
                        "href": "/v1/objects/26e2bc0f-f697-3b4e-8fd1-20ba4713736a"
                    },
                    {
                        "beacon": "weaviate://localhost/d9bfaf20-754d-3889-915a-b9dd5fa15e8c",
                        "href": "/v1/objects/d9bfaf20-754d-3889-915a-b9dd5fa15e8c"
                    },
                    {
                        "beacon": "weaviate://localhost/656097d4-390c-399c-8e58-6ee55d91b8ad",
                        "href": "/v1/objects/656097d4-390c-399c-8e58-6ee55d91b8ad"
                    },
                    {
                        "beacon": "weaviate://localhost/db68c7f6-b978-3007-9c6d-b7c8d6d35add",
                        "href": "/v1/objects/db68c7f6-b978-3007-9c6d-b7c8d6d35add"
                    },
                    {
                        "beacon": "weaviate://localhost/af19b360-dfd5-30f6-b885-7030d1178c92",
                        "href": "/v1/objects/af19b360-dfd5-30f6-b885-7030d1178c92"
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
                        "beacon": "weaviate://localhost/30a1707e-14d5-31fe-ac97-8b74e8cfa0b9",
                        "href": "/v1/objects/30a1707e-14d5-31fe-ac97-8b74e8cfa0b9"
                    },
                    {
                        "beacon": "weaviate://localhost/a2e1894e-8483-348c-8ffa-a2e5d1aefbaf",
                        "href": "/v1/objects/a2e1894e-8483-348c-8ffa-a2e5d1aefbaf"
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
                        "beacon": "weaviate://localhost/ac3b2d2f-9238-3f60-83f3-36a29307e51d",
                        "href": "/v1/objects/ac3b2d2f-9238-3f60-83f3-36a29307e51d"
                    },
                    {
                        "beacon": "weaviate://localhost/21f853a1-187b-3ea9-a5da-fa887c007af2",
                        "href": "/v1/objects/21f853a1-187b-3ea9-a5da-fa887c007af2"
                    },
                    {
                        "beacon": "weaviate://localhost/7a189687-8191-3e95-bfa3-be568782f0f5",
                        "href": "/v1/objects/7a189687-8191-3e95-bfa3-be568782f0f5"
                    },
                    {
                        "beacon": "weaviate://localhost/3d29d312-f8dc-35e0-9c33-ca819b3cc8f9",
                        "href": "/v1/objects/3d29d312-f8dc-35e0-9c33-ca819b3cc8f9"
                    },
                    {
                        "beacon": "weaviate://localhost/239f842d-22ab-3034-b5fa-0ab242224042",
                        "href": "/v1/objects/239f842d-22ab-3034-b5fa-0ab242224042"
                    },
                    {
                        "beacon": "weaviate://localhost/904d2278-e38a-3a0e-a8c3-5329bef5cfd6",
                        "href": "/v1/objects/904d2278-e38a-3a0e-a8c3-5329bef5cfd6"
                    },
                    {
                        "beacon": "weaviate://localhost/0cea38a5-0d86-339d-8a7b-256ddd183d5c",
                        "href": "/v1/objects/0cea38a5-0d86-339d-8a7b-256ddd183d5c"
                    },
                    {
                        "beacon": "weaviate://localhost/713ab248-3a96-368e-bf51-5ba72fec7952",
                        "href": "/v1/objects/713ab248-3a96-368e-bf51-5ba72fec7952"
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
            "class": "Publication",
            "creationTimeUnix": 1618580853819,
            "id": "c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "properties": {
                "hasArticles": [
                    {
                        "beacon": "weaviate://localhost/1b5a45d6-ff81-310a-8805-008118b3da1a",
                        "href": "/v1/objects/1b5a45d6-ff81-310a-8805-008118b3da1a"
                    },
                    {
                        "beacon": "weaviate://localhost/70089698-b50c-3430-b9db-2e44a9fbb987",
                        "href": "/v1/objects/70089698-b50c-3430-b9db-2e44a9fbb987"
                    },
                    {
                        "beacon": "weaviate://localhost/94ed5c47-27de-3666-9c51-be140b1796b8",
                        "href": "/v1/objects/94ed5c47-27de-3666-9c51-be140b1796b8"
                    },
                    {
                        "beacon": "weaviate://localhost/28421e61-8a95-3aee-8929-a8d26dfd87d9",
                        "href": "/v1/objects/28421e61-8a95-3aee-8929-a8d26dfd87d9"
                    },
                    {
                        "beacon": "weaviate://localhost/00327619-fdfa-37cd-a003-5d2e66ae2fec",
                        "href": "/v1/objects/00327619-fdfa-37cd-a003-5d2e66ae2fec"
                    },
                    {
                        "beacon": "weaviate://localhost/439a4645-40d4-3fe1-8b5a-67a8c6b7fa33",
                        "href": "/v1/objects/439a4645-40d4-3fe1-8b5a-67a8c6b7fa33"
                    },
                    {
                        "beacon": "weaviate://localhost/f1f23cee-763c-3e97-adbd-d3020e30a59f",
                        "href": "/v1/objects/f1f23cee-763c-3e97-adbd-d3020e30a59f"
                    },
                    {
                        "beacon": "weaviate://localhost/a2b28dbc-42b9-3705-bf46-5ebba5b2058e",
                        "href": "/v1/objects/a2b28dbc-42b9-3705-bf46-5ebba5b2058e"
                    },
                    {
                        "beacon": "weaviate://localhost/76c8c418-60ab-322f-b3d2-174680025dc2",
                        "href": "/v1/objects/76c8c418-60ab-322f-b3d2-174680025dc2"
                    },
                    {
                        "beacon": "weaviate://localhost/ec083038-17d6-3d10-b3c6-f2d4b2519733",
                        "href": "/v1/objects/ec083038-17d6-3d10-b3c6-f2d4b2519733"
                    },
                    {
                        "beacon": "weaviate://localhost/42c22ceb-f1c5-3943-a2ee-e014cd2b1cc1",
                        "href": "/v1/objects/42c22ceb-f1c5-3943-a2ee-e014cd2b1cc1"
                    },
                    {
                        "beacon": "weaviate://localhost/1e2f3bca-56e7-35d7-bb42-227cb6380a7a",
                        "href": "/v1/objects/1e2f3bca-56e7-35d7-bb42-227cb6380a7a"
                    },
                    {
                        "beacon": "weaviate://localhost/a41d41ad-e7bf-372e-a66e-5bbd79ac7964",
                        "href": "/v1/objects/a41d41ad-e7bf-372e-a66e-5bbd79ac7964"
                    },
                    {
                        "beacon": "weaviate://localhost/57f94e77-0077-3923-a2fc-35317d9a95a5",
                        "href": "/v1/objects/57f94e77-0077-3923-a2fc-35317d9a95a5"
                    },
                    {
                        "beacon": "weaviate://localhost/6981f0a0-0762-3e4f-9f35-0e805f298cdc",
                        "href": "/v1/objects/6981f0a0-0762-3e4f-9f35-0e805f298cdc"
                    },
                    {
                        "beacon": "weaviate://localhost/7607d3d6-2915-3b1a-a6af-a0a3b00e6099",
                        "href": "/v1/objects/7607d3d6-2915-3b1a-a6af-a0a3b00e6099"
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
                        "beacon": "weaviate://localhost/7697f4ee-7478-30f6-9009-cf197c66b08e",
                        "href": "/v1/objects/7697f4ee-7478-30f6-9009-cf197c66b08e"
                    },
                    {
                        "beacon": "weaviate://localhost/cc1d6f0f-3a15-39b8-a7d0-3535e618fc38",
                        "href": "/v1/objects/cc1d6f0f-3a15-39b8-a7d0-3535e618fc38"
                    },
                    {
                        "beacon": "weaviate://localhost/42f38f40-a799-37f0-a8f7-53000232be42",
                        "href": "/v1/objects/42f38f40-a799-37f0-a8f7-53000232be42"
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
                        "beacon": "weaviate://localhost/a9cf37c3-fad9-3be6-8c00-dda21dad1dce",
                        "href": "/v1/objects/a9cf37c3-fad9-3be6-8c00-dda21dad1dce"
                    },
                    {
                        "beacon": "weaviate://localhost/6ea08723-47de-3fe9-99a9-dd677b02903d",
                        "href": "/v1/objects/6ea08723-47de-3fe9-99a9-dd677b02903d"
                    },
                    {
                        "beacon": "weaviate://localhost/7c091cfb-8a7b-3643-9ce9-4694f5b3be3d",
                        "href": "/v1/objects/7c091cfb-8a7b-3643-9ce9-4694f5b3be3d"
                    },
                    {
                        "beacon": "weaviate://localhost/6c47b815-5221-321e-bac6-1857206259e3",
                        "href": "/v1/objects/6c47b815-5221-321e-bac6-1857206259e3"
                    },
                    {
                        "beacon": "weaviate://localhost/2f7f2ed8-2e10-3b1a-9fa0-81b6d89b4f38",
                        "href": "/v1/objects/2f7f2ed8-2e10-3b1a-9fa0-81b6d89b4f38"
                    },
                    {
                        "beacon": "weaviate://localhost/78d8431c-d45a-3270-bae6-6b752e2cd043",
                        "href": "/v1/objects/78d8431c-d45a-3270-bae6-6b752e2cd043"
                    },
                    {
                        "beacon": "weaviate://localhost/2bd33dd7-2a1d-3c76-9061-0dd54f5e1f8d",
                        "href": "/v1/objects/2bd33dd7-2a1d-3c76-9061-0dd54f5e1f8d"
                    },
                    {
                        "beacon": "weaviate://localhost/5f7314ef-e172-3564-923b-45218bcf9450",
                        "href": "/v1/objects/5f7314ef-e172-3564-923b-45218bcf9450"
                    },
                    {
                        "beacon": "weaviate://localhost/3dcd913c-d406-36ea-a091-86a6b2538abd",
                        "href": "/v1/objects/3dcd913c-d406-36ea-a091-86a6b2538abd"
                    },
                    {
                        "beacon": "weaviate://localhost/d7fdbff4-c4c7-3d2f-bcf0-91c386a2243a",
                        "href": "/v1/objects/d7fdbff4-c4c7-3d2f-bcf0-91c386a2243a"
                    },
                    {
                        "beacon": "weaviate://localhost/a12e9c1a-3a07-3aea-a273-b85f66d00976",
                        "href": "/v1/objects/a12e9c1a-3a07-3aea-a273-b85f66d00976"
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
                        "beacon": "weaviate://localhost/006aa6ce-1675-33a8-9fbc-b494ec7698b6",
                        "href": "/v1/objects/006aa6ce-1675-33a8-9fbc-b494ec7698b6"
                    },
                    {
                        "beacon": "weaviate://localhost/da176e3f-d5bd-3fc8-96f4-5f1556e24cd1",
                        "href": "/v1/objects/da176e3f-d5bd-3fc8-96f4-5f1556e24cd1"
                    },
                    {
                        "beacon": "weaviate://localhost/d395aa6c-342c-3c0c-b970-ac570e9dafef",
                        "href": "/v1/objects/d395aa6c-342c-3c0c-b970-ac570e9dafef"
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
                        "beacon": "weaviate://localhost/1fbf750a-0ac7-3c35-9f13-9a2ab3f2392a",
                        "href": "/v1/objects/1fbf750a-0ac7-3c35-9f13-9a2ab3f2392a"
                    },
                    {
                        "beacon": "weaviate://localhost/6c4603a8-086d-3a1b-9c60-7b47512f771c",
                        "href": "/v1/objects/6c4603a8-086d-3a1b-9c60-7b47512f771c"
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
                        "beacon": "weaviate://localhost/d78e9af4-687d-3864-b87b-6d4396f0fe26",
                        "href": "/v1/objects/d78e9af4-687d-3864-b87b-6d4396f0fe26"
                    },
                    {
                        "beacon": "weaviate://localhost/f564650f-a846-3c04-b64a-4d65a4591740",
                        "href": "/v1/objects/f564650f-a846-3c04-b64a-4d65a4591740"
                    },
                    {
                        "beacon": "weaviate://localhost/0c759544-e26e-3c11-840a-d1d853e32fe7",
                        "href": "/v1/objects/0c759544-e26e-3c11-840a-d1d853e32fe7"
                    },
                    {
                        "beacon": "weaviate://localhost/cf384ee6-3fc0-3f30-88e3-da2d971824b9",
                        "href": "/v1/objects/cf384ee6-3fc0-3f30-88e3-da2d971824b9"
                    },
                    {
                        "beacon": "weaviate://localhost/8b0adafc-b3c3-3631-962e-70685d6483b7",
                        "href": "/v1/objects/8b0adafc-b3c3-3631-962e-70685d6483b7"
                    },
                    {
                        "beacon": "weaviate://localhost/ccebf3ba-fb38-30f0-ac1b-044bacda1a90",
                        "href": "/v1/objects/ccebf3ba-fb38-30f0-ac1b-044bacda1a90"
                    },
                    {
                        "beacon": "weaviate://localhost/fa5b7c6a-21c4-3eb2-8f21-36cc80f6942b",
                        "href": "/v1/objects/fa5b7c6a-21c4-3eb2-8f21-36cc80f6942b"
                    },
                    {
                        "beacon": "weaviate://localhost/7e231fb5-45b8-3005-b5c9-bde8d2f488bc",
                        "href": "/v1/objects/7e231fb5-45b8-3005-b5c9-bde8d2f488bc"
                    },
                    {
                        "beacon": "weaviate://localhost/f5ff6dc1-eca6-34c6-bdbc-c38ad6ad63d8",
                        "href": "/v1/objects/f5ff6dc1-eca6-34c6-bdbc-c38ad6ad63d8"
                    },
                    {
                        "beacon": "weaviate://localhost/21061410-05df-3e9f-9cfd-20207041846c",
                        "href": "/v1/objects/21061410-05df-3e9f-9cfd-20207041846c"
                    },
                    {
                        "beacon": "weaviate://localhost/c609f8e2-9888-31ab-ac3c-ca92fcbae6e7",
                        "href": "/v1/objects/c609f8e2-9888-31ab-ac3c-ca92fcbae6e7"
                    },
                    {
                        "beacon": "weaviate://localhost/c152bab4-2db0-3cdb-9920-3040807e441c",
                        "href": "/v1/objects/c152bab4-2db0-3cdb-9920-3040807e441c"
                    },
                    {
                        "beacon": "weaviate://localhost/4d328b28-1e10-35bb-b8e7-07ee26a3d7e5",
                        "href": "/v1/objects/4d328b28-1e10-35bb-b8e7-07ee26a3d7e5"
                    },
                    {
                        "beacon": "weaviate://localhost/c77fc1a2-2bdc-3049-952f-b645d78e3b0f",
                        "href": "/v1/objects/c77fc1a2-2bdc-3049-952f-b645d78e3b0f"
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
                        "beacon": "weaviate://localhost/7707127d-32c0-3ec6-8cfc-45eb62415a36",
                        "href": "/v1/objects/7707127d-32c0-3ec6-8cfc-45eb62415a36"
                    },
                    {
                        "beacon": "weaviate://localhost/c096e2e5-6757-383e-a699-dc8a5e82d479",
                        "href": "/v1/objects/c096e2e5-6757-383e-a699-dc8a5e82d479"
                    },
                    {
                        "beacon": "weaviate://localhost/a1c10da1-a087-3fc7-b054-735bc5fb00e9",
                        "href": "/v1/objects/a1c10da1-a087-3fc7-b054-735bc5fb00e9"
                    },
                    {
                        "beacon": "weaviate://localhost/fd81f75b-a8ba-3101-8d7a-f49af96ddcaf",
                        "href": "/v1/objects/fd81f75b-a8ba-3101-8d7a-f49af96ddcaf"
                    },
                    {
                        "beacon": "weaviate://localhost/8ee98f58-0637-300b-9f34-8dd8ecfb3e61",
                        "href": "/v1/objects/8ee98f58-0637-300b-9f34-8dd8ecfb3e61"
                    },
                    {
                        "beacon": "weaviate://localhost/cf8f49f1-63bf-3212-a717-a2b355a35718",
                        "href": "/v1/objects/cf8f49f1-63bf-3212-a717-a2b355a35718"
                    },
                    {
                        "beacon": "weaviate://localhost/16a2afdd-9fde-36cc-9181-75d00850f7c5",
                        "href": "/v1/objects/16a2afdd-9fde-36cc-9181-75d00850f7c5"
                    },
                    {
                        "beacon": "weaviate://localhost/173934bc-871c-35e4-a617-b53370b75fa0",
                        "href": "/v1/objects/173934bc-871c-35e4-a617-b53370b75fa0"
                    },
                    {
                        "beacon": "weaviate://localhost/700363ea-7776-30a2-bc6a-9d6c62c1462a",
                        "href": "/v1/objects/700363ea-7776-30a2-bc6a-9d6c62c1462a"
                    },
                    {
                        "beacon": "weaviate://localhost/39306d79-9d56-3ae5-a9be-37cbda7b5f60",
                        "href": "/v1/objects/39306d79-9d56-3ae5-a9be-37cbda7b5f60"
                    },
                    {
                        "beacon": "weaviate://localhost/810b15d7-48d6-3fde-a30d-d5170c397b7f",
                        "href": "/v1/objects/810b15d7-48d6-3fde-a30d-d5170c397b7f"
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
                        "beacon": "weaviate://localhost/8e64708b-9a78-36b6-a2ac-83cb134a9913",
                        "href": "/v1/objects/8e64708b-9a78-36b6-a2ac-83cb134a9913"
                    },
                    {
                        "beacon": "weaviate://localhost/eb83323c-fede-3ba2-b49a-e24debb18199",
                        "href": "/v1/objects/eb83323c-fede-3ba2-b49a-e24debb18199"
                    },
                    {
                        "beacon": "weaviate://localhost/3d01d047-9fff-3d68-954a-8994e4e50a6b",
                        "href": "/v1/objects/3d01d047-9fff-3d68-954a-8994e4e50a6b"
                    },
                    {
                        "beacon": "weaviate://localhost/ef45c5bb-1449-3c53-9545-9061ed970caf",
                        "href": "/v1/objects/ef45c5bb-1449-3c53-9545-9061ed970caf"
                    },
                    {
                        "beacon": "weaviate://localhost/d6c1059e-cd86-37ef-81ed-f1e3ee7cb793",
                        "href": "/v1/objects/d6c1059e-cd86-37ef-81ed-f1e3ee7cb793"
                    },
                    {
                        "beacon": "weaviate://localhost/5db7ace1-5f7b-3e77-b075-eb62bf85630a",
                        "href": "/v1/objects/5db7ace1-5f7b-3e77-b075-eb62bf85630a"
                    },
                    {
                        "beacon": "weaviate://localhost/b27801cf-02dd-3c3c-b09e-86cbab20086b",
                        "href": "/v1/objects/b27801cf-02dd-3c3c-b09e-86cbab20086b"
                    },
                    {
                        "beacon": "weaviate://localhost/dda7f0c8-8a09-35b4-9dd1-5bee2ac19e0b",
                        "href": "/v1/objects/dda7f0c8-8a09-35b4-9dd1-5bee2ac19e0b"
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
                        "beacon": "weaviate://localhost/3cbc77ee-770a-327b-8695-9fb67a532dbd",
                        "href": "/v1/objects/3cbc77ee-770a-327b-8695-9fb67a532dbd"
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
                        "beacon": "weaviate://localhost/7c0bb881-b038-351b-b2fd-7d5d7c10c19a",
                        "href": "/v1/objects/7c0bb881-b038-351b-b2fd-7d5d7c10c19a"
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
                        "beacon": "weaviate://localhost/73157180-c059-3502-828b-bab3f0a7e46c",
                        "href": "/v1/objects/73157180-c059-3502-828b-bab3f0a7e46c"
                    },
                    {
                        "beacon": "weaviate://localhost/215c15f9-3ade-3c34-8a2a-f710ab8b7051",
                        "href": "/v1/objects/215c15f9-3ade-3c34-8a2a-f710ab8b7051"
                    },
                    {
                        "beacon": "weaviate://localhost/9b58a23b-61d1-38e1-91ab-63df9f0e9eec",
                        "href": "/v1/objects/9b58a23b-61d1-38e1-91ab-63df9f0e9eec"
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
                        "beacon": "weaviate://localhost/5888ea1f-bd77-398a-a924-f7e85e20b276",
                        "href": "/v1/objects/5888ea1f-bd77-398a-a924-f7e85e20b276"
                    },
                    {
                        "beacon": "weaviate://localhost/d283871d-3c52-3dd9-83f4-715d3b1f6767",
                        "href": "/v1/objects/d283871d-3c52-3dd9-83f4-715d3b1f6767"
                    },
                    {
                        "beacon": "weaviate://localhost/454072f5-5a3b-3a22-8fc8-0e2e2c4c76f8",
                        "href": "/v1/objects/454072f5-5a3b-3a22-8fc8-0e2e2c4c76f8"
                    },
                    {
                        "beacon": "weaviate://localhost/3fff6c17-f2cc-31c2-baa3-1ee75d31115a",
                        "href": "/v1/objects/3fff6c17-f2cc-31c2-baa3-1ee75d31115a"
                    },
                    {
                        "beacon": "weaviate://localhost/b554760d-0088-359f-b70d-697ab8fbbfcb",
                        "href": "/v1/objects/b554760d-0088-359f-b70d-697ab8fbbfcb"
                    },
                    {
                        "beacon": "weaviate://localhost/5ddb714e-1359-36dd-9cc5-721e8e7568ea",
                        "href": "/v1/objects/5ddb714e-1359-36dd-9cc5-721e8e7568ea"
                    },
                    {
                        "beacon": "weaviate://localhost/906cd092-ceb9-379d-bd74-69d42a8544a2",
                        "href": "/v1/objects/906cd092-ceb9-379d-bd74-69d42a8544a2"
                    },
                    {
                        "beacon": "weaviate://localhost/58b1909f-a6c1-3980-8985-c293cd66b2f6",
                        "href": "/v1/objects/58b1909f-a6c1-3980-8985-c293cd66b2f6"
                    },
                    {
                        "beacon": "weaviate://localhost/bb5c7fc7-0d94-3dab-a5db-a043bf669a68",
                        "href": "/v1/objects/bb5c7fc7-0d94-3dab-a5db-a043bf669a68"
                    },
                    {
                        "beacon": "weaviate://localhost/6da38bdb-c3f8-3a6e-968d-258a1651094f",
                        "href": "/v1/objects/6da38bdb-c3f8-3a6e-968d-258a1651094f"
                    },
                    {
                        "beacon": "weaviate://localhost/97459832-ee16-3388-8c91-ee85ba3bd4ab",
                        "href": "/v1/objects/97459832-ee16-3388-8c91-ee85ba3bd4ab"
                    },
                    {
                        "beacon": "weaviate://localhost/ed382768-7d94-3c57-8847-1e4ea92d6620",
                        "href": "/v1/objects/ed382768-7d94-3c57-8847-1e4ea92d6620"
                    },
                    {
                        "beacon": "weaviate://localhost/a9a6beb2-7a78-31e8-9187-059d104586ba",
                        "href": "/v1/objects/a9a6beb2-7a78-31e8-9187-059d104586ba"
                    },
                    {
                        "beacon": "weaviate://localhost/0b77fa52-44b2-3dbc-bdee-a3a09f150498",
                        "href": "/v1/objects/0b77fa52-44b2-3dbc-bdee-a3a09f150498"
                    },
                    {
                        "beacon": "weaviate://localhost/7b42379f-6609-32c9-b313-20137f3a9e39",
                        "href": "/v1/objects/7b42379f-6609-32c9-b313-20137f3a9e39"
                    },
                    {
                        "beacon": "weaviate://localhost/23a18906-8c54-360e-af7a-fd54fe102e06",
                        "href": "/v1/objects/23a18906-8c54-360e-af7a-fd54fe102e06"
                    },
                    {
                        "beacon": "weaviate://localhost/78abf6c3-0cf1-3bbc-8b04-2fee672ee650",
                        "href": "/v1/objects/78abf6c3-0cf1-3bbc-8b04-2fee672ee650"
                    },
                    {
                        "beacon": "weaviate://localhost/cb58d37d-db70-3788-98b1-f56ad403ccdc",
                        "href": "/v1/objects/cb58d37d-db70-3788-98b1-f56ad403ccdc"
                    },
                    {
                        "beacon": "weaviate://localhost/558f0e1f-4e14-3ab0-a3ca-faf62a3c85de",
                        "href": "/v1/objects/558f0e1f-4e14-3ab0-a3ca-faf62a3c85de"
                    },
                    {
                        "beacon": "weaviate://localhost/e09b93b6-4e84-345d-928a-6d81e0598978",
                        "href": "/v1/objects/e09b93b6-4e84-345d-928a-6d81e0598978"
                    },
                    {
                        "beacon": "weaviate://localhost/409dabf5-b6f7-3faf-8773-91684f6d17a0",
                        "href": "/v1/objects/409dabf5-b6f7-3faf-8773-91684f6d17a0"
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
                        "beacon": "weaviate://localhost/70424478-7c59-367e-8bda-95d2d7da55d0",
                        "href": "/v1/objects/70424478-7c59-367e-8bda-95d2d7da55d0"
                    },
                    {
                        "beacon": "weaviate://localhost/5efe1f08-01e0-37a9-8f3e-e699f6cf0745",
                        "href": "/v1/objects/5efe1f08-01e0-37a9-8f3e-e699f6cf0745"
                    },
                    {
                        "beacon": "weaviate://localhost/d28caf67-627e-34a2-ab7f-23c110ae52d7",
                        "href": "/v1/objects/d28caf67-627e-34a2-ab7f-23c110ae52d7"
                    },
                    {
                        "beacon": "weaviate://localhost/d940bf7c-bdb2-300f-a362-021af533d49b",
                        "href": "/v1/objects/d940bf7c-bdb2-300f-a362-021af533d49b"
                    },
                    {
                        "beacon": "weaviate://localhost/e44a9736-3b2f-3c56-a670-ab6c145968da",
                        "href": "/v1/objects/e44a9736-3b2f-3c56-a670-ab6c145968da"
                    },
                    {
                        "beacon": "weaviate://localhost/59b20c33-4d2d-3eb7-8f83-8ed397e21310",
                        "href": "/v1/objects/59b20c33-4d2d-3eb7-8f83-8ed397e21310"
                    },
                    {
                        "beacon": "weaviate://localhost/dc13f121-cbdb-3e13-a08f-e1e5071872d1",
                        "href": "/v1/objects/dc13f121-cbdb-3e13-a08f-e1e5071872d1"
                    },
                    {
                        "beacon": "weaviate://localhost/594a1c28-f145-306d-9526-5602c528d5d8",
                        "href": "/v1/objects/594a1c28-f145-306d-9526-5602c528d5d8"
                    },
                    {
                        "beacon": "weaviate://localhost/65416c26-bad3-3504-a8a4-2fb4b4bdf1d1",
                        "href": "/v1/objects/65416c26-bad3-3504-a8a4-2fb4b4bdf1d1"
                    },
                    {
                        "beacon": "weaviate://localhost/0925a8ea-6d8e-30b1-a464-accd42ecc634",
                        "href": "/v1/objects/0925a8ea-6d8e-30b1-a464-accd42ecc634"
                    },
                    {
                        "beacon": "weaviate://localhost/e4d83908-5ff8-31ab-9f91-9d9ca6363f76",
                        "href": "/v1/objects/e4d83908-5ff8-31ab-9f91-9d9ca6363f76"
                    },
                    {
                        "beacon": "weaviate://localhost/502bc74e-d6f6-3b5e-b0d9-2a079c82c877",
                        "href": "/v1/objects/502bc74e-d6f6-3b5e-b0d9-2a079c82c877"
                    },
                    {
                        "beacon": "weaviate://localhost/08fef808-7a0f-38e9-afac-7d84257211fb",
                        "href": "/v1/objects/08fef808-7a0f-38e9-afac-7d84257211fb"
                    },
                    {
                        "beacon": "weaviate://localhost/dc9294c7-56ab-38ee-95c1-c42e72153564",
                        "href": "/v1/objects/dc9294c7-56ab-38ee-95c1-c42e72153564"
                    },
                    {
                        "beacon": "weaviate://localhost/c0044bb2-aa3c-3adb-9825-64373756d493",
                        "href": "/v1/objects/c0044bb2-aa3c-3adb-9825-64373756d493"
                    },
                    {
                        "beacon": "weaviate://localhost/7014725d-1586-375e-9ba4-c1751e7ec01e",
                        "href": "/v1/objects/7014725d-1586-375e-9ba4-c1751e7ec01e"
                    },
                    {
                        "beacon": "weaviate://localhost/cc856963-a9db-3aab-832c-c494129ed4d9",
                        "href": "/v1/objects/cc856963-a9db-3aab-832c-c494129ed4d9"
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
                        "beacon": "weaviate://localhost/bc394060-4322-3121-a709-9976fa45ec2e",
                        "href": "/v1/objects/bc394060-4322-3121-a709-9976fa45ec2e"
                    },
                    {
                        "beacon": "weaviate://localhost/108c9d08-c6cd-36f6-84da-94e686f62694",
                        "href": "/v1/objects/108c9d08-c6cd-36f6-84da-94e686f62694"
                    },
                    {
                        "beacon": "weaviate://localhost/82d9f7b7-b4fe-3cac-abf2-54c866cbf804",
                        "href": "/v1/objects/82d9f7b7-b4fe-3cac-abf2-54c866cbf804"
                    },
                    {
                        "beacon": "weaviate://localhost/8a46169f-8e01-3521-9a86-1ac7021f88a2",
                        "href": "/v1/objects/8a46169f-8e01-3521-9a86-1ac7021f88a2"
                    },
                    {
                        "beacon": "weaviate://localhost/d073078f-2026-386e-8831-ee0b53e7e9c9",
                        "href": "/v1/objects/d073078f-2026-386e-8831-ee0b53e7e9c9"
                    },
                    {
                        "beacon": "weaviate://localhost/25971f23-2cde-3a77-aca2-569071755f33",
                        "href": "/v1/objects/25971f23-2cde-3a77-aca2-569071755f33"
                    },
                    {
                        "beacon": "weaviate://localhost/35f190e0-b920-341f-94a2-1afc15d370a8",
                        "href": "/v1/objects/35f190e0-b920-341f-94a2-1afc15d370a8"
                    },
                    {
                        "beacon": "weaviate://localhost/cdf2e6a6-09ba-3f49-a0f3-5fe4e834cae7",
                        "href": "/v1/objects/cdf2e6a6-09ba-3f49-a0f3-5fe4e834cae7"
                    },
                    {
                        "beacon": "weaviate://localhost/dfeffee1-4947-387b-8e5c-dfda874fd621",
                        "href": "/v1/objects/dfeffee1-4947-387b-8e5c-dfda874fd621"
                    },
                    {
                        "beacon": "weaviate://localhost/5c04b605-9c87-3e0b-8992-f2ba51394fe0",
                        "href": "/v1/objects/5c04b605-9c87-3e0b-8992-f2ba51394fe0"
                    },
                    {
                        "beacon": "weaviate://localhost/58362054-0b30-3c36-a651-ffc39c759f5e",
                        "href": "/v1/objects/58362054-0b30-3c36-a651-ffc39c759f5e"
                    },
                    {
                        "beacon": "weaviate://localhost/de425770-5a3d-304f-9a64-c57c0e88b879",
                        "href": "/v1/objects/de425770-5a3d-304f-9a64-c57c0e88b879"
                    },
                    {
                        "beacon": "weaviate://localhost/2af08edb-14bd-32ef-b50b-532f57e88d8f",
                        "href": "/v1/objects/2af08edb-14bd-32ef-b50b-532f57e88d8f"
                    },
                    {
                        "beacon": "weaviate://localhost/be06fbbc-2020-3e24-a37c-81e134b279d5",
                        "href": "/v1/objects/be06fbbc-2020-3e24-a37c-81e134b279d5"
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
                        "beacon": "weaviate://localhost/abcfe60b-bf43-3ef3-a80f-1febdefdd179",
                        "href": "/v1/objects/abcfe60b-bf43-3ef3-a80f-1febdefdd179"
                    },
                    {
                        "beacon": "weaviate://localhost/43df5874-a972-3448-8ae2-f4be3edb58b6",
                        "href": "/v1/objects/43df5874-a972-3448-8ae2-f4be3edb58b6"
                    },
                    {
                        "beacon": "weaviate://localhost/9b8f1c18-e888-3817-8b8a-28c8df8a3b18",
                        "href": "/v1/objects/9b8f1c18-e888-3817-8b8a-28c8df8a3b18"
                    },
                    {
                        "beacon": "weaviate://localhost/86f57926-90d4-350e-b595-ee820ec93dd2",
                        "href": "/v1/objects/86f57926-90d4-350e-b595-ee820ec93dd2"
                    },
                    {
                        "beacon": "weaviate://localhost/eb37201e-a4bf-32f3-813d-381585deaefa",
                        "href": "/v1/objects/eb37201e-a4bf-32f3-813d-381585deaefa"
                    },
                    {
                        "beacon": "weaviate://localhost/f7f90d4d-f713-3211-8e39-bba058217ba7",
                        "href": "/v1/objects/f7f90d4d-f713-3211-8e39-bba058217ba7"
                    },
                    {
                        "beacon": "weaviate://localhost/03a0c0c0-dcb9-3e38-a3a1-b3cad91c5efd",
                        "href": "/v1/objects/03a0c0c0-dcb9-3e38-a3a1-b3cad91c5efd"
                    },
                    {
                        "beacon": "weaviate://localhost/efd7114f-e94f-3962-83fd-f55b4d879875",
                        "href": "/v1/objects/efd7114f-e94f-3962-83fd-f55b4d879875"
                    },
                    {
                        "beacon": "weaviate://localhost/7b88e2d2-2ed4-36cf-8800-f388fa3ea76b",
                        "href": "/v1/objects/7b88e2d2-2ed4-36cf-8800-f388fa3ea76b"
                    },
                    {
                        "beacon": "weaviate://localhost/c6bc8cf4-46c9-373e-983e-293c7227b2d3",
                        "href": "/v1/objects/c6bc8cf4-46c9-373e-983e-293c7227b2d3"
                    },
                    {
                        "beacon": "weaviate://localhost/5510a99c-1bae-3ce2-b2dc-707bb93aa700",
                        "href": "/v1/objects/5510a99c-1bae-3ce2-b2dc-707bb93aa700"
                    },
                    {
                        "beacon": "weaviate://localhost/4cfce0dc-8ad4-3852-a891-7791da0cb45b",
                        "href": "/v1/objects/4cfce0dc-8ad4-3852-a891-7791da0cb45b"
                    },
                    {
                        "beacon": "weaviate://localhost/5075c225-209e-3ec7-8f17-4514b79b6b13",
                        "href": "/v1/objects/5075c225-209e-3ec7-8f17-4514b79b6b13"
                    },
                    {
                        "beacon": "weaviate://localhost/b592ec64-1b60-3a22-ab0b-517dbcef9db9",
                        "href": "/v1/objects/b592ec64-1b60-3a22-ab0b-517dbcef9db9"
                    },
                    {
                        "beacon": "weaviate://localhost/bb9581a4-424d-3883-9dd1-7c14f4983767",
                        "href": "/v1/objects/bb9581a4-424d-3883-9dd1-7c14f4983767"
                    },
                    {
                        "beacon": "weaviate://localhost/7b3c0407-6737-33b6-b7c5-6d171ad01650",
                        "href": "/v1/objects/7b3c0407-6737-33b6-b7c5-6d171ad01650"
                    },
                    {
                        "beacon": "weaviate://localhost/5e5bbf32-34d2-32af-a5df-75ea5424f87c",
                        "href": "/v1/objects/5e5bbf32-34d2-32af-a5df-75ea5424f87c"
                    },
                    {
                        "beacon": "weaviate://localhost/5686bde9-4fb4-3796-8b86-68c6b3eb2c40",
                        "href": "/v1/objects/5686bde9-4fb4-3796-8b86-68c6b3eb2c40"
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
                        "beacon": "weaviate://localhost/d3657c8f-4a31-3490-a2f5-0365ee2d86bd",
                        "href": "/v1/objects/d3657c8f-4a31-3490-a2f5-0365ee2d86bd"
                    },
                    {
                        "beacon": "weaviate://localhost/027d5531-0af5-3a6e-a9c4-c3d0530b6ec1",
                        "href": "/v1/objects/027d5531-0af5-3a6e-a9c4-c3d0530b6ec1"
                    },
                    {
                        "beacon": "weaviate://localhost/a4cd5e77-3510-32be-bc79-a48e63485e55",
                        "href": "/v1/objects/a4cd5e77-3510-32be-bc79-a48e63485e55"
                    },
                    {
                        "beacon": "weaviate://localhost/cf013f6d-1d31-350d-bd5f-3b2dde4f73d6",
                        "href": "/v1/objects/cf013f6d-1d31-350d-bd5f-3b2dde4f73d6"
                    },
                    {
                        "beacon": "weaviate://localhost/01ce5e7e-940f-30c5-b40c-ce6a6cea447f",
                        "href": "/v1/objects/01ce5e7e-940f-30c5-b40c-ce6a6cea447f"
                    },
                    {
                        "beacon": "weaviate://localhost/2a239108-4b65-313f-b08c-02b8386f89d0",
                        "href": "/v1/objects/2a239108-4b65-313f-b08c-02b8386f89d0"
                    },
                    {
                        "beacon": "weaviate://localhost/e89421e0-0a83-35f1-859b-32df7f3852a6",
                        "href": "/v1/objects/e89421e0-0a83-35f1-859b-32df7f3852a6"
                    },
                    {
                        "beacon": "weaviate://localhost/906cf48a-cd03-3359-828d-17f693226c30",
                        "href": "/v1/objects/906cf48a-cd03-3359-828d-17f693226c30"
                    },
                    {
                        "beacon": "weaviate://localhost/33c19590-1483-3571-8557-4699fa3f727a",
                        "href": "/v1/objects/33c19590-1483-3571-8557-4699fa3f727a"
                    },
                    {
                        "beacon": "weaviate://localhost/da4b3df3-f554-39cb-8517-ad46a200e372",
                        "href": "/v1/objects/da4b3df3-f554-39cb-8517-ad46a200e372"
                    },
                    {
                        "beacon": "weaviate://localhost/097882a0-e27e-3da7-b862-d8a10ca6848b",
                        "href": "/v1/objects/097882a0-e27e-3da7-b862-d8a10ca6848b"
                    },
                    {
                        "beacon": "weaviate://localhost/9165feda-dbc0-30c5-a527-1e53071d9a63",
                        "href": "/v1/objects/9165feda-dbc0-30c5-a527-1e53071d9a63"
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
                        "beacon": "weaviate://localhost/9846311d-cb5a-38bb-9cb9-1301692fbf0c",
                        "href": "/v1/objects/9846311d-cb5a-38bb-9cb9-1301692fbf0c"
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
                        "beacon": "weaviate://localhost/b1f900b7-9743-3120-9f29-7a0ac3dd4762",
                        "href": "/v1/objects/b1f900b7-9743-3120-9f29-7a0ac3dd4762"
                    },
                    {
                        "beacon": "weaviate://localhost/1f8e638d-0ef7-3ff9-bf0e-68d5d0071975",
                        "href": "/v1/objects/1f8e638d-0ef7-3ff9-bf0e-68d5d0071975"
                    },
                    {
                        "beacon": "weaviate://localhost/8d20005c-cc89-32bb-a010-0bbe1dcce5ea",
                        "href": "/v1/objects/8d20005c-cc89-32bb-a010-0bbe1dcce5ea"
                    },
                    {
                        "beacon": "weaviate://localhost/d8153f0e-38e7-3f87-a482-286018edb203",
                        "href": "/v1/objects/d8153f0e-38e7-3f87-a482-286018edb203"
                    },
                    {
                        "beacon": "weaviate://localhost/4855e1b6-4b2e-32f8-a514-9d8010152f42",
                        "href": "/v1/objects/4855e1b6-4b2e-32f8-a514-9d8010152f42"
                    },
                    {
                        "beacon": "weaviate://localhost/4bc2551d-0236-36b9-94c6-d8c4284002e8",
                        "href": "/v1/objects/4bc2551d-0236-36b9-94c6-d8c4284002e8"
                    },
                    {
                        "beacon": "weaviate://localhost/0bdd8f02-750f-39ea-9eb2-01455e844757",
                        "href": "/v1/objects/0bdd8f02-750f-39ea-9eb2-01455e844757"
                    },
                    {
                        "beacon": "weaviate://localhost/4da268d3-e33e-3ffc-ad64-6ad8ae6e8e69",
                        "href": "/v1/objects/4da268d3-e33e-3ffc-ad64-6ad8ae6e8e69"
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
                        "beacon": "weaviate://localhost/24e8f55c-f341-3862-b9e2-27a139aac72c",
                        "href": "/v1/objects/24e8f55c-f341-3862-b9e2-27a139aac72c"
                    },
                    {
                        "beacon": "weaviate://localhost/3a5386bf-1337-3c6b-b990-9083510cf2c3",
                        "href": "/v1/objects/3a5386bf-1337-3c6b-b990-9083510cf2c3"
                    },
                    {
                        "beacon": "weaviate://localhost/a4f6507a-542a-33bc-ac03-a0f67d03afe6",
                        "href": "/v1/objects/a4f6507a-542a-33bc-ac03-a0f67d03afe6"
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
                        "beacon": "weaviate://localhost/f75733f1-36a3-372f-b9b3-dca9615cb572",
                        "href": "/v1/objects/f75733f1-36a3-372f-b9b3-dca9615cb572"
                    },
                    {
                        "beacon": "weaviate://localhost/6be26571-a412-3cfa-85a3-4fcb524e7afa",
                        "href": "/v1/objects/6be26571-a412-3cfa-85a3-4fcb524e7afa"
                    },
                    {
                        "beacon": "weaviate://localhost/ed3e4056-382b-3032-8c19-b236a7e38b2d",
                        "href": "/v1/objects/ed3e4056-382b-3032-8c19-b236a7e38b2d"
                    },
                    {
                        "beacon": "weaviate://localhost/511dea88-5e46-396c-85a5-aca376ec99c9",
                        "href": "/v1/objects/511dea88-5e46-396c-85a5-aca376ec99c9"
                    },
                    {
                        "beacon": "weaviate://localhost/3298aa74-0ead-3e6b-9763-e0fc69ea896b",
                        "href": "/v1/objects/3298aa74-0ead-3e6b-9763-e0fc69ea896b"
                    },
                    {
                        "beacon": "weaviate://localhost/5864e83c-7297-3982-9149-2c532f5de61b",
                        "href": "/v1/objects/5864e83c-7297-3982-9149-2c532f5de61b"
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
                        "beacon": "weaviate://localhost/9edbfc49-590c-3ff1-8472-6e3c44faa2da",
                        "href": "/v1/objects/9edbfc49-590c-3ff1-8472-6e3c44faa2da"
                    },
                    {
                        "beacon": "weaviate://localhost/4b520d5c-af98-34c6-9144-74bd6e331ea4",
                        "href": "/v1/objects/4b520d5c-af98-34c6-9144-74bd6e331ea4"
                    },
                    {
                        "beacon": "weaviate://localhost/bc0aca2e-3869-3954-8a44-aecd9e3ce81b",
                        "href": "/v1/objects/bc0aca2e-3869-3954-8a44-aecd9e3ce81b"
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
                        "beacon": "weaviate://localhost/5d9c8a0a-3896-3e5c-9166-951a259fc40f",
                        "href": "/v1/objects/5d9c8a0a-3896-3e5c-9166-951a259fc40f"
                    },
                    {
                        "beacon": "weaviate://localhost/d9856df3-eda6-3f87-9ad4-7b88977e242e",
                        "href": "/v1/objects/d9856df3-eda6-3f87-9ad4-7b88977e242e"
                    },
                    {
                        "beacon": "weaviate://localhost/f747a036-2cbe-3dad-98e8-3c0dadbf6ac4",
                        "href": "/v1/objects/f747a036-2cbe-3dad-98e8-3c0dadbf6ac4"
                    },
                    {
                        "beacon": "weaviate://localhost/92b407bd-ecea-3850-b9b3-b16dbdf00cc6",
                        "href": "/v1/objects/92b407bd-ecea-3850-b9b3-b16dbdf00cc6"
                    },
                    {
                        "beacon": "weaviate://localhost/998a3176-d910-384c-b096-18296abb1e4b",
                        "href": "/v1/objects/998a3176-d910-384c-b096-18296abb1e4b"
                    },
                    {
                        "beacon": "weaviate://localhost/dfdeb1e2-925c-3ac7-bc19-4fe49eae03ae",
                        "href": "/v1/objects/dfdeb1e2-925c-3ac7-bc19-4fe49eae03ae"
                    },
                    {
                        "beacon": "weaviate://localhost/faff0705-89bf-3210-aaf5-8d970e9dec63",
                        "href": "/v1/objects/faff0705-89bf-3210-aaf5-8d970e9dec63"
                    },
                    {
                        "beacon": "weaviate://localhost/8e9693fe-ca78-3d1b-a5d0-8a120f662afa",
                        "href": "/v1/objects/8e9693fe-ca78-3d1b-a5d0-8a120f662afa"
                    },
                    {
                        "beacon": "weaviate://localhost/6de1ad0b-310c-3e26-8c67-72c34a1d04b1",
                        "href": "/v1/objects/6de1ad0b-310c-3e26-8c67-72c34a1d04b1"
                    },
                    {
                        "beacon": "weaviate://localhost/e13c0662-9001-358e-9cbb-11fba2192cba",
                        "href": "/v1/objects/e13c0662-9001-358e-9cbb-11fba2192cba"
                    },
                    {
                        "beacon": "weaviate://localhost/21d957fd-5e13-3f82-a460-3c357bd62a07",
                        "href": "/v1/objects/21d957fd-5e13-3f82-a460-3c357bd62a07"
                    },
                    {
                        "beacon": "weaviate://localhost/97a43717-d067-382a-a7a8-e7e3c3070775",
                        "href": "/v1/objects/97a43717-d067-382a-a7a8-e7e3c3070775"
                    },
                    {
                        "beacon": "weaviate://localhost/f45e9d4e-0063-304f-a346-f5b07a4fc511",
                        "href": "/v1/objects/f45e9d4e-0063-304f-a346-f5b07a4fc511"
                    },
                    {
                        "beacon": "weaviate://localhost/def107e7-58af-349d-9cc4-2a4efc06d62a",
                        "href": "/v1/objects/def107e7-58af-349d-9cc4-2a4efc06d62a"
                    },
                    {
                        "beacon": "weaviate://localhost/166c6fd4-9e33-34dc-950d-ebd191349e28",
                        "href": "/v1/objects/166c6fd4-9e33-34dc-950d-ebd191349e28"
                    },
                    {
                        "beacon": "weaviate://localhost/9cd10e35-781c-3e1d-a5f8-5625b9f2ee2f",
                        "href": "/v1/objects/9cd10e35-781c-3e1d-a5f8-5625b9f2ee2f"
                    },
                    {
                        "beacon": "weaviate://localhost/2be37469-97bb-3c05-af11-c7daaf6332b9",
                        "href": "/v1/objects/2be37469-97bb-3c05-af11-c7daaf6332b9"
                    },
                    {
                        "beacon": "weaviate://localhost/a7135460-9c3a-3004-a353-c40166fc0910",
                        "href": "/v1/objects/a7135460-9c3a-3004-a353-c40166fc0910"
                    },
                    {
                        "beacon": "weaviate://localhost/7593593b-74c6-3d41-8269-0c0451a894e9",
                        "href": "/v1/objects/7593593b-74c6-3d41-8269-0c0451a894e9"
                    },
                    {
                        "beacon": "weaviate://localhost/10d9c130-8119-3583-85c7-f3aa0e0f0cd7",
                        "href": "/v1/objects/10d9c130-8119-3583-85c7-f3aa0e0f0cd7"
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
                        "beacon": "weaviate://localhost/0b1c3201-4e11-384f-a73a-2f64c3450730",
                        "href": "/v1/objects/0b1c3201-4e11-384f-a73a-2f64c3450730"
                    },
                    {
                        "beacon": "weaviate://localhost/e7555a3b-74e8-3358-bef7-321b487f9fa8",
                        "href": "/v1/objects/e7555a3b-74e8-3358-bef7-321b487f9fa8"
                    },
                    {
                        "beacon": "weaviate://localhost/84f53887-289d-3cfe-81f4-7c2169ebaa50",
                        "href": "/v1/objects/84f53887-289d-3cfe-81f4-7c2169ebaa50"
                    },
                    {
                        "beacon": "weaviate://localhost/ed149ad2-d01b-3c1a-bd79-1d154aede5d4",
                        "href": "/v1/objects/ed149ad2-d01b-3c1a-bd79-1d154aede5d4"
                    },
                    {
                        "beacon": "weaviate://localhost/244a15e3-e1da-3a2d-a706-2a4dbb3b3d9e",
                        "href": "/v1/objects/244a15e3-e1da-3a2d-a706-2a4dbb3b3d9e"
                    },
                    {
                        "beacon": "weaviate://localhost/898e5925-e6b2-3db8-b806-132d58e606cd",
                        "href": "/v1/objects/898e5925-e6b2-3db8-b806-132d58e606cd"
                    },
                    {
                        "beacon": "weaviate://localhost/b5b6d42a-4a14-3122-ac8f-7cf067f02c5f",
                        "href": "/v1/objects/b5b6d42a-4a14-3122-ac8f-7cf067f02c5f"
                    },
                    {
                        "beacon": "weaviate://localhost/81486828-45a8-330d-b012-5604d107894d",
                        "href": "/v1/objects/81486828-45a8-330d-b012-5604d107894d"
                    },
                    {
                        "beacon": "weaviate://localhost/3bcc8e4c-e2e6-30a8-a492-b879affe484a",
                        "href": "/v1/objects/3bcc8e4c-e2e6-30a8-a492-b879affe484a"
                    },
                    {
                        "beacon": "weaviate://localhost/1ae9e12d-24f3-323c-9d02-fed170e1b059",
                        "href": "/v1/objects/1ae9e12d-24f3-323c-9d02-fed170e1b059"
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
                        "beacon": "weaviate://localhost/4d01c097-ef40-30b5-938f-24a0f2396b26",
                        "href": "/v1/objects/4d01c097-ef40-30b5-938f-24a0f2396b26"
                    },
                    {
                        "beacon": "weaviate://localhost/dfab2d6d-865d-3936-a27a-abb094b163fb",
                        "href": "/v1/objects/dfab2d6d-865d-3936-a27a-abb094b163fb"
                    },
                    {
                        "beacon": "weaviate://localhost/b13d212d-8be7-3bf5-85c2-2b52861b76a2",
                        "href": "/v1/objects/b13d212d-8be7-3bf5-85c2-2b52861b76a2"
                    },
                    {
                        "beacon": "weaviate://localhost/f5235ed9-0242-3252-8ae5-34ac8469b4a8",
                        "href": "/v1/objects/f5235ed9-0242-3252-8ae5-34ac8469b4a8"
                    },
                    {
                        "beacon": "weaviate://localhost/78d0c241-1662-384a-a427-3ab9693e82d6",
                        "href": "/v1/objects/78d0c241-1662-384a-a427-3ab9693e82d6"
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
                        "beacon": "weaviate://localhost/941bcbfd-dc98-3aae-bdd6-850c933da82f",
                        "href": "/v1/objects/941bcbfd-dc98-3aae-bdd6-850c933da82f"
                    },
                    {
                        "beacon": "weaviate://localhost/8cdf4219-6f13-35c2-9d36-15162477e054",
                        "href": "/v1/objects/8cdf4219-6f13-35c2-9d36-15162477e054"
                    },
                    {
                        "beacon": "weaviate://localhost/b2394519-e9e7-30c4-81a8-9085f1ed51d3",
                        "href": "/v1/objects/b2394519-e9e7-30c4-81a8-9085f1ed51d3"
                    },
                    {
                        "beacon": "weaviate://localhost/b2345116-951c-3313-881b-2d738c874bf5",
                        "href": "/v1/objects/b2345116-951c-3313-881b-2d738c874bf5"
                    },
                    {
                        "beacon": "weaviate://localhost/3654c240-299b-328c-becb-ed45db6a4cf6",
                        "href": "/v1/objects/3654c240-299b-328c-becb-ed45db6a4cf6"
                    },
                    {
                        "beacon": "weaviate://localhost/e3baa288-2769-36ec-b8f7-31ec3ee6ce28",
                        "href": "/v1/objects/e3baa288-2769-36ec-b8f7-31ec3ee6ce28"
                    },
                    {
                        "beacon": "weaviate://localhost/2a595d78-0322-3e17-8602-48a986affe1e",
                        "href": "/v1/objects/2a595d78-0322-3e17-8602-48a986affe1e"
                    },
                    {
                        "beacon": "weaviate://localhost/70be3dbd-5cf9-38c5-8a85-77a40987646e",
                        "href": "/v1/objects/70be3dbd-5cf9-38c5-8a85-77a40987646e"
                    },
                    {
                        "beacon": "weaviate://localhost/53f1e9e5-8f39-3741-b590-954282d9a421",
                        "href": "/v1/objects/53f1e9e5-8f39-3741-b590-954282d9a421"
                    },
                    {
                        "beacon": "weaviate://localhost/bc02414c-f8b0-34fc-9c4f-ac51e57ebbb8",
                        "href": "/v1/objects/bc02414c-f8b0-34fc-9c4f-ac51e57ebbb8"
                    },
                    {
                        "beacon": "weaviate://localhost/f6a1e7a3-a611-3bbe-a601-e162a0528049",
                        "href": "/v1/objects/f6a1e7a3-a611-3bbe-a601-e162a0528049"
                    },
                    {
                        "beacon": "weaviate://localhost/eb8bb7a2-de80-39e8-886d-c2b840c92977",
                        "href": "/v1/objects/eb8bb7a2-de80-39e8-886d-c2b840c92977"
                    },
                    {
                        "beacon": "weaviate://localhost/8d41247a-4816-3959-a847-082dc5613e62",
                        "href": "/v1/objects/8d41247a-4816-3959-a847-082dc5613e62"
                    },
                    {
                        "beacon": "weaviate://localhost/177e3f32-97b9-3651-a935-522a84a82c0b",
                        "href": "/v1/objects/177e3f32-97b9-3651-a935-522a84a82c0b"
                    },
                    {
                        "beacon": "weaviate://localhost/46b068bb-a4a8-3c86-93fd-ad600438911b",
                        "href": "/v1/objects/46b068bb-a4a8-3c86-93fd-ad600438911b"
                    },
                    {
                        "beacon": "weaviate://localhost/bfde48a8-e508-3d8c-ba4e-e85789bec992",
                        "href": "/v1/objects/bfde48a8-e508-3d8c-ba4e-e85789bec992"
                    },
                    {
                        "beacon": "weaviate://localhost/b4206588-85fc-3402-9bc5-9c3bbaa8a244",
                        "href": "/v1/objects/b4206588-85fc-3402-9bc5-9c3bbaa8a244"
                    },
                    {
                        "beacon": "weaviate://localhost/ab45f3d4-f73f-358b-bc98-73afd284c139",
                        "href": "/v1/objects/ab45f3d4-f73f-358b-bc98-73afd284c139"
                    },
                    {
                        "beacon": "weaviate://localhost/2a12bbfa-9f07-3e30-adf2-73d08c3017da",
                        "href": "/v1/objects/2a12bbfa-9f07-3e30-adf2-73d08c3017da"
                    },
                    {
                        "beacon": "weaviate://localhost/8d42fd4c-a6ce-330f-aef7-1c49dceaab41",
                        "href": "/v1/objects/8d42fd4c-a6ce-330f-aef7-1c49dceaab41"
                    },
                    {
                        "beacon": "weaviate://localhost/ecbef7f8-6b3b-307c-852b-5b2d34a08223",
                        "href": "/v1/objects/ecbef7f8-6b3b-307c-852b-5b2d34a08223"
                    },
                    {
                        "beacon": "weaviate://localhost/bfb8c66a-72d1-35cd-8653-1489ab03f067",
                        "href": "/v1/objects/bfb8c66a-72d1-35cd-8653-1489ab03f067"
                    },
                    {
                        "beacon": "weaviate://localhost/114f98dc-cb2f-35a7-844f-42d087b7544e",
                        "href": "/v1/objects/114f98dc-cb2f-35a7-844f-42d087b7544e"
                    },
                    {
                        "beacon": "weaviate://localhost/979bc026-d553-3b05-b4d0-ce21980fe840",
                        "href": "/v1/objects/979bc026-d553-3b05-b4d0-ce21980fe840"
                    },
                    {
                        "beacon": "weaviate://localhost/fc1a66bf-17ef-3c8f-b35f-31363fe1099f",
                        "href": "/v1/objects/fc1a66bf-17ef-3c8f-b35f-31363fe1099f"
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
                        "beacon": "weaviate://localhost/51c0ed58-0a55-32c3-b035-724877337a68",
                        "href": "/v1/objects/51c0ed58-0a55-32c3-b035-724877337a68"
                    },
                    {
                        "beacon": "weaviate://localhost/bbbaeb20-33bc-3d17-8413-53da0ae55d4e",
                        "href": "/v1/objects/bbbaeb20-33bc-3d17-8413-53da0ae55d4e"
                    },
                    {
                        "beacon": "weaviate://localhost/27d32127-3565-38c7-975a-bcdb94c49832",
                        "href": "/v1/objects/27d32127-3565-38c7-975a-bcdb94c49832"
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
                        "beacon": "weaviate://localhost/35eed17c-c1f5-3bbf-a5a9-8358d4e29338",
                        "href": "/v1/objects/35eed17c-c1f5-3bbf-a5a9-8358d4e29338"
                    },
                    {
                        "beacon": "weaviate://localhost/75319195-804a-3ae1-b8f9-4538b5d1afd7",
                        "href": "/v1/objects/75319195-804a-3ae1-b8f9-4538b5d1afd7"
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
                        "beacon": "weaviate://localhost/786ab53b-fa25-37c1-94f2-f4e77a20ad3b",
                        "href": "/v1/objects/786ab53b-fa25-37c1-94f2-f4e77a20ad3b"
                    },
                    {
                        "beacon": "weaviate://localhost/fe6db760-49f5-38a9-bae5-5e880614b870",
                        "href": "/v1/objects/fe6db760-49f5-38a9-bae5-5e880614b870"
                    },
                    {
                        "beacon": "weaviate://localhost/c968075f-3f1b-3804-93fe-13d7dd347fc7",
                        "href": "/v1/objects/c968075f-3f1b-3804-93fe-13d7dd347fc7"
                    },
                    {
                        "beacon": "weaviate://localhost/880f78ec-3dc4-3954-ac36-fd44f079b153",
                        "href": "/v1/objects/880f78ec-3dc4-3954-ac36-fd44f079b153"
                    },
                    {
                        "beacon": "weaviate://localhost/8aa8ed24-0840-39cd-8038-8ee8119c1b02",
                        "href": "/v1/objects/8aa8ed24-0840-39cd-8038-8ee8119c1b02"
                    },
                    {
                        "beacon": "weaviate://localhost/df201a0f-69fc-3d40-a225-1cda081efb24",
                        "href": "/v1/objects/df201a0f-69fc-3d40-a225-1cda081efb24"
                    },
                    {
                        "beacon": "weaviate://localhost/6b50ee3f-3488-37cf-8f93-411e975604d8",
                        "href": "/v1/objects/6b50ee3f-3488-37cf-8f93-411e975604d8"
                    },
                    {
                        "beacon": "weaviate://localhost/fd54c463-23e7-34b0-a69d-22c54e64ee58",
                        "href": "/v1/objects/fd54c463-23e7-34b0-a69d-22c54e64ee58"
                    },
                    {
                        "beacon": "weaviate://localhost/51b1730d-c11e-3af4-a238-97ec86659203",
                        "href": "/v1/objects/51b1730d-c11e-3af4-a238-97ec86659203"
                    },
                    {
                        "beacon": "weaviate://localhost/98aa1599-2d0f-3f1d-9feb-83a16056d789",
                        "href": "/v1/objects/98aa1599-2d0f-3f1d-9feb-83a16056d789"
                    },
                    {
                        "beacon": "weaviate://localhost/c5e8fc83-bb82-3816-8f81-512c5461bf70",
                        "href": "/v1/objects/c5e8fc83-bb82-3816-8f81-512c5461bf70"
                    },
                    {
                        "beacon": "weaviate://localhost/33c04fe8-ef24-36fb-a28a-f10664bd9b78",
                        "href": "/v1/objects/33c04fe8-ef24-36fb-a28a-f10664bd9b78"
                    },
                    {
                        "beacon": "weaviate://localhost/fe7d9478-6c7a-325a-bfca-7fd432e9226f",
                        "href": "/v1/objects/fe7d9478-6c7a-325a-bfca-7fd432e9226f"
                    },
                    {
                        "beacon": "weaviate://localhost/25b495d3-f686-3148-bdfc-f4c751998eda",
                        "href": "/v1/objects/25b495d3-f686-3148-bdfc-f4c751998eda"
                    },
                    {
                        "beacon": "weaviate://localhost/5cb35546-fac6-37e2-bb1c-b17b627726d9",
                        "href": "/v1/objects/5cb35546-fac6-37e2-bb1c-b17b627726d9"
                    },
                    {
                        "beacon": "weaviate://localhost/a9a4f52a-527c-3ce4-a21f-a82012f567be",
                        "href": "/v1/objects/a9a4f52a-527c-3ce4-a21f-a82012f567be"
                    },
                    {
                        "beacon": "weaviate://localhost/79be0edf-d48d-30ef-83ea-1e7cd1a9d858",
                        "href": "/v1/objects/79be0edf-d48d-30ef-83ea-1e7cd1a9d858"
                    },
                    {
                        "beacon": "weaviate://localhost/d6f8745d-b88b-3d79-a9e1-8e50ec8226c5",
                        "href": "/v1/objects/d6f8745d-b88b-3d79-a9e1-8e50ec8226c5"
                    },
                    {
                        "beacon": "weaviate://localhost/82915581-7253-39ee-b7ea-882212c70e46",
                        "href": "/v1/objects/82915581-7253-39ee-b7ea-882212c70e46"
                    },
                    {
                        "beacon": "weaviate://localhost/87c88900-9a30-32a6-932b-03ad5b5054c8",
                        "href": "/v1/objects/87c88900-9a30-32a6-932b-03ad5b5054c8"
                    },
                    {
                        "beacon": "weaviate://localhost/54eccf53-581e-3d03-867d-be290625309e",
                        "href": "/v1/objects/54eccf53-581e-3d03-867d-be290625309e"
                    },
                    {
                        "beacon": "weaviate://localhost/69aea071-2207-35ea-aab9-f814387b4503",
                        "href": "/v1/objects/69aea071-2207-35ea-aab9-f814387b4503"
                    },
                    {
                        "beacon": "weaviate://localhost/8d35f81a-0e04-324a-8ea3-bf8ba442da8c",
                        "href": "/v1/objects/8d35f81a-0e04-324a-8ea3-bf8ba442da8c"
                    },
                    {
                        "beacon": "weaviate://localhost/d25413b7-6229-3944-80c0-89887317a506",
                        "href": "/v1/objects/d25413b7-6229-3944-80c0-89887317a506"
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
                        "beacon": "weaviate://localhost/17efc988-91ae-36b9-8d3a-6c61138b3030",
                        "href": "/v1/objects/17efc988-91ae-36b9-8d3a-6c61138b3030"
                    },
                    {
                        "beacon": "weaviate://localhost/a5f6bcf8-5b52-3694-9205-6145c9e56717",
                        "href": "/v1/objects/a5f6bcf8-5b52-3694-9205-6145c9e56717"
                    },
                    {
                        "beacon": "weaviate://localhost/953547bc-f3b0-3539-843c-83c96bf01575",
                        "href": "/v1/objects/953547bc-f3b0-3539-843c-83c96bf01575"
                    },
                    {
                        "beacon": "weaviate://localhost/1250b95f-d88e-3cae-985a-483719db13b4",
                        "href": "/v1/objects/1250b95f-d88e-3cae-985a-483719db13b4"
                    },
                    {
                        "beacon": "weaviate://localhost/160e1275-bcf3-3385-9cc2-efff21033bbc",
                        "href": "/v1/objects/160e1275-bcf3-3385-9cc2-efff21033bbc"
                    },
                    {
                        "beacon": "weaviate://localhost/5510072f-5ba1-3667-b02f-ad20b3254296",
                        "href": "/v1/objects/5510072f-5ba1-3667-b02f-ad20b3254296"
                    },
                    {
                        "beacon": "weaviate://localhost/d6ef7362-4f66-3f8e-836f-6b41fe565e6b",
                        "href": "/v1/objects/d6ef7362-4f66-3f8e-836f-6b41fe565e6b"
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
                        "beacon": "weaviate://localhost/b07f5404-dc86-3313-9032-e35f95565d08",
                        "href": "/v1/objects/b07f5404-dc86-3313-9032-e35f95565d08"
                    },
                    {
                        "beacon": "weaviate://localhost/a69182f9-5d5d-34fc-8a3c-08d397af43c2",
                        "href": "/v1/objects/a69182f9-5d5d-34fc-8a3c-08d397af43c2"
                    },
                    {
                        "beacon": "weaviate://localhost/15f5fc8e-250c-3b2a-be23-96976128f3db",
                        "href": "/v1/objects/15f5fc8e-250c-3b2a-be23-96976128f3db"
                    },
                    {
                        "beacon": "weaviate://localhost/989760ab-1ea3-3f9a-8d93-3667caca2da8",
                        "href": "/v1/objects/989760ab-1ea3-3f9a-8d93-3667caca2da8"
                    },
                    {
                        "beacon": "weaviate://localhost/80a83c95-d984-3c2f-b859-b6166593d03f",
                        "href": "/v1/objects/80a83c95-d984-3c2f-b859-b6166593d03f"
                    },
                    {
                        "beacon": "weaviate://localhost/ec022ef8-0ded-3f32-8c0e-ee5e071b503e",
                        "href": "/v1/objects/ec022ef8-0ded-3f32-8c0e-ee5e071b503e"
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
            "class": "Publication",
            "creationTimeUnix": 1618580853819,
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
                        "beacon": "weaviate://localhost/3c305977-84d7-398b-8099-dfc1f354d425",
                        "href": "/v1/objects/3c305977-84d7-398b-8099-dfc1f354d425"
                    },
                    {
                        "beacon": "weaviate://localhost/b46c2dff-76be-3fa6-a3a2-3b142fb74573",
                        "href": "/v1/objects/b46c2dff-76be-3fa6-a3a2-3b142fb74573"
                    },
                    {
                        "beacon": "weaviate://localhost/a3d3e624-0c53-37b1-a433-0c1aa546707f",
                        "href": "/v1/objects/a3d3e624-0c53-37b1-a433-0c1aa546707f"
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
                        "beacon": "weaviate://localhost/8d8f3d0a-1f0b-3553-81bc-dcb7e5eb9ee7",
                        "href": "/v1/objects/8d8f3d0a-1f0b-3553-81bc-dcb7e5eb9ee7"
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
                        "beacon": "weaviate://localhost/685592f7-f9af-3b0a-8be1-62150bfcaefa",
                        "href": "/v1/objects/685592f7-f9af-3b0a-8be1-62150bfcaefa"
                    },
                    {
                        "beacon": "weaviate://localhost/2c90bc45-94a7-3a59-91be-5d504cb90ea9",
                        "href": "/v1/objects/2c90bc45-94a7-3a59-91be-5d504cb90ea9"
                    },
                    {
                        "beacon": "weaviate://localhost/2ba8948b-acaf-394a-9fbd-23fc8a808ca5",
                        "href": "/v1/objects/2ba8948b-acaf-394a-9fbd-23fc8a808ca5"
                    },
                    {
                        "beacon": "weaviate://localhost/141f274e-d329-324e-a981-8ce48c761374",
                        "href": "/v1/objects/141f274e-d329-324e-a981-8ce48c761374"
                    },
                    {
                        "beacon": "weaviate://localhost/07e07a0f-76c1-3131-b5a0-3152aaeb33cc",
                        "href": "/v1/objects/07e07a0f-76c1-3131-b5a0-3152aaeb33cc"
                    },
                    {
                        "beacon": "weaviate://localhost/a879ee10-7bc2-3732-a1cb-556d5ebb6cab",
                        "href": "/v1/objects/a879ee10-7bc2-3732-a1cb-556d5ebb6cab"
                    },
                    {
                        "beacon": "weaviate://localhost/31cecd53-a8f4-3f6a-8652-ccd1155fa8a5",
                        "href": "/v1/objects/31cecd53-a8f4-3f6a-8652-ccd1155fa8a5"
                    },
                    {
                        "beacon": "weaviate://localhost/7b113d51-3ac1-3b6c-a25e-074c19e55979",
                        "href": "/v1/objects/7b113d51-3ac1-3b6c-a25e-074c19e55979"
                    },
                    {
                        "beacon": "weaviate://localhost/fb9a7f21-c067-362d-a2ef-3186da984d20",
                        "href": "/v1/objects/fb9a7f21-c067-362d-a2ef-3186da984d20"
                    },
                    {
                        "beacon": "weaviate://localhost/90ba0ac2-dfe2-35d5-aec5-8b4849821a2f",
                        "href": "/v1/objects/90ba0ac2-dfe2-35d5-aec5-8b4849821a2f"
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
                        "beacon": "weaviate://localhost/ff562e3f-118f-3991-a329-8dbb676822e5",
                        "href": "/v1/objects/ff562e3f-118f-3991-a329-8dbb676822e5"
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
                        "beacon": "weaviate://localhost/4e4c72b0-0139-3679-9501-8f07f090b27d",
                        "href": "/v1/objects/4e4c72b0-0139-3679-9501-8f07f090b27d"
                    },
                    {
                        "beacon": "weaviate://localhost/61e7c90d-0cbe-339c-bf48-d100845a3e8c",
                        "href": "/v1/objects/61e7c90d-0cbe-339c-bf48-d100845a3e8c"
                    },
                    {
                        "beacon": "weaviate://localhost/11bb7d57-a7b0-3acb-a768-115e439962a1",
                        "href": "/v1/objects/11bb7d57-a7b0-3acb-a768-115e439962a1"
                    },
                    {
                        "beacon": "weaviate://localhost/86f145a7-9ccd-3918-a9d4-942c6f77a7a0",
                        "href": "/v1/objects/86f145a7-9ccd-3918-a9d4-942c6f77a7a0"
                    },
                    {
                        "beacon": "weaviate://localhost/0d68528d-33ac-34d2-a89e-6205c5d372de",
                        "href": "/v1/objects/0d68528d-33ac-34d2-a89e-6205c5d372de"
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
                        "beacon": "weaviate://localhost/469a3efd-a1e7-321e-b871-d83e90432fbd",
                        "href": "/v1/objects/469a3efd-a1e7-321e-b871-d83e90432fbd"
                    },
                    {
                        "beacon": "weaviate://localhost/99b9719f-df86-3d3b-9144-7d4be4b5cd94",
                        "href": "/v1/objects/99b9719f-df86-3d3b-9144-7d4be4b5cd94"
                    },
                    {
                        "beacon": "weaviate://localhost/f2d55c5f-a21d-3e36-8ae4-be14f4c00b54",
                        "href": "/v1/objects/f2d55c5f-a21d-3e36-8ae4-be14f4c00b54"
                    },
                    {
                        "beacon": "weaviate://localhost/551bee18-edb0-3f21-9c13-e6cf85565d12",
                        "href": "/v1/objects/551bee18-edb0-3f21-9c13-e6cf85565d12"
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
                        "beacon": "weaviate://localhost/6433cf0c-771c-397d-b0a8-d6b1898579c3",
                        "href": "/v1/objects/6433cf0c-771c-397d-b0a8-d6b1898579c3"
                    },
                    {
                        "beacon": "weaviate://localhost/f5f1a046-acef-3516-937f-af112e5ff68c",
                        "href": "/v1/objects/f5f1a046-acef-3516-937f-af112e5ff68c"
                    },
                    {
                        "beacon": "weaviate://localhost/30dbe02c-4243-343a-9b65-ab23a9791300",
                        "href": "/v1/objects/30dbe02c-4243-343a-9b65-ab23a9791300"
                    },
                    {
                        "beacon": "weaviate://localhost/2b097c94-0c59-3614-bf1b-ec52ee3f6c1a",
                        "href": "/v1/objects/2b097c94-0c59-3614-bf1b-ec52ee3f6c1a"
                    },
                    {
                        "beacon": "weaviate://localhost/ff0b2525-d0b4-302f-94a6-86cb8b7b6800",
                        "href": "/v1/objects/ff0b2525-d0b4-302f-94a6-86cb8b7b6800"
                    },
                    {
                        "beacon": "weaviate://localhost/9df54aa0-12f8-3c69-a6c0-55bf6ea79287",
                        "href": "/v1/objects/9df54aa0-12f8-3c69-a6c0-55bf6ea79287"
                    },
                    {
                        "beacon": "weaviate://localhost/5c1da5cc-9cb5-3639-8bf7-40d550e798cf",
                        "href": "/v1/objects/5c1da5cc-9cb5-3639-8bf7-40d550e798cf"
                    },
                    {
                        "beacon": "weaviate://localhost/c98690ca-9718-3766-89ce-cdedcf484da9",
                        "href": "/v1/objects/c98690ca-9718-3766-89ce-cdedcf484da9"
                    },
                    {
                        "beacon": "weaviate://localhost/e9b27bdd-ce07-36c5-bc16-feecab7bf266",
                        "href": "/v1/objects/e9b27bdd-ce07-36c5-bc16-feecab7bf266"
                    },
                    {
                        "beacon": "weaviate://localhost/afb12d66-37fa-3769-bca6-d42effe0ce05",
                        "href": "/v1/objects/afb12d66-37fa-3769-bca6-d42effe0ce05"
                    },
                    {
                        "beacon": "weaviate://localhost/43e99ad2-0903-381c-93f5-95647e9ac0ea",
                        "href": "/v1/objects/43e99ad2-0903-381c-93f5-95647e9ac0ea"
                    },
                    {
                        "beacon": "weaviate://localhost/f05f0cea-ba88-34e2-bd41-79dc9e17031e",
                        "href": "/v1/objects/f05f0cea-ba88-34e2-bd41-79dc9e17031e"
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
                        "beacon": "weaviate://localhost/192b1b10-9a03-3512-9ed6-26f5471888b7",
                        "href": "/v1/objects/192b1b10-9a03-3512-9ed6-26f5471888b7"
                    },
                    {
                        "beacon": "weaviate://localhost/fa58b9f1-c1f3-3897-baaf-dc3e10ea41d0",
                        "href": "/v1/objects/fa58b9f1-c1f3-3897-baaf-dc3e10ea41d0"
                    },
                    {
                        "beacon": "weaviate://localhost/368dbe9a-8236-34fb-96b5-69540daeca5a",
                        "href": "/v1/objects/368dbe9a-8236-34fb-96b5-69540daeca5a"
                    },
                    {
                        "beacon": "weaviate://localhost/1252c6d9-2c25-3566-b1d6-b9949bcc17c0",
                        "href": "/v1/objects/1252c6d9-2c25-3566-b1d6-b9949bcc17c0"
                    },
                    {
                        "beacon": "weaviate://localhost/63086d83-8e9a-33bf-b3c1-902f2823b027",
                        "href": "/v1/objects/63086d83-8e9a-33bf-b3c1-902f2823b027"
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
                        "beacon": "weaviate://localhost/b896caf0-932c-3358-ae14-4f52f2c372dd",
                        "href": "/v1/objects/b896caf0-932c-3358-ae14-4f52f2c372dd"
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
                        "beacon": "weaviate://localhost/f5dc4508-9d70-3965-ba5e-e754f1d7c0f3",
                        "href": "/v1/objects/f5dc4508-9d70-3965-ba5e-e754f1d7c0f3"
                    },
                    {
                        "beacon": "weaviate://localhost/9a52f979-1bc8-31fd-bafa-60874a4717cd",
                        "href": "/v1/objects/9a52f979-1bc8-31fd-bafa-60874a4717cd"
                    },
                    {
                        "beacon": "weaviate://localhost/d1f014fa-647c-3768-ad03-c27a18df9fb1",
                        "href": "/v1/objects/d1f014fa-647c-3768-ad03-c27a18df9fb1"
                    },
                    {
                        "beacon": "weaviate://localhost/277cc8b5-0a97-327b-8e4f-1dfec38ee1e8",
                        "href": "/v1/objects/277cc8b5-0a97-327b-8e4f-1dfec38ee1e8"
                    },
                    {
                        "beacon": "weaviate://localhost/88d9d660-64c6-3dea-931c-653c46b256c7",
                        "href": "/v1/objects/88d9d660-64c6-3dea-931c-653c46b256c7"
                    },
                    {
                        "beacon": "weaviate://localhost/e4342d30-c031-3a02-a7c1-a3a88f6b8e57",
                        "href": "/v1/objects/e4342d30-c031-3a02-a7c1-a3a88f6b8e57"
                    },
                    {
                        "beacon": "weaviate://localhost/2f4ec77d-b7b1-3348-b5b5-e95419672c08",
                        "href": "/v1/objects/2f4ec77d-b7b1-3348-b5b5-e95419672c08"
                    },
                    {
                        "beacon": "weaviate://localhost/c5103950-78ff-3da3-8dc2-1ddc62f89aae",
                        "href": "/v1/objects/c5103950-78ff-3da3-8dc2-1ddc62f89aae"
                    },
                    {
                        "beacon": "weaviate://localhost/4024364b-3ee8-377f-9eeb-eed08dd9ef27",
                        "href": "/v1/objects/4024364b-3ee8-377f-9eeb-eed08dd9ef27"
                    },
                    {
                        "beacon": "weaviate://localhost/0fe17fff-efa9-376c-a04d-a41433366e88",
                        "href": "/v1/objects/0fe17fff-efa9-376c-a04d-a41433366e88"
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
                        "beacon": "weaviate://localhost/f7e48c89-029a-31e0-8513-6e10b95ad8db",
                        "href": "/v1/objects/f7e48c89-029a-31e0-8513-6e10b95ad8db"
                    },
                    {
                        "beacon": "weaviate://localhost/bde98815-c322-37da-ad80-0d6e3b3f2b45",
                        "href": "/v1/objects/bde98815-c322-37da-ad80-0d6e3b3f2b45"
                    },
                    {
                        "beacon": "weaviate://localhost/c4cabf85-b739-3150-8cbe-4edea2d3dd07",
                        "href": "/v1/objects/c4cabf85-b739-3150-8cbe-4edea2d3dd07"
                    },
                    {
                        "beacon": "weaviate://localhost/1c4dfae0-1caf-3553-8943-ec4f1aefe8ec",
                        "href": "/v1/objects/1c4dfae0-1caf-3553-8943-ec4f1aefe8ec"
                    },
                    {
                        "beacon": "weaviate://localhost/9e58d69a-6f96-339c-8be5-28e0d75c4dd7",
                        "href": "/v1/objects/9e58d69a-6f96-339c-8be5-28e0d75c4dd7"
                    },
                    {
                        "beacon": "weaviate://localhost/be807039-fe27-33ca-9b51-6816feae7538",
                        "href": "/v1/objects/be807039-fe27-33ca-9b51-6816feae7538"
                    },
                    {
                        "beacon": "weaviate://localhost/6b6e3bcc-8703-3248-b2ec-b7b8db09abde",
                        "href": "/v1/objects/6b6e3bcc-8703-3248-b2ec-b7b8db09abde"
                    },
                    {
                        "beacon": "weaviate://localhost/464d712d-fa6e-3fee-914f-ee8f0327b0a7",
                        "href": "/v1/objects/464d712d-fa6e-3fee-914f-ee8f0327b0a7"
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
                        "beacon": "weaviate://localhost/c0bdd41a-4bac-3714-b76c-c692c49319c4",
                        "href": "/v1/objects/c0bdd41a-4bac-3714-b76c-c692c49319c4"
                    },
                    {
                        "beacon": "weaviate://localhost/d20d0e89-1225-3b19-8bf0-6dd91349d191",
                        "href": "/v1/objects/d20d0e89-1225-3b19-8bf0-6dd91349d191"
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
                        "beacon": "weaviate://localhost/3ff33571-d294-30ef-9e99-208dd4ad2173",
                        "href": "/v1/objects/3ff33571-d294-30ef-9e99-208dd4ad2173"
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
                        "beacon": "weaviate://localhost/7546b0d7-1878-3134-b417-7c7753698e5e",
                        "href": "/v1/objects/7546b0d7-1878-3134-b417-7c7753698e5e"
                    },
                    {
                        "beacon": "weaviate://localhost/58f86c88-30f9-3c34-a0e5-6c9667d8086f",
                        "href": "/v1/objects/58f86c88-30f9-3c34-a0e5-6c9667d8086f"
                    },
                    {
                        "beacon": "weaviate://localhost/c59e2f64-56d1-3572-be4f-675038d43b96",
                        "href": "/v1/objects/c59e2f64-56d1-3572-be4f-675038d43b96"
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
                        "beacon": "weaviate://localhost/c915c038-9b95-3360-b320-587af53c2701",
                        "href": "/v1/objects/c915c038-9b95-3360-b320-587af53c2701"
                    },
                    {
                        "beacon": "weaviate://localhost/2cde4d91-7e65-376c-bb5d-79d7e9312051",
                        "href": "/v1/objects/2cde4d91-7e65-376c-bb5d-79d7e9312051"
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
            "class": "Publication",
            "creationTimeUnix": 1618580853819,
            "id": "f2968730-9ce5-3e6f-8e64-b6b9f68984b0",
            "properties": {
                "hasArticles": [
                    {
                        "beacon": "weaviate://localhost/d920f2fe-64ac-34f8-a428-9f7e4a944128",
                        "href": "/v1/objects/d920f2fe-64ac-34f8-a428-9f7e4a944128"
                    },
                    {
                        "beacon": "weaviate://localhost/afc67a97-4809-3ef7-b688-f2fa504bbcc5",
                        "href": "/v1/objects/afc67a97-4809-3ef7-b688-f2fa504bbcc5"
                    },
                    {
                        "beacon": "weaviate://localhost/f5451ed8-5a39-3cdd-b1ca-65d192b3ebb4",
                        "href": "/v1/objects/f5451ed8-5a39-3cdd-b1ca-65d192b3ebb4"
                    },
                    {
                        "beacon": "weaviate://localhost/c2dda100-bac4-3ffb-add2-f920ed2bed23",
                        "href": "/v1/objects/c2dda100-bac4-3ffb-add2-f920ed2bed23"
                    },
                    {
                        "beacon": "weaviate://localhost/ffe1fdb1-99df-3768-bebb-60879aa518ae",
                        "href": "/v1/objects/ffe1fdb1-99df-3768-bebb-60879aa518ae"
                    },
                    {
                        "beacon": "weaviate://localhost/efb16402-f90f-3800-ac67-d8ca94987bca",
                        "href": "/v1/objects/efb16402-f90f-3800-ac67-d8ca94987bca"
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
                        "beacon": "weaviate://localhost/e0720e59-3772-33c9-95bf-3bd43260d796",
                        "href": "/v1/objects/e0720e59-3772-33c9-95bf-3bd43260d796"
                    },
                    {
                        "beacon": "weaviate://localhost/660bb058-4861-3edd-b60d-d7202ae05ba4",
                        "href": "/v1/objects/660bb058-4861-3edd-b60d-d7202ae05ba4"
                    },
                    {
                        "beacon": "weaviate://localhost/0f5aaaef-c2bb-3051-91cd-44980b38be94",
                        "href": "/v1/objects/0f5aaaef-c2bb-3051-91cd-44980b38be94"
                    },
                    {
                        "beacon": "weaviate://localhost/832bc230-e2c9-3ebd-886e-0f7b6db6fb41",
                        "href": "/v1/objects/832bc230-e2c9-3ebd-886e-0f7b6db6fb41"
                    },
                    {
                        "beacon": "weaviate://localhost/5b53914e-3b15-34da-9c68-74d99a0d3f2b",
                        "href": "/v1/objects/5b53914e-3b15-34da-9c68-74d99a0d3f2b"
                    },
                    {
                        "beacon": "weaviate://localhost/88ab35e1-6f8b-3f9d-937a-05633ff5ce0a",
                        "href": "/v1/objects/88ab35e1-6f8b-3f9d-937a-05633ff5ce0a"
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
                        "beacon": "weaviate://localhost/3f2c789f-ed67-32a1-8ab9-700ce356c274",
                        "href": "/v1/objects/3f2c789f-ed67-32a1-8ab9-700ce356c274"
                    },
                    {
                        "beacon": "weaviate://localhost/b47b3dcb-adbb-3df9-9832-0967e12f8959",
                        "href": "/v1/objects/b47b3dcb-adbb-3df9-9832-0967e12f8959"
                    },
                    {
                        "beacon": "weaviate://localhost/238d2e01-1204-3ba4-8b67-05e6a98ca9b1",
                        "href": "/v1/objects/238d2e01-1204-3ba4-8b67-05e6a98ca9b1"
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
                        "beacon": "weaviate://localhost/aa4af3ca-54ad-39c6-bd87-72cde45e7da9",
                        "href": "/v1/objects/aa4af3ca-54ad-39c6-bd87-72cde45e7da9"
                    },
                    {
                        "beacon": "weaviate://localhost/0aebf926-13a7-3a93-b6cc-2f1f6fc88bcd",
                        "href": "/v1/objects/0aebf926-13a7-3a93-b6cc-2f1f6fc88bcd"
                    },
                    {
                        "beacon": "weaviate://localhost/bb8b7e73-5f08-3381-8e7f-a44c28e6cde1",
                        "href": "/v1/objects/bb8b7e73-5f08-3381-8e7f-a44c28e6cde1"
                    },
                    {
                        "beacon": "weaviate://localhost/392e9277-d7d4-37f1-9755-6d6cce27610b",
                        "href": "/v1/objects/392e9277-d7d4-37f1-9755-6d6cce27610b"
                    },
                    {
                        "beacon": "weaviate://localhost/41c6848c-52cf-3f45-9856-92dbe16b068e",
                        "href": "/v1/objects/41c6848c-52cf-3f45-9856-92dbe16b068e"
                    },
                    {
                        "beacon": "weaviate://localhost/0ad76b90-1702-372e-a3f0-da19062095b3",
                        "href": "/v1/objects/0ad76b90-1702-372e-a3f0-da19062095b3"
                    },
                    {
                        "beacon": "weaviate://localhost/724e686b-76da-3a3c-9ec8-0cf7fd5a73e4",
                        "href": "/v1/objects/724e686b-76da-3a3c-9ec8-0cf7fd5a73e4"
                    },
                    {
                        "beacon": "weaviate://localhost/77a46171-6d52-33ba-9604-a0c22bd1c853",
                        "href": "/v1/objects/77a46171-6d52-33ba-9604-a0c22bd1c853"
                    },
                    {
                        "beacon": "weaviate://localhost/1c5e6221-0fc2-3fd9-8eae-9eddce9bf939",
                        "href": "/v1/objects/1c5e6221-0fc2-3fd9-8eae-9eddce9bf939"
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
                        "beacon": "weaviate://localhost/da5dba8f-4f28-3572-8988-fc7af476b153",
                        "href": "/v1/objects/da5dba8f-4f28-3572-8988-fc7af476b153"
                    },
                    {
                        "beacon": "weaviate://localhost/53c22dea-d628-314c-955c-a8835e2ff6e4",
                        "href": "/v1/objects/53c22dea-d628-314c-955c-a8835e2ff6e4"
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
                        "beacon": "weaviate://localhost/ab44bd0f-715e-307c-b4d0-e97f6768274d",
                        "href": "/v1/objects/ab44bd0f-715e-307c-b4d0-e97f6768274d"
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
                        "beacon": "weaviate://localhost/2ebabaa3-930f-32af-81ab-9a30fe234fbf",
                        "href": "/v1/objects/2ebabaa3-930f-32af-81ab-9a30fe234fbf"
                    },
                    {
                        "beacon": "weaviate://localhost/8e7fd6ba-0d23-3249-9a12-46637b4a882d",
                        "href": "/v1/objects/8e7fd6ba-0d23-3249-9a12-46637b4a882d"
                    },
                    {
                        "beacon": "weaviate://localhost/8d0fbace-bbc2-3816-8513-3165e9872915",
                        "href": "/v1/objects/8d0fbace-bbc2-3816-8513-3165e9872915"
                    },
                    {
                        "beacon": "weaviate://localhost/f3004767-1c74-3f64-9ca0-04eae4882196",
                        "href": "/v1/objects/f3004767-1c74-3f64-9ca0-04eae4882196"
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
                        "beacon": "weaviate://localhost/bdf036b0-dbe8-355b-a853-34f905eaa043",
                        "href": "/v1/objects/bdf036b0-dbe8-355b-a853-34f905eaa043"
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
            "class": "Publication",
            "creationTimeUnix": 1618580853818,
            "id": "fa207f19-e080-3902-982c-393d321776be",
            "properties": {
                "hasArticles": [
                    {
                        "beacon": "weaviate://localhost/e62daee4-cb5d-30d2-a09b-8afa0e87b14e",
                        "href": "/v1/objects/e62daee4-cb5d-30d2-a09b-8afa0e87b14e"
                    },
                    {
                        "beacon": "weaviate://localhost/9e21aa2b-e9cd-3d31-b24c-793bd38a08d4",
                        "href": "/v1/objects/9e21aa2b-e9cd-3d31-b24c-793bd38a08d4"
                    },
                    {
                        "beacon": "weaviate://localhost/0e56b0a3-3dd0-3693-b8df-2db4a83d0c03",
                        "href": "/v1/objects/0e56b0a3-3dd0-3693-b8df-2db4a83d0c03"
                    },
                    {
                        "beacon": "weaviate://localhost/905f07c4-2e12-3cad-8fef-f858f7627d4d",
                        "href": "/v1/objects/905f07c4-2e12-3cad-8fef-f858f7627d4d"
                    },
                    {
                        "beacon": "weaviate://localhost/31528292-7463-3922-899a-f9a75c33424f",
                        "href": "/v1/objects/31528292-7463-3922-899a-f9a75c33424f"
                    },
                    {
                        "beacon": "weaviate://localhost/2c8d4036-a779-3c7f-877b-a0142efbd9b2",
                        "href": "/v1/objects/2c8d4036-a779-3c7f-877b-a0142efbd9b2"
                    },
                    {
                        "beacon": "weaviate://localhost/e5d846b6-6587-3490-8d55-eac8ea8f03c9",
                        "href": "/v1/objects/e5d846b6-6587-3490-8d55-eac8ea8f03c9"
                    },
                    {
                        "beacon": "weaviate://localhost/a657da21-c839-3955-a872-42808d52a5c7",
                        "href": "/v1/objects/a657da21-c839-3955-a872-42808d52a5c7"
                    },
                    {
                        "beacon": "weaviate://localhost/e18c0d93-4ad4-36d1-a45a-e8cd12f1753e",
                        "href": "/v1/objects/e18c0d93-4ad4-36d1-a45a-e8cd12f1753e"
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
                        "beacon": "weaviate://localhost/18c30006-fe17-398c-aa47-85af3720eea6",
                        "href": "/v1/objects/18c30006-fe17-398c-aa47-85af3720eea6"
                    },
                    {
                        "beacon": "weaviate://localhost/3a5ea31a-a1f6-38d1-89c8-17ae7b4132ea",
                        "href": "/v1/objects/3a5ea31a-a1f6-38d1-89c8-17ae7b4132ea"
                    },
                    {
                        "beacon": "weaviate://localhost/b31988f1-8036-3968-8d38-36a7a86ac1f3",
                        "href": "/v1/objects/b31988f1-8036-3968-8d38-36a7a86ac1f3"
                    },
                    {
                        "beacon": "weaviate://localhost/626e362c-ba8b-3083-8b9f-4068f7602d2c",
                        "href": "/v1/objects/626e362c-ba8b-3083-8b9f-4068f7602d2c"
                    },
                    {
                        "beacon": "weaviate://localhost/be249c40-6365-33a6-a165-9f8009015337",
                        "href": "/v1/objects/be249c40-6365-33a6-a165-9f8009015337"
                    },
                    {
                        "beacon": "weaviate://localhost/55bc79d5-0f66-30af-a5dd-49a8c6a6a89e",
                        "href": "/v1/objects/55bc79d5-0f66-30af-a5dd-49a8c6a6a89e"
                    },
                    {
                        "beacon": "weaviate://localhost/586a34fa-23fc-3920-abe1-53e7323210ac",
                        "href": "/v1/objects/586a34fa-23fc-3920-abe1-53e7323210ac"
                    },
                    {
                        "beacon": "weaviate://localhost/b6ca17ac-878e-3107-91d6-ba1833b1f808",
                        "href": "/v1/objects/b6ca17ac-878e-3107-91d6-ba1833b1f808"
                    },
                    {
                        "beacon": "weaviate://localhost/23f55a1b-d4b7-3c1d-803c-17caf0f4f9b5",
                        "href": "/v1/objects/23f55a1b-d4b7-3c1d-803c-17caf0f4f9b5"
                    },
                    {
                        "beacon": "weaviate://localhost/30689ac6-277a-34f6-b277-36043ce1bfc5",
                        "href": "/v1/objects/30689ac6-277a-34f6-b277-36043ce1bfc5"
                    },
                    {
                        "beacon": "weaviate://localhost/9d4490b1-353c-3cf6-8eed-a4badbd083dc",
                        "href": "/v1/objects/9d4490b1-353c-3cf6-8eed-a4badbd083dc"
                    },
                    {
                        "beacon": "weaviate://localhost/71051d5e-51d3-3f2d-bbc2-e9c6db6f9afc",
                        "href": "/v1/objects/71051d5e-51d3-3f2d-bbc2-e9c6db6f9afc"
                    },
                    {
                        "beacon": "weaviate://localhost/19a7109e-a55c-3644-88b7-e3ae29092d64",
                        "href": "/v1/objects/19a7109e-a55c-3644-88b7-e3ae29092d64"
                    },
                    {
                        "beacon": "weaviate://localhost/bf2867df-de7f-3a5a-8c4e-0ffa72e0479e",
                        "href": "/v1/objects/bf2867df-de7f-3a5a-8c4e-0ffa72e0479e"
                    },
                    {
                        "beacon": "weaviate://localhost/ddcb8769-1687-3477-b1bf-e37d8e2f6518",
                        "href": "/v1/objects/ddcb8769-1687-3477-b1bf-e37d8e2f6518"
                    },
                    {
                        "beacon": "weaviate://localhost/5a2c35a9-eb91-3937-a26c-f7d37e6a6575",
                        "href": "/v1/objects/5a2c35a9-eb91-3937-a26c-f7d37e6a6575"
                    },
                    {
                        "beacon": "weaviate://localhost/6a6d120f-fd6f-3eeb-b8b0-2c7baac62e51",
                        "href": "/v1/objects/6a6d120f-fd6f-3eeb-b8b0-2c7baac62e51"
                    },
                    {
                        "beacon": "weaviate://localhost/4b4c915e-853d-3cfb-9840-05d6ebc9bb9b",
                        "href": "/v1/objects/4b4c915e-853d-3cfb-9840-05d6ebc9bb9b"
                    },
                    {
                        "beacon": "weaviate://localhost/35221227-49b2-37db-93d7-60065a8616f0",
                        "href": "/v1/objects/35221227-49b2-37db-93d7-60065a8616f0"
                    },
                    {
                        "beacon": "weaviate://localhost/e2f15f9f-b7d7-3f6e-b332-e5726bbe14d2",
                        "href": "/v1/objects/e2f15f9f-b7d7-3f6e-b332-e5726bbe14d2"
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
                        "beacon": "weaviate://localhost/75a5c9cb-9193-3fb8-8194-0e2885fb4dc7",
                        "href": "/v1/objects/75a5c9cb-9193-3fb8-8194-0e2885fb4dc7"
                    },
                    {
                        "beacon": "weaviate://localhost/16a29f50-76d0-3228-985e-dddb23499025",
                        "href": "/v1/objects/16a29f50-76d0-3228-985e-dddb23499025"
                    },
                    {
                        "beacon": "weaviate://localhost/7f9e0298-089c-3b68-bf40-6647726a8eaa",
                        "href": "/v1/objects/7f9e0298-089c-3b68-bf40-6647726a8eaa"
                    },
                    {
                        "beacon": "weaviate://localhost/ed073bc5-c8f1-3d11-9419-311aca1b2f87",
                        "href": "/v1/objects/ed073bc5-c8f1-3d11-9419-311aca1b2f87"
                    },
                    {
                        "beacon": "weaviate://localhost/ed991526-e266-3772-b98b-2721acc4e065",
                        "href": "/v1/objects/ed991526-e266-3772-b98b-2721acc4e065"
                    },
                    {
                        "beacon": "weaviate://localhost/bb6263bc-d241-3a3c-a423-e1356b9e34b0",
                        "href": "/v1/objects/bb6263bc-d241-3a3c-a423-e1356b9e34b0"
                    },
                    {
                        "beacon": "weaviate://localhost/1fe8664f-357e-33b8-abe8-f16cbee02ca6",
                        "href": "/v1/objects/1fe8664f-357e-33b8-abe8-f16cbee02ca6"
                    },
                    {
                        "beacon": "weaviate://localhost/436581e2-5d49-3223-925e-a5a39b0ddadf",
                        "href": "/v1/objects/436581e2-5d49-3223-925e-a5a39b0ddadf"
                    },
                    {
                        "beacon": "weaviate://localhost/d1069963-fa5c-300b-b831-63c7a1a56967",
                        "href": "/v1/objects/d1069963-fa5c-300b-b831-63c7a1a56967"
                    },
                    {
                        "beacon": "weaviate://localhost/fcdf3d86-dbe5-3aad-85a1-b224b1cd34d3",
                        "href": "/v1/objects/fcdf3d86-dbe5-3aad-85a1-b224b1cd34d3"
                    },
                    {
                        "beacon": "weaviate://localhost/cca78d9d-5421-3dc6-a255-f63635b6dd02",
                        "href": "/v1/objects/cca78d9d-5421-3dc6-a255-f63635b6dd02"
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
                        "beacon": "weaviate://localhost/72c3ae2f-f7a1-35e4-ba2e-e0a5950afd79",
                        "href": "/v1/objects/72c3ae2f-f7a1-35e4-ba2e-e0a5950afd79"
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
                        "beacon": "weaviate://localhost/d30f1175-b0ec-3a20-8327-26221a0a24b9",
                        "href": "/v1/objects/d30f1175-b0ec-3a20-8327-26221a0a24b9"
                    },
                    {
                        "beacon": "weaviate://localhost/94b6a838-725a-3d3f-8469-569b197c1fb9",
                        "href": "/v1/objects/94b6a838-725a-3d3f-8469-569b197c1fb9"
                    },
                    {
                        "beacon": "weaviate://localhost/911396ff-cc3e-3c0a-a10b-1f5e2107cd05",
                        "href": "/v1/objects/911396ff-cc3e-3c0a-a10b-1f5e2107cd05"
                    },
                    {
                        "beacon": "weaviate://localhost/a8f284d7-a9d3-3c4e-bd86-035a27afa688",
                        "href": "/v1/objects/a8f284d7-a9d3-3c4e-bd86-035a27afa688"
                    },
                    {
                        "beacon": "weaviate://localhost/fc6322a1-4ea7-35b2-aba8-e097756061c1",
                        "href": "/v1/objects/fc6322a1-4ea7-35b2-aba8-e097756061c1"
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
                        "beacon": "weaviate://localhost/c0325a0d-600d-3eba-9215-04694068e773",
                        "href": "/v1/objects/c0325a0d-600d-3eba-9215-04694068e773"
                    },
                    {
                        "beacon": "weaviate://localhost/2536507e-55cf-3020-b152-645f8191dd4f",
                        "href": "/v1/objects/2536507e-55cf-3020-b152-645f8191dd4f"
                    },
                    {
                        "beacon": "weaviate://localhost/7ae24bb5-10f0-3d8f-b27e-76aa47ea6555",
                        "href": "/v1/objects/7ae24bb5-10f0-3d8f-b27e-76aa47ea6555"
                    },
                    {
                        "beacon": "weaviate://localhost/86000ca6-3fe9-3740-af29-59ba783e47c4",
                        "href": "/v1/objects/86000ca6-3fe9-3740-af29-59ba783e47c4"
                    },
                    {
                        "beacon": "weaviate://localhost/d517e9ac-d812-38be-b005-a7f069c19126",
                        "href": "/v1/objects/d517e9ac-d812-38be-b005-a7f069c19126"
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
                        "beacon": "weaviate://localhost/337c4a2b-7c23-3042-a53d-b878a272b069",
                        "href": "/v1/objects/337c4a2b-7c23-3042-a53d-b878a272b069"
                    },
                    {
                        "beacon": "weaviate://localhost/07471957-c56c-3444-a656-5775e85fb360",
                        "href": "/v1/objects/07471957-c56c-3444-a656-5775e85fb360"
                    },
                    {
                        "beacon": "weaviate://localhost/165f756f-11d5-3fe6-a7a7-65891cf235f4",
                        "href": "/v1/objects/165f756f-11d5-3fe6-a7a7-65891cf235f4"
                    },
                    {
                        "beacon": "weaviate://localhost/e4f770ba-21d2-3e18-8e50-1e2c2e711839",
                        "href": "/v1/objects/e4f770ba-21d2-3e18-8e50-1e2c2e711839"
                    },
                    {
                        "beacon": "weaviate://localhost/78f37abb-b8b9-3975-a1ec-206b0c5ea2c7",
                        "href": "/v1/objects/78f37abb-b8b9-3975-a1ec-206b0c5ea2c7"
                    },
                    {
                        "beacon": "weaviate://localhost/b874fc93-e19b-3170-9e0d-139702b605b9",
                        "href": "/v1/objects/b874fc93-e19b-3170-9e0d-139702b605b9"
                    },
                    {
                        "beacon": "weaviate://localhost/83de749b-874d-3d01-ae11-981657839a27",
                        "href": "/v1/objects/83de749b-874d-3d01-ae11-981657839a27"
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
                        "beacon": "weaviate://localhost/5cf21f83-c403-3265-bd6e-24fd1e903852",
                        "href": "/v1/objects/5cf21f83-c403-3265-bd6e-24fd1e903852"
                    },
                    {
                        "beacon": "weaviate://localhost/6da3c70d-1c36-3712-85c0-c33d7a17e1fd",
                        "href": "/v1/objects/6da3c70d-1c36-3712-85c0-c33d7a17e1fd"
                    },
                    {
                        "beacon": "weaviate://localhost/9afcccf9-a7ec-3d0a-8049-c0fcb83b1486",
                        "href": "/v1/objects/9afcccf9-a7ec-3d0a-8049-c0fcb83b1486"
                    },
                    {
                        "beacon": "weaviate://localhost/8f7ae3c7-cb24-3831-9024-80fa904ea8fa",
                        "href": "/v1/objects/8f7ae3c7-cb24-3831-9024-80fa904ea8fa"
                    },
                    {
                        "beacon": "weaviate://localhost/d92cf80f-c841-3859-8701-42c5b13c68af",
                        "href": "/v1/objects/d92cf80f-c841-3859-8701-42c5b13c68af"
                    },
                    {
                        "beacon": "weaviate://localhost/e05cb6e6-5820-351e-b2d1-5b59969e7a7b",
                        "href": "/v1/objects/e05cb6e6-5820-351e-b2d1-5b59969e7a7b"
                    },
                    {
                        "beacon": "weaviate://localhost/2d90c4bc-5c5e-3a63-b421-e4b1d06767e9",
                        "href": "/v1/objects/2d90c4bc-5c5e-3a63-b421-e4b1d06767e9"
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
                        "beacon": "weaviate://localhost/40ccbdae-319f-3047-a41b-f44d9d4db295",
                        "href": "/v1/objects/40ccbdae-319f-3047-a41b-f44d9d4db295"
                    },
                    {
                        "beacon": "weaviate://localhost/849e6862-0046-312e-aa99-9de5231e7dd6",
                        "href": "/v1/objects/849e6862-0046-312e-aa99-9de5231e7dd6"
                    },
                    {
                        "beacon": "weaviate://localhost/a7c53842-ae62-32ff-a541-aac380b49ad4",
                        "href": "/v1/objects/a7c53842-ae62-32ff-a541-aac380b49ad4"
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
                        "beacon": "weaviate://localhost/4f65484e-7572-342c-a23c-ee8152263f3b",
                        "href": "/v1/objects/4f65484e-7572-342c-a23c-ee8152263f3b"
                    },
                    {
                        "beacon": "weaviate://localhost/3260991f-1e2b-30f4-a40e-f8424f7d9b91",
                        "href": "/v1/objects/3260991f-1e2b-30f4-a40e-f8424f7d9b91"
                    },
                    {
                        "beacon": "weaviate://localhost/4d92cefe-b5e9-3b7c-a050-9fd64f328a19",
                        "href": "/v1/objects/4d92cefe-b5e9-3b7c-a050-9fd64f328a19"
                    },
                    {
                        "beacon": "weaviate://localhost/74f3db11-2a62-3ab0-a8ae-2b4a1e22a460",
                        "href": "/v1/objects/74f3db11-2a62-3ab0-a8ae-2b4a1e22a460"
                    },
                    {
                        "beacon": "weaviate://localhost/5c53f46e-f420-30d4-ab17-7dc5c4ed1914",
                        "href": "/v1/objects/5c53f46e-f420-30d4-ab17-7dc5c4ed1914"
                    },
                    {
                        "beacon": "weaviate://localhost/4fc7af25-6c37-3ae1-91dd-6c6c90547103",
                        "href": "/v1/objects/4fc7af25-6c37-3ae1-91dd-6c6c90547103"
                    },
                    {
                        "beacon": "weaviate://localhost/44737531-5418-3513-9d01-c1f7f7c1713a",
                        "href": "/v1/objects/44737531-5418-3513-9d01-c1f7f7c1713a"
                    },
                    {
                        "beacon": "weaviate://localhost/14f405f0-d19c-3dd0-b2aa-48d0c74fece0",
                        "href": "/v1/objects/14f405f0-d19c-3dd0-b2aa-48d0c74fece0"
                    },
                    {
                        "beacon": "weaviate://localhost/c7c4a3d1-7309-30dc-97b3-50155c6906b2",
                        "href": "/v1/objects/c7c4a3d1-7309-30dc-97b3-50155c6906b2"
                    },
                    {
                        "beacon": "weaviate://localhost/ce9009d7-44e8-3d8d-b5c0-f6c5724158eb",
                        "href": "/v1/objects/ce9009d7-44e8-3d8d-b5c0-f6c5724158eb"
                    },
                    {
                        "beacon": "weaviate://localhost/3354c0f6-f4fd-3967-b947-f1ee5f46d508",
                        "href": "/v1/objects/3354c0f6-f4fd-3967-b947-f1ee5f46d508"
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
                        "beacon": "weaviate://localhost/d0ddd148-069b-389d-87cc-904bca9441ac",
                        "href": "/v1/objects/d0ddd148-069b-389d-87cc-904bca9441ac"
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
                        "beacon": "weaviate://localhost/e39efce2-c494-3017-9c2b-b1fd24ff36a9",
                        "href": "/v1/objects/e39efce2-c494-3017-9c2b-b1fd24ff36a9"
                    },
                    {
                        "beacon": "weaviate://localhost/1c663630-1acb-3094-a53f-d67d1b51eea0",
                        "href": "/v1/objects/1c663630-1acb-3094-a53f-d67d1b51eea0"
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
                        "beacon": "weaviate://localhost/a48e39bd-ca35-36c6-bb60-f0390714472c",
                        "href": "/v1/objects/a48e39bd-ca35-36c6-bb60-f0390714472c"
                    },
                    {
                        "beacon": "weaviate://localhost/02a6ffa1-e4b9-330f-b93c-5f20c9d12655",
                        "href": "/v1/objects/02a6ffa1-e4b9-330f-b93c-5f20c9d12655"
                    },
                    {
                        "beacon": "weaviate://localhost/fb4c8b81-2edf-3357-b7eb-56edcef36af4",
                        "href": "/v1/objects/fb4c8b81-2edf-3357-b7eb-56edcef36af4"
                    },
                    {
                        "beacon": "weaviate://localhost/a535b591-969d-3555-9b7c-478fb8c8e7c3",
                        "href": "/v1/objects/a535b591-969d-3555-9b7c-478fb8c8e7c3"
                    },
                    {
                        "beacon": "weaviate://localhost/99f5aee2-0e0c-37df-b3fb-b705a4f07a27",
                        "href": "/v1/objects/99f5aee2-0e0c-37df-b3fb-b705a4f07a27"
                    },
                    {
                        "beacon": "weaviate://localhost/35e912a4-7340-3f25-b70c-a20ea269f249",
                        "href": "/v1/objects/35e912a4-7340-3f25-b70c-a20ea269f249"
                    },
                    {
                        "beacon": "weaviate://localhost/760eb6ae-5d41-3976-b076-088ecc3d15a1",
                        "href": "/v1/objects/760eb6ae-5d41-3976-b076-088ecc3d15a1"
                    },
                    {
                        "beacon": "weaviate://localhost/2112186a-9b12-3661-9f9d-c3b7a1e414ea",
                        "href": "/v1/objects/2112186a-9b12-3661-9f9d-c3b7a1e414ea"
                    },
                    {
                        "beacon": "weaviate://localhost/55ff6fcf-d9d3-31c0-9042-de9e53019556",
                        "href": "/v1/objects/55ff6fcf-d9d3-31c0-9042-de9e53019556"
                    },
                    {
                        "beacon": "weaviate://localhost/9a64378c-38e8-31e8-a1b1-4676c296fbfa",
                        "href": "/v1/objects/9a64378c-38e8-31e8-a1b1-4676c296fbfa"
                    },
                    {
                        "beacon": "weaviate://localhost/b6c69bba-3d9a-3f31-864e-a15fb6a624eb",
                        "href": "/v1/objects/b6c69bba-3d9a-3f31-864e-a15fb6a624eb"
                    },
                    {
                        "beacon": "weaviate://localhost/0431b67d-10e3-33eb-8734-c11e8282d612",
                        "href": "/v1/objects/0431b67d-10e3-33eb-8734-c11e8282d612"
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
                        "beacon": "weaviate://localhost/de967c00-f079-331f-b375-6680982d3adf",
                        "href": "/v1/objects/de967c00-f079-331f-b375-6680982d3adf"
                    },
                    {
                        "beacon": "weaviate://localhost/de708179-a1c2-3010-95cf-ba010d3e3f46",
                        "href": "/v1/objects/de708179-a1c2-3010-95cf-ba010d3e3f46"
                    },
                    {
                        "beacon": "weaviate://localhost/5b5f5f95-e3d4-303b-9226-4c94963f25a7",
                        "href": "/v1/objects/5b5f5f95-e3d4-303b-9226-4c94963f25a7"
                    },
                    {
                        "beacon": "weaviate://localhost/50b81bec-dfd9-3214-ab88-0c87cd763b90",
                        "href": "/v1/objects/50b81bec-dfd9-3214-ab88-0c87cd763b90"
                    },
                    {
                        "beacon": "weaviate://localhost/cf914c7d-f582-3ed5-8569-2f4f21df1260",
                        "href": "/v1/objects/cf914c7d-f582-3ed5-8569-2f4f21df1260"
                    },
                    {
                        "beacon": "weaviate://localhost/4686de46-3df7-3dea-a6fd-338a896657b8",
                        "href": "/v1/objects/4686de46-3df7-3dea-a6fd-338a896657b8"
                    },
                    {
                        "beacon": "weaviate://localhost/10d47347-eb90-3bbc-88fb-7daa1b7d497c",
                        "href": "/v1/objects/10d47347-eb90-3bbc-88fb-7daa1b7d497c"
                    },
                    {
                        "beacon": "weaviate://localhost/ff7481e1-1eb4-3d68-9f8b-529e430c1dd4",
                        "href": "/v1/objects/ff7481e1-1eb4-3d68-9f8b-529e430c1dd4"
                    },
                    {
                        "beacon": "weaviate://localhost/0c7b2353-57e2-3eda-a7ee-eb317f0da9fd",
                        "href": "/v1/objects/0c7b2353-57e2-3eda-a7ee-eb317f0da9fd"
                    },
                    {
                        "beacon": "weaviate://localhost/9247ee38-0c85-39e2-a373-0122c97c8083",
                        "href": "/v1/objects/9247ee38-0c85-39e2-a373-0122c97c8083"
                    },
                    {
                        "beacon": "weaviate://localhost/025725fd-9fc0-3760-a22f-736c431593d8",
                        "href": "/v1/objects/025725fd-9fc0-3760-a22f-736c431593d8"
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
                        "beacon": "weaviate://localhost/819d36d3-90d4-3443-9eaf-518166214a67",
                        "href": "/v1/objects/819d36d3-90d4-3443-9eaf-518166214a67"
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
                        "beacon": "weaviate://localhost/a633b209-a350-3435-abd7-ea609fe3a7ff",
                        "href": "/v1/objects/a633b209-a350-3435-abd7-ea609fe3a7ff"
                    },
                    {
                        "beacon": "weaviate://localhost/e91536b5-6158-3d53-a03e-5ecae16ef034",
                        "href": "/v1/objects/e91536b5-6158-3d53-a03e-5ecae16ef034"
                    },
                    {
                        "beacon": "weaviate://localhost/0c3fe5fe-1f9e-3a85-89fd-aa53abe46ed4",
                        "href": "/v1/objects/0c3fe5fe-1f9e-3a85-89fd-aa53abe46ed4"
                    },
                    {
                        "beacon": "weaviate://localhost/8ed4602e-9d6e-3aa2-8cf4-c74a95bc21cb",
                        "href": "/v1/objects/8ed4602e-9d6e-3aa2-8cf4-c74a95bc21cb"
                    },
                    {
                        "beacon": "weaviate://localhost/2091acbd-247e-3e95-906b-476bf36aed9e",
                        "href": "/v1/objects/2091acbd-247e-3e95-906b-476bf36aed9e"
                    },
                    {
                        "beacon": "weaviate://localhost/bb2ead7a-7090-33a8-b43d-d51c8fd7448d",
                        "href": "/v1/objects/bb2ead7a-7090-33a8-b43d-d51c8fd7448d"
                    },
                    {
                        "beacon": "weaviate://localhost/0df504f8-1b06-3304-9a1e-2c8178573213",
                        "href": "/v1/objects/0df504f8-1b06-3304-9a1e-2c8178573213"
                    },
                    {
                        "beacon": "weaviate://localhost/5378fab8-7055-3137-9e89-47a40ff27a67",
                        "href": "/v1/objects/5378fab8-7055-3137-9e89-47a40ff27a67"
                    },
                    {
                        "beacon": "weaviate://localhost/1ff2ff90-6740-3c25-9366-ffd916daf7bf",
                        "href": "/v1/objects/1ff2ff90-6740-3c25-9366-ffd916daf7bf"
                    },
                    {
                        "beacon": "weaviate://localhost/ce4eac95-2aed-3e06-b8f3-5e6c62a390ca",
                        "href": "/v1/objects/ce4eac95-2aed-3e06-b8f3-5e6c62a390ca"
                    },
                    {
                        "beacon": "weaviate://localhost/29921b65-26df-3e8d-a0cf-dd88833c421b",
                        "href": "/v1/objects/29921b65-26df-3e8d-a0cf-dd88833c421b"
                    },
                    {
                        "beacon": "weaviate://localhost/366367cd-f24a-391c-9664-bc1e4b911fd0",
                        "href": "/v1/objects/366367cd-f24a-391c-9664-bc1e4b911fd0"
                    },
                    {
                        "beacon": "weaviate://localhost/d487e643-487d-3bdc-b301-d500ec46b0e9",
                        "href": "/v1/objects/d487e643-487d-3bdc-b301-d500ec46b0e9"
                    },
                    {
                        "beacon": "weaviate://localhost/0f3fd7c8-4536-3931-817d-8984f6e83877",
                        "href": "/v1/objects/0f3fd7c8-4536-3931-817d-8984f6e83877"
                    },
                    {
                        "beacon": "weaviate://localhost/af2c0806-a70e-3f22-a567-588088027873",
                        "href": "/v1/objects/af2c0806-a70e-3f22-a567-588088027873"
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
                        "beacon": "weaviate://localhost/e2b83404-6167-302e-a52d-e81b69007232",
                        "href": "/v1/objects/e2b83404-6167-302e-a52d-e81b69007232"
                    },
                    {
                        "beacon": "weaviate://localhost/a0471e5d-0111-37a3-a4e9-40e5129498b6",
                        "href": "/v1/objects/a0471e5d-0111-37a3-a4e9-40e5129498b6"
                    },
                    {
                        "beacon": "weaviate://localhost/e9d4ef4a-204e-3753-b00a-b0dd38c58a1d",
                        "href": "/v1/objects/e9d4ef4a-204e-3753-b00a-b0dd38c58a1d"
                    },
                    {
                        "beacon": "weaviate://localhost/c2d52a25-57c2-3c19-ae65-d3b9193bd8b2",
                        "href": "/v1/objects/c2d52a25-57c2-3c19-ae65-d3b9193bd8b2"
                    },
                    {
                        "beacon": "weaviate://localhost/e9270dc9-384d-3c89-9234-aecc4be6d3b7",
                        "href": "/v1/objects/e9270dc9-384d-3c89-9234-aecc4be6d3b7"
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
                        "beacon": "weaviate://localhost/8cdfc62a-cf67-3da2-a2cd-0dfb5b2d0e5f",
                        "href": "/v1/objects/8cdfc62a-cf67-3da2-a2cd-0dfb5b2d0e5f"
                    },
                    {
                        "beacon": "weaviate://localhost/d7df8e4c-411b-3d4e-a9ae-59e118440396",
                        "href": "/v1/objects/d7df8e4c-411b-3d4e-a9ae-59e118440396"
                    },
                    {
                        "beacon": "weaviate://localhost/1b9095ee-d58c-3864-aaf3-d6eda38ef9d0",
                        "href": "/v1/objects/1b9095ee-d58c-3864-aaf3-d6eda38ef9d0"
                    },
                    {
                        "beacon": "weaviate://localhost/c328c9cd-f9c1-3fe3-b22f-782873697a31",
                        "href": "/v1/objects/c328c9cd-f9c1-3fe3-b22f-782873697a31"
                    },
                    {
                        "beacon": "weaviate://localhost/b270db4e-91ac-3a1b-b712-30851895ad19",
                        "href": "/v1/objects/b270db4e-91ac-3a1b-b712-30851895ad19"
                    },
                    {
                        "beacon": "weaviate://localhost/bb0b09e0-f3f5-38b8-bc2d-51a8f3ea7cac",
                        "href": "/v1/objects/bb0b09e0-f3f5-38b8-bc2d-51a8f3ea7cac"
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
                        "beacon": "weaviate://localhost/e2ba972d-11f2-3b95-98d8-fd8fe6be648a",
                        "href": "/v1/objects/e2ba972d-11f2-3b95-98d8-fd8fe6be648a"
                    },
                    {
                        "beacon": "weaviate://localhost/f4ef5fbd-c43c-3f60-af95-61ca696fb2f3",
                        "href": "/v1/objects/f4ef5fbd-c43c-3f60-af95-61ca696fb2f3"
                    },
                    {
                        "beacon": "weaviate://localhost/c24b7ed1-84ca-3e06-a858-46e328a68d50",
                        "href": "/v1/objects/c24b7ed1-84ca-3e06-a858-46e328a68d50"
                    },
                    {
                        "beacon": "weaviate://localhost/3c625012-5afb-3b16-bb16-3a561b2dc10c",
                        "href": "/v1/objects/3c625012-5afb-3b16-bb16-3a561b2dc10c"
                    },
                    {
                        "beacon": "weaviate://localhost/5e6dd651-b2c9-3eac-aa30-603433c8f1d7",
                        "href": "/v1/objects/5e6dd651-b2c9-3eac-aa30-603433c8f1d7"
                    },
                    {
                        "beacon": "weaviate://localhost/a9d0b2e6-3655-33d4-aadd-7b3fb82fed3d",
                        "href": "/v1/objects/a9d0b2e6-3655-33d4-aadd-7b3fb82fed3d"
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
                        "beacon": "weaviate://localhost/75239541-2b88-3d0b-847a-a34bfc0a0166",
                        "href": "/v1/objects/75239541-2b88-3d0b-847a-a34bfc0a0166"
                    },
                    {
                        "beacon": "weaviate://localhost/da561705-7cd7-3c18-ae0b-12d2a7f5f38f",
                        "href": "/v1/objects/da561705-7cd7-3c18-ae0b-12d2a7f5f38f"
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
                        "beacon": "weaviate://localhost/82c3ce3e-3a44-3a58-b490-6a28aa9fb302",
                        "href": "/v1/objects/82c3ce3e-3a44-3a58-b490-6a28aa9fb302"
                    },
                    {
                        "beacon": "weaviate://localhost/913162b2-aaa5-3015-91cd-99503e1b7922",
                        "href": "/v1/objects/913162b2-aaa5-3015-91cd-99503e1b7922"
                    },
                    {
                        "beacon": "weaviate://localhost/be066cc2-150e-3c20-b6bb-672eb0951dfc",
                        "href": "/v1/objects/be066cc2-150e-3c20-b6bb-672eb0951dfc"
                    },
                    {
                        "beacon": "weaviate://localhost/ef07dfca-42ec-3508-8ee3-e581b5c68188",
                        "href": "/v1/objects/ef07dfca-42ec-3508-8ee3-e581b5c68188"
                    },
                    {
                        "beacon": "weaviate://localhost/970a622c-2d82-3656-9866-74ac716f9779",
                        "href": "/v1/objects/970a622c-2d82-3656-9866-74ac716f9779"
                    },
                    {
                        "beacon": "weaviate://localhost/fbcc1e58-982e-3a62-ac15-30de9bbaca17",
                        "href": "/v1/objects/fbcc1e58-982e-3a62-ac15-30de9bbaca17"
                    },
                    {
                        "beacon": "weaviate://localhost/218d7405-bf28-3ec5-a5c3-c501e3be75f4",
                        "href": "/v1/objects/218d7405-bf28-3ec5-a5c3-c501e3be75f4"
                    },
                    {
                        "beacon": "weaviate://localhost/d784378c-9a61-32c6-a7b2-a31853d71f77",
                        "href": "/v1/objects/d784378c-9a61-32c6-a7b2-a31853d71f77"
                    },
                    {
                        "beacon": "weaviate://localhost/71a11e68-fad3-38c1-9903-08c058b30ac8",
                        "href": "/v1/objects/71a11e68-fad3-38c1-9903-08c058b30ac8"
                    },
                    {
                        "beacon": "weaviate://localhost/ac525e20-fce3-3caa-8376-32f4e2cbbcbd",
                        "href": "/v1/objects/ac525e20-fce3-3caa-8376-32f4e2cbbcbd"
                    },
                    {
                        "beacon": "weaviate://localhost/0d063a0f-ead8-3721-84ac-0738fde02ddd",
                        "href": "/v1/objects/0d063a0f-ead8-3721-84ac-0738fde02ddd"
                    },
                    {
                        "beacon": "weaviate://localhost/c4cd5c83-562f-34b8-a4f6-264c6dd724a1",
                        "href": "/v1/objects/c4cd5c83-562f-34b8-a4f6-264c6dd724a1"
                    },
                    {
                        "beacon": "weaviate://localhost/129445a8-76c5-30ae-a979-43ee88ed8edb",
                        "href": "/v1/objects/129445a8-76c5-30ae-a979-43ee88ed8edb"
                    },
                    {
                        "beacon": "weaviate://localhost/6a291ce4-50e7-38ed-a589-6f2dad51833b",
                        "href": "/v1/objects/6a291ce4-50e7-38ed-a589-6f2dad51833b"
                    },
                    {
                        "beacon": "weaviate://localhost/ab42c2b5-edc8-3a82-a2df-76456abd6322",
                        "href": "/v1/objects/ab42c2b5-edc8-3a82-a2df-76456abd6322"
                    },
                    {
                        "beacon": "weaviate://localhost/d39d0b5b-0af5-3860-82f2-0e14401494e7",
                        "href": "/v1/objects/d39d0b5b-0af5-3860-82f2-0e14401494e7"
                    },
                    {
                        "beacon": "weaviate://localhost/c47fd518-8c07-3055-becb-47881b4757c3",
                        "href": "/v1/objects/c47fd518-8c07-3055-becb-47881b4757c3"
                    },
                    {
                        "beacon": "weaviate://localhost/caf32f64-98c6-321d-8369-30b77ccc02ce",
                        "href": "/v1/objects/caf32f64-98c6-321d-8369-30b77ccc02ce"
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
                        "beacon": "weaviate://localhost/d368bbda-3a61-3a3f-86bf-bc9d8c454cb9",
                        "href": "/v1/objects/d368bbda-3a61-3a3f-86bf-bc9d8c454cb9"
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
                        "beacon": "weaviate://localhost/0c8281dc-9673-341d-9dd7-745860dd872c",
                        "href": "/v1/objects/0c8281dc-9673-341d-9dd7-745860dd872c"
                    },
                    {
                        "beacon": "weaviate://localhost/cded8f15-d7d9-376c-aa76-4d26f132090b",
                        "href": "/v1/objects/cded8f15-d7d9-376c-aa76-4d26f132090b"
                    },
                    {
                        "beacon": "weaviate://localhost/b365738d-0b8f-30e4-bf44-1082c53062ee",
                        "href": "/v1/objects/b365738d-0b8f-30e4-bf44-1082c53062ee"
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
                        "beacon": "weaviate://localhost/26c70832-293e-31e4-9572-0950dad33c9a",
                        "href": "/v1/objects/26c70832-293e-31e4-9572-0950dad33c9a"
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
                        "beacon": "weaviate://localhost/f6a028d0-bfec-3e75-8fd7-79062465c6b8",
                        "href": "/v1/objects/f6a028d0-bfec-3e75-8fd7-79062465c6b8"
                    },
                    {
                        "beacon": "weaviate://localhost/58b35ea1-4a68-35c0-935a-5ebcdbf1e021",
                        "href": "/v1/objects/58b35ea1-4a68-35c0-935a-5ebcdbf1e021"
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
                        "beacon": "weaviate://localhost/be8d5358-1dcc-35ee-80f7-afc981a9a08b",
                        "href": "/v1/objects/be8d5358-1dcc-35ee-80f7-afc981a9a08b"
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
                        "beacon": "weaviate://localhost/4c0c9a8b-95c3-32c3-b18a-cd9bcb68f46a",
                        "href": "/v1/objects/4c0c9a8b-95c3-32c3-b18a-cd9bcb68f46a"
                    },
                    {
                        "beacon": "weaviate://localhost/8ab68890-14b4-3122-8fe0-f99ed9ce57a0",
                        "href": "/v1/objects/8ab68890-14b4-3122-8fe0-f99ed9ce57a0"
                    },
                    {
                        "beacon": "weaviate://localhost/6348f514-3268-35a7-bd5f-838259512b96",
                        "href": "/v1/objects/6348f514-3268-35a7-bd5f-838259512b96"
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
                        "beacon": "weaviate://localhost/ed3f204f-26ad-3a84-9189-c6dd04d2a979",
                        "href": "/v1/objects/ed3f204f-26ad-3a84-9189-c6dd04d2a979"
                    },
                    {
                        "beacon": "weaviate://localhost/992d9d9c-143e-3c9d-a813-7f0307f2c6cf",
                        "href": "/v1/objects/992d9d9c-143e-3c9d-a813-7f0307f2c6cf"
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
                        "beacon": "weaviate://localhost/d5551839-2d76-3069-a156-8479d3bb6e37",
                        "href": "/v1/objects/d5551839-2d76-3069-a156-8479d3bb6e37"
                    },
                    {
                        "beacon": "weaviate://localhost/a78e94b4-cf75-3cba-bc5f-8ca952d0e460",
                        "href": "/v1/objects/a78e94b4-cf75-3cba-bc5f-8ca952d0e460"
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
                        "beacon": "weaviate://localhost/d855ff59-070f-302f-a068-c0c753463acc",
                        "href": "/v1/objects/d855ff59-070f-302f-a068-c0c753463acc"
                    },
                    {
                        "beacon": "weaviate://localhost/431f1de5-14bf-3517-8e1d-fd931b5de7fe",
                        "href": "/v1/objects/431f1de5-14bf-3517-8e1d-fd931b5de7fe"
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
                        "beacon": "weaviate://localhost/e91d51c0-f7a9-36b4-857e-e3dac5c43c6d",
                        "href": "/v1/objects/e91d51c0-f7a9-36b4-857e-e3dac5c43c6d"
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
                        "beacon": "weaviate://localhost/86e4fb25-4f1b-3965-9038-cf40e538dbb0",
                        "href": "/v1/objects/86e4fb25-4f1b-3965-9038-cf40e538dbb0"
                    },
                    {
                        "beacon": "weaviate://localhost/72b4266e-7022-3bf3-b13d-9b8d55eb3e06",
                        "href": "/v1/objects/72b4266e-7022-3bf3-b13d-9b8d55eb3e06"
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
                        "beacon": "weaviate://localhost/7a332c68-b098-306c-b9f3-e94847319f9c",
                        "href": "/v1/objects/7a332c68-b098-306c-b9f3-e94847319f9c"
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
                        "beacon": "weaviate://localhost/3b5af4d6-cb3f-36d3-9e2d-dab4da99b599",
                        "href": "/v1/objects/3b5af4d6-cb3f-36d3-9e2d-dab4da99b599"
                    },
                    {
                        "beacon": "weaviate://localhost/823af619-1465-3263-84ce-fa64e6612979",
                        "href": "/v1/objects/823af619-1465-3263-84ce-fa64e6612979"
                    },
                    {
                        "beacon": "weaviate://localhost/7a0eefa5-dfd6-360c-9013-2a4be2a63412",
                        "href": "/v1/objects/7a0eefa5-dfd6-360c-9013-2a4be2a63412"
                    },
                    {
                        "beacon": "weaviate://localhost/270533a2-ccbb-3327-a22e-c7bc12b4d559",
                        "href": "/v1/objects/270533a2-ccbb-3327-a22e-c7bc12b4d559"
                    },
                    {
                        "beacon": "weaviate://localhost/cf6f007f-70e9-3248-88bf-de239faa5254",
                        "href": "/v1/objects/cf6f007f-70e9-3248-88bf-de239faa5254"
                    },
                    {
                        "beacon": "weaviate://localhost/d659ac5d-42b7-3c14-9987-3aa6235c42dc",
                        "href": "/v1/objects/d659ac5d-42b7-3c14-9987-3aa6235c42dc"
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
            "class": "Author",
            "creationTimeUnix": 1618580880397,
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
            "class": "Author",
            "creationTimeUnix": 1618580886249,
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
            "class": "Author",
            "creationTimeUnix": 1618580887109,
            "id": "002518e2-b2dc-35f5-b6c9-df170f5955f8",
            "properties": {
                "name": "Ariel Levy",
                "writesFor": [
                    {
                        "beacon": "weaviate://localhost/7e9b9ffe-e645-302d-9d94-517670623b35",
                        "href": "/v1/objects/7e9b9ffe-e645-302d-9d94-517670623b35"
                    }
                ],
                "wroteArticles": [
                    {
                        "beacon": "weaviate://localhost/b395e213-51c0-30bf-9d40-9f8deae260d9",
                        "href": "/v1/objects/b395e213-51c0-30bf-9d40-9f8deae260d9"
                    }
                ]
            },
            "vectorWeights": null
        },
        {
            "class": "Author",
            "creationTimeUnix": 1618580895345,
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
            "class": "Author",
            "creationTimeUnix": 1618580894734,
            "id": "0077e1e0-d5e7-3b7c-b2cd-28ee1a46256f",
            "properties": {
                "name": "Louise Erdrich",
                "writesFor": [
                    {
                        "beacon": "weaviate://localhost/7e9b9ffe-e645-302d-9d94-517670623b35",
                        "href": "/v1/objects/7e9b9ffe-e645-302d-9d94-517670623b35"
                    }
                ],
                "wroteArticles": [
                    {
                        "beacon": "weaviate://localhost/bb84aca1-c83c-3f37-9763-ef1d29513445",
                        "href": "/v1/objects/bb84aca1-c83c-3f37-9763-ef1d29513445"
                    }
                ]
            },
            "vectorWeights": null
        },
        {
            "class": "Author",
            "creationTimeUnix": 1618580895344,
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
            "class": "Author",
            "creationTimeUnix": 1618580861318,
            "id": "00867476-fd5c-3302-ada4-0968c2b41b9e",
            "properties": {
                "name": "Charles Gasparino",
                "writesFor": [
                    {
                        "beacon": "weaviate://localhost/16476dca-59ce-395e-b896-050080120cd4",
                        "href": "/v1/objects/16476dca-59ce-395e-b896-050080120cd4"
                    }
                ],
                "wroteArticles": [
                    {
                        "beacon": "weaviate://localhost/de27b3da-12f4-3c80-9799-2b8866f1889a",
                        "href": "/v1/objects/de27b3da-12f4-3c80-9799-2b8866f1889a"
                    }
                ]
            },
            "vectorWeights": null
        },
        {
            "class": "Author",
            "creationTimeUnix": 1618580860888,
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
            "class": "Author",
            "creationTimeUnix": 1618580870674,
            "id": "01710bc2-9726-3de8-91c8-c86506c698ed",
            "properties": {
                "name": "Poppy Noor",
                "writesFor": [
                    {
                        "beacon": "weaviate://localhost/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
                        "href": "/v1/objects/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
                    }
                ],
                "wroteArticles": [
                    {
                        "beacon": "weaviate://localhost/454072f5-5a3b-3a22-8fc8-0e2e2c4c76f8",
                        "href": "/v1/objects/454072f5-5a3b-3a22-8fc8-0e2e2c4c76f8"
                    }
                ]
            },
            "vectorWeights": null
        },
        {
            "class": "Author",
            "creationTimeUnix": 1618580900447,
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
                        "beacon": "weaviate://localhost/71d65805-baa3-3257-b27b-74f928dd34f0",
                        "href": "/v1/objects/71d65805-baa3-3257-b27b-74f928dd34f0"
                    }
                ]
            },
            "vectorWeights": null
        },
        {
            "class": "Author",
            "creationTimeUnix": 1618580913342,
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
            "class": "Author",
            "creationTimeUnix": 1618580896404,
            "id": "02a19f8b-97c4-34ca-ab12-328b472d9150",
            "properties": {
                "name": "Atul Gawande",
                "writesFor": [
                    {
                        "beacon": "weaviate://localhost/7e9b9ffe-e645-302d-9d94-517670623b35",
                        "href": "/v1/objects/7e9b9ffe-e645-302d-9d94-517670623b35"
                    }
                ],
                "wroteArticles": [
                    {
                        "beacon": "weaviate://localhost/d060f3ea-221c-3737-9691-337ada88cd46",
                        "href": "/v1/objects/d060f3ea-221c-3737-9691-337ada88cd46"
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

When querying Weaviate, you will always be using the GraphQL API. Weaviate has a publicly available graphical user interface (GUI) called [the Console](https://console.semi.technology/), which you can use to query.

### Accessing the Console

Go to [console.semi.technology](https://console.semi.technology). Log in and connect to your Weaviate instance (e.g. on `http://localhost:8080`), and then go to 'Query' in the left menu.

### Your First Query

Let's first get all news publications out.

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

You can also find which articles are related to these publications.

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

When querying for articles, you can also add classic filters to narrow down your search.

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

# Automatic classification

If you run the following query, you might notice that there are no categories classified for articles.

```graphql
# GraphQL
{
  Get {
    Article {
      title
      ofCategory {
        ... on Category {
          name
        }
      }
    }
  }
}
```

Here we can use Weaviate's auto-classification function to let Weaviate decide which categories to attach to news publications.

To do this, we will use the RESTful API.

```bash
$ curl http://localhost:8080/v1/classifications -X POST -H 'Content-type: application/json' -d \
'{
    "class": "Article",
    "type": "text2vec-contextionary-contextual",
    "basedOnProperties": [
        "summary"
    ],
    "classifyProperties": [
        "ofCategory"
    ]
}' | jq .
```

When Weaviate is done with the classification, you can rerun the previous query and see how Weaviate classified all articles.

```graphql
# GraphQL
{
  Get {
    Article {
      title
      ofCategory {
        ... on Category {
          name
        }
      }
    }
  }
}
```


By using the RESTful API, you can even get statistics related to the classification. You can find the `{CLASSIFICATION ID}` in the returned body of the query that started the classification.

```bash
$ curl -k http://localhost:8080/v1/classifications/{CLASSIFICATION ID} | jq .
```


# What's next
In this tutorial you learned about how to quickly set up a Weaviate with a demo dataset, use semantic search and classification. Next, check out the following:
- Check out how to [spin up a Weaviate](../getting-started/installation.html) with your own [schema](../tutorials/how-to-create-a-schema.html) and [data](../tutorials/how-to-import-data.html).
- Learn more about [authentication](../configuration/authentication.html) and [authorization](../configuration/authorization.html).
- Install one of the [client libraries](../client-libraries/index.html) for smooth interaction with the Weaviate APIs.
- Consult the [RESTful API references](../restful-api-references/index.html) and the [GraphQL references](../graphql-references/index.html) to learn about all interaction possibilities with Weaviate. 

# More resources

{% include docs-support-links.html %}