---
title: REST - /v1/.well-known
sidebar_position: 18
# layout: layout-documentation
# solution: weaviate
# sub-menu: RESTful API references
# title: /v1/.well-known
# intro: OpenID Configuration, Liveness and Readiness, all endpoints under the .well-known endpoint, give you information about the configuration and status of the Weaviate instance.
# description: RESTful API open ID configuration reference
# tags: ['RESTful API', 'references', 'discovery', 'oidc', 'well-known']
# sidebar_position: 7
# open-graph-type: article
# toc: true
# redirect_from:
#     - /documentation/weaviate/references/rest/well-known.html
---
<badges/>

## OpenID Configuration
The RESTful API discovery gives information if [OpenID Connect (OIDC)](/docs/weaviate/configuration/authentication.md#openid-connect-oidc) authentication is enabled. The endpoint redirects to the token issued if one is configured.

#### Usage

The discovery endpoint accepts a `GET` request:

```js
GET /v1/.well-known/openid-configuration
```

And it returns the following fields:
- `href`: The reference to the client.
- `cliendID`: The ID of the client.

If no OIDC provider is present, a `404` code will be returned.
  
#### Example
The following command:

import WellknownOpenIDConfig from '/_includes/code/wellknown.openid-configuration.mdx';

<WellknownOpenIDConfig/>

returns:

```json
{
  "href": "http://my-token-issuer/auth/realms/my-weaviate-usecase",
  "cliendID": "my-weaviate-client"
}
```

## Liveness

Live determines whether the application is alive. It can be used for Kubernetes liveness probe.

#### Usage

The discovery endpoint accepts a `GET` request:

```js
GET /v1/.well-known/live
```

And it returns 200 if the application is able to respond to HTTP requests.
  
#### Example
If the following command:

import WellKnownLive from '/_includes/code/wellknown.live.mdx';

<WellKnownLive/>

returns nothing (a 200 response), you know the application is able to respond to HTTP requests.

## Readiness

Live determines whether the application is ready to receive traffic. It can be used for Kubernetes readiness probe.

## Usage

The discovery endpoint accepts a `GET` request:

```js
GET /v1/.well-known/ready
```

And it returns 200 if the application is able to respond to HTTP requests, and 503 if the application is currently not able to serve traffic. If other horizontal replicas of Weaviate are available and they are capable of receiving traffic, all traffic should be redirected there instead.
  
#### Example
If the following command:

import WellknownReady from '/_includes/code/wellknown.ready.mdx';

<WellknownReady/>

returns nothing (a 200 response), you know the application is able to respond to HTTP requests.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
