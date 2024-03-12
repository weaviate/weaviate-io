import Link from '@docusaurus/Link';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';
import knowledge from '/data/knowledgecards.json';

export default function KnowledgeHeader() {
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
    <header>
      <div className="container">
        <div className={styles.box}>
          <h1>Knowledge Cards</h1>
          <div className={styles.headerBox}>
            <p className="text-center">
              Unlock the power of vector search. Our guides will help you
              conquer vector embeddings and build better AI applications.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </header>
  );
}
