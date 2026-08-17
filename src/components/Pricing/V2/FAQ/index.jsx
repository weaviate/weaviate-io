import React, { useState } from "react";
import Head from "@docusaurus/Head";
import styles from "./styles.module.scss";
import faqDatabase from "./faqDatabase.json";
import faqEngram from "./faqEngram.json";

const faqMap = {
  Database: faqDatabase,
  Engram: faqEngram,
};

// The JSON-LD below must describe exactly the Q&A rendered on this page, so it
// is built from the same array the component renders. Keep it that way: never
// hand-maintain a second copy of these questions.
function faqPageSchema(faqData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: stripTags(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripTags(item.answer),
      },
    })),
  };
}

function stripTags(value) {
  return (value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function PricingFAQ({ faqType = "Database" }) {
  const faqData = faqMap[faqType] || faqDatabase;
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <section className={styles.faqBG} id="faq">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(faqPageSchema(faqData))}
        </script>
      </Head>
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
