---
title: GraphQL - Explore{}
sidebar_position: 3
# layout: layout-documentation
# solution: weaviate
# sub-menu: GraphQL references
# title: Explore{}
# intro: You can explore the search graph based on the semantic meaning of the data concepts in a Weaviate using the GraphQL Explore{} function. Search results are based on given data, meta data and the Contextionary used in Weaviate.
# description: GraphQL Explore{} function
# tags: ['graphql', 'explore{}']
# sidebar_position: 3
# open-graph-type: article
# toc: true
# redirect_from:
#     - /documentation/weaviate/current/query-data/explore.html
#     - /documentation/weaviate/current/graphql-references/explore.html
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Explore{} query structure and syntax

The `Explore{}` function is always defined based on the following principle:

```graphql
{
  Explore (
    limit: <Int>,               # The maximum amount of objects to return
    nearText: {                 # Either this or 'nearVector' is required
      concepts: [<String>]!,   # Required - An array of search items. If the text2vec-contextionary is the vectorization module, the concepts should be present in the Contextionary.
      certainty: <Float>,      # Minimal level of certainty, computed by normalized distance
      moveTo: {                # Optional - Giving directions to the search
        concepts: [<String>]!, # List of search items
        force: <Float>!        # The force to apply for a particular movement. Must be between 0 (no movement) and 1 (largest possible movement).
      },
      moveAwayFrom: {          # Optional - Giving directions to the search
        concepts: [<String>]!, # List of search items
        force: <Float>!        # The force to apply for a particular movement. Must be between 0 (no movement) and 1 (largest possible movement).
      }
    },
    nearVector: {              # Either this or 'nearText' is required
      vector: [<Float>]!,      # Required - An array of search items, which length should match the vector space
      certainty: <Float>       # Minimal level of certainty, computed by normalized distance
    }
  ) {
    beacon
    certainty                # certainty value based on a normalized distance calculation
    className
  }
}
```

An example query:

import GraphQLExploreVec from '/_includes/code/graphql.explore.vector.mdx';

