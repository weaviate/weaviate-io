import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function ServicePlan() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.diagramBox}>
          <div className={styles.header}>
            <h2>Benefits of our fully-managed vector database service</h2>
          </div>
          <div className={styles.content}>
            <div className={styles.leftContent}>
              <span>No operational overhead</span>
              <p>
                Get started in minutes — just bring your data. Weaviate manages
                all infrastructure, configuration, and upgrades, so you can
                focus on your applications.
              </p>
              <span>Simple management</span>
              <p>
                Create and manage clusters with one click through the Weaviate
                Console. Explore your data interactively and monitor usage in
                real time.
              </p>
              <span>Automatic scalability</span>
              <p>
                Your database automatically scales up or down based on vector
                memory requirements — no manual tuning required.
              </p>
              <span>Global accessibility</span>
              <p>
                Available across five cloud regions, with built-in access to
                cloud-native AI services such as the Embedding Service and Query
                Agent.
              </p>
            </div>
            <div className={styles.rightContent}>
              <div className={styles.diagram}></div>
            </div>
            <div className={styles.bottomContent}>
              <h2 className={styles.getStarted}>
                Ready to get started? Choose your{' '}
                <Link to="/pricing">plan</Link>.
              </h2>
              <p>
                Visit our <Link to="/pricing">pricing page</Link> for details
                and answers to frequently asked questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
