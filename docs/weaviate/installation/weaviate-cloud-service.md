---
title: Weaviate Cloud Service
sidebar_position: 1
# layout: layout-documentation
# solution: weaviate
# sub-menu: Installation
# description: DESC
# tags: ['installation', 'Weaviate Cloud Service']
# open-graph-type: article
# toc: true
---

The Weaviate Cloud Service can be accessed via the [console](https://console.semi.technology/) and is the SaaS version of Weaviate.

* You can learn more about the console in [this guide](../core-knowledge/console.html).
* You can create free-tier sandboxes and [sign up](https://console.semi.technology) for the private beta of our production SaaS.

# How to

​Using the Weaviate Cloud Service (WCS) is straightforward. You simply create a cluster and the WCS manages it for you.

## Sign in

1. Visit [https://console.semi.technology/](https://console.semi.technology/)
2. Click _Sign in with the Weaviate Cloud Service_ or [create an account](https://auth.wcs.api.semi.technology/auth/realms/SeMI/protocol/openid-connect/registrations?client_id=wcs&response_type=code&redirect_uri=https://console.semi.technology/console/wcs).
3. After signing in you will be able to create a Weaviate cluster.

## Create a cluster

1. Click on _Create a Weaviate Cluster_
2. Set an optional name for your cluster.
3. Choose your Weaviate version (we recommend always using the latest ​version)
4. Create a stand-alone Weaviate
5. Choose if you want to use authentication.
    1. [Authentication for Python](../client-libraries/python.html#authentication)
    2. [Authentication for Javascript](../client-libraries/javascript.html#authentication)
    3. [Authentication for Java](../client-libraries/java.html#authentication)
    4. [Authentication for Go](../client-libraries/go.html#authentication)
6. Create your sandbox

> 💡 currently, the WCS only works without modules; we will be releasing out-of-the-box modules in the coming weeks.

## Access a cluster

Your cluster will become available on _{name}.semi.network_.

### Test connection without authentication

You can test the connection using curl; you can also use the client libraries directly.​

```sh
$ curl https://{name}.semi.network/v1/meta
```

or with jq for readability:

```sh
$ curl https://{name}.semi.network/v1/meta | jq .
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
$ curl -H "Authorization: Bearer {Bearer}" https://{name}.semi.network/v1/meta
```

or with jq for readability:

```sh
$ curl -H "Authorization: Bearer {Bearer}" https://{name}.semi.network/v1/meta | jq .
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

# More Resources

{% include docs-support-links.html %}
