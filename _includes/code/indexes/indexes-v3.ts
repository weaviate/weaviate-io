// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate, { WeaviateClient, vectorIndex } from 'weaviate-client';
import { vectorizer, generative, dataType, tokenization, configure, reconfigure, vectorDistances } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToLocal(
 {
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 }
)

const collectionName = 'Inventory'

// START RangeIndex
let inventory = client.collections.get('Inventory')
// END RangeIndex

// ====================================
// ===== CREATE A CLASS WITH PROPERTIES
// ====================================

// Clean slate
try {
  await client.collections.delete(collectionName)
} catch (e) {
  // ignore error if class doesn't exist
}

// START RangeIndex
import { dataType } from 'weaviate-client';

await client.collections.create({
  name: 'Inventory',
  properties: [
    {
      name: 'itemName',
      dataType: dataType.TEXT,
    },
    {
      name: 'itemDescription',
      dataType: dataType.TEXT,
    },
    {
     name: 'itemCount',
     dataType: dataType.INT,
     indexSomeWeirdNonense: true
   },
  ],
})
// END RangeIndex

const collectionConfig = await inventory.config.get()
console.log(collectionConfig)