<GraphQLExploreVec/>

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Explore+%28%0D%0A++++nearVector%3A+%7B%0D%0A++++++vector%3A+%5B-0.36840257%2C0.13973749%2C-0.28994447%2C-0.18607682%2C0.20019795%2C0.15541431%2C-0.42353877%2C0.30262852%2C0.2724561%2C0.07069917%2C0.4877447%2C0.038771532%2C0.64523%2C-0.15907241%2C-0.3413626%2C-0.026682584%2C-0.63310874%2C-0.33411884%2C0.082939014%2C0.30305764%2C0.045918174%2C-0.21439327%2C-0.5005205%2C0.6210859%2C-0.2729049%2C-0.51221114%2C0.09680918%2C0.094923325%2C-0.15688285%2C-0.07325482%2C0.6588305%2C0.0523736%2C-0.14173415%2C-0.27428055%2C0.25526586%2C0.057506185%2C-0.3103442%2C0.028601522%2C0.124522656%2C0.66984487%2C0.12160647%2C-0.5090515%2C-0.540393%2C-0.39546522%2C-0.2201204%2C0.34625968%2C-0.21068871%2C0.21132985%2C0.048714135%2C0.09043683%2C0.3176081%2C-0.056684002%2C-0.12117501%2C-0.6591976%2C-0.26731065%2C0.42615625%2C0.33333477%2C-0.3240578%2C-0.18771006%2C0.2328068%2C-0.17239179%2C-0.33583146%2C-0.6556605%2C-0.10608161%2C-0.5135395%2C-0.25123677%2C-0.23004892%2C0.7036331%2C0.04456794%2C0.41253626%2C0.27872285%2C-0.28226635%2C0.11927197%2C-0.4677766%2C0.4343466%2C-0.17538455%2C0.10621233%2C0.95815116%2C0.23587844%2C-0.006406698%2C-0.10512518%2C-1.1125883%2C-0.37921682%2C0.040789194%2C0.676718%2C0.3369762%2C0.040712647%2C0.580487%2C0.20063736%2C-0.021220192%2C-0.09071747%2C-0.0023735985%2C0.30007777%2C-0.039925132%2C0.4035474%2C-0.2518212%2C-0.17846306%2C0.12371392%2C-0.0703354%2C-0.3752431%2C-0.652917%2C0.5952828%2C1.3426708%2C-0.08167235%2C-0.38515738%2C0.058423538%2C-0.08100355%2C-0.192886%2C0.3745164%2C-0.23291737%2C0.33326542%2C-0.6019264%2C-0.42822492%2C-0.6524583%2C-0.15210791%2C-0.5073593%2C0.022548754%2C-0.058033653%2C-0.47369233%2C-0.30890635%2C0.6338296%2C0.0017854869%2C0.1954949%2C0.99348027%2C-0.26558784%2C-0.058124136%2C1.149388%2C0.02915948%2C0.013422121%2C0.25484946%2C-0.030017598%2C-0.23879935%2C0.053123385%2C-0.36463016%2C-0.0024245526%2C0.1202083%2C-0.45966506%2C-0.34140104%2C-0.08484162%2C-0.03537422%2C-0.2817959%2C0.25044164%2C-0.5060605%2C0.1252808%2C-0.032539487%2C0.110069446%2C-0.20679846%2C-0.46421885%2C-0.4141739%2C0.26994973%2C-0.070687145%2C0.16862138%2C-0.20162229%2C0.22199251%2C-0.2771402%2C0.23653336%2C0.16585203%2C-0.08286354%2C-0.15343396%2C0.23893964%2C-0.7453282%2C-0.16549355%2C-0.1947069%2C0.46136436%2C0.22064126%2C0.28654936%2C-0.038697664%2C0.037633028%2C-0.80988157%2C0.5094175%2C-0.0920082%2C0.25405347%2C-0.64169943%2C0.43366328%2C-0.2999211%2C-0.4090591%2C0.11957859%2C0.00803617%2C-0.0433745%2C0.12818244%2C0.28464508%2C-0.31760025%2C0.16558012%2C-0.33553946%2C-0.3943465%2C0.59569097%2C-0.6524206%2C0.3683173%2C-0.60456693%2C0.2046492%2C0.46010277%2C0.24695799%2C0.2946015%2C0.11376746%2C-0.027988048%2C0.03749422%2C-0.16577742%2C0.23407385%2C-0.0231737%2C-0.023245076%2C0.08752677%2C0.2299883%2C0.35467404%2C0.046193745%2C-0.39828986%2C0.21079691%2C0.38396686%2C-0.0018698421%2C0.16047359%2C-0.057517264%2C-0.203534%2C0.23438136%2C-0.84250915%2C0.22371331%2C0.0058325706%2C0.30733636%2C0.19518353%2C-0.108008966%2C0.6509316%2C0.070131645%2C-0.24023099%2C0.28779706%2C0.2326336%2C0.07004021%2C-0.45955566%2C0.20426086%2C-0.37472793%2C-0.049604423%2C0.4537271%2C0.6133582%2C-1.0527759%2C-0.5472505%2C0.15193434%2C0.5296606%2C-0.11560251%2C0.07279209%2C0.40557706%2C0.2505283%2C0.24490519%2C0.017602902%2C-0.004647707%2C0.16608049%2C0.12576887%2C0.118216865%2C0.4403996%2C0.39552462%2C-0.22196701%2C-0.061155193%2C0.03693534%2C-0.4022908%2C0.3842317%2C-0.0831345%2C0.01930883%2C0.3446575%2C-0.2167439%2C-0.23994556%2C-0.09370326%2C-0.3671856%2C0.044011243%2C0.017895095%2C-0.019855855%2C-0.16416992%2C0.17858285%2C0.31287143%2C0.38368022%2C-0.006513525%2C0.45780763%2C-0.23027879%2C0.108570844%2C-0.4449492%2C-0.035763215%2C0.03818417%2C0.040017277%2C-0.17022872%2C-0.2622464%2C0.65610534%2C0.16720143%2C0.2515769%2C-0.23535803%2C0.62484455%2C0.16771325%2C-0.62404263%2C0.19176348%2C-0.72786695%2C0.18485649%2C-0.30914405%2C-0.3230534%2C-0.24064465%2C0.28841522%2C0.39792386%2C0.15618932%2C0.03928854%2C0.18277727%2C-0.101632096%2C0.1868196%2C-0.33366352%2C0.086561844%2C0.48557812%2C-0.6198209%2C-0.07978742%5D%0D%0A++++%7D%0D%0A++%29+%7B%0D%0A++++beacon%0D%0A++++certainty%0D%0A++++className%0D%0A++%7D%0D%0A%7D'/>

