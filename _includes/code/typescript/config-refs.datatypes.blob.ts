import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

// START ConfigureDataType
import { dataType } from 'weaviate-client';

// END ConfigureDataType

const client: WeaviateClient = await weaviate.connectToLocal();

await client.collections.delete('Poster');

// START ConfigureDataType
// Create collection
const myCollection = await client.collections.create({
  name: 'Poster',
  properties: [
    {
      name: 'title',
      dataType: dataType.TEXT,
    },
    {
      name: 'image',
      dataType: dataType.BLOB,
    },
  ],
  // Other properties are omitted for brevity
});
// END ConfigureDataType

const blob_string = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

// START AddObject
const exampleObject = {
  title: 'The Matrix',
  image: blob_string
};

const obj_uuid = await myCollection.data.insert(exampleObject);
// END AddObject

const returnedObject = await myCollection.query.fetchObjectById(obj_uuid, {
  returnProperties: ['title', 'image']  // Need to specify `image` to get the blob
});

assert.notEqual(obj_uuid, null);
assert.deepEqual(returnedObject?.properties, exampleObject);

client.close();
