import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Details() {
  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.header}>
          <h2>Power enterprise intelligence with agentic workflows</h2>
          <p>
            Agentic AI isn’t just a trend—it’s the next evolutionary step in AI,
            where systems don’t just inform but act. Enterprises that embrace
            this shift will see significant benefits by automating
            labor-intensive processes, enhancing operational efficiency, and
            driving ROI from their AI initiatives. As use cases move from static
            insights to semi or fully-autonomous agentic workflows, AI-native
            infrastructure like Weaviate becomes more critical than ever in
            handling their complexity.
          </p>
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.icon01}></div>
              <h2>High -performance search and memory</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Help AI agents quickly adapt to new information and provide
                context for future interactions with real-time ingestion and
                querying of multimodal data, at scale.<br></br>
                <Link to="https://weaviate.io/developers/weaviate/concepts/search/hybrid-search">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.icon01} ${styles.icon02}`}></div>
              <h2>Built-in agents for data transformation</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Accelerate AI data readiness for more reliable AI agents. Spend
                less time querying, organizing, and enriching data with
                pre-built agents trained on Weaviate APIs.<br></br>
                <Link to="/product/#weaviate-agents">Learn more</Link>
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.icon01} ${styles.icon03}`}></div>
              <h2>Enterprise security and compliance</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Meet enterprise requirements for security and compliance more
                easily with flexible deployment, native multi- tenancy, and
                strict access controls.<br></br>
                <Link to="/security">Learn more</Link>
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.icon01} ${styles.icon04}`}></div>
              <h2>Integration with popular agent frameworks</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Seamlessly connect with popular LLMs and agent tools like
                LangChain, LlamaIndex, and Crew AI, simplifying the process of
                building and deploy agentic AI.<br></br>
                <Link to="/product/integrations">Learn more</Link>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.serviceBox}>
          <div className={styles.serviceText}>
            <span>Guide</span>

            <h2>Agentic Architectures for Retrieval-intensive Applications</h2>

            <p>
              A comprehensive guide to mastering fundamentals, patterns, and
              examples of agentic architectures.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="/ebooks/agentic-architectures"
              >
                Download Free eBook PDF
              </Link>
            </div>
          </div>

          <div className={styles.serviceImage}></div>
        </div>
      </div>
    </div>
  );
}
