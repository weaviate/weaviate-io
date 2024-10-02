import React, { useState, useEffect } from 'react';
import partners from '/data/partners.json';
import Card from './Card.jsx';
import SideFilter from './SideFilter.jsx';
import styles from './styles.module.scss';

function CardsFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState(partners);

  // Function to handle search input changes
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Function to handle filter changes
  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  // UseEffect to filter partners based on search query and selected filters
  useEffect(() => {
    let updatedPartners = partners;

    // Filter by search query
    if (searchQuery) {
      updatedPartners = updatedPartners.filter(
        (partner) =>
          partner.name.toLowerCase().includes(searchQuery) ||
          partner.description.toLowerCase().includes(searchQuery) ||
          partner.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      );
    }

    // Filter by selected filters
    if (selectedFilters.length > 0) {
      updatedPartners = updatedPartners.filter((partner) =>
        partner.tags.some((tag) => selectedFilters.includes(tag))
      );
    }

    setFilteredPartners(updatedPartners);
  }, [searchQuery, selectedFilters]);

  return (
    <div className={styles.cardsFilterContainer}>
      {/* Side Filter */}
      <SideFilter
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      {/* Main Content */}
      <div className={styles.mainContent}>
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
    </div>
  );
}

export default CardsFilter;
