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
            <div
              key={index}
              className={styles.box}
              data-open={expandedQuestion === index ? 'true' : 'false'}
            >
              <div
                className={styles.question}
                onClick={() => toggleFAQ(index)}
                role="button"
                aria-expanded={expandedQuestion === index}
                aria-controls={`faq-panel-${index}`}
              >
                <span dangerouslySetInnerHTML={{ __html: item.question }} />
                <span
                  className={`${styles.arrow} ${
                    expandedQuestion === index ? styles.expanded : ''
                  }`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </div>

              <hr className={styles.priceHr} />

              <div className={styles.answerOuter} id={`faq-panel-${index}`}>
                <div className={styles.answerInner}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: (item.answer || '').replace(/\n/g, '<br />'),
                    }}
                  />
                  {item.code && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: (item.code || '').replace(/\n/g, '<br />'),
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
