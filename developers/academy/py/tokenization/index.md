---
title: "275 (Keyword) Tokenization"
sidebar_position: 275
---

import LearningGoals from '/src/components/Academy/learningGoals.jsx';
import CourseUnits from '/src/components/Academy/courseUnits.jsx';
import { courseData } from '/src/components/Academy/courseData.js'

## <i class="fa-solid fa-chalkboard-user"></i> Course overview

:::info Pre-requisites
This course is self-contained. However, we recommend that you go through one of the 101-level courses, such as that for working with [text](../starter_text_data/index.md), [your own vectors](../starter_custom_vectors/index.md), or [multimodal data](../starter_multimodal_data/index.md).
:::

Do you know what happens when you input text into a computer, whether to search for something, or to ask a chatbot a question? How does the computer process that text to do what you want it to do?

In both cases, a decision is needed on how to break down that piece of text into smaller pieces, also called tokens. This process is called *tokenization*.

This course will introduce you to tokenization in general, and how it is used in Weaviate.

Note that tokenization is a concept that applies to keyword search and filtering, as well as in the context of language models. **This course focuses on the keyword aspect**, but will briefly discuss how tokenization impacts language models.

## <i class="fa-solid fa-chalkboard-user"></i> Learning objectives

<LearningGoals courseName="tokenization"/>

## <i class="fa-solid fa-book-open-reader"></i> Units

<CourseUnits courseData={courseData} courseName="tokenization" />
