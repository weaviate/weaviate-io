import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

const socLight = 'dark';

export default function Soc2(props) {
  const { socLight } = props;
  return (
    <div className={styles[socLight]}>
      <div className={styles.soc2Container}>
        <div className="container">
          <div className={styles.box}>
            <div className={styles.soc2Box}>
              <h2>Weaviate Cloud Services (WCS)</h2>

              <p>
                Whether you work at a fast-paced startup or at an enterprise
                with specific deployment needs, we're here to help. Weaviate
                Cloud Services (WCS) is a fully-managed service that can deploy
                Weaviate in a dedicated tenant, an isolated tenant, or even in
                your own cloud environment.
              </p>
            </div>

            <div className={styles.wcsDiagram}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
