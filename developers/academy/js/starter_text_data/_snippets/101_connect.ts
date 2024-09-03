// # WCDInstantiation // # WCDAPIKeyInstantiation // # DockerInstantiation // # DockerAPIKeyInstantiation // # TryFinallyCloseDemo
import weaviate, { WeaviateClient } from "weaviate-client"
let client: WeaviateClient
// # END WCDInstantiation // # END WCDAPIKeyInstantiation // # END DockerInstantiation // # END DockerAPIKeyInstantiation // # END TryFinallyCloseDemo


// # WCDInstantiation

client = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL as string,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
  } 
)

// # END WCDInstantiation

client.close()

// # WCDAPIKeyInstantiation

client = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL as string,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,  // Replace with your inference API key
    }
  } 
)
// # END WCDAPIKeyInstantiation

client.close()

// # DockerInstantiation

client = await weaviate.connectToLocal()
// # END DockerInstantiation

client.close()

// # DockerAPIKeyInstantiation

client = await weaviate.connectToLocal({
  host: '...',
  headers: {
  'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,  // Replace with your inference API key
}})
// # END DockerAPIKeyInstantiation

// # PollLiveness
if (await client.isLive()) {
  // This will raise an exception if the client is not live
} 
// # END PollLiveness


// # GetMeta
console.log(await client.getMeta())
// # END GetMeta


const outputString = 
// # OutputGetMeta
{
  hostname: 'http://[::]:8080',
  modules: {
    'backup-gcs': {
      bucketName: 'weaviate-wcs-prod-cust-europe-west3-workloads-backups',
      rootName: '55a78146-dae1-4609-90ce-556db01f4a61'
    },
    'generative-anyscale': {
      documentationHref: 'https://docs.anyscale.com/endpoints/overview',
      name: 'Generative Search - Anyscale'
    },
    'generative-aws': {
      documentationHref: 'https://docs.aws.amazon.com/bedrock/latest/APIReference/welcome.html',
      name: 'Generative Search - AWS'
    },
    'generative-cohere': {
      documentationHref: 'https://docs.cohere.com/reference/chat',
      name: 'Generative Search - Cohere'
    },
    'generative-mistral': {
      documentationHref: 'https://docs.mistral.ai/api/',
      name: 'Generative Search - Mistral'
    },
    'generative-openai': {
      documentationHref: 'https://platform.openai.com/docs/api-reference/completions',
      name: 'Generative Search - OpenAI'
    },
    'generative-palm': {
      documentationHref: 'https://cloud.google.com/vertex-ai/docs/generative-ai/chat/test-chat-prompts',
      name: 'Generative Search - Google PaLM'
    },
    'multi2vec-palm': {
      documentationHref: 'https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings',
      name: 'Google PaLM Multimodal Module'
    },
    'qna-openai': {
      documentationHref: 'https://platform.openai.com/docs/api-reference/completions',
      name: 'OpenAI Question & Answering Module'
    },
    'ref2vec-centroid': {},
    'reranker-cohere': {
      documentationHref: 'https://txt.cohere.com/rerank/',
      name: 'Reranker - Cohere'
    },
    'reranker-voyageai': {
      documentationHref: 'https://docs.voyageai.com/reference/reranker-api',
      name: 'Reranker - VoyageAI'
    },
    'text2vec-aws': {
      documentationHref: 'https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html',
      name: 'AWS Module'
    },
    'text2vec-cohere': {
      documentationHref: 'https://docs.cohere.ai/embedding-wiki/',
      name: 'Cohere Module'
    },
    'text2vec-huggingface': {
      documentationHref: 'https://huggingface.co/docs/api-inference/detailed_parameters#feature-extraction-task',
      name: 'Hugging Face Module'
    },
    'text2vec-jinaai': {
      documentationHref: 'https://jina.ai/embeddings/',
      name: 'JinaAI Module'
    },
    'text2vec-openai': {
      documentationHref: 'https://platform.openai.com/docs/guides/embeddings/what-are-embeddings',
      name: 'OpenAI Module'
    },
    'text2vec-palm': {
      documentationHref: 'https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-text-embeddings',
      name: 'Google PaLM Module'
    },
    'text2vec-voyageai': {
      documentationHref: 'https://docs.voyageai.com/docs/embeddings',
      name: 'VoyageAI Module'
    }
  },
  version: '1.25.5'
}
// # END OutputGetMeta



client.close()

client = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL as string,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,  // Replace with your inference API key
    }
  } 
)

// # TryFinallyCloseDemo

// Instantiate your client (not shown). e.g.:
// client = weaviate.connect_to_weaviate_cloud(...) or
// client = weaviate.connect_to_local(...)

try {
  // Work with the client here 
  if (await client.isLive()) {
    // ...
  }
} finally { // This will always be executed, even if an exception is raised
  client.close()  // Close the connection & release resources

}


// # END TryFinallyCloseDemo
