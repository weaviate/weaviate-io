---
title: Weaviate Cloud Service
sidebar_position: 1
image: og/docs/installation.jpg
# tags: ['installation', 'Weaviate Cloud Service']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

​Using the Weaviate Cloud Service (WCS) may be the easiest way to run Weaviate. You simply create a cluster and the WCS manages it for you.

The Weaviate Cloud Service can be accessed via the [console](https://console.weaviate.io) and is the SaaS version of Weaviate.

* You can learn more about the console in [this guide](../quickstart/console.md).
* You can create free-tier sandboxes and [sign up](https://console.weaviate.io) for the private beta of our production SaaS.

## Sign in

1. Visit [https://console.weaviate.io/](https://console.weaviate.io)
2. Click _Sign in with the Weaviate Cloud Service_ or [create an account](https://auth.wcs.api.weaviate.io/auth/realms/SeMI/protocol/openid-connect/registrations?client_id=wcs&response_type=code&redirect_uri=https://console.weaviate.io/console/wcs).
3. After signing in you will be able to create a Weaviate cluster.

## Create a cluster

1. Click on _Create a Weaviate Cluster_
2. Set an optional name for your cluster.
3. Choose your Weaviate version (we recommend always using the latest ​version)
4. Create a stand-alone Weaviate
5. Choose if you want to use authentication.
    1. [Authentication for Python](../client-libraries/python.md#authentication)
    2. [Authentication for Javascript](../client-libraries/javascript.md#authentication)
    3. [Authentication for Java](../client-libraries/java.md#authentication)
    4. [Authentication for Go](../client-libraries/go.md#authentication)
6. Create your sandbox

:::caution
<!-- currently, the WCS only works without modules; we will be releasing out-of-the-box modules in the coming weeks. -->
Not all Weaviate modules may be available in WCS environments.
:::

## Access a cluster

Your cluster will become available on _{name}.weaviate.network_.

### Test connection without authentication

You can test the connection using curl; you can also use the client libraries directly.​

```sh
$ curl https://{name}.weaviate.network/v1/meta
```

or with jq for readability:

```sh
$ curl https://{name}.weaviate.network/v1/meta | jq .
```

The result should show something like:

```js
{
    "hostname": "http://[::]:4000",
    "modules": {
        "ner-transformers": {
            // config values
        },
        "qna-transformers": {
            // config values
        },
        "text-spellcheck": {
            // config values
        },
        "text2vec-transformers": {
            // config values
        }
    },
    "version": "1.14.1"
}
```

### Test connection with authentication

You can test the connection using curl; you can also use the client libraries directly.​ This is especially handy because they have authentication built in. ​

```sh
$ curl -H "Authorization: Bearer {Bearer}" https://{name}.weaviate.network/v1/meta
```

or with jq for readability:

```sh
$ curl -H "Authorization: Bearer {Bearer}" https://{name}.weaviate.network/v1/meta | jq .
```

The result should show something like:

```js
{
    "hostname": "http://[::]:4000",
    "modules": {
        "ner-transformers": {
            // config values
        },
        "qna-transformers": {
            // config values
        },
        "text-spellcheck": {
            // config values
        },
        "text2vec-transformers": {
            // config values
        }
    },
    "version": "1.14.1"
}
```

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
