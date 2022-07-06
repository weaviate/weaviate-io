---
layout: post
title: Weaviate 1.14 release
description: "Learn, what is new in Weaviate 1.14, the most reliable and observable Weaviate release yet!"
published: true
author: Sebastian Witalec
author-img: /img/people/icon/sebastian.jpg
hero-img: /img/blog/weaviate-1.14/reliability.png
---

## What is new

We are excited to announce the release of Weaviate 1.14, the most reliable and observable Weaviate release yet. 

> This is the most boring release that I am most excited about <span>Etienne Dilocker – CTO at SeMI</span>

But, this release is not completely devoid of new bells and whistles. We have a few neat features that you might find interesting. In short this release covers:

* Reliability fixes and improvements
* Monitoring and Observability
* Support for non-cosine distances
* API Changes – Namespaces for Object IDs

Read below to learn more about each of these points in more detail.

## Reliability fixes and improvements

![Reliability and fixes](/img/blog/weaviate-1.14/reliability.png)

Bug fixing is not always the most exciting topic and we often get more excited about shiny new features. But from time to time we need to make sure that the Weaviate Core “is fine”, in order for you to truly enjoy working with it.

![This IS fine](/img/blog/weaviate-1.14/this-is-fine.jpg)

This is why, in this release we focused on improving Weaviate’s reliability and general improvements.

Check out the changelog to see the full list of features bug 25 fixes.
<!-- _TODO: add a link and update the numbers_ -->

### Bug Fix - retrieving objects by id

One critical bug fix worth highlighting – which alone should be a reason to update to Weaviate 1.14 – is for an issue where the REST API failed to GET an object by id.

For example, if we you had an object with id: **my-id-123456**.

If you called the following GraphQL API with a filter on id. It would return the expected object back.

```graphql
{
  Get {
    Article(where: {
        path: ["id"],
        operator: Equal,
        valueString: "my-id-123456"
      }) {
      title
    }
  }
}
```

However, if you called the following REST API with the same id. You wouldn't get the object back.
```
GET /v1/objects/{my-id-123456}
```

### Perceived data loss
This issue made it look like Weaviate was loosing data.<br/>
While in fact the data was still there, but the REST API failed to retrieve the required objects.

## Improved performance and capacity for data imports

Weaviate `1.14` significantly improves the performance of data imports and increases the potential size of the database.

### Problem
Before, the HNSW index would grow in static intervals of 25,000 objects. This was fine for datasets under 25 million objects, but after that there would be a very noticeable slowdown of the data import. Then from 50–100 million objects, the import would slow down to walking pace.

### Solution
To address this problem, we changed how the HNSW index grows. We implemented a relative growth pattern, where the HNSW index size grows by either 25% or 25’000 objects (whichever is bigger).

![HNSW index growth chart](/img/blog/weaviate-1.14/hnsw-index-growth.jpg)

### Test
After introducing the relative growth patterns, we've run a few tests.
We were able to import 200 million objects and more, while the import performance remained constant throughout the process.

