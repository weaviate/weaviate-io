// CreateMovieCollection // SubmoduleImport // BatchImportData
import weaviate from "weaviate-client";
// END BatchImportData
import { WeaviateClient, configure, vectorizer } from "weaviate-client";
// END CreateMovieCollection  // END SubmoduleImport


// BatchImportData
import { generateUuid5 } from "weaviate-client";

// END BatchImportData

// BatchImportData
let client: WeaviateClient;
// CreateMovieCollection  // END BatchImportData

// END CreateMovieCollection

client = await weaviate.connectToWeaviateCloud(process.env.WCD_URL as string,{
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
  } 
)
// CreateMovieCollection
// Instantiate your client (not shown). e.g.:
// const requestHeaders = {'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,}
// client = weaviate.connectToWeaviateCloud(..., headers: requestHeaders) or
// client = weaviate.connectToLocal(..., headers: requestHeaders)

// END CreateMovieCollection

const requestHeaders = {'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,}


client = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL as string,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
    headers: requestHeaders
  } 
)

// END CreateMovieCollection

// Actual instantiation

client.collections.delete("Movie")

// CreateMovieCollection
await client.collections.create({
    name: "Movie",
    properties: [
        { name: "title", dataType: configure.dataType.TEXT},
        { name: "overview", dataType: configure.dataType.TEXT},
        { name: "vote_average", dataType: configure.dataType.NUMBER},
        { name: "genre_ids", dataType: configure.dataType.INT_ARRAY},
        { name: "release_date", dataType: configure.dataType.DATE},
        { name: "tmdb_id", dataType: configure.dataType.INT},
    ],
    // Define the vectorizer module
    vectorizers: vectorizer.text2VecOpenAI(),
    // Define the generative module
    generative: configure.generative.openAI(),
    // END generativeDefinition  // CreateMovieCollection
  })

client.close()
// END CreateMovieCollection


client = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL as string,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,  // Replace with your inference API key
    }
  } 
)

// BatchImportData

// Instantiate your client (not shown). e.g.:
// client = weaviate.connectToWeaviateCloud(...) or
// client = weaviate.connectToLocal(...)

// END BatchImportData

// BatchImportData
const dataUrl = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024.json"
const response = await fetch(dataUrl)
const data = await response.json()

// Get the collection
const movies = client.collections.get("Movie")

// Set a counter and initialize Weaviate Object
let itemsToInsert: Object[] = []
let counter = 0;

// Iterate through data
for (const key of Object.keys(data['title'])) {
    counter++;
    if(counter % 1000 == 0)
        console.log(`Import: ${counter}`)
    // END Iterate through data // END BatchImportData
    // BatchImportData

    let genreIds: []

    // Format genre_ids and release_date
    const parsedArray = JSON.parse(data['genre_ids'][key]);
    genreIds = parsedArray.map(item => parseInt(item, 10));
    let releaseDate = new Date(data['release_date'][key])

    // Build the object payload
    let movieObject = {
        title: data['title'][key],
        overview: data['overview'][key],
        vote_average: data['vote_average'][key],
        genre_ids: genreIds,
        release_date: releaseDate,
        tmdb_id: data['id'][key],
    }
    // Insert
    let objectToInsert = {
        properties: movieObject,
        uuid: generateUuid5(data['title'][key])
    }

    // Add object to batching array
    itemsToInsert.push(objectToInsert)

    if(itemsToInsert.length == 2000) {
        // Batch insert 2000 items and clear batch array
        const response = await movies.data.insertMany(itemsToInsert)
        itemsToInsert = []
        if(response.hasErrors) {
            throw new Error("Something went wrong in import!")
        }
    }
    // END BatchImportData // END Insert
    // BatchImportData // Iterate through data
    // ... other operations
}
// END Iterate through data // END BatchImportData
// BatchImportData
// insert the remaining objects
if(itemsToInsert.length > 0) {
  // Batch insert any remaining items
  const response = await movies.data.insertMany(itemsToInsert)
  console.log("Done Importing")

  // END BatchImportData
  // Handle Errors // BatchImportData
  if(response.hasErrors) {
      throw new Error("Something went wrong in import!")
  }
  // END BatchImportData // END Handle Errors
  // BatchImportData
}

client.close()
// END BatchImportData
