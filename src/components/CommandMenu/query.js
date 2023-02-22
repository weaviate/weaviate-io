import weaviate from 'weaviate-client'

const client = weaviate.client({
    scheme: 'https',
    host: "search.weaviate.io/",
});


export const query = async (keyword) => {
    const result = await client.graphql
        .get()
        .withClassName('PageChunkOpenAI')
        .withFields('title content url')
        .withHybrid({
            query: keyword,
            alpha: 0.5, // optional, defaults to 0.75
        })
        .withLimit(5)
        .do();

    return result
}


// export const query = async (keyword) => {
//     const result = await client.graphql
//         .get()
//         .withClassName('PageChunkOpenAI')
//         .withFields('title content url')
//         .withHybrid({
//             query: keyword,
//             alpha: 0.5, // optional, defaults to 0.75
//         })
//         .withWhere({
//             operator: weaviate.filters.Operator.LIKE,
//             path: ['title'],
//             valueString: `%${keyword}%`
//         })
//         .withLimit(5)
//         .do();

//     return result
// }

