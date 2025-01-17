// START weaviate.js
import weaviate from 'weaviate-client'
import 'dotenv/config';

export const connectToDB = async () => {
  try {
    const client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_HOST_URL,{
          authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_READ_KEY),
          headers: {
           'X-Cohere-Api-Key': process.env.COHERE_API_KEY || '',
         }
        }
      )
      console.log(`We are connected! ${await client.isReady()}`);
      return client
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// END weaviate.js
const dotEnv = ```
// START .env
COHERE_API_KEY=
WEAVIATE_HOST_URL=
WEAVIATE_ADMIN_KEY=
WEAVIATE_READ_KEY=
// END .env
```

// START app.js
import express from 'express';
import { connectToDB } from './config/weaviate.js';

const app = express();
const port = 3005

const client = await connectToDB();

app.get('/', async function(req, res, next) {
    var searchTerm = req.query.searchTerm;

    const wikipedia = client.collections.get("Wikipedia")

    try {
        const response = await wikipedia.query.nearText(searchTerm, {
            limit: 3
        })
    
        res.send(response.objects)
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
  })

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

  

// END app.js