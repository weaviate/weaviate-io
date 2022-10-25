---
layout: post
title: How we solved a race condition with the Lock Striping pattern
description: The Lock Striping pattern is a great way to solve race conditions - for example, when dealing with concurrent batch imports containing objects with the same UUID - without sacrificing performance.
published: true
author: Dirk Kulawiak
author-img: /img/people/icon/dirk.jpg
card-img: /img/blog/hero/lock-striping-pattern.png
hero-img: /img/blog/hero/lock-striping-pattern.png
og: /img/blog/hero/lock-striping-pattern.png
date: 2022-10-25
toc: true
---
## Lock striping in database design
Database design comes with interesting challenges. Like, dealing with race conditions when importing data in parallel streams. But for every new challenge, there is a clever solution. One of those clever soltions is Lock striping. It refers to an arrangement where locking occurs on multiple buckets or 'stripes'. 

Are you curious about, the challenge that we faced, which solutions we considered, and what was our final solution? Read on 😀.

## Background
Databases must be able to import data quickly and reliably while maintaining data integrity and reducing time overhead. Weaviate is no exception to this! Given that our users populate Weaviate with hundreds of millions of data objects (if not more), we appreciate that import performance is of the highest ... *import-ance* (sorry) 🥁.

Weaviate offers and strongly recommends the [batch import feature](/developers/weaviate/current/getting-started/import.html#importing){:target="_blank"} for adding data objects in bulk. To further speed up the import process, you can use parallelization, which lets you run multiple batches concurrently. Each object in these batches is then checked for duplicates and assigned a unique internal DocID used by Weaviate to access objects.

We uncovered that there could be a race condition in this process. Sometimes when multiple batches contained identical objects with the same UUID, they could be added more than once to Weaviate, each time with different DocIDs. This, in turn, could cause issues within Weaviate.

Luckily, we’ve addressed this issue without sacrificing performance (yay!🥳). Here's our journey that got us to the current solution.

## Our initial solutions
In the initial solution, we added a lock (sync.Mutex in Go), so that now only a single goroutine can hold the lock, check for duplicate UUIDs, and assign DocIDs. This lock makes sure that the race does not occur anymore, but as an unintended side-effect the import time increased by ~20% due to lock-congestion.

Upon further consideration, our team concluded that while using a single lock is effective, it’s also overkill. Almost all objects are unique and it is not a problem to process those concurrently. We found that what we really needed was just a lock for each unique UUID. Cleverly, this approach would ensure that only one object per UUID is handled at each point in time, so that Weaviate cannot add multiple instances of objects with the same UUID. Meanwhile, it would still allow full parallelization of import processes to maximize performance.

![Single-lock solution](/img/blog/lock-striping-pattern/single-lock-solution.png)

As it often happens, implementing a lock-per-key solution created a different issue. Due to the large dataset size mentioned earlier, there can be millions or even billions of objects with unique UUIDs in Weaviate, and creating a lock for each of them would require a lot of memory. We found an elegant solution that is in-between both of the solutions above - a **lock striping** pattern.

## Solving both challenges
Based on the UUID we assign each object to one of the 128 locks. This process is deterministic so objects with an identical UUID will always use the same lock. This gives us the best of both worlds: we have a small, fixed number of locks, but it still guarantees that two objects with the same UUID are never processed concurrently. With 128 locks, we only have 1/128th of the congestion of a single lock while still only using 128 * 8B = 1KB of memory. With the **lock striping** pattern, the import time is the same as without a lock, and we fixed the race condition without any negative performance impact.

![lock striping solution](/img/blog/lock-striping-pattern/lock-striping-solution.png)

We are very pleased to introduce this solution, which should eliminate the above issues that can be caused by data duplication at import. Additionally, we are also very happy to have arrived at a solution that comes with no data import performance penalty, having seen the mammoth datasets that our users often deal with.

## Update Weaviate
The **lock striping** pattern was introduced in Weaviate `v1.15.4`. So if you are a Weaviate user, we encourage you to update Weaviate to the latest release to take advantage of this improvement as well as many others.

Thank you for reading, and see you next time!

## What’s Next
Check out the [Getting Started with Weaviate](https://weaviate.io/developers/weaviate/current/getting-started/index.html){:target="_blank"} and begin building amazing apps with Weaviate.

You can reach out to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/weaviate_io){:target="_blank"}.

Weaviate is open source, you can follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don’t forget to give us a ⭐️ while you are there.