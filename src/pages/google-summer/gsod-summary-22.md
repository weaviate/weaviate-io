---
title: Google Season of Docs 2022 - Summary
og: /img/og/google-summmer/gsod.jpg
---

# Google Summer of Docs – Project 2022

## Project Abstract

In an open source project, a contributor onboarding guide gives potential project contributors a quick overview of how they might help with your project or study group. A newcomer may not know how to execute the aforementioned tasks successfully and efficiently if they do not have access to a solid contributor onboarding guide. These instructions can help secure a product's success by attracting new contributors, whose contributions will ensure the product's success. A great user guide simply takes that communication and organizes it into a framework that everyone can use to achieve success.

## Participants

The `project team` members on this project were:

* [Asmit Malakannawar](https://github.com/Asmit2952) – GSoD Student – Technical Writer
* [Sebastian Witalec](https://github.com/sebawita) – GSoD Mentor – Developer Advocate

## Pull Requests

[List of PRs](https://github.com/semi-technologies/weaviate-io/pulls?q=is%3Apr+author%3AAsmit2952+) that include more details and discussion:

## Deviations From Original Proposal

In the initial proposal, Asmit solely proposed the creation of a contributor's guide. But as the `project team` worked on the documentation updates, it became apparent that the tooling (based on Ruby and Jekyll) used to build Weaviate docs was a significant obstacle for new contributors, as it was slow and difficult to set up.

To address that, Asmit researched and experimented with other open-source tools for building documentation sites. As a result, we decided to move all of our structured documentation to [Docusaurus](https://docusaurus.io/), enabling contributors and the Weaviate team to work on the documentation with ease. 

> Note – the new documentation website is still under construction, and we are still working with the team to set it up successfully. The planned release date is set for late December 2022.

As a proof of concept, we created a sample site and deployed it on Vercel. Here are the links to the repository and the PoC website:

* [PoC repository](https://github.com/Asmit2952/weaviate-docusaurus)
* [Docs - preview](https://weaviate-docusaurus.vercel.app/developers/weaviate/)
* [Contributor's Guide - preview](https://weaviate-docusaurus.vercel.app/developers/contributor-guide/)
* [Contributor's Guide - in production](/developers/contributor-guide/)

## Timeline
Here are some milestones from the project timeline.

### **June - July**
Audited the current Contributor’s Guide and prepared a list of suggestions.

Created the mockups on how a contributor's guide should look, with a list of pages and content the final Contributor’s Guide should contain.

### **August**
Created a writing plan, with the step by step process of writing a beginner friendly doc.

Started the work on Contributor’s Guide.

Added issue and PR templates.

### **September**
Completed the first draft of the Contributor's Guide . 

Compared multiple online documentation options and selected Docusaurus.

### **October**
Created a proof of concept for Docusaurus and iterated it based on reviews.

Checked the documentation for errors and typos.

### **November**
Project approved by the mentor and the Weaviate team.

## Results

* Created a detailed contributor’s guide. Including detailed guides on basic git and GitHub workflow.
* Improved overall contributor experience – not only for beginners but also for current contributors.
* Made navigation easier by pointing contributors in the right direction.
* Updated GitHub issue and PR templates to make it easy for contributors to contribute to the documentation

## Contributor’s Comments

“My involvement with Weaviate and the Google Season of Docs internship both helped me advance my knowledge of technical documentation. I gained a lot of knowledge about working with others, understanding a startup, and identifying opportunities to contribute. I've never had the chance to collaborate with an emerging open-source company more frequently. I appreciate the opportunity to work with Weaviate’s team on this project.

The project gave me numerous chances to brush up on my current knowledge of React, Docusaurus, and Jekyll, to mention a few, while working on the project. While the GSoD 2022 project comes to an end, Weaviate's documentation journey will continue.”

## Summary
Overall the project was a success, and we achieved our documentation deliverables.

We also started working on a new documentation site, making it a lot easier for anyone to contribute to Weaviate and our docs.

We want to give big thanks to Asmit – for the hard work he put into this project – and to GSoD – for organising such a fantastic project.<br/>
Thanks to this project, our documentation and the contributor’s journey are better than ever..
