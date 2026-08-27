import React from "react";

export default function IdeaCards({ ideas }) {
  if (!ideas.length) {
    return (
      <div className="tw-rounded-[1.5rem] tw-border tw-border-dashed tw-border-white/20 tw-bg-white/[0.03] tw-p-10 tw-text-[#B9C8DE]">
        Content research is in progress for this industry.
      </div>
    );
  }

  return (
    <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-4">
      {ideas.map((idea, index) => (
        <article
          key={idea.title}
          className="tw-group tw-relative tw-min-h-[290px] tw-overflow-hidden tw-rounded-[1.5rem] tw-border tw-border-white/[0.06] tw-bg-[#1A1A1A] tw-p-8 tw-transition hover:tw--translate-y-1 hover:tw-border-white/15"
        >
          <div
            className="tw-absolute tw-inset-x-0 tw-top-0 tw-h-1"
            style={{ backgroundColor: idea.accent }}
          />
          <div
            className="tw-mb-12 tw-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-full tw-text-sm tw-font-bold tw-text-[#111111]"
            style={{ backgroundColor: idea.accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-2xl tw-font-semibold tw-leading-tight tw-text-[#DDEBF2]">
            {idea.title}
          </h3>
          <p className="tw-m-0 tw-mt-5 tw-font-['Inter'] tw-text-base tw-leading-relaxed tw-text-[#B9C8DE]">
            {idea.description}
          </p>
        </article>
      ))}
    </div>
  );
}
