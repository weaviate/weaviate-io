// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

// START APIKeyWCD
// Set these environment variables
// WEAVIATE_URL     your WCD instance URL
// WEAVIATE_APIKEY  your WCD instance API key

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;

Config config = new Config("https", WEAVIATE_URL);
WeaviateClient client = WeaviateAuthClient.apiKey(config, WEAVIATE_APIKEY);
// END APIKeyWCD