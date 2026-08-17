import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

/*
  Swizzled (ejected) from @docusaurus/theme-classic.

  This page is served with a real HTTP 404 status by Netlify; only the body is
  customised here. It is written so that a human or an agent that lands on a
  dead URL can recover in one hop: what happened, where the content probably
  moved to, and the machine-readable entry points for the site.

  The body carries the same recovery links twice: once as ordinary HTML for
  people, and once as a plain-text markdown block for agents that scrape the
  404 body instead of following links. Both are generated from the arrays
  below, so they cannot drift apart.

  Keep it short and keep every link working.
*/

const SITE_ORIGIN = 'https://weaviate.io';

const SITE_SECTIONS = [
  {to: '/', label: 'Home', note: 'weaviate.io overview'},
  {
    href: 'https://docs.weaviate.io',
    label: 'Documentation',
    note: 'product, deployment, and client-library docs',
  },
  {
    href: 'https://docs.weaviate.io/weaviate/quickstart',
    label: 'Quickstart',
    note: 'connect, create a collection, import data, query',
  },
  {to: '/product', label: 'Products', note: 'database, cloud, and agents'},
  {to: '/pricing', label: 'Pricing', note: 'Weaviate Cloud and Engram pricing'},
  {to: '/case-studies', label: 'Case studies', note: 'how teams use Weaviate'},
  {to: '/blog', label: 'Blog', note: 'engineering and product writing'},
  {
    href: 'https://forum.weaviate.io/',
    label: 'Community forum',
    note: 'ask a question and search past answers',
  },
  {to: '/contact', label: 'Contact', note: 'talk to the team'},
];

const MACHINE_READABLE = [
  {href: '/llms.txt', label: '/llms.txt', note: 'navigation index for language models'},
  {href: '/index.md', label: '/index.md', note: 'markdown version of this site'},
  {href: '/agents.md', label: '/agents.md', note: 'which resource to use for which task'},
  {
    href: '/.well-known/ai-catalog.json',
    label: '/.well-known/ai-catalog.json',
    note: 'machine-readable catalog of Weaviate resources',
  },
  {href: '/sitemap.xml', label: '/sitemap.xml', note: 'every indexable URL on weaviate.io'},
];

// Absolute URLs, because an agent that copies a link out of the markdown block
// has no base URL to resolve `/llms.txt` against.
function absoluteUrl(item) {
  const target = item.to ?? item.href;
  return target.startsWith('http') ? target : `${SITE_ORIGIN}${target}`;
}

function markdownList(items) {
  return items
    .map((item) => `- [${item.label}](${absoluteUrl(item)}): ${item.note}`)
    .join('\n');
}

const MARKDOWN_BODY = `# Page not found (HTTP 404)

This URL does not exist on weaviate.io. Nothing here is gated: the page is
simply not at this address.

Documentation lives at <https://docs.weaviate.io>. Old \`/developers/*\` and
\`/docs/*\` URLs redirect there, so try the same path on \`docs.weaviate.io\`.

## Main sections

${markdownList(SITE_SECTIONS)}

## Machine-readable entry points

${markdownList(MACHINE_READABLE)}
`;

function ResourceList({items}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.label}>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <a href={item.href}>{item.label}</a>
          )}
          {item.note ? `: ${item.note}` : null}
        </li>
      ))}
    </ul>
  );
}

export default function NotFoundContent({className}) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--8 col--offset-2">
          <Heading as="h1" className="hero__title">
            Page not found (HTTP 404)
          </Heading>

          <p>
            This URL does not exist on weaviate.io. Nothing here was hidden or
            gated: the page is simply not at this address.
          </p>

          <Heading as="h2">Looking for the documentation?</Heading>
          <p>
            Documentation moved to{' '}
            <a href="https://docs.weaviate.io">docs.weaviate.io</a>. Old{' '}
            <code>/developers/*</code> and <code>/docs/*</code> URLs redirect
            there automatically, so if you hand-edited a docs URL, try the same
            path on <code>docs.weaviate.io</code> first. The docs site also has
            its own search.
          </p>

          <Heading as="h2">Main sections of this site</Heading>
          <ResourceList items={SITE_SECTIONS} />

          <Heading as="h2">Machine-readable entry points</Heading>
          <p>
            If you are an agent or a crawler, start from one of these instead of
            guessing URLs:
          </p>
          <ResourceList items={MACHINE_READABLE} />

          <Heading as="h2">This page as markdown</Heading>
          <p>
            The same recovery links in markdown, for agents that read the 404
            body rather than following links:
          </p>
          <pre
            data-format="text/markdown"
            style={{whiteSpace: 'pre-wrap', overflowX: 'auto'}}>
            <code className="language-markdown">{MARKDOWN_BODY}</code>
          </pre>

          <p>
            Think this page should exist? Report the broken link at{' '}
            <a href="https://github.com/weaviate/weaviate-io/issues">
              github.com/weaviate/weaviate-io/issues
            </a>{' '}
            or through <Link to="/contact">the contact form</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
