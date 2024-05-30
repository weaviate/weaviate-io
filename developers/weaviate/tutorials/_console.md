---
title: Weaviate console - an introduction
sidebar_position: 90
image: og/docs/quickstart-tutorial.jpg
# tags: ['Weaviate console']
---


## Overview

Here you can learn how to use the Weaviate console.

The Weaviate console allows you to connect to Weaviate instances that are running on the [Weaviate Cloud (WCD)](https://console.weaviate.cloud/) (our SaaS solution), on your own cluster, on your local machine, or all the public demo datasets. Note that the console never collects any data from your Weaviate instance; you can safely connect every instance, also over VPN.

:::tip
The console is available on: [console.weaviate.cloud](https://console.weaviate.cloud).
:::

## Login page

When opening the [Weaviate Console](https://console.weaviate.cloud), you'll see two options:

1. ["Sign in with the Weaviate Cloud"](#weaviate-cloud)
2. ["Self-hosted Weaviate"](#connect-to-a-self-hosted-weaviate)

## Weaviate Cloud

Use Weaviate Cloud to create serverless instances on our infrastructure. Self-hosted and serverless instances offer the same features. The main difference is that you don't have to manage the server or infrastructure for a serverless instance.

import SandBoxExpiry from '/_includes/sandbox.expiry.mdx';

<SandBoxExpiry/>

## Connect to a self-hosted Weaviate

You can connect to any Weaviate instance as long as your computer has access to it (yes, this also includes over a VPN). The GraphiQL editor runs locally, and we don't forward any result or query to our servers.

When you're connected, you can use the [GraphiQL](#graphiql) interface to interact with your Weaviate instance.

## GraphiQL

[GraphiQL](https://github.com/graphql/graphiql) is a graphical interface that allows you to write GraphQL queries interactively, with autocompletion and inline documentation. Curious? Try out the console [right now](https://link.weaviate.io/3ThS9hG) with the news publication dataset.

## Try out the console

1. Go to: [this link](https://link.weaviate.io/3ThS9hG)
2. Start querying :)

## Try out the console with your own instance

1. Go to: [https://console.weaviate.cloud](https://console.weaviate.cloud)
2. In the Self-hosted Weaviate section, provide the endpoint of you instance. If you run Weaviate locally this will be `http://localhost:8080`.
3. Click "connect"

:::note
The console might ask to downgrade to HTTP. This is done to avoid [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) errors.
:::

## Recap

* You can use the Weaviate Console to connect to any Weaviate instance.
* You can use the Weaviate Console to connect to the Weaviate Cloud to create serverless Weaviate instances.
* Because Weaviate uses GraphQL, you can easily query it with the console's GraphiQL integration.

## What next?

- [References: Installation](../installation/index.md)
- [References: Configuration](../configuration/index.md)
- [References: API](../api/index.md)
- [Concepts](../concepts/index.md)
- [Roadmap](../roadmap/index.md)



## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
