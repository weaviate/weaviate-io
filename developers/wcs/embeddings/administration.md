---
title: Administration
sidebar_position: 3
image: og/wcs/user_guides.jpg
---

import Link from '@docusaurus/Link';


:::info
Weaviate Embeddings is enabled by default at the organization level and is available to all Weaviate Cloud users. 
:::

## Authentication

In order to use Weaviate Embeddings you only need a [connection to your Weaviate Cloud cluster](/developers/wcs/manage-clusters/connect). 
No additional authentication is specifically needed, and the Weaviate Embeddings service is enabled by default for all clusters. You can use the service no matter if you connect with a [client library](/developers/weaviate/client-libraries) or, for example, via [OIDC](/developers/weaviate/configuration/authentication#oidc).

## Disable Weaviate Embeddings

Weaviate Embeddings is **enabled by default** at the organization level. To disable the Weaviate Embeddings service for your whole organization, follow these steps:

import DisableWeaviateEmbeddings from '/developers/wcs/img/weaviate-cloud-disable-embeddings.png';

<div class="row">
  <div class="col col--4">
    <ol>
      <li>
        Open the <Link to="https://console.weaviate.cloud/">Weaviate Cloud console</Link>.
      </li>
      <li>
       Click on <code>Weaviate Embeddings</code> in the left sidebar (<span class="callout">1</span>). 
      </li>
      <li>
       Use the toggle button <code>Enabled</code> to either disable or enable the service. (<span class="callout">2</span>). 
      </li>
    </ol>
  </div>
  <div class="col col--8">
    <div class="card">
      <div class="card__image">
        <img src={DisableWeaviateEmbeddings} alt="Disable Weaviate Embeddings globally" />
      </div>
      <div class="card__body">Disable Weaviate Embeddings globally.</div>
    </div>
  </div>
</div>

<!-- TODO[g-despot] Update screenshot if necessary -->

## Pricing and billing

<!-- TODO[g-despot] Update link -->
If you would like to learn about the pricing model, you can visit the Weaviate Embeddings [pricing page](/). 
The pricing works on a per-token basis. This means that you will only be billed for the tokens that are successfully consumed. 
In other words, only requests that result in valid responses from the API are considered.

More info about billing in Weaviate Cloud can be found on [this page](/developers/wcs/platform/billing).

## Rate limits

<!-- TODO[g-despot] Don't hardcode these values here if possible -->
Weaviate Embeddings only imposes rate limits on requests for Sandbox clusters. 
The rate limit for Sandbox clusters is `2000` requests per cluster. 

:::info
If you use a [batch import](/developers/weaviate/manage-data/import) to vectorize your data, the maximum size is `200` objects per batch. 
This means that you can generate up to `400 000` embeddings (`2000 (requests) * 200 (objects per request)`) within your free Sandbox cluster.
:::

<!-- TODO[g-despot] Refine this section -->

## Data privacy

Weaviate Embeddings is a stateless service that does not store any data.

The data provided to Weaviate Embeddings is used solely for the purpose of generating embeddings.

We do not store or use your data for any other purpose, including training or model improvement.

### Service and data location

Weaviate Embeddings makes use of infrastructure located in the United States. Note that by using Weaviate Embeddings, you are agreeing to have your data transferred to the United States for processing.

We may expand the service to other regions in the future.

## Additional resources

- [Weaviate Embeddings: Overview](/developers/wcs/embeddings)
- [Weaviate Embeddings: Quickstart](/developers/wcs/embeddings/quickstart)
- [Weaviate Embeddings: Choose a model](/developers/wcs/embeddings/models)
- [Model provider integrations: Weaviate Embeddings](/developers/weaviate/model-providers/weaviate/embeddings)

## Support

import SupportAndTrouble from '/_includes/wcs/support-and-troubleshoot.mdx';

<SupportAndTrouble />
