import React, { useState } from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Card from './card';
import knowledge from '/data/knowledgecards.json';
import { ButtonContainer } from '../../theme/Buttons';
import Highlights from './highlights';

export default function KnowledgeBase({ searchQuery }) {
  const [selectedCard, setSelectedCard] = useState('All');
  const [showMore, setShowMore] = useState({});
  const [activeCard, setActiveCard] = useState(null);

  const allCards = knowledge.all;

  const handleCardFilter = (card) => {
    setSelectedCard(card);
  };

  const filteredCards = allCards.filter((card) => {
    return (
      (selectedCard === 'All' || card.type === selectedCard) &&
      ((card.title &&
        card.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (card.text &&
          card.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (card.tags &&
          card.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )))
    );
  });

  const handleShowMore = (category) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [category]: !prevShowMore[category],
    }));
  };

  const renderCards = (category) => {
    const categoryCards = filteredCards.filter(
      (card) => card.category === category
    );
    const visibleCards = showMore[category]
      ? categoryCards
      : categoryCards.slice(0, 3);

    if (categoryCards.length === 0) {
      return null;
    }

    const handleNavigation = (category, newIndex) => {
      const cardsInCategory = filteredCards.filter(
        (card) => card.category === category
      );
      if (newIndex >= 0 && newIndex < cardsInCategory.length) {
        setActiveCard({ category, index: newIndex });
      }
    };

    const totalCards = categoryCards.length;
    return (
      <>
        <h3>{category}</h3>
        <div
          className={`${styles.cardContainer} ${category.toLowerCase()}-card`}
        >
          {visibleCards.map((card, index) => (
            <Card
              key={card.title}
              details={card}
              onOpenModal={() =>
                setActiveCard({ category: card.category, index })
              }
              isActive={
                activeCard &&
                activeCard.category === card.category &&
                activeCard.index === index
              }
              currentIndex={index + 1}
              totalCards={categoryCards.length}
              onNext={() => handleNavigation(card.category, index + 1)}
              onPrevious={() => handleNavigation(card.category, index - 1)}
              setActiveCard={setActiveCard}
            />
          ))}
        </div>
        {categoryCards.length > 3 && (
          <div className={styles.buttonsContainer}>
            <button
              className={styles.buttonOutline}
              onClick={() => handleShowMore(category)}
            >
              {showMore[category] ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
        <hr></hr>
      </>
    );
  };

  return (
    <div className={styles.teamBG}>
      <div className="container">
        <div className={styles.searchContainer}></div>
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
                  value="LLM"
                  checked={selectedCard === 'LLM'}
                  onChange={() => handleCardFilter('LLM')}
                />
                <label htmlFor="filterTutorial">Intro to LLMs</label>
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
                <label htmlFor="filterIntroduction">
                  Intro to Vector Databases
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filterSearch"
                  name="cardFilter"
                  value="Search"
                  checked={selectedCard === 'Search'}
                  onChange={() => handleCardFilter('Search')}
                />
                <label htmlFor="filterSearch">Hybrid Search</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filterDatabases"
                  name="cardFilter"
                  value="Databases"
                  checked={selectedCard === 'Databases'}
                  onChange={() => handleCardFilter('Databases')}
                />
                <label htmlFor="filterDatabases">Databases</label>
              </div>
            </div>
          </div>

          <div className={styles.cardResults}>
            {renderCards('Intro to Vector Databases')}
            {renderCards('Hybrid Search')}
            {renderCards('Databases')}
            {renderCards('Intro to LLMs')}
          </div>
        </div>
      </div>
    </div>
  );
}
