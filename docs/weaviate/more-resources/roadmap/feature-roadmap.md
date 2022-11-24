---
layout: layout-documentation
solution: weaviate
sub-menu: Roadmap
title: Feature roadmap
description: Weaviate's Feature Roadmap
tags: ['functional', 'roadmap']
sidebar_position: 1
open-graph-type: article
toc: true
---

The following is an overview of features planned for Weaviate. By clicking the link, you can upvote the feature or engage in a discussion about it. You can also join our [Slack channel]({{ site.slack_signup_url }}) to discuss the roadmap in more detail.

* The current version of Weaviate is **{{ site.weaviate_version }}**. You can check the version you're currently running at the [meta](../restful-api-references/meta.html) endpoint.
* Upvote an issue by clicking the 👍 emoji on the Github issue page

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

# More Resources

{% include docs-support-links.html %}
