---
layout: layout-documentation
solution: weaviate
sub-menu: RESTful API references
title: /v1/{semantic kind}
intro: 'You can get, add, update, and delete individual data objects ("Things" or "Actions") to and from a Weaviate via this end-point. If you want to add multiple data objects in one request, checkout the <a href="./batching.html">batching</a> endpoint. To query and search through the data checkout the <a href="../graphql-references/get.html">GraphQL</a> section.'
description: 'You can add individual data objects to a Weaviate via this end-point.'
tags: ['RESTful API', 'references', 'class']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# List all data objects of a semantic kind

Lists all [semantic kind](../more-resources/glossary.html) data objects in reverse order of creation. The data will be returned as an array of [schema data objects](../restful-api-references/#schema-object).

### Method and URL

```js
GET /v1/{semantic_kind}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|
| `limit` | URL | integer | The maximum number of data objects to return. |
| `include` | URL | string | Include additional information, such as classification info. Allowed values include: `classification`, `_classification`, `vector`, `_vector`, `interpretation`, `_interpretation`, `featureProjection`, `_featureProjection`. |

## Response fields

The response of a `GET` query of a data object of any semantic kind will give you information about all objects [(or a single object)](#get-a-data-object). Next to general information about the data objects, like schema information and property values, meta information will be shown depending on the `include` fields or `_underscore properties` of your request.

| field name | datatype | required `include` or `_underscore` field |  description |
| ---- | ---- | ---- | ---- |
| `class` | string | none | the class name |
| `creationTimeUnix` | unix timestamp | none | the time stamp of creation of the data object |
| `id` | uuid | none | the uuid of the data object |
| `lastUpdateTimeUnix` | unix timestamp | none | the time stamp when the data object was last updated |
| `schema` > `{property_name}` | dataType | none | the name and value of an individual property |
| `schema` > `{cref_property_name}` > `_classification` > `closestLosingDistance` | float | `classification`, `_classification` | The lowest distance of a neighbor in the losing group. Optional. If `k` equals the size of the winning group, there is no losing group. See for more info [here](../how-tos/how-to-do-classification.html).|
| `schema` > `{cref_property_name}` > `_classification` > `closestOverallDistance` | float | `classification`, `_classification` | The lowest distance of any neighbor, regardless of whether they were in the winning or losing. See for more info [here](../how-tos/how-to-do-classification.html).|
| `schema` > `{cref_property_name}` > `_classification` > `closestWinningDistance` | float | `classification`, `_classification` | Closest distance of a neighbor from the winning group. See for more info [here](../how-tos/how-to-do-classification.html).|
| `schema` > `{cref_property_name}` > `_classification` > `losingCount` | integer | `classification`, `_classification` | Size of the losing group, can be 0 if the winning group size equals `k`. See for more info [here](../how-tos/how-to-do-classification.html).|
| `schema` > `{cref_property_name}` > `_classification` > `meanLosingDistance` | float | `classification`, `_classification` | The mean distance of the losing group. It is a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. See for more info [here](../how-tos/how-to-do-classification.html).|
| `schema` > `{cref_property_name}` > `_classification` > `meanWinningDistance` | float | `classification`, `_classification` | The mean distance of the winning group. It is a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. See for more info [here](../how-tos/how-to-do-classification.html).|
| `schema` > `{cref_property_name}` > `_classification` > `overallCount` | integer | `classification`, `_classification` | Overall neighbors checked as part of the classification. In most cases this will equal `k`, but could be lower than `k` - for example if not enough data was present. See for more info [here](../how-tos/how-to-do-classification.html).|
| `schema` > `{cref_property_name}` > `_classification` > `winningCount` | integer | `classification`, `_classification` | Size of the winning group, a number between 1 and `k`. See for more info [here](../how-tos/how-to-do-classification.html).
| `_vector` | list of floats | `vector`, `_vector` | the long vector of the location of the object in the 300 dimensional space | 
| `_classification` > `basedOn` | string |  `classification`, `_classification` | the property name where the classification was based on |
| `_classification` > `classifiedFields` | string |  `classification`, `_classification` | the classified property |
| `_classification` > `completed` | timestamp |  `classification`, `_classification` | the time of classification completion |
| `_classification` > `id` | uuid |  `classification`, `_classification` | the classification id |
| `_classification` > `scope` | list of strings |  `classification`, `_classification` | the initial fields to classify |
| `_featureProjection` > `vector` | list of floats |  `featureProjection`, `_featureProjection` | the 2D or 3D vector coordinates of the feature projection |
| `_interpretation` > `source` | list of objects |  `interpretation`, `_interpretation` | vectorization info: the concepts used to vectorize this data object |
| `_interpretation` > `source` > `concept` | string |  `interpretation`, `_interpretation` | the concept used for vectorization |
| `_interpretation` > `source` > `occurrence` | integer |  `interpretation`, `_interpretation` | the number of times this word occurs in the c11y set |
| `_interpretation` > `source` > `weight` | float |  `interpretation`, `_interpretation` | the relative importance and thus influence of this concept on the data object's vector |
| `_nearestNeighbors` > `neighbors` | list of objects |  `nearestNeighbors`, `_nearestNeighbors` | list of nearest neighbors in the semantic space |
| `_nearestNeighbors` > `neighbors` > `concept` | string |  `nearestNeighbors`, `_nearestNeighbors` | the concept |
| `_nearestNeighbors` > `neighbors` > `distance` | float |  `nearestNeighbors`, `_nearestNeighbors` | the distance in space between the data object and the concept |
| `_nearestNeighbors` > `neighbors` > `vector` | list of floats |  `nearestNeighbors`, `_nearestNeighbors` | the 300 dimensional vector coordinate of the concept |

### Example request

{% include code/0.23.2/semantic-kind.get.html %}

### Example response

```json
{
  "deprecations": null,
  "things": [
    {
      "_classification": {
        "basedOn": null,
        "classifiedFields": [
          "ofCategory"
        ],
        "completed": "2020-09-09T14:57:11.816Z",
        "id": "973e3b4c-4c1d-4b51-87d8-4d0343beb7ad",
        "scope": [
          "ofCategory"
        ]
      },
      "class": "Article",
      "creationTimeUnix": 1599650728421,
      "id": "046edbf3-235e-323e-886c-a37b7c1607ec",
      "meta": {
        "classification": {
          "basedOn": null,
          "classifiedFields": [
            "ofCategory"
          ],
          "completed": "2020-09-09T14:57:11.816Z",
          "id": "973e3b4c-4c1d-4b51-87d8-4d0343beb7ad",
          "scope": [
            "ofCategory"
          ]
        }
      },
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/3946d9ea-f1cc-342d-99d7-c33a3bb04077",
            "href": "/v1/things/3946d9ea-f1cc-342d-99d7-c33a3bb04077"
          },
          {
            "beacon": "weaviate://localhost/things/99f05775-5552-3686-87a1-581b5872fb0f",
            "href": "/v1/things/99f05775-5552-3686-87a1-581b5872fb0f"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/212e56a6-e535-3569-ad1b-2215526c1d9d",
            "href": "/v1/things/212e56a6-e535-3569-ad1b-2215526c1d9d"
          }
        ],
        "ofCategory": [
          {
            "_classification": {
              "meanWinningDistance": 0.35781192779541016
            },
            "beacon": "weaviate://localhost/things/ec4bb873-6b75-3f39-8a4b-d38212c9aa5f",
            "href": "/v1/things/ec4bb873-6b75-3f39-8a4b-d38212c9aa5f",
            "meta": {
              "classification": {
                "meanWinningDistance": 0.35781192779541016
              }
            }
          }
        ],
        "summary": "In 1986, Cliff Stoll’s boss at Lawrence Berkeley National Labs tasked him with getting to the bottom of a 75-cent accounting discrepancy in the lab’s computer network, which was rented out to remote users by the minute. Stoll then spent the next year of his life following that hacker’s footprints across the lab’s network and the nascent internet. As The Cuckoo’s Egg hits its 30th anniversary, the book has sold more than 1 million copies. Stoll asks people who have interviewed him to sign his personal copy of The Cuckoo's Egg. Or that the CEO of a credit reporting company could lose his job because of computer security.",
        "title": "Meet The Mad Scientist Who Wrote the Book on How to Hunt Hackers",
        "url": "https://wired.com/story/meet-the-mad-scientist-who-wrote-the-book-on-how-to-hunt-hackers/",
        "wordCount": 509
      },
      "vectorWeights": null
    },
    {
      "_classification": {
        "basedOn": null,
        "classifiedFields": [
          "ofCategory"
        ],
        "completed": "2020-09-09T14:57:11.834Z",
        "id": "973e3b4c-4c1d-4b51-87d8-4d0343beb7ad",
        "scope": [
          "ofCategory"
        ]
      },
      "class": "Article",
      "creationTimeUnix": 1599650728431,
      "id": "bf1156f4-509a-3432-90ee-8b8cba6c5bd1",
      "meta": {
        "classification": {
          "basedOn": null,
          "classifiedFields": [
            "ofCategory"
          ],
          "completed": "2020-09-09T14:57:11.834Z",
          "id": "973e3b4c-4c1d-4b51-87d8-4d0343beb7ad",
          "scope": [
            "ofCategory"
          ]
        }
      },
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/46dbc061-5fe3-3ac5-a87c-c01a301d2b22",
            "href": "/v1/things/46dbc061-5fe3-3ac5-a87c-c01a301d2b22"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/f2968730-9ce5-3e6f-8e64-b6b9f68984b0",
            "href": "/v1/things/f2968730-9ce5-3e6f-8e64-b6b9f68984b0"
          }
        ],
        "ofCategory": [
          {
            "_classification": {
              "meanWinningDistance": 0.41243571043014526
            },
            "beacon": "weaviate://localhost/things/592b8e70-b464-3708-a802-dcfced711c81",
            "href": "/v1/things/592b8e70-b464-3708-a802-dcfced711c81",
            "meta": {
              "classification": {
                "meanWinningDistance": 0.41243571043014526
              }
            }
          }
        ],
        "summary": "Biden, as he did on other occasions, got swept away with puffing himself up and sprinted over the factual line. I wrote another story at the same time about Biden lifting chunks of Robert Kennedy speeches. I ran into him on a back stairway in the Senate when he was getting ready for his news conference. One of his top aides yelled at me and told me I wouldn’t be allowed into Robert Bork’s Supreme Court confirmation hearings, which Biden was chairing. Biden has a talent for messes and has made some bad judgment calls — including voting to authorize the Iraq war.",
        "title": "Opinion | Liar, Liar, Nation on Fire",
        "url": "https://www.nytimes.com/2020/07/11/opinion/sunday/trump-biden-2020.html",
        "wordCount": 242
      },
      "vectorWeights": null
    }
  ],
  "totalResults": 2
}
``` 

# Create a data object

Create a new [semantic kind](../more-resources/glossary.html) data object. The provided meta-data and schema values are validated.

### Method and URL

```js
POST /v1/{semantic_kind}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|

