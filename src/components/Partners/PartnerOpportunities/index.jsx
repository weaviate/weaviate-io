import React from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function partnerOpportunities() {
  return (
    <div className={styles.benefits}>
      <div className="container">
        <div className={styles.header}>
          <h2>Partnership opportunities</h2>
        </div>
        <div className={styles.features}>
          <div className={styles.box}>
            <p className={styles.icon1}></p>
            <h4 className={styles.title}>Unleash the Potential of AI</h4>
            <p className={styles.subTitle}>
              Join forces with Weaviate and tap into the immense potential of AI
              technology. Enhance your products and services with
              state-of-the-art capabilities, making them more competitive and
              valuable to your customers.
            </p>
          </div>
          <div className={styles.box}>
            <p className={styles.icon1}></p>
            <h4 className={styles.title}>Technical Expertise</h4>
            <p className={styles.subTitle}>
              Weaviate offers top-notch technical support and resources to
              ensure a seamless integration of our technology with yours. Our
              team of experts will assist you at every step of the way, ensuring
              a successful partnership.
            </p>
          </div>
          <div className={styles.box}>
            <p className={styles.icon1}></p>
            <h4 className={styles.title}>Accelerated Innovation</h4>
            <p className={styles.subTitle}>
              Together, we can drive innovation faster. As a Weaviate partner,
              you'll have early access to our latest features and updates,
              enabling you to stay at the forefront of the AI revolution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
