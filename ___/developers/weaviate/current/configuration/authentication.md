---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Authentication
intro: By default, Weaviate runs without any form of authentication. To run Weaviate with authentication, you can configure OpenID authentication in the configuration file of Weaviate. Then, use a Bearer token to authenticate.
description: Authentication in Weaviate
tags: ['authentication']
sidebar_position: 4
open-graph-type: article
toc: true
redirect_from:
    - /documentation/weaviate/current/setup/authenticate.html
    - /documentation/weaviate/current/configuration/authentication.html
---

# Philosophy

Weaviate should be as easy-to-use as possible regardless of the setting. Trying it out locally can be a very different case than running it in production in an enterprise environment.

We want to make sure that Authentication reflects this. Thus, different authentication schemes can be selected and even combined. This allows scenarios such as _"Anonymous users can read some resources, but not all. Authenticated users can read all resources. Only a special group can write or delete resources."_

# OpenID Details

If you have authentication enabled, you can request all details needed from the following endpoint:

```bash
$ curl http://localhost:8080/v1/.well-known/openid-configuration
```

## Anonymous Access
If anonymous access is selected, weaviate will accept requests without any
authentication headers or parameters. Users sending such a request will be
authenticated as `user: anonymous, group: anonymous`.

It is up to the authorization module to decide which
permissions anonymous users have. By disabling anonymous access all together,
any request without an allowed authentication scheme will return `401
Unauthorized`.

### Configuration
Anonymous Access can be configured like so in the Docker Compose yaml:

```yaml
services:
  weaviate:
    ...
    environment:
      ...
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
```

### How to use

Simply omit any authentication headers or parameters from your REST request to
Weaviate.

## OpenID Connect (OIDC)

With [OpenID Connect](https://openid.net/connect/) (based on OAuth2), an
external identity provider and token issuer is responsible for managing users.
Weaviate's part when receiving a token (JSON Web Token or JWT) is to verify
that it was indeed signed by the configured token issuer. If the signature is
correct, all content of the token is trusted. The user is then authenticated as
the subject mentioned in the token.

### Requirements &amp; Defaults

- Any "OpenID Connect" compatible token issuer implementing OpenID Connect
  Discovery can be
  used with Weaviate. Popular open source solutions include Java-based
  [Keycloak](https://www.keycloak.org/) and Golang-based
  [dex](https://github.com/dexidp/dex).

- By default, weaviate will validate that the token includes a specified client
  id in the audience claim. If your token issuer does not support this feature,
  you can turn it off as outlined in the configuration section below.

- By default, weaviate will try to extract groups from a claim of your choice.
  Groups are a helpful tool to implement authorization roles for groups rather
  than single subjects. However, groups are not a required OpenID spec.
  Therefore, this extraction is optional and will not fail authentication if no
  groups could be found.

### Configuration

OpenID Connect (OIDC) can be configured like so in the respective environment variables in the Docker-Compose yaml. Please see the inline-yaml comments for details around
the respective fields:

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
      # weaviate to check for a particular OAuth 2.0 client_id in the audience claim.
      # This is to prevent that a token which was signed by the correct issuer
      # but never intended to be used with weaviate can be used for authentication.
      #
      # For more information on what clients are in OAuth 2.0, see
      # https://tools.ietf.org/html/rfc6749#section-1.1      
      AUTHENTICATION_OIDC_CLIENT_ID: 'my-weaviate-client'

      # username_claim (required) tells weaviate which claim to use for extracting
      # the username. The username will be passed to the authorization module.      
      AUTHENTICATION_OIDC_USERNAME_CLAIM: 'email'

      # groups_claim (optional) tells weaviate which claim to use for extracting
      # the groups. Groups must be an array of string. If groups_claim is not set
      # weaviate will not try to extract groups and pass an empty array to the 
      # authorization module.      
      AUTHENTICATION_OIDC_GROUPS_CLAIM: 'groups'

      # skip_client_id_check (optional, defaults to false) skips the client_id
      # validation in the audience claim as outlined in the section above.
      # Not recommended to set this option as it reduces security, only set this
      # if your token issuer is unable to provide a correct audience claim
      AUTHENTICATION_OIDC_SKIP_CLIENT_ID_CHECK: 'false'
```

### How to use

1. Obtain a valid token from the token issuer you configured.
2. Send this token along any REST request in the Header like so: `Authorization: Bearer <token>`. Make sure to replace `<token>` with your actual token.

# Add a Bearer to a Request

When you've received a Bearer, you can authenticate in the following manner where `{Bearer}` is the bearer-code.

```bash
# List all objects with a Bearer
$ curl http://localhost:8080/v1/objects -H "Authorization: Bearer {Bearer}"
```

# More Resources

{% include docs-support-links.html %}
