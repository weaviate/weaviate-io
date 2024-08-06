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
      const titleFromUrl = hash.substring(6); // Get the formatted title from the URL
      const matchedCard = allCards.find(
        (card) => formatTitleForUrl(card.title) === titleFromUrl
      );

      if (matchedCard) {
        setActiveCard(matchedCard);
        setShowMore((prev) => ({ ...prev, [matchedCard.category]: true }));
      } else {
        console.error('No matching card found for title:', titleFromUrl);
        setActiveCard(null);
      }
    }
  }, [allCards]);

  const updateUrlHash = (cardTitle) => {
    const formattedTitle = cardTitle.replace(/[\s/]+/g, '-').toLowerCase();
    window.location.hash = `card=${encodeURIComponent(formattedTitle)}`;
  };

  const handleCardOpen = (card) => {
    setActiveCard(card);
    const cardTitleForUrl = formatTitleForUrl(card.title);
    // window.location.hash = `card=${cardTitleForUrl}`;
    setShowMore((prev) => ({ ...prev, [card.category]: true }));
  };

  // Helper function to create URL-friendly names
  function formatTitleForUrl(title) {
    return title
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }
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

    const handleNavigation = (direction) => {
      if (!activeCard) return;

      // Filter cards to those in the same category as the active card
      const cardsInSameCategory = allCards.filter(
        (card) => card.category === activeCard.category
      );

      // Determine the new index based on navigation direction
      let newIndex = cardsInSameCategory.findIndex(
        (card) => card.id === activeCard.id
      );
      if (direction === 'next') {
        newIndex = (newIndex + 1) % cardsInSameCategory.length;
      } else if (direction === 'previous') {
        newIndex =
          newIndex - 1 < 0 ? cardsInSameCategory.length - 1 : newIndex - 1;
      }

      // Set the new active card based on the newIndex
      const newActiveCard = cardsInSameCategory[newIndex];
      if (newActiveCard) {
        handleCardOpen(newActiveCard);
      }
    };

    const categoryDescriptions = {
      'Intro to Vector Databases':
        'Databases designed to store and search data using vector embeddings, enabling efficient similarity search for unstructured data like text and images.',
      Search:
        'A search method that combines vector search with traditional keyword search to improve retrieval accuracy and relevance.',
      'Hierarchical Navigable Small World':
        'An indexing algorithm used in vector databases to enable fast and efficient similarity search.',
      'Multimodal RAG':
        'A technique that combines retrieval of relevant multimodal data, such as images, text, audio, or video, with generative large language models to generate natural language responses or content to a query.',
      Databases:
        'Systems for storing and storing, organizing, and retrieving structured or unstructured data efficiently.',
      'Large Language Models':
        'Deep learning models trained on massive datasets to understand and generate human-like text, used in applications like chatbots and content generation.',
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
                //updateUrlHash(card.type, index);
                handleCardOpen(card);
              }}
              isActive={activeCard && activeCard.id === card.id}
              currentIndex={index + 1}
              totalCards={categoryCards.length}
              onNext={() => handleNavigation('next')}
              onPrevious={() => handleNavigation('previous')}
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

  if (filteredCards.length === 0 && searchQuery) {
    return (
      <div className={styles.knowledgeBG}>
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
                  <label htmlFor="filterSearch">Search</label>
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
                <div>
                  <input
                    type="radio"
                    id="filterLLMS"
                    name="cardFilter"
                    value="LLMS"
                    checked={selectedCard === 'LLMS'}
                    onChange={() => handleCardFilter('LLMS')}
                  />
                  <label htmlFor="filterLLMS">LLMS</label>
                </div>
              </div>
            </div>
            <div className={styles.filterLine}></div>
            <main className={styles.noResults}>
              <h3>No results found.</h3>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.knowledgeBG}>
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
                <label htmlFor="filterSearch">Search</label>
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
              <div>
                <input
                  type="radio"
                  id="filterLLMS"
                  name="cardFilter"
                  value="LLMS"
                  checked={selectedCard === 'LLMS'}
                  onChange={() => handleCardFilter('LLMS')}
                />
                <label htmlFor="filterLLMS">LLMS</label>
              </div>
            </div>
          </div>
          <div className={styles.filterLine}></div>
          <main className={styles.cardResults}>
            {renderCards('Intro to Vector Databases')}
            {renderCards('Search')}
            {renderCards('Hierarchical Navigable Small World')}
            {renderCards('Multimodal RAG')}
            {renderCards('Databases')}
            {renderCards('Large Language Models')}
          </main>
        </div>
      </div>
    </div>
  );
}
