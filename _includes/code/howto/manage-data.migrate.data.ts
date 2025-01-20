import assert from 'assert'
// START CreateCollectionCollectionToCollection  // START CreateCollectionTenantToCollection  // START CreateCollectionCollectionToTenant  // START CreateCollectionTenantToTenant // START TenantToTenant
import weaviate, { Collection, WeaviateClient } from 'weaviate-client'

let client_src: WeaviateClient,client_tgt: WeaviateClient;
let reviews_mt_tgt, reviews_mt_src;
// END CreateCollectionCollectionToCollection  // END CreateCollectionTenantToCollection  // END CreateCollectionCollectionToTenant  // END CreateCollectionTenantToTenant // END TenantToTenant
// START CreateCollectionCollectionToCollection // START CollectionToCollection  // START TenantToCollection  // START CollectionToTenant  
let reviews_tgt, reviews_src;
// END CreateCollectionCollectionToCollection // END CollectionToCollection  // END TenantToCollection  // END CollectionToTenant 
// START CreateCollectionCollectionToTenant
// END TenantToTenant // END CreateCollectionCollectionToTenant
// # ===== Load demo dataset for testing =====
// import weaviate_datasets as wd
// coming soon

let agg_resp;

// START CreateCollectionCollectionToCollection  // START CreateCollectionTenantToCollection  // START CreateCollectionCollectionToTenant  // START CreateCollectionTenantToTenant

client_src = await weaviate.connectToLocal({
    headers: {
        "X-Cohere-Api-Key": process.env.COHERE_API_KEY as string
    }
})

// END CreateCollectionCollectionToCollection  // END CreateCollectionTenantToCollection  // END CreateCollectionCollectionToTenant  // END CreateCollectionTenantToTenant

// coming soon
// for dataset in [wd.WineReviews, wd.WineReviewsMT]:
//     d = dataset()
//     d.upload_dataset(client_src, overwrite=True)
let DATASET_SIZE = 50  // For assertions


// ============================================================
// TEST - CHECK CLIENT CONNECTION
// ============================================================
assert.equal(true, await client_src.isReady())


// START CreateCollectionCollectionToCollection  // START CreateCollectionTenantToCollection  // START CreateCollectionCollectionToTenant  // START CreateCollectionTenantToTenant
client_tgt = await weaviate.connectToLocal({
    port: 8090,
    grpcPort: 50061,
    headers: {
        "X-Cohere-Api-Key": process.env.COHERE_API_KEY as string
    }
})

// END CreateCollectionCollectionToCollection  // END CreateCollectionTenantToCollection // END CreateCollectionCollectionToTenant  // END CreateCollectionTenantToTenant

// ================================================================================
// ================================================================================
// ================================================================================


// START CreateCollectionCollectionToCollection  // START CreateCollectionTenantToCollection  // START CreateCollectionCollectionToTenant  // START CreateCollectionTenantToTenant
async function createCollection(clientIn: WeaviateClient, collectionName: string, enableMt: boolean) {
    // END CreateCollectionCollectionToCollection  // END CreateCollectionTenantToCollection  // END CreateCollectionCollectionToTenant  // END CreateCollectionTenantToTenant
    // START CreateCollectionCollectionToCollection  // START CreateCollectionTenantToCollection  // START CreateCollectionCollectionToTenant  // START CreateCollectionTenantToTenant
    let reviews = clientIn.collections.create({
        name: collectionName,
        multiTenancy: {
            enabled: enableMt
        },
        // Additional settings not shown
        // END CreateCollectionCollectionToCollection  // END CreateCollectionTenantToCollection  // END CreateCollectionCollectionToTenant  // END CreateCollectionTenantToTenant
        vectorizers: weaviate.configure.vectorizer.text2VecCohere(),
        generative: weaviate.configure.generative.cohere(),
        properties: [
            {
                name: "review_body",
                dataType: weaviate.configure.dataType.TEXT,
                description: "Review body"
            },
            {
                name: "title",
                dataType: weaviate.configure.dataType.TEXT,
                description: "Name of the wine"
            },
            {
                name: "country",
                dataType: weaviate.configure.dataType.TEXT,
                description: "Originating country"
            },
            {
                name: "points",
                dataType: weaviate.configure.dataType.INT,
                description: "Review score in points"
            },
            {
                name: "price",
                dataType: weaviate.configure.dataType.NUMBER,
                description: "Listed price"
            }
        ]
        // START CreateCollectionCollectionToCollection  // START CreateCollectionTenantToCollection  // START CreateCollectionCollectionToTenant  // START CreateCollectionTenantToTenant
    })

    return reviews
}

// END CreateCollectionCollectionToCollection  // END CreateCollectionTenantToCollection  // END CreateCollectionCollectionToTenant  // END CreateCollectionTenantToTenant


// ================================================================================
// ================================================================================
// ================================================================================


