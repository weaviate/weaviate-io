import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function AgentSkillsHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Agent Skills</h1>

          <div className={styles.headerBox}>
            <p className="text-center">
              Build production-ready agent workflows with Weaviate. Reusable
              skills for querying, retrieval, and guided setup — plus an
              end-to-end cookbook.
            </p>
          </div>

          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://github.com/weaviate/agent-skills"
            >
              View on GitHub
            </Link>
            <Link className={styles.buttonOutline} to="#cookbook">
              Explore Cookbook
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
