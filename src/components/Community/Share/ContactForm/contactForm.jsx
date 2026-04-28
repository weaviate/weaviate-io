import React from "react";
import styles from "./styles.module.scss";

export default function ContactForm() {
  return (
    <div className={styles.contactBackground}>
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfMe-hDVsY9x-uYK8_CqWMPYQgFC6yu9eYNDVSr6SCflHiJ2A/viewform?embedded=true"
              width="700"
              height="2200"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
