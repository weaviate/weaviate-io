---
layout: layout-documentation
solution: weaviate
sub-menu: More resources
title: Contextionary
intro: 
tags: ['Contextionary']
menu-order: 3
open-graph-type: article
og-img: documentation.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/about/contextionary.html
    - /documentation/weaviate/current/more-resources/contextionary.html
---

# About the Contextionary

Read about the Contextionary [here](../index.html#about-the-contextionary).

# Manual configuration

When the [standard docker-compose configuration files](https://configuration.semi.technology/docker-compose?), the Contextionary will have some parameters set to default values. In rare cases, your dataset and results might benefit from altering these default values.

## Compound splitting

Sometimes Weaviate's Contextionary does not understand words which are compounded out of words it would otherwise understand. This impact is far greater in languages that allow for arbitrary compounding (such as Dutch or German) than in languages where compounding is not very common (such as English).

### Effect
Imagine you import an object of class `Post` with content `This is a thunderstormcloud`. The arbitrarily compounded word `thunderstormcloud` is not present in the Contextionary. So your object's position will be made up of the only words it recognizes: `"post", "this"` (`"is"` and `"a"` are removed as stopwords).

If you check how this content was vectorized using the `_interpration` feature, you will see something like the following:

```json
"_interpretation": {
  "source": [
    {
      "concept": "post",
      "occurrence": 62064610,
      "weight": 0.3623903691768646
    },
    {
      "concept": "this",
      "occurrence": 932425699,
      "weight": 0.10000000149011612
    }
  ]
}
```

To overcome this limitation the optional **Compound Splitting Feature** can be enabled in the Contextionary. It will understand the arbitrary compounded word and interpret your object as follows:

  ```json
"_interpretation": {
  "source": [
    {
      "concept": "post",
      "occurrence": 62064610,
      "weight": 0.3623903691768646
    },
    {
      "concept": "this",
      "occurrence": 932425699,
      "weight": 0.10000000149011612
    },
    {
      "concept": "thunderstormcloud (thunderstorm, cloud)",
      "occurrence": 5756775,
      "weight": 0.5926488041877747
    }
  ]
}
  ```

Note that the newly found word (made up of the parts `thunderstorm` and `cloud` has the highest weight in the vectorization. So this meaning that would have been lost without Compound Splitting can now be recognized.

### How to enable
You can enable compound splitting in the configuration file of the Contextionary. See how this is done [here](../getting-started/installation.html#docker-compose).

### Trade-Off Import speed vs Word recognition
Compound Splitting runs an any word that is otherwise not recognized. Depending on your dataset this can lead to a significantly longer import time (up to 100% longer). Therefore, you should carefully evaluate whether the higher precision in recognition or the faster import times are more important to your use case. As the benefit is larger in some languages (e.g. Dutch, German) than in others (e.g. English) this feature is turned off by default.

## Noise filtering

So called "noise words" are concatenated words of random words with no easily recognizable meaning. These words are present in the Contextionary training space, but are extremely rare and therefore distributed seemingly randomly. As a consequence, an "ordinary" result of querying features relying on nearest neighbors (`_nearestNeighbors` or `_semanticPath`) might contain such noise words as immediate neighbors.

To combat this noise, a neighbor filtering feature was introduced in the contextionary, which ignores words of the configured bottom percentile - ranked by occurrence in the respective training set. By default this value is set to the bottom 5th percentile. This setting can be overridden. To set another value, e.g. to ignore the bottom 10th percentile, provide the environment variable `NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE=10` to the contextionary container (configuration file).

# API reference

To learn about how the Contextionary has indexed words and concepts, you can use the RESTful Contextionary API endpoint. Read about how to use it [here](../restful-api-references/contextionary.html).

# More resources

{% include docs-support-links.html %}