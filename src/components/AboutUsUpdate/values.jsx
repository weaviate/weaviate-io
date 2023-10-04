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
    <div className={styles.valuesBG}>
      <div className="container" id="our_company_values">
        <div className={styles.valuesSection}>
          <div className={`${styles.valuesBox} ${styles.clearBox}`}>
            <h3>
              Values that<br></br> define us
            </h3>
            <p>
              Our values are the foundation of our culture.They unite us as a
              team and guide our decisions in better ways for our people,
              business, and future.
            </p>
          </div>
          <div className={styles.valuesBox}>
            <div className={styles.valuesHeader}>
              <div className={styles.valuesIcon1}> </div>
              <h4>Be Kind</h4>
            </div>

            <p>
              Our people make it all happen. They are kind, respectful and show
              empathy towards others. They are generous with their time. Our
              people make working at Weaviate a joy. Their kindness is the
              magic, which contributes to our success.
            </p>
          </div>

          <div className={styles.valuesBox}>
            <div className={styles.valuesHeader}>
              <div className={styles.valuesIcon2}> </div>
              <h4>Work together as one</h4>
            </div>

            <p>
              Weaviate is about teamwork, sharing responsibility and learning
              from one another. We combine our different perspectives and
              support each other to move forward. If you need them, your
              colleagues are there for you to lend a helping hand.
            </p>
          </div>

          <div className={styles.valuesBox}>
            <div className={styles.valuesHeader}>
              <div className={styles.valuesIcon3}> </div>
              <h4>Strive for excellence</h4>
            </div>

            <p>
              To create an experience that resonates with others, we must
              surpass expectations. So be ambitious, take ownership and dream
              big dreams. We do what’s good for our customers and our community.
              If striving for excellence is part of your mindset, then you’ll
              feel right at home.
            </p>
          </div>

          <div className={styles.valuesBox}>
            <div className={styles.valuesHeader}>
              <div className={styles.valuesIcon4}> </div>
              <h4>Encourage transparency</h4>
            </div>

            <p>
              Be transparent - by default. Share your knowledge and expertise
              with your Weaviate colleagues and our open-source community.
              Encourage others to do the same. Share the good and the bad. Never
              stop learning. And be open to new perspectives.
            </p>
          </div>

          <div className={styles.valuesBox}>
            <div className={styles.valuesHeader}>
              <div className={styles.valuesIcon5}> </div>
              <h4>Inspire trust</h4>
            </div>

            <p>
              By inspiring trust, we give you the freedom to explore new
              technologies and the world around you. As optimists, we expect the
              best in people. Choose where you want to work and how. Expand your
              skill set and abilities. The opportunities will be many. It’s up
              to you to determine your path forward.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
