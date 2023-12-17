---
title: Search operators
sidebar_position: 20
image: og/docs/api.jpg
# tags: ['graphql', 'search operators']
---


import TryEduDemo from '/_includes/try-on-edu-demo.mdx';

<TryEduDemo />

## Setting search operators

Search operators can be added to GraphQL queries on the class level.

For example:

import GraphQLFiltersExample from '/_includes/code/graphql.filters.example.mdx';

<GraphQLFiltersExample/>

## Built-in operators

Built-in search operators are available in all Weaviate instances and don't require any modules.

Weaviate provides the following built-in operators:
* [nearVector](#nearvector)
* [nearObject](#nearobject)
* [hybrid](#hybrid)
* [bm25](#bm25)
* [group](#group)

## Module-specific operators

Module-specific search operators are made available in certain Weaviate modules.

By adding relevant modules, you can use the following operators:
* [nearText](#neartext)
* [ask](#ask)

## nearVector

This operator allows you to find data objects in the vicinity of an input vector. It's supported by the `Get{}` function.

* Note: this argument is different from the [GraphQL `Explore{}` function](./explore.md)
* Note: Cannot use multiple `'near'` arguments, or a `'near'` argument along with an [`'ask'`](/developers/weaviate/modules/reader-generator-modules/qna-transformers.md) operator.

### Variables

| Variable | Required | Type | Description |
| --- | --- | --- | --- |
| `vector` | yes | `[float]` | This variable takes a vector embedding in the form of an array of floats. The array should have the same length as the vectors in this class. |
| `distance` | no | `float` | The maximum allowed distance to the provided search input. Cannot be used together with the `certainty` variable. The interpretation of the value of the distance field depends on the [distance metric used](/developers/weaviate/config-refs/distances.md). |
| `certainty` | no | `float` | Normalized Distance between the result item and the search vector. Normalized to be between 0 (perfect opposite) and 1 (identical vectors). Can't be used together with the `distance` variable. |

### Example

import GraphQLFiltersNearVector from '/_includes/code/graphql.filters.nearVector.mdx';

<GraphQLFiltersNearVector/>

### Additional information

If the distance metric is `cosine` you can also use `certainty` instead of
`distance`. Certainty normalizes the distance in a range of 0..1, where 0
represents a perfect opposite (cosine distance of 2) and 1 represents vectors
with an identical angle (cosine distance of 0). Certainty is not available on
non-cosine distance metrics.

## nearObject

This operator allows you to find data objects in the vicinity of other data objects by UUID. It's supported by the `Get{}` function.

* Note: You cannot use multiple `near<Media>` arguments, or a `near<Media>` argument along with an [`ask`](/developers/weaviate/modules/reader-generator-modules/qna-transformers.md) argument.
* Note: You can specify an object's `id` or `beacon` in the argument, along with a desired `certainty`.
* Note that the first result will always be the object used for search.
* Near object search can also be combined with `text2vec` modules.

### Variables

| Variable | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `id` | yes | `UUID` | Data object identifier in the uuid format. |
| `beacon` | yes | `url` | Data object identifier in the beacon URL format. E.g., `weaviate://<hostname>/<kind>/id`. |
| `distance` | no | `float` | The maximum allowed distance to the provided search input. Cannot be used together with the `certainty` variable. The interpretation of the value of the distance field depends on the [distance metric used](/developers/weaviate/config-refs/distances.md). |
| `certainty` | no | `float` | Normalized Distance between the result item and the search vector. Normalized to be between 0 (perfect opposite) and 1 (identical vectors). Can't be used together with the `distance` variable. |

### Example

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

## hybrid

This operator allows you to combine [BM25](#bm25) and vector search to get the best of both search methods. It's supported by the `Get{}` function.

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

### GraphQL response

The `_additional` property in the GraphQL result exposes the `score`. Results are sorted descending by the score.

```json
{
  "_additional": {
    "score": "0.016390799"
  }
}
```


### Example

import GraphQLFiltersHybrid from '/_includes/code/graphql.filters.hybrid.mdx';

<GraphQLFiltersHybrid/>

### Example with vector operator
If you're providing your own embeddings, you can supply the vector query to the `vector` variable. If Weaviate is handling the vectorization, then you can ignore the `vector` variable and use the example code snippets above.

import GraphQLFiltersHybridVector from '/_includes/code/graphql.filters.hybrid.vector.mdx';

<GraphQLFiltersHybridVector/>

### Hybrid with a conditional filter

:::info Added in `v1.18.0`
:::

A [conditional (`where`) filter](../graphql/filters.md#where-filter) can be used with `hybrid`.

import GraphQLFiltersHybridFilterExample from '/_includes/code/graphql.filters.hybrid.filter.example.mdx';

<GraphQLFiltersHybridFilterExample/>


### Limiting BM25 properties

:::info Added in `v1.19`
:::

A `hybrid` operator can accept a `properties` array of strings that limits the set of properties that will be searched by the BM25 component of the search. If not specified, all text properties will be searched.

In the examples below, the `alpha` parameter is set close to 0 to favor BM25 search, and changing the `properties` from `"question"` to `"answer"` will yield a different set of results.

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
| `properties` | no    | Array of properties (fields) to search in, defaulting to all properties in the class. |

:::info Boosting properties
Specific properties can be boosted by a factor specified as a number after the caret sign, for example `properties: ["title^3", "summary"]`.
:::

### Example query

import GraphQLFiltersBM25 from '/_includes/code/graphql.filters.bm25.mdx';

<GraphQLFiltersBM25/>

### GraphQL response

The `_additional` property in the GraphQL result exposes the score:

```json
{
  "_additional": {
    "score": "5.3201",
    "distance": null,  # always null
    "certainty": null  # always null
  }
}
```

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

## group

You can use a group operator to combine similar concepts (aka _entity merging_). There are two ways of grouping objects with a semantic similarity together.

### Variables

| Variable | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `type` | yes | `string` | You can only show the closest concept (`closest`) or merge all similar entities into one single string (`merge`). |
| `force` | yes | `float` | The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible. |

### Example

import GraphQLFiltersGroup from '/_includes/code/graphql.filters.group.mdx';

<GraphQLFiltersGroup/>

This results in the following. Note that publications `International New York Times`, `The New York Times Company` and `New York Times` are merged. The property values that do not have an exact overlap will all be shown, with the value of the most central concept before the brackets.

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "name": "Fox News"
        },
        {
          "name": "Wired"
        },
        {
          "name": "The New York Times Company (New York Times, International New York Times)"
        },
        {
          "name": "Game Informer"
        },
        {
          "name": "New Yorker"
        },
        {
          "name": "Wall Street Journal"
        },
        {
          "name": "Vogue"
        },
        {
          "name": "The Economist"
        },
        {
          "name": "Financial Times"
        },
        {
          "name": "The Guardian"
        },
        {
          "name": "CNN"
        }
      ]
    }
  }
}
```

</details>

## nearText

Enabled by the modules:
- [text2vec-openai](../../modules/retriever-vectorizer-modules/text2vec-openai.md),
- [text2vec-cohere](../../modules/retriever-vectorizer-modules/text2vec-cohere.md),
- [text2vec-huggingface](../../modules/retriever-vectorizer-modules/text2vec-huggingface.md),
- [text2vec-transformers](../../modules/retriever-vectorizer-modules/text2vec-transformers.md),
- [text2vec-contextionary](../../modules/retriever-vectorizer-modules/text2vec-contextionary.md).
- [text2vec-palm](../../modules/retriever-vectorizer-modules/text2vec-palm.md).
- [multi2vec-clip](../../modules/retriever-vectorizer-modules/multi2vec-clip.md).

This operator allows you to find data objects in the vicinity of the vector representation of a single or multiple concepts. It's supported by the `Get{}` function.

### Variables

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

### Example I

This example shows a basic overview of using the `nearText` operator.

import GraphQLFiltersNearText from '/_includes/code/graphql.filters.nearText.mdx';

<GraphQLFiltersNearText/>

### Example II

You can also bias results toward other data objects' vector representations. For example, in this query, we move our query about "travelling in asia", towards an article on food.

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

### Additional information

#### Distance metrics

If the distance metric is `cosine` you can also use `certainty` instead of
`distance`. Certainty normalizes the distance in a range of 0..1, where 0
represents a perfect opposite (cosine distance of 2) and 1 represents vectors
with an identical angle (cosine distance of 0). Certainty is not available on
non-cosine distance metrics.

#### Concept parsing

Strings written in the concepts array are your fuzzy search terms. An array of concepts is required to set in the Explore query, and all words in this array should be present in the Contextionary.

There are three ways to define the concepts array argument in `nearText`.

- `["New York Times"]` = one vector position is determined based on the occurrences of the words
- `["New", "York", "Times"]` = all concepts have a similar weight.
- `["New York", "Times"]` = a combination of the two above.

A practical example would be: `concepts: ["beatles", "John Lennon"]`

#### Semantic Path

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

## ask

Enabled by the module: [Question Answering](/developers/weaviate/modules/reader-generator-modules/qna-transformers.md).

This operator allows you to return answers to questions by running the results through a Q&A model.

### Variables

| Variable | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `question` 	| yes	| `string` | The question to be answered. |
| `certainty` | no 	| `float` | Desired minimal certainty or confidence of answer to the question. The higher the value, the stricter the search becomes. The lower the value, the fuzzier the search becomes. If no certainty is set, any answer that could be extracted will be returned. |
| `properties`	| no 	| `[string]` | The properties of the queries Class which contains text. If no properties are set, all are considered.	|
| `rerank` 	| no 	| `boolean`	| If enabled, the qna module will rerank the result based on the answer score. For example, if the 3rd result - as determined by the previous (semantic) search contained the most likely answer, result 3 will be pushed to position 1, etc. *Supported since v1.10.0* |

### Example

import QNATransformersAsk from '/_includes/code/qna-transformers.ask.mdx';

<QNATransformersAsk/>

### GraphQL response

The `_additional{}` property is extended with the answer and a certainty of the answer.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
