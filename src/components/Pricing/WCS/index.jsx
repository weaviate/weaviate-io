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
                with specific deployment needs, we’re here to help. Weaviate
                Cloud Services (WCS) is fully-managed and can be deployed as a
                serverless Software-as-a-Service, in a dedicated tenant, or in
                your virtual private cloud (VPC).
              </p>
              <div className={styles.buttons}>
                <Link className={styles.buttonOutline} to="/developers/wcs">
                  Contact Sales
                </Link>
              </div>
            </div>

            <div className={styles.wcsDiagram}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
