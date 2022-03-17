---
layout: layout-documentation
solution: weaviate
sub-menu: RESTful API references
title: /v1/contextionary
intro: Weaviate has a Contextionary endpoint which you can call to see how it indexed words and concepts. All contextionary functionality is consolidated inside Weaviate itself, which means that in practice you will probably not need this end-point often. Read <a href="../index.html#about-the-contextionary">here</a> about the Contextionary itself.
description: RESTful API contextionary reference
tags: ['RESTful API', 'references', 'contextionary']
menu-order: 5
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Find concepts

To find concepts or to check if a concept is part of the Contextionary, use the `v1/c11y/concepts/{concept}` endpoint. 

```js
GET /v1/c11y/concepts/{concept}
```

## Parameters 

The only parameter `concept` is a string that should be camelCased in case of compound words or a list of words.

## Response

The result contains the following fields:
- `"individualWords"`: a list of the results of individual words or concepts in the query, which contains:
  - `"word"`: a string of requested concept or single word from the concept.
  - `"inc11y"`: a boolean value which is `true` if the word exists in the Contextionary.
  - `"info"`: an object with the following fields:
    - `""nearestNeighbors"`: a list with the nearest neighbors, containing `"word"` and `"distance"` (between the two words in the high dimensional space). Note that `"word"` can also be a data object.
    - `"vector"`: the raw 300-long vector value.
  - `"concatenatedWord"`: an object of the concatenated concept.
    - `"concatenatedWord"`: the concatenated word if the concept given is a camelCased word.
      - `"singleWords"`: a list of the single words in the concatenated concept.
      - `"concatenatedVector"`: a list of vector values of the concatenated concept.
      - `"concatenatedNearestNeighbors"`: a list with the nearest neighbors, containing `"word"` and `"distance"` (between the two words in the high dimensional space). Note that `"word"` can also be a data object.

## Example

```bash
$ curl http://localhost:8080/v1/c11y/concepts/magazine
```

or (note the camelCased compound concept)

{% include code/0.23.2/contextionary.get.html %}

with a result similar to:

