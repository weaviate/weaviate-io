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

  // Generate FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question.replace(/<\/?[^>]+(>|$)/g, ''),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replace(/<\/?[^>]+(>|$)/g, ''),
      },
    })),
  };

  // Extract glossary/resources manually from appendix
  const appendixLinks = [
    {
      name: 'HHS.gov overview',
      url: 'https://hhs.gov',
    },
    {
      name: 'Weaviate Security & Compliance',
      url: 'https://weaviate.io/security',
    },
    {
      name: 'Weaviate Trust Portal',
      url: 'https://weaviate.io/trust',
    },
    { name: 'HIPAA = Health Insurance Portability and Accountability Act' },
    { name: 'PHI = Protected Health Information' },
    { name: 'BAA = Business Associate Agreement' },
    { name: 'SOC II = Service Organization Control 2' },
    { name: 'GDPR = General Data Protection Regulation' },
    { name: 'ISO 27001:2022 = InfoSec Management Standard' },
    { name: 'AES-256 = Advanced Encryption Standard' },
  ];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Glossary and Resources',
    itemListElement: appendixLinks.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { url: item.url } : {}),
    })),
  };

  return (
    <div className={styles.faqBG} id="faq">
      {/* Inject structured data */}
      <Head>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
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
