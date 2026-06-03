import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";

export default function AboutUsHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>
            Trust, security, and privacy
            <br />
            come first
          </h1>

          <div className={styles.headerBox}>
            <p>
              Weaviate Cloud was built to help developers scale AI applications
              with ease and confidence.
            </p>
          </div>

          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="/go/console">
              Start Free
            </Link>
            <a className={styles.buttonOutline} href="/pricing#contact-sales">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
