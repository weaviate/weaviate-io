---
title: Parsing Objects & Resolving References
sidebar_position: 5
image: og/contributor-guide/weaviate-core.jpg
# tags: ['contributor-guide']
---

## Overview

Objects are parsed twice:

* First, closest to disk, immediately after reading-in the byte blob, all
  non-reference props are parsed and their respective Golang types (e.g.
  `*models.GeoCoordinates` or `*models.PhoneNumber`) are returned.

* A second time at the root level of the `db.DB` type, the whole request is
  parsed again (recursively) and cross-refs are resolved as requested by the
  user (through `traverser.SelectProperties`)

![returning objects with references](/img/contributor-guide/weaviate-core/resolving.png "returning objects with references")

## Motivation behind split-parsing

Generally, shards (and also indexes) are self-contained units. It is thus
natural that they return objects which work in isolation and can be interpreted
by the rest of the application (usually in the form of a `search.Result` or
`search.Results`, both defined as `entities`)

However, cross-references aren't predictable. They could point to an item in
another shard or even to an item of another index (because they are a different
user-facing `Class`). When running in multi-node mode (horizontal replication)
the shards could be distributed on any node in the cluster.

Furthermore it is more efficient (see cached resolver) to resolve references
for a list of objects as opposed to a single object. At shard-level we do not
know if a specific object is part of a list and if this list spans across
shards or indexes.

Thus the second parsing - to enrich the desired cross-references - happens at
the outermost layer of the persistence package in the `db.DB` **after**
assembling the index/shards parts.

## Cached Resolver Logic

The cached resolver is a helper struct with a two-step process:

1. **Cacher**: The input object list is (in form of a `search.Results`) is analyzed for
   references. This is a recursive process, as each resolved references might
   be pointing to another object which the user (as specified through the
   `traverser.SelectProperties`) wants to resolve. However Step 1 ("the
   cacher") stores all results in a flat list (technically a map). This saves
   on complexity as only the "finding references" part is recursive, but the
   storage part is simple.

2. **Resolver**: In a second step, the schema is parsed recursively again where each
   reference pointer (in the form of a `*models.SingleRef` containing a
   `Beacon` string) is replaced with the resolved reference content (in the
   form of a `search.LocalRef`). If the result again contains such reference
   pointers to other objects, these are resolved in the same fashion -
   recursively until everything that the user requested is resolved.

## Relevant Code

* [The reference Cacher](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/refcache/cacher.go) and its [unit tests](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/refcache/cacher_test.go)
* [The reference Resolver](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/refcache/resolver.go) and its [unit tests](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/refcache/resolver_test.go)
* Integration tests for [nested refs](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/crud_references_integration_test.go) and [refs of different types](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/crud_references_multiple_types_integration_test.go)

## More Resources

import ContributorGuideMoreResources from '/_includes/more-resources-contributor-guide.md';

<ContributorGuideMoreResources />

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>