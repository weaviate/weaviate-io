// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

/////////////////////
/// Cloud connect ///
/////////////////////

// START APIKeyWCD
// Set these environment variables
// WEAVIATE_URL      your Weaviate instance URL
// WEAVIATE_API_KEY  your Weaviate instance API key

package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
)

// Create the client
func CreateClient() {
	cfg := weaviate.Config{
		Host:       os.Getenv("WEAVIATE_URL"),
		Scheme:     "https",
		AuthConfig: auth.ApiKey{Value: os.Getenv("WEAVIATE_API_KEY")},
		Headers:    nil,
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// Check the connection
	live, err := client.Misc().LiveChecker().Do(context.Background())
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", live)

}

func main() {
	CreateClient()
}
// END APIKeyWCD

/////////////////////
/// Local no auth ///
/////////////////////

// START LocalNoAuth
package main

import (
	"context"
	"fmt"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
)

// Create the client
func CreateClient() {
	cfg := weaviate.Config{
		Host:       "localhost:8080",
		Scheme:     "http",
        Headers:    nil,
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// Check the connection
	live, err := client.Misc().LiveChecker().Do(context.Background())
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", live)

}

func main() {
	CreateClient()
}
// END LocalNoAuth

//////////////////
/// Local auth ///
//////////////////

// START LocalAuth
// Set this environment variable
// WEAVIATE_API_KEY  your Weaviate instance API key

package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
    "github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
)

// Create the client
func CreateClient() {
	cfg := weaviate.Config{
		Host:       "localhost:8080",
		Scheme:     "http",
        AuthConfig: auth.ApiKey{Value: os.Getenv("WEAVIATE_API_KEY")},
        Headers:    nil,
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// Check the connection
	live, err := client.Misc().LiveChecker().Do(context.Background())
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", live)

}

func main() {
	CreateClient()
}
// END LocalAuth

//////////////////////
/// Local 3d party ///
//////////////////////

// START LocalThirdPartyAPIKeys
// Set this environment variable
// COHERE_API_KEY    your Cohere API key

package main

import (
	"context"
	"fmt"
	"os"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
)

// Create the client
func CreateClient() {
	cfg := weaviate.Config{
		Host:       "localhost:8080",
		Scheme:     "http",
        Headers:     map[string]string{
            "X-Cohere-Api-Key": os.Getenv("WEAVIATE_COHERE_KEY"),
        },
	}

	client, err := weaviate.NewClient(cfg)
	if err != nil {
		fmt.Println(err)
	}

	// Check the connection
	live, err := client.Misc().LiveChecker().Do(context.Background())
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v", live)

}

func main() {
	CreateClient()
}
// END LocalThirdPartyAPIKeys

//////////////////////
/// Cloud 3d party ///
//////////////////////

// START ThirdPartyAPIKeys
// Set these environment variables
// WEAVIATE_URL      your Weaviate instance URL
// WEAVIATE_API_KEY  your Weaviate instance API key
// COHERE_API_KEY    your Cohere API key

package main

import (
  "context"
  "fmt"
  "os"
  "github.com/weaviate/weaviate-go-client/v4/weaviate"
  "github.com/weaviate/weaviate-go-client/v4/weaviate/auth"
)

// Create the client
func CreateClient() {
cfg := weaviate.Config{
    Host: os.Getenv("WEAVIATE_URL"),   // URL only, no scheme prefix
    Scheme: "https",
    AuthConfig: auth.ApiKey{Value: os.Getenv("WEAVIATE_API_KEY")},
    Headers: map[string]string{
        "X-Cohere-Api-Key": os.Getenv("WEAVIATE_COHERE_KEY"),
    },
}

client, err := weaviate.NewClient(cfg)
if err != nil{
    fmt.Println(err)
}

// Check the connection
live, err := client.Misc().LiveChecker().Do(context.Background())
if err != nil {
	panic(err)
}
fmt.Printf("%v", live)
}

func main() {
	CreateClient()
}

// END ThirdPartyAPIKeys

////////////
/// OIDC ///
////////////

// START OIDCConnect
// Set these environment variables
// WEAVIATE_USER    your Weaviate OIDC username
// WEAVIATE_PWD     your Weaviate OIDC password

cfg := weaviate.Config{
    Host:   "weaviate.example.com",
    Scheme: "http",
    AuthConfig: auth.ResourceOwnerPasswordFlow{
        Username: os.Getenv("WEAVIATE_USER"),
        Password: os.Getenv("WEAVIATE_PWD"),
        Scopes:   []string{"offline_access"}, // optional, depends on the configuration of your identity provider (not required with WCD)
    },
    Headers: nil,
}
client, err := weaviate.NewClient(cfg)
if err != nil{
    fmt.Println(err)
}
// END OIDCConnect
