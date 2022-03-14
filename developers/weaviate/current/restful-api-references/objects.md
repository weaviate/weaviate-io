---
layout: layout-documentation
solution: weaviate
sub-menu: RESTful API references
title: /v1/objects
intro: 'You can get, add, update, and delete individual data objects to and from a Weaviate via this end-point. If you want to add multiple data objects in one request, checkout the <a href="./batch.html">batch</a> endpoint. To query and search through the data checkout the <a href="../graphql-references/get.html">GraphQL</a> section.'
description: 'You can add individual data objects to a Weaviate via this end-point.'
tags: ['RESTful API', 'references', 'class']
menu-order: 2
open-graph-type: article
og: /img/og/og-documentation/restful-api-references-objects.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/query-data/get.html
    - /documentation/weaviate/current/restful-api-references/semantic-kind.html
    - /developers/weaviate/current/restful-api-references/semantic-kind.html
---

# List all data objects

Lists all data objects in reverse order of creation. The data will be returned as an array of objects

### Method and URL

```js
GET /v1/objects
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `limit` | URL | integer | The maximum number of data objects to return, should be 25 or lower. If you want to retrieve more objects, we recommend using [GraphQL](../graphql-references/get.html). |
| `include` | URL | string | Include additional information, such as classification info. Allowed values include: `classification`, `vector`, `featureProjection` and other module-specific additional properties. |

## Response fields

The response of a `GET` query of a data object will give you information about all objects [(or a single object)](#get-a-data-object). Next to general information about the data objects, like schema information and property values, meta information will be shown depending on the `include` fields or `additional properties` of your request.

| field name | datatype | required `include` or `additional` field |  description |
| ---- | ---- | ---- | ---- |
| `class` | string | none | the class name |
| `creationTimeUnix` | unix timestamp | none | the time stamp of creation of the data object |
| `id` | uuid | none | the uuid of the data object |
| `lastUpdateTimeUnix` | unix timestamp | none | the time stamp when the data object was last updated |
| `properties` > `{property_name}` | dataType | none | the name and value of an individual property |
| `properties` > `{cref_property_name}` > `classification` > `closestLosingDistance` | float | `classification` | The lowest distance of a neighbor in the losing group. Optional. If `k` equals the size of the winning group, there is no losing group. See for more info [here](../tutorials/how-to-do-classification.html).|
| `properties` > `{cref_property_name}` > `classification` > `closestOverallDistance` | float | `classification` | The lowest distance of any neighbor, regardless of whether they were in the winning or losing. See for more info [here](../tutorials/how-to-do-classification.html).|
| `properties` > `{cref_property_name}` > `classification` > `closestWinningDistance` | float | `classification` | Closest distance of a neighbor from the winning group. See for more info [here](../tutorials/how-to-do-classification.html).|
| `properties` > `{cref_property_name}` > `classification` > `losingCount` | integer | `classification` | Size of the losing group, can be 0 if the winning group size equals `k`. See for more info [here](../tutorials/how-to-do-classification.html).|
| `properties` > `{cref_property_name}` > `classification` > `meanLosingDistance` | float | `classification` | The mean distance of the losing group. It is a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. See for more info [here](../tutorials/how-to-do-classification.html).|
| `properties` > `{cref_property_name}` > `classification` > `meanWinningDistance` | float | `classification` | The mean distance of the winning group. It is a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. See for more info [here](../tutorials/how-to-do-classification.html).|
| `properties` > `{cref_property_name}` > `classification` > `overallCount` | integer | `classification` | Overall neighbors checked as part of the classification. In most cases this will equal `k`, but could be lower than `k` - for example if not enough data was present. See for more info [here](../tutorials/how-to-do-classification.html).|
| `properties` > `{cref_property_name}` > `classification` > `winningCount` | integer | `classification` | Size of the winning group, a number between 1 and `k`. See for more info [here](../tutorials/how-to-do-classification.html).
| `vector` | list of floats | `vector` | the long vector of the location of the object in the 300 dimensional space | 
| `classification` > `basedOn` | string |  `classification` | the property name where the classification was based on |
| `classification` > `classifiedFields` | string |  `classification` | the classified property |
| `classification` > `completed` | timestamp |  `classification` | the time of classification completion |
| `classification` > `id` | uuid |  `classification` | the classification id |
| `classification` > `scope` | list of strings |  `classification` | the initial fields to classify |
| `featureProjection` > `vector` | list of floats |  `featureProjection` | the 2D or 3D vector coordinates of the feature projection |

### Example request

{% include code/1.x/semantic-kind.get.html %}

# Create a data object

Create a new data object. The provided meta-data and schema values are validated.

### Performance

💡 This endpoint is meant for individual object creations.

If you have a whole dataset that you plan on importing with Weaviate sending multiple single requests sequentially comes at a large cost:

0. Each sequential request would be handled by a single thread server-side while most of the server resources are idle. In addition, if you only send the second request once the first has been completed, you will wait for a lot of network overhead.
0. It’s much more efficient to parallelize imports. This will minimize the connection overhead and use multiple threads server-side for indexing. 
0. You do not have to do the parallelization yourself, you can use the [`/v1/batch`](./batch.html) endpoint for this. Even if you are sending batches from a single client thread, the objects within a batch will be handled by multiple server threads.
0. Import speeds, especially for large datasets, will drastically improve when using the batching endpoint. 
0. Go to the [`/v1/batch`](./batch.html) endpoint.

### Method and URL

```js
POST /v1/objects
```

### Parameters

The body of the data object for a new object takes the following fields:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `class` | string | yes | the class name as defined in the schema |
| `properties` | array | yes | an object with the property values of the new data object |
| `properties` > `{property_name}` | dataType | yes | the property and its value according to the set dataType |
| `id` | v4 UUID | no | the given id of the data object |

### Example request

{% include code/1.x/semantic-kind.create.html %}

## Create an object with geoCoordinates

If you want to fill the value of a `geoCoordinates` property, you need to specify the `latitude` and `longitude` as decimal degrees in floats:

{% include code/1.x/semantic-kind.create.geocoordinates.html %}

## Create a data object with custom vectors

When you don't want to use a vectorizer to calculate a vector for your data object, and want to enter the vector yourself, you can this this as follows. 

1. First, make sure that the `"vectorizer"` is set to `"none"` in the right class in the [data schema](../data-schema/schema-configuration.html#vectorizer) (`"vectorizer": "none"`). This is important so Weaviate knows not to do rely on any of it's modules to do model inference. *Note: If you are running without any modules and have therefore already configured the default vectorizer to be `"none"` (`DEFAULT_VECTORIZER_MODULE="none"`), you can omit this step.*
2. Then, attach the vector in a special `"vector"` field. An example of this looks like: 

{% include code/1.x/semantic-kind.create.vector.html %}

Learn [here](../graphql-references/filters.html#nearvector-filter) how you can search through custom vectors. 

# Get a data object

Collect an individual data object.

### Method and URL

```bash
GET /v1/objects/{id}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{id}` | URL | uuid | The uuid of the data object to retrieve. |
| `include` | URL | string | Include additional information, such as classification info. Allowed values include: `classification`, `vector` |

### Example request

See [here](#response-fields) the explanation of the response fields.

{% include code/1.x/semantic-kind.object.get.html %}

# Check if a data object exists without retrieving it

This endpoint can be used to check if a data object exists without retrieving
it. Internally it skips reading the object from disk (other than checking if
itis present), thus not using resources on marshalling, parsing, etc.
Additionally the resulting HTTP request has no body, the existance of an object
is indicated solely by the status code (`204` when the object exists, `404`
when it doesn't).

### Method and URL

```bash
HEAD /v1/objects/{id}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{id}` | URL | uuid | The uuid of the data object to retrieve. |

### Example request

{% include code/1.x/semantic-kind.object.head.html %}

# Update a data object

Update an individual data object based on its uuid.

### Method and URL

In the RESTful API, both `PUT` and `PATCH` methods are accepted. `PUT` replaces all property values of the data object, while `PATCH` only overwrites the given properties.

```js
PUT /v1/objects/{id}
```

```js
PATCH /v1/objects/{id}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{id}` | URL | uuid | The uuid of the data object to update. |

The body of the data object for a replacing (some) properties of a object takes the following fields:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `class` | string | yes | the class name as defined in the schema |
| `properties` | array | yes | an object with the property values of the new data object |
| `properties` > `{property_name}` | dataType | yes | the property and its value according to the set dataType |

### Example request

{% include code/1.x/semantic-kind.object.update.html %}

If the update was successful, no content will be returned.

# Delete a data object

Delete an individual data object from Weaviate. 

### Method and URL

```js
DELETE /v1/objects/{id}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{id}` | URL | uuid | The uuid of the data object to delete. |

### Example request

{% include code/1.x/semantic-kind.object.delete.html %}

If the deletion was successful, no content will be returned.

# Validate a data object

You can validate a data object's schema and meta data. 

### Method and URL

```js
POST /v1/objects/validate
```

### Parameters

The body of the data object for a new data object is an object taking the following field:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `class` | string | yes | the class name as defined in the schema |
| `properties` | array | yes | an object with the property values of the new data object |
| `properties` > `{property_name}` | dataType | yes | the property and its value according to the set dataType |
| `id` | v4 uuid | no<sup>*</sup> | The id of the data object. <sup>*</sup>An ID is required by the clients. |

### Example request

{% include code/1.x/semantic-kind.validate.html %}

If the schema of the object is valid, this request should return `True`/`true` in case of the clients and nothing with a plain RESTful request. 

# Cross-references

## Add a cross reference

### Method and URL

```js
POST /v1/objects/{id}/references/{property_name}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{id}` | URL | uuid | The uuid of the data object to add the reference to. |
| `{property_name}` | URL | yes | The name of the cross-reference property

The body of the data object for a new data object is an object taking the following field:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `beacon` | v4 UUID | yes | the beacon URL of the reference |

### Example request

{% include code/1.x/semantic-kind.object.reference.add.html %}

If the addition was successful, no content will be returned.

## Update a cross reference

A `PUT` request updates *all* references of a property of a data object.

### Method and URL

```js
PUT /v1/objects/{id}/references/{property_name}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{id}` | URL | uuid | The uuid of the data object to add the reference to. |
| `{property_name}` | URL | yes | The name of the cross-reference property

The body of the data object for a new data object is a list of beacons:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `beacon` | v4 UUID | yes | the beacon URL of the reference |

### Example request

{% include code/1.x/semantic-kind.object.reference.update.html %}

If the addition was successful, no content will be returned.


## Delete a cross reference

Delete the single reference that is given in the body from the list of references that this property of a data object has.

### Method and URL

```js
DELETE /v1/objects/{id}/references/{property_name}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{id}` | URL | uuid | The uuid of the data object to add the reference to. |
| `{property_name}` | URL | yes | The name of the cross-reference property

The body of the data object for a new data object is a list of beacons:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `beacon` | v4 UUID | yes | the beacon URL of the reference |

### Example request

{% include code/1.x/semantic-kind.object.reference.delete.html %}

If the addition was successful, no content will be returned.
