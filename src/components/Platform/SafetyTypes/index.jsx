import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function SafetyTypes() {
  return (
    <div className="container">
      <div className={styles.title}>
        <h2>Feature Overview</h2>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon01}`}></div>
            <h3 className={styles.cardTextColor}>Built-in hybrid search</h3>
            <p className={styles.textCardContent}>
              Merge different search algorithms and re-rank results accordingly.
            </p>
            <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/search/hybrid"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon02}`}></div>
            <h3 className={styles.cardTextColor}>Advanced filtering</h3>
            <p className={styles.textCardContent}>
              Apply complex filters across large datasets in milliseconds. 
            </p>
            <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/prefiltering"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon03}`}></div>
            <h3 className={styles.cardTextColor}>Out-of-the box RAG</h3>
            <p className={styles.textCardContent}>
              Use proprietary data to securely interact with ML models.
            </p>
            <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/starter-guides/generative"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon04}`}></div>
            <h3 className={styles.cardTextColor}>Vectorizer modules</h3>
            <p className={styles.textCardContent}>
              Easily generate new vector embeddings or bring your own.
            </p>
            <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/modules/retriever-vectorizer-modules"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon05}`}></div>
            <h3 className={styles.cardTextColor}>Configurable backups</h3>
            <p className={styles.textCardContent}>
              Back up as often as needed with zero downtime.
            </p>
            <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/configuration/backups"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon06}`}></div>
            <h3 className={styles.cardTextColor}>Native multi-tenancy</h3>
            <p className={styles.textCardContent}>
              Scale horizontally and consume resources efficiently.
            </p>
            <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/cluster"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon07}`}></div>
            <h3 className={styles.cardTextColor}>Vector index compression</h3>
            <p className={styles.textCardContent}>
              Improve the memory footprint of large datasets.
            </p>
            <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/configuration/compression/pq-compression"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon8}`}></div>
            <h3 className={styles.cardTextColor}>
              Tenant<br></br>isolation
            </h3>
            <p className={styles.textCardContent}>
              Ensure security with strict resource isolation.
            </p>
            <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/data#multi-tenancy"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
