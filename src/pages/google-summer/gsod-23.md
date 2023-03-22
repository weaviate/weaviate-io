---
title: Google Season of Docs 2023
og: /img/og/google-summmer/gsod.jpg
---

# Google Season of Docs 2023 - Proposal

This is a technical writing proposal for participating in [Google Season of Docs 2023](https://developers.google.com/season-of-docs). Season of Docs gives technical writers the opportunity to gain experience in open source by contributing to documentation.

This page contains Weaviate's proposal to participate in Season of Docs 2023. If our proposal is accepted by Google, we will initially look within Weaviate's user community to identify those with technical writing skills to help with the projects described below.

Technical writers interested in working on this project should send an email to careers AT weaviate.io, **before May 1st**. Please include links to your technical writing work or portfolio/résumé/CV.

# **Proposal Title - Help automate our code examples**

## **About Weaviate**
Weaviate is an open-source vector database. It allows our users to extend what they can do with modern machine learning models such as language models.

Weaviate can store data objects and vector embeddings from ML-models, and scale seamlessly into billions of data objects. Beyond search, Weaviate's next-gen vector database can power a wide range of innovative apps, including vector and hybrid searches, as well as using a generative model in combination with Weaviate.

Over the course of the last few years, we have seen our community grow rapidly, including community members as well as community contribution.

### **The problem that Weaviate solves**
Machine learning models such as language models represent data as high-dimensional vectors, also called embeddings. One challenge with using embeddings is that the volume with which they are generated to represent existing data often necessitates an ability to search through them quickly and accurately. Yet, traditional databases are not necessarily well-suited this purpose.

Weaviate is such a vector database which can address this problem. With vector databases you can efficiently run searching, ranking and recommendation algorithms. Therefore, vector databases became the backbone of ML deployments in industry. Weaviate is a such a vector database & search engine that enables combining vector search with structured filtering. Weaviate can be used with out-of-the-box or custom trained ML models to do semantic search, one-shot classification, question answering, NER, multi-modal search, and much more, on a large scale.

Read more about Weaviate [here](/developers/weaviate/).

### **Users and contributors**
Weaviate can be used to solve industry-agnostic data problems, so our current users come from multiple disciplines. We have users and companies apply Weaviate for product search and categorization in e-commerce, video captions, knowledge bases, image-text search, scientific papers and those who look to extend the use of large language models by using Weaviate to provide it with grounded data.

Current contributors to Weaviate are mainly people who [make their own Weaviate module](/developers/contributor-guide/weaviate-modules/how-to-build-a-new-module) (for example to use a new type of ML model with Weaviate). We have also had user contributions to our documentation, and contributions to supplementary documentation through their own blogs and platforms.

## **About the project**

### **The project's problem**

We have a [Weaviate documentation](/developers/weaviate/) site that is itself maintained as an open-source project ([GitHub](https://github.com/weaviate/weaviate-io)).

Our documentation includes extensive code examples in 6 different languages (`Python`, `Javascript`, `Java`, `Go`, `shell` and `GraphQL`) to cater for our wide user base. As with many documentation sites, our users often use our code examples as a starting point from which they continue their journey in Weaviate.

One key challenge for us comes from being a startup with fast-paced development who also provide code examples in multiple languages. This means that our code examples might go out of date due to changes to the Weaviate code base, and not many of our maintainers are sufficiently fluent in all languages to pick up errors.

This means that unfortunately in some cases our users work with either outdated, or worse - broken code examples.

To address this, we seek to develop a method of testing our code examples as we would our actual code base.

### **The project's scope**

For this project the technical writer will:

* Improve the reliability and accuracy of the Weaviate documentation by working with the Documentation team to develop a method for testing code examples (Python, JavaScript, Java, Go, shell, and GraphQL) as part of the documentation maintenance process.

Specific project tasks include:

* Analyze the current Weaviate documentation and catalog aspects of current code examples. This includes:
    * Programming languages used, as well as
    * The data sets currently being queried.
* Collaborate with the Weaviate team to identify a strategy for testing, including:
    * Weaviate instances to be queried for tests, and
    * Appropriate test triggers, whether it be a pre-commit hook, or a continuous integration action.
* Work with the Documentation team to develop a testing methodology for code examples, including test cases and an automated testing process that integrates with the documentation maintenance workflow.
* Create guidelines and best practices for writing tests, to ensure consistency and maintainability across the documentation.
* Write clear and concise documentation covering how to perform such tests.
* Update the existing code examples in the Weaviate documentation, applying the new testing methodology and ensuring that they are up-to-date, accurate, and functional.

The technical writer would not be expected to carry out all of the above, especially some of the tasks which may require more programming work, such as implementing code to perform tests. The expectation will be that they will work with the Weaviate team to outline the tests, and then document the guidelines and processes for using these tests going forward.

### **Measuring your project’s success**

We will measure success by the following metrics.
1. Test coverage: The percentage of code examples that include corresponding tests.
1. Test documentation: Creation of documentation for which

The project will be classified successful upon completion, if:
* Tests are written

### **Timeline**

The project will start in April 2023 and end in November 2023. The first month will be spend on hiring the technical writer and May will be dedicated to orientation.

* April: Hiring
* May: Orientation & setup audit plan (including user study)
* June: Audit & Create writing plan
* July-September: Write documentation
* October: Gather feedback from community and incorporate feedback in docs
* November: Complete the project

### **Project budget**

* Technical writer: $6000
* Volunteer stipend: $500
* Videos to support documentation/tutorials & to share to community: $500
* Total: $7000

### **What skills would a technical writer need to work on this project?**

Must have:
* Familiarity with GitHub (or willingness to work through GitHub tutorials).
* The ability to work with a team and openness to feedback.
* A positive attitude and openness to learning.

Nice to have:
* Familiarity with writing in Markdown (or willingness to work through markdown tutorials).
* Proficiency with at least one of (Python, JavaScript, Java or Go).
* Familiarity with Weaviate, natural language processing or deep learning.

### **Volunteers & Mentors**

* [JP Hwang](https://www.linkedin.com/in/jp-hwang/) as mentor from Weaviate
* TBD

### **Contact info**

Technical writers interested in working on this project should send an email to careers AT weaviate.io, **before May 1st**. Please include links to your technical writing work or portfolio/résumé/CV.


## **Additional information**

Join our community [slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw) to say hello, get to know the community or ask questions.
