import React from "react";
import Link from "@docusaurus/Link";

const heading = {
  color: "#DDEBF2",
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  fontWeight: 600,
  lineHeight: "130%",
};

const body = {
  color: "#B9C8DE",
  fontFamily: "Inter, sans-serif",
  fontSize: "1.125rem",
  lineHeight: "160%",
};

export default function PricingSection({
  eyebrow = "Pricing",
  title,
  intro,
  plans = [],
  notes = [],
  newsletter,
}) {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-max-w-4xl">
          <p
            className="tw-m-0 tw-mb-8 tw-uppercase"
            style={{ ...heading, color: "#43E2C5", fontSize: "1rem" }}
          >
            {eyebrow}
          </p>
          <h2 className="tw-m-0" style={{ ...heading, fontSize: "3rem" }}>
            {title}
          </h2>
          {intro && (
            <p className="tw-m-0 tw-mt-6" style={body}>
              {intro}
            </p>
          )}
        </div>

        <div className={`tw-mt-14 tw-grid tw-gap-6 md:tw-grid-cols-2 ${plans.length > 2 ? "xl:tw-grid-cols-3" : ""}`}>
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="tw-rounded-[1.875rem] tw-bg-[#1a1a1a] tw-p-8 md:tw-p-10"
              style={{
                border: plan.highlighted
                  ? "1px solid rgba(0,254,107,0.45)"
                  : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3
                className="tw-m-0"
                style={{
                  ...heading,
                  fontSize: "1.5rem",
                  color: plan.highlighted ? "#00FE6B" : "#DDEBF2",
                }}
              >
                {plan.name}
              </h3>
              <p
                className="tw-m-0 tw-mt-6 tw-uppercase"
                style={{ ...body, fontSize: "0.875rem" }}
              >
                {plan.label}
              </p>
              <p
                className="tw-m-0 tw-mt-2"
                style={{ ...body, color: "#DDEBF2" }}
              >
                <strong style={{ fontSize: "2.5rem", fontWeight: 600 }}>
                  {plan.price}
                </strong>{" "}
                {plan.unit}
              </p>
              {plan.features && (
                <ul className="tw-m-0 tw-mt-6 tw-space-y-3 tw-p-0">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="tw-flex tw-items-start tw-gap-4"
                      style={{ ...body, fontSize: "1.05rem", color: "#DDEBF2" }}
                    >
                      <span className="tw-mt-1 tw-flex tw-h-5 tw-w-5 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-[4px] tw-border tw-border-[#00FE6B] tw-text-xs tw-text-[#00FE6B]">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {notes.length > 0 && (
          <div className="tw-mt-8 tw-space-y-2">
            {notes.map((note, i) => (
              <p
                key={i}
                className="tw-m-0"
                style={{ ...body, fontSize: "0.95rem" }}
              >
                <sup>{i + 1}</sup> {note}
              </p>
            ))}
          </div>
        )}

        {newsletter && (
          <div className="tw-mt-10">
            <Link
              to={newsletter.to}
              className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,_#00FE6B_13.81%,_#00B7E2_92.18%)] tw-px-8 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white hover:tw-text-[#111111] hover:tw-no-underline"
            >
              {newsletter.label}
            </Link>
            <p className="tw-m-0 tw-mt-4 tw-max-w-2xl" style={body}>
              {newsletter.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
