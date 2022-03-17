---
layout: layout-documentation
bodyclass: ["page--guides", " "]
solution: weaviate
sub-menu: Getting started
title: Quick start
intro: This quick start guide will give you a 10-minute tour of Weaviate. You will set up your Weaviate with Docker, add an example dataset with news articles, make your first queries to browse through your data, and let Weaviate perform automatic classification.
description: Get started with Weaviate
tags: ['quick start']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# **Run Weaviate with a demo dataset**

There are many different ways how you can run Weaviate, from local development setups up to large scale Kubernetes environments or hosted and managed Weaviate clusters. For this quick start guide we will be using the [Docker Compose](https://docs.docker.com/compose/) setup where you can run Weaviate on your local machine to which we will add the demo dataset with news publications.

The Docker Compose files below contain both Weaviate and the dataset.

Download the Docker Compose file

```bash
$ curl -o docker-compose.yml https://raw.githubusercontent.com/semi-technologies/DEMO-datasets/6cddc4e11e37bc5334fcfb29e78c7038306db60a/newspublications/docker-compose.yml
```

Run Docker (optional: run with `-d` to run Docker in the background)

```bash
$ docker-compose up
```

Weaviate will be available and preloaded with the news article demo dataset on:

- `http://localhost:8080/v1`

# **Validate via the RESTful API**

You will always use Weaviate via its HTTP API interface. The interface consists of two different interfaces:

- The RESTful API, which is mostly used to add and manipulate data.
- The GraphQL API (which also runs over HTTP) to query data.

We will first check if Weaviate runs correctly, if the schema is added successfully, and if the data is available. In the example below, we will show you how to do it from the command line.

First, we want to check if Weaviate is running correctly by inspecting the `/v1/meta` endpoint.

_Note: make sure to replace `localhost:8080` with the location of your Weaviate if you have your Weaviate running on a different endpoint or location._

```bash
$ curl -s http://localhost:8080/v1/meta
```

The output will look something like this:

```json
{
  "contextionaryVersion": "en0.16.0-v0.4.15",
  "contextionaryWordCount": 818080,
  "hostname": "http://[::]:8080",
  "version": {{ site.weaviate_version }}
}
```

This validates that your Weaviate is running correctly.

Next, we want to check if the news publication schema was added correctly, you can do this by inspecting the `/v1/schema` endpoint.

```bash
$ curl -s http://localhost:8080/v1/schema
```

The output will look something like this:

```json
{
  "actions": {
    "classes": [],
    "type": "action"
  },
  "things": {
    "classes": [
      {
        "class": "Publication",
        "description": "A publication with an online source",
        "properties": [
          {
            "dataType": [
              "string"
            ],
            "description": "Name of the publication",
            "name": "name"
          },
          {
            "dataType": [
              "geoCoordinates"
            ],
            "description": "Geo location of the HQ",
            "name": "headquartersGeoLocation"
          },
          { 
            "dataType": [
              "Article"
            ],
            "description": "The articles this publication has",
            "name": "hasArticles"
          }
        ]
      },
      {
        "class": "Author",
        "description": "Normalised types",
        "properties": [
          {
            "dataType": [
              "string"
            ],
            "description": "Name of the author",
            "name": "name"
          },
          { 
            "dataType": [
              "Article"
            ],
            "description": "Articles this author wrote",
            "name": "wroteArticles"
          },
          { 
            "dataType": [
              "Publication"
            ],
            "description": "The publication this author writes for",
            "name": "writesFor"
          }
        ]
      },
      {
        "class": "Article",
        "description": "Normalised types",
        "properties": [
          {
            "dataType": [
              "text"
            ],
            "description": "title of the article",
            "name": "title"
          },
          {
            "dataType": [
              "string"
            ],
            "description": "url of the article",
            "name": "url"
          },
          {
            "dataType": [
              "text"
            ],
            "description": "summary of the article",
            "name": "summary"
          },
          {
            "dataType": [
              "date"
            ],
            "description": "date of publication of the article",
            "name": "publicationDate"
          },
          {
            "dataType": [
              "int"
            ],
            "description": "Words in this article",
            "name": "wordCount"
          },
          { 
            "dataType": [
              "Author",
              "Publication"
            ],
            "description": "authors this article has",
            "name": "hasAuthors"
          },
          {
            "dataType": [
              "Publication"
            ],
            "description": "publication this article is in",
            "name": "inPublication"
          },
          {
            "dataType": [
              "Category"
            ],
            "description": "category this article is of",
            "name": "ofCategory"
          },
          {
            "dataType": [
              "boolean"
            ],
            "description": "whether the article is currently accessible through the url",
            "name": "isAccessible"
          }
        ]
      },
      {
        "class": "Category",
        "description": "Category an article is a type off",
        "properties": [
          {
            "dataType": [
              "text"
            ],
            "description": "category name",
            "name": "name"
          }
        ]
      }
    ],
    "type": "thing"
  }
}
```

You should be able to identify three classes: `Publication`, `Author` and, `Article`.

Lastly, we will validate if all data was added correctly, we will do this via the `/v1/things` endpoint.

```bash
$ curl -s http://localhost:8080/v1/things
```

The output will look something like this:

```json
{
  "deprecations": null,
  "things": [
    {
      "class": "Article",
      "creationTimeUnix": 1599571064928,
      "id": "1b5a45d6-ff81-310a-8805-008118b3da1a",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/7408c2c3-1847-37e8-88c2-bf234247bf74",
            "href": "/v1/things/7408c2c3-1847-37e8-88c2-bf234247bf74"
          },
          {
            "beacon": "weaviate://localhost/things/95f4b35d-15ab-3f21-971e-92bda57a447c",
            "href": "/v1/things/95f4b35d-15ab-3f21-971e-92bda57a447c"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "summary": "Connolly was diagnosed with Parkinson’s disease six years ago, just as he reached his three score years and 10. “I have good days and bad days,” he says. Facebook Twitter Pinterest Connolly with Gerry Rafferty, his partner in the folk duo the Humblebums, in 1967. But he seems to me for the most part, I say, to be going on pretty well. “I walk down the street and people shout: ‘Hey Billy, how’s it going?’ It’s great,” he says.",
        "title": "Billy Connolly: ‘Getting famous was like going up a helter-skelter backwards’",
        "url": "https://www.theguardian.com/culture/2019/oct/06/billy-connolly-interview-tall-tales-book-fame-helter-skelter-backwards",
        "wordCount": 3795
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571064950,
      "id": "8ab6ddcc-2569-362f-bf4c-13dfb568bc36",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/c7089737-7144-3b05-8007-3f0f739d3fee",
            "href": "/v1/things/c7089737-7144-3b05-8007-3f0f739d3fee"
          },
          {
            "beacon": "weaviate://localhost/things/16476dca-59ce-395e-b896-050080120cd4",
            "href": "/v1/things/16476dca-59ce-395e-b896-050080120cd4"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/16476dca-59ce-395e-b896-050080120cd4",
            "href": "/v1/things/16476dca-59ce-395e-b896-050080120cd4"
          }
        ],
        "summary": "House Democrats are really impeaching the millions of people who elected President Trump in 2016, \"Fox & Friends: Weekend\" co-host Pete Hegseth said Wednesday. HOUSE TO VOTE ON ARTICLES OF IMPEACHMENT AGAINST PRESIDENT TRUMP: LIVE UPDATES\"That's what this -- this is what the Democrats have missed. They have made it all about an obsession of Donald Trump who crashed their party. On Wednesday, the historic vote on two articles of impeachment -- charges of abuse of power and obstruction of Congress -- is slated for 6 p.m. They think the American people are dumb enough to think they can nullify your vote.\"",
        "title": "Pete Hegseth: Dems are really impeaching the American people -- 'they think you're dumb'",
        "url": "https://www.foxnews.com/media/pete-hegseth-impeachment-house-democrats-republicans-president-trump",
        "wordCount": 458
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571064967,
      "id": "4c7e462f-fa52-32a6-acd0-70d854daa377",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/46dbc061-5fe3-3ac5-a87c-c01a301d2b22",
            "href": "/v1/things/46dbc061-5fe3-3ac5-a87c-c01a301d2b22"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/f2968730-9ce5-3e6f-8e64-b6b9f68984b0",
            "href": "/v1/things/f2968730-9ce5-3e6f-8e64-b6b9f68984b0"
          }
        ],
        "summary": "“This trial in so many ways crystallized the completely diametrically opposed threats that Democrats and Republicans see to the country,” Murphy told The Times’s Nicholas Fandos. “We perceive Donald Trump and his corruption to be an existential threat to the country. They perceive the deep state and the liberal media to be an existential threat to the country. “That dichotomy, that contrast, has been growing over the last three years, but this trial really crystallized that difference. We were just speaking different languages, fundamentally different languages when it came to what this trial was about.",
        "title": "Opinion | Trump, Unrepentant and Unleashed",
        "url": "https://www.nytimes.com/2020/02/01/opinion/sunday/trump-impeachment-trial-witnesses.html",
        "wordCount": 404
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571064994,
      "id": "8676e36a-8d60-3402-b550-4e792bb9d32f",
      "schema": {
        "hasAuthors": [],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "summary": "On this week's episode of The Game Informer Show, we discuss The Last of Us Part II's recent State of Play where we finally see some uninterrupted gameplay, and we cover the recent reviews of Minecraft Dungeons and Monster Train. You can watch the video above, subscribe and listen to the audio on iTunes or Google Play, listen on SoundCloud, stream it on Spotify, or download the MP3 at the bottom of the page. Our thanks to the talented Super Marcato Bros. for The Game Informer Show's intro song. You can hear more of their original tunes and awesome video game music podcast at their website. The Last of Us Part II State of Play Reactions: 6:32Minecraft Dungeons Review Discussion: 21:39Monster Train: 39:11Community Emails: 51:23",
        "title": "GI Show - The Last of Us Part II State of Play, Minecraft Dungeons, and Monster Train",
        "url": "https://www.gameinformer.com/video-podcast/2020/05/28/gi-show-the-last-of-us-part-ii-minecraft-dungeons-monster-train",
        "wordCount": 256
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065020,
      "id": "d920f2fe-64ac-34f8-a428-9f7e4a944128",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/f2968730-9ce5-3e6f-8e64-b6b9f68984b0",
            "href": "/v1/things/f2968730-9ce5-3e6f-8e64-b6b9f68984b0"
          },
          {
            "beacon": "weaviate://localhost/things/6b471290-6bb6-3b9b-a190-a7a97f79a2d2",
            "href": "/v1/things/6b471290-6bb6-3b9b-a190-a7a97f79a2d2"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/f2968730-9ce5-3e6f-8e64-b6b9f68984b0",
            "href": "/v1/things/f2968730-9ce5-3e6f-8e64-b6b9f68984b0"
          }
        ],
        "summary": "“Common misconceptions about impeachment are that impeachment by itself means removal from office. Everybody in the White House recognized how damaging this could be.” As the House drafted articles of impeachment, Nixon lost the support of his party. The printer would always break.” After committee hearings, the House brought formal impeachment charges. So help you, God.” “This is a copy of the rules of the Senate for handling impeachment. “This is my ticket to the impeachment trial of President Bill Clinton.",
        "title": "Trump Impeachment Vote Live Updates: Bursts of Debate as House Considers Charges Against Trump",
        "url": "http://www.nytimes.com/2019/12/18/us/politics/impeachment-vote.html",
        "wordCount": 1168
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065100,
      "id": "021d1eb7-7f0f-3c7f-bab3-74df62db02a4",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "summary": "Thanks to backwards compatibility and shared libraries, most of the games on this list will likely make their way to Xbox Series X or PlayStation 5. If you have a list or pile of backlog games, dive in. Most of Insomniac's games were critically acclaimed and sold well, but for whatever reason, Sunset Overdrive didn't make many waves. If you want a fun, colorful, and often humorous game to play, give it a shot. CHILDREN OF MORTADeveloper: Dead MageSystems: PlayStation 4, Xbox One, Switch, PC, MacRelease: September 3, 2019I'm not going to stop banging this drum.",
        "title": "Five Games You May Have Missed But Should Play Before This Generation Ends",
        "url": "https://www.gameinformer.com/2020/07/08/five-games-you-may-have-missed-but-should-play-before-this-generation-ends",
        "wordCount": 780
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065120,
      "id": "373d28fb-1898-313a-893b-5bc77ba061f6",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/aebad723-fe82-3d91-84d5-ff5400cdc8ce",
            "href": "/v1/things/aebad723-fe82-3d91-84d5-ff5400cdc8ce"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          },
          {
            "beacon": "weaviate://localhost/things/8ba7279b-7f63-31b9-84d4-f2ac8e5212fb",
            "href": "/v1/things/8ba7279b-7f63-31b9-84d4-f2ac8e5212fb"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "summary": "I love E3 because it’s a great event showcasing what’s ahead for gaming. The Legend of Heroes: Trails of Cold Steel III (PS4)Release: September 24I’ve expressed my admiration for this series more than a few times, because it captures a classic-but-also-not-dated feel. At E3, I was able to see how Cold Steel III is shaping up by going hands-on with the beginning section of the game. If you choose to go in blind, Cold Steel III will feature a guide to catch you up on the previous games. Klei came out at E3 with a new trailer and post detailing the changes and why development is taking longer than expected.",
        "title": "Five RPGs You May Have Overlooked From E3",
        "url": "https://www.gameinformer.com/rpg-grind-time/2019/07/03/five-rpgs-you-may-have-overlooked-from-e3",
        "wordCount": 1361
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065163,
      "id": "337a939e-cd6d-3dc7-bf6b-1cb5ddf49988",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/eaa33b83-3927-3aaf-af4b-4990c79485da",
            "href": "/v1/things/eaa33b83-3927-3aaf-af4b-4990c79485da"
          },
          {
            "beacon": "weaviate://localhost/things/955ba2c7-a968-352c-80cd-2d321397e785",
            "href": "/v1/things/955ba2c7-a968-352c-80cd-2d321397e785"
          },
          {
            "beacon": "weaviate://localhost/things/eaa33b83-3927-3aaf-af4b-4990c79485da",
            "href": "/v1/things/eaa33b83-3927-3aaf-af4b-4990c79485da"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/eaa33b83-3927-3aaf-af4b-4990c79485da",
            "href": "/v1/things/eaa33b83-3927-3aaf-af4b-4990c79485da"
          }
        ],
        "summary": "On Brexit night, on Friday night, you may have to do the bongs, because there will not be any official Independence Day bongs from the Big Ben. Just after Brexit day. So just to be absolutely clear what we're talking about, so from Brexit day itself. And since a big part of Brexit, a big part of the philosophy of Brexit, is we left behind...Take back control. There'll be other ones that hadn't occurred to us at all that will become really, really difficult.",
        "title": "Brexit Day: are we there yet?",
        "url": "https://www.ft.com/video/6a92b2ee-bfe1-4e1e-8f8a-7a830111b7dd?playlist-name=section-38dbd827-fedc-3ebe-919f-e64cf55ea959&playlist-offset=0",
        "wordCount": 4652
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065183,
      "id": "00327619-fdfa-37cd-a003-5d2e66ae2fec",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/4cad32e9-92ed-338e-b536-66729fd4918a",
            "href": "/v1/things/4cad32e9-92ed-338e-b536-66729fd4918a"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "summary": "While businesses are looking to create their own changemaker strategies, charities and non-governmental organisations (NGOs) are carrying on with their day jobs. Consider the wide-reaching activities of Action Against Hunger, an NGO committed to saving children’s lives across almost 50 countries. “Critical to this mission is creating change,” says Matthew White, director of fundraising and communications. “We take an unwanted item, in the form of a bike, and use it to achieve social change. “We try to find and attract the people who want to make a difference,” says White of Action Against Hunger.",
        "title": "From chefs to cyclists: how inspiring charities make a change",
        "url": "https://www.theguardian.com/changemakers-for-a-better-tomorrow/2019/sep/26/from-chefs-to-cyclists-how-inspiring-charities-make-a-change",
        "wordCount": 908
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065379,
      "id": "bf1c61ac-e049-39e6-939e-4d3d15962a0c",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/3928cc1b-cd17-3160-a07d-174009ad62de",
            "href": "/v1/things/3928cc1b-cd17-3160-a07d-174009ad62de"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/fa207f19-e080-3902-982c-393d321776be",
            "href": "/v1/things/fa207f19-e080-3902-982c-393d321776be"
          }
        ],
        "summary": "(CNN) — The UK government has relaxed quarantine rules for travelers from a number of destinations, including France, Italy, Belgium, Germany and Spain. From July 10, visitors arriving in England from 58 selected countries will no longer be required to self-isolate for 14 days. Approved destinationsTravelers arriving in England from 58 countries now no longer need to go into quarantine. While travelers from the named countries won't have to self-isolate, they'll still need to provide the address of where they'll be staying for the duration of their trip. According to the UK Department for Transport, the approved destinations pose \"a reduced risk to the public health of UK citizens.\"",
        "title": "UK eases quarantine rules for travelers",
        "url": "https://edition.cnn.com/travel/article/uk-eases-quarantine-rules-for-travelers/index.html",
        "wordCount": 387
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065408,
      "id": "2d993e82-ca6f-3b67-b17a-4e467265cca6",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/1610712e-1749-33e2-ac8b-4c8fdc6cfd81",
            "href": "/v1/things/1610712e-1749-33e2-ac8b-4c8fdc6cfd81"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/b7285ce8-a172-3053-b74d-7200a96bce26",
            "href": "/v1/things/b7285ce8-a172-3053-b74d-7200a96bce26"
          }
        ],
        "summary": "“Uncut Gems”, their latest project, is their most ambitious yet. “Uncut Gems” is an excruciatingly tense and unpleasant film, anchored by an electrifying performance by Mr Sandler. Mr Sandler allows himself to blend into the strange and hypnotic sensibility of the film. Simmering with tension, “Uncut Gems” is often difficult to watch as Howard makes one bad decision after another. “Uncut Gems” was released in America on December 13th.",
        "title": "Precious little - “Uncut Gems” is a masterwork of tension",
        "url": "https://www.economist.com/prospero/2019/12/16/uncut-gems-is-a-masterwork-of-tension",
        "wordCount": 533
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065428,
      "id": "518d5a8e-85e8-3567-8fa6-e66f78d47ded",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/2b4eef03-32f7-3e32-8e6e-77ad1328b4fc",
            "href": "/v1/things/2b4eef03-32f7-3e32-8e6e-77ad1328b4fc"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          },
          {
            "beacon": "weaviate://localhost/things/455c9df0-1fa6-3645-9ec1-94073f5cb8b5",
            "href": "/v1/things/455c9df0-1fa6-3645-9ec1-94073f5cb8b5"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "summary": "In Wasteland 3, you’ll manage a team of up to six Rangers as they battle for survival while exploring Colorado’s Rocky Mountains. To help you explore this winter wasteland, your team boards a tank-like truck – called the Kodiak – outfitted with a wild assortment of weapons. We felt that we should go ahead and make the vehicle fun to use. You can adjust how fast your vehicle moves, both when you're driving around the world map and in combat. As part of development, we drive around the world map for hours at a time to take notes on different things.",
        "title": "Everything You Need To Know About Wasteland 3’s Vehicular Combat",
        "url": "https://www.gameinformer.com/2020/06/23/everything-you-need-to-know-about-wasteland-3s-vehicular-combat",
        "wordCount": 901
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065514,
      "id": "a657da21-c839-3955-a872-42808d52a5c7",
      "schema": {
        "hasAuthors": [],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/fa207f19-e080-3902-982c-393d321776be",
            "href": "/v1/things/fa207f19-e080-3902-982c-393d321776be"
          }
        ],
        "summary": "(CNN) — India is a country that loves its food -- and street food is no exception. Before you tuck into some chaat, however, read our guide on the do's and don't's of Indian street food to keep tummy troubles at bay. Better still, build up your spice tolerance in the first few days of your trip before stepping out to eat street food. While it is not ideal, street food is a one-off indulgence so chances are you'll be fine. Related content Indian food: The best dishes in each regionDo: Eat where the locals eatIf there are two identical street food stalls side by side, always go for the one with the long line.",
        "title": "India's street food: Safety tips for delicious discoveries",
        "url": "https://edition.cnn.com/travel/article/india-street-food-safety-tips-intl-hnk/index.html",
        "wordCount": 1085
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065523,
      "id": "22425b4b-2de0-3a51-80ae-96dbdb1f6f02",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "summary": "For the bull shark that lurks in the dark waters below, this idyllic scene is a lunch buffet. That’s Maneater, an open-water RPG by Tripwire Interactive that puts you in control of an enraged bull shark. The shark’s journey to adulthood is cleverly presented as a reality show that does a great job fleshing out the antagonist, a hunter named Scaly Pete who ripped the baby bull shark from her mother’s womb. These upgrades are silly in concept, but they help sell the idea of this bull shark being unique and capable of being the king of the sea. Each of the 13 hunters brings plenty of firepower and support.",
        "title": "Maneater Review – King Of The Sea",
        "url": "https://www.gameinformer.com/review/maneater/maneater-review-king-of-the-sea",
        "wordCount": 1007
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065537,
      "id": "30d7e8d8-4ac3-3be5-944b-781d27ee03c6",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/1610712e-1749-33e2-ac8b-4c8fdc6cfd81",
            "href": "/v1/things/1610712e-1749-33e2-ac8b-4c8fdc6cfd81"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/b7285ce8-a172-3053-b74d-7200a96bce26",
            "href": "/v1/things/b7285ce8-a172-3053-b74d-7200a96bce26"
          }
        ],
        "summary": "“Our goal,” declared Mrs von der Leyen, “is to reconcile the economy with the planet.” Her plan is large on ambition, but in many places frustratingly vague on detail. Mrs von der Leyen’s green opus promises to draft legislation that would enshrine the 2050 target by March 2020. That last point makes the Green Deal’s second headline statement, regarding a nearer-term 2030 target, rather more significant. Mrs von der Leyen declared the Green Deal “Europe’s man-on-the-Moon moment”. It remains to be seen whether Mrs von der Leyen’s word is as good as Kennedy’s.",
        "title": "The EU’s Green Deal is full of ambition but needs more detail",
        "url": "https://www.economist.com/europe/2019/12/12/the-eus-green-deal-is-full-of-ambition-but-needs-more-detail",
        "wordCount": 960
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065548,
      "id": "f547ace1-9b5d-3ca5-a86a-e61e9f21d9aa",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/c9885466-1eae-362f-93b0-0aabfed3119c",
            "href": "/v1/things/c9885466-1eae-362f-93b0-0aabfed3119c"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "summary": "The first season of The Mandalorian screams “video game,” and could (and should) be used as a blueprint for one. Mando’s tasks are stripped from the video game playbook – escort, infiltration, and even being asked to clear out a courtyard of enemies (complete with a turret sequence). I could see Destiny’s overall design working well for The Mandalorian game: Bounce from planet to planet and explore open environments for bounty targets. In the game, players wouldn’t just have to be a Mandalorian; they could also be an IG unit or a former Republic shock trooper like Cara Dune. I don’t think I need to say any more; the show is a damn video game, and I want to play it.",
        "title": "The Mandalorian Should Be A Video Game",
        "url": "https://www.gameinformer.com/2019/12/05/the-mandalorian-should-be-a-video-game",
        "wordCount": 914
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065605,
      "id": "f60e8906-9585-3a7f-af63-0ac7ba98b54e",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/eaa33b83-3927-3aaf-af4b-4990c79485da",
            "href": "/v1/things/eaa33b83-3927-3aaf-af4b-4990c79485da"
          },
          {
            "beacon": "weaviate://localhost/things/eaa33b83-3927-3aaf-af4b-4990c79485da",
            "href": "/v1/things/eaa33b83-3927-3aaf-af4b-4990c79485da"
          },
          {
            "beacon": "weaviate://localhost/things/eaa33b83-3927-3aaf-af4b-4990c79485da",
            "href": "/v1/things/eaa33b83-3927-3aaf-af4b-4990c79485da"
          },
          {
            "beacon": "weaviate://localhost/things/ab4b9465-2563-38b7-9903-991335f665ec",
            "href": "/v1/things/ab4b9465-2563-38b7-9903-991335f665ec"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/eaa33b83-3927-3aaf-af4b-4990c79485da",
            "href": "/v1/things/eaa33b83-3927-3aaf-af4b-4990c79485da"
          }
        ],
        "summary": "So the three points you're trying to get over in a CV are that you take responsibility, you achieve things, and that you're nice to have around. As well as fashion, music is something that I'm really, really, really enthusiastic and passionate about. That's something that you should start thinking about as you sit down to write your CV and start applying for jobs. You can't really write on here, I'm a nice person to have around. But what you can do is show, with third-party endorsements, that other people think you're nice.",
        "title": "How to write a top-notch CV",
        "url": "https://www.ft.com/video/fb1b22c3-61ec-4bd0-8411-ecc4f2d677ff",
        "wordCount": 2063
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065622,
      "id": "1b60b0a3-d4c9-30c7-a706-8765132accb6",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/79a744a2-4b7c-3289-afd9-1f4aeb61ef3d",
            "href": "/v1/things/79a744a2-4b7c-3289-afd9-1f4aeb61ef3d"
          },
          {
            "beacon": "weaviate://localhost/things/ae2bf880-a02d-3838-a7f2-684a854e1d39",
            "href": "/v1/things/ae2bf880-a02d-3838-a7f2-684a854e1d39"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "summary": "The People’s Bank of China (PBoC) announced it would launch the operation on Monday, to ensure a stable currency and “reasonable and abundant liquidity” in the banking system. Over the weekend, the PBoC also announced more monetary and credit support for hospitals and medical institutions at the frontline of the battle against the Wuhan coronavirus. Goldman Sachs predicts it could knock Chinese growth down to 5.5% for the year, from 6.1% in 2019. IGSquawk (@IGSquawk) Weekend markets update:#DAX 12877 -0.50%#DOW 28086 -0.71%#FTSE 7221 -0.56%#HANGSENG 25711 -1.17%#GBPUSD 13185 -0.16%#IGWeekendMarkets“The markets continue to view the Wuhan virus through the lens of the Sars epidemic of 2002-03. The death toll from the coronavirus passed 300 people on Sunday, with the first fatality outside China recorded in the Philippines.",
        "title": "1.2tn yuan to be pumped into Chinese markets to fight coronavirus slump",
        "url": "https://www.theguardian.com/business/2020/feb/02/12tn-yuan-to-be-injected-into-chinese-economy-to-fight-coronavirus-slump",
        "wordCount": 500
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065655,
      "id": "a602be70-7262-3e70-999f-e339108043ba",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/1610712e-1749-33e2-ac8b-4c8fdc6cfd81",
            "href": "/v1/things/1610712e-1749-33e2-ac8b-4c8fdc6cfd81"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/b7285ce8-a172-3053-b74d-7200a96bce26",
            "href": "/v1/things/b7285ce8-a172-3053-b74d-7200a96bce26"
          }
        ],
        "summary": "They crumpled together on a low armchair, almost on each other’s laps, she eating custard as he sipped tea. The Irish priest at the Catholic mission in Kutama thought he had “unusual gravitas” and would “be an important somebody”. As an African nationalist in Rhodesia, ruled by Ian Smith in the name of white supremacy, jail was inevitable. At Lancaster House in London, amid talk of independence and elections, the British foreign secretary found him “reptilian”, “not human”. Young thugs, egged on by him, punished white farmers by taking their land away.",
        "title": "Obituary: Robert Mugabe died on September 6th",
        "url": "https://www.economist.com/obituary/2019/09/12/obituary-robert-mugabe-died-on-september-6th",
        "wordCount": 1040
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065685,
      "id": "0b96f47d-6106-3ae1-8ff0-e3b233318fd5",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/e5bc6507-7d0b-3b44-b9bd-04bfeafccf3c",
            "href": "/v1/things/e5bc6507-7d0b-3b44-b9bd-04bfeafccf3c"
          },
          {
            "beacon": "weaviate://localhost/things/20bfae66-ad99-3af7-9666-c47f30f7ab18",
            "href": "/v1/things/20bfae66-ad99-3af7-9666-c47f30f7ab18"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/7e9b9ffe-e645-302d-9d94-517670623b35",
            "href": "/v1/things/7e9b9ffe-e645-302d-9d94-517670623b35"
          }
        ],
        "summary": "In late June, the Dixie Chicks dropped the word “Dixie” from its name. The band’s statement was brief and elegant: “We want to meet this moment.” The Dixie Chicks were founded in Texas, in 1989. The band’s name was a riff on “Dixie Chicken,” a 1973 album by the chooglin’ rock band Little Feat. “These resonances are part of what the Dixie Chicks selected when they selected the name, whether they intended to or not,” Gregory Downs, a professor of history at the University of California at Davis, said. Country radio—which was then operated in large part by the media conglomerate Clear Channel—blacklisted the Chicks’ music.",
        "title": "Why the Chicks Dropped Their “Dixie”",
        "url": "https://www.newyorker.com/magazine/2020/07/20/why-the-chicks-dropped-their-dixie",
        "wordCount": 1242
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065731,
      "id": "894030f8-c855-3b2a-95c0-751f46331cfb",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/9ae7aeba-b6a0-3895-98e9-1e0da763af81",
            "href": "/v1/things/9ae7aeba-b6a0-3895-98e9-1e0da763af81"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "summary": "State legislator Rodney Garcia insists constitution says socialists should be jailed or shot, according to Billings GazetteMontana Republican rebuked for saying socialists should be ‘jailed or shot'The Republican party of Montana has rebuked a state legislator who insists the US constitution says socialists should be jailed or shot. Garcia’s Democratic opponent in the last election cycle was Amelia Marquez, a trans Sanders supporter who describes herself as a democratic socialist. The Gazette said Garcia, who said socialism was “very dangerous” for Montana, could not say where the constitution says socialists should be shot or jailed, but repeated that he thought it should happen. “They’re enemies of the free state,” Garcia said. The Washington Post asked Anthony Johnstone, a law professor at the University of Montana, to analyse Garcia’s claim.",
        "title": "Montana Republican rebuked for saying socialists should be ‘jailed or shot'",
        "url": "https://www.theguardian.com/us-news/2020/feb/03/montana-republican-rodney-garcia-socialists-comment",
        "wordCount": 489
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065764,
      "id": "d0f6f55d-2645-39e6-b01e-91cd68dd3119",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/aebad723-fe82-3d91-84d5-ff5400cdc8ce",
            "href": "/v1/things/aebad723-fe82-3d91-84d5-ff5400cdc8ce"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          },
          {
            "beacon": "weaviate://localhost/things/8ba7279b-7f63-31b9-84d4-f2ac8e5212fb",
            "href": "/v1/things/8ba7279b-7f63-31b9-84d4-f2ac8e5212fb"
          },
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/7abf5426-5048-31ce-9c0a-822c58b19b47",
            "href": "/v1/things/7abf5426-5048-31ce-9c0a-822c58b19b47"
          }
        ],
        "summary": "Yes, Your Grace is straightforward on the surface, and only takes a few hours to complete a single run. My biggest annoyance with Yes, Your Grace is I could never figure out what type of strategy it was aiming for. Despite these maddening occasions, Yes, Your Grace paints shades of gray and asks interesting questions. Yes, Your Grace is a somber tale, and there aren’t “good choices.” The game has multiple endings, with some being more satisfying than others. But Yes, Your Grace requires too much hindsight and replaying through content to see better outcomes, which is more repetitive than eye-opening.",
        "title": "Yes, Your Grace Review – Somber Victories",
        "url": "https://www.gameinformer.com/review/yes-your-grace/yes-your-grace-review-somber-victories",
        "wordCount": 1003
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065821,
      "id": "ec083038-17d6-3d10-b3c6-f2d4b2519733",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/956b326d-3b01-39b1-9eeb-3d750e84a1e5",
            "href": "/v1/things/956b326d-3b01-39b1-9eeb-3d750e84a1e5"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "summary": "Quick guide White phosphorus Show Hide What is white phosphorus? White phosphorus, known as WP, is a chemical that burns fiercely in contact with air, producing thick white acrid smoke and a white light that can be useful for illumination. International humanitarian law allows the use of white phosphorus in munitions for making smoke to mask troop movements and for illumination purposes. While white phosphorus has toxic chemical properties, it is not generally used to poison or asphyxiate, the common aim of chemical weapons. For this reason, rules governing its use tend to fall under the wider provision of humanitarian law rather than specific prohibitions on chemical weapons.",
        "title": "Ilhan Omar writes to US Syria envoy over Turkish white phosphorus allegations",
        "url": "https://www.theguardian.com/world/2019/dec/18/ilhan-omar-asks-for-facts-of-white-phosphorus-use-on-syrian-kurds-by-turkey",
        "wordCount": 709
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065832,
      "id": "42c22ceb-f1c5-3943-a2ee-e014cd2b1cc1",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/65759dbd-5975-39e5-870a-c4abfb010b98",
            "href": "/v1/things/65759dbd-5975-39e5-870a-c4abfb010b98"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783",
            "href": "/v1/things/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          }
        ],
        "summary": "To understand the “real” story of Prince Harry and Meghan Markle, it helps to think in three dimensions. Facebook Twitter Pinterest Piers Morgan: ‘one of the most vehement critics of the royal couple’. So, when reading about Harry and Meghan, it really does pay to keep your wits about you. A little bit of each of those would help the rest of us understand better and trust more. Alan Rusbridger is principal of Lady Margaret Hall, Oxford University, and chairs the Reuters Institute for the Study of Journalism.",
        "title": "There’s a reason why the royals are demonised. But you won’t read all about it | Alan Rusbridger",
        "url": "https://www.theguardian.com/commentisfree/2020/jan/19/there-is-a-reason-why-royals-demonised-but-wont-read-all-about-it-prince-harry-meghan-markle",
        "wordCount": 946
      },
      "vectorWeights": null
    },
    {
      "class": "Article",
      "creationTimeUnix": 1599571065868,
      "id": "8aeff886-8457-326d-ae91-80ac8dadd3c9",
      "schema": {
        "hasAuthors": [
          {
            "beacon": "weaviate://localhost/things/8bd6f08d-49f4-3ab8-8c1a-d078583b7765",
            "href": "/v1/things/8bd6f08d-49f4-3ab8-8c1a-d078583b7765"
          }
        ],
        "inPublication": [
          {
            "beacon": "weaviate://localhost/things/16476dca-59ce-395e-b896-050080120cd4",
            "href": "/v1/things/16476dca-59ce-395e-b896-050080120cd4"
          }
        ],
        "summary": "Kate Beckinsale started acting when she was still a college student and one of her biggest breakout roles was in Michael Bay's 2001 romantic war drama \"Pearl Harbor.\" In a candid interview with Women’s Health magazine for its January/February 2020 cover, Beckinsale revealed she was asked to lose weight for the movie. KATE BECKINSALE SHOWS OFF LONG LEGS, ABS IN LEOPARD-PRINT BIKINI“It wasn’t great,\" she admitted about the request. KATE BECKINSALE POSES PARTLY NUDE IN STUNNING INSTAGRAM SELFIEThe \"Underworld\" star also spoke about the challenges of maintaining relationships while living in the public eye. \"And I witness men constantly doing whatever they like – whether that’s in relationships, or deciding to buy a motorbike, and getting a tattoo.",
        "title": "Kate Beckinsale says she was asked to lose weight for 'Pearl Harbor' role",
        "url": "https://www.foxnews.com/entertainment/kate-beckinsale-lose-weight-pearl-harbor",
        "wordCount": 491
      },
      "vectorWeights": null
    }
  ],
  "totalResults": 25
}
```

# Query the dataset with GraphQL

### Your First Query

Let's first get all news publications out.

```bash
$ echo '{ 
  "query": "{
    Get {
      Things {
        Publication {
          name
        }
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql
```

You can also find which articles are related to these publications.

```bash
$ echo '{ 
  "query": "{
    Get {
      Things {
        Publication {
          name
          HasArticles{
            ... on Article{
              title
            }
          }
        }
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql
```

And you can even go deeper, to find which authors are related to these publications.

```bash
$ echo '{ 
  "query": "{
    Get {
      Things {
        Publication(limit: 3) {
          name
          HasArticles{
            ... on Article{
              title
              HasAuthors {
                ... on Author{
                  name
                }
              }
            }
          }
        }
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql

```

When querying for articles, you can also add classic filters to narrow down your search.

``` bash
$ echo '{ 
  "query": "{
    Get {
      Things {
        Article(
          where:{
            operator: GreaterThanEqual
            path: ["wordCount"]
            valueInt: 1000
          }
          limit: 10
        ) {
          title
          summary
          wordCount
        }
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql
```


Do you want to know how many articles, authors and publications there are? This is something you can find using the Aggregate{} function.

```bash
$ echo '{ 
  "query": "{
    Aggregate{
      Things{
        Publication{
          meta{
            count
          }
        }
        Author{
          meta{
            count
          }
        }
        Article{
          meta{
            count
          }
          wordCount {
            count
            maximum
            mean
            median
            minimum
            mode
            sum
            type
          }
        }
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql
```


# Explore with semantic search

In Weaviate, you can also semantically explore your datasets. Let's search for articles related to money.

```bash
$ echo '{ 
  "query": "{
    Get {
      Things {
        Article(
          explore: {
            concepts: ["money"]
          }
          limit: 10
        ) {
          title
          summary
        }
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql
```

You can also combine filters!

```bash
$ echo '{ 
  "query": "{
    Get {
      Things {
        Article(
          explore: {
            concepts: ["rideSharing"]
          }
          where:{ 
            operator:And
            operands: [{
              operator: GreaterThan
              path: ["wordCount"]
              valueInt: 200
            }, {
              operator:Like
              path:["title"]
              valueString:"*tax*"
            }]
          }
          limit: 10
        ) {
          title
          summary
          wordCount
        }
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql
```

Or group similar topics semantically together. Look how the Publications `International New York Times`, `The New York Times Company` and `New York Times` are merged.

_Tip: play around with the force variable._

```bash
$ echo '{ 
  "query": "{
    Get {
      Things {
        Publication(
          group: {
            type: merge
            force: 0.05
          }
        ) {
          name
        }
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql
```

# Automatic classification

If you run the following query, you might notice that there are no categories classified for articles.

```bash
$ echo '{ 
  "query": "{
    Get {
      Things {
        Article {
          title
          OfCategory {
            ... on Category {
              name
            }
          }
        }
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql
```

Here we can use Weaviate's auto-classification function to let Weaviate decide which categories to attach to news publications.

To do this, we will use the RESTful API.

```bash
$ curl http://localhost:8080/v1/classifications -X POST -H 'Content-type: application/json' -d \
'{
    "class": "Article",
    "type": "contextual",
    "basedOnProperties": [
        "summary"
    ],
    "classifyProperties": [
        "ofCategory"
    ]
}' | jq .
```

When Weaviate is done with the classification, you can rerun the previous query and see how Weaviate classified all articles.

```bash
$ echo '{ 
  "query": "{
    Get {
      Things {
        Article {
          title
          OfCategory {
            ... on Category {
              name
            }
          }
        }
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql
```

By using the RESTful API, you can even get statistics related to the classification. You can find the `{CLASSIFICATION ID}` in the returned body of the query that started the classification.

```bash
$ curl -k http://localhost:8080/v1/classifications/{CLASSIFICATION ID} | jq .
```

# What's next
In this tutorial you learned about how to quickly set up a Weaviate with a demo dataset, use semantic search and classification. Next, check out the following:
- Check out how to [spin up a Weaviate](./installation.html) with your own [schema](../how-tos/how-to-create-a-schema.html) and [data](../how-tos/how-to-import-data.html).
- Learn more about [authentication](../configuration/authentication.html) and [authorization](../configuration/authorization.html).
- Install one of the [client libraries](../client-libraries/index.html) for smooth interaction with the Weaviate APIs.
- Consult the [RESTful API references](../restful-api-references/index.html) and the [GraphQL references](../graphql-references/index.html) to learn about all interaction possibilities with Weaviate. 

# More resources

{% include docs-support-links.html %}