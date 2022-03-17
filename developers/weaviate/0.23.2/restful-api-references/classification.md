---
layout: layout-documentation
solution: weaviate
sub-menu: RESTful API references
title: /v1/classification
intro: The RESTful classification endpoint allows you to start a <a href="#contextual-classification">Contextual</a> or <a href="#knn-classification">kNN</a> classification, and get the status, results and metadata of a previously created classification.
description: RESTful API classification reference
tags: ['RESTful API', 'references', 'classification']
menu-order: 4
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Start a classification

Weaviate's classification features allows you to classify data objects by predicting cross-references based on the semantic meaning of the data objects. There are two types of classification: 
- **[Contextual classification](#contextual-classification)**: Predicts cross-references based on the context, without training data.
- **[kNN classification](#knn-classification)**: Uses the k-nearest neighbors algorithm and requiring training data to predict cross-references. Weaviate finds similar objects and checks how they were labeled in the past. Especially when there isn’t a logical semantic relationship in the objects that need to be classified, the kNN algorithm is helpful.

A classification can be started using the RESTful API, via the `v1/classification` endpoint with a `POST` request. This triggers the start of the classification, after which it will run in the background. This can also be achieved using one of the client libraries. Use the [`GET` method](#get-status-results-and-metadata) to see the status of the classification:

{% include code/0.23.2/classification.post.html %}

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

It returns the following fields for both kNN and Contextual classification:
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
  "type": "string", // the type of classification, can be "knn" or "contextual"
}
```

The following fields additionally when the classification was contextual:
```json
{
  "informationGainCutoffPercentile": int, // the configured Information Gain Cutoff percentile
  "informationGainMaximumBoost": int, // the configured Information Gain Maximum Boost
  "minimumUsableWords": int, // the configured Minimum usable words
  "tfidfCutoffPercentile": int // the configured TF-IDF cutoff
}
```

The following fields additionally when the classification was based on kNN:
```json
{
  "k": int, // the number of neighbors taken in the classification
}
```

### Example
A `contextual` classification according to [the example](#start-a-contextual-classification)
The following command:

{% include code/0.23.2/classification.get.html %}

returns:

```json
{
  "basedOnProperties": [
    "summary"
  ],
  "class": "Article",
  "classifyProperties": [
    "ofCategory"
  ],
  "id": "973e3b4c-4c1d-4b51-87d8-4d0343beb7ad",
  "informationGainCutoffPercentile": 50,
  "informationGainMaximumBoost": 3,
  "meta": {
    "completed": "2020-09-09T14:57:55.530Z",
    "count": 2548,
    "countSucceeded": 2548,
    "started": "2020-09-09T14:57:08.468Z"
  },
  "minimumUsableWords": 3,
  "status": "completed",
  "tfidfCutoffPercentile": 80,
  "type": "contextual"
}
``` 

## Evaluation of single data object results
After the classification is completed, the concerning reference properties data objects in the Weaviate instance are updated according to the classification. These data objects will be represented similarly to other data objects. The results of a classification can be requested for the individual data objects through the [`v1/{semantic-kind}/{id}/?include=_classification` RESTful endpoint](./semantic-kind.html#response-fields) or with the [GraphQL `_classification` underscore property](../graphql-references/underscore-properties.html#classification).


# Contextual classification

If you don't have any training data and want to classify how similar a source item is to a potential target item, contextual classification is the right pick. Especially when there is a strong semantic relation in your data (e.g., `The Landmark Eiffel Tower` and `The City Paris`).

### Example use case

Imagine you have a dataset comprised of Magazine Articles (sources). You don’t know what each article is about, but you know that each article falls into one of three categories (targets): “politics,” “fashion,” or “technology.” There are no additional business rules involved, and you don’t have any training data. This is a good fit for a “contextual” classification. In such a classification, each Article will be analyzed, and the most important words will be extracted. These words are then compared - using their vector space distance - to one of the three targets. For example, in an article about “technology,” Weaviate has found the words “computer, “macintosh,” and “hardware” to be the most important words. These three words are closer in the vector space to “technology” than they are to “fashion” or “politics.” Weaviate will thus put them in the “technology” category. Each article is treated independently. How many articles have already been categorized into a specific category does not influence future articles.

## Endpoint and parameters

A classification can be started via the `v1/classifications` endpoint, which can also be accessed via the client libraries. The following fields must (required) or can (optional) be specified along with the `POST` request:

**Required**:
- `type: "contextual"`: the type of the classification, which is contextual here.
- `class`: the class name of the data objects to be classified.
- `classifyProperties`: a list of properties which values to classify. The individual properties of the class should be reference properties to other classes, which should only refer to one class. This is defined by the `dataType` in the schema, which thus should be an array consisting of exactly one class name.
- `basedOnProperties`: one or more of the other properties of the class, this field must be specified, but the current implementation takes the whole vector of the class (objects) into account.

**Optional, with default values**:
- Parameters to control weights of individual words: (Note: these parameters are highly specific to a dataset, the default values are set to work with many datasets.)
  - `informationGainCutoffPercentile: 50`. All words in a corpus are ranked by their information gain against the possible target objects. A cutoff percentile of 40 implies that the top 40% are used and the bottom 60% are cut-off. This highly depends on the data set. On the 20 news group data set (posts written by humans, between 10 and 3000 words), the best results are with a value of 8 whereas in a dataset with 1-2 word product description the best value would be 100 (i.e. no cut-off).
  - `informationGainMaximumBoost: 3`. Words in a corpus will receive an additional boost based on how high they are ranked according to information gain. Setting this value to `3` implies that the top-ranked word will be ranked 3 times as high as the bottom ranked word. The curve inbetween is logarithmic. A maximum boost of `1` implies that no boosting occurs.
  - `tfidfCutoffPercentile: 80`. All words in a corpus are ranked by their tf-idf score. A cutoff percentile of 80 implies that the top 80% are used and the bottom 20% are cut-off. This is very effective to remove words that occur in almost all objects, such as filler and stop words. Note that tf-idf compares the words in the corpus to those in other corpora (sources) whereas information gain compares the words in the corpus to possible target objects.
  - `minimumUsableWords: 3`. Both information gain (IG) and tf-idf are mechanisms to remove words from the corpora. However, on very short corpora this could lead to a removal of all words, or all but a single word. This value guarantees that - regardless of tf-idf and IG score - always at least n words are used.
- Parameters to add limitations (based on e.g. background business knowledge).
  - `sourceWhere: {}`. Parameter to determine which data objects to classify (i.e. you can use this if you want to leave out some data objects to classify them later based on background knowledge). It accepts a [`where` filter body](../graphql-references/filters.html#where-filter).
  - `targetWhere: {}`. Parameter to limit possible targets (i.e. when it you want to make sure no data objects will be classified as such). It accepts a [`where` filter body](../graphql-references/filters.html#where-filter).


### Start a contextual classification

A classification can be started through one of the clients, or with a direct `curl` request to the RESTful API.

{% include code/0.23.2/classification.contextual.post.html %}

A classification is started, and will run in the background. The following response is given after starting the classification, and the status can be fetched via the [`v1/classifications/{id}`](#get-status-results-and-metadata) endpoint.

```json
{
  "basedOnProperties": [
    "summary"
  ],
  "class": "Article",
  "classifyProperties": [
    "ofCategory"
  ],
  "id": "973e3b4c-4c1d-4b51-87d8-4d0343beb7ad",
  "informationGainCutoffPercentile": 50,
  "informationGainMaximumBoost": 3,
  "meta": {
    "completed": "0001-01-01T00:00:00.000Z",
    "started": "2020-09-09T14:57:08.468Z"
  },
  "minimumUsableWords": 3,
  "status": "running",
  "tfidfCutoffPercentile": 80,
  "type": "contextual"
}
```

### Evaluation of single data object results
After the classification is completed, the concerning reference properties data objects in the Weaviate instance are updated according to the classification. These data objects will be represented similarly to other data objects. The results of a classification can be requested for the individual data objects through the [`v1/{semantic-kind}/{id}/?include=_classification` RESTful endpoint](./semantic-kind.html#response-fields) or with the [GraphQL `_classification` underscore property](../graphql-references/underscore-properties.html#classification).


# KNN classification

With [*k*-nearest neighbor](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) classification, Weaviate finds similar objects and checks how they were labeled in the past. The more objects added and correctly labeled over time, the better a future classification becomes. Especially when there isn’t a logical semantic relationship in the objects that need to be classified, the kNN algorithm is helpful.

### Example use case


### Email spam classification
Imagine you have a data set of emails. Some of those emails are useful, others are spam. The decision between whether an email is spam follows a set of business rules which you may not know about. For example. it could be likely that if email mentions certain words, such as brand names for a specific medication, an email is more likely to be spam. You can let Weaviate learn based on the training data you provide it with. Next to the “Email” class (source), you also introduce an “Importance” class of which adds three data objects: “Spam”, “Neutral”, “Important”. With “kNN” Weaviate never compares source objects to target objects. Instead, it compares source objects to similar source objects and “inherits” their labeling. In turn, it also improves in quality the more (correctly) labeled data you add. For example, if Weaviate finds an email object with the text “Buy the best stamina drugs for cheap prices at very-questionable-shop.com”, it will now scan the training data set for a close match. Imagine it finds the email with “Buy cheap pills online” and similar emails. Because these pre-labeled objects were marked as spam, Weaviate will make the decision to label the unseen data object as spam as well. The same will happen for “neutral” and “important” emails respectively.

### Article popularity prediction
Imagine you have a property for the popularity of the `Article` by the audience, and you would like to predict the `popularity` for new articles based on known properties. You kan use kNN classification, use the popularity of previous articles and predict the popularity of new articles.

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
- `k: 3`. The number of neighbors to base the classification on. 
- Parameters to add limitations (based on e.g. background business knowledge).
  - `sourceWhere: {}`. Parameter to determine which data objects to classify (i.e. you can use this if you want to leave out some data objects to classify them later based on background knowledge). It accepts a [`where` filter body](../graphql-references/filters.html#where-filter).
  - `trainingSetWhere: {}`. Parameter to limit the data objects used in the training set (i.e. when you want to leave in or out data object with specific property values from the training set). It accepts a [`where` filter body](../graphql-references/filters.html#where-filter).

### Start a kNN classification
A classification can be started through one of the clients, or with a direct `curl` request to the RESTful API.

{% include code/0.23.2/classification.knn.post.html %}

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
  "k": 3
}
```

### Evaluation of single data object results
After the classification is completed, the concerning reference properties data objects in the Weaviate instance are updated according to the classification. These data objects will be represented similarly to other data objects. The results of a classification can be requested for the individual data objects through the [`v1/{semantic-kind}/{id}/?include=_classification` RESTful endpoint](./semantic-kind.html#response-fields) or with the [GraphQL `_classification` underscore property](../graphql-references/underscore-properties.html#classification).

# More Resources

{% include docs-support-links.html %}