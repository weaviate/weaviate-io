---
layout: layout-documentation
solution: weaviate
sub-menu: GraphQL references
title: Filters
intro: Filters can be set to order or sort your dataset or to find specific data objects. Some filters are available in multiple functions where others are only available in specific ones. Some filters are only available when specific modules are activated. Check the <a href="../modules/">modules</a> pages, like <a href="../modules/text2vec-contextionary.html#neartext">text2vec-contextionary</a> or <a href="../modules/text2vec-transformers.html#neartext">text2vec-transformers</a> for a nearText filter or <a href="../modules/qna-transformers.html#how-to-use-graphql">qna-transformers</a> for the question answering filter.
description: GraphQL filters
tags: ['graphql', 'filters']
menu-order: 4
open-graph-type: article
og: /img/og/og-documentation/graphql-references-filters.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/query-data/filters.html
    - /documentation/weaviate/current/graphql-references/filters.html
---

# Where filter

## Filter structure

Supported by the `Get{}` and `Aggregate{}` function.

The `where` filter is an [algebraic object](https://en.wikipedia.org/wiki/Algebraic_structure), which takes the following arguments:

- `Operator` (which takes one of the following values)
  - `And`
  - `Or`
  - `Not`
  - `Equal`
  - `NotEqual`
  - `GreaterThan`
  - `GreaterThanEqual`
  - `LessThan`
  - `LessThanEqual`
  - `Like`
  - `WithinGeoRange`
- `Operands`: Is a list of `Operator` objects of this same structure, only used if the parent `Operator` is set to `And` or `Or`.
- `Path`: Is a list of strings indicating the property name of the class. If the property is a beacon (i.e., cross-reference), the path should be followed to the property of the beacon which should be specified as a list of strings.
- `valueInt`: The integer value where the `Path`'s last property name should be compared to.
- `valueBoolean`: The boolean value that the `Path`'s last property name should be compared to.
- `valueString`: The string value that the `Path`'s last property name should be compared to.
- `valueText`: The text value that the `Path`'s last property name should be compared to.
- `valueNumber`: The number (float) value that the `Path`'s last property name should be compared to.
- `valueDate`: The date (ISO 8601 timestamp, formatted as [RFC3339](https://tools.ietf.org/html/rfc3339)) value that the `Path`'s last property name should be compared to.

```graphql
{
  Get {
    <Class>(where: {
        operator: <operator>,
        operands: [{
          path: [path],
          operator: <operator>
          <valueType>: <value>
        }, {
          path: [<matchPath>],
          operator: <operator>,
          <valueType>: <value>
        }]
      }) {
      <propertyWithBeacon> {
        <property>
        ... on <ClassOfWhereBeaconGoesTo> {
          <propertyOfClass>
        }
      }
    }
  }
}
```

### Filter behavior of multi-word queries in `Equal` operator
The behavior for the `Equal` operator on multi-word string and text properties in `where` filters is as follows. Multi-word queries are broken up into single word segments. An object must contain all segments. How words are broken up depends on the datatype. For `string` properties only spaces defined word boundaries. For `text` properties all non-alphanumeric properties are considered word boundaries. E.g. for `text`: `my email is alice@example.com` is split into `["my", "email", "is", "alice" "example", "com"]`, whereas the same query string on a `string` property would be broken into `["my", "email", "is", "alice@example.com"]`.

## Single operand

You can create operator filters by setting the `where` key. You always need to include the GraphQL property path, the operator type, and the valueType plus a value.

For example, this filter selects articles from the class Article with a wordcount higher than 1000.

{% include code/1.x/graphql.filters.where.simple.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28where%3A+%7B%0D%0A++++++++path%3A+%5B%22wordCount%22%5D%2C++++%23+Path+to+the+property+that+should+be+used%0D%0A++++++++operator%3A+GreaterThan%2C++%23+operator%0D%0A++++++++valueInt%3A+1000++++++++++%23+value+%28which+is+always+%3D+to+the+type+of+the+path+property%29%0D%0A++++++%7D%29+%7B%0D%0A++++++title%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Opinion | John Lennon Told Them ‘Girls Don’t Play Guitar.’ He Was So Wrong."
        },
      ]
  },
  "errors": null
} 
```

## Filter by id

You can filter object by their unique id or uuid, where you give the `id` as `valueString`.

{% include code/1.x/graphql.filters.where.id.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28where%3A+%7B%0D%0A++++++++path%3A+%5B%22id%22%5D%2C%0D%0A++++++++operator%3A+Equal%2C%0D%0A++++++++valueString%3A+%22e5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf%22%0D%0A++++++%7D%29+%7B%0D%0A++++++title%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "9 home improvement projects that are easier – and often cheaper – in the winter"
        },
      ]
  },
  "errors": null
} 
```

