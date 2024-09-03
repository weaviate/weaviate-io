// # START-ANY
import weaviate, { WeaviateClient } from 'weaviate-client'
let client: WeaviateClient


// # END-ANY

// # FilteredSemanticSearch

// # END FilteredSemanticSearch

// # START-ANY

// # END-ANY


client = await weaviate.connectToWeaviateCloud(
    process.env.WCD_URL as string,
    {
        authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
        headers: {
            'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,  // Replace with your inference API key
        }
    }
)

// # START-ANY
// Instantiate your client (not shown). e.g.:
// const requestHeaders = {'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,}
// client = weaviate.connectToWeaviateCloud(..., headers: requestHeaders) or
// client = weaviate.connectToLocal(..., headers: requestHeaders)

// # END-ANY

// # MetadataSemanticSearch
// # Get the collection
let response
let movies

movies = client.collections.get("Movie")

// # Perform query

response = movies.query.nearText('dystopian future', {
    limit: 5,
    returnMetadata: ['distance']
})

// # Inspect the response
for (let item of response.objects) {
    // Print the title and release year 
    console.log(`${item.properties.title}: ${item.properties.release_date.getUTCFullYear()} `)
    // Print the distance of the object from the query
    console.log(`Distance to query: ${item.metadata.distance}`)

}


// # END MetadataSemanticSearch


// # MetadataBM25Search
// # Get the collection
movies = client.collections.get("Movie")

response = movies.query.bm25('history', {
    limit: 5,
    returnMetadata: ['score']
})

// # Inspect the response
for (let item of response.objects) {
    // Print the title and release year 
    console.log(`${item.properties.title}: ${item.properties.release_date} `)
    // Print the BM25 score of the object from the query
    console.log(`BM25 score: ${item.metadata.score}`)

}


// # END MetadataBM25Search


// # MetadataHybridSearch
// # Get the collection
movies = client.collections.get("Movie")

response = movies.query.hybrid('history', {
    limit: 5,
    returnMetadata: ['score']
})

// # Inspect the response
for (let item of response.objects) {
    // Print the title and release year 

    console.log(`${item.properties.title}: ${item.properties.release_date} `)
    // Print the hybrid search score of the object from the query

    console.log(`Hybrid score: ${item.metadata.score}`)

}

// # END MetadataHybridSearch


// # FilteredSemanticSearch
// # Get the collection
movies = client.collections.get("Movie")

// # Perform query
response = movies.query.nearText('dystopian future', {
    limit: 5,
    returnMetadata: ['distance'],
    // highlight-start
    filters: movies.filter.byProperty('release_date').greaterThan(new Date('December 17, 1995'))
    // highlight-end
})

// # Inspect the response
for (let item of response.objects) {
    // Print the title and release year 

    console.log(`${item.properties.title}: ${item.properties.release_date} `)
    // Print the distance of the object from the query

    console.log(`Distance to query: ${item.metadata.distance}`)

}


client.close()
// # END FilteredSemanticSearch
