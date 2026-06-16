import React from "react";
import CodeTabs from "../CodeBlock";

const devItems = [
  {
    icon: "/img/site/2026/database-icon-01.svg",
    title: "Set up a collection",
    description:
      "Import data from any source. Define the schema and configure your collection.",
  },
  {
    icon: "/img/site/2026/database-icon-02.svg",
    title: "Search",
    description:
      "Perform hybrid, semantic, and keyword search with fine-tuned parameters.",
  },
  {
    icon: "/img/site/2026/database-icon-03.svg",
    title: "Ask",
    description:
      "Get answers from your data by using a natural language prompt/question.",
  },
  {
    icon: "/img/site/2026/database-icon-04.svg",
    title: "Generate",
    description:
      "Combine retrieved context with a model to generate accurate answers.",
  },
  {
    icon: "/img/site/2026/database-icon-05.svg",
    title: "Personalize",
    description:
      "Recommendations, content, and responses that adapt to each individual.",
  },
];

export default function DeveloperExperience() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-14 md:tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-grid tw-items-center tw-gap-12 lg:tw-grid-cols-[0.85fr_1.15fr] lg:tw-gap-20">
          <div>
            <p
              className="tw-m-0 tw-mb-6 tw-text-[1rem] tw-font-semibold tw-uppercase"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: "#43E2C5",
              }}
            >
              Get started
            </p>

            <h2
              className="tw-m-0 tw-max-w-xl tw-text-[2.5rem] tw-font-semibold tw-leading-[1.15] md:tw-text-[3rem]"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: "#DDEBF2",
              }}
            >
              Spin up a cluster, point it at your data, and go
            </h2>

            <p
              className="tw-mt-6 tw-max-w-xl tw-text-[18px] tw-leading-8"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#B9C8DE",
              }}
            >
              Weaviate can take care of embeddings, ranking, and auto-scaling so
              you can ship features, not infrastructure.
            </p>

            <div className="tw-mt-12 tw-space-y-8">
              {devItems.map((item) => (
                <div key={item.title} className="tw-flex tw-gap-7">
                  <div className="tw-flex tw-h-[62px] tw-w-[62px] tw-shrink-0 tw-items-center tw-justify-center tw-rounded-[14px] tw-border tw-border-[#6f6a9c] tw-bg-[#151515]">
                    <img
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      className="tw-h-8 tw-w-8 tw-object-contain"
                    />
                  </div>

                  <div>
                    <h3
                      className="tw-m-0 tw-text-[1.45rem] tw-font-semibold tw-leading-[130%]"
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        color: "#DDEBF2",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="tw-m-0 tw-mt-3 tw-max-w-[440px] tw-text-[1rem] tw-leading-[155%]"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: "#B9C8DE",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="tw-relative tw-overflow-hidden tw-rounded-[1.875rem] tw-p-8 md:tw-p-12"
            style={{
              background:
                "linear-gradient(48deg, rgba(0,254,107,0.72) 13.81%, rgba(0,183,226,0.72) 92.18%), url('/img/site/2026/quickstart-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tw-mx-auto tw-w-full tw-max-w-[720px] tw-overflow-hidden tw-rounded-[24px] tw-border tw-border-[#241d31] tw-bg-[#130d1d]/95 tw-shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
              <CodeTabs />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
