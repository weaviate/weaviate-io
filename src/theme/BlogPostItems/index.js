import React from 'react';
import Link from '@docusaurus/Link';

export default function BlogPostItems({items}) {
  if (!items.length) return null;

  return (
    <div className="tw-grid tw-grid-cols-1 tw-border-l-[0.5px] tw-border-t-[0.5px] tw-border-[#6E6B91] sm:tw-grid-cols-2 lg:tw-grid-cols-3">
      {items.map(({content}) => {
        const {metadata, assets} = content;
        return (
          <article className="tw-min-w-0 tw-border-b-[0.5px] tw-border-r-[0.5px] tw-border-[#6E6B91] tw-bg-[#1A1A1A] tw-p-[26px]" key={metadata.permalink}>
            <div className="tw-mb-[18px] tw-text-[0.68rem] tw-text-[#8a93a9]">
              {metadata.formattedDate} · {Math.round(metadata.readingTime)} min read
            </div>
            <Link className="tw-group tw-mb-4 tw-block tw-aspect-video tw-overflow-hidden tw-bg-[#0b0d11]" to={metadata.permalink}>
              <img className="tw-block tw-h-full tw-w-full tw-object-cover tw-transition-transform tw-duration-200 group-hover:tw-scale-[1.025]" src={assets.image} alt="" loading="lazy" />
            </Link>
            <div className="tw-mb-[14px] tw-flex tw-min-h-6 tw-flex-wrap tw-gap-1.5">
              {metadata.tags.slice(0, 3).map((tag) => (
                <Link className="tw-rounded-lg tw-border-[0.5px] tw-border-[#6E6B91] tw-bg-transparent tw-px-[7px] tw-py-1 tw-text-[0.62rem] tw-capitalize tw-leading-none tw-text-[#d0d8ea] hover:tw-border-[#63e689] hover:tw-bg-[#63e689]/[0.06] hover:tw-text-[#edf4ff] hover:tw-no-underline" key={tag.permalink} to={tag.permalink}>{tag.label}</Link>
              ))}
            </div>
            <Link className="tw-text-[#ddebf2] hover:tw-text-[#63e689] hover:tw-no-underline" to={metadata.permalink}>
              <h2 className="tw-mb-3 tw-text-xl tw-leading-tight tw-text-inherit">{metadata.title}</h2>
            </Link>
            <p className="tw-m-0 tw-line-clamp-3 tw-text-[0.82rem] tw-leading-[1.55] tw-text-[#b9c8de]">{metadata.description}</p>
          </article>
        );
      })}
    </div>
  );
}
