import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";

const Support = () => {
  return (
    <section className={styles.supportSection}>
      <div className="container">
        <div className={styles.supportCard}>
          <div>
            <h2>Need technical support?</h2>

            <p>
              Find the right support channel for your needs. Whether you're
              looking for documentation, troubleshooting resources, community
              guidance, or direct assistance from the Weaviate support team, our
              Support Center will point you to the best place to start.
            </p>
          </div>

          <Link
            className={styles.supportButton}
            to="https://docs.weaviate.io/support"
          >
            Visit Support Center →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Support;
