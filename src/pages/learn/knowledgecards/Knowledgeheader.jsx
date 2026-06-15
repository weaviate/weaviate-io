import Link from "@docusaurus/Link";
import React from "react";
import styles from "/src/components/Knowledgebase/Header/styles.module.scss";

export default function KnowledgeHeader() {
  return (
    <>
      <div className={styles.headerSecurity}>
        <div className="container">
          <div className={styles.box}>
            <h1>Weaviate Knowledge Cards</h1>

            <div className={styles.headerBox}>
              <p>
                Unlock the power of vector search. Our guides will help you
                conquer vector embeddings and build better AI applications.
              </p>

              <div className={styles.buttons}>
                <Link
                  to="/learn/knowledgecards"
                  className={styles.buttonGradient}
                >
                  Back to Knowledge Cards
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
