---
title: "230 Vector indexing"
sidebar_position: 230
---

import LearningGoals from '/src/components/Academy/learningGoals.jsx';
import CourseUnits from '/src/components/Academy/courseUnits.jsx';
import { courseData } from '/src/components/Academy/courseData.js'

## <i class="fa-solid fa-chalkboard-user"></i> Course overview

:::info Pre-requisites
This course is self-contained. However, we recommend that you go through one of the 101-level courses, such as that for working with [text](../starter_text_data/index.md), [your own vectors](../starter_custom_vectors/index.md), or [multimodal data](../starter_multimodal_data/index.md).
:::

The vector index is a key component of Weaviate's search capabilities. It allows you to search for vectors based on their similarity to a query vector, and to retrieve the objects that are associated with those vectors.

Weaviate offers multiple types of vector indexes, each with its own strengths and weaknesses. Each index is also configurable, allowing you to tune its performance to your specific use case.

This course will introduce you to the different types of vector indexes available in Weaviate, and how to configure them to best suit your use case.

## <i class="fa-solid fa-chalkboard-user"></i> Learning objectives

<LearningGoals courseName="vector_index"/>

## <i class="fa-solid fa-book-open-reader"></i> Units

<CourseUnits courseData={courseData} courseName="vector_index" />
