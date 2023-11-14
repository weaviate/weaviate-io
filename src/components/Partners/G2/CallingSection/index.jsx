import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function CallingSection() {
  return (
    <div className={styles.bgColor}>
      <div className={styles.container}>
        <div className={styles.header}>
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
