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
              “Weaviate facilitates fast development of generative AI
              applications by our team, removing the need for creating
              boilerplate code, setting up databases, and managing
              infrastructure.”
            </h3>
            <p>Ben Selleslagh, Vectrix</p>
          </div>
        </div>
      </div>
    </div>
  );
}
