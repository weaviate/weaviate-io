---
title: REST - /v1/classification
sidebar_position: 15
# layout: layout-documentation
# solution: weaviate
# sub-menu: RESTful API references
# title: /v1/classification
# intro: The RESTful classification endpoint allows you to start a <a href="#knn-classification">kNN</a> classification, and get the status, results and metadata of a previously created classification.
# description: RESTful API classification reference
# tags: ['RESTful API', 'references', 'classification']
# sidebar_position: 5
# open-graph-type: article
# toc: false
# redirect_from:
#     - /developers/weaviate/v1.1.0/restful-api-references/classification.html
#     - /documentation/weaviate/current/classification/contextual-classification.html
#     - /documentation/weaviate/current/classification/knn-classification.html
#     - /documentation/weaviate/current/restful-api-references/classification.html
---

# Index
- [Start a classification](#start-a-classification)
  - [Clients and async classification](#clients-and-async-classification)
- [Get status, results and metadata](#get-status-results-and-metadata)
  - [Evaluation of single data object results](#evaluation-of-single-data-object-results)
- [KNN classification](#knn-classification)
  - [Endpoint and parameters](#endpoint-and-parameters)
- [Zero-Shot Classification](#zero-shot-classification)
- [Contextual Classification](../retriever-vectorizer-modules/text2vec-contextionary.html)
- [More Resources](#more-resources)

# Start a classification

Weaviate's classification features allows you to classify data objects by predicting cross-references based on the semantic meaning of the data objects. Weaviate Core (without any modules) provides one type of classification: 
- **[kNN classification](#knn-classification)**: Uses the k-nearest neighbors algorithm and requiring training data to predict cross-references. Weaviate finds similar objects and checks how they were labeled in the past. Especially when there isn’t a logical semantic relationship in the objects that need to be classified, the kNN algorithm is helpful.

The vectorizer module `text2vec-contextionary` provides a second type of classification. Information about this classification type can be found [here](../retriever-vectorizer-modules/text2vec-contextionary.html).
- **[Contextual classification](../retriever-vectorizer-modules/text2vec-contextionary.html)**: Predicts cross-references based on the context, without training data. If you don't have any training data and want to classify how similar a source item is to a potential target item, contextual classification is the right pick. Especially when there is a strong semantic relation in your data (e.g., `The Landmark Eiffel Tower` and `The City Paris`).

A classification can be started using the RESTful API, via the `v1/classification` endpoint with a `POST` request. This triggers the start of the classification, after which it will run in the background. This can also be achieved using one of the client libraries. Use the [`GET` method](#get-status-results-and-metadata) to see the status of the classification:

{% include code/1.x/classification.post.html %}

Which will return [information](#response) about the started classification, including the classification `id`.

## Clients and async classification
Some classification jobs can take some time to complete. With the Weaviate clients, there are two ways to deal with this. Although there is no explicit async method for classification available, you can do the following: 
  - Wait for the classification function to finish before continuing with the rest of the script (see examples in the code block above).
    - `Python`: add `with_wait_for_completion()` to the builder pattern.
    - `Go`: add `.WithWaitForCompletion()` to the builder pattern.
    - `JavaScript`: add `.withWaitForCompletion()` to the builder pattern.
  - Don't wait for the classification to be finished and return directly. You can check if the classification is completed using the classification meta endpoint with the id of the classification (which can be found in the return body of the classification start). The field `status` in the return body will either be `running` or `completed`. See [here](#get-status-results-and-metadata) how to query this information. 

# Get status, results and metadata

The `GET` endpoint returns the status, results and metadata of a previously created classification:

### Method

```js
GET /v1/classifications/{id}
```

### Parameters

The classification `id` should be passed to the request. This `id` is obtained from the result of starting the classification.

### Response

It returns the following fields for all classification types:
```json
{
  "id": "string", // classification id
  "class": "string", // class name of the classified data objects
  "classifyProperties": [ "string" ], // list of the class properties that are (to be) classified
  "basedOnProperties": [ "string" ], // list of the class properties that the classification is based on
  "status": "string", // status of the classification, can be "running" or "completed"
  "meta": {
    "started": "timestamp",
    "completed": "timestamp",
    "count": int, // total number of items to classify (only if "status" is completed)
    "countSucceeded": int, // total number of items that succeeded (only if "status" is completed)
    "countFailed": int // total number of items that failed (only if "status" is completed, only if >0)
  },
  "type": "string", // the type of classification, can be "knn" or a module specific classification
  "settings": {}, // additional settings specific to the classification type
  "filters": { // additional filters specific to the data objects to include in the classification, Where filters according to the GraphQL Where filter design
    "sourceWhere": { … },
    "trainingSetWhere": { … },
    "targetWhere": { … },
  }
}
```

The following fields additionally when the classification was based on kNN:
```json
{
  "settings": {
    "k": int, // the number of neighbors taken in the classification
  }
}
```

### Example
A `knn` classification according to [the example](#start-a-knn-classification)
The following command:

{% include code/1.x/classification.get.html %}

returns:

```json
{
  "basedOnProperties": [
    "summary"
  ],
  "class": "Article",
  "classifyProperties": [
    "hasPopularity"
  ],
  "id": "ee722219-b8ec-4db1-8f8d-5150bb1a9e0c",
  "meta": {
    "completed": "0001-01-01T00:00:00.000Z",
    "started": "2020-09-09T14:57:08.468Z"
  },
  "minimumUsableWords": 3,
  "status": "running",
  "tfidfCutoffPercentile": 80,
  "type": "knn",
  "settings": {
    "k": 3, 
  }
}
``` 

## Evaluation of single data object results
After the classification is completed, the concerning reference properties data objects in the Weaviate instance are updated according to the classification. These data objects will be represented similarly to other data objects. The results of a classification can be requested for the individual data objects through the [`v1/objects/{id}/?include=classification` RESTful endpoint](./objects.html#response-fields) or with the [GraphQL `_additional {classification}` field](../graphql-references/additional-properties.html#classification).

# KNN classification

With [*k*-nearest neighbor](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) classification, Weaviate finds similar objects and checks how they were labeled in the past. The more objects added and correctly labeled over time, the better a future classification becomes. Especially when there isn’t a logical semantic relationship in the objects that need to be classified, the kNN algorithm is helpful.

### Example use cases


#### Email spam classification
Imagine you have a data set of emails. Some of those emails are useful, others are spam. The decision between whether an email is spam follows a set of business rules which you may not know about. For example. it could be likely that if email mentions certain words, such as brand names for a specific medication, an email is more likely to be spam. You can let Weaviate learn based on the training data you provide it with. Next to the “Email” class (source), you also introduce an “Importance” class of which adds three data objects: “Spam”, “Neutral”, “Important”. With “kNN” Weaviate never compares source objects to target objects. Instead, it compares source objects to similar source objects and “inherits” their labeling. In turn, it also improves in quality the more (correctly) labeled data you add. For example, if Weaviate finds an email object with the text “Buy the best stamina drugs for cheap prices at very-questionable-shop.com”, it will now scan the training data set for a close match. Imagine it finds the email with “Buy cheap pills online” and similar emails. Because these pre-labeled objects were marked as spam, Weaviate will make the decision to label the unseen data object as spam as well. The same will happen for “neutral” and “important” emails respectively.

#### Article popularity prediction
Imagine you have a property for the popularity of the `Article` by the audience, and you would like to predict the `popularity` for new articles based on known properties. You can use kNN classification, use the popularity of previous articles and predict the popularity of new articles.

### Requirements
- A schema with at least two classes and a cross-reference between both classes.
- Some training data, which are data objects in the class with a reference (you want to predict for other objects) to another class already made.

## Endpoint and parameters

A classification can be started via the `v1/classifications` endpoint, which can also be accessed via the client libraries. The following fields must (required) or can (optional) be specified along with the `POST` request:

**Required**:
- `type: "knn"`: the type of the classification, which is "knn" here.
- `class`: the class name of the data objects to be classified.
- `classifyProperties`: a list of properties which values to classify. The individual properties of the class should be reference properties to other classes, which should only refer to one class. This is defined by the `dataType` in the schema, which thus should be an array consisting of exactly one class name.
- `basedOnProperties`: one or more of the other properties of the class (NOTE: current Weaviate supports only one property given, so make sure to pass a list with a string of one property name), this field must be specified, but the current implementation takes the whole vector of the class (objects) into account.

**Optional, with default values:**
- `settings {k: 3}`. The number of neighbors to base the classification on. 
- Parameters to add limitations (based on e.g. background business knowledge).
  - `filters: {}` with the following possible properties:
    - `sourceWhere: {}`. Parameter to determine which data objects to classify (i.e. you can use this if you want to leave out some data objects to classify them later based on background knowledge). It accepts a [`where` filter body](../graphql-references/filters.html#where-filter).
    - `targetWhere: {}`. Parameter to limit possible targets (i.e. when it you want to make sure no data objects will be classified as such). It accepts a [`where` filter body](../graphql-references/filters.html#where-filter).
    - `trainingSetWhere: {}`. Parameter to limit possible data objects in the training set. It accepts a [`where` filter body](../graphql-references/filters.html#where-filter).

### Start a kNN classification
A classification can be started through one of the clients, or with a direct `curl` request to the RESTful API.

{% include code/1.x/classification.knn.post.html %}

A classification is started, and will run in the background. The following response is given after starting the classification, and the status can be fetched via the [`v1/classifications/{id}`](#get-status-results-and-metadata) endpoint.

```json
{
  "basedOnProperties": [
    "summary"
  ],
  "class": "Article",
  "classifyProperties": [
    "hasPopularity"
  ],
  "id": "ee722219-b8ec-4db1-8f8d-5150bb1a9e0c",
  "meta": {
    "completed": "0001-01-01T00:00:00.000Z",
    "started": "2020-09-09T14:57:08.468Z"
  },
  "minimumUsableWords": 3,
  "status": "running",
  "tfidfCutoffPercentile": 80,
  "type": "knn",
  "settings": {
    "k": 3, 
  }
}
```

### Evaluation of single data object results
After the classification is completed, the concerning reference properties data objects in the Weaviate instance are updated according to the classification. These data objects will be represented similarly to other data objects. The results of a classification can be requested for the individual data objects through the [`v1/objects/{id}/?include=classification` RESTful endpoint](./objects.html#response-fields) or with the [GraphQL `_additional {classification}` field](../graphql-references/additional-properties.html#classification).

# Zero-Shot Classification

Zero-shot classification is an unsupervised classification method, meaning you don't need any training data. Zero-shot allows you to classify data which wasn't seen before to build the classifier. This type of classification is perfect if you want to label data objects with classes, but you don't have or don't want to use training data. It picks the label objects that have the lowest distance to the source objects. The link is made using cross-references, similar to existing classifications in Weaviate.

Weaviate's zero-shot classification measures how similar (how close) a data item is to a potential target item (a class or label). More specifically, Weaviate uses `vector search and similarity` algorithms to classify data objects with other data objects. Internally, Weaviate performs a `nearVector` search (which you can also [perform manually with GraphQL](../graphql-references/filters.html#nearvector-filter)), and takes the closes result out of a given set of options (data objects) to classify. 

Zero-shot classification works with all (text/image/..) vectorizers (or no vectorizer, as long as you have vectors stored in Weaviate). 

## Endpoint and parameters

A classification can be started via the `v1/classifications` endpoint, which can also be accessed via the client libraries. The following fields must (required) or can (optional) be specified along with the `POST` request:

**Required**:
- `type: "zeroshot"`: the type of the classification, which is zeroshot here.
- `class`: the class name of the data objects to be classified.
- `classifyProperties`: a list of properties which values to classify. The individual properties of the class should be reference properties to other classes, which should only refer to one class. This is defined by the `dataType` in the schema, which thus should be an array consisting of exactly one class name.

**Optional, with default values**:
- Parameters to add limitations (based on e.g. background business knowledge).
  - `filters: {}` with the following possible properties:
    - `sourceWhere: {}`. Parameter to determine which data objects to classify (i.e. you can use this if you want to leave out some data objects to classify them later based on background knowledge). It accepts a [`where` filter body](../graphql-references/filters.html#where-filter).
    - `targetWhere: {}`. Parameter to limit possible targets (i.e. when it you want to make sure no data objects will be classified as such). It accepts a [`where` filter body](../graphql-references/filters.html#where-filter).
    - `trainingSetWhere: {}`. Parameter to limit possible data objects in the training set. It accepts a [`where` filter body](../graphql-references/filters.html#where-filter).


### Start a zeroshot classification

A classification can be started through one of the clients, or with a direct `curl` request to the RESTful API.

{% include code/1.x/classification.zeroshot.post.html %}

A classification is started, and will run in the background. The following response is given after starting the classification, and the status can be fetched via the `v1/classifications/{id}` endpoint.

```json
{
  "class": "Article",
  "classifyProperties": [
    "ofCategory"
  ],
  "id": "973e3b4c-4c1d-4b51-87d8-4d0343beb7ad",
  "meta": {
    "completed": "0001-01-01T00:00:00.000Z",
    "started": "2020-09-09T14:57:08.468Z"
  },
  "status": "running",
  "type": "zeroshot"
}
```

### Evaluation of single data object results
After the classification is completed, the concerning reference properties data objects in the Weaviate instance are updated according to the classification. These data objects will be represented similarly to other data objects. The results of a classification can be requested for the individual data objects through the [`v1/objects/{id}/?include=classification` RESTful endpoint](../restful-api-references/objects.html) or with the [GraphQL `_additional {classification}` field](../graphql-references/additional-properties.html#classification).

# More Resources

{% include docs-support-links.html %}