## Multiple operands

You can set multiple operands by providing an array.

For example, these filters select based on the class Article with a wordCount higher than 1000 and who are published before January 1st 2020. Note that you can filter a date and time just similar to numbers, with the `valueDate` given as `string`. Note that the `valueDate` should be formatted according to standard [RFC3339](https://tools.ietf.org/html/rfc3339).

{% include code/1.x/graphql.filters.where.operands.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28where%3A+%7B%0D%0A++++++operator%3A+And%2C%0D%0A++++++operands%3A+%5B%7B%0D%0A++++++++++path%3A+%5B%22wordCount%22%5D%2C%0D%0A++++++++++operator%3A+GreaterThan%2C%0D%0A++++++++++valueInt%3A+1000%0D%0A++++++++%7D%2C+%7B%0D%0A++++++++++path%3A+%5B%22wordCount%22%5D%2C%0D%0A++++++++++operator%3A+LessThan%2C%0D%0A++++++++++valueInt%3A+1500%0D%0A++++++++%7D%5D%0D%0A++++++%7D%29+%7B%0D%0A++++++title%0D%0A++++++wordCount%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## Like operator

Using the `Like` operator allows you to do string searches based on partial match. The capabilities of this operator are:

- `?` -> exactly one unknown character
  - `car?` matches `cart`, `care`, but not `car`
- `*` -> zero, one or more unknown characters
  - `car*` matches `car`, `care`, `carpet`, etc
  - `*car*` matches `car`, `healthcare`, etc.

{% include code/1.x/graphql.filters.where.like.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Publication%28where%3A+%7B%0D%0A++++++++++path%3A+%5B%22name%22%5D%2C%0D%0A++++++++++operator%3A+Like%2C%0D%0A++++++++++valueString%3A+%22New+%2A%22%0D%0A++++++%7D%29+%7B%0D%0A++++++name%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Notes
Each query using the `Like` operator iterates over the entire inverted index for that property. The search time will go up linearly with the dataset size. Be aware that there might be a point where this query is too expensive and will not work anymore. We will improve this implementation in a future release. You can leave feedback or feature requests in a [Github issue](https://github.com/semi-technologies/weaviate/issues). 

### Example response

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "name": "New Yorker"
        },
        {
          "name": "New York Times"
        }
      ]
    }
  },
  "errors": null
}
```

## Beacon (reference) filters

You can also search for the value of the property of a beacon.

For example, these filters select based on the class Article but who have `inPublication` set to New Yorker.

{% include code/1.x/graphql.filters.where.beacon.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28where%3A+%7B%0D%0A++++++++path%3A+%5B%22inPublication%22%2C+%22Publication%22%2C+%22name%22%5D%2C%0D%0A++++++++operator%3A+Equal%2C%0D%0A++++++++valueString%3A+%22New+Yorker%22%0D%0A++++++%7D%29+%7B%0D%0A++++++title%0D%0A++++++inPublication%7B%0D%0A++++++++...+on+Publication%7B%0D%0A++++++++++name%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## Filter objects by count of reference

Above example shows how filter by reference can solve straightforward questions like "Find all articles that are published by New Yorker". But questions like "Find all articles that are written by authors that wrote at least two articles", cannot be answered by the above query structure. It is however possible to filter by reference count. To do so, simply provide one of the existing compare operators (`Equal`, `LessThan`, `LessThanEqual`, `GreaterThan`, `GreaterThanEqual`) and use it directly on the reference element. For example:

{% include code/1.x/graphql.filters.where.beacon.count.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Author%28%0D%0A++++++where%3A%7B%0D%0A++++++++valueInt%3A+2%2C%0D%0A++++++++operator%3A+GreaterThanEqual%2C%0D%0A++++++++path%3A+%5B%22WroteArticles%22%5D%0D%0A++++++%7D%0D%0A++++%29+%7B%0D%0A++++++name%0D%0A++++++wroteArticles+%7B%0D%0A++++++++...+on+Article+%7B%0D%0A++++++++++title%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A+%7D' %}

## GeoCoordinates filter

A special case of the `Where` filter is with geoCoordinates. This filter is only supported by the `Get{}` function. If you've set the `geoCoordinates` property type, you can search in an area based on kilometers.

For example, this curious returns all in a radius of 2KM around a specific geo-location:

{% include code/1.x/graphql.filters.where.geocoordinates.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Publication%28where%3A+%7B%0D%0A++++++operator%3A+WithinGeoRange%2C%0D%0A++++++valueGeoRange%3A+%7B%0D%0A++++++++geoCoordinates%3A+%7B%0D%0A++++++++++latitude%3A+51.51%2C++++%23+latitude%0D%0A++++++++++longitude%3A+-0.09++++%23+longitude%0D%0A++++++++%7D%2C%0D%0A++++++++distance%3A+%7B%0D%0A++++++++++max%3A+2000+++++++++++%23+distance+in+meters%0D%0A++++++++%7D%0D%0A++++++%7D%2C%0D%0A++++++path%3A+%5B%22headquartersGeoLocation%22%5D+%23+property+needs+to+be+of+geoLocation+type.%0D%0A++++%7D%29+%7B%0D%0A++++++name%0D%0A++++++headquartersGeoLocation+%7B%0D%0A++++++++latitude%0D%0A++++++++longitude+%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Example response

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "headquartersGeoLocation": {
            "latitude": 51.512737,
            "longitude": -0.0962234
          },
          "name": "Financial Times"
        },
        {
          "headquartersGeoLocation": {
            "latitude": 51.512737,
            "longitude": -0.0962234
          },
          "name": "International New York Times"
        }
      ]
    }
  },
  "errors": null
}
```

