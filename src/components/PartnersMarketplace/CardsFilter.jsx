import React, { useState, useEffect } from 'react';
import partners from '/data/partners.json';
import Card from './Card.jsx';
import styles from './styles.module.scss';

function CardsFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPartners, setFilteredPartners] = useState(partners);

  // Function to handle search input changes
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredPartners(
      partners.filter(
        (partner) =>
          partner.name.toLowerCase().includes(query) ||
          partner.description.toLowerCase().includes(query) ||
          partner.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Partners and Integrations"
        value={searchQuery}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <div className={styles.cardsContainer}>
        {filteredPartners.map((partner) => (
          <Card
            key={partner.name}
            name={partner.name}
            image={partner.image}
            link={partner.link}
            description={partner.description}
            tags={partner.tags}
          />
        ))}
      </div>
    </div>
  );
}

export default CardsFilter;
