import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Quote() {
  return (
    <div className={styles.quoteContainer}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.quoteLogos}>
            <div className={styles.quoteDiagram}></div>
          </div>
          <div className={styles.quoteBox}>
            <p>
              "We believe that the benefits of remote work clearly outweigh any
              disadvantages. Let's face it: the old 9-5 workday didn't work for
              everyone. Some employees are morning people; others are night
              owls. Some people love to travel; they're energized by new sights
              and sounds and pump that energy into their work."
            </p>
            <p className={styles.signature}>Jessie de Groot</p>
            <p>Head of People & Culture</p>
          </div>
        </div>
      </div>
    </div>
  );
}
