import React from 'react';
import Link from '@docusaurus/Link';

function buildPageUrl(permalink, targetPage) {
  if (!permalink) return null;
  // If permalink already contains /page/X, replace it; else append /page/X
  const pageRegex = /\/page\/(\d+)\/?$/;
  if (pageRegex.test(permalink)) {
    return permalink.replace(pageRegex, `/page/${targetPage}`);
  }
  // Ensure trailing slash is consistent
  const base = permalink.endsWith('/') ? permalink.slice(0, -1) : permalink;
  return `${base}/page/${targetPage}`;
}

export default function BlogListPaginator({metadata}) {
  if (!metadata) return null;

  // Prefer explicit previous/next fields if available
  const prev = metadata.previousPage || metadata.previous || metadata.prev || (metadata.pagination && metadata.pagination.previousPage) || null;
  const next = metadata.nextPage || metadata.next || metadata.next_page || (metadata.pagination && metadata.pagination.nextPage) || null;

  // If numeric page info is provided, compute from that
  const page = typeof metadata.page === 'number' ? metadata.page : Number(metadata.page) || null;
  const totalPages = typeof metadata.totalPages === 'number' ? metadata.totalPages : Number(metadata.totalPages) || null;
  const permalink = metadata.permalink || metadata.baseUrl || null;

  let newerUrl = null;
  let olderUrl = null;

  if (prev && typeof prev === 'string') newerUrl = prev;
  if (next && typeof next === 'string') olderUrl = next;

  if (page) {
    if (page > 1) {
      const target = page - 1;
      newerUrl = newerUrl || (target === 1 ? (permalink || '/') : buildPageUrl(permalink, target));
    }
    if (!totalPages || page < totalPages) {
      const target = page + 1;
      olderUrl = olderUrl || buildPageUrl(permalink, target);
    }
  }

  if (!newerUrl && !olderUrl) return null;

  const linkStyle = {
    color: '#b9c8de',
    fontFamily: "Inter, 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    fontWeight: 600,
  };

  return (
    <div className="tw-mt-6 tw-flex tw-justify-end">
      <nav className="tw-rounded-lg tw-border-[0.1px] tw-border-[#6E6B91] tw-px-6 tw-py-4" aria-label="Blog pagination">
        <div className="tw-flex tw-items-center tw-gap-6">
          {newerUrl && (
            <Link to={newerUrl} style={linkStyle} className="tw-text-base">
              ‹ Newer entries
            </Link>
          )}
          {olderUrl && (
            <Link to={olderUrl} style={linkStyle} className="tw-text-base">
              Older entries ›
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