[See more on github](https://github.com/semi-technologies/weaviate/pull/1976){:target="_blank"}.

## Monitoring and Observability

![Monitoring and Observability](/img/blog/weaviate-1.14/monitoring-and-observability.png)

One of the biggest challenges of running software in production, is to really understand what is happening under the hood at all times.
Which is especially important, when something is going wrong or we need to anticipate when more resources might be needed in advance.

![It doesn't work.... why?](/img/blog/weaviate-1.14/what-is-happening.jpg)
Without such insight, we end up looking at the black box wondering what is going on.

### Announcement

With Weaviate `1.14` you can get a lot more insight into the resources and the performance of differwent aspects of your Weaviate instance in Production.

Now, you can expose Prometheus-compatible metrics for monitoring. Combine this with a standard Prometheus/Grafana setup to create visual dashboards for metrics around: latenticies, import speed, time spent on vector vs object storage, memory usage, and more.

<!-- TODO: replace the image link -->
<!-- ![Importing Data into Weaviate](/img/weaviate-sample-dashboard-importing.png "Importing Data Into Weaviate") -->

![Importing Data into Weaviate](https://raw.githubusercontent.com/semi-technologies/weaviate-io/docs/v1.14.0/img/weaviate-sample-dashboard-importing.png "Importing Data Into Weaviate")

### Example

In a hypothetical scenario, you might be importing a large dataset. At one point the import process might slow down. You could then check your dashboards, where you might see that the vector indexing process is still running fast, while the object indexing slowed down. <br/>
Then you could cross reference it with another dashboard, to see that the slow down began when the import reached 120 milion objects.<br/>
In two steps, you could narrow down the issue to a specific area, which would get you a lot closer to finding the solution. Or you could use that data to share it with the Weaviate team to get help.

### Try it yourserlf

Here is an [example project](https://github.com/semi-technologies/weaviate-examples/tree/main/monitoring-prometheus-grafana){:target="_blank"} with:

* `docker-compose.yml` that spins up Weaviate (without any modules),
* a **Prometheus** instance,
* and a **Grafana** instance.

Just spin everything up, run a few queries and navigate to the Grafana instance in the browser to see the dashboard.

### Learn more

To learn more, see the [documentation](/developers/weaviate/current/more-resources/monitoring.html){:target="_blank"}.

## Support for non-cosine distances

![Support for non-cosine distances](/img/blog/weaviate-1.14/non-cosine-distances.png)

Weaviate v1.14 adds support for **L2** and **Dot Product** distances.<br/>
With this you can now use datasets that support Cosine, L2 or Dot distances. This opens up a whole new world of use cases that were not possible before.<br/>
Additionally, this is all pluggable and very easy to add new distance metrics in the future.
### Background
In the past Weaviate used a single number that would control the distances between vectors and that was **certainty**. Certainty is a number between 0 and 1, which works perfectly for cosine distances, as cosine distances are limited to 360° and can be easily converted to a range of 0-1.

![L2 and Dot Product distance calculations](/img/blog/weaviate-1.14/distances.png)

However, some machine learning models are trained with other distance metrics, like L2 or Dot Product. If we look at euclidean-based distances, two points can be infinitely far away from each other, so translating that to a bound certainty of 0-1 is not possible.

### What is new
For this reason, we introduced a new field called **distance**, which you can choose to be based on L2 or Dot Product distances.

### Raw distance

The distance values provided are raw numbers, which allow you to interpret the results based on your specific use-case scenario.<br/>
For example you can normalize and convert distance values to certainty values that fit the machine learning model you use and the kind of results you expect.

### Learn more

For more info, check out [the documentation](/developers/weaviate/current/vector-index-plugins/distances.html){:target="_blank"}.

### Contribute

Adding other distances is surprisingly easy, which could be a great way to contribute to the Weaviate project.

If that is something up your street, check out [the distancer code on github](https://github.com/semi-technologies/weaviate/tree/master/adapters/repos/db/vector/hnsw/distancer){:target="_blank"}, to see how other metrics have been implemented.

Just make sure to include plenty of tests. Remember: “reliability, reliability, reliability”.

## Updated API endpoints to manipulate data objects of specific class

![Updated API endpoints](/img/blog/weaviate-1.14/updated-API-endpoints.png)

The REST API CRUD operations now require to use both an **object id** and the target **namespace**.<br/>
This ensures that the operations are performed on the correct objects.

### Backround

One of Weaviate's features is full CRUD support. CRUD operations enable mutability of data objects and their vectors, which is a key difference between a vector database and an ANN library. In Weaviate, every data object has an ID (UUID). This ID is stored with the data object in a key-value store. IDs don’t have to be globally unique, since in Weaviate [classes](/developers/weaviate/current/data-schema/schema-configuration.html#class-object){:target="_blank"} acts as namespaces, while each class has a different [HNSW index](/developers/weaviate/current/vector-index-plugins/hnsw.html){:target="_blank"}, including the store around it, which is isolated on disk.

There was however one point in the API where reusing IDs between classes was causing serious issues. Most noticeable this was for the [v1/objects/{id}](/developers/weaviate/current/restful-api-references/objects.html){:target="_blank"} REST endpoints.
If you wanted to retrieve, modify or delete a data object by its ID, you would just need to specify the ID, without specifying the classname. So if the same ID exists for objects in multiple classes (which is fine because of the namespaces per class), Weaviate would not know which object to address and would address all objects with that ID instead. I.e. if you tried to delete an object by ID, this would result in deletion of all objects with that ID.

### Endpoint changes

This issue is now fixed with a **change to the API endpoints**. To get, modify and delete a data object, you now need to provide both the ID and the class name.

The following object functions are changed: **GET**, **HEAD**, **PUT**, **PATCH** and **DELETE**. 

#### Object change
New
```
/v1/objects/{className}/{id}
```
Deprecated
```
/v1/objects/{id}
```

#### References change
New
```
v1/objects/{className}/{id}/references/{propertyName}
```
Deprecated
```
v1/objects/{id}/references/{propertyName}
```

### Client changes
Changes are also applied in the clients, where you now also need to provide a class name for data object manipulation. Old functions will be kept, but are considered deprecated. When you use an old function in the API or client with Weaviate from v1.14, you will see a warning message.

### No namespace changes
There will be no changes in namespaces - classes will still act as namespaces, so the same ID can be used in different classes. 

## Stronger together

Of course, making Weaviate more reliable would be a lot harder without the great community around Weaviate.
<br/>As it is often the case:
![You can’t fix issues you didn’t know you have](/img/blog/weaviate-1.14/you-cant-fix.jpg)

### Thank you
Thanks to many active members on Weaviate’s Community Slack and through GitHub issues, we were able to identify, prioritize and fix many more issues than if we had to do it alone.

> Together, we made Weaviate v1.14 <br/>the most stable release yet.

### Help us
If at any point during your journey with Weaviate, you discover any bugs or you have feedback to share, please don’t hesitate to reach out to us via:
* [Weaviate’s Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} – you can join anytime
* [GitHub issues for Weaviate Core](https://github.com/semi-technologies/weaviate/issues/new){:target="_blank"}
* [GitHub issues for Weaviate’s documentation](https://github.com/semi-technologies/weaviate-io/issues/new/choose){:target="_blank"}

We have a little favor to ask though. Often reproducing the issue takes a lot more time than it takes to fix it. When reporting new issues, please include steps on how to reproduce the issue, together with some info about your environment. This will help us tremendously to identify the root cause and fix it.

### Guide
Here is a little guide on how to write great bug reports.

## Enjoy

We hope you enjoy the most reliable and observable Weaviate release yet!

Please share your feedback with us on Slack.