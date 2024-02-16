import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Card from './card';
import people from '/data/people.json';
import knowledge from '/data/knowledgecards.json';
import { ButtonContainer } from '../../theme/Buttons';

export default function KnowledgeBase() {
  const [selectedCard, setSelectedCard] = useState('All');

  const handleCardFilter = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className={styles.teamBG}>
      <div className="container">
        <div className={styles.knowledgebase}>
          <div className={styles.filterBox}>
            <div className={styles.cardFilter}>
              <h3>Categories</h3>
              <div>
                <input
                  type="radio"
                  id="filterAll"
                  name="cardFilter"
                  value="All"
                  checked={selectedCard === 'All'}
                  onChange={() => handleCardFilter('All')}
                />
                <label htmlFor="filterAll">All</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filterTutorial"
                  name="cardFilter"
                  value="Tutorial"
                  checked={selectedCard === 'Tutorial'}
                  onChange={() => handleCardFilter('Tutorial')}
                />
                <label htmlFor="filterTutorial">Tutorial</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filterIntroduction"
                  name="cardFilter"
                  value="Introduction"
                  checked={selectedCard === 'Introduction'}
                  onChange={() => handleCardFilter('Introduction')}
                />
                <label htmlFor="filterIntroduction">Introduction</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filterImage"
                  name="cardFilter"
                  value="Image"
                  checked={selectedCard === 'Image'}
                  onChange={() => handleCardFilter('Image')}
                />
                <label htmlFor="filterImage">Images</label>
              </div>
            </div>
          </div>

          <div className={styles.cardResults}>
            <div
              className={`${
                styles.cardContainer
              } ${selectedCard.toLowerCase()}-card`}
            >
              {knowledge.map((card) => {
                if (selectedCard === 'All' || card.type === selectedCard) {
                  return <Card key={card.name} details={card} />;
                }
                return null;
              })}
            </div>
            <div className={styles.buttonsContainer}>
              <Link className={styles.buttonOutline} to="/developers/weaviate">
                More information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
