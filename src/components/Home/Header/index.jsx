import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import { LinkButton } from '/src/theme/LinkButton';

export default function HomepageHeader() {
  return (
    <header>
      <div className="container">
        <p className="hero__logo" />
        <h1 className="hero__title">
          Weaviate
        </h1>
        <p className="hero__subtitle">
          Weaviate is an open-source vector search engine.<br/>It allows you to store data objects and vector embeddings from your favorite ML-models,<br/>and scale seamlessly into billions of data objects.
        </p>
        <div className={styles.buttons}></div>
          <LinkButton link="/developers/weaviate/quickstart" newTab={false}>Get Started Now</LinkButton>
        </div>
    </header>
  );
}
