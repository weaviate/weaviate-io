import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

// START ConfigureDataType
import { vectorizer, dataType, tokenization } from 'weaviate-client';

// END ConfigureDataType

const client: WeaviateClient = await weaviate.connectToLocal();

await client.collections.delete('Product');

// START ConfigureDataType
// Create collection
const myCollection = await client.collections.create({
  name: 'Product',
  properties: [
    {
      name: 'name',
      dataType: dataType.TEXT,
    },
    {
      name: 'price',
      dataType: dataType.NUMBER,
    },
    {
      name: 'stock_quantity',
      dataType: dataType.INT,
    },
    {
      name: 'is_on_sale',
      dataType: dataType.BOOLEAN,
    },
    {
      name: 'customer_ratings',
      dataType: dataType.NUMBER_ARRAY,
    },
  ],
  // Other properties are omitted for brevity
});
// END ConfigureDataType

// START AddObject
const exampleObject = {
  'name': 'Wireless Headphones',
  'price': 95.50,
  'stock_quantity': 100,
  'is_on_sale': true,
  'customer_ratings': [4.5, 4.8, 4.2],
}

const obj_uuid = await myCollection.data.insert(exampleObject);
// END AddObject

const returnedObject = await myCollection.query.fetchObjectById(obj_uuid);

assert.notEqual(obj_uuid, null);
assert.deepEqual(returnedObject?.properties, exampleObject);


client.close();
