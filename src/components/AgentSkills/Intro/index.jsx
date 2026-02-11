import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

export default function AgentSkillsIntro() {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.topGrid}>
            <div className={styles.copy}>
              <h2>Build agents that actually ship.</h2>
              <p>
                Agent Skills are reusable building blocks that give agents
                structured capabilities—like querying Weaviate, retrieving
                context, and following proven workflows. Pair them with cookbook
                recipes to go from idea → prototype → production patterns
                faster.
              </p>

              <div className={styles.ctas}>
                <Link className={styles.buttonGradient} to="#cookbook">
                  Try a recipe
                </Link>
                <Link
                  className={styles.buttonOutline}
                  to="https://agentskills.io/home#adoption"
                >
                  Read the format
                </Link>
              </div>
            </div>
            <div className={styles.graphicWrap} aria-hidden="true">
              <img
                src="/img/site/agentic-ai-diagram-transparent.svg"
                alt=""
                role="presentation"
              />
            </div>
          </div>

          <div className={styles.highlights}>
            <div className={styles.highlightCard}>
              <h3>Plug in capabilities</h3>
              <p>Query, retrieve, and inspect collections safely.</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Stay grounded in context</h3>
              <p>Use curated docs + MCP context to reduce guesswork.</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Start from recipes</h3>
              <p>Copy end-to-end patterns for ingestion, retrieval, and RAG.</p>
            </div>
          </div>

          <div className={styles.examples}>
            <div className={styles.examplesTitle}>What you can build</div>
            <div className={styles.pills}>
              <span className={styles.pill}>Chat with your PDFs</span>
              <span className={styles.pill}>Add search to an existing app</span>
              <span className={styles.pill}>Support bot over docs</span>
              <span className={styles.pill}>Multi-vector retrieval</span>
              <span className={styles.pill}>Embedding model evaluation</span>
              <span className={styles.pill}>Agentic RAG workflows</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
