---
title: OIDC Configuration
sidebar_position: 95
image: og/docs/configuration.jpg
# tags: ['metadata', 'reference', 'configuration']
---

If [OpenID Connect (OIDC)](/developers/weaviate/configuration/authentication.md) authentication is enabled, its details will be available through the `/v1/.well-known/openid-configuration` endpoint.

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

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