# Limit filter

Supported by the `Get{}`, `Explore{}` and `Aggregate{}` function.

A limit filter limits the number of results.

An example of a stand-alone limit filter:

{% include code/1.x/graphql.filters.limit.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28limit%3A5%29+%7B%0D%0A++++++title%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "The War Vet, the Dating Site, and the Phone Call From Hell"
        },
        {
          "title": "Opinion | John Lennon Told Them ‘Girls Don’t Play Guitar.’ He Was So Wrong."
        },
        {
          "title": "The press pressed - Brazilian prosecutors go after Glenn Greenwald, an American journalist"
        },
        {
          "title": "Not to Ruin the Super Bowl, but the Sea Is Consuming Miami"
        },
        {
          "title": "Coca-Cola Resurrects Post of Chief Marketing Officer"
        }
      ]
    }
  },
  "errors": null
}
```

# Offset filter (pagination)

Supported by the `Get{}`, `Explore{}` and `Aggregate{}` function.

The offset filter works in conjunction with the existing limit parameter. For example, to list the first ten results, set `limit: 10`. Then, to "display the second page of 10", set `offset: 10`, `limit:10` and so on. E.g. to show the 9th page of 10 results, set `offset:80, limit:10` to effectively display results 81-90.

An example of a stand-alone limit filter:

{% include code/1.x/graphql.filters.offset.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0A%20%20Get%20%7B%0A%20%20%20%20Article(%0A%20%20%20%20%20%20limit%3A%205%2C%0A%20%20%20%20%20%20offset%3A%202%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D' %}

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Hong Kong tries its best to spoil China’s big anniversary"
        },
        {
          "title": "‘People don’t want any of them’: Peru election sees unpredictable contest"
        },
        {
          "title": "Brazil: homes of Bolsonaro associates raided in sweeping anti-corruption operation"
        },
        {
          "title": "If Convicting Trump Is Out of Reach, Managers Seek a Verdict From the Public and History"
        },
        {
          "title": "Watch The Juliana Plaintiffs Vic Barrett, Kelsey Juliana, and Levi Draheim in Conversation with Sandra Upson | Wired Video | CNE | Wired.com"
        }
      ]
    }
  }
}
```

