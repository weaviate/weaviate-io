import React, { useMemo, useState } from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim();
}

function scorePost(post, terms) {
  const title = normalize(post.title);
  const description = normalize(post.description);
  const tags = (post.tags || []).map(normalize);

  return terms.reduce((score, term) => {
    if (
      !title.includes(term) &&
      !description.includes(term) &&
      !tags.some((tag) => tag.includes(term))
    ) {
      return -Infinity;
    }
    return (
      score +
      (title === term ? 20 : title.includes(term) ? 8 : 0) +
      (tags.some((tag) => tag === term)
        ? 6
        : tags.some((tag) => tag.includes(term))
          ? 3
          : 0) +
      (description.includes(term) ? 1 : 0)
    );
  }, 0);
}

export default function BlogSearch({ onSearchChange }) {
  const { posts = [] } = usePluginData("blog-search-index");
  const [query, setQuery] = useState("");
  const terms = normalize(query).split(/\s+/).filter(Boolean);

  const results = useMemo(() => {
    if (!terms.length) return [];
    return posts
      .map((post) => ({ post, score: scorePost(post, terms) }))
      .filter(({ score }) => Number.isFinite(score))
      .sort(
        (a, b) =>
          b.score - a.score || new Date(b.post.date) - new Date(a.post.date),
      )
      .slice(0, 12)
      .map(({ post }) => post);
  }, [posts, query]);

  function updateQuery(event) {
    const value = event.target.value;
    setQuery(value);
    onSearchChange?.(Boolean(value.trim()));
  }

  return (
    <section className="tw-mb-8" aria-label="Search blog posts">
      <label className="tw-sr-only" htmlFor="blog-search">
        Search blog posts
      </label>
      <div className="tw-relative tw-max-w-[680px]">
        <svg
          className="tw-pointer-events-none tw-absolute tw-left-4 tw-top-1/2 tw-h-5 tw-w-5 -tw-translate-y-1/2 tw-text-[#8a93a9]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={updateQuery}
          placeholder="Search articles, topics, and tags"
          className="tw-m-0 tw-w-full tw-rounded-lg tw-border-[0.5px] tw-border-solid tw-border-[#6E6B91] tw-bg-[#1A1A1A] tw-py-3.5 tw-pl-12 tw-pr-4 tw-text-base tw-text-[#ddebf2] tw-outline-none placeholder:tw-text-[#8a93a9] focus:tw-border-[#43E2C5]"
        />
      </div>

      {terms.length > 0 && (
        <div className="tw-mt-8" aria-live="polite">
          <p className="tw-mb-5 tw-text-sm tw-text-[#b9c8de]">
            {results.length
              ? `${results.length} matching ${results.length === 1 ? "article" : "articles"}`
              : "No matching articles"}
          </p>
          {results.length > 0 && (
            <div className="tw-grid tw-gap-px tw-bg-[#6e6b9175] tw-p-px md:tw-grid-cols-2">
              {results.map((post) => (
                <article
                  key={post.permalink}
                  className="tw-min-w-0 tw-bg-[#1A1A1A]"
                >
                  <Link
                    className="tw-group tw-block tw-aspect-video tw-overflow-hidden tw-bg-[#0b0d11]"
                    to={post.permalink}
                  >
                    <img
                      className="tw-block tw-h-full tw-w-full tw-object-cover tw-transition-transform tw-duration-200 group-hover:tw-scale-[1.025]"
                      src={post.image || "/img/site/card-3-light.jpg"}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/img/site/card-3-light.jpg";
                      }}
                    />
                  </Link>
                  <div className="tw-p-6">
                    <div className="tw-mb-3 tw-flex tw-flex-wrap tw-gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="tw-rounded-lg tw-border-[0.5px] tw-border-solid tw-border-[#6E6B91] tw-px-2 tw-py-1 tw-text-[0.65rem] tw-capitalize tw-text-[#b9c8de]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={post.permalink}
                      className="tw-text-[#ddebf2] hover:tw-text-[#63e689] hover:tw-no-underline"
                    >
                      <h2 className="tw-mb-3 tw-text-xl tw-leading-tight tw-text-inherit">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="tw-m-0 tw-line-clamp-3 tw-text-sm tw-leading-[1.55] tw-text-[#b9c8de]">
                      {post.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
