import React from "react";
import Link from "@docusaurus/Link";

export default function RelatedProducts({ heading = "Related Products", products = [] }) {
  if (!products.length) return null;

  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <h2
          className="tw-m-0 tw-mb-10"
          style={{
            color: "#DDEBF2",
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: "2.5rem",
            fontWeight: 600,
            lineHeight: "130%",
          }}
        >
          {heading}
        </h2>
        <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              to={product.url}
              className="tw-group tw-rounded-[1.5rem] tw-bg-[#1a1a1a] tw-p-8 tw-no-underline tw-transition-all tw-duration-300 hover:tw--translate-y-1 hover:tw-no-underline"
            >
              <img
                src={`/img/site/${product.image}`}
                alt=""
                aria-hidden="true"
                className="tw-mb-8 tw-h-[62px] tw-w-[62px] tw-object-contain"
              />
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
                {product.name}
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
                {product.description}
              </p>
              <span
                className="tw-mt-6 tw-inline-flex tw-underline tw-underline-offset-4"
                style={{ color: "#43E2C5", fontFamily: "Inter, sans-serif", fontSize: "1.125rem" }}
              >
                Learn more
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
