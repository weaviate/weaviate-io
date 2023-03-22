import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PricingHeader({selectedType, handleSelected}) {
  return (
    <div className="container">
      <div className={styles.box}>
        <h1>
          <span className={styles.textGradient}>Weaviate</span>
        </h1>
        <h1>
          Cloud Services Pricing
        </h1>
          <p>
            Start for free and only pay for the vector dimensions you store and query. Upgrade to
            one of our unlimited capacity plans starting at $0.05 per
            1 million vector dimensions and scale seamlessly as your needs grow.
          </p>
      </div>
      <div className='container'>
        <div className={styles.buttons}>
          <div className={`${styles.border} ${selectedType === 'saas' ? styles.outline : styles.opacity}`}>
            <div className={styles.btn} onClick={() => handleSelected('saas')}>
              <div className={styles.saasPng} />
              <h1>SaaS</h1>
              <p>Control you data, run and deploy the</p>
              <p>software on your own private cloud.</p>
            </div>
          </div>
          <div className={`${styles.border} ${selectedType === 'hybrid' ? styles.outline :  styles.opacity}`}>
            <div className={styles.btn} onClick={() => handleSelected('hybrid')}>
            <div className={styles.hybridPng} />
            <h1>Hybrid SaaS</h1>
            <p>We install Weaviate in your cloud and</p>
            <p>manage your infrastructure.</p>
          </div>
          </div>
        </div>
       </div>
    </div>
  );
}
