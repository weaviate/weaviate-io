import React, { useState } from "react";
import styles from "./styles.module.scss";
import faqDatabase from "./faqDatabase.json";
import faqEngram from "./faqEngram.json";

const faqMap = {
  Database: faqDatabase,
  Engram: faqEngram,
};

export default function PricingFAQ({ faqType = "Database" }) {
  const faqData = faqMap[faqType] || faqDatabase;
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <section className={styles.faqBG} id="faq">
      <div className="container">
        <div className={styles.intro}>
          <h2>
            {faqType === "Engram"
              ? "Engram pricing FAQ"
              : "Database pricing FAQ"}
          </h2>
        </div>

        <div className={styles.boxGrid}>
          {faqData.map((item, index) => {
            const isOpen = expandedQuestion === index;

            return (
              <div
                key={item.question}
                className={styles.box}
                data-open={isOpen ? "true" : "false"}
              >
                <button
                  className={styles.question}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  type="button"
                >
                  <span dangerouslySetInnerHTML={{ __html: item.question }} />
                  <span className={styles.arrow} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div className={styles.answerOuter} id={`faq-panel-${index}`}>
                  <div className={styles.answerInner}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: (item.answer || "").replace(/\n/g, "<br />"),
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
