import React, { useState } from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Card from './card';
import knowledge from '/data/knowledgecards.json';
import { ButtonContainer } from '../../theme/Buttons';
import Highlights from './highlights';

export default function KnowledgeBase() {
  const [selectedCard, setSelectedCard] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allCards = knowledge.all;

  const handleCardFilter = (card) => {
    setSelectedCard(card);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCards = allCards.filter((card) => {
    // Check if 'selectedCard' matches and if 'searchQuery' is in 'title', 'text', or any 'tag'
    return (
      (selectedCard === 'All' || card.type === selectedCard) &&
      ((card.title &&
        card.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (card.text &&
          card.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (card.tags &&
          card.tags.some(
            (tag) =>
              tag && tag.toLowerCase().includes(searchQuery.toLowerCase())
          )))
    );
  });

  return (
    <div className={styles.teamBG}>
      <div className="container">
        <Highlights />
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

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
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <Card key={card.name} details={card} />
                ))
              ) : (
                <p>No results found.</p>
              )}
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
