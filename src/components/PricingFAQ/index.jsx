import React from 'react';
import styles from './styles.module.scss';
import faq from './faq.json';
import DOMPurify from 'isomorphic-dompurify';

export default function PricingFAQ() {
  return (
    <div className="container">
      <div className={styles.boxGrid}>
        {faq.map((item) => {
          return (
            <div key={item.question} className={styles.box}>
              <h3
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.question),
                }}
              ></h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.answer),
                }}
              ></p>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item?.code),
                }}
              ></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
