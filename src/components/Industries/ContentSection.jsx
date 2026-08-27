import React from "react";
import Link from "@docusaurus/Link";

export default function ContentSection({
  title,
  description,
  items,
  emptyLabel,
}) {
  return (
    <section className="tw-border-t tw-border-white/10 tw-py-16 lg:tw-py-24">
      <div className="tw-mb-10 tw-max-w-3xl">
        <h2 className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-3xl tw-font-semibold tw-text-[#DDEBF2] md:tw-text-4xl">
          {title}
        </h2>
        <p className="tw-m-0 tw-mt-5 tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]">
          {description}
        </p>
      </div>

      {items.length ? (
        <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="tw-rounded-[1.5rem] tw-border tw-border-white/10 tw-bg-[#1A1A1A] tw-p-8 tw-text-white tw-no-underline tw-transition hover:tw--translate-y-1 hover:tw-border-white/20 hover:tw-text-white hover:tw-no-underline"
            >
              <span className="tw-text-sm tw-font-semibold tw-uppercase tw-tracking-wider tw-text-[#43E2C5]">
                {item.type}
              </span>
              <h3 className="tw-m-0 tw-mt-5 tw-font-['Plus_Jakarta_Sans'] tw-text-2xl tw-font-semibold">
                {item.title}
              </h3>
              <p className="tw-m-0 tw-mt-4 tw-leading-relaxed tw-text-[#B9C8DE]">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="tw-rounded-[1.5rem] tw-border tw-border-dashed tw-border-white/20 tw-bg-white/[0.03] tw-p-8 tw-text-[#B9C8DE]">
          {emptyLabel}
        </div>
      )}
    </section>
  );
}
