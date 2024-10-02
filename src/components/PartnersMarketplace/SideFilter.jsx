import React, { useState } from 'react';
import styles from './styles.module.scss';

// Example tags/categories that you want to filter by
const availableFilters = [
  { label: 'Integration', value: 'integration' },
  { label: 'Popular', value: 'popular' },
  { label: 'Trending', value: 'trending' },
];

function SideFilter({ selectedFilters, onFilterChange }) {
  // Handle changes to the checkboxes
  const handleFilterChange = (value) => {
    if (selectedFilters.includes(value)) {
      onFilterChange(selectedFilters.filter((filter) => filter !== value));
    } else {
      onFilterChange([...selectedFilters, value]);
    }
  };

  return (
    <div className={styles.sideFilter}>
      <h3>Filter by</h3>
      {availableFilters.map((filter) => (
        <div key={filter.value} className={styles.filterOption}>
          <input
            type="checkbox"
            id={filter.value}
            value={filter.value}
            checked={selectedFilters.includes(filter.value)}
            onChange={() => handleFilterChange(filter.value)}
          />{' '}
          <label htmlFor={filter.value}>{filter.label}</label>
        </div>
      ))}
    </div>
  );
}

export default SideFilter;
