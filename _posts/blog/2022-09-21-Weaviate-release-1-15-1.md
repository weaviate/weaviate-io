---
layout: post
title: Weaviate 1.15.1 patch release
description: "Two weeks after the 1.15 release, we have a patch (v1.15.1) release for you, which brings 15 bug fixes and 2 UX improvements."
published: true
author: Etienne Dilocker 
author-img: /img/people/icon/etienne.jpg
card-img: /img/blog/hero/weaviate-1-15-1-card.png
hero-img: /img/blog/hero/weaviate-1-15-1-card.png
og: /img/blog/hero/weaviate-1-15-1-card.png
date: 2022-09-21
toc: false
---

We usually wouldn’t write a whole blog post about a patch release. But when I chatted with Sebastian (the regular author of our “big” release blog posts series), about the contents of Weaviate `v1.15.1` patch, we quickly realized that this release is too important to end up as a [side note](https://github.com/semi-technologies/weaviate/releases/tag/v1.15.1){:target="_blank"} somewhere.

So, instead, I have the pleasure of introducing you to the latest patch release. Two weeks after the [v1.15.0 release, which introduced backups and more](/blog/2022/09/Weaviate-release-1-15.html){:target="_blank"}, we fixed over **15** bugs.

In summary, this release addresses fixes and improvements around:

* [Indexing](#indexing-bug-fixes) – for vector and object/inverted stores
* [Sorting](#sorting)
* [Aggregation](#aggregation)
* [Stability](#stability)
* [UX](#ux-fixes)

## Indexing bug fixes
This started as a single bug investigation, but quickly this led to a discovery of five others. There was an issue when trying to update objects without vectors, but then you would add a vector later. That could lead to cryptic error messages like **“incompatible vector dimensions: 0 vs. 128”**. We were able to narrow this down to an issue in Weaviate’s LSM store implementation, but we found five other bugs when we fixed the problem. Among them; 

* an issue where a PATCH update could break the inverted index or geo props
* an issue where concurrent updates and deletes on the HNSW index would lead to errors
* an issue where the user would receive a cryptic error message “entry point deleted - will be cleaned up in the next cycle”
* out-of-index panics in the HNSW index

In short, these fixes make indexing more stable, prevent degrading both the vector and inverted indexes over time, and ensure updates are reflected correctly. If you want to dig deeper, here is the [actual changelist](https://github.com/semi-technologies/weaviate/pull/2191){:target="_blank"}.

## Sorting
We added support for sorting in Weaviate `v1.13`, which has been a popular feature. Instead of just sorting by one property, Weaviate lets you sort by any number of properties. The idea is that if the values for the first property are identical, Weaviate uses the second property to determine the order. There was a bug that occurred when you would specify multiple sorting properties in combination with a limit. You could end up in a situation where some results were missing. The new release fixes the sorting implementation and ensures that results are in the correct order and the limit is applied at the very end. This way, no more results can be missing because of sorting. While we were at it, we added plenty of new tests to prevent future regressions.

👏Big thanks to our community user **Patrice Bourgougno** – the creator of the [WPSolr plugin](https://www.wpsolr.com/){:target="_blank"} – for spotting this issue.

## Aggregation
The previous release already contained substantial performance improvements for (filtered) aggregations. This patch release goes one step further. We fixed seven issues where an aggregation would return incorrect results or an error. We have fixed calculation mode and median, cross-reference aggregations, filtered-date aggregations, and issues with multi-shard aggregations. If you want to dig deeper, here is the [pull request that introduces all seven fixes](https://github.com/semi-technologies/weaviate/pull/2192){:target="_blank"}.

## Stability
A rare but critical bug occurred when running specific filtered vector searches while running updates. This bug turned out to be a hidden data race between the filtering logic and a compaction process due to unsafe usage of data. The fix was simple; the affected byte array needed to be copied instead of referenced. We added [a new stress test pipeline](https://github.com/semi-technologies/weaviate-chaos-engineering/pull/11){:target="_blank"} to prove that the bug is fixed and prevent future regressions. 

👏Big thanks to our community user **Juraj Bezdek** – who builds [labelator.io](https://www.labelator.io/){:target="_blank"}, which uses Weaviate under the hood. He initially spotted this issue and helped us narrow it down. It was a great example of collaboration with our community, leading to a much faster fix for this critical issue.

## UX fixes
This patch release also introduces a couple of great UX fixes, which are sure you will appreciate.

We improved what happens when you delete a class that had incoming references from other classes. Previously a long and cryptic error message was displayed, and unless you also deleted the referenced classes, the GraphQL API would not have been functional. [The fix](https://github.com/semi-technologies/weaviate/pull/2189){:target="_blank"} handles this situation much more gracefully. The cryptic error is gone and the GraphQL API stays functional. The invalid reference prop is simply skipped.

When importing null properties into Weaviate before this release,  it would make a difference whether you would leave out a property or explicitly set it to null. That is now fixed, and both situations behave the same. 

Last but not least, there were two situations where Weaviate did not properly propagate error messages to the user in specific cases; in the GCP backup backend and the new Huggingface module. We have fixed them both.

## Conclusion: Now is the best time to upgrade
Even just two weeks after the `v1.15.0` release, this new `v1.15.1` release is full of improvements. There is something for everyone, whether for increased stability, improved behavior, or better UX. The latest release contains over 15 bug fixes compared to the previous one. Now I believe that’s a great reason to update right away.

## Enjoy
We hope you find enjoy the `v1.15.1` patch release – with bug fixes and UX improvements, making this the best Weaviate release yet!🔥

Please share your feedback with us via [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"}, [Twitter](https://twitter.com/SeMI_tech){:target="_blank"}, or [Github](https://github.com/semi-technologies/weaviate){:target="_blank"}.
