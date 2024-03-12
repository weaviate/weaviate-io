import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function ServicePlan() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.diagramBox}>
          <div className={styles.header}>
            <h2>
              Run Weaviate securely within your<br></br> own cloud environment.
            </h2>
          </div>
          <div className={styles.content}>
            <div className={styles.leftContent}>
              <span>Architecture</span>
              <p>
                Our BYOC architecture capitalizes on managed Kubernetes,
                ensuring scalability and resilience.
              </p>
              <span>Shared reponsibility</span>
              <p>
                Weaviate manages application-level security, provisioning,
                configuration, upgrades and patches with 24/7 monitoring and
                support. The customer ensures secure configuration of the
                broader cloud environment and access controls.
              </p>
              <span>Non-disruptive updates</span>
              <p>
                We release regular updates and critical patches using
                progressive roll out strategies to reduce disruption and ensure
                stability.
              </p>
            </div>
            <div className={styles.rightContent}>
              <div className={styles.diagram}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
