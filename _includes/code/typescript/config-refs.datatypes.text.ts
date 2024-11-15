import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

// START ConfigureDataType
import { vectorizer, dataType, tokenization } from 'weaviate-client';

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
      tokenization: tokenization.LOWERCASE,
    },
    {
      name: 'movie_id',
      dataType: dataType.TEXT,
      tokenization: tokenization.FIELD,
    },
    {
      name: 'genres',
      dataType: dataType.TEXT_ARRAY,
      tokenization: tokenization.WORD,
    },
  ],
  // END ConfigureDataType
  vectorizers: [
    vectorizer.text2VecOllama({
      name: 'main',
      sourceProperties: ['title', 'genres'],
      apiEndpoint: 'http://host.docker.internal:11434', // If using Docker, use this to contact your local Ollama instance
      model: 'snowflake-arctic-embed', // The model to use, e.g. "nomic-embed-text"
    }),
  ],
  // START ConfigureDataType
  // Other properties are omitted for brevity
});
// END ConfigureDataType

// START AddObject
const exampleObject = {
  title: 'Rogue One',
  movie_id: 'ro123456',
  genres: ['Action', 'Adventure', 'Sci-Fi'],
}

const obj_uuid = await myCollection.data.insert(exampleObject);
// END AddObject

const returnedObject = await myCollection.query.fetchObjectById(obj_uuid);

assert.notEqual(obj_uuid, null);
assert.deepEqual(returnedObject?.properties, exampleObject);


client.close();
