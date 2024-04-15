import React, { useState } from 'react';
import styles from './styles.module.scss';

export default function awsFoot() {
  return (
    <div className={styles.partnerBG}>
      <div className="container">
        <div className={styles.intro}>
          <h2>Features and Pricing</h2>
          <p>
            Contact aws-marketplace@weaviate.io to receive details about your
            critical response SLA, the setup of support<br></br> channels
            (Slack, email, and phone), and to receive optional complimentary
            training from experts at Weaviate.
          </p>
        </div>

        <div className={styles.buttons}>
          <div className={styles.buttonGradient}>Learn More</div>
          <div className={styles.buttonOutline}>Pricing</div>
        </div>
      </div>
    </div>
  );
}
