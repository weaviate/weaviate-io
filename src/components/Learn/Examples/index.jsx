import React from 'react';
import Link from '@docusaurus/Link';
import styles from '../Ebooks/styles.module.scss';

const updates = [
  ['Agentic AI', '/agentic-ai', 'Give agents the context to make decisions and adapt.'],
  // TODO: Verify the Query Agent description against its source page before publishing.
  ['Query Agent', '/product/query-agent', 'Turn plain-language questions into database operations and answers backed by your data.'],
  // TODO: Verify the 1.40 description against its release page before publishing.
  ['Weaviate 1.40 release', '/blog/weaviate-1-40-release', 'See updates to vector management, quantization, and filtering.'],
];

export default function WhatsNew() {
  return (
    <section className={styles.bgCol} id="whats-new">
      <div className="container">
        <div className={styles.header}>
          <h2>What's new</h2>
          <p>Recent product updates for teams building with AI.</p>
        </div>
        <div className={styles.typeContainer}>
          {updates.map(([title, to, description]) => (
            <Link to={to} key={to}>
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}><h3>{title}</h3></div>
                <div className={styles.typeText}><p>{description}</p></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
