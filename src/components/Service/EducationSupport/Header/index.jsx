import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";
import { LinkButton, ButtonContainer } from "/src/theme/Buttons";

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>AI Database Training & Enablement</h1>
          <div className={styles.headerBox}>
            <p>
              Get AI database tutorials, training, courses, resources, and
              support for builders of all levels. We’re with you on your AI
              journey.
            </p>
          </div>
          <div className={styles.buttons}>
            <a className={styles.buttonGradient} href="#contact-sales">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
