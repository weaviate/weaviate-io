---
title: Administration
sidebar_position: 3
image: og/wcs/user_guides.jpg
---

import Link from '@docusaurus/Link';


:::info
Weaviate Embeddings is enabled by default at the organization level and is available to all Weaviate Cloud users. 
:::

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

If you would like to learn about the pricing model, you can visit the Weaviate Embeddings [product page](https://weaviate.io/product/embeddings). 
The pricing works on a per-token basis. This means that you will only be billed for the tokens that are successfully consumed. 
In other words, only requests that result in valid responses from the API are considered.

More info about billing in Weaviate Cloud can be found on [this page](/developers/wcs/platform/billing).

## Additional resources

- [Weaviate Embeddings: Overview](/developers/wcs/embeddings)
- [Weaviate Embeddings: Quickstart](/developers/wcs/embeddings/quickstart)
- [Weaviate Embeddings: Choose a model](/developers/wcs/embeddings/models)
- [Model provider integrations: Weaviate Embeddings](/developers/weaviate/model-providers/weaviate/embeddings)

## Support

import SupportAndTrouble from '/_includes/wcs/support-and-troubleshoot.mdx';

<SupportAndTrouble />
