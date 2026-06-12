import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";

export default function ContactHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Contact</h1>

          <div className={styles.headerBox}>
            <p className="text-center">
              We are here to help you with any questions you might have.
              <br></br>Please contact us via the form below or join our
              communities.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
