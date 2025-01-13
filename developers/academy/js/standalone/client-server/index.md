---
title: Building client-server Applications
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';


## <i class="fa-solid fa-square-chevron-right"></i> Overview

When building web applications in JavaScript with Weaviate using the [weaviate-client](https://www.npmjs.com/package/weaviate-client), it is recommended that you employ the client-server architecture.

This may vary depending what tools you are using to build your web application. 

Fullstack frameworks like Next.js have support for server side development and API creation to communicate with Weaviate. This would happen via REST calls or for Next.js specifically, Server functions. This approach means coupling your client and server applications.

Backend web frameworks like Express let you create an API to communicate with Weaviate. This API can be consumed via REST calls from your client application. This approach means completely decoupling your client and server applications.


### <i class="fa-solid fa-clipboard-list-check"></i> Prerequisites

- A Node.js environment with `weaviate-client` installed.
- Familiarity with Weaviate's search capabilities.
- Some experience building Modern Web Applications with JavaScript.
- Intermediate coding proficiency (e.g. JavaScript).

## <i class="fa-solid fa-chalkboard-user"></i> Learning objectives

import LearningGoalsExp from '/src/components/Academy/learningGoalsExp.mdx';

<LearningGoalsExp />



import LearningGoals from '/src/components/Academy/learningGoals.jsx';

<LearningGoals unitName="client_server"/>

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>