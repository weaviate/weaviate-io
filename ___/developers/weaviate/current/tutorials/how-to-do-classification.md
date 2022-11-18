---
layout: layout-documentation
solution: weaviate
sub-menu: Tutorials
title: How to do classification?
intro: How to classify data with Weaviate?
description: How to classify data with Weaviate?
tags: ['how to', 'classify data', 'classification']
sidebar_position: 6
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.3.0/tutorials/how-to-do-classification.html
    - /developers/weaviate/v1.4.1/tutorials/how-to-do-classification.html
    - /documentation/weaviate/current/tutorials/how-to-do-classification.html
---

# Introduction

You can use Weaviate to automatically classify data, that is, you can ask Weaviate to automatically make references between concepts. Since Weaviate stores data objects based on semantics in a vector position, a variety of automated classification tasks can be performed in near-realtime. Weaviate offers two different types of classification:

1. **Contextual classification**. Provided by the `text2vec-contextionary` module, thus can only be used when this module is active in your Weaviate instance. Uses the context of data points to make new references. There is no training data needed, and this type of classification is the right pick if you have a strong semantic relation in your data. See [here](../retriever-vectorizer-modules/text2vec-contextionary.html) for more information. 
2. **kNN classification**. To assign property values and references of data objects based on how similar objects are labeled that Weaviate finds. The more objects added and correctly labeled over time, the better a future classification becomes. Especially when there isn’t a logical semantic relationship in the objects that need to be classified, the kNN algorithm is helpful. See more [here](../restful-api-references/classification.html#knn-classification).

In this how-to guide, you will learn how to classify with Contextual and kNN classification.

# Prerequisites

**1. Connect to a Weaviate instance**

If you haven't set up a Weaviate instance yet, check the [Getting started guide](../getting-started/installation.html). In this guide we assume your instance is running at `http://localhost:8080` with [text2vec-contextionary](../getting-started/installation.html) as vectorization module.

**2. Upload a schema**

Learn how to create and upload a schema [here](./how-to-create-a-schema.html). In this guide we assume to have a similar schema uploaded with the classes `Publication`, `Article` and `Author` and `Category`.

**3. Add data**

Make sure there is data available in your Weaviate instance, you can read how to do this in the [previous guide](./how-to-import-data.html). In this tutorial we assume there are data objects of `Publication`s, `Article`s, `Author`s and `Category` present.

# Contextual classification

_This type of classification is only provided by the `text2vec-contextionary` module, thus can only be used when this module is active in your Weaviate instance._ 

We are going to classify the categories of articles by Contextual classification. No previous links between the articles and categories need to exist yet, we do not need any training data because we let Weaviate use the context of data objects for the classification.

## Start a classification

Make sure you have at least two categories present in your dataset, and that the class `Article` has the property `ofCategory` with a cross-reference to the class `Category`. The `Category` of an Article will be determined by the text content in its summary (`"basedOnProperties"` is set to `["summary"]`).

A classification can be started through one of the clients, or with a direct curl request to the RESTful API.

{% include code/1.x/classification.contextual.post.html %}

A classification is started, and will run in the background. The following response is given after starting the classification, and the status can be fetched via the `v1/classifications/{id}` endpoint.

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
  "type": "text2vec-contextionary-contextual"
}
```

## Interpretation of results

If we later want to know to which `Category` a specific `Article` refers to, we can send the following `GET` request to `/v1/objects/{ArticleID}/?include=_classification`, which will return: 

```json
{
    "class": "Article",
    "creationTimeUnix": 1580044437155,
    "id": "c9094d69-d45b-3508-85e5-23445cfb5f9f",
    "_classification": {
        "basedOn": null,
        "classifiedFields": [
            "ofCategory"
        ],
        "completed": "2020-01-26T13:25:34.230Z",
        "id": "853c5eb4-6785-4a95-9a30-9cc70ea21fd8",
        "scope": [
            "ofCategory"
        ]
    },
    "properties": {
        "hasAuthors": [
            {
                "beacon": "weaviate://localhost/18c65463-f425-3bd3-9d8d-548208966f9b"
            },
            {
                "beacon": "weaviate://localhost/b451a0af-4b28-35e0-808a-de7784fbece8"
            },
            {
                "beacon": "weaviate://localhost/16476dca-59ce-395e-b896-050080120cd4"
            }
        ],
        "inPublication": [
            {
                "beacon": "weaviate://localhost/16476dca-59ce-395e-b896-050080120cd4"
            }
        ],
        "ofCategory": [
            {
                "beacon": "weaviate://localhost/8fe49280-5d2e-3d73-9b0f-7b76e2f23c65",
                "_classification": {
                    "meanWinningDistance": 0.20993641018867493
                }
            }
        ],
        "summary": "A New Mexico state senator was reportedly convicted on misdemeanor aggravated drunken driving and reckless driving charges Tuesday -- nearly six months after he rear-ended a driver stopped at a red light in the state. Third, the consequences,” Mark Probasco, a special prosecutor with the state attorney general’s office said, according to The Journal. — Mark Probasco, special prosecutor with New Mexico state attorney general’s officeMartinez originally told officers he had only “a beer or two,” but later admitted he had multiple glasses of wine. The officer who arrested Martinez said the senator was slurring his speech and had alcohol on his breath. CLICK HERE TO GET THE FOX NEWS APPA former Republican state senator in New Mexico was defeated last year after she was convicted for DUI in 2018, The Journal reported.",
        "title": "New Mexico Democrat's DUI conviction could cost him panel chairmanship, state party leaders warn",
        "url": "https://www.foxnews.com/politics/new-mexico-democratic-state-senator-convicted-of-dui-reckless-driving-in-june-crash",
        "wordCount": 377
    }
}
```

`meanWinningDistance` indicates how far the cross-reference lies from the `Article` data object. The higher the number the more certain the classification is right. Note that this number alone doesn't give much information, but you should interpret this number in comparison to other classified `Article`s. There is no `meanDistanceLosing` value; this value is only included in kNN classification because there multiple classes are provided in the training data.

# kNN classification

Imagine you have a property for the popularity of the `Article` by the audience, and you would like to predict the popularity for new articles based on known properties. You can use kNN classification, use the popularity of previous articles and predict the popularity of new articles. First, make sure you have a class `Popularity` with the property `level` in the schema (you need to [add this](../restful-api-references/schema.html#create-a-class) if you use the demo schema). Let's say the `hasPopularity` of an `Article` can be `low`, `medium` or `high`. So the schema should look like this (note: this property is not included in the example schema, so make sure to add this property before doing this classification, see how [here](../restful-api-references/schema.html#add-a-property)). The schema should look like this:

```json
{
  "classes": [{
      "class": "Article",
      "description": "A written text, for example a news article or blog post",
      "properties": [
        ......
        {
          "dataType": [
            "Popularity"
          ],
          "description": "The popularity of the article",
          "name": "hasPopularity"
        },
        ......
      ]
    },
    {
      "class": "Popularity",
      "description": "How popular an article is",
      "properties": [
        {
          "dataType": [
            "string"
          ],
          "description": "The popularity level",
          "name": "level"
        }
      ]
    }]
}
```

Secondly, make sure there is a number of articles present where this property value is set, but also items without a known popularity value. For example, here are three articles, the first two with popularity and the third one without: (with the GraphQL query shown first)

```graphql
{
  Get {
    Article(limit: 3) {
      uuid
      title
      summary
      wordCount
      hasPopularity
    }
    Popularity {
      uuid
      level
    }
  }
}
```

Results in:

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "uuid": "00327619-fdfa-37cd-a003-5d2e66ae2fec",
          "summary": "While businesses are looking to create their own changemaker strategies, charities and non-governmental organisations (NGOs) are carrying on with their day jobs. Consider the wide-reaching activities of Action Against Hunger, an NGO committed to saving children’s lives across almost 50 countries. “Critical to this mission is creating change,” says Matthew White, director of fundraising and communications. “We take an unwanted item, in the form of a bike, and use it to achieve social change. “We try to find and attract the people who want to make a difference,” says White of Action Against Hunger.",
          "title": "From chefs to cyclists: how inspiring charities make a change",
          "wordCount": 908,
          "hasPopularity": [{
            "beacon": "weaviate://localhost/c9a0e53b-93fe-38df-a6ea-4c8ff4501798",
            "href": "/v1/c9a0e53b-93fe-38df-a6ea-4c8ff4501798"
          }]
        },
        {
          "uuid": "373d28fb-1898-313a-893b-5bc77ba061f6",
          "summary": "I love E3 because it’s a great event showcasing what’s ahead for gaming. The Legend of Heroes: Trails of Cold Steel III (PS4)Release: September 24I’ve expressed my admiration for this series more than a few times, because it captures a classic-but-also-not-dated feel. At E3, I was able to see how Cold Steel III is shaping up by going hands-on with the beginning section of the game. If you choose to go in blind, Cold Steel III will feature a guide to catch you up on the previous games. Klei came out at E3 with a new trailer and post detailing the changes and why development is taking longer than expected.",
          "title": "Five RPGs You May Have Overlooked From E3",
          "wordCount": 361,
          "hasPopularity": [{
            "beacon": "weaviate://localhost/aca140a9-ac15-4b0c-a508-85534c4def44",
            "href": "/v1/aca140a9-ac15-4b0c-a508-85534c4def44"
          }]
        },
        {
          "uuid": "8676e36a-8d60-3402-b550-4e792bb9d32f",
          "summary": "On this week's episode of The Game Informer Show, we discuss The Last of Us Part II's recent State of Play where we finally see some uninterrupted gameplay, and we cover the recent reviews of Minecraft Dungeons and Monster Train. You can watch the video above, subscribe and listen to the audio on iTunes or Google Play, listen on SoundCloud, stream it on Spotify, or download the MP3 at the bottom of the page. Our thanks to the talented Super Marcato Bros. for The Game Informer Show's intro song. You can hear more of their original tunes and awesome video game music podcast at their website. The Last of Us Part II State of Play Reactions: 6:32Minecraft Dungeons Review Discussion: 21:39Monster Train: 39:11Community Emails: 51:23",
          "title": "GI Show - The Last of Us Part II State of Play, Minecraft Dungeons, and Monster Train",
          "wordCount": 256,
          "hasPopularity": null
        }], 
      "Popularity": [
        {
          "uuid": "c9a0e53b-93fe-38df-a6ea-4c8ff4501798",
          "level": "low"
        },
        {
          "uuid": "9c6a8314-ab95-4484-b621-d7b5be2ffb29",
          "level": "medium"
        },
        {
          "uuid": "aca140a9-ac15-4b0c-a508-85534c4def44",
          "level": "high"
        }
      ]
    }
  },
  "errors": null
}
```

