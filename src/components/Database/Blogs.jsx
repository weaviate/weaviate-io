import React from "react";
import Link from "@docusaurus/Link";

const blogPosts = [
  {
    title: "Engram: Memory by Weaviate",
    description:
      "A deep dive into Engram, our managed memory service for agents which is simple to get started but adaptable to any use case.",
    image: "/img/site/2026/engram-blog-header.png",
    gradient: "linear-gradient(42deg,#148f54 10%,#106d63 45%,#135d73 100%)",
    link: "/blog/engram-deep-dive",
  },
  {
    title: "Oh Memories, Where'd You Go",
    description:
      "Two weeks of dogfooding Engram, Weaviate's memory product, in daily Claude Code sessions.",
    image: "/img/site/2026/memory-blog-header.png",
    gradient: "linear-gradient(42deg,#6d25b5 10%,#4d1fa5 55%,#2f1d87 100%)",
    link: "/blog/engram-internal-use-case",
  },
  {
    title: "The Limit in the Loop",
    description:
      "Memory isn’t just a feature for AI—it’s infrastructure. As agents grow, stateless interactions break down...",
    image: "/img/site/2026/limit-blog-header.png",
    gradient: "linear-gradient(42deg,#2b6f84 10%,#4d6785 55%,#66608b 100%)",
    link: "/blog/limit-in-the-loop",
  },
];

export default function Blogs() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.title}
              to={post.link}
              className="tw-group tw-overflow-hidden tw-rounded-[1.25rem] tw-bg-[#1a1a1a] tw-no-underline tw-transition-all tw-duration-300 hover:tw--translate-y-1 hover:tw-no-underline"
            >
              <div className="tw-relative tw-h-[190px] tw-overflow-hidden tw-rounded-t-[1.25rem]">
                <div
                  className="tw-absolute tw-inset-0"
                  style={{ background: post.gradient }}
                />

                <img
                  src={post.image}
                  alt=""
                  aria-hidden="true"
                  className="tw-relative tw-h-full tw-w-full tw-object-contain tw-opacity-70 tw-mix-blend-screen tw-transition-transform tw-duration-300 group-hover:tw-scale-105"
                />
                <div
                  className="tw-absolute tw-inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,.15) 100%)",
                  }}
                />
              </div>

              <div className="tw-p-8">
                <h3
                  className="tw-m-0"
                  style={{
                    color: "#DDEBF2",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    lineHeight: "130%",
                  }}
                >
                  {post.title}
                </h3>

                <p
                  className="tw-m-0 tw-mt-6"
                  style={{
                    color: "#B9C8DE",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "1.125rem",
                    lineHeight: "160%",
                  }}
                >
                  {post.description}
                </p>

                <span
                  className="tw-mt-6 tw-inline-flex tw-underline tw-underline-offset-4"
                  style={{
                    color: "#43E2C5",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "1.125rem",
                    lineHeight: "150%",
                  }}
                >
                  Read the blog post
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
