import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Card(props) {
  const { details } = props;
  const typeClass = details.type.toLowerCase();

  return (
    <div className={`${styles.knowledgeCard} ${styles[typeClass]}`}>
      <span className={styles.cardType}>{details.type}</span>

      <h3>{details.title}</h3>
      {details.photo && (
        <img src={'/img/site/' + details.photo} alt={details.title} />
      )}
      <span className={styles.cardText}>{details.text}</span>
      <br></br>

      {details.link && (
        <Link className={styles.cardLink} to={details.link}>
          Read more
        </Link>
      )}
      <div className={styles.bottomCard}>
        {details.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
