import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

const featuredTags = [
  "agents",
  "concepts",
  "engineering",
  "integrations",
  "how-to",
  "release",
  "research",
  "search",
  "community",
];

export default function FeaturedBlogTags({ activeTag = "all" }) {
  const isActive = (tag) => activeTag.toLowerCase() === tag;
  const tagClass = (tag) =>
    clsx(
      "tw-rounded-lg tw-border-[0.5px] tw-transition-colors",
      isActive(tag)
        ? "tw-border-[#6E6B91] tw-bg-[linear-gradient(223deg,#43E2C5_-4.42%,#70EE62_100%)]"
        : "tw-border-[#6E6B91] tw-bg-transparent hover:tw-border-[#63e689]/60 hover:tw-bg-[#63e689]/[0.06]",
    );
  const linkClass = (tag) =>
    clsx(
      "tw-flex tw-items-center tw-px-[11px] tw-py-[7px] tw-text-xs tw-font-medium tw-capitalize hover:tw-no-underline",
      isActive(tag)
        ? "tw-text-[#08120c] hover:tw-text-[#08120c]"
        : "tw-text-[#d0d8ea] hover:tw-text-[#edf4ff]",
    );

  return (
    <nav aria-label="Blog categories">
      <div className="tw-flex tw-flex-wrap tw-gap-2">
        <div className={tagClass("all")}>
          <Link className={linkClass("all")} to="/blog">
            All
          </Link>
        </div>
        {featuredTags.map((tag) => (
          <div className={tagClass(tag)} key={tag}>
            <Link className={linkClass(tag)} to={`/blog/tags/${tag}`}>
              {tag}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
