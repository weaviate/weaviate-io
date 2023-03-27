import React from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';

export default function HomePage() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2>
        Developer Experience &amp; Community
        </h2>
        <p>
        Because we care about how fast you can go from zero to production,<br/>we aim to serve our community by:
        </p>
        <p>
          <i className="fas fa-stars"></i> Publishing open-source<br/>
          <i className="fas fa-stars"></i> Creating valuable SaaS services<br/>
          <i className="fas fa-stars"></i> Integrating with your favorite embedding providers and frameworks
        </p>

        <ButtonContainer>
          <LinkButton link="https://weaviate.io/slack">Join Our Community on Slack</LinkButton>
        </ButtonContainer>
      </div>
      <div className={styles.features}>
        <div className={styles.box}>
          <p className={styles.icon1}></p>
          <h4 className={styles.title}>Vector Search</h4>
          <p className={styles.subTitle}>
            Whether you bring your own vectors or use one of the vectorization modules, you can index billions of data objects to search through.
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.icon2}></p>
          <h4 className={styles.title}>Hybrid Search</h4>
          <p className={styles.subTitle}>
            Combine multiple search techniques, such as keyword-based and vector search, to provide state-of-the-art search experiences.
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.icon3}></p>
          <h4 className={styles.title}>Generative Search</h4>
          <p className={styles.subTitle}>
            Improve your search results by piping them through LLM models like GPT-3 to create next-gen search experiences.
          </p>
        </div>
      </div>
    </div>
  );
}
