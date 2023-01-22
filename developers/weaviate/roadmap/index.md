---
title: Roadmap
sidebar_position: 0
image: og/docs/roadmap.jpg
# tags: ['roadmap']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

<!-- TODO: Roadmap UNDER CONSTRUCTION -->

## Overview

The following is an overview of features planned for Weaviate. By clicking the link, you can upvote the feature or engage in a discussion about it. You can also join our [Slack channel](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw) to discuss the roadmap in more detail.

:::info
The current version of Weaviate is **v||site.weaviate_version||**. You can check the version you're currently running at the [meta](/developers/weaviate/api/rest/meta.md) endpoint.
:::

:::tip Upvote issues of interest
We use your feedback and votes on Github pages to plan future releases.<br/>
If you find any of the issues of interest. <br/>
Follow it's link and upvote it on Github by clicking the 👍 emoji.
:::

Please feel free to engage with us about the roadmap on [Weaviate's Github](https://github.com/weaviate/weaviate) or on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw).

## Planned for version 1.18

* [Add where filters to BM25(F) and Hybrid Search](https://github.com/weaviate/weaviate/issues/2393)
* [Scroll through every object in a class using an id cursor](https://github.com/weaviate/weaviate/issues/2302)
* [Native Roaring Bitmap support in LSM Store for faster large-scale filters](https://github.com/weaviate/weaviate/issues/2511)
* [Improve BM25 performance in large scale setups](https://github.com/weaviate/weaviate/issues/2480)
* [Replication: Tunable Write Consistency Level](https://github.com/weaviate/weaviate/issues/2407)
* [Replication: Read-Repairs](https://github.com/weaviate/weaviate/issues/2406)
* [Make CORS configurable: Allow arbitrary headers](https://github.com/weaviate/weaviate/issues/2486)

## Planned for version 1.19

* [Reindex API (Inverted Index)](https://github.com/weaviate/weaviate/issues/2359)
* [Feature Request: Stemming on Inverted Index text props](https://github.com/weaviate/weaviate/issues/2439)
* [Dynamic Scaling: Move shards around nodes, drain node, etc.](https://github.com/weaviate/weaviate/issues/2228)
* [Replication: Async repairs](https://github.com/weaviate/weaviate/issues/2405)
* [Replication: Improve dynamic scaling of replication factor](https://github.com/weaviate/weaviate/issues/2408)

## Backlog

* [[Feature Request]: adding the Class `alias` functionality](https://github.com/weaviate/weaviate/issues/2085)
* [FR: Support nested objects / embedding objects](https://github.com/weaviate/weaviate/issues/2424)
* [Feature request: Authentication scheme for systems long-term credentials](https://github.com/weaviate/weaviate/issues/2341)
* [Feature Request: Multi-DC (Active/Active) replication](https://github.com/weaviate/weaviate/issues/2436)
* [Support for batch patch (partial update)](https://github.com/weaviate/weaviate/issues/2124)
* [Add an `In` Filter Operator](https://github.com/weaviate/weaviate/issues/2387)
* [FR: Support arbitrary amount of vector indexes on object](https://github.com/weaviate/weaviate/issues/2465)
* [Support for batch import of cross referenced objects](https://github.com/weaviate/weaviate/issues/1951)
* [Support OIDC groups in AdminList](https://github.com/weaviate/weaviate/issues/2125)
* [[text2vec-openai] support arbitrary model names](https://github.com/weaviate/weaviate/issues/2452)
* [Return vectorized query with results](https://github.com/weaviate/weaviate/issues/2496)
* [(feature request) Multiple filters on cross references should match on a single object](https://github.com/weaviate/weaviate/issues/2477)
* [Proposal: Cross-Encoders as reranking](https://github.com/weaviate/weaviate/issues/2111)
* [Proposal: autoCut in Weaviate Vector Search](https://github.com/weaviate/weaviate/issues/2318)
* [Filtering returned cross references](https://github.com/weaviate/weaviate/issues/2322)
* [Add support for wildcards for include/exclude backups](https://github.com/weaviate/weaviate/issues/2481)
* [Reindex API (Vector Index)](https://github.com/weaviate/weaviate/issues/2485)
* [(feature request) Add support for PDFs and other file formats](https://github.com/weaviate/weaviate/issues/2509)
* [(feature request) Add multi2vec-huggingface module to support CLIP models with inference API](https://github.com/weaviate/weaviate/issues/2512)
* [Feature Request: BM25/Hybrid: Support ANDing query terms (currently always ORed).](https://github.com/weaviate/weaviate/issues/2520)
* [Ability to reindex a property (column) or class (table) with a simple command](https://github.com/weaviate/weaviate/issues/2064)
* [Improve Read-only message by adding reason](https://github.com/weaviate/weaviate/issues/2227)
* [Add integration tests for OpenAI](https://github.com/weaviate/weaviate/pull/2316)
* [Unexpected tokenisation for string datatype](https://github.com/weaviate/weaviate/issues/2338)
* [Replication and sharding configuration at system level](https://github.com/weaviate/weaviate/issues/2386)
* [QnA module: Provide vector to `ask` filter clause so QnA can be used without a vectorizer](https://github.com/weaviate/weaviate/issues/2445)
* [OpenAI add text-davinci-003 model](https://github.com/weaviate/weaviate/issues/2488)
* [FR: Have a graphql query that works the same way as the GET /v1/objects endpoint](https://github.com/weaviate/weaviate/issues/2498)
* [Feature Request: Partial Schema Config Update using PATCH](https://github.com/weaviate/weaviate/issues/2514)

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
