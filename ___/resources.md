---
title: Weaviate Resources
layout: default
og: /img/og/og-resources.png
---

<!-- WELCOME -->
<section class="pt-12 pt-md-14 pb-12 pb-md-15 bg-gray-900" style="margin-top: -87px;">
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-7 text-center">
            <!-- Headin -->
            <h1 class="display-2 fw-bold text-white">
                Resources
            </h1>
            <!-- Text -->
            <p class="lead text-white-75 mb-4">
                A wide variety of resources related to the Weaviate vector search engine. Did you publish something that you would like to see included on this page? Let us know at <a href="mailto:hello@semi.technology">hello@semi.technology</a>?
            </p>
            <!-- Badges -->
            <nav class="nav justify-content-center">
                <a class="badge rounded-pill bg-white-soft active me-1 mb-1" href="#" data-bs-toggle="pill" data-filter="*" data-bs-target="#portfolio">
                    <span class="h6 text-uppercase">all</span>
                </a>
                {% assign tags_array = "" | split: ',' %}
                {% for case in site.data.resources %}
                    {% for case in site.data.resources %}
                        {% assign tags_array = tags_array | push: case.tags %}
                    {% endfor %}
                {% endfor %}
                {% assign tags_array_sorted = tags_array | uniq | sort %}
                {% for tag in tags_array_sorted %}
                    <a class="badge rounded-pill bg-white-soft active me-1 mb-1" href="#" data-bs-toggle="pill" data-filter=".{{ tag }}" data-bs-target="#portfolio">
                        <span class="h6 text-uppercase">{{ tag | camelcase }}</span>
                    </a>
                {% endfor %}
            </nav>
        </div>
    </div>
    <!-- / .row -->
    </div>
    <!-- / .container -->
</section>

<!-- SHAPE -->
<div class="position-relative">
    <div class="shape shape-bottom shape-fluid-x text-light">
        <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"/></svg>
    </div>
</div>

<!-- CONTENT -->
<section class="py-8 py-md-11 mt-n10 mt-md-n14">
    <div class="container">
        <div class="row" id="portfolio" data-isotope='{"layoutMode": "fitRows"}'>
            {% assign sortedResources = site.data.resources | sort: 'date' %}
            {% for case in sortedResources reversed %}
                {% assign tagClass = '' %}
                {% for tag in case.tags %}
                    {% assign tagClass = tagClass | append: ' ' | append: tag %}
                {% endfor %}
                <div class="col-12 col-md-4 {{ tagClass }}">
                    <!-- Card -->
                    <a class="card lift lift-lg shadow-light-lg mb-7" href="{{ case.link }}" target="_blank">
                        <!-- Image -->
                        <img class="card-img-top" src="{{ case.cover_image }}" alt="{{ case.description }}" />
                        <!-- Body -->
                        <div class="card-body">
                        <!-- Shape -->
                        <div class="shape shape-bottom-100 shape-fluid-x text-white">
                            <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"/></svg>
                        </div>
                        <!-- Preheading -->
                        <h6 class="text-uppercase mb-1 text-muted">TL;DR</h6>
                        <!-- Heading -->
                        <h4 class="mb-0">{{ case.title }}</h4>
                        <hr>
                        <!-- Text -->
                        <div>{{ case.date | date_to_long_string }} &bull; {{ case.description }}</div>
                        </div>
                    </a>
                </div>
            {% endfor %}
        </div>
    </div>
</section>