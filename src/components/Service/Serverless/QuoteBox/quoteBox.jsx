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
              “Weaviate's Serverless offering helps our team build Generative AI
              apps faster by removing the need to create boilerplate code and
              manage infrastructure.”
            </h3>
            <p>Ben Selleslagh, Co-founder at Vectrix</p>
          </div>
        </div>
      </div>
    </div>
  );
}
