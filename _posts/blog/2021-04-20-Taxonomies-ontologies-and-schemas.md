---
layout: post
title: Taxonomies, ontologies, and schemas in Weaviate
description: "How Weaviate deals with taxonomies, ontologies, and schemas."
published: true
author: Bob van Luijt
author-img: /img/people/icon/bob.jpg
card-img: /img/blog/hero/Taxonomies-ontologies-and-schemas-card.png
hero-img: /img/blog/hero/Taxonomies-ontologies-and-schemas.png
canonical-url: https://medium.com/semi-technologies/taxonomies-ontologies-and-schemas-how-do-they-relate-to-weaviate-9f76739fc695
canonical-name: Medium
date: 2021-04-20
toc: true
---

<!-- TODO: make sure the content is up to date -->
<!-- TODO: update markdown formatting -->

## Intro
Because [Weaviate](/){:target="_blank"} has a graph-like data model, people often [ask questions](https://stackoverflow.com/questions/67175671/how-to-encode-a-taxonomy-in-weaviate-contextionary){:target="_blank"} about how Weaviate deals with taxonomies, ontologies, and schemas. And to make things even more complicated, Weaviate is adding terminology like vectorizers and contextionary to the mix.

Confusing? fret not! It’s actually quite simple…

## Taxonomies, ontologies, and schemas
1. [A taxonomy has a hierarchy](https://stangarfield.medium.com/whats-the-difference-between-an-ontology-and-a-taxonomy-c8da7c56fbea){:target="_blank"} (e.g., an elephant is of the order Proboscidea, which is of the class Mammalia and of the kingdom Animalia)
1. An ontology distinguishes concepts and their relationships (an elephant with the name Alice that lives in a zoo that is located in Amsterdam).
1. [Ontologies focus more on the semantic relationships whereas schemas focus more on the data structure](https://www.researchgate.net/post/What-is-the-difference-between-RDF-Schema-and-Ontology-OWL/53bd6b11d5a3f2b0558b45a5/citation/download){:target="_blank"} (e.g., the data class Elephant that has the data properties: name and livesIn).

* Because Weaviate is a database (or a vector search engine to be more ontologically correct), it uses a schema.
* Rule of thumb I — any taxonomy or ontology you have can be translated into a Weaviate schema.
* Good to know — Weaviate’s schema structure is inspired by the Semantic Web and RDF. That means that classes have capitalized first characters and properties have lowercased first characters.
* Rule of thumb II — almost any graph ontology can be translated into a Weaviate schema.

## Classes and properties in Weaviate
Now we know Weaviate works with a schema, you need to know one more thing. It uses a (by RDF inspired) Class/property structure.

* A class describes a worldly thing (e.g., Elephant, Document, Email, Animal, Photo, House, Rocketship, etc)
* A class can have one or more properties, for example, a Document has a filename, an Email a subject, an Animal a name, etc)
* Properties have a data type, e.g., a name is a string, a datum a date, a price a float, etc.

When you run [a clean Weaviate installation](/developers/weaviate/current/getting-started/installation.html){:target="_blank"}, the first thing you need to do is [create a schema](/developers/weaviate/current/tutorials/how-to-create-a-schema.html){:target="_blank"}. The demo dataset in the Weaviate Documentation contains Publishers and Articles that you can checkout as an example, you can also [inspect the schema of the demo dataset](https://demo.dataset.playground.semi.technology/v1/schema){:target="_blank"}.

* Good to know I — [Weaviate ❤️ GraphQL](/developers/weaviate/current/graphql-references/#graphql){:target="_blank"}. Therefore, the way GraphQL is structured ❤️ Weaviate.
* Good the know II — inside Weaviate (like in any other database), you can create any class and any property you like.

Sometimes users create super simple schema’s for example only the class Document with the properties title and content. Sometimes users create more complex schemas. You can create whatever schema your use cases need.

When you are done creating the schema, you can add data to Weaviate. These individual data objects are called… **data objects** 😎

## Vectorizing data objects
What makes Weaviate unique, is that every data object is accompanied by a vector representation. You can set the vector yourself or you can use one of the [modules](/developers/weaviate/current/modules/){:target="_blank"} (we have an ever-growing amount of them available or you can [create your own](/developers/weaviate/current/modules/custom-modules.html){:target="_blank"}).

For example, the following query shows all vector representations for the objects in our news article dataset that represent the news outlets (e.g., The Economist, New York Times, etc). You can run the query in the [Weavite Console](https://console.semi.technology/console/query#weaviate_uri=https://demo.dataset.playground.semi.technology&graphql_query=%7B%0A%20%20Get%20%7B%0A%20%20%20%20Publication%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20vector%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A){:target="_blank"}.

```graphql
{
  Get {
    Publication {
      name
      _additional {
        vector
      }
    }
  }
}
```

* Good to know — the difference between data objects and graph nodes in Weaviate is the same. So you can interchange “node” with “data object” depending on how you like to use it.

## Vector searches on data objects
Because the vector representations function as coordinates in a space, you can do nearest neighbor searches or automatic classifications! This is the juicy part of Weaviate! The gif below shows example queries. You can also try these queries out yourself on our news article demo dataset.

* [Show articles related to “housing prices”](https://console.semi.technology/console/query#weaviate_uri=https://demo.dataset.playground.semi.technology&graphql_query=%7B%0A%20%20Get%20%7B%0A%20%20%20%20Article(%0A%20%20%20%20%20%20nearText%3A%20%7B%0A%20%20%20%20%20%20%20%20concepts%3A%20%5B%22Housing%20prices%22%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20operator%3A%20Equal%0A%20%20%20%20%20%20%20%20path%3A%20%5B%22inPublication%22%2C%20%22Publication%22%2C%20%22name%22%5D%0A%20%20%20%20%20%20%20%20valueString%3A%20%22The%20Economist%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20inPublication%20%7B%0A%20%20%20%20%20%20%20%20...%20on%20Publication%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20certainty%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D){:target="_blank"}
* [Run a question answering (Q&A) query](https://console.semi.technology/console/query#weaviate_uri=https://demo.dataset.playground.semi.technology&graphql_query=%7B%0A%20%20Get%7B%0A%20%20%20%20Article(%0A%20%20%20%20%20%20ask%3A%20%7B%0A%20%20%20%20%20%20%20%20question%3A%20%22What%20did%20Jemina%20Packington%20predict%3F%22%0A%20%20%20%20%20%20%20%20properties%3A%20%5B%22summary%22%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20limit%3A%201%0A%20%20%20%20)%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20inPublication%20%7B%0A%20%20%20%20%20%20%20%20...%20on%20Publication%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20answer%20%7B%0A%20%20%20%20%20%20%20%20%20%20endPosition%0A%20%20%20%20%20%20%20%20%20%20property%0A%20%20%20%20%20%20%20%20%20%20result%0A%20%20%20%20%20%20%20%20%20%20startPosition%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D){:target="_blank"}

![Example queries](/img/blog/taxonomies-ontologies-and-schemas/example-queries.gif)

## What next
Check out the [Getting Started with Weaviate](/developers/weaviate/current/getting-started/quick-start.html){:target="_blank"} and begin building amazing apps with Weaviate.

You can reach out to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/SeMI_tech){:target="_blank"}.

Weaviate is open source, you can see the follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don't forget to give us a ⭐️ while you are there.