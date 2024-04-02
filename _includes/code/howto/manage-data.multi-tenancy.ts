// Howto: Manage data -> Multi-tenancy operations - TypeScript examples

import assert from 'assert';
import weaviate from 'weaviate-client';

const client = await weaviate.connectToWCS(
  'some-endpoint.weaviate.network',
 {
   authCredentials: new weaviate.ApiKey('api-key'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)

const className = 'MultiTenancyCollection';  // aka JeopardyQuestion
try {
  await client.schema.classDeleter().withClassName(className).do();
} catch {
  // Delete the class if it exists
}

// =====================
// ===== Enable MT =====
// =====================

// START EnableMultiTenancy
const result = await client.collections.create({
  name: 'MultiTenancyCollection',
  // highlight-start
  multiTenancy: weaviate.configure.multiTenancy({enabled: true})
  // highlight-end
  }
)
// END EnableMultiTenancy

// ================================
// ===== Add tenants to class =====
// ================================

// START AddTenantsToClass
const multiCollection =  client.collections.get('MultiTenancyCollection');

  // highlight-start
await multiCollection.tenants.create([
  { name: 'tenantA'}, 
  { name: 'tenantB'}
])
  // highlight-end
// END AddTenantsToClass

// Tests
assert.ok(['tenantA', 'tenantB'].includes(tenants[0].name));
assert.ok(['tenantA', 'tenantB'].includes(tenants[1].name));
const theClass = await client.schema.classGetter().withClassName(className).do();
assert.deepEqual(theClass['multiTenancyConfig'], { enabled: true });


// ===================================
// ===== List tenants of a class =====
// ===================================

// START ListTenants
const multiCollection = client.collections.get('MultiTenancyCollection');

// highlight-start
const tenants = multiCollection.tenants.get()
// highlight-end

console.log(tenants)
// END ListTenants

// Test - tenants are returned in nondeterministic order
assert.ok(['tenantA', 'tenantB'].includes(tenants[0].name));
assert.ok(['tenantA', 'tenantB'].includes(tenants[1].name));


// =======================================
// ===== Remove tenants from a class =====
// =======================================

// START RemoveTenants
const multiCollection = client.collections.get('MultiTenancyCollection');

// highlight-start
await multiCollection.tenants.remove([
    { name: 'tenantB'},
    { name: 'tenantX'}  // tenantX will be ignored
])
// highlight-end 
// END RemoveTenants

// Test
tenants = await client.schema.tenantsGetter(className).do();
assert.deepEqual(tenants.length, 1);


// ============================
// ===== Create MT object =====
// ============================

// START CreateMtObject
const multiCollection = client.collections.get('MultiTenancyCollection');

// highlight-start
const multiTenantA = multiCollection.withTenant('TenantA')

const objectA = multiTenantA.data.insert({
  question: 'This vector DB is OSS & supports automatic property type inference on import'
})
// highlight-end 
// END CreateMtObject

// Test
assert.equal(object['tenant'], 'tenantA');


// =====================
// ===== Search MT =====
// =====================

// START Search
const multiCollection = await client.collections.get('MultiTenancyCollection');

// highlight-start
const multiTenantA = multiCollection.withTenant('TenantA')

const objectA = await multiTenantA.query.fetchObjects({
  limit: 2
})
// highlight-end 

console.log(objectA.objects)
// END Search

// Test
assert('question' in result['data']['Get'][className][0]);


// ===============================
// ===== Add cross-reference =====
// ===============================
const category = await client.data.creator()
  .withClassName('JeopardyCategory')  // The class to which the object will be added
  .withProperties({
    category: 'Software',
  })
  .do();

// START AddCrossRef
// Add the cross-reference property to the multi-tenancy class
const multiCollection = await client.collections.get('MultiTenancyCollection');
const categoryId = '...'
const objectId = '...'

// highlight-start
await multiCollection.config.addReference({
  name: 'hasCategory',
  targetCollection: 'JeopardyCategory'
})
// highlight-end

const multiTenantA = multiCollection.withTenant('TenantA')

// highlight-start
await multiTenantA.data.referenceAdd({
  // highlight-end
  fromUuid: objectId,
  fromProperty: 'hasCategory',
  to: categoryId 
})
// END AddCrossRef

// Test
object = await client.data.getterById().withId(object.id).withClassName(className).withTenant('tenantA').do();
assert.equal(object['properties']['hasCategory'][0]['href'], `/v1/objects/JeopardyCategory/${category.id}`);
