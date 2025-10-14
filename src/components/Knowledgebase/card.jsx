import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Card({ details, onClick }) {
  const typeClass = details.type ? details.type.toLowerCase() : '';
  const to = details.page || '#'; // fallback if any entry is missing

  const handleClick = (e) => {
    if (!to || to === '#') {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(details);
    // Optional: GA tracking example
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'knowledge_card_click', {
        title: details.title,
        category: details.category,
        destination: to,
      });
    }
  };

  return (
    <Link className={styles.linkCard} to={to} onClick={handleClick}>
      <div className={`${styles.knowledgeCard} ${styles[typeClass] || ''}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardType}>{details.category}</span>
        </div>
        <div className={styles.innerCard}>
          {details.photo && (
            <img src={'/img/site/' + details.photo} alt={details.title} />
          )}
          <h3>{details.title}</h3>
          <span className={styles.cardText}>{details.text}</span>
        </div>
      </div>
    </Link>
  );
}
