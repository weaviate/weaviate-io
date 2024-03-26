import React, { useState } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import ModalComponent from './modalpopup';

export default function Card(props) {
  const { details, setActiveCard } = props;

  const typeClass = details.type.toLowerCase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveCard(null);
  };
  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    headline: details.title,
    description: details.text,
    // Further details as per your `details` object
  };
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `<script type="application/ld+json">${JSON.stringify(
            structuredData
          )}</script>`,
        }}
      />
      <Link className={styles.linkCard} onClick={props.onOpenModal}>
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

            {/*  <Link onClick={props.onOpenModal} className={styles.cardLink}>
          Read more...
        </Link>
         <div className={styles.bottomCard}>
          {details.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div> */}
          </div>
        </div>
      </Link>
      {props.isActive && (
        <ModalComponent
          details={details}
          onClose={closeModal}
          currentIndex={props.currentIndex}
          totalCards={props.totalCards}
          onNext={props.onNext}
          onPrevious={props.onPrevious}
        />
      )}
    </>
  );
}
