import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Person(props) {
  const { details } = props;
  return (
    <div className={`${styles.knowledgeCard} ${details.type}`}>
      <span>{details.type}</span>

      <h3>{details.title}</h3>
      <img src={'/img/site/' + details.photo} />
      <span className={styles.cardText}>{details.text}</span>
      <br></br>
      <Link to={details.link}>Read more</Link>

      <div className={styles.bottomCard}>
        <span>{details.tags}</span>
      </div>
    </div>
  );
}
