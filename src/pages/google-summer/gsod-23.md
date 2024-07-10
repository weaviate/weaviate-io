---
title: Google Season of Docs 2023
image: /img/og/google-summmer/gsod.jpg
---

## Google Season of Docs 2023 - Proposal

This is a technical writing proposal for participating in [Google Season of Docs 2023](https://developers.google.com/season-of-docs).

Season of Docs gives technical writers the opportunity to gain experience in open source by contributing to documentation.

This page contains Weaviate's proposal for Season of Docs 2023. If our proposal is accepted by Google, we will initially look within Weaviate's user community to identify those with technical writing skills to help with the projects described below.

## Proposal title: Help us build tests for our code examples

### About Weaviate
Weaviate (current version v1.18.1, first release 2019) is an open-source vector database that enables users to harness the power of modern machine learning models, such as language models.

Weaviate stores data objects and vector embeddings from ML-models, helping our user scale the impact and power of these models into production. Weaviate enables efficient searching, ranking, and recommendation algorithms, making them the foundation of ML deployments across various industries. It can be used with pre-built or custom-trained ML models to perform semantic search, one-shot classification, question answering, NER, multi-modal search, and much more, on a large scale.

Read more about Weaviate [here](/developers/weaviate/).

### About our users and contributors
Weaviate caters to industry-agnostic data challenges, attracting users from diverse fields.

Weaviate has been applied in areas such as product search and categorization in e-commerce, video captioning, knowledge bases, image-text search, and scientific paper analysis. It has also been utilized to extend the capabilities of large language models by providing them with grounded data through Weaviate to build platforms for tasks such as analyzing code bases.

Current contributors to Weaviate include developers and data scientists, who have for example contributed to use a new type of ML model with Weaviate. User contributions to our documentation and supplementary documentation through personal blogs and platforms have also been valuable.

## About the project

### The problem

We have a [Weaviate documentation](/developers/weaviate/) site that is itself maintained as an open-source project ([GitHub](https://github.com/weaviate/weaviate-io)).

Our documentation includes extensive code examples in many languages (`Python`, `JavaScript`, `Java`, `Go`, `shell` and `GraphQL`).

One key challenge for us is keeping our documentation up-to-date with the fast-paced development of the codebase, especially as these code examples are in multiple languages. The result has been that unfortunately in some cases our users work with either outdated, or worse - broken code examples.

To address this, we seek to develop processes for testing our code examples in our documentation, which will immensely improve the quality and consistency of our code examples.

### Project scope

In this project, the technical writer will collaborate with the Documentation team to:

* Develop and implement a method for testing code examples (Python, JavaScript, Java, Go, shell, and GraphQL) as an integral part of the documentation process.

Specific project tasks include:

* Review the documentation to catalog:
    * The data sets being queried.
* Coordinate with the Weaviate team to establish a testing strategy, which includes:
    * Reviewing and consolidating the datasets used for example code,
    * Building Weaviate instances to be used for testing,
    * Developing a workflow including suitable testing triggers (e.g a pre-commit hook or continuous integration action).
* Develop guidelines and best practices for writing tests.
* Compose clear and concise documentation explaining how to conduct such tests.
* Update existing code examples by applying the newly established testing methodology.
* Work with the Weaviate team to develop 2-3 new tutorials based on existing code examples, including implementing tests to follow the newly established testing methodology.
<!-- * Nice to have: linters/formatters for all language running automatically -->

:::note Support provided
The technical writer is not expected to complete the tasks mentioned above by themselves, particularly those requiring potentially challenging programming work such as implementing code for tests.

Instead, they will collaborate with the Weaviate team to outline the tests and subsequently document the guidelines and processes for utilizing these tests in the future.
:::

### Measuring the project success

To measure the project success, we will track:
* Test coverage,
* Reduction in reported issues, and
* Adoption of new processes.

More specifically, we seek:
* Test coverage of at least 80% of the existing code examples across the Weaviate documentation.
* A 50% reduction in the number of reported issues related to code examples in the documentation within three months of implementing the testing methodology.
* Adoption of the newly developed guidelines and best practices for writing tests by the Documentation team, aiming for 100% compliance within two months of their introduction.

A successful completion will benefit the Weaviate team and the user base by immediate identification and therefore opportunities to reduce errors. In the medium term, this will also lead to faster turnaround for issue resolution and identification of out-of-date code examples, for example using deprecated patterns.

### Timeline

The project will start in April 2023 and end in November 2023. The first month will be spend on hiring the technical writer and May will be dedicated to orientation.

* April: Hiring
* May: Orientation & setup audit plan (including user study)
* June: Audit & Create writing plan
* July-September: Write documentation
* October: Gather feedback from community and incorporate feedback in docs
* November: Complete the project

### Project budget

* Technical writer: $6000
* Total: $6000

### What skills would a technical writer need to work on this project?

Must have:
* Familiarity with Git + GitHub (or willingness to learn).
* Familiarity with command line environments - e.g. using the shell, bash/zsh profiles, and environment variables.
* Proficiency with at least one of (Python, JavaScript, Java or Go).
* The ability to work with a team and openness to feedback.
* A positive attitude and enthusiasm for learning.

Nice to have:
* Familiarity with writing in Markdown (or willingness to work through markdown tutorials).
* Familiarity with the concept of software testing.
* Familiarity with Weaviate, natural language processing or deep learning.

### Volunteers & Mentors

* [JP Hwang](https://www.linkedin.com/in/jp-hwang/) as mentor from Weaviate
* TBD

### Contact info

Technical writers interested in working on this project should send an email to careers AT weaviate.io, **before May 1st, 2023**. Please include links to your technical writing work or portfolio/résumé/CV.

## Additional information

Join our community [slack](https://weaviate.io/slack) to say hello, get to know the community or ask questions.
