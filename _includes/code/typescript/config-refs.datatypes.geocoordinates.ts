import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';
import { GeoCoordinate } from 'weaviate-client';

// START ConfigureDataType
import { dataType } from 'weaviate-client';

// END ConfigureDataType

const client: WeaviateClient = await weaviate.connectToLocal();

await client.collections.delete('City');

// START ConfigureDataType
// Create collection
const myCollection = await client.collections.create({
  name: 'City',
  properties: [
    {
      name: 'name',
      dataType: dataType.TEXT,
    },
    {
      name: 'location',
      dataType: dataType.GEO_COORDINATES,
    },
  ],
  // Other properties are omitted for brevity
});
// END ConfigureDataType

// START AddObject
const exampleObject = {
  name: 'Sydney',
  location: {
    latitude: -33.8688,
    longitude: 151.2093
  },
};

const obj_uuid = await myCollection.data.insert(exampleObject);
// END AddObject

const returnedObject = await myCollection.query.fetchObjectById(obj_uuid);

assert.notEqual(obj_uuid, null);
assert((returnedObject?.properties.location as GeoCoordinate).latitude - exampleObject.location.latitude < 0.0001);
assert((returnedObject?.properties.location as GeoCoordinate).longitude - exampleObject.location.longitude < 0.0001);

client.close();
