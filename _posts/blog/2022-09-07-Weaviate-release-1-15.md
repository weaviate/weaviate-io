---
layout: post
title: Weaviate 1.15 release
description: "Learn, what is new in Weaviate 1.15. Cloud-native backups, memory optimizations, faster filtered aggregations and ordered imports, new distance metrics and Weaviate modules."
published: true
author: Sebastian Witalec
author-img: /img/people/icon/sebastian.jpg
card-img: /img/blog/hero/weaviate-1-15-card.png
# hero-img: /img/blog/hero/weaviate-1-15.png
date: 2022-09-06
toc: false
---

We are happy to announce the release of Weaviate 1.15, which is packed with great features, significant performance improvements, new distance metrics and new modules, and many more smaller improvements and fixes.

## The brief

If you like your content brief and to the point, here is the TL;DR of this release:
0. [☁️Cloud-native backups](#cloud-native-backups) – allows you to configure your environment to create backups – of selected classes or the whole database – straight into AWS S3, GCS or local filesystem
0. [Improved memory management](#improved-memory-management) – with the introduction of GOMEMLIMIT we were able to gain more control over the garbage collector, which significantly reduces the chances of OOM kills for your Weaviate setups
0. [Faster imports for ordered data](#faster-imports-for-ordered-data) – by extending Binary Search Tree structure with with a self-balancing Red-black tree, we were able to speed up imports from O(n) to O(log n)
0. [More efficient filtered aggregations](#more-efficient-filtered-aggregations) – thanks to optimization to a library reading binary data, filtered aggregations are up to 20x faster and require a lot less memory
<!-- (TODO: add the claim by Juraj) -->
0. [Two new distance metrics](#new-distance-metrics) – with the addition Hamming and Manhattan to the ever growing list of available distance metrics, you can choose the metric (or a combination of) to best suit your data and use cases
0. [Two new Weaviate modules](#new-weavaite-modules) – with the Summarization module you can summarize any text on the fly, while with the HuggingFace module you can use compatible transformers from the HuggingFace
0. Smaller improvements and bug fixes – it goes without saying that with every Weaviate release we strive to make Weaviate more stable – through bug fixes – and more efficient – through many optimizations.

Read below to learn more about each of these points in more detail.

### Community effort
😀We are extremely happy about this release, as it includes two big community contributions from Aakash Thatte and Dasith Edirisinghe. Over the last few weeks they collaborated with our engineers to make their contributions.

🚀Aakash implemented the two new distance metrics, while Dasith contributed by implementing the two new Weaviate modules.

👕I guess we will be sending some Weaviate t-shirts to Aakash and Dasith soon.

🤗We hope to see many more contributions – big and small – in the coming months and years. **#CommunityRocks**

## Cloud-native backups

![Cloud-native backups](/img/blog/weaviate-1.15/cloud-native-backup.png)

Ability to create and restore database backups in Weaviate, was one of the most requested features from the Weaviate community and customers.

And of course, database backups are not just about disaster recovery. Sometimes we need to migrate our data to a different environment – maybe because our database grew and now we need more resources, or maybe because we need to set up a new developer environment – and other times we just need to have regular snapshots (daily, weekly, etc) – just so that we have a way to go back if needed.

We listened to your feedback, suggestions and use cases! We made it our mission for the `1.15` release to design and implement an **elegant solution** with a **great Developer Experience (DX)**, which you will love 😍 to use for the years to come.

### Announcement
Introducing **Weaviate Cloud-native backups**. 🎉

It allows you to make full database backups (or selected classes) straight to **S3**, **GCS** or the **local filesystem**, with a single API call 🤩; and restore the data to a Weaviate instance of your choice with another API call.

What is really great about this implementation is that you can create a backup without downtime on a running instance. The database stays fully operational (including receiving writes) while the backup is transferred to the remote storage.

The database backups include data objects, plus their vectors and indexes. This way restoring a backup is a straight copy of all the required elements without the need to re-create vectors or rebuild the indexes. (Read, this is going to be fast)

### Backup modules
Cloud-native backups in Weaviate are handled with the addition of the new **backup modules**:

* `backup-s3` – for S3
* `backup-gcs` – for GCS
* `backup-fs` – for local filesystem

Without getting into too many details (see the [docs for more precise instructions](/developers/weaviate/current/configuration/backups.html){:target="_blank"}), each module requires a different set of settings.

For S3 and GCS, you need your cloud bucket name, authentication details and some extra details like a project name or the cloud region.

> For S3 authentication you can use access keys or IAM with role ARN’s
>
> For GCS you can use a Google Application Credentials json file

Alternatively, you can configure backups with the **local filesystem**. All you need here is to provide the path to the backup folder.

> Note, you can have multiple storage configurations – one for each S3, GCS and local filesystem.

### Creating backups - API
Once, you a backup module up and running. You can create backups with a single `POST` command:

```js
POST /v1/backups/{storage}/
{
  "id": "backup_id"
}
```

The `storage` values are `s3`, `gcs`, and `filesystem`.

For example, you can create a backup called **first_backup** and push it to **GCS**, like this:

```js
POST /v1/backups/gcs/
{
  "id": "first_backup"
}
```

Then, you can check the backup status by calling:

```js
GET /v1/backups/gcs/first_backup
```

### Restore
To restore a backup, you need to call:

```js
POST /v1/backups/{store}/{backup_id}/restore
```

So, using our previous example, we can restore the **first_backup**, like this:

```js
POST /v1/backups/gcs/first_backup/restore
```

You can also, check the status of an ongoing restoration by calling:

```js
GET /v1/backups/gcs/first_backup/restore
```

### Cross-cloud
Here is one interesting thing that you might not have noticed. You can use this setup to run Weaviate with one cloud provider, but then store and restore backups to/from another cloud provider. For example, you can run Weaviate on AWS, and use GCS for your backup needs. How cool is that?

### Class backups
You can also create backups for specific classes or select which classes you want to restore. This is done by adding one of the following properties to the `POST payload`:
* `include` – an array class names we want to backup or restore
* `exclude` – an array class names we don’t want to backup or restore

For example, you can create a backup that will include Cats, Dogs and Meerkats.

```js
POST /v1/backups/gcs
{
  "id": "first_backup",
  "include": ["Cats", "Dogs", "Meerkats"]
}
```

Then restore excluding Cats:

```js
POST /v1/backups/gcs/first_backup/restore
{
  "exclude": ["Cats"]
}
```

### Other use cases
This might now be immediately obvious, but you can use the above workflow to migrate your data to other environments. So, if one day you find yourself with an environment that is not set up for what you need. Then create a backup, and restore it in the new environment. 😉 

### Follow up
Are you ready to set up backups for your environment?
Head to the [documentation](/developers/weaviate/current/configuration/backups.html){:target="_blank"} for a more in-depth overview and instructions.

## Improved memory management

![GOMEMLIMIT](/img/blog/weaviate-1.15/gomemlimit.jpg)

Weaviate is built from the ground up in Go, which allows for building very performant and memory-safe applications. Go is a garbage-collected language.

> *A quick refresher:*<br/>
> In a garbage-collected language, such as Go, C#, or Java, the programmer doesn’t have to deallocate objects manually after using them. A GC cycle runs periodically to collect memory no longer needed and ensure it can be assigned again.

### The problem

Working with a garbage collector is very safe, and the resource cost of running GC cycles is a fairly small tradeoff. We just need to make sure that we have the right balance of frequency of GC cycles and the buffer of available memory (on top of what we have estimated for our application setup). 

Now, increasing each of those come with a price:
* Increasing the frequency of GC cycles will use more CPU, which we could make a better use elsewhere
* Increasing RAM costs money – and for a memory demanding setups that can be a big 💰sum

And if we get that balance wrong, we might end up with an Out Of Memory crash.

### The solution

At the beginning of August, the Go team released `Go 1.19`, which introduced `GOMEMLIMIT`. `GOMEMLIMIT` turned out to be a **game changer for high-memory applications**. 

With GOMEMLIMIT we can provide a soft memory cap, which tells Go how much memory we expect the application to need. This makes the GC more relaxed when RAM is plentiful, and more aggressive when memory is scarce.

To learn more about memory management, GC and GOMEMLIMIT, check out [this article](/blog/2022/08/GOMEMLIMIT-a-Game-Changer-for-High-Memory-Applications.html){:target="_blank"}, which explains it all in more depth.

### Announcement

🎉We are happy to share that all Weaviate `v1.15` binaries and distributions have been **compiled with Go 1.19** which comes with **GOMEMLIMIT**.

Now, you can set your **soft memory cap** by setting the `GOMEMLIMIT` environment variable like this:

```
GOMEMLIMIT=120GiB
```

For more information, see the [Docker Compose environment variables](/developers/weaviate/current/installation/docker-compose.html#environment-variables) in the docs.

## Faster imports for ordered data

![Faster imports for ordered data](/img/blog/weaviate-1.15/ordered-imports.png)

Weaviate `v1.5` introduced an **LSM store** (Log-Structured Merge Trees) to increase write throughput. The high-level idea is that writes are batched up in logs, sorted into a **Binary Search Tree** (BST) structure, and then these batched up trees are merged into the tree on disk.

### The Problem

When importing objects that have an inherent order such as timestamps or or row numbers that increase monotonously the BST becomes unbalanced: New objects are always inserted at the "greater than" pointer / right node of the BST. This collapses the binary tree into a linked list with `O(n)` insertion, rather than the `O(log n)` promise of the BST.

### The Fix

To address that in Weaviate `v1.15`, we've extended the BST with a **self-balancing Red-black tree**.

Through rotations of the tree at insert, [Red-black trees](https://www.programiz.com/dsa/red-black-tree){:target="_blank"} ensure that no path from root to leaf is more than twice as long as any other path. This achieves O(log n) insert times for ordered inserts.

![Red-black tree demonstration](/img/blog/weaviate-1.15/red-black-tree.gif)
*A visual representation of how the RBT works.*

You can try it yourself [here](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html){:target="_blank"}. Add any ordered input, for example 1, 2, 3, 4 and see how the tree stays balanced.

### Results
To paint a better picture of what you could expect, we’ve run a few local tests.

First, we saw that the RB-Tree is up to 4 faster than the binary tree (**2292ns** vs **9147ns** per operation) when adding objects with sequential keys (just the tree, without anything else).


| name | time* | avg allocated bytes* | # of allocations* |
|---|---|---|---|
| RB-Tree  | 2292 ns/op | 48 B/op | 2 allocs/op |
| Binary-Tree  | 9147 ns/op | 1160 B/op | 10 allocs/op |

**all metrics are per operation*

Then with a full import test, we saw a **3x perfomance improvement** 🚀.

* Weaviate `1.14.1` – import time **~38 minutes**
* Weaviate `1.15.0` – import time **~13 minutes** 🔥

## More efficient filtered aggregations

![More efficient filtered aggregations](/img/blog/weaviate-1.15/filtered-aggregation.png)

Recently we’ve been working with a customer who was running multiple filtered aggregations on a large dataset. Unfortunately, the queries were slow and in some cases they resulted in Out Of Memory kills. This was not good enough for what we expect of Weaviate. 

### Investigation

To investigate the issue, we’ve set up a database with 1M objects, together with a profiler to watch memory consumption.

We used that setup to run 10 parallel filtered aggregations. Upon reviewing the memory consumption we noted that some of the filtered aggregations were taking up to **200GB** of RAM (note, this was not the total allocated memory on the heap, as a big part of it was waiting to be collected by GC).

### The issue
Fast forward, we identified two key issues. First, the Go library that we used for reading binary data (`binary.read`) isn’t optimized for the way we use it in Weaviate, as it makes many temporary memory allocations. Second, for every object in the aggregation, we would allocate new memory on the heap, process the read, and release the memory.

<!-- TODO: add a picture with cakes -->
This is a bit like, if we want to eat a cake, we need to put it on a plate, eat the cake and then put the plate in the sink to wash. Now, if we want to eat a million cakes, we will either be very busy washing dishes, or we might end up with a million plates in the sink (or even run out of plates).<br/>
I am sure you would rather spend more time eating cakes than dealing with plates.

This is bad for three reasons:
* Grabbing a new plate for each cake and then washing it takes time – **higher CPU use** with many GC cycles
* We would pile up a lot of plates between each wash - **high memory consumption** between each GC cycle
* We might run out of clean plates – **OOM crash** if we **run out of RAM**

### The solution
To solve the problem, we implemented two solutions:
* We created our own library for reading binary data that is optimized for the Weaviate-specific needs. It creates fewer temporary memory allocations.
* We made sure to reuse the same memory where possible.

In the world of cakes, we optimised our eating technique to consume more cakes, and we only need one plate to eat all the cakes.

On top of that, we’ve introduced other smaller optimizations. If you are curious about that, drop us a message on Slack, and we can chat some more.

### Results

As a result the filtered aggregations are up to **20x faster** and require a lot less memory.
Using our original test with 10 parallel aggregations, the memory consumption went down from 200GB to 30GB.

<!-- TODO: add a quote from Juraj
But don’t take our word for it, this was from a test run by one of our community members…
 -->

## New distance metrics

![Hamming and Manhattan distance metrics](/img/blog/weaviate-1.15/distance-metrics.png)

Thanks to the community contributions from [Aakash Thatte](https://github.com/sky-2002){:target="_blank"} – Weaviate `v1.15` adds two new distance metrics - **Hamming** distance and **Manhattan** distance. In total, you can now choose between five various distance metrics to support your datasets.

Check out the [metrics documentation page](/developers/weaviate/current/vector-index-plugins/distances.html#distance-implementations-and-optimizations){:target="_blank"}, for the full overview of all the available metrics in Weaviate.

### Hamming distance
The Hamming distance is a metric for comparing two numerical vectors. <br/>
It compares the vector values dimension by dimension, and returns a total count of differing values. The fewer differences the closer the vectors.

### Manhattan distance
The Manhattan distance (also known as L1 norm and Taxicab Distance) – calculates the distance between a pair of vectors, as if simulating a route for a Manhattan taxi driver going from point A (vector A) to point B (vector B) – who is navigating the **streets of Manhattan** with the grid layout and one-way streets.

![Manhattan taxi driver](/img/blog/weaviate-1.15/manhatten-distance-cars.png)

For each difference in the compared vectors, the taxi driver needs to make a turn, thus making the ride this much longer. The distance is calculated by summing the differences of each point of the vectors. The fastest route is one with fewer twists and turns.

<!-- TODO: add a link to Erika's blog -->
<!-- ### Dive deeper
For a deeper dive into the Hamming and Manhattan distances, check out this [amazing blog post](). There you will learn how each of the distances work in more detail, when to use each and how they compare to other metrics. -->

## New Weavaite modules

<!-- TODO: add an image for Weaviate modules -->
![New Weavaite modules](/img/blog/weaviate-1.15/weaviate-modules.png)

The list of the new goodies included with Weaviate `v1.15` goes on. Courtesy of a fantastic community contribution from [Dasith Edirisinghe](https://github.com/DasithEdirisinghe){:target="_blank"}, we have two new Weaviate modules for you: Summarization and Hugging Face modules.

### Summarization Module
The Summarization module allows you to summarize text data at query time.

The module adds a `summary` filter under the `_additional` field, which lets you list the properties that should be summarized.

For example, if this blog post was broken down into **chapters** in Weaviate, with **title** and **content** properties. 

We could run a query, to summarize the *"New distance metrics"* chapter, like this:

```graphql
{
  Get {
    Chapter(
      where: {
        operator: Equal
        path: "title"
        valueString: "New distance metrics"
      }
    ) {
      title
      _additional{
        summary(
          properties: ["content"],
        ) {
          property
          result
        }
      }
    }
  }
}
```

We would get a result with the content summary, like this:

```graphql
{
  "data": {
    "Get": {
      "Chapters": [
        {
          "_additional": {
            "summary": [
              {
                "property": "content",
                "result": "Weaviate 1.15 adds two new distance metrics - Hamming
                 distance and Manhattan distance. In total, you can now choose
                 between five various distance metrics to support your datasets. 
                 Check out the metrics documentation page, for the full overview 
                 of all the available metrics in Weaviate."
              }
            ]
          },
          "title": "New distance metrics"
        }
      ]
    }
  },
  "errors": null
}
```

Head to the [Summarization Module docs page](/developers/weaviate/current/reader-generator-modules/sum-transformers.html){:target="_blank"}, to learn more.

### Hugging Face Module
The Hugging Face module (`text2vec-huggingface`) opens up the doors to over 600 [Hugging Face sentence similarity models](https://huggingface.co/models?pipeline_tag=sentence-similarity){:target="_blank"}, to be used in Weaviate as a vectorization module.
Now, that is a lot of models available to you. 😉

#### How this works
The way the module works, Weaviate coordinates the efforts around data imports, data updates, queries, etc, and delegates requests to the Hugging Face Inference API.

To make use of the Hugging Face module, you need a Hugging Face API Token. You can [request it here](https://huggingface.co/login?next=%2Fsettings%2Ftokens){:target="_blank"}.

*Note. Hugging Face Inference uses [a pay per use pricing model](https://huggingface.co/inference-api#pricing){:target="_blank"}.<br />
Make sure to study it well before you run a big job.*

To learn more, head to the [HuggingFace Module docs page](developers/weaviate/current/retriever-vectorizer-modules/text2vec-huggingface.html){:target="_blank"}.

## Enjoy
We hope you enjoy the most reliable and observable Weaviate release yet!

Please share your feedback with us via [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"}, [Twitter](https://twitter.com/SeMI_tech){:target="_blank"}, or [Github](https://github.com/semi-technologies/weaviate){:target="_blank"}.
