---
title: Text2Vec-Contextionary Quickstart
sidebar_position: 7
image: og/docs/further-guides.jpg
# tags: ['how to', 'schema']
---

# **Run Weaviate with a demo dataset**

There are many different ways how you can run Weaviate, from local development setups up to large scale Kubernetes environments or hosted and managed Weaviate clusters. For this quick start guide we will be using the [Docker Compose](https://docs.docker.com/compose/) setup where you can run Weaviate on your local machine to which we will add the demo dataset with news publications.

The Docker Compose files below contain both Weaviate and the dataset.

Download the Docker Compose file (note, the Dockerfile has GPUs - i.e., CUDA - disabled, this impacts import and query time significantly. If you have a GPU available ([that is reachable with Docker](https://docs.docker.com/compose/gpu-support/)) simply set `ENABLE_CUDA` to `1` in the [dockerfile](https://github.com/weaviate/weaviate-examples/blob/main/weaviate-transformers-newspublications/docker-compose-withgpu.yaml#L27)

```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/weaviate/weaviate-examples/main/weaviate-transformers-newspublications/docker-compose-simple.yml
```

Run Docker (optional: run with `-d` to run Docker in the background)

```bash
docker compose up
```

Weaviate will be available and preloaded with the news article demo dataset on:

- `http://localhost:8080/v1`
- [Via the Console](https://console.weaviate.cloud).

# **Query via the Weaviate console**

You can query your local machine via the [Weaviate console](https://console.weaviate.cloud). In the "Self-hosted Weaviate" input box, fill in `http://localhost:8080/` (you will get redirected to the "http" version of the client).

# **Validate via the RESTful API**

You will always use Weaviate via its HTTP API interface. The interface consists of two different interfaces:

- The RESTful API, which is mostly used to add and manipulate data.
- The GraphQL API (which also runs over HTTP) to query data.

We will first check if Weaviate runs correctly, if the schema is added successfully, and if the data is available. In the example below, we will show you how to do it from the command line.

First, we want to check if Weaviate is running correctly by inspecting the `/v1/meta` endpoint.

_Note: make sure to replace `localhost:8080` with the location of your Weaviate if you have your Weaviate running on a different endpoint or location._

```bash
curl -s http://localhost:8080/v1/meta
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
curl -s http://localhost:8080/v1/schema
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
                        "text"
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
                        "text"
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
                        "text"
                    ],
                    "description": "title of the article",
                    "indexFilterable": true,
                    "indexSearchable": true,
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
                        "text"
                    ],
                    "description": "url of the article",
                    "indexFilterable": false,
                    "indexSearchable": false,
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
                        "text"
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
curl -s http://localhost:8080/v1/objects
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

When querying Weaviate, you will always be using the GraphQL API. Weaviate has a publicly available graphical user interface (GUI) called [the Console](https://console.weaviate.cloud), which you can use to query.

### Accessing the Console

Go to [console.weaviate.cloud](https://console.weaviate.cloud). Log in and connect to your Weaviate instance (e.g. on `http://localhost:8080`), and then go to 'Query' in the left menu.

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
          valueText:"*tax*"
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
curl http://localhost:8080/v1/classifications -X POST -H 'Content-type: application/json' -d \
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
curl -k http://localhost:8080/v1/classifications/{CLASSIFICATION ID} | jq .
```

# What's next
In this tutorial you learned about how to quickly set up a Weaviate with a demo dataset, use semantic search and classification. Next, check out the following:
- Check out how to [spin up a Weaviate](/developers/weaviate/installation/index.md) with your own [schema](../starter-guides/schema.md) and [import](../tutorials/how-to-import-data.md).
- Learn more about [authentication](/developers/weaviate/configuration/authentication.md) and [authorization](/developers/weaviate/configuration/authorization.md).
- Install one of the [client libraries](/developers/weaviate/client-libraries/index.md) for smooth interaction with the Weaviate APIs.
- Consult the [RESTful API references](/developers/weaviate/api/rest/index.md) and the [GraphQL references](../api/graphql/index.md) to learn about all interaction possibilities with Weaviate.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
