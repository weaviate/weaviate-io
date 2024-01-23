import React, { useState } from 'react';
import styles from './styles.module.scss';

export default function PartnersFooter() {
  return (
    <div className={styles.partnerBG}>
      <div className="container">
        <div className={styles.intro}>
          <div className={styles.dialogBox}>
            <div className={styles.dialogBoxImage} />
            <div className={styles.dialogBoxText}>
              <h2>Become a Weaviate partner</h2>
              <p>
                Interested in learning more about the Weaviate Partner Program?
                <br></br> Click below to connect with us.
              </p>
              <div className={styles.buttons}>
                <div className={styles.buttonGradient}>Contact us</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
