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
              The benefits of a managed service,<br></br> without the noisy
              neighbors.
            </h2>
          </div>
          <div className={styles.content}>
            <div className={styles.leftContent}>
              <span>Dedicated instance</span>
              <p>
                Your data and operations are isolated within a dedicated tenant—
                boosting security, consistency, and performance.
              </p>
              <span>Performance and reliability</span>
              <p>
                Ensure your resources are available when you need them and
                optimized to support your applications.
              </p>
              <span>Security and compliance</span>
              <p>
                Enhanced security, continuous monitoring, and guaranteed
                adherence to industry standards and best practices.
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
