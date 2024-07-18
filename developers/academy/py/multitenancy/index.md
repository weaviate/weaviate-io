---
title: "280 Multi-tenancy (MT)"
sidebar_position: 280
---

import LearningGoals from '/src/components/Academy/learningGoals.jsx';
import CourseUnits from '/src/components/Academy/courseUnits.jsx';
import { courseData } from '/src/components/Academy/courseData.js'

## <i class="fa-solid fa-chalkboard-user"></i> Course overview

:::info Pre-requisites
This course is self-contained. However, we recommend that you go through one of the 101-level courses, such as that for working with [text](../starter_text_data/index.md), [your own vectors](../starter_custom_vectors/index.md), or [multimodal data](../starter_multimodal_data/index.md).
:::

Multi-tenancy allows you to create a Weaviate collection containing a high number of lightweight "tenants".

Tenants are designed to house isolated, identical data structures. This is suitable for use cases such as software-as-a-service (SaaS) type applications, where each end user's data can be backed by a tenant.

This course introduces you to multi-tenancy. It teaches you how to enable and configure a multi-tenant collection in Weaviate, as well as how to work with tenants and tenant data.

## <i class="fa-solid fa-chalkboard-user"></i> Learning objectives

<LearningGoals courseName="multi-tenancy"/>

## <i class="fa-solid fa-book-open-reader"></i> Units

<CourseUnits courseData={courseData} courseName="multi-tenancy" />
