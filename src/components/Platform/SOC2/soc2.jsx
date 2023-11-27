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
            <h2>
              Store and retrieve data objects and vector embeddings. Seamlessly
              connect to your favorite ML models. And build intuitive, reliable
              AI applications that scale. 
            </h2>
          </div>

          <div className={`${styles.twoRow} ${styles.reverseBox} `}>
            <div className={`${styles.platformImage} ${styles.pImage01}`}></div>
            <div className={styles.platformText}>
              <h2>Bring the power of AI to more  developers</h2>
              <p>
                An approachable, open source platform with an active community
                that helps developers of all levels build end-to-end AI
                applications.
              </p>
            </div>
          </div>
          <div className={styles.twoRow}>
            <div className={styles.platformText}>
              <h2>Spend less time on custom code</h2>
              <p>
                Pre-built modules for popular ML models and frameworks enable
                faster development and iteration. Just plug in your data and
                go. 
              </p>
            </div>
            <div className={`${styles.platformImage} ${styles.pImage02}`}></div>
          </div>
          <div className={`${styles.twoRow} ${styles.reverseBox} `}>
            <div className={`${styles.platformImage} ${styles.pImage03}`}></div>
            <div className={styles.platformText}>
              <h2>Combine vector and keyword search </h2>
              <p>
                Get the advantages of both vector and keyword search out of the
                box. Improve semantic understanding and accuracy.
              </p>
            </div>
          </div>
          <div className={styles.twoRow}>
            <div className={styles.platformText}>
              <h2>Run securely and reliably at scale</h2>
              <p>
                Meet the needs of your business. Weaviate is available as an
                open source platform, as a managed service, or as a Kubernetes
                package in your VPC.
              </p>
              <p>
                <Link to="/security">
                  Learn more about Trust and Security with Weaviate
                </Link>
              </p>
            </div>
            <div className={`${styles.platformImage} ${styles.pImage04}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
