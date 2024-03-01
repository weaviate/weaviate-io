---
title: REST - /v1/objects
sidebar_position: 12
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'class']
---

import BeaconsRequireLocalhost from '/_includes/beacon-localhost.md';
import BeaconsBackCompatOmitClassname from '/_includes/beacons-backcompat-omit-class.md'

## List data objects

:::tip Do you want to list all objects from Weaviate?
Use the [`after`](#exhaustive-listing-using-a-cursor-after) operator.
:::

List data objects in reverse order of creation. The data will be returned as an array of objects.

import HowToGetObjectCount from '/_includes/how.to.get.object.count.mdx';

:::tip After a class object count?
A: This `Aggregate` query will output a total object count in a class.

<HowToGetObjectCount/>
:::

#### Method and URL

Without any restrictions (across classes, default limit = 25):

```http
GET /v1/objects
```

With optional query params:

```http
GET /v1/objects?class={ClassName}&limit={limit}&include={include}
```

#### Parameters

:::note All parameters below are optional URL query parameters
:::

| Name | Type | Description |
| ---- | ---- | ----------- |
| `class` | string | List objects by class using the class name. |
| `limit` | integer | The maximum number of data objects to return. Default 25. |
| `offset` | integer | The offset of objects returned (the starting index of the returned objects).<br/><br/>Cannot be used with `after`.<br/>Should be used in conjunction with `limit`. |
| `after` | string | Returned objects follow the object with this ID. This object is not part of the set.<br/><br/>Must be used with `class`<br/>Cannot be used with `offset` or `sort`.<br/>Should be used in conjunction with `limit`. |
| `include` | string | Include additional information, such as classification info. <br/><br/>Allowed values include: `classification`, `vector`, `featureProjection` and other module-specific additional properties. |
| `sort` | string | Name of the property to sort by - i.e. `sort=city`<br/><br/>You can also provide multiple names – i.e. `sort=country,city` |
| `order` | string | Order in which to sort by.<br/><br/>Possible values: `asc` (default) and `desc`. <br/>Should be used in conjunction with `sort`.|

### Paging: `offset`

:::tip
You can use `limit` and `offset` for paging results.
:::

The `offset` parameter is a flexible way to page results as it allows use with parameters such as `sort`. It is limited by the value of `QUERY_MAXIMUM_RESULTS` which sets the maximum total number of objects that can be listed using this parameter.

Get the first 10 objects:
```http
GET /v1/objects?class=MyClass&limit=10
```

Get the second batch of 10 objects:
```http
GET /v1/objects?class=MyClass&limit=10&offset=10
```

Get the next batch of 10 objects:
```http
GET /v1/objects?class=MyClass&limit=10&offset=20
```

### Exhaustive listing using a cursor: `after`

:::tip
- Available from version `v1.18.0`.
- You can use `class`, `limit` and `after` for listing an entire object set from a class.
- The `after` operator is based on the order of ids. It can therefore only be applied to list queries without sorting.
:::

You can use the `after` operator to retrieve all objects from a Weaviate instance . The `after` operator ("Cursor API") retrieves objects of a class based on the order of ids. You can pass the id of the last retrieved object as a cursor to start the next page.

It is not possible to use the `after` operator without specifying a `class`.

For a null value similar to `offset=0`, set `after=` or `after` (i.e. with an empty string) in the request.

#### Examples

Get the first 10 objects of `MyClass`:
```http
GET /v1/objects?class=MyClass&limit=10
```

If the last object in the retrieved set above was `b1645a32-0c22-5814-8f35-58f142eadf7e`, you can retrieve the next 10 objects of `MyClass` after it as below:

```http
GET /v1/objects?class=MyClass&limit=10&after=b1645a32-0c22-5814-8f35-58f142eadf7e
```

### Example sorting

:::tip
You can use `sort` and `order` to sort your results.
:::

Ascending sort by author_name:
```http
GET /v1/objects?class=Book&sort=author_name
```

Descending sort by author_name:
```http
GET /v1/objects?class=Book&sort=author_name&order=desc
```

Sort by by author_name, and then title.
```http
GET /v1/objects?class=Book&sort=author_name,title
```

Sort by author_name, and then title with order:
```http
GET /v1/objects?class=Book&sort=author_name,title&order=desc,asc
```

### Response fields

The response of a `GET` query of a data object will give you information about all objects [(or a single object)](#get-a-data-object). Next to general information about the data objects, like schema information and property values, meta information will be shown depending on the `include` fields or `additional properties` of your request.

#### Response format

```js
{
  "objects": [/* list of objects, see below */],
  "deprecations": null,
}
```

### Object fields

| Field name | Data type | Required `include` or `additional` field | Description |
| ---------- | --------- | ---------------------------------------- | ----------- |
| `class` | string | none | The class name. |
| `creationTimeUnix` | unix timestamp | none | The time stamp of creation of the data object. |
| `id` | uuid | none | The uuid of the data object. |
| `lastUpdateTimeUnix` | unix timestamp | none | The time stamp when the data object was last updated. |
| `properties` > `{propertyName}` | dataType | none | The name and value of an individual property. |
| `properties` > `{crefPropertyName}` > `classification` > `closestLosingDistance` | float | `classification` | The lowest distance of a neighbor in the losing group. Optional. If `k` equals the size of the winning group, there is no losing group. |
| `properties` > `{crefPropertyName}` > `classification` > `closestOverallDistance` | float | `classification` | The lowest distance of any neighbor, regardless of whether they were in the winning or losing. |
| `properties` > `{crefPropertyName}` > `classification` > `closestWinningDistance` | float | `classification` | Closest distance of a neighbor from the winning group. |
| `properties` > `{crefPropertyName}` > `classification` > `losingCount` | integer | `classification` | Size of the losing group, can be 0 if the winning group size equals `k`. |
| `properties` > `{crefPropertyName}` > `classification` > `meanLosingDistance` | float | `classification` | The mean distance of the losing group. It is a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. |
| `properties` > `{crefPropertyName}` > `classification` > `meanWinningDistance` | float | `classification` | The mean distance of the winning group. It is a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. |
| `properties` > `{crefPropertyName}` > `classification` > `overallCount` | integer | `classification` | Overall neighbors checked as part of the classification. In most cases this will equal `k`, but could be lower than `k` - for example if not enough data was present. |
| `properties` > `{crefPropertyName}` > `classification` > `winningCount` | integer | `classification` | Size of the winning group, a number between 1 and `k`. |
| `vector` | list of floats | `vector` | The vector embedding computed for the object. |
| `classification` > `basedOn` | string |  `classification` | The property name where the classification was based on. |
| `classification` > `classifiedFields` | string |  `classification` | The classified property. |
| `classification` > `completed` | timestamp |  `classification` | The time of classification completion. |
| `classification` > `id` | uuid |  `classification` | The classification id. |
| `classification` > `scope` | list of strings |  `classification` | The initial fields to classify. |
| `featureProjection` > `vector` | list of floats |  `featureProjection` | The 2D or 3D vector coordinates of the feature projection. |

### Status codes and error cases

| Cause | Description | Result |
| ----- | ----------- | ------ |
| No objects present | No `?class` is provided. There are no objects present in the entire Weaviate instance. | `200 OK` - No error |
| Valid class, no objects present | `?class` is provided, class exists. There are no objects present for this class. | `200 OK` - No error |
| Invalid class | `?class` is provided, class does not exist. | `404 Not Found` |
| Validation | Otherwise invalid user request. | `422 Unprocessable Entity` |
| Authorization | Not allowed to view resource. | `403 Forbidden` |
| Server-Side error | Correct user input, but request failed for another reason. | `500 Internal Server Error` - contains detailed error message |

#### Example request

import SemanticKindGet from '/_includes/code/semantic-kind.get.mdx';

<SemanticKindGet/>

## Create a data object

Create a new data object. The provided meta-data and schema values are validated.

#### Method and URL

```http
POST /v1/objects[?consistency_level=ONE|QUORUM|ALL]
```

:::note
The class name is not specified in the URL, as it is part of the request body.
:::

#### Parameters

The URL supports an optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency) query parameter:

| Name | Location | Type | Description |
| ---- | -------- | ---- |------------ |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency): `ONE`, `QUORUM` (default) or `ALL`. |

