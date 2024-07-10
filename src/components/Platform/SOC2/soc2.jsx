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
              Weaviate is an open-source vector database that simplifies the
              development of AI applications. Built-in vector and hybrid search,
              easy-to-connect machine learning models, and a focus on data
              privacy enable developers of all levels to build, iterate, and
              scale AI capabilities faster.
            </h2>
          </div>

          <div className={`${styles.twoRow} ${styles.reverseBox} `}>
            <div className={`${styles.platformImage} ${styles.pImage01}`}></div>
            <div className={styles.platformText}>
              <h2>Bring the power of AI to more developers</h2>
              <p>
                Help developers build and scale AI-powered applications more
                easily with an open source, developer-friendly platform and
                ecosystem.
              </p>
              <Link to="/developers/weaviate">Learn more</Link>
            </div>
          </div>
          <div className={styles.twoRow}>
            <div className={styles.platformText}>
              <h2>Easily connect to popular ML models</h2>
              <p>
                Build and iterate faster with integrations for 20+ ML models and
                frameworks. Quickly adopt and test new models as the ecosystem
                evolves.
              </p>
              <Link to="/developers/weaviate/model-providers">Learn more</Link>
            </div>
            <div className={`${styles.platformImage} ${styles.pImage02}`}></div>
          </div>
          <div className={`${styles.twoRow} ${styles.reverseBox} `}>
            <div className={`${styles.platformImage} ${styles.pImage03}`}></div>
            <div className={styles.platformText}>
              <h2>Get the best of vector and keyword search</h2>
              <p>
                Improve semantic understanding and accuracy to deliver better
                insights. Leverage both vector search and BM25 keyword search
                without any extra overhead.
              </p>
              <Link to="/developers/weaviate/search/hybrid">Learn more</Link>
            </div>
          </div>
          <div className={styles.twoRow}>
            <div className={styles.platformText}>
              <h2>Run securely, flexibly, and reliably—at scale</h2>
              <p>
                Run where you want, how you want. Weaviate is available as a
                self-hosted database, a managed service, or a Kubernetes package
                in your VPC.
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