```json
  {
    "individualWords": [
    {
      "inC11y": true,
      "info": {
        "nearestNeighbors": [
          {
            "word": "magazine"
          },
          {
            "distance": 6.186641,
            "word": "editorial"
          },
          {
            "distance": 6.372504,
            "word": "featured"
          },
          {
            "distance": 6.5303316,
            "word": "$THING[Author][wroteArticles]"
          },
          {
            "distance": 6.5695524,
            "word": "editor"
          },
          {
            "distance": 6.650517,
            "word": "$THING[Article][inPublication]"
          },
          {
            "distance": 6.650517,
            "word": "$THING[Publication]"
          },
          {
            "distance": 6.8729796,
            "word": "$THING[Publication][hasArticles]"
          },
          {
            "distance": 7.0328364,
            "word": "titled"
          },
          {
            "distance": 7.074667,
            "word": "$THING[Article]"
          },
          {
            "distance": 7.285883,
            "word": "$THING[Article][publicationDate]"
          },
          {
            "distance": 7.322008,
            "word": "$THING[Author][writesFor]"
          }
        ],
        "vector": [
          0.136228,
          0.706469,
          -0.073645,
          -0.099225,
          0.830348,
          -0.896751,
          -0.395334,
          -0.338626,
          0.437708,
          0.001814,
          0.016644,
          -0.259084,
          0.281939,
          0.282507,
          0.129305,
          0.446831,
          -0.297152,
          -0.105699,
          -0.103019,
          0.23948,
          0.358218,
          -0.374248,
          -0.156149,
          0.416975,
          -0.099525,
          -0.972953,
          0.258969,
          -0.336424,
          -0.337513,
          0.172059,
          0.271496,
          0.734914,
          0.055282,
          -0.236813,
          0.083581,
          -0.380738,
          -0.621469,
          -0.105689,
          0.716652,
          1.641311,
          0.076495,
          -0.309569,
          0.049364,
          -0.797213,
          -0.364949,
          -0.500907,
          0.073124,
          -0.104126,
          -0.629249,
          0.571453,
          0.550948,
          0.144231,
          -0.100571,
          -0.734452,
          0.207717,
          0.960031,
          0.767588,
          0.135727,
          -0.034963,
          0.056873,
          -0.625924,
          -0.330995,
          -0.750013,
          -0.10981,
          -0.601715,
          0.01076,
          0.239239,
          0.716999,
          0.191226,
          0.159125,
          0.350562,
          -0.404012,
          0.336247,
          -0.540481,
          0.120554,
          0.298492,
          -0.371188,
          0.651955,
          -0.01739,
          -0.123553,
          -0.519555,
          -0.834056,
          -0.486623,
          0.226866,
          0.616432,
          -0.242877,
          0.279941,
          0.852189,
          0.155107,
          0.241262,
          -0.103252,
          -0.098675,
          0.363005,
          -1.074764,
          -0.017652,
          0.015699,
          -0.68536,
          0.358582,
          -0.190551,
          -0.302208,
          -0.756121,
          0.512399,
          1.805397,
          0.043123,
          -0.129376,
          -0.253351,
          -0.58588,
          -0.467553,
          0.030759,
          -0.429552,
          -0.628443,
          -0.580086,
          -0.486304,
          -0.311783,
          -0.42294,
          -0.088366,
          -0.150181,
          0.237042,
          -0.190551,
          -0.378961,
          0.563204,
          0.067163,
          -0.11984,
          0.719704,
          -0.400095,
          -0.178095,
          1.51889,
          -0.115319,
          -0.061856,
          0.178512,
          0.038878,
          -0.483936,
          0.487863,
          -0.618874,
          -0.500294,
          0.506515,
          -0.197788,
          -0.535904,
          -0.416068,
          0.435814,
          -0.157955,
          0.730488,
          -0.376821,
          -0.700997,
          0.441348,
          1.142319,
          -0.272257,
          0.15176,
          -0.364503,
          0.013976,
          0.065792,
          0.80366,
          -0.427695,
          0.667628,
          -0.203241,
          0.908883,
          0.268001,
          0.218844,
          -0.964646,
          -0.187558,
          -0.850241,
          0.0887,
          -0.599756,
          0.132604,
          0.049908,
          0.58669,
          0.042443,
          -0.266629,
          -0.777091,
          -0.205454,
          -0.124512,
          0.583544,
          -0.446545,
          0.17361,
          -0.620022,
          -0.492219,
          0.036429,
          0.245911,
          -0.427108,
          0.060847,
          -0.014927,
          -0.548004,
          0.326441,
          0.369237,
          -0.310094,
          -0.102851,
          -0.664929,
          0.385731,
          -0.524116,
          0.209743,
          0.393396,
          0.064145,
          0.087546,
          0.361317,
          -0.196167,
          0.066169,
          -1.223607,
          -0.369251,
          0.55579,
          -0.6023,
          -0.495012,
          -0.070049,
          0.193944,
          0.465059,
          -0.745055,
          0.520251,
          0.292625,
          0.299982,
          0.205501,
          -0.197078,
          -1.022894,
          -0.020653,
          -0.571225,
          0.122768,
          -0.420876,
          0.678002,
          0.586356,
          -0.1083,
          -0.138343,
          0.224338,
          -0.431189,
          0.67149,
          0.401214,
          0.201543,
          0.399037,
          -0.108788,
          -0.37109,
          0.348356,
          0.068564,
          0.760624,
          -1.030066,
          -0.220006,
          -0.231769,
          0.539633,
          0.400064,
          -0.333482,
          0.510455,
          0.673163,
          -0.253779,
          0.186304,
          -0.181551,
          -0.233692,
          0.419762,
          0.239765,
          0.87592,
          0.76062,
          -0.511285,
          -0.115212,
          0.433225,
          -0.804431,
          0.287684,
          0.843477,
          -0.431451,
          0.537866,
          0.317895,
          0.153375,
          -0.197555,
          -0.031119,
          0.000403,
          -0.131599,
          -0.129011,
          0.057677,
          0.334938,
          0.417842,
          0.781403,
          0.456796,
          0.361887,
          -0.134389,
          -0.957669,
          -0.536856,
          -0.093217,
          0.090405,
          -0.079852,
          -0.1583,
          -0.667027,
          0.458422,
          -0.184301,
          0.082993,
          0.703865,
          0.734988,
          -0.277995,
          -0.552016,
          0.63041,
          -0.425513,
          0.401534,
          -0.977696,
          -0.27064,
          0.14974,
          0.146499,
          0.520265,
          -0.681408,
          -0.370357,
          0.490221,
          -0.243908,
          0.011698,
          -0.030081,
          -0.046309,
          0.496247,
          -0.142687,
          0.426901
        ]
      },
      "word": "magazine"
    }
  ]
}
```

# Extending the Contextionary

Custom words or abbreviations (i.e., "concepts") can be added to Weaviate directly by extending the Contextionary. Using this endpoint will enrich the Contextionary with your own words, abbreviations or concepts in context by [transfer learning](https://en.wikipedia.org/wiki/Transfer_learning). Using the `v1/c11y/extensions/` endpoint teaches Weaviate the new concepts real-time. You can also overwrite concepts with this endpoint. Note that you need to learn Weaviate the new concepts before adding data.

## Parameters
A body (in JSON or YAML) with the extension word or abbreviation you want to add to the Contextionary with the following fields:
- `"concept"`: a string with the word, compound word or abbreviation
- `"definition"`: a clear description of the concept, which will be used to create the context of the concept and place it in the high dimensional Contextionary space.
- `"weight"`: a float with the relative weight of the concept (default concepts in the Contextionary have a weight of 1.0)

## Response
The same fields as the input parameters will be in the response body if the extension was successful.

## Example
Let's add the concept `"buried lede" to the Contextionary. 

{% include code/0.23.2/contextionary.extensions.html %}


You can always check if the new concept exists in the Contextionary:

```bash
curl http://localhost:8080/v1/c11y/concepts/buriedLede
```

You can also overwrite current concepts with this endpoint. Let's say you are using the abbreviation `API` for `Academic Performance Index` instead of `Application Programming Interface`, and you want to reposition this concept in the Contextionary:

```bash
$ curl \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "concept": "api",
    "definition": "Academic Performance Index",
    "weight": 1
  }' \
  http://localhost:8080/v1/c11y/extensions
```

The meaning of the concept `API` has now changed in your Weaviate setting. 

# More Resources

{% include docs-support-links.html %}