The request body for a new object has the following fields:

| Name | Type | Required | Description |
| ---- | ---- | -------- |------------ |
| `class` | string | yes | The class name as defined in the schema |
| `properties` | array | yes | An object with the property values of the new data object |
| `properties` > `{propertyName}` | dataType | yes | The property and its value according to the set dataType |
| `id` | v4 UUID | no | Optional id for the object |
| `vector` | `[float]` | no | Optional [custom vector](#with-a-custom-vector) |
| `tenant` | `string` | no | Optional tenant name. [Multi-tenancy](../../concepts/data.md#multi-tenancy) must be enabled first. |

#### Example request

import SemanticKindCreate from '/_includes/code/semantic-kind.create.mdx';

<SemanticKindCreate/>

### `objects` vs `batch`

:::tip
The `objects` endpoint is meant for individual object creations.
:::

If you plan on importing a large number of objects, it's much more efficient to use the [`/v1/batch`](./batch.md) endpoint. Otherwise, sending multiple single requests sequentially would incur a large performance penalty:

1. Each sequential request would be handled by a single thread server-side while most of the server resources are idle. In addition, if you only send the second request once the first has been completed, you will wait for a lot of network overhead.
1. It's much more efficient to parallelize imports. This will minimize the connection overhead and use multiple threads server-side for indexing.
1. You do not have to do the parallelization yourself, you can use the [`/v1/batch`](./batch.md) endpoint for this. Even if you are sending batches from a single client thread, the objects within a batch will be handled by multiple server threads.
1. Import speeds, especially for large datasets, will drastically improve when using the batching endpoint.

:::note Idempotence of POST requests in `objects` and `batch`
The idempotence behavior differs between these two endpoints. POST /batch/objects is idempotent, and will overwrite any existing object given an id. POST /objects will fail if an id is provided which already exists in the class.

To update an existing object with the `objects` endpoint, use the [PUT or PATCH method](#update-a-data-object).
:::

### With geoCoordinates

If you want to supply a [`geoCoordinates`](/developers/weaviate/config-refs/datatypes.md#datatype-geocoordinates) property, you need to specify the `latitude` and `longitude` as floating point decimal degrees:

import SemanticKindCreateCoords from '/_includes/code/semantic-kind.create.geocoordinates.mdx';

<SemanticKindCreateCoords/>

### With a custom vector

When creating a data object, you can configure Weaviate to generate a vector with a vectorizer module, or you can provide the vector yourself. We sometimes refer to this as a "custom" vector.

You can provide a custom vector during object creation either when:
- you are not using a vectorizer for that class, or
- you are using a vectorizer, but you wish to bypass it during the object creation stage.

You can create a data object with a custom vector as follows:
1. Set the `"vectorizer"` in the relevant class in the [data schema](../../manage-data/collections.mdx#specify-a-vectorizer).
    - If you are not using a vectorizer at all, configure the class accordingly. To do this, you can:
        - set the default vectorizer module to `"none"` (`DEFAULT_VECTORIZER_MODULE="none"`), or
        - set the `"vectorizer"` for the class to `"none"` (`"vectorizer": "none"`) (*note: the class `vectorizer` setting will override the `DEFAULT_VECTORIZER_MODULE` parameter*).
    - If you wish to bypass the vectorizer for object creation:
      - set the vectorizer to the same vectorizer with identical settings used to generate the custom vector
    > *Note: There is NO validation of this vector besides checking the vector length.*
2. Then, attach the vector in a special `"vector"` field during object creation. For example, if adding a single object, you can:

import SemanticKindCreateVector from '/_includes/code/semantic-kind.create.vector.mdx';

<SemanticKindCreateVector/>

:::note
You can set custom vectors for batch imports as well as single object creation.
:::

See also [how to search using custom vectors](../graphql/search-operators.md#nearvector).

## Get a data object

Collect an individual data object.

#### Method and URL

Available since `v1.14` and the preferred way:
```bash
GET /v1/objects/{ClassName}/{id}[?consistency_level=ONE|QUORUM|ALL&tenant={tenant}]
```

import RestObjectsCRUDClassnameNote from '/_includes/rest-objects-crud-classname-note.md';

<details>
  <summary>Getting a data object without a class name is deprecated</summary>

The following syntax is deprecated. It is only available for backward compatibility.

```bash
GET /v1/objects/{id}
```

<RestObjectsCRUDClassnameNote/>

</details>


#### URL parameters

| Name | Location | Type | Description |
| ---- |----------| ---- | ----------- |
| `{ClassName}` | path | string | The name of the class that the object belongs to. |
| `{id}` | query param | uuid | The uuid of the data object to retrieve. |
| `include` | query param | string | Include additional information, such as classification info. Allowed values include: `classification`, `vector`. |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-read-consistency): `ONE`, `QUORUM` (default) or `ALL`. |
| `tenant` | query param | string | Optional tenant key. [Multi-tenancy](../../concepts/data.md#multi-tenancy) must be enabled first. |

#### Example request

The [response fields](#response-fields) are explained in the corresponding section above.

import SemanticKindObjectGet from '/_includes/code/semantic-kind.object.get.mdx';

<SemanticKindObjectGet/>


## Check if a data object exists

The same endpoint above can be used with the `HEAD` HTTP method to check if a data object exists without retrieving it. Internally it skips reading the object from disk (other than checking if it is present), thus not using resources on marshalling, parsing, etc.
Additionally, the resulting HTTP request has no body; the existence of an object is indicated solely by the status code (`204` when the object exists, `404` when it doesn't, `422` on invalid ID).

#### Method and URL

Available since `v1.14` and the preferred way:
```bash
HEAD /v1/objects/{ClassName}/{id}[?consistency_level=ONE|QUORUM|ALL]
```

<details>
  <summary>Checking if a data object exists without a class name is deprecated</summary>

The following syntax is deprecated. It is only available for backward compatibility.

```bash
HEAD /v1/objects/{id}
```

<RestObjectsCRUDClassnameNote/>

</details>

#### URL parameters

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `{ClassName}` | path | string | The name of the class that the object belongs to |
| `{id}` | path | uuid | The uuid of the data object to retrieve |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-read-consistency): `ONE`, `QUORUM` (default) or `ALL`. |
| `tenant` | query param | string | Optional tenant name. [Multi-tenancy](../../concepts/data.md#multi-tenancy) must be enabled first. |

#### Example request

import SemanticKindObjectHead from '/_includes/code/semantic-kind.object.head.mdx';

<SemanticKindObjectHead/>

## Update a data object

Update an individual data object based on its uuid.

#### Method and URL

In the RESTful API, both `PUT` and `PATCH` methods are accepted. `PUT` replaces all property values of the data object, while `PATCH` only overwrites the given properties.

Available since `v1.14` and the preferred way:
```bash
PUT /v1/objects/{ClassName}/{id}[?consistency_level=ONE|QUORUM|ALL]
PATCH /v1/objects/{ClassName}/{id}[?consistency_level=ONE|QUORUM|ALL]
```

<details>
  <summary>Updating a data object without a class name are deprecated</summary>

The following syntax is deprecated. It is only available for backward compatibility.

```bash
PUT /v1/objects/{id}
PATCH /v1/objects/{id}
```

<RestObjectsCRUDClassnameNote/>

</details>

:::info Recalculating vectors on update
If the class is configured with a vectorizer, Weaviate will only compute a new vector for an updated object if the update changes the underlying text to be vectorized.
:::

#### Parameters

The URL has two required path parameters and supports an optional query parameter for the [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency):

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `{ClassName}` | path | string | The name of the class that the object belongs to |
| `{id}` | path | uuid | The uuid of the data object to update |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency): `ONE`, `QUORUM` (default) or `ALL`. |

The request body for replacing (some) properties of an object has the following fields:

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `class` | string | yes | The class name as defined in the schema |
| `id` | string | ? | Required for `PUT` to be the same id as the one passed in the URL |
| `properties` | array | yes | An object with the property values of the new data object |
| `properties` > `{propertyName}` | dataType | yes | The property and its value according to the set dataType |
| `vector` | `[float]` | no | Optional [custom vector](#with-a-custom-vector) |
| `tenant` | `string` | no | Optional tenant name. [Multi-tenancy](../../concepts/data.md#multi-tenancy) must be enabled first. |

#### Example request

import SemanticKindObjectUpdate from '/_includes/code/semantic-kind.object.update.mdx';

<SemanticKindObjectUpdate/>

If the update was successful, no content will be returned.

## Delete a data object

Delete an individual data object from Weaviate.

#### Method and URL

Available since `v1.14` and preferred way:
```http
DELETE /v1/objects/{ClassName}/{id}[?consistency_level=ONE|QUORUM|ALL]
```

<details>
  <summary>Deleting a data object without a class name is deprecated</summary>

The following syntax is deprecated. It is only available for backward compatibility.

```bash
DELETE /v1/objects/{id}
```

<RestObjectsCRUDClassnameNote/>

</details>

#### URL parameters

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `{ClassName}` |  path | string | The name of the class that the object belongs to |
| `{id}` | path | uuid | The uuid of the data object to delete |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency): `ONE`, `QUORUM` (default) or `ALL`. |
| `tenant` | query param | string | Optional tenant name. [Multi-tenancy](../../concepts/data.md#multi-tenancy) must be enabled first. |


#### Example request

import SemanticKindObjectDelete from '/_includes/code/semantic-kind.object.delete.mdx';

<SemanticKindObjectDelete/>

If the deletion was successful, no content will be returned.

## Validate a data object

You can validate an object's schema and metadata without creating it. If the schema of the object is valid, the request should return `True`/`true` in case of the clients, and nothing with a plain RESTful request. Otherwise, an error object will be returned.

#### Method and URL

```http
POST /v1/objects/validate
```

:::note
As with creating an object, the class name is not specified through the URL, as it is part of the request body.
:::

#### Parameters

The request body for validating an object has the following fields:

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `class` | string | yes | The class name as defined in the schema |
| `properties` | array | yes | An object with the property values of the new data object |
| `properties` > `{propertyName}` | dataType | yes | The property and its value according to the set dataType |
| `id` | v4 uuid | no<sup>*</sup> | The id of the data object.<br/><sup>*An ID is required by the clients.</sup> |


#### Example request

import SemanticKindValidate from '/_includes/code/semantic-kind.validate.mdx';

<SemanticKindValidate/>


## Cross-references

[Cross-references](../../config-refs/datatypes.md#datatype-cross-reference) are object properties for establishing links from the source object to another object via a [beacon](../../more-resources/glossary.md).

:::note Cross-references do not affect vectors
Creating cross-references does not affect object vectors in either direction.
:::

### Add a cross-reference

`POST` request that adds a reference to the array of cross-references of the given property in the source object specified by its class name and id.

#### Method and URL

Available since `v1.14` and the preferred way:

```http
POST /v1/objects/{ClassName}/{id}/references/{propertyName}[?consistency_level=ONE|QUORUM|ALL]
```

<details>
  <summary>Adding a cross-reference without a class name is deprecated</summary>

The following syntax is deprecated. It is only available for backward compatibility.

```bash
POST /v1/objects/{id}/references/{propertyName}
```

<RestObjectsCRUDClassnameNote/>

</details>

#### Parameters

The URL includes three required path parameters and supports an optional query parameter for the [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency):

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `{ClassName}` |  path | string | The name of the class that the object belongs to, e.g. `Article` |
| `{id}` | path | uuid | The uuid of the object to add the reference to |
| `{propertyName}` | path | string | The name of the cross-reference property, e.g. `author` |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency): `ONE`, `QUORUM` (default) or `ALL`. |
| `tenant` | query param | string | Optional tenant name. [Multi-tenancy](../../concepts/data.md#multi-tenancy) must be enabled first. |

The request body is an object with the following field:

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `beacon` | Weaviate Beacon | yes | The beacon URL of the reference, in the format `weaviate://localhost/<ClassName>/<id>` |

<BeaconsBackCompatOmitClassname />

#### Example request

import SemanticKindObjectReferenceAdd from '/_includes/code/semantic-kind.object.reference.add.mdx';

<SemanticKindObjectReferenceAdd/>

If the addition was successful, no content will be returned.

### Update a cross-reference

`PUT` request that updates *all* references in a specified property of an object specified by its class name and id.

#### Method and URL

Available since `v1.14` and the preferred way:
```http
PUT /v1/objects/{ClassName}/{id}/references/{propertyName}[?consistency_level=ONE|QUORUM|ALL]
```

<details>
  <summary>Updating a cross-reference without a class name is deprecated</summary>

The following syntax is deprecated. It is only available for backward compatibility.

```bash
PUT /v1/objects/{id}/references/{propertyName}
```

<RestObjectsCRUDClassnameNote/>

</details>

#### Parameters

The URL includes three required path parameters and supports an optional query parameter for the [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency):

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `{ClassName}` | path | string | The name of the class that the object belongs to |
| `{id}` | path | uuid | The uuid of the object to update the reference(s) of |
| `{propertyName}` | path | string | The name of the cross-reference property |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency): `ONE`, `QUORUM` (default) or `ALL`. |
| `tenant` | query param | string | Optional tenant name. [Multi-tenancy](../../concepts/data.md#multi-tenancy) must be enabled first. |

The `PUT` request body is a list of beacons:

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `beacon` | Weaviate Beacon array | yes | Array of beacons in the format `weaviate://localhost/<ClassName>/<id>` |

<BeaconsBackCompatOmitClassname />

#### Example request

import SemanticKindObjectReferenceUpdate from '/_includes/code/semantic-kind.object.reference.update.mdx';

<SemanticKindObjectReferenceUpdate/>

If the update was successful, no content will be returned.


### Delete a cross-reference

Delete the single reference that is given in the body from the list of references that the specified property of a given object has, if it exists in the list. Returns `204 No Content` either way.

#### Method and URL

Available since `v1.14` and the preferred way:
```http
DELETE /v1/objects/{ClassName}/{id}/references/{propertyName}[?consistency_level=ONE|QUORUM|ALL]
```

<details>
  <summary>Deleting a cross-reference without a class name is deprecated</summary>

The following syntax is deprecated. It is only available for backward compatibility.

```bash
DELETE /v1/objects/{id}/references/{propertyName}
```

<RestObjectsCRUDClassnameNote/>

</details>

#### Parameters

The URL includes two required path parameters and supports an optional query parameter for the [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency):

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `{id}` | path | uuid | The uuid of the object to delete the reference from |
| `{propertyName}` | path | string | The name of the cross-reference property |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency): `ONE`, `QUORUM` (default) or `ALL`. |
| `tenant` | query param | string | Optional tenant name. [Multi-tenancy](../../concepts/data.md#multi-tenancy) must be enabled first. |

The request body is a beacon object:

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `beacon` | Weaviate Beacon | yes | The beacon URL of the reference, formatted as `weaviate://localhost/<ClassName>/<id>` |

:::note
For backward compatibility, beacons generally support an older,
deprecated format without the class name, as well. This means you might find
beacons with the old, deprecated format, as well as beacons with the new format
in the same Weaviate instance. When deleting a reference, the beacon specified
has to match the beacon to be deleted exactly. In other words, if a beacon is
present using the old format (without class id) you also need to specify it the
same way.
:::

#### Example request

import SemanticKindObjectReferenceDelete from '/_includes/code/semantic-kind.object.reference.delete.mdx';

<SemanticKindObjectReferenceDelete/>

If the addition was successful, no content will be returned.

### Multi-tenancy

When using multi-tenancy, cross-references can only be made:

- From a multi-tenancy object to a non-multi-tenancy object.
- From a multi-tenancy object to a multi-tenancy object, as long as they belong to the same tenant.

## Notes

<BeaconsRequireLocalhost />

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />