---
title: Multi-Data center
sidebar_position: 5
image: og/docs/concepts.jpg
# tags: ['architecture']
---


Multi-Data center (Multi-DC) replication enables you to have multiple copies of the data on multiple servers across more than one data center. This form of replication is not yet supported in v1.17 and v1.18. The current version of replication is designed to support Multi-DC later on. If you are interested in this feature, upvote [this GitHub issue](https://github.com/weaviate/weaviate/issues/2436).

Multi-DC replication is beneficial if you have user groups spread over different geographical locations (e.g. Iceland and Australia). When you place nodes in different local regions of user groups, latency can be decreased.
Multi-DC replication also comes with the additional benefit that data is redundant on more physical locations, which means that in the rare case of an entire  data center going down, data can still be served from another location.

For now, you can work under the assumption that all replica nodes are in the same  data center. The advantage of this is that network requests between nodes are cheap and fast. The downside is that if the entire  data center fails, there is no redundancy. This will be solved with Multi-DC, [when implemented](https://github.com/weaviate/weaviate/issues/2436)!

<p align="center"><img src="/img/docs/replication-architecture/replication-regional-proximity-3.png" alt="Replication multi-dc" width="75%"/></p>



## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
