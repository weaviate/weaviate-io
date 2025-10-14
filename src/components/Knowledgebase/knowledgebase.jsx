// /src/components/Knowledgebase/knowledgebase.jsx
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Card from './card';
import knowledge from '/data/knowledgecards.json';

export default function KnowledgeBase({ searchQuery }) {
  const [selectedCard, setSelectedCard] = useState('All');
  const [showMore, setShowMore] = useState({});

  const allCards = knowledge.all || [];

  const handleCardFilter = (card) => setSelectedCard(card);
  const handleShowMore = (category) =>
    setShowMore((prev) => ({ ...prev, [category]: !prev[category] }));

  useEffect(() => {
    const { hash } = window.location;
    if (hash && hash.startsWith('#card=')) {
      const raw = decodeURIComponent(hash.slice(6)).toLowerCase();
      const match =
        allCards.find((c) =>
          (c.page || '').toLowerCase().endsWith('/' + raw)
        ) ||
        allCards.find(
          (c) =>
            (c.title || '')
              .toLowerCase()
              .replace(/[^\w\s]/g, '')
              .replace(/\s+/g, '-') === raw
        );
      if (match?.page) window.location.replace(match.page);
    }
  }, [allCards]);

  const q = (searchQuery || '').toLowerCase();
  const filteredCards = allCards.filter((card) => {
    const matchesType = selectedCard === 'All' || card.type === selectedCard;
    const matchesQuery =
      (card.title && card.title.toLowerCase().includes(q)) ||
      (card.text && card.text.toLowerCase().includes(q)) ||
      (card.tags && card.tags.some((t) => t.toLowerCase().includes(q)));
    return matchesType && matchesQuery;
  });

  const categoryDescriptions = {
    'Intro to Vector Databases':
      'Databases designed to store and search data using vector embeddings, enabling efficient similarity search for unstructured data like text and images.',
    Search:
      'A search method that combines vector search with traditional keyword search to improve retrieval accuracy and relevance.',
    'Hierarchical Navigable Small World':
      'An indexing algorithm used in vector databases to enable fast and efficient similarity search.',
    'Multimodal RAG':
      'Retrieval of multimodal data (text, image, audio, video) combined with LLMs to generate responses.',
    Databases:
      'Systems for storing, organizing, and retrieving structured or unstructured data efficiently.',
    'Large Language Models':
      'Deep learning models trained on massive datasets to understand and generate human-like text.',
    'Information Retrieval/Search':
      'Techniques for finding relevant information in large collections of content.',
    'Embedding Types':
      'Different kinds of embeddings used across modalities and tasks.',
    'Chunking Techniques':
      'Approaches to splitting large content into smaller, more manageable pieces.',
    'Advanced RAG Techniques':
      'Optimizations such as fine-tuning, task-specific training and custom datasets.',
  };

  const categoriesInOrder = [
    'Intro to Vector Databases',
    'Search',
    'Hierarchical Navigable Small World',
    'Multimodal RAG',
    'Databases',
    'Large Language Models',
    'Information Retrieval/Search',
    'Embedding Types',
    'Chunking Techniques',
    'Advanced RAG Techniques',
  ];

  const renderCards = (category) => {
    const categoryCards = filteredCards.filter((c) => c.category === category);
    if (!categoryCards.length) return null;

    const visible = showMore[category]
      ? categoryCards
      : categoryCards.slice(0, 3);

    return (
      <>
        <h3>{category}</h3>
        <span className={styles.categoryText}>
          {categoryDescriptions[category]}
        </span>
        <div
          className={`${styles.cardContainer} ${category.toLowerCase()}-card`}
        >
          {visible.map((card) => (
            <Card key={card.id || card.title} details={card} />
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
        <hr />
      </>
    );
  };

  // Side filter list (kept as-is)
  const SideFilters = () => (
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
          <label htmlFor="filterIntroduction">Intro to Vector Databases</label>
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

        <div>
          <input
            type="radio"
            id="filterIRS"
            name="cardFilter"
            value="IRS"
            checked={selectedCard === 'IRS'}
            onChange={() => handleCardFilter('IRS')}
          />
          <label htmlFor="filterIRS">Information Retrieval/Search</label>
        </div>

        <div>
          <input
            type="radio"
            id="filterET"
            name="cardFilter"
            value="ET"
            checked={selectedCard === 'ET'}
            onChange={() => handleCardFilter('ET')}
          />
          <label htmlFor="filterET">Embedding Types</label>
        </div>

        <div>
          <input
            type="radio"
            id="filterCT"
            name="cardFilter"
            value="CT"
            checked={selectedCard === 'CT'}
            onChange={() => handleCardFilter('CT')}
          />
          <label htmlFor="filterCT">Chunking Techniques</label>
        </div>

        <div>
          <input
            type="radio"
            id="filterART"
            name="cardFilter"
            value="ART"
            checked={selectedCard === 'ART'}
            onChange={() => handleCardFilter('ART')}
          />
          <label htmlFor="filterART">Advanced RAG Techniques</label>
        </div>
      </div>
    </div>
  );

  if (filteredCards.length === 0 && searchQuery) {
    return (
      <div className={styles.knowledgeBG}>
        <div className="container">
          <div className={styles.knowledgebase}>
            <SideFilters />
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
          <SideFilters />
          <div className={styles.filterLine}></div>
          <main className={styles.cardResults}>
            {categoriesInOrder.map((cat) => renderCards(cat))}
          </main>
        </div>
      </div>
    </div>
  );
}
