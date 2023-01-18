import React from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/LinkButton';

export default function HomePage() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2>
        We're all about developer experience
        </h2>
        <p>
          Because we care how fast you can go from zero to production,<br/>we've open-sourced our database, made different SaaS services available,<br/>and integrated with your favorite embedding providers through our modular ecosystem.
        </p>
        <div className={styles.buttons}>
          <LinkButton link="/developers/weaviate/concepts" newTab={false}>Learn all about how Weaviate works</LinkButton>
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.box}>
          <p className={styles.icon1}></p>
          <h4 className={styles.title}>Vector Search</h4>
          <p className={styles.subTitle}>
            Regardless if you bring your own vectors or use one of the vectorization modules, you can index billions of data objects to search through.
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.icon2}></p>
          <h4 className={styles.title}>Hybrid Search</h4>
          <p className={styles.subTitle}>
            Combine modern vector search filters with traditional search filters for the best search results.
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.icon3}></p>
          <h4 className={styles.title}>Generative Search</h4>
          <p className={styles.subTitle}>
            Improve your search results by piping them through LLM models like GPT-3.
          </p>
        </div>
      </div>
    </div>
  );
}
