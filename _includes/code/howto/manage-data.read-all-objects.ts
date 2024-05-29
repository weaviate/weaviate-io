// How-to: Manage data -> Read all objects - TypeScript examples
// run with: node --loader=ts-node/esm read-all-objects.ts
import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

const client = await weaviate.connectToWCD(
  'WEAVIATE_INSTANCE_URL',  // Replace WEAVIATE_INSTANCE_URL with your instance URL
 {
   authCredentials: new weaviate.ApiKey('api-key'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)

// ============================
// ===== Read all objects =====
// ============================
{
// START ReadAllProps
const myCollection = client.collections.get("WineReview");

for await (let item of myCollection.iterator()) {
  console.log(item.uuid, item.properties);
}
// END ReadAllProps
}
// =========================================
// ===== Read all objects with Vectors =====
// =========================================
{
// START ReadAllVectors
const myCollection = client.collections.get("WineReview");

for await (let item of myCollection.iterator({
    includeVector: true
  })) {
    console.log(item.uuid, item.properties);
    console.log(item.vectors);
}
// END ReadAllVectors

}
// =========================================
// ===== Read all objects with Tenants =====
// =========================================
{
// START ReadAllTenants
const multiCollection = client.collections.get("WineReviewMT");

const tenants = await multiCollection.tenants.get()

for (let tenantName in tenants) {
  for await (let item of multiCollection.withTenant(tenantName).iterator()) {
    console.log(`${tenantName}:`, item.properties);
  }
}
// END ReadAllTenants
}
