import React, { useState } from 'react';
import styles from './styles.module.scss';
import faq from './faq.json';

export default function PricingFAQ() {
  const [more, setMore] = useState(false);

  return (
    <div className="container">
      <div className={styles.intro}>
        <h2>Frequently asked questions</h2>
        <p>Let us help answer the most common questions you might have.</p>
      </div>

      <div className={styles.boxGrid}>
        {faq.map((item, index) => {
          if(!more && index > 1){
            return
          }
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
      {!more ? (
        <div className={styles.buttons}>
          <div className={styles.buttonOutline} onClick={() => setMore(true)}>
            Load more
          </div>
        </div>
      ) : (
        <div className={styles.buttons}>
          <div className={styles.buttonOutline} onClick={() => setMore(false)}>
            Show less
          </div>
        </div>
      )}
    </div>
  );
}
