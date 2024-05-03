import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Card from './card';
import fetchKnowledgeCards from './fetchData'; // Ensure this path is correct

export default function KnowledgeBase({ searchQuery }) {
  const [selectedCard, setSelectedCard] = useState('All');
  const [showMore, setShowMore] = useState({});
  const [activeCard, setActiveCard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchKnowledgeCards().then((data) => {
      setCards(data);
      const hash = window.location.hash;
      if (hash.startsWith('#card=')) {
        const cardId = hash.substring(6);
        const matchedCard = data.find((card) => card.id === cardId);
        if (matchedCard) {
          setActiveCard(matchedCard);
          setShowMore((prev) => ({ ...prev, [matchedCard.category]: true }));
        }
      }
    });
  }, []);

  const handleCardFilter = (event) => {
    setSelectedCard(event.target.value);
  };

  const filteredCards = cards.filter((card) => {
    return (
      (selectedCard === 'All' || card.category === selectedCard) &&
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

  const handleNavigation = (direction) => {
    if (!activeCard) return;

    const cardsInSameCategory = filteredCards.filter(
      (card) => card.category === activeCard.category
    );

    let newIndex = cardsInSameCategory.findIndex(
      (card) => card.id === activeCard.id
    );
    if (direction === 'next') {
      newIndex = (newIndex + 1) % cardsInSameCategory.length;
    } else if (direction === 'previous') {
      newIndex =
        newIndex - 1 < 0 ? cardsInSameCategory.length - 1 : newIndex - 1;
    }

    const newActiveCard = cardsInSameCategory[newIndex];
    if (newActiveCard) {
      handleCardOpen(newActiveCard);
    }
  };

  const handleCardOpen = (card) => {
    setActiveCard(card);
    window.location.hash = `card=${card.id}`;
    setShowMore((prev) => ({ ...prev, [card.category]: true }));
  };

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

    return (
      <>
        <h3>{category}</h3>
        <div className={styles.cardContainer}>
          {visibleCards.map((card, index) => (
            <Card
              key={card.id}
              details={card}
              setActiveCard={setActiveCard}
              currentIndex={index + 1}
              totalCards={categoryCards.length}
              onOpenModal={() => handleCardOpen(card)}
              isActive={activeCard && activeCard.id === card.id}
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

  return (
    <div className={styles.teamBG}>
      <div className="container">
        <div className={styles.knowledgebase}>
          <div className={styles.filterBox}>
            <h3>Categories</h3>
            {['All', ...new Set(cards.map((card) => card.category))].map(
              (category) => (
                <div key={category}>
                  <input
                    type="radio"
                    id={`filter${category}`}
                    name="cardFilter"
                    value={category}
                    checked={selectedCard === category}
                    onChange={handleCardFilter}
                  />
                  <label htmlFor={`filter${category}`}>{category}</label>
                </div>
              )
            )}
          </div>
          <div className={styles.filterLine}></div>
          <div className={styles.cardResults}>
            {Object.keys(
              cards.reduce((acc, card) => {
                acc[card.category] = true;
                return acc;
              }, {})
            ).map((category) => renderCards(category))}
          </div>
        </div>
      </div>
    </div>
  );
}
