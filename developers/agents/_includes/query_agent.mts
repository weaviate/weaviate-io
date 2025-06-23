
interface DatasetItem {
    properties: any;
    vector?: number[];
  }

async function populateWeaviate(client: WeaviateClient, overwriteExisting: boolean = false): Promise<void> {
    if (overwriteExisting) {
        try {
            await client.collections.delete('ECommerce');
            await client.collections.delete('Weather');
            await client.collections.delete('FinancialContracts');
        } catch (error) {
            // Collections may not exist, continue
        }
    }

    // Create ECommerce collection
    if (!(await client.collections.exists('ECommerce'))) {
        await client.collections.create({
            name: 'ECommerce',
            description: 'A dataset that lists clothing items, their brands, prices, and more.',
            vectorizers: [
                vectorizer.text2VecWeaviate({
                    name: 'description_vector',
                    sourceProperties: ['description'],
                    vectorIndexConfig: configure.vectorIndex.hnsw()
                }),
                vectorizer.text2VecWeaviate({
                    name: 'name_description_brand_vector',
                    sourceProperties: ['name', 'description', 'brand'],
                    vectorIndexConfig: configure.vectorIndex.hnsw()
                })
            ],
            properties: [
                {
                    name: 'collection',
                    dataType: dataType.TEXT
                },
                {
                    name: 'category',
                    dataType: dataType.TEXT,
                    description: 'The category to which the clothing item belongs'
                },
                {
                    name: 'tags',
                    dataType: dataType.TEXT_ARRAY,
                    description: 'The tags that are associated with the clothing item'
                },
                {
                    name: 'subcategory',
                    dataType: dataType.TEXT
                },
                {
                    name: 'name',
                    dataType: dataType.TEXT
                },
                {
                    name: 'description',
                    dataType: dataType.TEXT,
                    description: 'A detailed description of the clothing item'
                },
                {
                    name: 'brand',
                    dataType: dataType.TEXT,
                    description: 'The brand of the clothing item'
                },
                {
                    name: 'product_id',
                    dataType: dataType.UUID
                },
                {
                    name: 'colors',
                    dataType: dataType.TEXT_ARRAY,
                    description: 'The colors on the clothing item'
                },
                {
                    name: 'reviews',
                    dataType: dataType.TEXT_ARRAY
                },
                {
                    name: 'image_url',
                    dataType: dataType.TEXT
                },
                {
                    name: 'price',
                    dataType: dataType.NUMBER,
                    description: 'The price of the clothing item in USD'
                }
            ]
        });
    }

    // Create Weather collection
    if (!(await client.collections.exists('Weather'))) {
        await client.collections.create({
            name: 'Weather',
            description: 'Daily weather information including temperature, wind speed, precipitation, pressure etc.',
            vectorizers: vectorizer.text2VecWeaviate(),
            properties: [
                {
                    name: 'date',
                    dataType: dataType.DATE
                },
                {
                    name: 'humidity',
                    dataType: dataType.NUMBER
                },
                {
                    name: 'precipitation',
                    dataType: dataType.NUMBER
                },
                {
                    name: 'wind_speed',
                    dataType: dataType.NUMBER
                },
                {
                    name: 'visibility',
                    dataType: dataType.NUMBER
                },
                {
                    name: 'pressure',
                    dataType: dataType.NUMBER
                },
                {
                    name: 'temperature',
                    dataType: dataType.NUMBER,
                    description: 'temperature value in Celsius'
                }
            ]
        });
    }

    // Create FinancialContracts collection
    if (!(await client.collections.exists('FinancialContracts'))) {
        await client.collections.create({
            name: 'FinancialContracts',
            description: 'A dataset of financial contracts between individuals and/or companies, as well as information on the type of contract and who has authored them.',
            vectorizers: vectorizer.text2VecWeaviate()
        });
    }

    // Load datasets from Hugging Face
    console.log('Loading datasets from Hugging Face...');

    // Helper function to load dataset from HF Datasets Viewer API
    async function loadHFDataset(repo: string, config: string, split: string = 'train'): Promise<DatasetItem[]> {
        const url = `https://datasets-server.huggingface.co/rows?dataset=${repo}&config=${config}&split=${split}&limit=1000`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch dataset: ${response.statusText}`);
            }

            const data = await response.json();
            return data.rows.map((row: any) => row.row);
        } catch (error) {
            console.error(`Error loading dataset ${repo}/${config}:`, error);
            return [];
        }
    }

    const ecommerceCollection = client.collections.get('ECommerce');
    const weatherCollection = client.collections.get('Weather');
    const financialCollection = client.collections.get('FinancialContracts');

    try {
        // Load datasets from Hugging Face
        const [ecommerceData, weatherData, financialData] = await Promise.all([
            loadHFDataset('weaviate/agents', 'query-agent-ecommerce', 'train'),
            loadHFDataset('weaviate/agents', 'query-agent-weather', 'train'),
            loadHFDataset('weaviate/agents', 'query-agent-financial-contracts', 'train')
        ]);

        console.log(`Loaded ${ecommerceData.length} ecommerce items`);
        console.log(`Loaded ${weatherData.length} weather items`);
        console.log(`Loaded ${financialData.length} financial items`);

        // Batch insert ecommerce data
        if (ecommerceData.length > 0) {
            await ecommerceCollection.data.insertMany(
                ecommerceData.map(item => ({ properties: item.properties || item }))
            );
        }

        // Batch insert weather data
        if (weatherData.length > 0) {
            await weatherCollection.data.insertMany(
                weatherData.map(item => ({
                    properties: item.properties || item,
                    vectors: item.vector ? { default: item.vector } : undefined
                }))
            );
        }

        // Batch insert financial data
        if (financialData.length > 0) {
            await financialCollection.data.insertMany(
                financialData.map(item => ({
                    properties: item.properties || item,
                    vectors: item.vector ? { default: item.vector } : undefined
                }))
            );
        }
    } catch (error) {
        console.error('Error loading or inserting data:', error);
    }

    // Get collection sizes
    const ecommerceCount = await ecommerceCollection.aggregate.overAll();
    const weatherCount = await weatherCollection.aggregate.overAll();
    const financialCount = await financialCollection.aggregate.overAll();

    console.log(`Size of the ECommerce dataset: ${ecommerceCount.totalCount}`);
    console.log(`Size of the Weather dataset: ${weatherCount.totalCount}`);
    console.log(`Size of the Financial dataset: ${financialCount.totalCount}`);
}


// START InstantiateQueryAgent
import weaviate, { WeaviateClient, vectorizer, dataType, configure } from 'weaviate-client';
import { QueryAgent } from 'weaviate-agents';

// END InstantiateQueryAgent

async function main() {
// START InstantiateQueryAgent
const headers = {
    // END InstantiateQueryAgent
    'X-Cohere-API-Key': process.env.COHERE_API_KEY as string,
    'X-OpenAI-API-Key': process.env.OPENAI_API_KEY as string,
    // START InstantiateQueryAgent
    //  Provide your required API key(s), e.g. Cohere, OpenAI, etc. for the configured vectorizer(s)
    // "X-INFERENCE-PROVIDER-API-KEY": process.env.YOUR_INFERENCE_PROVIDER_KEY,
};

const client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL as string, {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_ADMIN_KEY as string),
    headers
});
// END InstantiateQueryAgent

// Populate Weaviate with data
await populateWeaviate(client);

// START InstantiateQueryAgent

// Instantiate a new agent object
const qa = new QueryAgent(
    client, {
    collections: ['ECommerce', 'FinancialContracts', 'Weather'],

});
// END InstantiateQueryAgent

// START QueryAgentCollectionConfiguration
const qaWithConfig = new QueryAgent(client, {
    collections: [
        {
            name: 'ECommerce',
            targetVector: ['name_description_brand_vector'],
            viewProperties: ['description']
            // tenant: 'tenantA' // Optional for multi-tenancy
        },
        { name: 'FinancialContracts' },
        { name: 'Weather' }
    ]
});
// END QueryAgentCollectionConfiguration

// START QueryAgentRunBasicCollectionSelection
const contractResponse = await qa.run(
    "What kinds of contracts are listed? What's the most common type of contract?",
    { collections: ['FinancialContracts'] }
);

contractResponse.display();
// END QueryAgentRunBasicCollectionSelection

// START QueryAgentRunCollectionConfig
const clothingResponse = await qaWithConfig.run(
    "I like vintage clothes and nice shoes. Recommend some of each below $60.",
    {
        collections: [
            {
                name: 'ECommerce',
                targetVector: ['name_description_brand_vector'],
                viewProperties: ['name', 'description', 'category', 'brand']
            },
            {
                name: 'FinancialContracts'
            }
        ]
});

clothingResponse.display();
// END QueryAgentRunCollectionConfig

// START BasicQuery
// Perform a query
const basicResponse = await qaWithConfig.run(
    "I like vintage clothes and nice shoes. Recommend some of each below $60."
);

basicResponse.display();
// END BasicQuery

// START FollowUpQuery
const followUpResponse = await qaWithConfig.run(
    "I like the vintage clothes options, can you do the same again but above $200?",
    { context: basicResponse }
);

followUpResponse.display();
// END FollowUpQuery

var query = "What is the weather like in San Francisco?";

// START StreamResponse
// Setting includeProgress to false will skip progressMessages, and only stream
// the streamedTokens / the final response.
for await (const event of qa.stream(query, { includeProgress: true })) {  // This is true by default, this example is just being explicit
    if (event.outputType === "progressMessage") {
        // The message is a human-readable string, structured info available in event.details
        console.log(event.message);
    } else if (event.outputType === "streamedTokens") {
        // The delta is a string containing the next chunk of the final answer
        process.stdout.write(event.delta);
    } else {
        // This is the final response, as returned by QueryAgent.run()
        event.display();
    }
}
// END StreamResponse

// START InspectResponseExample
console.log('\n=== Query Agent Response ===');
console.log(`Original Query: ${basicResponse.originalQuery}\n`);

console.log('🔍 Final Answer Found:');
console.log(`${basicResponse.finalAnswer}\n`);

console.log('🔍 Searches Executed:');
for (const collectionSearches of basicResponse.searches) {
    for (const result of collectionSearches) {
        console.log(`- ${result.queries}\n`);
    }
}

if (basicResponse.hasAggregationAnswer) {
    console.log('📊 Aggregation Results:');
    for (const collectionAggs of basicResponse.aggregations) {
        for (const agg of collectionAggs) {
            console.log(`- ${agg}\n`);
        }
    }
}

if (basicResponse.missingInformation && basicResponse.missingInformation.length > 0) {
    if (basicResponse.isPartialAnswer) {
        console.log('⚠️ Answer is Partial - Missing Information:');
    } else {
        console.log('⚠️ Missing Information:');
    }
    for (const missing of basicResponse.missingInformation) {
        console.log(`- ${missing}`);
    }
}
// END InspectResponseExample

if (!basicResponse.finalAnswer || basicResponse.finalAnswer === '') {
    throw new Error('Final answer is empty or null');
}
client.close()

}

void main();
