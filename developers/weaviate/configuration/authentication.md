---
title: Authentication
sidebar_position: 30
image: og/docs/configuration.jpg
# tags: ['authentication']
---


## Overview

:::info Using Kubernetes?
See [this page](../installation/kubernetes.md#authentication-and-authorization) for how to set up `values.yaml` for authentication & authorization.
:::

Weaviate offers an optional authentication scheme using API keys and OpenID Connect (OIDC), which can enable various [authorizations](authorization.md) levels.

When authentication is disabled, all anonymous requests will be granted access.

In this documentation, we cover all scenarios for your convenience:
- [Configuring Weaviate and the client for API key use](#api-key)
- [Configuring Weaviate and the client for OIDC](#oidc---a-systems-perspective)
- [Configuring Weaviate for anonymous access](#anonymous-access)

Note that API key and OIDC authentication can be both enabled at the same time.

:::tip We recommend starting with the API key
For most use cases, the API key option offers a balance between security and ease of use. Give it a try first, unless you have specific requirements that necessitate a different approach.
:::

## WCS authentication

Weaviate Cloud Services (WCS) instances are pre-configured with both API key and OIDC authentication options, providing you with a seamless experience right out of the box.

Refer to the [WCS documentation for instructions](../../wcs/guides/authentication.mdx) on how to authenticate as a user in this setup.

## API key

:::info Added in `1.18`
:::

To set up Weaviate for API key-based authentication, add the following environment variables to the appropriate Docker Compose file (e.g., `docker-compose.yml`):

```yaml
services:
  weaviate:
    ...
    environment:
      ...
      # Enables API key authentication.
      AUTHENTICATION_APIKEY_ENABLED: 'true'

      # List one or more keys, separated by commas. Each key corresponds to a specific user identity below.
      AUTHENTICATION_APIKEY_ALLOWED_KEYS: 'jane-secret-key,ian-secret-key'

      # List one or more user identities, separated by commas. Each identity corresponds to a specific key above.
      AUTHENTICATION_APIKEY_USERS: 'jane@doe.com,ian-smith'
```

With this configuration, the following API key-based authentication rules apply:

The API key `jane-secret-key` is associated with the `jane@doe.com` identity.
The API key `ian-secret-key` is associated with the `ian-smith` identity.

:::info `n` APIKEY_ALLOWED_KEYS vs `n` APIKEY_USERS
There are two options for configuring the number of keys and users:
- Option 1: There is exactly one user specified and any number of keys (all keys will end up using the same user).
- Option 2: The lengths match, then key `n` will map to user `n`.
:::

These users' permissions will be determined by the [authorization](./authorization.md) settings. Below is one such example configuration.

```yaml
services:
  weaviate:
    ...
    environment:
      ...
      AUTHORIZATION_ADMINLIST_ENABLED: 'true'
      AUTHORIZATION_ADMINLIST_USERS: 'jane@doe.com,john@doe.com'
      AUTHORIZATION_ADMINLIST_READONLY_USERS: 'ian-smith,roberta@doe.com'
```

This configuration designates `jane@doe.com` and `john@doe.com` as admin users with read and write permissions, while `ian-smith` and `roberta@doe.com` have read-only access.

In this scenario, `jane-secret-key` is an admin (read & write) key, and `ian-secret-key` is a read-only key.

:::note What about the other identities?
You might notice that the authorization list includes `john@doe.com` and `roberta@doe.com`. Weaviate supports a combination of API key and OIDC-based authentication. Thus, the additional users might be OIDC users.
:::

### API key: Client-side usage

To authenticate against Weaviate with the API key, each request must include it in the header like: `Authorization: Bearer API_KEY`, where `API_KEY` is the specific API key for the Weaviate instance.

For example, you can use a CURL command as shown below:

```bash
curl https://some-endpoint.weaviate.network/v1/meta -H "Authorization: Bearer YOUR-WEAVIATE-API-KEY" | jq
```

If using a Weaviate client library, click on the relevant link for [Python](../client-libraries/python/index.md#api-key-authentication), [TypeScript](../client-libraries/typescript.mdx#api-key-authentication), [Java](../client-libraries/java.md#api-key-authentication) or [Go](../client-libraries/go.md#api-key-authentication) to see client-specific instructions.

## OIDC - A systems perspective

OIDC authentication involves three parties.

1. A **user** who wants to access a resource.
1. An **identity provider (a.k.a token issuer)** (e.g. Okta, Microsoft, or WCS) that authenticates the user and issues tokens.
1. A **resource** (in this case, Weaviate) who validates the tokens to rely on the identity provider's authentication.

For example, a setup may involve a Weaviate instance as a resource, Weaviate Cloud Services (WCS) as an identity provider, and the Weaviate client acting on behalf of the user. This document attempts to provide some perspective from each one to help you use Weaviate with authentication.

<details>
  <summary>
    More about OIDC
  </summary>

With [OpenID Connect](https://openid.net/connect/) (based on OAuth2), an
external identity provider and token issuer ('token issuer' hereafter) is responsible for managing users.

OIDC authentication requires obtaining a valid token from the token issuer so that it can be sent in the header of any request to Weaviate. This applies to both REST and GraphQL requests.

When Weaviate receives a token (JSON Web Token or JWT), it verifies
that it was indeed signed by the configured token issuer. If the signature is
correct, all contents of the token are trusted, which authenticates the user based on the information in the token.

</details>

## OIDC - Configuring Weaviate as the resource

:::tip
This applies to anyone who is running their own Weaviate instance.
:::

### Requirements and defaults

Any "OpenID Connect" compatible token issuer implementing OpenID Connect Discovery can be used with Weaviate. Configuring the OIDC token issuer is outside the scope of this document, but here are a few options as a starting point:

- For simple use-cases such as for a single user, you can use Weaviate Cloud Services (WCS) as the OIDC token issuer. To do so:
    - Make sure you have a WCS account (you can [sign up here](https://console.weaviate.cloud/)).
    - In the Docker Compose file (e.g. `docker-compose.yml`), specify:
      - `https://auth.wcs.api.weaviate.io/auth/realms/SeMI` as the issuer (in `AUTHENTICATION_OIDC_ISSUER`),
      - `wcs` as the client id (in `AUTHENTICATION_OIDC_CLIENT_ID`), and
      - enable the adminlist (`AUTHORIZATION_ADMINLIST_ENABLED: 'true'`) and add your WCS account email as the user (in `AUTHORIZATION_ADMINLIST_USERS`) .
      - `email` as the username claim (in `AUTHENTICATION_OIDC_USERNAME_CLAIM`).

- If you need a more customizable setup you can use commercial OIDC providers like [Okta](https://www.okta.com/).
- As another alternative, you can run your own OIDC token issuer server, which may be the most complex but also configurable solution. Popular open-source solutions include Java-based [Keycloak](https://www.keycloak.org/) and Golang-based [dex](https://github.com/dexidp/dex).

:::info
By default, Weaviate will validate that the token includes a specified client id in the audience claim. If your token issuer does not support this feature, you can turn it off as outlined in the configuration section below.
:::

### Setting configuration options

To use OpenID Connect (OIDC), the **respective environment variables** must be correctly configured in the configuration yaml for Weaviate.

:::info
As of November 2022, we were aware of some differences in Microsoft Azure's OIDC implementation compared to others. If you are using Azure and experiencing difficulties, [this external blog post](https://xsreality.medium.com/making-azure-ad-oidc-compliant-5734b70c43ff) may be useful.
:::

The OIDC-related Docker Compose environment variables are shown below. Please see the inline-yaml comments for details around the respective fields:

```yaml
services:
  weaviate:
    ...
    environment:
      ...
      # enabled (optional - defaults to false) turns OIDC auth on. All other fields in
      # this section will only be validated if enabled is set to true.
      AUTHENTICATION_OIDC_ENABLED: 'true'

      # issuer (required) tells weaviate how to discover the token issuer. This
      # endpoint must implement the OpenID Connect Discovery spec, so that weaviate
      # can retrieve the issuer's public key.
      #
      # The example URL below uses the path structure commonly found with keycloak
      # where an example realm 'my-weaviate-usecase' was created. The exact
      # path structure will depend on the token issuer of your choice. Please
      # see the respective documentation of your issuer about which endpoint
      # implements OIDC Discovery.
      AUTHENTICATION_OIDC_ISSUER: 'http://my-token-issuer/auth/realms/my-weaviate-usecase'

      # client_id (required unless skip_client_id_check is set to true) tells
      # Weaviate to check for a particular OAuth 2.0 client_id in the audience claim.
      # This is to prevent that a token which was signed by the correct issuer
      # but never intended to be used with Weaviate can be used for authentication.
      #
      # For more information on what clients are in OAuth 2.0, see
      # https://tools.ietf.org/html/rfc6749#section-1.1
      AUTHENTICATION_OIDC_CLIENT_ID: 'my-weaviate-client'

      # username_claim (required) tells Weaviate which claim in the token to use for extracting
      # the username. The username will be passed to the authorization plugin.
      AUTHENTICATION_OIDC_USERNAME_CLAIM: 'email'

      # skip_client_id_check (optional, defaults to false) skips the client_id
      # validation in the audience claim as outlined in the section above.
      # Not recommended to set this option as it reduces security, only set this
      # if your token issuer is unable to provide a correct audience claim
      AUTHENTICATION_OIDC_SKIP_CLIENT_ID_CHECK: 'false'

      # scope (optional) these will be used by clients as default scopes for authentication
      AUTHENTICATION_OIDC_SCOPES: ''
```

#### Weaviate OpenID endpoint

If you have authentication enabled, you can obtain Weaviate's OIDC configuration from the following endpoint:

```bash
curl [WEAVIATE URL]/v1/.well-known/openid-configuration
```

## OIDC - A client-side perspective

The OIDC standard allows for many different methods *(flows)* of obtaining tokens. The appropriate method can vary depending on your situation, including configurations at the token issuer, and your requirements.

While it is outside the scope of our documentation to cover every OIDC authentication flow, some possible options are to:
1. Use `client credentials flow` for machine-to-machine authorization. (Note that this will authorize an app, rather than a particular user.)
    - Validated using Okta and Azure as identity providers; GCP does not support client credentials grant flow (as of December 2022).
    - Weaviate's Python client directly supports this method.
    - Client credential flows usually do not come with a refresh token and the credentials are saved in the respective clients to acquire a new access token on expiration of the old one.
1. Use `resource owner password flow` for trusted applications (e.g. used by [Weaviate Cloud Services](../../wcs/guides/authentication.mdx).
1. Use `hybrid flow` if Azure is your token issuer or if you would like to prevent exposing passwords.

### OIDC support for Weaviate clients

The latest versions (from mid-December 2022 and onwards) of Python, JavaScript, Go and Java Weaviate clients support OIDC authentication. If Weaviate is set up to use the `client credentials grant` flow as or `resource owner password flow`, the respective Weaviate client can instantiate a connection to Weaviate that incorporates the authentication flow.

Please refer to the [client libraries documentation](../client-libraries/index.md) for each client for code examples.

### Manually obtaining and passing tokens

<details>
  <summary>
    Manually obtaining and passing tokens
  </summary>

For cases or workflows where you may wish to manually obtain a token, we outline below the steps to do so, for the resource owner password flow and hybrid flow.

#### Resource owner password flow

1. Send a GET request to `[WEAVIATE_URL]/v1/.well-known/openid-configuration` to fetch Weaviate's OIDC configuration (`wv_oidc_config`)
1. Parse the `clientId` and `href` from `wv_oidc_config`
1. Send a GET request to `href` to fetch the token issuer's OIDC configuration (`token_oidc_config`)
1. If `token_oidc_config` includes the optional `grant_types_supported` key, check that `password` is in the list of values.
    - If `password` is not in the list of values, the token issuer is likely not configured for `resource owner password flow`. You may need to reconfigure the token issuer or use another method.
    - If the `grant_types_supported` key is not available, you may need to contact the token issuer to see if `resource owner password flow` is supported.
1. Send a POST request to the `token_endpoint` of `token_oidc_config` with the body:
    - `{"grant_type": "password", "client_id": client_id, "username": [USERNAME], "password": [PASSWORD]}`.
    - Where `[USERNAME]` and `[PASSWORD]` are replaced with the actual values for each.
1. Parse the response (`token_resp`), and look for `access_token` in `token_resp`. This is your Bearer token.

#### Hybrid flow

1. Send a GET request to `[WEAVIATE_URL]/v1/.well-known/openid-configuration` to fetch Weaviate's OIDC configuration (`wv_oidc_config`)
2. Parse the `clientId` and `href` from `wv_oidc_config`
3. Send a GET request to `href` to fetch the token issuer's OIDC configuration (`token_oidc_config`)
4. Construct a URL (`auth_url`) with the following parameters, based on `authorization_endpoint` from `token_oidc_config`. This will look like the following:
    - `{authorization_endpoint}`?client_id=`{clientId}`&response_type=code%20id_token&response_mode=fragment&redirect_url=`{redirect_url}`&scope=openid&nonce=abcd
    - the `redirect_url` must have been [pre-registered](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) with your token issuer.
5. Go to the `auth_url` in your browser, and log in if prompted. If successful, the token issuer will redirect the browser to the `redirect_url`, with additional parameters that include an `id_token` parameter.
6. Parse the `id_token` parameter value. This is your Bearer token.

#### Code example

For those who wish to obtain OIDC tokens manually, we include an illustrative code example below in Python for demonstrating how to obtain an OIDC token.

```python
import requests
import re

url = "http://localhost:8080"  # <-- Replace with your actual Weaviate URL

# Get Weaviate's OIDC configuration
weaviate_open_id_config = requests.get(url + "/v1/.well-known/openid-configuration")
if weaviate_open_id_config.status_code == "404":
    print("Your Weaviate instance is not configured with openid")

response_json = weaviate_open_id_config.json()
client_id = response_json["clientId"]
href = response_json["href"]

# Get the token issuer's OIDC configuration
response_auth = requests.get(href)

if "grant_types_supported" in response_auth.json():
    # For resource owner password flow
    assert "password" in response_auth.json()["grant_types_supported"]

    username = "username"  # <-- Replace with the actual username
    password = "password"  # <-- Replace with the actual password

    # Construct the POST request to send to 'token_endpoint'
    auth_body = {
        "grant_type": "password",
        "client_id": client_id,
        "username": username,
        "password": password,
    }
    response_post = requests.post(response_auth.json()["token_endpoint"], auth_body)
    print("Your access_token is:")
    print(response_post.json()["access_token"])
else:
    # For hybrid flow
    authorization_url = response_auth.json()["authorization_endpoint"]
    parameters = {
        "client_id": client_id,
        "response_type": "code%20id_token",
        "response_mode": "fragment",
        "redirect_url": url,
        "scope": "openid",
        "nonce": "abcd",
    }
    # Construct 'auth_url'
    parameter_string = "&".join([key + "=" + item for key, item in parameters.items()])
    response_auth = requests.get(authorization_url + "?" + parameter_string)

    print("Please visit the following url with your browser to login:")
    print(authorization_url + "?" + parameter_string)
    print(
        "After the login you will be redirected, the token is the 'id_token' parameter of the redirection url."
    )

    # You could use this regular expression to parse the token
    resp_txt = "Redirection URL"
    token = re.search("(?<=id_token=).+(?=&)", resp_txt)[0]

print("Set as bearer token in the clients to access Weaviate.")
```

#### Token lifetime

The token has a configurable expiry time that is set by the token issuer. We suggest establishing a workflow to periodically obtain a new token before expiry.

</details>

### Add a Bearer to a Request

Once you have obtained a token, attach it to all requests to Weaviate in the header like so: `Authorization: Bearer TOKEN`, where `TOKEN` is your actual token.

For example, you can use a CURL command as shown below:

```bash
# List objects using a Bearer token
curl http://localhost:8080/v1/objects -H "Authorization: Bearer TOKEN"
```

If using a Weaviate client library, click on the relevant link for [Python](../client-libraries/python/index.md#authentication), [TypeScript/JavaScript](/developers/weaviate/client-libraries/typescript.mdx#authentication), [Java](../client-libraries/java.md#authentication) or [Go](../client-libraries/go.md#authentication) to find instructions on how to attach a token with that client.

## Anonymous access
By default, Weaviate is configured to accept requests without any
authentication headers or parameters. Users sending such requests will be
authenticated as `user: anonymous`.

You can use the authorization plugin to specify which
permissions to apply to anonymous users. When anonymous access is disabled altogether,
any request without an allowed authentication scheme will return `401
Unauthorized`.

### Configuration
Anonymous access can be enabled or disabled in the configuration yaml using the environment variable shown below:

```yaml
services:
  weaviate:
    ...
    environment:
      ...
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
```

### How to use

Send REST requests to Weaviate without any additional authentication headers or parameters.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
