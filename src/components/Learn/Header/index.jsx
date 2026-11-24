import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";

export default function Header() {
  return (
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.box}>
            <h1>Weaviate Learning Center</h1>
            <p>
              Learn how leading teams build production AI with Weaviate—from
              strategy to scale.
            </p>
            <div className={styles.buttons}>
              <a
                className={styles.button}
                href="#learning-paths"
                target="_self"
              >
                Explore enterprise learning paths
              </a>
              <a className={`${styles.button} ${styles.secondary}`} href="/contact" target="_self">
                Talk to an expert
              </a>
            </div>

            <Link
              className={styles.quickstart}
              to="https://docs.weaviate.io/weaviate/quickstart"
            >
              Developer quickstart
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