### Performance and Resource Considerations & Limitations

The pagination implementation is an offset-based implementation, not a cursor-based implementation. This has the following implications:

- The cost of retrieving one further page is higher than that of the last. Effectively when searching for search results 91-100, Weaviate will internally retrieve 100 search results and discard results 0-90 before serving them to the user. This effect is amplified if running in a multi-shard setup, where each shard would retrieve 100 results, then the results aggregated and ultimately cut off. So in a 10-shard setup asking for results 91-100 Weavaite will effectively have to retrieve 1000 results (100 per shard) and discard 990 of them before serving. This means, high page numbers lead to longer response times and more load on the machine/cluster.
- Due to the increasing cost of each page outlined above, there is a limit to how many objects can be retrieved using pagination. By default setting the sum of `offset` and `limit` to higher than 10,000 objects, will lead to an error. If you must retrieve more than 10,000 objects, you can increase this limit by setting the environment variable `QUERY_MAXIMUM_RESULTS=<desired-value>`. Warning: Setting this to arbitrarily high values can make the memory consumption of a single query explode and single queries can slow down the entire cluster. We recommend setting this value to the lowest possible value that does not interfere with your users' expectations.
- The pagination setup is not stateful. If the database state has changed between retrieving two pages there is no guarantee that your pages cover all results. If no writes happened, then pagination can be used to retrieve all possible within the maximum limit. This means asking for a single page of 10,000 objects will lead to the same results overall as asking for 100 pages of 100 results. 


# NearVector filter

Supported by the `Get{}` function. (Note that this filter is different from the [GraphQL `Explore{}` function](explore.html) )

