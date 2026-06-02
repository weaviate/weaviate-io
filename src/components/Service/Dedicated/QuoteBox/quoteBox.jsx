import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";

export default function quoteBox() {
  return (
    <section className={styles.quoteSection}>
      <div className="container">
        <div className={styles.quoteCard}>
          <div className={styles.quoteInner}>
            <h3>
              “Weaviate’s Dedicated Cloud offering lets our team leverage
              innovative and open source technology with less management
              overhead, and in a way that satisfies our business needs.”
            </h3>

            <p>Director of Engineering in Legal Tech </p>

            <a className={styles.buttonGradient} href="#contact-sales">
              Talk to Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