## Start a kNN classification

A classification can be started through one of the clients, or with a direct `curl` request to the RESTful API.

{% include code/1.x/classification.knn.post.articles.html %}

A classification is started, and will run in the background. The following response is given after starting the classification, and the status can be fetched via the `v1/classifications/{id}` endpoint.

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


## Interpretation of results

Once the classification is finished, let's look at how the third article from the example above is classified. We run the following query:

```bash
curl http://localhost:8080/v1/objects/8676e36a-8d60-3402-b550-4e792bb9d32f?include=classification
```

And get the following result:

```json
{
  "class": "Article",
  "id": "8676e36a-8d60-3402-b550-4e792bb9d32f",
  "schema": {
    "uuid": "8676e36a-8d60-3402-b550-4e792bb9d32f",
    "summary": "On this week's episode of The Game Informer Show, we discuss The Last of Us Part II's recent State of Play where we finally see some uninterrupted gameplay, and we cover the recent reviews of Minecraft Dungeons and Monster Train. You can watch the video above, subscribe and listen to the audio on iTunes or Google Play, listen on SoundCloud, stream it on Spotify, or download the MP3 at the bottom of the page. Our thanks to the talented Super Marcato Bros. for The Game Informer Show's intro song. You can hear more of their original tunes and awesome video game music podcast at their website. The Last of Us Part II State of Play Reactions: 6:32Minecraft Dungeons Review Discussion: 21:39Monster Train: 39:11Community Emails: 51:23",
    "title": "GI Show - The Last of Us Part II State of Play, Minecraft Dungeons, and Monster Train",
    "wordCount": 256,
    "hasPopularity": [{
      "beacon": "weaviate://localhost/aca140a9-ac15-4b0c-a508-85534c4def44",
      "href": "/v1/aca140a9-ac15-4b0c-a508-85534c4def44",
      "_classification": {
        "closestLosingDistance": 0.3898721002312689,
        "closestOverallDistance": 0.1290003538131714,
        "closestWinningDistance": 0.1290003538131714,
        "losingCount": 12,
        "meanLosingDistance": 0.5898721002312689,
        "meanWinningDistance": 0.3290003538131714,
        "overallCount": 50,
        "winningCount": 38
      }
    }]
  }
}
```

