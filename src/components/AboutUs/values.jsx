import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

import useBaseUrl from '@docusaurus/useBaseUrl';
import ValueKind from '/static/img/company/values/values-be-kind.svg';
import ValueExcellence from '/static/img/company/values/values-excellence.svg';
import ValueTransparency from '/static/img/company/values/values-transparency.svg';
import ValueTrust from '/static/img/company/values/values-trust.svg';
import ValueWorkTogether from '/static/img/company/values/values-work-together.svg';

export default function CompanyValues() {
  return (
    <div className="container" id="our_company_values">
      <div className={styles.box}>
        <h1>
          Values that <span className="highlight">define us</span>
        </h1>
        <p className="text-center">
          Our values are the foundation of our culture.<br/>
          They unite us as a team and guide our decisions in better ways for our people, business, and future.
        </p>
      </div>

      <div className={styles.values}>

        <img
          className={styles.valuesIllustration}
          src={useBaseUrl('/img/company/values/values-illustration.png')}
        />

        <div>
          <div className={styles.value}>
            <ValueKind className={styles.valueImg} title="Value - Be Kind" />
            <div className={styles.valueContent}>
              <h2 className={styles.header}>Be Kind</h2>
              <p>Our people make working at Weaviate a joy. Their kindness is the magic, which contributes to our success.</p>
            </div>
          </div>

          <div className={styles.value}>
            <ValueWorkTogether className={styles.valueImg} title="Value - Work together as one" />
            <div className={styles.valueContent}>
              <h2 className={styles.header}>Work together as one</h2>
              <p>We combine our different perspectives and support each other to move forward.</p>
            </div>
          </div>

          <div className={styles.value}>
            <ValueExcellence className={styles.valueImg} title="Value - Strive for excellence" />
            <div className={styles.valueContent}>
              <h2 className={styles.header}>Strive for excellence</h2>
              <p>We surpass expectations and do what's best for our customers and our community.</p>
            </div>
          </div>

          <div className={styles.value}>
            <ValueTransparency className={styles.valueImg} title="Value - Encourage transparency" />
            <div className={styles.valueContent}>
              <h2 className={styles.header}>Encourage transparency</h2>
              <p>Be transparent - by default. We share our knowledge and expertise with our colleagues and community.</p>
            </div>
          </div>

          <div className={styles.value}>
            <ValueTrust className={styles.valueImg} title="Value - Inspire trust" />
            <div className={styles.valueContent}>
              <h2 className={styles.header}>Inspire trust</h2>
              <p>We explore new technologies and the world around us. As optimists, we expect the best in people.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
