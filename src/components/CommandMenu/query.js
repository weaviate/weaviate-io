// const url = 'https://search.weaviate.io/v1/graphql';
const url = 'https://jfkcup9ytrkbszarouyjcq.c1-1.europe-west3.gcp.weaviate.cloud/v1/graphql';
const read = 'MgivtQrUg6J5JHNNoyPjHGgv23MdjrTRiKxT';

export const runQuery = async (searchTerm, limit=10) => {
    const parsedSearchTerm = searchTerm.replace(/"/g,"\\\"")

    const query = `{
        Get {
            PageChunk(
                hybrid: {
                    query: \"${parsedSearchTerm}\"
                    alpha: 0.4
                }
                limit: ${limit}
            )
            { title content url anchor order pageTitle typeOfItem _additional { score } }
        }
    }`.replace(/\n[ ]*/g," "); // remove unnecessary white characters

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${read}`
        },
        body: JSON.stringify({query: query})
    });

    return response.json();
}
