import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

const guides = [
  ['The Context Engineering Guide', '/ebooks/the-context-engineering-guide', 'Design AI systems that make better use of context.'],
  ['Agentic Architectures for Retrieval-intensive Applications', '/ebooks/agentic-architectures', 'Learn patterns for retrieval-intensive applications.'],
  ['Advanced RAG Techniques', '/ebooks/advanced-rag-techniques', 'Improve retrieval-augmented generation applications.'],
];

export default function Ebooks() {
  return (
    <section className={styles.bgCol} id="ebooks">
      <div className="container">
        <div className={styles.header}>
          <h2>Featured guides</h2>
          <p>Make informed decisions about context, agents, and retrieval.</p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            {guides.map(([title, to, description]) => (
              <Link to={to} key={to}>
                <div className={styles.typeBox}>
                  <div className={styles.typeIcon}>
                    <div className={`${styles.homeIcon} ${styles.papers}`}></div>
                    <h3>{title}</h3>
                  </div>
                  <div className={styles.typeText}><p>{description}</p></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
