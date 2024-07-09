// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

/////////////////////
/// Cloud connect ///
/////////////////////

// START APIKeyWCD
// Set these environment variables
// WEAVIATE_URL      your Weaviate instance URL
// WEAVIATE_API_KEY  your Weaviate instance API key

package your.application;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.WeaviateAuthClient;

public class App
{
    public static void main( String[] args ) throws Exception
    {

    String scheme = "https";
    String host = System.getenv("WEAVIATE_URL");
    String apiKey = System.getenv("WEAVIATE_API_KEY");

    Config config = new Config(scheme, host);
    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);
    }
}
// END APIKeyWCD

// START ThirdPartyAPIKeys
// Set these environment variables
// WEAVIATE_URL      your Weaviate instance URL
// WEAVIATE_API_KEY  your Weaviate instance API key
// COHERE_API_KEY    your Cohere API key

package your.application;

import java.util.HashMap;
import java.util.Map;
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.WeaviateAuthClient;

public class App
{
    public static void main( String[] args ) throws Exception
    {

    String scheme = "https";
    String host = System.getenv("WEAVIATE_URL");
    String apiKey = System.getenv("WEAVIATE_API_KEY");
    String cohereKey = System.getenv("COHERE_API_KEY");

    Map<String, String> headers = new HashMap<String, String>() { {
        put("X-Cohere-Api-Key", cohereKey);
    } };

    Config config = new Config(scheme, host, headers);
    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);
    }
}
// END ThirdPartyAPIKeys

//////////////////
/// Local auth ///
//////////////////

// START LocalAuth
// Set this environment variable
// WEAVIATE_API_KEY  your Weaviate instance API key

package your.application;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.WeaviateAuthClient;

public class App
{
    public static void main( String[] args ) throws Exception
    {

    String scheme = "http";
    String host = "localhost:8080";
    String apiKey = System.getenv("WEAVIATE_API_KEY");

    Config config = new Config(scheme, host);
    WeaviateClient client = WeaviateAuthClient.apiKey(config, apiKey);
    }
}
// END LocalAuth

/////////////////////
/// Local no auth ///
/////////////////////

// START LocalNoAuth
package your.application;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;

public class App
{
    public static void main( String[] args ) throws Exception
    {

    String scheme = "http";
    String host = "localhost:8080";

    Config config = new Config(scheme, host);
    WeaviateClient client = new WeaviateClient(config);
    }
}
// END LocalNoAuth

//////////////////////
/// Local 3d party ///
//////////////////////

// START LocalThirdPartyAPIKeys
// Set this environment variable
// COHERE_API_KEY    your Cohere API key

package your.application;

import java.util.HashMap;
import java.util.Map;
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;

public class App
{
    public static void main( String[] args ) throws Exception
    {

    String scheme = "http";
    String host = "localhost:8080";
    String cohereKey = System.getenv("COHERE_API_KEY");

    Map<String, String> headers = new HashMap<String, String>() { {
        put("X-Cohere-Api-Key", cohereKey);
    } };

    Config config = new Config(scheme, host, headers);
    WeaviateClient client = new WeaviateClient(config);
    }
}
// END LocalThirdPartyAPIKeys


////////////
/// OIDC ///
////////////

// START OIDCConnect
// Set these environment variables
// WEAVIATE_USER    your Weaviate OIDC username
// WEAVIATE_PWD     your Weaviate OIDC password

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;

Config config = new Config("http", "localhost:8080");
WeaviateAuthClient.clientPassword(
    config,
    System.getenv("WEAVIATE_USER"),
    System.getenv("WEAVIATE_PWD"),
    Arrays.asList("scope1", "scope2") // optional, depends on the configuration of your identity provider (not required with WCD)
);
// END OIDCConnect
