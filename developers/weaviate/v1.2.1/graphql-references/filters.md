---
layout: layout-documentation
solution: weaviate
sub-menu: GraphQL references
title: Filters
intro: Filters can be set to order or sort your dataset or to find specific data objects. Some filters are available in multiple functions where others are only available in specific ones.
description: GraphQL filters
tags: ['graphql', 'filters']
menu-order: 4
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Where filter

## Filter structure

Supported by the `Get{}` and `Aggregate{}` function.

The `where` filter is an [algebraic object](https://en.wikipedia.org/wiki/Algebraic_structure), which takes the following arguments:

- `Operator` (which takes one of the following values)
  - `And`
  - `Or`
  - `Equal`
  - `NotEqual`
  - `GreaterThan`
  - `GreaterThanEqual`
  - `LessThan`
  - `LessThanEqual`
  - `Like`
- `Operands`: Is a list of `Operator` objects of this same structure, only used if the parent `Operator` is set to `And` or `Or`.
- `Path`: Is a list of strings indicating the property name of the class. If the property is a beacon (i.e., cross-reference), the path should be followed to the property of the beacon which should be specified as a list of strings.
- `valueInt`: The integer value where the `Path`'s last property name should be compared to.
- `valueBoolean`: The boolean value that the `Path`'s last property name should be compared to.
- `valueString`: The string value that the `Path`'s last property name should be compared to.
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


# NearVector filter

Supported by the `Get{}` function. (Note that this filter is different from the [GraphQL `Explore{}` function](explore.html) )

You can use an explore filter to find data objects close to a specified vector in your dataset. The `nearVector{}` filter is structured as follows for the `Get{}` function:

{% include code/1.x/graphql.filters.nearVector.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0A%20%20Get%7B%0A%20%20%20%20Publication%28%0A%20%20%20%20%20%20nearVector%3A%20%7B%0A%20%20%20%20%20%20%20%20vector%3A%20%5B-0.23465763%2C0.17979929%2C0.102799274%2C0.024113754%2C0.028255954%2C0.027368147%2C0.05160567%2C0.044174556%2C-0.37165773%2C-0.17372784%2C0.06370711%2C-0.014063497%2C-0.007861198%2C0.33682644%2C0.11614874%2C0.18399939%2C0.31976607%2C0.07835108%2C-0.098653905%2C-0.03590513%2C-0.06187989%2C0.09194802%2C-0.04729259%2C-0.11346251%2C-0.3803298%2C-0.10139798%2C0.119549245%2C0.11505816%2C0.23455755%2C0.09849567%2C0.01249316%2C-0.05364768%2C-0.040253654%2C0.18844208%2C0.050965175%2C0.07916835%2C-0.012258343%2C0.0671034%2C-0.054112636%2C0.04180599%2C0.092125595%2C-0.018237045%2C-0.22897908%2C0.02750451%2C-0.2790535%2C-0.3441088%2C-0.058022186%2C0.049728215%2C-0.12160574%2C0.2205436%2C0.037941944%2C0.08513926%2C0.122934945%2C0.09057151%2C-0.038932543%2C-0.03429459%2C-0.08880545%2C-0.25762177%2C-0.16863364%2C-0.059970103%2C0.14436457%2C0.17749363%2C0.22366543%2C-0.012577283%2C-0.19367333%2C-0.020099051%2C0.08746966%2C-0.090860695%2C-0.079980455%2C-0.12675235%2C0.08376062%2C0.0903464%2C-0.00061829574%2C0.13518003%2C0.025386855%2C-0.012249976%2C0.046253454%2C0.03561518%2C-0.19014797%2C0.01390166%2C0.090683326%2C-0.06893731%2C-0.094287015%2C0.07015253%2C-0.23144877%2C0.29581574%2C0.05523665%2C0.112800926%2C-0.18251088%2C0.008940386%2C0.2676646%2C-0.03692727%2C0.06238877%2C-0.14202276%2C-0.08937121%2C0.05693051%2C-0.0432525%2C0.18392386%2C-0.06341782%2C-0.12967975%2C-0.35598278%2C-0.0023491327%2C-0.06266682%2C0.009586824%2C0.077612974%2C-0.21517417%2C-0.09696568%2C0.036491744%2C-0.02124694%2C-0.12933266%2C0.113069154%2C0.064186916%2C0.109830804%2C0.19753163%2C-0.0865918%2C0.099933594%2C0.073294%2C0.021562478%2C-0.09796098%2C0.11724932%2C0.21206819%2C-0.09595199%2C-0.032359455%2C-0.07369516%2C-0.0032142093%2C0.16771081%2C-0.21079993%2C0.13013682%2C0.020967718%2C0.0051083555%2C0.0034307502%2C0.087087154%2C-0.030605571%2C-0.009762479%2C-0.04826925%2C0.135053%2C-0.06856737%2C-0.036154717%2C0.07328842%2C0.08172625%2C-0.010930129%2C-0.019117197%2C0.027507683%2C-0.042174876%2C-0.122324735%2C-0.059549067%2C-0.05604652%2C0.28068227%2C0.061018653%2C0.03457643%2C0.067162685%2C0.017143786%2C0.026661776%2C0.0090041235%2C-0.04096501%2C0.030862%2C0.32934877%2C0.16742821%2C-0.0039201444%2C0.021448493%2C0.053120323%2C-0.063359454%2C-0.1641798%2C0.18127228%2C0.07749719%2C0.20283675%2C-0.11017373%2C-0.107470766%2C0.015754933%2C-0.043649945%2C0.16548371%2C-0.25340077%2C-0.018367544%2C0.027777113%2C0.113526076%2C-0.18193291%2C0.044229295%2C0.110506475%2C-0.058374397%2C-0.097559266%2C-0.2719125%2C0.19185185%2C0.06707544%2C0.22687668%2C-0.16616467%2C-0.034963913%2C0.20147288%2C0.08696243%2C0.037441466%2C0.023626866%2C0.049714584%2C0.0965035%2C0.07282559%2C0.0440484%2C-0.0645741%2C0.057806853%2C-0.1274356%2C-0.06270439%2C0.00849327%2C0.113322705%2C0.006761973%2C-0.05550707%2C-0.055237696%2C-0.12199958%2C0.011936213%2C-0.016280506%2C-0.18963426%2C-0.114819944%2C0.0605402%2C0.07305948%2C0.42009065%2C-0.04713229%2C-0.13189736%2C0.056811567%2C0.07452918%2C-0.033649046%2C0.12336579%2C0.2777558%2C-0.07795057%2C0.17896728%2C-0.17787835%2C0.37503108%2C-0.1261996%2C-0.09618712%2C0.071471915%2C-0.0067055803%2C0.05865556%2C-0.0024448698%2C0.016127113%2C0.025038403%2C0.19005394%2C-0.04669397%2C0.12561052%2C0.0966604%2C0.07671112%2C0.11160054%2C-0.016865058%2C0.10937623%2C0.10490088%2C-0.1851902%2C-0.21393222%2C0.16733423%2C-0.016179845%2C0.12150621%2C0.1316216%2C-0.11354348%2C0.10850461%2C-0.072117805%2C-0.026643105%2C0.061819315%2C-0.20617527%2C0.076222524%2C0.12505898%2C-0.033876866%2C0.096771985%2C0.0017282967%2C-0.16708866%2C0.010973749%2C-0.05297373%2C0.1574822%2C-0.06757769%2C-0.04683279%2C0.06375807%2C0.0088846%2C-0.13538598%2C-0.084824845%2C0.068975314%2C0.33688343%2C0.20711815%2C-0.043730423%2C-0.072583824%2C0.04977499%2C-0.17070043%2C-0.07051943%2C0.021004502%2C-0.03730134%2C-0.21386296%2C-0.053417273%2C-0.1673489%2C0.026971681%2C-0.06328513%2C-0.15684208%2C0.012555064%2C-0.04434634%2C-0.12287592%2C-0.18033288%2C-0.08037485%2C-0.23065373%2C-0.043814242%2C0.25294116%2C0.028202772%2C-0.12566684%2C-0.024512842%2C-0.014470105%2C0.13780904%2C-0.077516556%2C-0.23391989%2C-0.08482521%2C-0.010969244%2C0.3326309%2C-0.009098832%2C0.10228478%2C-0.04993008%2C-0.016812975%2C-0.103875265%2C-0.02068389%2C-0.12670788%2C-0.024401654%2C0.07415338%2C-0.11476372%2C0.18051672%2C-0.053926274%2C-0.057002045%2C0.212168%2C-0.14792497%2C0.113478884%2C0.14276274%2C0.05609845%2C0.014511127%2C0.16792081%2C0.18126106%2C0.001699484%2C-0.045843486%2C0.019494196%2C0.06698305%2C-0.13571832%2C0.055380456%2C0.024890993%2C0.0439167%2C-0.22175919%2C-0.033260856%2C0.026795506%2C-0.012411%2C-0.13519171%2C-0.09366397%2C0.099667564%2C0.07607931%2C0.34444964%2C-0.06121245%2C0.02994556%2C-0.05987379%2C0.028532853%2C0.15583034%2C-0.07173464%2C-0.16250613%2C-0.03735872%2C0.12899329%2C-0.06963391%2C-0.12464738%2C-0.003398872%2C0.01928471%2C-0.04379806%2C-0.017325576%2C-0.07278164%2C0.06282024%2C-0.0100141885%2C-0.13836662%2C-0.086074606%2C-0.04928808%2C0.10639307%2C-0.015313828%2C0.027083673%2C0.07370242%2C0.088965744%2C-0.14360012%2C0.012048652%2C-0.100931644%2C0.10895235%2C-0.050664075%2C-0.025369175%2C0.1658789%2C0.037601925%2C0.21811733%2C-0.063603476%2C-0.08376581%2C0.137202%2C0.009401917%2C-0.045291744%2C-0.1512802%2C-0.025105534%2C0.07110933%2C-0.35801277%2C0.20491669%2C-0.03635557%2C-0.02195874%2C0.11570546%2C-0.04557519%2C-0.013054491%2C-0.18375936%2C-0.07126909%2C-0.08992924%2C-0.14313167%2C0.000055442564%2C-0.1726888%2C0.067026064%2C-0.18438172%2C-0.012237902%2C-0.03082749%2C-0.07132076%2C-0.07292381%2C-0.009753299%2C0.23502126%2C-0.093918204%2C-0.023575446%2C0.083127365%2C0.0108186%2C0.07566714%2C0.006115687%2C-0.13677943%2C-0.3294332%2C-0.10151925%2C-0.133713%2C-0.043996178%2C-0.025704846%2C0.09658231%2C-0.1521731%2C-0.03620415%2C-0.1182407%2C0.045563802%2C0.06867553%2C0.047214612%2C-0.059277043%2C-0.070367694%2C-0.052436374%2C-0.03402625%2C-0.14968148%2C0.093308404%2C0.07272077%2C0.10590238%2C-0.06045601%2C0.02874743%2C0.20087448%2C-0.059354134%2C0.075395405%2C0.051043946%2C-0.030768977%2C0.016028143%2C0.10692045%2C-0.11002893%2C-0.09673653%2C0.049469613%2C0.041776117%2C0.16689134%2C-0.21752623%2C-0.19430524%2C-0.12307017%2C0.043573726%2C-0.048717104%2C0.04465528%2C0.13443576%2C-0.12346366%2C-0.011959422%2C-0.16607215%2C0.0018878467%2C0.13503549%2C-0.023593955%2C0.28526396%2C0.00063936226%2C0.08890096%2C-0.1582424%2C-0.12614277%2C0.605354%2C0.022748979%2C0.07435266%2C0.14555922%2C-0.004281237%2C0.1637888%2C-0.21018502%2C-0.0789703%2C0.09784391%2C-0.06461661%2C0.038825393%2C-0.11709451%2C-0.02530866%2C0.0065722%2C0.04326789%2C-0.075842716%2C-0.3116881%2C-0.039845794%2C0.054108217%2C0.0985363%2C0.015000608%2C-0.007967957%2C-0.088186085%2C0.06138216%2C-0.08127389%2C0.01570968%2C-0.016085781%2C0.21098772%2C0.038870648%2C-0.07691855%2C-0.086050354%2C0.07641947%2C0.02579334%2C-0.17190132%2C0.0992676%2C-0.08618325%2C0.05433204%2C-0.08881177%2C-0.06658524%2C-0.19849047%2C-0.11686146%2C0.009849584%2C0.10218163%2C-0.012717381%2C0.08553991%2C-0.018123155%2C-0.045293525%2C0.026818573%2C-0.11323824%2C0.14800489%2C-0.11361582%2C-0.074924506%2C-0.12954782%2C0.018139653%2C0.20968463%2C0.12987098%2C0.13087825%2C0.19959521%2C0.054626856%2C0.08166587%2C0.1935697%2C-0.03500442%2C0.14532338%2C0.0026432252%2C0.06321498%2C0.037508067%2C-0.03933152%2C0.05270709%2C0.0048466437%2C0.14209333%2C-0.048704967%2C0.062610336%2C-0.002316019%2C-0.08442129%2C-0.0023012161%2C0.15175562%2C0.045703776%2C-0.12891865%2C0.032947607%2C0.010447428%2C0.054664463%2C0.21886581%2C-0.10746093%2C0.23723373%2C0.0032382086%2C0.042789146%2C0.28078836%2C0.01577283%2C-0.0059065185%2C-0.06500554%2C-0.024099294%2C-0.09003623%2C0.015527177%2C0.11270352%2C-0.047571227%2C-0.031762563%2C0.08175194%2C0.06570573%2C-0.017216744%2C-0.017516207%2C0.06985715%2C0.04550825%2C-0.024760865%2C-0.12943135%2C-0.004374942%2C0.018212453%2C0.15515165%2C0.06205265%2C0.07773018%2C-0.13690233%2C-0.14280525%2C0.07745191%2C-0.18464002%2C0.12081312%2C-0.026572619%2C0.020704217%2C0.058941066%2C0.051170163%2C-0.013110386%2C-0.03357399%2C0.009641135%2C-0.15939642%2C-0.15717936%2C-0.05750653%2C-0.07251076%2C0.06520609%2C-0.037277523%2C0.02285239%2C-0.22244416%2C0.0654858%2C0.21554282%2C0.059626978%2C-0.081284%2C0.07179128%2C-0.152839%2C0.13677043%2C0.048378944%2C0.13458024%2C0.13931236%2C-0.076032534%2C-0.038226645%2C0.055144362%2C-0.08410028%2C-0.115194306%2C-0.048347984%2C0.06564306%2C0.05905451%2C-0.031956047%2C-0.022075457%2C-0.07168111%2C-0.14497352%2C-0.018555913%2C-0.20753776%2C-0.18044674%2C0.028881893%2C-0.1325844%2C0.13116214%2C0.04691655%2C-0.23364337%2C-0.11188713%2C-0.13637887%2C-0.016772587%2C0.22563687%2C-0.033255585%2C0.18282045%2C0.04078422%2C0.07255135%2C-0.021764483%2C0.2107%2C-0.22811268%2C-0.20520219%2C-0.122624695%2C-0.075651444%2C-0.017318744%2C0.092903495%2C0.102291435%2C-0.09432292%2C0.10696524%2C0.11473412%2C-0.04533612%2C-0.043883137%2C-0.0012241001%2C-0.09604044%2C-0.12196341%2C-0.011742681%2C-0.094535545%2C0.24636087%2C-0.011901259%2C-0.045293164%2C0.078836195%2C0.3076279%2C-0.0030795278%2C0.13073339%2C-0.054781057%2C0.022838669%2C-0.047530524%2C0.18570168%2C0.05688159%2C0.11852153%2C0.17682163%2C0.082003936%2C0.07978268%2C0.0034061046%2C-0.09435686%2C-0.008865017%2C0.017782282%2C0.20146354%2C-0.04896053%2C-0.101671904%2C0.14009666%2C-0.024583366%2C0.036193445%2C-0.1820283%2C0.11522126%2C0.044222895%2C-0.15434028%2C0.03421437%2C-0.24441665%2C0.09539177%2C-0.20637691%2C-0.013288546%2C-0.0908784%2C-0.020693514%2C0.25038427%2C-0.07887416%2C0.08126651%2C-0.08605219%2C-0.009043915%2C-0.049351137%2C-0.020553615%2C0.0058903676%2C0.0020338092%2C-0.032364827%2C-0.11840828%2C0.19374238%2C0.121487685%2C-0.075439855%2C-0.3790606%2C-0.13741675%2C0.0687274%2C0.10233968%2C0.019255105%2C0.17166223%2C-0.076944485%2C-0.27786955%2C0.052569695%2C-0.008112809%2C0.00905671%2C-0.018261207%2C0.02456199%2C0.01319736%2C-0.029943712%2C0.023340277%2C0.0831485%2C-0.08815096%2C0.19995248%2C-0.26680195%2C-0.06844357%2C-0.27540848%2C-0.04463947%2C-0.058132604%2C0.06350815%2C0.033096854%2C0.013701245%2C-0.08375896%2C0.052284367%2C0.095668085%2C-0.05824688%2C-0.085416846%2C-0.002367309%2C0.07347369%2C-0.008068767%2C0.19756658%2C-0.0045130225%2C-0.009136167%2C-0.24484903%2C-0.079925045%2C0.16070287%2C0.0761349%2C0.17387088%2C0.047619935%2C0.21801475%2C-0.03402488%2C0.014446441%2C0.055997074%2C-0.038093414%2C0.04919812%2C0.15207188%2C-0.0759414%2C-0.039339487%2C0.1197402%2C-0.24078262%2C0.21332002%2C0.18520337%2C-0.035598926%2C-0.16920975%2C-0.06034118%2C0.22399509%2C-0.07997291%2C0.004313186%2C-0.06332217%2C0.07368236%2C-0.12980051%2C-0.020264369%2C0.025797214%2C0.014003551%2C-0.08809432%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%29%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20certainty%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D' %}

Note that the length of the given vector in the filter needs to be of the same length as the data objects in your vector space (300 in case of `text2vec-contextionary`).

### Certainty

You can set a minimum required `certainty`, which will be used to determine which data results to return. The value is a float between 0.0 (return all data objects, regardless similarity) and 1.0 (only return data objects that are matching completely, without any uncertainty). The certainty of a query result is computed by normalized distance of the fuzzy query and the data object in the vector space.

# NearObject filter

Weaviate can search based on a data object. Weaviate will return data objects that are closest to this data object in the semantic space.

You can specify an object's `id` or `beacon` in the filter, along with a desired `certainty`: 

```graphql 
{
  Get {
    Publication(
      nearObject: {
        id: "e5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf", // alternatively `beacon: "weaviate://localhost/e5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf"`
        certainty: 0.7
      }
    ){
      name
      _additional {
        certainty
      }
    }
  }
}
```

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