import React from 'react';
import Link from '@docusaurus/Link';

export default function ContinueReading({href, title, description, label = 'Continue reading'}) {
  if (!href || !title) return null;

  return (
    <aside className="tw-my-8 tw-border-[0.5px] tw-border-solid tw-border-[#6E6B91] tw-bg-[#1A1A1A] tw-p-6" aria-label={label}>
      <span className="tw-mb-2 tw-block tw-text-xs tw-font-semibold tw-uppercase tw-tracking-[0.12em] tw-text-[#43E2C5]">{label}</span>
      <Link to={href} className="tw-group tw-flex tw-items-start tw-justify-between tw-gap-5 hover:tw-no-underline">
        <span>
          <strong className="tw-block tw-text-lg tw-leading-snug tw-text-[#ddebf2] group-hover:tw-text-[#63e689]">{title}</strong>
          {description && <span className="tw-mt-2 tw-block tw-text-sm tw-leading-relaxed tw-text-[#b9c8de]">{description}</span>}
        </span>
        <span className="tw-mt-1 tw-text-2xl tw-text-[#63e689]" aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
