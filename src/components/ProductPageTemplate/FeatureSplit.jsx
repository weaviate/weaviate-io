import React from "react";
import Link from "@docusaurus/Link";

const featureCards = [
  {
    icon: "/img/site/2026/launch.svg",
    title: "Launch quickly with templates",
    description:
      "Get running in minutes with ready-to-use templates for common use cases",
  },
  {
    icon: "/img/site/2026/secure.svg",
    title: "Secure agents with strong primitives",
    description:
      "Scopes for data isolation when privacy matters and for context sharing when orchestration is necessary",
  },
  {
    icon: "/img/site/2026/customize.svg",
    title: "Customizable to fit your domains",
    description:
      "Extensible properties and composable pipelines let you shape memory and context for your domain and business needs",
  },
];

const checks = [
  "Extracting what matters",
  "Resolving inconsistencies over time",
  "Adapting to changing information",
  "Keeping context relevant and efficient",
];

export default function FeatureSplit() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-mb-14 tw-max-w-4xl">
          <p
            className="tw-m-0 tw-mb-8 tw-uppercase"
            style={{
              color: "#43E2C5",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: "1rem",
              fontWeight: 600,
              lineHeight: "130%",
            }}
          >
            What is Engram?
          </p>

          <h2
            className="tw-m-0"
            style={{
              color: "#DDEBF2",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: "3rem",
              fontWeight: 600,
              lineHeight: "130%",
            }}
          >
            Structured memory for agentic applications
          </h2>

          <p
            className="tw-m-0 tw-mt-6 tw-max-w-3xl"
            style={{
              color: "#B9C8DE",
              fontFamily: "Inter, sans-serif",
              fontSize: "1.125rem",
              lineHeight: "160%",
            }}
          >
            Memory shouldn’t be an ever-growing pile of context—it should be
            actively maintained. Engram treats memory as structured, evolving
            infrastructure.
          </p>
        </div>

        <div className="tw-rounded-[1.875rem] tw-bg-[#1a1a1a] tw-p-8 md:tw-p-12 lg:tw-p-16">
          <div className="tw-grid tw-items-center tw-gap-10 lg:tw-grid-cols-[1.65fr_1fr]">
            <div>
              <img
                src="/img/site/2026/engram-component-diagram.svg"
                alt="Engram memory service architecture diagram"
                className="tw-h-auto tw-w-full"
              />
            </div>

            <div>
              <h3
                className="tw-m-0"
                style={{
                  color: "#DDEBF2",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: "2rem",
                  fontWeight: 600,
                  lineHeight: "130%",
                }}
              >
                Build agents that remember and get better over time
              </h3>

              <p
                className="tw-m-0 tw-mt-8"
                style={{
                  color: "#B9C8DE",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.125rem",
                  lineHeight: "160%",
                }}
              >
                Engram is a managed memory service built on the Weaviate vector
                database—designed to help your applications remember, learn, and
                improve over time:
              </p>

              <ul className="tw-m-0 tw-mt-8 tw-space-y-4 tw-p-0">
                {checks.map((item) => (
                  <li
                    key={item}
                    className="tw-flex tw-items-start tw-gap-4"
                    style={{
                      color: "#DDEBF2",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1.05rem",
                      lineHeight: "150%",
                    }}
                  >
                    <span className="tw-mt-1 tw-flex tw-h-5 tw-w-5 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-[4px] tw-border tw-border-[#00FE6B] tw-text-xs tw-text-[#00FE6B]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/blog/engram-deep-dive"
                className="tw-mt-10 tw-inline-flex tw-text-[#43E2C5] tw-underline tw-underline-offset-4 hover:tw-text-[#68FFA8]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.25rem",
                  lineHeight: "150%",
                }}
              >
                Read the blog post to learn more
              </Link>
            </div>
          </div>
        </div>

        <h2
          className="tw-mt-20 tw-mb-10 tw-mx-0 tw-align-middle tw-text-center"
          style={{
            color: "#DDEBF2",
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: "2.5rem",
            fontWeight: 600,
            lineHeight: "130%",
            margin: "5rem 0 2.5rem",
          }}
        >
          Designed to Grow with You
        </h2>
        <div className="tw-mt-8 tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-3">
          {featureCards.map(({ icon, title, description }) => (
            <article
              key={title}
              className="tw-group tw-relative tw-overflow-hidden tw-rounded-[1.5rem] tw-bg-[#1a1a1a] tw-p-8 tw-transition-all tw-duration-300 md:hover:tw--translate-y-1"
            >
              <div
                className="tw-pointer-events-none tw-absolute tw-inset-0 tw-opacity-0 tw-transition-opacity tw-duration-300 md:group-hover:tw-opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at top left, rgba(0,254,107,0.11) 0%, rgba(255,255,255,0.025) 35%, rgba(255,255,255,0) 70%)",
                }}
              />

              <div className="tw-relative">
                <img
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  className="tw-mb-8 tw-h-[62px] tw-w-[62px] tw-object-contain tw-transition-transform tw-duration-300 md:group-hover:tw-scale-105"
                />

                <h3
                  className="tw-m-0"
                  style={{
                    color: "#DDEBF2",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: "1.55rem",
                    fontWeight: 600,
                    lineHeight: "130%",
                  }}
                >
                  {title}
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
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
