---
title: REST - /v1/classifications
sidebar_position: 15
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'classification']
---


## Start a classification

Weaviate's classification features allows you to classify data objects based on their vector.

- **[kNN classification](#knn-classification)**: Uses the k-nearest neighbors algorithm to predict a property.
  - This requires existing training data.
  - The target property should be a reference property to another class.

:::caution Adding property to the schema
Note that `knn` classification requires the target property to be included in the schema before importing the data. If you want to add a property to the schema after importing data, you will need to [re-import the data](../data-ingestion/import.md#re-importing-data).
:::

If `text2vec-contextionary` is enabled, contextual classification can also be used.

- **[Contextual classification](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-contextionary.md)**: Predicts cross-references based on the context.
  - This does not require training data.
  - This works best when there is a strong semantic relation in your data (e.g., `The Landmark Eiffel Tower` and `The City Paris`).

Classification can triggered to run in the background with a `POST` request, and the [`GET` method](#get-status-results-and-metadata) can be used to view its status.

import ClassificationPost from '/_includes/code/classification.post.mdx';

<ClassificationPost/>

The endpoint will return [information](#response) about the started classification. The response will include the classification `id`.

## Clients and async classification

Classification jobs can take some time to complete. With the Weaviate clients, you can:
  - Wait for the classification function to finish before continuing with the rest of the script.
    - `Python`: add `with_wait_for_completion()` to the builder pattern.
    - `Go`: add `.WithWaitForCompletion()` to the builder pattern.
    - `JavaScript`: add `.withWaitForCompletion()` to the builder pattern.
  - Don't wait for the classification to be finished and return directly.
    - You can check the classification task status using the classification endpoint with the task `id`. The field `status` in the return body will either be `running` or `completed`. See [here](#get-status-results-and-metadata) how to query this information.

## Classification status, results and metadata

A `GET` request can return the status, results and metadata of a previously created classification:

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

import ClassificationGet from '/_includes/code/classification.get.mdx';

<ClassificationGet/>

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


## KNN classification

Weaviate performs the `knn` classification based on vector similarity between data objects.,

Due to the nature of the [*k*-nearest neighbor](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) algorithm, the quality of the classification will be a function of the quantity and quality of the pre-existing data.

<!-- ### Example use cases

#### Email spam classification

Imagine you have a data set of emails. Some of those emails are useful, others are spam. The decision between whether an email is spam follows a set of business rules which you may not know about. For example. it could be likely that if email mentions certain words, such as brand names for a specific medication, an email is more likely to be spam. You can let Weaviate learn based on the training data you provide it with. Next to the "Email" class (source), you also introduce an "Importance" class of which adds three data objects: "Spam", "Neutral", "Important". With "kNN" Weaviate never compares source objects to target objects. Instead, it compares source objects to similar source objects and "inherits" their labeling. In turn, it also improves in quality the more (correctly) labeled data you add. For example, if Weaviate finds an email object with the text "Buy the best stamina drugs for cheap prices at very-questionable-shop.com", it will now scan the training data set for a close match. Imagine it finds the email with "Buy cheap pills online" and similar emails. Because these pre-labeled objects were marked as spam, Weaviate will make the decision to label the unseen data object as spam as well. The same will happen for "neutral" and "important" emails respectively.

#### Article popularity prediction

Imagine you have a property for the popularity of the `Article` by the audience, and you would like to predict the `popularity` for new articles based on known properties. You can use kNN classification, use the popularity of previous articles and predict the popularity of new articles. -->

### Requirements

- A schema with a class to be classified, and a class to store the classification.
  - A cross-reference from the class to be classified to the class to store the classification.
- Training data within the class to store the classification.
- Vectors for the class to be classified.

### Parameters

**Required**:
- `type: "knn"`: the type of the classification, which is "knn" here.
- `class`: the class name of the data objects to be classified.
- `classifyProperties`: an array containing the target, cross-reference, property name of the class to be classified.
- `basedOnProperties`: an array containing a property name.

:::note `basedOnProperties` limitations
The current knn implementation uses the object vector, but requires the `basedOnProperties` to be an array with one valid text property name.
:::

**Optional, with default values:**
- `settings {k: 3}`. The number of neighbors to base the classification on.
- Parameters to add limitations (based on e.g. background business knowledge).
  - `filters: {}` with the following possible properties:
    - `sourceWhere: {}`. Parameter to determine which data objects to classify (i.e. to leave out some data objects).
    - `targetWhere: {}`. Parameter to limit possible targets (i.e. to exclude possible target values).
    - `trainingSetWhere: {}`. Parameter to limit possible data objects in the training set.
    - All of `sourceWhere`, `targetWhere` and `trainingSetWhere` filters accept a [`where` filter body](../graphql/filters.md#where-filter).

### Start a kNN classification

A classification can be started through one of the clients, or with a direct `curl` request to the RESTful API.

import ClassificationKNNPost from '/_includes/code/classification.knn.post.mdx';

<ClassificationKNNPost/>

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

The classification task will update the target property in each data object.

The results of a classification can be requested for the individual data objects through the [`v1/objects/{id}/?include=classification` RESTful endpoint](./objects.md#response-fields) or with the [GraphQL `_additional {classification}` field](../graphql/additional-properties.md#classification).


## Zero-Shot Classification

Zero-shot classification is an unsupervised classification method, meaning you don't need any training data.

<!-- Zero-shot allows you to classify data which wasn't seen before to build the classifier. This type of classification is perfect if you want to label data objects with classes, but you don't have or don't want to use training data. It picks the label objects that have the lowest distance to the source objects. The link is made using cross-references, similar to existing classifications in Weaviate. -->

Weaviate's zero-shot classification measures how similar (how close) a data item is to a potential target item (a class or label).

More specifically, Weaviate uses `vector search and similarity` algorithms to classify data objects with other data objects. Internally, Weaviate performs a `nearVector` search (which you can also [perform manually with GraphQL](../graphql/search-operators.md#nearvector)), and takes the closes result out of a given set of options (data objects) to classify.

Zero-shot classification works with all (text/image/..) vectorizers (or no vectorizer, as long as you have vectors stored in Weaviate).

### Parameters

**Required**:
- `type: "zeroshot"`: the type of the classification.
- `class`: the class name of the data objects to be classified.
- `classifyProperties`: a list of properties to classify. They should be reference properties to other classes, each only referring to one class.

**Optional, with default values**:
- Parameters to add limitations (based on e.g. background business knowledge).
  - `filters: {}` with the following possible properties:
    - `sourceWhere: {}`. Parameter to determine which data objects to classify (i.e. to leave out some data objects).
    - `targetWhere: {}`. Parameter to limit possible targets (i.e. to exclude possible target values).
    - `trainingSetWhere: {}`. Parameter to limit possible data objects in the training set.
    - All of `sourceWhere`, `targetWhere` and `trainingSetWhere` filters accept a [`where` filter body](../graphql/filters.md#where-filter).


### Start a zeroshot classification

A classification can be started through one of the clients, or with a direct `curl` request to the RESTful API.

import ClassificationZeroshotPost from '/_includes/code/classification.zeroshot.post.mdx';

<ClassificationZeroshotPost/>

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

The classification task will update the target property in each data object.

The results of a classification can be requested for the individual data objects through the [`v1/objects/{id}/?include=classification` RESTful endpoint](./objects.md#response-fields) or with the [GraphQL `_additional {classification}` field](../graphql/additional-properties.md#classification).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
