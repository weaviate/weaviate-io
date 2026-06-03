import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.scss";

export default function Soc2({ socLight = "dark" }) {
  return (
    <div className={styles[socLight]}>
      <div className={styles.soc2Container}>
        <div className="container">
          <div className={styles.box}>
            <div className={styles.soc2Box}>
              <h2>We’re with you on your security and compliance journey</h2>

              <p>
                Weaviate is built on an extensible framework with flexible
                deployment options that can adapt to the needs of your business
                as they evolve.
              </p>

              <p>
                We're committed to providing the capabilities enterprise
                customers need to meet security, privacy, and compliance
                requirements.
              </p>

              <p>
                Access our trust portal to review compliance documentation,
                certifications, and security whitepapers.
              </p>

              <Link className={styles.trustLink} to="https://trust.weaviate.io">
                Visit Trust Portal →
              </Link>
            </div>

            <div className={styles.soc2Logos}>
              <div className={styles.logoCard}>
                <div className={styles.drataLogo}></div>
              </div>

              <div className={styles.logoCard}>
                <div className={styles.soc2Logo}></div>
              </div>

              <div className={styles.logoCard}>
                <div className={styles.hipaaLogo}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
