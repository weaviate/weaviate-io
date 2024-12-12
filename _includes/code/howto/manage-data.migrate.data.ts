import assert from 'assert'
// START CreateCollectionCollectionToCollection  // START CreateCollectionTenantToCollection  // START CreateCollectionCollectionToTenant  // START CreateCollectionTenantToTenant
import weaviate, { Collection, WeaviateClient, WeaviateField } from 'weaviate-client'

let clientSrc: WeaviateClient
let clientTgt: WeaviateClient

// END CreateCollectionCollectionToCollection  // END CreateCollectionTenantToCollection  // END CreateCollectionCollectionToTenant  // END CreateCollectionTenantToTenant
// # ===== Load demo dataset for testing =====
// import weaviate_datasets as wd


// START CreateCollectionCollectionToCollection  // START CreateCollectionTenantToCollection  // START CreateCollectionCollectionToTenant  // START CreateCollectionTenantToTenant
clientSrc = await weaviate.connectToLocal({
    headers: {
        "X-Cohere-Api-Key": process.env.COHERE_API_KEY as string
    }
})
// END CreateCollectionCollectionToCollection  // END CreateCollectionTenantToCollection  // END CreateCollectionCollectionToTenant  // END CreateCollectionTenantToTenant


// for dataset in [wd.WineReviews, wd.WineReviewsMT]:
//     d = dataset()
//     d.upload_dataset(client_src, overwrite=True)
// DATASET_SIZE = 50  // For assertions


// ============================================================
// TEST - CHECK CLIENT CONNECTION
// ============================================================
assert.equal(true, await clientSrc.isReady())


