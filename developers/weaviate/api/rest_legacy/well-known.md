---
title: REST - /v1/.well-known
sidebar_position: 18
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'discovery', 'oidc', 'well-known']
---

import DocDeprecationNote from './_deprecated.mdx';

<DocDeprecationNote
  tagname="tag/well-known"
  client_examples="/developers/weaviate/config-refs/status"
/>

## OpenID Configuration

If [OpenID Connect (OIDC)](/developers/weaviate/configuration/authentication.md) authentication is enabled, the endpoint returns configuration details.

If a token is configured, the endpoint redirects to it.

#### Usage

The discovery endpoint accepts a `GET` request:

```js
GET /v1/.well-known/openid-configuration
```

If there is an OIDC provider, the endpoint returns the following fields:
- `href`: The reference to the client.
- `cliendID`: The ID of the client.

If there is no OIDC provider, the endpoint returns a `404` HTTP status code.

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

The endpoint returns HTTP status code `200` if the application is able to respond to HTTP requests.

#### Example

import WellKnownLive from '/_includes/code/wellknown.live.mdx';

<WellKnownLive/>

The endpoint returns HTTP status code `200` if the application is able to respond to HTTP requests.

## Readiness

The `ready` endpoint checks if the application is ready to receive traffic. You can use it for Kubernetes readiness probe.

#### Usage

The discovery endpoint accepts a `GET` request:

```js
GET /v1/.well-known/ready
```

The endpoint returns HTTP status code `200` if the application is able to respond to HTTP requests. If the application is currently unable to serve traffic, the endpoint returns HTTP status code `503`.

If the application is unavailable and you have horizontal replicas of Weaviate that can receive traffic, redirect traffic to one of the replicas.

#### Example

import WellknownReady from '/_includes/code/wellknown.ready.mdx';

<WellknownReady/>

The endpoint returns HTTP status code `200` if the application is able to respond to HTTP requests.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