<!-- {% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Explore+%28%0D%0A++++nearVector%3A+%7B%0D%0A++++++vector%3A+%5B-0.36840257%2C0.13973749%2C-0.28994447%2C-0.18607682%2C0.20019795%2C0.15541431%2C-0.42353877%2C0.30262852%2C0.2724561%2C0.07069917%2C0.4877447%2C0.038771532%2C0.64523%2C-0.15907241%2C-0.3413626%2C-0.026682584%2C-0.63310874%2C-0.33411884%2C0.082939014%2C0.30305764%2C0.045918174%2C-0.21439327%2C-0.5005205%2C0.6210859%2C-0.2729049%2C-0.51221114%2C0.09680918%2C0.094923325%2C-0.15688285%2C-0.07325482%2C0.6588305%2C0.0523736%2C-0.14173415%2C-0.27428055%2C0.25526586%2C0.057506185%2C-0.3103442%2C0.028601522%2C0.124522656%2C0.66984487%2C0.12160647%2C-0.5090515%2C-0.540393%2C-0.39546522%2C-0.2201204%2C0.34625968%2C-0.21068871%2C0.21132985%2C0.048714135%2C0.09043683%2C0.3176081%2C-0.056684002%2C-0.12117501%2C-0.6591976%2C-0.26731065%2C0.42615625%2C0.33333477%2C-0.3240578%2C-0.18771006%2C0.2328068%2C-0.17239179%2C-0.33583146%2C-0.6556605%2C-0.10608161%2C-0.5135395%2C-0.25123677%2C-0.23004892%2C0.7036331%2C0.04456794%2C0.41253626%2C0.27872285%2C-0.28226635%2C0.11927197%2C-0.4677766%2C0.4343466%2C-0.17538455%2C0.10621233%2C0.95815116%2C0.23587844%2C-0.006406698%2C-0.10512518%2C-1.1125883%2C-0.37921682%2C0.040789194%2C0.676718%2C0.3369762%2C0.040712647%2C0.580487%2C0.20063736%2C-0.021220192%2C-0.09071747%2C-0.0023735985%2C0.30007777%2C-0.039925132%2C0.4035474%2C-0.2518212%2C-0.17846306%2C0.12371392%2C-0.0703354%2C-0.3752431%2C-0.652917%2C0.5952828%2C1.3426708%2C-0.08167235%2C-0.38515738%2C0.058423538%2C-0.08100355%2C-0.192886%2C0.3745164%2C-0.23291737%2C0.33326542%2C-0.6019264%2C-0.42822492%2C-0.6524583%2C-0.15210791%2C-0.5073593%2C0.022548754%2C-0.058033653%2C-0.47369233%2C-0.30890635%2C0.6338296%2C0.0017854869%2C0.1954949%2C0.99348027%2C-0.26558784%2C-0.058124136%2C1.149388%2C0.02915948%2C0.013422121%2C0.25484946%2C-0.030017598%2C-0.23879935%2C0.053123385%2C-0.36463016%2C-0.0024245526%2C0.1202083%2C-0.45966506%2C-0.34140104%2C-0.08484162%2C-0.03537422%2C-0.2817959%2C0.25044164%2C-0.5060605%2C0.1252808%2C-0.032539487%2C0.110069446%2C-0.20679846%2C-0.46421885%2C-0.4141739%2C0.26994973%2C-0.070687145%2C0.16862138%2C-0.20162229%2C0.22199251%2C-0.2771402%2C0.23653336%2C0.16585203%2C-0.08286354%2C-0.15343396%2C0.23893964%2C-0.7453282%2C-0.16549355%2C-0.1947069%2C0.46136436%2C0.22064126%2C0.28654936%2C-0.038697664%2C0.037633028%2C-0.80988157%2C0.5094175%2C-0.0920082%2C0.25405347%2C-0.64169943%2C0.43366328%2C-0.2999211%2C-0.4090591%2C0.11957859%2C0.00803617%2C-0.0433745%2C0.12818244%2C0.28464508%2C-0.31760025%2C0.16558012%2C-0.33553946%2C-0.3943465%2C0.59569097%2C-0.6524206%2C0.3683173%2C-0.60456693%2C0.2046492%2C0.46010277%2C0.24695799%2C0.2946015%2C0.11376746%2C-0.027988048%2C0.03749422%2C-0.16577742%2C0.23407385%2C-0.0231737%2C-0.023245076%2C0.08752677%2C0.2299883%2C0.35467404%2C0.046193745%2C-0.39828986%2C0.21079691%2C0.38396686%2C-0.0018698421%2C0.16047359%2C-0.057517264%2C-0.203534%2C0.23438136%2C-0.84250915%2C0.22371331%2C0.0058325706%2C0.30733636%2C0.19518353%2C-0.108008966%2C0.6509316%2C0.070131645%2C-0.24023099%2C0.28779706%2C0.2326336%2C0.07004021%2C-0.45955566%2C0.20426086%2C-0.37472793%2C-0.049604423%2C0.4537271%2C0.6133582%2C-1.0527759%2C-0.5472505%2C0.15193434%2C0.5296606%2C-0.11560251%2C0.07279209%2C0.40557706%2C0.2505283%2C0.24490519%2C0.017602902%2C-0.004647707%2C0.16608049%2C0.12576887%2C0.118216865%2C0.4403996%2C0.39552462%2C-0.22196701%2C-0.061155193%2C0.03693534%2C-0.4022908%2C0.3842317%2C-0.0831345%2C0.01930883%2C0.3446575%2C-0.2167439%2C-0.23994556%2C-0.09370326%2C-0.3671856%2C0.044011243%2C0.017895095%2C-0.019855855%2C-0.16416992%2C0.17858285%2C0.31287143%2C0.38368022%2C-0.006513525%2C0.45780763%2C-0.23027879%2C0.108570844%2C-0.4449492%2C-0.035763215%2C0.03818417%2C0.040017277%2C-0.17022872%2C-0.2622464%2C0.65610534%2C0.16720143%2C0.2515769%2C-0.23535803%2C0.62484455%2C0.16771325%2C-0.62404263%2C0.19176348%2C-0.72786695%2C0.18485649%2C-0.30914405%2C-0.3230534%2C-0.24064465%2C0.28841522%2C0.39792386%2C0.15618932%2C0.03928854%2C0.18277727%2C-0.101632096%2C0.1868196%2C-0.33366352%2C0.086561844%2C0.48557812%2C-0.6198209%2C-0.07978742%5D%0D%0A++++%7D%0D%0A++%29+%7B%0D%0A++++beacon%0D%0A++++certainty%0D%0A++++className%0D%0A++%7D%0D%0A%7D' %} -->

The result might look like this:

```json
{
  "data": {
    "Explore": [
      {
        "beacon": "weaviate://localhost/7e9b9ffe-e645-302d-9d94-517670623b35",
        "certainty": 0.975523,
        "className": "Publication"
      }
    ]
  },
  "errors": null
}
```

### CamelCase interpretation

Weaviate's vectorization module `text2vec-contextionary` splits words based on CamelCase. For example, if a user wants to explore for the iPhone (the Apple device) they should use `iphone` rather than `iPhone` because the latter will be interpreted as `[i, phone]`.

## Explore filter arguments  

### Concepts

Strings written in the `Concepts` array are your fuzzy search terms. An array of concepts is required to set in the Explore query, and all words in this array should be present in the Contextionary.

There are three ways to define the `concepts` array argument in the Explore filter.

- `["New York Times"]` = one vector position is determined based on the occurrences of the words
- `["New", "York", "Times"]` = all concepts have a similar weight.
- `["New York", "Times"]` = a combination of the two above.

A practical example would be: `concepts: ["beatles", "John Lennon"]`

#### Distance

You can set a maximum allowed `distance`, which will be used to determine which
data results to return. The interpretation of the value of the distance field
depends on the [distance metric used](/docs/weaviate/configuration/distances.md).

If the distance metric is `cosine` you can also use `certainty` instead of
`distance`. Certainty normalizes the distance in a range of 0..1, where 0
represents a perfect opposite (cosine distance of 2) and 1 represents vectors
with an identical angle (cosine distance of 0). Certainty is not available on
non-cosine distance metrics.

#### Moving

Because pagination is not possible in multidimensional storage, you can improve your results with additional explore functions which can move away from semantic concepts or towards semantic concepts. E.g., if you look for the concept 'New York Times' but don't want to find the city New York, you can use the `moveAwayFrom{}` function by using the words 'New York'. This is also a way to exclude concepts and to deal with negations (`not` operators in similar query languages). Concepts in the `moveAwayFrom{}` filter are not per definition excluded from the result, but the resulting concepts are further away from the concepts in this filter.

## Additional filters

`Explore{}` functions can be extended with search filters (both semantic filters as traditional filters). Because the filters work on multiple core functions (like `Aggregate{}`) there is a [specific documentation page dedicated to filters](filters.md).

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
