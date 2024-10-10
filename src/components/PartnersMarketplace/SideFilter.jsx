import React, { useState } from 'react';
import styles from './styles.module.scss';

// Example tags/categories that you want to filter by
const availableFilters = [
  {
    label: 'Technical Tags',
    values: [
      'Cloud Hyperscalers',
      'Model Providers',
      'Data Platforms',
      'Compute Infrastructure',
      'LLM Framework',
      'Operations',
    ],
  },
  {
    label: 'Additional',
    values: ['Module', 'Popular', 'Integration'],
  },
  {
    label: 'Programming Languages',
    values: ['All languages', 'Python', 'TS/JS', 'C#'],
  },
  {
    label: 'Weaviate Features',
    values: ['Hybrid Search', 'Filters', 'Multi-tenancy'],
  },
];

function SideFilter({ selectedFilters, onFilterChange }) {
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
      {availableFilters.map((filterCategory) => (
        <div key={filterCategory.label}>
          <h4>{filterCategory.label}</h4>
          {filterCategory.values.map((value) => (
            <div key={value} className={styles.filterOption}>
              <input
                type="checkbox"
                id={value}
                value={value}
                checked={selectedFilters.includes(value)}
                onChange={() => handleFilterChange(value)}
              />
              <label htmlFor={value}> {value}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SideFilter;
