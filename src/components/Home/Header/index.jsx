import React from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';

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
        <ButtonContainer>
          <LinkButton link="/developers/weaviate/quickstart" newTab={false}>Get Started Now</LinkButton>
        </ButtonContainer>
        </div>
    </header>
  );
}
