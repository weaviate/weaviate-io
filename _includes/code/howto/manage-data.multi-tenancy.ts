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
await client.schema
  .classCreator().withClass({
    class: 'MultiTenancyCollection',
    // highlight-start
    multiTenancyConfig: { enabled: true },
    // highlight-end
  })
  .do();
// END EnableMultiTenancy

// ================================
// ===== Add tenants to class =====
// ================================

// START AddTenantsToClass
let tenants = await client.schema
  // highlight-start
  .tenantsCreator(
    'MultiTenancyCollection',
    [{ name: 'tenantA' }, { name: 'tenantB' }]
  )
  // highlight-end
  .do();
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
tenants = await client.schema
  // highlight-start
  .tenantsGetter('MultiTenancyCollection')
  // highlight-end
  .do();
// END ListTenants

// Test - tenants are returned in nondeterministic order
assert.ok(['tenantA', 'tenantB'].includes(tenants[0].name));
assert.ok(['tenantA', 'tenantB'].includes(tenants[1].name));


// =======================================
// ===== Remove tenants from a class =====
// =======================================

// START RemoveTenants
await client.schema
  // highlight-start
  .tenantsDeleter('MultiTenancyCollection', ['tenantB', 'tenantX'])  // tenantX will be ignored
  // highlight-end
  .do();
// END RemoveTenants

// Test
tenants = await client.schema.tenantsGetter(className).do();
assert.deepEqual(tenants.length, 1);


// ============================
// ===== Create MT object =====
// ============================

// START CreateMtObject
let object = await client.data.creator()
  .withClassName('MultiTenancyCollection')  // The class to which the object will be added
  .withProperties({
    question: 'This vector DB is OSS & supports automatic property type inference on import',
  })
  // highlight-start
  .withTenant('tenantA')  // The tenant to which the object will be added
  // highlight-end
  .do();
// END CreateMtObject

// Test
assert.equal(object['tenant'], 'tenantA');


// =====================
// ===== Search MT =====
// =====================

// START Search
const result = await client.graphql
  .get()
  .withClassName('MultiTenancyCollection')
  .withFields('question')
  // highlight-start
  .withTenant('tenantA')
  // highlight-end
  .do();
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
await client.schema.propertyCreator()
  .withClassName('MultiTenancyCollection')
  .withProperty({
    'name': 'hasCategory',
    'dataType': ['JeopardyCategory'],
  })
  .do();

// Create the cross-reference from MultiTenancyCollection object to the JeopardyCategory object
await client.data
  .referenceCreator()
  .withClassName('MultiTenancyCollection')
  // highlight-start
  .withTenant('tenantA')
  // highlight-end
  .withId(object.id)  // MultiTenancyCollection object id (a Jeopardy question)
  .withReferenceProperty('hasCategory')
  .withReference(
    client.data
      .referencePayloadBuilder()
      .withClassName('JeopardyCategory')
      .withId(category.id)
      .payload()
  )
  .do();
// END AddCrossRef

// Test
object = await client.data.getterById().withId(object.id).withClassName(className).withTenant('tenantA').do();
assert.equal(object['properties']['hasCategory'][0]['href'], `/v1/objects/JeopardyCategory/${category.id}`);
