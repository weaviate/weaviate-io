import React from 'react';
import styles from './styles.module.scss';
import faq from './faq.json';

export default function PricingFAQ() {
  return (
    <div className="container">
      <div className={styles.intro}>
        <h2>Frequently asked questions</h2>
        <p>Let us help answer the most common questions you might have.</p>
      </div>
      <div className={styles.boxGrid}>
        {faq.map((item) => {
          return (
            <div key={item.question} className={styles.box}>
              <h3
                dangerouslySetInnerHTML={{
                  __html: item.question,
                }}
              ></h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.answer,
                }}
              ></p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item?.code,
                }}
              ></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
