import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appData from '/data/apps.json'; // Ensure this path is correct
import AppCard from './card';
import styles from './styles.module.scss';

const categoryDescriptions = {
  All: 'Browse all available apps.',
  'Weaviate Agents':
    'Explore, improve, and augment your data with the power of prompts.',
  'Cloud Tools':
    'Improve developer experience and accessibility for non-technical users. Available only in Weaviate Cloud.',
  'AI-Native Services': 'Simplify the development of end-to-end AI solutions.',
};

export default function AppFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Add sorting logic here
  const sortedApps = (apps) => {
    return apps.sort((a, b) => a.id - b.id); // Sort by numeric `id`
  };

  const filteredApps = sortedApps(
    appData.filter((app) => {
      return (
        (selectedCategory === 'All' || app.category === selectedCategory) &&
        (app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
  );

  const renderCardsByCategory = (category) => {
    const appsInCategory = filteredApps.filter(
      (app) => app.category === category
    );
    if (appsInCategory.length === 0) return null;

    const isHighlighted = category === 'Weaviate Agents';

    return (
      <div
        key={category}
        className={`${styles.categorySection} ${
          isHighlighted ? styles.highlightedCategory : ''
        }`}
      >
        <h2>{category}</h2>
        <p className={styles.categoryDescriptions}>
          {categoryDescriptions[category]}
        </p>
        <div className={styles.cardContainer}>
          {appsInCategory.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* RENDER HIGHLIGHTED CATEGORY HERE - Outside of the "container" */}
      {selectedCategory === 'All' && (
        <div className={styles.highlightedContain}>
          <div className="container">
            {renderCardsByCategory('Weaviate Agents')}
          </div>
        </div>
      )}

      <div className="container">
        <div className={styles.appContainer}>
          <div className={styles.sidebar}>
            {location.pathname === '/workbench' ? (
              <>
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={styles.searchInput}
                />
                <ul className={styles.categoryList}>
                  <li
                    onClick={() => handleCategoryChange('All')}
                    className={selectedCategory === 'All' ? styles.active : ''}
                  >
                    All Categories
                  </li>
                  <li
                    onClick={() => handleCategoryChange('Cloud Tools')}
                    className={
                      selectedCategory === 'Cloud Tools' ? styles.active : ''
                    }
                  >
                    Cloud Tools
                  </li>
                  <li
                    onClick={() => handleCategoryChange('AI-Native Services')}
                    className={
                      selectedCategory === 'AI-Native Services'
                        ? styles.active
                        : ''
                    }
                  >
                    AI-Native Services
                  </li>
                  <li
                    onClick={() => handleCategoryChange('Weaviate Agents')}
                    className={
                      selectedCategory === 'Weaviate Agents'
                        ? styles.active
                        : ''
                    }
                  >
                    Weaviate Agents
                  </li>
                </ul>
              </>
            ) : (
              <Link to="/marketplace" className={styles.backButton}>
                Back to Marketplace
              </Link>
            )}
          </div>
          <div className={styles.mainContent}>
            {selectedCategory === 'All' ? (
              <>
                {Object.keys(categoryDescriptions)
                  .filter(
                    (category) =>
                      category !== 'All' && category !== 'Weaviate Agents'
                  )
                  .map((category) => renderCardsByCategory(category))}
              </>
            ) : (
              <>
                <h2>{selectedCategory}</h2>
                <p className={styles.categoryDescriptions}>
                  {categoryDescriptions[selectedCategory]}
                </p>
                <div className={styles.cardContainer}>
                  {filteredApps.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