// START CollectionToCollection  
reviews_src = client_src.collections.get("WineReview")
reviews_tgt = client_tgt.collections.get("WineReview")
// END CollectionToCollection   

// START CollectionToTenant

reviews_src = client_src.collections.get("WineReview")
reviews_mt_tgt = client_tgt.collections.get("WineReviewMT")
// END CollectionToTenant

// START CollectionToCollection  // START TenantToCollection  // START CollectionToTenant  // START TenantToTenant

let maxItems = await reviews_src.length()
let counter: number

async function migrateData(collection_src: Collection, collection_tgt: Collection) {
    let itemsToInsert = []
    const promises = []

    for await (const item of collection_src.iterator({ includeVector: true })) {
        // Check if we've reached the maximum items
        if (counter >= maxItems) {
            console.log(`Reached maximum items limit of ${maxItems}`);
            break;
        }

        counter++;
        if (counter % 1000 == 0)
            console.log(`Import: ${counter}`)

        let objectToInsert = {
            properties: item.properties,
            vectors: item.vectors.default,
            uuid: item.uuid,
        }

        // Add object to batching array
        itemsToInsert.push(objectToInsert)

        if (itemsToInsert.length == 1000 || counter == maxItems) {

            const promise = collection_tgt.data.insertMany(itemsToInsert)
                .then((response) => {
                    console.log(`Successfully imported batch of ${Object.keys(response.uuids).length} items`);
                    if (response.hasErrors) {
                        throw new Error("Error in batch import!");
                    }
                })
                .catch((error) => {
                    console.error('Error importing batch:', error);
                })

            promises.push(promise)
            itemsToInsert = [];

        }
    }
    // Runs all promises 
    await Promise.all(promises) 
}
// END CollectionToCollection // END TenantToCollection  // END CollectionToTenant  // END TenantToTenant

// Delete existing collection at target if any
await client_tgt.collections.delete("WineReview")


// ============================================================
// TEST - CHECK CLASS DELETION
// ============================================================
assert.equal(false, client_tgt.collections.exists("WineReview"))


// START CreateCollectionCollectionToCollection
reviews_tgt = await createCollection(client_tgt, "WineReview", true)
// END CreateCollectionCollectionToCollection


// # ============================================================
// # TEST - CHECK EMPTY CLASS CREATION
// # ============================================================
assert.equal(true, client_tgt.collections.exists("WineReview"))
agg_resp = await reviews_tgt.aggregate.overAll({
    returnMetrics: reviews_tgt.metrics.aggregate('points').number(["count"])
})
assert.equal(agg_resp.totalCount, 0)

// START CollectionToCollection

migrateData(reviews_src, reviews_tgt)
// END CollectionToCollection


// # ============================================================
// # TEST - CHECK DATA MIGRATION
// # ============================================================
agg_resp = await reviews_tgt.aggregate.overAll({
    returnMetrics: reviews_tgt.metrics.aggregate('points').number(["count"])
})

assert.equal(agg_resp.totalCount, DATASET_SIZE)

// coll_list = [reviews_src, reviews_tgt]
// resps = [r.query.near_text("Earthy but very drinkable", limit=1) for r in coll_list]
//assert.equal(resps[0].objects[0].uuid, resps[1].objects[0].uuid)

// Delete existing collection at target if any
client_tgt.collections.delete("WineReview")


// # ============================================================
// # TEST - CHECK CLASS DELETION
// # ============================================================
assert.equal(false, client_tgt.collections.exists("WineReview"))

reviews_tgt = null
// START CreateCollectionTenantToCollection
reviews_tgt = await createCollection(client_tgt, "WineReview", false)
// END CreateCollectionTenantToCollection


// ============================================================
// TEST - CHECK EMPTY CLASS CREATION
// ============================================================
assert.equal(true, client_tgt.collections.exists("WineReview"))
agg_resp = await reviews_tgt.aggregate.overAll({
    returnMetrics: reviews_tgt.metrics.aggregate('points').number(["count"])
})
assert.equal(agg_resp.totalCount, 0)


// START TenantToCollection

let reviews_src_tenant_a;

// END TenantToCollection

// START TenantToCollection
reviews_src = client_src.collections.get("WineReviewMT")
reviews_src_tenant_a = reviews_src.withTenant("tenantA")
reviews_tgt = client_tgt.collections.get("WineReview")

migrateData(reviews_src_tenant_a, reviews_tgt)
// END TenantToCollection

// ============================================================
// TEST - CHECK DATA MIGRATION
// ============================================================
agg_resp = await reviews_tgt.aggregate.overAll({
    returnMetrics: reviews_tgt.metrics.aggregate('points').number(["count"])
})
assert.equal(agg_resp.totalCount, DATASET_SIZE)

