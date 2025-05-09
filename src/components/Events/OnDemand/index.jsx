import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function OnDemand() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.marketTitle} id="on-demand-webinars">
          <h2 className={styles.marketText}>On-demand webinars</h2>
        </div>
        <div className={styles.buttons}>
          <div className={styles.marketBox}>
            <p>
              Intro to Hybrid Search: Combining the power of keyword and vector
              search
            </p>
            <Link to="https://events.weaviate.io/hybrid-search-webinar">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>
              Multimodal Product Discovery: The next generation of search for
              ecommerce
            </p>
            <Link to="https://events.weaviate.io/ecommerce-webinar">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>Building an AI-Native Foundation for Enterprise Applications</p>
            <Link to="https://events.weaviate.io/enterprise-apps-webinar">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>JS June - Build AI Apps with Weaviate!</p>
            <Link to="https://events.weaviate.io/js-june-24">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>
              Improving Customer Support With Generative AI-Powered Assistants
            </p>
            <Link to="https://events.weaviate.io/customer-support-webinar">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>
              Weaviate Product Update: Optimizing AI infrastructure for your use
              case
            </p>
            <Link to="https://events.weaviate.io/update-126">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>
              Benchmarking AI Databases: How to test and optimize for your use
              case
            </p>
            <Link to="https://events.weaviate.io/benchmarking-webinar">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>Navigating the AI Database Landscape: Guidance from the Field</p>
            <Link to="https://events.weaviate.io/gigaom-webinar-2025">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>Beyond the Hype: How AI Agents can Transform Your Business</p>
            <Link to="https://events.weaviate.io/agents-stackai-webinar-2025">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>Reimagining Data Workflows with Weaviate Agents</p>
            <Link to="https://events.weaviate.io/weaviate-agents-livestream-2025">
              {'Watch now >'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
