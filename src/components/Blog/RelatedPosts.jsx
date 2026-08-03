import React from "react";
import BlogPostItems from "../../theme/BlogPostItems";
import postsJson from "/data/blogposts.json";
import relatedJson from "/data/related.json";
import {
  useBlogPost,
  useBlogListPageStructuredData,
} from "@docusaurus/plugin-content-blog/client";

function toItemFromMeta(meta, assets) {
  return {
    content: {
      metadata: {
        title: meta.title || meta.tagline || meta.title,
        permalink: meta.permalink || meta.slug || meta.link,
        formattedDate: meta.formattedDate || meta.date,
        readingTime: meta.readingTime || meta.reading_time || 5,
        tags: normalizeTags(meta.tags || []),
        description: meta.description || meta.excerpt || "",
      },
      assets: {
        image:
          assets?.image ||
          assets?.imageUrl ||
          meta.image ||
          meta.backgroundImage ||
          "",
      },
    },
  };
}

function slugifyTag(t) {
  return String(t)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((t) => {
      if (!t) return null;
      if (typeof t === "string") {
        const label = t;
        const permalink = `/blog/tags/${encodeURIComponent(slugifyTag(label))}`;
        return { label, permalink };
      }
      // already an object
      if (typeof t === "object") {
        if (t.label && t.permalink) return t;
        const label = t.label || t.name || String(t);
        const permalink =
          t.permalink || `/blog/tags/${encodeURIComponent(slugifyTag(label))}`;
        return { label, permalink };
      }
      return null;
    })
    .filter(Boolean);
}

export default function RelatedPosts({ count = 3 }) {
  const { metadata: currentMeta } = useBlogPost();

  // Prefer structured blog data from the blog plugin (contains keywords/tags),
  // otherwise fall back to the static JSON file.
  let candidates = [];
  try {
    const structured = useBlogListPageStructuredData
      ? useBlogListPageStructuredData()
      : null;
    if (Array.isArray(structured) && structured.length) {
      candidates = structured
        .map((item) => {
          const meta = {
            title: item.headline || item.name || item.title,
            permalink: item.url,
            date: item.datePublished || item.date || item.dateCreated,
            formattedDate: item.datePublished || item.date || item.dateCreated,
            tags: item.keywords || item.tags || [],
            description: item.description || item.excerpt || "",
          };
          const assets = { image: item.image?.url || item.image || "" };
          return { meta, assets };
        })
        .filter(
          ({ meta }) =>
            meta && meta.permalink && meta.permalink !== currentMeta.permalink,
        );
    }
  } catch (e) {
    // ignore and fall back
  }

  if (!candidates.length) {
    // Prefer an explicit related.json if present, otherwise prefer a `related`
    // array inside blogposts.json, then fall back to the general blog list.
    const preferred = Array.isArray(relatedJson?.related)
      ? relatedJson.related
      : Array.isArray(postsJson.related)
        ? postsJson.related
        : postsJson.blog;

    if (Array.isArray(preferred)) {
      candidates = preferred.map((p) => ({
        meta: {
          title: p.tagline || p.title,
          permalink: p.link,
          date: p.date,
          formattedDate: p.date,
          tags: p.tags || [],
          description: p.description || "",
        },
        assets: { image: p.backgroundImage },
      }));
    }
  }

  if (!candidates.length) return null;

  const currentTags = (currentMeta?.tags || [])
    .map((t) => (typeof t === "string" ? t : t.label || t.name))
    .filter(Boolean)
    .map((t) => t.toLowerCase().trim());

  const scored = candidates
    .map(({ meta, assets }) => {
      const tags = (meta.tags || [])
        .map((t) => (typeof t === "string" ? t : t.label || t.name))
        .filter(Boolean)
        .map((t) => t.toLowerCase().trim());
      const shared = currentTags.filter((t) => tags.includes(t)).length;
      const date =
        new Date(meta.date || meta.formattedDate || 0).getTime() || 0;
      return { meta, assets, shared, date };
    })
    .sort((a, b) => {
      if (b.shared !== a.shared) return b.shared - a.shared;
      return b.date - a.date;
    })
    .slice(0, count);

  // If there are candidates with shared tags, prefer only those so results vary by
  // tag. Otherwise, try to choose posts from the same top-level section (e.g.
  // /blog/, /case-studies/) before falling back to the most recent posts.
  const hasShared = candidates.some((c) => {
    const tags = (c.meta.tags || [])
      .map((t) => (typeof t === "string" ? t : t.label || t.name))
      .filter(Boolean)
      .map((t) => t.toLowerCase().trim());
    return currentTags.some((ct) => tags.includes(ct));
  });

  let finalItems = scored;
  if (!hasShared) {
    const currentSection =
      (currentMeta?.permalink || currentMeta?.slug || "")
        .split("/")
        .filter(Boolean)[0] || "blog";
    const sameSection = candidates
      .filter((c) => (c.meta.permalink || "").includes(`/${currentSection}/`))
      .map(({ meta, assets }) => ({
        meta,
        assets,
        shared: 0,
        date: new Date(meta.date || meta.formattedDate || 0).getTime() || 0,
      }))
      .sort((a, b) => b.date - a.date)
      .slice(0, count);
    if (sameSection.length) {
      finalItems = sameSection;
    } else {
      finalItems = scored; // fall back to date-sorted
    }
  }

  const items = finalItems.map(({ meta, assets }) =>
    toItemFromMeta(meta, assets),
  );

  if (!items.length) return null;

  return (
    <section className="tw-mt-12">
      <h2 className="tw-mb-6 tw-text-[1.25rem] tw-text-[#ddebf2]">
        Relevant blog posts:
      </h2>
      <BlogPostItems items={items} />
    </section>
  );
}
