/**
 * Route -> markdown twin.
 *
 * THE single source of truth for the markdown surface of weaviate.io. It is
 * consumed by:
 *   1. src/theme/Root.js, which emits
 *      <link rel="alternate" type="text/markdown" href="..."> on the matching
 *      page (and only on the matching page), and
 *   2. the "check-markdown-twins" plugin in docusaurus.config.js, which fails
 *      the build if a mapped file is missing from static/.
 *
 * Rules:
 *   - Key: the route as Docusaurus renders it (no trailing slash, no origin).
 *     Only add a key for a route that actually exists, otherwise nothing will
 *     ever read the entry.
 *   - Value: the path of the twin under static/, served from the site root.
 *   - Adding a twin means adding a line here in the same commit. The build
 *     check exists because these two things drift apart otherwise.
 *
 * These twins are hand-written, so every one of them is an artifact that can
 * rot away from its JSX source. Generating them from the page source at build
 * time is the better long-term answer; until then, keep the set small and
 * high-value.
 *
 * Standalone markdown resources with no HTML page (so no rel=alternate, and
 * they are self-canonical): /agents.md, /quickstart.md, /python.md,
 * /terminology.md, /assurance.md, /auth.md.
 */
const MARKDOWN_TWINS = {
  '/': '/index.md',

  // Product
  '/platform': '/database.md',
  '/product': '/product.md',
  '/product/embeddings': '/product/embeddings.md',
  '/product/engram': '/product/engram.md',
  '/product/explorer': '/product/explorer.md',
  '/product/query': '/product/query.md',
  '/product/query-agent': '/product/query-agent.md',
  '/product/personalization-agent': '/product/personalization-agent.md',
  '/product/transformation-agent': '/product/transformation-agent.md',
  '/product-previews': '/product-previews.md',
  '/pricing': '/pricing.md',

  // Deployment
  '/deployment': '/deployment.md',
  '/deployment/shared': '/deployment/shared.md',
  '/deployment/dedicated': '/deployment/dedicated.md',
  '/enterprise': '/enterprise.md',
  '/security': '/security.md',

  // Use cases
  '/hybrid-search': '/hybrid-search.md',
  '/rag': '/rag.md',
  '/agentic-ai': '/agentic-ai.md',
  '/cost-performance-optimization': '/cost-performance-optimization.md',

  // Build
  '/javascript': '/javascript.md',
  '/learn/what-is-an-ai-database': '/learn/what-is-an-ai-database.md',

  // Partners
  '/partners': '/partners.md',
  '/partners/aws': '/partners/aws.md',
  '/partners/gcp': '/partners/gcp.md',
  '/partners/databricks': '/partners/databricks.md',
  '/partners/snowflake': '/partners/snowflake.md',

  // Case studies
  '/case-studies': '/case-studies.md',
  '/case-studies/docsbot': '/case-studies/docsbot.md',
  '/case-studies/instabase': '/case-studies/instabase.md',
  '/case-studies/kapa': '/case-studies/kapa.md',
  '/case-studies/morningstar': '/case-studies/morningstar.md',
  '/case-studies/finster': '/case-studies/finster.md',

  // Company
  '/company/about-us': '/company/about-us.md',
  '/community': '/community.md',
};

module.exports = MARKDOWN_TWINS;
