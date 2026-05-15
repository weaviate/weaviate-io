import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";
import { LinkButton, ButtonContainer } from "/src/theme/Buttons";

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <p className={styles.headText}>Dedicated Cloud</p>

          <div className={styles.headerBox}>
            <h1>Professionally-managed AI Database on dedicated cloud.</h1>

            <p>
              Tailored for businesses seeking high performance, Weaviate’s
              Dedicated Cloud provides a fully managed AI database that ensures
              consistent, high-speed results without the complexities of
              infrastructure and software management.
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
