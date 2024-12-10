import React, { useState, useEffect } from 'react';
import partners from '/data/partners.json';
import Card from './Card.jsx';
import SideFilter from './SideFilter.jsx';
import styles from './styles.module.scss';

function CardsFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState(partners);

  const handleSearch = (event) =>
    setSearchQuery(event.target.value.toLowerCase());

  const handleFilterChange = (filters) => setSelectedFilters(filters);

  const removeFilter = (filterToRemove) => {
    setSelectedFilters(
      selectedFilters.filter((filter) => filter !== filterToRemove)
    );
  };

  useEffect(() => {
    let updatedPartners = partners;

    if (searchQuery) {
      updatedPartners = updatedPartners.filter(
        (partner) =>
          partner.name.toLowerCase().includes(searchQuery) ||
          partner.description.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedFilters.length > 0) {
      updatedPartners = updatedPartners.filter((partner) => {
        const tags = partner.tags || [];
        const maintainedBy = partner.maintainedBy || '';
        const programmingLanguage = partner.programmingLanguage || '';
        const weaviateFeatures = partner.weaviateFeatures || '';

        return selectedFilters.every(
          (filter) =>
            tags.includes(filter) ||
            maintainedBy.includes(filter) ||
            programmingLanguage.includes(filter) ||
            weaviateFeatures.includes(filter)
        );
      });
    }

    setFilteredPartners(updatedPartners);
  }, [searchQuery, selectedFilters]);

  return (
    <div className={styles.cardsFilterContainer}>
      <SideFilter
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <div className={styles.mainContent}>
        <input
          type="text"
          placeholder="Search Integration Ecosystem"
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />

        <div className={styles.selectedFilters}>
          {selectedFilters.map((filter) => (
            <span
              key={filter}
              className={styles.filterLabel}
              onClick={() => removeFilter(filter)}
            >
              {filter} ✕
            </span>
          ))}
        </div>

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
