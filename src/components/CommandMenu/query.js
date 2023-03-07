const url = 'https://search.weaviate.io/v1/graphql';

export const query = async (keyword) => {
    const result = extractAllText(keyword)

    let dobleQuotesString;
    if(result){
        result.map(item => dobleQuotesString = dobleQuotesString ? dobleQuotesString + item + " " : item + " ")
    }
    const keywordWithoutDobleQuotes = keyword.replace(/"/g,"")

    if(dobleQuotesString){
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'query': `{ Get { PageChunkOpenAI( hybrid: { query: \"${keywordWithoutDobleQuotes}\"} limit: 5 ) { title content url anchor order pageTitle typeOfItem } } }`})
        });
    
        return response.json();
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'query': `{ Get { PageChunkOpenAI( hybrid: { query: \"${keywordWithoutDobleQuotes}\"} limit: 5 ) { title content url anchor order pageTitle typeOfItem } } }`})
    });

    return response.json();
}


function extractAllText(str){
    const re = /"(.*?)"/g;
    const result = [];
    let current;
    while (current = re.exec(str)) {
        result.push(current.pop());
    }
    return result.length > 0 && result;
}
  