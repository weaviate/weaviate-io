const url = 'https://search.weaviate.io/v1/graphql';

export const runQuery = async (searchTerm, limit=10) => {
    const parsedSearchTerm = searchTerm.replace(/"/g,"\\\"")

    const query = `{
        Get {
            PageChunkOpenAI(
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: query})
    });

    return response.json();
}