You can see that this article is predicted to also get a `"high"` popularity rating. 

This returned information does not only show the values of the properties of the requested `Thing`, but also `_classification` information about how the property values are obtained. If a property value is obtained by user input, not by classification, then the `_classification` fields in the property schema will be `null`.

When a property value of a reference property is filled by classification, then `_classification` information will appear in the `_classification` field of this property. It contains information about winning and losing distances, which gives information about how the reference has been classified. The float numbers are a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. In kNN classification, the classification decision is based on vectors of the classes around a guessed vector. 

- `closestLosingDistance`: The lowest distance of a neighbor in the losing group. Optional. If `k` equals the size of the winning group, there is no losing group.
- `closestOverallDistance`: The lowest distance of any neighbor, regardless of whether they were in the winning or losing group.
- `closestWinningDistance`: Closest distance of a neighbor from the winning group.
- `losingCount`: Size of the losing group, can be 0 if the winning group size equals `k`.
- `meanLosingDistance`: Mean distance of all neighbors from the losing group. Optional. If `k` equals the size of the winning group, there is no losing group.
- `meanWinningDistance`: Mean distance of all neighbors from the winning group.
- `overallCount`: Overall neighbors checked as part of the classification. In most cases this will equal `k`, but could be lower than `k` - for example if not enough data was present.
- `winningCount`: Size of the winning group, a number between 1 and `k`.

