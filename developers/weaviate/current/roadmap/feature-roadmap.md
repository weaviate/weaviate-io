---
layout: layout-documentation
solution: weaviate
sub-menu: Roadmap
title: Feature roadmap
description: Weaviate's Feature Roadmap
tags: ['functional', 'roadmap']
menu-order: 1
open-graph-type: article
toc: true
---

The following is an overview of features planned for Weaviate. By clicking the link, you can upvote the feature or engage in a discussion about it. You can also join our [Slack channel]({{ site.slack_signup_url }}) to discuss the roadmap in more detail.

The current version of Weaviate is **{{ site.weaviate_version }}**. You can check the version you're currently running at the [meta](../restful-api-references/meta.html) endpoint.

{% for label in site.data.roadmap reversed %}

## {{ label[0] | replace: 'planned-', 'Planned for version ' | camelcase }}

<ul class="list-group mb-4">

{% for issue in label[1] %}

<li class="list-group-item">
    <a href="{{ issue.url }}" target="_blank">{{ issue.title }}</a> – 👍 {{ issue['+1'] }}
</li>

{% endfor %}

</ul>

{% endfor %}



# More Resources

{% include docs-support-links.html %}
