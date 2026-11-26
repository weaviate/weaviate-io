import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

const resources = [
  [
    "Forum",
    "https://forum.weaviate.io/",
    "Ask questions and learn from the community.",
  ],
  ["Paper reviews", "/papers", "Understand research in AI and data science."],
  ["Podcast", "/podcast", "Hear expert perspectives on AI and data."],
  ["Blog", "/blog", "Keep up with insights and updates from Weaviate."],
  [
    "Knowledge Cards",
    "/learn/knowledgecards",
    "Understand vector search and embeddings at a glance.",
  ],
];

export default function GoFurther() {
  return (
    <section className={styles.bgCol} id="go-further">
      <div className="container">
        <div className={styles.header}>
          <h2>Go further</h2>
          <p>Build your understanding and learn with the Weaviate community.</p>
        </div>
        <div className={styles.typeContainer}>
          {resources.map(([title, to, description]) => (
            <Link to={to} key={to}>
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <h3>{title}</h3>
                </div>
                <div className={styles.typeText}>
                  <p>{description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="tw-mt-16">
          <div
            className="tw-relative tw-flex tw-min-h-[320px] tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-[1.875rem] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-px-6 tw-py-12"
            style={{
              backgroundImage: "url('/img/site/2026/engram-cta-bg.png')",
            }}
          >
            <div className="tw-relative tw-z-10 tw-flex tw-max-w-[760px] tw-flex-col tw-items-center tw-text-center">
              <h2
                className="tw-m-0"
                style={{
                  color: "#DDEBF2",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                  fontWeight: 600,
                  lineHeight: "120%",
                  letterSpacing: "-0.04em",
                }}
              >
                Planning a production AI rollout? Talk to our team.
              </h2>
              <p
                className="tw-m-0 tw-mt-7 tw-max-w-[720px]"
                style={{
                  color: "#DDEBF2",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  lineHeight: "160%",
                }}
              >
                Get guidance on the right deployment model and next steps for
                bringing Weaviate to production.
              </p>
              <div className="tw-mt-10 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-4">
                <Link
                  to="/contact"
                  className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-px-10 tw-py-4 tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition-all hover:tw--translate-y-0.5 hover:tw-text-[#111111] hover:tw-no-underline"
                  style={{
                    background:
                      "linear-gradient(48deg, #00FE6B 13.81%, #00B7E2 92.18%)",
                    color: "#111111",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Talk to an expert
                </Link>
                <Link
                  to="/enterprise"
                  className="tw-inline-flex tw-min-h-[56px] tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-white/20 tw-bg-[rgba(17,17,17,0.5)] tw-px-8 tw-font-semibold tw-text-[#DDEBF2] tw-no-underline tw-transition-all hover:tw--translate-y-0.5 hover:tw-text-white hover:tw-no-underline"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Weaviate for enterprise
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
