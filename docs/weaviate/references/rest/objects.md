---
title: REST - /v1/objects
sidebar_position: 12
# layout: layout-documentation
# solution: weaviate
# sub-menu: RESTful API references
# title: /v1/objects
# intro: 'You can get, add, update, and delete individual data objects to and from a Weaviate via this end-point. If you want to add multiple data objects in one request, checkout the <a href="./batch.html">batch</a> endpoint. To query and search through the data checkout the <a href="../references/graphql/get.html">GraphQL</a> section.'
# description: 'You can add individual data objects to a Weaviate via this end-point.'
# tags: ['RESTful API', 'references', 'class']
# sidebar_position: 2
# open-graph-type: article
# toc: true
# redirect_from:
#     - /docs/weaviate/v1.1.0/restful-api-references/objects.html
#     - /documentation/weaviate/current/query-data/get.html
#     - /documentation/weaviate/references/rest/semantic-kind.html
#     - /docs/weaviate/restful-api-references/semantic-kind.html
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## List all data objects

Lists all data objects in reverse order of creation. The data will be returned as an array of objects

#### Method and URL

Without any restrictions (across classes, default limit):

```js
GET /v1/objects
```

With optional query params:

```js
GET /v1/objects?class={className}&limit={limit}&include={include}
```

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `limit` | URL Query Parameter (optional) | integer | The maximum number of data objects to return. |
| `include` | URL Query Parameter (optional) | string | Include additional information, such as classification info. Allowed values include: `classification`, `vector`, `featureProjection` and other module-specific additional properties. |
| `class` | URL Query Parameter (optional) | string | List objects by class using the class name. |

#### Response fields

