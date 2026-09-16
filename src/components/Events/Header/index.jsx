import React from "react";
import styles from "./styles.module.scss";

export default function WorkshopsHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <p className={styles.topText}>Weaviate webinars</p>
          <h1>Build AI applications, live with the experts</h1>

          <div className={styles.headerBox}>
            <p>
              Join practical sessions with Weaviate engineers, partners, and
              community experts. Register for an upcoming webinar or explore our
              on-demand library.
            </p>
          </div>
          <div className={styles.buttons}>
            <a className={styles.buttonGradient} href="#upcoming-webinars">
              View upcoming webinars
            </a>
            <a className={styles.buttonOutline} href="#on-demand-webinars">
              Watch on demand
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
