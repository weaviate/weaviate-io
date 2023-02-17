---
title: Weaviate Cloud Services
sidebar_position: 1
image: og/docs/installation.jpg
# tags: ['installation', 'Weaviate Cloud Services']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview


Weaviate Cloud Services (WCS) is a managed SaaS service that requires no maintenance at your end. Accordingly, it may be the easiest way to run Weaviate.

WCS can be accessed via the [console](https://console.weaviate.io).

* You can learn more about the console in [this guide](../tutorials/console.md).
* You can create free-tier sandboxes and [sign up](https://console.weaviate.io) for the private beta of our production SaaS.

## Sign in

1. Visit [https://console.weaviate.io/](https://console.weaviate.io)
2. Click _Sign in with the Weaviate Cloud Services_ or [create an account](https://auth.wcs.api.weaviate.io/auth/realms/SeMI/protocol/openid-connect/registrations?client_id=wcs&response_type=code&redirect_uri=https://console.weaviate.io/console/wcs).
3. After signing in you will be able to create a Weaviate cluster.

## Create a cluster

1. Press the "Create a Weaviate Cluster" button.
1. Configure the cluster:
    1. Set a unique `name` for your cluster – note: The name will become part of the URL used to access this instance.
    1. Select the `Subscription Tier`. Note: The sandbox is free, but it will expire after 30 days.
    1. Choose your Weaviate version (we recommend always using the latest ​version).
    1. Choose if you want to use authentication.
1. Press **Create**.

:::caution
<!-- currently, the WCS only works without modules; we will be releasing out-of-the-box modules in the coming weeks. -->
Not all Weaviate modules may be available in WCS environments. 

The WCS configuration screen will indicate which modules are available.
:::

## Access a cluster

After a while, you cluster will become available on _some-endpoint.weaviate.network_. 

Follow the below guide to test connection to the cluster depending on whether you have enabled authentication or not.

### Test connection without authentication

You can test the connection using curl; or with a [Weaviate client library](../client-libraries/index.md).​

```sh
$ curl https://some-endpoint.weaviate.network/v1/meta
```

The response should look like the following:

```json
{
    "hostname": "http://[::]:8080",
    "modules": {
        "[MODULE-NAME]": {
            // config values
        }        
        ...  // other modules
    },
    "version": "||site.weaviate_version||"
}
```

### Test connection with authentication

With authentication enabled, any anonymous requests will yield a 401 response such as below:

```json
{
  "code": 401,
  "message": "anonymous access not enabled, please provide an auth scheme such as OIDC"
}
```

The easiest way to connect to a WCS instance with authentication is with a [Weaviate client library](../client-libraries/index.md). Please refer to the documentation on WCS authentication for your preferred library in the provided links below: 

- [Python](../client-libraries/python.md#wcs-authentication)
- [JavaScript](../client-libraries/javascript.md#wcs-authentication)
- [Go](../client-libraries/go.md#wcs-authentication)
- [Java](../client-libraries/java.md#authentication)

However, if you want to test the connection with curl, you can do so in one of two ways:

#### Test connection to the OIDC endpoint

As a WCS instance is also an OIDC token issuer, its OIDC information endpoint is publicly available.

```sh
$ curl https://some-endpoint.weaviate.network/v1/.well-known/openid-configuration
```

```json
{
  "clientId": "wcs",
  "href": "https://auth.wcs.api.weaviate.io/auth/realms/SeMI/.well-known/openid-configuration"
}
```

#### Obtain authentication token manually and pass it on with `curl`

You can also obtain an authentication token manually as described [here](../configuration/authentication.md#manually-obtaining-and-passing-tokens), and pass it on.  

```sh
$ curl -H "Authorization: Bearer {Bearer}" https://some-endpoint.weaviate.network/v1/meta
```

The response should look like the following:

```json
{
    "hostname": "http://[::]:8080",
    "modules": {
        "[MODULE-NAME]": {
            // config values
        }        
        ...  // other modules
    },
    "version": "||site.weaviate_version||"
}
```

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