The response of a `GET` query of a data object will give you information about all objects [(or a single object)](#get-a-data-object). Next to general information about the data objects, like schema information and property values, meta information will be shown depending on the `include` fields or `additional properties` of your request.

#### Response format

```js
{
  "objects": [/* list of objects, see below */],
  "deprecations: null,
}

```

#### Object fields

| field name | datatype | required `include` or `additional` field |  description |
| ---- | ---- | ---- | ---- |
| `class` | string | none | the class name |
| `creationTimeUnix` | unix timestamp | none | the time stamp of creation of the data object |
| `id` | uuid | none | the uuid of the data object |
| `lastUpdateTimeUnix` | unix timestamp | none | the time stamp when the data object was last updated |
| `properties` > `{property_name}` | dataType | none | the name and value of an individual property |
| `properties` > `{cref_property_name}` > `classification` > `closestLosingDistance` | float | `classification` | The lowest distance of a neighbor in the losing group. Optional. If `k` equals the size of the winning group, there is no losing group. |
| `properties` > `{cref_property_name}` > `classification` > `closestOverallDistance` | float | `classification` | The lowest distance of any neighbor, regardless of whether they were in the winning or losing. |
| `properties` > `{cref_property_name}` > `classification` > `closestWinningDistance` | float | `classification` | Closest distance of a neighbor from the winning group. |
| `properties` > `{cref_property_name}` > `classification` > `losingCount` | integer | `classification` | Size of the losing group, can be 0 if the winning group size equals `k`. |
| `properties` > `{cref_property_name}` > `classification` > `meanLosingDistance` | float | `classification` | The mean distance of the losing group. It is a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. |
| `properties` > `{cref_property_name}` > `classification` > `meanWinningDistance` | float | `classification` | The mean distance of the winning group. It is a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. |
| `properties` > `{cref_property_name}` > `classification` > `overallCount` | integer | `classification` | Overall neighbors checked as part of the classification. In most cases this will equal `k`, but could be lower than `k` - for example if not enough data was present. |
| `properties` > `{cref_property_name}` > `classification` > `winningCount` | integer | `classification` | Size of the winning group, a number between 1 and `k`. 
| `vector` | list of floats | `vector` | the long vector of the location of the object in the 300 dimensional space | 
| `classification` > `basedOn` | string |  `classification` | the property name where the classification was based on |
| `classification` > `classifiedFields` | string |  `classification` | the classified property |
| `classification` > `completed` | timestamp |  `classification` | the time of classification completion |
| `classification` > `id` | uuid |  `classification` | the classification id |
| `classification` > `scope` | list of strings |  `classification` | the initial fields to classify |
| `featureProjection` > `vector` | list of floats |  `featureProjection` | the 2D or 3D vector coordinates of the feature projection |

#### Status codes and error cases

| Cause | Description | Result |
| --- | --- | --- |
| No objects present | No `?class` is provided. There are no objects present in the entire Weaviate instance. | `200 OK` - No error |
| Valid class, no objects present | `?class` is provided, class exists. There are no objects present for this class | `200 OK` - No error |
| Invalid class | `?class` is provided, class does not exist | `404 Not Found` |
| Validation | Otherwise invalid user request | `422 Unprocessable Entity` |
| Authorization | Not allowed to view resource | `403 Forbidden` | 
| Server-Side error | Correct user input, but request failed for another reason | `500 Internal Server Error` - contains detailed error message |

#### Example request

import SemanticKindGet from '/_includes/code/semantic-kind.get.mdx';

<SemanticKindGet/>

## Create a data object

Create a new data object. The provided meta-data and schema values are validated.

### Performance

💡 This endpoint is meant for individual object creations.

If you have a whole dataset that you plan on importing with Weaviate sending multiple single requests sequentially comes at a large cost:

1. Each sequential request would be handled by a single thread server-side while most of the server resources are idle. In addition, if you only send the second request once the first has been completed, you will wait for a lot of network overhead.
1. It's much more efficient to parallelize imports. This will minimize the connection overhead and use multiple threads server-side for indexing. 
1. You do not have to do the parallelization yourself, you can use the [`/v1/batch`](./batch.md) endpoint for this. Even if you are sending batches from a single client thread, the objects within a batch will be handled by multiple server threads.
1. Import speeds, especially for large datasets, will drastically improve when using the batching endpoint. 
1. Go to the [`/v1/batch`](./batch.md) endpoint.

#### Method and URL

```js
POST /v1/objects
```

*Note: The className is not specified through the URL, as it is part of the request body.*

#### Parameters

The body of the data object for a new object takes the following fields:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `class` | string | yes | the class name as defined in the schema |
| `properties` | array | yes | an object with the property values of the new data object |
| `properties` > `{property_name}` | dataType | yes | the property and its value according to the set dataType |
| `id` | v4 UUID | no | the given id of the data object |

#### Example request

import SemanticKindCreate from '/_includes/code/semantic-kind.create.mdx';

<SemanticKindCreate/>

### Create an object with geoCoordinates

If you want to fill the value of a `geoCoordinates` property, you need to specify the `latitude` and `longitude` as decimal degrees in floats:

import SemanticKindCreateCoords from '/_includes/code/semantic-kind.create.geocoordinates.mdx';

<SemanticKindCreateCoords/>

### Create a data object with a custom vector

When creating a data object, you can configure Weaviate to generate a vector with a vectorizer module, or you can provide the vector yourself. We sometimes refer to this as a "custom" vector. 

You can provide a custom vector during object creation for either when:
- you are not using a vectorizer for that class, or
- you are using a vectorizer, but you wish to bypass it during the object creation stage.
You can create a data object with a custom vector as follows:
1. Set the `"vectorizer"` in the relevant class in the [data schema](../schema/schema-configuration.html#vectorizer). 
    - If you are not using a vectorizer at all, configure the class accordingly. To do this, you can:
        - set the default vectorizer module to `"none"` (`DEFAULT_VECTORIZER_MODULE="none"`), or
        - set the `"vectorizer"` for the class to `"none"` (`"vectorizer": "none"`) (*note: the class `vectorizer` setting will override the `DEFAULT_VECTORIZER_MODULE` parameter*).
    - If you wish to bypass the vectorizer for object creation:
      - set the vectorizer to the same vectorizer with identical settings used to generate the custom vector
    > *Note: There is NO validation of this vector besides checking the vector length.* 
2. Then, attach the vector in a special `"vector"` field during object creation. For example, if adding a single object, you can:
    > *Note: You can set custom vectors for batch imports as well as single object creation.*

import SemanticKindCreateVector from '/_includes/code/semantic-kind.create.vector.mdx';

<SemanticKindCreateVector/>

Learn [here](../graphql/filters.md#nearvector-filter) how you can search through custom vectors. 

## Get a data object

Collect an individual data object.

#### Method and URL

Available since `v1.14` and preferred way:
```bash
GET /v1/objects/{className}/{id}
```

Available for backward compatibility and deprecated:
```bash
GET /v1/objects/{id}
```

import RestObjectsCRUDClassnameNote from '/_includes/rest-objects-crud-classname-note.md';

<RestObjectsCRUDClassnameNote/>

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{className}` |  URL Path | string | The name of the class that the object belongs to. |
| `{id}` | URL Query param | uuid | The uuid of the data object to retrieve. |
| `include` | URL Query param| string | Include additional information, such as classification info. Allowed values include: `classification`, `vector` |

#### Example request

See [here](#response-fields) the explanation of the response fields.

import SemanticKindObjectGet from '/_includes/code/semantic-kind.object.get.mdx';

<SemanticKindObjectGet/>

### Example request for retrieving a data object with consistency_level=QUORUM

import SemanticKindObjectGetReplication from '/_includes/code/replication.get.object.by.id.mdx';

<SemanticKindObjectGetReplication/>

## Check if a data object exists without retrieving it

This endpoint can be used to check if a data object exists without retrieving
it. Internally it skips reading the object from disk (other than checking if
it is present), thus not using resources on marshalling, parsing, etc.
Additionally the resulting HTTP request has no body, the existence of an object
is indicated solely by the status code (`204` when the object exists, `404`
when it doesn't).

#### Method and URL

Available since `v1.14` and preferred way:
```bash
HEAD /v1/objects/{className}/{id}
```

Available for backward compatibility and deprecated:
```bash
HEAD /v1/objects/{id}
```

<RestObjectsCRUDClassnameNote/>

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{className}` |  URL Path | string | The name of the class that the object belongs to. |
| `{id}` | URL | uuid | The uuid of the data object to retrieve. |

#### Example request

import SemanticKindObjectHead from '/_includes/code/semantic-kind.object.head.mdx';

<SemanticKindObjectHead/>

## Update a data object

Update an individual data object based on its uuid.

#### Method and URL

In the RESTful API, both `PUT` and `PATCH` methods are accepted. `PUT` replaces all property values of the data object, while `PATCH` only overwrites the given properties.

Available since `v1.14` and preferred way:
```bash
PUT /v1/objects/{className}/{id}
PATCH /v1/objects/{className}/{id}
```

Available for backward compatibility and deprecated:
```bash
PUT /v1/objects/{id}
PATCH /v1/objects/{id}
```

<RestObjectsCRUDClassnameNote/>

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{className}` |  URL Path | string | The name of the class that the object belongs to. |
| `{id}` | URL | uuid | The uuid of the data object to update. |

The body of the data object for a replacing (some) properties of a object takes the following fields:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `class` | string | yes | the class name as defined in the schema |
| `properties` | array | yes | an object with the property values of the new data object |
| `properties` > `{property_name}` | dataType | yes | the property and its value according to the set dataType |

#### Example request

import SemanticKindObjectUpdate from '/_includes/code/semantic-kind.object.update.mdx';

<SemanticKindObjectUpdate/>

If the update was successful, no content will be returned.

## Delete a data object

Delete an individual data object from Weaviate. 

#### Method and URL

Available since `v1.14` and preferred way:
```js
DELETE /v1/objects/{className}/{id}
```

Available for backward compatibility and deprecated:
```js
DELETE /v1/objects/{id}
```

<RestObjectsCRUDClassnameNote/>

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{className}` |  URL Path | string | The name of the class that the object belongs to. |
| `{id}` | URL | uuid | The uuid of the data object to delete. |

#### Example request

import SemanticKindObjectDelete from '/_includes/code/semantic-kind.object.delete.mdx';

<SemanticKindObjectDelete/>

If the deletion was successful, no content will be returned.

## Validate a data object

You can validate a data object's schema and meta data. 

#### Method and URL

```js
POST /v1/objects/validate
```

*Note: As with creating an object, the className is not specified through the
URL, as it is part of the request body.*

#### Parameters

The body of the data object for a new data object is an object taking the following field:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `class` | string | yes | the class name as defined in the schema |
| `properties` | array | yes | an object with the property values of the new data object |
| `properties` > `{property_name}` | dataType | yes | the property and its value according to the set dataType |
| `id` | v4 uuid | no<sup>*</sup> | The id of the data object. <sup>*</sup>An ID is required by the clients. |

#### Example request

import SemanticKindValidate from '/_includes/code/semantic-kind.validate.mdx';

<SemanticKindValidate/>

If the schema of the object is valid, this request should return `True`/`true` in case of the clients and nothing with a plain RESTful request. 

## Cross-references

### Add a cross reference

#### Method and URL

Available since `v1.14` and preferred way:
```js
POST /v1/objects/{className}/{id}/references/{property_name}
```

Available for backward compatibility and deprecated:
```js
POST /v1/objects/{id}/references/{property_name}
```

<RestObjectsCRUDClassnameNote/>

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{className}` |  URL Path | string | The name of the class that the object belongs to. |
| `{id}` | URL | uuid | The uuid of the data object to add the reference to. |
| `{property_name}` | URL | yes | The name of the cross-reference property

The body of the data object for a new data object is an object taking the following field:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `beacon` | Weaviate Beacon | yes | the beacon URL of the reference, in the format of `weaviate://localhost/<ClassName>/&lt;id&gt;` |

*Note: In the beacon format, you need to always use `localhost` as the host,
rather than the actual hostname. `localhost` refers to the fact that the
beacon's target is on the same Weaviate instance, as opposed to a foreign
instance.*

*Note: For backward compatibility, you can omit the class name in the beacon
format and specify it as weaviate://localhost/&lt;id&gt;. This is, however,
considered deprecated and will be removed with a future release, as duplicate
IDs across classes could mean that this beacon is not uniquely identifiable.*

#### Example request

import SemanticKindObjectReferenceAdd from '/_includes/code/semantic-kind.object.reference.add.mdx';

<SemanticKindObjectReferenceAdd/>

If the addition was successful, no content will be returned.

## Update a cross reference

A `PUT` request updates *all* references of a property of a data object.

#### Method and URL

Available since `v1.14` and preferred way:
```js
PUT /v1/objects/{className}/{id}/references/{property_name}
```

Available for backward compatibility and deprecated:
```js
PUT /v1/objects/{id}/references/{property_name}
```

<RestObjectsCRUDClassnameNote/>

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{className}` |  URL Path | string | The name of the class that the object belongs to. |
| `{id}` | URL | uuid | The uuid of the data object to add the reference to. |
| `{property_name}` | URL | yes | The name of the cross-reference property

The body of the data object for a new data object is a list of beacons:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `beacon` | Weaviate Beacon | yes | the beacon URL of the reference, in the format of `weaviate://localhost/<ClassName>/&lt;id&gt;` |

*Note: In the beacon format, you need to always use `localhost` as the host,
rather than the actual hostname. `localhost` refers to the fact that the
beacon's target is on the same Weaviate instance, as opposed to a foreign
instance.*

*Note: For backward compatibility, you can omit the class name in the beacon
format and specify it as weaviate://localhost/&lt;id&gt;. This is, however,
considered deprecated and will be removed with a future release, as duplicate
IDs across classes could mean that this beacon is not uniquely identifiable.*

#### Example request

import SemanticKindObjectReferenceUpdate from '/_includes/code/semantic-kind.object.reference.update.mdx';

<SemanticKindObjectReferenceUpdate/>

If the addition was successful, no content will be returned.


### Delete a cross reference

Delete the single reference that is given in the body from the list of references that this property of a data object has.

#### Method and URL

Available since `v1.14` and preferred way:
```js
DELETE /v1/objects/{className}/{id}/references/{property_name}
```

Available for backward compatibility and deprecated:
```js
DELETE /v1/objects/{id}/references/{property_name}
```

<RestObjectsCRUDClassnameNote/>

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{id}` | URL | uuid | The uuid of the data object to add the reference to. |
| `{property_name}` | URL | yes | The name of the cross-reference property

The body of the data object for a new data object is a list of beacons:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `beacon` | Weaviate Beacon | yes | the beacon URL of the reference, in the format of `weaviate://localhost/<ClassName>/&lt;id&gt;` |

*Note: In the beacon format, you need to always use `localhost` as the host,
rather than the actual hostname. `localhost` refers to the fact that the
beacon's target is on the same Weaviate instance, as opposed to a foreign
instance.*

*Note: For backward compatibility, beacons generally support an older,
deprecated format without the class name, as well. This means you might find
beacons with the old, deprecated format, as well as beacons with the new format
in the same Weaviate instance. When deleting a reference, the beacon specified
has to match the beacon to be deleted exactly. In other words, if a beacon is
present using the old format (without class id) you also need to specify it the
same way.*

#### Example request

import SemanticKindObjectReferenceDelete from '/_includes/code/semantic-kind.object.reference.delete.mdx';

<SemanticKindObjectReferenceDelete/>

If the addition was successful, no content will be returned.
