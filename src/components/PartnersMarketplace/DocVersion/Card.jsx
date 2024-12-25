import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

function Card({ name, image, link, description, tags }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={`${name} logo`} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardTags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.cardTag}>
              {tag}
            </span>
          ))}
        </div>
        <Link to={link} className={styles.cardLink}>
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default Card;
