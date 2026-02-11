import React, { useState } from 'react';
import styles from './styles.module.scss';
import faq from './faq.json';

export default function AgentSkillsFAQ() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <section className={styles.faqBG} id="faq">
      <div className="container">
        <div className={styles.intro}>
          <h2>Frequently asked questions</h2>
          <p>
            Quick answers to help you get started building with Agent Skills.
          </p>
        </div>

        <div className={styles.boxGrid}>
          {faq.map((item, index) => (
            <div key={index} className={styles.box}>
              <div className={styles.question} onClick={() => toggleFAQ(index)}>
                <span dangerouslySetInnerHTML={{ __html: item.question }} />
                <span
                  className={`${styles.arrow} ${
                    expandedQuestion === index ? styles.expanded : ''
                  }`}
                >
                  ▼
                </span>
              </div>

              <hr className={styles.hr} />

              <div
                className={`${styles.answerOuter} ${
                  expandedQuestion === index ? styles.open : ''
                }`}
              >
                <div className={styles.answerInner}>
                  <p
                    className={styles.answers}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                  {item.links?.length ? (
                    <div className={styles.links}>
                      {item.links.map((l, i) => (
                        <a key={i} href={l.href}>
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
