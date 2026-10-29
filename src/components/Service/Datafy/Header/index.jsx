import React from "react";
import styles from "./styles.module.scss";

export default function StudyHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.logo} role="img" aria-label="Datafy logo" />
          <span>Case Study</span>
          <h1>How Weaviate cut wasted EBS spend by 50% with Datafy</h1>
        </div>
      </div>
    </header>
  );
}