The body of the data object for a new Thing or Action takes the following fields:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `class` | string | yes | the class name as defined in the schema |
| `schema` | array | yes | an object with the property values of the new data object |
| `schema` > `{property_name}` | dataType | yes | the property and its value according to the set dataType |
| `id` | v4 UUID | no | the given id of the data object |

### Example request

{% include code/0.23.2/semantic-kind.create.html %}

### Example response

```json
{
  "class": "Author",
  "creationTimeUnix": 1599748326015,
  "id": "36ddd591-2dee-4e7e-a3cc-eb86d30a4303",
  "lastUpdateTimeUnix": 1599748326015,
  "schema": {
    "name": "Jodi Kantor",
    "writesFor": [
      {
        "beacon": "weaviate://localhost/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80",
        "href": "/v1/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
      }
    ]
  }
}
```

### Adding an object with geoCoordinates

If you want to fill the value of a `geoCoordinates` property, you need to specify the `latitude` and `longitude` as decimal degrees in floats:

{% include code/0.23.2/semantic-kind.create.geocoordinates.html %}


# Get a data object

Collect an individual data object.

### Method and URL

```bash
GET /v1/{semantic_kind}/{id}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|
| `{id}` | URL | uuid | The uuid of the data object to retrieve. |
| `include` | URL | string | Include additional information, such as classification info. Allowed values include: `classification`, `_classification`, `vector`, `_vector`, `interpretation`, `_interpretation`. |

### Example request

See [here](#response-fields) the explanation of the response fields.

{% include code/0.23.2/semantic-kind.object.get.html %}

### Example response

```json
{
  "class": "Author",
  "creationTimeUnix": 1599748237739,
  "id": "36ddd591-2dee-4e7e-a3cc-eb86d30a4303",
  "lastUpdateTimeUnix": 1599748237739,
  "schema": {
    "name": "Jodi Kantor",
    "writesFor": [
      {
        "beacon": "weaviate://localhost/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80",
        "href": "/v1/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
      }
    ]
  },
  "vectorWeights": null
}
```

# Update a data object

Update an individual data object based on its uuid.

### Method and URL

In the RESTful API, both `PUT` and `PATCH` methods are accepted. `PUT` replaces all property values of the data object, while `PATCH` only overwrites the given properties.

```js
PUT /v1/{semantic_kind}/{id}
```

```js
PATCH /v1/{semantic_kind}/{id}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|
| `{id}` | URL | uuid | The uuid of the data object to update. |

