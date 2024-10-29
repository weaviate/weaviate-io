import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';
import { PhoneNumber } from 'weaviate-client';

// START ConfigureDataType
import { dataType } from 'weaviate-client';

// END ConfigureDataType

const client: WeaviateClient = await weaviate.connectToLocal();

await client.collections.delete('Person');

// START ConfigureDataType
// Create collection
const myCollection = await client.collections.create({
  name: 'Person',
  properties: [
    {
      name: 'name',
      dataType: dataType.TEXT,
    },
    {
      name: 'phone',
      dataType: dataType.PHONE_NUMBER,
    },
  ],
  // Other properties are omitted for brevity
});
// END ConfigureDataType

// START AddObject
const exampleObject = {
  name: 'Ray Stantz',
  phone: {
    number: '212 555 2368',
    defaultCountry: 'us'
  }
};

const obj_uuid = await myCollection.data.insert(exampleObject);
// END AddObject

const returnedObject = await myCollection.query.fetchObjectById(obj_uuid);

assert.notEqual(obj_uuid, null);
assert((returnedObject?.properties.phone as PhoneNumber).national == 2125552368);

client.close();
