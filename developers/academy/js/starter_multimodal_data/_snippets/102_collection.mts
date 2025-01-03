import { promises as fs } from 'fs';
import { join } from 'path';
import AdmZip from 'adm-zip';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config'

// CreateMovieCollection // SubmoduleImport // BatchImportData
import weaviate from "weaviate-client";
// END BatchImportData // END CreateMovieCollection // END SubmoduleImport
// CreateMovieCollection // SubmoduleImport
import { WeaviateClient, configure, vectorizer, toBase64FromMedia } from "weaviate-client";
// END CreateMovieCollection  // END SubmoduleImport


// BatchImportData
import { generateUuid5 } from "weaviate-client";

// END BatchImportData

// BatchImportData
let client: WeaviateClient;
// CreateMovieCollection  // END BatchImportData

// END CreateMovieCollection

const wcdURL = process.env.WCD_URL as string;
const wcdApikey = process.env.WCD_API_KEY as string;
const cohereApiKey = process.env.COHERE_API_KEY as string;
const voyageApiKey = process.env.VOYAGEAI_API_KEY as string;



// client = await weaviate.connectToWeaviateCloud(wcdURL, {
//   authCredentials: new weaviate.ApiKey(wcdApikey),
// }
// )
// CreateMovieCollection
// Instantiate your client (not shown). e.g.:
// const requestHeaders = {'X-VoyageAI-Api-Key': process.env.VOYAGEAI_API_KEY as string,}
// client = weaviate.connectToWeaviateCloud(..., headers: requestHeaders) or
// client = weaviate.connectToLocal(..., headers: requestHeaders)

// END CreateMovieCollection

const requestHeaders = {  'X-VoyageAI-Api-Key': voyageApiKey, 
                          'X-Cohere-Api-Key': cohereApiKey
                        }


client = await weaviate.connectToWeaviateCloud(wcdURL, {
  authCredentials: new weaviate.ApiKey(wcdApikey),
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
    { name: "title", dataType: configure.dataType.TEXT },
    { name: "overview", dataType: configure.dataType.TEXT },
    { name: "vote_average", dataType: configure.dataType.NUMBER },
    { name: "genre_ids", dataType: configure.dataType.INT_ARRAY },
    { name: "release_date", dataType: configure.dataType.DATE },
    { name: "tmdb_id", dataType: configure.dataType.INT },
    { name: "poster", dataType: configure.dataType.BLOB }
  ],
  // Define the vectorizer module
  vectorizers: vectorizer.multi2VecVoyageAI({
    imageFields: [{ name: "poster", weight: 0.9 }],
    textFields: [{ name: "title", weight: 0.1 }]
  }),
  // Define the generative module
  generative: configure.generative.cohere(),
  // END generativeDefinition  // CreateMovieCollection
})

client.close()
// END CreateMovieCollection

const weaviateURL = process.env.WCD_URL as string
const weaviateKey = process.env.WCD_API_KEY as string
const cohereKey = process.env.COHERE_API_KEY as string
const voyageaiKey = process.env.VOYAGEAI_API_KEY as string

client = await weaviate.connectToWeaviateCloud(weaviateURL, {
  authCredentials: new weaviate.ApiKey(weaviateKey),
  headers: {
    'X-VoyageAI-Api-Key': voyageaiKey, // Replace with your inference API key
    'X-Cohere-Api-Key': cohereKey,  // Replace with your inference API key
  }
})

// BatchImportData

// Instantiate your client (not shown). e.g.:
// client = weaviate.connectToWeaviateCloud(...) or
// client = weaviate.connectToLocal(...)

// END BatchImportData

// BatchImportData
const dataUrl = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024.json"
const textResponse = await fetch(dataUrl)
const data = await textResponse.json()

// Get current file's directory 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imgDir = join(__dirname, "images");


// Create directory if it doesn't exist
await fs.mkdir(imgDir, { recursive: true });

// Download images
const postersUrl = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024_posters.zip";
const postersPath = join(imgDir, "movies_data_1990_2024_posters.zip");

const response = await fetch(postersUrl);
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
const arrayBuffer = await response.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

// Write the zip file
await fs.writeFile(postersPath, buffer);

// Unzip the files
const zip = new AdmZip(postersPath);
zip.extractAllTo(imgDir, true);

// Get the collection
const movies = client.collections.get("Movie")

// Set a counter and initialize Weaviate Object
let itemsToInsert: Object[] = []
let counter = 0;

// Iterate through data
for (const key of Object.keys(data['title'])) {
  
  counter++;
  if (counter % 20 == 0)
    console.log(`Import: ${counter}`)
  // END Iterate through data // END BatchImportData
  // BatchImportData

  let genreIds: []

  // Format genre_ids and release_date
  const parsedArray = JSON.parse(data['genre_ids'][key]);
  genreIds = parsedArray.map((item: string) => parseInt(item, 10));
  let releaseDate = new Date(data['release_date'][key])

  const imgPath = join(imgDir, `${data['id'][key]}_poster.jpg`)
  // Convert poster to base64
  const posterBase64 = await toBase64FromMedia(imgPath)

  // Build the object payload
  let movieObject = {
    title: data['title'][key],
    overview: data['overview'][key],
    vote_average: data['vote_average'][key],
    genre_ids: genreIds,
    release_date: releaseDate,
    tmdb_id: data['id'][key],
    poster: posterBase64
  }
  // Insert
  let objectToInsert = {
    properties: movieObject,
    uuid: generateUuid5(data['title'][key])
  }

  // Add object to batching array
  itemsToInsert.push(objectToInsert)

  if (itemsToInsert.length == 20) {
    try {
      const response = await movies.data.insertMany(itemsToInsert);
      // END Insert
      // Handle Errors // Insert
  if (response.hasErrors) {
    throw new Error("Error in batch import!");
  }
      // END Insert // END Handle Errors
      // Insert
      console.log(`Successfully imported batch of ${itemsToInsert.length} items`);
      itemsToInsert = [];
    } catch (error) {
      console.error('Error importing batch:', error);
    }
  }
  // END BatchImportData // END Insert
  // BatchImportData // Iterate through data
  // ... other operations
}


client.close()
// END BatchImportData