Note: Cannot use multiple `'near'` filters, or a `'near'` filter along with an [`'ask'`](../modules/qna-transformers.html#how-to-use-graphql) filter!

You can use an explore filter to find data objects close to a specified vector in your dataset. The `nearVector{}` filter is structured as follows for the `Get{}` function:

{% include code/1.x/graphql.filters.nearVector.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearVector%3A+%5B-0.36840257%2C0.13973749%2C-0.28994447%2C-0.18607682%2C0.20019795%2C0.15541431%2C-0.42353877%2C0.30262852%2C0.2724561%2C0.07069917%2C0.4877447%2C0.038771532%2C0.64523%2C-0.15907241%2C-0.3413626%2C-0.026682584%2C-0.63310874%2C-0.33411884%2C0.082939014%2C0.30305764%2C0.045918174%2C-0.21439327%2C-0.5005205%2C0.6210859%2C-0.2729049%2C-0.51221114%2C0.09680918%2C0.094923325%2C-0.15688285%2C-0.07325482%2C0.6588305%2C0.0523736%2C-0.14173415%2C-0.27428055%2C0.25526586%2C0.057506185%2C-0.3103442%2C0.028601522%2C0.124522656%2C0.66984487%2C0.12160647%2C-0.5090515%2C-0.540393%2C-0.39546522%2C-0.2201204%2C0.34625968%2C-0.21068871%2C0.21132985%2C0.048714135%2C0.09043683%2C0.3176081%2C-0.056684002%2C-0.12117501%2C-0.6591976%2C-0.26731065%2C0.42615625%2C0.33333477%2C-0.3240578%2C-0.18771006%2C0.2328068%2C-0.17239179%2C-0.33583146%2C-0.6556605%2C-0.10608161%2C-0.5135395%2C-0.25123677%2C-0.23004892%2C0.7036331%2C0.04456794%2C0.41253626%2C0.27872285%2C-0.28226635%2C0.11927197%2C-0.4677766%2C0.4343466%2C-0.17538455%2C0.10621233%2C0.95815116%2C0.23587844%2C-0.006406698%2C-0.10512518%2C-1.1125883%2C-0.37921682%2C0.040789194%2C0.676718%2C0.3369762%2C0.040712647%2C0.580487%2C0.20063736%2C-0.021220192%2C-0.09071747%2C-0.0023735985%2C0.30007777%2C-0.039925132%2C0.4035474%2C-0.2518212%2C-0.17846306%2C0.12371392%2C-0.0703354%2C-0.3752431%2C-0.652917%2C0.5952828%2C1.3426708%2C-0.08167235%2C-0.38515738%2C0.058423538%2C-0.08100355%2C-0.192886%2C0.3745164%2C-0.23291737%2C0.33326542%2C-0.6019264%2C-0.42822492%2C-0.6524583%2C-0.15210791%2C-0.5073593%2C0.022548754%2C-0.058033653%2C-0.47369233%2C-0.30890635%2C0.6338296%2C0.0017854869%2C0.1954949%2C0.99348027%2C-0.26558784%2C-0.058124136%2C1.149388%2C0.02915948%2C0.013422121%2C0.25484946%2C-0.030017598%2C-0.23879935%2C0.053123385%2C-0.36463016%2C-0.0024245526%2C0.1202083%2C-0.45966506%2C-0.34140104%2C-0.08484162%2C-0.03537422%2C-0.2817959%2C0.25044164%2C-0.5060605%2C0.1252808%2C-0.032539487%2C0.110069446%2C-0.20679846%2C-0.46421885%2C-0.4141739%2C0.26994973%2C-0.070687145%2C0.16862138%2C-0.20162229%2C0.22199251%2C-0.2771402%2C0.23653336%2C0.16585203%2C-0.08286354%2C-0.15343396%2C0.23893964%2C-0.7453282%2C-0.16549355%2C-0.1947069%2C0.46136436%2C0.22064126%2C0.28654936%2C-0.038697664%2C0.037633028%2C-0.80988157%2C0.5094175%2C-0.0920082%2C0.25405347%2C-0.64169943%2C0.43366328%2C-0.2999211%2C-0.4090591%2C0.11957859%2C0.00803617%2C-0.0433745%2C0.12818244%2C0.28464508%2C-0.31760025%2C0.16558012%2C-0.33553946%2C-0.3943465%2C0.59569097%2C-0.6524206%2C0.3683173%2C-0.60456693%2C0.2046492%2C0.46010277%2C0.24695799%2C0.2946015%2C0.11376746%2C-0.027988048%2C0.03749422%2C-0.16577742%2C0.23407385%2C-0.0231737%2C-0.023245076%2C0.08752677%2C0.2299883%2C0.35467404%2C0.046193745%2C-0.39828986%2C0.21079691%2C0.38396686%2C-0.0018698421%2C0.16047359%2C-0.057517264%2C-0.203534%2C0.23438136%2C-0.84250915%2C0.22371331%2C0.0058325706%2C0.30733636%2C0.19518353%2C-0.108008966%2C0.6509316%2C0.070131645%2C-0.24023099%2C0.28779706%2C0.2326336%2C0.07004021%2C-0.45955566%2C0.20426086%2C-0.37472793%2C-0.049604423%2C0.4537271%2C0.6133582%2C-1.0527759%2C-0.5472505%2C0.15193434%2C0.5296606%2C-0.11560251%2C0.07279209%2C0.40557706%2C0.2505283%2C0.24490519%2C0.017602902%2C-0.004647707%2C0.16608049%2C0.12576887%2C0.118216865%2C0.4403996%2C0.39552462%2C-0.22196701%2C-0.061155193%2C0.03693534%2C-0.4022908%2C0.3842317%2C-0.0831345%2C0.01930883%2C0.3446575%2C-0.2167439%2C-0.23994556%2C-0.09370326%2C-0.3671856%2C0.044011243%2C0.017895095%2C-0.019855855%2C-0.16416992%2C0.17858285%2C0.31287143%2C0.38368022%2C-0.006513525%2C0.45780763%2C-0.23027879%2C0.108570844%2C-0.4449492%2C-0.035763215%2C0.03818417%2C0.040017277%2C-0.17022872%2C-0.2622464%2C0.65610534%2C0.16720143%2C0.2515769%2C-0.23535803%2C0.62484455%2C0.16771325%2C-0.62404263%2C0.19176348%2C-0.72786695%2C0.18485649%2C-0.30914405%2C-0.3230534%2C-0.24064465%2C0.28841522%2C0.39792386%2C0.15618932%2C0.03928854%2C0.18277727%2C-0.101632096%2C0.1868196%2C-0.33366352%2C0.086561844%2C0.48557812%2C-0.6198209%2C-0.07978742%5D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

Note that the length of the given vector in the filter needs to be of the same length as the data objects in your vector space (300 in case of `text2vec-contextionary`).

### Certainty

You can set a minimum required `certainty`, which will be used to determine which data results to return. The value is a float between 0.0 (return all data objects, regardless similarity) and 1.0 (only return data objects that are matching completely, without any uncertainty). The certainty of a query result is computed by normalized distance of the fuzzy query and the data object in the vector space.

# NearObject filter

Weaviate can search based on a data object. Weaviate will return data objects that are closest to this data object in the semantic space.

Note: Cannot use multiple `'near'` filters, or a `'near'` filter along with an [`'ask'`](../modules/qna-transformers.html#how-to-use-graphql) filter!

You can specify an object's `id` or `beacon` in the filter, along with a desired `certainty`: 

{% include code/1.x/graphql.filters.nearObject.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Article%28%0D%0A++++++nearObject%3A+%7B%0D%0A++++++++beacon%3A+%22weaviate%3A%2F%2Flocalhost%2Fe5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf%22%2C+%0D%0A++++++++certainty%3A+0.7%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++title%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

Note that the first result will always be the object in the filter itself.

Near object search can also be combined with the [`text2vec-contextionary` module](../modules/text2vec-contextionary.html#moving) as movement. 


# Group filter (entity merging)

Supported by the `Get{}` function.

You can use a group filter to combine similar concepts (aka _entity merging_). There are two ways of grouping objects with a semantic similarity together.

- `closest`, which shows the one result closest to the others.
- `merge`, which merges all results into one.

The `group{}` filter is structured as follows for the `Get{}` function:

```graphql
{
  Get{
    <Class>(
      group: {
        type: <String>  # "closest" or "merge"
        force: <Number> # percentage as float (0.75 = 75%) how closely merge items should be related       
      }
    ){
      <property>
    }
  }
}
```

Note that all words in the `concepts` argument array should be present in the Contextionary.

An example query:

{% include code/1.x/graphql.filters.group.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Publication%28%0D%0A++++++group%3A%7B%0D%0A++++++++type%3A+merge%2C%0D%0A++++++++force%3A0.05%0D%0A++++++%7D%0D%0A++++%29+%7B%0D%0A++++++name%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

This results in the following. Note that publications `International New York Times`, `The New York Times Company` and `New York Times` are merged. The property values that do not have an exact overlap will all be shown, with the value of the most central concept before the brackets.

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "name": "Vogue"
        },
        {
          "name": "Wired"
        },
        {
          "name": "Financial Times"
        },
        {
          "name": "New Yorker"
        },
        {
          "name": "The Economist"
        },
        {
          "name": "International New York Times (The New York Times Company, New York Times)"
        },
        {
          "name": "Wall Street Journal"
        },
        {
          "name": "CNN"
        },
        {
          "name": "Game Informer"
        },
        {
          "name": "The Guardian"
        },
        {
          "name": "Fox News"
        }
      ]
    }
  },
  "errors": null
}
```

# More Resources

{% include docs-support-links.html %}