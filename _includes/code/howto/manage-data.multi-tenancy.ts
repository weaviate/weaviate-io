// Howto: Manage data -> Multi-tenancy operations - TypeScript examples

import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 }
)

const collectionName = 'MultiTenancyCollection';  // aka JeopardyQuestion

try {
  // await client.schema.classDeleter().withClassName(className).do();
  await client.collections.create({
    name: collectionName
  })

} catch {
  // Delete the class if it exists
}

// START AddTenantsToClass // START ListTenants // START CreateMtObject // START AddCrossRef
const multiCollection =  client.collections.get('MultiTenancyCollection');
// END AddTenantsToClass // END ListTenants // END CreateMtObject // END AddCrossRef


// =====================
// ===== Enable MT =====
// =====================
{
// START EnableMultiTenancy
const result = await client.collections.create({
  name: 'MultiTenancyCollection',
  // highlight-start
  multiTenancy: weaviate.configure.multiTenancy({enabled: true, autoTenantCreation: true})
  // highlight-end
})
// END EnableMultiTenancy
}

// =====================
// ===== Enable autoMT =====
// =====================
{
// START EnableAutoMT
const result = await client.collections.create({
  name: 'MultiTenancyCollection',
  multiTenancy: weaviate.configure.multiTenancy({
    enabled: true,
    // highlight-start
    autoTenantCreation: true
    // highlight-end
  })
})
// END EnableAutoMT
}

// ==========================
// ===== Update Auto MT =====
// ==========================

{
// START enable autoMT
// Coming soon
// END enable autoMT
}

// ================================
// ===== Add tenants to class =====
// ================================
{
// START AddTenantsToClass

  // highlight-start
await multiCollection.tenants.create([
  { name: 'tenantA'},
  { name: 'tenantB'}
])
  // highlight-end
// END AddTenantsToClass

// Tests
let tenants = await multiCollection.tenants.get()

assert.ok(['tenantA', 'tenantB'].includes(tenants[0].name));
assert.ok(['tenantA', 'tenantB'].includes(tenants[1].name));
// what does this do?
// const theCollection = await client.schema.classGetter().withClassName(className).do();
// assert.deepEqual(theCollection['multiTenancyConfig'], { enabled: true });

}
// ===================================
// ===== List tenants of a class =====
// ===================================
{
// START ListTenants

// highlight-start
let tenants = await multiCollection.tenants.get()
// highlight-end

console.log(tenants)
// END ListTenants

// Test - tenants are returned in nondeterministic order
assert.ok(['tenantA', 'tenantB'].includes(tenants[0].name));
assert.ok(['tenantA', 'tenantB'].includes(tenants[1].name));
}

// =======================================
// ===== Get tenants from a collection by name =====
// =======================================
{
// START GetTenantsByName
const multiCollection =  client.collections.get('MultiTenancyCollection');

// highlight-start
const tenants = await multiCollection.tenants.getByNames(['tenantA', 'tenantB'])
// highlight-end
console.log(tenants)
// END GetTenantsByName
}

// =======================================
// ===== Get one tenant from a collection =====
// =======================================

{
// START GetOneTenant
const multiCollection =  client.collections.get('MultiTenancyCollection');

// highlight-start
const tenant = await multiCollection.tenants.getByName('tenantA')
// highlight-end
console.log(tenant)
// END GetOneTenant
}

// =======================================
// ===== Remove tenants from a class =====
// =======================================
{
// START RemoveTenants
const multiCollection = client.collections.get('MultiTenancyCollection');

// highlight-start
await multiCollection.tenants.remove([
    { name: 'tenantB' },
    { name: 'tenantX' }  // tenantX will be ignored
])
// highlight-end
// END RemoveTenants

// Test
let tenants = await multiCollection.tenants.get()
assert.deepEqual(tenants.length, 1);
}

// =======================================
// ===== Update tenant status =====
// =======================================
{
// START UpdateTenants
const multiCollection = client.collections.get('MultiTenancyCollection')

// highlight-start
await multiCollection.tenants.update({
  name: 'tenantA',
  activityStatus: 'COLD' // or 'HOT'
})
// highlight-end
// END UpdateTenants
}

// =====================
// ===== Enable Auto Tenant Activation =====
// =====================
{
  // START EnableAutoActivation
  const result = await client.collections.create({
    name: 'CollectionWithAutoTenantActivation',
    multiTenancy: weaviate.configure.multiTenancy({
      enabled: true,
      // highlight-start
      autoTenantActivation: true
      // highlight-end
    })
  })
  // END EnableAutoMT
  }

// ============================
// ===== Create MT object =====
// ============================
{
// START CreateMtObject

// highlight-start
const multiTenantA = multiCollection.withTenant('tenantA')
// highlight-end

// highlight-start
await multiTenantA.data.insert({
  question: 'This vector DB is OSS & supports automatic property type inference on import'
})
// highlight-end
// END CreateMtObject

// Test
// assert.equal(object['tenant'], 'tenantA');
}
// =====================
// ===== Search MT =====
// =====================
{
// START Search
const multiCollection =  client.collections.get('MultiTenancyCollection');

// highlight-start
const multiTenantA = multiCollection.withTenant('tenantA')
// highlight-end

// highlight-start
const objectA = await multiTenantA.query.fetchObjects({
  limit: 2
})
// highlight-end

console.log(objectA.objects)
// END Search

// Test
// assert('question' in result['data']['Get'][className][0]);
}

// ===============================
// ===== Add cross-reference =====
// ===============================
// const category = await client.data.creator()
//   .withClassName('JeopardyCategory')  // The class to which the object will be added
//   .withProperties({
//     category: 'Software',
//   })
//   .do();
{
const categoryId = '...'
const objectId = '...'
// START AddCrossRef
// Add the cross-reference property to the multi-tenancy class

// highlight-start
await multiCollection.config.addReference({
  name: 'hasCategory',
  targetCollection: 'JeopardyCategory'
})
// highlight-end

const multiTenantA = multiCollection.withTenant('tenantA')

// highlight-start
await multiTenantA.data.referenceAdd({
  // highlight-end
  fromUuid: objectId,
  fromProperty: 'hasCategory',
  to: categoryId
})
// END AddCrossRef

// Test
// object = await client.data.getterById().withId(object.id).withClassName(className).withTenant('tenantA').do();
// assert.equal(object['properties']['hasCategory'][0]['href'], `/v1/objects/JeopardyCategory/${category.id}`);
}