For example, if the kNN is set to 3, the closest 3 objects to the computed vector are taken into consideration. Let's say these 3 objects are of 2 different classes, then we classify the data object as the class of the majority. These two objects are "winning", and the other 1 object is "losing" in the classification. The distance of the winning data objects to the computed vector of the 'to be classified' data object is averaged and normalized. The same will be done to the losing data objects (in this case only 1). 

`meanDistanceWinning` and `meanDistanceLosing` are a good indicators if you set the amount of k nearest neighbors right. For example if the `meanDistanceLosing` is way smaller than the `meanDistanceWinning`, than the set k values was too high because many their where many classifications to the same, but far group, and only one or a few classifications to a near group. Less abstract, this means that the 'to be classified' property is classified as a class that many other -not so similar- data objects have (winning but far away), and not as class of, losing, more similar data objects because they were in minority. In this case, the kNN was perhaps set too high, and a lower amount of kNN might lead to better classification.

Then, additional classification information about the classification of this data object is shown in the last `_classification` field on a higher level.

## Tips and Best Practices

### Training Data

- The more training data, the higher the performance of the classification. There is no rule for a minimum amount of training data, but the more the better (and more computationally intensive). The amount of training data can roughly be chosen by the amount of features n, using the formula: 1e[1, 2]+n.
- In addition, the training data should be representative for the data to be classified. The model should have relevant information to learn from. For example, it is hard to classify data for persons of age 60-70 when all persons in the training data are 18-25 years old.

### Optimal Value for kNN

There is no one optimal value for kNN. The optimal value is different for every classification problem, and depends on a lot of factors. There are however some tips to find a good k value:
- Large k values will result in classification to the most probably class around in a large space, which also makes it more computationally intensive.
- Small k values will result in a more unstable classification. Small changes in the training set and noise will result in large changes in classification.
- k is usually chosen not too high. This depends also on the amount of classes. A good start is taking k between 3 and 7 (3 <= k <=7).
- Check the distanceWinning and distanceLosing values of individual classified data objects. If distanceWinning is way larger than distanceLosing, then the k could be set too high. k can be optimized just like every other hyper parameter in other ML-algorithms just by plotting the overall validation error against k.

# More resources

{% include docs-support-links.html %}