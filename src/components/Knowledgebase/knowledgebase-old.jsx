import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#card=')) {
      const [, cardIdentifier] = hash.split('=');
      const [type, indexStr] = cardIdentifier.split('-');
      const index = parseInt(indexStr, 10);

      // Assuming you want to open a card based on its type and index
      const card = allCards.find(
        (card, cardIndex) => card.type === type && cardIndex === index
      );

      if (card) {
        setActiveCard({ type: card.type, index });
      }
    }
  }, [allCards]); // Note: [allCards] is the dependency array, ensuring useEffect reruns if allCards changes.

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

    const updateUrlHash = (type, index) => {
      window.location.hash = `card=${type}-${index}`;
    };

    const handleNavigation = (type, newIndex) => {
      const cardsOfType = allCards.filter((card) => card.type === type);
      if (newIndex >= cardsOfType.length) {
        newIndex = 0; // Loop to the start
      } else if (newIndex < 0) {
        newIndex = cardsOfType.length - 1; // Loop to the end
      }

      const newActiveCard = cardsOfType[newIndex];
      setActiveCard({ category: newActiveCard.category, index: newIndex });
      updateUrlHash(newActiveCard.type, newIndex);
    };

    const categoryDescriptions = {
      'Intro to Vector Databases':
        'Description for Intro to Vector Databases...',
      'Hybrid Search': 'Description for Hybrid Search...',
      'Hierarchical Navigable Small World': 'Description for HNSW...',
      'Multimodal RAG': 'Description for Multimodal RAG...',
      // Add other categories as needed
    };

    const totalCards = categoryCards.length;
    return (
      <>
        <h3>{category}</h3>
        <span className={styles.categoryText}>
          {categoryDescriptions[category]}
        </span>
        <div
          className={`${styles.cardContainer} ${category.toLowerCase()}-card`}
        >
          {visibleCards.map((card, index) => (
            <Card
              key={card.title}
              details={card}
              setActiveCard={setActiveCard}
              onOpenModal={() => {
                setActiveCard({ category: card.category, index });
                updateUrlHash(card.type, index);
              }}
              isActive={
                activeCard &&
                activeCard.category === card.category &&
                activeCard.index === index
              }
              currentIndex={index + 1}
              totalCards={categoryCards.length}
              onNext={() => handleNavigation(card.type, index + 1)}
              onPrevious={() => handleNavigation(card.type, index - 1)}
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
                  id="filterHNSW"
                  name="cardFilter"
                  value="HNSW"
                  checked={selectedCard === 'HNSW'}
                  onChange={() => handleCardFilter('HNSW')}
                />
                <label htmlFor="filterHNSW">HNSW</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="filterRAG"
                  name="cardFilter"
                  value="RAG"
                  checked={selectedCard === 'RAG'}
                  onChange={() => handleCardFilter('RAG')}
                />
                <label htmlFor="filterRAG">Multimodal RAG</label>
              </div>
            </div>
          </div>

          <div className={styles.cardResults}>
            {renderCards('Intro to Vector Databases')}
            {renderCards('Hybrid Search')}
            {renderCards('Hierarchical Navigable Small World')}
            {renderCards('Multimodal RAG')}
          </div>
        </div>
      </div>
    </div>
  );
}
