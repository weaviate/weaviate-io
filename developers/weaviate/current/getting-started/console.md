---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Console
description: Getting started with Weaviate Console
tags: ['Weaviate console']
menu-order: 3
open-graph-type: article
toc: true
---

The Weaviate Console allows you to connect to Weaviate instances that are running on the Weaviate Cloud Service (our SaaS solution), on your own cluster, on your local machine, or all the public demo datasets.

💻 The console is available on: [console.semi.technology](https://console.semi.technology).

## Login page

When opening the [Weaviate Console](https://console.semi.technology), you'll see two options:

1. ["Sign in with the Weaviate Cloud Service"](#the-weaviate-cloud-service)
2. ["Self-hosted Weaviate"](#connect-to-a-self-hosted-weaviate)

## The Weaviate Cloud Service

The Weaviate Cloud Service allows you to create Weaviate instances as SaaS instances on our infrastructure. There is no difference between locally run Weaviate instances or Weaviate SaaS instances other than that the latter ones are managed by us.

<div class="alert alert-secondary" markdown="1">
💡 Sandboxes are free Weaviate instances! You can create them for small test use cases if you don't want to run Weaviate locally.
</div>

## Connect to a self-hosted Weaviate

You can connect to any Weaviate instance as long as your computer has access to it (yes, this also includes over a VPN).

When you're connected you can use the [GraphiQL](#graphiql) interface to interact with your Weaviate instance.

<div class="alert alert-secondary" markdown="1">
💡 You can safely connect to any Weaviate instance. The GraphiQL editor runs locally, and we don't forward any result or query to our servers.
</div>

## GraphiQL

GraphiQL is a graphical interface that allows you to manually write GraphQL queries. Within Weaviate we use it a lot, the auto-fill functionality allows you to easily navigate through your own dataset.

## Recapitulation

* You can use the Weaviate Console to connect to any Weaviate instance.
* You can use the Weaviate Console to connect to the Weaviate Cloud Service to create managed Weaviate instances.
* Because Weaviate uses GraphQL, you can easily query it with the console's GraphiQL integration.

## What would you like to learn next?

* [Let me query Weaviate!](./query.html)
* [Learn how to add a schema](./schema.html)
* [Learn how to import data](./import.html)

## Legend

* [GraphiQL](https://github.com/graphql/graphiql)

# More Resources

{% include docs-support-links.html %}
