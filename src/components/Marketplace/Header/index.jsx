import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function HomepageHeader() {
  return (
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.box}>
            <h1>Products</h1>
            <p>
              Accelerate AI-native application development with GUI-based tools
              and apps to make building and scaling easier.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="https://console.weaviate.cloud"
              >
                Open Weaviate Cloud
              </Link>
            </div>
            <div className={styles.agentsContainer}>
              <div className={styles.agent}></div>
              <div className={styles.agentText}>
                <h3>Introducing Weaviate Agents</h3>
                <p>Simplifying Agentic Workflows with the power of Weaviate</p>
              </div>

              <Link className={styles.buttonGradient} to="#weaviate-agents">
                Explore Agents
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
