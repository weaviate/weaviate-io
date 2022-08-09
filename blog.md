---
title: Blogs
layout: default
---

<!-- WELCOME -->
<section data-jarallax data-speed=".8" class="py-8 py-md-10 bg-cover jarallax" style="background-image: url(/img/blog-header.png);">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-7 text-center">
        <!-- Heading -->
        <h1 class="display-2 fw-bold" style="color:#fa0171">
          Blog
        </h1>
        <!-- Text -->
        <p class="lead mb-6" style="color:#122742">
          Keep up to date with what we're working on!
        </p>
        <!-- CTA -->
        <p class="lead">
          <a href="http://weaviate-newsletter.semi.technology/" target="_blank" class="btn btn-primary">sign up for our newsletter</a>
        </p>
      </div>
    </div> <!-- / .row -->
  </div> <!-- / .container -->
</section>

<section class="pt-7 pt-md-10">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!-- Heading -->
        <h3 class="mb-0">
          Our most recent blog posts
        </h3>
        <!-- Text -->
        <p class="mb-5 text-muted">
          Here’s what’s big in vector search!
        </p>
      </div>
    </div> <!-- / .row -->
    <div class="row">
      {% for post in site.posts %}
        <div class="col-12 col-md-6 d-flex">
          <!-- Card -->
          <div class="card mb-6 shadow-light-lg lift lift-lg">
            <!-- Image -->
            <a class="card-img-top" href="{{ post.url }}">
              <!-- Image -->
              {% if post.card-img != null %}
              <div class="card-img-top" style="height:240px;background-image:url('{{ post.card-img }}');background-size:cover; background-position: center;"></div>
              {% else %}
              <div class="card-img-top" style="height:240px;background-image:url('{{ post.hero-img }}');background-size:cover;background-position: center;"></div>
              {% endif %}
              <!-- Shape -->
              <div class="position-relative">
                <div class="shape shape-bottom shape-fluid-x text-white">
                  <svg viewBox="0 0 2880 480" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z" fill="currentColor"></path></svg> 
                </div>
              </div>
            </a>
            <!-- Body -->
            <a class="card-body" href="{{ post.url }}">
              <!-- Heading -->
              <h3>
                {{ post.title }}
              </h3>
              <!-- Text -->
              <p class="mb-0 text-muted">
                {{ post.date | date: "%B %-d, %Y" }} – {{ post.description }}
              </p>
            </a>
            <!-- Meta -->
            <a class="card-meta mt-auto" href="{{ post.url }}">
              <!-- Divider -->
              <hr class="card-meta-divider">
              <!-- Avatar -->
              <div class="avatar avatar-sm me-2">
                <img src="{{ post.author-img }}" alt="{{ post.author }}" class="avatar-img rounded-circle">
              </div>
              <!-- Author -->
              <h6 class="text-uppercase text-muted me-2 mb-0">
                {{ post.author }}
              </h6>
              <!-- Date -->
              <p class="h6 text-uppercase text-muted mb-0 ms-auto">
                <time datetime="{{ page.date | date: '%Y-%m-%d' }}">{{ page.date | date: '%B %d, %Y' }}</time>
              </p>
            </a>
          </div>
        </div>
      {% endfor %}
    </div> <!-- / .row -->
  </div> <!-- / .container -->
</section>