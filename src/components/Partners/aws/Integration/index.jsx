import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function Integration() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Weaviate and AWS integration</h2>
          <p>
            Whether you are a traditional enterprise with an on-prem data
            footprint or a digital native,<br></br> Weaviate can meet you where
            you are on your journey to the cloud. Enterprises can<br></br>{' '}
            migrate data to AWS with Weaviate and power real-time analytics and
            apps on a unified<br></br>
            data platform. This supports everything from fraud detection,
            predictive maintenance, to<br></br> customer retention. We
            accelerate your journey to the cloud with a complete data in
            <br></br> motion platform, powered by Apache Kafka.
          </p>
        </div>
        <div className={styles.techContainer}>
          <div className={styles.diagram}></div>
        </div>
      </div>
    </div>
  );
}
