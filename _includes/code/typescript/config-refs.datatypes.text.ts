import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

// START ConfigureDataType
import { vectorizer, dataType, tokenization } from 'weaviate-client';

// END ConfigureDataType

const client: WeaviateClient = await weaviate.connectToLocal();

const collectionName = 'TestCollection';

// START ConfigureDataType
const myCollection = await client.collections.create({
  name: collectionName,
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
  vectorizers: [
    vectorizer.text2VecOllama({
      name: 'main',
      sourceProperties: ['title', 'genres'],
      apiEndpoint: 'http://host.docker.internal:11434', // If using Docker, use this to contact your local Ollama instance
      model: 'snowflake-arctic-embed', // The model to use, e.g. "nomic-embed-text"
    }),
  ],
});
// END ConfigureDataType

const new_uuid = await myCollection.data.insert({
  title: 'Rogue One',
  movie_id: 'ro123456',
  genres: ['Action', 'Adventure', 'Sci-Fi'],
});

assert.notEqual(new_uuid, null);

client.close();
