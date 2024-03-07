import React, { useState } from 'react';
import styles from './styles.module.scss';
import faq from './faq.json';
import faqByoc from './faqByoc.json';

export default function PricingFAQ(props) {
  const { faqType } = props;
  let faqData = [];

  if (faqType === 'Serverless') {
    faqData = faq;
  } else if (faqType === 'BYOC') {
    faqData = faqByoc;
  }

  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <div className={styles.faqBG} id="faq">
      <div className="container">
        <div className={styles.intro}>
          <h2>Frequently asked questions</h2>
          <p>Let us help answer the most common questions you might have.</p>
        </div>

        <div className={styles.boxGrid}>
          {faqData.map((item, index) => (
            <div key={index} className={styles.box}>
              <div className={styles.question} onClick={() => toggleFAQ(index)}>
                <span
                  dangerouslySetInnerHTML={{ __html: item.question }}
                ></span>

                <span
                  className={`${styles.arrow} ${
                    expandedQuestion === index ? styles.expanded : ''
                  }`}
                >
                  ▼
                </span>
              </div>
              <hr className={styles.priceHr} />
              {expandedQuestion === index && (
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.answer,
                    }}
                  ></p>
                  {item.code && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.code,
                      }}
                    ></p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
