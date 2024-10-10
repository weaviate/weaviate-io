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

  // Filtering logic
  useEffect(() => {
    let updatedPartners = partners;

    // Filter by search query (applies to name and description)
    if (searchQuery) {
      updatedPartners = updatedPartners.filter(
        (partner) =>
          partner.name.toLowerCase().includes(searchQuery) ||
          partner.description.toLowerCase().includes(searchQuery)
      );
    }

    // Filter by selected filters (applies to tags, maintainedBy, programmingLanguage, weaviateFeatures)
    if (selectedFilters.length > 0) {
      updatedPartners = updatedPartners.filter((partner) => {
        // Ensure these fields exist, if not, use empty strings or arrays
        const tags = partner.tags || [];
        const maintainedBy = partner.maintainedBy || '';
        const programmingLanguage = partner.programmingLanguage || '';
        const weaviateFeatures = partner.weaviateFeatures || '';

        // Check if the selected filters are included in any of the fields
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
              tags={partner.tags} // Updated tags array
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsFilter;
