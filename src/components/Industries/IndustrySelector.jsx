import React from "react";

export default function IndustrySelector({ industries, selectedId, onSelect }) {
  return (
    <div
      className="tw-flex tw-flex-wrap tw-gap-3"
      role="tablist"
      aria-label="Choose an industry"
    >
      {industries.map((industry) => {
        const isSelected = industry.id === selectedId;

        return (
          <button
            key={industry.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls="industry-panel"
            onClick={() => onSelect(industry.id)}
            className={`tw-rounded-full tw-border tw-px-5 tw-py-3 tw-font-['Inter'] tw-text-sm tw-font-semibold tw-transition md:tw-text-base ${
              isSelected
                ? "tw-border-[#00FE6B] tw-bg-[#00FE6B] tw-text-[#111111]"
                : "tw-border-white/20 tw-bg-white/5 tw-text-[#DDEBF2] hover:tw-border-white/50 hover:tw-bg-white/10"
            }`}
          >
            {industry.label}
            {industry.comingSoon ? (
              <span className="tw-ml-2 tw-text-xs tw-opacity-60">Soon</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
