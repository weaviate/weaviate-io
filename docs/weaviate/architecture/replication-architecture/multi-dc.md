---
title: Multi-DataCenter
sidebar_position: 5
# layout: layout-documentation
# solution: weaviate
# sub-menu: Architecture
# title: Architecture
# description: Architecture Overview
# tags: ['architecture']
# sidebar_position: 0
# open-graph-type: article
# toc: false
---
import Badges from '/_includes/badges.mdx';

<Badges/>

Multi-Datacenter (Multi-DC) replication enables you to have multiple copies of the data on multiple servers across more than one data center. This form of replication is not yet supported in v1.17 and v1.18. The current version of replication is designed to support Multi-DC later on. If you are interested in this feature, please upvote [this Github issue](https://github.com/semi-technologies/weaviate/issues/2436).

Multi-DC replication is beneficial if you have user groups spread over different geographical locations (e.g. Iceland and Australia). When you place nodes in different local regions of user groups, latency can be decreased. 
Multi-DC replication also comes with the additional benefit that data is redundant on more physical locations, which means that in the rare case of an entire datacenter going down, data can still be served from another location.

For now, you can work under the assumption that all replica nodes are in the same datacenter. The advantage of this is that network requests between nodes are cheap and fast. The downside is that if the entire datacenter fails, there is no redundancy. This will be solved with Multi-DC, [when implemented](https://github.com/semi-technologies/weaviate/issues/2436)! 

![Replication multi-dc](./img/replication-regional-proximity-3.png "Replication multi-dc"){:style="max-width: 75%}


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
