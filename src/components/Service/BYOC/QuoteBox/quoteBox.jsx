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
              "Vector databases play a crucial role in developing modern search
              and LLM-based applications. We're proud to partner with Weaviate
              to offer Snowflake customers these cutting-edge capabilities with
              a safety net."
            </h3>
            <p>
              Muzz Imam, Senior Product Manager<br></br> at Snowflake for
              Snowpark Container Services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
