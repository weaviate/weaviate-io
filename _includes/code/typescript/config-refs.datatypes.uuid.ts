import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

// START ConfigureDataType
import { dataType } from 'weaviate-client';
import { generateUuid5 } from 'weaviate-client';

// END ConfigureDataType

const client: WeaviateClient = await weaviate.connectToLocal();

await client.collections.delete('Movie');

// START ConfigureDataType
// Create collection
const myCollection = await client.collections.create({
  name: 'Movie',
  properties: [
    {
      name: 'title',
      dataType: dataType.TEXT,
    },
    {
      name: 'movie_uuid',
      dataType: dataType.UUID,
    },
    {
      name: 'related_movie_uuids',
      dataType: dataType.UUID_ARRAY,
    },
  ],
  // Other properties are omitted for brevity
});
// END ConfigureDataType

// START AddObject
const exampleObject = {
  title: 'The Matrix',
  movie_uuid: generateUuid5('The Matrix'),
  related_movie_uuids: [
    generateUuid5('The Matrix Reloaded'),
    generateUuid5('The Matrix Revolutions'),
    generateUuid5('The Matrix Resurrections'),
  ],
};

const obj_uuid = await myCollection.data.insert(exampleObject);
// END AddObject

const returnedObject = await myCollection.query.fetchObjectById(obj_uuid);

assert.notEqual(obj_uuid, null);
assert.deepEqual(returnedObject?.properties, exampleObject);

client.close();
