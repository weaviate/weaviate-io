import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

function Card({ name, image, link, description, tags = [] }) {
  const hasLink = typeof link === 'string' && link.trim() !== '';
  const isExternal = hasLink && /^https?:\/\//i.test(link);

  const hrefOrTo = hasLink
    ? isExternal
      ? link
      : link.startsWith('/')
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

        <div className={styles.cardFooter}>
          {hrefOrTo ? (
            isExternal ? (
              <a
                href={hrefOrTo}
                className={styles.cardLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Learn more about ${name} (opens in a new tab)`}
              >
                Learn More
              </a>
            ) : (
              <Link to={hrefOrTo} className={styles.cardLink}>
                Learn More
              </Link>
            )
          ) : (
            <span className={`${styles.cardLink} ${styles.placeholder}`}>
              Learn More
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
