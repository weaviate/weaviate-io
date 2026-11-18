import React from 'react';
import Link from '@docusaurus/Link';

export default function BlogBreadcrumbs({items}) {
  return (
    <nav aria-label="Breadcrumb" className="tw-mb-8 tw-text-sm tw-text-[#b9c8de]">
      <ol className="tw-m-0 tw-flex tw-list-none tw-flex-wrap tw-items-center tw-gap-x-2 tw-gap-y-1 tw-p-0">
        {items.map(({name, path}, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={path} className="tw-flex tw-min-w-0 tw-items-center tw-gap-2">
              {index > 0 && <span aria-hidden="true" className="tw-text-[#8a93a9]">/</span>}
              {isCurrent ? (
                <span aria-current="page" className="tw-break-words tw-text-[#ddebf2]">{name}</span>
              ) : (
                <Link to={path} className="tw-text-[#63e689] hover:tw-text-[#43E2C5] hover:tw-no-underline">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
