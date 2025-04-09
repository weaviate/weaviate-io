---
title: Retrieval Augmented Generation (RAG)
sidebar_position: 70
image: og/docs/howto.jpg
# tags: ['how to', 'generative']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.generative.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.generative-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.generative.ts';
import TSCodeLegacy from '!!raw-loader!/_includes/code/howto/search.generative-v2.ts';
import GoCode from '!!raw-loader!/_includes/code/howto/go/docs/mainpkg/search-generative_test.go';

Retrieval Augmented Generation (RAG) combines information retrieval with generative AI models.

In Weaviate, a RAG query consists of two parts: *a search query*, and a *prompt for the model*. Weaviate first performs the search, then passes both the search results and your prompt to a generative AI model before returning the generated response.

## Configure a generative model provider

:::info Added in `v1.30`
:::

To use RAG with a [generative model integration](../model-providers/index.md):
- [set a default configuration for the collection](../manage-data/collections.mdx#specify-a-generative-model-integration) and/or
- provide the settings as a part of the query:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START DynamicRag"
      endMarker="# END DynamicRag"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START DynamicRag"
      endMarker="// END DynamicRag"
      language="ts"
    />
  </TabItem>
  <TabItem value="go" label="Go">

```ts
// Go support coming soon
```

  </TabItem>
    <TabItem value="java" label="Java">

```ts
// Java support coming soon
```

  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

```
Properties: {'country': 'Austria', 'title': 'Gebeshuber 2013 Frizzante Rosé Pinot Noir (Österreichischer Perlwein)', 'review_body': "With notions of cherry and cinnamon on the nose and just slight fizz, this is a refreshing, fruit-driven sparkling rosé that's full of strawberry and cherry notes—it might just be the very definition of easy summer wine. It ends dry, yet refreshing.", 'points': 85, 'price': 21.0}

Single prompt result: Mit Noten von Kirsche und Zimt in der Nase und nur leicht prickelnd, ist dies ein erfrischender, fruchtiger sprudelnder Rosé, der voller Erdbeer- und Kirschnoten steckt - es könnte genau die Definition von leichtem Sommerwein sein. Er endet trocken, aber erfrischend.

Properties: {'price': 27.0, 'points': 89, 'review_body': 'Beautifully perfumed, with acidity, white fruits and a mineral context. The wine is layered with citrus and lime, hints of fresh pineapple acidity. Screw cap.', 'title': 'Stadt Krems 2009 Steinterrassen Riesling (Kremstal)', 'country': 'Austria'}

Single prompt result: Wunderschön parfümiert, mit Säure, weißen Früchten und einem mineralischen Kontext. Der Wein ist mit Zitrus- und Limettennoten durchzogen, mit Anklängen von frischer Ananas-Säure. Schraubverschluss.

Grouped task result: The first review is for the Gebeshuber 2013 Frizzante Rosé Pinot Noir from Austria, describing it as a refreshing and fruit-driven sparkling rosé with cherry and cinnamon notes. It is said to be the perfect easy summer wine, ending dry yet refreshing.

The second review is for the Stadt Krems 2009 Steinterrassen Riesling from Austria, noting its beautiful perfume, acidity, white fruits, and mineral context. The wine is described as layered with citrus and lime flavors, with hints of fresh pineapple acidity. It is sealed with a screw cap.
```

</details>

:::tip

For more information on the available modeld and their additional options, see the [model providers section](../model-providers/index.md).

:::
## Named vectors

:::info Added in `v1.24`
:::

Any vector-based search on collections with [named vectors](../config-refs/schema/multi-vector.md) configured must include a `target` vector name in the query. This allows Weaviate to find the correct vector to compare with the query vector.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# NamedVectorNearTextGraphql"
      endMarker="# END NamedVectorNearTextGraphql"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

```
Properties: {'country': 'Austria', 'title': 'Gebeshuber 2013 Frizzante Rosé Pinot Noir (Österreichischer Perlwein)', 'review_body': "With notions of cherry and cinnamon on the nose and just slight fizz, this is a refreshing, fruit-driven sparkling rosé that's full of strawberry and cherry notes—it might just be the very definition of easy summer wine. It ends dry, yet refreshing.", 'points': 85, 'price': 21.0}

Single prompt result: Mit Noten von Kirsche und Zimt in der Nase und nur leicht prickelnd, ist dies ein erfrischender, fruchtiger sprudelnder Rosé, der voller Erdbeer- und Kirschnoten steckt - es könnte genau die Definition von leichtem Sommerwein sein. Er endet trocken, aber erfrischend.

Properties: {'price': 27.0, 'points': 89, 'review_body': 'Beautifully perfumed, with acidity, white fruits and a mineral context. The wine is layered with citrus and lime, hints of fresh pineapple acidity. Screw cap.', 'title': 'Stadt Krems 2009 Steinterrassen Riesling (Kremstal)', 'country': 'Austria'}

Single prompt result: Wunderschön parfümiert, mit Säure, weißen Früchten und einem mineralischen Kontext. Der Wein ist mit Zitrus- und Limettennoten durchzogen, mit Anklängen von frischer Ananas-Säure. Schraubverschluss.

Grouped task result: The first review is for the Gebeshuber 2013 Frizzante Rosé Pinot Noir from Austria, describing it as a refreshing and fruit-driven sparkling rosé with cherry and cinnamon notes. It is said to be the perfect easy summer wine, ending dry yet refreshing.

The second review is for the Stadt Krems 2009 Steinterrassen Riesling from Austria, noting its beautiful perfume, acidity, white fruits, and mineral context. The wine is described as layered with citrus and lime flavors, with hints of fresh pineapple acidity. It is sealed with a screw cap.
```

</details>

## Single prompt search

Single prompt search returns a generated response for each object in the query results.<br/>
Define object `properties` – using `{prop-name}` syntax – to interpolate retrieved content in the prompt.<br/>
The properties you use in the prompt do not have to be among the properties you retrieve in the query.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# SingleGenerativePropertiesPython"
      endMarker="# END SingleGenerativePropertiesPython"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# SingleGenerativePropertiesPython"
      endMarker="# END SingleGenerativePropertiesPython"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START SingleGenerativePropertiesTS"
      endMarker="// END SingleGenerativePropertiesTS"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// SingleGenerativeProperties TS"
      endMarker="// END SingleGenerativeProperties TS"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START SingleGenerativeProperties"
      endMarker="// END SingleGenerativeProperties"
      language="gonew"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# SingleGenerativePropertiesGraphQL"
      endMarker="# END SingleGenerativePropertiesGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

```
Property 'question': Including, in 19th century, one quarter of world's land & people, the sun never set on it
Single prompt result: Did you know that in the 19th century, one quarter of the world's land and people were part of an empire where the sun never set? ☀️🌍 #historybuffs #funfact

Property 'question': From Menes to the Ptolemys, this country had more kings than any other in ancient history
Single prompt result: Which country in ancient history had more kings than any other, from Menes to the Ptolemys? 👑🏛️ #historybuffs #ancientkings
```

</details>

### Additional parameters

:::info Added in `v1.30`
:::

You can use *generative parameters* to specify additional options when performing a single prompt search:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# SingleGenerativeParametersPython"
      endMarker="# END SingleGenerativeParametersPython"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START SingleGenerativeParametersTS"
      endMarker="// END SingleGenerativeParametersTS"
      language="ts"
    />
  </TabItem>
  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>
    <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

```
Properties: {'points': 400, 'answer': 'the British Empire', 'air_date': datetime.datetime(1984, 12, 10, 0, 0, tzinfo=datetime.timezone.utc), 'question': "Including, in 19th century, one quarter of world's land & people, the sun never set on it", 'round': 'Double Jeopardy!'}

Single prompt result: Did you know that in the 19th century, the sun never set on the British Empire, which included one quarter of the world's land and people? #triviatuesday #britishempire

Debug: full_prompt: "Convert this quiz question: Including, in 19th century, one quarter of world\'s land & people, the sun never set on it and answer: the British Empire into a trivia tweet."

Metadata: usage {
  prompt_tokens: 46
  completion_tokens: 43
  total_tokens: 89
}

Properties: {'points': 400, 'answer': 'Egypt', 'air_date': datetime.datetime(1989, 9, 5, 0, 0, tzinfo=datetime.timezone.utc), 'question': 'From Menes to the Ptolemys, this country had more kings than any other in ancient history', 'round': 'Double Jeopardy!'}

Single prompt result: Did you know that Egypt had more kings than any other country in ancient history, from Menes to the Ptolemys? #triviathursday #ancienthistory

Debug: full_prompt: "Convert this quiz question: From Menes to the Ptolemys, this country had more kings than any other in ancient history and answer: Egypt into a trivia tweet."

Metadata: usage {
  prompt_tokens: 42
  completion_tokens: 36
  total_tokens: 78
}
```

</details>

## Grouped task search

Grouped task search returns one response that includes all of the query results. By default grouped task search uses all object `properties` in the prompt.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GroupedGenerativePython"
      endMarker="# END GroupedGenerativePython"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GroupedGenerativePython"
      endMarker="# END GroupedGenerativePython"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START GroupedGenerativeTS"
      endMarker="// END GroupedGenerativeTS"
      language="js"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// GroupedGenerative TS"
      endMarker="// END GroupedGenerative TS"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GroupedGenerative"
      endMarker="// END GroupedGenerative"
      language="gonew"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GroupedGenerativeGraphQL"
      endMarker="# END GroupedGenerativeGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

```
Grouped task result: All of these animals are mammals.
```

</details>

### Set grouped task prompt properties

Define object `properties` to use in the prompt. This limits the information in the prompt and reduces prompt length.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GroupedGenerativeProperties Python"
      endMarker="# END GroupedGenerativeProperties Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GroupedGenerativeProperties Python"
      endMarker="# END GroupedGenerativeProperties Python"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START GroupedGenerativeProperties"
      endMarker="// END GroupedGenerativeProperties"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// GroupedGenerativeProperties"
      endMarker="// END GroupedGenerativeProperties"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GroupedGenerativeProperties"
      endMarker="// END GroupedGenerativeProperties"
      language="gonew"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GroupedGenerativePropertiesGraphQL"
      endMarker="# END GroupedGenerativePropertiesGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

```
Grouped task result: The commonality among these animals is that they are all native to Australia.
```

</details>

### Additional parameters

:::info Added in `v1.30`
:::

You can use *generative parameters* to specify additional options when performing grouped tasks:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START GroupedGenerativeParametersPython"
      endMarker="# END GroupedGenerativeParametersPython"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START GroupedGenerativeParametersTS"
      endMarker="// END GroupedGenerativeParametersTS"
      language="ts"
    />
  </TabItem>
  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>
    <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

```
Grouped task result: They are all animals.
Metadata: usage {
  prompt_tokens: 42
  completion_tokens: 36
  total_tokens: 78
}
```

</details>

## Working with images

You can also supply images as a part of the input when performing retrieval augmented generation in both single prompts and grouped tasks. 
The following fields are available for generative search with images:
- `images`: A base64 encoded string of the image bytes.
- `image_properties`: Names of the properties in Weaviate that store images for additional context.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START WorkingWithImages"
      endMarker="# END WorkingWithImages"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START WorkingWithImages"
      endMarker="// END WorkingWithImages"
      language="ts"
    />
  </TabItem>
  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>
    <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

```
Properties: {'points': 800, 'answer': 'sheep', 'air_date': datetime.datetime(2007, 12, 13, 0, 0, tzinfo=datetime.timezone.utc), 'question': 'Australians call this animal a jumbuck or a monkey', 'round': 'Jeopardy!'}
Properties: {'points': 100, 'answer': 'Australia', 'air_date': datetime.datetime(2000, 3, 10, 0, 0, tzinfo=datetime.timezone.utc), 'question': 'An island named for the animal seen <a href="http://www.j-archive.com/media/2000-03-10_J_01.jpg" target="_blank">here</a> belongs to this country [kangaroo]', 'round': 'Jeopardy!'}
Properties: {'points': 300, 'air_date': datetime.datetime(1996, 7, 18, 0, 0, tzinfo=datetime.timezone.utc), 'answer': 'Kangaroo', 'question': 'Found chiefly in Australia, the wallaby is a smaller type of this marsupial', 'round': 'Jeopardy!'}

Grouped task result: I'll formulate a Jeopardy!-style question based on the image of the koala:

Answer: This Australian marsupial, often mistakenly called a bear, spends most of its time in eucalyptus trees.

Question: What is a koala?
```

</details>

## Related pages

- [Connect to Weaviate](/developers/weaviate/connections/index.mdx)
- [Model provider integrations](../model-providers/index.md).
- [API References: GraphQL: Get](../api/graphql/get.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