The body of the data object for a replacing (some) properties of a Thing or Action takes the following fields:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `class` | string | yes | the class name as defined in the schema |
| `schema` | array | yes | an object with the property values of the new data object |
| `schema` > `{property_name}` | dataType | yes | the property and its value according to the set dataType |

### Example request

{% include code/0.23.2/semantic-kind.object.update.html %}

If the update was successful, no content will be returned.

# Delete a data object

Delete an individual data object from Weaviate. 

*Note: if the data object is a `Thing`, all `Actions` pointing to this thing are also being deleted.*

### Method and URL

```js
DELETE /v1/{semantic_kind}/{id}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{id}` | URL | uuid | The uuid of the data object to delete. |

### Example request

{% include code/0.23.2/semantic-kind.object.delete.html %}

If the deletion was successful, no content will be returned.

# Validate a data object

You can validate a data object's schema and meta data. 

### Method and URL

```js
POST /v1/{semantic_kind}/validate
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|

The body of the data object for a new Thing or Action is an object taking the following field:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `class` | string | yes | the class name as defined in the schema |
| `schema` | array | yes | an object with the property values of the new data object |
| `schema` > `{property_name}` | dataType | yes | the property and its value according to the set dataType |
| `id` | v4 uuid | no<sup>*</sup> | The id of the data object. <sup>*</sup>An ID is required by the clients. |

### Example request

{% include code/0.23.2/semantic-kind.validate.html %}

If the schema of the object is valid, this request should return `True`/`true` in case of the clients and nothing with a plain RESTful request. 

# Cross-references

## Add a cross reference

### Method and URL

```js
POST /v1/{semantic_kind}/{id}/references/{property_name}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|
| `{id}` | URL | uuid | The uuid of the data object to add the reference to. |
| `{property_name}` | URL | yes | The name of the cross-reference property

