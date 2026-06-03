import React from "react";

const steps = [
  {
    title: "Choose your template",
    description:
      "Use one of Engram’s composable templates for your application",
  },
  {
    title: "Add your data",
    description:
      "Send user interactions or application context via Engram APIs, no preprocessing needed",
  },
  {
    title: "Build Without Friction",
    description:
      "Engram handles memory extraction and management, all in the background",
  },
  {
    title: "Create trusted agents",
    description:
      "Retrieve memory and context in real time so your agents run consistently and reliably",
  },
];

export default function StepsSection() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-max-w-4xl">
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
            Get Started
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
            Starting building reliable agents with memory and context today
          </h2>

          <p
            className="tw-m-0 tw-mt-6"
            style={{
              color: "#B9C8DE",
              fontFamily: "Inter, sans-serif",
              fontSize: "1.125rem",
              lineHeight: "160%",
            }}
          >
            Integrate Engram with your agentic applications in a few simple
            steps and let us handle the rest.
          </p>
        </div>

        <div className="tw-mt-16 tw-grid tw-items-center tw-gap-12 lg:tw-grid-cols-[0.75fr_1.25fr] lg:tw-gap-16">
          <div className="tw-space-y-12">
            {steps.map((step) => (
              <div key={step.title} className="tw-flex tw-gap-8">
                <div className="tw-shrink-0">
                  <img
                    src="/img/site/2026/engram-icon-01.svg"
                    alt=""
                    aria-hidden="true"
                    className="tw-h-[62px] tw-w-[62px] tw-object-contain"
                  />
                </div>

                <div>
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
                    {step.title}
                  </h3>

                  <p
                    className="tw-m-0 tw-mt-5"
                    style={{
                      color: "#B9C8DE",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1rem",
                      lineHeight: "160%",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="tw-relative">
            <div
              className="tw-absolute tw-inset-0 tw-rounded-[2rem] tw-opacity-20"
              style={{
                background:
                  "linear-gradient(123deg, #26D6FF 12.44%, #D77AFF 109.26%)",
              }}
            />

            <div
              className="tw-relative tw-overflow-hidden tw-rounded-[2rem] tw-border tw-border-white/10 tw-p-6 md:tw-p-10"
              style={{
                background:
                  "linear-gradient(123deg, rgba(38,214,255,0.22) 12.44%, rgba(215,122,255,0.18) 109.26%)",
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <img
                src="/img/site/2026/engram-component-diagram-02.svg"
                alt="Engram workflow diagram"
                className="tw-h-auto tw-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
