import React, { useState } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function awsFoot() {
  return (
    <div className={styles.partnerBG}>
      <div className="container">
        <div className={styles.intro}>
          <h2>Features and Pricing</h2>
          <p>
            Contact gcp-marketplace@weaviate.io to receive details about your
            critical response SLA, the setup of support channels (Slack, email,
            and phone), and to receive optional complimentary training from
            experts at Weaviate.
          </p>
        </div>

        <div className={styles.buttons}>
          <Link to="mailto:gcp-marketplace@weaviate.io">
            <div className={styles.buttonGradient}>Learn More</div>
          </Link>
          <Link to="/pricing">
            <div className={styles.buttonOutline}>Pricing</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
