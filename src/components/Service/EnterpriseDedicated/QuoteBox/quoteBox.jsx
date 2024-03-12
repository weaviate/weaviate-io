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
            <h3 className={styles.cTextColor}>
              “Weaviate’s Enterprise Dedicated offering lets our team leverage
              innovative and open source technology with less management
              overhead, and in a way that satisfies our business needs.”
            </h3>
            <p>Director of Engineering in Legal Tech </p>
          </div>
        </div>
      </div>
    </div>
  );
}
