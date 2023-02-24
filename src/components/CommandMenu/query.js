const url = 'https://search.weaviate.io/v1/graphql'

export const query = async (keyword) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"query": `{ Get { PageChunkOpenAI( hybrid: { query: \"${keyword}\"} ) { title content url } } }`})
    })

    return response.json();
}
