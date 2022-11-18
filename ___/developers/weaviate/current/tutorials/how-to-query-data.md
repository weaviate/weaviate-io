---
layout: layout-documentation
solution: weaviate
sub-menu: Tutorials
title: How to query data?
intro: How to query data in Weaviate?
description: How to query data in Weaviate?
tags: ['how to', 'query data']
sidebar_position: 4
open-graph-type: article
toc: true
redirect_from:
    - /documentation/weaviate/current/tutorials/how-to-query-data.html
---

# Introduction

- Weaviate has RESTful API endpoints to query data, but Weaviate's query language is [GraphQL](https://graphql.org/). 
- You can query a Weaviate after you've created a [schema](./how-to-create-a-schema.html) and [populated it](./how-to-import-data.html) with data.

# Prerequisites

 1. **Connect to a Weaviate instance.**\\
 If you haven't set up a Weaviate instance yet, check the [Getting started guide](../getting-started/installation.html). In this guide we assume your instance is running at `http://localhost:8080` with [text2vec-contextionary](../getting-started/installation.html) as vectorization module.
 2. **Upload a schema**. \\
 Learn how to create and upload a schema [here](./how-to-create-a-schema.html). In this guide we assume to have a similar schema uploaded with the classes `Publication`, `Article` and `Author`.
 3. **Add data**. \\
 Make sure there is data available in your Weaviate instance, you can read how to do this in the [previous guide](./how-to-import-data.html). In this tutorial we assume there are data objects of `Publication`s, `Article`s and `Author`s present.


# How to get data

**1. Define a query.**

   The easiest GraphQL queries to get data from Weaviate are [`Get{}`](../graphql-references/get.html) queries. Let's say we want to retrieve all the articles (there title, authors, url and wordCount) that are published by "Wired", the GraphQL query will look as follows:

   ```graphql
    {
      Get {
        Article ( where: {
          operator:Equal,
          valueString:"Wired",
          path: ["inPublication", "Publication", "name"]
        }) {
          title
          url
          wordCount
          hasAuthors{
            ... on Author {
              name
            }
          }
        }
      }
    }
   ```

**2. Send the query**

   There are multiple ways to connect to Weaviate's (GraphQL) API to query data. Raw GraphQL queries can be directly posted in the GraphiQL interface in the Console, but can also be sent via curl, the [Python](../client-libraries/python.html) or [JavaScript](../client-libraries/javascript.html) client.

   {% include code/1.x/howto.query.data.html %}

   {% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article++%28where%3A+%7B%0D%0A++++++operator%3AEqual%2C%0D%0A++++++valueString%3A%22Wired%22%2C%0D%0A++++++path%3A+%5B%22inPublication%22%2C+%22Publication%22%2C+%22name%22%5D%0D%0A++++%7D%29%7B%0D%0A++++++title%0D%0A++++++url%0D%0A++++++wordCount%0D%0A++++++hasAuthors%7B%0D%0A++++++++...+on+Author+%7B%0D%0A++++++++++name%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

1. **View the results**\\
   The results of the previous query looks something like the following in JSON:
   ```json
   {
    "data": {
      "Get": {
        "Article": [
          {
            "hasAuthors": [
              {
                "name": "Condé Nast"
              },
              {
                "name": "Vince Beise"
              },
              {
                "name": "Vince Beiser"
              },
              {
                "name": "Wired Staff"
              }
            ],
            "title": "The War Vet, the Dating Site, and the Phone Call From Hell",
            "url": "https://www.wired.com/story/the-phone-call-from-hell#intcid=recommendations_wired-homepage-right-rail-popular_1ef3340d-1896-4aff-9f81-0caa132856ac_popular4-1",
            "wordCount": 731
          },
          {
            "hasAuthors": [
              {
                "name": "Matt Simon"
              },
              {
                "name": "Matt Simo"
              }
            ],
            "title": "Not to Ruin the Super Bowl, but the Sea Is Consuming Miami",
            "url": "https://www.wired.com/story/rising-seas-are-coming-for-miamis-super-bowls#intcid=recommendations_default-popular_b3b30847-4aa3-4970-8e77-f7558a7cccd8_popular4-1",
            "wordCount": 586
          },
          {
            "hasAuthors": [
              {
                "name": "Condé Nast"
              },
              {
                "name": "Gregory Barbe"
              }
            ],
            "title": "The Startup That Aims to Decrypt Blockchain for Business",
            "url": "https://wired.com/story/startup-aims-decrypt-blockchain-business/",
            "wordCount": 636
          },
          {
            "hasAuthors": [
              {
                "name": "Lauren Goode"
              },
              {
                "name": "Lauren Good"
              }
            ],
            "title": "The Biggest Apple Maps Change Is One You Can't See",
            "url": "https://www.wired.com/story/apple-maps-redesign#intcid=recommendations_wired-homepage-right-rail-popular_291bba78-5a92-4551-a70b-2b93d1cd3e7a_popular4-1",
            "wordCount": 543
          },
          {
            "hasAuthors": [
              {
                "name": "Will Knight"
              },
              {
                "name": "Will Knigh"
              }
            ],
            "title": "Apple's Latest Deal Shows How AI Is Moving Right Onto Devices",
            "url": "https://www.wired.com/story/apples-deal-shows-ai-moving-devices/",
            "wordCount": 680
          },
          {
            "hasAuthors": [
              {
                "name": "Condé Nast"
              }
            ],
            "title": "Traveling for the Holidays? Here's How to Not Get Sick",
            "url": "https://wired.com/story/traveling-for-the-holidays-heres-how-to-not-get-sick/",
            "wordCount": 608
          },
          {
            "hasAuthors": [
              {
                "name": "Graeme Mcmillan"
              },
              {
                "name": "Graeme Mcmilla"
              }
            ],
            "title": "Sanders and Warren's Big Debate Dust-Up Tops This Week's Internet News Roundup",
            "url": "https://www.wired.com/story/internet-week-253/",
            "wordCount": 364
          },
          {
            "hasAuthors": [
              {
                "name": "Condé Nast"
              },
              {
                "name": "Michael Hard"
              },
              {
                "name": "Laura Mallonee"
              },
              {
                "name": "Michael Hardy"
              }
            ],
            "title": "The Neveda Town Where Storm Area 51 Sort Of Happened",
            "url": "https://www.wired.com/story/rachel-nevada-area-51/",
            "wordCount": 511
          },
          {
            "hasAuthors": [
              {
                "name": "Laura Mallonee"
              },
              {
                "name": "Laura Mallone"
              },
              {
                "name": "Chris Colin"
              },
              {
                "name": "Adam Rogers"
              }
            ],
            "title": "Homelessness in the Living Rooms of the Rich",
            "url": "https://www.wired.com/story/san-francisco-shelters-living-room/",
            "wordCount": 502
          }
        ]
      }
    },
    "errors": null
   }
   ```

# Next steps

- Make more advanced queries, for example to explore data with semantic search, in the [next tutorial](./how-to-perform-a-semantic-search.html).
- View other GraphQL methods in the [GraphQL documentation](../graphql-references/index.html).

# More resources

{% include docs-support-links.html %}