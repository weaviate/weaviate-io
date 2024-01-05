---
title: REST - /v1/.well-known
sidebar_position: 18
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'discovery', 'oidc', 'well-known']
---


## OpenID Configuration
If [OpenID Connect (OIDC)](/developers/weaviate/configuration/authentication.md) authentication is enabled, the endpoint returns configuration details.

If a token is configured, the endpoint redirects to it.

#### Usage

The endpoint accepts a `GET` request:

```js
GET /v1/.well-known/openid-configuration
```

If there is an OIDC provider, the endpoint returns the following fields:
- `href`: The reference to the client.
- `cliendID`: The ID of the client.

If you are using cURL and there is no OIDC provider, the endpoint returns a `404` HTML status code.

#### Example

import WellknownOpenIDConfig from '/_includes/code/wellknown.openid-configuration.mdx';

<WellknownOpenIDConfig/>

If OIDC is configured, the endpoint returns a document like this:

```json
{
  "href": "http://my-token-issuer/auth/realms/my-weaviate-usecase",
  "cliendID": "my-weaviate-client"
}
```

## Liveness

The `live` endpoint checks if the application is alive. You can use it for a Kubernetes liveness probe.

#### Usage

The endpoint accepts a `GET` request:

```js
GET /v1/.well-known/live
```

The Weaviate clients return a boolean value. If you are using cURL, the endpoint returns HTML status code `200` if the application is able to respond to HTTP requests.

#### Example

import WellKnownLive from '/_includes/code/wellknown.live.mdx';

<WellKnownLive/>

The Weaviate clients return a boolean value. If you are using cURL, the endpoint returns HTML status code `200` if the application is able to respond to HTTP requests. 

## Readiness

The `ready` endpoint checks if the application is ready to receive traffic. You can use it for Kubernetes readiness probe.

## Usage

The discovery endpoint accepts a `GET` request:

```js
GET /v1/.well-known/ready
```

The Weaviate clients return a boolean value. If you are using cURL, the endpoint returns HTML status code `200` if the application is able to respond to HTTP requests or HTML status code `503` if the application is currently not able to serve traffic.

If you have horizontal replicas of Weaviate that are available and can receive traffic, redirect traffic to one of the replicas.

#### Example

import WellknownReady from '/_includes/code/wellknown.ready.mdx';

<WellknownReady/>

The Weaviate clients return a boolean value. If you are using cURL, the endpoint returns HTML status code `200` if the application is able to respond to HTTP requests.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
