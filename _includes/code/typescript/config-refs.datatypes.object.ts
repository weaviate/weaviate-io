import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

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
      name: 'home_address',
      dataType: dataType.OBJECT,
      nestedProperties: [
        {
          name: 'street',
          dataType: dataType.OBJECT,
          nestedProperties: [
            {
              name: 'number',
              dataType: dataType.INT,
            },
            {
              name: 'name',
              dataType: dataType.TEXT,
            },
          ],
        },
        {
          name: 'city',
          dataType: dataType.TEXT,
        },
      ],
    },
    {
      name: 'office_addresses',
      dataType: dataType.OBJECT_ARRAY,
      nestedProperties: [
        {
          name: 'office_name',
          dataType: dataType.TEXT,
        },
        {
          name: 'street',
          dataType: dataType.OBJECT,
          nestedProperties: [
            {
              name: 'number',
              dataType: dataType.INT,
            },
            {
              name: 'name',
              dataType: dataType.TEXT,
            },
          ],
        },
      ],
    },
  ],
  // Other properties are omitted for brevity
});
// END ConfigureDataType

// START AddObject
const exampleObject = {
  name: 'John Smith',
  home_address: {
    street: {
      number: 123,
      name: 'Main Street',
    },
    city: 'London',
  },
  office_addresses: [
    {
      office_name: 'London HQ',
      street: { number: 456, name: 'Oxford Street' },
    },
    {
      office_name: 'Manchester Branch',
      street: { number: 789, name: 'Piccadilly Gardens' },
    },
  ],
};

const obj_uuid = await myCollection.data.insert(exampleObject);
// END AddObject

const returnedObject = await myCollection.query.fetchObjectById(obj_uuid);

assert.notEqual(obj_uuid, null);
assert.deepEqual(returnedObject?.properties, exampleObject);

client.close();