// let collList = [reviews_src_tenant_a, reviews_tgt]
// let resps = [r.query.near_text("Earthy but very drinkable",{ limit: 1}) for r in collList]
// assert.equal(resps[0].objects[0].uuid, resps[1].objects[0].uuid)


// # Delete existing collection at target if any
client_tgt.collections.delete("WineReviewMT")


// ============================================================
// TEST - CHECK CLASS DELETION
// ============================================================
assert.equal(false, client_tgt.collections.exists("WineReviewMT"))


// START CreateCollectionCollectionToTenant
reviews_mt_tgt = createCollection(client_tgt, "WineReviewMT", true)
// END CreateCollectionCollectionToTenant


// START CreateTenants
let tenantsTgt = [
    { name: 'tenantA'},
    { name: 'tenantB'}
  ]

reviews_mt_tgt = client_tgt.collections.get("WineReviewMT")
reviews_mt_tgt.tenants.create(tenantsTgt)
// END CreateTenants


// START CollectionToTenant

let reviews_tgt_tenant_a = reviews_mt_tgt.withTenant(tenantsTgt[0].name)
// END CollectionToTenant 

// # ============================================================
// # TEST - CHECK EMPTY CLASS CREATION
// # ============================================================
assert.equal(true,client_tgt.collections.exists("WineReviewMT"))
reviews_tgt_tenant_a = reviews_mt_tgt.withTenant(tenantsTgt[0].name)
agg_resp = await reviews_tgt_tenant_a.aggregate.overAll({
    returnMetrics: reviews_tgt_tenant_a.metrics.aggregate('points').number(["count"])
})
assert.equal(agg_resp.totalCount, 0)


// START CollectionToTenant
migrateData(reviews_src, reviews_tgt_tenant_a)
// END CollectionToTenant 



// ============================================================
// TEST - CHECK DATA MIGRATION
// ============================================================
agg_resp = await reviews_tgt_tenant_a.aggregate.overAll({
    returnMetrics: reviews_tgt_tenant_a.metrics.aggregate('points').number(["count"])
})
assert.equal(agg_resp.totalCount, DATASET_SIZE)

// coll_list = [reviews_src, reviews_tgt_tenant_a]
// resps = [r.query.near_text("Earthy but very drinkable", limit=1) for r in coll_list]
// assert.equal(resps[0].objects[0].uuid, resps[1].objects[0].uuid)


// Delete existing collection at target if any
client_tgt.collections.delete("WineReviewMT")


// ============================================================
// TEST - CHECK CLASS DELETION
// ============================================================
// assert not client_tgt.collections.exists("WineReviewMT")


// START CreateCollectionTenantToTenant
reviews_mt_tgt = createCollection(client_tgt, "WineReviewMT", true)
// END CreateCollectionTenantToTenant


// // Re-create tenants
tenantsTgt = [
    { name: 'tenantA'},
    { name: 'tenantB'}
  ]


reviews_mt_tgt = client_tgt.collections.get("WineReviewMT")
reviews_mt_tgt.tenants.create(tenantsTgt)
// END Re-create tenants


// ============================================================
// TEST - CHECK EMPTY CLASS CREATION
// ============================================================
assert.equal(true,client_tgt.collections.exists("WineReviewMT"))
reviews_tgt_tenant_a = reviews_mt_tgt.withTenant(tenantsTgt[0].name)
agg_resp = await reviews_tgt_tenant_a.aggregate.overAll({
    returnMetrics: reviews_tgt.metrics.aggregate('points').number(["count"])
})
assert.equal(agg_resp.totalCount, 0)

// START TenantToTenant
// Variables initialized above
reviews_mt_src = client_src.collections.get("WineReviewMT")
reviews_src_tenant_a = reviews_mt_src.withTenant("tenantA")
reviews_mt_tgt = client_tgt.collections.get("WineReviewMT")
reviews_tgt_tenant_a = reviews_mt_tgt.withTenant(tenantsTgt[0].name)

migrateData(reviews_src_tenant_a, reviews_tgt_tenant_a)
// END TenantToTenant


// ============================================================
// TEST - CHECK DATA MIGRATION
// ============================================================
agg_resp = await reviews_tgt_tenant_a.aggregate.overAll({
    returnMetrics: reviews_tgt_tenant_a.metrics.aggregate('points').number(["count"])
})
assert.equal(agg_resp.totalCount, DATASET_SIZE)

// coll_list = [reviews_src_tenant_a, reviews_tgt_tenant_a]
// resps = [r.query.near_text("Earthy but very drinkable", limit=1) for r in coll_list]
// assert.equal(resps[0].objects[0].uuid, resps[1].objects[0].uuid)

// START CollectionToCollection  // START TenantToCollection  // START CollectionToTenant  // START TenantToTenant

client_src.close()
client_tgt.close()
// END CollectionToCollection  // END TenantToCollection  // END CollectionToTenant  // END TenantToTenant
