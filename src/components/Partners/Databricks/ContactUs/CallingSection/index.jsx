import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function CallingSection() {
  return (
    <div className={styles.bgColor}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>
            You have until 11:59pm PT November 21st to submit a review and the
            form below to ensure that you get your limited edition Weaviate
            shirt!
          </h2>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://www.g2.com/products/weaviate/take_survey"
            >
              Leave a Review
            </Link>
            <Link
              className={styles.buttonGradient}
              to="https://form.jotform.com/233166493842058"
            >
              T-Shirt Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
