import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";

export default function Opensource() {
  return (
    <div className={styles.bg}>
      <div className="container">
        <div className={styles.teamContainer}>
          <div className={styles.title}>
            <h2>
              Spread the<br></br> Weaviate love 💚
            </h2>
            <p>
              Please leave your information here and submit your project. We’ll
              take a closer look and reach out to you to collaborate on
              promoting your project.
            </p>

            <div className={styles.buttons}>
              <a className={styles.buttonLine} href="#steps">
                Questions?
              </a>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.parentGrid}>
              <div className={styles.imageGrid1}> </div>
              <div className={styles.imageGrid2}> </div>
              <div className={styles.imageGrid3}> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
