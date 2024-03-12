import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingSandBox() {
  return (
    <div className={styles.supportbox}>
      <div className={`${styles.title} ${styles.supportTitle}`}>
        <h3 className={styles.color}>Education & Support</h3>
        <p>
          With an enterprise subscription, customers have access to a variety of
          support and training options to accelerate adoption and success.
        </p>
      </div>
      <div className={styles.features}>
        <li>
          <span>Dedicated Technical Success Manager</span>
        </li>
        <li>
          <span>Architecture design workshop</span>
        </li>
        <li>
          <span>Production readiness assessment</span>
        </li>
        <li>
          <span>24/7 support via email and phone escalation hotline</span>
        </li>
        <li>
          <span>Enterprise or Business Critical SLAs</span>
        </li>
      </div>
      <div className={styles.features}>
        <li>
          <span>24/7 monitoring and support</span>
        </li>
        <li>
          <span>Curated onboarding program to kickstart development</span>
        </li>
        <li>
          <span>
            Access to Weaviate community, knowledge hub and extensive training
            material, workshops and documentation
          </span>
        </li>
        <li>
          <span>Weekly office hours</span>
        </li>
        <Link
          className={styles.supportLink}
          to="services/education-and-support"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
