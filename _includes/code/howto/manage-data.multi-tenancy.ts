// Howto: Manage data -> Multi-tenancy operations - TypeScript examples

import assert from 'assert';
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',  // TODO: https
  host: 'anon-endpoint.weaviate.network', // TODO: edu-demo.weaviate.network
  // apiKey: new weaviate.ApiKey('learn-weaviate'),
  headers: {
    'X-OpenAI-Api-Key': process.env['OPENAI_API_KEY'],
  },
});

const className = 'MultiTenancyClass';  // aka JeopardyQuestion
try {
  await client.schema.classDeleter().withClassName(className).do();
} catch {
  // Delete the class if it exists
}


// ================================
// ===== Add tenants to class =====
// ================================

// START AddTenantsToClass
await client.schema
  .classCreator().withClass({
    class: 'MultiTenancyClass',
    multiTenancyConfig: { enabled: true },
  })
  .do();

let tenants = await client.schema
  .tenantsCreator('MultiTenancyClass', [{ name: 'tenantA' }, { name: 'tenantB' }])
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
  .tenantsGetter('MultiTenancyClass')
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
  .tenantsDeleter('MultiTenancyClass', ['tenantB', 'tenantX'])  // tenantX will be ignored
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
  .withClassName('MultiTenancyClass')  // The class to which the object will be added
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
  .withClassName('MultiTenancyClass')
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
  .withClassName('MultiTenancyClass')
  .withProperty({
    'name': 'hasCategory',
    'dataType': ['JeopardyCategory'],
  })
  .do();

// Create the cross-reference from MultiTenancyClass object to the JeopardyCategory object
await client.data
  .referenceCreator()
  .withClassName('MultiTenancyClass')
  // highlight-start
  .withTenant('tenantA')
  // highlight-end
  .withId(object.id)  // MultiTenancyClass object id (a Jeopardy question)
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
