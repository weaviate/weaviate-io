---
title: Search operators
sidebar_position: 20
image: og/docs/api.jpg
# tags: ['graphql', 'search operators']
---


import TryEduDemo from '/_includes/try-on-edu-demo.mdx';

<TryEduDemo />


## Overview

This page covers the search operators that can be used in queries, such as vector search operators (`nearText`, `nearVector`, `nearObject`, etc), keyword search operator (`bm25`), hybrid search operator (`hybrid`).

Only one search operator can be added to queries on the collection level.

## Operator availability

### Built-in operators

These operators are available in all Weaviate instances regardless of configuration.

* [nearVector](#nearvector)
* [nearObject](#nearobject)
* [hybrid](#hybrid)
* [bm25](#bm25)

### Module-specific operators

Module-specific search operators are made available in certain Weaviate modules.

By adding relevant modules, you can use the following operators:
* [nearText](#neartext)
* [Multimodal search](#multimodal-search)
* [ask](#ask)


## Vector search operators

`nearXXX` operators allow you to find data objects based on their vector similarity to the query. They query can be a raw vector (`nearVector`) or an object UUID (`nearObject`).

If the appropriate vectorizer model is enabled, a text query (`nearText`), an image (`nearImage`), or another media input may be be used as the query.

All vector search operators can be used with a `certainty` or `distance` threshold specified, as well as a [`limit` operator](./additional-operators.md#limit-argument) or an [`autocut` operator](./additional-operators.md#autocut) to specify the desired similarity or distance between the query and the results


### nearVector

`nearVector` finds data objects closest to an input vector.

#### Variables

| Variable | Required | Type | Description |
| --- | --- | --- | --- |
| `vector` | yes | `[float]` | This variable takes a vector embedding in the form of an array of floats. The array should have the same length as the vectors in this collection. |
| `distance` | no | `float` | The maximum allowed distance to the provided search input. Cannot be used together with the `certainty` variable. The interpretation of the value of the distance field depends on the [distance metric used](/developers/weaviate/config-refs/distances.md). |
| `certainty` | no | `float` | Normalized Distance between the result item and the search vector. Normalized to be between 0 (perfect opposite) and 1 (identical vectors). Can't be used together with the `distance` variable. |

#### Example

import GraphQLFiltersNearVector from '/_includes/code/graphql.filters.nearVector.mdx';

<GraphQLFiltersNearVector/>


### nearObject

`nearVector` finds data objects closest to an existing object in the same collection. The object is typically specified by its UUID.

* Note: You can specify an object's `id` or `beacon` in the argument, along with a desired `certainty`.
* Note that the first result will always be the object used for search.

#### Variables

| Variable | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `id` | yes | `UUID` | Data object identifier in the uuid format. |
| `beacon` | no | `url` | Data object identifier in the beacon URL format. E.g., `weaviate://<hostname>/<kind>/id`. |
| `distance` | no | `float` | The maximum allowed distance to the provided search input. Cannot be used together with the `certainty` variable. The interpretation of the value of the distance field depends on the [distance metric used](/developers/weaviate/config-refs/distances.md). |
| `certainty` | no | `float` | Normalized Distance between the result item and the search vector. Normalized to be between 0 (perfect opposite) and 1 (identical vectors). Can't be used together with the `distance` variable. |

#### Example

import GraphQLFiltersNearObject from '/_includes/code/graphql.filters.nearObject.mdx';

<GraphQLFiltersNearObject/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "_additional": {
            "distance": -1.1920929e-07
          },
          "name": "The New York Times Company"
        },
        {
          "_additional": {
            "distance": 0.059879005
          },
          "name": "New York Times"
        },
        {
          "_additional": {
            "distance": 0.09176409
          },
          "name": "International New York Times"
        },
        {
          "_additional": {
            "distance": 0.13954824
          },
          "name": "New Yorker"
        },
        ...
      ]
    }
  }
}
```

</details>



### nearText

The `nearText` operator finds data objects based on their vector similarity to a natural language query.

This operator is enabled if a compatible vectorizer module is configured for the collection. Compatible vectorizer modules are:

* Any `text2vec` module
* Any `multi2vec` module


#### Variables

| Variable | Required | Type | Description |
| --- | --- | --- | --- |
| `concepts` | yes | `[string]` | An array of strings that can be natural language queries, or single words. If multiple strings are used, a centroid is calculated and used. Learn more about how the concepts are parsed [here](#concept-parsing). |
| `distance` | no | `float` | The maximum allowed distance to the provided search input. Cannot be used together with the `certainty` variable. The interpretation of the value of the distance field depends on the [distance metric used](/developers/weaviate/config-refs/distances.md). |
| `certainty` | no | `float` | Normalized Distance between the result item and the search vector. Normalized to be between 0 (perfect opposite) and 1 (identical vectors). Can't be used together with the `distance` variable. |
| `autocorrect` | no | `boolean` | Autocorrect input text values. Requires the [`text-spellcheck` module](../../modules/other-modules/spellcheck.md) to be present & enabled.  |
| `moveTo` | no | `object{}` | Move your search term closer to another vector described by keywords |
| `moveTo{concepts}`| no | `[string]` | An array of strings - natural language queries or single words. If multiple strings are used, a centroid is calculated and used. |
| `moveTo{objects}`| no | `[UUID]` | Object IDs to move the results to. This is used to "bias" NLP search results into a certain direction in vector space. |
| `moveTo{force}`| no | `float` | The force to apply to a particular movement. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible. |
| `moveAwayFrom` | no | `object{}` | Move your search term away from another vector described by keywords |
| `moveAwayFrom{concepts}`| no | `[string]` | An array of strings - natural language queries or single words. If multiple strings are used, a centroid is calculated and used. |
| `moveAwayFrom{objects}`| no | `[UUID]` | Object IDs to move the results from. This is used to "bias" NLP search results into a certain direction in vector space. |
| `moveAwayFrom{force}`| no | `float` | The force to apply to a particular movement. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible. |

#### Example I

This example shows an example usage the `nearText` operator, including how to bias results towards another search query.

import GraphQLFiltersNearText from '/_includes/code/graphql.filters.nearText.mdx';

<GraphQLFiltersNearText/>

#### Example II

You can also bias results toward other data objects. For example, in this query, we move our query about "travelling in asia", towards an article on food.

import GraphQLFiltersNearText2Obj from '/_includes/code/graphql.filters.nearText.2obj.mdx';

<GraphQLFiltersNearText2Obj/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "certainty": 0.9619976580142975
          },
          "summary": "We've scoured the planet for what we think are 50 of the most delicious foods ever created. A Hong Kong best food, best enjoyed before cholesterol checks. When you have a best food as naturally delicious as these little fellas, keep it simple. Courtesy Matt@PEK/Creative Commons/FlickrThis best food Thai masterpiece teems with shrimp, mushrooms, tomatoes, lemongrass, galangal and kaffir lime leaves. It's a result of being born in a land where the world's most delicious food is sold on nearly every street corner.",
          "title": "World food: 50 best dishes"
        },
        {
          "_additional": {
            "certainty": 0.9297388792037964
          },
          "summary": "The look reflects the elegant ambiance created by interior designer Joyce Wang in Hong Kong, while their mixology program also reflects the original venue. MONO Hong Kong , 5/F, 18 On Lan Street, Central, Hong KongKoral, The Apurva Kempinski Bali, IndonesiaKoral's signature dish: Tomatoes Bedugul. Esterre at Palace Hotel TokyoLegendary French chef Alain Ducasse has a global portfolio of restaurants, many holding Michelin stars. John Anthony/JW Marriott HanoiCantonese cuisine from Hong Kong is again on the menu, this time at the JW Marriott in Hanoi. Stanley takes its name from the elegant Hong Kong waterside district and the design touches reflect this legacy with Chinese antiques.",
          "title": "20 best new Asia-Pacific restaurants to try in 2020"
        }
        ...
      ]
    }
  }
}
```

</details>

#### Additional information

##### Concept parsing

A `nearText` query will interpret each term in an array input as distinct strings to be vectorized. If multiple strings are passed, the query vector will be an average vector of the individual string vectors.

- `["New York Times"]` = one vector position is determined based on the occurrences of the words
- `["New", "York", "Times"]` = all concepts have a similar weight.
- `["New York", "Times"]` = a combination of the two above.

A practical example would be: `concepts: ["beatles", "John Lennon"]`

##### Semantic Path

* Only available in `txt2vec-contextionary` module

The semantic path returns an array of concepts from the query to the data object. This allows you to see which steps Weaviate took and how the query and data object are interpreted.

| Property | Description |
| --- | --- |
| `concept` | the concept that is found in this step. |
| `distanceToNext` | the distance to the next step (null for the last step). |
| `distanceToPrevious` | this distance to the previous step (null for the first step). |
| `distanceToQuery` | the distance of this step to the query. |
| `distanceToResult` | the distance of the step to this result. |

_Note: Building a semantic path is only possible if a [`nearText: {}` operator](#neartext) is set as the explore term represents the beginning of the path and each search result represents the end of the path. Since `nearText: {}` queries are currently exclusively possible in GraphQL, the `semanticPath` is therefore not available in the REST API._

Example: showing a semantic path without edges.

import GraphQLUnderscoreSemanticpath from '/_includes/code/graphql.underscoreproperties.semanticpath.mdx';

<GraphQLUnderscoreSemanticpath/>


### Multimodal search

Depending on the vectorizer module, you can use additional modalities such as images, audio, or video as the query, and retrieve corresponding, compatible objects.

Some modules, such as `multi2vec-clip` and `multi2vec-bind` allow you to search across modalities. For example, you can search for images using a text query, or search for text using an image query.

Please refer to specific module pages such as:

* [img2vec-neural](../../modules/retriever-vectorizer-modules/img2vec-neural.md#nearimage)
* [multi2vec-clip](../../modules/retriever-vectorizer-modules/multi2vec-clip.md#additional-search-operators)
* [multi2vec-bind](../../modules/retriever-vectorizer-modules/multi2vec-bind.md#additional-search-operators)


## hybrid

This operator allows you to combine [BM25](#bm25) and vector search to get a "best of both worlds" type search results set.

### Variables

| Variables    | Required | Type       | Description                                                                 |
|--------------|----------|------------|-----------------------------------------------------------------------------|
| `query`      | yes      | `string`   | search query                                                                |
| `alpha`      | no       | `float`    | weighting for each search algorithm, default 0.75                           |
| `vector`     | no       | `[float]`  | optional to supply your own vector                                          |
| `properties` | no       | `[string]` | list of properties to limit the BM25 search to, default all text properties |
| `fusionType` | no       | `string` | the type of hybrid fusion algorithm (available from `v1.20.0`)              |

* Notes:
    * `alpha` can be any number from 0 to 1, defaulting to 0.75.
        * `alpha` = 0 forces using a pure **keyword** search method (BM25)
        * `alpha` = 1 forces using a pure **vector** search method
        * `alpha` = 0.5 weighs the BM25 and vector methods evenly
    * `fusionType` can be `rankedFusion` or `relativeScoreFusion`
        * `rankedFusion` (default) adds inverted ranks of the BM25 and vector search methods
        * `relativeScoreFusion` adds normalized scores of the BM25 and vector search methods

### Fusion algorithms

#### Ranked fusion

The `rankedFusion` algorithm is Weaviate's original hybrid fusion algorithm.

In this algorithm, each object is scored according to its position in the results for that search (vector or keyword). The top-ranked objects in each search get the highest scores. Scores decrease going from top to least ranked. The total score is calculated by adding the rank-based scores from the vector and keyword searches.

#### Relative score fusion

New in Weaviate version 1.20.

In `relativeScoreFusion` the vector search and keyword search scores are scaled between `0` and `1`. The highest raw score becomes `1` in the scaled scores. The lowest value is assigned `0`. The remaining values are ranked between `0` and `1`. The total score is a scaled sum of the normalized vector similarity and normalized BM25 scores.

<details>
  <summary>Fusion scoring comparison</summary>

This example uses a small search result set to compare the ranked fusion and relative fusion algorithms. The table shows the following information:

- `document id`, from 0 to 4
- `keyword score`, sorted
- `vector search score`, sorted

<table>
  <tr>
    <th>Search Type</th>
    <th>(id): score</th><th>(id): score</th><th>(id): score</th><th>(id): score</th><th>(id): score</th>
  </tr>
  <tr>
    <td>Keyword</td>
    <td>(1): 5</td><td>(0): 2.6</td><td>(2): 2.3</td><td>(4): 0.2</td><td>(3): 0.09</td>
  </tr>
  <tr>
    <td>Vector</td>
    <td>(2): 0.6</td><td>(4): 0.598</td><td>(0): 0.596</td><td>(1): 0.594</td><td>(3): 0.009</td>
  </tr>
</table>

The ranking algorithms use these scores to derive the hybrid ranking.

#### Ranked Fusion

The score depends on the rank of the result. The score is equal to `1/(RANK + 60)`:

<table>
  <tr>
    <th>Search Type</th>
    <th>(id): score</th><th>(id): score</th><th>(id): score</th><th>(id): score</th><th>(id): score</th>
  </tr>
  <tr>
    <td>Keyword</td>
    <td>(1): 0.0154</td><td>(0): 0.0160</td><td>(2): 0.0161</td><td>(4): 0.0167</td><td>(3): 0.0166</td>
  </tr>
  <tr>
    <td>Vector</td>
    <td>(2): 0.016502</td><td>(4): 0.016502</td><td>(0): 0.016503</td><td>(1): 0.016503</td><td>(3): 0.016666</td>
  </tr>
</table>

As you can see, the results of each rank is identical, regardless of the input score.

#### Relative Score Fusion

Here, we normalize the scores – the largest score is set to 1 and the lowest to 0, and all entries in-between are scaled according to their **relative distance** to the **maximum** and **minimum values**.

<table>
  <tr>
    <th>Search Type</th>
    <th>(id): score</th><th>(id): score</th><th>(id): score</th><th>(id): score</th><th>(id): score</th>
  </tr>
  <tr>
    <td>Keyword</td>
    <td>(1): 1.0</td><td>(0): 0.511</td><td>(2): 0.450</td><td>(4): 0.022</td><td>(3): 0.0</td>
  </tr>
  <tr>
    <td>Vector</td>
    <td>(2): 1.0</td><td>(4): 0.996</td><td>(0): 0.993</td><td>(1): 0.986</td><td>(3): 0.0</td>
  </tr>
</table>

Here, the scores reflect the relative distribution of the original scores. For example, the vector search scores of the first 4 documents were almost identical, which is still the case for the normalized scores.

#### Weighting & final scores

Before adding these scores up, they are weighted according to the alpha parameter. Let’s assume `alpha=0.5`, meaning both search types contribute equally to the final result and therefore each score is multiplied by 0.5.

Now, we can add the scores for each document up and compare the results from both fusion algorithms.

<table>
  <tr>
    <th>Algorithm Type</th>
    <th>(id): score</th><th>(id): score</th><th>(id): score</th><th>(id): score</th><th>(id): score</th>
  </tr>
  <tr>
    <td>Ranked</td>
    <td>(2): 0.016301</td><td>(1): 0.015952</td><td>(0): 0.015952</td><td>(4): 0.016600</td><td>(3): 0.016630</td>
  </tr>
  <tr>
    <td>Relative</td>
    <td>(1): 0.993</td><td>(0): 0.752</td><td>(2): 0.725</td><td>(4): 0.509</td><td>(3): 0.0</td>
  </tr>
</table>

#### What can we learn from this?

For the vector search, the scores for the top 4 objects (**IDs 2, 4, 0, 1**) were almost identical, and all of them were good results. While for the keyword search, one object (**ID 1**) was much better than the rest.

This is captured in the final result of `relativeScoreFusion`, which identified the object **ID 1** the top result. This is justified because this document was the best result in the keyword search with a big gap to the next-best score and in the top group of vector search.

In contrast, for `rankedFusion`, the object **ID 2** is the top result, closely followed by objects **ID 1** and **ID 0**.

</details>

For a fuller discussion of fusion methods, see [this blog post](/blog/hybrid-search-fusion-algorithms)

### Additional metadata response

Hybrid search results are sorted by a score, derived as a fused combination of their BM25F score and `nearText` similarity (higher is more relevant). This `score`, and additionally the `explainScore` metadata can be optionally retrieved in the response.


### Example

import GraphQLFiltersHybrid from '/_includes/code/graphql.filters.hybrid.mdx';

<GraphQLFiltersHybrid/>

### Example with vector specified

You can optionally supply the vector query to the `vector` variable. This will override the `query` variable for the vector search component of the hybrid search.

import GraphQLFiltersHybridVector from '/_includes/code/graphql.filters.hybrid.vector.mdx';

<GraphQLFiltersHybridVector/>

### Hybrid with a conditional filter

:::info Added in `v1.18.0`
:::

A [conditional (`where`) filter](../graphql/filters.md#where-filter) can be used with `hybrid`.

import GraphQLFiltersHybridFilterExample from '/_includes/code/graphql.filters.hybrid.filter.example.mdx';

<GraphQLFiltersHybridFilterExample/>


### Specify object properties for BM25 search

:::info Added in `v1.19`
:::

A `hybrid` operator can accept an array of strings to limit the set of properties for the BM25 component of the search. If unspecified, all text properties will be searched.

import GraphQLFiltersHybridProperties from '/_includes/code/graphql.filters.hybrid.properties.mdx';

<GraphQLFiltersHybridProperties/>

### Oversearch with `relativeScoreFusion`

:::info Added in `v1.21`
:::

When `relativeScoreFusion` is used as the `fusionType` with a small search `limit`, a result set can be very sensitive to the limit parameter due to the normalization of the scores.

To mitigate this effect, Weaviate automatically performs a search with a higher limit (100) and then trims the results down to the requested limit.


## BM25

The `bm25` operator performs a keyword (sparse vector) search, and uses the BM25F ranking function to score the results. BM25F (**B**est **M**atch **25** with Extension to Multiple Weighted **F**ields) is an extended version of BM25 that applies the scoring algorithm to multiple fields (`properties`), producing better results.

The search is case-insensitive, and case matching does not confer a score advantage. Stop words are removed. [Stemming is not supported yet](https://github.com/weaviate/weaviate/issues/2439).

### Schema configuration

The [free parameters `k1` and `b`](https://en.wikipedia.org/wiki/Okapi_BM25#The_ranking_function) are configurable and optional. See the [schema reference](../../config-refs/schema/index.md#invertedindexconfig--bm25) for more details.

### Variables
The `bm25` operator supports the following variables:

| Variables | Required | Description |
| --------- | -------- | ----------- |
| `query`   | yes      | The keyword search query. |
| `properties` | no    | Array of properties (fields) to search in, defaulting to all properties in the collection. |

:::info Boosting properties
Specific properties can be boosted by a factor specified as a number after the caret sign, for example `properties: ["title^3", "summary"]`.
:::

### Additional metadata response

The BM25F `score` metadata can be optionally retrieved in the response. A higher score indicates higher relevance.

### Example query

import GraphQLFiltersBM25 from '/_includes/code/graphql.filters.bm25.mdx';

<GraphQLFiltersBM25/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "certainty": null,
            "distance": null,
            "score": "3.4985464"
          },
          "title": "Tim Dowling: is the dog’s friendship with the fox sweet – or a bad omen?"
        }
      ]
    }
  },
  "errors": null
}
```

</details>

### BM25 with a conditional filter

:::info Added in `v1.18`
:::

A [conditional (`where`) filter](../graphql/filters.md#where-filter) can be used with `bm25`.

import GraphQLFiltersBM25FilterExample from '/_includes/code/graphql.filters.bm25.filter.example.mdx';

<GraphQLFiltersBM25FilterExample/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "summary": "Sometimes, the hardest part of setting a fishing record is just getting the fish weighed. A Kentucky fisherman has officially set a new record in the state after reeling in a 9.05-pound saugeye. While getting the fish in the boat was difficult, the angler had just as much trouble finding an officially certified scale to weigh it on. In order to qualify for a state record, fish must be weighed on an officially certified scale. The previous record for a saugeye in Kentucky ws an 8 pound, 8-ounce fish caught in 2019.",
          "title": "Kentucky fisherman catches record-breaking fish, searches for certified scale"
        },
        {
          "summary": "Unpaid last month because there wasn\u2019t enough money. Ms. Hunt picks up shifts at JJ Fish & Chicken, bartends and babysits. three daughters is subsidized,and cereal fromErica Hunt\u2019s monthly budget on $12 an hourErica Hunt\u2019s monthly budget on $12 an hourExpensesIncome and benefitsRent, $775Take-home pay, $1,400Varies based on hours worked. Daycare, $600Daycare for Ms. Hunt\u2019s three daughters is subsidized, as are her electricity and internet costs. Household goods, $300Child support, $350Ms. Hunt picks up shifts at JJ Fish & Chicken, bartends and babysits to make more money.",
          "title": "Opinion | What to Tell the Critics of a $15 Minimum Wage"
        },
        ...
      ]
    }
  }
}

```

</details>


## ask

Enabled by the module: [Question Answering](/developers/weaviate/modules/reader-generator-modules/qna-transformers.md).

This operator allows you to return answers to questions by running the results through a Q&A model.

### Variables

| Variable | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `question` 	| yes	| `string` | The question to be answered. |
| `certainty` | no 	| `float` | Desired minimal certainty or confidence of answer to the question. The higher the value, the stricter the search becomes. The lower the value, the fuzzier the search becomes. If no certainty is set, any answer that could be extracted will be returned. |
| `properties`	| no 	| `[string]` | The properties of the queries collection which contains text. If no properties are set, all are considered.	|
| `rerank` 	| no 	| `boolean`	| If enabled, the qna module will rerank the result based on the answer score. For example, if the 3rd result - as determined by the previous (semantic) search contained the most likely answer, result 3 will be pushed to position 1, etc. *Supported since v1.10.0* |

### Example

import QNATransformersAsk from '/_includes/code/qna-transformers.ask.mdx';

<QNATransformersAsk/>

### Additional metadata response

The `answer` and a `certainty` can be retrieved.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
