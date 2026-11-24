import React from 'react';
import Link from '@docusaurus/Link';
import { ButtonContainer, LinkButton } from '/src/theme/Buttons';
import styles from './styles.module.scss';
import ctaStyles from '../Examples/styles.module.scss';

const resources = [
  ['Forum', 'https://forum.weaviate.io/', 'Ask questions and learn from the community.'],
  ['Paper reviews', '/papers', 'Understand research in AI and data science.'],
  ['Podcast', '/podcast', 'Hear expert perspectives on AI and data.'],
  ['Blog', '/blog', 'Keep up with insights and updates from Weaviate.'],
  ['Knowledge Cards', '/learn/knowledgecards', 'Understand vector search and embeddings at a glance.'],
];

export default function GoFurther() {
  return (
    <section className={styles.bgCol} id="go-further">
      <div className="container">
        <div className={styles.header}>
          <h2>Go further</h2>
          <p>Build your understanding and learn with the Weaviate community.</p>
        </div>
        <div className={styles.typeContainer}>
          {resources.map(([title, to, description]) => (
            <Link to={to} key={to}>
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}><h3>{title}</h3></div>
                <div className={styles.typeText}><p>{description}</p></div>
              </div>
            </Link>
          ))}
        </div>
        <div className={ctaStyles.ctaContainer}>
          <h2>Planning a production AI rollout? Talk to our team.</h2>
          <ButtonContainer position="left">
            <LinkButton link="/contact" newTab={false} style={{ color: '#111111' }}>Talk to an expert</LinkButton>
            <LinkButton link="/enterprise" color="outlined" newTab={false}>Weaviate for enterprise</LinkButton>
          </ButtonContainer>
        </div>
      </div>
    </section>
  );
}
