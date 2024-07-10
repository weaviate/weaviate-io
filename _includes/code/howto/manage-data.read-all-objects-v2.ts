// How-to: Manage data -> Read all objects - TypeScript examples
// run with: node --loader=ts-node/esm read-all-objects.ts
import assert from 'assert';
import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: 'WEAVIATE_INSTANCE_URL',  // Replace with your Weaviate URL
  apiKey: new ApiKey('YOUR-WEAVIATE-API-KEY'),  // If auth enabled. Replace with your Weaviate instance API key.
});

// ============================
// ===== Read all objects =====
// ============================
{
// START ReadAllProps
// STEP 1 - Prepare a helper function to iterate through data in batches
async function getBatchWithCursor(
  collectionName: string,
  batchSize: number,
  cursor: string
): Promise<any[]> {
  // First prepare the query to run through data
  const query = client.graphql.get()
    .withClassName(collectionName)
    // highlight-start
    .withFields('title description _additional { id }')
    // highlight-end
    .withLimit(batchSize);

    if (cursor) {
    // Fetch the next set of results
    // highlight-start
    let result = await query.withAfter(cursor).do();
    return result.data.Get[collectionName];
    // highlight-end
  } else {
    // Fetch the first set of results
    // highlight-start
    let result = await query.do();
    return result.data.Get[collectionName];
    // highlight-end
  }
}

// STEP 2 - Iterate through the data
let cursor = null;

// Batch import all objects to the target instance
while (true) {
  // Get Request next batch of objects
  // highlight-start
  let nextBatch = await getBatchWithCursor('CollectionName', 100, cursor);
  // highlight-end

  // Break the loop if empty – we are done
  if (nextBatch.length === 0)
    break;

  // highlight-start
  // Here is your next batch of objects
  console.log(JSON.stringify(nextBatch));
  // highlight-end

  // Move the cursor to the last returned uuid
  cursor = nextBatch.at(-1)['_additional']['id'];
}
// END ReadAllProps
}
// =========================================
// ===== Read all objects with Vectors =====
// =========================================
{
// START ReadAllVectors
// STEP 1 - Prepare a helper function to iterate through data in batches
async function getBatchWithCursor(
  collectionName: string,
  batchSize: number,
  cursor: string
): Promise<any[]> {
  const query = client.graphql.get()
    .withClassName(collectionName)
    // highlight-start
    .withFields('title description _additional { id vector }')
    // highlight-end
    .withLimit(batchSize);

  if (cursor) {
    let result = await query.withAfter(cursor).do();
    return result.data.Get[collectionName];
  } else {
    let result = await query.do();
    return result.data.Get[collectionName];
  }
}

// STEP 2 - Iterate through the data
let cursor = null;

while (true) {
  // Request the next batch of objects
  let nextBatch = await getBatchWithCursor('CollectionName', 100, cursor);

  // Break the loop if empty – we are done
  if (nextBatch.length === 0)
    break;

  // Here is your next batch of objects
  console.log(JSON.stringify(nextBatch));

  // Move the cursor to the last returned uuid
  cursor = nextBatch.at(-1)['_additional']['id'];
}
// END ReadAllVectors

}
// =========================================
// ===== Read all objects with Tenants =====
// =========================================
{
// START ReadAllTenants
// STEP 1 - Prepare a helper function to iterate through data in batches
async function getBatchWithCursor(
  collectionName: string,
  tenantName: string,
  batchSize: number,
  cursor: string,
): Promise<any[]> {
  const query = client.graphql.get()
    .withClassName(collectionName)
    // highlight-start
    .withTenant(tenantName)
    // highlight-end
    .withFields('title description _additional { id }')
    .withLimit(batchSize);

  if (cursor) {
    let result = await query.withAfter(cursor).do();
    return result.data.Get[collectionName];
  } else {
    let result = await query.do();
    return result.data.Get[collectionName];
  }
}

// Get Tenants
let tenants = await client.schema
.tenantsGetter('MultiTenancyClass')
.do();

// STEP 2 - Iterate through Tenants
for await (const tenant of tenants) {
  // For each tenant, reset the cursor to the beginning
  let cursor = null;
  
  while (true) {
    // Request the next batch of objects
    let nextBatch = await getBatchWithCursor('MultiTenancyClass', tenant.name, 100, cursor);
    
    // Break the loop if empty – we are done
    if (nextBatch.length === 0)
    break;
  
    // Here is your next batch of objects
    console.log(JSON.stringify(nextBatch));
    
    // Move the cursor to the last returned uuid
    cursor = nextBatch.at(-1)['_additional']['id'];
  }
}
// END ReadAllTenants
}