// START CreateCollectionCollectionToCollection  // START CreateCollectionTenantToCollection  // START CreateCollectionCollectionToTenant  // START CreateCollectionTenantToTenant
clientTgt = await weaviate.connectToLocal({
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
function createCollection(clientIn: WeaviateClient, collectionName: string, enableMt: boolean) {
    // END CreateCollectionCollectionToCollection  // END CreateCollectionTenantToCollection  // END CreateCollectionCollectionToTenant  // END CreateCollectionTenantToTenant
    //  START CreateCollectionCollectionToCollection  // START CreateCollectionTenantToCollection  // START CreateCollectionCollectionToTenant  // START CreateCollectionTenantToTenant

    let reviews = clientSrc.collections.create({
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


// START CollectionToCollection  // START TenantToCollection  // START CollectionToTenant  // START TenantToTenant
const mySrcCollection = client.collections.get("Jeopardy")
const myTgtCollection = client.collections.get("JeopardyUpdated")

let maxItems = await mySrcCollection.length()
let counter: number

function migrateData(srcCollection: Collection, targetCollection: Collection) {
    let itemsToInsert = []

    for await (const item of srcCollection.iterator({ includeVector: true })) {
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
            vector: item.vectors.default,
            uuid: item.uuid,
        }

        // Add object to batching array
        itemsToInsert.push(objectToInsert)

        if (itemsToInsert.length == 1000 || counter == maxItems) {
            try {
                const response = await targetCollection.data.insertMany(itemsToInsert);

                if (response.hasErrors) {
                    throw new Error("Error in batch import!");
                }
                // Insert
                console.log(`Successfully imported batch of ${itemsToInsert.length} items`);
                itemsToInsert = [];
            } catch (error) {
                console.error('Error importing batch:', error);
            }
        }
    }
}

    // END CollectionToCollection // END TenantToCollection  // END CollectionToTenant  // END TenantToTenant

    // Delete existing collection at target if any
    clientTgt.collections.delete("WineReview")


    // ============================================================
    // TEST - CHECK CLASS DELETION
    // ============================================================
    // assert not client_tgt.collections.exists("WineReview")


    // START CreateCollectionCollectionToCollection
reviewsTgt = createCollection(clientTgt, "WineReview", true)
    // END CreateCollectionCollectionToCollection


    // # ============================================================
    // # TEST - CHECK EMPTY CLASS CREATION
    // # ============================================================
    // assert client_tgt.collections.exists("WineReview")
agg_resp = reviewsTgt.aggregate.overAll(total_count=True)
    // assert agg_resp.total_count == 0

    // START CollectionToCollection
    let reviewsSrc = clientSrc.collections.get("WineReview")
    let reviewsTgt = clientTgt.collections.get("WineReview")

    clientSrc.backup.create

    migrateData(reviewsSrc, reviewsTgt)
    // END CollectionToCollection


    // # ============================================================
    // # TEST - CHECK DATA MIGRATION
    // # ============================================================
agg_resp = reviewsTgt.aggregate.overAll(total_count=True)
    // assert agg_resp.total_count == DATASET_SIZE

    // coll_list = [reviews_src, reviews_tgt]
    // resps = [r.query.near_text("Earthy but very drinkable", limit=1) for r in coll_list]
    // assert resps[0].objects[0].uuid == resps[1].objects[0].uuid

    // Delete existing collection at target if any
    clientTgt.collections.delete("WineReview")


    // # ============================================================
    // # TEST - CHECK CLASS DELETION
    // # ============================================================
    // assert not client_tgt.collections.exists("WineReview")


    // START CreateCollectionTenantToCollection
    let reviews_tgt = createCollection(clientTgt, "WineReview", false)
    // END CreateCollectionTenantToCollection


    // ============================================================
    // TEST - CHECK EMPTY CLASS CREATION
    // ============================================================
    // assert client_tgt.collections.exists("WineReview")
    agg_resp = reviewsTgt.aggregate.overAll(total_count = True)
    // assert agg_resp.total_count == 0


    // # START TenantToCollection
    reviewsSrc = client_src.collections.get("WineReviewMT")
    reviewsSrcTenantA = reviewsSrc.withTenant("tenantA")
    reviewsTgt = clientTgt.collections.get("WineReview")

    migrateData(reviewsSrcTenantA, reviewsTgt)
    // END TenantToCollection


    // ============================================================
    // TEST - CHECK DATA MIGRATION
    // ============================================================
    // agg_resp = reviews_tgt.aggregate.over_all(total_count=True)
    // assert agg_resp.total_count == DATASET_SIZE

    collList = [reviewsSrcTenantA, reviewsTgt]
    resps = [r.query.near_text("Earthy but very drinkable", limit = 1) for r in collList]
    // assert resps[0].objects[0].uuid == resps[1].objects[0].uuid


    // # Delete existing collection at target if any
    clientTgt.collections.delete("WineReviewMT")


    // ============================================================
    // TEST - CHECK CLASS DELETION
    // ============================================================
    // assert not client_tgt.collections.exists("WineReviewMT")


    // START CreateCollectionCollectionToTenant
    let reviewsMtTgt = createCollection(clientTgt, "WineReviewMT", true)
    // END CreateCollectionCollectionToTenant


    // START CreateTenants
    let tenantsTgt = [wvc.tenants.Tenant(name = "tenantA"), wvc.tenants.Tenant(name = "tenantB")]

    let reviewsMtTgt = clientTgt.collections.get("WineReviewMT")
    let reviewsMtTgt.tenants.create(tenantsTgt)
    // END CreateTenants


    // # ============================================================
    // # TEST - CHECK EMPTY CLASS CREATION
    // # ============================================================
    // assert client_tgt.collections.exists("WineReviewMT")
    // reviews_tgt_tenant_a = reviewsMtTgt.with_tenant(tenantsTgt[0].name)
    // agg_resp = reviews_tgt_tenant_a.aggregate.over_all(total_count=True)
    // assert agg_resp.total_count == 0


    // START CollectionToTenant
    let reviews_src = clientSrc.collections.get("WineReview")
    let reviewsMtTgt = clientTgt.collections.get("WineReviewMT")
    let reviewsTgtTenantA = reviewsMtTgt.withTenant(tenantsTgt[0].name)

    migrateData(reviews_src, reviewsTgtTenantA)
    // END CollectionToTenant


    // ============================================================
    // TEST - CHECK DATA MIGRATION
    // ============================================================
    let aggResp = reviewsTgtTenantA.aggregate.overAll()
    // assert agg_resp.total_count == DATASET_SIZE

    // coll_list = [reviews_src, reviews_tgt_tenant_a]
    // resps = [r.query.near_text("Earthy but very drinkable", limit=1) for r in coll_list]
    // assert resps[0].objects[0].uuid == resps[1].objects[0].uuid


    // Delete existing collection at target if any
    clientTgt.collections.delete("WineReviewMT")


    // ============================================================
    // TEST - CHECK CLASS DELETION
    // ============================================================
    // assert not client_tgt.collections.exists("WineReviewMT")


    // START CreateCollectionTenantToTenant
    reviewsMtTgt = create_collection(client_tgt, "WineReviewMT", enable_mt = True)
    // END CreateCollectionTenantToTenant


    // // Re-create tenants
    tenantsTgt = [wvc.tenants.Tenant(name = "tenantA"), wvc.tenants.Tenant(name = "tenantB")]

    reviewsMtTgt = client_tgt.collections.get("WineReviewMT")
    reviewsMtTgt.tenants.create(tenantsTgt)
    // END Re-create tenants


    // ============================================================
    // TEST - CHECK EMPTY CLASS CREATION
    // ============================================================
    // assert client_tgt.collections.exists("WineReviewMT")
    let reviewsTgtTenantA = reviewsMtTgt.withTenant(tenantsTgt[0].name)
    let aggResp = reviewsTgtTenantA.aggregate.overAll({ totalCount: true })
    // assert agg_resp.total_count == 0


    // START TenantToTenant
    let reviewsMtSrc = clientSrc.collections.get("WineReviewMT")
    let reviewsSrcTenantA = reviewsMtSrc.withTenant("tenantA")
    let reviewsMtTgt = clientTgt.collections.get("WineReviewMT")
    let reviewsTgtTenantA = reviewsMtTgt.withTenant(tenantsTgt[0].name)

    migrateData(reviewsSrcTenantA, reviewsTgtTenantA)
    // END TenantToTenant


    // ============================================================
    // TEST - CHECK DATA MIGRATION
    // ============================================================
    // agg_resp = reviews_tgt_tenant_a.aggregate.over_all(total_count=True)
    // assert agg_resp.total_count == DATASET_SIZE

    // coll_list = [reviews_src_tenant_a, reviews_tgt_tenant_a]
    // resps = [r.query.near_text("Earthy but very drinkable", limit=1) for r in coll_list]
    // assert resps[0].objects[0].uuid == resps[1].objects[0].uuid

    // START CollectionToCollection  // START TenantToCollection  // START CollectionToTenant  // START TenantToTenant

    clientSrc.close()
    clientTgt.close()
// END CollectionToCollection  // END TenantToCollection  // END CollectionToTenant  // END TenantToTenant
