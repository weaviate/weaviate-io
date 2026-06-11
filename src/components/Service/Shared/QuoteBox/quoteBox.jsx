import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";

export default function QuoteBox() {
  return (
    <section className={styles.quoteSection}>
      <div className="container">
        <div className={styles.quoteCard}>
          <div className={styles.quoteInner}>
            <div className={styles.cardLogo}></div>

            <h3>
              “Weaviate&apos;s Shared offering helps our team build Generative
              AI apps faster by removing the need to create boilerplate code and
              manage infrastructure.”
            </h3>

            <p>Ben Selleslagh, Co-founder at Vectrix</p>

            <Link className={styles.buttonGradient} to="/go/console">
              Start Building with Weaviate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
