import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

const CARDS = [
  {
    id: 'weaviate-skill',
    label: 'AVAILABLE',
    title: 'Weaviate Skill (Utility)',
    description:
      'Core skill for querying and understanding your Weaviate data—built for safe, production-friendly workflows.',
    bullets: [
      'Query Agent',
      'Hybrid + semantic search',
      'Collection information',
    ],
    ctaText: 'View Skill',
    ctaHref:
      'https://github.com/weaviate/agent-skills/blob/main/skills/weaviate/SKILL.md',
    graphic: '/img/site/book-agentic-graphic.svg',
  },
  {
    id: 'cookbook',
    label: 'RECIPES',
    title: 'Cookbook (End-to-End)',
    description:
      'Practical recipes you can copy into real apps—from ingestion to retrieval to RAG and agentic patterns.',
    bullets: [
      'Query Agent chatbot',
      'Chat with your PDFs',
      'Ingest → Retrieve → RAG',
    ],
    ctaText: 'Explore Recipes',
    ctaHref: '',
    graphic: '/img/site/book-rag-graphic.svg',
  },
  {
    id: 'docs-skill',
    label: 'CONTEXT',
    title: 'Weaviate Docs Skill',
    description:
      'Grounded context for agents—MCP access + curated prompt references for docs and code patterns.',
    bullets: [
      'MCP access (one-time verification)',
      'Docs prompt index references',
      'Works with compatible agents',
    ],
    ctaText: 'How it works',
    ctaHref: '#agent-stack',
    graphic: '/img/site/book-scale-graphic.svg',
  },
];

const ABOUT_ITEMS = [
  'Agent Skills are designed for safe, production-friendly workflows.',
  'Destructive operations (delete/wipe) are intentionally not exposed by default.',
  'Some advanced actions may require explicit human approval.',
];

export default function SkillsGrid() {
  return (
    <section className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {CARDS.map((c) => (
            <article
              key={c.id}
              id={c.id === 'cookbook' ? 'cookbook' : undefined}
              className={styles.card}
            >
              <div className={styles.previewHeader}>
                <div className={styles.pill}>{c.label}</div>
              </div>

              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.blurb}>{c.description}</p>

              {c.bullets?.length ? (
                <ul className={styles.list}>
                  {c.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : null}

              <div className={styles.actions}>
                <Link className={styles.requestButton} to={c.ctaHref}>
                  {c.ctaText}
                </Link>
              </div>

              {c.graphic ? (
                <div className={styles.graphic}>
                  <img src={c.graphic} alt="" role="presentation" />
                </div>
              ) : null}
            </article>
          ))}
        </div>

        {/*   <div className={styles.aboutPanel} aria-label="About agent skills">
          <h3 className={styles.aboutTitle}>About Agent Skills</h3>
          <ul className={styles.aboutList}>
            {ABOUT_ITEMS.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </section>
  );
}
