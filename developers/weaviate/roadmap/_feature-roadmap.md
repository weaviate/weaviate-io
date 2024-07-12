---
title: Feature roadmap
sidebar_position: 1
image: og/docs/roadmap.jpg
# tags: ['functional', 'roadmap']
---


The following is an overview of features planned for Weaviate. By clicking the link, you can upvote the feature or engage in a discussion about it. You can also join our [forum](https://forum.weaviate.io/) to discuss the roadmap in more detail.

* The current version of Weaviate is **v||site.weaviate_version||**. You can check the version you're currently running at the [meta](developers/weaviate/api/rest#tag/meta) endpoint.
* Upvote an issue by clicking the 👍 emoji on the GitHub issue page

<!-- ADDS PLANNED VERSIONS -->
<!-- {% for label in site.data.roadmap %}
{% if label[0] != 'backlog' %}
## {{ label[0] | replace: 'planned-', 'Planned for version ' | camelcase }}
{% assign description = label[1].description | strip_newlines %}
{% if description != '' %}
<small>{{ description }}</small>
{% endif %} -->

<!-- <ul class="list-group mb-4">
{% assign issues = label[1].items | sort: '+1' | reverse %}
{% for issue in issues %}
<li class="list-group-item">
    <a href="{{ issue.url }}" target="_blank">{{ issue.title }}</a> – 👍 {{ issue['+1'] }}
</li>
{% endfor %}
</ul>

{% endif %}
{% endfor %} -->

<!-- ADDS BACKLOG -->
## Backlog
<!-- <ul class="list-group mb-4">
{% assign backlog = site.data.roadmap['backlog'].items | sort: '+1' | reverse %}
{% for issue in backlog %}
<li class="list-group-item">
    <a href="{{ issue.url }}" target="_blank">{{ issue.title }}</a> – 👍 {{ issue['+1'] }}
</li>
{% endfor %}
</ul> -->


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
