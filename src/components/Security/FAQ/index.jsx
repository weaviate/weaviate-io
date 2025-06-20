import React, { useState } from 'react';
import Head from '@docusaurus/Head';
import styles from './styles.module.scss';
import faqHipaa from './faqHipaa.json';

export default function SecurityFAQ(props) {
  const { faqType } = props;
  let faqData = [];

  if (faqType === 'HIPAA') {
    faqData = faqHipaa;
  }

  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // FAQ schema for structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question.replace(/<\/?[^>]+(>|$)/g, ''), // strip HTML
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replace(/<\/?[^>]+(>|$)/g, ''), // plain text version
      },
    })),
  };

  return (
    <div className={styles.faqBG} id="faq">
      {/* Inject schema into <head> */}
      <Head>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Head>

      <div className="container">
        <div className={styles.intro}>
          <h2>Frequently asked questions</h2>
          <p>Let us help answer the most common questions you might have.</p>
        </div>

        <div className={styles.boxGrid}>
          {faqData.map((item, index) => (
            <div key={index} className={styles.box}>
              <div
                className={styles.question}
                onClick={() =>
                  setExpandedQuestion(expandedQuestion === index ? null : index)
                }
              >
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
                  <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                  {item.code && (
                    <p dangerouslySetInnerHTML={{ __html: item.code }}></p>
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