The body of the data object for a new Thing or Action is an object taking the following field:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `beacon` | v4 UUID | yes | the beacon URL of the reference |

### Example request

{% include code/0.23.2/semantic-kind.object.reference.add.html %}

If the addition was successful, no content will be returned.

## Update a cross reference

A `PUT` request updates *all* references of a property of a data object.

### Method and URL

```js
PUT /v1/{semantic_kind}/{id}/references/{property_name}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|
| `{id}` | URL | uuid | The uuid of the data object to add the reference to. |
| `{property_name}` | URL | yes | The name of the cross-reference property

The body of the data object for a new Thing or Action is a list of beacons:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `beacon` | v4 UUID | yes | the beacon URL of the reference |

### Example request

{% include code/0.23.2/semantic-kind.object.reference.update.html %}

If the addition was successful, no content will be returned.


## Delete a cross reference

Delete the single reference that is given in the body from the list of references that this property of a data object has.

### Method and URL

```js
DELETE /v1/{semantic_kind}/{id}/references/{property_name}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|
| `{id}` | URL | uuid | The uuid of the data object to add the reference to. |
| `{property_name}` | URL | yes | The name of the cross-reference property

The body of the data object for a new Thing or Action is a list of beacons:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `beacon` | v4 UUID | yes | the beacon URL of the reference |

### Example request

{% include code/0.23.2/semantic-kind.object.reference.delete.html %}

If the addition was successful, no content will be returned.
