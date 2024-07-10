import React, { useState } from 'react';
import styles from './styles.module.scss';
import faq from './faq.json';
import faqByoc from './faqByoc.json';

const faqType = 'byoc';

export default function PricingFAQ(props) {
  const [more, setMore] = useState(false);
  const { faqType } = props;
  let faqData = [];

  if (faqType === 'Serverless') {
    faqData = faq;
  } else if (faqType === 'BYOC') {
    faqData = faqByoc;
  }

  return (
    <div className={styles.faqBG}>
      <div className="container">
        <div className={styles.intro}>
          <h2>Frequently asked questions</h2>
          <p>Let us help answer the most common questions you might have.</p>
        </div>

        <div className={styles.boxGrid}>
          {faqData.map((item, index) => {
            if (!more && index > 1) {
              return;
            }
            return (
              <div key={item.question} className={styles.box}>
                <h2
                  dangerouslySetInnerHTML={{
                    __html: item.question,
                  }}
                ></h2>
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
        {!more && (
          <div className={styles.buttons}>
            <div className={styles.buttonOutline} onClick={() => setMore(true)}>
              Load more
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
