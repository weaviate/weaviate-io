import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';
import partners from '/data/partners.json';

function Card({ name, image, link, description, tags }) {
  const hasLink = typeof link === 'string' && link.trim() !== '';
  const to = hasLink
    ? link.startsWith('/')
      ? link
      : `/product/integrations/${link}`
    : null;

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{name}</h3>
        {image && (
          <img src={image} alt={`${name} logo`} className={styles.cardImage} />
        )}

        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardTags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.cardTag}>
              {tag}
            </span>
          ))}
        </div>

        {to ? (
          <Link to={to} className={styles.cardLink}>
            Learn More
          </Link>
        ) : (
          <span className={`${styles.cardLink} ${styles.placeholder}`}>
            Learn More
          </span>
        )}
      </div>
    </div>
  );
}

export default Card;
