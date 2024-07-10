
import weaviate from 'weaviate-client';

const client = await weaviate.connectToLocal();

// START QueryWithReplication
// highlight-start
const myCollection = client.collections.get('Article').withConsistency('QUORUM');
// highlight-end

const result = await myCollection.query.fetchObjectById("36ddd591-2dee-4e7e-a3cc-eb86d30a4303")

console.log(JSON.stringify(result, null, 2));

// The parameter passed to `withConsistencyLevel` can be one of:
// * 'ALL',
// * 'QUORUM' (default), or
// * 'ONE'.
//
// It determines how many replicas must acknowledge a request
// before it is considered successful.

// END QueryWithReplication

client.close();
