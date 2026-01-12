import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";

export default function BuildWith() {
  return (
    <div className="container">
      <div className={styles.Container}>
        <div className={styles.headerContainer}>
          <h2>Build with Weaviate</h2>
          <p>Look at how developers are building with Weaviate.</p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.largeBox}>
            <div className={styles.boxTop}>
              <div className={styles.boxLogo}></div>
              <Link to="blog/unbody-weaviate" className={styles.boxButton}>
                {"See the showcase >"}
              </Link>
            </div>
            <h3>
              Using Weaviate to Build the Foundation for AI-First App
              Development
            </h3>
            <div className={styles.boxImage}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
