// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

// START APIKeyWCD
// Set these environment variables
// WEAVIATE_URL     your WCD instance URL
// WEAVIATE_APIKEY  your WCD instance API key

package your.application;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.WeaviateAuthClient;

public class Cloud
{
    public static void main( String[] args )  throws Exception
    {

    String scheme = "https";
    String host = System.getenv("WEAVIATE_URL");
    String apiKey = System.getenv("WEAVIATE_API_KEY");

    Config config = new Config(scheme, host);
    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);
    }
}
// END APIKeyWCD
