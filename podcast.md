---
title: Weaviate Podcast
layout: default
og: /img/og/og-podcast.png
regenerate: true
---

<!-- Podcast intro -->
<section class="pt-4 pt-md-11">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-12 col-lg-12 order-md-1" data-aos="fade-up">
                <!-- Heading -->
                <h1 class="display-3 text-center text-md-start">
                    Weaviate <span class="text-primary">Podcast</span>
                </h1>
                <!-- Text -->
                <p class="lead text-center text-md-start text-muted mb-6 mb-lg-8">
                    Join Connor Shorten when he interviews Weaviate community users, leading machine learning experts, and explores Weaviate use cases from users and customers.
                </p>
                <!-- Buttons -->
                <div class="text-center text-md-start">
                    <a href="https://www.youtube.com/playlist?list=PLTL2JUbrY6tW-KOQfOek8dtUmPgGQj3F0" class="btn btn-primary-soft lift m-2" target="_blank">
                        Subscribe to the Youtube channel <i class="fe fe-youtube d-none d-md-inline ms-2 align-middle"></i>
                    </a>
                       <a href="
                       https://open.spotify.com/show/4TlG6dnrWYdgN2YHpoSnM7" class="btn btn-secondary-soft lift m-2" target="_blank">
                        Open in Spotify <i class="fab fa-spotify d-none d-md-inline ms-2 align-middle"></i>
                    </a>
                </div>
            </div>
        </div> <!-- / .row -->
    </div> <!-- / .container -->
</section>

<!-- EDPISODES -->
<section class="pt-8 pt-md-11">
    <div class="container">
        <div class="row">
            <div class="col-12">
                {% assign sortedResources = site.data.podcasts | sort: 'date' %}
                {% for podcast in sortedResources reversed %}
                    <!-- Card -->
                    <div class="card card-row shadow-light-lg mb-6">
                        <div class="row gx-0">
                            <a class="col-12 col-md-6 bg-cover card-img-start" style="background-image: url({{ podcast.cover_image }});" href="https://www.youtube.com/watch?v={{ podcast.youtube }}" target="_blank">
                                <!-- Image (placeholder) -->
                                <img src="{{ podcast.cover_image }}" alt="Weaviate Podcast - {{ podcast.title }}" class="img-fluid d-md-none invisible">
                                <!-- Shape -->
                                <div class="shape shape-end shape-fluid-y text-white d-none d-md-block">
                                    <svg viewBox="0 0 112 690" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M116 0H51v172C76 384 0 517 0 517v173h116V0z" fill="currentColor"/></svg>
                                </div>
                            </a>
                            <div class="col-12 col-md-6">
                                <!-- Body -->
                                <a class="card-body" href="https://www.youtube.com/watch?v={{ podcast.youtube }}" target="_blank">
                                    <!-- Heading -->
                                    <h3>
                                        {{ podcast.title }}
                                    </h3>
                                    <!-- Text -->
                                    <p class="mb-0 text-muted">
                                        {{ podcast.description }}
                                    </p>
                                </a>
                                <!-- Meta -->
                                <a class="card-meta" href="https://www.youtube.com/watch?v={{ podcast.youtube }}" target="_blank">
                                    <!-- Divider -->
                                    <hr class="card-meta-divider">
                                    <!-- Date -->
                                    <p class="h6 text-uppercase text-muted mb-0 ms-auto">
                                        <time datetime="{{ podcast.date }}">{{ podcast.date | date_to_long_string }}</time>
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                {% endfor %}
            </div>
        </div> <!-- / .row -->
    </div> <!-- / .container -->
</section>
