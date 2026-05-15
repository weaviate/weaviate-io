import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";
import { LinkButton, ButtonContainer } from "/src/theme/Buttons";

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Overview of Weaviate Services</h1>
          <div className={styles.headerBox}>
            <p>
              Our Services are designed to support organizations of all sizes
              from prototype to production. Whether you’re a fast-moving startup
              or a well-established enterprise, we have flexible options to meet
              your needs.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="/go/console">
              Try Free
            </Link>
            <a href="#contact-sales" className={styles.buttonOutline}>
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
