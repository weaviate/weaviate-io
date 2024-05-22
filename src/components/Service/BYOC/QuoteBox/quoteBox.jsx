import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

const socLight = 'dark';

export default function quoteBox(props) {
  const { socLight } = props;
  return (
    <div className={styles[socLight]}>
      <div className={styles.soc2Container}>
        <div className={`${styles.card} ${styles.longCard}`}>
          <div className={styles.contentDiv}>
            <div className={styles.cardLogo}></div>
            <h3 className={styles.cTextColor}>
              "Keeping our workflows within our own environment was a
              requirement for us. We chose Weaviate’s BYOC offering because it
              gave us the control we needed while still abstracting the burden
              of self-managing"
            </h3>
            <p>Lior Harel, CTO & Co-Founder, Staircase.ai</p>
          </div>
        </div>
      </div>
    </div>
  );
}
