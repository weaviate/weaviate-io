---
title: Google Summer of Code 2022
og: /img/og/google-summmer/gsoc.jpg
---

# Contribute to Weaviate this summer during Google Summer of Code

Are you looking for a challenge in the summer? Apply for Google Summer of Code, learn about Open Source development and contribute to Weaviate!

Read more about the program and apply at the [Google Summer of Code website](https://summerofcode.withgoogle.com/).

# About Weaviate

Weaviate is an open-source vector database that stores both objects and vectors, allowing for combining vector search with structured filtering with the fault-tolerance and scalability of a cloud-native database, all accessible through GraphQL, REST, and various language, clients. Read more about Weaviate [here](/developers/weaviate/).

# How to register

We value initiative, creativity, and motivation. To show your initiative, creativity, and motivation, add your ideas on how you would approach this challenge to your submission. Please also mention your previous projects (if any) and which technologies and tools you are comfortable with. In addition, don't forget what you want to learn during the Summer of Code competition, both in terms of technology and other (soft) experiences.

Don't hesitate to contact us for questions about the challenge and the Open Source project Weaviate.

If you’re interested, you can apply through [our form](https://forms.gle/H6WDByjYbs8ReEuk9) (or via our [Slack](https://weaviate.io/slack) in the #gsoc channel), and don't forget to apply on the [GSoC website.](https://summerofcode.withgoogle.com/). So you'll need to apply on both websites!

## How to create a project application/proposal?**

We expect your application to be in the range of 1000-1500 words. Your proposal should contain all the relevant information which are stated below and must explain in depth about the problem you are solving, the tools, data structures, algorithms etc. that are required in order for you to successfully complete the project. Your proposal should contain at least the following information, plus anything you think is relevant:

* Your name, email, slack handle (relevant information)
* Title of your proposal.
* Abstract of your proposal.
* Detailed description of your idea including explanation on why is it innovative and what it will contribute to the project and to Weaviate.
* Description of previous work, existing solutions (links to prototypes, bibliography, are more than welcome).
* Mention the details of your academic studies, any previous work, internships, relevant work experience or to open source. (Previous GSOC, PRs your made, etc.)
* Relevant skills that will help you to achieve the goal (programming languages, frameworks, etc. )?
* Do you plan to have any other commitments during GSoC that may affect your work? Any vacations/holidays? Will you be available full time to work on your project? (Please refrain from applying if you cannot manage your time and cannot guarantee 100% commitment.)
* Also, you must join our Slack and get in touch with the mentors before hand so that they’ll help you draft an amazing application by reviewing it ahead of time. (Note:  This must be done one week ahead of the submission deadline).

The best way to demonstrate your capability would be to submit a small patch/pull request ahead of the project selection for an existing issue or a new issue. We always prefer candidates who are self motivated and can do great with some guidance from the mentors, and have some understanding of Machine Learning, Natural Language Processing and Vector Search.

Make sure to both sign up on **both** [our form](https://forms.gle/H6WDByjYbs8ReEuk9), and on the [GSoC website.](https://summerofcode.withgoogle.com/).

You can pick any project idea from the list below.

If you have other ideas that are not in this list, contact the team first to make sure it is relevant to our organization.

If you have questions or new ideas, don't hesitate to contact us through our [Slack channel](https://weaviate.io/slack)

## Prerequisites

Depending on the challenge, different skills are preferred. It does not mean that you should be an expert in these technologies, but make sure to show strong motivation for what you want to learn. We have mentors that will guide you this summer to becoming an open source contributor.

## Mentors

We are happy to announce a great pool of mentors this year. Depending on the subject, they will guide you through the GSoC process and help you with your contribution to Weaviate!
* [Laura Ham](https://www.linkedin.com/in/laura-ham/)
* [Saurabh Rai](https://www.linkedin.com/in/srbh077/)
* [Bob van Luijt](https://www.linkedin.com/in/bobvanluijt/)
* [Stefan Bogdan](https://www.linkedin.com/in/stefan-bogdan/)
* [Etienne Dilocker](https://www.linkedin.com/in/etienne-dilocker-60727b175/)
* [Marcin Antas](https://www.linkedin.com/in/antasmarcin/)
* [Sila Uygun](https://www.linkedin.com/in/silauygun/)
* [Donna van der Rijst](https://www.linkedin.com/in/donna-van-der-rijst-693586123/)

## Ideas:

### 1. Make a new multi-model example with Weaviate (e.g. images and text), using the CLIP model or a new multi-modal ML model.

**Project Description**: Weaviate is a vector database that is completely modularized. The Core of Weaviate, without any modules attached, is a pure vector-native database. The functionality of a vector-native database can be enriched by modules. One or more modules can be attached, for example to *vectorize* data or other functionalities like *question answering*. The goal of this project is to make a new example using one of Weaviate's multi-modal modules. For example, you can make a tutorial using a dataset that combines image and text.

**Required Skills:** The ability to understand Weaviate’s Core and its vector search. Understanding of multi-modal ML Models. Medium advanced knowledge of Python. Basic understanding of Docker and docker compose (containerization). Good to have basic understanding of ML and NLP, not mandatory.

**topics:** Python, New Feature, Machine Learning, NLP

**Difficulty Level:** Easy

**Expected Length**: 175 Hours

**Mentors**: Laura Ham, Saurabh Rai, Bob van Luijt, Stefan Bogdan

**Expected outcome:** A new repository with a new Weaviate example. There should be a multi-modal dataset used, together with one of Weaviate's multi-modal modules. There should be a detailed explanation or tutorial (may be in Google Colab) to how to use the code.

**Documentation:**

* [Developers · Weaviate Documentation](/developers/weaviate/)
* [Modules · Weaviate Documentation](/developers/weaviate/modules/)
* [CLIP · Weaviate Documentation](/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-clip)

---

### 2. Any new demo (e.g. python notebook) that can be integrated into our website/examples etc.

**Project Description:** If you're new to Weaviate (or any other new piece of software), people are always very helped by looking at examples. Example datasets loaded in Weaviate, with example queries, are a perfect start for a Weaviate-newbie. So we can't get enough of these demos! You create a Google Colab notebook, and/or a page on Weaviate's website and/or write a blog post with a new demo. You can use a dataset of you're liking, for example from Kaggle.com or https://paperswithcode.com/datasets.
If you're new to ML and Weaviate, but are already a bit familiar with Python, then this project is perfect for you!

**Required Skills:** It’s a beginner-level project. Ability to understand Weaviate’s Core and its vector search. Being proficient in Python and being able to experiment with new features to add new example using either an existing module or via a new module.

**topics:** Python, New Feature, Machine Learning, Demo

**Difficulty Level:** Easy

**Expected Length**: 175 Hours

**Mentors**: Laura Ham, Saurabh Rai, Donna van der Rijst, Stefan Bogdan

**Expected outcome:** A new repository with a new Weaviate example. There should be a detailed explanation or tutorial (may be in Google Colab) to how to use the code. You will also learn how to adapt Weaviate's documentation website, so you can document your code and present a tutorial on how to use it.

**Documentation:**

* [Awesome Weaviate · GitHub](https://github.com/weaviate/awesome-weaviate)

---

### 3. Make Weaviate work on the edge. (e.g. running Weaviate in the browser using a weaviate.js)

**Project Description:** Weaviate is a vector database and database that runs in a dockerized container. This project is about adapting Weaviate such that it is able to run it on the edge (e.g. in the browser using a weaviate.js).

**Required Skills:** For this project, you'll need to be familiar with programming languages like JavaScript. Being able to work with Docker is a pre.

**topics:** Web/Fronted, New Feature, Dashboard

**Difficulty Level:** Medium

**Expected Length**: 350 Hours

**Mentors**: Laura Ham, Saurabh Rai, Sila Uygun, Marcin Antas

**Expected outcome:** A weaviate.js module that enables Weaviate usage as module in a browser.

**Documentation**

* [JavaScript/TypeScript · Weaviate Documentation](/developers/weaviate/client-libraries/typescript)
<!-- * [Weaviate CLI · Weaviate Documentation](/developers/weaviate/client-libraries/_cli.md) -->

---

### 4. Make a new Weaviate module (e.g. [gene2vec](https://github.com/jingcheng-du/Gene2vec#:~:text=Gene2Vec%20is%20a%20distributed%20representation,sets%20from%20the%20GEO%20databases.), or a new type of ML model)

**Project Description:** Weaviate is a vector database that is completely modularized. The Core of Weaviate, without any modules attached, is a pure vector-native database. The functionality of the vector-native database can be enriched by modules. One or more modules can be attached, for example to vectorize data or other functionalities like question answering. The goal of this project is to make a new module for Weaviate. Think about a gene2vec model or a text2text generation like summarization model).  See [here](/developers/weaviate/modules/other-modules/custom-modules#how-to-build-and-use-a-custom-module) for more details.
You'll be guided and supported by Etienne and Marcin who are Go-gurus, so you can learn along the way

**Required Skills:**  Creating a new type of Weaviate module by using our Weaviate.go module. Basic knowledge of golang is required.

**topics:** Golang

**Difficulty Level:** Medium

**Expected Length**: 175 Hours

**Mentors**: Laura Ham, Saurabh Rai, Etienne Dilocker, Marcin Antas

**Expected outcome:** A new Weaviate module [code](https://github.com/weaviate/weaviate/tree/master/modules) and [documentation](/developers/weaviate/modules/).

**Documentation:**

* [Gene2vec · GitHub](https://github.com/jingcheng-du/Gene2vec#:~:text=Gene2Vec%20is%20a%20distributed%20representation,sets%20from%20the%20GEO%20databases)

---

### 5. Make Weaviate support a new datatype (e.g. videos, or 3D models, etc)

**Project Description:** At the moment, Weaviate is able to store [datatypes](/developers/weaviate/config-refs/datatypes) like text and images. The goal of this project is to create a new datatype for Weaviate, like speech, videos or 3D mesh. You'll work in Go.
You'll be guided and supported by Etienne and Marcin who are Go-gurus, so you can learn along the way.

**Required Skills:** Check the Go Documentation and Modules Documentation below to get an understanding of how to create new/custom modules. The knowledge of Machine Learning & NLP Based Models like text2vec, word vectors, etc. is important. Medium-advanced knowledge of golang is desired.

**topics:** Golang, New Feature

**Difficulty Level:** Hard

**Expected Length**: 350 Hours

**Mentors**: Laura Ham, Saurabh Rai, Etienne Dilocker, Marcin Antas

**Expected outcome:** Code in [Weaviate](https://github.com/weaviate/weaviate) that supports a new datatype.

**Documentation:**

* [Go · Weaviate Documentation](/developers/weaviate/client-libraries/go)
* [Custom modules · Weaviate Documentation](/developers/weaviate/modules/other-modules/custom-modules)
* [Modules · Weaviate Documentation](/developers/weaviate/modules/)

---

### 6. Improve the Weaviate CLI (CLI Based Improvements)

**Project Description:** Weaviate has a Command Line Interface (CLI), written in Python. This CLI tool is a text-based interface used to interact with a Weaviate instance by typing direct commands. Using the CLI you can configure a Weaviate instance and import and export a schema and data. Your goal is to improve the functionality of the CLI to improve its UX and for it to be able to use all REST functions through the CLI  (right now this is very limited). You'll work in Python, and will be supported and guided by the current creator of the CLI.

**Required Skills:** Create a new CLI or improve upon the existing CLI to make it more User Friendly, and be able to interact with Weaviate instances (running in the cloud) in a better manner. Medium knowledge of Python required.

**topics:** Enchantment, New Feature, CMD, CLI, Python

**Difficulty Level:** Easy

**Expected Length**: 175 Hours

**Mentors**: Laura Ham, Saurabh Rai, Stefan Bogdan, Bob van Luijt

**Expected outcome:** Extension of the CLI in Python code with a list of functionalities like (but not limited to):
    * Data schema REST calls
    * Data REST calls

<!-- **Documentation:**
[Weaviate CLI · Weaviate Documentation](/developers/weaviate/client-libraries/cli) -->

---

### 7. Create a SQL to Weaviate schema converter

**Project Description:** Weaviate's schema is suited to represent SQL schemas. The idea is to create a converter from SQL to Weaviate. It might be nice to even integrate an import function based on this schema. Because SQL doesn't have a concept as vector representation or vectorizers. You might want to add an example like WordPress to Weaviate.

**Required Skills:** Knowledge about SQL and basic knowledge about Weaviate schemas.

**topics:** SQL

**Difficulty Level:** Moderate

**Expected Length**: 40 Hours

**Mentors**: Laura Ham, Saurabh Rai, Stefan Bogdan

**Expected outcome:** A CLI tool (or extension of the Weaviate CLI too) that allows converting SQL schemas into Weaviate schemas.

**Documentation:**
[Weaviate schema · Weaviate Documentation](/developers/weaviate/api/rest/schema)
<!-- [Weaviate CLI · Weaviate Documentation](/developers/weaviate/client-libraries/cli) -->

---

### 8. Your Own Idea

**Project Description:** If you are an out of the box thinker, and have a great understanding about vector search, and you can contribute in a manner not listed above. Feel free to contact the team on Slack so that we can discuss the possibilities and create that idea.

**Required Skills:** n/a

**topics:** Machine Learning, NLP

**Difficulty Level:** Easy, Medium or Hard

**Expected Length**: 175 Hours or 350 hours

**Mentors**: Laura Ham

**Expected outcome:** A new great idea... Surprise us!

**Documentation:**
* [Developers · Weaviate Documentation](/developers/weaviate/)

If you have questions or new ideas, don't hesitate to contact us through our [Slack channel](https://weaviate.io/slack)
