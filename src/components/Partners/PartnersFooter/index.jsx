import React, { useState } from 'react';
import styles from './styles.module.scss';

export default function PartnersFooter() {
  return (
    <div className={styles.partnerBG}>
      <div className="container">
        <div className={styles.intro}>
          <h2>Become a Weaviate partner</h2>
          <p>
            At Weaviate, we believe that great things happen when great minds
            come together. Join our Partner<br></br> Program and let's embark on
            an exciting journey of innovation, growth, and success.
          </p>
        </div>

        <div className={styles.buttons}>
          <div className={styles.buttonGradient}>Become a Partner</div>
        </div>
      </div>
    </div>
  );
}
