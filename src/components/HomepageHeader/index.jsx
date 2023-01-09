import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function HomepageHeader() {
  return (
    <header>
      <div className="container">
        <p className="hero__logo" />
        <h1 className="hero__title">
          Weaviate <br /> beyond search
        </h1>
        <p className="hero__subtitle">
          Weaviate empowers developers to deliver <br /> scalable search-powered
          apps painlessly
        </p>
        <div className={styles.buttons}>
          <Link className="link" to="/developers/weaviate">
            Documentation {'>'}
          </Link>
          <Link className="link" to="/developers/weaviate/installation">
            Installation {'>'}
          </Link>
          <Link className="link" to="/developers/weaviate">
            Demo {'>'}
          </Link>
        </div>
      </div>
    </header>
  );
}
