import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

export default function Integrations() {
  return (
    <section className={styles.integrationsSection}>
      <div className="container">
        <div className={styles.teamContainer}>
          <div className={styles.parentGrid}>
            <div className={styles.imageGrid1}></div>
            <div className={styles.imageGrid2}></div>
            <div className={styles.imageGrid3}></div>
          </div>

          <div className={styles.right}>
            <span className={styles.eyebrow}>Developer resources</span>

            <h3>Start building today</h3>

            <p>
              Our developer-approved resources will help you get started quickly
              with Weaviate Shared Cloud. And our team and community are here
              for support as you need us.
            </p>

            <div className={styles.iconsContainer}>
              <div className={`${styles.iconText} ${styles.community}`}>
                <Link to="https://forum.weaviate.io/">Join the Community</Link>
              </div>

              <div className={`${styles.iconText} ${styles.docs}`}>
                <Link to="https://docs.weaviate.io/weaviate">
                  Read the Docs
                </Link>
              </div>

              <div className={`${styles.iconText} ${styles.console}`}>
                <Link to="/go/console">Explore WCD Console</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
