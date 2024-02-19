import React, { useState } from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Card from './card';
import knowledge from '/data/knowledgecards.json';
import { ButtonContainer } from '../../theme/Buttons';

export default function Highlights() {
  const [selectedCard, setSelectedCard] = useState('All');

  const highlights = knowledge.highlights;

  const handleCardFilter = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className={styles.highlights}>
      <h3>Highlights</h3>
      <div className={styles.knowledgeHighlights}>
        <div className={styles.cardResults}>
          <div
            className={`${
              styles.cardContainer
            } ${selectedCard.toLowerCase()}-card`}
          >
            {highlights.map((card) => {
              return <Card key={card.name} details={card} />;
            })}
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
