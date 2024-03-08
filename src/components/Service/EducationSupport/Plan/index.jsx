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
              Whether you’re using our cloud services or hosting<br></br>{' '}
              Weaviate on your own, we’re here to help you succeed.
            </h2>
          </div>
          <div className={styles.content}>
            <div className={styles.leftContent}>
              <span>Onboarding packages</span>
              <p>
                Rolling out a new database can be daunting. With onboarding
                packages tailored to your needs, we’ll make sure you’re set up
                for success with Weaviate.
              </p>
              <span>Enterprise support</span>
              <p>
                We offer 24x7 enterprise support options for both Weaviate Cloud
                Services and open source users. If something goes wrong, we’ll
                be there to help.
              </p>
              <span>Free on-demand learning</span>
              <p>
                Keep your AI-native development skills fresh with self-paced
                courses offered through Weaviate Academy and DeepLearning.AI.
              </p>
              <span>Live training</span>
              <p>
                In addition to our documentation, guides, and on-demand
                learning, we host live workshops and office hours virtually or
                in person. Learn more{' '}
              </p>
            </div>
            <div className={styles.rightContent}>
              <div className={styles.parentGrid}>
                <div className={styles.imageGrid1}> </div>
                <div className={styles.imageGrid2}> </div>
                <div className={styles.imageGrid3}> </div>
                <div className={styles.imageGrid4}> </div>
                <div className={styles.imageGrid5}> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
