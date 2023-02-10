---
title: Weaviate console - an introduction
sidebar_position: 90
image: og/docs/quickstart-tutorial.jpg
# tags: ['Weaviate console']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

Here you can learn how to use the Weaviate console.

The Weaviate console allows you to connect to Weaviate instances that are running on the Weaviate Cloud Services (our SaaS solution), on your own cluster, on your local machine, or all the public demo datasets. Note that the console never collects any data from your Weaviate instance; you can safely connect every instance, also over VPN.

:::tip
The console is available on: [console.weaviate.io](https://console.weaviate.io).
:::

## Login page

When opening the [Weaviate Console](https://console.weaviate.io), you'll see two options:

1. ["Sign in with the Weaviate Cloud Services"](#weaviate-cloud-services)
2. ["Self-hosted Weaviate"](#connect-to-a-self-hosted-weaviate)

## Weaviate Cloud Services

Weaviate Cloud Services allow you to create Weaviate instances as SaaS instances on our infrastructure. There is no difference between locally run Weaviate instances or Weaviate SaaS instances other than that the latter ones are managed by us.

:::note
Sandboxes are free Weaviate instances! You can create them for small test use cases if you don't want to run Weaviate locally.
:::

## Connect to a self-hosted Weaviate

You can connect to any Weaviate instance as long as your computer has access to it (yes, this also includes over a VPN). The GraphiQL editor runs locally, and we don't forward any result or query to our servers.

When you're connected, you can use the [GraphiQL](#graphiql) interface to interact with your Weaviate instance.

## GraphiQL

GraphiQL is a graphical interface that allows you to manually write GraphQL queries. Within Weaviate we use it a lot, the auto-fill functionality allows you to easily navigate through your own dataset. Curious? Try out the console [right now](https://link.semi.technology/3J8aB73) with the Wikipedia dataset.

## Try out the console

1. Go to: [https://link.semi.technology/3CUuDgQ](https://link.semi.technology/3CUuDgQ)
2. Start querying :)

## Try out the console with your own instance

1. Go to: [https://console.weaviate.io](https://console.weaviate.io)
2. In the Self-hosted Weaviate section, provide the endpoint of you instance. If you run Weaviate locally this will be `http://localhost:8080`.
3. Click "connect"

:::note
The console might ask to downgrade to HTTP. This is done to avoid [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) errors.
:::

## Recap

* You can use the Weaviate Console to connect to any Weaviate instance.
* You can use the Weaviate Console to connect to the Weaviate Cloud Services to create managed Weaviate instances.
* Because Weaviate uses GraphQL, you can easily query it with the console's GraphiQL integration.

## What next?

- [References: Installation](../installation/index.md)
- [References: Configuration](../configuration/index.md)
- [References: API](../api/index.md)
- [Concepts](../concepts/index.md)
- [Roadmap](../roadmap/index.md)

## Legend

* [GraphiQL](https://github.com/graphql/graphiql)

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
